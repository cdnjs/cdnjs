/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('paginator-url', function (Y, NAME) {

/**
 Adds in URL options for paginator links.

 @module paginator
 @submodule paginator-url
 @class Paginator.Url
 @since 3.10.0
 */

function PaginatorUrl () {}

PaginatorUrl.ATTRS = {
    /**
    URL to return formatted with the page number. URL uses `Y.Lang.sub` for page number stubstitutions.

    For example, if the page number is `3`, setting the `pageUrl` to `"?pg={page}"`, will result in `?pg=3`

    @attribute pageUrl
    @type String
    **/
    pageUrl: {}
};

PaginatorUrl.prototype = {
    /**
     Returns a formated URL for the previous page.
     @method prevPageUrl
     @return {String | null} Formatted URL for the previous page, or `null` if there is no previous page.
     */
    prevPageUrl: function () {
        return (this.hasPrevPage() && this.formatPageUrl(this.get('page') - 1)) || null;
    },

    /**
     Returns a formated URL for the next page.
     @method nextPageUrl
     @return {String | null} Formatted URL for the next page or `null` if there is no next page.
     */
    nextPageUrl: function () {
        return (this.hasNextPage() && this.formatPageUrl(this.get('page') + 1)) || null;
    },

    /**
     Returns a formated URL for the provided page number.
     @method formatPageUrl
     @param {Number} [page] Page value to be used in the formatted URL. If empty, page will be the value of the `page` ATTRS.
     @return {String | null} Formatted URL for the page or `null` if there is not a `pageUrl` set.
     */
    formatPageUrl: function (page) {
        var pageUrl = this.get('pageUrl');
        if (pageUrl) {
            return Y.Lang.sub(pageUrl, {
                page: page || this.get('page')
            });
        }
        return null;
    }
};

Y.namespace('Paginator').Url = PaginatorUrl;

Y.Base.mix(Y.Paginator, [PaginatorUrl]);


}, '3.16.0', {"requires": ["paginator"]});
