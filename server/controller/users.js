import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // checking if the user exists or not
    const existingUser = await User.findOne({ email });
    if (!existingUser.email)
      return res.status(404).json({ message: "User does not exists" });

    // password check using bcrypt compare
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    // sending data is authentication is successful
    if (isPasswordCorrect) {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        `${process.env.JWT_TOKEN}`,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    // if user email exists don't create the user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // verifying that whether passwords match or not
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    // hashing to secure the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // creating and sending the user
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      `${process.env.JWT_TOKEN}`,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log(error);
  }
};