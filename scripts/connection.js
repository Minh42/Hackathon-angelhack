var Web3 = require('web3');
// create an instance of web3 using the HTTP provider.
// NOTE in mist web3 is already available, so check first if it's available before instantiating
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/xOWvlhFxWmjHUNsDQAqX"));
var MyContract = web3.eth.contract(ABI);

// instantiate by address
var contractInstance = MyContract.at(nodeId);

// Get the data to deploy the contract manually
// var contractData = MyContract.new.getData([constructorParam1] [, constructorParam2], {data: '0x12345...'});
// contractData = '0x12345643213456000000000023434234'