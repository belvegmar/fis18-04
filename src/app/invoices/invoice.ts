export class Invoice{
    id_invoice : number;
    id_project : number;
    supplier : string[] = ['supplier_cif', 'supplier_name', 'supplier_address'];
    description : string;
    amount : number;
    state : boolean;
    id_credit : number; 
};

