import * as mongoose from "mongoose";
let express = require("express");
let config = require("./application.config.json");

let router = express.Router();
router.get('/', function (req, resp) {
    resp.json({
        foo: "bar"
    });
});

mongoose.connect(config.dbDest, config.mongoOptions);

var app = express();
app.use("/api", router);
var server = app.listen(config.port, ()=> {
    var address = server.address();
    console.log("http://%s:%s", address.address, address.port);
});