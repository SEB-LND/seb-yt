const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// connect Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// simple test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// GET API to fetch videos from Supabase
app.get("/api/videos", async (req, res) => {
  try {
    const { data, error } = await supabase.from("videos").select("*");

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

// POST API to add a new video to Supabase
app.post("/api/videos", async (req, res) => {
  try {
    const {
      title,
      channelTitle,
      thumbnailUrl,
      duration,
      embedUrl,
    } = req.body;

    const { data, error } = await supabase
      .from("videos")
      .insert([
        {
          title,
          channelTitle,
          viewCount: 0,
          thumbnailUrl,
          duration,
          embedUrl,
        },
      ])
      .select();

    if (error) throw error;
    res.status(201).json({ message: "Video added successfully!", data });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to add video" });
  }
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
