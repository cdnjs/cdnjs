/*
 *  Vide - v0.3.0
 *  Easy as hell jQuery plugin for video backgrounds.
 *  http://vodkabears.github.io/vide/
 *
 *  Made by Ilya Makarov
 *  Under MIT License
 */
!(function($, window, document, navigator) {
    "use strict";

    /**
     * Vide settings
     * @private
     */
    var pluginName = "vide",
        defaults = {
            volume: 1,
            playbackRate: 1,
            muted: true,
            loop: true,
            autoplay: true,
            position: "50% 50%",
            posterType: "detect",
            resizing: true
        },

        // is iOs?
        isIOS = /iPad|iPhone|iPod/i.test(navigator.userAgent),

        // is Android?
        isAndroid = /Android/i.test(navigator.userAgent);

    /**
     * Parse string with options
     * @param {String} str
     * @returns {Object|String}
     * @private
     */
    function parseOptions(str) {
        var obj = {},
            delimiterIndex,
            option,
            prop, val,
            arr, len,
            i;

        // remove spaces around delimiters and split
        arr = str.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(",");

        // parse string
        for (i = 0, len = arr.length; i < len; i++) {
            option = arr[i];

            // Ignore urls and string without colon delimiters
            if (option.search(/^(http|https|ftp):\/\//) !== -1 ||
                option.search(":") === -1)
            {
                break;
            }

            delimiterIndex = option.indexOf(":");
            prop = option.substring(0, delimiterIndex);
            val = option.substring(delimiterIndex + 1);

            // if val is an empty string, make it undefined
            if (!val) {
                val = undefined;
            }

            // convert string value if it is like a boolean
            if (typeof val === "string") {
                val = val === "true" || (val === "false" ? false : val);
            }

            // convert string value if it is like a number
            if (typeof val === "string") {
                val = !isNaN(val) ? +val : val;
            }

            obj[prop] = val;
        }

        // if nothing is parsed
        if (prop == null && val == null) {
            return str;
        }

        return obj;
    }

    /**
     * Parse position option
     * @param {String} str
     * @returns {Object}
     * @private
     */
    function parsePosition(str) {
        str = "" + str;

        // default value is a center
        var args = str.split(/\s+/),
            x = "50%", y = "50%",
            len, arg,
            i;

        for (i = 0, len = args.length; i < len; i++) {
            arg = args[i];

            // convert values
            if (arg === "left") {
                x = "0%";
            } else if (arg === "right") {
                x = "100%";
            } else if (arg === "top") {
                y = "0%";
            } else if (arg === "bottom") {
                y = "100%";
            } else if (arg === "center") {
                if (i === 0) {
                    x = "50%";
                } else {
                    y = "50%";
                }
            } else {
                if (i === 0) {
                    x = arg;
                } else {
                    y = arg;
                }
            }
        }

        return { x: x, y: y };
    }

    /**
     * Search poster
     * @param {String} path
     * @param {Function} callback
     * @private
     */
    function findPoster(path, callback) {
        var onLoad = function() {
            callback(this.src);
        };

        $("<img src='" + path + ".gif'>").load(onLoad);
        $("<img src='" + path + ".jpg'>").load(onLoad);
        $("<img src='" + path + ".jpeg'>").load(onLoad);
        $("<img src='" + path + ".png'>").load(onLoad);
    }

    /**
     * Vide constructor
     * @param {HTMLElement} element
     * @param {Object|String} path
     * @param {Object|String} options
     * @constructor
     */
    function Vide(element, path, options) {
        this.$element = $(element);

        // parse path
        if (typeof path === "string") {
            path = parseOptions(path);
        }

        // parse options
        if (!options) {
            options = {};
        } else if (typeof options === "string") {
            options = parseOptions(options);
        }

        // remove extension
        if (typeof path === "string") {
            path = path.replace(/\.\w*$/, "");
        } else if (typeof path === "object") {
            for (var i in path) {
                if (path.hasOwnProperty(i)) {
                    path[i] = path[i].replace(/\.\w*$/, "");
                }
            }
        }

        this.settings = $.extend({}, defaults, options);
        this.path = path;

        this.init();
    }

    /**
     * Initialization
     * @public
     */
    Vide.prototype.init = function() {
        var vide = this,
            position = parsePosition(vide.settings.position),
            sources,
            poster;

        // Set video wrapper styles
        vide.$wrapper = $("<div>").css({
            "position": "absolute",
            "z-index": -1,
            "top": 0,
            "left": 0,
            "bottom": 0,
            "right": 0,
            "overflow": "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "background-position": position.x + " " + position.y
        });

        // Get poster path
        poster = vide.path;
        if (typeof vide.path === "object") {
            if (vide.path.poster) {
                poster = vide.path.poster;
            } else {
                if (vide.path.mp4) {
                    poster = vide.path.mp4;
                } else if (vide.path.webm) {
                    poster = vide.path.webm;
                } else if (vide.path.ogv) {
                    poster = vide.path.ogv;
                }
            }
        }

        // Set video poster
        if (vide.settings.posterType === "detect") {
            findPoster(poster, function(url) {
                vide.$wrapper.css("background-image", "url(" + url + ")");
            });
        } else if (vide.settings.posterType !== "none") {
            vide.$wrapper
                .css("background-image", "url(" + poster + "." + vide.settings.posterType + ")");
        }

        // if parent element has a static position, make it relative
        if (vide.$element.css("position") === "static") {
            vide.$element.css("position", "relative");
        }

        vide.$element.prepend(vide.$wrapper);

        if (!isIOS && !isAndroid) {
            sources = "";

            if (typeof vide.path === "object") {
                if (vide.path.mp4) {
                    sources += "<source src='" + vide.path.mp4 + ".mp4' type='video/mp4'>";
                }
                if (vide.path.webm) {
                    sources += "<source src='" + vide.path.webm + ".webm' type='video/webm'>";
                }
                if (vide.path.ogv) {
                    sources += "<source src='" + vide.path.ogv + ".ogv' type='video/ogv'>";
                }

                vide.$video = $("<video>" + sources + "</video>");
            } else {
                vide.$video = $("<video>" +
                    "<source src='" + vide.path + ".mp4' type='video/mp4'>" +
                    "<source src='" + vide.path + ".webm' type='video/webm'>" +
                    "<source src='" + vide.path + ".ogv' type='video/ogg'>" +
                    "</video>");
            }

            // Disable visibility, while loading
            vide.$video.css("visibility", "hidden");

            // Set video properties
            vide.$video.prop({
                autoplay: vide.settings.autoplay,
                loop: vide.settings.loop,
                volume: vide.settings.volume,
                muted: vide.settings.muted,
                playbackRate: vide.settings.playbackRate
            });

            // Append video
            vide.$wrapper.append(vide.$video);

            // Video alignment
            vide.$video.css({
                "margin": "auto",
                "position": "absolute",
                "z-index": -1,
                "top": position.y,
                "left": position.x,
                "-webkit-transform": "translate(-" + position.x + ", -" + position.y + ")",
                "-ms-transform": "translate(-" + position.x + ", -" + position.y + ")",
                "transform": "translate(-" + position.x + ", -" + position.y + ")"
            });

            // resize video, when it's loaded
            vide.$video.bind("loadedmetadata." + pluginName, function() {
                vide.$video.css("visibility", "visible");
                vide.resize();
                vide.$wrapper.css("background-image", "none");
            });

            // resize event is available only for 'window',
            // use another code solutions to detect DOM elements resizing
            vide.$element.bind("resize." + pluginName, function() {
                if (vide.settings.resizing) {
                    vide.resize();
                }
            });
        }
    };

    /**
     * Get video element of the background
     * @returns {HTMLVideoElement|null}
     * @public
     */
    Vide.prototype.getVideoObject = function() {
        return this.$video ? this.$video[0] : null;
    };

    /**
     * Resize video background
     * @public
     */
    Vide.prototype.resize = function() {
        if (!this.$video) {
            return;
        }

        var
            // get native video size
            videoHeight = this.$video[0].videoHeight,
            videoWidth = this.$video[0].videoWidth,

            // get wrapper size
            wrapperHeight = this.$wrapper.height(),
            wrapperWidth = this.$wrapper.width();

        if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
            this.$video.css({
                "width": wrapperWidth + 2,

                // +2 pixels to prevent empty space after transformation
                "height": "auto"
            });
        } else {
            this.$video.css({
                "width": "auto",

                // +2 pixels to prevent empty space after transformation
                "height": wrapperHeight + 2
            });
        }
    };

    /**
     * Destroy video background
     * @public
     */
    Vide.prototype.destroy = function() {
        this.$element.unbind(pluginName);

        if (this.$video) {
            this.$video.unbind(pluginName);
        }

        delete $[pluginName].lookup[this.index];
        this.$element.removeData(pluginName);
        this.$wrapper.remove();
    };

    /**
     * Special plugin object for instances.
     * @type {Object}
     * @public
     */
    $[pluginName] = {
        lookup: []
    };

    /**
     * Plugin constructor
     * @param {Object|String} path
     * @param {Object|String} options
     * @returns {JQuery}
     * @constructor
     */
    $.fn[pluginName] = function(path, options) {
        var instance;

        this.each(function() {
            instance = $.data(this, pluginName);

            if (instance) {

                // destroy plugin instance if exists
                instance.destroy();
            }

            // create plugin instance
            instance = new Vide(this, path, options);
            instance.index = $[pluginName].lookup.push(instance) - 1;
            $.data(this, pluginName, instance);
        });

        return this;
    };

    $(document).ready(function() {

        // window resize event listener
        $(window).bind("resize." + pluginName, function() {
            for (var len = $[pluginName].lookup.length, i = 0, instance; i < len; i++) {
                instance = $[pluginName].lookup[i];

                if (instance && instance.settings.resizing) {
                    instance.resize();
                }
            }
        });

        // Auto initialization.
        // Add 'data-vide-bg' attribute with a path to the video without extension.
        // Also you can pass options throw the 'data-vide-options' attribute.
        // 'data-vide-options' must be like "muted: false, volume: 0.5".
        $(document).find("[data-" + pluginName + "-bg]").each(function(i, element) {
            var $element = $(element),
                options = $element.data(pluginName + "-options"),
                path = $element.data(pluginName + "-bg");

            $element[pluginName](path, options);
        });
    });
})(window.jQuery, window, document, navigator);
