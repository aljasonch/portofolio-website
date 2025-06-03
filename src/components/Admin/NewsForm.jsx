import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NewsForm = ({ onSubmit, initialData = null, loading, error, successMessage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [summary, setSummary] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  // New fields
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState('published'); // published, draft, archived
  const [readTime, setReadTime] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [source, setSource] = useState('');
  const [location, setLocation] = useState('');

  // Predefined categories and tags for better UX
  const predefinedCategories = [
    'Technology', 'Business', 'Education', 'Health', 'Sports', 
    'Entertainment', 'Politics', 'Science', 'Travel', 'Lifestyle'
  ];

  const predefinedTags = [
    'Breaking News', 'Update', 'Announcement', 'Review', 'Tutorial',
    'Interview', 'Analysis', 'Opinion', 'Research', 'Event'
  ];

  // Calculate estimated read time based on content
  const calculateReadTime = (text) => {
    const wordsPerMinute = 200;
    const wordCount = text.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  };

  // Auto-calculate read time when content changes
  useEffect(() => {
    if (content) {
      const estimatedTime = calculateReadTime(content);
      setReadTime(estimatedTime.toString());
    }
  }, [content]);  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setContent(initialData.content || '');
      setCategory(initialData.category || '');
      setSummary(initialData.summary || '');
      setAuthor(initialData.author || '');
      // Handle tags - could be string or array from database
      setTags(Array.isArray(initialData.tags) ? initialData.tags.join(', ') : (initialData.tags || ''));
      setPublishDate(initialData.publishDate || '');
      setFeatured(initialData.featured || false);
      setStatus(initialData.status || 'published');
      setReadTime(initialData.readTime || '');
      setMetaDescription(initialData.metaDescription || '');
      setSource(initialData.source || '');
      setLocation(initialData.location || '');
      if (initialData.image) {
        setImagePreview(initialData.image);
      }
    } else {
      // Reset form for new entry
      setTitle('');
      setContent('');
      setCategory('');
      setSummary('');
      setAuthor('');
      setTags('');
      setPublishDate(new Date().toISOString().split('T')[0]); // Today's date
      setFeatured(false);
      setStatus('published');
      setReadTime('');
      setMetaDescription('');
      setSource('');
      setLocation('');
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
    if (!summary.trim()) errors.summary = 'Summary is required.';
    if (!category.trim()) errors.category = 'Category is required.';
    if (!author.trim()) errors.author = 'Author is required.';
    if (!publishDate) errors.publishDate = 'Publish date is required.';
    if (title.length > 100) errors.title = 'Title must be less than 100 characters.';
    if (summary.length > 300) errors.summary = 'Summary must be less than 300 characters.';
    if (metaDescription.length > 160) errors.metaDescription = 'Meta description must be less than 160 characters.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newsData = {
        title,
        content,
        category,
        summary,
        author,
        tags: (tags && typeof tags === 'string') ? tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
        publishDate: new Date(publishDate),
        featured,
        status,
        readTime: parseInt(readTime) || calculateReadTime(content),
        metaDescription: metaDescription || summary.substring(0, 160),
        source,
        location,
        date: initialData?.date || new Date(),
        lastModified: new Date(),
      };
      onSubmit(newsData, imageFile, initialData?.id);
    }
  };  const inputClass = "w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all duration-300 placeholder-gray-400 text-gray-700 bg-white hover:border-gray-300 poppins-regular";
  const labelClass = "block text-sm font-semibold text-gray-700 poppins-semibold mb-2";
  const sectionClass = "bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300";

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information Section */}
        <div className={sectionClass}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 poppins-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Basic Information
            </h3>
            <p className="text-gray-600 poppins-regular text-sm mt-1">Essential article details</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className={labelClass}>Article Title</label>
              <input 
                type="text" 
                name="title" 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className={inputClass} 
                placeholder="Enter a compelling article title..."
                required 
              />
              {formErrors.title && (
                <motion.p 
                  className="text-xs text-red-500 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.title}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="summary" className={labelClass}>Summary</label>
              <textarea 
                name="summary" 
                id="summary" 
                rows="3" 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)} 
                className={inputClass} 
                placeholder="Write a brief summary of your article..."
                required 
              />
              <div className="flex justify-between items-center mt-1">
                {formErrors.summary && (
                  <motion.p 
                    className="text-xs text-red-500 flex items-center gap-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formErrors.summary}
                  </motion.p>
                )}
                <span className="text-xs text-gray-400 poppins-regular">{summary.length}/300</span>
              </div>
            </div>

            <div>
              <label htmlFor="content" className={labelClass}>
                Article Content 
                <span className="text-xs font-normal text-gray-500 ml-2">(HTML supported)</span>
              </label>
              <textarea 
                name="content" 
                id="content" 
                rows="12" 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                className={inputClass} 
                placeholder="Write your article content here. You can use HTML tags for formatting..."
                required 
              />
              {formErrors.content && (
                <motion.p 
                  className="text-xs text-red-500 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.content}
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Categorization Section */}
        <div className={sectionClass}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 poppins-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              Categorization & Tags
            </h3>
            <p className="text-gray-600 poppins-regular text-sm mt-1">Organize your content for better discovery</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className={labelClass}>Category</label>
              <select 
                name="category" 
                id="category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className={inputClass} 
                required
              >
                <option value="">Select a category</option>
                {predefinedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {formErrors.category && (
                <motion.p 
                  className="text-xs text-red-500 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.category}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="tags" className={labelClass}>Tags (comma-separated)</label>
              <input 
                type="text" 
                name="tags" 
                id="tags" 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                className={inputClass} 
                placeholder="e.g., Breaking News, Technology, Update"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 poppins-medium mb-3">Quick tag suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {predefinedTags.map(tag => (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => {
                    const currentTagsString = tags || '';
                    const currentTags = currentTagsString.split(',').map(t => t.trim()).filter(t => t);
                    if (!currentTags.includes(tag)) {
                      setTags(currentTags.length > 0 ? `${currentTagsString}, ${tag}` : tag);
                    }
                  }}
                  className="px-3 py-2 text-xs bg-gradient-to-r from-gray-100 to-gray-200 hover:from-accent hover:to-secondary text-gray-700 hover:text-white rounded-lg transition-all duration-300 poppins-medium border border-gray-200 hover:border-transparent shadow-sm hover:shadow-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  + {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </div>        {/* Author & Publishing Details Section */}
        <div className={sectionClass}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 poppins-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Author & Publishing
            </h3>
            <p className="text-gray-600 poppins-regular text-sm mt-1">Author information and publication settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className={labelClass}>Author</label>
              <input 
                type="text" 
                name="author" 
                id="author" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)} 
                className={inputClass} 
                placeholder="Enter author name"
                required 
              />
              {formErrors.author && (
                <motion.p 
                  className="text-xs text-red-500 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.author}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="status" className={labelClass}>Publication Status</label>
              <select 
                name="status" 
                id="status" 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                className={inputClass}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div>
              <label htmlFor="publishDate" className={labelClass}>Publish Date</label>
              <input 
                type="date" 
                name="publishDate" 
                id="publishDate" 
                value={publishDate} 
                onChange={(e) => setPublishDate(e.target.value)} 
                className={inputClass} 
                required 
              />
              {formErrors.publishDate && (
                <motion.p 
                  className="text-xs text-red-500 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.publishDate}
                </motion.p>
              )}
            </div>

            <div>
              <label htmlFor="readTime" className={labelClass}>Read Time (minutes)</label>
              <input 
                type="number" 
                name="readTime" 
                id="readTime" 
                value={readTime} 
                onChange={(e) => setReadTime(e.target.value)} 
                className={inputClass} 
                placeholder="Auto-calculated"
                min="1"
              />
              <p className="text-xs text-gray-500 mt-1 poppins-regular">Auto-calculated based on content</p>
            </div>

            <div className="flex items-end">
              <label className="flex items-center space-x-3 cursor-pointer bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 p-4 rounded-xl border border-green-200 transition-all duration-300">
                <input 
                  type="checkbox" 
                  checked={featured} 
                  onChange={(e) => setFeatured(e.target.checked)} 
                  className="w-5 h-5 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <div>
                  <span className="text-sm font-semibold text-gray-700 poppins-semibold">Featured Article</span>
                  <p className="text-xs text-gray-500 poppins-regular">Highlight this article</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* SEO & Metadata Section */}
        <div className={sectionClass}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 poppins-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              SEO & Metadata
            </h3>
            <p className="text-gray-600 poppins-regular text-sm mt-1">Optimize your article for search engines</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="metaDescription" className={labelClass}>
                Meta Description 
                <span className={`text-xs ml-2 ${metaDescription.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                  ({metaDescription.length}/160)
                </span>
              </label>
              <textarea 
                name="metaDescription" 
                id="metaDescription" 
                rows="3" 
                value={metaDescription} 
                onChange={(e) => setMetaDescription(e.target.value)} 
                className={inputClass} 
                placeholder="SEO meta description (max 160 characters)"
                maxLength="160"
              />
              {formErrors.metaDescription && (
                <motion.p 
                  className="text-xs text-red-500 mt-2 flex items-center gap-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {formErrors.metaDescription}
                </motion.p>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="source" className={labelClass}>Source <span className="text-gray-400 text-xs">(Optional)</span></label>
                <input 
                  type="text" 
                  name="source" 
                  id="source" 
                  value={source} 
                  onChange={(e) => setSource(e.target.value)} 
                  className={inputClass} 
                  placeholder="News source or reference"
                />
              </div>

              <div>
                <label htmlFor="location" className={labelClass}>Location <span className="text-gray-400 text-xs">(Optional)</span></label>
                <input 
                  type="text" 
                  name="location" 
                  id="location" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  className={inputClass} 
                  placeholder="e.g., New York, USA"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className={sectionClass}>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 poppins-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              Featured Image
            </h3>
            <p className="text-gray-600 poppins-regular text-sm mt-1">Add a visual appeal to your article</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="image" className={labelClass}>Upload Image <span className="text-gray-400 text-xs">(Optional)</span></label>
              <div className="relative">
                <input 
                  type="file" 
                  name="image" 
                  id="image" 
                  onChange={handleImageChange} 
                  className="hidden" 
                  accept="image/*" 
                />
                <label 
                  htmlFor="image" 
                  className="w-full flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-accent cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-accent/5"
                >
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600 poppins-medium">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 poppins-regular">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            {imagePreview && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-white p-4 rounded-2xl border border-gray-200 shadow-lg">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full max-h-64 object-cover rounded-xl"
                  />
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        {error && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-xl p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-red-700 poppins-regular">{error}</p>
            </div>
          </motion.div>
        )}

        {successMessage && (
          <motion.div 
            className="bg-green-50 border border-green-200 rounded-xl p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm text-green-700 poppins-regular">{successMessage}</p>
            </div>
          </motion.div>
        )}

        <div className="flex justify-end">
          <motion.button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl poppins-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 min-w-[200px] justify-center"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {initialData ? 'Updating...' : 'Publishing...'}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {initialData ? 'Update Article' : 'Publish Article'}
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default NewsForm;
