import { Suspense } from "react";
import ImageBg from "../ImageBg/ImageBg";
import IpFetcher from "../IpFetcher/IpFetcher";
import MapBox from "../MapBox";
import Spinner from "../Spinner/Spinner";
import styles from "./ContentBox.module.css";

export default function ContentBox() {
  return (
    <section className={styles.contentBox}>
      <div>
        <ImageBg />
        <div className={styles.container}>
          <p className={styles.title}>IP Address Tracker</p>
          <Suspense fallback={<Spinner />}>
            <IpFetcher />
          </Suspense>
        </div>
      </div>

      <section className={styles.mapContainer}>
        <MapBox />
      </section>
    </section>
  );
}
