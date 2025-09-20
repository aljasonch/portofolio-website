import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const initialFormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  tags: '',
  readTime: '',
  date: '',
};

const BlogForm = ({ onSubmit, onCancel, loading, error, success, initialData }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const toDateInput = (value) => {
      if (!value) return '';
      const date = value instanceof Date ? value : value?.toDate ? value.toDate() : new Date(value);
      if (Number.isNaN(date?.getTime())) return '';
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, '0');
      const day = `${date.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (initialData) {
      setFormData({
        title: initialData.title || '',
        slug: initialData.slug || '',
        excerpt: initialData.excerpt || '',
        content: initialData.content || '',
        tags: initialData.tags ? initialData.tags.join(', ') : '',
        readTime: initialData.readTime || '',
        date: toDateInput(initialData.date),
      });
      setPreviewUrl(initialData.image || '');
    } else {
      setFormData(initialFormState);
      setPreviewUrl('');
      setImageFile(null);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result.toString());
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    onSubmit(payload, imageFile, initialData?.id || null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card border border-white/40 rounded-3xl p-8 backdrop-blur-xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-neutralText mb-6 poppins-bold">
        {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              placeholder="my-awesome-article"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Read Time</label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="5 min read"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Published Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="UI/UX, Motion"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Excerpt</label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all"
            placeholder="Write the full article. Use blank lines to separate paragraphs."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-sm font-medium text-neutral-600 mb-2 poppins-medium">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-neutral-600"
            />
            <p className="mt-2 text-xs text-neutral-500">JPEG, PNG — up to 2MB.</p>
          </div>
          {previewUrl && (
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
              <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover" />
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold shadow-lg hover:from-primary-600 hover:to-secondary-600 transition-all disabled:opacity-50"
          >
            {loading ? 'Saving...' : initialData ? 'Update Post' : 'Publish Post'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default BlogForm;
