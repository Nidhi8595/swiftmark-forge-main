import React from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

import {
  ArrowRight, Bookmark,
  Shield,
  Zap,
  Globe,
  Users,
  Heart,
  Github,
  Twitter,
  Mail
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Animated floating bookmarks background
const FloatingBookmarks = () => {
  const bookmarks = Array.from({ length: 10 });
  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      {bookmarks.map((_, i) => {
        const delay = Math.random() * 6;
        const left = Math.random() * 90 + 2;
        const size = Math.random() * 32 + 24;
        return (
          <motion.div
            key={i}
            initial={{ y: '110vh', opacity: 0.5 }}
            animate={{ y: '-10vh', opacity: 0.8 }}
            transition={{
              duration: 10 + Math.random() * 6,
              delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: `${left}%`,
              width: size,
              height: size,
              zIndex: 0,
              opacity: 0.6
            }}
          >
            <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
              <rect x="12" y="6" width="32" height="44" rx="6" fill="#3B82F6" />
              <path d="M16 10C16 8.89543 16.8954 8 18 8H38C39.1046 8 40 8.89543 40 10V46L28 38L16 46V10Z" fill="#FBBF24" />
              <ellipse cx="28" cy="20" rx="4" ry="2" fill="#FFF" />
              <circle cx="24" cy="18" r="1" fill="#333" />
              <circle cx="32" cy="18" r="1" fill="#333" />
              <path d="M24 22 Q28 25 32 22" stroke="#333" strokeWidth="1.2" fill="none" />
            </svg>
          </motion.div>
        );
      })}
    </div>
  );
};


// Animated sparkle effect for hero
const Sparkle = () => (
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{
      opacity: [0.2, 0.8, 0.2],
      scale: [0.7, 1.1, 0.7]
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }}
  >
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
      <g filter="url(#sparkle)">
        <circle cx="60" cy="60" r="30" fill="#FBBF24" fillOpacity="0.15" />
        <circle cx="60" cy="60" r="18" fill="#3B82F6" fillOpacity="0.12" />
      </g>
      <defs>
        <filter id="sparkle" x="0" y="0" width="120" height="120" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
    </svg>
  </motion.div>
);

