"use client";
import MapLoader from "@/components/NearbyMap/MapLoader";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-kebabblue">
      <div className="text-center flex flex-col items-center ">
        <div className="flex flex-row ">
          <Image
            width={96}
            height={96}
            src="/kebabfinderlogoi.png"
            alt="Kebab Finder Logo"
          />
          <h1 className="text-4xl font-bold text-kebabwhite m-4">
            Kebab Finder
          </h1>
        </div>

        <p className="text-lg text-gray-700">
          Find your nearest kebab shop now!
        </p>
      </div>

      <div className="w-full h-screen flex items-center justify-center">
        <MapLoader />
      </div>
    </div>
  );
}
