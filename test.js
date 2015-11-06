'use strict';

require('mocha');
var assert = require('assert');
var assignSymbols = require('./');

describe('assign symbols', function () {
  it('should return the first object when one argument is passed:', function () {
    assert.deepEqual(assignSymbols({a: 'b'}), {a: 'b'});
  });

  if (typeof Symbol !== 'undefined') {
    it('should assign symbol properties from an object to the receiver', function () {
      var a = {};
      var b = {};
      var key = Symbol('abc');
      b[key] = 'xyz';
      assignSymbols(a, b);
      assert.equal(a[key], 'xyz');
    });

    it('should assign symbol properties from each object to the receiver', function () {
      var target = {};
      var a = {};
      var aa = Symbol('aa');
      a[aa] = 'aa';

      var b = {};
      var bb = Symbol('bb');
      b[bb] = 'bb';

      var c = {};
      var cc = Symbol('cc');
      c[cc] = 'cc';

      assignSymbols(target, a, b, c);
      assert.equal(target[aa], 'aa');
      assert.equal(target[bb], 'bb');
      assert.equal(target[cc], 'cc');
    });

    it('should not assign non-enumerable symbols', function () {
      var a = {};
      var key = Symbol('abc');
      function App() {}
      App.prototype[key] = 'xyz';
      var app = new App();
      assignSymbols(a, app);
      assert.equal(typeof a[key], 'undefined');
    });

    it('should return the receiver object', function () {
      var a = {};
      var b = {};
      var key = Symbol('abc');
      b[key] = 'xyz';
      var res = assignSymbols(a, b);
      assert.equal(res[key], 'xyz');
    });
  }

  it('should throw an error:', function (cb) {
    try {
      assignSymbols();
      cb(new Error('expected an error'));
    } catch (err) {
      assert(err);
      assert(err.message, 'expected the first argument to be a string');
      cb();
    }
  });
});
