import User from "../models/user.model.js";

export const addFavorite = async (req, res) => {
  try {
    const { songId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.favorites.includes(songId)) {
      return res.status(400).json({
        message: "Song already in favorites",
      });
    }

    user.favorites.push(songId);

    await user.save();

    res.status(200).json({
      message: "Song added to favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const removeFavorite = async (req, res) => {
  try {
    const { songId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.favorites = user.favorites.filter(
      (id) => id.toString() !== songId
    );

    await user.save();

    res.status(200).json({
      message: "Song removed from favorites",
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("favorites");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};