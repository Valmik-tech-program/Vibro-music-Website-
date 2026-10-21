import Music from "../models/music.model.js";

export const getMySongs = async (req, res) => {
  try {
    const songs = await Music.find({
      uploadedBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      songs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};