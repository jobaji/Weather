import { useState } from 'react'
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const getWeather = async () => {
    setError("");
    try {
      const response = await axios.post('http://localhost:5000/api/weather', { city });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching data");
    }
  };

  return (
    <>
      <div style ={{ padding:20 }}>
        <h1>Weather Forecast</h1>
        <input type="text" placeholder="city" value={city} onChange={(e) => setCity(e.target.value)}/>
        <br />
        <br />
        <button onClick={getWeather}>Fetch Weather</button>
        <br />
        {result && (
          <div>
            <h3>{result.name}</h3>
            <p>{result.weather}</p>
            <p>{(result.temp - 273.15).toFixed(2)} °C</p>
          </div>
        )}
        {}

        {error && <p style={{ color: "red"}}>{error}</p>}
      </div>
    </>
  )
}

export default App
