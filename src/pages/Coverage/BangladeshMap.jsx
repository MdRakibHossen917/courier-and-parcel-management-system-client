import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

const position = [23.685, 90.3563]; // Center of Bangladesh

// Optional custom icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Helper component to move map
function FlyToDistrict({ coords }) {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 14, { duration: 1.5 });
  }
  return null;
}

const BangladeshMap = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const district = serviceCenters.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );
    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
      setActiveDistrict(district.district);
    }
  };

  return (
    <div className="h-[800px] w-full rounded-lg overflow-hidden shadow-lg relative">
      <form
        onSubmit={handleSearch}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md px-4 flex bg-gray-400"
      >
        <input
          type="text"
          placeholder="Search district..."
          className="flex-1 px-4 py-2 border rounded-l-md outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
        >
          Go
        </button>
      </form>

      {/* map container */}
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToDistrict coords={activeCoords} />

        {serviceCenters.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
            icon={customIcon}
          >
            <Popup autoOpen={center.district === activeDistrict}>
              <strong>{center.district}</strong>
              <br />
              {center.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
