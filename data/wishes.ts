export interface WishCard {
  id: string
  name: string
  message: string
  image: string
  position: [number, number, number]
  rotation: [number, number, number]
}

export const wishCards: WishCard[] = [
  {
    id: '1',
    name: 'Gia đình',
    message: 'Chúc gia đình luôn ấm no, hạnh phúc và tràn đầy tiếng cười!',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '2',
    name: 'Bạn bè',
    message: 'Chúc các bạn một mùa Giáng sinh vui vẻ và năm mới thành công!',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '3',
    name: 'Người yêu',
    message: 'Giáng sinh này, em chỉ muốn ở bên anh/em thật ấm áp!',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '4',
    name: 'Đồng nghiệp',
    message: 'Chúc đội ngũ một mùa lễ hội ấm cúng và năm mới nhiều thành tựu!',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '5',
    name: 'Thầy cô',
    message: 'Kính chúc thầy cô sức khỏe, hạnh phúc và luôn tràn đầy năng lượng!',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '6',
    name: 'Bản thân',
    message: 'Năm mới, hãy yêu thương bản thân nhiều hơn và đạt được mọi ước mơ!',
    image: 'https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '7',
    name: 'Cha mẹ',
    message: 'Con yêu ba mẹ! Chúc ba mẹ luôn khỏe mạnh và hạnh phúc!',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '8',
    name: 'Anh chị em',
    message: 'Chúc anh chị em luôn vui vẻ, may mắn và thành đạt!',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
]

// Tính toán vị trí xoắn ốc cho các thẻ - gắn gần cây thông hơn
export const calculateSpiralPositions = (cards: WishCard[]): WishCard[] => {
  const spiralHeight = 6.0 // Chiều cao tổng của xoắn ốc
  const spiralRadius = 1.8 // Bán kính xoắn ốc - rất gần cây
  const turns = 2.5 // Số vòng quay

  return cards.map((card, index) => {
    const t = index / (cards.length - 1)
    const angle = t * Math.PI * 2 * turns
    const y = spiralHeight * (0.15 + t * 0.7) - spiralHeight / 2
    
    // Tạo độ lệch ngẫu nhiên nhẹ để card trông tự nhiên hơn
    const radiusVariation = Math.sin(index * 1.7) * 0.1

    return {
      ...card,
      position: [
        Math.cos(angle) * (spiralRadius + radiusVariation),
        y,
        Math.sin(angle) * (spiralRadius + radiusVariation),
      ],
      rotation: [0, -angle + Math.PI / 2, Math.sin(index * 0.5) * 0.05],
    }
  })
}
