var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var invoiceSchema = new mongoose.Schema({
    id_invoice : {type: Number, required:true, unique:true},
    id_project : Number,
    supplier_cif : String,
    supplier_name : String,
    supplier_address : String,
    /*supplier : [{supplier_cif: String,
                supplier_name : String, 
                supplier_address : String}],*/
    description : String,
    amount : Number,
    state : Boolean,
    id_credit : Number 
});

//Añadir validador para que no pueda haber 2 id_invoice iguales
invoiceSchema.plugin(uniqueValidator);


invoiceSchema.methods.cleanup = function() {
    return {id_invoice: this.id_invoice, id_project : this.id_project, supplier_cif: this.supplier_cif,
            supplier_name: this.supplier_name, supplier_address:this.supplier_address,
            description: this.description, amount: this.amount, state: this.state, id_credit:this.id_credit};
}

var Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;


