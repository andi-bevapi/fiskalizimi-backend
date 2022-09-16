const invoiceFiscalized = (params) =>{

    console.log("params------",params.invoiceItems);

    const softCode="zz463gy579";

    const xml = '<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<SOAP-ENV:Header/>'+
    '<SOAP-ENV:Body>'+
    '<RegisterInvoiceRequest xmlns="https://eFiskalizimi.tatime.gov.al/FiscalizationService/schema" xmlns:ns2="http://www.w3.org/2000/09/xmldsig#" Id="Request" Version="2">'+
    '<Header UUID="56b37523-3677-416a-8bc0-e0dd77296fd8" SendDateTime="2022-09-13T11:52:01+01:00"/>'+
    `<Invoice TypeOfInv="CASH" IsSimplifiedInv="true" IssueDateTime="${params.body.date}" InvNum="${params.newInvoice.dataValues.invoiceCode}" InvOrdNum="${params.newInvoice.dataValues.invoiceCode.substring(0,2)}" TCRCode="iy100lf082" IsIssuerInVAT="true/false" TotPriceWoVAT=${params.body.totalAmountNoVAT} TotVATAmt=${params.body.totalVat} TotPrice=${params.body.totalAmount} OperatorCode="${params.body.operatorCode}" BusinUnitCode="${params.clientBranch.businessUnitCode}" SoftCode="${softCode}" PayDeadline="${params.body.date}" IsEinvoice="false">`+
    `<PayMethod Type="BANKNOTE" Amt="${params.body.totalAmount}">`+
    '</Invoice>'+
    `<Seller IDType="NUIS" IDNum="${params.body.nuis}" Name="${params.clientBranch.dataValues.name}" Address="${params.clientBranch.dataValues.adress}" Town="${params.clientBranch.dataValues.city}">`+
    '</Seller>'+
    '<Items>'+
      params.invoiceItems.map((el,index)=>{
        //console.log("el-------",el);
          return `<I N="${el.productName}" C="${el.barcode}" U="" Q="${el.quantity}" UPB="${el.originalPrice}" UPA="${el.finalPrice}" R="0" RR="false" PB="${el.originalPrice * el.quantity}" VR="20%" VA="${el.originalPrice}* VR">' + '</I>`
      })
    +'</Items>'+
    '<SameTaxes>'+
        '<SameTax NumOfItems="nr total i artikujve" PriceBefVAT="tatalAmountNoVAT" VATRate="norma e tvsh" ExemptFromVAT="" VATAmt="total vat">'+
    '</SameTax>'+
    '<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">'+
    '<SignedInfo>'+
		'<CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>'+
			'<SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>'+
					'<Reference URI="#Request">'+
						'<Transforms>'+
							'<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>'+
							'<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>'+
						'</Transforms>'+
						'<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>'+
						'<DigestValue>TPTxhFLbLwS49tDl9DwdcjTHTi5LH5ZucZB2Wgz0IMA=</DigestValue>'+
					'</Reference>'+
				'</SignedInfo>'+

				'<SignatureValue>R60S3xQ9hlTCEdplEJ1HgD0fr5kpZjhft2WUgG20DFUj038MyBmiOnSSgpN1/NMbTXXgY7GNAkfeQxzUM5hNqg5jJgbZDByvNsalPLn1uqv3QmHzvLYH2al1ZX7fCSu6DdoI/HKsvJ8JBfYrlg4jogQjxxBG6rSNNUwC98/AE4uPtGnkksINe2UBE2aB5IDOKPlA4biBuaVYYri+LoOcyLyBTBKb8V8BXMYToA87luYKEbyN46MQgZ+yfHr/wyYN+VYvZSCWfK6EvAN7Fdgaa/Z7fY32BnjO/Pepa177rHQtL94zZKtg0z+cqYix+leCAnhZonCk5x5/CBh7OYRLNA==</SignatureValue>'+
				'<KeyInfo>'+
					'<X509Data>'+
						'<X509Certificate>MIIFKTCCBBGgAwIBAgIMQwKhWXABWRovMc8KMA0GCSqGSIb3DQEBCwUAMEsxCzAJBgNVBAYTAkFMMQ0wCwYDVQQKEwROQUlTMS0wKwYDVQQDEyROQUlTIENsYXNzIDMgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkwHhcNMjIwODE3MTMzMDUzWhcNMjMwODE3MTMzMDUzWjCBgzEPMA0GA1UEBxMGVGlyYW5hMRUwEwYDVQQKEwxPVkxBIFN5c3RlbXMxCzAJBgNVBAsTAklUMQ0wCwYDVQQMEwRUZXN0MRgwFgYDVQQDEw9PVkxBIFN5c3RlbXMgICAxDjAMBgNVBAUTBU1PUzI3MRMwEQYDVQQEEwpNMTE0MjMwMTlPMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0j+6sPdloJ8xEVjF24iAe+OSN6S/1AvXmmOu91lnaH00Klprm3tXZISS33b4Ov0PdD2HilTrl1da4CayvbXcrEE1MxHWf8AIV/URxGhxEV5OEHsmctuBumYGMiC4qPYjNkTX5tVlOAPzF9zD5mHPoTmrBwLdrsfZBeFGpUCAq8GApE9QLXaV1i2w59JXm0F+w9KAB6p2IKJi+X8upK6Gw5+4rFzktvNhWqsyJlyj4/JJkuDj625H2zUTn7UZVINS9DipYv9KSqSe3d3NfJ8cNeyQVj1Jn1/WtpKDpevic/J2APD6/pMkviSLJIMtUbkqr1638J5cv4Tbm+y1L/QoEwIDAQABo4IB0jCCAc4wZgYIKwYBBQUHAQEEWjBYMCQGCCsGAQUFBzABhhhodHRwOi8vb2NzcC5ha3NoaS5nb3YuYWwwMAYIKwYBBQUHMAKGJGh0dHA6Ly9jZXJ0cy5ha3NoaS5nb3YuYWwvY2xhc3MzLmNydDAOBgNVHQ8BAf8EBAMCBPAwHwYDVR0jBBgwFoAUhyao+9srUZs50JjW9MYzVkdc2AUwHQYDVR0OBBYEFAAXNSQpD6bOrwQBhOADHVYzGS3jMEsGA1UdIAREMEIwQAYMKwYBBAGCsWwKAQEDMDAwLgYIKwYBBQUHAgEWImh0dHA6Ly93d3cuYWtzaGkuZ292LmFsL3JlcG9zaXRvcnkwgacGA1UdHwSBnzCBnDCBmaCBlqCBk4YiaHR0cDovL2NybC5ha3NoaS5nb3YuYWwvY2xhc3MzLmNybIZtbGRhcDovL2xkYXAuYWtzaGkuZ292LmFsL0NOPU5BSVMgQ2xhc3MgMyBDZXJ0aWZpY2F0aW9uIEF1dGhvcml0eSxPPU5BSVMsQz1BTD9jZXJ0aWZpY2F0ZVJldm9jYXRpb25MaXN0O2JpbmFyeTAdBgNVHSUEFjAUBggrBgEFBQcDAgYIKwYBBQUHAwQwDQYJKoZIhvcNAQELBQADggEBAA7rR2wdN7Udk9xMUc13J8uGzAMWMOFey6cs1KD+kA/igJ/MxTgGobo/ydWEJ9Jebo8kbMvgEl8JnBhqXaWp3MpscJ3mT87WabqIw14LhPnk6sghOOJaYl77azZnFJpE/I/S392FfLJttQBEOzqHwz7cJByd4l8Imhd/b/LLbdCMeWEbmGnnLWoowdtAw/H5kDVKnYuZIyifzo/Se4xV/9KnZoJMFPVz2+lEkgjt0S4DSh3C3V07HztoZwPMeFvbKTIaxdRu1D8CWH6VK8cjJvEX7IrGwN7pVF5m7rS79zYduB01096HCs9oXQgTijT1B52ktK6Q8VuNaOLT+/ORK4M=</X509Certificate>'+
					'</X509Data>'+
				'</KeyInfo>'+
			'</Signature>'+

    `<TCR BusinUnitCode="rg724gt177" IssuerNUIS="M11423019O" MaintainerCode="mn946ff174" SoftCode="${softCode}" TCRIntID="3" ValidFrom="2022-09-13" Type="REGULAR" />`+
    '</RegisterInvoiceRequest>'+
    '</SOAP-ENV:Body>'+
    '</SOAP-ENV:Envelope>'

    //console.log("xml------",xml);

    return xml;
}

module.exports = {invoiceFiscalized};