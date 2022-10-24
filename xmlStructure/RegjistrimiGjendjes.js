const axios = require('axios');
const signXml = require("./signCertificate");

const moneyDeposit = async (params) => {

    const xmlDocument = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<SOAP-ENV:Header/>'+
        '<SOAP-ENV:Body>'+
            '<RegisterCashDepositRequest xmlns="https://eFiskalizimi.tatime.gov.al/FiscalizationService/schema" xmlns:ns2="http://www.w3.org/2000/09/xmldsig#" Id="Request" Version="3">'+
                `<Header SendDateTime="${params.actionTime}" UUID="${process.env.UUID}"/>`+
                `<CashDeposit ChangeDateTime="${params.actionTime}" Operation="${params.action}" CashAmt="${Number.parseFloat(params.totalAmount).toFixed(2)}" TCRCode="${process.env.TCR_CODE}" IssuerNUIS="${process.env.IDNUM}"/>`+
            '</RegisterCashDepositRequest>'+
        '</SOAP-ENV:Body>'+
    '</SOAP-ENV:Envelope>';
    const signedXml = signXml(xmlDocument,"CashDeposit", "//*[@Id='Request']","cert.pem");
   
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
        throw new Error("Gjendja e Arkes nuk u regjistrua", 409);
        //return err;
    }
}

module.exports = {moneyDeposit}