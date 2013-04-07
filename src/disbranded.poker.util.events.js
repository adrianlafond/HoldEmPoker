
;(function (root, _) {
  'use strict'

  var NS = root.DISBRANDED.poker
  NS.util = NS.util || {}
  
  function on(event, callback, context) {
    var subs = this._subscribers,
        matchFn = function (value) {
          return value.callback === callback && value.context === context
        }

    if (_.isString(event) && _.isFunction(callback)) {
      subs[event] = _.has(subs, event) ? subs[event] : []
      context = context || root
      
      // If subscriber callack with particular context is not
      // already subscribed to @param event, subscribe it.
      if (!_.some(subs, matchFn)) {
        subs[event].push({
          'callback': callback,
          'context': context
        })
      }
    }
  }
  
  /**
   * 
   */
  function off(event, callback, context) {
    var subs = this._subscribers
    if (_.isString(event) && _.has(subs, event)) {
      
    }
  }
  
  
  function trigger(data) {
    var event,
        type
        
    if (_.isString(data)) {
      type = data
      event = { type: data }
    } else if (_.has(data, 'type')) {
      type = data.type
      event = _.extend({}, data)
    } else {
      return
    }
    
    event.target = this
    _.each(this._subscribers[type], function (sub, index) {
      sub.callback.call(sub.context, event)
    })
  }
  
  
  NS.util.events = function () {
    this._subscribers = {}
    this.on = on
    this.off = off
    this.trigger = trigger
    return this
  }
  
}(this, _));