import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../../firebaseConfig';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import NewsForm from './NewsForm'; // Import the NewsForm component
import { motion, AnimatePresence } from 'framer-motion';

const AdminManageNews = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null); // Holds the news item being edited
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [listLoading, setListLoading] = useState(true);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const handleFormSubmit = async (newsData, imageFile, newsId) => {
    setLoading(true);
    setFormError('');
    setFormSuccess('');
    let imageUrl = editingNews?.image || ''; // Keep existing image if not changed

    try {
      if (imageFile) {
        // If there's an old image and a new one is being uploaded, delete the old one first
        if (editingNews && editingNews.imagePath) {
          const oldImageRef = ref(storage, editingNews.imagePath);
          try {
            await deleteObject(oldImageRef);
          } catch (deleteError) {
            // Log if old image deletion fails, but proceed with upload
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
              newsData.imagePath = imagePath; // Store image path for future deletion
              resolve();
            }
          );
        });
      }

      const dataToSave = { ...newsData, image: imageUrl, date: newsData.date || serverTimestamp() };
      
      if (newsId) { // Editing existing news
        const newsDocRef = doc(db, 'news', newsId);
        await updateDoc(newsDocRef, dataToSave);
        setFormSuccess('News article updated successfully!');
      } else { // Adding new news
        await addDoc(collection(db, 'news'), dataToSave);
        setFormSuccess('News article added successfully!');
      }
      
      fetchNews(); // Refresh the list
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
        // Delete image from storage if path exists
        if (imagePath) {
          const imageRef = ref(storage, imagePath);
          await deleteObject(imageRef).catch(err => console.warn("Image deletion failed, or image did not exist:", err));
        }
        await deleteDoc(doc(db, 'news', newsId));
        setFormSuccess('News article deleted successfully!');
        fetchNews(); // Refresh list
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
      className="min-h-screen bg-neutralBg text-neutralText p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary dark:text-primary-dark poppins-bold">Manage News Articles</h1>
          <div className="flex gap-2">
            <motion.button
              onClick={openAddForm}
              className="bg-accent hover:bg-accent-dark text-white font-bold py-2 px-4 rounded poppins-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add New Article
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded poppins-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <NewsForm
                onSubmit={handleFormSubmit}
                initialData={editingNews}
                loading={loading}
                error={formError}
                successMessage={formSuccess}
              />
               <button 
                onClick={() => { setShowForm(false); setEditingNews(null); }} 
                className="mt-4 text-sm text-neutralText dark:text-neutral-400 hover:underline poppins-regular"
              >
                Cancel
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {listLoading ? (
          <p className="text-center poppins-medium">Loading news list...</p>
        ) : newsList.length === 0 && !formError ? (
          <p className="text-center poppins-regular">No news articles found. Add one to get started!</p>
        ) : (
          <div className="space-y-4">
            {newsList.map((news) => (
              <motion.div
                key={news.id}
                className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-primary dark:text-primary-dark poppins-semibold">{news.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 poppins-regular">
                    Category: {news.category} | Date: {news.date?.toDate ? new Date(news.date.toDate()).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-sm text-neutralText dark:text-neutral-300 mt-1 line-clamp-2 poppins-regular">{news.summary}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0 mt-2 sm:mt-0">
                  <button onClick={() => handleEdit(news)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded poppins-medium">Edit</button>
                  <button onClick={() => handleDelete(news.id, news.imagePath)} className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded poppins-medium" disabled={loading}>Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
         {formError && !showForm && <p className="mt-4 text-sm text-red-500 dark:text-red-400 poppins-regular text-center">{formError}</p>}
      </div>
    </motion.div>
  );
};

export default AdminManageNews;
