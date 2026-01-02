'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        if (!/^0\d{9}$/.test(formData.phone)) {
            setError('Số điện thoại không hợp lệ (VD: 0901234567)');
            return;
        }

        setIsLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } catch {
            setError('Đăng ký thất bại. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />
                <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
                    <div className="w-full max-w-md">
                        <div className="card text-center animate-scaleIn">
                            <div className="w-20 h-20 bg-success-light rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-secondary mb-2">Đăng ký thành công!</h2>
                            <p className="text-text-muted mb-8">
                                Tài khoản của bạn đã được tạo. Hãy đến tiệm để xác thực và bắt đầu tích điểm!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link href="/dang-nhap" className="btn btn-primary flex-1">
                                    Đăng nhập
                                </Link>
                                <Link href="/dat-lich" className="btn btn-outline flex-1">
                                    Đặt lịch ngay
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center py-8 sm:py-12 px-4">
                <div className="w-full max-w-md">
                    <div className="card animate-scaleIn">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-secondary mb-2">
                                Đăng ký thành viên
                            </h1>
                            <p className="text-text-muted">
                                Tạo tài khoản để tích điểm và nhận ưu đãi
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="label">Họ và tên</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input"
                                    placeholder="Võ Nguyễn Trung Tín"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    autoComplete="name"
                                />
                            </div>

                            <div>
                                <label className="label">Số điện thoại</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="input"
                                    placeholder="0901234567"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    autoComplete="tel"
                                />
                                <p className="text-xs text-text-muted mt-2">
                                    Số điện thoại sẽ được dùng để đăng nhập
                                </p>
                            </div>

                            <div>
                                <label className="label">Mật khẩu</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input"
                                    placeholder="Ít nhất 6 ký tự"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>

                            <div>
                                <label className="label">Xác nhận mật khẩu</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="input"
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>

                            {error && (
                                <div className="bg-error-light text-error text-sm p-4 rounded-xl flex items-start gap-3">
                                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary w-full"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Đang đăng ký...
                                    </>
                                ) : (
                                    'Đăng ký'
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 pt-6 border-t border-border text-center">
                            <p className="text-text-muted">
                                Đã có tài khoản?{' '}
                                <Link href="/dang-nhap" className="text-primary font-semibold hover:underline">
                                    Đăng nhập
                                </Link>
                            </p>
                        </div>

                        {/* Info */}
                        <div className="mt-6 p-4 bg-primary-light/50 rounded-xl">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed">
                                    Sau khi đăng ký, hãy đến tiệm để được tích điểm!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
