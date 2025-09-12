// // import React, { useState, useEffect } from 'react'
// // import { Link, useLocation } from 'react-router-dom'
// // import { Button } from './ui/button'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import { FiMenu, FiX, FiHome, FiPlusSquare, FiInfo, FiLogOut } from 'react-icons/fi'

// // const Navbar = () => {
// //     const location = useLocation()
// //     const [isOpen, setIsOpen] = useState(false)
// //     const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

// //     // Check screen size on resize
// //     useEffect(() => {
// //         const handleResize = () => {
// //             const mobile = window.innerWidth < 768
// //             setIsMobile(mobile)

// //             // Close menu when switching to desktop view
// //             if (!mobile && isOpen) {
// //                 setIsOpen(false)
// //             }
// //         }

// //         window.addEventListener('resize', handleResize)
// //         return () => window.removeEventListener('resize', handleResize)
// //     }, [isOpen])

// //     // Close menu when route changes
// //     useEffect(() => {
// //         setIsOpen(false)
// //     }, [location])

// //     // Prevent body scrolling when menu is open
// //     useEffect(() => {
// //         if (isOpen && isMobile) {
// //             document.body.style.overflow = 'hidden'
// //         } else {
// //             document.body.style.overflow = 'unset'
// //         }

// //         return () => {
// //             document.body.style.overflow = 'unset'
// //         }
// //     }, [isOpen, isMobile])

// //     const toggleMenu = () => {
// //         setIsOpen(!isOpen)
// //     }

// //     const navItems = [
// //         { path: '/', label: 'Home', icon: <FiHome className="text-lg" /> },
// //         { path: '/create', label: 'Create', icon: <FiPlusSquare className="text-lg" /> },
// //         { path: '/about', label: 'About', icon: <FiInfo className="text-lg" /> },
// //     ]

// //     return (
// //         <>
// //             <motion.nav
// //                 initial={{ y: -100 }}
// //                 animate={{ y: 0 }}
// //                 transition={{ type: "spring", stiffness: 100 }}
// //                 className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/95 border-b border-gray-800"
// //             >
// //                 <div className="container max-w-4xl mx-auto px-4">
// //                     <div className="h-14 flex justify-between items-center">
// //                         <motion.h1
// //                             whileHover={{ scale: 1.05 }}
// //                             className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
// //                         >
// //                             Code Snippet
// //                         </motion.h1>

// //                         {/* Desktop Navigation */}
// //                         <div className="hidden md:flex items-center space-x-4">
// //                             {navItems.map((item) => (
// //                                 <Link key={item.path} to={item.path}>
// //                                     <Button
// //                                         variant="ghost"
// //                                         className={`flex items-center gap-2 ${location.pathname === item.path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
// //                                     >
// //                                         {item.icon}
// //                                         {item.label}
// //                                     </Button>
// //                                 </Link>
// //                             ))}
// //                             <Button
// //                                 variant="outline"
// //                                 className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700 flex items-center gap-2"
// //                             >
// //                                 <FiLogOut className="text-lg" />
// //                                 Logout
// //                             </Button>
// //                         </div>

// //                         {/* Mobile Menu Button */}
// //                         <div className="md:hidden">
// //                             <Button
// //                                 variant="ghost"
// //                                 size="icon"
// //                                 onClick={toggleMenu}
// //                                 className="text-gray-400 hover:text-white hover:bg-gray-800"
// //                                 aria-label="Toggle menu"
// //                             >
// //                                 {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
// //                             </Button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </motion.nav>

// //             {/* Mobile Navigation Overlay */}
// //             <AnimatePresence>
// //                 {isOpen && isMobile && (
// //                     <>
// //                         {/* Backdrop */}
// //                         <motion.div
// //                             initial={{ opacity: 0 }}
// //                             animate={{ opacity: 1 }}
// //                             exit={{ opacity: 0 }}
// //                             className="fixed inset-0 bg-black/70 z-40 md:hidden"
// //                             onClick={() => setIsOpen(false)}
// //                         />

