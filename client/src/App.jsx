
// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreateSnippet from './components/CreateSnippet'
import Home from './components/Home'
import About from './components/About'

const App = () => {
  return (
    <Router>
      <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl mx-auto px-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateSnippet />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App