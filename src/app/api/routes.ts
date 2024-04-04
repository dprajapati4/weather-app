export const dynamic = "force-dynamic"; // defaults to auto

const base_URL = `http://dataservice.accuweather.com/`;

//split this into 2 fn calls
export async function GETLocation(location: string) {
  try {
    const resLocationKey = await fetch(
      `${base_URL}locations/v1/cities/search?q=${location}&apikey=${process.env.WEATHER_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.WEATHER_API_KEY,
        },
      }
    );
    if (resLocationKey.ok) {
      const res = await resLocationKey.json();
      const locationKey = res[0].Key;
      //   console.log("the res", locationKey);
      if (locationKey) {
        try {
          const resOneDayForecast = await fetch(
            `${base_URL}forecasts/v1/daily/1day${locationKey}?apikey=${process.env.WEATHER_API_KEY}`,
            {
              headers: {
                "Content-Type": "application/json",
                "API-Key": process.env.WEATHER_API_KEY,
              },
            }
          );
          if (resOneDayForecast.ok) {
            console.log("resOneDayForecast", resOneDayForecast);
            const oneDayForecast = await resOneDayForecast.json();
            // console.log("the aww forecast", oneDayForecast);
            return oneDayForecast;
          }
        } catch (error) {
          console.log("Error get 1 day forecast", error);
        }
      }
    }
  } catch (error) {
    console.log("Error getting the location key ", error);
  }
}

export async function GetForecast(){
    const locKey = '14-349727_1_AL'
    try {
        const res = await fetch(
            `${base_URL}forecasts/v1/daily/1day${locKey}?apikey=${process.env.WEATHER_API_KEY}`,
            {
              headers: {
                "Content-Type": "application/json",
                "API-Key": process.env.WEATHER_API_KEY,
              },
            }
          )
        console.log('newwww', res)
          if(res.ok){
            const forecasts = await res.json()
            console.log('new forcasts', forecasts)
          }
        
    } catch (error) {
        console.log('err', error)
    }
}
