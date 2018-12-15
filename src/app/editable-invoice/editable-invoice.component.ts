import { Component, OnInit, Input} from '@angular/core';
import {Invoice} from '../invoices/invoice';

@Component({
  selector: '[app-editable-invoice]',
  templateUrl: './editable-invoice.component.html',
  styleUrls: ['./editable-invoice.component.css']
})
export class EditableInvoiceComponent implements OnInit {

  @Input() invoice: Invoice;
  editable = false;

  constructor() { }

  onEdit(){
    this.editable = ! this.editable;
  }

  ngOnInit() {
  }

}
