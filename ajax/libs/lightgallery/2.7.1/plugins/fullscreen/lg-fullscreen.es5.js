/*!
 * lightgallery | 2.7.1 | January 11th 2023
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var fullscreenSettings = {
    fullScreen: true,
    fullscreenPluginStrings: {
        toggleFullscreen: 'Toggle Fullscreen',
    },
};

var FullScreen = /** @class */ (function () {
    function FullScreen(instance, $LG) {
        // get lightGallery core plugin instance
        this.core = instance;
        this.$LG = $LG;
        // extend module default settings with lightGallery core settings
        this.settings = __assign(__assign({}, fullscreenSettings), this.core.settings);
        return this;
    }
    FullScreen.prototype.init = function () {
        var fullScreen = '';
        if (this.settings.fullScreen) {
            // check for fullscreen browser support
            if (!document.fullscreenEnabled &&
                !document.webkitFullscreenEnabled &&
                !document.mozFullScreenEnabled &&
                !document.msFullscreenEnabled) {
                return;
            }
            else {
                fullScreen = "<button type=\"button\" aria-label=\"" + this.settings.fullscreenPluginStrings['toggleFullscreen'] + "\" class=\"lg-fullscreen lg-icon\"></button>";
                this.core.$toolbar.append(fullScreen);
                this.fullScreen();
            }
        }
    };
    FullScreen.prototype.isFullScreen = function () {
        return (document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement);
    };
    FullScreen.prototype.requestFullscreen = function () {
        var el = document.documentElement;
        if (el.requestFullscreen) {
            el.requestFullscreen();
        }
        else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
        }
        else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
        }
        else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
        }
    };
    FullScreen.prototype.exitFullscreen = function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    };
    // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode
    FullScreen.prototype.fullScreen = function () {
        var _this = this;
        this.$LG(document).on("fullscreenchange.lg.global" + this.core.lgId + " \n            webkitfullscreenchange.lg.global" + this.core.lgId + " \n            mozfullscreenchange.lg.global" + this.core.lgId + " \n            MSFullscreenChange.lg.global" + this.core.lgId, function () {
            if (!_this.core.lgOpened)
                return;
            _this.core.outer.toggleClass('lg-fullscreen-on');
        });
        this.core.outer
            .find('.lg-fullscreen')
            .first()
            .on('click.lg', function () {
            if (_this.isFullScreen()) {
                _this.exitFullscreen();
            }
            else {
                _this.requestFullscreen();
            }
        });
    };
    FullScreen.prototype.closeGallery = function () {
        // exit from fullscreen if activated
        if (this.isFullScreen()) {
            this.exitFullscreen();
        }
    };
    FullScreen.prototype.destroy = function () {
        this.$LG(document).off("fullscreenchange.lg.global" + this.core.lgId + " \n            webkitfullscreenchange.lg.global" + this.core.lgId + " \n            mozfullscreenchange.lg.global" + this.core.lgId + " \n            MSFullscreenChange.lg.global" + this.core.lgId);
    };
    return FullScreen;
}());

export default FullScreen;
//# sourceMappingURL=lg-fullscreen.es5.js.map
