/**
 * jQuery plugin wrapper for TinySort
 * Does not use the first argument in tinysort.js since that is handled internally by the jQuery selector.
 * Sub-selections (option.selector) do not use the jQuery selector syntax but regular CSS3 selector syntax.
 * @summary jQuery plugin wrapper for TinySort
 * @version 2.3.6
 * @requires tinysort
 * @license MIT/GPL
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","tinysort"],t):jQuery&&!jQuery.fn.tsort&&t(jQuery,tinysort)}(function(t,n){"use strict";t.tinysort={defaults:n.defaults},t.fn.extend({tinysort:function(){var t,e,i=Array.prototype.slice.call(arguments);i.unshift(this),t=n.apply(null,i),e=t.length;for(var r=0,s=this.length;s>r;r++)e>r?this[r]=t[r]:delete this[r];return this.length=e,this}}),t.fn.tsort=t.fn.tinysort});