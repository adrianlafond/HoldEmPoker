/**
 * Must be loaded prior to all other poker modules.
 * Sets up namespaces and other defaults.
 */
;(function (root) {
  'use strict'

  // @namespace
  root.DISBRANDED = (typeof root.DISBRANDED === 'undefined') ? {} : root.DISBRANDED
  root.DISBRANDED.poker = {
    
    // sub namespaces
    holdem: {},
    
    // contstants
    LIMIT         : 'limit',
    NO_LIMIT      : 'noLimit',
    POT_LIMIT     : 'potLimit'
  }
}(this));