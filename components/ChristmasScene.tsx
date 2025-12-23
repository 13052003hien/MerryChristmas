'use client'

import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ChristmasTree from './ChristmasTree'
import Star from './Star'
import Card from './Card'
import { wishCards, calculateSpiralPositions, type WishCard } from '@/data/wishes'
import * as THREE from 'three'
import { motion, AnimatePresence } from 'framer-motion'

function Scene({ onCardClick, selectedCardId }: { onCardClick: (card: WishCard) => void; selectedCardId?: string }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const controlsRef = useRef<any>(null)

  const cards = calculateSpiralPositions(wishCards)

  const handleCardClick = (card: WishCard) => {
    onCardClick(card)
  }

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[7, 3, 7]}
        fov={55}
      />
      
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={4}
        maxDistance={12}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={!selectedCardId}
        autoRotateSpeed={0.5}
        makeDefault
      />

      {/* Ánh sáng */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[0, 5, 0]} intensity={1} color="#FFD700" distance={15} />

      {/* Cây thông */}
      <ChristmasTree />

      {/* Ngôi sao */}
      <Star />

      {/* Cards */}
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={handleCardClick}
          isSelected={selectedCardId === card.id}
        />
      ))}

      {/* Hiệu ứng Bloom */}
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  )
}

export default function ChristmasScene() {
  const [selectedCard, setSelectedCard] = useState<WishCard | null>(null)

  const handleCardClick = (card: WishCard) => {
    setSelectedCard(card)
  }

  const handleCloseDetail = () => {
    setSelectedCard(null)
  }

  return (
    <>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        style={{ background: '#000000', pointerEvents: 'auto' }}
      >
        <Scene onCardClick={handleCardClick} selectedCardId={selectedCard?.id} />
      </Canvas>

      {/* Card detail overlay - bên ngoài Canvas */}
      <AnimatePresence>
        {selectedCard && (
          <CardDetailOverlay card={selectedCard} onClose={handleCloseDetail} />
        )}
      </AnimatePresence>
    </>
  )
}

// Component CardDetailOverlay bên ngoài Canvas
function CardDetailOverlay({ card, onClose }: { card: WishCard; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 pointer-events-auto"
      style={{ background: 'rgba(0, 0, 0, 0.85)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
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
          <div className="w-full h-48 rounded-xl mb-4 shadow-lg overflow-hidden relative">
            <img 
              src={card.image} 
              alt={card.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback nếu ảnh không load được
                e.currentTarget.style.display = 'none'
                if (e.currentTarget.nextElementSibling) {
                  (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'
                }
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-400 rounded-xl hidden items-center justify-center">
              <div className="text-7xl">{getEmoji(card.name)}</div>
            </div>
            {/* Overlay emoji */}
            <div className="absolute top-3 right-3 text-4xl bg-white/80 rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
              {getEmoji(card.name)}
            </div>
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

// Easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
