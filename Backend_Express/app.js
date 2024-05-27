const express = require("express");
var bodyParser = require("body-parser");
const user_router = require("./src/controllers/user_controller");
const resume_router = require("./src/controllers/resume_controller");
const authentication_router = require("./src/controllers/authenticationController");
const emprouter = require('./src/controllers/employee.controller');
const adminrouter = require('./src/controllers/authentication.controller')


const cors=require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/userApi", user_router);
app.use("/resumeApi", resume_router);
app.use("/authenticationApi", authentication_router);
app.use("/adminapi",adminrouter);
app.use("/empapi", emprouter);

app.get("/", (req, res) => {
    let resultStr = "<h1 align='center'>Welcome to CareerCrafter Web Application<h1/>";
    res.send(resultStr);
});

app.use(function (req, res, next) {
    res.status(404);
    res.json({ status: 404, title: "Not Found", msg: "Route not found" });
    next();
});

app.listen(3002, function () { });
//console.log(__dirname);
console.log("browser link at http://localhost:3002");


module.exports = app;