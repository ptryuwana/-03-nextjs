export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Kota harus diisi" });
  }

  const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`);
  const geoData = await geoRes.json();
  
  if (!geoData.results || geoData.results.length === 0) {
    return res.status(404).json({ error: "Kota tidak ditemukan" });
  }

  const { latitude, longitude } = geoData.results[0];

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const weatherData = await weatherRes.json();
  res.status(200).json(weatherData);
}