'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for revenue
const mockMonthlyData = [
    { month: 'T1', revenue: 8500000, bookings: 85 },
    { month: 'T2', revenue: 9200000, bookings: 92 },
    { month: 'T3', revenue: 10500000, bookings: 105 },
    { month: 'T4', revenue: 9800000, bookings: 98 },
    { month: 'T5', revenue: 11200000, bookings: 112 },
    { month: 'T6', revenue: 12500000, bookings: 125 },
    { month: 'T7', revenue: 13800000, bookings: 138 },
    { month: 'T8', revenue: 12100000, bookings: 121 },
    { month: 'T9', revenue: 11500000, bookings: 115 },
    { month: 'T10', revenue: 10800000, bookings: 108 },
    { month: 'T11', revenue: 11900000, bookings: 119 },
    { month: 'T12', revenue: 14500000, bookings: 145 },
];

const mockDailyData = [
    { date: '27/12', revenue: 850000, bookings: 8 },
    { date: '28/12', revenue: 720000, bookings: 7 },
    { date: '29/12', revenue: 980000, bookings: 10 },
    { date: '30/12', revenue: 650000, bookings: 6 },
    { date: '31/12', revenue: 1200000, bookings: 12 },
    { date: '01/01', revenue: 1500000, bookings: 15 },
    { date: '02/01', revenue: 450000, bookings: 4 },
];

const mockServiceStats = [
    { name: 'Cắt tóc nam', count: 245, revenue: 19600000, percentage: 45 },
    { name: 'Cắt + Gội', count: 156, revenue: 18720000, percentage: 30 },
    { name: 'Uốn tóc', count: 67, revenue: 13400000, percentage: 15 },
    { name: 'Cạo mặt', count: 89, revenue: 4450000, percentage: 10 },
];

export default function RevenuePage() {
    const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');

    const currentData = period === 'week' ? mockDailyData : mockMonthlyData;
    const maxRevenue = Math.max(...currentData.map(d => d.revenue));

    // Calculate totals
    const totalRevenue = currentData.reduce((sum, d) => sum + d.revenue, 0);
    const totalBookings = currentData.reduce((sum, d) => sum + d.bookings, 0);
    const avgPerBooking = Math.round(totalRevenue / totalBookings);

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="bg-secondary text-white sticky top-0 z-50">
                <div className="container py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/admin" className="p-2 -ml-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="font-bold text-lg">Báo cáo doanh thu</h1>
                                <p className="text-sm text-gray-300">Thống kê chi tiết</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container py-6">
                {/* Period Selector */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { key: 'day', label: 'Hôm nay' },
                        { key: 'week', label: '7 ngày' },
                        { key: 'month', label: 'Tháng này' },
                        { key: 'year', label: 'Năm nay' },
                    ].map(item => (
                        <button
                            key={item.key}
                            onClick={() => setPeriod(item.key as typeof period)}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors
                ${period === item.key ? 'bg-primary text-white' : 'bg-surface text-text-muted hover:bg-gray-100'}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Summary Cards - Simple Colors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="card text-white" style={{ background: '#DC2626' }}>
                        <p className="text-sm opacity-90 mb-1">Tổng doanh thu</p>
                        <p className="text-3xl font-bold">{totalRevenue.toLocaleString()}đ</p>
                        <p className="text-sm opacity-75 mt-2">
                            ↗ +12% so với kỳ trước
                        </p>
                    </div>
                    <div className="card text-white" style={{ background: '#16A34A' }}>
                        <p className="text-sm opacity-90 mb-1">Số lịch hẹn</p>
                        <p className="text-3xl font-bold">{totalBookings}</p>
                        <p className="text-sm opacity-75 mt-2">
                            ↗ +8% so với kỳ trước
                        </p>
                    </div>
                    <div className="card text-white" style={{ background: '#111827' }}>
                        <p className="text-sm opacity-90 mb-1">TB mỗi lịch</p>
                        <p className="text-3xl font-bold">{avgPerBooking.toLocaleString()}đ</p>
                        <p className="text-sm opacity-75 mt-2">
                            ↗ +5% so với kỳ trước
                        </p>
                    </div>
                </div>

                {/* Chart */}
                <div className="card mb-6">
                    <h3 className="font-semibold text-secondary mb-4">Biểu đồ doanh thu</h3>
                    <div className="h-64 flex items-end gap-2">
                        {currentData.map((item, index) => {
                            const height = (item.revenue / maxRevenue) * 100;
                            const label = 'month' in item ? (item as { month: string }).month : (item as { date: string }).date;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex flex-col items-center justify-end h-48">
                                        <div
                                            className="w-full bg-gradient-to-t from-primary to-primary-hover rounded-t-lg transition-all hover:opacity-80 cursor-pointer relative group"
                                            style={{ height: `${height}%`, minHeight: '8px' }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {item.revenue.toLocaleString()}đ
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-text-muted">{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Service Stats */}
                <div className="card mb-6">
                    <h3 className="font-semibold text-secondary mb-4">Dịch vụ phổ biến</h3>
                    <div className="space-y-4">
                        {mockServiceStats.map((service, index) => (
                            <div key={index}>
                                <div className="flex flex-col sm:flex-row sm:justify-between mb-1 gap-1">
                                    <span className="font-medium">{service.name}</span>
                                    <span className="text-text-muted text-sm">
                                        {service.count} lượt • {service.revenue.toLocaleString()}đ
                                    </span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full transition-all"
                                        style={{ width: `${service.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="card">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-secondary">Giao dịch gần đây</h3>
                        <button className="text-primary text-sm font-medium hover:underline">
                            Xem tất cả
                        </button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { name: 'Nguyễn Văn A', service: 'Cắt + Gội', time: '09:00', amount: 120000 },
                            { name: 'Trần Văn B', service: 'Uốn tóc', time: '11:00', amount: 200000 },
                            { name: 'Lê Văn C', service: 'Cắt tóc', time: '14:00', amount: 80000 },
                            { name: 'Phạm Văn D', service: 'Cạo mặt', time: '15:30', amount: 50000 },
                        ].map((tx, index) => (
                            <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <div>
                                    <p className="font-medium">{tx.name}</p>
                                    <p className="text-sm text-text-muted">{tx.service} • {tx.time}</p>
                                </div>
                                <span className="font-bold text-success">+{tx.amount.toLocaleString()}đ</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Export Button */}
                <div className="mt-6 flex gap-4">
                    <button className="btn btn-outline flex-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Xuất Excel
                    </button>
                    <button className="btn btn-primary flex-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        In báo cáo
                    </button>
                </div>
            </main>
        </div>
    );
}
