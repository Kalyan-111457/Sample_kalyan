require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin:process.env.FRONTEND_PORT,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_PORT);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(express.json());

const distPath = path.join(__dirname, '..', 'dist', 'deploy-project-app', 'browser');
app.use(express.static(distPath));

app.get("/api/data", (req, res) => {
  res.json({
    name: "Kalyan",
    company: "WinWire",
    role: "Software Design Trainee"
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
