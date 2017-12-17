#!/usr/bin/env node

const Blockchain = require('./blockchain');
const Block = require('./block');

let blockchain = new Blockchain();

module.exports = blockchain;