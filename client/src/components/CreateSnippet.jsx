// CreateSnippet.jsx
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { motion } from 'framer-motion'

const CreateSnippet = () => {
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log({ title, code })
        setTitle('')
        setCode('')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
        >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-100">
                        Create New Snippet
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
                            />
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="pt-4"
                        >
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2"
                            >
                                ADD
                            </Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default CreateSnippet