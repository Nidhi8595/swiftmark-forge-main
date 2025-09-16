import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Bookmark, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Heart,
  Github,
  Twitter,
  Mail
} from 'lucide-react';

const About = () => {
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

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '1M+', label: 'Bookmarks Saved' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-2xl bg-primary-soft">
                <Bookmark className="h-12 w-12 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-6 sm:text-5xl">
              About <span className="text-gradient">BookmarkApp</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              BookmarkApp is a modern, secure, and intuitive bookmark management solution designed to help you organize and access your favorite websites effortlessly. Built with cutting-edge technology and a focus on user experience, we make bookmark management a breeze.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-success rounded-full" />
                <span>Launched in 2024</span>
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
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
              Why Choose BookmarkApp?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built BookmarkApp with the features that matter most to modern users. Every detail has been carefully crafted for the best possible experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <Card className="h-full hover:shadow-large transition-smooth">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <div className="inline-flex p-3 rounded-xl bg-primary-soft group-hover:bg-primary group-hover:text-white transition-smooth">
                          <Icon className="h-6 w-6 text-primary group-hover:text-white transition-smooth" />
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
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-accent">
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
              Whether you're a casual web user or a power user with thousands of bookmarks, BookmarkApp is designed to scale with you, keeping your digital life organized and your favorite content always within reach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions, suggestions, or just want to say hello? We'd love to hear from you. Our team is always here to help and improve your BookmarkApp experience.
            </p>
            
            <div className="flex justify-center space-x-6">
              <a href="mailto:hello@bookmarkapp.com" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-5 w-5" />
                <span>Twitter</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;