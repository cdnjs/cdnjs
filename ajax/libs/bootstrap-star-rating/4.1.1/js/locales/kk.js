/*!
 * Star Rating Kazakh Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 *
 * @see http://github.com/kartik-v/bootstrap-star-rating
 * @author Kartik Visweswaran <kartikv2@gmail.com>
 * @author Zhandos Ulan.
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
