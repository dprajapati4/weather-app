import styles from "./page.module.css";
import {GETLocation, GetForecast } from './api/routes'

export default function Home() {

  const getData = async() => {
    const res = await getForecast()
    return  res
  }

  console.log('getForecast', getData())

  return (
    <main className={styles.main}>
     
    </main>
  );
}
