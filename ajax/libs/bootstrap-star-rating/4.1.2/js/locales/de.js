/*!
 * Star Rating German Translations
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
    $.fn.ratingLocales['de'] = {
        defaultCaption: '{rating} Sterne',
        starCaptions: {
            0.5: 'Halber Stern',
            1: 'Ein Stern',
            1.5: 'Eineinhalb Sterne',
            2: 'Zwei Sterne',
            2.5: 'Zweieinhalb Sterne',
            3: 'Drei Sterne',
            3.5: 'Dreieinhalb Sterne',
            4: 'Vier Sterne',
            4.5: 'Viereinhalb Sterne',
            5: 'Fünf Sterne'
        },
        clearButtonTitle: 'Zurücksetzen',
        clearCaption: 'Nicht bewertet'
    };
}));
