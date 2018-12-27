var server = require('../server');
var chai=require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var sinon = require('sinon'); 

chai.use(chaiHttp);

describe('Invoices API', ()=> {
    it('hola mundo', (done)=>{
        var x=3;
        var y=5;

        var resultado= x+y;

        expect(resultado).eql(8); 
        done();
    });

    before((done) => {
        var initialInvoices = [
            { id_invoice: 1, id_project: 2, supplier: ["cif1", "Lidl", "El Cuervo"], description: "prueba1", amount: 500, state: true, id_credit: 35 },
            { id_invoice: 2, id_project: 3, supplier: ["cif1", "Mercadona", "Arcos de la Fra"], description: "prueba2", amount: 600, state: false, id_credit: 36 },
            { id_invoice: 3, id_project: 4, supplier: ["cif2", "Carrefour", "Sevilla"], description: "prueba3", amount: 700, state: true, id_credit: 37 }
        ];            

        var dbFindStub = sinon.stub(server.db, 'find');
        dbFindStub.yields(null, initialInvoices);


        done();
        
    });

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
        it('Should return all invoices', (done) =>{   
          chai.request(server.app).get('/api/v1/invoices')
            .end((err,res)=>{
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(3);
                done();
            });
        });
    });



/* #############################################################################
############################## PRUEBAS DEL POST ####################################
################################################################################*/
    
    describe ('POST /invoices', ()=>{
        it('Should create a new invoice', (done)=>{
            var invoice ={id_invoice: 10, id_project: 10, supplier: ["cif10", "Aldi", "Sevilla"], description: "prueba", amount: 500, state: true, id_credit: 35 };
            var dbMock = sinon.mock(server.db);
            dbMock.expects('insert').withArgs(invoice);

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

});