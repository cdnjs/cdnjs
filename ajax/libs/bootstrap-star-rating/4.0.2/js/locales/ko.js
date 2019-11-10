/*!
 * Star Rating <LANG> Translations
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
    $.fn.ratingLocales['ko'] = {
        defaultCaption: '{rating} 별점',
        starCaptions: {
            0.5: '0.5 점',
            1: '1 점',
            1.5: '1.5 점',
            2: '2 점',
            2.5: '2.5 점',
            3: '3 점',
            3.5: '3.5 점',
            4: '4 점',
            4.5: '4.5 점',
            5: '5 점'
        },
        clearButtonTitle: '초기화',
        clearCaption: '평점 없음'
    };
})(window.jQuery);
