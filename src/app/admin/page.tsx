'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data
const todayBookings = [
    { id: '1', name: 'Nguyễn Văn A', phone: '0901234567', service: 'Cắt + Gội', time: '09:00', price: 120000, status: 'confirmed', isVerified: true },
    { id: '2', name: 'Trần Văn B', phone: '0912345678', service: 'Cắt tóc', time: '10:00', price: 80000, status: 'confirmed', isVerified: false },
    { id: '3', name: 'Lê Văn C', phone: '0923456789', service: 'Uốn tóc', time: '11:00', price: 200000, status: 'completed', isVerified: true },
    { id: '4', name: 'Phạm Văn D', phone: '0934567890', service: 'Cạo mặt', time: '14:00', price: 50000, status: 'confirmed', isVerified: false },
];

const stats = {
    todayRevenue: 450000,
    todayBookings: 4,
    completedBookings: 1,
    pendingBookings: 3,
};

export default function AdminDashboard() {
    const [bookings, setBookings] = useState(todayBookings);
    const [activeTab, setActiveTab] = useState<'today' | 'all'>('today');

    const handleComplete = (id: string) => {
        setBookings(prev =>
            prev.map(b => (b.id === id ? { ...b, status: 'completed' } : b))
        );
    };

    const handleVerify = (id: string) => {
        setBookings(prev =>
            prev.map(b => (b.id === id ? { ...b, isVerified: true } : b))
        );
    };

    const handleCancel = (id: string) => {
        setBookings(prev =>
            prev.map(b => (b.id === id ? { ...b, status: 'cancelled' } : b))
        );
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Admin Header - Clean Black */}
            <header className="sticky top-0 z-50 text-white" style={{ background: '#111827' }}>
                <div className="container py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#DC2626' }}>
                                <span className="text-white font-bold">95</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg leading-tight">NTL 95 Admin</h1>
                                <p className="text-sm text-gray-300">Quản lý tiệm</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="text-sm text-gray-300 hover:text-white flex items-center gap-1 py-2 px-3 rounded-lg hover:bg-white/10"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="hidden sm:inline">Về trang chủ</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container py-5">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <div className="card py-4 text-center">
                        <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#DC2626' }}>{stats.todayBookings}</p>
                        <p className="text-sm text-gray-500 mt-1">Lịch hôm nay</p>
                    </div>
                    <div className="card py-4 text-center">
                        <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#16A34A' }}>{stats.completedBookings}</p>
                        <p className="text-sm text-gray-500 mt-1">Hoàn thành</p>
                    </div>
                    <div className="card py-4 text-center">
                        <p className="text-2xl sm:text-3xl font-bold" style={{ color: '#F59E0B' }}>{stats.pendingBookings}</p>
                        <p className="text-sm text-gray-500 mt-1">Đang chờ</p>
                    </div>
                    <div className="card py-4 text-center">
                        <p className="text-xl sm:text-2xl font-bold text-gray-800">{(stats.todayRevenue / 1000).toFixed(0)}k</p>
                        <p className="text-sm text-gray-500 mt-1">Doanh thu</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    <Link href="/admin/lich" className="card card-interactive text-center py-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: '#FEE2E2' }}>
                            <svg className="w-5 h-5" style={{ color: '#DC2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="font-semibold text-sm text-gray-800">Xem lịch</p>
                    </Link>
                    <Link href="/admin/doanh-thu" className="card card-interactive text-center py-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: '#DCFCE7' }}>
                            <svg className="w-5 h-5" style={{ color: '#16A34A' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <p className="font-semibold text-sm text-gray-800">Doanh thu</p>
                    </Link>
                    <button className="card card-interactive text-center py-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: '#FEF3C7' }}>
                            <svg className="w-5 h-5" style={{ color: '#F59E0B' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="font-semibold text-sm text-gray-800">Block giờ</p>
                    </button>
                    <button className="card card-interactive text-center py-5">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background: '#F3F4F6' }}>
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="font-semibold text-sm text-gray-800">Khách hàng</p>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={() => setActiveTab('today')}
                        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all
                            ${activeTab === 'today'
                                ? 'text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
                        style={activeTab === 'today' ? { background: '#DC2626' } : {}}
                    >
                        Hôm nay
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all
                            ${activeTab === 'all'
                                ? 'text-white'
                                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'}`}
                        style={activeTab === 'all' ? { background: '#DC2626' } : {}}
                    >
                        Tất cả
                    </button>
                </div>

                {/* Bookings List */}
                <div className="space-y-3">
                    {bookings.map(booking => (
                        <div
                            key={booking.id}
                            className={`card ${booking.status === 'cancelled' ? 'opacity-50' : ''}`}
                        >
                            {/* Header row */}
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 className="font-bold text-gray-800">{booking.name}</h3>
                                        {booking.isVerified ? (
                                            <span className="badge badge-success">✓ Xác thực</span>
                                        ) : (
                                            <span className="badge badge-warning">Chưa xác thực</span>
                                        )}
                                        {booking.status === 'completed' && (
                                            <span className="badge badge-success">Xong</span>
                                        )}
                                        {booking.status === 'cancelled' && (
                                            <span className="badge badge-error">Hủy</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        📞 {booking.phone} • 🕐 {booking.time} • {booking.service}
                                    </p>
                                </div>
                                <p className="font-bold whitespace-nowrap" style={{ color: '#DC2626' }}>{booking.price.toLocaleString()}đ</p>
                            </div>

                            {/* Actions */}
                            {booking.status === 'confirmed' && (
                                <div className="flex gap-2 pt-3 border-t border-gray-200">
                                    {!booking.isVerified && (
                                        <button
                                            onClick={() => handleVerify(booking.id)}
                                            className="btn flex-1 text-sm py-2.5 text-white"
                                            style={{ background: '#3B82F6' }}
                                        >
                                            ✓ Xác thực
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleComplete(booking.id)}
                                        className="btn btn-success flex-1 text-sm py-2.5"
                                    >
                                        ✓ Hoàn thành
                                    </button>
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        className="btn bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm py-2.5 px-4"
                                    >
                                        Hủy
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {bookings.length === 0 && (
                    <div className="card text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500">Không có lịch hẹn nào</p>
                    </div>
                )}
            </main>
        </div>
    );
}
