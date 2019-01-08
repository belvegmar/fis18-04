var server = require('../server');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var sinon = require('sinon');
var Invoice = require('../invoices');

chai.use(chaiHttp);

describe('Contacts API', () => {
    it('hola mundo de prueba', (done) => {
        var x = 3;
        var y = 5;

        var resultado = x + y;

        expect(resultado).to.equal(8);
        done();
    });


    /* #############################################################################
    ############################## PRUEBAS DEL GET ####################################
    ################################################################################*/

    describe('GET /', () => {
        it('Should return HTML', (done) => {
            chai.request(server.app).get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    done();
                });
        });
    });



    describe('GET /invoices', () => {
        var invoice = new Invoice({
            "id_invoice": 1, "id_project": 2, "supplier_cif": "abprueba", "supplier_name": "Mercadona",
            "supplier_address": "Reina Mercedes", "description": "pruebatest", "amount": 100, " state": true,
            "id_credit": 3
        });
        var invoiceMock = sinon.mock(invoice);
        invoiceMock.expects('cleanup').returns({
            "id_invoice": 1, "id_project": 2, "supplier_cif": "abprueba", "supplier_name": "Mercadona",
            "supplier_address": "Reina Mercedes", "description": "pruebatest", "amount": 100, " state": true,
            "id_credit": 3
        });

        var InvoiceStub = sinon.stub(Invoice, 'find');
        InvoiceStub.yields(null, [invoice]);

        it('Should return all invoices', (done) => {
            chai.request(server.app).get('/api/v1/invoices')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.lengthOf(1);
                    invoiceMock.verify();
                    done();
                });
        });
    });



    // describe('GET /invoices/:id_invoice', () => {
    //     it('Should return a single invoice', (done) => {
    //         var invoice = new Invoice({
    //             "id_invoice": 1, "id_project": 2, "supplier_cif": "abprueba", "supplier_name": "Mercadona",
    //             "supplier_address": "Reina Mercedes", "description": "pruebatest", "amount": 100, " state": true,
    //             "id_credit": 3
    //         });               
            
    //         var id_invoice = 1;

    //         chai.request(server.app).get('/api/v1/invoices' + id_invoice)
    //             .end((err, res) => {
    //                 expect(res).to.have.status(200);
    //                 server.db.find({ id_invoice: id_invoice }, (err, invoices) => {
    //                     dbMock.verify();
    //                     done();
    //                 });
    //             });
    //     });
    // });


    /* #############################################################################
    ############################## PRUEBAS DEL POST ####################################
    ################################################################################*/

    describe('POST /invoices', () => {
        it('Should create a new invoice', (done) => {
            var invoice = {
                "id_invoice": 2, "id_project": 2, "supplier_cif": "abpruebaPOST", "supplier_name": "Supersol",
                "supplier_address": "Reina Mercedes", "description": "pruebatest", "amount": 100, " state": true,
                "id_credit": 3
            };
            var dbMock = sinon.mock(Invoice);
            dbMock.expects('create').withArgs(invoice).yields(null);

            chai.request(server.app).post('/api/v1/invoices')
                .send(invoice)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    dbMock.verify();
                    done();
                });
        });
    });


    /*describe('POST /invoices', () => {
        it('should return 500 if fails', (done) => {
            var invoice = {
                "id_invoice": 2, "id_project": 2, "supplier_cif": "abpruebaPOST", "supplier_name": "Supersol",
                "supplier_address": "Reina Mercedes", "description": "pruebatest", "amount": 100, " state": true,
                "id_credit": 3
            };
            var dbMock = sinon.mock(Invoice);
            dbMock.expects('create').withArgs(invoice).yields(false);

            chai.request(server.app)
                .post('/api/v1/inovices')
                .send(invoice)
                .end((err, res) => {
                    expect(res).to.have.status(500);
                    dbMock.verify();
                    done();
                });

        });
    });*/













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

    describe('DELETE /invoices', () => {
        it('Should remove all invoices', (done) => {
            chai.request(server.app).delete('/api/v1/invoices')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });


    /*  describe('DELETE /invoices/id_invoice', () => {
         it('Should remove a single invoice', (done) => {
             var dbMock = sinon.mock(Invoice);
             var id_invoice = 2;
             dbMock.expects('deleteMany').withArgs(id_invoice).yields(null);
 
             chai.request(server.app).delete('/api/v1/invoices/:id_invoice')
                 .end((err, res) => {
                     server.db.remove({ id_invoice: id_invoice }, (err, invoices) => {
                         dbMock.verify();
                         done();
                     });
                 });
         });
     }); */











});  