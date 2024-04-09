export const dynamic = "force-dynamic"; // defaults to auto

const base_URL = `http://dataservice.accuweather.com`;

//split this into 2 fn calls
export async function GETLocation(location: string) {
  try {
    const locationKey = await GetLocationKey(location);
    if (locationKey) {
      const resOneDayForecast = await GetForecast(locationKey);
      return resOneDayForecast;
    }
  } catch (error) {
    console.log("Error getting the forecast for location key ", error);
  }
}

///locations/v1/cities/search?q=${location}&apikey=XXXXXXX

export async function GetLocationKey(location: string) {
  try {
    const resLocationKey = await fetch(
      `${base_URL}/locations/v1/cities/search?q=${location}&apikey=${process.env.WEATHER_API_KEY}`,
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
      return locationKey;
    }
  } catch (error) {
    console.log(
      `Error getting the location key for location ${location} `,
      error
    );
  }
}

///forecasts/v1/daily/1day/${locKey}?apikey=XXXXXXX

export async function GetForecast(locKey: string) {
  // const locKey = '14-349727_1_AL'
  try {
    const res = await fetch(
      `${base_URL}/forecasts/v1/daily/1day/${locKey}?apikey=${process.env.WEATHER_API_KEY}`,
      {
        headers: {
          "Content-Type": "application/json",
          "API-Key": process.env.WEATHER_API_KEY,
        },
      }
    );
    if (res.ok) {
      const forecasts = await res.json();
      // console.log('new forecasts', forecasts)
      return forecasts.DailyForecasts[0];
    }
  } catch (error) {
    console.log(
      `Error getting the daily forecast for location key: ${locKey}`,
      error
    );
  }
}

// Sample returned data
// {
//   Date: '2024-04-08T07:00:00-04:00',
//   EpochDate: 1712574000,
//   Temperature: {
//     Minimum: { Value: 53, Unit: 'F', UnitType: 18 },
//     Maximum: { Value: 67, Unit: 'F', UnitType: 18 }
//   },
//   Day: {
//     Icon: 14,
//     IconPhrase: 'Partly sunny w/ showers',
//     HasPrecipitation: true,
//     PrecipitationType: 'Rain',
//     PrecipitationIntensity: 'Moderate'
//   },
//   Night: { Icon: 35, IconPhrase: 'Partly cloudy', HasPrecipitation: false },
//   Sources: [ 'AccuWeather' ],
//   MobileLink: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/14-349727_1_al?day=1&lang=en-us',
//   Link: 'http://www.accuweather.com/en/us/new-york-ny/10021/daily-weather-forecast/14-349727_1_al?day=1&lang=en-us'
// }
