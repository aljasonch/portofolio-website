import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Removed useNavigate
import { motion } from 'framer-motion';
// Removed ArrowLeftIcon import
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'; // Import Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // Import Skeleton CSS

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Get unique categories from news items
  const categories = ['All', ...new Set(newsItems.map(item => item.category).filter(Boolean))];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const newsCollectionRef = collection(db, 'news');
        const q = query(newsCollectionRef, orderBy('date', 'desc')); 
        const data = await getDocs(q);
        const fetchedNews = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setNewsItems(fetchedNews);
        setFilteredNews(fetchedNews);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError('Failed to load news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Filter news based on category and search term
  useEffect(() => {
    let filtered = newsItems;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  }, [newsItems, selectedCategory, searchTerm]);

  return (    <section id="news" className="relative pt-32 pb-20 bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/30 text-dark-800 min-h-screen overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-20 w-40 h-40 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-24 w-56 h-56 bg-gradient-to-br from-secondary-300 to-primary-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-accent-300 to-secondary-300 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-6xl font-bold gradient-text-modern mb-6">
            Latest News
          </h2>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest announcements, insights, and stories
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 mx-auto mt-8 rounded-full"></div>
        </motion.div>

        {/* Search and Filter Section */}        <motion.div 
          className="glass-card mb-12 p-8 rounded-3xl border border-white/30 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-white/30 rounded-2xl leading-5 bg-white/50 backdrop-blur-sm placeholder-dark-400 focus:outline-none focus:placeholder-dark-300 focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-dark-700">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg scale-105'
                        : 'glass-card text-dark-700 hover:bg-white/70 hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}            <div className="flex items-center gap-2 glass-card rounded-2xl p-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' ? 'bg-white shadow-lg text-primary-600 scale-110' : 'text-dark-500 hover:text-primary-600'
                }`}
                aria-label="Grid view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'bg-white shadow-lg text-primary-600 scale-110' : 'text-dark-500 hover:text-primary-600'
                }`}
                aria-label="List view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Results Counter */}          <div className="mt-6 pt-6 border-t border-white/30">
            <p className="text-sm text-dark-600">
              Showing {filteredNews.length} of {newsItems.length} articles
              {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>
        </motion.div>{loading && (
          <SkeletonTheme baseColor="#f1f5f9" highlightColor="#ffffff">
            <div className="space-y-12">
              {/* Featured article skeleton */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-5/12">
                    <Skeleton height={320} />
                  </div>
                  <div className="p-8 md:w-7/12">
                    <Skeleton height={32} width="90%" className="mb-4" />
                    <Skeleton height={20} width="60%" className="mb-4" />
                    <Skeleton count={3} height={18} className="mb-6" />
                  </div>
                </div>
              </div>
              
              {/* Regular articles skeleton */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <Skeleton height={220} />
                    <div className="p-6">
                      <Skeleton height={24} width="85%" className="mb-3" />
                      <Skeleton height={16} width="50%" className="mb-3" />
                      <Skeleton count={2} height={16} className="mb-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SkeletonTheme>
        )}        {error && (
          <motion.div 
            className="text-center py-12 bg-red-50 border-2 border-red-200 text-red-700 rounded-2xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold poppins-semibold mb-2">Oops! Something went wrong</h3>
              <p className="poppins-regular">{error}</p>
            </div>
          </motion.div>
        )}        {!loading && !error && filteredNews.length === 0 && newsItems.length > 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold poppins-semibold text-gray-700 mb-2">No matching articles found</h3>
              <p className="text-gray-500 poppins-regular mb-4">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="px-6 py-2 bg-accent text-white rounded-full hover:bg-accent/90 transition-colors poppins-medium"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}

        {!loading && !error && newsItems.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold poppins-semibold text-gray-700 mb-2">No news articles yet</h3>
              <p className="text-gray-500 poppins-regular">Check back later for the latest updates and announcements.</p>
            </div>
          </motion.div>
        )}

        {!loading && !error && filteredNews.length > 0 && (
          <div className="space-y-12">
            {/* Featured Article - First item */}
            {filteredNews[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group"
              >                <Link to={`/news/${filteredNews[0].id}`} className="block">
                  <div className="glass-card rounded-3xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl border border-white/30 backdrop-blur-xl">
                    <div className="flex flex-col lg:flex-row">
                      {filteredNews[0].image && (
                        <div className="w-full lg:w-1/2 h-80 lg:h-96 overflow-hidden relative">
                          <img 
                            src={filteredNews[0].image} 
                            alt={filteredNews[0].title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      <div className={`p-8 lg:p-10 flex flex-col justify-center ${filteredNews[0].image ? 'lg:w-1/2' : 'w-full'}`}>                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-4 py-2 bg-gradient-to-r from-accent-500 to-secondary-500 text-white text-sm rounded-2xl font-semibold shadow-lg">
                            Featured
                          </span>
                          {filteredNews[0].category && (
                            <span className="px-4 py-2 glass-card text-primary-600 text-sm rounded-2xl font-semibold">
                              {filteredNews[0].category}
                            </span>
                          )}
                        </div>
                        <h3 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text-modern group-hover:text-accent-600 transition-colors duration-300 leading-tight">
                          {filteredNews[0].title}
                        </h3>
                        <p className="text-sm text-dark-500 mb-4 flex items-center gap-2 font-medium">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {filteredNews[0].date?.toDate ? new Date(filteredNews[0].date.toDate()).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : String(filteredNews[0].date)}
                        </p>
                        <p className="text-gray-600 text-base leading-relaxed poppins-regular line-clamp-4 mb-6">
                          {filteredNews[0].summary}
                        </p>
                        <div className="flex items-center text-accent group-hover:text-primary transition-colors duration-300">
                          <span className="poppins-semibold">Read more</span>
                          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Regular Articles Grid/List - Remaining items */}
            {filteredNews.length > 1 && (
              <div>
                <motion.h3 
                  className="text-2xl font-bold text-primary poppins-bold mb-8 text-center lg:text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  More Stories
                </motion.h3>
                
                {viewMode === 'grid' ? (
                  // Grid View
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.slice(1).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                        className="group"
                      >
                        <Link to={`/news/${item.id}`} className="block h-full">
                          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform group-hover:scale-105 transition-all duration-300 h-full flex flex-col hover:shadow-xl border border-gray-100">
                            {item.image && (
                              <div className="w-full h-56 overflow-hidden relative">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                            )}
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-center justify-between mb-3">
                                <p className="text-xs text-gray-500 poppins-regular flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {item.date?.toDate ? new Date(item.date.toDate()).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    year: 'numeric' 
                                  }) : String(item.date)}
                                </p>
                                {item.category && (
                                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full poppins-medium">
                                    {item.category}
                                  </span>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold mb-3 text-primary poppins-semibold group-hover:text-accent transition-colors duration-300 leading-tight line-clamp-2">
                                {item.title}
                              </h3>
                              <p className="text-gray-600 text-sm poppins-regular line-clamp-3 flex-grow mb-4 leading-relaxed">
                                {item.summary}
                              </p>
                              <div className="flex items-center text-accent text-sm group-hover:text-primary transition-colors duration-300">
                                <span className="poppins-medium">Read article</span>
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // List View
                  <div className="space-y-6">
                    {filteredNews.slice(1).map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
                        className="group"
                      >
                        <Link to={`/news/${item.id}`} className="block">
                          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform group-hover:scale-[1.01] transition-all duration-300 hover:shadow-xl border border-gray-100">
                            <div className="flex flex-col md:flex-row">
                              {item.image && (
                                <div className="w-full md:w-1/3 h-48 md:h-32 overflow-hidden relative">
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                </div>
                              )}
                              <div className={`p-6 flex flex-col justify-center ${item.image ? 'md:w-2/3' : 'w-full'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                  <p className="text-xs text-gray-500 poppins-regular flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {item.date?.toDate ? new Date(item.date.toDate()).toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric', 
                                      year: 'numeric' 
                                    }) : String(item.date)}
                                  </p>
                                  {item.category && (
                                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full poppins-medium">
                                      {item.category}
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-primary poppins-semibold group-hover:text-accent transition-colors duration-300 leading-tight">
                                  {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm poppins-regular line-clamp-2 mb-3 leading-relaxed">
                                  {item.summary}
                                </p>
                                <div className="flex items-center text-accent text-sm group-hover:text-primary transition-colors duration-300">
                                  <span className="poppins-medium">Read article</span>
                                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
