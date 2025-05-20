import Image from 'next/image';
import React, { useState, MouseEvent } from 'react';

interface ImageViewerProps {
    src: string;
    alt?: string;
    className?: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt = 'Image', className = '' }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openViewer = () => setIsOpen(true);
    const closeViewer = () => setIsOpen(false);

    const handleImageClick = (e: MouseEvent) => {
        e.stopPropagation(); 
    };

    return (
        <>
            <Image
                width={200}
                height={200}
                src={src}
                alt={alt}
                className={`cursor-pointer ${className}`}
                onClick={openViewer}
            />

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                    onClick={closeViewer}
                >
                    <button
                        onClick={closeViewer}
                        className="absolute top-5 right-5 text-white text-3xl font-bold z-50"
                    >
                        &times;
                    </button>
                    <Image
                        width={800}
                        height={800}
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-full object-contain"
                        onClick={handleImageClick}
                    />
                </div>
            )}
        </>
    );
};

export default ImageViewer;
