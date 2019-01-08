var urljoin = require('url-join');
var CommandFactory = require('hystrixjs').commandFactory;
var request = require('request-promise-native').defaults({json: true});
var invoicesServer = (process.env.INVOICES_URL || 'http://localhost:3000/api/v1');
var invoicesKey = (process.env.INVOICES_APIKEY || '04c76028-84e9-4b54-83a4-740dde6d1da3');

function invoicesResource(url) {
    return urljoin(invoicesServer, url, '?apikey='+invoicesKey);
}


function getAllInvoicesBase() {
    var url = invoicesResource("/invoices");
    console.log(url);
    return request.get(url);
}

var getAllInvoicesCommand = CommandFactory.getOrCreate("Get Invoices")
    .run(getAllInvoicesBase)
    .timeout(100)
    .build()

function getAllInvoices() {
    return getAllInvoicesCommand.execute();
}

module.exports = {
    getAllInvoices
}