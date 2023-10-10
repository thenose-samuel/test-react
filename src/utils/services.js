const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

require("dotenv").config();
const API_URL = process.env.API_URL;

const web3 = createAlchemyWeb3(API_URL);
const contract = require("./abi.json");
console.log(JSON.stringify(contract));
