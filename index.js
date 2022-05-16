const express = require('express');
const app = express();
const bp=require('body-parser');
const qr=require('qrcode');
app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.get("/",(req,res) => {
    res.render("index");
})
var shortUrl = require("node-url-shortener");
app.post("/scan", (req, res) => {
    const url = req.body.url;
    
    
    shortUrl.short(url, function (err, url_1) {
        console.log(url_1);
    });

    if (url.length === 0) res.send("Empty Data!");
    
    // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
    // It shall be returned as a png image format
    // In case of an error, it will save the error inside the "err" variable and display it
    
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");
      
        // Let us return the QR code image as our response and set it to be the source used in the webpage
        res.render("scan", { src });
    });
});
const port = 5000;
app.listen(port, () => console.log("Server at 5000"));
