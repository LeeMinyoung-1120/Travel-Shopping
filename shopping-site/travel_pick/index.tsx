// src/index.tsx
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Products data
const products = [
  // 인기 급상승 여행지 (4개)
  {
    id: 1,
    title: "라오스 반비엥 카약투어",
    price: 1099000,
    unitPrice: 1099000,
    thumbnail: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 27,
    section: "popular",
    tag: "특가",
    description: "라오스의 숨은 보석, 반비엥에서 즐기는 카약과 자연",
  },
  {
    id: 2,
    title: "지중해 마나도 스노클링",
    price: 1720000,
    unitPrice: 1720000,
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 63,
    section: "popular",
    tag: "인기",
    description: "투명한 바다 속 산호초와 열대어를 만나는 특별한 경험",
  },
  {
    id: 3,
    title: "규슈 온천과 자연 힐링 3일",
    price: 990000,
    unitPrice: 990000,
    thumbnail: "https://images.unsplash.com/photo-1543693351-8e7ddf5f0e4c?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 48,
    section: "popular",
    tag: "힐링",
    description: "일본 규슈의 천연 온천에서 몸과 마음의 휴식을",
  },
  {
    id: 4,
    title: "카파도키아 열기구 투어",
    price: 2690000,
    unitPrice: 2690000,
    thumbnail: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 81,
    section: "popular",
    tag: "인기",
    description: "터키 카파도키아 일출 열기구, 일생에 한 번의 경험",
  },
  // 지금 핫한 투어·티켓 (4개)
  {
    id: 5,
    title: "도쿄 디즈니랜드 티켓",
    price: 180000,
    unitPrice: 180000,
    thumbnail: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&h=300&fit=crop",
    rating: 4.8,
    reviewCount: 120,
    section: "hot",
    tag: "티켓",
    description: "도쿄 디즈니랜드 1일권 + 익스프레스 패스",
  },
  {
    id: 6,
    title: "보르도 와이너리 투어",
    price: 875000,
    unitPrice: 875000,
    thumbnail: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&h=300&fit=crop",
    rating: 4.9,
    reviewCount: 55,
    section: "hot",
    tag: "미식",
    description: "프랑스 보르도 와이너리 투어 + 시음 체험",
  },
  {
    id: 7,
    title: "라오스 정글 트레킹",
    price: 384000,
    unitPrice: 384000,
    thumbnail: "https://images.unsplash.com/photo-1520526275768-4adb8e45dde8?w=400&h=300&fit=crop",
    rating: 4.6,
    reviewCount: 42,
    section: "hot",
    tag: "액티비티",
    description: "라오스 정글을 걸으며 느끼는 자연의 신비",
  },
  {
    id: 8,
    title: "반고흐 미술관 입장권",
    price: 45000,
    unitPrice: 45000,
    thumbnail: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 88,
    section: "hot",
    tag: "문화",
    description: "암스테르담 반고흐 미술관 프리미엄 티켓",
  },
];

// API endpoint to get products
app.get('/api/products', (c) => {
  return c.json(products)
})

