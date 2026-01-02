'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data
const mockBookings = [
    { id: '1', name: 'Nguyễn Văn A', time: '09:00', service: 'Cắt + Gội', status: 'confirmed' },
    { id: '2', name: 'Trần Văn B', time: '10:30', service: 'Cắt tóc', status: 'confirmed' },
    { id: '3', name: 'Lê Văn C', time: '14:00', service: 'Uốn tóc', status: 'completed' },
];

const mockBlockTimes = [
    { id: '1', start: '12:00', end: '13:00', note: 'Nghỉ trưa' },
    { id: '2', start: '18:00', end: '18:30', note: 'Bận việc' },
];

// Generate calendar days
const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: (Date | null)[] = [];

    // Add empty slots for days before first day
    for (let i = 0; i < firstDay.getDay(); i++) {
        days.push(null);
    }

    // Add days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(year, month, i));
    }

    return days;
};

const calendarDays = generateCalendarDays();
const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [blockForm, setBlockForm] = useState({ start: '', end: '', note: '' });

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const handleAddBlock = () => {
        // Add block time logic
        console.log('Block time:', blockForm);
        setShowBlockModal(false);
        setBlockForm({ start: '', end: '', note: '' });
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Admin Header */}
            <header className="bg-secondary text-white sticky top-0 z-50">
                <div className="container py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Link href="/admin" className="text-gray-300 hover:text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </Link>
                            <div>
                                <h1 className="font-bold text-lg">Lịch làm việc</h1>
                                <p className="text-sm text-gray-300">{months[currentMonth]} {currentYear}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowBlockModal(true)}
                            className="btn bg-warning text-white hover:bg-amber-600 text-sm py-2"
                        >
                            + Block giờ
                        </button>
                    </div>
                </div>
            </header>

            <main className="container py-6">
                {/* Calendar */}
                <div className="card mb-6">
                    {/* Week days header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {weekDays.map(day => (
                            <div key={day} className="text-center text-sm font-medium text-text-muted py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date, index) => {
                            if (!date) {
                                return <div key={`empty-${index}`} className="p-2" />;
                            }

                            const isToday = date.toDateString() === today.toDateString();
                            const isSelected = date.toDateString() === selectedDate.toDateString();
                            const hasBooking = Math.random() > 0.7; // Mock

                            return (
                                <button
                                    key={date.toISOString()}
                                    onClick={() => setSelectedDate(date)}
                                    className={`p-2 rounded-lg text-center relative transition-all
                    ${isToday ? 'bg-primary text-white' : ''}
                    ${isSelected && !isToday ? 'bg-primary-light text-primary ring-2 ring-primary' : ''}
                    ${!isToday && !isSelected ? 'hover:bg-gray-100' : ''}`}
                                >
                                    <span className="text-sm font-medium">{date.getDate()}</span>
                                    {hasBooking && (
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-success rounded-full" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Day Details */}
                <div className="card mb-6">
                    <h3 className="font-semibold text-secondary mb-4">
                        Lịch ngày {selectedDate.toLocaleDateString('vi-VN')}
                    </h3>

                    {/* Time slots */}
                    <div className="space-y-2">
                        {mockBookings.map(booking => (
                            <div
                                key={booking.id}
                                className={`flex items-center gap-4 p-3 rounded-lg border-l-4
                  ${booking.status === 'completed' ? 'bg-success-light border-success' : 'bg-primary-light border-primary'}`}
                            >
                                <div className="font-mono text-sm font-bold">{booking.time}</div>
                                <div className="flex-1">
                                    <p className="font-medium">{booking.name}</p>
                                    <p className="text-sm text-text-muted">{booking.service}</p>
                                </div>
                                <span className={`badge ${booking.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                                    {booking.status === 'completed' ? 'Xong' : 'Chờ'}
                                </span>
                            </div>
                        ))}

                        {/* Block times */}
                        {mockBlockTimes.map(block => (
                            <div
                                key={block.id}
                                className="flex items-center gap-4 p-3 rounded-lg bg-gray-100 border-l-4 border-gray-400"
                            >
                                <div className="font-mono text-sm font-bold">{block.start} - {block.end}</div>
                                <div className="flex-1">
                                    <p className="font-medium text-text-muted">🚫 {block.note}</p>
                                </div>
                                <button className="text-error text-sm hover:underline">Xóa</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex gap-6 justify-center text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="text-text-muted">Đang chờ</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success rounded-full" />
                        <span className="text-text-muted">Hoàn thành</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full" />
                        <span className="text-text-muted">Block giờ</span>
                    </div>
                </div>
            </main>

            {/* Block Time Modal */}
            {showBlockModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="card w-full max-w-md animate-slideUp">
                        <h3 className="font-semibold text-secondary mb-4">Block giờ làm việc</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="label">Từ giờ</label>
                                <input
                                    type="time"
                                    className="input"
                                    value={blockForm.start}
                                    onChange={e => setBlockForm(prev => ({ ...prev, start: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="label">Đến giờ</label>
                                <input
                                    type="time"
                                    className="input"
                                    value={blockForm.end}
                                    onChange={e => setBlockForm(prev => ({ ...prev, end: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="label">Ghi chú</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="VD: Nghỉ trưa, bận việc..."
                                    value={blockForm.note}
                                    onChange={e => setBlockForm(prev => ({ ...prev, note: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => setShowBlockModal(false)}
                                className="btn btn-outline flex-1"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAddBlock}
                                className="btn btn-primary flex-1"
                            >
                                Thêm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
