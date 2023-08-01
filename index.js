const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model")
const session = require('express-session')
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
const bycrypt = require("bcrypt");
const PORT = process.env.PORT || 5500;
require("dotenv").config()

const mongoDBUrl = process.env.MONGODBURL;
const sessionKey = process.env.SESSIONKEY;

const login_route = require("./routes/login")
const register_route = require("./routes/register")

const app = express();

const corsOptions = {
  origin: 'https://64c88cc27dd429379aeacad4--stellular-naiad-bd243e.netlify.app',
  credentials: true,
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.options('*', cors(corsOptions)); // Enable preflight requests for all routes
app.use(cors(corsOptions)); // Apply CORS to all routes
app.use(express.json());
app.use(cookieParser('secret'));

app.use(session({
  secret: sessionKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoDBUrl,
    collection: "sessions"
  }),
  cookie: {
    sameSite: 'none', // Set this based on your requirements
    secure: true, // Set this to true if your frontend is using HTTPS
    maxAge: 60 * 60 * 1000,
  },
}));

app.use("/login", login_route);
app.use("/register", register_route);

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get("/check", async (req, res) => {
  console.log(req.sessionID);
  if (req.session.user) {
    res.send({ msg: "you don't have to login", user: req.session });
  } else {
    res.send({ msg: "go to login page" });
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully.' });
  });
});

app.listen(PORT, () => {
  console.log("app is listening at 5500");
});
