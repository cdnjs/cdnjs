(function($) {

$.fn.squishy = function(options) {

    // Setup options
    var settings = $.extend({
        minSize            : -10000,
        maxSize            : 10000,
        maxWidth           : 10000,
        minWidth           : -10000,
        runAutomatically   : true,
        equalizeSizes      : false,
        callback           : null,
        condition          : null
    }, options);

    var that = this;

    // Does the resizing
    var resizer = function(e, subsetSelector) {

        if(settings.condition && !settings.condition()) { return; }

        var actOn,
            minFontSize = 10000,
            finalFontSize = [],
            count = 0;

        if(subsetSelector) {
            actOn = that.filter(function() {
                return $(this).is(subsetSelector);
            });
        } else {
            actOn = that;
        }

        actOn.each(function() {
            var $this = $(this);

            // Add the wrapper span
            var theText = $this.html(),
                $span   = $this.html("<span id='checkSizeForSquishing' style='font-size:1em!important;'>" + theText + "</span>").children("#checkSizeForSquishing");

            // Figuring out the relevant widths
            var spanWidth = $span.width(),
                blockWidth = Math.max(parseFloat(settings.minWidth),
                                      Math.min($this.width(),
                                               parseFloat(settings.maxWidth))
                                      ),
                fontSize = parseFloat($this.css("font-size"));

            // console.log("fontSize: " + fontSize + ", blockWidth: " + blockWidth + ", spanWidth: " + spanWidth);

            // Set the target size (restricted by min/max sizes)
            var targetSize = fontSize*blockWidth/spanWidth;

            targetSize = Math.floor(Math.min(Math.max(targetSize, parseFloat(settings.minSize)), parseFloat(settings.maxSize)));

            if(settings.equalizeSizes) {
                minFontSize = (targetSize < minFontSize) ?
                                targetSize : minFontSize;
            }

            $this.css({"white-space": "nowrap", "font-size": targetSize, "text-align": "justify"}).html(theText);

            if(settings.callback) {
                finalFontSize.push(targetSize);
                count++;
            }
        });

        if(settings.equalizeSizes) {
            actOn.each(function() {
                $(this).css("font-size", minFontSize);
            });
        }

        if(settings.callback) {
            settings.callback(finalFontSize);
        }
    };

    if(settings.runAutomatically) {
        // Initial will get it bigger but not too big
        $(document).ready(function() {
            resizer();
        });

        // Calls the resize on viewport width or orientation change
        $(window).on("resize.squishy orientationchange.squishy", resizer);
    }

    return {
        resize: function(selector) {
            return resizer(null, selector);
        },

        makeAutomatic: function() {
            if(!settings.runAutomatically) {
                settings.runAutomatically = true;
                resizer();
                $(window).on("resize.squishy orientationchange.squishy", resizer);
            }
        },

        unSquish: function(keepFontSize) {
            settings.runAutomatically = false;
            $(window).off("resize.squishy orientationchange.squishy");
            that.css({"white-space": "", "text-align": ""});
            if(!keepFontSize) { that.css("font-size", ""); }
        },

        set: function(setting, value) {
            settings[setting] = value;
        }
    };
};

})(jQuery);