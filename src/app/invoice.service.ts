import { Injectable } from '@angular/core';
import { Invoice } from './invoices/invoice';
import { INVOICES } from './mock-invoices';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  serveUrl = "/api/v1";

  constructor(private httpClient: HttpClient) { }

  private log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getInvoices(): Observable<Invoice[]> {
    let headers = new HttpHeaders({ 'apikey': '04c76028-84e9-4b54-83a4-740dde6d1da3' });
    const url = this.serveUrl + "/invoices";
    return this.httpClient.get<Invoice[]>(url, {headers:headers});

  }

  
  addInvoice(invoice: Invoice): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.serveUrl}/invoices`;
    return this.httpClient.post(url, invoice, {responseType: 'text', headers: headers})
      .pipe(
          tap(() => this.log(`add invoice id =${invoice.id_invoice}`)),
          catchError(this.handleError('addInvoice', []))
      );
  }


  updateInvoice(invoice: Invoice): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    const url = `${this.serveUrl}/invoices/${invoice.id_invoice}`;
    return this.httpClient.put(url, invoice, {responseType: 'text', headers: headers})
        .pipe(
          tap(() => this.log(`updated invoice id=${invoice.id_invoice}`)),
          catchError(this.handleError('updateInvoice', []))
      );    
  }

  deleteInvoice(invoice: Invoice): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.serveUrl}/invoices/${invoice.id_invoice}`;
    return this.httpClient.delete(url, {responseType: 'text', headers: headers})
    .pipe(
          tap(() => this.log(`delete invoice id =${invoice.id_invoice}`)),
          catchError(this.handleError('deleteInvoice', []))
      );
      
  }

}
