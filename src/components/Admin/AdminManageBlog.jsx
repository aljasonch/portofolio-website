import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db, storage } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import BlogForm from './BlogForm';
import {
  removeSession,
  getTimeUntilExpiry,
  formatTimeRemaining,
  refreshSessionIfNeeded,
} from '../../utils/sessionManager';

const AdminManageBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [listLoading, setListLoading] = useState(true);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);

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
      const refreshed = refreshSessionIfNeeded();
      if (refreshed) {
        setSessionTimeLeft(getTimeUntilExpiry());
      }
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach((event) => document.addEventListener(event, handleUserActivity, true));

    return () => {
      events.forEach((event) => document.removeEventListener(event, handleUserActivity, true));
    };
  }, []);

  const fetchPosts = async () => {
    setListLoading(true);
    try {
      const postsCollectionRef = collection(db, 'blogPosts');
      const q = query(postsCollectionRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      const entries = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPosts(entries);
    } catch (error) {
      console.error('Error fetching blog posts: ', error);
      setFormError('Failed to load blog posts.');
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleFormSubmit = async (postData, imageFile, postId) => {
    setLoading(true);
    setFormError('');
    setFormSuccess('');
    let imageUrl = editingPost?.image || '';

    try {
      if (imageFile) {
        if (editingPost?.imagePath) {
          const oldImageRef = ref(storage, editingPost.imagePath);
          await deleteObject(oldImageRef).catch((err) =>
            console.warn('Unable to delete old image:', err)
          );
        }

        const imagePath = `blogImages/${Date.now()}_${imageFile.name}`;
        const storageRef = ref(storage, imagePath);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            () => {},
            (error) => reject(error),
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
              postData.imagePath = imagePath;
              resolve();
            }
          );
        });
      }

      const dataToSave = {
        ...postData,
        image: imageUrl,
        date: postData.date ? new Date(postData.date) : serverTimestamp(),
      };

      if (postId) {
        const postRef = doc(db, 'blogPosts', postId);
        await updateDoc(postRef, dataToSave);
        setFormSuccess('Blog post updated successfully!');
      } else {
        await addDoc(collection(db, 'blogPosts'), dataToSave);
        setFormSuccess('Blog post created successfully!');
      }

      setShowForm(false);
      setEditingPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error saving blog post: ', error);
      setFormError(`Failed to save blog post. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setShowForm(true);
    setFormError('');
    setFormSuccess('');
  };

  const handleDelete = async (postId, imagePath) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    setLoading(true);
    try {
      if (imagePath) {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef).catch((err) =>
          console.warn('Image deletion failed:', err)
        );
      }

      await deleteDoc(doc(db, 'blogPosts', postId));
      setFormSuccess('Blog post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting blog post: ', error);
      setFormError('Failed to delete blog post.');
    } finally {
      setLoading(false);
    }
  };

  const openCreateForm = () => {
    setEditingPost(null);
    setShowForm(true);
    setFormError('');
    setFormSuccess('');
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-neutralText p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-7xl mt-36">
        <motion.div
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-600 poppins-bold mb-2">
                Blog Management
              </h1>
              <p className="text-lg text-gray-600 poppins-regular mb-4">
                Create, edit, and publish blog stories
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 poppins-medium">
                    Session: {formatTimeRemaining(sessionTimeLeft)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={openCreateForm}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold shadow-lg hover:from-primary-600 hover:to-secondary-600 transition-all"
              >
                New Blog Post
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all inline-flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>

          {formError && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
              {formError}
            </div>
          )}
          {formSuccess && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl">
              {formSuccess}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {showForm && (
            <BlogForm
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingPost(null);
              }}
              loading={loading}
              error={formError}
              success={formSuccess}
              initialData={editingPost}
            />
          )}
        </AnimatePresence>

        <motion.div
          className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-neutral-800 poppins-bold">Published Posts</h2>
            <span className="text-sm text-gray-500 poppins-medium">{posts.length} total</span>
          </div>

          <div className="divide-y divide-gray-100">
            {listLoading ? (
              <div className="p-6 text-center text-neutral-500">Loading posts...</div>
            ) : posts.length === 0 ? (
              <div className="p-6 text-center text-neutral-500">No blog posts yet. Create your first story!</div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 poppins-bold">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-500 poppins-regular mt-1">
                      {post.date?.toDate ? post.date.toDate().toLocaleDateString() : new Date(post.date).toLocaleDateString()} • {post.readTime || '—'}
                    </p>
                    <p className="text-sm text-neutral-500 poppins-regular mt-2">
                      Slug: {post.slug}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(post)}
                      className="px-4 py-2 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id, post.imagePath)}
                      className="px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminManageBlog;
