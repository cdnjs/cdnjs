/*!
 * Star Rating Italian Translations
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
