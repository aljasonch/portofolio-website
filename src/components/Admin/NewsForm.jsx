import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NewsForm = ({ onSubmit, initialData = null, loading, error, successMessage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState(''); // Added summary field
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setCategory(initialData.category || '');
      setSummary(initialData.summary || ''); // Populate summary
      if (initialData.image) {
        setImagePreview(initialData.image); // Assuming image is a URL string
      }
    } else {
      // Reset form for new entry
      setTitle('');
      setContent('');
      setCategory('');
      setSummary('');
      setImageFile(null);
      setImagePreview(null);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(initialData?.image || null); // Revert to initial image if file is deselected
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = 'Title is required.';
    if (!content.trim()) errors.content = 'Content is required.';
    if (!summary.trim()) errors.summary = 'Summary is required.'; // Validate summary
    if (!category.trim()) errors.category = 'Category is required.';
    // Add more validation as needed (e.g., image type/size)
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newsData = {
        title,
        content,
        category,
        summary, // Include summary
        date: initialData?.date || new Date(), // Preserve original date on edit, or new date for new post
      };
      onSubmit(newsData, imageFile, initialData?.id);
    }
  };

  const inputClass = "appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-neutral-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm bg-white dark:bg-neutral-700 text-neutralText dark:text-neutral-200 poppins-regular";
  const labelClass = "block text-sm font-medium text-neutralText dark:text-neutral-300 poppins-medium mb-1";

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-white dark:bg-neutral-800 p-6 md:p-8 rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label htmlFor="title" className={labelClass}>Title</label>
        <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
        {formErrors.title && <p className="text-xs text-red-500 mt-1">{formErrors.title}</p>}
      </div>

      <div>
        <label htmlFor="summary" className={labelClass}>Summary</label>
        <textarea name="summary" id="summary" rows="3" value={summary} onChange={(e) => setSummary(e.target.value)} className={inputClass} required />
        {formErrors.summary && <p className="text-xs text-red-500 mt-1">{formErrors.summary}</p>}
      </div>

      <div>
        <label htmlFor="content" className={labelClass}>Content (HTML is supported)</label>
        <textarea name="content" id="content" rows="10" value={content} onChange={(e) => setContent(e.target.value)} className={inputClass} required />
        {formErrors.content && <p className="text-xs text-red-500 mt-1">{formErrors.content}</p>}
      </div>

      <div>
        <label htmlFor="category" className={labelClass}>Category</label>
        <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} required />
        {formErrors.category && <p className="text-xs text-red-500 mt-1">{formErrors.category}</p>}
      </div>

      <div>
        <label htmlFor="image" className={labelClass}>Image (Optional)</label>
        <input type="file" name="image" id="image" onChange={handleImageChange} className={`${inputClass} p-2`} accept="image/*" />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="max-h-48 rounded-md shadow"/>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 dark:text-red-400 poppins-regular">{error}</p>}
      {successMessage && <p className="text-sm text-green-500 dark:text-green-400 poppins-regular">{successMessage}</p>}

      <div>
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-dark poppins-medium disabled:opacity-60"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          {loading ? (initialData ? 'Updating...' : 'Adding...') : (initialData ? 'Update News' : 'Add News')}
        </motion.button>
      </div>
    </motion.form>
  );
};

export default NewsForm;
