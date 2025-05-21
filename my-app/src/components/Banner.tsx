'use client';
import React from 'react';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

interface BannerProps {
  images: string[];
  speed?: number; // in seconds
}

// Keyframes for scrolling animation
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;
const Wrapper = styled.div`
  overflow: hidden;
  background-color: white;
`;
const MovingBanner = styled.div<{ speed: number }>`
  display: flex;
  animation: ${scroll} ${({ speed }) => speed}s linear infinite;
`;
const ImageContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 1rem;
  flex-shrink: 0;
`;
const StyledImage = styled(Image)`
  object-fit: contain;
`;

const Banner: React.FC<BannerProps> = ({ images, speed = 60 }) => {
  return (
    <Wrapper>
      <MovingBanner speed={speed}>
        {[...images, ...images].map((src, index) => (
          <ImageContainer key={index}>
            <StyledImage src={src} alt={`banner-img-${index}`} fill />
          </ImageContainer>
        ))}
      </MovingBanner>
    </Wrapper>
  );
};

export default Banner;
