/*! Lazy Load XT v0.8.6 2013-12-18
 * http://ressio.github.io/lazy-load-xt
 * (C) 2013 RESS.io
 * Licensed under MIT */

(function ($) {
var options = $.lazyLoadXT;

    options.selector += ',video,iframe[data-src]';
    options.videoPoster = 'data-poster';

    $(document).on('lazyshow', 'video', function () {
        var $this = $(this),
            srcAttr = options.srcAttr,
            isFuncSrcAttr = $.isFunction(srcAttr);

        $this
            .attr('poster', $this.attr(options.videoPoster))
            .children()
            .each(function () {
                if (/source|track/i.test(this.tagName)) {
                    var $child = $(this);
                    $child.attr('src', isFuncSrcAttr ? srcAttr($child) : $child.attr(srcAttr));
                }
            });

        // reload video
        this.load();
    });

})(window.jQuery || window.Zepto);
