import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { db } from '../../firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const NewsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const formatContent = (content) => {
    if (!content) return ''
    const hasHTMLTags = /<\/?[a-z][\s\S]*>/i.test(content)
    if (hasHTMLTags) {
      return content
        .replace(/\n\s*\n\s*\n+/g, '\n\n')
        .replace(/\s*<\/?(h[1-6]|p|div|ul|ol|li|blockquote)[^>]*>\s*/gi, (match) =>
          match.trim()
        )
    } else {
      const paragraphs = content.split(/\n\s*\n/)
      return paragraphs
        .filter((p) => p.trim().length > 0)
        .map((p) => {
          const formatted = p.trim().replace(/\n/g, '<br>')
          return `<p class="mb-3">${formatted}</p>`
        })
        .join('')
    }
  }

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true)
        setError(null)
        if (!id) {
          setError('Article ID is missing.')
          setLoading(false)
          return
        }
        const docRef = doc(db, 'news', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setArticle({ ...docSnap.data(), id: docSnap.id })
        } else {
          setError('Article not found.')
          setArticle(null)
        }
      } catch (err) {
        console.error('Error fetching article:', err)
        setError('Failed to load the article. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/30 flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-accent-300 to-primary-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="w-20 h-20 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl font-semibold gradient-text-modern">Loading article...</p>
        </div>
      </div>
    )
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-red-300 to-accent-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-accent-300 to-red-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-8 p-2 rounded-xl btn-modern glass-card flex items-center gap-2 group"
            aria-label="Go back"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeftIcon className="h-5 w-5 text-primary-600 group-hover:text-accent-600 transition-colors" />
            <span className="font-semibold text-primary-600 group-hover:text-accent-600 transition-colors">
              Back
            </span>
          </motion.button>
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-8 border border-red-200">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold gradient-text-modern mb-6">
              Something went wrong
            </h2>
            <p className="text-xl text-dark-600 leading-relaxed">{error}</p>
          </div>
        </div>
      </div>
    )
  }
  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/30 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-neutral-300 to-primary-300 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-to-br from-primary-300 to-neutral-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container mx-auto px-6 py-12 relative z-10">
          <motion.button
            onClick={() => navigate(-1)}
            className="mb-8 p-2 rounded-xl btn-modern glass-card flex items-center gap-2 group"
            aria-label="Go back"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeftIcon className="h-5 w-5 text-primary-600 group-hover:text-accent-600 transition-colors" />
            <span className="font-semibold text-primary-600 group-hover:text-accent-600 transition-colors">
              Back
            </span>
          </motion.button>
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 glass-card rounded-full flex items-center justify-center mx-auto mb-8 border border-neutral-200">
              <svg className="w-12 h-12 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold gradient-text-modern mb-6">Article not found</h2>
            <p className="text-xl text-dark-600 leading-relaxed">
              The article you're looking for doesn't exist or has been removed.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const handleWhatsappShare = () => {
    const text = encodeURIComponent(`${article.title}\n${window.location.href}`)
    const whatsappUrl = `https://wa.me/?text=${text}`
    window.open(whatsappUrl, '_blank')
  }

  const handleXShare = () => {
    const text = encodeURIComponent(article.title)
    const url = encodeURIComponent(window.location.href)
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
    window.open(twitterUrl, '_blank')
  }

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(facebookUrl, '_blank')
  }

  const formattedDate = article.publishDate
    ? new Date(
        article.publishDate.toDate
          ? article.publishDate.toDate()
          : article.publishDate
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : article.date?.toDate
    ? new Date(article.date.toDate()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : String(article.date)
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/30 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-20 w-40 h-40 bg-gradient-to-br from-primary-300 to-accent-300 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 right-24 w-56 h-56 bg-gradient-to-br from-secondary-300 to-primary-300 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-accent-300 to-secondary-300 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>      {article.image && (
        <div className="relative h-96 lg:h-[500px] overflow-hidden mt-20">
          <motion.img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>          <motion.button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 btn-modern glass-card-dark flex items-center gap-2 group border border-white/30"
            aria-label="Go back"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ArrowLeftIcon className="h-5 w-5 text-white group-hover:text-accent-300 transition-colors" />
            <span className="font-semibold text-white group-hover:text-accent-300 transition-colors">
              Back
            </span>
          </motion.button>          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
            <div className="container mx-auto relative z-10">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.3))'
                }}
              >
                {article.title}
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-4 text-white/95"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 poppins-regular">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formattedDate}</span>
                </div>
                {article.author && (
                  <div className="flex items-center gap-2 poppins-regular">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>By {article.author}</span>
                  </div>
                )}
                {article.readTime && (
                  <div className="flex items-center gap-2 poppins-regular">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{article.readTime} min read</span>
                  </div>
                )}                {article.category && (
                  <span className="px-4 py-2 glass-card-dark text-white rounded-2xl text-sm font-semibold border border-white/30">
                    {article.category}
                  </span>
                )}
                {article.featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-accent-500 to-secondary-500 text-white rounded-2xl text-sm font-semibold shadow-lg">
                    ⭐ Featured
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      )}      <div className="container mx-auto px-6 py-12 lg:py-16 relative z-10">
        {!article.image && (
          <div className="max-w-4xl mx-auto mb-12 pt-32">            
          <motion.button
              onClick={() => navigate(-1)}
              className="mb-8 p-2 rounded-xl btn-modern glass-card flex items-center gap-2 group"
              aria-label="Go back"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ArrowLeftIcon className="h-5 w-5 text-primary-600 group-hover:text-accent-600 transition-colors" />
              <span className="font-semibold text-primary-600 group-hover:text-accent-600 transition-colors">
                Back
              </span>
            </motion.button>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-modern mb-8 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {article.title}
            </motion.h1>            <motion.div
              className="flex flex-wrap items-center gap-4 text-dark-600 pb-8 border-b border-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-2 poppins-regular">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{formattedDate}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-2 poppins-regular">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>By {article.author}</span>
                </div>
              )}
              {article.readTime && (
                <div className="flex items-center gap-2 poppins-regular">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{article.readTime} min read</span>
                </div>
              )}
              {article.category && (
                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm poppins-medium">
                  {article.category}
                </span>
              )}
              {article.featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-accent to-secondary text-white rounded-full text-sm poppins-medium">
                  ⭐ Featured
                </span>
              )}
            </motion.div>
          </div>
        )}
        <motion.article
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: article.image ? 0.3 : 0.6 }}
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12 border border-white/30 backdrop-blur-xl">
            {article.summary && (              <div className="mb-12 pb-8 border-b border-white/20">
                <h2 className="text-2xl font-bold gradient-text-modern mb-6">
                  Summary
                </h2>
                <p className="text-xl text-dark-700 leading-relaxed italic font-medium">
                  {article.summary}
                </p>
              </div>
            )}
            <div
              className="prose prose-lg max-w-none mx-auto article-content"
              style={{
                fontFamily: 'Poppins, sans-serif',
                lineHeight: '1.8',
                fontSize: '1.1rem',
              }}
              dangerouslySetInnerHTML={{
                __html: formatContent(article.content),
              }}
            />
            {article.tags && article.tags.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-primary mb-4 poppins-semibold">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-accent/10 to-secondary/10 text-primary border border-accent/20 rounded-full text-sm poppins-medium hover:bg-accent hover:text-white transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(article.source || article.location) && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.source && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2 poppins-semibold flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
                        </svg>
                        Source
                      </h4>
                      <p className="text-gray-600 poppins-regular">{article.source}</p>
                    </div>
                  )}
                  {article.location && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2 poppins-semibold flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Location
                      </h4>
                      <p className="text-gray-600 poppins-regular">{article.location}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm text-gray-500 poppins-regular">
                    Published on
                  </span>
                  <span className="text-sm font-medium text-primary poppins-medium">
                    {formattedDate}
                  </span>
                  {article.lastModified && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500 poppins-regular">
                        Last updated{' '}
                        {new Date(
                          article.lastModified.toDate
                            ? article.lastModified.toDate()
                            : article.lastModified
                        ).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 poppins-regular">
                    Share:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleWhatsappShare}
                      className="w-8 h-8 text-white flex items-center justify-center transition-colors"
                      aria-label="Share via WhatsApp"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                      <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
                    </svg>
                    </button>
                    <button
                      onClick={handleXShare}
                      className="w-8 h-8  text-white flex items-center justify-center transition-colors"
                      aria-label="Share via X"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                      <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
                    </svg>
                    </button>
                    <button
                      onClick={handleFacebookShare}
                      className="w-8 h-8  text-white flex items-center justify-center transition-colors"
                      aria-label="Share via Facebook"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                      <path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"></path>
                    </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.article>        
        <motion.div
          className="mt-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-accent-600 transition-colors duration-300 font-medium text-lg group"
          >
            <ArrowLeftIcon className="h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default NewsDetail
