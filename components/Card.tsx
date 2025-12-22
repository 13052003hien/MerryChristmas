'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion-3d'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { WishCard } from '@/data/wishes'

interface CardProps {
  card: WishCard
  onClick: (card: WishCard) => void
  isSelected: boolean
}

export default function Card({ card, onClick, isSelected }: CardProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Hiệu ứng hover
  useFrame(({ clock }) => {
    if (meshRef.current && hovered && !isSelected) {
      meshRef.current.position.y += Math.sin(clock.elapsedTime * 4) * 0.002
    }
  })

  return (
    <motion.group
      position={card.position}
      rotation={card.rotation}
      animate={{
        scale: isSelected ? 1.5 : hovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onClick(card)
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <planeGeometry args={[0.35, 0.45]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : 'rgba(240, 240, 240, 0.95)'}
          metalness={0.1}
          roughness={0.3}
          side={THREE.DoubleSide}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Viền vàng mỏng */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[0.37, 0.47]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
          emissive="#FFD700"
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>

      {/* Nội dung thẻ */}
      <Html
        transform
        occlude
        position={[0, 0, 0.01]}
        style={{
          width: '90px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div className="text-center p-1">
          <div className="w-full h-10 bg-gradient-to-br from-amber-100 to-amber-300 rounded flex items-center justify-center mb-0.5">
            <div className="text-lg">{getEmoji(card.name)}</div>
          </div>
          <h3 className="font-semibold text-[10px] text-gray-900">{card.name}</h3>
        </div>
      </Html>

      {/* Hiệu ứng phát sáng khi hover */}
      {hovered && (
        <pointLight
          color="#FFD700"
          intensity={0.8}
          distance={1.5}
          decay={2}
        />
      )}
    </motion.group>
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
