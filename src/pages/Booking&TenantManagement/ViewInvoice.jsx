import React, { useRef, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import MyInvoices from "../../Data/SiteDataComponent/Invoices";
import Logo from "../../assets/Logo.svg";

const PrintableArticle = () => {
  const [invoices, setInvoices] = useState(MyInvoices);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "article",
    onAfterPrint: () => console.log("Print success"),
  });

  const { id } = useParams();
  const invoice = invoices.find((invoice) => invoice.id === parseInt(id));

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
        <Box className="flex flex-col">
          <Typography fontWeight="bold" fontFamily="poppins">
            Issue Date:
            <span style={{ fontWeight: "initial" }}>{invoice.dateIssued}</span>
          </Typography>
          <Typography fontWeight="bold" fontFamily="poppins">
            Due Date:
            <span style={{ fontWeight: "initial" }}>{invoice.dueDate}</span>
          </Typography>
        </Box>
        <Box>
          <Box className="flex flex-row justify-between">
            <Typography fontWeight="bold" fontStyle="poppins">
              Description
            </Typography>
            <Typography fontWeight="bold" fontStyle="poppins">
              Amount (RWF)
            </Typography>
          </Box>
          <Box
            sx={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(to right, #2d454d, white, #2d454d)",
              my: 1,
              borderRadius: "999px",
            }}
          />
          <Box className="flex flex-row justify-between">
            <Typography fontStyle="poppins">Monthly Rent</Typography>
            <Typography fontStyle="poppins">{invoice.amount}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d, white, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <Box>
          <Typography fontWeight="bold" fontFamily="poppins">
            Payment Status:&nbsp;
            <span style={{ fontWeight: "initial" }}>{invoice.status}</span>
          </Typography>
          <Typography fontWeight="bold" fontFamily="poppins">
            Reason:&nbsp;
            <span style={{ fontWeight: "initial" }}>{invoice.reason}</span>
          </Typography>
        </Box>
        <Box
          sx={{
            height: "2px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d, white, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <Box>
          <Typography fontWeight="bold" fontFamily="poppins">
            PAYMENT INSTRUCTIONS:
          </Typography>
          <Typography component="p" fontFamily="poppins">
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
            height: "2px",
            width: "100%",
            background: "linear-gradient(to right, #2d454d, white, #2d454d)",
            my: 1,
            borderRadius: "999px",
          }}
        />
        <Box>
          <Typography fontWeight="bold" fontFamily="poppins">
            NOTES:
          </Typography>
          <Box component="dl">
            <Typography fontFamily="poppins">
              Late Payment After {invoice.dueDate} may result in a 5% penalty
            </Typography>
            <Typography fontFamily="poppins">Contact us if you have made this payment</Typography>
          </Box>
        </Box>
        <Typography fontFamily="poppins">THANK YOU FOR YOUR BUSINESS</Typography>
        <Box className="flex flex-row justify-between">
          <Box className="flex flex-col">
            <Typography fontWeight="bold" fontFamily="poppins">KAMO 7 SONS B'SS LTD</Typography>
            <Typography>____________________</Typography>
          </Box>
          <Box className="flex flex-col">
            <Typography fontWeight="bold" fontFamily="poppins">{invoice.tenantName}</Typography>
            <Typography>____________________</Typography>
          </Box>
        </Box>
      </Box>

      {/* Print Button */}
      <Box className="mt-6">
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print Article
        </Button>
      </Box>
    </Box>
  );
};

export default PrintableArticle;
