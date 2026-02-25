import { Request, Response } from "express";
import { User } from "../models/User";


export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 🔎 Find user in DB
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ⚠️ Plain text compare (for now)
    if (user.getDataValue("password") !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.json({
      success: true,
      message: "Login successful ✅",
      user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Login error",
    });
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.create({ username, password });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};