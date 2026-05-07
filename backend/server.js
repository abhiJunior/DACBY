import express from "express";
import cors from "cors";
import connectToDB from "./Config/dbConfig.js";
import authRouter from "./routes/auth.js";
import storyRoutes from "./routes/storyRoutes.js";
import scrapeRoutes from "./routes/scrapeRoutes.js";
import scrapeHN from "./scraper/hnScraper.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scrapeRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("Hello from server");
});

app.get("/api/health", (req, res) => {
  return res.status(200).send("Server is running fine");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`Server is running at http://localhost:${PORT}`);

  try {
    await scrapeHN();
    console.log("Initial scrape complete");
  } catch (err) {
    console.error("Initial scrape failed:", err.message);
  }
});