/*!
 * Star Rating Bengali Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 *
 * bootstrap-star-rating v4.1.2
 * http://plugins.krajee.com/star-rating
 *
 * Copyright: 2013 - 2021, Kartik Visweswaran, Krajee.com
 *
 * Licensed under the BSD 3-Clause
 * https://github.com/kartik-v/bootstrap-star-rating/blob/master/LICENSE.md
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') { 
        factory(require('jquery'));
    } else { 
        factory(window.jQuery);
    }
}(function ($) {
    "use strict";
    $.fn.ratingLocales['bn'] = {
        defaultCaption: '{rating} তারা',
        starCaptions: {
            0.5: 'অর্ধেক তারা',
            1: 'এক তারা',
            1.5: 'দেড় তারা',
            2: 'দুই তারা',
            2.5: 'আড়াই তারা',
            3: 'তিন তারা',
            3.5: 'সাড়ে তিন তারা',
            4: 'চার তারা',
            4.5: 'সাড়ে চার তারা',
            5: 'পাঁচ তারা'
        },
        clearButtonTitle: 'মুছে ফেলুন',
        clearCaption: 'কোন তারা নেই'
    };
}));
