import { Invoice } from './invoices/invoice';

export const INVOICES: Invoice[] = [
  { id_invoice : 1, id_project : 2, supplier : ["cif1", "Mercadona", "Arcos de la Fra"], description : "prueba", amount : 500, state : true,id_credit : 35},
  { id_invoice : 2, id_project : 2, supplier : ["cif1", "Mercadona", "Arcos de la Fra"], description : "prueba", amount : 600, state : false,id_credit : 36},
  { id_invoice : 3, id_project : 2, supplier : ["cif2", "Carrefour", "Sevilla"], description : "prueba", amount : 700, state : true,id_credit : 37}
];

