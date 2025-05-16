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
    <section className="bg-gray-100 py-10 px-4 ">
      <h2 className="text-xl font-bold mb-6">Sponsored Ads</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {ads.map((ad, idx) => (
          <a
            href={ad.link}
            key={idx}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <Image
              src={ad.image}
              alt={ad.title}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-md font-semibold">{ad.title}</h3>
              {ad.description && (
                <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default AdvertisementSection;
