import { Weather } from "./types";

async function MakeRequest(location: string) {
  const url = new URL("https://weatherapi-com.p.rapidapi.com/forecast.json")
  url.searchParams.append('q', location) 
  url.searchParams.append("days", '3');

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY, 
      "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
    },
  };

  const response = await fetch(
    url.toString(),
    options
  );

  return response 
}

export const fetchWeatherForcast = async (location: string) => {
  const response = await MakeRequest(location)
  const data = await response.json();

  if(!response.ok) {
    throw Error('Some shit happened');
  }

  console.log('data', data.location);

  return data as Weather;
};