// Main page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Travel Pick - 당신의 여행 성향을 찾고 완벽한 일정을 만들어보세요</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .carousel-img {
            transition: opacity 0.5s ease-in-out;
          }
          .fade-enter {
            opacity: 0;
          }
          .fade-enter-active {
            opacity: 1;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="bg-white shadow-sm sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" class="flex items-center gap-2">
              <div class="text-2xl font-bold text-green-600">
                <i class="fas fa-plane-departure"></i> Travel Pick
              </div>
            </a>

            <div class="flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="나의 여행 스타일 찾는 키"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div class="flex items-center gap-4">
              <button class="text-sm border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
                로그인 & 회원가입
              </button>

              <div class="relative">
                <button class="text-2xl">🛒</button>
                <span id="cart-badge" class="hidden absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold">
                  0
                </span>
              </div>
            </div>
          </div>
        </header>

        <!-- Hero Carousel -->
        <div id="carousel" class="relative w-full h-[400px] overflow-hidden">
          <img
            id="carousel-img"
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop"
            alt="Banner"
            class="w-full h-full object-cover carousel-img"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 id="carousel-title" class="text-4xl font-bold mb-2">당신의 여행 성향을 찾고</h1>
            <p id="carousel-subtitle" class="text-xl mb-6">완벽한 일정을 만들어보세요</p>
            <button class="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg font-semibold text-lg transition">
              더 알아보기
            </button>
          </div>

          <button
            id="carousel-prev"
            class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
          >
            ◀
          </button>
          <button
            id="carousel-next"
            class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg"
          >
            ▶
          </button>
        </div>

        <!-- 당신을 위한 여행 -->
        <section class="py-12 bg-white">
          <h2 class="text-center text-2xl font-bold mb-2">당신을 위한 여행</h2>
          <p class="text-center text-gray-500 mb-8">
            모든 여행은 당신의 취향에서 시작됩니다
          </p>
          <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=400&h=300&fit=crop" alt="간편한 예약 시스템" class="w-full h-48 object-cover" />
              <div class="p-5">
                <h3 class="font-bold text-lg mb-1">간편한 예약 시스템</h3>
                <p class="text-sm text-gray-600">클릭 한 번으로 완료되는 예약</p>
              </div>
            </div>
            <div class="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop" alt="MBTI 기반 맞춤 추천" class="w-full h-48 object-cover" />
              <div class="p-5">
                <h3 class="font-bold text-lg mb-1">MBTI 기반 맞춤 추천</h3>
                <p class="text-sm text-gray-600">나의 성향에 딱 맞는 여행지</p>
              </div>
            </div>
            <div class="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop" alt="이색 오감 투어" class="w-full h-48 object-cover" />
              <div class="p-5">
                <h3 class="font-bold text-lg mb-1">이색 오감 투어</h3>
                <p class="text-sm text-gray-600">새로운 경험과 감각의 향연</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 상세 카테고리 필터 칩 -->
        <section class="py-6 bg-white border-t">
          <div class="max-w-6xl mx-auto px-4">
            <p class="text-sm text-gray-600 mb-3">상세 카테고리를 선택하세요</p>
            <div id="filter-chips" class="flex gap-2 flex-wrap">
              <button class="chip-btn px-4 py-2 rounded-full text-sm font-medium transition bg-green-500 text-white" data-chip="전체">
                전체
              </button>
              <button class="chip-btn px-4 py-2 rounded-full text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200" data-chip="내륙">
                내륙
              </button>
              <button class="chip-btn px-4 py-2 rounded-full text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200" data-chip="MBTI">
                MBTI
              </button>
              <button class="chip-btn px-4 py-2 rounded-full text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200" data-chip="액티비티">
                액티비티
              </button>
              <button class="chip-btn px-4 py-2 rounded-full text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200" data-chip="미식투어">
                미식투어
              </button>
            </div>
          </div>
        </section>

        <!-- 인기 급상승 여행지 -->
        <section class="py-10 bg-white">
          <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-2xl font-bold mb-6">인기 급상승 여행지</h2>
            <div id="popular-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <!-- Products will be loaded here -->
            </div>
          </div>
        </section>

        <!-- 지금 핫한 투어·티켓 -->
        <section class="py-10 bg-white border-t">
          <div class="max-w-6xl mx-auto px-4">
            <h2 class="text-2xl font-bold mb-6">지금 핫한 투어 · 티켓</h2>
            <div id="hot-products" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <!-- Products will be loaded here -->
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8">
          <div class="max-w-6xl mx-auto px-4 text-center">
            <p class="text-sm">&copy; 2026 Travel Pick. All rights reserved.</p>
            <p class="text-xs text-gray-400 mt-2">당신의 여행 파트너, 트래블픽</p>
          </div>
        </footer>

        <script>
          // Carousel functionality
          const banners = [
            {
              img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=400&fit=crop",
              title: "당신의 여행 성향을 찾고",
              subtitle: "완벽한 일정을 만들어보세요",
            },
            {
              img: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1200&h=400&fit=crop",
              title: "MBTI 기반 맞춤 추천",
              subtitle: "당신만의 특별한 여행을 시작하세요",
            },
          ];

          let currentBanner = 0;
          const carouselImg = document.getElementById('carousel-img');
          const carouselTitle = document.getElementById('carousel-title');
          const carouselSubtitle = document.getElementById('carousel-subtitle');

          function updateCarousel() {
            carouselImg.src = banners[currentBanner].img;
            carouselTitle.textContent = banners[currentBanner].title;
            carouselSubtitle.textContent = banners[currentBanner].subtitle;
          }

          document.getElementById('carousel-prev').addEventListener('click', () => {
            currentBanner = (currentBanner - 1 + banners.length) % banners.length;
            updateCarousel();
          });

          document.getElementById('carousel-next').addEventListener('click', () => {
            currentBanner = (currentBanner + 1) % banners.length;
            updateCarousel();
          });

          // Auto-rotate carousel
          setInterval(() => {
            currentBanner = (currentBanner + 1) % banners.length;
            updateCarousel();
          }, 5000);

          // Filter chips functionality
          const chipBtns = document.querySelectorAll('.chip-btn');
          chipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              chipBtns.forEach(b => {
                b.className = 'chip-btn px-4 py-2 rounded-full text-sm font-medium transition bg-gray-100 text-gray-700 hover:bg-gray-200';
              });
              btn.className = 'chip-btn px-4 py-2 rounded-full text-sm font-medium transition bg-green-500 text-white';
            });
          });

          // Load products
          fetch('/api/products')
            .then(res => res.json())
            .then(products => {
              const popularProducts = products.filter(p => p.section === 'popular');
              const hotProducts = products.filter(p => p.section === 'hot');

              const popularContainer = document.getElementById('popular-products');
              const hotContainer = document.getElementById('hot-products');

              function createProductCard(product) {
                return \`
                  <a href="/products/\${product.id}" class="block bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
                    <div class="relative">
                      <img src="\${product.thumbnail}" alt="\${product.title}" class="w-full h-48 object-cover" />
                      \${product.tag ? \`
                        <span class="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                          \${product.tag}
                        </span>
                      \` : ''}
                      <button class="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-white">
                        🤍
                      </button>
                    </div>
                    <div class="p-4">
                      <h3 class="font-semibold text-sm mb-2 line-clamp-2">\${product.title}</h3>
                      <div class="flex items-center gap-1 text-sm text-gray-600 mb-2">
                        <span class="text-yellow-500">⭐</span>
                        <span class="font-medium">\${product.rating}</span>
                        <span class="text-gray-400">(\${product.reviewCount})</span>
                      </div>
                      <p class="text-lg font-bold text-gray-900">
                        \${product.price.toLocaleString()}원
                      </p>
                    </div>
                  </a>
                \`;
              }

              popularContainer.innerHTML = popularProducts.map(createProductCard).join('');
              hotContainer.innerHTML = hotProducts.map(createProductCard).join('');
            });
        </script>
    </body>
    </html>
  `)
})

export default app
