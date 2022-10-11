const axios = require('axios');
const signXml = require("./signCertificate");
const invoiceFiscalized = async (params) =>{
    const invOrdNum = params.newInvoice.dataValues.invoiceCode.split("/")[0];
    const xmlDocument = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<SOAP-ENV:Header/>'+
    '<SOAP-ENV:Body>'+
    '<RegisterInvoiceRequest xmlns="https://eFiskalizimi.tatime.gov.al/FiscalizationService/schema" xmlns:ns2="http://www.w3.org/2000/09/xmldsig#" Id="Request" Version="3">'+
    `<Header SendDateTime="${params.body.date}" UUID="${process.env.UUID}"/>`+
    `<Invoice BusinUnitCode="${process.env.BUSIN_UNIT_CODE}" IssueDateTime="${params.body.date}" IIC="${process.env.IIC}" IICSignature="${process.env.IICSignature}" InvNum="${params.newInvoice.dataValues.invoiceCode}" InvOrdNum="${invOrdNum}" IsIssuerInVAT="true" IsReverseCharge="false" IsSimplifiedInv="false" OperatorCode="${params.body.operatorCode}" SoftCode="${process.env.SOFT_CODE}" TCRCode="${process.env.TCR_CODE}" TotPrice=${params.body.totalAmount + ".00"} TotPriceWoVAT="${params.body.totalAmountNoVAT + "0"}" TotVATAmt="${params.body.totalVat + "0"}" TypeOfInv="CASH">`+
    '<PayMethods>'+
    `<PayMethod Amt="${params.body.totalAmount + ".00"}" Type="BANKNOTE"/>`+
    '</PayMethods>'+
    `<Seller Address="${params.clientBranch.dataValues.address}" Country="ALB" IDType="NUIS" IDNum="${process.env.IDNUM}" Name="${params.clientBranch.dataValues.name}" Town="${params.clientBranch.dataValues.city}"/>`+
    '<Items>'+
      params.invoiceItems.map((el,index)=>{
          return `<I C="${el.barcode}" N="${el.productName}" PA="${params.body.totalAmount + ".00"}" PB="${el.originalPrice * el.quantity + '0'}" Q="${el.quantity}" R="0" RR="true" U="metra" UPB="${el.originalPrice + "0"}" UPA="${el.finalPrice + ".00"}" VA="${params.newInvoice.dataValues.totalVat + "0"}" VR="${el.vat + ".00"}"> </I>`
      })
    +'</Items>'+
    '<SameTaxes>'+
        `<SameTax NumOfItems="${params.invoiceItems.length}" PriceBefVAT="${params.body.totalAmountNoVAT + "0"}" VATAmt="${params.newInvoice.dataValues.totalVat + "0"}"/>`+
    '</SameTax>'+
    '</SameTaxes>'+
    '</Invoice>'+
    '</RegisterInvoiceRequest>'+
    '</SOAP-ENV:Body>'+
    '</SOAP-ENV:Envelope>';
    const signedXml = signXml(xmlDocument, "//*[@Id='Request']","cert.pem");

    try{
      const result = await axios ({
        method: "post",
        url: `${process.env.URL_TATIME}`,
        headers: {'Content-Type': 'text/xml'},
        data: signedXml
      });
        return result;
    }catch(err){
      console.log("error-----",err);
      throw new Error("Kjo fature nuk u fiskalizua", 409);
      //return err;
    }
}

module.exports = {invoiceFiscalized};