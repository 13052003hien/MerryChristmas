'use client'

import React, { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ChristmasTree from './ChristmasTree'
import Star from './Star'
import Card from './Card'
import CardDetail from './CardDetail'
import { wishCards, calculateSpiralPositions, type WishCard } from '@/data/wishes'
import * as THREE from 'three'

function Scene() {
  const [selectedCard, setSelectedCard] = useState<WishCard | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const controlsRef = useRef<any>(null)

  const cards = calculateSpiralPositions(wishCards)

  const handleCardClick = (card: WishCard) => {
    setSelectedCard(card)
    
    // Zoom camera đến card
    if (cameraRef.current && controlsRef.current) {
      const targetPosition = new THREE.Vector3(...card.position)
      const offset = new THREE.Vector3(0, 0, 3)
      offset.applyEuler(new THREE.Euler(...card.rotation))
      
      controlsRef.current.enabled = false
      
      // Animate camera
      const startPosition = cameraRef.current.position.clone()
      const endPosition = targetPosition.clone().add(offset)
      
      let progress = 0
      const animate = () => {
        progress += 0.02
        if (progress < 1) {
          cameraRef.current!.position.lerpVectors(startPosition, endPosition, easeInOutCubic(progress))
          cameraRef.current!.lookAt(targetPosition)
          requestAnimationFrame(animate)
        } else {
          controlsRef.current.enabled = false
        }
      }
      animate()
    }
  }

  const handleCloseDetail = () => {
    setSelectedCard(null)
    if (controlsRef.current) {
      controlsRef.current.enabled = true
    }
  }

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[8, 3, 8]}
        fov={50}
      />
      
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={18}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={!selectedCard}
        autoRotateSpeed={0.3}
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
          isSelected={selectedCard?.id === card.id}
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

      {/* Card detail overlay */}
      {selectedCard && (
        <CardDetail card={selectedCard} onClose={handleCloseDetail} />
      )}
    </>
  )
}

export default function ChristmasScene() {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      style={{ background: '#000000' }}
    >
      <Scene />
    </Canvas>
  )
}

// Easing function
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
