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
    root.DISBRANDED.Poker = factory(root._);
  }
}(this, function (_) {
  'use strict'




/**
 * Variables scoped to entire Poker module.
 */
var Poker




/**
 * The main Poker class and the returned API.
 */
Poker = function () {
  this.name = 'Poker'
}


Poker.prototype = {
  
}







  return Poker
}));

