'use strict';

if (typeof Symbol === 'function') {
  const assignSymbols = require('./');
  let obj = {};

  let one = {};
  let symbolOne = Symbol('aaa');
  one[symbolOne] = 'bbb';

  let two = {};
  let symbolTwo = Symbol('ccc');
  two[symbolTwo] = 'ddd';

  assignSymbols(obj, one, two);
  console.log(obj[symbolOne]); //=> 'bbb'
  console.log(obj[symbolTwo]); //=> 'ddd'
} else {
  console.log('Sorry, Symbol is not supported on ' + process.version + ' of node.js');
}
