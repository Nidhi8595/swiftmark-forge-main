import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Bookmark, User, Home, LogOut } from 'lucide-react';

// Modern Sparkle Animation
const Sparkle = () => (
  <motion.svg
    initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0.7, 1.3, 0.7], rotate: [0, 180, 360] }}
    transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute -top-3 -right-3 pointer-events-none"
  >
    <g>
      <circle cx="10" cy="10" r="2.5" fill="#38bdf8" />
      <path d="M10 2V0M10 20v-2M2 10H0M20 10h-2M16.95 16.95l-1.41-1.41M3.05 3.05l1.41 1.41M16.95 3.05l-1.41 1.41M3.05 16.95l1.41-1.41" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round"/>
    </g>
  </motion.svg>
);

// Animated Bookmark Rain
const BookmarkRain = () => (
  <AnimatePresence>
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -40, opacity: 0, x: i * 18 - 18 }}
        animate={{ y: 50, opacity: [0, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{ delay: i * 0.25, duration: 1.3, repeat: Infinity, repeatDelay: 2 }}
        className="absolute left-1/2"
        style={{ zIndex: 0 }}
      >
        <Bookmark className="h-4 w-4 text-sky-400 drop-shadow-lg" />
      </motion.div>
    ))}
  </AnimatePresence>
);

// Glassmorphism + Neon Glow Navbar
const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    ...(user ? [
      { name: 'Dashboard', path: '/dashboard', icon: User },
      { name: 'Profile', path: '/users', icon: User },
      { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    ] : []),
  ];

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-white/70 via-blue-50/60 to-white/70 border-b border-blue-100/60 backdrop-blur-xl shadow-xl"
      style={{
        boxShadow: '0 4px 32px 0 rgba(56,189,248,0.10), 0 1.5px 0 0 #38bdf8',
      }}
    >
      <div className="container flex h-20 items-center justify-between px-6 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 relative group">
          <motion.div
            whileHover={{ scale: 1.10, rotate: 2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center space-x-3 relative"
          >
            <span className="relative">
              <Bookmark className="h-8 w-8 text-sky-500 drop-shadow-[0_0_8px_#38bdf8]" />
              <Sparkle />
              <BookmarkRain />
            </span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-500 bg-clip-text text-transparent tracking-tight drop-shadow-[0_2px_8px_rgba(56,189,248,0.15)] animate-gradient">
              MarkSphere
            </span>
          </motion.div>
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-sky-400/80 via-blue-400/60 to-transparent rounded-full blur-sm opacity-70 group-hover:w-full transition-all duration-500" />
        </Link>

        {/* Navigation */}
        <div className="flex items-center space-x-8">
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.name} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.09, rotate: 1 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative"
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="lg"
                      className={`transition-all relative px-5 py-2 rounded-xl font-semibold shadow-sm ${
                        isActive
                          ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-[0_2px_12px_0_rgba(56,189,248,0.15)]"
                          : "hover:bg-sky-50/80"
                      }`}
                      style={isActive ? { boxShadow: '0 0 0 2px #38bdf8, 0 2px 12px 0 rgba(56,189,248,0.10)' } : {}}
                    >
                      <Icon className="h-5 w-5 mr-2" />
                      {item.name}
                      {item.name === 'Bookmarks' && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="absolute -top-3 -right-3"
                        >
                          <Sparkle />
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="hidden lg:inline text-lg font-serif italic text-sky-700 mr-10 scale-y-110 tracking-wide opacity-90">
                “Your personal sphere of saved bookmarks”
              </span>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={logout}
                  className="transition-all border-sky-400/60 hover:bg-sky-50/80 rounded-xl font-semibold"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="transition-all rounded-xl font-semibold hover:bg-sky-50/80"
                  >
                    Login
                  </Button>
                </motion.div>
              </Link>
              <Link to="/signup">
                <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.96 }}>
                  <Button
                    size="lg"
                    className="transition-all bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-semibold shadow-[0_2px_12px_0_rgba(56,189,248,0.15)] hover:from-blue-500 hover:to-sky-400"
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;