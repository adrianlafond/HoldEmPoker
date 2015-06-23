'use strict'

describe('Poker.util', function () {
  var util = POKER.util

  expect(util.isArray([])).toBe(true)
  expect(util.isNumber(123)).toBe(true)
  expect(util.isNumber('not')).toBe(false)
  expect(util.isNumber(NaN)).toBe(false)
  expect(util.isBoolean(0)).toBe(false)
  expect(util.isBoolean(false)).toBe(true)
  expect(util.isInteger(5)).toBe(true)
  expect(util.isInteger(5.4)).toBe(false)
  expect(util.isString('5')).toBe(true)
  expect(util.isString(5)).toBe(false)
  expect(util.isFunction(function () {})).toBe(true)
  expect(util.isFunction(alert)).toBe(true)
  expect(util.isFunction(window)).toBe(false)
  expect(util.isNull(null)).toBe(true)
  expect(util.isNull(false)).toBe(false)
  expect(util.isNull()).toBe(false)
  expect(util.isNull(undefined)).toBe(false)
  expect(util.isUndefined(null)).toBe(false)
  expect(util.isUndefined(false)).toBe(false)
  expect(util.isUndefined()).toBe(true)
  expect(util.isUndefined(undefined)).toBe(true)
  expect(util.isObject({})).toBe(true)
  expect(util.isObject([])).toBe(false)
  expect(util.isObject(14)).toBe(false)
  expect(util.isObject(alert)).toBe(false)
  expect(util.isObject(new Date())).toBe(false)
  expect(util.isObject(/$\w/gi)).toBe(false)
  expect(util.isObject()).toBe(false)
  expect(util.isObject(true)).toBe(false)
  expect(util.isObject('[object Object]')).toBe(false)

  var a = { foo: 'bar', ug: 'ly' },
      b = { foo: 'ugh', say: 'what' }
  expect(util.extend({}, a, b)).toEqual({ foo: 'ugh', ug: 'ly', say: 'what' })
  expect(util.clone(a)).toEqual({ foo: 'bar', ug: 'ly' })
  expect(a === a).toBe(true)
  expect(util.clone(a) === a).toBe(false)
})