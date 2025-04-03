import IpFetcher from "@/app/_components/IpFetcher/IpFetcher";
import MapBox from "./_components/MapBox";

export default function Page() {
  return (
    <main>
      <IpFetcher />
      <MapBox />
    </main>
  );
}
