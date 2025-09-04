using my.company from '../db/schema';

service CatalogService {
    entity SupplierInvoice as projection on company.SupplierInvoice;
}
