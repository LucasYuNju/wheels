const fs = require('fs');
const Module = require('../Module');

const currentModule = new Module();

// console.log(currentModule._resolve('/Users/foo/node_modules/bar/index.js'));
// console.log(currentModule._resolve('lodash/index'));
// console.log(currentModule._resolve('./math'));

const math = currentModule._require('./math');
console.log(math.sum);
console.log('Sum of 1 + 1:' + math.sum(1, 1));
