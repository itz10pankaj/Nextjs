"use client";

import React from "react";
import Image from "next/image";

interface AdItem {
  image: string;
  title: string;
  link?: string;
  description?: string;
}

const ads: AdItem[] = [
  {
    image: "/assets/footer/sample.png",
    title: "New SUV Launch!",
    link: "#",
    description: "Discover the latest SUV models now available.",
  },
  {
    image: "/assets/footer/sample.png",
    title: "Get Instant Car Loans",
    link: "#",
    description: "Low interest rates starting at 7.5%.",
  },
  {
    image: "/assets/footer/sample.png",
    title: "Car Insurance Offers",
    link: "#",
    description: "Compare and buy insurance in minutes.",
  },
];

const AdvertisementSection: React.FC = () => {
  return (
 <section className="advertisement-section">
      <h2>Sponsored Ads</h2>
      <div className="ads-grid">
        {ads.map((ad, idx) => (
          <a href={ad.link} key={idx}>
            <Image
              src={ad.image}
              alt={ad.title}
              width={400}
              height={200}
            />
            <div className="ad-content">
              <h3>{ad.title}</h3>
              {ad.description && <p>{ad.description}</p>}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
