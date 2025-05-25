require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Load from .env

// Fake Database (Replace with MySQL or MongoDB)
const USERS = [
  { email: "test@example.com", password: bcrypt.hashSync("password123", 10) }
];

// Login API
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  // Generate JWT Token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ success: true, token });
});

// Protected Route Example
app.get("/api/protected", (req, res) => {
  const token = req.headers.authorization;
  
  if (!token) return res.status(403).json({ success: false, message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: "Unauthorized" });

    res.json({ success: true, message: "Access granted", user: decoded });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
