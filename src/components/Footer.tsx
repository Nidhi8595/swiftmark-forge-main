import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Bookmark, Heart, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-auto border-t bg-gradient-soft"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Contact Section */}
        <section className=" pt-10 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions, suggestions, or just want to say hello? We'd love to hear from you. Our team is always here to help and improve your MarkSphere experience.
              </p>

              <div className="flex justify-center space-x-6">
                <a href="mailto:neelakshikadyan@gmail.com" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Mail className="h-5 w-5" />
                  <span>Email Us</span>
                </a>
                <a href="https://github.com/Nidhi8595" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Github className="h-5 w-5" />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/neelakshi-2b3725321/" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth">
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-primary" />
            <span className="font-semibold text-gradient">MarkSphere</span>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">

            <span>Made for better bookmark management</span>
          </div>

          <div className="text-sm text-muted-foreground">
            © 2025 MarkSphere. All rights reserved.
          </div>
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;