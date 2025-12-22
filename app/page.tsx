'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import LoadingScreen from '@/components/LoadingScreen'

const ChristmasScene = dynamic(() => import('@/components/ChristmasScene'), {
  ssr: false,
  loading: () => <LoadingScreen />,
})

export default function Home() {
  return (
    <main className="w-full h-screen bg-black relative overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <ChristmasScene />
      </Suspense>
      
      {/* Hint text */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
        <p className="text-center text-amber-400 text-sm font-light tracking-wide opacity-60">
          🎄 Click vào thẻ để xem chi tiết • Kéo để xoay cây thông
        </p>
      </div>
    </main>
  )
}
