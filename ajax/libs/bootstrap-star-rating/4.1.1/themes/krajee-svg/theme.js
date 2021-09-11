/*!
 * Krajee SVG Theme Configuration for bootstrap-star-rating.
 * This file must be loaded after 'star-rating.js'.
 *
 * @see http://github.com/kartik-v/bootstrap-star-rating
 * @author Kartik Visweswaran <kartikv2@gmail.com>
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'window', 'document'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') { 
        factory(require('jquery'), window, document);
    } else { 
        factory(window.jQuery, window, document);
    }
}(function ($, window, document, undefined) {
    "use strict";
    $.fn.ratingThemes['krajee-svg'] = {
        filledStar: '<span class="krajee-icon krajee-icon-star"></span>',
        emptyStar: '<span class="krajee-icon krajee-icon-star"></span>',
        clearButton: '<span class="krajee-icon-clear"></span>'
    };
}));
