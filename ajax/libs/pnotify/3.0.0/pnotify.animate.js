// Animate
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as a module.
        define('pnotify.animate', ['jquery', 'pnotify'], factory);
    } else if (typeof exports === 'object' && typeof module !== 'undefined') {
        // CommonJS
        module.exports = factory(require('jquery'), require('./pnotify'));
    } else {
        // Browser globals
        factory(root.jQuery, root.PNotify);
    }
}(this, function($, PNotify){
    PNotify.prototype.options.animate = {
        // Use animate.css to animate the notice.
        animate: false,
        // The class to use to animate the notice in.
        in_class: "",
        // The class to use to animate the notice out.
        out_class: ""
    };
    PNotify.prototype.modules.animate = {
        init: function(notice, options){
            this.setUpAnimations(notice, options);

            notice.attention = function(aniClass, callback){
                notice.elem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                    notice.elem.removeClass(aniClass);
                    if (callback) {
                        callback.call(notice);
                    }
                }).addClass("animated "+aniClass);
            };
        },

        update: function(notice, options, oldOpts){
            if (options.animate != oldOpts.animate) {
                this.setUpAnimations(notice, options)
            }
        },

        setUpAnimations: function(notice, options){
            if (options.animate) {
                notice.options.animation = "none";
                notice.elem.removeClass("ui-pnotify-fade-slow ui-pnotify-fade-normal ui-pnotify-fade-fast");
                if (!notice._animateIn) {
                    notice._animateIn = notice.animateIn;
                }
                if (!notice._animateOut) {
                    notice._animateOut = notice.animateOut;
                }
                notice.animateIn = this.animateIn.bind(this);
                notice.animateOut = this.animateOut.bind(this);
                var animSpeed = 400;
                if (notice.options.animate_speed === "slow") {
                    animSpeed = 600;
                } else if (notice.options.animate_speed === "fast") {
                    animSpeed = 200;
                } else if (notice.options.animate_speed > 0) {
                    animSpeed = notice.options.animate_speed;
                }
                animSpeed = animSpeed / 1000;
                notice.elem.addClass("animated").css({
                    "-webkit-animation-duration": animSpeed+"s",
                    "-moz-animation-duration": animSpeed+"s",
                    "animation-duration": animSpeed+"s"
                });
            } else if (notice._animateIn && notice._animateOut) {
                notice.animateIn = notice._animateIn;
                delete notice._animateIn;
                notice.animateOut = notice._animateOut;
                delete notice._animateOut;
                notice.elem.addClass("animated");
            }
        },

        animateIn: function(callback){
            // Declare that the notice is animating in.
            this.notice.animating = "in";
            var that = this;
            callback = (function(){
                if (this) {
                    this.call();
                }
                // Declare that the notice has completed animating.
                that.notice.animating = false;
            }).bind(callback);

            this.notice.elem.show().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback).removeClass(this.options.out_class).addClass("ui-pnotify-in").addClass(this.options.in_class);
        },

        animateOut: function(callback){
            // Declare that the notice is animating out.
            this.notice.animating = "out";
            var that = this;
            callback = (function(){
                that.notice.elem.removeClass("ui-pnotify-in");
                if (this) {
                    this.call();
                }
                // Declare that the notice has completed animating.
                that.notice.animating = false;
            }).bind(callback);

            this.notice.elem.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', callback).removeClass(this.options.in_class).addClass(this.options.out_class);
        }
    };
}));
