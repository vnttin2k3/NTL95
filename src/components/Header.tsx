'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isBookingPage = pathname === '/dat-lich';

    return (
        <header className="sticky top-0 z-50 header-glass">
            <div className="container">
                <nav className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-lg">95</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-inter font-bold text-lg text-secondary leading-tight">
                                NTL 95 <span className="text-primary">Barber Shop</span>
                            </span>
                            <span className="text-xs text-text-muted hidden sm:block">Nguyễn Tấn Lộc</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className={`font-medium transition-colors py-2 ${pathname === '/' ? 'text-primary font-bold' : 'text-text-secondary hover:text-primary'}`}
                        >
                            Trang chủ
                        </Link>
                        <Link
                            href="/dat-lich"
                            className={`font-medium transition-colors py-2 ${isBookingPage ? 'text-primary font-bold' : 'text-text-secondary hover:text-primary'}`}
                        >
                            Đặt lịch
                        </Link>
                        <Link
                            href="/dang-nhap"
                            className={`font-medium transition-colors py-2 ${pathname === '/dang-nhap' ? 'text-primary font-bold' : 'text-text-secondary hover:text-primary'}`}
                        >
                            Đăng nhập
                        </Link>
                    </div>

                    {/* Mobile Menu Button - 44px touch target */}
                    <button
                        className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl text-secondary hover:bg-gray-100 transition-colors touch-target"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                        aria-expanded={isMenuOpen}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border animate-slideDown">
                        <div className="flex flex-col gap-1">
                            <Link
                                href="/"
                                className={`font-medium px-4 py-3 rounded-xl transition-colors ${pathname === '/' ? 'text-primary bg-gray-50' : 'text-text hover:text-primary hover:bg-gray-50'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Trang chủ
                            </Link>
                            <Link
                                href="/dat-lich"
                                className={`font-medium px-4 py-3 rounded-xl transition-colors ${isBookingPage ? 'text-primary bg-gray-50' : 'text-text hover:text-primary hover:bg-gray-50'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Đặt lịch
                            </Link>
                            <Link
                                href="/dang-nhap"
                                className={`font-medium px-4 py-3 rounded-xl transition-colors ${pathname === '/dang-nhap' ? 'text-primary bg-gray-50' : 'text-text hover:text-primary hover:bg-gray-50'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                href="/dang-ky"
                                className={`font-medium px-4 py-3 rounded-xl transition-colors ${pathname === '/dang-ky' ? 'text-primary bg-gray-50' : 'text-text hover:text-primary hover:bg-gray-50'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
