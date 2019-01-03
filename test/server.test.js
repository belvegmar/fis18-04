
var server = require('../server');
var chai=require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var Invoice = require('../invoices')
var sinon = require('sinon'); 

chai.use(chaiHttp);


/* #############################################################################
############################## PRUEBAS DEL GET ####################################
################################################################################*/

    describe('GET /', ()=>{
        it('Should return HTML', (done) =>{
            chai.request(server.app).get('/')
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res).to.be.html;
                done();
            });
        });
    });

    describe('GET /invoices', ()=>{
        var invoice = new Invoice({"id_invoice": 1, "supplier_cif":2, "supplier_name" : "SuperSol",
        "supplier_address" : "Reina Mercedes","description" : "prueba", "amount" : 1000, "state" : true, "id_credit" : 2 });
        var invoiceMock = sinon.mock(invoice);
        invoiceMock.expects('cleanup').returns({"id_invoice": 1, "supplier_cif":2, "supplier_name" : "SuperSol",
        "supplier_address" : "Reina Mercedes","description" : "prueba", "amount" : 1000, "state" : true, "id_credit" : 2 });

        var InvoiceStub = sinon.stub(Invoice, 'find');
        InvoiceStub.yields(null, [invoice]);

        it('Should return all invoices', (done) =>{   
          chai.request(server.app).get('/api/v1/invoices')
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(1);
                invoiceMock.verify();
                done();
            });
        });
    });


/*    describe('GET /invoices/id_invoice', ()=>{
        it('Should return a single invoice', (done) =>{ 
            var dbMock = sinon.mock(server.db);
            var id_invoice = 3;
  
          chai.request(server.app).get('/api/v1/invoices' + id_invoice)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                server.db.find( {id_invoice: id_invoice}, (err, invoices) => {
                    dbMock.verify();
                    done();
                });
            });
        });
    });
*/

/* #############################################################################
############################## PRUEBAS DEL POST ####################################
################################################################################*/
    
    describe ('POST /invoices', ()=>{
        it('Should create a new invoice', (done)=>{
            var invoice = {"id_invoice": 2, "supplier_cif":"25AB", "supplier_name" : "Mercadona",
            "supplier_address" : "Arcos","description" : "prueba post", "amount" : 1000, "state" : false, "id_credit" : 2 };            var dbMock = sinon.mock(server.db);
            
            var dbM

            chai.request(server.app).post('/api/v1/invoices')
            .send(invoice)
            .end((err,res)=>{
                expect(res).to.have.status(201);
                server.db.find( {id_invoice: 10}, (err, invoices) => {
                    dbMock.verify();
                    done();
                });
            });
        });
    });




/* ###############################################################################
############################## PRUEBAS DEL PUT ###################################
################################################################################*/

/*     describe ('PUT /invoices/id_invoice', ()=>{
        it('Should update an invoice', (done)=>{
            var invoice ={id_invoice: 2, id_project: 33, supplier: ["cif10", "Aldi", "Sevilla"], description: "prueba", amount: 500, state: true, id_credit: 35 };
            var dbMock = sinon.mock(server.db);
            dbMock.expects('update').withArgs(invoice);

            chai.request(server.app).put('/api/v1/invoices')
            .end((err,res)=>{
                expect(res).to.have.status(201);
                server.db.update( {id_invoice: 2}, (err, invoices) => {
                    dbMock.verify();
                    done();
                });
            });
        });
    });*/



    /* ###############################################################################
############################## PRUEBAS DEL DELETE ###################################
################################################################################*/
/*
        describe('DELETE /invoices', ()=>{
             it('Should remove all invoices', (done) =>{   
                chai.request(server.app).delete('/api/v1/invoices')
                .end((err,res)=>{
                expect(res).to.have.status(200);
                done();
                });
              });
         });
*/

         describe('DELETE /invoices/id_invoice', ()=>{
            it('Should remove a single invoice', (done) =>{ 
                var dbMock = sinon.mock(server.db);
                var id_invoice = 3;
      
              chai.request(server.app).delete('/api/v1/invoices/:id_invoices')
                .end((err,res)=>{
                    server.db.remove( {id_invoice: id_invoice}, (err, invoices) => {
                        dbMock.verify();
                        done();
                    });
                });
            });
        });

});