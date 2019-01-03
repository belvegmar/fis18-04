var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var cors = require("cors");
var path = require('path')
var Invoice = require('./invoices');

const INVOICES_APP_DIR = "/dist/invoices-app";
var BASE_URL = "/api/v1";

var dbFileName = __dirname + "/invoices.json";


var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, INVOICES_APP_DIR)));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, INVOICES_APP_DIR, '/index.html'));
});

var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

var initialInvoices = [
    { id_invoice: 1, id_project: 2, supplier: ["cif1", "Mercadona", "Arcos de la Fra"], description: "prueba", amount: 500, state: true, id_credit: 35 },
    { id_invoice: 2, id_project: 2, supplier: ["cif1", "Mercadona", "Arcos de la Fra"], description: "prueba", amount: 600, state: false, id_credit: 36 },
    { id_invoice: 3, id_project: 2, supplier: ["cif2", "Carrefour", "Sevilla"], description: "prueba", amount: 700, state: true, id_credit: 37 }
];




/* #############################################################################
 ##############################  GET        ####################################
################################################################################*/
//Obtain all invoices

app.get(BASE_URL + "/invoices", (req, res) => {
    console.log(Date() + " - GET /invoices");

    Invoice.find({}, (err, invoices) => {
        if (err) {
            console.error("Error accesing DB");
            res.senStatus(500);
        } else {
            res.send(invoices.map((invoice) => {
                return invoice.cleanup();
            }));
        }
    });
});

//Obtain a single invoice

app.get(BASE_URL + "/invoices/:id_invoice", (req, res) => {
    var id_invoice = Number(req.params.id_invoice);
    console.log(Date() + " - GET /invoices/" + id_invoice);

    Invoice.find({ id_invoice: id_invoice }, (err, invoices) =>  {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (invoices.length > 1) {
                console.warn("Incosistent DB: duplicated id_invoice");
            }
            console.log(invoices);
            res.send(invoices.map((invoice) => {
                return invoice.cleanup();
            })[0]);
        }
    });
});


/* #############################################################################
##############################      POST     ###################################
################################################################################*/
app.post(BASE_URL + "/invoices", (req, res) => {
    // Create a new invoice
    console.log(Date() + " - POST /invoices");
    //console.log((req.body.supplier[0]));

    var invoice = new Invoice(req.body)

    //console.log(req.body.supplier[0]);
    //console.log(req.body);
    //db.insert(invoice);
    invoice.save(function (err, saved_invoice){
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }else{
            res.sendStatus(201);
        }
    });
});



app.post(BASE_URL + "/invoices/:id_invoice", (req, res) => {
    // Forbidden
    console.log(Date() + " - POST /invoices");
    res.sendStatus(405);
});


/* #############################################################################
##############################      PUT      ###################################
################################################################################*/
//put all invoices
app.put(BASE_URL + "/invoices", (req, res) => {
    //Forbidden
    console.log(Date() + " - PUT /invoices");
    res.sendStatus(405);
});


app.put(BASE_URL + "/invoices/:id_invoice", (req, res) => {
    //update invoice
    //var id_invoice = Invoice.ObjectId.fromString(req.params.id_invoice);
    var id_invoice = Number(req.params.id_invoice);
    var updatedInvoice = new Invoice(req.body);
    console.log(Date() + " - PUT /invoices/" + id_invoice);

    if (id_invoice != updatedInvoice.id_invoice) {
        res.sendStatus(409);
        return;
    }  


    Invoice.findOneAndUpdate({"id_invoice" :id_invoice}, req.body, (err, invoices) =>  {        
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (invoices.length > 1) {
                console.warn("Inconsistent DB: duplicated id_invoice");
            } else if (invoices.length == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});


/* #############################################################################
##############################      DELETE   ###################################
################################################################################*/
app.delete(BASE_URL + "/invoices", (req, res) => {
    // Remove all invoices
    console.log(Date() + " - DELETE /invoices");
    Invoice.remove({}, function(err){});
    res.sendStatus(200);
});


app.delete(BASE_URL + "/invoices/:id_invoice", (req, res) => {
    // Delete a single invoice
    console.log(req.params.id_invoice);
    var id_invoice = Number(req.params.id_invoice);
    console.log(Date() + " - DELETE /invoices/" + id_invoice);

    Invoice.deleteMany({ "id_invoice": id_invoice }, (err, numRemoved) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (numRemoved > 1) {
                console.warn("Incosistent DB: duplicated id_invoice");
            } else if (numRemoved == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    });
});


module.exports.app = app;
module.exports.db = db;