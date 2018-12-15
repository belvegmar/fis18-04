import { Injectable } from '@angular/core';
import { Invoice } from './invoices/invoice';
import { INVOICES } from './mock-invoices';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  serveUrl = "/api/v1";

  constructor(private httpClient: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    const url = this.serveUrl + "/invoices";
    return this.httpClient.get<Invoice[]>(url);

  }
}