// //                         {/* Sidebar Menu */}
// //                         <motion.div
// //                             initial={{ x: '100%' }}
// //                             animate={{ x: 0 }}
// //                             exit={{ x: '100%' }}
// //                             transition={{ type: "spring", damping: 25, stiffness: 200 }}
// //                             className="fixed top-0 right-0 h-full w-80 max-w-full bg-gray-900 border-l border-gray-800 z-50 shadow-2xl md:hidden"
// //                         >
// //                             <div className="flex flex-col h-full">
// //                                 {/* Header */}
// //                                 <div className="flex items-center justify-between p-4 border-b border-gray-800">
// //                                     <motion.h2
// //                                         className="text-lg font-semibold text-white"
// //                                         initial={{ opacity: 0 }}
// //                                         animate={{ opacity: 1 }}
// //                                         transition={{ delay: 0.1 }}
// //                                     >
// //                                         Menu
// //                                     </motion.h2>
// //                                     <Button
// //                                         variant="ghost"
// //                                         size="icon"
// //                                         onClick={() => setIsOpen(false)}
// //                                         className="text-gray-400 hover:text-white hover:bg-gray-800"
// //                                         aria-label="Close menu"
// //                                     >
// //                                         <FiX className="text-xl" />
// //                                     </Button>
// //                                 </div>

// //                                 {/* Navigation Items */}
// //                                 <nav className="flex-1 p-4">
// //                                     <ul className="space-y-2">
// //                                         {navItems.map((item, index) => (
// //                                             <motion.li
// //                                                 key={item.path}
// //                                                 initial={{ x: 50, opacity: 0 }}
// //                                                 animate={{ x: 0, opacity: 1 }}
// //                                                 transition={{ delay: 0.1 + (index * 0.1) }}
// //                                             >
// //                                                 <Link to={item.path}>
// //                                                     <Button
// //                                                         variant="ghost"
// //                                                         className={`w-full justify-start text-lg p-6 ${location.pathname === item.path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
// //                                                     >
// //                                                         <span className="mr-3">{item.icon}</span>
// //                                                         {item.label}
// //                                                     </Button>
// //                                                 </Link>
// //                                             </motion.li>
// //                                         ))}
// //                                     </ul>
// //                                 </nav>

// //                                 {/* Footer with Logout */}
// //                                 <motion.div
// //                                     className="p-4 border-t border-gray-800"
// //                                     initial={{ opacity: 0, y: 20 }}
// //                                     animate={{ opacity: 1, y: 0 }}
// //                                     transition={{ delay: 0.4 }}
// //                                 >
// //                                     <Button
// //                                         variant="outline"
// //                                         className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700 flex items-center gap-2 justify-center p-6 text-lg"
// //                                     >
// //                                         <FiLogOut className="text-xl" />
// //                                         Logout
// //                                     </Button>
// //                                 </motion.div>
// //                             </div>
// //                         </motion.div>
// //                     </>
// //                 )}
// //             </AnimatePresence>
// //         </>
// //     )
// // }

// // export default Navbar



// import React, { useState, useEffect } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { Button } from './ui/button'
// import { motion, AnimatePresence } from 'framer-motion'
// import { FiMenu, FiX, FiHome, FiPlusSquare, FiInfo, FiLogOut } from 'react-icons/fi'

// const Navbar = () => {
//     const location = useLocation()
//     const [isOpen, setIsOpen] = useState(false)
//     const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

//     // Check screen size on resize
//     useEffect(() => {
//         const handleResize = () => {
//             const mobile = window.innerWidth < 768
//             setIsMobile(mobile)

//             // Close menu when switching to desktop view
//             if (!mobile && isOpen) {
//                 setIsOpen(false)
//             }
//         }

//         window.addEventListener('resize', handleResize)
//         return () => window.removeEventListener('resize', handleResize)
//     }, [isOpen])

