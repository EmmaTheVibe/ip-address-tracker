"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import { useGeolocation } from "../GeolocationContext";
import Spinner from "../Spinner/Spinner";
import styles from "./IpFetcher.module.css";

export default function IpFetcher() {
  const [inputIp, setInputIp] = useState("");

  const { geolocation, fetchGeolocation, errorMessage, loading } =
    useGeolocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputIp) {
      fetchGeolocation(inputIp);
      setInputIp("");
    }
  };

  if (!geolocation) return;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <input
            value={inputIp}
            required
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
              <p className={styles.content}>{geolocation.location.timezone}</p>
            </div>

            <div className={styles.line}>
              <p className={styles.tag}>ISP</p>
              <p className={styles.content}>{geolocation.isp}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
