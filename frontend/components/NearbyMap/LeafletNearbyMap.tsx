import "leaflet/dist/leaflet.css";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { useState, useEffect } from "react";

import axios from "axios";
import { map } from "leaflet";

//interface for kebabshops api response
interface KebabShop {
  id: string;
  name: string;
  geometry: {
    coordinates: [number, number];
  };
}

export default function LeafletNearbyMap() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [kebabShops, setKebabShops] = useState<KebabShop[]>([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchKebabShops = async () => {
      try {
        const response = await axios.get(
          "https://api.mapbox.com/search/v1/searchbox",
          {
            params: {
              access_token: mapboxToken,
              query: "kebab",
              limit: 10,
              proximity: "ip",
            },
          }
        );
        setKebabShops(response.data.features);
      } catch (error) {
        console.error("error fetching data from API", error);
      }
    };
    fetchKebabShops();
  }, [mapboxToken]);

  return (
    <MapContainer
      className="w-3/4 h-3/4"
      center={[51.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {kebabShops.map((kebabShop) => (
        <Marker key={kebabShop.id} position={kebabShop.geometry.coordinates}>
          <Popup>{kebabShop.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
