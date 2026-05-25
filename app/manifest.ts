import type { MetadataRoute } from "next";

// Web app manifest — lets Android / Chrome install the site as a PWA and use a
// proper home-screen icon instead of a scaled-up favicon. Icons are full-bleed
// and maskable-safe (helix sits within the central safe zone).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Curriculum",
    short_name: "Curriculum",
    description:
      "A structured learning path through the molecular genetics of the nervous system.",
    start_url: "/",
    display: "standalone",
    background_color: "#6d28d9",
    theme_color: "#7c3aed",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
