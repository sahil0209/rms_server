const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/db");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const userRoute = require("./routes/users");
const managerRoute = require("./routes/manager");
const adminRoute = require("./routes/admin");
<<<<<<< HEAD
var cors=require("cors");

=======
var cors = require('cors');
>>>>>>> a862f62be62d83874cf45b5c6294c2d9fa24e83c
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(cors({
<<<<<<< HEAD
    origin:"*"
=======
    origin:'*'
>>>>>>> a862f62be62d83874cf45b5c6294c2d9fa24e83c
}))

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

app.get("/", (req, res) => {
    res.json({ info: "RMS FINAL API" });
});

app.use("/users", userRoute);
app.use("/manager",managerRoute);
app.use("/admin", adminRoute );

sequelize
    .sync()
    .then((result) => {
        console.log("database connected");
        app.listen(port, () => {
            console.log(`App running on port ${port}.`);
        });
    })
    .catch((err) => console.log(err));
