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
        scale: hovered ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Dây treo card */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.15]} />
        <meshStandardMaterial
          color="#CD7F32"
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

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
        <planeGeometry args={[0.20, 0.26]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#f8f8f8'}
          metalness={0.3}
          roughness={0.1}
          side={THREE.DoubleSide}
          emissive="#ffffff"
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </mesh>

      {/* Viền vàng nổi bật */}
      <mesh position={[0, 0, -0.003]}>
        <planeGeometry args={[0.24, 0.30]} />
        <meshStandardMaterial
          color="#FFD700"
          metalness={1}
          roughness={0.05}
          side={THREE.DoubleSide}
          emissive="#FFD700"
          emissiveIntensity={hovered ? 1.2 : 0.8}
        />
      </mesh>
      
      {/* Shadow layer */}
      <mesh position={[0, 0, -0.006]}>
        <planeGeometry args={[0.26, 0.32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Nội dung thẻ */}
      <Html
        transform
        occlude="blending"
        position={[0, 0, 0.01]}
        distanceFactor={0.25}
        zIndexRange={[0, 0]}
        style={{
          width: '55px',
          pointerEvents: 'none',
          userSelect: 'none',
          opacity: hovered ? 1 : 0.9,
        }}
      >
        <div className="text-center p-0.5">
          <div className="w-full h-5 bg-gradient-to-br from-amber-100 to-amber-300 rounded flex items-center justify-center mb-0.5">
            <div className="text-xs">{getEmoji(card.name)}</div>
          </div>
          <h3 className="font-semibold text-[6px] text-gray-900 leading-tight">{card.name}</h3>
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
