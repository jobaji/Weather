const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "weather",
  });

  db.connect((err) => {
    if (err) console.error("DB Error:", err);
    else console.log("Connected to MySQL");
});

  app.post("/api/weather", async (req, res) => {
    const {city} = req.body;
    try {
        const apikey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
    
        const{ name, weather, main} = response.data;

        const sql = "INSERT INTO weather_logs (city, description, temperature) VALUES (?, ?, ?)";
        db.query(sql, [name, weather[0].description, main.temp], (err) => {
            if (err) return res.status(500).json({ message: "Database Error" });
            res.json({ name, weather: weather[0].description, temp: main.temp });
        });
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).json({ message: error.response.data.message });
            } else {
                res.status(500).json({ message: "Unknown Error Occurred" });
            }
    }
});

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });