const SignedXml = require("xml-crypto").SignedXml;
const fs = require("fs");
const axios = require('axios');
const GeneralError = require("../utils/GeneralError");

const invoiceFiscalized = async (params) =>{

    console.log("invoiceCode-------",params.newInvoice.dataValues.invoiceCode.substring(0,2));
    const softCode="zz463gy579";
   
    function signXml(xml, xpath, key) {
      const sig = new SignedXml();
      sig.signingKey = fs.readFileSync(__dirname +"/"+ key);

      sig.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
      sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
      sig.addReference(xpath, [
        "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
        "http://www.w3.org/2001/10/xml-exc-c14n#",
      ], ["http://www.w3.org/2001/04/xmlenc#sha256"]);
      const publicKey = 'MIIFKTCCBBGgAwIBAgIMQwKhWXABWRovMc8KMA0GCSqGSIb3DQEBCwUAMEsxCzAJBgNVBAYTAkFMMQ0wCwYDVQQKEwROQUlTMS0wKwYDVQQDEyROQUlTIENsYXNzIDMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMjIwODE3MTMzMDUzWhcNMjMwODE3MTMzMDUzWjCBgzEPMA0GA1UEBxMGVGlyYW5hMRUwEwYDVQQKEwxPVkxBIFN5c3RlbXMxCzAJBgNVBAsTAklUMQ0wCwYDVQQMEwRUZXN0MRgwFgYDVQQDEw9PVkxBIFN5c3RlbXMgICAxDjAMBgNVBAUTBU1PUzI3MRMwEQYDVQQEEwpNMTE0MjMwMTlPMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0j+6sPdloJ8xEVjF24iAe+OSN6S/1AvXmmOu91lnaH00Klprm3tXZISS33b4Ov0PdD2HilTrl1da4CayvbXcrEE1MxHWf8AIV/URxGhxEV5OEHsmctuBumYGMiC4qPYjNkTX5tVlOAPzF9zD5mHPoTmrBwLdrsfZBeFGpUCAq8GApE9QLXaV1i2w59JXm0F+w9KAB6p2IKJi+X8upK6Gw5+4rFzktvNhWqsyJlyj4/JJkuDj625H2zUTn7UZVINS9DipYv9KSqSe3d3NfJ8cNeyQVj1Jn1/WtpKDpevic/J2APD6/pMkviSLJIMtUbkqr1638J5cv4Tbm+y1L/QoEwIDAQABo4IB0jCCAc4wZgYIKwYBBQUHAQEEWjBYMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5ha3NoaS5nb3YuYWwwMAYIKwYBBQUHMAKGJGh0dHA6Ly9jZXJ0cy5ha3NoaS5nb3YuYWwvY2xhc3MzLmNydDAOBgNVHQ8BAf8EBAMCBPAwHwYDVR0jBBgwFoAUhyao+9srUZs50JjW9MYzVkdc2AUwHQYDVR0OBBYEFAAXNSQpD6bOrwQBhOADHVYzGS3jMEsGA1UdIAREMEIwQAYMKwYBBAGCsWwKAQEDMDAwLgYIKwYBBQUHAgEWImh0dHA6Ly93d3cuYWtzaGkuZ292LmFsL3JlcG9zaXRvcnkwgacGA1UdHwSBnzCBnDCBmaCBlqCBk4YiaHR0cDovL2NybC5ha3NoaS5nb3YuYWwvY2xhc3MzLmNybIZtbGRhcDovL2xkYXAuYWtzaGkuZ292LmFsL0NOPU5BSVMgQ2xhc3MgMyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eSxPPU5BSVMsQz1BTD9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0O2JpbmFyeTAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwDQYJKoZIhvcNAQELBQADggEBAA7rR2wdN7Udk9xMUc13J8uGzAMWMOFey6cs1KD+kA/igJ/MxTgGobo/ydWEJ9Jebo8kbMvgEl8JnBhqXaWp3MpscJ3mT87WabqIw14LhPnk6sghOOJaYl77azZnFJpE/I/S392FfLJttQBEOzqHwz7cJByd4l8Imhd/b/LLbdCMeWEbmGnnLWoowdtAw/H5kDVKnYuZIyifzo/Se4xV/9KnZoJMFPVz2+lEkgjt0S4DSh3C3V07HztoZwPMeFvbKTIaxdRu1D8CWH6VK8cjJvEX7IrGwN7pVF5m7rS79zYduB01096HCs9oXQgTijT1B52ktK6Q8VuNaOLT+/ORK4M=';
      
      sig.keyInfoProvider = {
        getKeyInfo: () => {
          return `<X509Data><X509Certificate>${publicKey}</X509Certificate></X509Data>`;
        },
      };
      sig.computeSignature(xml, {
        location: { reference: "//*[local-name(.)='Invoice']", action: "after" },
      });
      return sig.getSignedXml();
    }

    // tcr bussines rg724gt177
    // iy100lf082
    // params.body.nuis
    // nipt M11423019O

    const xmlDocument = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<SOAP-ENV:Header/>'+
    '<SOAP-ENV:Body>'+
    '<RegisterInvoiceRequest xmlns="https://eFiskalizimi.tatime.gov.al/FiscalizationService/schema" xmlns:ns2="http://www.w3.org/2000/09/xmldsig#" Id="Request" Version="3">'+
    `<Header SendDateTime="${params.body.date}" UUID="56b37523-3677-416a-8bc0-e0dd77296fd8"/>`+
    `<Invoice BusinUnitCode="rg724gt177" IssueDateTime="${params.body.date}" IIC="4AD5A215BEAF85B0416235736A6DACAB" IICSignature="83D728C8E10BA04C430BE64CE98612B0256C0FE618C167F28BF62A0C0CB38C51824F152AB00510AE076508E53ACE4F877D25D51C7830F043E09BB1500D3A0AEA233ECC6175A45FE58CBF53E517FD9EA1D06CBABC055EEE6B430A16560C96D3A27720A6E5C9BA5C8D18A7AE5C2A7F1D8E46B293F56D32847FCEE199D2AFDC6E5BC1164BA974A6E29D6F40FBD8C51D40A99BC97DD6DB2AE9EC0582F2E74E9C7841AC5A854DE92B1D778A809CACCBBEF4DC325C852487BCF035AA2D54594DC6BDD859E250782CCCDD7CC89EE80A2FE1030AAAD615DA5D728322F8590D9F56E6DDE5975A738F304F56BB832996763624B72C77E97881D9C647B50709F20AFBFA0602" InvNum="${params.newInvoice.dataValues.invoiceCode}" InvOrdNum="${params.newInvoice.dataValues.invoiceCode.substring(0,5)}" IsIssuerInVAT="true" IsReverseCharge="false" IsSimplifiedInv="false" OperatorCode="${params.body.operatorCode}" SoftCode="${softCode}" TCRCode="iy100lf082" TotPrice=${params.body.totalAmount + ".00"} TotPriceWoVAT="${params.body.totalAmountNoVAT + "0"}" TotVATAmt="${params.body.totalVat + "0"}" TypeOfInv="CASH">`+
    '<PayMethods>'+
    `<PayMethod Amt="${params.body.totalAmount + ".00"}" Type="BANKNOTE"/>`+
    '</PayMethods>'+
    `<Seller Address="${params.clientBranch.dataValues.address}" Country="ALB" IDType="NUIS" IDNum="M11423019O" Name="${params.clientBranch.dataValues.name}" Town="${params.clientBranch.dataValues.city}"/>`+
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
        url: 'https://efiskalizimi-test.tatime.gov.al/FiscalizationService-v3/FiscalizationService.wsdl',
        headers: {'Content-Type': 'text/xml'},
        data: signedXml
      });
        return result;
    }catch(err){
      //console.log("error----",err.code);
      //throw new GeneralError("Kjo fature nuk u fiskalizua", 409);
      return err;
    }

}

module.exports = {invoiceFiscalized};