/*!
 * Star Rating Russian Translations
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
    $.fn.ratingLocales['ru'] = {
        defaultCaption: '{rating} Звёзды',
        starCaptions: {
            0.5: 'Половина звезды',
            1: 'Одна звезда',
            1.5: 'Полторы звезды',
            2: 'Две звезды',
            2.5: 'Две с половиной звезды',
            3: 'Три звезды',
            3.5: 'Три с половиной звезды',
            4: 'Четыре звезды',
            4.5: 'Четыре с половиной звезды',
            5: 'Пять звёзд'
        },
        clearButtonTitle: 'Очистить',
        clearCaption: 'Без рейтинга'
    };
}));
