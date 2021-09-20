/*!
 * Star Rating Ukranian Translations
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
    $.fn.ratingLocales['ua'] = {
        defaultCaption: '{rating} Зірки',
        starCaptions: {
            0.5: 'Пів зірки',
            1: 'Одна зірка',
            1.5: 'Півтори зірки',
            2: 'Дві зірки',
            2.5: 'Дві з половиною зірки',
            3: 'Три зірки',
            3.5: 'Три з половиною зірки',
            4: 'Чотири зірки',
            4.5: 'Чотири з половиною зірки',
            5: 'П\'ять зірок'
        },
        clearButtonTitle: 'Очистити',
        clearCaption: 'Без рейтингу'
    };
}));
