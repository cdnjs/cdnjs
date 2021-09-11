/*!
 * Star Rating Romanian Translations
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
    $.fn.ratingLocales['ro'] = {
        defaultCaption: '{rating} stele',
        starCaptions: {
            0.5: 'Jumatate de stea',
            1: 'O Stea',
            1.5: 'O stea si jumatate',
            2: 'Doua stele',
            2.5: 'Doua stele si jumatate',
            3: 'Trei stele',
            3.5: 'Trei stele si jumatate',
            4: 'Patru stele',
            4.5: 'Patru stele si jumatate',
            5: 'Cinci stele'
        },
        clearButtonTitle: 'Sterge',
        clearCaption: 'Fara vot'
    };
}));
