import Link from "next/link";
import ImageViewer from "@/components/ImageViewer";
import { encryptId } from "@/utlis/crypto";
interface Props {
  id: number;
}

const Card: React.FC<Props> = ({ id }) => {
  const encryptedId = encryptId(id);

  return (
    <section className="w-full max-w-md mx-auto flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-4">Card--{id}</h2>

      <ImageViewer
        src="/assets/footer/sample.png"
        alt="New SUV Launch!"
      />

      <Link href={`/details/${encryptedId}`}>
        <button className="mt-6 px-4 py-2 bg-green-500 text-white font-medium rounded-md border-2 border-green-700 hover:bg-green-600 transition-all duration-200">
          Click here to go to Card!
        </button>
      </Link>
    </section>
  );
};

export default Card;
