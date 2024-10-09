
import React, { useState } from 'react';
import { storage } from '../firebase'; 
import { ref, getDownloadURL } from 'firebase/storage'; 
import { motion } from 'framer-motion'; 

const FetchPdf = () => {
  const [docId, setDocId] = useState(''); 
  const [url, setUrl] = useState(''); 

  const fetchDocument = async () => {
    try {
      const filePath = `pdfs/${docId}.pdf`;

      const fileRef = ref(storage, filePath);

      const downloadUrl = await getDownloadURL(fileRef);

      setUrl(downloadUrl);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-200 rounded-lg shadow-lg max-w-md mx-auto mt-12"
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Fetch PDF Document
      </h1>

      <motion.input
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        type="text"
        className="border border-gray-400 p-3 w-full rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        placeholder="Enter Document ID"
        value={docId}
        onChange={(e) => setDocId(e.target.value)} // Update the document ID state
      />

      {/* Button to trigger document fetch */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mt-6 transition duration-300 ease-in-out hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        onClick={fetchDocument}
      >
        Fetch
      </motion.button>

      {url && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6"
        >
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline block text-center font-medium transition duration-300 ease-in-out hover:text-blue-800"
            whileHover={{ scale: 1.1 }}
          >
            View PDF
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FetchPdf;
