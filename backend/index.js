const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

try {
  mongoose.connect(process.env.DB_URI);
  console.log("DB connected ✅");
} catch (err) {
  console.log("DB connection error 🔴");
}

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
