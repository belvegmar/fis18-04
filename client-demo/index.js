var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var invoicesResource = require('./invoicesResource.js');

var port = (process.env.PORT || 16778);
var baseAPI = "/api/v1";

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get(baseAPI + "/invoices", (req, response) => {
    console.log("GET /invoices"); 

    invoicesResource.getAllInvoices()
        .then((body) => {
            response.send(body);
        }).catch((error) => {
            console.log('error:'+error);
            response.sendStatus(500);
        });

});



app.listen(port, () => {
    console.log("Server with GUI up and running!!");
});