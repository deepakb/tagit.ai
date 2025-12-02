"use client"

import React, { useState } from 'react';
import { Logo } from '@/components/logo';
import { ArrowLeft, Mail, Lock, Github, Chrome, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface Props {
    mode: 'login' | 'signup';
}

export const AuthPage: React.FC<Props> = ({ mode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (mode === 'login') {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.ok) {
                router.push('/dashboard');
            } else {
                setIsLoading(false);
                // Handle error (toast, etc.)
                alert('Login failed');
            }
        } else {
            // Signup logic (call API)
            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (res.ok) {
                    // Auto login after signup
                    await signIn('credentials', {
                        redirect: false,
                        email,
                        password,
                    });
                    router.push('/dashboard');
                } else {
                    alert('Signup failed');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-[#020617] text-gray-900 dark:text-white">
            {/* Left Panel - Visuals */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f172a] overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-blue-600/10 z-0"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[100px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/20 blur-[100px]" />

                <div className="relative z-10 max-w-lg">
                    <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <Logo className="mb-8" textSize="text-3xl" iconSize="w-12 h-12" />
                        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                            Your external brain,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">supercharged.</span>
                        </h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Join thousands of developers and designers who have stopped drowning in tabs and started building their personal knowledge engine.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white mb-1">10k+</div>
                            <div className="text-sm text-gray-400">Active Users</div>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white mb-1">5M+</div>
                            <div className="text-sm text-gray-400">Bookmarks Indexed</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <Link
                    href="/"
                    className="absolute top-8 left-8 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{mode === 'login' ? 'Welcome back' : 'Create an account'}</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            {mode === 'login'
                                ? 'Enter your credentials to access your library.'
                                : 'Start organizing your digital life today.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {mode === 'login' && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                                <>
                                    {mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-4 flex justify-center">
                        <Link
                            href="/dashboard"
                            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            Skip for now (Demo Access)
                        </Link>
                    </div>

                    <div className="my-8 flex items-center gap-4">
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                        <span className="text-xs text-gray-500 uppercase font-medium">Or continue with</span>
                        <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
                            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm text-gray-700 dark:text-gray-300"
                        >
                            <Github className="w-5 h-5" /> GitHub
                        </button>
                        <button
                            type="button"
                            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                            className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-sm text-gray-700 dark:text-gray-300"
                        >
                            <Chrome className="w-5 h-5 text-blue-500" /> Google
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                        <Link
                            href={mode === 'login' ? '/auth/signup' : '/auth/login'}
                            className="font-bold text-blue-600 hover:text-blue-500"
                        >
                            {mode === 'login' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
