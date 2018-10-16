const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
var importFiles = require('./compile');

// create a provider to the Rinkeby Network
const provider = new HDWalletProvider(
	'oil bamboo zebra wave blouse good interest loyal shrimp tide fashion bid',
	'https://rinkeby.infura.io/7F2b748n4SDZhqJLilR1'
);
const web3 = new Web3(provider);

// import library data
let contract_interface = importFiles.contract_interface;
let contract_bytecode = importFiles.contract_bytecode;

async function deployContract() {
    // Get a list of all accounts
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account', accounts[0]);
    // Use one of those accounts to deploy the contract
    const contract = await new web3.eth.Contract(JSON.parse(contract_interface))
        .deploy({ data: contract_bytecode })
        .send({ from: accounts[0], gas: web3.utils.toHex(1000000) });
	console.log('Contract deployed to', contract.options.address);
    return (contract);
};

deployContract();
