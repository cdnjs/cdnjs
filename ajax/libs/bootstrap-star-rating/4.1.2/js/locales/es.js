/*!
 * Star Rating Spanish Translations
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
    $.fn.ratingLocales.es = {
        defaultCaption: '{rating} Estrellas',
        starCaptions: {
            0.5: 'Media Estrella',
            1: 'Una Estrella',
            1.5: 'Una Estrella y Media',
            2: 'Dos Estrellas',
            2.5: 'Dos Estrellas y Media',
            3: 'Tres Estrellas',
            3.5: 'Tres Estrellas y Media',
            4: 'Cuatro Estrellas',
            4.5: 'Cuatro Estrellas y Media',
            5: 'Cinco Estrellas'
        },
        clearButtonTitle: 'Limpiar',
        clearCaption: 'Sin Calificar'
    };
}));