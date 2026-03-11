"use client";

import PhotoCard from './PhotoCard';

interface PhotoGridProps {
    photos: any[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((photo) => (
                <PhotoCard
                    key={photo.id}
                    id={photo.id}
                    imageUrl={photo.imageUrl}
                    createdAt={photo.createdAt}
                    commentCount={photo.comments?.length || 0}
                />
            ))}
        </div>
    );
}
