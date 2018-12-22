const express = require("express");
const bodyParser = require("body-parser");
const app = new express();
const request = require("request");

app.use(bodyParser.urlencoded({extended:true}));



app.listen(3000, function() {
  console.log("Server is running on port 3000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/",function(req, res) {
  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let symbol_set = "global";
  let symbol = crypto + fiat;
  console.log("Crypto: " + crypto);
  console.log("Fiat: " + fiat);

  let link = `https://apiv2.bitcoinaverage.com/indices/${symbol_set}/ticker/${symbol}`;
  console.log(link);
  request(link, function(error, response, body) {
    console.log(body);
  });
});
