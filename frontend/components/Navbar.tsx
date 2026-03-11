"use client";

import Link from 'next/link';
import { Camera, ImagePlus } from 'lucide-react';
import React from 'react';

export default function Navbar() {
    return (
        <nav className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
            <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-[72px] items-center">
                    <Link href="/" className="flex items-center gap-3 text-gray-900 hover:opacity-80 transition-opacity">
                        <div className="bg-black text-white p-2.5 rounded-xl shadow-md">
                            <Camera size={22} className="stroke-[2.5]" />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight hidden sm:block">PhotoApp</span>
                    </Link>
                    <div className="flex flex-1 justify-end items-center gap-4 sm:gap-6">
                        <Link href="/" className="text-gray-600 hover:text-black font-semibold text-sm transition-colors py-2 px-3 rounded-full hover:bg-gray-100">
                            Explore
                        </Link>
                        <Link href="/upload" className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                            <ImagePlus size={18} strokeWidth={2.5} />
                            <span className="hidden sm:inline">Upload</span>
                        </Link>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-amber-500 border-2 border-white shadow-md cursor-pointer hover:scale-105 transition-transform" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
