'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import {
    FaLocationDot,
    FaScissors,
    FaSpa,
    FaMask,
    FaSprayCan,
    FaCheck,
    FaChevronDown,
    FaChevronUp,
    FaCalendarDays,
    FaPhone,
    FaMapLocationDot,
    FaClock,
    FaLightbulb
} from "react-icons/fa6";

// Mock Data
const SALON_ADDRESS = "Ấp Bình Thuận, Xã Phước Chỉ, Tỉnh Tây Ninh";
const SERVICES = [
    { id: 1, name: 'Cắt tóc nam', price: 80000, duration: 30, icon: <FaScissors /> },
    { id: 2, name: 'Cắt + Gội', price: 120000, duration: 45, icon: <FaSpa /> },
    { id: 3, name: 'Cạo mặt', price: 50000, duration: 20, icon: <FaMask /> },
    { id: 4, name: 'Uốn tóc', price: 200000, duration: 60, icon: <FaSprayCan /> },
];

const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
];

const GENERATE_DATES = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
    }
    return dates;
};

export default function BookingPage() {
    // State
    const [currentStep, setCurrentStep] = useState(2);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isDateSelectorOpen, setIsDateSelectorOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [customerPhone] = useState('0981.038.096'); // Mock logged in user

    // Effect to auto-expand Step 3 when Service selection is done
    useEffect(() => {
        if (selectedServices.length > 0 && currentStep === 2) {
            const timer = setTimeout(() => setCurrentStep(3), 500);
            return () => clearTimeout(timer);
        }
    }, [selectedServices]);

    const toggleStep = (step: number) => {
        if (currentStep === step) {
            setCurrentStep(0); // Collapse if clicking active
        } else {
            setCurrentStep(step);
        }
    };

    const totalPrice = selectedServices.reduce((sum, id) => {
        const s = SERVICES.find(service => service.id === id);
        return sum + (s?.price || 0);
    }, 0);

    const handleSubmit = async () => {
        if (!selectedDate || !selectedTime || selectedServices.length === 0) {
            alert('Vui lòng chọn đầy đủ dịch vụ và thời gian!');
            return;
        }
        setIsSuccess(true);
        window.scrollTo(0, 0);
    };

    const formatDate = (date: Date) => {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        return {
            day: days[date.getDay()],
            dateStr: `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`,
            full: date.toLocaleDateString('vi-VN')
        };
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#F5F5F5]">
                <Header />
                <div className="flex justify-center">
                    <div className="w-full max-w-[500px] bg-white min-h-screen shadow-xl relative flex flex-col border-x border-gray-100">
                        <div className="p-6 text-center">
                            <div className="text-xl font-bold text-success flex items-center justify-center gap-2 mb-6">
                                Đặt lịch thành công
                                <FaCheck className="text-xl bg-success text-white rounded-full p-1" />
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                                <div className="bg-gradient-to-br from-primary to-rose-900 py-4 px-4 text-center text-white">
                                    <div className="text-base font-bold mb-1 uppercase tracking-wide">Mời anh đánh giá</div>
                                    <p className="text-[11px] opacity-90 mb-2">Giúp NTL 95 Barber Shop phục vụ tốt hơn</p>
                                    <div className="flex justify-center gap-1 text-yellow-400 text-base">
                                        ★★★★★
                                    </div>
                                </div>

                                <div className="p-4 text-left">
                                    <div className="flex items-start gap-3 mb-4">
                                        <FaLocationDot className="text-primary text-lg mt-1 flex-shrink-0" />
                                        <div>
                                            <div className="font-bold text-gray-800 text-sm">{SALON_ADDRESS}</div>
                                            <p className="text-gray-500 text-xs">NTL 95 Barber Shop - Uy tín hàng đầu</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mb-4">
                                        <button className="flex-1 btn btn-outline text-xs h-9 flex items-center justify-center gap-2 hover:bg-gray-50">
                                            <FaMapLocationDot />
                                            Chỉ đường
                                        </button>
                                        <button className="flex-1 btn btn-outline text-xs h-9 flex items-center justify-center gap-2 hover:bg-gray-50">
                                            <FaPhone />
                                            Gọi salon
                                        </button>
                                    </div>

                                    <div className="border-t border-gray-100 pt-3">
                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            Hẹn gặp anh <span className="text-success font-bold">({customerPhone})</span> lúc:<br />
                                            <span className="text-success font-bold text-base flex items-center gap-2 mt-1">
                                                <FaClock />
                                                {selectedTime} - {formatDate(selectedDate).day}, {formatDate(selectedDate).dateStr}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/" className="btn btn-primary w-full shadow-lg h-11 flex items-center justify-center text-base font-bold rounded-xl">
                                Về trang chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Header />

            <div className="flex justify-center">
                {/* Mobile-app style container */}
                <div className="w-full max-w-[500px] bg-white shadow-xl relative flex flex-col pb-24 border-x border-gray-100">
                    <div className="bg-white px-4 py-3 sticky top-16 z-30 border-b border-gray-100 shadow-sm">
                        <h1 className="text-center font-bold text-lg text-secondary uppercase tracking-wide">Đặt lịch giữ chỗ</h1>
                    </div>

                    <main className="flex-1 px-4 py-4 space-y-4">

                        {/* Step 1: Chọn Salon */}
                        <div className="relative pl-6 border-l-2 border-primary pb-2">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                                <FaCheck />
                            </div>
                            <button
                                onClick={() => toggleStep(1)}
                                className="w-full text-left flex items-center justify-between group"
                            >
                                <div className="text-sm font-bold text-secondary mb-2 group-hover:text-primary transition-colors uppercase tracking-wide">1. Chọn salon</div>
                                <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${currentStep === 1 ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`transition-all duration-300 overflow-hidden ${currentStep === 1 ? 'max-h-40 opacity-100' : 'max-h-20 opacity-90'}`}>
                                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-all flex items-start gap-3">
                                    <FaLocationDot className="text-primary text-lg mt-0.5 flex-shrink-0" />
                                    <span className="font-medium text-sm text-gray-700 leading-tight">{SALON_ADDRESS}</span>
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Chọn dịch vụ */}
                        <div className={`relative pl-6 border-l-2 pb-2 transition-colors duration-300 ${selectedServices.length > 0 || currentStep === 2 ? 'border-primary' : 'border-gray-200'}`}>
                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 shadow-sm
                            ${selectedServices.length > 0 ? 'bg-primary text-white scale-110' : 'bg-gray-200 text-gray-500'}`}>
                                {selectedServices.length > 0 ? <FaCheck /> : '2'}
                            </div>

                            <button
                                onClick={() => toggleStep(2)}
                                className="w-full text-left flex items-center justify-between group"
                            >
                                <div className={`text-sm font-bold mb-2 transition-colors duration-300 uppercase tracking-wide ${currentStep === 2 ? 'text-primary' : 'text-secondary'}`}>
                                    2. Chọn dịch vụ
                                </div>
                                <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${currentStep === 2 ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Accordion Content */}
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${currentStep === 2 ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="space-y-2 mb-2">
                                    {SERVICES.map(service => (
                                        <div
                                            key={service.id}
                                            onClick={() => {
                                                if (selectedServices.includes(service.id)) {
                                                    setSelectedServices(prev => prev.filter(id => id !== service.id));
                                                } else {
                                                    setSelectedServices(prev => [...prev, service.id]);
                                                }
                                            }}
                                            className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all select-none group
                                            ${selectedServices.includes(service.id)
                                                    ? 'bg-red-50 border-primary shadow-sm'
                                                    : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`text-lg transition-colors ${selectedServices.includes(service.id) ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}`}>
                                                    {service.icon}
                                                </span>
                                                <div>
                                                    <p className={`font-bold text-sm ${selectedServices.includes(service.id) ? 'text-primary' : 'text-gray-700'}`}>{service.name}</p>
                                                    <p className="text-xs text-gray-500">{service.price.toLocaleString()}đ</p>
                                                </div>
                                            </div>
                                            {selectedServices.includes(service.id) && (
                                                <div className="w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center text-[8px] shadow-sm animate-in zoom-in spin-in-90 duration-300">
                                                    <FaCheck />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            {selectedServices.length > 0 && currentStep !== 2 && (
                                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                                        {selectedServices.map(id => {
                                            const s = SERVICES.find(ser => ser.id === id);
                                            return (
                                                <span key={id} className="text-[10px] font-medium px-2 py-0.5 bg-white border border-gray-200 rounded text-gray-600 shadow-sm">
                                                    {s?.name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <p className="text-success text-xs font-bold">
                                        Tổng: {totalPrice.toLocaleString()} VNĐ
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Step 3: Chọn ngày giờ */}
                        <div className={`relative pl-6 border-l-2 transition-colors duration-300 ${selectedTime || currentStep === 3 ? 'border-primary' : 'border-gray-200'}`}>
                            <div className={`absolute -left-[10px] top-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 border-2 border-white box-content shadow-sm
                            ${selectedTime ? 'bg-primary text-white scale-110' : 'bg-gray-200 text-gray-500'}`}>
                                {selectedTime ? <FaCheck /> : '3'}
                            </div>

                            <button
                                onClick={() => toggleStep(3)}
                                className="w-full text-left flex items-center justify-between group"
                            >
                                <div className={`text-sm font-bold mb-2 transition-colors duration-300 uppercase tracking-wide ${currentStep === 3 ? 'text-primary' : 'text-secondary'}`}>
                                    3. Chọn ngày & giờ
                                </div>
                                <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${currentStep === 3 ? 'rotate-180' : ''}`} />
                            </button>

                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${currentStep === 3 ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                {/* Date Picker Toggle */}
                                <div
                                    onClick={() => setIsDateSelectorOpen(!isDateSelectorOpen)}
                                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 mb-3 cursor-pointer hover:border-primary/50 hover:shadow-sm transition-all group select-none"
                                >
                                    <div className="flex items-center gap-3">
                                        <FaCalendarDays className="text-gray-400 group-hover:text-primary transition-colors text-lg" />
                                        <span className="font-bold text-sm text-gray-800">
                                            {formatDate(selectedDate).day}, {formatDate(selectedDate).dateStr}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Ngày thường</span>
                                        <FaChevronDown className={`text-gray-400 text-xs transition-transform duration-300 ${isDateSelectorOpen ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>

                                {/* Expandable Date List */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDateSelectorOpen ? 'max-h-32 mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="flex gap-2 overflow-x-auto pb-2 px-1 no-scrollbar">
                                        {GENERATE_DATES().map(date => {
                                            const isSelected = date.toDateString() === selectedDate.toDateString();
                                            const { day, dateStr: d } = formatDate(date);
                                            return (
                                                <button
                                                    key={date.toISOString()}
                                                    onClick={() => {
                                                        setSelectedDate(date);
                                                        setIsDateSelectorOpen(false);
                                                    }}
                                                    className={`flex-shrink-0 w-14 py-2 rounded-lg text-center transition-all border duration-200
                                                    ${isSelected
                                                            ? 'bg-secondary text-white border-secondary shadow-md transform scale-105'
                                                            : 'bg-white text-gray-600 border-gray-100 hover:border-gray-300 hover:bg-gray-50'}`}
                                                >
                                                    <p className="text-[10px] opacity-80 font-medium">{day}</p>
                                                    <p className="text-sm font-bold">{d}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Hint */}
                                <div className="flex items-center gap-2 mb-3 bg-yellow-50 p-2.5 rounded-lg border border-yellow-100">
                                    <FaLightbulb className="text-yellow-500 text-sm" />
                                    <p className="text-xs text-yellow-700 font-medium">
                                        Đang còn <span className="font-bold">15</span> giờ trống ngày hôm nay
                                    </p>
                                </div>

                                {/* Time Slots Grid */}
                                <div className="grid grid-cols-5 gap-2 mb-2">
                                    {TIME_SLOTS.map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 rounded-lg border text-xs font-medium transition-all duration-200
                                            ${selectedTime === time
                                                    ? 'bg-secondary text-white border-secondary shadow-md transform scale-105'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary hover:shadow-sm'}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {selectedTime && currentStep !== 3 && (
                                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <p className="font-medium text-sm text-secondary flex items-center gap-2">
                                        <FaClock className="text-gray-400" />
                                        {selectedTime} - {formatDate(selectedDate).day}, {formatDate(selectedDate).full}
                                    </p>
                                </div>
                            )}
                        </div>

                    </main>

                    {/* Sticky Footer Button */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] z-40 rounded-b-xl">
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedTime || selectedServices.length === 0}
                            className="w-full btn btn-primary text-base font-bold py-3.5 uppercase disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                            style={{ backgroundColor: '#111827' }}
                        >
                            CHỐT GIỜ CẮT
                            <FaCheck />
                        </button>
                        <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
                            <FaCheck className="text-[10px]" />
                            Cắt xong trả tiền · Huỷ lịch không sao
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
