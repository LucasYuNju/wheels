const a = require('./a');
setTimeout(() => {
  console.log(a);
});
module.exports = {
  b: 'bar'
};
global.name = 'b inited';
