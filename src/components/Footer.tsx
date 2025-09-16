import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mt-auto border-t bg-gradient-soft"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-primary" />
            <span className="font-semibold text-gradient">BookmarkApp</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for better bookmark management</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 BookmarkApp. All rights reserved.
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;