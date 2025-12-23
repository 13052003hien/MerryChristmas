import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ChristmasTree() {
  const particlesRef = useRef<THREE.Points>(null)
  const ornamentsRef = useRef<THREE.Group>(null)

  // Tạo hệ thống hạt cho cây thông
  const { positions, colors, sizes } = useMemo(() => {
    const particleCount = 8000 // Tăng số lượng particles
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const goldColor = new THREE.Color('#FFD700')
    const brightGold = new THREE.Color('#FFED4E')
    const redColor = new THREE.Color('#FF0000')
    const greenColor = new THREE.Color('#00FF00')
    const blueColor = new THREE.Color('#0099FF')
    const pinkColor = new THREE.Color('#FF69B4')
    const orangeColor = new THREE.Color('#FFA500')
    const whiteColor = new THREE.Color('#FFFFFF')

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Tạo hình dạng cây thông (hình nón)
      const height = Math.random() * 8 - 4 // -4 đến 4
      const radius = (4 - height) * 0.5 // Bán kính giảm dần theo chiều cao
      const angle = Math.random() * Math.PI * 2

      positions[i3] = Math.cos(angle) * radius * Math.random()
      positions[i3 + 1] = height
      positions[i3 + 2] = Math.sin(angle) * radius * Math.random()

      // Nhiều màu sắc rực rỡ hơn
      const rand = Math.random()
      let color
      if (rand > 0.85) color = redColor
      else if (rand > 0.7) color = greenColor
      else if (rand > 0.6) color = blueColor
      else if (rand > 0.5) color = pinkColor
      else if (rand > 0.4) color = orangeColor
      else if (rand > 0.3) color = whiteColor
      else if (rand > 0.15) color = brightGold
      else color = goldColor
      
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b

      // Kích thước ngẫu nhiên, nhiều hạt lớn hơn
      sizes[i] = Math.random() > 0.9 ? Math.random() * 0.2 + 0.1 : Math.random() * 0.12 + 0.03
    }

    return { positions, colors, sizes }
  }, [])

  // Tạo các quả cầu trang trí
  const ornaments = useMemo(() => {
    const orns = []
    const ornamentCount = 15
    const colors = ['#FF0000', '#00FF00', '#0099FF', '#FFD700', '#FF69B4', '#FFA500']
    
    for (let i = 0; i < ornamentCount; i++) {
      const height = (Math.random() * 7 - 3.5)
      const radius = (4 - height) * 0.4
      const angle = (i / ornamentCount) * Math.PI * 2 + Math.random() * 0.5
      
      orns.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.08 + 0.08
      })
    }
    return orns
  }, [])

  // Animation nhấp nháy mạnh hơn
  useFrame(({ clock }) => {
    if (particlesRef.current && particlesRef.current.material) {
      const material = particlesRef.current.material as THREE.PointsMaterial
      // Nhấp nháy mạnh và nhanh hơn
      material.opacity = 0.7 + Math.sin(clock.elapsedTime * 2.5) * 0.3
      
      // Xoay nhẹ cây thông
      particlesRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.05
    }
    
    // Animation cho ornaments
    if (ornamentsRef.current) {
      ornamentsRef.current.children.forEach((ornament, i) => {
        ornament.position.y += Math.sin(clock.elapsedTime * 2 + i) * 0.001
        ornament.rotation.y = clock.elapsedTime * 0.5 + i
      })
    }
  })

  return (
    <>
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
          size={0.15}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Quả cầu trang trí */}
      <group ref={ornamentsRef}>
        {ornaments.map((orn, i) => (
          <mesh key={i} position={orn.position}>
            <sphereGeometry args={[orn.size, 16, 16]} />
            <meshStandardMaterial
              color={orn.color}
              metalness={0.8}
              roughness={0.2}
              emissive={orn.color}
              emissiveIntensity={0.5}
            />
            {/* Ánh sáng từng quả cầu */}
            <pointLight color={orn.color} intensity={0.3} distance={0.5} />
          </mesh>
        ))}
      </group>
    </>
  )
}
