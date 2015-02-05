/*
YUI 3.17.0 (build ce55cc9)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('paginator-core', function (Y, NAME) {

/**
 Paginator's core functionality consists of keeping track of the current page
 being displayed and providing information for previous and next pages.

 @module paginator
 @submodule paginator-core
 @since 3.11.0
 */

/**
 _API docs for this extension are included in the Paginator class._

 Class extension providing the core API and structure for the Paginator module.

 Use this class extension with Widget or another Base-based superclass to
 create the basic Paginator model API and composing class structure.

 @class Paginator.Core
 @for Paginator
 @since 3.11.0
 */

var PaginatorCore = Y.namespace('Paginator').Core = function () {};

PaginatorCore.ATTRS = {
    /**
     Current page count. First page is 1.

     @attribute page
     @type Number
     @default 1
     **/
    page: {
        value: 1
    },

    /**
     Total number of pages to display

     @readOnly
     @attribute totalPages
     @type Number
     **/
    totalPages: {
        readOnly: true,
        getter: '_getTotalPagesFn'
    },

    /**
     Maximum number of items per page. A value of negative one (-1) indicates
         all items on one page.

     @attribute itemsPerPage
     @type Number
     @default 10
     **/
    itemsPerPage: {
        value: 10
    },

    /**
     Total number of items in all pages.

     @attribute totalItems
     @type Number
     @default 0
     **/
    totalItems: {
        value: 0
    }
};

Y.mix(PaginatorCore.prototype, {
    /**
     Sets the page to the previous page in the set, if there is a previous page.
     @method prevPage
     @chainable
     */
    prevPage: function () {
        if (this.hasPrevPage()) {
            this.set('page', this.get('page') - 1);
        }

        return this;
    },

    /**
     Sets the page to the next page in the set, if there is a next page.

     @method nextPage
     @chainable
     */
    nextPage: function () {
        if (this.hasNextPage()) {
            this.set('page', this.get('page') + 1);
        }

        return this;
    },

    /**
     Returns True if there is a previous page in the set.

     @method hasPrevPage
     @return {Boolean} `true` if there is a previous page, `false` otherwise.
     */
    hasPrevPage: function () {
        return this.get('page') > 1;
    },

    /**
     Returns True if there is a next page in the set.

     If totalItems isn't set, assume there is always next page.

     @method hasNextPage
     @return {Boolean} `true` if there is a next page, `false` otherwise.
     */
    hasNextPage: function () {
        return (!this.get('totalItems') || this.get('page') < this.get('totalPages'));
    },


    //--- P R O T E C T E D

    /**
     Returns the total number of pages based on the total number of
       items provided and the number of items per page

     @protected
     @method _getTotalPagesFn
     @return {Number} Total number of pages based on total number of items and
       items per page or one if itemsPerPage is less than one
     */
    _getTotalPagesFn: function () {
        var itemsPerPage = this.get('itemsPerPage');

        return (itemsPerPage < 1) ? 1 : Math.ceil(this.get('totalItems') / itemsPerPage);
    }
});



}, '3.17.0', {"requires": ["base"]});
