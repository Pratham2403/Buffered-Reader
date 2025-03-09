const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "AIzaSyCrKnWIvGZkh39oA58YfBR0EktQENVYDt0"; // Replace with your actual API key

app.get("/download", async (req, res) => {
  const fileId = req.query.fileId;
  if (!fileId) {
    return res.status(400).send("File ID is required.");
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`,
      { responseType: "stream" }
    );
    response.data.pipe(res);
  } catch (err) {
    console.error("Error fetching file:", err.response?.data || err.message);
    res.status(500).send("Failed to fetch the file.");
  }
});

app.listen(3001, () => {
  console.log("Proxy server running on http://localhost:3001");
});