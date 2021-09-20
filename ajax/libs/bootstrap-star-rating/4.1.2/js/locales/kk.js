/*!
 * Star Rating Kazakh Translations
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
    $.fn.ratingLocales['kk'] = {
        defaultCaption: '{rating} Жұлдыз',
        starCaptions: {
            0.5: 'Жарты жұлдыз',
            1: 'Бір жұлдыз',
            1.5: 'Бір жарым жұлдыз',
            2: 'Екі жұлдыз',
            2.5: 'Екі жарым жұлдыз',
            3: 'Үш жұлдыз',
            3.5: 'Үш жарым жұлдыз',
            4: 'Төрт жұлдыз',
            4.5: 'Төрт жарым жұлдыз',
            5: 'Бес жұлдыз'
        },
        clearButtonTitle: 'Өшіру',
        clearCaption: 'Рейтингсіз'
    };
}));
