import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError('');
        const q = query(collection(db, 'blogPosts'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            ...data,
            date: data.date?.toDate ? data.date.toDate() : data.date ? new Date(data.date) : null,
          };
        });
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const tags = useMemo(() => {
    const collectionOfTags = new Set();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => collectionOfTags.add(tag));
    });
    return ['All', ...Array.from(collectionOfTags)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = selectedTag === 'All' || post.tags?.includes(selectedTag);
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchTerm]);

  return (
    <motion.section
      id="blog"
      className="pt-32 pb-20 section-gradient relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 right-16 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-16 left-16 w-40 h-40 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div className="text-center mb-16" variants={sectionVariants}>
          <motion.span
            className="uppercase tracking-[0.4em] text-sm text-green-500 poppins-medium"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Journal
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl poppins-bold text-green-600 mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Insights &amp; Stories
          </motion.h1>
          <motion.p
            className="text-lg text-neutral-600 poppins-regular max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Thoughts on building human-centered digital products, teaming with clients, and pushing ideas from sketch to launch.
          </motion.p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto mt-8 rounded-full"></div>
        </motion.div>

        <div className="glass-card border border-white/40 rounded-3xl p-6 mb-12 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 rounded-2xl border border-white/50 bg-white/60 focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedTag === tag
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                      : 'bg-white/70 text-neutral-600 hover:bg-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Showing {filteredPosts.length} of {posts.length} articles
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="glass-card border border-white/30 rounded-3xl p-8">
                  <Skeleton width={120} height={16} />
                  <Skeleton className="mt-4" height={28} />
                  <Skeleton className="mt-4" count={3} />
                  <Skeleton className="mt-6" width={100} height={32} />
                </div>
              ))}
            </div>
          </SkeletonTheme>
        ) : filteredPosts.length ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.map((article) => (
              <motion.article
                key={article.id}
                className="glass-card backdrop-blur-xl border border-white/30 rounded-3xl p-8 flex flex-col h-full shadow-xl hover:shadow-2xl transition-shadow duration-300"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8 }}
              >
                <div className="flex items-center gap-3 text-sm text-neutral-500 poppins-medium">
                  <span>
                    {article.date ? article.date.toLocaleDateString() : 'Unscheduled'}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                  <span>{article.readTime || '—'}</span>
                </div>

                <h2 className="mt-4 text-2xl poppins-bold text-neutral-900 leading-tight">
                  {article.title}
                </h2>

                <p className="mt-4 text-neutral-600 poppins-regular flex-1 leading-relaxed">
                  {article.excerpt}
                </p>

                {article.tags?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs uppercase tracking-wide bg-green-500/10 text-green-600 rounded-full poppins-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <motion.div className="mt-8" whileHover={{ x: 4 }}>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-green-600 poppins-semibold hover:text-green-500 transition-colors"
                  >
                    Read Story
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="glass-card border border-white/40 rounded-3xl p-12 text-center text-neutral-500 poppins-medium">
            No blog posts match your filters.
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Blog;
