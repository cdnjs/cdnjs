/*!
 * Krajee Font Awesome Theme configuration for bootstrap-star-rating.
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
    $.fn.ratingThemes['krajee-fa'] = {
        filledStar: '<i class="fa fa-star"></i>',
        emptyStar: '<i class="fa fa-star-o"></i>',
        clearButton: '<i class="fa fa-lg fa-minus-circle"></i>'
    };
}));
