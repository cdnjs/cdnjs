/*!
 * Star Rating Portugese Brazilian Translations
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
    $.fn.ratingLocales['pt-BR'] = {
        defaultCaption: '{rating} Estrelas',
        starCaptions: {
            0.5: 'Meia Estrela',
            1: 'Uma Estrela',
            1.5: 'Uma Estrela e Meia',
            2: 'Duas Estrelas',
            2.5: 'Duas Estrelas e Meia',
            3: 'Três Estrelas',
            3.5: 'Três Estrelas e Meia',
            4: 'Quatro Estrelas',
            4.5: 'Quatro Estrelas e Meia',
            5: 'Cinco Estrelas'
        },
        clearButtonTitle: 'Limpar',
        clearCaption: 'Não Avaliado'
    };
}));
