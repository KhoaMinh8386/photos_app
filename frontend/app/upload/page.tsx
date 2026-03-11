"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UploadBox from '../../components/UploadBox';
import { Loader2 } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export default function UploadPage() {
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('photo', file);

        setIsUploading(true);
        try {
            const res = await fetch(`${API_BASE}/photos/upload`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error("Upload failed");
            router.push('/');
        } catch (error) {
            alert('Failed to upload photo');
            setIsUploading(false);
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 py-10 lg:py-20 flex flex-col items-center justify-center min-h-[70vh]">
            <div className="text-center mb-10 w-full">
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Got something to share?</h1>
                <p className="text-lg text-gray-500 font-medium max-w-xl mx-auto">High quality photos. Authentic moments. Upload to your profile.</p>
            </div>

            <div className="w-full">
                <UploadBox onUpload={handleUpload} isUploading={isUploading} />
            </div>
        </div>
    );
}
