import * as mongoose from "mongoose";
let express = require("express");
let config = require("./application.config.json");
import path = require("path");

let router = express.Router();
router.get('/', function (req, resp) {
    resp.json({
        foo: "bar"
    });
});

mongoose.connect(config.dbDest, config.mongoOptions);

var app = express();
app.use("/api", router);
let parent = path.dirname(__dirname);
app.use(express.static(parent + "/web"));
app.get('*', function (req, res) {
    res.sendFile(parent + '/web/index.html');
});

var server = app.listen(config.port, ()=> {
    var address = server.address();
    console.log("http://%s:%s", address.address, address.port);
});