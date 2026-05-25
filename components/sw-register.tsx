"use client";

import { useEffect } from "react";

// Registers the service worker (public/sw.js) once the page has loaded.
// Required for the site to be installable as a PWA on Android/Chrome.
export function SwRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* registration failures are non-fatal */
      });
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}

export default SwRegister;
