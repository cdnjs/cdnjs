/*!
 * Star Rating German Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * @see http://github.com/kartik-v/bootstrap-star-rating
 * @author Kartik Visweswaran <kartikv2@gmail.com>
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 */
(function ($) {
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
        clearButtonTitle: 'Zuücksetzen',
        clearCaption: 'Nicht Bewertet'
    };
})(window.jQuery);
