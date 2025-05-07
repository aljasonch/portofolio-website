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
  // Removed navigate initialization

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const newsCollectionRef = collection(db, 'news');
        // Order by 'date' in descending order to show newest first
        // Ensure your Firestore documents have a 'date' field (Timestamp or ISO string for ordering)
        const q = query(newsCollectionRef, orderBy('date', 'desc')); 
        const data = await getDocs(q);
        const fetchedNews = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setNewsItems(fetchedNews);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError('Failed to load news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="news" className="py-16 bg-neutralBg text-neutralText min-h-screen"> {/* Removed relative positioning */}
      <div className="container mx-auto px-6">
        {/* Back Arrow Button REMOVED */}

        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-primary poppins-bold" // Removed pt-8 md:pt-0
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Latest News
        </motion.h2>

        {loading && (
          <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Consistent gap */}
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden">
                  <Skeleton height={192} /> {/* Adjusted to match h-48 (192px) for regular cards */}
                  <div className="p-4">
                    <Skeleton height={24} width="80%" className="mb-2" />
                    <Skeleton height={18} width="50%" className="mb-2" />
                    <Skeleton count={2} height={18} className="mb-3" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonTheme>
        )}

        {error && (
          <div className="text-center py-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!loading && !error && newsItems.length === 0 && (
          <div className="text-center py-10">
            <p className="text-lg poppins-medium">No news articles found at the moment.</p> {/* Adjusted font size */}
          </div>
        )}

        {!loading && !error && newsItems.length > 0 && (
          <div>
            {/* Featured Article - First item */}
            {newsItems[0] && (
              <Link to={`/news/${newsItems[0].id}`} className="block mb-10 group"> {/* Adjusted margin, make whole area clickable */}
                <motion.div
                  key={newsItems[0].id}
                  className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden transform group-hover:scale-[1.01] transition-transform duration-300 flex flex-col md:flex-row"
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  custom={0}
                  whileHover={{ boxShadow: "0px 10px 25px rgba(0,0,0,0.2)" }}
                >
                  {newsItems[0].image && (
                    <div className="w-full md:w-5/12 h-64 overflow-hidden"> {/* Fixed height container for image */}
                      <img src={newsItems[0].image} alt={newsItems[0].title} className="w-full h-full object-cover"/>
                    </div>
                  )}
                  <div className={`p-5 md:p-6 flex flex-col justify-center ${newsItems[0].image ? 'md:w-7/12' : 'w-full'}`}>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2 text-primary dark:text-primary-dark poppins-bold group-hover:text-accent transition-colors duration-300">{newsItems[0].title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 poppins-regular"> {/* Adjusted font size and margin */}
                      {newsItems[0].date?.toDate ? new Date(newsItems[0].date.toDate()).toLocaleDateString() : String(newsItems[0].date)}
                       {newsItems[0].category && <span className="ml-2 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-full poppins-medium">{newsItems[0].category}</span>}
                    </p>
                    <p className="text-neutralText dark:text-neutral-300 text-sm mb-4 poppins-regular line-clamp-3">{newsItems[0].summary}</p> {/* Adjusted font size, margin and line-clamp */}
                  </div>
                </motion.div>
              </Link>
            )}

            {/* Regular Articles Grid - Remaining items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Adjusted gap */}
              {newsItems.slice(1).map((item, index) => (
                <Link to={`/news/${item.id}`} key={item.id} className="block group"> {/* Make whole area clickable */}
                  <motion.div
                    className="bg-white dark:bg-neutral-800 rounded-lg shadow-md overflow-hidden transform group-hover:scale-105 transition-transform duration-300 h-full flex flex-col" // Ensure consistent height for cards in a row
                    custom={index + 1}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{ boxShadow: "0px 8px 16px rgba(0,0,0,0.15)" }}
                  >
                    {item.image && (
                       <div className="w-full h-48 overflow-hidden"> {/* Fixed height container for image */}
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold mb-1 text-primary dark:text-primary-dark poppins-semibold group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {item.date?.toDate ? new Date(item.date.toDate()).toLocaleDateString() : String(item.date)}
                        {item.category && <span className="ml-2 px-1.5 py-0.5 bg-accent/10 text-accent text-xs rounded-full poppins-light">{item.category}</span>}
                      </p>
                      <p className="text-neutralText dark:text-neutral-300 text-sm mb-3 poppins-regular line-clamp-3 flex-grow">{item.summary}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