//     // Close menu when route changes
//     useEffect(() => {
//         setIsOpen(false)
//     }, [location])

//     // Prevent body scrolling when menu is open
//     useEffect(() => {
//         if (isOpen && isMobile) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = 'unset'
//         }

//         return () => {
//             document.body.style.overflow = 'unset'
//         }
//     }, [isOpen, isMobile])

//     const toggleMenu = () => {
//         setIsOpen(!isOpen)
//     }

//     const navItems = [
//         { path: '/', label: 'Home', icon: <FiHome className="text-lg" /> },
//         { path: '/create', label: 'Create', icon: <FiPlusSquare className="text-lg" /> },
//         { path: '/about', label: 'About', icon: <FiInfo className="text-lg" /> },
//     ]

//     return (
//         <>
//             <motion.nav
//                 initial={{ y: -100 }}
//                 animate={{ y: 0 }}
//                 transition={{ type: "spring", stiffness: 100 }}
//                 className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/95 border-b border-gray-800"
//             >
//                 <div className="container max-w-4xl mx-auto px-4">
//                     <div className="h-14 flex justify-between items-center">
//                         <motion.h1
//                             whileHover={{ scale: 1.05 }}
//                             className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
//                         >
//                             Code Snippet
//                         </motion.h1>

//                         {/* Desktop Navigation */}
//                         <div className="hidden md:flex items-center space-x-4">
//                             {navItems.map((item) => (
//                                 <Link key={item.path} to={item.path}>
//                                     <Button
//                                         variant="ghost"
//                                         className={`flex items-center gap-2 ${location.pathname === item.path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-gray-900'}`}
//                                     >
//                                         {item.icon}
//                                         {item.label}
//                                     </Button>
//                                 </Link>
//                             ))}
//                             <Button
//                                 variant="outline"
//                                 className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700 flex items-center gap-2"
//                             >
//                                 <FiLogOut className="text-lg" />
//                                 Logout
//                             </Button>
//                         </div>

//                         {/* Mobile Menu Button */}
//                         <div className="md:hidden">
//                             <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 onClick={toggleMenu}
//                                 className="text-gray-400 hover:text-white hover:bg-gray-800"
//                                 aria-label="Toggle menu"
//                             >
//                                 {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             </motion.nav>

//             {/* Mobile Navigation Overlay */}
//             <AnimatePresence>
//                 {isOpen && isMobile && (
//                     <>
//                         {/* Backdrop */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             className="fixed inset-0 bg-black/70 z-40 md:hidden"
//                             onClick={() => setIsOpen(false)}
//                         />

//                         {/* Sidebar Menu */}
//                         <motion.div
//                             initial={{ x: '100%' }}
//                             animate={{ x: 0 }}
//                             exit={{ x: '100%' }}
//                             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                             className="fixed top-0 right-0 h-full w-80 max-w-full bg-gray-900 border-l border-gray-800 z-50 shadow-2xl md:hidden flex flex-col"
//                         >
//                             {/* Header */}
//                             <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800">
//                                 <motion.h2
//                                     className="text-lg font-semibold text-white"
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: 0.1 }}
//                                 >
//                                     Menu
//                                 </motion.h2>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     onClick={() => setIsOpen(false)}
//                                     className="text-gray-400 hover:text-white hover:bg-gray-800"
//                                     aria-label="Close menu"
//                                 >
//                                     <FiX className="text-xl" />
//                                 </Button>
//                             </div>

//                             {/* Scrollable Navigation Items */}
//                             <div className="flex-1 overflow-y-auto">
//                                 <nav className="p-4">
//                                     <ul className="space-y-2">
//                                         {navItems.map((item, index) => (
//                                             <motion.li
//                                                 key={item.path}
//                                                 initial={{ x: 50, opacity: 0 }}
//                                                 animate={{ x: 0, opacity: 1 }}
//                                                 transition={{ delay: 0.1 + (index * 0.1) }}
//                                             >
//                                                 <Link to={item.path}>
//                                                     <Button
//                                                         variant="ghost"
//                                                         className={`w-full justify-start text-lg p-6 ${location.pathname === item.path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
//                                                     >
//                                                         <span className="mr-3">{item.icon}</span>
//                                                         {item.label}
//                                                     </Button>
//                                                 </Link>
//                                             </motion.li>
//                                         ))}
//                                     </ul>
//                                 </nav>
//                             </div>

