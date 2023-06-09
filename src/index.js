const express = require("express");
const { PORT } = require("./configs/configuration");
const { json } = require("body-parser");
const expressSession = require("express-session");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const databaseConnection = require("./db_connection/db_connection");

const app = express();

databaseConnection();

require("dotenv").config();

app.set("trust proxy", true);
app.use(json());
app.use(cors());
app.use(
  expressSession({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const userRouter = require("./routes/userauth_route");
const testRouter = require("./routes/test_route");
const locationRouter = require("./routes/location_route");
const landmarkRouter = require("./routes/landmark_route");
const serviceRouter = require("./routes/service_route");
const salonRouter = require("./routes/salon_route");

app.use("/api/user", userRouter);
app.use("/api/test", testRouter);
app.use("/api/location", locationRouter);
app.use("/api/landmark", landmarkRouter);
app.use("/api/service", serviceRouter);
app.use("/api/salon", salonRouter);

app.use("/salonImages", express.static(path.join(__dirname, "../salonImages")));

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});

app.all("*", async (req, res) => {
  return res.status(201).send({ message: "invalid routes" });
});
