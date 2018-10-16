const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'contract.sol');

var input =  {
    'contract.sol': fs.readFileSync(contractPath, 'utf8'),
};

let compiledContract = solc.compile({sources: input}, 1);
module.exports.contract_interface = compiledContract.contracts['contract.sol:Flex'].interface;
module.exports.contract_bytecode = '0x'+compiledContract.contracts['contract.sol:Flex'].bytecode;
console.log("Contract compiled");
