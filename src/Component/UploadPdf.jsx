
import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { motion } from 'framer-motion';

const UploadPdf = () => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('QUA'); // Default is Quotation
  const [date, setDate] = useState('2024-10-09');
  const [docNumber, setDocNumber] = useState('01');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    // Format file name based on your naming convention
    const fileName = `RK-${docType}-${date.replace(/-/g, '')}${docNumber}.pdf`;

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, `pdfs/${fileName}`);

    // Upload the file
    const uploadTask = uploadBytesResumable(storageRef, file);
    setUploading(true);

    // Monitor the upload progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Track progress
        const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressValue);
        console.log(`Upload is ${progressValue}% done`);
      },
      (error) => {
        // Handle any errors
        console.error('Upload failed:', error);
        setUploading(false);
      },
      () => {
        // Handle successful uploads
        console.log('Upload successful');
        setUploading(false);
        setProgress(100); // Complete progress bar
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-10"
    >
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center ">Upload PDF Document</h1>

      <div className="space-y-4">
        {/* Select File */}
        <div>
          <label className="block text-gray-700 font-medium">Select PDF</label>
          <input
            type="file"
            accept="application/pdf"
            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            onChange={(e) => setFile(e.target.files[0])} // Set the selected file
          />
        </div>

        {/* Document Type */}
        <div>
          <label className="block text-gray-700 font-medium">Document Type</label>
          <select
            className="w-full border border-gray-300 p-2 rounded-lg text-gray-700"
            value={docType}
            onChange={(e) => setDocType(e.target.value)} // Select document type
          >
            <option value="QUA">Quotation</option>
            <option value="INT">Internship</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded-lg text-gray-700"
            value={date}
            onChange={(e) => setDate(e.target.value)} // Set the date
          />
        </div>

        {/* Document Number */}
        <div>
          <label className="block text-gray-700 font-medium">Document Number</label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded-lg text-gray-700"
            value={docNumber}
            onChange={(e) => setDocNumber(e.target.value)} // Set document number
          />
        </div>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-green-500 text-white py-2 rounded-lg font-bold mt-4"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </motion.button>

        {/* Progress Bar */}
        {uploading && (
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                  Uploading...
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-300"
              ></div>
            </div>
          </div>
        )}
        {uploadSuccess && (
          <p className="text-green-600 text-center font-semibold">
            Successfully Uploaded!
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default UploadPdf;
