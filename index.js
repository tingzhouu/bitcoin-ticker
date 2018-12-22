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
  let amount = req.body.amount;
  let symbol_set = "global";
  let baseUrl = `https://apiv2.bitcoinaverage.com/convert/global`;
  let options = {
    url: baseUrl,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body) {
    let data = JSON.parse(body);
    let price = data.price;
    let currentDate = data.time;

    res.write(`<p>The current date is ${currentDate}<p>`);
    res.write(`<h1>The price of ${amount} ${crypto} is ${price} ${fiat}</h1>`);
    res.send();
  });
});
