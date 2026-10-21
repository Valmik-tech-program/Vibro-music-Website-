import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import googleClient from "../config/google.js";
import { google } from "googleapis";


export const signup = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fild required",
    });
  }

  const Existuser = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (Existuser) {
    return res.status(400).json({
      message: "User already exist",
    });
  }

  if (password.length <= 6) {
    return res.status(400).json({
      message: "Password length above 6",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
    role
  });

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Registration successful",
    user: {
      id: user._id,
      name: user.username,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    token
  });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All fild required",
    });
  }
  const Existuser = await userModel.findOne({ email });
  if (!Existuser) {
    return res.status(400).json({
      message: "user not exist please signup",
    });
  }

  const token = jwt.sign(
    {
      id: Existuser._id,
      role: Existuser.role
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "login sussesfull",
    token,
    user: {
      id: Existuser._id,
      name: Existuser.username,
      username: Existuser.username,
      email: Existuser.email,
      role: Existuser.role,
    },
  });
};

export const googleLogin = (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: "offline",

    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],

    prompt: "select_account",
  });

  res.redirect(url);
};


export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "Google authorization code missing",
      });
    }

    const { tokens } =
      await googleClient.getToken(code);

    googleClient.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: googleClient,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    const {
      id,
      name,
      email,
      picture,
    } = data;

    let user = await User.findOne({
      email,
    });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: id,
        profileImage: picture,
        role: "user",
      });
    }

    if (!user.googleId) {
      user.googleId = id;
      user.profileImage = picture;

      await user.save();
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(
      "http://localhost:5173/home"
    );

  } catch (error) {
    console.error(
      "Google authentication error:",
      error
    );

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
};



export const logout = async(req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        message:"logout sussesfull"
    })
}