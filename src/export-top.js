
// https://github.com/umdjs/umd/blob/master/returnExports.js
;(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['underscore'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('underscore'));
  } else {
    // Browser globals (root is window)
    root.POKER = factory(root._);
  }
}(this, function (_) {



