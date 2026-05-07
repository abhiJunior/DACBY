import Story from "../models/Story.js";

export const getAllStories = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const [stories, total] = await Promise.all([
      Story.find()
        .sort({ points: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Story.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      data: stories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
      error: err.message,
    });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: story,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch story",
      error: err.message,
    });
  }
};

export const toggleBookmark = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    const alreadyBookmarked = story.bookmarkedBy
      .map((id) => id.toString())
      .includes(req.user.id.toString());

    let updatedStory;

    if (alreadyBookmarked) {
      updatedStory = await Story.findByIdAndUpdate(
        req.params.id,
        { $pull: { bookmarkedBy: req.user.id } },
        { new: true }
      );
    } else {
      updatedStory = await Story.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { bookmarkedBy: req.user.id } },
        { new: true }
      );
    }

    return res.status(200).json({
      success: true,
      bookmarked: !alreadyBookmarked,
      data: updatedStory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to toggle bookmark",
      error: err.message,
    });
  }
};
