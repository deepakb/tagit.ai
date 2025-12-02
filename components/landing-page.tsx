"use client"

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/logo';
import {
  ArrowRight, Check, Star, Zap, Search, Brain,
  Smartphone, Menu, X, Command, Sparkles, Youtube, Github, Twitter,
  Code2, BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleMobileNav = () => {
    setIsMobileMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] text-gray-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900/50 overflow-x-hidden transition-colors duration-300">

      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/5 dark:bg-blue-600/5 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-indigo-400/5 dark:bg-indigo-600/5 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-400/5 dark:bg-purple-600/5 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Logo />

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How it works</a>
              <a href="#pricing" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                {theme === 'dark' ? <Star className="w-5 h-5 fill-current" /> : <Star className="w-5 h-5" />}
              </button>
              <Link href="/auth/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2">
                Sign In
              </Link>
              <Link href="/auth/signup" className="text-sm font-semibold bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 px-5 py-2.5 rounded-full transition-all hover:scale-105 active:scale-95">
                Get Started
              </Link>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400">
                {theme === 'dark' ? <Star className="w-5 h-5 fill-current" /> : <Star className="w-5 h-5" />}
              </button>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 dark:text-gray-300">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#020617] border-b border-gray-200 dark:border-gray-800 animate-in slide-in-from-top-5 z-40 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-base font-medium text-gray-700 dark:text-gray-200" onClick={handleMobileNav}>Features</a>
              <a href="#how-it-works" className="block text-base font-medium text-gray-700 dark:text-gray-200" onClick={handleMobileNav}>How it works</a>
              <a href="#pricing" className="block text-base font-medium text-gray-700 dark:text-gray-200" onClick={handleMobileNav}>Pricing</a>
              <a href="#faq" className="block text-base font-medium text-gray-700 dark:text-gray-200" onClick={handleMobileNav}>FAQ</a>
              <div className="h-px bg-gray-100 dark:bg-gray-800 my-4"></div>
              <Link href="/auth/login" className="block w-full text-center py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white font-medium">Log In</Link>
              <Link href="/auth/signup" className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-medium">Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-semibold uppercase tracking-wide mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Gemini 2.5 AI Integrated
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            Capture chaos. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 animate-gradient">
              Recall genius.
            </span>
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-100">
            The enterprise-grade knowledge hub for developers and creative teams. Auto-tagged by AI, searchable by meaning, secured by default.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-200">
            <Link href="/auth/signup" className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-lg shadow-xl shadow-blue-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2">
              Start Building Library
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/demo" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white rounded-full font-semibold text-lg hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-yellow-500" />
              View Live Demo
            </Link>
          </div>

          {/* 3D Dashboard Preview */}
          <div className="mt-20 relative max-w-6xl mx-auto perspective-1000 animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-300">
            <div className="relative rounded-xl bg-gray-200/50 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-3 transform rotate-x-6 hover:rotate-x-0 transition-transform duration-1000 ease-out shadow-2xl">
              <div className="relative rounded-lg bg-gray-50 dark:bg-[#0f172a] shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 aspect-[16/10] flex flex-col">

                {/* Mock UI Header */}
                <div className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 gap-4 bg-white dark:bg-[#0f172a]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="ml-4 flex gap-6 text-sm font-medium text-gray-400">
                    <span className="text-gray-900 dark:text-white">Dashboard</span>
                    <span>Collections</span>
                    <span>Tags</span>
                  </div>
                  <div className="flex-1"></div>
                  <div className="w-64 h-9 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center px-3 border border-gray-200 dark:border-gray-700">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="ml-2 text-xs text-gray-400">Search bookmarks...</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500"></div>
                </div>

                {/* Mock UI Body */}
                <div className="flex flex-1 overflow-hidden">
                  {/* Sidebar */}
                  <div className="w-64 border-r border-gray-200 dark:border-gray-800 p-6 space-y-6 hidden md:block bg-white dark:bg-[#0f172a]">
                    <div className="space-y-1">
                      <div className="h-8 w-full bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center px-3 text-blue-600 dark:text-blue-400 text-sm font-medium">All Bookmarks</div>
                      <div className="h-8 w-full flex items-center px-3 text-gray-500 text-sm font-medium">Favorites</div>
                      <div className="h-8 w-full flex items-center px-3 text-gray-500 text-sm font-medium">Archived</div>
                    </div>
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="text-xs font-semibold text-gray-400 uppercase mb-3">Collections</div>
                      <div className="space-y-2">
                        {['Frontend', 'AI Research', 'Design System', 'Startups'].map((c, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                            <span className={`w-2 h-2 rounded-full ${['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-orange-400'][i]}`}></span>
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Grid - REAL CONTENT CARDS */}
                  <div className="flex-1 p-6 bg-gray-50 dark:bg-[#020617]/50 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                      {/* Card 1: Github Repo */}
                      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-md">
                              <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                            </div>
                            <span className="text-xs font-medium text-gray-500">github.com</span>
                          </div>
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">facebook/react</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">The library for web and native user interfaces.</p>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-medium">#frontend</span>
                          <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-medium">#library</span>
                        </div>
                      </div>

                      {/* Card 2: YouTube Video */}
                      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        <div className="h-32 bg-gray-800 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Youtube className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-gray-500">YouTube</span>
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Next.js 15 Crash Course</h4>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[10px] font-medium">#tutorial</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Tweet/X */}
                      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                          <div>
                            <div className="text-xs font-bold text-gray-900 dark:text-white">Dan Abramov</div>
                            <div className="text-[10px] text-gray-500">@dan_abramov</div>
                          </div>
                          <Twitter className="w-4 h-4 text-blue-400 ml-auto" />
                        </div>
                        <p className="text-xs text-gray-700 dark:text-gray-300 mb-3">
                          Just released a new deep dive into Server Components. It changes how we think about data fetching.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-[10px] font-medium">#reactjs</span>
                        </div>
                      </div>

                      {/* Card 4: Design Shot */}
                      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 p-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-24 bg-gradient-to-r from-pink-500 to-rose-500 relative">
                          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 backdrop-blur rounded text-[10px] text-white">Dribbble</div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Dashboard UI Kit</h4>
                          <div className="flex gap-2 mt-2">
                            <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-[10px] font-medium">#ui</span>
                            <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px] font-medium">#inspiration</span>
                          </div>
                        </div>
                      </div>

                      {/* Card 5: Code Snippet */}
                      <div className="md:col-span-2 bg-[#0f172a] rounded-xl border border-gray-700 p-4 shadow-sm flex gap-4 font-mono text-xs">
                        <div className="text-gray-600 select-none text-right">
                          1<br />2<br />3
                        </div>
                        <div className="text-gray-300">
                          <span className="text-purple-400">const</span> <span className="text-blue-400">App</span> = () <span className="text-purple-400">=&gt;</span> {'{'}<br />
                          &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-green-400">&lt;TagIt /&gt;</span>;<br />
                          {'}'}
                        </div>
                        <div className="ml-auto flex flex-col items-end gap-2">
                          <Code2 className="w-4 h-4 text-gray-500" />
                          <span className="text-[10px] text-gray-500">snippet.js</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Floating Elements for 3D effect */}
                <div className="absolute -right-8 top-20 bg-white dark:bg-[#1e293b] p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-bounce delay-700 hidden lg:block">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-gray-900 dark:text-white">Synced</div>
                      <div className="text-gray-500">Just now</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-8 bottom-32 bg-white dark:bg-[#1e293b] p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 animate-pulse hidden lg:block">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-gray-900 dark:text-white">AI Analysis</div>
                      <div className="text-gray-500">Processing...</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-8">Trusted by innovative teams at</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Inc', 'Nebula', 'Tesseract', 'Sisyphus', 'GlobalBank'].map((company, i) => (
              <div key={i} className="flex items-center gap-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                <div className="w-6 h-6 bg-current rounded-sm opacity-20"></div> {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Features - IMPROVED VISUALS */}
      <section id="features" className="scroll-mt-24 py-24 bg-white dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 tracking-wide uppercase mb-3">Features</h2>
            <p className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Intelligence built-in. <br /> Friction removed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">

            {/* Feature 1: AI (Large) */}
            <div className="md:col-span-2 row-span-1 group relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Neural Auto-Tagging</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                  Gemini 2.5 reads your content and assigns semantic tags instantly. No more manual sorting.
                </p>

                {/* Visual: Tagging Animation */}
                <div className="mt-auto relative w-full h-32 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm overflow-hidden">
                  <div className="flex items-center gap-3 mb-3 border-b border-gray-100 dark:border-gray-700 pb-2">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="ml-auto w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Performance', 'Hooks', 'Web Dev'].map((tag, i) => (
                      <div key={i} className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-in zoom-in duration-300 fill-mode-forwards opacity-0`} style={{ animationDelay: `${i * 200}ms` }}>
                        <span className={`w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                        <span className="text-gray-700 dark:text-gray-300">{tag}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute right-0 bottom-0 p-2 bg-gradient-to-l from-white dark:from-[#1e293b] to-transparent">
                    <div className="text-[10px] text-gray-400 font-mono">confidence: 98%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2: Search */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 hover:border-purple-500/30 transition-all hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Semantic Search</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Search by concept, not just keywords. "How to fix state bug" finds relevant docs.
              </p>

              {/* Visual: Search Bar */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white dark:bg-[#1e293b] p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <Search className="w-3 h-3" />
                    <span>optimize rendering...</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-6 bg-purple-50 dark:bg-purple-900/20 rounded px-2 flex items-center text-[10px] text-purple-700 dark:text-purple-300 w-full">React Profiler Guide</div>
                    <div className="h-6 bg-transparent rounded px-2 flex items-center text-[10px] text-gray-500 w-full">useMemo Documentation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Analytics */}
            <div className="group relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 hover:border-green-500/30 transition-all hover:shadow-2xl hover:shadow-green-500/10">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Insights</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Visualize your reading habits. Track what you learn and where you spend time.
              </p>

              {/* Visual: Chart */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#1e293b] to-transparent flex items-end justify-center gap-2 px-8 pb-8">
                <div className="w-4 h-8 bg-green-200 dark:bg-green-900 rounded-t-sm"></div>
                <div className="w-4 h-12 bg-green-300 dark:bg-green-800 rounded-t-sm"></div>
                <div className="w-4 h-6 bg-green-200 dark:bg-green-900 rounded-t-sm"></div>
                <div className="w-4 h-16 bg-green-500 dark:bg-green-500 rounded-t-sm shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div className="w-4 h-10 bg-green-300 dark:bg-green-800 rounded-t-sm"></div>
              </div>
            </div>

            {/* Feature 4: Mobile (Wide) */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 flex flex-col md:flex-row items-center justify-between hover:border-orange-500/30 transition-all hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="max-w-xs z-10 mb-8 md:mb-0">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Universal Sync</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your brain, everywhere. Seamless PWA sync across Desktop, iOS, and Android. Works offline.
                </p>
              </div>
              {/* Visual: Phone mock */}
              <div className="relative w-40 h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-80 bg-white dark:bg-[#1e293b] border-4 border-gray-200 dark:border-gray-700 rounded-[2rem] shadow-xl p-2 rotate-12 group-hover:rotate-6 transition-transform duration-500">
                  <div className="w-full h-full bg-gray-50 dark:bg-[#0f172a] rounded-[1.5rem] overflow-hidden flex flex-col">
                    <div className="h-6 w-full bg-gray-100 dark:bg-gray-800 flex justify-center pt-1.5"><div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div></div>
                    <div className="p-3 space-y-2">
                      <div className="h-16 rounded-lg bg-white dark:bg-gray-800 shadow-sm"></div>
                      <div className="h-16 rounded-lg bg-white dark:bg-gray-800 shadow-sm"></div>
                      <div className="h-16 rounded-lg bg-white dark:bg-gray-800 shadow-sm"></div>
                    </div>
                    {/* Floating sync icon */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works - Improved Flow */}
      <section id="how-it-works" className="scroll-mt-24 py-24 bg-gray-50 dark:bg-[#050b1a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">From chaos to clarity in seconds</h2>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-24 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-900 to-transparent z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                { title: 'Capture', desc: 'One-click save via browser extension or mobile share sheet.', icon: <Command /> },
                { title: 'Process', desc: 'Gemini AI analyzes content, extracts metadata, and assigns tags.', icon: <Brain /> },
                { title: 'Recall', desc: 'Find anything instantly with fuzzy search or filters.', icon: <Sparkles /> }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 shadow-lg shadow-blue-900/5 group-hover:-translate-y-2 transition-transform duration-300 relative">
                    {step.icon}
                    <div className="absolute -bottom-3 px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold rounded-full">
                      0{idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="scroll-mt-24 py-24 bg-white dark:bg-[#020617] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-500">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {/* Free */}
            <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/20 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Starter</h3>
              <div className="my-4 text-4xl font-bold text-gray-900 dark:text-white">$0</div>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">For casual bookmarking.</p>
              <Link href="/auth/signup" className="block w-full text-center py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Get Started</Link>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><Check className="w-4 h-4 text-green-500 mr-3" /> Up to 500 bookmarks</li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><Check className="w-4 h-4 text-green-500 mr-3" /> Basic Auto-Tagging</li>
              </ul>
            </div>

            {/* Pro */}
            <div className="relative p-8 rounded-3xl border-2 border-blue-600 bg-blue-50/10 dark:bg-blue-900/10 shadow-2xl z-10 scale-105">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg uppercase tracking-wider">Most Popular</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pro</h3>
              <div className="my-4 text-4xl font-bold text-gray-900 dark:text-white">$8<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">For power users.</p>
              <Link href="/auth/signup" className="block w-full text-center py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg shadow-blue-500/25 transition-colors">Start Free Trial</Link>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><Check className="w-4 h-4 text-blue-500 mr-3" /> Unlimited bookmarks</li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><Check className="w-4 h-4 text-blue-500 mr-3" /> Advanced Gemini Analysis</li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><Check className="w-4 h-4 text-blue-500 mr-3" /> Full-text Search</li>
              </ul>
            </div>

            {/* Team */}
            <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/20 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team</h3>
              <div className="my-4 text-4xl font-bold text-gray-900 dark:text-white">$20<span className="text-lg text-gray-500 font-normal">/user</span></div>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">For collaborative teams.</p>
              <Link href="/contact" className="block w-full text-center py-3 rounded-xl border border-gray-200 dark:border-gray-700 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Contact Sales</Link>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><Check className="w-4 h-4 text-green-500 mr-3" /> Shared Workspaces</li>
                <li className="flex items-center text-sm text-gray-600 dark:text-gray-300"><Check className="w-4 h-4 text-green-500 mr-3" /> Admin Controls</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#020617] border-t border-gray-200 dark:border-gray-800 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2">
              <Logo textSize="text-xl" />
              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed">
                The intelligent bookmark manager for the AI era. Capture, organize, and recall knowledge without friction.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-6">Legal</h4>
              <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
                <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 TagIt.ai Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
