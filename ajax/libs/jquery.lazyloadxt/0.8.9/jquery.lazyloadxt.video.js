/*! Lazy Load XT v0.8.9 2014-01-06
 * http://ressio.github.io/lazy-load-xt
 * (C) 2014 RESS.io
 * Licensed under MIT */

(function ($) {
    var options = $.lazyLoadXT;

    options.selector += ',video,iframe[data-src]';
    options.videoPoster = 'data-poster';

    $(document).on('lazyshow', 'video', function (e, $el) {
        var srcAttr = $el.srcAttr,
            isFuncSrcAttr = $.isFunction(srcAttr);

        $el
            .attr('poster', $el.attr(options.videoPoster))
            .children('source,track')
            .each(function () {
                var $child = $(this);
                $child.attr('src', isFuncSrcAttr ? srcAttr($child) : $child.attr(srcAttr));
            });

        // reload video
        this.load();
    });

})(window.jQuery || window.Zepto);
