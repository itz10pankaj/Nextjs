'use client';
import { decryptId } from "@/utlis/crypto";
import { useEffect, useState } from "react";
import CardDetail from "../_component/CardDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CardDetailsPage({ params }: PageProps) {
const [originalId, setOriginalId] = useState<number | null>(null);
  useEffect(() => {
    if (params?.id) {
      try {
        const decrypted = decryptId(params.id);
        setOriginalId(decrypted);
      } catch (error) {
        console.log("Invalid encrypted ID",error
        );
      }
    }
  }, [params.id]);
  if (originalId === null) return <div>Loading...</div>;

  return <CardDetail id={originalId} />;
}
