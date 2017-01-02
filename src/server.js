var applicationConfig = require("./application.config.json");
var express = require("express");

var app = express();
var router = express.Router();
router.get('/', function(req, resp){
    resp.json({
        foo: "bar"
    });
});
app.use("/api", router);
var server = app.listen(applicationConfig.port, function(){
    var address = server.address();
    console.log("http://%s:%s", address.address, address.port);
});