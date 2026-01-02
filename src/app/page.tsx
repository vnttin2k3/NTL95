import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock services data
const services = [
  {
    id: 1,
    name: 'Cắt tóc nam',
    price: 80000,
    duration: 30,
    description: 'Cắt tóc theo yêu cầu, tư vấn kiểu phù hợp khuôn mặt',
    icon: '✂️',
  },
  {
    id: 2,
    name: 'Cắt + Gội',
    price: 120000,
    duration: 45,
    description: 'Combo cắt tóc kèm gội đầu',
    icon: '💆',
    popular: true,
  },
  {
    id: 3,
    name: 'Cạo mặt',
    price: 50000,
    duration: 20,
    description: 'Cạo râu, tỉa lông mày chuyên nghiệp',
    icon: '🪒',
  },
  {
    id: 4,
    name: 'Uốn tóc',
    price: 200000,
    duration: 60,
    description: 'Uốn tóc Hàn Quốc, giữ nếp lâu',
    icon: '🌀',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Clean Dark Background */}
        <section
          className="relative py-16 sm:py-20 md:py-28 overflow-hidden"
          style={{ background: '#111827' }}
        >
          <div className="container relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1 max-w-xl">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium mb-6 animate-fadeIn border border-white/20">
                  <span>💈</span>
                  <span>Chào mừng đến NTL 95 Barber Shop</span>
                </span>

                {/* Title - White text, Green accent */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight animate-slideUp text-white">
                  Phong cách{' '}
                  <span style={{ color: '#16A34A' }}>đẳng cấp</span>
                  <br className="hidden sm:block" />
                  {' '}cho quý ông
                </h1>

                {/* Description */}
                <p className="text-lg mb-8 leading-relaxed animate-slideUp text-gray-300">
                  Đặt lịch cắt tóc online nhanh chóng, tiện lợi.
                  Tích điểm đổi quà với mỗi lần sử dụng dịch vụ.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 animate-slideUp">
                  <Link href="/dat-lich" className="btn btn-primary text-lg px-8 py-4">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Đặt lịch ngay
                  </Link>
                  <Link
                    href="/dang-ky"
                    className="btn border-2 border-white text-white hover:bg-white hover:text-black"
                  >
                    Đăng ký thành viên
                  </Link>
                </div>
              </div>

              {/* Hero Image / Avatar */}
              <div className="hidden lg:block relative w-80 h-80 lg:w-96 lg:h-96 flex-shrink-0 animate-scaleIn">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full border border-white/10 scale-110 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border border-white/20 scale-105"></div>

                {/* Main Avatar Container */}
                <div className="relative w-full h-full rounded-full border-[8px] border-white shadow-2xl overflow-hidden bg-gray-800">
                  <Image
                    src="/avatar.png"
                    alt="NTL 95 Barber"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-14 sm:py-20 bg-background">
          <div className="container">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block px-4 py-2 bg-primary-light text-primary-dark rounded-full text-sm font-semibold mb-4">
                Dịch vụ
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4 text-balance">
                Dịch vụ của chúng tôi
              </h2>
              <p className="text-text-muted max-w-lg mx-auto text-balance">
                Đa dạng dịch vụ chăm sóc tóc nam chuyên nghiệp với mức giá hợp lý
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="card text-center relative h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Popular badge */}
                  {'popular' in service && service.popular && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-primary to-primary-hover text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Phổ biến
                    </span>
                  )}

                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-light to-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl sm:text-3xl shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="font-inter font-bold text-base sm:text-lg text-secondary mb-2">
                    {service.name}
                  </h3>
                  <p className="text-text-muted text-sm mb-4 leading-relaxed min-h-[3rem]">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-auto">
                    <span className="font-bold text-primary text-lg sm:text-xl">
                      {service.price.toLocaleString()}đ
                    </span>
                    <span className="text-text-muted text-sm bg-gray-100 px-2 py-0.5 rounded-full">
                      ~{service.duration} phút
                    </span>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </section>

        {/* Why Choose Us - Cleaner design */}
        <section className="py-14 sm:py-20 bg-surface">
          <div className="container">
            <div className="text-center mb-10 sm:mb-12">
              <span className="inline-block px-4 py-2 bg-success-light text-success-dark rounded-full text-sm font-semibold mb-4">
                Tại sao chọn chúng tôi
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary text-balance">
                Trải nghiệm khác biệt
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: 'from-primary to-primary-hover',
                  title: 'Đặt lịch 24/7',
                  desc: 'Đặt lịch online mọi lúc, không cần gọi điện. Nhận xác nhận ngay lập tức.',
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: 'from-success to-success-dark',
                  title: 'Tích điểm đổi quà',
                  desc: 'Mỗi 10.000đ = 1 điểm. Tích lũy và đổi thưởng hấp dẫn.',
                },
                {
                  icon: (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  ),
                  color: 'from-warning to-yellow-600',
                  title: 'Thợ chuyên nghiệp',
                  desc: 'Nhiều năm kinh nghiệm, luôn cập nhật xu hướng mới nhất.',
                },
              ].map((item, index) => (
                <div key={index} className="text-center p-6 sm:p-8 rounded-2xl transition-all duration-300 ease-in-out hover:bg-white hover:shadow-lg hover:-translate-y-1">
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-inter font-bold text-lg sm:text-xl text-secondary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
}
