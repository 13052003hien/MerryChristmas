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
    image: '/images/family.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '2',
    name: 'Bạn bè',
    message: 'Chúc các bạn một mùa Giáng sinh vui vẻ và năm mới thành công!',
    image: '/images/friends.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '3',
    name: 'Người yêu',
    message: 'Giáng sinh này, em chỉ muốn ở bên anh/em thật ấm áp!',
    image: '/images/love.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '4',
    name: 'Đồng nghiệp',
    message: 'Chúc đội ngũ một mùa lễ hội ấm cúng và năm mới nhiều thành tựu!',
    image: '/images/team.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '5',
    name: 'Thầy cô',
    message: 'Kính chúc thầy cô sức khỏe, hạnh phúc và luôn tràn đầy năng lượng!',
    image: '/images/teacher.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '6',
    name: 'Bản thân',
    message: 'Năm mới, hãy yêu thương bản thân nhiều hơn và đạt được mọi ước mơ!',
    image: '/images/self.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '7',
    name: 'Cha mẹ',
    message: 'Con yêu ba mẹ! Chúc ba mẹ luôn khỏe mạnh và hạnh phúc!',
    image: '/images/parents.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
  {
    id: '8',
    name: 'Anh chị em',
    message: 'Chúc anh chị em luôn vui vẻ, may mắn và thành đạt!',
    image: '/images/siblings.jpg',
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  },
]

// Tính toán vị trí xoắn ốc cho các thẻ
export const calculateSpiralPositions = (cards: WishCard[]): WishCard[] => {
  const spiralHeight = 6.5 // Chiều cao tổng của xoắn ốc
  const spiralRadius = 4.2 // Bán kính xoắn ốc - xa hơn khỏi cây
  const turns = 2.8 // Số vòng quay

  return cards.map((card, index) => {
    const t = index / (cards.length - 1)
    const angle = t * Math.PI * 2 * turns
    const y = spiralHeight * (0.12 + t * 0.76) - spiralHeight / 2

    return {
      ...card,
      position: [
        Math.cos(angle) * spiralRadius,
        y,
        Math.sin(angle) * spiralRadius,
      ],
      rotation: [0, -angle + Math.PI / 2, 0],
    }
  })
}
