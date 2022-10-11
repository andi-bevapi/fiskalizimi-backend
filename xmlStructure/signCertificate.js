const SignedXml = require("xml-crypto").SignedXml;
const fs = require("fs");

function signXml(xml, xpath, key) {
    const sig = new SignedXml();
    sig.signingKey = fs.readFileSync(__dirname +"/"+ key);

    sig.canonicalizationAlgorithm = "http://www.w3.org/2001/10/xml-exc-c14n#";
    sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    sig.addReference(xpath, [
      "http://www.w3.org/2000/09/xmldsig#enveloped-signature",
      "http://www.w3.org/2001/10/xml-exc-c14n#",
    ], ["http://www.w3.org/2001/04/xmlenc#sha256"]);
    const publicKey = `${process.env.PUBLIK_KEY}`;
    
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

module.exports = signXml;