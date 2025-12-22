'use client'

import React from 'react'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import type { WishCard } from '@/data/wishes'

interface CardDetailProps {
  card: WishCard
  onClose: () => void
}

export default function CardDetail({ card, onClose }: CardDetailProps) {
  return (
    <Html fullscreen>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header với viền vàng */}
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
            >
              <svg
                className="w-6 h-6"
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
            </button>
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              {card.name}
            </h2>
          </div>

          {/* Hình ảnh/Icon */}
          <div className="p-6">
            <div className="w-full h-40 bg-gradient-to-br from-amber-200 to-amber-400 rounded-xl mb-4 flex items-center justify-center shadow-lg">
              <div className="text-7xl">{getEmoji(card.name)}</div>
            </div>

            {/* Lời chúc */}
            <div className="bg-white rounded-xl p-5 shadow-inner">
              <p className="text-gray-800 text-base leading-relaxed text-center font-medium">
                {card.message}
              </p>
            </div>

            {/* Trang trí */}
            <div className="flex justify-center gap-2 mt-5">
              <span className="text-xl animate-pulse">✨</span>
              <span className="text-xl animate-pulse delay-100">🎄</span>
              <span className="text-xl animate-pulse delay-200">✨</span>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-3 text-center">
            <p className="text-white font-semibold text-sm">Merry Christmas! 🎅🎁</p>
          </div>
        </motion.div>
      </motion.div>
    </Html>
  )
}

// Helper function để lấy emoji theo tên
function getEmoji(name: string): string {
  const emojiMap: { [key: string]: string } = {
    'Gia đình': '👨‍👩‍👧‍👦',
    'Bạn bè': '👥',
    'Người yêu': '❤️',
    'Đồng nghiệp': '💼',
    'Thầy cô': '👨‍🏫',
    'Bản thân': '✨',
    'Cha mẹ': '👪',
    'Anh chị em': '👫',
  }
  return emojiMap[name] || '🎄'
}
