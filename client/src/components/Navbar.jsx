// Navbar.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { motion } from 'framer-motion'

const Navbar = () => {
    const location = useLocation()

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="sticky top-0 z-10 backdrop-blur-md bg-gray-900/80 border-b border-gray-800"
        >
            <div className="container max-w-4xl mx-auto px-4">
                <div className="h-14 flex justify-between items-center">
                    <motion.h1
                        whileHover={{ scale: 1.05 }}
                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                    >
                        Code Snippet
                    </motion.h1>

                    <div className="flex items-center space-x-4">
                        <Link to="/">
                            <Button
                                variant="ghost"
                                className={`${location.pathname === '/' ? 'bg-gray-800' : ''}`}
                            >
                                Home
                            </Button>
                        </Link>
                        <Link to="/create">
                            <Button
                                variant="ghost"
                                className={`${location.pathname === '/create' ? 'bg-gray-800' : ''}`}
                            >
                                Create
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button
                                variant="ghost"
                                className={`${location.pathname === '/about' ? 'bg-gray-800' : ''}`}
                            >
                                About
                            </Button>
                        </Link>
                        <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar