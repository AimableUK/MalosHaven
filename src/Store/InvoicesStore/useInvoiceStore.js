import { create } from "zustand";
import invoicesList from "../../Data/SiteDataComponent/Invoices";

const useInvoiceStore = create((set) => ({
  invoices: [...invoicesList],

  // add Invoice
  addInvoice: (invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),

  // Edit Invoice
  editInvoice: (updatedInvoice) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      ),
    })),

  // Delete Invoice
  deleteInvoice: (id) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
    })),
}));
export default useInvoiceStore;
