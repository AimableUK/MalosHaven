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
        <Typography className="text-gray-400">
          Date Issued: {invoice.dateIssued}
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
        className="a4-page print:bg-white print:text-black p-6 bg-[#24383E] rounded-md"
        ref={componentRef}
      >
        <Box className="flex flex-row justify-between">
          <Box>
            <img src={Logo} alt="Our Logo" />
            <Box mt={2}>
              <Typography fontWeight="bold" fontFamily="poppins">
                KAMO BUSINESS CO. LTD
              </Typography>
              <Typography variant="h7" fontWeight="bold">
                Luxury Gatsata Center
              </Typography>
              <Typography fontFamily="poppins">Muhima, 120KN ST</Typography>
              <Typography fontFamily="poppins">+250 780934382</Typography>
            </Box>
          </Box>
          <Box className="flex flex-col items-end">
            <Typography fontFamily="poppins">Invoice # {invoice.id}</Typography>
            <Typography fontFamily="poppins" variant="h7">
              {invoice.tenantName}
            </Typography>
            <Typography fontFamily="poppins" variant="h7">
              {invoice.phone}
            </Typography>
            <Typography fontFamily="poppins" variant="h7">
              {invoice.amount}
            </Typography>
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
