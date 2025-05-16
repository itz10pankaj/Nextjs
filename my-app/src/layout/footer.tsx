import React from 'react'
import Image from 'next/image';
const footerSections = [
  {
    title: "ABOUT CARDEKHO",
    links: [
      { label: "About", href: "#" },
      { label: "Careers With Us", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Corporate Policies", href: "#" },
      { label: "Investors", href: "#" },
      { label: "FAQs", href: "#" },
    ],
  },
  {
    title: "CONNECT WITH US",
    links: [
      { label: "Feedback", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Advertise with Us", href: "#" },
      { label: "Become Partner Dealer", href: "#" },
    ],
  },
  {
    title: "OTHERS",
    links: [
      { label: "TrucksDekho", href: "#" },
      { label: "TyreDekho", href: "#" },
      { label: "TractorsDekho", href: "#" },
      { label: "Girnar Vision Fund", href: "#" },
      { label: "Emergency Response", href: "#" },
      { label: "Car Sales Trends", href: "#" },
    ],
  },
];
const footerApps = [
  { src: "/assets/footer/sample.png", alt: "App Store" },
  { src: "/assets/footer/sample.png", alt: "Google Play" },
];
const footerVentures = [
    { src: "/assets/footer/sample.png", alt: "TrucksDekho" },
    { src: "/assets/footer/sample.png", alt: "TyreDekho" },
    { src: "/assets/footer/sample.png", alt: "TractorsDekho" },
    { src: "/assets/footer/sample.png", alt: "CarDekho Gaadi Store" },
    { src: "/assets/footer/sample.png", alt: "CarDekho Insurance" },
    { src: "/assets/footer/sample.png", alt: "CarDekho Finance" },
];

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {footerSections.map((section, idx) => (
          <div key={idx}>
            <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
            <ul className="space-y-2">
              {section.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm hover:underline">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-1">
          <h3 className="font-semibold text-sm mb-3">EXPERIENCE CARDEKHO APP</h3>
          <div className="flex gap-2 mb-5">
            {footerApps.map((app, idx) => (
               <Image key={idx} src={app.src} alt={app.alt} width={40} height={40} />

            ))}
          </div>
          <h3 className="font-semibold text-sm mb-3">CARDEKHO GROUP VENTURES</h3>
          <div className="flex flex-wrap gap-4 items-center">
            {footerVentures.map((venture, idx) => (
               <Image key={idx} src={venture.src} alt={venture.alt} width={48} height={48} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer
