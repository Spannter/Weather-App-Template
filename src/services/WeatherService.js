import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;
async function getWeather(city) {
    const response = await axios.get (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    return response.data;
}
export { getWeather };