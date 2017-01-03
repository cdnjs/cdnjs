/**
 * This class encapsulates a _collection_ of DOM elements, providing methods to filter members, or to perform collective
 * actions upon the whole set.
 *
 * Although they are not listed, this class supports all of the methods of {@link Ext.dom.Element}. The methods from
 * these classes will be performed on all the elements in this collection.
 *
 * All methods return _this_ and can be chained.
 *
 * Usage:
 *
 *      var els = Ext.select("#some-el div.some-class", true);
 *      // or select directly from an existing element
 *      var el = Ext.get('some-el');
 *      el.select('div.some-class', true);
 *
 *      els.setWidth(100); // all elements become 100 width
 *      els.hide(true); // all elements fade out and hide
 *      // or
 *      els.setWidth(100).hide(true);
 */
Ext.define('Ext.dom.CompositeElement', {
    alternateClassName: 'Ext.CompositeElement',

    extend: 'Ext.dom.CompositeElementLite',

    isLite: false,

    // @private
    getElement: function(el) {
        // In this case just return it, since we already have a reference to it
        return el;
    },

    // @private
    transformElement: function(el) {
        return Ext.get(el);
    }

});
