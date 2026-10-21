
import mongoose from 'mongoose';

const musicschema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },

  songname: {
    type: String,
    required: true,
  },

  songbanner: {
    type: String,
    required: true,
  },

  // 🔥 NEW FIELDS
  artist: {
    type: String,
    required: true,
  },

  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  album: {
    type: String,
  },

  genre: {
    type: String,
  },

  duration: {
    type: Number, // in seconds
  },

  releaseDate: {
    type: Date,
  },

  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Music", musicschema);