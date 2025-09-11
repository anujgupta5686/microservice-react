// Home.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { FiEdit, FiTrash2, FiCode, FiCalendar, FiClock } from 'react-icons/fi'

// Mock data for demonstration - in a real app, this would come from your backend or state management
const mockSnippets = [
    {
        id: 1,
        title: "React useState Hook",
        code: "const [state, setState] = useState(initialState);",
        language: "javascript",
        createdAt: "2023-10-15",
        lastModified: "2 hours ago"
    },
    {
        id: 2,
        title: "API Fetch Example",
        code: "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data));",
        language: "javascript",
        createdAt: "2023-10-10",
        lastModified: "1 day ago"
    },
    {
        id: 3,
        title: "Python List Comprehension",
        code: "squares = [x**2 for x in range(10)]",
        language: "python",
        createdAt: "2023-10-05",
        lastModified: "3 days ago"
    }
];

const Home = () => {
    const [snippets, setSnippets] = useState(mockSnippets);

    const handleDeleteSnippet = (id) => {
        if (window.confirm("Are you sure you want to delete this snippet?")) {
            setSnippets(snippets.filter(snippet => snippet.id !== id));
        }
    };

    const handleEditSnippet = (id) => {
        // In a real app, this would navigate to an edit page or open a modal
        console.log("Edit snippet with id:", id);
        alert(`Edit functionality would open for snippet ${id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="py-8 px-4"
        >
            {/* Header Section */}
            <div className="text-center mb-12">
                <motion.h1
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                >
                    My Code Snippets
                </motion.h1>
                <motion.p
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 max-w-2xl mx-auto text-lg"
                >
                    All your saved code snippets in one place. Quickly access, edit, or manage your reusable code pieces.
                </motion.p>
            </div>

            {/* Action Button */}
            <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mb-10"
            >
                <Link to="/create">
                    <Button
                        size="lg"
                        className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md flex items-center gap-2"
                    >
                        <FiCode className="text-xl" />
                        Create New Snippet
                    </Button>
                </Link>
            </motion.div>

            {/* Snippets Grid */}
            {snippets.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
                >
                    {snippets.map((snippet, index) => (
                        <motion.div
                            key={snippet.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Card className="bg-gray-800/50 border-gray-700 h-full flex flex-col hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl text-gray-100 line-clamp-1">
                                            {snippet.title}
                                        </CardTitle>
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md">
                                            {snippet.language}
                                        </span>
                                    </div>
                                    <CardDescription className="text-gray-400">
                                        Created on {snippet.createdAt}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="flex-grow">
                                    <pre className="bg-gray-900/70 p-3 rounded-md overflow-x-auto text-sm font-mono text-gray-200">
                                        <code>{snippet.code}</code>
                                    </pre>

                                    <div className="flex items-center text-gray-400 text-sm mt-4">
                                        <FiClock className="mr-1" />
                                        <span>Updated {snippet.lastModified}</span>
                                    </div>
                                </CardContent>

                                <CardFooter className="flex justify-between pt-3 border-t border-gray-700/50">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditSnippet(snippet.id)}
                                        className="flex items-center gap-2 bg-transparent text-blue-400 border-blue-500/30 hover:bg-blue-500/20"
                                    >
                                        <FiEdit className="text-base" />
                                        Edit
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDeleteSnippet(snippet.id)}
                                        className="flex items-center gap-2 bg-transparent text-red-400 border-red-500/30 hover:bg-red-500/20"
                                    >
                                        <FiTrash2 className="text-base" />
                                        Delete
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center py-16 bg-gray-800/30 rounded-lg border border-dashed border-gray-700 max-w-2xl mx-auto"
                >
                    <FiCode className="text-5xl text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No snippets yet</h3>
                    <p className="text-gray-500 mb-6">Create your first code snippet to get started</p>
                    <Link to="/create">
                        <Button className="bg-primary hover:bg-primary/90">
                            Create Your First Snippet
                        </Button>
                    </Link>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Home