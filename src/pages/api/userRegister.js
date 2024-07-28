import Users from "@/models/Users";
import db from "@/utils/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password, address } = req.body;

    await db.connect();

    try {
      // Check if user already exists
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new Users({
        name,
        email,
        password: hashedPassword,
        address,
      });

      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Error registering user" });
    } finally {
      await db.disconnect();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
