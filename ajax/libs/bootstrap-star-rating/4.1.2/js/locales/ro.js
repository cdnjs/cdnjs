/*!
 * Star Rating Romanian Translations
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
