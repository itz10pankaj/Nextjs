// src/app/details/[id]/page.tsx

'use client';

import CardDetail from "../_component/CardDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CardDetailsPage({ params }: PageProps) {
  return <CardDetail id={params.id} />;
}
