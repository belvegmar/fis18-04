import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { EditableInvoiceComponent } from './editable-invoice/editable-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent,
    EditableInvoiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
