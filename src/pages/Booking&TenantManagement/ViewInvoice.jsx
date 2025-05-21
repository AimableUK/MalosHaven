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
      <Box>
        <Typography variant="h6" className="text-white">
          Tenant: {invoice.tenantName}
        </Typography>
        <Typography variant="h6" className="text-white">
          Tenant: {invoice.phone}
        </Typography>
        <Typography className="text-gray-400">
          Date Issued: {invoice.dateIssued}
        </Typography>
        <Typography className="text-gray-400">
          Amount: {invoice.amount}
        </Typography>
        <Typography className="text-gray-400">
          Reason: {invoice.reason}
        </Typography>
        <Typography className="text-gray-400">
          Payment Status: {invoice.status}
        </Typography>
        <Typography className="text-gray-400">
          Due Date: {invoice.dueDate}
        </Typography>
      </Box>

      <Box
        component="div"
        className="a4-page page-break  print:bg-white print:text-black flex flex-row p-6 bg-[#24383E] rounded-md"
        ref={componentRef}
      >
        <Box>
          <Box>
            <img src={Logo} alt="Our Logo" />
            <Box mt={2}>
              <Typography fontWeight="bold">KAMO BUSINESS CO. LTD</Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Luxury Gatsata Center</Typography>
              <Typography>Muhima, 120KN ST</Typography>
              <Typography>+250 780934382</Typography>
            </Box>
          </Box>
        </Box>
        <Box></Box>
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
