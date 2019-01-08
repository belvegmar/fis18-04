import { Component, OnInit } from '@angular/core';
import { Invoice } from './invoice';
import { InvoiceService} from '../invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices : Invoice[];
  selectedInvoice : Invoice;
  newInvoice : Invoice = {
    id_invoice : null,
    id_project : null,
    supplier_cif: null,
    supplier_name: null,
    supplier_address: null,
    description : null,
    amount : null,
    state : null,
    id_credit : null
  };

  constructor( private invoiceService: InvoiceService) { }


  addInvoice() {
    this.invoiceService.addInvoice(this.newInvoice).subscribe(invoice => this.invoices.push(invoice));
    this.newInvoice = {
      id_invoice : null,
      id_project : null,
      supplier_cif: null,
      supplier_name: null,
      supplier_address: null,
      description : null,
      amount : null,
      state : null,
      id_credit : null
    };

    location.reload(true);

    
  };

  getInvoices() {
    this.invoiceService.getInvoices()
    .subscribe((invoices) => {
      this.invoices=invoices;
    });
    
  }

  onEdit(invoice: Invoice): void {
    this.selectedInvoice = invoice;
  }

  deleteInvoice(invoice: Invoice): void{
    this.invoiceService.deleteInvoice(invoice);
    
  }

  ngOnInit() {
    this.getInvoices();
  }



}
