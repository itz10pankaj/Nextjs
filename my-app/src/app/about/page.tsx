"use client"
import Card from "./_components/Card";
import dynamic from "next/dynamic";
export default function AboutPage() {
  const ClientSideCustomEditor = dynamic( () => import( '@/components/CKEditor' ), { ssr: false } );
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>This is the about page. Add your company or team info here.</p>
      <div>      
        <Card id={123} />
        <Card id={124} />
      </div>
    <ClientSideCustomEditor initialData="<p>PANKAJ</p>" />
    </div>
  );
}
