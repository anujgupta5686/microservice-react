// About.jsx
import React from 'react'
import { motion } from 'framer-motion'

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto py-8"
        >
            <h1 className="text-3xl font-bold mb-6 text-center">About Code Snippet</h1>
            <div className="space-y-4 text-gray-300">
                <p>
                    Code Snippet is a simple application designed to help developers store and organize their code snippets.
                </p>
                <p>
                    With this tool, you can easily save frequently used code pieces, templates, or solutions to common problems,
                    making them accessible whenever you need them.
                </p>
                <p>
                    This application is built with React, Tailwind CSS, and Shadcn UI components, featuring a dark theme optimized
                    for coding environments.
                </p>
            </div>
        </motion.div>
    )
}

export default About