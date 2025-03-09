const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const NodeCache = require("node-cache"); // You'll need to install this: npm install node-cache

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

// Create a server-side cache with TTL of 24 hours
const fileCache = new NodeCache({ stdTTL: 30 * 24 * 60 * 60 * 1000 });

const API_KEY = process.env.VITE_API_KEY;

app.get("/download", async (req, res) => {
  const fileId = req.query.fileId;
  if (!fileId) {
    return res.status(400).send("File ID is required.");
  }

  try {
    // Check if we have this file cached
    const cachedFile = fileCache.get(fileId);
    if (cachedFile) {
      console.log(`Cache hit for file: ${fileId}`);
      // If we have it cached, send it directly
      return res.send(cachedFile);
    }

    console.log(`Cache miss for file: ${fileId}, fetching...`);
    const response = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${API_KEY}`,
      { responseType: "stream" }
    );

    // For now, we'll just stream the response without caching since it's binary data
    // Caching binary streams is more complex and would require collecting the entire stream
    // before sending it to the client, which might not be optimal for large files.
    response.data.pipe(res);
  } catch (err) {
    console.error("Error fetching file:", err.response?.data || err.message);
    res.status(500).send("Failed to fetch the file.");
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
  console.log("Request received BY the server");
});

app.listen(PORT, () => {
  console.log(`Proxy server running on PORT ${PORT}`);
});
