var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var app = express();
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3030);
console.log('Listening to port 3030');

app.post('/', function(req, res) {
	console.log('DATA SENT TO THE BLOCKCHAIN');
    console.log(req.body);
    var mode = req.body.mode;
    var id_contract = req.body.id;
    var id_chargingPoint = req.body.charging_id;
    var duration = req.body.slider;
    var state = req.body.mode;
    addContract(id_contract, id_chargingPoint, duration, state);
    if (mode === '2') {
        req.session.duration = duration;
        req.session.mode = 'Flex';
        req.session.cg_station = id_chargingPoint;
        res.render('dashboard', {
            hours: duration,
            mode: 'Flex',
            mode1: 'Fast',
            mode2: 'Normal'
        });
    }
});


app.get('/', function(req, res) {
	res.render('index');
})

app.get('/dashboard', function (req, res, next) {
    res.render('dashboard', {
        hours: req.session.duration,
        mode: req.session.mode,
        mode1: 'Fast',
        mode2: 'Normal'
    })
});

app.get('/accepted', function(req, res, next) {
    res.render('accepted', {
        hours: req.session.duration,
        cgStation: req.session.cg_station
    });
});

async function addContract(id_contract, id_chargingPoint, duration, state) {
	var timestamp = Date.now();
	var importFiles = require('./compile');
	
	const HDWalletProvider = require('truffle-hdwallet-provider');
	const Web3 = require('web3');
	
	const provider = new HDWalletProvider(
	'oil bamboo zebra wave blouse good interest loyal shrimp tide fashion bid',
	'https://rinkeby.infura.io/7F2b748n4SDZhqJLilR1'
	);
	const web3 = new Web3(provider);
	const contractABI = JSON.parse(importFiles.contract_interface);
	const contractAddress = '0xFF6Cf5FFe6C58A7077A76Cc14D7a45ecd985A6b4'; //to change

	const accounts = await web3.eth.getAccounts();
	console.log('REQUESTING FLEXIBILITY FROM ACCOUNT :')
	console.log(accounts);
	console.log('BE PATIENT, WAIT 15 SECONDS, WE ARE ON ETHEREUM AND IT\'S JUST 2018');
	var contractInstance = await new web3.eth.Contract(contractABI, contractAddress);
	await contractInstance.methods.addContract(id_contract, id_chargingPoint, timestamp, timestamp, duration, state).send({from: accounts[0], gas: 1000000 }).then(console.log);
	console.log('REQUEST WAS SUCESSFULLY SENT ON THE BLOCKCHAIN');
	console.log('WAITING FROM APROVAL FROM UTILITY PROVIDER');
	setTimeout(function () {
		console.log('REQUEST ACCEPTED BY UTILITY PROVIDER'); 
	}, 15000);
}

// async function getContract() {
// 	var importFiles = require('./compile');
	
// 	const HDWalletProvider = require('truffle-hdwallet-provider');
// 	const Web3 = require('web3');
	
// 	const provider = new HDWalletProvider(
// 	'oil bamboo zebra wave blouse good interest loyal shrimp tide fashion bid',
// 	'https://rinkeby.infura.io/7F2b748n4SDZhqJLilR1'
// 	);
// 	const web3 = new Web3(provider);
// 	const contractABI = JSON.parse(importFiles.contract_interface);
// 	const contractAddress = '0xEAF372F44B445C0E192aeDFa552001E3b2311aaE'; //to change

// 	const accounts = await web3.eth.getAccounts();
// 	console.log(accounts);
// 	var contractInstance = await new web3.eth.Contract(contractABI, contractAddress);
// 	await contractInstance.methods.getUser('0x4a6d5adae68c8ac1cb9d47173aa7d2b6dde7f343').send({from: accounts[0], gas: 1000000 }).then(console.log);
// }
