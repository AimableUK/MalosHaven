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
        className="a4-page print:bg-white print:text-black p-6 bg-[#24383E] rounded-md"
        ref={componentRef}
      >
        <Box className="flex flex-col gap-4">
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
              <span style={{ fontWeight: "initial" }}>
                {invoice.dateIssued}
              </span>
            </Typography>
            <Typography fontWeight="bold" fontFamily="poppins">
              Due Date:
              <span style={{ fontWeight: "initial" }}>{invoice.dueDate}</span>
            </Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold" fontFamily="poppins">
              Reason:&nbsp;
              <span style={{ fontWeight: "initial" }}>{invoice.reason}</span>
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
