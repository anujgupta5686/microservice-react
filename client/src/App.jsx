// App.jsx
import React from 'react'
import Navbar from './components/Navbar'
import CreateSnippet from './components/CreateSnippet'
import { motion } from 'framer-motion'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-4xl mx-auto px-4 py-8"
      >
        <CreateSnippet />
      </motion.div>
    </div>
  )
}

export default App