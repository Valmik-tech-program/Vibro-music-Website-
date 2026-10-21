export const isArtist = (req, res, next) => {
  if (req.user.role !== "artist") {
    return res.status(403).json({
      message: "Artist access required",
    });
  }

  next();
};