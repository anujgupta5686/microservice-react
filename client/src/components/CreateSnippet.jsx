// CreateSnippet.jsx
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { motion } from 'framer-motion'

const CreateSnippet = () => {
    const [title, setTitle] = useState('')
    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('javascript')

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log({ title, code, language })
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-100">Create New Snippet</CardTitle>
                    <CardDescription className="text-gray-400">
                        Save and organize your code snippets for future reference
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-gray-300">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter snippet title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="language" className="text-gray-300">Language</Label>
                            <Select value={language} onValueChange={setLanguage}>
                                <SelectTrigger className="bg-gray-700/50 border-gray-600 text-gray-100">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700 text-gray-100">
                                    <SelectItem value="javascript">JavaScript</SelectItem>
                                    <SelectItem value="python">Python</SelectItem>
                                    <SelectItem value="java">Java</SelectItem>
                                    <SelectItem value="html">HTML</SelectItem>
                                    <SelectItem value="css">CSS</SelectItem>
                                    <SelectItem value="typescript">TypeScript</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="code" className="text-gray-300">Code Snippet</Label>
                            <Textarea
                                id="code"
                                placeholder="Write your code snippet here..."
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="min-h-[200px] bg-gray-700/50 border-gray-600 text-gray-100 placeholder:text-gray-500 font-mono focus:ring-blue-500"
                            />
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                            >
                                Save Snippet
                            </Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default CreateSnippet