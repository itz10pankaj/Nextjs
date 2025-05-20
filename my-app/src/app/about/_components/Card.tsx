import Link from "next/link";
import ImageViewer from "@/components/ImageViewer";
const Card: React.FC = () => {
    const id = "123";
  return (
 <section className="widgets-section">
      <h2>Sample</h2>
      <div className="ads-grid">
        Hii
      </div>
        <ImageViewer
          src="/assets/footer/sample.png"
          alt="New SUV Launch!"
        />
      <Link href={`/details/${id}`}>
        <div className="ad-content">
          <h3>New SUV Launch!</h3>
          <p>Discover the latest SUV models now available.</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
