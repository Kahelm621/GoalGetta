require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Copy .env.example to .env and set a strong secret.");
}

module.exports = {
  dbUrl: process.env.DB_URL || "mongodb://localhost:27017/goalgetta",
  jwtSecret: process.env.JWT_SECRET,
};
