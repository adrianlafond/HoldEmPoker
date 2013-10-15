/*
 * poker-game-engine v0.0.1
 * by Adrian Lafond / adrian [at] disbranded.com
 * last updated 2013-10-14
**/
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():(a.DISBRANDED=a.DISBRANDED||{},a.DISBRANDED.Poker=b())}(this,function(){"use strict";var a,b,c,d,e,f,g,h;return function(){function a(a){return null===a}function c(a){return void 0===a}function d(b){return c(b)||a(b)}function e(a){return a===!0||a===!1}function f(a){return"[object String]"===Object.prototype.toString.call(a)}function g(a){return!isNaN(a)&&"[object Number]"===Object.prototype.toString.call(a)}function h(a){return g(a)&&parseFloat(a)===parseInt(a,10)}function i(a){return"[object Function]"===Object.prototype.toString.call(a)}function j(a){return"[object Array]"===Object.prototype.toString.call(a)}function k(a){return a===Object(a)&&"[object Object]"===Object.prototype.toString.call(a)}function l(){for(var a,b,c=1,d=arguments.length,e=arguments[0];d>c;c++){a=arguments[c];for(b in a)e[b]=a[b]}return e}function m(a){return j(a)?a.slice():l({},a)}function n(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function o(a,b,c){var d,e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length===parseFloat(a.length)){for(d=0,e=a.length;e>d;d++)if(!b.call(c,a[d],d))return}else for(d in a)if(Object.prototype.hasOwnProperty.call(a,d)&&!b.call(c,a[d],d))return}b=function(){return{isNull:a,isUndefined:c,isNada:d,isBoolean:e,isNumber:g,isInteger:h,isString:f,isFunction:i,isArray:j,isObject:k,extend:l,clone:m,has:n,each:o}}()}(),function(){var a=["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"],b=a.length,d=4;c=function(a){this.isShuffled=!1,this.isNew=!0,this.jokers=0,"object"==typeof a&&this.addJokers(parseInt(a.hasOwnProperty("jokers")?a.jokers:0,10)),this.reset()},c.prototype={cards:function(){return this.cardsIn.slice(0)},count:function(){return b+this.jokers},removeJokers:function(){return this.jokers=0,this.reset(),this},addJokers:function(a){return a=parseInt(a,10),isNaN(a)||(a=Math.max(0,Math.min(a,d-this.jokers)),this.jokers+=a,this.reset()),this},reset:function(){var c=0;for(this.cardsIn=a.slice();c<this.jokers;c++)this.cardsIn[b+c]="W"+(c+1);return this.cardsOut=[],this.isShuffled=!1,this.isNew=!0,this},shuffle:function(){var a,b,c;for(this.reset(),a=this.cardsIn.slice(),this.cardsIn=[];(b=a.length)>0;)c=Math.floor(Math.random()*b),this.cardsIn.push(a.splice(c,1));return this.isShuffled=!0,this.isNew=!1,this},deal:function(){var a=null;return this.cardsIn.length>0&&(a=this.cardsIn.pop(),this.cardsOut.push(a),this.isNew=!1),a}}}(),function(){var a=function(){var a=0;return function(){return"hand-"+a++}}(),c={high:!0,low:!1};d=function(e){return this instanceof d?(this.options=b.extend({id:a()},c,e||{}),this.reset(),this.options.cards&&(this.add(this.options.cards),delete this.options.cards),void 0):new d(e)}}(),d.ROYAL_FLUSH=10,d.STRAIGHT_FLUSH=9,d.FOUR_OF_A_KIND=8,d.FULL_HOUSE=7,d.FLUSH=6,d.STRAIGHT=5,d.THREE_OF_A_KIND=4,d.TWO_PAIR=3,d.ONE_PAIR=2,d.HIGH_CARD=1,d.ACE_TO_FIVE_LOW=1,d.ACE_TO_SIX_LOW=2,d.DEUCE_TO_SEVEN_LOW=3,d.DEUCE_TO_SIX_LOW=4,d.BETTER=-1,d.WORSE=1,d.EVEN=0,d.RANKS="WAKQJT98765432",d.SUITS="SHDC",d.prototype={reset:function(){return this.configLow(),this.cards=[],this.rank=0,this.cardsHigh=[],this.cardsLow=[],this},has:function(a){var c=!1;return b.each(this.cards,function(b){return b===a?(c=!0,!1):void 0}),c},add:function(){var a=Array.prototype.slice.call(arguments);return b.each(a,function(a){b.isString(a)?this.has(a)||(this.cards[this.cards.length]=a,this.updateRank()):b.isArray(a)&&this.add.apply(this,a)},this),this},get:function(a){return b.has(this.cards,a)?this.cards[a]:null},set:function(a,c){return a=parseInt(a,10),b.isNumber(a)&&(a=Math.max(0,Math.min(this.cards.length,a)),this.cards[a]=c,this.updateRank()),this},updateRank:function(){var a;this.cards.length>=5&&(a=this.sortedCardsCopy(),this.options.high&&this.updateHigh(a),this.options.low&&this.updateLow(a))},sortedCardsCopy:function(){var a=this.cards.slice(0);return d.sortByRank(a),a},updateHigh:function(a){var b=null;if(this.rank=0,a=a||this.sortedCardsCopy(),a.length>=5){if((b=d.findFlush({cards:a,sorted:!0,all:!0}))&&(this.rank=d.FLUSH,this.cardsHigh=b.cards,b=d.findStraightFlush({cards:this.cardsHigh,sorted:!0,flush:!0,acesAreLow:this.acesAreLow})))return this.rank=b.royalFlush?d.ROYAL_FLUSH:d.STRAIGHT_FLUSH,this.cardsHigh=b.cards,void 0;if(this.rank<d.STRAIGHT&&(b=d.findStraight({cards:a,sorted:!0,acesAreLow:this.acesAreLow}),b&&(this.rank=d.STRAIGHT,this.cardsHigh=b.cards)),b=d.findSets({cards:a,sorted:!0})){if(b.type>this.rank)switch(this.rank=b.type,this.rank){case d.FOUR_OF_A_KIND:this.cardsHigh=b.sets[0].concat(b.kickers);break;case d.FULL_HOUSE:this.cardsHigh=b.sets[0].concat(b.sets[1]);break;case d.THREE_OF_A_KIND:this.cardsHigh=b.sets[0].concat(b.kickers);break;case d.TWO_PAIR:this.cardsHigh=b.sets[0].concat(b.sets[1],b.kickers);break;case d.ONE_PAIR:this.cardsHigh=b.sets[0].concat(b.kickers);break;default:this.cardsHigh=[].concat(b.kickers)}}else this.rank<d.HIGH_CARD&&(this.rank=d.HIGH_CARD,this.cardsHigh=a.slice(0,5))}else this.cardsHigh=[]},updateLow:function(a){var b,c,e;if(this.rankLow=0,a=a?a.slice():this.sortedCardsCopy(),this.cards.length>=5){for(this.acesAreLow&&"A"===d.rank(a[0])&&a.push(a.shift()),e=[],c=0,b=a.length-1;b>=0;b--)if((0===c||d.rank(e[c-1])!==d.rank(a[b]))&&(e[c++]=a[b],5===e.length))if(!this.ignoreFlushes&&d.findFlush(e))e=e.slice(0,4),c=4;else{if(this.ignoreStraights||!d.findStraight(e)){this.cardsLow=e;break}e=e.slice(0,4),c=4}}else this.cardsLow=[]},compareHighest:function(a){var b,c;if(this.rank>a.rank)return-1;if(this.rank<a.rank)return 1;if(this.cardsHigh.length&&a.cardsHigh.length)for(b=0;5>b;b++)if(c=d.compareCardsByRank(this.cardsHigh[b],a.cardsHigh[b]),0!==c)return c;return 0},compareLowest:function(a){var b,c,e,f=this.cardsLow.length,g=a.cardsLow.length;if(5>f&&5>g)return 0;if(5>f&&g>=5)return 1;if(f>=5&&5>g)return-1;for(b=4;b>=0;b--){if(c=d.RANKS.indexOf(d.rank(this.cardsLow[b])),e=d.RANKS.indexOf(d.rank(a.cardsLow[b])),e>c)return 1;if(c>e)return-1}return 0},configLow:function(){switch(this.options.low===!0&&(this.options.low=d.ACE_TO_FIVE_LOW),this.options.low){case d.ACE_TO_FIVE_LOW:this.acesAreLow=!0,this.ignoreStraights=!0,this.ignoreFlushes=!0;break;case d.ACE_TO_SIX_LOW:this.acesAreLow=!0,this.ignoreStraights=!1,this.ignoreFlushes=!1;break;case d.DEUCE_TO_SEVEN_LOW:this.acesAreLow=!1,this.ignoreStraights=!1,this.ignoreFlushes=!1;break;case d.DEUCE_TO_SIX_LOW:this.acesAreLow=!1,this.ignoreStraights=!0,this.ignoreFlushes=!0;break;default:this.acesAreLow=!0,this.ignoreStraights=!0,this.ignoreFlushes=!0,this.options.low=0}}},d.findFlush=function(){var a,c,e,f,g,h=arguments.length>0?arguments[0]:null,i=null,j=!1,k=!1,l=!1,m=null;if(b.isArray(h)?i=h:b.isObject(h)&&(i=h.cards,j=h.sorted===!0,k=h.low===!0,l=h.all===!0),!b.isArray(i)||i.length<5)return null;for(i=i.slice(0),j||d.sortByRank(i),a=0;4>a;a++)c=d.SUITS.charAt(a),f=[],e=0,b.each(i,function(a){d.suit(a)===c&&(f[e++]=a)}),g=f.length,g>=5&&(null===m?m=k?f.slice(g-5):f.slice(0,l?g:5):(f=k?f.slice(f.length-5):f.slice(0,l?g:5),m=k?d.getBestCardsByRank({low:!0,cards:[f,m]}):d.getBestCardsByRank(f,m)));return m?{cards:m}:null},d.findStraightFlush=function(){var a,c,e=arguments.length>0?arguments[0]:null,f=!1,g=!1,h=!1,i=!0;if(b.isArray(e)?a=e:b.isObject(e)&&(a=e.cards,f=e.flush===!0,g=e.sorted===!0,h=e.low===!0,i=!(e.acesAreLow===!1)),!b.isArray(a)||a.length<5)return null;if(a=a.slice(0),g||d.sortByRank(a),!f){if(c=d.findFlush({cards:a,sorted:g,low:h,acesAreLow:i}),!c)return null;a=c.cards}return c=d.findStraight({cards:a,sorted:g,low:h,acesAreLow:i}),c?(c.royalFlush="A"===d.rank(c.cards[0]),c):null},d.findStraight=function(){var a,c,e=arguments.length>0?arguments[0]:null,f=!1,g=!1,h=!0,i=null,j=null,k=-1;return b.isArray(e)?a=e:b.isObject(e)&&(a=e.cards,f=e.sorted===!0,g=e.low===!0,h=!(e.acesAreLow===!1)),!b.isArray(a)||a.length<5?null:(a=a.slice(),f||d.sortByRank(a),b.each(a,function(e,f){if(-1===k||null===i)k=d.RANKS.indexOf(d.rank(e)),i=[e];else if(c=d.RANKS.indexOf(d.rank(e)),c===k);else if(c===k+1)k=c,i.push(e),h&&4===i.length&&"5"===d.rank(i[0])&&!function(){var c,e=d.RANKS.indexOf("A");b.each(a,function(a){return c=d.RANKS.indexOf(d.rank(a)),c===e?(i[4]=a,!1):c>e?!1:void 0},this)}();else{if(i.length>=5&&(j=i.slice(0,5),i=null,!g))return!1;if(a.length-f<4)return!1;k=c,i=[e]}},this),i&&i.length>=5&&(j=j?d.getBestCardsByRank({low:g,cards:[j,i]}):i),j?g?{cards:j.slice(j.length-5)}:{cards:j.slice(0,5)}:null)},d.findSets=function(){var a,c,e,f,g,h=arguments.length>0?arguments[0]:null,i=!1,j=0;if(b.isArray(h)?a=h:b.isObject(h)&&(a=h.cards,i=h.sorted===!0),!b.isArray(a)||a.length<5)return null;switch(a=a.slice(),i||d.sortByRank(a),c=function(a){for(var b,c,e=[],f=1,g=a.length;14>f;f++)for(b=[],c=0;g>c;c++)if(d.RANKS.indexOf(d.rank(a[c]))===f)b.push(a[c]),c===g-1&&e.push(b);else if(b.length>=1){e.push(b);break}return e}(a),e=[],f=[],c.sort(function(a,b){return Math.max(-1,Math.min(1,b.length-a.length))}),function(){var a,d,g=(c.length,0);b.each(c,function(b){4>g&&(d=b.length)>=2?(a=Math.min(d,5-g),e.push(b.slice(0,a)),j+=a,d-1>a&&f.push(b.slice(a)),g+=d):(f=f.length?f.concat(b):b,g+=b.length),g=Math.min(5,g)},this)}(),f.sort(d.compareCardsByRank),c[0].length){case 4:g=d.FOUR_OF_A_KIND;break;case 3:g=2===e.length?d.FULL_HOUSE:d.THREE_OF_A_KIND;break;case 2:g=2===e.length?d.TWO_PAIR:d.ONE_PAIR;break;default:g=d.HIGH_CARD}return e.length?{sets:e,kickers:f.slice(0,5-j),type:g}:null},d.getBestCardsByRank=function(){var a,c=arguments[0].hasOwnProperty("cards")?arguments[0].cards:Array.prototype.slice.call(arguments),e=arguments[0].hasOwnProperty("low")?arguments[0].low===!0:!1,f=e?d.isLower:d.isHigher;return b.each(c,function(c,d){var g;0===d?a=c.slice():(g=e?c.slice(Math.max(0,c.length-5)):c.slice(),b.each(g,function(b,c){return f(b,a[c])?(a=g,!1):void 0}))}),a},d.sortByRank=function(a){a.sort(d.compareCardsByRank)},d.isHigher=function(a,b){return d.compareCardsByRank(a,b)<0},d.isLower=function(a,b){return d.compareCardsByRank(a,b)>0},d.compareCardsByRank=function(a,b){var c=d.RANKS.indexOf(d.rank(a)),e=d.RANKS.indexOf(d.rank(b));return c-e},d.compareCardsBySuit=function(a,b){var c=d.SUITS.indexOf(d.suit(a)),e=d.SUITS.indexOf(d.suit(b));return c-e},d.compareSetSize=function(a,b){var c=a.length,d=b.length;return d-c},d.rank=function(a){return a.charAt(0)},d.suit=function(a){return a.charAt(1)},function(){var a=function(){var a=0;return function(){return"player-"+a++}}(),c={};e=function(d){return this instanceof e?(this.options=b.extend({id:a()},c,d||{}),void 0):new e(d)},e.prototype={}}(),function(){var a={};f=function(c){return this instanceof f?(this.options=b.extend({},a,c||{}),void 0):new f(c)},f.prototype={}}(),function(){var a={};g=function(c){return this instanceof g?(this.options=b.extend({},a,c||{}),void 0):new g(c)},g.prototype={}}(),function(){var a={};h=function(c){this.options=b.extend({},a,c||{})},h.prototype={}}(),function(){var c={};a=function(d){return this instanceof a?(this.options=b.extend({},c,d||{}),void 0):new a(d)},a.prototype={}}(),a.Deck=c,a.Hand=d,a.Player=e,a.Pot=f,a.Table=g,a.util=b,a});