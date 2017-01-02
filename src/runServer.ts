let express = require("express");
let applicationConfig = require("./application.config.json");

let router = express.Router();
router.get('/', function (req, resp) {
    resp.json({
        foo: "bar"
    });
});

var app = express();
app.use("/api", router);
var server = app.listen(applicationConfig.port, function () {
    var address = server.address();
    console.log("http://%s:%s", address.address, address.port);
});