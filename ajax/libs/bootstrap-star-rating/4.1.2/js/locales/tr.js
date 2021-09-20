/*!
 * Star Rating Turkish Translations
 * @author Oguz Külcü <grafikcoder@gmail.com>
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
    $.fn.ratingLocales['tr'] = {
        defaultCaption: '{rating} Yıldız',
        starCaptions: {
            0.5: 'Yarım Yıldız',
            1: 'Tek Yıldız',
            1.5: 'Bir Buçuk Yıldız',
            2: 'İki Yıldız',
            2.5: 'İki Buçuk Yıldız',
            3: 'Üç Yıldız',
            3.5: 'Üç Buçuk Yıldız',
            4: 'Dört Yıldız',
            4.5: 'Dört Buçuk Yıldız',
            5: 'Beş Yıldız'
        },
        clearButtonTitle: 'Temizle',
        clearCaption: 'Oylanmamış'
    };
}));
