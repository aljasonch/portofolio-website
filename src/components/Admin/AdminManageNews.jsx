import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import NewsForm from './NewsForm'; 
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { removeSession, getTimeUntilExpiry, formatTimeRemaining, refreshSession } from '../../utils/sessionManager';

const AdminManageNews = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [listLoading, setListLoading] = useState(true);  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);

  const handleLogout = useCallback(async () => {
    try {
      removeSession();
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout Error:', error);
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const updateTimer = () => {
      const timeLeft = getTimeUntilExpiry();
      setSessionTimeLeft(timeLeft);

      if (timeLeft <= 0) {
        handleLogout();
      }
    };

    updateTimer();

    const interval = setInterval(updateTimer, 60000);
    
    return () => clearInterval(interval);
  }, [handleLogout]);

  useEffect(() => {
    const handleUserActivity = () => {
      refreshSession();
      setSessionTimeLeft(getTimeUntilExpiry());
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, []);

  const fetchNews = async () => {
    setListLoading(true);
    try {
      const newsCollectionRef = collection(db, 'news');
      const q = query(newsCollectionRef, orderBy('date', 'desc'));
      const data = await getDocs(q);
      setNewsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching news list: ", error);
      setFormError("Failed to load news list.");
    } finally {
      setListLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  const handleFormSubmit = async (newsData, imageFile, newsId) => {
    setLoading(true);
    setFormError('');
    setFormSuccess('');
    let imageUrl = editingNews?.image || ''; 

    try {
      if (imageFile) {
        if (editingNews && editingNews.imagePath) {
          const oldImageRef = ref(storage, editingNews.imagePath);
          try {
            await deleteObject(oldImageRef);
          } catch (deleteError) {
            console.warn("Could not delete old image, or it didn't exist:", deleteError);
          }
        }
        const imagePath = `newsImages/${Date.now()}_${imageFile.name}`;
        const storageRef = ref(storage, imagePath);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed',
            (snapshot) => { /* Progress tracking can be added here */ },
            (error) => { reject(error); },
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              newsData.imagePath = imagePath;
              resolve();
            }
          );
        });
      }

      const dataToSave = { ...newsData, image: imageUrl, date: newsData.date || serverTimestamp() };
      
      if (newsId) { 
        const newsDocRef = doc(db, 'news', newsId);
        await updateDoc(newsDocRef, dataToSave);
        setFormSuccess('News article updated successfully!');
      } else { 
        await addDoc(collection(db, 'news'), dataToSave);
        setFormSuccess('News article added successfully!');
      }
      
      fetchNews();
      setShowForm(false);
      setEditingNews(null);
    } catch (error) {
      console.error("Error saving news: ", error);
      setFormError(`Failed to save news. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (newsItem) => {
    setEditingNews(newsItem);
    setShowForm(true);
    setFormError('');
    setFormSuccess('');
  };

  const handleDelete = async (newsId, imagePath) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      setLoading(true);
      try {
        if (imagePath) {
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef).catch(err => console.warn("Image deletion failed, or image did not exist:", err));
        }
        await deleteDoc(doc(db, 'news', newsId));
        setFormSuccess('News article deleted successfully!');
        fetchNews();
      } catch (error) {
        console.error("Error deleting news: ", error);
        setFormError("Failed to delete news article.");
      } finally {
        setLoading(false);
      }
    }
  };
  
  const openAddForm = () => {
    setEditingNews(null);
    setShowForm(true);
    setFormError('');
    setFormSuccess('');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-neutralText p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-700 p-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-primary-dark poppins-bold mb-2">
                News Management
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 poppins-regular mb-4">
                Create, edit, and manage your news articles
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 poppins-medium">
                    Admin Panel
                  </span>
                </div>
                {sessionTimeLeft > 0 && (
                  <>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 poppins-regular">
                        Session expires in {formatTimeRemaining(sessionTimeLeft)}
                      </span>
                    </div>
                  </>
                )}
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 poppins-medium">
                    {newsList.length} Articles
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={openAddForm}
                className="group relative bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-bold py-3 px-6 rounded-2xl poppins-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Article
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="group bg-white dark:bg-neutral-700 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 border-2 border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 font-bold py-3 px-6 rounded-2xl poppins-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-700 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
                  <h2 className="text-2xl font-bold poppins-bold flex items-center gap-3">
                    {editingNews ? (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Article
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Article
                      </>
                    )}
                  </h2>
                  <p className="text-white/80 mt-1 poppins-regular">
                    {editingNews ? 'Update your article with new information' : 'Fill in the details to create a new article'}
                  </p>
                </div>
                
                <div className="p-8">
                  <NewsForm
                    onSubmit={handleFormSubmit}
                    initialData={editingNews}
                    loading={loading}
                    error={formError}
                    successMessage={formSuccess}
                  />
                  
                  <div className="flex justify-end mt-6">
                    <motion.button 
                      onClick={() => { setShowForm(false); setEditingNews(null); setFormError(''); setFormSuccess(''); }} 
                      className="flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-xl transition-all duration-300 poppins-medium"
                      whileHover={{ x: -5 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {listLoading ? (
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-700 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300 poppins-medium">Loading articles...</p>
              </div>
            </div>
          </motion.div>
        ) : newsList.length === 0 && !formError ? (
          <motion.div 
            className="bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-700 p-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200 poppins-bold mb-2">No articles yet</h3>
            <p className="text-gray-500 dark:text-gray-400 poppins-regular mb-6">Get started by creating your first news article</p>
            <motion.button
              onClick={openAddForm}
              className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-bold py-3 px-8 rounded-2xl poppins-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create First Article
            </motion.button>
          </motion.div>
        ) : (
          <div className="space-y-6">            
            <div className="grid gap-6">
              {newsList.map((news, index) => (
                <motion.div
                  key={news.id}
                  className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-neutral-700 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-primary dark:text-primary-dark poppins-bold mb-2">
                        {news.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full poppins-medium border border-blue-200 dark:border-blue-800">
                          {news.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 poppins-regular">
                          {news.date?.toDate ? new Date(news.date.toDate()).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 poppins-regular">
                        {news.summary}
                      </p>
                    </div>
                    
                    <div className="flex gap-2 flex-shrink-0">
                      <motion.button 
                        onClick={() => handleEdit(news)} 
                        className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-4 py-2 rounded-xl poppins-medium transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </motion.button>
                      
                      <motion.button 
                        onClick={() => handleDelete(news.id, news.imagePath)} 
                        className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-xl poppins-medium transition-all duration-300" 
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {(formError || formSuccess) && !showForm && (
          <motion.div 
            className={`mt-6 p-4 rounded-2xl text-center ${
              formError ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800' : 
                         'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="poppins-medium">{formError || formSuccess}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminManageNews;

