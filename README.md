# Merry Christmas 3D - Interactive Christmas Tree

Một trang web tương tác 3D với cây thông Noel được tạo từ hệ thống hạt lấp lánh, các thẻ chúc mừng xoắn ốc và ngôi sao phát sáng trên đỉnh.

## Tính năng

- 🎄 Cây thông 3D được tạo từ 3000+ hạt vàng/đồng lấp lánh
- ⭐ Ngôi sao vàng phát sáng với hiệu ứng Bloom
- 🎴 8 thẻ chúc mừng xoắn ốc quanh cây thông
- 🔍 Thanh tìm kiếm để lọc lời chúc theo tên
- 🖱️ Xoay cây 360° với chuột (OrbitControls)
- 📱 Click vào thẻ để zoom và xem chi tiết
- ✨ Hiệu ứng ánh sáng và animation mượt mà

## Cài đặt

### Yêu cầu
- Node.js 18+ 
- npm hoặc yarn

### Các bước cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000)

## Công nghệ sử dụng

- **Next.js 14** - React framework
- **React Three Fiber** - React renderer cho Three.js
- **Three.js** - Thư viện 3D WebGL
- **@react-three/drei** - Helpers cho R3F
- **@react-three/postprocessing** - Post-processing effects (Bloom)
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS

## Cấu trúc thư mục

```
MerryChristmas/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── ChristmasScene.tsx  # Main 3D scene
│   ├── ChristmasTree.tsx   # Particle tree
│   ├── Star.tsx            # Glowing star
│   ├── Card.tsx            # Wish card
│   ├── CardDetail.tsx      # Card detail modal
│   ├── SearchBar.tsx       # Search component
│   └── LoadingScreen.tsx   # Loading screen
├── data/
│   └── wishes.ts           # Wish cards data
└── package.json
```

## Tùy chỉnh

### Thêm thẻ chúc mừng mới

Chỉnh sửa file `data/wishes.ts`:

```typescript
{
  id: '9',
  name: 'Tên người nhận',
  message: 'Lời chúc của bạn',
  image: '/images/custom.jpg',
  position: [0, 0, 0],
  rotation: [0, 0, 0],
}
```

### Thay đổi màu sắc cây thông

Trong `components/ChristmasTree.tsx`, thay đổi:

```typescript
const goldColor = new THREE.Color('#FFD700')
const bronzeColor = new THREE.Color('#CD7F32')
```

### Điều chỉnh hiệu ứng Bloom

Trong `components/ChristmasScene.tsx`:

```typescript
<Bloom
  intensity={1.5}        // Độ sáng
  luminanceThreshold={0.5}  // Ngưỡng phát sáng
  luminanceSmoothing={0.9}  // Độ mượt
/>
```

## Build cho production

```bash
npm run build
npm start
```

## License

MIT

## Credits

Được tạo với ❤️ bởi GitHub Copilot
