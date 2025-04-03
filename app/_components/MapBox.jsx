"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map/Map"), { ssr: false });
export default function MapBox() {
  return (
    <>
      <Map />
    </>
  );
}