//                             {/* Fixed Footer with Logout */}
//                             <div className="flex-shrink-0 border-t border-gray-800 bg-gray-900">
//                                 <motion.div
//                                     className="p-4"
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{ delay: 0.4 }}
//                                 >
//                                     <Button
//                                         variant="outline"
//                                         className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700 flex items-center gap-2 justify-center p-6 text-lg"
//                                     >
//                                         <FiLogOut className="text-xl" />
//                                         Logout
//                                     </Button>
//                                 </motion.div>
//                             </div>
//                         </motion.div>
//                     </>
//                 )}
//             </AnimatePresence>
//         </>
//     )
// }

// export default Navbar


// Navbar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiPlusSquare, FiInfo, FiLogOut } from 'react-icons/fi'

const Navbar = () => {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    // Check screen size on resize
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)

            // Close menu when switching to desktop view
            if (!mobile && isOpen) {
                setIsOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isOpen])

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [location])

    // Prevent body scrolling when menu is open
    useEffect(() => {
        if (isOpen && isMobile) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, isMobile])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const navItems = [
        { path: '/', label: 'Home', icon: <FiHome className="text-lg" /> },
        { path: '/create', label: 'Create', icon: <FiPlusSquare className="text-lg" /> },
        { path: '/about', label: 'About', icon: <FiInfo className="text-lg" /> },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="sticky top-0 z-50 backdrop-blur-md bg-gray-900/95 border-b border-gray-800"
            >
                <div className="container max-w-4xl mx-auto px-4">
                    <div className="h-14 flex justify-between items-center">
                        <motion.h1
                            whileHover={{ scale: 1.05 }}
                            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                        >
                            Code Snippet
                        </motion.h1>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link key={item.path} to={item.path}>
                                    <Button
                                        variant="ghost"
                                        className={`flex items-center gap-2 ${location.pathname === item.path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                            <Button
                                variant="outline"
                                className="bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700 flex items-center gap-2"
                            >
                                <FiLogOut className="text-lg" />
                                Logout
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMenu}
                                className="text-gray-400 hover:text-white hover:bg-gray-800"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && isMobile && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Sidebar Menu */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-80 max-w-full bg-gray-900 border-l border-gray-800 z-50 shadow-2xl md:hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800">
                                <motion.h2
                                    className="text-lg font-semibold text-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Menu
                                </motion.h2>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-white hover:bg-gray-800"
                                    aria-label="Close menu"
                                >
                                    <FiX className="text-xl" />
                                </Button>
                            </div>

                            {/* Scrollable Navigation Items */}
                            <div className="flex-1 overflow-y-auto">
                                <nav className="p-4">
                                    <ul className="space-y-2">
                                        {navItems.map((item, index) => (
                                            <motion.li
                                                key={item.path}
                                                initial={{ x: 50, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 + (index * 0.1) }}
                                            >
                                                <Link to={item.path}>
                                                    <Button
                                                        variant="ghost"
                                                        className={`w-full justify-start text-lg p-6 ${location.pathname === item.path ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                                                    >
                                                        <span className="mr-3">{item.icon}</span>
                                                        {item.label}
                                                    </Button>
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>

                            {/* Fixed Footer with Logout */}
                            <div className="flex-shrink-0 border-t border-gray-800 bg-gray-900">
                                <motion.div
                                    className="p-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Button
                                        variant="outline"
                                        className="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 border-gray-700 flex items-center gap-2 justify-center p-6 text-lg"
                                    >
                                        <FiLogOut className="text-xl" />
                                        Logout
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navbar