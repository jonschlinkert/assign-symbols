'use strict';

if (typeof Symbol !== 'undefined') {
  var assignSymbols = require('./');
  var obj = {};

  var one = {};
  var symbolOne = Symbol('aaa');
  one[symbolOne] = 'bbb';

  var two = {};
  var symbolTwo = Symbol('ccc');
  two[symbolTwo] = 'ddd';

  assignSymbols(obj, one, two);

  console.log(obj[symbolOne]);
  //=> 'bbb'
  console.log(obj[symbolTwo]);
  //=> 'ddd'
} else {
  console.log('sorry, Symbol is not supported.');
}
