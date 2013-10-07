/*
 * poker-game-engine v0.0.1
 * by Adrian Lafond / adrian [at] disbranded.com
 * last updated 2013-10-06
**/
!function(a,b){"function"==typeof define&&define.amd?define(["underscore"],b):"object"==typeof exports?module.exports=b(require("underscore")):(a.DISBRANDED=a.DISBRANDED||{},a.DISBRANDED.Poker=b(a._))}(this,function(a){"use strict";var b,c,d,e;return e={en:{cards:[null,"High Card","One Pair","Two Pair","Three of a Kind","Straight","Flush","Full House","Four of a Kind","Straight Flush","Royal Flush"]}},function(){var b=["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"],d=b.length,e=4;c=function(a){this.isShuffled=!1,this.isNew=!0,this.jokers=0,"object"==typeof a&&this.addJokers(parseInt(a.hasOwnProperty("jokers")?a.jokers:0,10)),this.reset()},c.prototype={cards:function(){return this.cardsIn.slice(0)},count:function(){return d+this.jokers},removeJokers:function(){return this.jokers=0,this.reset(),this},addJokers:function(a){return a=parseInt(a,10),isNaN(a)||(a=Math.max(0,Math.min(a,e-this.jokers)),this.jokers+=a,this.reset()),this},reset:function(){return this.cardsIn=b.slice(0),a.times(this.jokers,function(a){this.cardsIn[d+a]="W"+(a+1)},this),this.cardsOut=[],this.isShuffled=!1,this.isNew=!0,this},shuffle:function(){return this.reset(),this.cardsIn=a.shuffle(this.cardsIn),this.isShuffled=!0,this.isNew=!1,this},deal:function(){var a=null;return this.cardsIn.length>0&&(a=this.cardsIn.pop(),this.cardsOut.push(a),this.isNew=!1),a}}}(),function(){var b=function(){var a=0;return function(){return a++}}(),c={isHigh:!0,isLow:!1};d=function(e){return this instanceof d?(this.options=a.extend({id:b()},c,e),this.reset(),void 0):new d(id)}}(),d.ROYAL_FLUSH=10,d.STRAIGHT_FLUSH=9,d.FOUR_OF_A_KIND=8,d.FULL_HOUSE=7,d.FLUSH=6,d.STRAIGHT=5,d.THREE_OF_A_KIND=4,d.TWO_PAIR=3,d.ONE_PAIR=2,d.HIGH_CARD=1,d.BETTER=-1,d.WORSE=1,d.EVEN=0,d.RANKS="WAKQJT98765432",d.SUITS="SHDC",d.prototype={reset:function(){return this.cards=[],this.rankHigh=0,this.rankLow=0,this.cardsHigh=[],this.cardsLow=[],this},has:function(b){return a.contains(this.cards,b)},add:function(){return a.each(arguments,function(b){a.isString(b)?this.has(b)||(this.cards[this.cards.length]=b,this.updateRank()):a.isArray(b)&&this.add.apply(this,b)},this),this},get:function(b){return a.has(this.cards,b)?this.cards[b]:null},set:function(b,c){return b=parseInt(b,10),a.isNumber(b)&&!a.isNaN(b)&&(b=Math.max(0,Math.min(this.cards.length,b)),this.cards[b]=c,this.updateRank()),this},rank:function(a){var b="string"==typeof a&&a.length>0&&"L"===a.charAt(0).toUpperCase();return b?this.rankLow:this.rankHigh},updateRank:function(){this.options.isHigh&&this.updateHigh(),this.options.isLow&&this.updateLow()},updateHigh:function(){var a=null;this.rankHigh=0,this.cards.length>=5?(a=d.findFlush(this.cards))&&(this.rankHigh=d.FLUSH,this.cardsHigh=a.cards.slice(0,5),(a=d.findStraightFlush(this.cardsHigh))&&(this.rankHigh=a.royalFlush?d.ROYAL_FLUSH:d.STRAIGHT_FLUSH,this.cardsHigh=results.cards.slice(0,5))):this.cardsHigh=[]},updateLow:function(){this.rankLow=0,this.cards.length>=5||(this.cardsLow=[])}},d.findFlush=function(){var b,c,e,f,g,h,i=arguments.length>0?arguments[0]:null,j=null,k=!1,l=!1,m=null;if(a.isArray(i)?j=i:a.isObject(i)&&(j=i.cards,k=i.sorted===!0,l=i.low===!0),!a.isArray(j)||j.length<5)return null;for(j=j.slice(0),k||d.sortByRank(j),f=j.length,b=0;4>b;b++){for(c=d.SUITS[b],h=[],g=0,e=0;f>e;e++)j[e].charAt(1)===c&&(h[g++]=j[e]);if(h.length>=5)if(null===m)m=l?h.slice(h.length-5):h.slice(0,5);else if(h=l?h.slice(h.length-5):h.slice(0,5),l){for(g=0;5>g;g++)if(d.isLower(h[g],m[g])){m=h;break}}else for(g=0;5>g;g++)if(d.isHigher(h[g],m[g])){m=h;break}}return m?{cards:m}:null},d.findStraightFlush=function(){var b,c,e=arguments.length>0?arguments[0]:null,f=!1,g=!1,h=!1;if(a.isArray(e)?b=e:a.isObject(e)&&(b=e.cards,f=e.flush===!0,g=e.sorted=!0,h=e.low===!0),!a.isArray(b)||b.length<5)return null;if(g||d.sortByRank(b),!f){if(!(c=d.findFlush({cards:b,sorted:g,low:h})))return null;b=c.cards}return(c=d.findStraight(b,!0))&&(c.royalFlush="A"===d.rank(c.cards[0])),c},d.findStraight=function(){return null},d.sortByRank=function(a){a.sort(d.compareCardsByRank)},d.isHigher=function(a,b){return d.compareCardsByRank(a,b)<0},d.isLower=function(a,b){return d.compareCardsByRank(a,b)>0},d.compareCardsByRank=function(a,b){var c=d.RANKS.indexOf(d.rank(a)),e=d.RANKS.indexOf(d.rank(b));return c-e},d.compareCardsBySuit=function(a,b){var c=d.SUITS.indexOf(d.suit(a)),e=d.SUITS.indexOf(d.suit(b));return c-e},d.compareSetSize=function(a,b){var c=a.length,d=b.length;return d-c},d.rank=function(a){return a.charAt(0)},d.suit=function(a){return a.charAt(1)},b=function(){this.name="Poker"},b.prototype={},b.Deck=c,b.Hand=d,b.lingo=function(b){return b=b||"en",e.hasOwnProperty(b)?{cards:a.clone(e[b].cards)}:null},b});