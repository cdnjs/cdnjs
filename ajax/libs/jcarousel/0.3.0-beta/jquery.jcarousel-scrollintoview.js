/*! jCarousel - v0.3.0-beta - 2013-01-18
* http://sorgalla.com/jcarousel/
* Copyright 2013 Jan Sorgalla
* Released under the MIT license */

(function($) {
    'use strict';

    $.jcarousel.fn.scrollIntoView = function(target, animate, callback) {
        var index = typeof target !== 'object' ? parseInt(target, 10) : this.index(target),
            first = this.index(this._fullyvisible.first());

        if (index < first) {
            return this.scroll(index, animate, callback);
        }

        if (index >= first && index <= this.index(this._fullyvisible.last())) {
            if ($.isFunction(callback)) {
                callback.call(this, false);
            }

            return this;
        }

        var items = this.items(),
            clip = this.clipping(),
            lrb  = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right'),
            wh   = 0,
            curr;

        while (true) {
            curr = items.eq(index);

            if (curr.size() === 0) {
                break;
            }

            wh += this.dimension(curr);

            if (wh >= clip) {
                var margin = parseFloat(curr.css('margin-' + lrb)) || 0;
                if ((wh - margin) !== clip) {
                    index++;
                }
                break;
            }

            if (index <= 0) {
                break;
            }

            index--;
        }

        return this.scroll(index, animate, callback);
    };
}(jQuery));
