// Loader.js
import React from 'react';
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgress className='text-customPurple' size={80} thickness={5} />
      </motion.div>
    </div>
  );
};

export default Loader;
