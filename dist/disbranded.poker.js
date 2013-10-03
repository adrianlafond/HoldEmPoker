/*
 * poker-game-engine v0.0.1
 * by Adrian Lafond / adrian [at] disbranded.com
 * last updated 2013-10-03
**/

;(function (root, factory) {
  /**
   * Module pattern from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
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
    root.DISBRANDED = root.DISBRANDED || {}
    root.DISBRANDED.poker = factory(root._);
  }
}(this, function (_) {







    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));

