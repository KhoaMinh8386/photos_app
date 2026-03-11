"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoGrid from '../components/PhotoGrid';
import { Loader2 } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function Home() {
    const [photos, setPhotos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`${API_BASE}/photos`);
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhotos();
    }, []);

    return (
        <div className="animate-in fade-in duration-700">
            <div className="mb-10 mt-4 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 hidden">Discover</h1>
                <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto hidden">Find your next burst of inspiration. The best photos from our creators.</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-black" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading gallery...</p>
                </div>
            ) : photos.length === 0 ? (
                <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm max-w-3xl mx-auto">
                    <div className="text-6xl mb-4">📷</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No photos yet</h2>
                    <p className="text-gray-500 font-medium mb-6">Be the first to share your moments</p>
                </div>
            ) : (
                <PhotoGrid photos={photos} />
            )}
        </div>
    );
}
