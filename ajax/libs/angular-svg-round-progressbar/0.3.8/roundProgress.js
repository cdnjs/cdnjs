/* angular-svg-round-progressbar@0.3.8 2015-10-21 */
// shim layer with setTimeout fallback
// credit Erik Möller and http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
'use strict';

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function(id) {
            window.clearTimeout(id);
        };
    }

}());

angular.module('angular-svg-round-progress', []);

'use strict';

angular.module('angular-svg-round-progress').constant('roundProgressConfig', {
    max:            50,
    semi:           false,
    rounded:        false,
    responsive:     false,
    clockwise:      true,
    radius:         100,
    color:          "#45ccce",
    bgcolor:        "#eaeaea",
    stroke:         15,
    duration:       800,
    animation:      "easeOutCubic",
    offset:         0
});

'use strict';

angular.module('angular-svg-round-progress').service('roundProgressService', [function(){
    var service = {};
    var isNumber = angular.isNumber;
    var base = document.head.querySelector('base');

    // fixes issues if the document has a <base> element
    service.resolveColor = base && base.href ? function(value){
        var hashIndex = value.indexOf('#');

        if(hashIndex > -1 && value.indexOf('url') > -1){
            return value.slice(0, hashIndex) + window.location.href + value.slice(hashIndex);
        }

        return value;
    } : function(value){
        return value;
    };

    // credits to http://modernizr.com/ for the feature test
    service.isSupported = !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect);

    // utility function
    var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // deals with floats passed as strings
    service.toNumber = function(value){
        return isNumber(value) ? value : parseFloat((value + '').replace(',', '.'));
    };

    service.getOffset = function(element, options){
        var value = +options.offset || 0;

        if(options.offset === 'inherit'){
            var parent = element;
            var parentScope;

            while(!parent.hasClass('round-progress-wrapper')){
                if(service.isDirective(parent)){
                    parentScope = parent.scope().$parent.getOptions();
                    value += ((+parentScope.offset || 0) + (+parentScope.stroke || 0));
                }

                parent = parent.parent();
            }
        }

        return value;
    };

    // credit to http://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
    service.updateState = function(val, total, R, ring, size, isSemicircle) {

        if(!size) return ring;

        var value       = val > 0 ? Math.min(val, total) : 0;
        var type        = isSemicircle ? 180 : 359.9999;
        var perc        = total === 0 ? 0 : (value / total) * type;
        var x           = size/2;
        var start       = polarToCartesian(x, x, R, perc); // in this case x and y are the same
        var end         = polarToCartesian(x, x, R, 0);
        var arcSweep    = (perc <= 180 ? "0" : "1");
        var d = [
            "M", start.x, start.y,
            "A", R, R, 0, arcSweep, 0, end.x, end.y
        ].join(" ");

        return ring.attr('d', d);
    };

    service.isDirective = function(el){
        if(el && el.length){
            return (typeof el.attr('round-progress') !== 'undefined' || el[0].nodeName.toLowerCase() === 'round-progress');
        }

        return false;
    };

    // Easing functions by Robert Penner
    // Source: http://www.robertpenner.com/easing/
    // License: http://www.robertpenner.com/easing_terms_of_use.html

    service.animations = {

        // t: is the current time (or position) of the tween. This can be seconds or frames, steps, seconds, ms, whatever – as long as the unit is the same as is used for the total time.
        // b: is the beginning value of the property.
        // c: is the change between the beginning and destination value of the property.
        // d: is the total time of the tween.
        // jshint eqeqeq: false, -W041: true

        linearEase: function(t, b, c, d) {
            return c * t / d + b;
        },

        easeInQuad: function (t, b, c, d) {
            return c*(t/=d)*t + b;
        },

        easeOutQuad: function (t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },

        easeInOutQuad: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },

        easeInCubic: function (t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },

        easeOutCubic: function (t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },

        easeInOutCubic: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },

        easeInQuart: function (t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },

        easeOutQuart: function (t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },

        easeInOutQuart: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },

        easeInQuint: function (t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },

        easeOutQuint: function (t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },

        easeInOutQuint: function (t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },

        easeInSine: function (t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },

        easeOutSine: function (t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },

        easeInOutSine: function (t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },

        easeInExpo: function (t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },

        easeOutExpo: function (t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },

        easeInOutExpo: function (t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },

        easeInCirc: function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },

        easeOutCirc: function (t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },

        easeInOutCirc: function (t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },

        easeInElastic: function (t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
            if (a < Math.abs(c)) { a=c; s=p/4; }
            else s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },

        easeOutElastic: function (t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
            if (a < Math.abs(c)) { a=c; s=p/4; }
            else s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },

        easeInOutElastic: function (t, b, c, d) {
            // jshint eqeqeq: false, -W041: true
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);
            if (a < Math.abs(c)) { a=c; s=p/4; }
            else s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -0.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },

        easeInBack: function (t, b, c, d, s) {
            // jshint eqeqeq: false, -W041: true
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },

        easeOutBack: function (t, b, c, d, s) {
            // jshint eqeqeq: false, -W041: true
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },

        easeInOutBack: function (t, b, c, d, s) {
            // jshint eqeqeq: false, -W041: true
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },

        easeInBounce: function (t, b, c, d) {
            return c - service.animations.easeOutBounce (d-t, 0, c, d) + b;
        },

        easeOutBounce: function (t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
            }
        },

        easeInOutBounce: function (t, b, c, d) {
            if (t < d/2) return service.animations.easeInBounce (t*2, 0, c, d) * 0.5 + b;
            return service.animations.easeOutBounce (t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    };

    return service;
}]);

