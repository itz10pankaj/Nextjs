import React from 'react';
import Image from 'next/image';

interface BannerProps {
  images: string[];
  speed?: number; // in seconds
}

const Banner: React.FC<BannerProps> = ({ images, speed = 30 }) => {
  return (
    <div className="overflow-hidden  bg-white">
      <div
        className="flex animate-scroll"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...images,...images].map((src, index) => (
          <div
            key={index}
            className="relative w-[200px] h-[200px] mx-4 flex-shrink-0"
          >
            <Image
              src={src}
              alt={`banner-img-${index}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
