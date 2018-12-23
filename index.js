var express = require("express");
var bodyParser = require("body-parser");
var DataStore = require("nedb");
var cors = require("cors");

var path = require('path')
const INVOICES_APP_DIR = "/dist/invoices-app";

var PORT = (process.env.PORT || 3000);
var BASE_URL = "/api/v1";
var dbFileName = __dirname + "/invoices.json";

console.log("Starting API server...");

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, INVOICES_APP_DIR)));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, INVOICES_APP_DIR, '/index.html'));
});

var initialInvoices = [
    { id_invoice: 1, id_project: 2, supplier: ["cif1", "Mercadona", "Arcos de la Fra"], description: "prueba", amount: 500, state: true, id_credit: 35 },
    { id_invoice: 2, id_project: 2, supplier: ["cif1", "Mercadona", "Arcos de la Fra"], description: "prueba", amount: 600, state: false, id_credit: 36 },
    { id_invoice: 3, id_project: 2, supplier: ["cif2", "Carrefour", "Sevilla"], description: "prueba", amount: 700, state: true, id_credit: 37 }
];

var db = new DataStore({
    filename: dbFileName,
    autoload: true
});

db.find({}, (err, invoices) => {
    if (err) {
        console.error("Error accesing DB");
        process.exit(1);
    } else {
        if (invoices.length == 0) {
            console.log("Empty DB, initializaing data...");
            db.insert(initialInvoices);
        } else {
            console.log("Loaded DB with " + invoices.length + " invoices.");
        }

    }
});


/* #############################################################################
 ##############################  GET        ####################################
################################################################################*/
//Obtain all invoices

app.get(BASE_URL + "/invoices", (req, res) => {
    console.log(Date() + " - GET /invoices");

    db.find({}, (err, invoices) => {
        if (err) {
            console.error("Error accesing DB");
            res.senStatus(500);
        } else {
            res.send(invoices.map((invoice) => {
                delete invoice._id;
                return invoice;
            }));
        }
    });
});

//Obtain a single invoice

app.get(BASE_URL + "/invoices/:id_invoice", (req, res) => {
    var id_invoice = req.params.id_invoice;
    console.log(Date() + " - GET /invoices/" + id_invoice);

    db.find({ "id_invoice": id_invoice }, (err, invoices) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (invoices.length > 1) {
                console.warn("Incosistent DB: duplicated id_invoice");
            }
            res.send(invoices.map((invoice) => {
                delete invoice._id;
                return invoice;
            })[0]);
        }
    });
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


//error put
app.put(BASE_URL + "/invoice/:id_ticket", (req, res) => {
    //update invoice
    var id_invoice = req.params.id_invoice;
    var updatedInvoice = req.body;
    console.log(Date() + " - PUT /invoice/" + id_invoice);

    if (id_invoice != updatedInvoide.id_invoice) {
        res.sendStatus(409);
        return;
    }

    db.update({ "id_invoice": id_invoice }, updatedInvoice, (err, numUpdated) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
        } else {
            if (numUpdated > 1) {
                console.warn("Inconsistent DB: duplicated id_invoice");
            } else if (numUpdated == 0) {
                res.sendStatus(404);
            } else {
                res.sendStatus(200);
            }
        }
    })
})


/* #############################################################################
##############################      POST     ###################################
################################################################################*/
app.post(BASE_URL + "/invoices", (req, res) => {
    // Create a new invoice
    console.log(Date() + " - POST /invoices");
    var invoice = req.body;
    db.insert(invoice);
    res.sendStatus(201);
});

app.post(BASE_URL + "/contacts/:id_invoice", (req, res) => {
    // Forbidden
    console.log(Date() + " - POST /invoices");
    res.sendStatus(405);
});

/* #############################################################################
##############################      DELETE   ###################################
################################################################################*/
app.delete(BASE_URL + "/invoices", (req, res) => {
    // Remove all invoices
    console.log(Date() + " - DELETE /invoices");
    db.remove({}, { multi: true });
    res.sendStatus(200);
});


app.delete(BASE_URL + "/invoice/:id_invoice", (req, res) => {
    // Delete a single invoice
    var id_invoice = req.params.id_invoice;
    console.log(Date() + " - DELETE /invoice/" + id_invoice);

    db.remove({ "id_invoice": id_invoice }, {}, (err, numRemoved) => {
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




app.listen(PORT);

console.log("Server ready!");