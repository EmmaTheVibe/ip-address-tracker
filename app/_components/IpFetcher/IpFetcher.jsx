"use client";
import bg2 from "@/public/pattern-bg-desktop.png";
import bg from "@/public/pattern-bg-mobile.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { useState } from "react";
import styles from "./IpFetcher.module.css";
import { useGeolocation } from "../GeolocationContext";
import Spinner from "../Spinner/Spinner";

export default function IpFetcher() {
  const md = useMediaQuery("(min-width:650px)");
  const lg = useMediaQuery("(min-width:1000px)");
  const [inputIp, setInputIp] = useState("");

  const { geolocation, fetchGeolocation, errorMessage, loading } =
    useGeolocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputIp) {
      fetchGeolocation(inputIp);
    }
  };

  // if (loading) return <Spinner />;
  if (!geolocation) return;

  return (
    <section className={styles.fetcher}>
      <Image
        src={lg ? bg2 : bg}
        fill
        placeholder="blur"
        quality={100}
        className={styles.bg}
        alt="bg"
      />
      <div
        className={styles.container}
        style={{ width: `${lg ? "900px" : md ? "645px" : "315px"}` }}
      >
        <p className={styles.title}>IP Address Tracker</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <input
              value={inputIp}
              // defaultValue={userIp}
              onChange={(e) => setInputIp(e.target.value)}
              type="text"
              placeholder="Search for any IP address or domain"
            />
            <button type="submit">
              <img src="/icon-arrow.svg" alt="arrow" />
            </button>
          </div>
        </form>
        <div className={styles.infoBox}>
          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <>
              <div className={styles.line}>
                <p className={styles.tag}>IP ADDRESS</p>
                <p className={styles.content}>{geolocation.ip}</p>
              </div>

              <div className={styles.line}>
                <p className={styles.tag}>LOCATION</p>
                <p
                  className={styles.content}
                >{`${geolocation.location.region}, ${geolocation.location.country}`}</p>
              </div>

              <div className={styles.line}>
                <p className={styles.tag}>TIMEZONE</p>
                <p className={styles.content}>
                  {geolocation.location.timezone}
                </p>
              </div>

              <div className={styles.line}>
                <p className={styles.tag}>ISP</p>
                <p className={styles.content}>{geolocation.isp}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
