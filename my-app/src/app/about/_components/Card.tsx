import Image from "next/image";
import Link from "next/link";
const Card: React.FC = () => {
    const id = "123";
  return (
 <section className="widgets-section">
      <h2>Sample</h2>
      <div className="ads-grid">
        Hii
      </div>
      <Link href={`/details/${id}`}>
        <Image
          src="/assets/footer/sample.png"
          alt="New SUV Launch!"
          width={400}
          height={200}
        />
        <div className="ad-content">
          <h3>New SUV Launch!</h3>
          <p>Discover the latest SUV models now available.</p>
        </div>
      </Link>
    </section>
  );
};

export default Card;
