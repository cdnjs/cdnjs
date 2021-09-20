/*!
 * Star Rating French Translations
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
    $.fn.ratingLocales['fr'] = {
        defaultCaption: '{rating} étoiles',
        starCaptions: {
            0.5: 'Une demi étoile',
            1: 'Une étoile',
            1.5: 'Une étoile et demi',
            2: 'Deux étoiles',
            2.5: 'Deux étoiles et demi',
            3: 'Trois étoiles',
            3.5: 'Trois étoiles et demi',
            4: 'Quatre étoiles',
            4.5: 'Quatre étoiles et demi',
            5: 'Cinq étoiles'
        },
        clearButtonTitle: 'Effacer',
        clearCaption: 'Non noté'
    };
}));
