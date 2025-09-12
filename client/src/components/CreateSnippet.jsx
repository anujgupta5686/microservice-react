import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import {
    FiEdit,
    FiTrash2,
    FiCode,
    FiClock,
    FiCopy,
    FiCheck,
    FiAlertCircle,
    FiRefreshCw,
    FiMessageSquare,
    FiUser,
    FiChevronDown,
    FiChevronUp,
    FiLoader
} from 'react-icons/fi'
import CreateComment from './CreateComment'

const CreateSnippet = () => {
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [message, setMessage] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [snippets, setSnippets] = useState([])
    const [copiedId, setCopiedId] = useState(null)
    const [fetchError, setFetchError] = useState('')
    const [expandedSnippet, setExpandedSnippet] = useState(null)
    const [comments, setComments] = useState({}) // { snippetId: { data: [], loading: boolean, error: string } }
    const [loadingComments, setLoadingComments] = useState({})
    const [commentCounts, setCommentCounts] = useState({}) // { snippetId: count }

    // Fetch existing snippets on component mount
    useEffect(() => {
        fetchSnippets()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let timer
        if (isSuccess && message) {
            timer = setTimeout(() => {
                setMessage('')
                setIsSuccess(false)
            }, 2000)
        }
        return () => clearTimeout(timer)
    }, [isSuccess, message])

    const fetchSnippets = async () => {
        try {
            setIsRefreshing(true)
            setFetchError('')
            const response = await axios.get('http://localhost:8000/api/v1/snippet')

            console.log('API Response:', response.data)

            // Support both shapes:
            // 1) { snippets: { id1: {...}, id2: {...} } }
            // 2) { id1: {...}, id2: {...} }
            // 3) [ {...}, {...} ]
            let data = response.data
            let rawSnippets = data?.snippets ?? data

            if (!rawSnippets) {
                console.warn('No snippets in response:', data)
                setSnippets([])
                setFetchError('No snippets found in the response')
                return
            }

            let normalized = []

            if (Array.isArray(rawSnippets)) {
                normalized = rawSnippets
            } else if (typeof rawSnippets === 'object') {
                // object keyed by id -> convert to array
                normalized = Object.values(rawSnippets).map((item) => ({ ...item }))
            } else {
                console.warn('Unexpected snippets shape:', rawSnippets)
                setSnippets([])
                setFetchError('Unexpected snippets data format')
                return
            }

            // Optional: sort newest first if timestamps exist
            normalized.sort((a, b) => {
                const ta = new Date(a.createdAt || a.updatedAt || 0).getTime()
                const tb = new Date(b.createdAt || b.updatedAt || 0).getTime()
                return tb - ta
            })

            setSnippets(normalized)

            // Fetch comment counts for all snippets
            await fetchAllCommentCounts(normalized)
        } catch (error) {
            console.error('Error fetching snippets:', error)
            setFetchError('Failed to load snippets. Please try again.')
            setSnippets([])
        } finally {
            setIsRefreshing(false)
        }
    }

    const fetchAllCommentCounts = async (snippetsList) => {
        const counts = {};

        // Create an array of promises for all comment count requests
        const countPromises = snippetsList.map(async (snippet) => {
            const snippetId = snippet.id || snippet._id;
            if (!snippetId) return;

            try {
                const response = await axios.get(`http://localhost:8001/api/v1/snippet/${snippetId}/comment`);
                const commentsData = response.data.comments || response.data;
                counts[snippetId] = Array.isArray(commentsData) ? commentsData.length : 0;
            } catch (error) {
                console.error(`Error fetching comment count for snippet ${snippetId}:`, error);
                counts[snippetId] = 0;
            }
        });

        // Wait for all requests to complete
        await Promise.all(countPromises);
        setCommentCounts(prev => ({ ...prev, ...counts }));
    }

    const fetchComments = async (snippetId) => {
        if (!snippetId) return

        try {
            setLoadingComments(prev => ({ ...prev, [snippetId]: true }))
            setComments(prev => ({
                ...prev,
                [snippetId]: { ...prev[snippetId], error: null }
            }))

            const response = await axios.get(`http://localhost:8001/api/v1/snippet/${snippetId}/comment`)
            console.log(`Comments for snippet ${snippetId}:`, response.data)

            // Handle different response formats
            let commentsData = response.data;
            if (response.data && response.data.comments) {
                commentsData = response.data.comments;
            }

            setComments(prev => ({
                ...prev,
                [snippetId]: {
                    data: Array.isArray(commentsData) ? commentsData : [],
                    loading: false,
                    error: null
                }
            }))

            // Update the comment count
            const count = Array.isArray(commentsData) ? commentsData.length : 0;
            setCommentCounts(prev => ({ ...prev, [snippetId]: count }));
        } catch (error) {
            console.error(`Error fetching comments for snippet ${snippetId}:`, error)
            setComments(prev => ({
                ...prev,
                [snippetId]: {
                    ...prev[snippetId],
                    loading: false,
                    error: error.response?.data?.message || 'Failed to load comments'
                }
            }))
        } finally {
            setLoadingComments(prev => ({ ...prev, [snippetId]: false }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Basic validation
        if (!title.trim() || !code.trim()) {
            setMessage('Please provide both title and code')
            setIsSuccess(false)
            return
        }

        setIsLoading(true)
        setMessage('')
        setIsSuccess(false)
        setFetchError('')

        try {
            const response = await axios.post('http://localhost:8000/api/v1/snippet', {
                title,
                code,
            })

            console.log('Create Snippet Response:', response.data)
            setMessage('Snippet created successfully!')
            setIsSuccess(true)

            // Refresh the list after creation
            await fetchSnippets()

            setTitle('')
            setCode('')
        } catch (error) {
            console.error('Error creating snippet:', error)
            setMessage(
                error.response?.data?.message || 'Failed to create snippet. Please try again.'
            )
            setIsSuccess(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteSnippet = async (id) => {
        if (!id) {
            alert('Invalid snippet id')
            return
        }
        if (window.confirm('Are you sure you want to delete this snippet?')) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/snippet/${id}`)
                // Remove locally (support id or _id)
                setSnippets((prev) => prev.filter((s) => (s.id || s._id) !== id))
                // Also remove comments for this snippet
                setComments(prev => {
                    const newComments = { ...prev }
                    delete newComments[id]
                    return newComments
                })
                // Remove comment count
                setCommentCounts(prev => {
                    const newCounts = { ...prev }
                    delete newCounts[id]
                    return newCounts
                })
            } catch (error) {
                console.error('Error deleting snippet:', error)
                alert('Failed to delete snippet. Please try again.')
            }
        }
    }

    const handleCopyCode = async (codeToCopy, id) => {
        try {
            if (!navigator.clipboard) {
                // fallback
                const textarea = document.createElement('textarea')
                textarea.value = codeToCopy
                textarea.style.position = 'fixed'
                textarea.style.left = '-9999px'
                document.body.appendChild(textarea)
                textarea.select()
                document.execCommand('copy')
                document.body.removeChild(textarea)
            } else {
                await navigator.clipboard.writeText(codeToCopy)
            }
            setCopiedId(id)
            setTimeout(() => setCopiedId(null), 2000)
        } catch (err) {
            console.error('Copy failed:', err)
            alert('Failed to copy code.')
        }
    }

    const toggleSnippetExpansion = async (snippetId) => {
        if (expandedSnippet === snippetId) {
            setExpandedSnippet(null)
        } else {
            setExpandedSnippet(snippetId)
            // Fetch comments when expanding if not already loaded
            if (!comments[snippetId]?.data && !loadingComments[snippetId]) {
                await fetchComments(snippetId)
            }
        }
    }

    const handleCommentAdded = (snippetId, newComment) => {
        setComments(prev => ({
            ...prev,
            [snippetId]: {
                data: [...(prev[snippetId]?.data || []), newComment],
                loading: false,
                error: null
            }
        }))

        // Update the comment count
        setCommentCounts(prev => ({
            ...prev,
            [snippetId]: (prev[snippetId] || 0) + 1
        }))
    }

    const retryFetchComments = async (snippetId) => {
        await fetchComments(snippetId)
    }

    const closeMessage = () => {
        setMessage('')
        setIsSuccess(false)
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date'
        try {
            const options = { year: 'numeric', month: 'short', day: 'numeric' }
            return new Date(dateString).toLocaleDateString(undefined, options)
        } catch (error) {
            return 'Invalid date'
        }
    }

    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Unknown time'
        try {
            const now = new Date()
            const past = new Date(dateString)
            const diffInMs = now - past
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

            if (diffInMinutes < 1) return 'Just now'
            if (diffInMinutes < 60) return `${diffInMinutes} min ago`

            const diffInHours = Math.floor(diffInMinutes / 60)
            if (diffInHours < 24)
                return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`

            const diffInDays = Math.floor(diffInHours / 24)
            return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
        } catch (error) {
            return 'Unknown time'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Create Snippet Form */}
                    <div>
                        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm sticky top-4">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-center text-gray-100">
                                    Create New Snippet
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`mb-4 p-3 rounded-md text-center relative ${isSuccess
                                            ? 'bg-green-900/30 text-green-300 border border-green-700'
                                            : 'bg-red-900/30 text-red-300 border border-red-700'
                                            }`}
                                    >
                                        {message}
                                        {!isSuccess && (
                                            <button
                                                onClick={closeMessage}
                                                className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                                            >
                                                ✕
                                            </button>
                                        )}
                                        {isSuccess && (
                                            <div className="w-full h-1 bg-green-500 absolute bottom-0 left-0">
                                                <motion.div
                                                    className="h-full bg-green-300"
                                                    initial={{ width: '100%' }}
                                                    animate={{ width: '0%' }}
                                                    transition={{ duration: 2, ease: 'linear' }}
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="title" className="text-sm font-medium text-gray-300">
                                            Title
                                        </label>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Enter snippet title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:ring-blue-500"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="code" className="text-sm font-medium text-gray-300">
                                            Code Snippet
                                        </label>
                                        <Textarea
                                            id="code"
                                            placeholder="Write your code snippet here..."
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            className="min-h-[200px] bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500 font-mono text-sm focus:ring-blue-500"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                        className="pt-4"
                                    >
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center justify-center">
                                                    <svg
                                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Creating...
                                                </span>
                                            ) : (
                                                'ADD SNIPPET'
                                            )}
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Snippets Display */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-100">Your Snippets</h2>
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full">
                                    {snippets.length} {snippets.length === 1 ? 'snippet' : 'snippets'}
                                </span>
                                <motion.button
                                    onClick={fetchSnippets}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={isRefreshing}
                                    className="p-2 rounded-md bg-gray-700/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700 disabled:opacity-50"
                                    title="Refresh snippets"
                                >
                                    <FiRefreshCw className={`text-lg ${isRefreshing ? 'animate-spin' : ''}`} />
                                </motion.button>
                            </div>
                        </div>

                        {fetchError && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-red-900/30 text-red-300 border border-red-700 rounded-md flex items-center gap-3"
                            >
                                <FiAlertCircle className="text-xl flex-shrink-0" />
                                <div>
                                    <p className="font-medium">{fetchError}</p>
                                    <button
                                        onClick={fetchSnippets}
                                        className="text-red-100 underline hover:text-white text-sm mt-1"
                                    >
                                        Try again
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {isRefreshing && snippets.length === 0 && (
                            <div className="flex justify-center items-center py-16">
                                <FiRefreshCw className="animate-spin text-3xl text-blue-500" />
                            </div>
                        )}

                        <AnimatePresence>
                            {snippets.length > 0 ? (
                                <div className="space-y-6">
                                    {snippets.map((snippet, index) => {
                                        const snippetId = snippet.id || snippet._id
                                        const snippetComments = comments[snippetId]?.data || []
                                        const commentsLoading = loadingComments[snippetId]
                                        const commentsError = comments[snippetId]?.error
                                        const isExpanded = expandedSnippet === snippetId
                                        const commentCount = commentCounts[snippetId] || 0

                                        return (
                                            <motion.div
                                                key={snippetId || `snippet-${index}`}
                                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                                layout
                                            >
                                                <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/30 transition-all duration-300 group">
                                                    <CardHeader className="pb-3">
                                                        <div className="flex justify-between items-start">
                                                            <CardTitle className="text-xl text-gray-100 line-clamp-1">
                                                                {snippet.title || 'Untitled Snippet'}
                                                            </CardTitle>
                                                            <div className="flex items-center gap-2">
                                                                {/* <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md">
                                                                    {snippet.language || 'text'}
                                                                </span> */}
                                                                <motion.button
                                                                    whileHover={{ scale: 1.1 }}
                                                                    whileTap={{ scale: 0.9 }}
                                                                    onClick={() =>
                                                                        handleCopyCode(snippet.code || '', snippetId)
                                                                    }
                                                                    className="p-1.5 rounded-md bg-gray-700/50 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                                                    title="Copy code"
                                                                >
                                                                    {copiedId === snippetId ? (
                                                                        <FiCheck className="text-green-400" />
                                                                    ) : (
                                                                        <FiCopy />
                                                                    )}
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                        <CardDescription className="text-gray-400">
                                                            Created on {formatDate(snippet.createdAt || snippet.updatedAt)}
                                                        </CardDescription>
                                                    </CardHeader>

                                                    <CardContent>
                                                        <motion.pre
                                                            className="bg-gray-900/70 p-3 rounded-md overflow-x-auto text-sm font-mono text-gray-200 max-h-40 relative"
                                                            whileHover={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)' }}
                                                        >
                                                            <code>{snippet.code || 'No code content'}</code>
                                                            {/* <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                                                                    {snippet.language || 'text'}
                                                                </span>
                                                            </div> */}
                                                        </motion.pre>

                                                        <div className="flex items-center text-gray-400 text-sm mt-4">
                                                            <FiClock className="mr-1" />
                                                            <span>{getTimeAgo(snippet.updatedAt || snippet.createdAt)}</span>
                                                        </div>

                                                        {/* Comments Section */}
                                                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                                                            <div className="flex items-center justify-between mb-3">
                                                                <div className="flex items-center gap-2">
                                                                    <FiMessageSquare className="text-gray-400" />
                                                                    <span className="text-sm text-gray-400">
                                                                        {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
                                                                    </span>
                                                                </div>
                                                                <button
                                                                    onClick={() => toggleSnippetExpansion(snippetId)}
                                                                    className="text-gray-400 hover:text-gray-200 flex items-center gap-1 text-sm"
                                                                >
                                                                    {isExpanded ? 'Collapse' : 'Expand'}
                                                                    {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                                                                </button>
                                                            </div>

                                                            <AnimatePresence>
                                                                {isExpanded && (
                                                                    <motion.div
                                                                        initial={{ opacity: 0, height: 0 }}
                                                                        animate={{ opacity: 1, height: 'auto' }}
                                                                        exit={{ opacity: 0, height: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                        className="space-y-4"
                                                                    >
                                                                        {/* Comments Loading State */}
                                                                        {commentsLoading && (
                                                                            <div className="flex justify-center items-center py-4">
                                                                                <FiLoader className="animate-spin text-blue-500 mr-2" />
                                                                                <span className="text-gray-400 text-sm">Loading comments...</span>
                                                                            </div>
                                                                        )}

                                                                        {/* Comments Error State */}
                                                                        {commentsError && !commentsLoading && (
                                                                            <div className="p-3 bg-red-900/30 text-red-300 border border-red-700 rounded-md text-sm flex justify-between items-center">
                                                                                <span>{commentsError}</span>
                                                                                <button
                                                                                    onClick={() => retryFetchComments(snippetId)}
                                                                                    className="text-red-400 hover:text-red-300 text-sm underline"
                                                                                >
                                                                                    Retry
                                                                                </button>
                                                                            </div>
                                                                        )}

                                                                        {/* Comments List */}
                                                                        {!commentsLoading && !commentsError && snippetComments.length > 0 && (
                                                                            <div className="space-y-3">
                                                                                {snippetComments.map((comment, idx) => (
                                                                                    <motion.div
                                                                                        key={comment.id || comment._id || idx}
                                                                                        initial={{ opacity: 0, x: 20 }}
                                                                                        animate={{ opacity: 1, x: 0 }}
                                                                                        transition={{ delay: idx * 0.1 }}
                                                                                        className="bg-gray-700/30 p-3 rounded-md"
                                                                                    >
                                                                                        <div className="flex items-center gap-2 mb-2">
                                                                                            <div className="p-1 bg-blue-500/20 rounded-full">
                                                                                                <FiUser className="text-blue-400 text-sm" />
                                                                                            </div>
                                                                                            <span className="text-xs text-gray-400">
                                                                                                {comment.author || 'Anonymous'} • {getTimeAgo(comment.createdAt || comment.timestamp)}
                                                                                            </span>
                                                                                        </div>
                                                                                        <p className="text-sm text-gray-200">{comment.text || comment.content}</p>
                                                                                    </motion.div>
                                                                                ))}
                                                                            </div>
                                                                        )}

                                                                        {/* No Comments Message */}
                                                                        {!commentsLoading && !commentsError && snippetComments.length === 0 && commentCount === 0 && (
                                                                            <div className="text-center py-4 text-gray-500 text-sm">
                                                                                No comments yet. Be the first to comment!
                                                                            </div>
                                                                        )}

                                                                        {/* Add Comment Form */}
                                                                        <CreateComment
                                                                            snippetId={snippetId}
                                                                            onCommentAdded={(newComment) => handleCommentAdded(snippetId, newComment)}
                                                                        />
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    </CardContent>

                                                    {/* <CardFooter className="flex justify-between pt-3 border-t border-gray-700/50">
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-md text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 transition-colors"
                                                        >
                                                            <FiEdit className="text-base" />
                                                            Edit
                                                        </motion.button>

                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleDeleteSnippet(snippetId)}
                                                            className="flex items-center gap-2 px-3 py-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors"
                                                        >
                                                            <FiTrash2 className="text-base" />
                                                            Delete
                                                        </motion.button>
                                                    </CardFooter> */}
                                                </Card>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            ) : !fetchError && !isRefreshing ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-center py-16 bg-gray-800/30 rounded-lg border border-dashed border-gray-700"
                                >
                                    <FiCode className="text-5xl text-gray-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No snippets yet</h3>
                                    <p className="text-gray-500">Create your first code snippet to get started</p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default CreateSnippet




