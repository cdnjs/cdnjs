/*!
 * Star Rating Italian Translations
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
    $.fn.ratingLocales['it'] = {
        defaultCaption: '{rating} Stelle',
        starCaptions: {
            0.5: 'Mezza Stella',
            1: 'Una Stella',
            1.5: 'Una Stella & Mezzo',
            2: 'Due Stelle',
            2.5: 'Due Stelle & Mezzo',
            3: 'Tre Stelle',
            3.5: 'Tre Stelle & Mezzo',
            4: 'Quattro Stelle',
            4.5: 'Quattro Stelle & Mezzo',
            5: 'Cinque Stelle'
        },
        clearButtonTitle: 'Rimuovi',
        clearCaption: 'Nessuna valutazione'
    };
}));
