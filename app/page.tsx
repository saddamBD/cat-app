"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN/UI Button component
import Image from "next/image"; // Next.js Image component

interface Cat {
  url: string;
}

export default function Home() {
  const [catImages, setCatImages] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCatImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=29",
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_THE_CAT_API_KEY!, // Use your API key here
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error fetching cat images");
      }

      const data: Cat[] = await res.json();
      setCatImages(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Random Cat Images</h1>

      <Button onClick={fetchCatImages} disabled={loading} className="mb-6">
        {loading ? "Loading..." : "Show Me Cats!"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-3 gap-4">
        {catImages.map((cat, index) => (
          <div key={index} className="border rounded-lg p-2">
            <Image
              src={cat.url}
              alt={`Random Cat ${index + 1}`}
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
