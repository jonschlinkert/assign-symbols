/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
'use strict';

var toString = Object.prototype.toString;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var getSymbols = Object.getOwnPropertySymbols;

module.exports = function (target) {
  if (!isObject(target)) {
    throw new TypeError('expected the first argument to be an object');
  }

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (args.length === 0 || typeof Symbol !== 'function' || typeof getSymbols !== 'function') {
    return target;
  }

  for (var _i = 0; _i < args.length; _i++) {
    var arg = args[_i];
    var names = getSymbols(arg);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        if (isEnumerable.call(arg, key)) {
          target[key] = arg[key];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return target;
};

function isObject(val) {
  return typeof val === 'function' || toString.call(val) === '[object Object]' || Array.isArray(val);
}