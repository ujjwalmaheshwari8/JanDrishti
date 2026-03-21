import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const boothLocations = [
  { id: "101", lat: 25.4358, lng: 81.8463, name: "Booth 101", block: "A", issues: 12, status: "critical" },
  { id: "102", lat: 25.4380, lng: 81.8500, name: "Booth 102", block: "A", issues: 8, status: "warning" },
  { id: "103", lat: 25.4340, lng: 81.8520, name: "Booth 103", block: "A", issues: 15, status: "critical" },
  { id: "201", lat: 25.4400, lng: 81.8450, name: "Booth 201", block: "B", issues: 6, status: "normal" },
  { id: "202", lat: 25.4420, lng: 81.8480, name: "Booth 202", block: "B", issues: 10, status: "warning" },
  { id: "203", lat: 25.4410, lng: 81.8530, name: "Booth 203", block: "B", issues: 9, status: "warning" },
  { id: "301", lat: 25.4370, lng: 81.8560, name: "Booth 301", block: "C", issues: 4, status: "normal" },
  { id: "302", lat: 25.4390, lng: 81.8590, name: "Booth 302", block: "C", issues: 7, status: "normal" },
  { id: "303", lat: 25.4350, lng: 81.8600, name: "Booth 303", block: "C", issues: 11, status: "critical" },
];

const statusIcon = (s: string) => {
  if (s === "critical") return <AlertTriangle className="w-4 h-4 text-red-400" />;
  if (s === "warning") return <Clock className="w-4 h-4 text-yellow-400" />;
  return <CheckCircle className="w-4 h-4 text-green-400" />;
};

const statusLabel = (s: string) => {
  if (s === "critical") return "Critical";
  if (s === "warning") return "Moderate";
  return "Low";
};

const markerColor = (s: string) => {
  if (s === "critical") return "#ef4444";
  if (s === "warning") return "#eab308";
  return "#22c55e";
};

const MapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selected, setSelected] = useState<typeof boothLocations[0] | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [25.438, 81.852],
      zoom: 15,
      zoomControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    boothLocations.forEach((booth) => {
      const color = markerColor(booth.status);
      const icon = L.divIcon({
        html: `<div style="width:14px;height:14px;background:${color};border-radius:50%;border:2px solid ${color}33;box-shadow:0 0 8px ${color}80;"></div>`,
        className: "",
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      L.marker([booth.lat, booth.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${booth.name}</b><br/>Block ${booth.block}<br/>${booth.issues} issues`)
        .on("click", () => setSelected(booth));
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-14 flex flex-col lg:flex-row h-[calc(100vh-56px)]">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-80 border-r border-border overflow-y-auto p-4 space-y-3"
        >
          <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            Booth Locations
          </h2>

          {/* Legend */}
          <div className="flex gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Critical</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" /> Moderate</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" /> Low</span>
          </div>

          {boothLocations.map((booth) => (
            <button
              key={booth.id}
              onClick={() => {
                setSelected(booth);
                mapInstance.current?.flyTo([booth.lat, booth.lng], 17, { duration: 0.8 });
              }}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                selected?.id === booth.id
                  ? "border-primary/50 bg-primary/10"
                  : "border-border bg-card hover:border-primary/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{booth.name}</span>
                {statusIcon(booth.status)}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span>Block {booth.block}</span>
                <span>{booth.issues} issues</span>
                <span className={
                  booth.status === "critical" ? "text-red-400" :
                  booth.status === "warning" ? "text-yellow-400" : "text-green-400"
                }>
                  {statusLabel(booth.status)}
                </span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Map */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
