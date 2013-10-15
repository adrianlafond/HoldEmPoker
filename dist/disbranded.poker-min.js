/*
 * poker-game-engine v0.0.1
 * by Adrian Lafond / adrian [at] disbranded.com
 * last updated 2013-10-14
**/
!function(a,b){"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():(a.DISBRANDED=a.DISBRANDED||{},a.DISBRANDED.Poker=b())}(this,function(){"use strict";var a,b,c,d,e,f,g,h,i;return function(){function a(a){return null===a}function c(a){return void 0===a}function d(b){return c(b)||a(b)}function e(a){return a===!0||a===!1}function f(a){return"[object String]"===Object.prototype.toString.call(a)}function g(a){return!isNaN(a)&&"[object Number]"===Object.prototype.toString.call(a)}function h(a){return g(a)&&parseFloat(a)===parseInt(a,10)}function i(a){return"[object Function]"===Object.prototype.toString.call(a)}function j(a){return"[object Array]"===Object.prototype.toString.call(a)}function k(a){return a===Object(a)&&"[object Object]"===Object.prototype.toString.call(a)}function l(){for(var a,b,c=1,d=arguments.length,e=arguments[0];d>c;c++){a=arguments[c];for(b in a)e[b]=a[b]}return e}function m(a){return j(a)?a.slice():l({},a)}function n(a,b){return Object.prototype.hasOwnProperty.call(a,b)}function o(a,b,c){var d,e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length===parseFloat(a.length)){for(d=0,e=a.length;e>d;d++)if(!b.call(c,a[d],d))return}else for(d in a)if(Object.prototype.hasOwnProperty.call(a,d)&&!b.call(c,a[d],d))return}b=function(){return{isNull:a,isUndefined:c,isNada:d,isBoolean:e,isNumber:g,isInteger:h,isString:f,isFunction:i,isArray:j,isObject:k,extend:l,clone:m,has:n,each:o}}()}(),function(){c=function(a){this.value=a.value,this.rank=this.value.charAt(0),this.suit=this.value.charAt(1),this.face=a.face===c.FACE_UP?c.FACE_UP:c.FACE_DOWN,this.community=!1},c.FACE_DOWN=0,c.FACE_UP=1,c.COMMUNITY=2}(),function(){var a=["2C","3C","4C","5C","6C","7C","8C","9C","TC","JC","QC","KC","AC","2D","3D","4D","5D","6D","7D","8D","9D","TD","JD","QD","KD","AD","2H","3H","4H","5H","6H","7H","8H","9H","TH","JH","QH","KH","AH","2S","3S","4S","5S","6S","7S","8S","9S","TS","JS","QS","KS","AS"],e=a.length,f=4;d=function(a){this.isShuffled=!1,this.isNew=!0,this.jokers=0,"object"==typeof a&&this.addJokers(parseInt(a.hasOwnProperty("jokers")?a.jokers:0,10)),this.reset()},d.prototype={cards:function(){return this.cardsIn.slice()},count:function(){return e+this.jokers},removeJokers:function(){return this.jokers=0,this.reset(),this},addJokers:function(a){return a=parseInt(a,10),isNaN(a)||(a=Math.max(0,Math.min(a,f-this.jokers)),this.jokers+=a,this.reset()),this},reset:function(){var d=0;for(this.cardsIn=[],this.cardsOut=[],b.each(a,function(a,b){this.cardsIn[b]=new c({value:a})},this);d<this.jokers;d++)this.cardsIn[e+d]=new c({value:"W"+(d+1)});return b.each(this.cardsIn,function(a){a.face=c.FACE_DOWN,a.community=!1}),this.isShuffled=!1,this.isNew=!0,this},shuffle:function(){var a,b,c;for(this.reset(),a=this.cardsIn.slice(),this.cardsIn=[];(b=a.length)>0;)c=Math.floor(Math.random()*b),this.cardsIn.push(a.splice(c,1));return this.isShuffled=!0,this.isNew=!1,this},deal:function(){var a=null;return this.cardsIn.length>0&&(a=this.cardsIn.pop(),this.cardsOut.push(a),this.isNew=!1),a}}}(),function(){var a=function(){var a=0;return function(){return"hand-"+a++}}(),c={high:!0,low:!1};e=function(d){this.options=b.extend({id:a()},c,d||{}),this.reset(),this.options.cards&&(this.add(this.options.cards),delete this.options.cards)}}(),e.ROYAL_FLUSH=10,e.STRAIGHT_FLUSH=9,e.FOUR_OF_A_KIND=8,e.FULL_HOUSE=7,e.FLUSH=6,e.STRAIGHT=5,e.THREE_OF_A_KIND=4,e.TWO_PAIR=3,e.ONE_PAIR=2,e.HIGH_CARD=1,e.ACE_TO_FIVE_LOW=1,e.ACE_TO_SIX_LOW=2,e.DEUCE_TO_SEVEN_LOW=3,e.DEUCE_TO_SIX_LOW=4,e.BETTER=-1,e.WORSE=1,e.EVEN=0,e.RANKS="WAKQJT98765432",e.SUITS="SHDC",e.prototype={reset:function(){return this.configLow(),this.cards=[],this.rank=0,this.cardsHigh=[],this.cardsLow=[],this},has:function(a){var c=!1;return b.each(this.cards,function(b){return b===a?(c=!0,!1):void 0}),c},add:function(){var a=Array.prototype.slice.call(arguments);return b.each(a,function(a){b.isString(a)?this.has(a)||(this.cards[this.cards.length]=a,this.updateRank()):b.isArray(a)&&this.add.apply(this,a)},this),this},get:function(a){return b.has(this.cards,a)?this.cards[a]:null},set:function(a,c){return a=parseInt(a,10),b.isNumber(a)&&(a=Math.max(0,Math.min(this.cards.length,a)),this.cards[a]=c,this.updateRank()),this},updateRank:function(){var a;this.cards.length>=5&&(a=this.sortedCardsCopy(),this.options.high&&this.updateHigh(a),this.options.low&&this.updateLow(a))},sortedCardsCopy:function(){var a=this.cards.slice(0);return e.sortByRank(a),a},updateHigh:function(a){var b=null;if(this.rank=0,a=a||this.sortedCardsCopy(),a.length>=5){if((b=e.findFlush({cards:a,sorted:!0,all:!0}))&&(this.rank=e.FLUSH,this.cardsHigh=b.cards,b=e.findStraightFlush({cards:this.cardsHigh,sorted:!0,flush:!0,acesAreLow:this.acesAreLow})))return this.rank=b.royalFlush?e.ROYAL_FLUSH:e.STRAIGHT_FLUSH,this.cardsHigh=b.cards,void 0;if(this.rank<e.STRAIGHT&&(b=e.findStraight({cards:a,sorted:!0,acesAreLow:this.acesAreLow}),b&&(this.rank=e.STRAIGHT,this.cardsHigh=b.cards)),b=e.findSets({cards:a,sorted:!0})){if(b.type>this.rank)switch(this.rank=b.type,this.rank){case e.FOUR_OF_A_KIND:this.cardsHigh=b.sets[0].concat(b.kickers);break;case e.FULL_HOUSE:this.cardsHigh=b.sets[0].concat(b.sets[1]);break;case e.THREE_OF_A_KIND:this.cardsHigh=b.sets[0].concat(b.kickers);break;case e.TWO_PAIR:this.cardsHigh=b.sets[0].concat(b.sets[1],b.kickers);break;case e.ONE_PAIR:this.cardsHigh=b.sets[0].concat(b.kickers);break;default:this.cardsHigh=[].concat(b.kickers)}}else this.rank<e.HIGH_CARD&&(this.rank=e.HIGH_CARD,this.cardsHigh=a.slice(0,5))}else this.cardsHigh=[]},updateLow:function(a){var b,c,d;if(this.rankLow=0,a=a?a.slice():this.sortedCardsCopy(),this.cards.length>=5){for(this.acesAreLow&&"A"===e.rank(a[0])&&a.push(a.shift()),d=[],c=0,b=a.length-1;b>=0;b--)if((0===c||e.rank(d[c-1])!==e.rank(a[b]))&&(d[c++]=a[b],5===d.length))if(!this.ignoreFlushes&&e.findFlush(d))d=d.slice(0,4),c=4;else{if(this.ignoreStraights||!e.findStraight(d)){this.cardsLow=d;break}d=d.slice(0,4),c=4}}else this.cardsLow=[]},compareHighest:function(a){var b,c;if(this.rank>a.rank)return-1;if(this.rank<a.rank)return 1;if(this.cardsHigh.length&&a.cardsHigh.length)for(b=0;5>b;b++)if(c=e.compareCardsByRank(this.cardsHigh[b],a.cardsHigh[b]),0!==c)return c;return 0},compareLowest:function(a){var b,c,d,f=this.cardsLow.length,g=a.cardsLow.length;if(5>f&&5>g)return 0;if(5>f&&g>=5)return 1;if(f>=5&&5>g)return-1;for(b=4;b>=0;b--){if(c=e.RANKS.indexOf(e.rank(this.cardsLow[b])),d=e.RANKS.indexOf(e.rank(a.cardsLow[b])),d>c)return 1;if(c>d)return-1}return 0},configLow:function(){switch(this.options.low===!0&&(this.options.low=e.ACE_TO_FIVE_LOW),this.options.low){case e.ACE_TO_FIVE_LOW:this.acesAreLow=!0,this.ignoreStraights=!0,this.ignoreFlushes=!0;break;case e.ACE_TO_SIX_LOW:this.acesAreLow=!0,this.ignoreStraights=!1,this.ignoreFlushes=!1;break;case e.DEUCE_TO_SEVEN_LOW:this.acesAreLow=!1,this.ignoreStraights=!1,this.ignoreFlushes=!1;break;case e.DEUCE_TO_SIX_LOW:this.acesAreLow=!1,this.ignoreStraights=!0,this.ignoreFlushes=!0;break;default:this.acesAreLow=!0,this.ignoreStraights=!0,this.ignoreFlushes=!0,this.options.low=0}}},e.findFlush=function(){var a,c,d,f,g,h=arguments.length>0?arguments[0]:null,i=null,j=!1,k=!1,l=!1,m=null;if(b.isArray(h)?i=h:b.isObject(h)&&(i=h.cards,j=h.sorted===!0,k=h.low===!0,l=h.all===!0),!b.isArray(i)||i.length<5)return null;for(i=i.slice(0),j||e.sortByRank(i),a=0;4>a;a++)c=e.SUITS.charAt(a),f=[],d=0,b.each(i,function(a){e.suit(a)===c&&(f[d++]=a)}),g=f.length,g>=5&&(null===m?m=k?f.slice(g-5):f.slice(0,l?g:5):(f=k?f.slice(f.length-5):f.slice(0,l?g:5),m=k?e.getBestCardsByRank({low:!0,cards:[f,m]}):e.getBestCardsByRank(f,m)));return m?{cards:m}:null},e.findStraightFlush=function(){var a,c,d=arguments.length>0?arguments[0]:null,f=!1,g=!1,h=!1,i=!0;if(b.isArray(d)?a=d:b.isObject(d)&&(a=d.cards,f=d.flush===!0,g=d.sorted===!0,h=d.low===!0,i=!(d.acesAreLow===!1)),!b.isArray(a)||a.length<5)return null;if(a=a.slice(0),g||e.sortByRank(a),!f){if(c=e.findFlush({cards:a,sorted:g,low:h,acesAreLow:i}),!c)return null;a=c.cards}return c=e.findStraight({cards:a,sorted:g,low:h,acesAreLow:i}),c?(c.royalFlush="A"===e.rank(c.cards[0]),c):null},e.findStraight=function(){var a,c,d=arguments.length>0?arguments[0]:null,f=!1,g=!1,h=!0,i=null,j=null,k=-1;return b.isArray(d)?a=d:b.isObject(d)&&(a=d.cards,f=d.sorted===!0,g=d.low===!0,h=!(d.acesAreLow===!1)),!b.isArray(a)||a.length<5?null:(a=a.slice(),f||e.sortByRank(a),b.each(a,function(d,f){if(-1===k||null===i)k=e.RANKS.indexOf(e.rank(d)),i=[d];else if(c=e.RANKS.indexOf(e.rank(d)),c===k);else if(c===k+1)k=c,i.push(d),h&&4===i.length&&"5"===e.rank(i[0])&&!function(){var c,d=e.RANKS.indexOf("A");b.each(a,function(a){return c=e.RANKS.indexOf(e.rank(a)),c===d?(i[4]=a,!1):c>d?!1:void 0},this)}();else{if(i.length>=5&&(j=i.slice(0,5),i=null,!g))return!1;if(a.length-f<4)return!1;k=c,i=[d]}},this),i&&i.length>=5&&(j=j?e.getBestCardsByRank({low:g,cards:[j,i]}):i),j?g?{cards:j.slice(j.length-5)}:{cards:j.slice(0,5)}:null)},e.findSets=function(){var a,c,d,f,g,h=arguments.length>0?arguments[0]:null,i=!1,j=0;if(b.isArray(h)?a=h:b.isObject(h)&&(a=h.cards,i=h.sorted===!0),!b.isArray(a)||a.length<5)return null;switch(a=a.slice(),i||e.sortByRank(a),c=function(a){for(var b,c,d=[],f=1,g=a.length;14>f;f++)for(b=[],c=0;g>c;c++)if(e.RANKS.indexOf(e.rank(a[c]))===f)b.push(a[c]),c===g-1&&d.push(b);else if(b.length>=1){d.push(b);break}return d}(a),d=[],f=[],c.sort(function(a,b){return Math.max(-1,Math.min(1,b.length-a.length))}),function(){var a,e,g=(c.length,0);b.each(c,function(b){4>g&&(e=b.length)>=2?(a=Math.min(e,5-g),d.push(b.slice(0,a)),j+=a,e-1>a&&f.push(b.slice(a)),g+=e):(f=f.length?f.concat(b):b,g+=b.length),g=Math.min(5,g)},this)}(),f.sort(e.compareCardsByRank),c[0].length){case 4:g=e.FOUR_OF_A_KIND;break;case 3:g=2===d.length?e.FULL_HOUSE:e.THREE_OF_A_KIND;break;case 2:g=2===d.length?e.TWO_PAIR:e.ONE_PAIR;break;default:g=e.HIGH_CARD}return d.length?{sets:d,kickers:f.slice(0,5-j),type:g}:null},e.getBestCardsByRank=function(){var a,c=arguments[0].hasOwnProperty("cards")?arguments[0].cards:Array.prototype.slice.call(arguments),d=arguments[0].hasOwnProperty("low")?arguments[0].low===!0:!1,f=d?e.isLower:e.isHigher;return b.each(c,function(c,e){var g;0===e?a=c.slice():(g=d?c.slice(Math.max(0,c.length-5)):c.slice(),b.each(g,function(b,c){return f(b,a[c])?(a=g,!1):void 0}))}),a},e.sortByRank=function(a){a.sort(e.compareCardsByRank)},e.isHigher=function(a,b){return e.compareCardsByRank(a,b)<0},e.isLower=function(a,b){return e.compareCardsByRank(a,b)>0},e.compareCardsByRank=function(a,b){var c=e.RANKS.indexOf(e.rank(a)),d=e.RANKS.indexOf(e.rank(b));return c-d},e.compareCardsBySuit=function(a,b){var c=e.SUITS.indexOf(e.suit(a)),d=e.SUITS.indexOf(e.suit(b));return c-d},e.compareSetSize=function(a,b){var c=a.length,d=b.length;return d-c},e.rank=function(a){return a.charAt(0)},e.suit=function(a){return a.charAt(1)},function(){var a=function(){var a=0;return function(){return"player-"+a++}}(),c={},d="up";f=function(d){this.options=b.extend({id:a()},c,d||{}),this.folded=!1,this.chips=0,this.bet=0,this.hand=new e,this.cardsUp=[],this.cardsDn=[]},f.prototype={addCard:function(a){this.hand.add(a.card),(a.face=d)?this.cardsUp.push(a.card):this.cardsDn.push(a.card)},removeCards:function(){}},f.FOLD=1,f.BET=2,f.CALL=3,f.RAISE=4}(),function(){var a={};g=function(c){this.options=b.extend({},a,c||{})},g.prototype={}}(),function(){var a={};h=function(c){this.options=b.extend({},a,c||{})},h.prototype={}}(),function(){var a={};i=function(c){this.options=b.extend({},a,c||{})},i.prototype={}}(),function(){var c={};a=function(d){return this instanceof a?(this.options=b.extend({},c,d||{}),void 0):new a(d)},a.prototype={}}(),a.Card=c,a.Deck=d,a.Hand=e,a.Player=f,a.Pot=g,a.Table=h,a.Dealer=i,a.util=b,a});