'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import type { FooterData } from "@/types/footer";

const FooterContext = createContext<FooterData | null>(null);

export const useFooter = () => useContext(FooterContext);

export const FooterProvider = ({ children, initialData }:  { children: React.ReactNode; initialData: FooterData }) => {
  const [footerData, setFooterData] = useState<FooterData | null>(initialData);

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then(setFooterData)
      .catch((err) => {
        console.error("Failed to fetch footer data:", err);
      });
  }, []);

  return (
    <FooterContext.Provider value={footerData}>
      {children}
    </FooterContext.Provider>
  );
};
