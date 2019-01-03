import { Invoice } from './invoices/invoice';

export const INVOICES: Invoice[] = [
  { id_invoice : 1, id_project : 2, supplier_cif:"cif1", supplier_name: "Mercadona", supplier_address:"Arcos", description : "prueba", amount : 500, state : true,id_credit : 35},
  { id_invoice : 2, id_project : 2, supplier_cif:"cif4", supplier_name: "Carrefour", supplier_address:"Arcos", description : "prueba", amount : 500, state : true,id_credit : 35},
];

