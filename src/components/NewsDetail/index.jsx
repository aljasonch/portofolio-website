import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid'; // Import arrow icon
import { db } from '../../firebaseConfig'; // Import Firestore instance
import { doc, getDoc } from 'firebase/firestore';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          setError("Article ID is missing.");
          setLoading(false);
          return;
        }
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle({ ...docSnap.data(), id: docSnap.id });
        } else {
          setError('Article not found.');
          setArticle(null); // Ensure article is null if not found
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError('Failed to load the article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 text-center min-h-screen flex justify-center items-center">
        <p className="text-xl poppins-medium">Loading article...</p>
        {/* You can add a spinner animation here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12 min-h-screen relative"> {/* Adjusted py */}
        <motion.button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-0 z-10 p-2 bg-white dark:bg-neutral-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-neutral-600 transition-colors" // Positioned left-0
          aria-label="Go back"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ArrowLeftIcon className="h-5 w-5 text-primary dark:text-primary-dark" /> {/* Slightly smaller icon */}
        </motion.button>
        <div className="pt-16 text-center"> {/* Added wrapper for centering content below arrow */}
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Error</h2> {/* Adjusted font size */}
          <p className="text-base md:text-lg mb-6">{error}</p> {/* Adjusted font size */}
        </div>
      </div>
    );
  }

  if (!article) { // Handles case where article is not found after loading and no error during fetch
    return (
      <div className="container mx-auto px-6 py-12 min-h-screen relative"> {/* Adjusted py */}
         <motion.button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-0 z-10 p-2 bg-white dark:bg-neutral-700 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-neutral-600 transition-colors" // Positioned left-0
          aria-label="Go back"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ArrowLeftIcon className="h-5 w-5 text-primary dark:text-primary-dark" /> {/* Slightly smaller icon */}
        </motion.button>
        <div className="pt-16 text-center"> {/* Added wrapper for centering content below arrow */}
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Article not found</h2> {/* Adjusted font size */}
        </div>
      </div>
    );
  }

  return (
    <motion.section 
      className="py-12 bg-neutralBg text-neutralText min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        {/* Arrow button is now inside the article tag */}
        <article className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl p-6 md:p-8 lg:p-10 relative"> {/* Added relative positioning to article */}
          <motion.button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 md:top-6 md:left-6 z-10 p-2 bg-white dark:bg-neutral-700 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-neutral-600 transition-colors" // Positioned inside article
              aria-label="Go back"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ArrowLeftIcon className="h-5 w-5 text-primary dark:text-primary-dark" />
          </motion.button>
          <motion.h1 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary dark:text-primary-dark mb-4 poppins-bold leading-tight pt-12 md:pt-10 text-center md:text-left" // Added padding top for title, centered on small screens
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {article.title}
          </motion.h1>

          <motion.div 
            className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-5 poppins-regular space-x-2" // Adjusted font size and margin
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span>Published on {article.date?.toDate ? new Date(article.date.toDate()).toLocaleDateString() : String(article.date)}</span>
            {article.category && (
              <>
                <span>&bull;</span>
                <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">{article.category}</span>
              </>
            )}
            {/* You can add author here if available */}
          </motion.div>
          
          {article.image && (
            <motion.img 
              src={article.image} 
              alt={article.title} 
              className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-lg" // Increased max-h, rounded-xl
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          )}
          
          {/* Apply prose styling for rich text content. Adjust max-width as needed. */}
          {/* Common widths: max-w-2xl, max-w-3xl, max-w-4xl. prose-lg for larger text. */}
          {/* Added whitespace-pre-line to preserve newline characters from plain text input */}
          <motion.div
            className="prose prose-base md:prose-lg dark:prose-invert max-w-none mx-auto poppins-regular text-neutralText dark:text-neutral-300 article-content whitespace-pre-line" // Adjusted prose size, max-w-none
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            dangerouslySetInnerHTML={{ __html: article.content }}
           />
          {/* 
            Tailwind Typography `prose` classes will style common HTML elements:
            - h1, h2, h3, h4, h5, h6 (Adjusted by prose-base/lg)
            - p (paragraphs) (Adjusted by prose-base/lg)
            - a (links)
            - ul, ol, li (lists)
            - blockquote
            - pre, code (code blocks)
            - strong, em (bold, italic)
            - hr (horizontal rules)
            - img (images within content)
            You can customize these further in tailwind.config.js if needed.
            https://tailwindcss.com/docs/typography-plugin
          */}

          {/* The explicit "Back to News" button at the bottom is removed as per the new requirement. */}
          {/* The arrow button at the top left now serves as the primary back navigation. */}
        </article>
      </div>
    </motion.section>
  );
};

export default NewsDetail;
