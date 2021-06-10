/*!
 * Star Rating Chinese Translations
 *
 * This file must be loaded after 'star-rating.js'. Patterns in braces '{}', or
 * any HTML markup tags in the messages must not be converted or translated.
 *
 * NOTE: this file must be saved in UTF-8 encoding.
 *
 * @see http://github.com/kartik-v/bootstrap-star-rating
 * @author Kartik Visweswaran <kartikv2@gmail.com>
 * @author Freeman
 */
 (function ($) {
    "use strict";
    $.fn.ratingLocales['zh'] = {
        defaultCaption: '{rating} 星',
        starCaptions: {
            0.5: '半星',
            1: '一星',
            1.5: '一星半',
            2: '二星',
            2.5: '二星半',
            3: '三星',
            3.5: '三星半',
            4: '四星',
            4.5: '四星半',
            5: '五星'
        },
        clearButtonTitle: '清除',
        clearCaption: '未评级'
    };
})(window.jQuery);
