import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT;
const apiKey = process.env.OPENWEATHER_API_KEY;

app.use(express.static(path.join(__dirname, "public")));

app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({error: "City is requires."});
  }
  
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

  try {
   const response = await fetch(apiUrl);
   const data = await response.json();

   if (data.cod !== 200) {
     return res.status(data.cod).json({error: data.message});
   }
   res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Internal server error."});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
