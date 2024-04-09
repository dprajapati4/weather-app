import styles from "./page.module.css";
import { GETLocation, GetForecast } from "./api/routes";

export default function Home() {
  const currentDateTime = new Date().toLocaleTimeString();

  const getData = async () => {
    const res = await GetForecast();
    console.log("res", res);
    return res;
  };

  // console.log('getData', getData())
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Weatherly</h1>
        <div className={styles.searchbar}>
          <input type="text" placeholder="Enter City" />
          <span>Time: {currentDateTime}</span>
        </div>
        <div className={styles.weatherBox}>
          <div>
            {/* <image /> */}
            <span>79 F</span>
          </div>
        </div>
      </div>
    </main>
  );
}
