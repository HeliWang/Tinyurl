var express = require("express");
var router = express();
var urlService = require("../services/urlService");
var path = require("path");
var statsService = require("../services/statsService");

router.get("*", function (req, res) {
    //originalUrl表示取得整个url(/...)
    //slice(0)表示取得除了第一个元素(/)之后的所有元素
    var shortUrl = req.originalUrl.slice(1);
    urlService.getLongUrl(shortUrl, function (url) {
        if(url) {
            res.redirect(url.longUrl);
            statsService.logRequest(shortUrl, req);
        } else {
            res.sendFile("404.html", {root: path.join(__dirname, "../public/views/")});
        }
    });
});

//相当于return一个router对象
module.exports = router;