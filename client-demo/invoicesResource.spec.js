const chai = require('chai')
	chai.use(require('chai-things'));
	const provider = require('./mockServer/provider')
	const invoicesResource = require('./invoicesResource')
	const interactions = require('./mockServer/interactions');
	
	const expect = chai.expect
	
	describe('invoicess api', () => {
	    before(() => provider.setup());
	
	    after(() => provider.finalize());
	
	    afterEach(() => provider.verify());
	
	    describe('#getInvoices', () => {
	        before(done => {
	            provider.addInteraction(interactions.getInvoices)
	                .then(() => {
	                    done();
	                })
	        });
	
	        it('should get invoices list from server', (done) => {
	            invoicesResource.getInvoices()
	              .then((invoices) => {
	                expect(invoices).to.have.lengthOf(1);
	                expect(invoices).to.contain.an.item.with.property('id_invoice', 8);
	                expect(invoices).to.contain.an.item.with.property('id_project', 77);
	                done();
	              }, done);
	        }) 
	    })
	}) 
