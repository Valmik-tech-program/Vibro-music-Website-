// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: {
//     unique: true,
//     required: true,
//     type: String,
//   },

//   email: {
//     unique: true,
//     required: true,
//     type: String,
//   },

//   password: {
//     required: true,
//     type: String,
//   },
//   role: {
//     type: String,
//     enum: ["user", "artist"],
//     default: "user",
//   },
//   favorites: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Music",
//   }],
// });

// export default mongoose.model("User", userSchema);



import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "artist"],
      default: "user",
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    profileImage: {
      type: String,
    },

    favorites: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Music",
    }],
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;