'use strict';

angular.module('angular-svg-round-progress')
    .directive('roundProgress', ['$window', 'roundProgressService', 'roundProgressConfig', function($window, service, roundProgressConfig){

            var base = {
                restrict: "EA",
                replace: true,
                transclude: true,
                scope:{
                    current:        "=",
                    max:            "=",
                    semi:           "=",
                    rounded:        "=",
                    clockwise:      "=",
                    responsive:     "=",
                    radius:         "@",
                    color:          "@",
                    bgcolor:        "@",
                    stroke:         "@",
                    duration:       "@",
                    animation:      "@",
                    offset:         "@"
                }
            };

            if(!service.isSupported){
                return angular.extend(base, {
                    // placeholder element to keep the structure
                    template: '<div class="round-progress" ng-transclude></div>'
                });
            }

            return angular.extend(base, {
                link: function(scope, element){
                    var isNested    = !element.hasClass('round-progress-wrapper');
                    var svg         = isNested ? element : element.find('svg').eq(0);
                    var ring        = svg.find('path').eq(0);
                    var background  = svg.find('circle').eq(0);
                    var options     = angular.copy(roundProgressConfig);
                    var lastAnimationId;
                    var parentChangedListener;

                    scope.getOptions = function(){
                        return options;
                    };

                    var renderCircle = function(){
                        var isSemicircle     = options.semi;
                        var responsive       = options.responsive;
                        var radius           = +options.radius || 0;
                        var stroke           = +options.stroke;
                        var diameter         = radius*2;
                        var backgroundSize   = radius - (stroke/2) - service.getOffset(element, options);

                        svg.css({
                            "top":          0,
                            "left":         0,
                            "position":     responsive ? "absolute" : "static",
                            "width":        responsive ? "100%" : (diameter + "px"),
                            "height":       responsive ? "100%" : (isSemicircle ? radius : diameter) + "px",
                            "overflow":     "hidden" // on some browsers the background overflows, if in semicircle mode
                        });

                        // when nested, the element shouldn't define its own viewBox
                        if(!isNested){
                            // note that we can't use .attr, because if jQuery is loaded,
                            // it lowercases all attributes and viewBox is case-sensitive
                            svg[0].setAttribute('viewBox', '0 0 ' + diameter + ' ' + (isSemicircle ? radius : diameter));

                            element.css({
                                "width":            responsive ? "100%" : "auto",
                                "position":         "relative",
                                "padding-bottom":   responsive ? (isSemicircle ? "50%" : "100%") : 0
                            });
                        }

                        element.css({
                            "width":            responsive ? "100%" : "auto",
                            "position":         "relative",
                            "padding-bottom":   responsive ? (isSemicircle ? "50%" : "100%") : 0
                        });

                        ring.css({
                            "stroke":           service.resolveColor(options.color),
                            "stroke-width":     stroke,
                            "stroke-linecap":   options.rounded ? "round": "butt"
                        });

                        if(isSemicircle){
                            ring.attr("transform", options.clockwise ? "translate("+ 0 +","+ diameter +") rotate(-90)" : "translate("+ diameter +", "+ diameter +") rotate(90) scale(-1, 1)");
                        }else{
                            ring.attr("transform", options.clockwise ? "" : "scale(-1, 1) translate("+ (-diameter) +" 0)");
                        }

                        background.attr({
                            "cx":           radius,
                            "cy":           radius,
                            "r":            backgroundSize >= 0 ? backgroundSize : 0
                        }).css({
                            "stroke":       service.resolveColor(options.bgcolor),
                            "stroke-width": stroke
                        });
                    };

                    var renderState = function(newValue, oldValue, preventAnimationOverride){
                        var max                 = service.toNumber(options.max || 0);
                        var end                 = newValue > 0 ? $window.Math.min(newValue, max) : 0;
                        var start               = (oldValue === end || oldValue < 0) ? 0 : (oldValue || 0); // fixes the initial animation
                        var changeInValue       = end - start;

                        var easingAnimation     = service.animations[options.animation];
                        var startTime           = new $window.Date();
                        var duration            = +options.duration || 0;
                        var preventAnimation    = preventAnimationOverride || (newValue > max && oldValue > max) || (newValue < 0 && oldValue < 0) || duration < 25;

                        var radius              = options.radius;
                        var circleSize          = radius - (options.stroke/2) - service.getOffset(element, options);
                        var elementSize         = radius*2;
                        var isSemicircle        = options.semi;

                        // stops some expensive animating if the value is above the max or under 0
                        if(preventAnimation){
                            service.updateState(end, max, circleSize, ring, elementSize, isSemicircle);
                        }else{
                            $window.cancelAnimationFrame(lastAnimationId);

                            (function animation(){
                                var currentTime = $window.Math.min(new Date() - startTime, duration);

                                service.updateState(
                                    easingAnimation(currentTime, start, changeInValue, duration),
                                    max,
                                    circleSize,
                                    ring,
                                    elementSize,
                                    isSemicircle);

                                if(currentTime < duration){
                                    lastAnimationId = $window.requestAnimationFrame(animation);
                                }
                            })();
                        }
                    };

                    var keys = Object.keys(base.scope).filter(function(key){
                        return key !== 'current';
                    });

                    // properties that are used only for presentation
                    scope.$watchGroup(keys, function(newValue){
                        for(var i = 0; i < newValue.length; i++){
                            if(typeof newValue[i] !== 'undefined'){
                                options[keys[i]] = newValue[i];
                            }
                        }

                        renderCircle();
                        scope.$broadcast('$parentOffsetChanged');

                        // it doesn't have to listen for changes on the parent unless it inherits
                        if(options.offset === 'inherit' && !parentChangedListener){
                            parentChangedListener = scope.$on('$parentOffsetChanged', function(){
                                renderState(scope.current, scope.current, true);
                                renderCircle();
                            });
                        }else if(options.offset !== 'inherit' && parentChangedListener){
                            parentChangedListener();
                        }
                    });

                    // properties that are used during animation. some of these overlap with
                    // the ones that are used for presentation
                    scope.$watchGroup(['current', 'max', 'animation', 'duration', 'radius', 'stroke', 'semi', 'offset'], function(newValue, oldValue){
                        renderState(service.toNumber(newValue[0]), service.toNumber(oldValue[0]));
                    });
                },
                template: function(element){
                    var parent = element.parent();
                    var directiveName = 'round-progress';
                    var template = [
                        '<svg class="'+ directiveName +'" xmlns="http://www.w3.org/2000/svg">',
                            '<circle fill="none"/>',
                            '<path fill="none"/>',
                            '<g ng-transclude></g>',
                        '</svg>'
                    ];

                    while(parent.length && !service.isDirective(parent)){
                        parent = parent.parent();
                    }

                    if(!parent || !parent.length){
                        template.unshift('<div class="round-progress-wrapper">');
                        template.push('</div>');
                    }

                    return template.join('\n');
                }
            });
        }]);
