"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { ArrowLeft, Calendar, Loader2 } from 'lucide-react';
import CommentSection from '../../../components/CommentSection';

const API_BASE = 'http://localhost:5000/api';

export default function PhotoDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [photo, setPhoto] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const fetchPhoto = async () => {
        try {
            const response = await axios.get(`${API_BASE}/photos`);
            const currentPhoto = response.data.find((p: any) => p.id === id);
            setPhoto(currentPhoto || null);
        } catch (error) {
            console.error('Error fetching photo', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPhoto();
    }, [id]);

    const handleAddComment = async (content: string) => {
        setSubmitting(true);
        try {
            await axios.post(`${API_BASE}/comments`, {
                photoId: id,
                content,
            });
            await fetchPhoto();
        } catch (error) {
            console.error('Failed to add comment', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
                <p className="text-gray-500 font-medium">Loading details...</p>
            </div>
        );
    }

    if (!photo) {
        return (
            <div className="text-center py-32">
                <h2 className="text-4xl font-black text-gray-900 mb-4">Photo not found</h2>
                <p className="text-gray-500 mb-8 font-medium text-lg">It seems this memory is missing.</p>
                <button
                    onClick={() => router.push('/')}
                    className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    Return to Explore
                </button>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 py-6 max-w-[1400px] mx-auto min-h-[calc(100vh-140px)] flex flex-col justify-center">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-900 font-bold mb-6 transition-all w-fit group hover:-translate-x-1"
            >
                <div className="p-2.5 rounded-full shadow-sm bg-white group-hover:bg-gray-100 transition-colors">
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </div>
                Back
            </button>

            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden ring-1 ring-black/5 flex flex-col lg:flex-row h-full max-h-[85vh]">

                {/* Left: Image Container */}
                <div className="w-full lg:w-3/5 bg-gray-50 flex items-center justify-center relative p-6 sm:p-10 group overflow-hidden">
                    <div
                        className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                    <img
                        src={photo.imageUrl}
                        alt="Uploaded photo"
                        className="relative z-10 w-full h-full object-contain self-center max-h-[60vh] lg:max-h-[85vh] drop-shadow-xl"
                    />
                </div>

                {/* Right: Info and Comments */}
                <div className="w-full lg:w-2/5 p-8 lg:p-10 flex flex-col h-[500px] lg:h-[85vh] border-t lg:border-t-0 lg:border-l border-gray-100 bg-white shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)] z-20">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-400 via-fuchsia-500 to-indigo-500 shadow-md ring-4 ring-white" />
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">PhotoApp User</h2>
                                <div className="flex items-center gap-1.5 text-sm text-gray-500 font-medium mt-0.5">
                                    <Calendar size={14} className="text-gray-400" />
                                    {new Date(photo.createdAt).toLocaleDateString(undefined, {
                                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden min-h-0">
                        <CommentSection
                            comments={photo.comments || []}
                            onSubmit={handleAddComment}
                            isSubmitting={submitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
