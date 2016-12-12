const Module = require('../Module');

const currentModule = new Module();

currentModule._require('./math');
console.log('Sum of 1 + 1: ' + currentModule.exports.sum(1, 1));
