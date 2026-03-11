"use client";

import { useState, useRef } from 'react';
import { UploadCloud, ImageIcon, X, Loader2 } from 'lucide-react';

interface UploadBoxProps {
    onUpload: (file: File) => Promise<void>;
    isUploading: boolean;
}

export default function UploadBox({ onUpload, isUploading }: UploadBoxProps) {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="max-w-2xl mx-auto w-full">
            {!preview ? (
                <div
                    className={`relative flex flex-col items-center justify-center w-full min-h-[400px] border-[3px] border-dashed rounded-[2rem] transition-all duration-300 shadow-sm ${dragActive ? 'border-gray-900 bg-gray-50 scale-[1.02]' : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50/50'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleChange}
                    />
                    <div className="flex flex-col items-center justify-center p-8 text-center cursor-pointer">
                        <div className={`w-24 h-24 mb-6 rounded-full flex items-center justify-center transition-colors duration-300 ${dragActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                            <UploadCloud size={48} strokeWidth={1.5} />
                        </div>
                        <p className="mb-3 text-2xl font-bold text-gray-900">
                            Drag & drop and share
                        </p>
                        <p className="text-gray-500 font-medium">
                            or click to browse from your computer
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white border border-gray-100 ring-1 ring-black/5">
                    <button
                        onClick={clearFile}
                        className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 text-white rounded-full hover:bg-black transition-all backdrop-blur-md hover:scale-110 active:scale-95"
                        disabled={isUploading}
                    >
                        <X size={20} strokeWidth={2.5} />
                    </button>
                    <div className="relative bg-gray-100 w-full pt-[60%] flex items-center justify-center">
                        <img src={preview} alt="Upload preview" className="absolute inset-0 w-full h-full object-contain p-4 drop-shadow-md" />
                    </div>
                    <div className="p-6 bg-white flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 gap-4">
                        <div className="flex items-center gap-3 text-gray-600 w-full sm:w-auto overflow-hidden bg-gray-50 px-4 py-2.5 rounded-xl">
                            <ImageIcon size={20} className="text-gray-400 shrink-0" />
                            <span className="font-semibold text-sm truncate">{file?.name}</span>
                        </div>
                        <button
                            onClick={() => { if (file) onUpload(file); }}
                            disabled={isUploading}
                            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white w-full sm:w-auto rounded-full font-bold text-sm tracking-wide hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <UploadCloud size={20} />
                                    Post Photo
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
