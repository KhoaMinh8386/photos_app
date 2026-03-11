"use client";

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

interface PhotoCardProps {
    id: string;
    imageUrl: string;
    createdAt: string;
    commentCount: number;
}

export default function PhotoCard({ id, imageUrl, createdAt, commentCount }: PhotoCardProps) {
    return (
        <Link href={`/photo/${id}`} className="group block mb-4 break-inside-avoid">
            <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out bg-gray-100">
                <img
                    src={imageUrl}
                    alt="Shared memory"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-black/opacity-0 group-hover:bg-black/20 transition-colors duration-300" />

                {/* 'View' Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="bg-white/90 backdrop-blur-sm text-black font-semibold px-6 py-2 rounded-full shadow-lg">
                        View
                    </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-end">
                    <div className="text-white text-xs font-medium tracking-wide">
                        {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5 text-white bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                        <MessageCircle size={14} className="fill-white/20" />
                        <span className="text-xs font-bold">{commentCount}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
