/*global define, jQuery, tinysort*/
/**
 * jQuery plugin wrapper for TinySort
 * Does not use the first argument in tinysort.js since that is handled internally by the jQuery selector.
 * Sub-selections (option.selector) do not use the jQuery selector syntax but regular CSS3 selector syntax.
 * @summary jQuery plugin wrapper for TinySort
 * @version 3.1.4
 * @requires tinysort
 * @license MIT/GPL
 * @author Ron Valstar (http://www.ronvalstar.nl/)
 * @copyright Ron Valstar <ron@ronvalstar.nl>
 */
(function (factory) {
  typeof define==='function'&&define.amd
      ?define(['jquery','tinysort'],factory)
      :jQuery&&!jQuery.fn.tsort&&factory(jQuery,tinysort)
}(($,tinysort)=>{
  $.tinysort = { defaults: tinysort.defaults	}
  $.fn.extend({
    tinysort: function(...arg){
      const sortedList = tinysort(this,...arg)
      const numSorted = sortedList.length
      for (let i=0,l=this.length;i<l;i++) {
        if (i<numSorted) this[i] = sortedList[i]
        else delete this[i]
      }
      this.length = numSorted
      return this
    }
  })
  $.fn.tsort = $.fn.tinysort
}))