// Animated "Bookmark Trail" under hero
const BookmarkTrail = () => (
  <motion.div
    className="flex justify-center mt-8"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.12
        }
      }
    }}
  >
    {[...Array(7)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: 20, opacity: 0, scale: 0.8 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: i * 0.12 }}
        className="mx-1"
      >
        <svg width="32" height="32" viewBox="0 0 56 56" fill="none">
          <rect x="12" y="6" width="32" height="44" rx="6" fill="#3B82F6" />
          <path d="M16 10C16 8.89543 16.8954 8 18 8H38C39.1046 8 40 8.89543 40 10V46L28 38L16 46V10Z" fill="#FBBF24" />
          <ellipse cx="28" cy="20" rx="4" ry="2" fill="#FFF" />
          <circle cx="24" cy="18" r="1" fill="#333" />
          <circle cx="32" cy="18" r="1" fill="#333" />
          <path d="M24 22 Q28 25 32 22" stroke="#333" strokeWidth="1.2" fill="none" />
        </svg>
      </motion.div>
    ))}
  </motion.div>
);

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Bookmark,
      title: 'Smart Organization',
      description: 'Organize your bookmarks with intelligent tagging, search functionality, and custom categories for easy retrieval.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade JWT authentication and secure API endpoints. Privacy is our priority.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern React and optimized for performance. Experience smooth interactions and instant loading times.'
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Access your bookmarks from anywhere, on any device. Fully responsive design that works seamlessly everywhere.'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Designed with user experience at the forefront. Clean interface, intuitive navigation, and thoughtful interactions.'
    },
    {
      icon: Heart,
      title: 'Made with Care',
      description: 'Crafted by developers who understand the importance of keeping your favorite content organized and accessible.'
    }
  ];

  // Animated confetti for CTA
  const Confetti = () => (
    <AnimatePresence>
      <motion.div
        className="pointer-events-none absolute inset-0 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ zIndex: 30 }}
      >
        {[...Array(18)].map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 1.5;
          const color = ['#3B82F6', '#FBBF24', '#fff', '#6366F1'][i % 4];
          return (
            <motion.div
              key={i}
              initial={{ y: -40, opacity: 0.7 }}
              animate={{ y: 400, opacity: 0.9 }}
              transition={{
                duration: 2.2 + Math.random(),
                delay,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeIn'
              }}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: 0
              }}
            >
              <svg width="18" height="18" viewBox="0 0 56 56" fill="none">
                <rect x="12" y="6" width="32" height="44" rx="6" fill={color} />
                <ellipse cx="28" cy="20" rx="4" ry="2" fill="#FFF" />
              </svg>
            </motion.div>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen relative">
      <FloatingBookmarks />
      {/* <AnimatedRibbon /> */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-soft py-20">
        <Sparkle />
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex  justify-center  mb-6"
            >
              {/* Cute bookmark SVG */}
              <svg width="100" height="100" viewBox="0 0 56 56" fill="none" className='hover:scale-125 animate-pulse transition-transform delay-1500'>
                <rect x="12" y="6" width="32" height="44" rx="6" fill="#3B82F6" />
                <path d="M16 10C16 8.89543 16.8954 8 18 8H38C39.1046 8 40 8.89543 40 10V46L28 38L16 46V10Z" fill="#FBBF24" />
                <ellipse cx="28" cy="20" rx="4" ry="2" fill="#FFF" />
                <circle cx="24" cy="18" r="1" fill="#333" />
                <circle cx="32" cy="18" r="1" fill="#333" />
                <path d="M24 22 Q28 25 32 22" stroke="#333" strokeWidth="1.2" fill="none" />
              </svg>
            </motion.div>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl pb-3 md:text-6xl"
            >
              Organize Your
              <span className="text-blue-700"> Bookmarks</span>
              <br />
              Like Never Before
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-10 mb-5 max-w-2xl text-lg italic text-grey-400"
            >
              A beautiful, modern bookmark manager that helps you save, organize, and access your favorite websites with ease. Built with security and simplicity in mind.
            </motion.p>

            <div className="flex flex-wrap justify-center gap-6 text-sm italic">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Launched in 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span>Built with React & NestJS</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-warning rounded-full" />
                <span>Open Source</span>
              </div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="group transition-smooth hover:bg-blue-950 shadow-2xl">
                    Proceed to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 " />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button size="lg" className="group transition-smooth">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg" className="transition-smooth">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>
            {/* <BookmarkTrail /> */}
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </section >

      {/* Features Section */}
      < section className="py-20" >
        <div className="container mx-auto px-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Why Choose MarkSphere?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built MarkSphere with the features that matter most to modern users. Every detail has been carefully crafted for the best possible experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{
                    y: -4,
                    scale: 1.07,
                    boxShadow: '0 8px 32px 0 rgba(59,130,246,0.15)'
                  }}
                  className="group"
                >
                  <Card className="h-full rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-smooth relative overflow-visible">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <div className="inline-flex p-3 rounded-xl bg-primary-soft group-hover:bg-primary group-hover:text-white transition-smooth relative">
                          <Icon className="h-6 w-6 text-primary group-hover:text-white transition-smooth" />
                          <motion.div
                            className="absolute -top-3 -right-3"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                          >
                            <svg width="18" height="18" viewBox="0 0 56 56" fill="none">
                              <rect x="12" y="6" width="32" height="44" rx="6" fill="#FBBF24" />
                            </svg>
                          </motion.div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-smooth">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section >

      {/* Mission Section */}
      <section className="py-20 bg-gradient-accent relative">
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none -z-10">
          <motion.svg
            width="100%"
            height="100"
            viewBox="0 0 1440 100"
            fill="none"
            initial={{ y: 30 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, type: 'spring' }}
          >
            <path
              d="M0,80 Q360,20 720,80 T1440,80 V100 H0 Z"
              fill="#3B82F6"
              fillOpacity="0.08"
            />
          </motion.svg>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-6 sm:text-4xl">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe that managing your digital bookmarks should be simple, secure, and enjoyable. Our mission is to provide a bookmark management solution that not only meets your current needs but anticipates your future requirements as the web continues to evolve.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're a casual web user or a power user with thousands of bookmarks, MarkSphere is designed to scale with you, keeping your digital life organized and your favorite content always within reach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      {
        !user && (
          <section className="py-20 bg-black/80 relative overflow-hidden">
            <Confetti />
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-10">
                  Ready to Get Started?
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/signup">
                    <Button variant="secondary" size="lg" className="transition-smooth">
                      Create Free Account
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        )
      }
    </div >
  );
};

export default Home;