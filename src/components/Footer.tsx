import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            © 2025 Chanuka Devin. All rights reserved.
            <span className="flex items-center gap-1">
              Made with <Heart size={16} className="text-red-600 fill-red-600 animate-pulse" />
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
