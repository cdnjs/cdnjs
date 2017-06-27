/*
     jQuery Mosaic v0.131
     https://github.com/tin-cat/jquery-mosaic
     A jquery plugin by Tin.cat to build beautifully arranged and responsive mosaics of html elements maintaining their original aspect ratio. Works wonderfully with images by creating a visually ordered and pleasant mosaic (much like mosaics on Flickr, 500px and Google+) without gaps between elements, but at the same time respecting aspect ratios. Reacts to window resizes and adapts responsively to any screen size. See it working on https://skinography.net
 */

(function($){

    $.Mosaic = function(el, options) {
        var base = this, o;
        base.el = el;
        base.$el = $(el);

        base.$el.data('Mosaic', base);

        var baseWidth;
        var refitTimeout = false;

        base.init = function() {
            base.options = o = $.extend({}, $.Mosaic.defaults, options);

            $(base.el).addClass("mosaic");

            if (o.outerMargin)
                $(base.el).css('padding', o.outerMargin);

            if (o.innerGap)
                $(base.el).css('margin-bottom', o.innerGap * -1);

            // If width and height are specified via attribute, set width and height as css properties to solve weird IE problem.
            base.getItems().each(function(idx, item) {
                if ($(item).attr('width'))
                    $(item).css('width', $(item).attr('width'));
                if ($(item).attr('height'))
                    $(item).css('height', $(item).attr('height'));
            });
            
            base.fit();

            if (o.refitOnResize)
                $(window).on('resize', null, null, function() {
                    if (o.refitOnResizeDelay) {
                        if (refitTimeout)
                            clearTimeout(refitTimeout);
                        refitTimeout = setTimeout(function() {
                            base.fit()
                        }, o.refitOnResizeDelay);
                    }
                    else
                        base.fit()
                });
        }

        base.getItems = function() {
            return $('> div:not([data-no-mosaic=true]), > a:not([data-no-mosaic=true]), > img:not([data-no-mosaic=true])', base.el);
        }

        base.getItemAtIndex = function(index) {
            if (!base.getItems()[index])
                return false;
            return $(base.getItems()[index]);
        }

        base.getItemsSubset = function(start, numberOf) {
            var items = base.getItems();
            if (start > items.length)
                return false;
            if (start + numberOf > items.length)
                numberOf = items.length - start;
            return items.slice(start, start + numberOf);
        }

        base.isLastItemsSubset = function(start, numberOf) {
            var items = base.getItems();
            if (start > items.length)
                return true;
            if (start + numberOf > items.length)
                return true;
            return false;
        }

        base.getItemWidth = function(item) {
            if ($(item).outerWidth())
                return $(item).outerWidth();
            if ($(item).attr('width'))
                return $(item).attr('width');
        }

        base.getItemHeight = function(item) {
            if ($(item).outerHeight())
                return $(item).outerHeight();
            if ($(item).attr('height'))
                return $(item).attr('height');
        }

        base.getItemAspectRatio = function(item) {
            if ($(item).data('aspect-ratio'))
                return $(item).data('aspect-ratio');
            if (base.getItemWidth(item) && base.getItemHeight(item)) {
                var aspectRatio = base.getItemWidth(item) / base.getItemHeight(item);
                $(item).data('aspect-ratio', aspectRatio);
                return aspectRatio;
            }
            return o.defaultAspectRatio;
        }

        base.getItemWidthForGivenHeight = function(item, height) {
            return height * base.getItemAspectRatio(item);
        }

        base.getItemHeightForGivenWidth = function(item, width) {
            return width / base.getItemAspectRatio(item);
        }

        base.setItemSizeByGivenHeight = function(item, height) {
            var width = Math.floor(base.getItemWidthForGivenHeight(item, height));
            $(item)
                .css('height', Math.floor(height) + 'px')
                .css('width', width + 'px');

            if (o.highResImagesWidthThreshold) {

                if (width > o.highResImagesWidthThreshold) {

                    var highResBackgroundImage = $(item).data('high-res-background-image-url');
                    if (
                        highResBackgroundImage
                        &&
                        !$(item).data('low-res-background-image-url')
                    ) {
                        $(item).data('low-res-background-image-url', $(item).css('background-image'));
                        $(item).css('background-image', 'url("' + highResBackgroundImage + '")');
                        $(item).addClass('highRes');
                    }

                    var highResImage = $(item).data('high-res-image-src');
                    if (
                        highResImage
                        &&
                        !$(item).data('low-res-image-src')
                    ) {
                        $(item).data('low-res-image-src', $(item).attr('src'));
                        $(item).attr('src', highResImage);
                        $(item).addClass('highRes');
                    }
                }
                else {

                    var lowResBackgroundImage = $(item).data('low-res-background-image-url');
                    if (lowResBackgroundImage) {
                        $(item).css('background-image', lowResBackgroundImage);
                        $(item).data('low-res-background-image-url', false);
                        $(item).removeClass('highRes');
                    }

                    var lowResImage = $(item).data('low-res-image-src');
                    if (lowResImage) {
                        $(item).attr('src', lowResImage);
                        $(item).data('low-res-image-src', false);
                        $(item).removeClass('highRes');
                    }

                }

            }

            return width;
        }

        base.calculateHeightToFit = function(items) {
            var sumAspectRatios = 0;
            items.each(function() {
                sumAspectRatios += parseFloat(base.getItemAspectRatio(this));
            });
            return (baseWidth - (o.innerGap * (items.length - 1))) / sumAspectRatios;
        }

        base.retrieveBaseWidth = function() {
            baseWidth = Math.floor($(base.el).width());
        }

        base.fit = function() {
            base.retrieveBaseWidth();

            var items, height;
            var itemsToUse = 1;
            var startIndex = 0;
            var isAnyFitted = false;
            while (true) {

                items = base.getItemsSubset(startIndex, itemsToUse);

                if (base.isLastItemsSubset(startIndex, itemsToUse)) {
                    if (items.length) {
                        base.fitItems(items);
                    }
                    break;
                }

                height = base.calculateHeightToFit(items);

                if (height > o.maxRowHeight) {
                    itemsToUse ++;
                    continue;
                }

                base.fitItems(items);
                startIndex += itemsToUse;
                itemsToUse = 1;
                isAnyFitted = true;
            }

            // If maxRowHeight has not been met at any point (might happen when specifying short maxRowHeights)
            if (!isAnyFitted)
                base.fitItems(base.getItems());
        }

        base.fitItems = function(items) {
            var height = base.calculateHeightToFit(items);
            if (height > o.maxRowHeight) {
                switch (o.maxRowHeightPolicy) {
                    case 'skip':
                        items.each(function() { $(this).hide(); });
                        return;
                        break;
                    case 'crop':
                        height = o.maxRowHeight;
                        break;
                    case 'oversize':
                        // Do nothing
                        break;
                }
            }
            items.each(function() { $(this).show(); });
            var accumulatedWidth = 0;
            items.each(function(idx) {
                 accumulatedWidth += base.setItemSizeByGivenHeight(this, height);
                if (o.innerGap) {
                    $(this).css('margin-right', idx < items.length - 1 ? o.innerGap : 0);
                    $(this).css('margin-bottom', o.innerGap);
                }
            });
            // Compensate the last element to compensate for accumulated floored decimal widths leaving a gap at the end
            if (accumulatedWidth != (baseWidth - ((items.length - 1) * o.innerGap))) {
                difference = (baseWidth - ((items.length - 1) * o.innerGap)) - accumulatedWidth;
                var width = items.last().width();
                items.last().width(width + difference);
            }
        }

        base.init();
    }

    $.Mosaic.defaults = {
        maxRowHeight: 400, // The maximum desired height of rows
        refitOnResize: true, // Whether to rebuild the mosaic when the window is resized or not
        refitOnResizeDelay: false, // Milliseconds to wait after a resize event to refit the mosaic. Useful when creating huge mosaics that can take some CPU time on the user's browser. Leave it to false to refit the mosaic in realtime.
        defaultAspectRatio: 1, // The aspect ratio to use when none has been specified, or can't be calculated
        maxRowHeightPolicy: 'skip', // Sometimes some of the remaining items cannot be fitted on a row without surpassing the maxRowHeight. For those cases, choose one of the available settings for maxRowHeightPolicy: "skip": Does not renders the unfitting items. "crop": caps the desired height to the specified maxRowHeight, resulting in those items not keeping their aspect ratios. "oversize": Renders the items respecting their aspect ratio but surpassing the specified maxRowHeight
        highResImagesWidthThreshold: 350, // The item width on which to start using the the provided high resolution image instead of the normal one. High resolution images are specified via the "data-high-res-image-src" or "data-high-res-background-image-url" html element properties of each item.
        outerMargin: 0, // A margin size in pixels for the outher edge of the whole mosaic
        innerGap: 0 // A gap size in pixels to leave a space between elements
    };

    $.fn.Mosaic = function(options, params) {
        return this.each(function(){
            var me = $(this).data('Mosaic');
            if ((typeof(options)).match('object|undefined'))
                new $.Mosaic(this, options);
            else
                eval('me.'+options)(params);
        });
    }

})(jQuery);