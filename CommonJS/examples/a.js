const b = require('./b');
setTimeout(() => {
  console.log(b);
});
module.exports = {
  a: 'foo'
};
console.log(global.name);
