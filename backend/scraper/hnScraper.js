import axios from "axios";
import * as cheerio from "cheerio";
import Story from "../models/Story.js";

const HN_URL = "https://news.ycombinator.com";
const STORY_LIMIT = 10;

const scrapeHN = async () => {
  try {
    const { data: html } = await axios.get(HN_URL);
    const $ = cheerio.load(html);

    const savedStories = [];

    const athingRows = $("tr.athing").slice(0, STORY_LIMIT);

    for (let i = 0; i < athingRows.length; i++) {
      const athingRow = athingRows.eq(i);
      const subtextRow = athingRow.next();

      const titleAnchor = athingRow.find(".titleline > a").first();
      const title = titleAnchor.text().trim();

      let url = titleAnchor.attr("href") || "";
      if (url.startsWith("item?id=")) {
        url = `${HN_URL}/${url}`;
      }

      const scoreEl = subtextRow.find(".score");
      const points = scoreEl.length
        ? parseInt(scoreEl.text().replace(/[^0-9]/g, ""), 10) || 0
        : 0;

      const authorEl = subtextRow.find(".hnuser");
      const author = authorEl.length ? authorEl.text().trim() : "unknown";

      const ageEl = subtextRow.find(".age");
      const postedAt =
        ageEl.attr("title") || ageEl.text().trim() || new Date().toISOString();

      if (!title) continue;

      const saved = await Story.findOneAndUpdate(
        { title },
        { title, url, points, author, postedAt },
        { upsert: true, new: true }
      );

      savedStories.push(saved);
    }

    console.log(`[scrapeHN] Successfully scraped ${savedStories.length} stories.`);
    return savedStories;
  } catch (err) {
    console.error("[scrapeHN] Scraping failed:", err.message);
    throw err;
  }
};

export default scrapeHN;
