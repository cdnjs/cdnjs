/*!
 * Star Rating German Translations
 *
 * This file must be loaded after 'fileinput.js'. Patterns in braces '{}', or
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
            0.5: 'Halb Stern',
            1: 'Eins Stern',
            1.5: 'Eins & Halb Stern',
            2: 'Zwei Sterne',
            2.5: 'Zwei & Halb Sterne',
            3: 'Drei Sterne',
            3.5: 'Drei & Halb Sterne',
            4: 'Vier Sterne',
            4.5: 'Vier & Halb Sterne',
            5: 'Fünf Sterne'
        },
        clearButtonTitle: 'Klar',
        clearCaption: 'Nicht Bewertet'
    };
})(window.jQuery);
