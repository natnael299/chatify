import { User } from "../models/Users";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs"
export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body

  try {
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    };

    if (password.length < 8) {
      return res.status(400).json({ message: "The length of the password should be atleast 8" });
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return req.status(400).json({ message: "The Email is invalid" })
    };

    const user = await User.findOne({ email });
    if (user) {
      return req.status(400).json({ message: "The Email is already in use" })
    };

    const salt = await bcrypt.genSalt(10);
    const hashedP = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname,
      email,
      password: hashedP
    });

    if (newUser) {
      //generateToken(newUser._id, res);
      //await newUser.save();

      const savedUser = newUser.save();
      generateToken(savedUser._id, res);
      res.satus(201).json({
        _id: savedUser._id,
        fullname: savedUser.fullname,
        email: savedUser.email,
        profilePic: savedUser.profilePic
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    };

  } catch (error) {
    console.log("Error in singup controllers file");
    res.status(500).json({ message: "Error with Internal server" });
  }
}