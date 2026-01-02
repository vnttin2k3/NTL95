import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-secondary text-white py-12">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="font-inter font-bold text-xl text-secondary">
                                NTL 95 <span className="text-primary">Barber Shop</span>
                            </span>
                        </Link>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Tiệm cắt tóc nam chuyên nghiệp. Phục vụ tận tâm,
                            chất lượng hàng đầu.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-inter font-semibold text-lg mb-4 text-white">
                            Liên kết
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dat-lich"
                                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                                >
                                    Đặt lịch
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dang-nhap"
                                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                                >
                                    Đăng nhập
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dang-ky"
                                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                                >
                                    Đăng ký
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-inter font-semibold text-lg mb-4 text-white">
                            Liên hệ
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Ấp Bình Thuận, Xã Phước Chỉ, Tỉnh Tây Ninh</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>0901 234 567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-300">
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>8:00 - 20:00 (Thứ 2 - CN)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-600 text-center">
                    <p className="text-gray-400 text-sm">
                        &copy; 2026 NTL 95 Barber Shop | Code by <a href="https://www.facebook.com/tin.maxter">Tín Võ</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
