'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import type { HeaderData  } from "@/types/header";

const HeaderContext = createContext<HeaderData | null>(null);

export const useHeader = () => useContext(HeaderContext);

export const HeaderProvider = ({ children, initialData }: { children: React.ReactNode; initialData: HeaderData }) => {
  const [headerData, setHeaderData] = useState<HeaderData | null>(initialData);

  useEffect(() => {
    fetch("/api/header")
      .then((res) => res.json())
      .then(setHeaderData)
      .catch((err) => {
        console.error("Failed to fetch header data:", err);
      });
  }, []);

  return (
    <HeaderContext.Provider value={headerData}>
      {children}
    </HeaderContext.Provider>
  );
};
