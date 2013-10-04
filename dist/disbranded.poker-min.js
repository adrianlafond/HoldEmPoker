/*
 * poker-game-engine v0.0.1
 * by Adrian Lafond / adrian [at] disbranded.com
 * last updated 2013-10-03
**/
!function(a,b){"function"==typeof define&&define.amd?define(["underscore"],b):"object"==typeof exports?module.exports=b(require("underscore")):(a.DISBRANDED=a.DISBRANDED||{},a.DISBRANDED.Poker=b(a._))}(this,function(a){"use strict";var b,c;return function(){function b(){return"deck-"+e++}var d={},e=0,f=["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"],g=f.length,h=0,i=4;c=function(c){var e;this.key=b(),e=d[this.key]={instance:this,cards:f.slice(0),cardsIn:[],cardsOut:[],jokers:0,shuffled:!1},"object"==typeof c&&(e.jokers=parseInt(c.hasOwnProperty("jokers")?c.jokers:0,10),e.jokers=Math.max(h,Math.min(i,jokers)),a.times(e.jokers,function(a){e.cards[a+g]="W"+(a+1)})),this.reset()},c.prototype={cards:function(){return d[this.key].cardsIn.slice(0)},jokers:function(){return d[this.key].jokers},count:function(){return g+this.jokers()},shuffled:function(){return d[this.key].shuffled},removeJokers:function(){return d[this.key].cards.slice(0,g),d[this.key].jokers=0,this.reset(),this},addJokers:function(b){return b=Math.min(b,i-d[this.key].jokers),a.times(b,function(a){d[this.key].cards.push("W"+(a+1))},this),d[this.key].jokers+=b,this.reset(),this},reset:function(){var a=d[this.key];return a.cardsIn=a.cards.slice(0),a.cardsOut=[],a.shuffled=!1,this},shuffle:function(){return this.reset(),d[this.key].cardsIn=a.shuffle(d[this.key].cardsIn),d[this.key].shuffled=!0,this},deal:function(){var a=null,b=d[this.key];return b.cardsIn.length>0&&(a=b.cardsIn.pop(),b.cardsOut.push(a)),a}}}(),b=function(){this.name="Poker"},b.prototype={},b.Deck=c,b});