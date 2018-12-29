var mongoose = require('mongoose');

var invoiceSchema = new mongoose.Schema({
    id_invoice : Number,
    id_project : Number,
    supplier : [{supplier_cif: String,
                supplier_name : String, 
                supplier_address : String}],
    description : String,
    amount : Number,
    state : Boolean,
    id_credit : Number 
});

invoiceSchema.methods.cleanup = function() {
    return {id_invoice: this.id_invoice, id_project : this.id_project, supplier: this.supplier,
            description: this.description, amount: this.amount, state: this.state, id_credit:this.id_credit};
}

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;


