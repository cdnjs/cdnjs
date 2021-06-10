/*!
 * Star Rating Dutch Translations
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
    $.fn.ratingLocales['<LANG>'] = {
        defaultCaption: '{rating} Sterren',
        starCaptions: {
            0.5: 'halve ster',
            1: 'Één ster',
            1.5: 'Anderhalve ster',
            2: 'Twee sterren',
            2.5: 'Twee en een half sterren',
            3: 'Drie sterren',
            3.5: 'Drie en een half sterren',
            4: 'Vier sterren',
            4.5: 'Vier en een half sterren',
            5: 'Vijf sterren'
        },
        clearButtonTitle: 'Wissen',
        clearCaption: 'Niet beoordeeld'
    };
})(window.jQuery);
