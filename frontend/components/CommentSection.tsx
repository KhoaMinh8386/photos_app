"use client";

import { useState } from 'react';
import { Send, Clock } from 'lucide-react';

interface Comment {
    id: string;
    content: string;
    createdAt: string;
}

interface CommentSectionProps {
    comments: Comment[];
    onSubmit: (content: string) => Promise<void>;
    isSubmitting: boolean;
}

export default function CommentSection({ comments, onSubmit, isSubmitting }: CommentSectionProps) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim() || isSubmitting) return;
        await onSubmit(content);
        setContent('');
    };

    const getAvatarColor = (id: string) => {
        const colors = ['bg-orange-500', 'bg-blue-500', 'bg-emerald-500', 'bg-rose-500', 'bg-violet-500'];
        let hash = 0;
        for (let i = 0; i < id.length; i++) hash += id.charCodeAt(i);
        return colors[hash % colors.length];
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                Comments <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 min-w-[1.5rem] flex items-center justify-center py-0.5 rounded-full">{comments.length}</span>
            </h3>

            <div className="flex-1 overflow-y-auto space-y-5 mb-6 pr-2 custom-scrollbar">
                {comments.length === 0 ? (
                    <div className="text-center text-gray-400 py-10 font-medium">No comments yet. Start the conversation!</div>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 group">
                            <div className={`w-9 h-9 rounded-full flex-shrink-0 shadow-sm ${getAvatarColor(comment.id)}`} />
                            <div className="flex-1">
                                <div className="inline-block bg-gray-100 px-4 py-2.5 rounded-2xl rounded-tl-sm transition-colors text-sm text-gray-800 font-medium">
                                    {comment.content}
                                </div>
                                <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400 font-medium ml-1">
                                    <Clock size={10} />
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className="relative mt-auto pt-4 border-t border-gray-100 bg-white sticky bottom-0">
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full pl-5 pr-14 py-3.5 bg-gray-100 text-sm font-medium border-2 border-transparent rounded-full focus:outline-none focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-200 transition-all"
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={!content.trim() || isSubmitting}
                    className="absolute right-2 top-[24px] p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all disabled:opacity-0 disabled:scale-75 shadow-sm active:scale-95 duration-200"
                >
                    <Send size={16} className="relative -ml-0.5" />
                </button>
            </form>
        </div>
    );
}
