import Banner from "@/components/Banner";
import Widgets from "@/components/widgets";

export default function HomePage() {
  return (
  <div className="homepage-container">
      <div className="main-content">
        <h1>Welcome to MyApp</h1>
        <p>This is the home page of your Next.js application.</p>
        <Banner
          images={[
            "/assets/footer/sample.png",
            "/assets/footer/sample.png",
            "/assets/footer/sample.png",
          ]}
          speed={30}
        />
      </div>
      <div className="sidebar">
        <Widgets />
      </div>
    </div>
  );
}
