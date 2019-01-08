import { Component, OnInit, Input} from '@angular/core';
import {Invoice} from '../invoices/invoice';
import { InvoiceService } from '../invoice.service';

@Component({
  selector: '[app-editable-invoice]',
  templateUrl: './editable-invoice.component.html',
  styleUrls: ['./editable-invoice.component.css']
})
export class EditableInvoiceComponent implements OnInit {

  @Input() invoice: Invoice;
  editable = false;

  constructor(private invoiceService: InvoiceService) { }

  onEdit(): void {
    if (this.editable) {
      this.invoiceService.updateInvoice(this.invoice)
         .subscribe(() => this.editable = !this.editable);
    } else {
      this.editable = ! this.editable;
    }
  }

  deleteInvoice(): void{
    this.invoiceService.deleteInvoice(this.invoice).subscribe();
    location.reload(true);
  }


  


  ngOnInit() {
  }

}
