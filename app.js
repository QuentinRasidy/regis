const path = require("path");
var favicon = require("serve-favicon");
var cors = require("cors");
const https = require("https");
const fs = require("fs");
require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const regisRoutes = require("./routes/camera");

app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(cors()); // Use this after the variable declaration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(regisRoutes);

app.use(errorController.get404);

app.listen(process.env.PORT || 3000);
// https.createServer({
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
//   }, app).listen(3000, () => {
//     console.log('Listening...')
//   })
