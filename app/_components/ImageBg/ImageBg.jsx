"use client";
import Image from "next/image";
import bg2 from "@/public/pattern-bg-desktop.png";
import bg from "@/public/pattern-bg-mobile.png";
import { useMediaQuery } from "@mui/material";
import styles from "./ImageBg.module.css";

export default function ImageBg() {
  const lg = useMediaQuery("(min-width:1000px)");
  return (
    <Image
      src={lg ? bg2 : bg}
      fill
      placeholder="blur"
      quality={100}
      className={styles.bg}
      alt="bg"
    />
  );
}
