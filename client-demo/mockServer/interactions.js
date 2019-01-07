const ONE_INVOICE_BODY = [{ id_invoice: 8, id_project: 77, supplier_cif: 'P98764K', supplier_name : 'Universidad de Sevilla', supplier_address: 'Sevilla', description : 'Nuevo Proyecto', amount : 3424, state : true, id_credit : 8374 }]

	
	module.exports = {
	    getInvoices: {
	        state: 'it has invoices',
	        uponReceiving: 'a request to retrieve invoices list',
	        withRequest: {
	            method: 'GET',
	            path: '/api/v1/invoices'
	        },
	        willRespondWith: {
	            status: 200,
	            body: ONE_INVOICE_BODY
	        }
	    }
	} 