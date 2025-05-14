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

  app.post("api.weather", async (req, res) => {
    const {city} = req.body;
    try {
        const apikey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data`);
    } catch (error) {
    }
});

  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });