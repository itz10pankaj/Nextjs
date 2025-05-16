import AdvertisementSection from "@/components/AdvertisementSection";
 
export default function HomePage() {
  return (
    <div className="p-8 flex flex-row ">
      <div className="w-3/4">
        <h1 className="text-3xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="text-gray-700">This is the home page of your Next.js application.</p>
      </div>
      <div className="w-1/4">
        <AdvertisementSection />
      </div>
    </div>
  );
}
