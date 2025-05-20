"use client"
import Card from "./_components/Card";
export default function AboutPage() {

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>This is the about page. Add your company or team info here.</p>
      <div>      
        <Card id={123} />
        <Card id={124} />
      </div>

    </div>
  );
}
