const identifierGenerator = (invoicesLength, branchCode) => {
    return `${invoicesLength + 1}/${new Date().getFullYear()}/${branchCode}`;
}

module.exports = {
    identifierGenerator
}