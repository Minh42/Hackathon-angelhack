var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');

var app = express();
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.render('index');
});

app.post('/', function(req, res) {
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
    var importFiles = require(path.join(__dirname, '/public/js/compile'));

    const HDWalletProvider = require('truffle-hdwallet-provider');
    const Web3 = require('web3');

    const provider = new HDWalletProvider(
        'oil bamboo zebra wave blouse good interest loyal shrimp tide fashion bid',
        'https://rinkeby.infura.io/7F2b748n4SDZhqJLilR1'
    );
    const web3 = new Web3(provider);
    const contractABI = JSON.parse(importFiles.contract_interface);
    const contractAddress = '0x7E39cf2F80572dFBA65a5BC9120EB473Db2F9599'; //to change

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    var contractInstance = await new web3.eth.Contract(contractABI, contractAddress);
    await contractInstance.methods.addContract(id_contract, id_chargingPoint, timestamp, timestamp, duration, state).send({from: accounts[0], gas: 1000000 }).then(console.log);
}

module.exports = app;
