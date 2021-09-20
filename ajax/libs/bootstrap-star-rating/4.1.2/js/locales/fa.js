/*!
 * Star Rating Persian / Farsi Translations 
 * @author Bt Saeed Sajadi (http://saeedsajadi.ir) 
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
    $.fn.ratingLocales['fa'] = {
        defaultCaption: '{rating} ستاره',
        starCaptions: {
            0.5: 'نیم ستاره',
            1: 'یک ستاره',
            1.5: 'یک و نیم ستاره',
            2: 'دو ستاره',
            2.5: 'دو و نیم ستاره',
            3: 'سه ستاره',
            3.5: 'سه و نیم ستاره',
            4: 'چهار ستاره',
            4.5: 'چهار ستاره',
            5: 'پنج ستاره'
        },
        clearButtonTitle: 'پاک کردن',
        clearCaption: 'بدون رای'
    };
}));
