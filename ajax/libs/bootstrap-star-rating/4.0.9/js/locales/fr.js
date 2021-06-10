/*!
 * Star Rating French Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 *
 * @see http://github.com/kartik-v/bootstrap-star-rating
 * @author Kartik Visweswaran <kartikv2@gmail.com>
 */
(function ($) {
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
})(window.jQuery);
