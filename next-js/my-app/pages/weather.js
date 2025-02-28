import { useState } from 'react';

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');

  const fetchWeatherByCity = async () => {
    if (!city) {
      alert("Masukkan nama kota");
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    if (data.error) {
      alert(data.error);
    } else {
      setWeather(data.current_weather);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Informasi Cuaca</h1>
      <input
        type="text"
        placeholder="Masukkan nama kota"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}
      />
      <button onClick={fetchWeatherByCity} disabled={loading}>
        {loading ? "Memuat..." : "Tampilkan Cuaca"}
      </button>
      {weather && (
        <div>
          <p>Temperatur: {weather.temperature}°C</p>
          <p>Kecepatan Angin: {weather.windspeed} km/h</p>
          <p>Kondisi: {weather.weathercode}</p>
        </div>
      )}
    </div>
  );
}