"use client"
import React from 'react'
import Image from 'next/image';
import { useFooter } from '@/context/FooterContext';

const Footer = () => {
  const footer=useFooter();
   if (!footer) return <div>Loading footer...</div>;
  return (
    <footer>
      <div className="footer-grid">
        {
          footer.footerSectionsHeaders.map((link,) => (
            <div key={link.headerid} className="footer-column">
              <h3>{link.label}</h3>
              <ul>
                {footer.footerSectionLinks.map((item, index) => (
                  <div key={index}>{item.headerid === link.headerid && <li key={index}>{item.label}</li>}</div>
                ))}
              </ul>
            </div>
          ))
        }
        <div className="footer-extra">
          <h3>EXPERIENCE CARDEKHO APP</h3>
          <div className="app-links">
            {footer.footerApps.map((app, idx) => (
              <Image key={idx} src={app.src} alt={app.alt} width={40} height={40} />
            ))}
          </div>
          <h3>CARDEKHO GROUP VENTURES</h3>
          <div className="ventures">
            {footer.footerVentures.map((venture, idx) => (
              <Image key={idx} src={venture.src} alt={venture.alt} width={48} height={48} />
            ))}
          </div>
        </div>
      </div>
    </footer>

  );
};


export default Footer
