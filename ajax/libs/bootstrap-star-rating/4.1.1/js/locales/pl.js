/*!
 * Star Rating Polish Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * NOTE: this file must be saved in UTF-8 encoding.
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
    $.fn.ratingLocales['pl'] = {
        defaultCaption: '{rating} Gwiazdek',
        starCaptions: {
            0.5: 'Pół Gwiazdki',
            1: 'Jedna Gwiazdka',
            1.5: 'Półtora Gwiazdek',
            2: 'Dwie Gwiazdki',
            2.5: 'Dwa i pół Gwiazdek',
            3: 'Trzy Gwiazdki',
            3.5: 'Trzy i pół Gwiazdek',
            4: 'Cztery Gwiazdki',
            4.5: 'Cztery i pół Gwiazdek',
            5: 'Pięć Gwiazdek'
        },
        clearButtonTitle: 'Powrót',
        clearCaption: 'Nie Oceniać'
    };
}));
