import scrapeHN from "../scraper/hnScraper.js";

export const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeHN();
    return res.status(200).json({
      success: true,
      message: "Scraped successfully",
      count: stories.length,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Scraping failed",
      error: err.message,
    });
  }
};
