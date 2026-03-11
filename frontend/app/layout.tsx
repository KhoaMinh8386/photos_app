import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
    title: 'Photo App Minh Khoa',
    description: 'Upload and comment on photos built with Next.js',
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased font-sans text-gray-900 bg-gray-50 flex flex-col min-h-screen selection:bg-black selection:text-white">
                <Navbar />
                <main className="flex-1 w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
