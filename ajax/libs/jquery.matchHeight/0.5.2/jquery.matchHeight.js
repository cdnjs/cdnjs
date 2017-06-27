/**
* jquery.matchHeight.js v0.5.2
* http://brm.io/jquery-match-height/
* License: MIT
*/

(function($) {

    $.fn.matchHeight = function(byRow) {

        // handle matchHeight('remove')
        if (byRow === 'remove') {
            var that = this;

            // remove fixed height from all selected elements
            this.css('height', '');

            // remove selected elements from all groups
            $.each($.fn.matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1)
            return this;

        // byRow default to true
        byRow = (typeof byRow !== 'undefined') ? byRow : true;

        // keep track of this group so we can re-apply later on load and resize events
        $.fn.matchHeight._groups.push({
            elements: this,
            byRow: byRow
        });

        // match each element's height to the tallest element in the selection
        $.fn.matchHeight._apply(this, byRow);

        return this;
    };

    $.fn.matchHeight._apply = function(elements, byRow) {
        var $elements = $(elements),
            rows = [$elements];

        // get rows if using byRow, otherwise assume one row
        if (byRow) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.css({
                'display': 'block',
                'padding-top': '0',
                'padding-bottom': '0',
                'border-top': '0',
                'border-bottom': '0',
                'height': '100px'
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert the temporary forced style
            $elements.css({
                'display': '',
                'padding-top': '',
                'padding-bottom': '',
                'border-top': '',
                'border-bottom': '',
                'height': ''
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                maxHeight = 0;

            // iterate the row and find the max height
            $row.each(function(){
                var $that = $(this);

                // ensure we get the correct actual height (and not a previously set height value)
                $that.css({ 'display': 'block', 'height': '' });

                // find the max height (including padding, but not margin)
                if ($that.outerHeight(false) > maxHeight)
                    maxHeight = $that.outerHeight(false);

                // revert display block
                $that.css({ 'display': '' });
            });

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css('height', maxHeight - verticalPadding);
            });
        });

        return this;
    };

    /*
    *  _applyDataApi will apply matchHeight to all elements with a data-match-height attribute
    */
   
    $.fn.matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-match-height');
            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /* 
    *  _update function will re-apply matchHeight to all groups with the correct options
    */
   
    $.fn.matchHeight._groups = [];
    $.fn.matchHeight._throttle = 80;

    var previousResizeWidth = -1,
        updateTimeout = -1;

    $.fn.matchHeight._update = function(event) {
        // prevent update if fired from a resize event 
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === previousResizeWidth)
                return;
            previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (updateTimeout === -1) {
            updateTimeout = setTimeout(function() {

                $.each($.fn.matchHeight._groups, function() {
                    $.fn.matchHeight._apply(this.elements, this.byRow);
                });

                updateTimeout = -1;

            }, $.fn.matchHeight._throttle);
        }
    };

    /* 
    *  bind events
    */

    // apply on DOM ready event
    $($.fn.matchHeight._applyDataApi);

    // update heights on load and resize events
    $(window).bind('load resize orientationchange', $.fn.matchHeight._update);

    /*
    *  rows utility function
    *  returns array of jQuery selections representing each row 
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

})(jQuery);