
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <motion.h1
          className="text-5xl font-bold text-blue-600 mb-10 mt-0"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          HandleEasy
        </motion.h1>
        <motion.h1
          className="text-xl from-neutral-950 mb-28 mt-0"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
         Your One Stop File Maintaince system
        </motion.h1>
        <motion.div
          className="mt-4 space-x-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/uploadpdf" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
            Upload File
          </Link>
          <Link to="/fetchpdf" className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">
            Fetch File
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
