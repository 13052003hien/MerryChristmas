'use client'

import React, { useState, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Create a context for search
const SearchContext = createContext<{
  searchTerm: string
  setSearchTerm: (term: string) => void
} | null>(null)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within SearchProvider')
  }
  return context
}

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch()
  const [isFocused, setIsFocused] = useState(false)

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md px-4"
    >
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full blur opacity-75"></div>
        
        {/* Search bar */}
        <div className="relative bg-black bg-opacity-80 backdrop-blur-lg rounded-full border-2 border-amber-500 shadow-2xl">
          <div className="flex items-center px-6 py-4">
            {/* Search icon */}
            <svg
              className="w-5 h-5 text-amber-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            {/* Input */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Tìm kiếm lời chúc..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm font-medium"
            />

            {/* Clear button */}
            <AnimatePresence>
              {searchTerm && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={() => setSearchTerm('')}
                  className="ml-2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="text-center text-gray-400 text-xs mt-3"
      >
        🎄 Nhấp vào thẻ để xem chi tiết • Kéo để xoay cây thông
      </motion.p>
    </motion.div>
  )
}
