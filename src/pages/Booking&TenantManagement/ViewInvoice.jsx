import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import MyInvoices from "../../Data/SiteDataComponent/Invoices";
import Logo from "../../assets/Logo.svg";

const PrintableInvoice = () => {
  const [invoices, setInvoices] = useState(MyInvoices);
  const [scrollX, setScrollX] = useState(true);

  const { id } = useParams();
  const invoice = invoices.find((invoice) => invoice.id === parseInt(id));
  document.title = `${invoice.tenantName}'s Invoice`;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Invoice of ${invoice.tenantName}`,
    onAfterPrint: () => console.log("Invoice Successfully Printed"),
  });

  if (!invoice) {
    return (
      <Box
        flex="flex"
        justifyContent="center"
        alignSelf="center"
        justifySelf="center"
      >
        <Typography>Invoice not found</Typography>
      </Box>
    );
  }

  const columns = [
    { id: "description", label: "Description", minWidth: 200 },
    { id: "amount", label: "Amount (RWF)", minWidth: 130, align: "right" },
    { id: "dateIssued", label: "Date Issued", minWidth: 117 },
    { id: "dueDate", label: "Due Date", minWidth: 117 },
    { id: "status", label: "Status", minWidth: 98 },
  ];

  const totalInvoiceAmount = () => {
    return (
      invoice.invoiceItems
        .reduce((acc, item) => acc + item.amount, 0)
        .toLocaleString("en-US") + " RWF"
    );
  };

  return (
    <Box className="m-5">
      <Box
        className="flex flex-col gap-3 a4-page print:bg-white print:text-black p-6 bg-[#24383E] rounded-md"
        ref={componentRef}
      >
        <Box className="flex flex-row justify-between">
          <img src={Logo} alt="Our Logo" />
          <Typography fontFamily="poppins">
            Invoice #<br /> {invoice.invoiceNumber}
          </Typography>
        </Box>
        <Box className="flex flex-row justify-between">
          <Box>
            <Typography fontWeight="bold" fontFamily="poppins">
              KAMO BUSINESS CO. LTD
            </Typography>
            <Typography variant="h7" fontWeight="bold">
              Luxury Gatsata Center
            </Typography>
            <Typography fontFamily="poppins">Muhima, 120KN ST</Typography>
            <Typography fontFamily="poppins">+250 780934382</Typography>
          </Box>
          <Box className="flex flex-col items-end">
            <Typography fontFamily="poppins" fontWeight="bold">
              {invoice.tenantName}
            </Typography>
            <Typography fontFamily="poppins">{invoice.email}</Typography>
            <Typography fontFamily="poppins">{invoice.phone}</Typography>
          </Box>
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden", pb: 1 }}>
          <TableContainer
            sx={{ maxHeight: 440, overflow: scrollX ? "hidden" : "block" }}
          >
            <Table stickyHeader aria-label="invoice items table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align || "left"}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {invoice.invoiceItems.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align || "left"}
                        >
                          {column.id === "amount"
                            ? value.toLocaleString("en-US") + " RWF"
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Box className="flex justify-between w-[50%]">
          <Typography
            className="whitespace-nowrap"
            fontWeight="bold"
            fontFamily="poppins"
          >
            Total:&nbsp;
          </Typography>
          <Typography className="whitespace-nowrap" fontFamily="poppins">
            {totalInvoiceAmount()}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <Box>
          <Typography fontWeight="bold" fontFamily="poppins">
            PAYMENT INSTRUCTIONS:
          </Typography>
          <Typography fontWeight="bold" component="p" fontFamily="poppins">
            Please pay the above total to:
          </Typography>
          <Typography fontFamily="poppins">
            Bank of Kigali - KAMO & SONS BUSINESS LTD
          </Typography>
          <Typography fontWeight="bold" fontFamily="poppins">
            Account Number:&nbsp;
            <span style={{ fontWeight: "initial" }}>000123456789</span>
          </Typography>
          <Typography fontWeight="bold" fontFamily="poppins">
            Reference:&nbsp;
            <span style={{ fontWeight: "initial" }}>
              Invoice {invoice.invoiceNumber}
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            height: "1px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <Box>
          <Typography fontWeight="bold" fontFamily="poppins">
            NOTES:
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem sx={{ display: "list-item" }} fontFamily="poppins">
              Late Payment After {invoice.dueDate} may result in a 5% penalty
            </ListItem>
            <ListItem sx={{ display: "list-item" }} fontFamily="poppins">
              Contact us if you have made this payment
            </ListItem>
          </List>
        </Box>
        <Typography fontFamily="poppins">
          THANK YOU FOR YOUR BUSINESS
        </Typography>
        <Box className="flex flex-row justify-between">
          <Box className="flex flex-col">
            <Typography fontWeight="bold" fontFamily="poppins">
              KAMO 7 SONS B'SS LTD
            </Typography>
            <Typography>____________________</Typography>
          </Box>
          <Box className="flex flex-col">
            <Typography fontWeight="bold" fontFamily="poppins">
              {invoice.tenantName}
            </Typography>
            <Typography>____________________</Typography>
          </Box>
        </Box>
      </Box>

      {/* Print Button */}
      <Box className="mt-6">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handlePrint();
            setScrollX(prev => !prev);
          }}
        >
          Print Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default PrintableInvoice;
