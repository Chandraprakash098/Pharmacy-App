import Image from "next/image";
import { Inter } from "next/font/google";
import Card from "./Card";
import { useEffect, useState } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [medicineData, setMedicineData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch("/api/medData");
        if (!response.ok) {
          throw new Error("Failed to fetch medicines");
        }
        const data = await response.json();
        setMedicineData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching medicines:", err);
        setError("Failed to load medicines. Please try again later.");
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = medicineData.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Head>
        <title>Pharmacy App</title>
      </Head>
      <div className={`${inter.className} bg-gray-100 min-h-screen`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
            Pharmacy Store
          </h1>
          <div className="relative w-full aspect-[21/9] mb-12">
            <Image
              src="/images/pharma.jpg"
              alt="Pharmacy store front"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search for medicines..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredData.map((medicine) => (
              <Card key={medicine._id} data={medicine} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
