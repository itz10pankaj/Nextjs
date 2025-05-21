import Image from 'next/image';
import React, { useState, MouseEvent } from 'react';
import styled from 'styled-components';
interface ImageViewerProps {
    src: string;
    alt?: string;
    className?: string;
}

const Wrapper = styled.div`
  overflow: hidden;
  background-color: white;
`;
const SmallImage=styled(Image)`
    cursor:pointer
`;
const LargeImage=styled(Image)`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button=styled.button`
  top: 1.25rem; /* top-5 */
  right: 1.25rem; /* right-5 */
  color: white;
  font-size: 1.875rem; /* text-3xl */
  font-weight: bold;
  z-index: 51;
  background: none;
  border: none;
  cursor: pointer;
`;


const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt = 'Image', className = '' }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openViewer = () => setIsOpen(true);
    const closeViewer = () => setIsOpen(false);

    const handleImageClick = (e: MouseEvent) => {
        e.stopPropagation(); 
    };

    return (
        <Wrapper>
            <SmallImage
                width={200}
                height={200}
                src={src}
                alt={alt}
                className={`${className}`}
                onClick={openViewer}
            />

            {isOpen && (
                <Overlay
                    className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
                    onClick={closeViewer}
                >
                    <Button
                        onClick={closeViewer}
                        className="absolute top-5 right-5 text-white text-3xl font-bold z-50"
                    >
                        &times;
                    </Button>
                    <LargeImage
                        width={800}
                        height={800}
                        src={src}
                        alt={alt}
                        className="max-w-full max-h-full object-contain"
                        onClick={handleImageClick}
                    />
                </Overlay>
            )}
        </Wrapper>
    );
};

export default ImageViewer;
