/*!
 * Star Rating Russian Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 *
 * @see http://github.com/kartik-v/bootstrap-star-rating
 * @author Kartik Visweswaran <kartikv2@gmail.com>
 * @author Ivan Zhuravlev.
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
