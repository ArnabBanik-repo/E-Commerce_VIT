const cors = require("cors");
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
require("./passport");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const authRoute = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    name: "session",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/auth", authRoute);

module.exports = app;
