/*
 * Antiscroll: cross-browser native OS X Lion scrollbars
 * https://github.com/Automattic/antiscroll
 * v0.9
 */

/*global define: false, require: false, jQuery: false */

(function ($) {
    "use strict";

    $.fn.scrollbar = function (opts) {
        opts = opts || {};

        return $(this).each(function () {
            if ($.data(this, 'antiscrolled')) { return; }

            $.data(this, 'antiscrolled', 'true');

            var wrappers = $('<div class="box-wrap antiscroll-wrap"><div class="box"><div class="antiscroll-inner"></div></div></div>'),
                inners = $('<div class="box-inner"></div>'),
                target = $(this),
                cssfloat = target.css('float'),
                width = target.outerWidth(),
                height = target.outerHeight(),
                position = target.css('position'),
                left = target.css('left'),
                top = target.css('top');

            target
                .css({width: 'auto', height: 'auto', left: 'auto', top: 'auto', position: 'static'})
                .after(wrappers);

            inners.append(target);

            wrappers
                .css({float: cssfloat, left: left, top: top})
                .find('.box')
                .css({width: width, height: height})
                .end()
                .find('.antiscroll-inner')
                .css({width: width, height: height})
                .append(inners)
                .end()
                .antiscroll(opts);

            //For Safari 5.0.5
            if (inners.width() !== width) {
                wrappers
                    .find('.antiscroll-inner')
                    .css({width: 2 * width - inners.width(), height: height + width - inners.width()});
            }

        });
    };

}(jQuery));

