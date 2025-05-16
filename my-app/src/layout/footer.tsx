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
<footer>
  <div className="footer-grid">
    {footerSections.map((section, idx) => (
      <div className="footer-section" key={idx}>
        <h3>{section.title}</h3>
        <ul>
          {section.links.map((link, i) => (
            <li key={i}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
    ))}
    <div className="footer-extra">
      <h3>EXPERIENCE CARDEKHO APP</h3>
      <div className="app-links">
        {footerApps.map((app, idx) => (
          <Image key={idx} src={app.src} alt={app.alt} width={40} height={40} />
        ))}
      </div>
      <h3>CARDEKHO GROUP VENTURES</h3>
      <div className="ventures">
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
