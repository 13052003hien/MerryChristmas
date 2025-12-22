import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Star() {
  const starRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  // Animation quay và phát sáng
  useFrame(({ clock }) => {
    if (starRef.current) {
      starRef.current.rotation.y = clock.elapsedTime * 0.5
      starRef.current.rotation.z = Math.sin(clock.elapsedTime) * 0.1
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.2
      glowRef.current.scale.set(scale, scale, scale)
    }
  })

  // Tạo hình ngôi sao 5 cánh
  const starShape = new THREE.Shape()
  const outerRadius = 0.4
  const innerRadius = 0.2
  const points = 5

  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (i * Math.PI) / points
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (i === 0) starShape.moveTo(x, y)
    else starShape.lineTo(x, y)
  }
  starShape.closePath()

  const extrudeSettings = {
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 3,
  }

  return (
    <group position={[0, 4.5, 0]}>
      {/* Ngôi sao chính */}
      <mesh ref={starRef}>
        <extrudeGeometry args={[starShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Hiệu ứng phát sáng */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point light để tạo ánh sáng */}
      <pointLight color="#FFD700" intensity={3} distance={10} decay={2} />
    </group>
  )
}
