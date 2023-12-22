import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt";

const server = express();
let PORT = 3000;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

server.use(express.json());

// console.log("DB_LOCATION:", process.env.DB_LOCATION);
mongoose.connect(process.env.DB_LOCATION, {
  autoIndex: true,
});

server.post("/signup", (req, res) => {
  let { fullname, email, password } = req.body;

  // Validating the data from frontend
  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullmame must be at least 3 letters long" });
  }

  if (!email.length) {
    return res.status(403).json({ error: "Enter valid Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }

  if (!passwordRegex.test(password)) {
    return res
      .status(403)
      .json({
        error:
          "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letter",
      });
  }
// Hashed password
  bcrypt.hash(password, 10, (err, hashed_password) => {
    console.log(hashed_password);
  });

  return res.status(200).json({ status: "Okay" });
});

server.listen(PORT, () => {
  console.log("Listening on port -> " + PORT);
});
