import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiMessageSquare, FiUser } from 'react-icons/fi'
import axios from 'axios'

const CreateComment = ({ snippetId, onCommentAdded }) => {
    const [comment, setComment] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!comment.trim()) return

        setIsLoading(true)
        setError('')
        setIsSuccess(false)

        try {
            const response = await axios.post(
                `http://localhost:8001/api/v1/snippet/${snippetId}/comment`,
                { text: comment }
            )

            console.log('Comment submitted:', response.data)
            setIsSuccess(true)
            setComment('')

            // Notify parent component that a new comment was added
            if (onCommentAdded) {
                onCommentAdded(response.data.comment)
            }

            // Reset success state after 2 seconds
            setTimeout(() => setIsSuccess(false), 2000)
        } catch (error) {
            console.error('Error submitting comment:', error)
            setError(error.response?.data?.message || 'Failed to add comment. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const closeError = () => {
        setError('')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 backdrop-blur-sm mt-4"
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500/20 rounded-full">
                    <FiMessageSquare className="text-blue-400 text-lg" />
                </div>
                <h3 className="text-md font-semibold text-gray-100">Add Comment</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-2">
                    <Label htmlFor={`comment-${snippetId}`} className="text-sm font-medium text-gray-300">
                        Your Comment
                    </Label>
                    <Textarea
                        id={`comment-${snippetId}`}
                        placeholder="Share your thoughts about this code..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="min-h-[80px] bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500 text-sm focus:ring-blue-500 resize-none"
                        required
                        disabled={isLoading}
                    />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-2 bg-red-900/30 text-red-300 border border-red-700 rounded-md text-sm flex justify-between items-center"
                        >
                            <span>{error}</span>
                            <button
                                onClick={closeError}
                                className="text-red-400 hover:text-red-300"
                            >
                                ✕
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isSuccess && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-2 bg-green-900/30 text-green-300 border border-green-700 rounded-md text-sm"
                        >
                            Comment added successfully!
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                >
                    <Button
                        type="submit"
                        disabled={isLoading || !comment.trim()}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Adding...
                            </>
                        ) : (
                            <>
                                <FiSend className="text-sm" />
                                Add Comment
                            </>
                        )}
                    </Button>
                </motion.div>
            </form>
        </motion.div>
    )
}

export default CreateComment