(function() {
    var animationSupport = false,
        animationString = 'animation',
        vendorPrefix = prefix = '',
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];

    $(window).load(function(){
        var body = document.body;
        if( body.style.animationName !== undefined ) { animationSupport = true; }

        if( animationSupport === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( body.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    prefix = domPrefixes[ i ];
                    animationString = prefix + 'Animation';
                    vendorPrefix = '-' + prefix.toLowerCase() + '-';
                    animationSupport = true;
                    break;
                }
            }
        }
    });


    var $createKeyframeStyleTag = function(id) {
        return $("<style>").attr({
            class: "keyframe-style",
            id: id,
            type: "text/css"
        }).appendTo("head");
    };

    $.keyframe = {
        getVendorPrefix: function() {
            return vendorPrefix;
        },
        isSupported: function() {
            return animationSupport;
        },
        generate: function(frameData) {
            var frameName = frameData.name || "";
            var css = "@" + vendorPrefix + "keyframes " + frameName + " {";

            for (var key in frameData) {
                if (key !== "name") {
                    css += key + " {";

                    for (var property in frameData[key]) {
                        css += property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }

            css = PrefixFree.prefixCSS(css + "}");

            var $frameStyle = $("style#" + frameData.name);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);

                var $elems = $("*").filter(function() {
                    this.style[animationString + "Name"] === frameName;
                });

                $elems.each(function() {
                    var $el, options;
                    $el = $(this);
                    options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
                $createKeyframeStyleTag(frameName).append(css);
            }
        },
        define: function(frameData) {
            if (frameData.length) {
                for (var i = 0; i < frameData.length; i++) {
                    var frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                this.generate(frameData);
            }
        }
    };

    var animationPlayState = "animation-play-state";
    var playStateRunning = "running";

    $.fn.resetKeyframe = function(callback) {
        var $el = $(this).css(vendorPrefix + animationPlayState, playStateRunning).css(vendorPrefix + "animation", "none");

        if (callback) {
            setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, "paused");
    };

    $.fn.resumeKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, playStateRunning);
    };

    $.fn.playKeyframe = function(frameOptions, callback) {

        var animObjToStr = function(obj){
            obj = $.extend({
                duration: 0,
                timingFunction: "ease",
                delay: 0,
                iterationCount: 1,
                direction: "normal",
                fillMode: "forwards"
            }, obj);
            return [obj.name, obj.duration, obj.timingFunction, obj.delay, obj.iterationCount, obj.direction, obj.fillMode].join(" ");
        };

        var animationcss = "";

        if($.isArray(frameOptions)){
            var frameOptionsStrings = [];
            console.log(frameOptions.length);
            for(var i = 0; i < frameOptions.length; i++){
                if (typeof frameOptions[i] === 'string') {
                    frameOptionsStrings.push(frameOptions[i]);
                }else{
                    frameOptionsStrings.push(animObjToStr(frameOptions[i]));
                }
            }
            animationcss = frameOptionsStrings.join(", ");
        }else if (typeof frameOptions === 'string') {
            animationcss = frameOptions;
        }else{
            animationcss = animObjToStr(frameOptions);
        }

        var animationkey = vendorPrefix + "animation";
        var pfx = ["webkit", "moz", "MS", "o", ""];

        var _prefixEvent = function(element, type, callback) {
            for(var i = 0; i < pfx.length; i++){
                if (!pfx[i]) {
                    type = type.toLowerCase();
                }
                var evt = pfx[i] + type;
                element.off(evt).on(evt, callback);
            }
        };

        this.each(function() {
            var $el = $(this).addClass("boostKeyframe").css(vendorPrefix + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);

            if (callback) {
                _prefixEvent($el, 'AnimationIteration', callback);
                _prefixEvent($el, 'AnimationEnd', callback);
            }
        });
        return this;
    };

    $createKeyframeStyleTag("boost-keyframe").append(" .boostKeyframe{" + vendorPrefix + "transform:scale3d(1,1,1);}");

}).call(this);