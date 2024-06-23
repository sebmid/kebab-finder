import dynamic from "next/dynamic";

const LeafletNearbyMap = dynamic(() => import("./LeafletNearbyMap"), {
  ssr: false,
});

const MapLoader = () => {
  return <LeafletNearbyMap />;
};

export default MapLoader;
