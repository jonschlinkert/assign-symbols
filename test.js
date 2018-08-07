'use strict';

require('mocha');
const assert = require('assert');
const assign = require('./');

describe('assign symbols', () => {
  it('should throw an error when invalid arguments are passed', () => {
    assert.throws(() => assign(), /expected the first argument to be an object/);
  });

  it('should return the first object when no other args are passed', () => {
    let foo = { a: 'b' };
    assert(assign(foo) === foo);
  });

  it('should assign symbol properties from an object to the receiver', () => {
    let a = {};
    let b = {};
    let key = Symbol('abc');
    b[key] = 'xyz';
    assign(a, b);
    assert.equal(a[key], 'xyz');
  });

  it('should assign symbol properties from each object to the receiver', () => {
    let target = {};
    let a = {};
    let aa = Symbol('aa');
    a[aa] = 'aa';

    let b = {};
    let bb = Symbol('bb');
    b[bb] = 'bb';

    let c = {};
    let cc = Symbol('cc');
    c[cc] = 'cc';

    assign(target, a, b, c);
    assert.equal(target[aa], 'aa');
    assert.equal(target[bb], 'bb');
    assert.equal(target[cc], 'cc');
  });

  it('should not assign non-enumerable symbols', () => {
    let a = {};
    let key = Symbol('abc');
    function App() {}
    App.prototype[key] = 'xyz';
    let app = new App();
    assign(a, app);
    assert.equal(typeof a[key], 'undefined');
  });

  it('should return the receiver object', () => {
    let a = {};
    let b = {};
    let key = Symbol('abc');
    b[key] = 'xyz';
    let res = assign(a, b);
    assert.equal(res[key], 'xyz');
  });
});
