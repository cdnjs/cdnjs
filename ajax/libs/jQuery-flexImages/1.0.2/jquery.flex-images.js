/*
	jQuery flexImages v1.0.2
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/jQuery-flexImages
	License: http://www.opensource.org/licenses/mit-license.php
*/

(function($){
    $.fn.flexImages = function(options){
        var o = $.extend({ container: '.item', object: 'img', rowHeight: 180, maxRows: 0, truncate: false }, options);
        return this.each(function(){
            var grid = $(this), containers = $(o.container, grid), items = [], t = new Date().getTime();
            o.margin = $(containers[0]).outerWidth(true) - $(containers[0]).innerWidth();
            for (j=0;j<containers.length;j++) {
                var c = containers[j],
                    w = parseInt(c.getAttribute('data-w')),
                    h = parseInt(c.getAttribute('data-h')),
                    norm_w = w*(o.rowHeight/h), // normalized width
                    obj = $(c).find(o.object);
                items.push([c, w, h, norm_w, obj, obj.data('src')]);
            }
            makeGrid(grid, items, o);
            $(window).off('resize.flexImages'+grid.data('flex-t'));
            $(window).on('resize.flexImages'+t, function(){ makeGrid(grid, items, o); });
            grid.data('flex-t', t)
        });
    }

    function makeGrid(grid, items, o, noresize){
        var x, new_w, ratio = 1, rows = 1, max_w = grid.width(), row = [], row_width = 0, row_h = o.rowHeight;

        // define inside makeGrid to access variables in scope
        function _helper(lastRow){
            if (o.maxRows && rows > o.maxRows || o.truncate && lastRow) row[x][0].style.display = 'none';
            else {
                if (row[x][5]) { row[x][4].attr('src', row[x][5]); row[x][5] = ''; }
                row[x][0].style.width = new_w+'px';
                row[x][0].style.height = row_h+'px';
                row[x][0].style.display = '';
            }
        }

        for (i=0; i<items.length; i++) {
            row.push(items[i]);
            row_width += items[i][3] + o.margin;
            if (row_width >= max_w) {
                ratio = max_w / row_width, row_h = Math.ceil(o.rowHeight*ratio), exact_w = 0, new_w;
                for (x=0; x<row.length; x++) {
                    new_w = Math.ceil(row[x][3]*ratio);
                    exact_w += new_w + o.margin;
                    if (exact_w > max_w) new_w -= exact_w - max_w + 1;
                    _helper();
                }
                // reset for next row
                row = [], row_width = 0;
                rows++;
            }
        }
        // layout last row - match height of last row to previous row
        for (x=0; x<row.length; x++) {
            new_w = Math.floor(row[x][3]*ratio), h = Math.floor(o.rowHeight*ratio);
            _helper(true);
        }

        // scroll bars added or removed during rendering new layout?
        if (!noresize && max_w != grid.width()) makeGrid(grid, items, o, true);
    }
}(jQuery));
