namespace my.company;

entity SupplierInvoice {
    key invoice_id      : Integer;           
        supplier_id     : Integer;
        invoice_number  : String(50);
        sap_invoice_number : String(50);
        invoice_date    : Date;
        amount          : Decimal(15,2);
        currency_code   : String(3);
        status          : String(20);
        message         : String;
        created_by      : Integer;
        created_at      : Timestamp;
        updated_by      : Integer;
        updated_at      : Timestamp;
}

