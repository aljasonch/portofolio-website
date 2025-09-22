import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError('');

        const postQuery = query(
          collection(db, 'blogPosts'),
          where('slug', '==', slug),
          limit(1)
        );
        const snapshot = await getDocs(postQuery);

        if (snapshot.empty) {
          setPost(null);
          setError('Article not found.');
          setOtherPosts([]);
          return;
        }

        const docSnap = snapshot.docs[0];
        const data = docSnap.data();
        const hydratedPost = {
          id: docSnap.id,
          ...data,
          date: data.date?.toDate ? data.date.toDate() : data.date ? new Date(data.date) : null,
        };
        setPost(hydratedPost);

        const relatedQuery = query(
          collection(db, 'blogPosts'),
          orderBy('date', 'desc'),
          limit(4)
        );
        const relatedSnapshot = await getDocs(relatedQuery);
        const related = relatedSnapshot.docs
          .filter((doc) => doc.id !== docSnap.id)
          .map((doc) => {
            const info = doc.data();
            return {
              id: doc.id,
              ...info,
              date: info.date?.toDate ? info.date.toDate() : info.date ? new Date(info.date) : null,
            };
          });
        setOtherPosts(related);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load the article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
        <div className="pt-32 pb-24 section-gradient">
          <div className="container mx-auto px-6 max-w-4xl">
            <Skeleton width={140} height={18} />
            <Skeleton className="mt-4" height={44} />
            <Skeleton className="mt-6" height={20} count={6} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-32 pb-20 min-h-screen section-gradient flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl poppins-bold text-green-600 mb-4">{error || 'Article not found'}</h1>
          <p className="text-neutral-600 poppins-regular mb-8">
            The blog post you are looking for doesn’t exist or may have been moved.
          </p>
          <Link
            to="/blog"
            className="btn-modern inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      className="pt-32 pb-24 section-gradient relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 right-16 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-16 left-12 w-56 h-56 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-green-600 poppins-medium hover:text-green-500 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all stories
        </Link>

        <header className="mt-8">
          <span className="text-sm text-neutral-500 poppins-medium">
            {post.date ? post.date.toLocaleDateString() : 'Unscheduled'} • {post.readTime || '—'}
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl poppins-bold text-green-600">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs uppercase tracking-wide bg-green-500/10 text-green-600 rounded-full poppins-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.image && (
          <div className="mt-10 overflow-hidden rounded-3xl shadow-2xl">
            <img src={post.image} alt={post.title} className="w-full max-h-[460px] object-cover" />
          </div>
        )}

        <article className="mt-12 glass-card border border-white/40 rounded-3xl p-10 backdrop-blur-xl text-neutral-700 leading-relaxed poppins-regular shadow-xl">
          {post.content
            ?.split(/\n\s*\n/)
            .filter((block) => block.trim().length > 0)
            .map((paragraph, index) => (
              <p key={index} className="mb-6 last:mb-0">
                {paragraph.trim()}
              </p>
            ))}
        </article>

        {otherPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl poppins-bold text-neutral-900 mb-6">Continue exploring</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherPosts.map((article) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.slug}`}
                  className="glass-card border border-white/40 rounded-2xl p-6 hover:border-primary-300/70 transition-all duration-300"
                >
                  <div className="text-sm text-neutral-500 poppins-medium">
                    {article.date ? article.date.toLocaleDateString() : 'Unscheduled'} • {article.readTime || '—'}
                  </div>
                  <h3 className="mt-3 text-xl poppins-bold text-neutral-900">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-neutral-600 text-sm leading-relaxed">
                    {article.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-green-600 text-sm poppins-semibold">
                    Read story
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default BlogDetail;
