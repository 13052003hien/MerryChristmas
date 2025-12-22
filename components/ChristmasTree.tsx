import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ChristmasTree() {
  const particlesRef = useRef<THREE.Points>(null)

  // Tạo hệ thống hạt cho cây thông
  const { positions, colors, sizes } = useMemo(() => {
    const particleCount = 5000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const goldColor = new THREE.Color('#FFD700')
    const brightGold = new THREE.Color('#FFED4E')
    const bronzeColor = new THREE.Color('#CD7F32')

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Tạo hình dạng cây thông (hình nón)
      const height = Math.random() * 8 - 4 // -4 đến 4
      const radius = (4 - height) * 0.5 // Bán kính giảm dần theo chiều cao
      const angle = Math.random() * Math.PI * 2

      positions[i3] = Math.cos(angle) * radius * Math.random()
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius * Math.random()

      // Màu sắc vàng/vàng đồng với thêm màu sáng
      const rand = Math.random()
      const color = rand > 0.7 ? brightGold : rand > 0.4 ? goldColor : bronzeColor
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      // Kích thước ngẫu nhiên, một số hạt lớn hơn
      sizes[i] = Math.random() > 0.95 ? Math.random() * 0.15 + 0.08 : Math.random() * 0.1 + 0.02
    }

    return { positions, colors, sizes }
  }, [])

  // Animation nhấp nháy
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const material = particlesRef.current.material as THREE.PointsMaterial
      material.opacity = 0.8 + Math.sin(clock.elapsedTime * 1.5) * 0.2
      
      // Xoay nhẹ cây thông
      particlesRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
