var chai = require('chai');
var mongoose = require('mongoose');
var Invoice = require('../invoices');
var expect = chai.expect;


describe('Invoice DB connection', () => {

    before((done) => {
        var dbUrl = (process.env.DB || 'mongodb://localhost/test');

        mongoose.connect(dbUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            done();
        });        
    });

    beforeEach((done) => {
        Invoice.deleteMany({}, (err) => {
            done();
        });
    });


    it('writes a invoice in the DB', (done) => {
        var invoice = new Invoice({
            id_invoice: 5, "id_project": 5, supplier_cif: "pruebaIntegracion", supplier_name: "Aldi",
            supplier_address: "Pescara", description: "pruebatest", amount: 100, state: true,
            id_credit: 3
        });
        
        invoice.save((err, invoice) => {
            expect(err).is.null;
            Invoice.find({}, (err, invoices) => {
                expect(invoices).to.have.lengthOf(1);
                console.log(invoices);
                // More "expects" could be done
                done();
            });
        });
    });


   it("remove an invoice from the DB", (done)=> {
       // Invoice.deleteOne()
        Invoice.deleteOne({id_invoice: 5}, (err, invoices)=>{
            expect(err).is.null;
            Invoice.find({}, (err, invoices) =>{
                console.log(invoices);
                expect(invoices).to.have.lengthOf(0);
                done();
            });
       });
    });
})