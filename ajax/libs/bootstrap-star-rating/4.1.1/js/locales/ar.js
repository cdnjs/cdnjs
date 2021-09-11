/*!
 * Star Rating Arabic Translation By Abdulrahman Zaiter
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
    $.fn.ratingLocales['ar'] = {
        defaultCaption: '{rating} نجوم',
        starCaptions: {
            0.5: 'نصف نجمة',
            1: 'نجمة واحدة',
            1.5: 'نجمة ونصف',
            2: 'نجمتين',
            2.5: 'نجمتين ونصف',
            3: 'ثلاث نجمات',
            3.5: 'ثلاث نجمات ونصف',
            4: 'أربع نجمات',
            4.5: 'أربع نجمات ونصف',
            5: 'خمسة نجمات'
        },
        clearButtonTitle: 'مسح',
        clearCaption: 'غير مصنّف'
    };
}));
