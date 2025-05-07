// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Navbar from './components/navbar';
import ScrollToTopButton from './components/ScrollToTopButton';
import News from './components/News';
import NewsDetail from './components/NewsDetail';
import NotFound from './components/NotFound';
import LoginPage from './components/Admin/LoginPage';
import ProtectedRoute from './components/Admin/ProtectedRoute';
import AdminManageNews from './components/Admin/AdminManageNews';

function App() {
  // scrollToSection is no longer needed here as navigation will be handled by React Router
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar /> {/* scrollToSection prop removed */}
        <Routes>
          <Route path="/" element={<About />} /> {/* Assuming About is the home page */}
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/manage-news" element={<AdminManageNews />} />
            {/* Add other protected admin routes here if needed */}
          </Route>

          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
        </Routes>
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
