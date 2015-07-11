/*
 * purecssmatrix.js, version 0.10, part of:
 * http://janne.aukia.com/zoomooz
 *
 * 0.10 initial stand-alone version
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */
 
 PureCSSMatrix = (function() {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var regexp_is_deg = /deg$/;
    var regexp_filter_number = /([0-9.\-e]+)/g;
    var regexp_trans_splitter = /([a-zA-Z]+)\(([^\)]+)\)/g;
    
    //**********************************//
    //***  WebKitCSSMatrix in        ***//
    //***  pure Javascript           ***//
    //**********************************//
    
    function cssMatrix(trans) {
        if(trans && trans !== null && trans!="none") {
            if(trans instanceof Matrix) {
                this.setMatrix(trans);
            } else {
                this.setMatrixValue(trans);
            }
        } else {
            this.m = Matrix.I(3);
        }
    }
    
    cssMatrix.prototype.setMatrix = function(matr) {
        this.m = matr;
    };
    
    function rawRotationToRadians(raw) {
        var rot = parseFloat(filterNumber(raw));
        if(raw.match(regexp_is_deg)) {
            rot = (2*Math.PI)*rot/360.0;
        }
        return rot;
    }
    
    cssMatrix.prototype.setMatrixValue = function(transString) {
        var mtr = Matrix.I(3);
        var items;
        while((items = regexp_trans_splitter.exec(transString)) !== null) {
            var action = items[1].toLowerCase();
            var val = items[2].split(",");
            var trans;
            if(action=="matrix") {
                trans = Matrix.create([[parseFloat(val[0]),parseFloat(val[2]),parseFloat(filterNumber(val[4]))],
                               [parseFloat(val[1]),parseFloat(val[3]),parseFloat(filterNumber(val[5]))],
                               [                0,                0,                              1]]);
            } else if(action=="translate") {
                trans = Matrix.I(3);
                trans.elements[0][2] = parseFloat(filterNumber(val[0]));
                trans.elements[1][2] = parseFloat(filterNumber(val[1]));
            } else if(action=="scale") {
                var sx = parseFloat(val[0]);
                var sy;
                if(val.length>1) {
                    sy = parseFloat(val[1]);
                } else {
                    sy = sx;
                }
                trans = Matrix.create([[sx, 0, 0], [0, sy, 0], [0, 0, 1]]);
            } else if(action=="rotate") {
                trans = Matrix.RotationZ(rawRotationToRadians(val[0]));
            } else if(action=="skew" || action=="skewx") {
                // TODO: supports only one parameter skew
                trans = Matrix.I(3);
                trans.elements[0][1] = Math.tan(rawRotationToRadians(val[0]));
            } else if(action=="skewy") {
                // TODO: test that this works (or unit test them all!)
                trans = Matrix.I(3);
                trans.elements[1][0] = Math.tan(rawRotationToRadians(val[0]));
            } else {
                console.log("Problem with setMatrixValue", action, val);
            }
            
            mtr = mtr.multiply(trans);
        }
        
        this.m = mtr;
    };
    
    cssMatrix.prototype.multiply = function(m2) {
        return new cssMatrix(this.m.multiply(m2.m));
    };
    
    cssMatrix.prototype.inverse = function() {
        if(Math.abs(this.m.elements[0][0])<0.000001) {
            /* fixes a weird displacement problem with 90 deg rotations */
            this.m.elements[0][0] = 0;
        }
        return new cssMatrix(this.m.inverse());
    };
    
    cssMatrix.prototype.translate = function(x,y) {
        var trans = Matrix.I(3);
        trans.elements[0][2] = x;
        trans.elements[1][2] = y;
        return new cssMatrix(this.m.multiply(trans));
    };
    
    cssMatrix.prototype.scale = function(sx,sy) {
        var trans = Matrix.create([[sx, 0, 0], [0, sy, 0], [0, 0, 1]]);
        return new cssMatrix(this.m.multiply(trans));    
    };
    
    cssMatrix.prototype.rotate = function(rot) {
        var trans = Matrix.RotationZ(rot);
        return new cssMatrix(this.m.multiply(trans));
    };
    
    cssMatrix.prototype.toString = function() {
        var e = this.m.elements;
        var pxstr = "";
        if($.browser.mozilla || $.browser.opera) {
            pxstr = "px";
        }
        return "matrix("+printFixedNumber(e[0][0])+", "+printFixedNumber(e[1][0])+", "+
                         printFixedNumber(e[0][1])+", "+printFixedNumber(e[1][1])+", "+
                         printFixedNumber(e[0][2])+pxstr+", "+printFixedNumber(e[1][2])+pxstr+")";
    };
    
    //****************************************//
    //***  Not part of the WebkitCSSMatrix ***//
    //***  interface (but used in Zoomooz) ***//
    //****************************************//
    
    cssMatrix.prototype.elements = function() {
        var mv = this.m.elements;
        return {"a":mv[0][0],"b":mv[1][0],"c":mv[0][1],
                "d":mv[1][1],"e":mv[0][2],"f":mv[1][2]};
    }
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    function filterNumber(x) {
        return x.match(regexp_filter_number);
    }
    
    function printFixedNumber(x) {
        return Number(x).toFixed(6);
    }

    return cssMatrix;
})();
/*
 * jquery.zoomooz-helpers.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */
 
/*jslint sub: true */

if(!$.zoomooz) {
    $.zoomooz = {};
}

 $.zoomooz.helpers = (function($, ns) {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var browser_prefixes = ["-moz-","-webkit-","-o-","-ms-"];
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    ns.forEachPrefix = function(func,includeNoPrefix) {
        for(var i=0;i<browser_prefixes.length;i++) {
            func(browser_prefixes[i]);
        }
        if(includeNoPrefix) {
            func("");
        }
    }
    
    ns.getElementTransform = function(elem) {
        var retVal;
        ns.forEachPrefix(function(prefix) {
            retVal = retVal || $(elem).css(prefix+"transform");
        },true);
        return retVal;
    }
    
    return ns;
    
})(jQuery, {});
/*
 * jquery.zoomooz-anim.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 * LICENCE INFORMATION FOR DERIVED FUNCTIONS:
 *
 * Functions CubicBezierAtPosition and  
 * CubicBezierAtTime are written by Christian Effenberger, 
 * and correspond 1:1 to WebKit project functions.
 * "WebCore and JavaScriptCore are available under the 
 * Lesser GNU Public License. WebKit is available under 
 * a BSD-style license."
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var animation_start_time;
    var animation_interval_timer;
    
    var regexp_filter_number = /([0-9.\-e]+)/g;
    var regexp_trans_splitter = /([a-z]+)\(([^\)]+)\)/g;
    var regexp_is_deg = /deg$/;

    var helpers = $.zoomooz.helpers;

    var default_settings = {
        duration: 450,
        easing: "ease",
        /* Native animation may cause issues with pixelated content while zooming,
           and there might be other issues with browser compatibility etc. so use
           it with care and test on your target devices/browsers :). */
        nativeanimation: false
    };
    
    var endCallbackTimeout;

    //**********************************//
    //***  Setup css hook for IE     ***//
    //**********************************//
    
    jQuery.cssHooks["MsTransform"] = {
        set: function( elem, value ) {
            elem.style.msTransform = value;
        }
    };
    
    jQuery.cssHooks["MsTransformOrigin"] = {
        set: function( elem, value ) {
            elem.style.msTransformOrigin = value;
        }
    };

    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
      
    $.fn.animateTransformation = function(transformation, settings, animateEndCallback, animateStartedCallback) {
        settings = jQuery.extend({}, default_settings, settings);
        
        var useNativeAnim = ($.browser.webkit && settings.nativeanimation);
        
        // FIXME: what would be the best way to handle leftover animations?
        if(endCallbackTimeout) {
            clearTimeout(endCallbackTimeout);
            endCallbackTimeout = null;
        }

        if(useNativeAnim && animateEndCallback) {
            endCallbackTimeout = setTimeout(animateEndCallback, settings.duration);
        }
        
        this.each(function() {
            var $target = $(this);
            
            if(!transformation) transformation = new PureCSSMatrix();
            
            var current_affine = constructAffineFixingRotation($target);
            var final_affine = fixRotationToSameLap(current_affine, affineTransformDecompose(transformation));
            
            if(useNativeAnim) {
                $target.css(constructZoomRootCssTransform(matrixCompose(final_affine), settings.duration, settings.easing));
                if(animateStartedCallback) {
                    animateStartedCallback();
                }
            } else {
                animateTransition($target, current_affine, final_affine, settings, animateEndCallback, animateStartedCallback);
            }
        });
    }
    
    $.fn.setTransformation = function(transformation) {
        this.each(function() {
            var $target = $(this);
            var current_affine = constructAffineFixingRotation($target);
            var final_affine = fixRotationToSameLap(current_affine, affineTransformDecompose(transformation));
            $target.css(constructZoomRootCssTransform(matrixCompose(final_affine)));
        });
    }
    
    //**********************************//
    //***  Element positioning       ***//
    //**********************************//
    
    function constructZoomRootCssTransform(trans, duration, easing) {
        var propMap = {};
        
        helpers.forEachPrefix(function(prefix) {
            propMap[prefix+"transform"] = trans;
        },true);
        
        if(duration) { 
            var transdur = roundNumber(duration/1000,6)+"s";
            propMap["-webkit-transition-duration"] = transdur;
            propMap["-o-transition-duration"] = transdur;
            propMap["-moz-transition-duration"] = transdur;
        }
        
        if(easing) {
            var transtiming = constructEasingCss(easing);
            propMap["-webkit-transition-timing-function"] = transtiming;
            propMap["-o-transition-timing-function"] = transtiming;
            propMap["-moz-transition-timing-function"] = transdur;
        }
        
        return propMap;
    }
    
    //**********************************//
    //***  Non-native animation      ***//
    //**********************************//
    
    function animateTransition($target, st, et, settings, animateEndCallback, animateStartedCallback) {
        
        if(!st) {
            st = affineTransformDecompose(new PureCSSMatrix());
        }
        animation_start_time = (new Date()).getTime();
        if(animation_interval_timer) {
            clearInterval(animation_interval_timer);
            animation_interval_timer = null;
        }
        if(settings.easing) {
            settings.easingfunction = constructEasingFunction(settings.easing, settings.duration);
        }
        
        // first step
        animationStep($target, st, et, settings, animateEndCallback);
        if(animateStartedCallback) {
            animateStartedCallback();
        }
        
        animation_interval_timer = setInterval(function() { animationStep($target, st, et, settings, animateEndCallback); }, 1);    
    }
    
    function animationStep($target, affine_start, affine_end, settings, animateEndCallback) {
        var current_time = (new Date()).getTime() - animation_start_time;
        var time_value;
        if(settings.easingfunction) {
            time_value = settings.easingfunction(current_time/settings.duration);
        } else {
            time_value = current_time/settings.duration;
        }
        
        $target.css(constructZoomRootCssTransform(matrixCompose(interpolateArrays(affine_start, affine_end, time_value))));
    
        if(current_time>settings.duration) {
            clearInterval(animation_interval_timer);
            animation_interval_timer = null;
            time_value=1.0;
            if(animateEndCallback) {
                animateEndCallback();
            }
        }
        
    }
    
    /* Based on pseudo-code in:
     * https://bugzilla.mozilla.org/show_bug.cgi?id=531344
     */
    function affineTransformDecompose(matrix) {
        var m = matrix.elements();
        var a=m.a, b=m.b, c=m.c, d=m.d, e=m.e, f=m.f;
        
        if(Math.abs(a*d-b*c)<0.01) {
            console.log("fail!");
            return;
        }
        
        var tx = e, ty = f;
        
        var sx = Math.sqrt(a*a+b*b);
        a = a/sx;
        b = b/sx;
        
        var k = a*c+b*d;
        c -= a*k;
        d -= b*k;
        
        var sy = Math.sqrt(c*c+d*d);
        c = c/sy;
        d = d/sy;
        k = k/sy;
        
        if((a*d-b*c)<0.0) {
            a = -a;
            b = -b;
            c = -c;
            d = -d;
            sx = -sx;
            sy = -sy;
        }
    
        var r = Math.atan2(b,a);
        return {"tx":tx, "ty":ty, "r":r, "k":Math.atan(k), "sx":sx, "sy":sy};
    }
    
    function matrixCompose(ia) {
        var ret = "";
        /* this probably made safari 5.1.1. + os 10.6.8 + non-unibody mac? */
        //ret += "translateZ(0) ";
        ret += "translate("+roundNumber(ia.tx,6)+"px,"+roundNumber(ia.ty,6)+"px) ";
        ret += "rotate("+roundNumber(ia.r,6)+"rad) skewX("+roundNumber(ia.k,6)+"rad) ";
        ret += "scale("+roundNumber(ia.sx,6)+","+roundNumber(ia.sy,6)+")";
        return ret;
    }
    
    //**********************************//
    //***  Easing functions          ***//
    //**********************************//
    
    function constructEasingCss(input) {
        if((input instanceof Array)) {
            return "cubic-bezier("+roundNumber(input[0],6)+","+roundNumber(input[1],6)+","+
                                   roundNumber(input[2],6)+","+roundNumber(input[3],6)+")";
        } else {
            return input;
        }
    }
    
    function constructEasingFunction(input, dur) {
        var params = [];
        if((input instanceof Array)) {
            params = input;
        } else {
            switch(input) {
                case "linear": params = [0.0,0.0,1.0,1.0]; break;
                case "ease": params = [0.25,0.1,0.25,1.0]; break;
                case "ease-in": params = [0.42,0.0,1.0,1.0]; break;
                case "ease-out": params = [0.0,0.0,0.58,1.0]; break;
                case "ease-in-out": params = [0.42,0.0,0.58,1.0]; break;
            }
        }
        
        var easingFunc = function(t) {
            return CubicBezierAtTime(t, params[0], params[1], params[2], params[3], dur);
        };
        
        return easingFunc;
    }
    
    // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
    function CubicBezierAtPosition(t,P1x,P1y,P2x,P2y) {
        var x,y,k=((1-t)*(1-t)*(1-t));
        x=P1x*(3*t*t*(1-t))+P2x*(3*t*(1-t)*(1-t))+k;
        y=P1y*(3*t*t*(1-t))+P2y*(3*t*(1-t)*(1-t))+k;
        return {x:Math.abs(x),y:Math.abs(y)};
    }
    
    // From: http://www.netzgesta.de/dev/cubic-bezier-timing-function.html
    // 1:1 conversion to js from webkit source files
    // UnitBezier.h, WebCore_animation_AnimationBase.cpp
    function CubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
        var ax=0,bx=0,cx=0,ay=0,by=0,cy=0;
        // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
        function sampleCurveX(t) {return ((ax*t+bx)*t+cx)*t;}
        function sampleCurveY(t) {return ((ay*t+by)*t+cy)*t;}
        function sampleCurveDerivativeX(t) {return (3.0*ax*t+2.0*bx)*t+cx;}
        // The epsilon value to pass given that the animation is going to run over |dur| seconds. The longer the
        // animation, the more precision is needed in the timing function result to avoid ugly discontinuities.
        function solveEpsilon(duration) {return 1.0/(200.0*duration);}
        function solve(x,epsilon) {return sampleCurveY(solveCurveX(x,epsilon));}
        // Given an x value, find a parametric value it came from.
        function solveCurveX(x,epsilon) {var t0,t1,t2,x2,d2,i;
            function fabs(n) {if(n>=0) {return n;}else {return 0-n;}}
            // First try a few iterations of Newton's method -- normally very fast.
            for(t2=x, i=0; i<8; i++) {x2=sampleCurveX(t2)-x; if(fabs(x2)<epsilon) {return t2;} d2=sampleCurveDerivativeX(t2); if(fabs(d2)<1e-6) {break;} t2=t2-x2/d2;}
            // Fall back to the bisection method for reliability.
            t0=0.0; t1=1.0; t2=x; if(t2<t0) {return t0;} if(t2>t1) {return t1;}
            while(t0<t1) {x2=sampleCurveX(t2); if(fabs(x2-x)<epsilon) {return t2;} if(x>x2) {t0=t2;}else {t1=t2;} t2=(t1-t0)*0.5+t0;}
            return t2; // Failure.
        }
        // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
        cx=3.0*p1x; bx=3.0*(p2x-p1x)-cx; ax=1.0-cx-bx; cy=3.0*p1y; by=3.0*(p2y-p1y)-cy; ay=1.0-cy-by;
        // Convert from input time to parametric value in curve, then from that to output time.
        return solve(t, solveEpsilon(duration));
    }

    //**********************************//
    //***  CSS Matrix helpers        ***//
    //**********************************//
    
    function constructAffineFixingRotation(elem) {
        var rawTrans = helpers.getElementTransform(elem);
        var matr;
        if(!rawTrans) {
            matr = new PureCSSMatrix();
        } else {
            matr = new PureCSSMatrix(rawTrans);
        }
        var current_affine = affineTransformDecompose(matr);
        current_affine.r = getTotalRotation(rawTrans);
        return current_affine;
    }
    
    function getTotalRotation(transString) {
        var totalRot = 0;
        var items;
        while((items = regexp_trans_splitter.exec(transString)) !== null) {
            var action = items[1].toLowerCase();
            var val = items[2].split(",");
            if(action=="matrix") {
                var recomposedTransItem = action+"("+items[2]+")";
                totalRot += affineTransformDecompose(new PureCSSMatrix(recomposedTransItem)).r;
            } else if(action=="rotate") {
                var raw = val[0];
                var rot = parseFloat(filterNumber(raw));
                if(raw.match(regexp_is_deg)) {
                    rot = (2*Math.PI)*rot/360.0;
                }
                totalRot += rot;
            }
        }
        return totalRot;
    }
    
    // TODO: use modulo instead of loops
    function fixRotationToSameLap(current_affine, final_affine) {
        
        if(Math.abs(current_affine.r-final_affine.r)>Math.PI) {
            if(final_affine.r<current_affine.r) {
                while(Math.abs(current_affine.r-final_affine.r)>Math.PI) {
                    final_affine.r+=(2*Math.PI);
                }
            } else {
                while(Math.abs(current_affine.r-final_affine.r)>Math.PI) {
                    final_affine.r-=(2*Math.PI);
                }
            }
        }
        return final_affine;
    }
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    function interpolateArrays(st, et, pos) {
        var it = {};
        for(var i in st) {
            if (st.hasOwnProperty(i)) {
                it[i] = st[i]+(et[i]-st[i])*pos;
            }
        }
        return it;
    }
    
    function roundNumber(number, precision) {
        precision = Math.abs(parseInt(precision,10)) || 0;
        var coefficient = Math.pow(10, precision);
        return Math.round(number*coefficient)/coefficient;
    }
    
    function filterNumber(x) {
        return x.match(regexp_filter_number);
    }
    
})(jQuery);
/*
 * jquery.zoomooz-core.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * Version history:
 * 1.04 fixed examples, iphone tuneups, transform offset fix
 * 1.03 added closeclick, code structuring
 * 1.02 bug fix on endcallback resetting for native animation
 * 1.01 declarative syntax and fixes
 * 0.92 working scrolling
 * 0.91 simplifying code base and scrolling for non-body zoom roots
 * 0.90 fixing margin on first body child
 * 0.89 support for jquery 1.7
 * 0.88 fixed a bug with 90 deg rotations
 * 0.87 fixed a bug with settings and a couple of demos
 * 0.86 fixed a bug with non-body zoom root
 * 0.85 basic IE9 support
 * 0.81 basic support for scrolling
 * 0.80 refactored position code to a separate file
 * 0.72 fixed a bug with skew in Webkit
 * 0.71 fixed bugs with FF4
 * 0.70 support for non-body zoom root
 * 0.69 better settings management
 * 0.68 root element tuning
 * 0.67 adjustable zoom origin (not fully working yet)
 * 0.65 zoom origin to center
 * 0.63 basic Opera support
 * 0.61 refactored to use CSSMatrix classes
 * 0.51 initial public version
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 * LICENCE INFORMATION FOR DERIVED FUNCTIONS:
 *
 * Function computeTotalTransformation based
 * on jquery.fn.offset, copyright John Resig, 2010
 * (MIT and GPL Version 2).
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var helpers = $.zoomooz.helpers;
    
    var animationSettings = ["duration", "easing", "nativeanimation"];
    
    //**********************************//
    //***  Static setup              ***//
    //**********************************//
    
    setupCssStyles();
    
    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
    
    if(!$.zoomooz) {
        $.zoomooz = {};
    }
    
    /* this can be used for setting the default settings for zoomooz explicitly. */
    $.zoomooz.setup = function(settings) {
        $.zoomooz.defaultSettings = jQuery.extend(constructDefaultSettings(), settings);
    };
    
    /* returns the zooming settings of a particular element. used by zoomTarget. */
    $.fn.zoomSettings = function(settings) {
        var retValue;
        this.each(function() {
            var $elem = $(this);
            retValue = setupElementSettings($elem, settings);
        });
        return retValue;
    }
    
    /* the main zooming method. */
    $.fn.zoomTo = function(settings, skipElementSettings) {
        this.each(function() {
            var $this = $(this);
            
            if(!skipElementSettings) {
                settings = $this.zoomSettings(settings);
            }
            
            zoomTo($this, settings);
            
            if(settings.debug) {
            	if($("#debug").length===0) {
					$(settings.root).append('<div id="debug"><div>');
				} else {
					$("#debug").html("");
				}
				showDebug($this,settings);
            } else {
            	if($("#debug").length!==0) {
					$("#debug").html("");
				}
            }
        });
        
        return this;
    };
    
    //**********************************//
    //***  Setup functions           ***//
    //**********************************//
    
    function setupElementSettings($elem, baseSettings) {
    
        var settings = jQuery.extend({}, baseSettings);
        
        if(!$.zoomooz.defaultSettings) {
            $.zoomooz.setup();
        }
        
        var defaultSettings = $.zoomooz.defaultSettings;
        var elementSettings = jQuery.extend({},settings);
        
        for(var key in defaultSettings) {
            if (defaultSettings.hasOwnProperty(key) && !elementSettings[key]) {
                elementSettings[key] = $elem.data(key);
            }
        }
        
        // FIXME: it would be better, that the animationSettings
        // would come from the jquery.zoomooz-anim file somehow
        for(var i=0;i<animationSettings.length;i++) {
            var key = animationSettings[i];
            if(!elementSettings[key]) {
                elementSettings[key] = $elem.data(key);
            }
        }
        
        return jQuery.extend({}, defaultSettings, elementSettings);
    }
    
    /* setup css styles in javascript to not need an extra zoomooz.css file for the user to load.
       having the styles here helps also at keeping the css requirements minimal. */
    function setupCssStyles() {
        var style = document.createElement('style');
        style.type = 'text/css';
        
        var transformOrigin = "";
        helpers.forEachPrefix(function(prefix) {
            transformOrigin += prefix+"transform-origin: 0 0;";
        },true);
           
        // FIXME: how to remove the html height requirement?
        // FIXME: how to remove the transform origin?
        style.innerHTML = "html {height:100%;}" +
                          ".noScroll{overflow:hidden !important;}" +
                          "body.noScroll,html.noScroll body{margin-right:15px;}" +
                          "* {"+transformOrigin+"}";
        
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    function constructDefaultSettings() {
        return {
            targetsize: 0.9,
            scalemode: "both",
            root: $(document.body),
            debug: false,
            animationendcallback: null,
            closeclick: false
        };
    }
    
    //**********************************//
    //***  Main zoom function        ***//
    //**********************************//
    
    function zoomTo(elem, settings) {
    
        var scrollData = handleScrolling(elem, settings);
        
        var rootTransformation;
        var animationendcallback = null;
        
        setTransformOrigin(settings.root);
        
        // computeTotalTransformation does not work correctly if the
        // element and the root are the same
        if(elem[0] !== settings.root[0]) {
            var inv = computeTotalTransformation(elem, settings.root).inverse();
            rootTransformation = computeViewportTransformation(elem, inv, settings);
        	
        	if(settings.animationendcallback) {
                animationendcallback = function() {
                    settings.animationendcallback.call(elem[0]);
                };
            }
        	
        } else {
        
            
            rootTransformation = (new PureCSSMatrix()).translate(-scrollData.x,-scrollData.y);
            animationendcallback = function() {
                var $root = $(settings.root);
                var $scroll = scrollData.elem;
                
                $scroll.removeClass("noScroll");
                
                $root.setTransformation(new PureCSSMatrix());
                $root.data("original-scroll",null);
                
                $(document).off("touchmove");
                
                // this needs to be after the setTransformation and
                // done with window.scrollTo to not have iPhone repaints
                if($scroll[0]==document.body || $scroll[0]==window) {
                    window.scrollTo(scrollData.x,scrollData.y);
                } else {
                    $scroll.scrollLeft(scrollData.x);
                    $scroll.scrollTop(scrollData.y);
                }
                
                if(settings.animationendcallback) {
                    settings.animationendcallback.call(elem[0]);
                }
            };
        }
        
        var animationstartedcallback = null;
        if(scrollData && scrollData.animationstartedcallback) {
            animationstartedcallback = scrollData.animationstartedcallback;
        }
        
        $(settings.root).animateTransformation(rootTransformation, settings, animationendcallback, animationstartedcallback);
        
    }
    
    //**********************************//
    //***  Handle scrolling          ***//
    //**********************************//
    
    function handleScrolling(elem, settings) {
    	
    	var $root = settings.root;
    	var $scroll = $root.parent();
    	
    	if(elem[0] === $root[0]) {
        
            var scrollData = $root.data("original-scroll");
            if(scrollData) {
                return scrollData;
            } else {
                return {"elem": $scroll, "x":0,"y:":0};
            }
            
        } else if(!$root.data("original-scroll")) {
        
            // safari
            var scrollY = $root.scrollTop();
            var scrollX = $root.scrollLeft();
            var elem = $root;
            
            // moz
            if(!scrollY) {
                scrollY = $scroll.scrollTop();
                scrollX = $scroll.scrollLeft();
                elem = $scroll;
            }
            
            var scrollData = {"elem":elem,"x":scrollX,"y":scrollY};
            $root.data("original-scroll",scrollData);
            
            $(document).on("touchmove", function(e) {
                e.preventDefault();
            });
            
            var transformStr = "translate(-"+scrollX+"px,-"+scrollY+"px)";
            helpers.forEachPrefix(function(prefix) {
                $root.css(prefix+"transform", transformStr);
            });
            
            elem.addClass("noScroll");
            
            scrollData.animationstartedcallback = function() {
                
                // this needs to be after the setTransformation and
                // done with window.scrollTo to not have iPhone repaints
                if(elem[0]==document.body || elem[0]==document) {
                    window.scrollTo(0,0);
                } else {
                    elem.scrollLeft(0);
                    elem.scrollTop(0);
                }
                
            };
            
            return scrollData;
	    }
	}
			
    //**********************************//
    //***  Element positioning       ***//
    //**********************************//
    
    function setTransformOrigin(zoomParent) {
        var zoomViewport = $(zoomParent).parent();
        
        var dw = zoomViewport.width();
        var dh = zoomViewport.height();
        
        var xrotorigin = dw/2.0;
        var yrotorigin = dh/2.0;
        
        var offsetStr = printFixedNumber(xrotorigin)+"px "+printFixedNumber(yrotorigin)+"px";
        
        helpers.forEachPrefix(function(prefix) {
             zoomParent.css(prefix+"transform-origin", offsetStr);
        });    
    }
    
    function computeViewportTransformation(elem, endtrans, settings) {
        var zoomAmount = settings.targetsize;
        var zoomMode = settings.scalemode;
        var zoomParent = settings.root;
        var zoomViewport = $(zoomParent).parent();
        
        var dw = zoomViewport.width();
        var dh = zoomViewport.height();
        
        var relw = dw/elem.outerWidth();
        var relh = dh/elem.outerHeight();
        
        var scale;
        if(zoomMode=="width") {
            scale = zoomAmount*relw;
        } else if(zoomMode=="height") {
            scale = zoomAmount*relh;
        } else if(zoomMode=="both") {
            scale = zoomAmount*Math.min(relw,relh);
        } else if(zoomMode=="scale") {
        	scale = zoomAmount;
        } else {
            console.log("wrong zoommode");
            return;
        }
        
        var xoffset = (dw-elem.outerWidth()*scale)/2.0;
        var yoffset = (dh-elem.outerHeight()*scale)/2.0;
        
        var xrotorigin = dw/2.0;
        var yrotorigin = dh/2.0;
        
        /* fix for body margins, hope that this does not break anything .. */
        /* see also the part of the fix that is in computeTotalTransformation! */
        var xmarginfix = -parseFloat(zoomParent.css("margin-left")) || 0;
        var ymarginfix = -parseFloat(zoomParent.css("margin-top")) || 0;
        
        var viewportTransformation = 
            (new PureCSSMatrix())
            .translate(xmarginfix,ymarginfix)
            .translate(-xrotorigin,-yrotorigin)
            .translate(xoffset,yoffset)
            .scale(scale,scale)
            .multiply(endtrans)
            .translate(xrotorigin,yrotorigin);
        
        return viewportTransformation;
    }
    
    //**********************************//
    //***  Debugging positioning     ***//
    //**********************************//
    
    function calcPoint(e,x,y) {
        return [e.a*x+e.c*y+e.e,e.b*x+e.d*y+e.f];
    }
    
    function showDebug(elem, settings) {
        var e = computeTotalTransformation(elem, settings.root).elements();
        displayLabel(calcPoint(e,0,0));
        displayLabel(calcPoint(e,0,elem.outerHeight()));
        displayLabel(calcPoint(e,elem.outerWidth(),elem.outerHeight()));
        displayLabel(calcPoint(e,elem.outerWidth(),0));
    }
    
    function displayLabel(pos) {
        var labelStyle = "width:4px;height:4px;background-color:red;position:absolute;margin-left:-2px;margin-top:-2px;";
        labelStyle += 'left:'+pos[0]+'px;top:'+pos[1]+'px;';
        var label = '<div class="debuglabel" style="'+labelStyle+'"></div>';
        $("#debug").append(label);
    }
    
    //**********************************//
    //***  Calculating element       ***//
    //***  total transformation      ***//
    //**********************************//
    
    /* Based on:
     * jQuery.fn.offset
     */
    function computeTotalTransformation(input, transformationRootElement) {
        var elem = input[0];
        if( !elem || !elem.ownerDocument ) {
            return null;
        }
        
        var totalTransformation = new PureCSSMatrix();
        
        var trans;
        if ( elem === elem.ownerDocument.body ) {
            var bOffset = jQuery.offset.bodyOffset( elem );
            trans = new PureCSSMatrix();
            trans = trans.translate(bOffset.left, bOffset.top);
            totalTransformation = totalTransformation.multiply(trans);
            return totalTransformation;
        }
        
        var support;
        if(jQuery.offset.initialize) {
            jQuery.offset.initialize();
            support = {
                fixedPosition:jQuery.offset.supportsFixedPosition,
                doesNotAddBorder:jQuery.offset.doesNotAddBorder,
                doesAddBorderForTableAndCells:jQuery.support.doesAddBorderForTableAndCells,
                subtractsBorderForOverflowNotVisible:jQuery.offset.subtractsBorderForOverflowNotVisible
            }
        } else {
            support = jQuery.support;
        }
        
        var offsetParent = elem.offsetParent;
        var doc = elem.ownerDocument;
        var computedStyle;
        var docElem = doc.documentElement;
        var body = doc.body;
        var root = transformationRootElement[0];
        var defaultView = doc.defaultView;
        var prevComputedStyle;
        if(defaultView) {
            prevComputedStyle = defaultView.getComputedStyle( elem, null );
        } else {
            prevComputedStyle = elem.currentStyle;
        }
        
        /*
        function offsetParentInsideRoot($elem, $root) {
            // FIXME:
            // wondering, should this be $root.closest()
            // or $root.parent().closest...
            var $viewport = $root.parent();
            var $offsetParent = $elem.offsetParent();
            return ($viewport[0]==$offsetParent[0]) || $viewport.closest($offsetParent).length==0;
        }
        
        console.log("inside root",offsetParentInsideRoot(input, transformationRootElement));
        */
        
        var top = elem.offsetTop;
        var left = elem.offsetLeft;
        
        var transformation = constructTransformation().translate(left,top);
        transformation = transformation.multiply(constructTransformation(elem));
        totalTransformation = transformation.multiply((totalTransformation));
        // loop from node down to root
        while ( (elem = elem.parentNode) && elem !== root) {
            top = 0; left = 0;
            if ( support.fixedPosition && prevComputedStyle.position === "fixed" ) {
                break;
            }
            computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
            top  -= elem.scrollTop;
            left -= elem.scrollLeft;
            if ( elem === offsetParent ) {
                top  += elem.offsetTop;
                left += elem.offsetLeft;
                if ( support.doesNotAddBorder && !(support.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(elem.nodeName)) ) {
                    top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
                    left += parseFloat( computedStyle.borderLeftWidth ) || 0;
                }
                offsetParent = elem.offsetParent;
            }
            if ( support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
                top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
                left += parseFloat( computedStyle.borderLeftWidth ) || 0;
            }
            prevComputedStyle = computedStyle;
            
            if(elem.offsetParent==root) {
                top -= parseFloat($(elem.offsetParent).css("margin-top")) || 0;
                left -= parseFloat($(elem.offsetParent).css("margin-left")) || 0;
            }
            
            transformation = constructTransformation().translate(left,top);
            transformation = transformation.multiply(constructTransformation(elem));
            totalTransformation = transformation.multiply(totalTransformation);
        
        }
        
        top = 0;
        left = 0;
        
        // fixme: should disable these for non-body roots?
        if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
            top  += body.offsetTop;
            left += body.offsetLeft;
        }
        if ( support.fixedPosition && prevComputedStyle.position === "fixed" ) {
            top  += Math.max( docElem.scrollTop, body.scrollTop );
            left += Math.max( docElem.scrollLeft, body.scrollLeft );
        }
        
        var itertrans = (new PureCSSMatrix()).translate(left,top);
        totalTransformation = totalTransformation.multiply(itertrans);
        
        return totalTransformation;
        
    }
    
    //**********************************//
    //***  Helpers                   ***//
    //**********************************//
    
    function printFixedNumber(x) {
        return Number(x).toFixed(6);
    }
    
    function constructTransformation(elem) {
        var rawTrans = helpers.getElementTransform(elem);
        if(!rawTrans) {
            return new PureCSSMatrix();
        } else {
            return new PureCSSMatrix(rawTrans);
        }
    }  
    
})(jQuery);
/*
 * jquery.zoomooz-zoomtarget.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    if(!$.zoomooz) {
        $.zoomooz = {};
    }
    
    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    var helpers = $.zoomooz.helpers;
    
    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
    
    $.fn.zoomTarget = function(baseSettings) {
        this.each(function() {
            var settings = $(this).zoomSettings(baseSettings);
            setupClickHandler($(this),$(this),settings);
        });
    }
    
    //**********************************//
    //***  Helper functions          ***//
    //**********************************//
    
    function setupClickHandler(clickTarget, zoomTarget, settings) {
        clickTarget.addClass("zoomTarget");
    
        if(!settings.animationendcallback) {
            if(!settings.closeclick) {
                settings.animationendcallback = function() {
                    $(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");
                    clickTarget.addClass("selectedZoomTarget zoomNotClickable");
                };
            } else {
                settings.animationendcallback = function() {
                    $(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");
                    clickTarget.addClass("selectedZoomTarget");
                };
            }
        }
        
        var zoomContainer = zoomTarget.closest(".zoomContainer");
        if(zoomContainer.length!=0) {
            settings.root = zoomContainer;
        }
        
        var $root = settings.root;
            
        if(!$root.hasClass("zoomTarget")) {
        
            var rootSettings = $root.zoomSettings({});
            
            rootSettings.animationendcallback = function() {
                var $elem = $(this);
                $(".selectedZoomTarget").removeClass("selectedZoomTarget zoomNotClickable");
                $elem.addClass("selectedZoomTarget zoomNotClickable");
                $elem.parent().addClass("selectedZoomTarget zoomNotClickable");
            };
            
            setupClickHandler($root,$root,rootSettings);
            setupClickHandler($root.parent(),$root,rootSettings);
            
            // FIXME: there could be many of these called simultaneously,
            // don't know what would happen then
            $root.click();
        }
        
        clickTarget.on("click", function(evt) {
            
            // closeclick not available here...
            if(settings.closeclick && zoomTarget.hasClass("selectedZoomTarget")) {
                settings.root.click();
            } else {
                zoomTarget.zoomTo(settings);
            }
            evt.stopPropagation();
        });
    }
    
    //**********************************//
    //***  Setup functions           ***//
    //**********************************//
    
    /* setup css styles in javascript to not need an extra zoomooz.css file for the user to load.
       having the styles here helps also at keeping the css requirements minimal. */
    function setupCssStyles() {
        var style = document.createElement('style');
        style.type = 'text/css';
        
        function setupSelectionCss(enabled) {
            var selectionString = "-webkit-touch-callout: "+(enabled?"default":"none")+";";
            helpers.forEachPrefix(function(prefix) {
                selectionString += prefix+"user-select:"+(enabled?"text":"none")+";";
            },true);
            return selectionString;
        }
                   
        // FIXME: how to remove the html height requirement?
        // FIXME: how to remove the transform origin?
        style.innerHTML = ".zoomTarget{"+setupSelectionCss(false)+"}"+
                          ".zoomTarget:hover{cursor:pointer!important;}"+
                          ".zoomNotClickable{"+setupSelectionCss(true)+"}"+
                          ".zoomNotClickable:hover{cursor:auto!important;}"+
                          /* padding to fix margin collapse issues */
                          ".zoomContainer{position:relative;padding:1px;margin:-1px;}";
                          
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    
    //**********************************//
    //***  Static setup              ***//
    //**********************************//
    
    setupCssStyles();
    
    // make all elements with the zoomTarget class zooming
    $(document).ready(function() {
        // this needs to be after the "$.fn.zoomTarget" has been initialized
        $(".zoomTarget").zoomTarget();
    });

})(jQuery);

/*
 * jquery.zoomooz-container.js, part of:
 * http://janne.aukia.com/zoomooz
 *
 * LICENCE INFORMATION:
 *
 * Copyright (c) 2010 Janne Aukia (janne.aukia.com)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL Version 2 (GPL-LICENSE.txt) licenses.
 *
 */

/*jslint sub: true */

(function($) {
    "use strict";

    if(!$.zoomooz) {
        $.zoomooz = {};
    }
    
    //**********************************//
    //***  Variables                 ***//
    //**********************************//
    
    //var helpers = $.zoomooz.helpers;

    
    //**********************************//
    //***  jQuery functions          ***//
    //**********************************//
    
    $.fn.zoomContainer = function(settings) {
    
        // add next and previous calls to the canvas
        // (auto detect next and previous buttons)
    
    }

    //**********************************//
    //***  Static setup              ***//
    //**********************************//
    
    // FIXME: move zoomContainer styling here?
    //setupCssStyles();
    
    // make all elements with the zoomContainer class zooming containers
    $(document).ready(function() {
        // this needs to be after the "$.fn.zoomContainer" has been initialized
        $(".zoomContainer").zoomContainer();
    });
    
})(jQuery);

// Everything but the relevant parts stripped out by Janne Aukia
// for Zoomooz on April 4 2012 by using jscoverage coverage analysis tool.

// === Sylvester ===
// Vector and Matrix mathematics modules for JavaScript
// Copyright (c) 2007 James Coglan
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the "Software"),
// to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense,
// and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

var Sylvester = {
  version: '0.1.3',
  precision: 1e-6
};

function Matrix() {}
Matrix.prototype = {

  // Returns a copy of the matrix
  dup: function() {
    return Matrix.create(this.elements);
  },
  
  // Maps the matrix to another matrix (of the same dimensions) according to the given function
  /*map: function(fn) {
    var els = [], ni = this.elements.length, ki = ni, i, nj, kj = this.elements[0].length, j;
    do { i = ki - ni;
      nj = kj;
      els[i] = [];
      do { j = kj - nj;
        els[i][j] = fn(this.elements[i][j], i + 1, j + 1);
      } while (--nj);
    } while (--ni);
    return Matrix.create(els);
  },*/

  // Returns true iff the matrix can multiply the argument from the left
  canMultiplyFromLeft: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    // this.columns should equal matrix.rows
    return (this.elements[0].length == M.length);
  },
  
  // Returns the result of multiplying the matrix from the right by the argument.
  // If the argument is a scalar then just multiply all the elements. If the argument is
  // a vector, a vector is returned, which saves you having to remember calling
  // col(1) on the result.
  multiply: function(matrix) {
    /*if (!matrix.elements) {
      return this.map(function(x) { return x * matrix; });
    }*/
    var returnVector = matrix.modulus ? true : false;
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    if (!this.canMultiplyFromLeft(M)) { return null; }
    var ni = this.elements.length, ki = ni, i, nj, kj = M[0].length, j;
    var cols = this.elements[0].length, elements = [], sum, nc, c;
    do { i = ki - ni;
      elements[i] = [];
      nj = kj;
      do { j = kj - nj;
        sum = 0;
        nc = cols;
        do { c = cols - nc;
          sum += this.elements[i][c] * M[c][j];
        } while (--nc);
        elements[i][j] = sum;
      } while (--nj);
    } while (--ni);
    var M = Matrix.create(elements);
    return returnVector ? M.col(1) : M;
  },

  // Returns true iff the matrix is square
  isSquare: function() {
    return (this.elements.length == this.elements[0].length);
  },

  // Make the matrix upper (right) triangular by Gaussian elimination.
  // This method only adds multiples of rows to other rows. No rows are
  // scaled up or switched, and the determinant is preserved.
  toRightTriangular: function() {
    var M = this.dup(), els;
    var n = this.elements.length, k = n, i, np, kp = this.elements[0].length, p;
    do { i = k - n;
      if (M.elements[i][i] == 0) {
        for (j = i + 1; j < k; j++) {
          if (M.elements[j][i] != 0) {
            els = []; np = kp;
            do { p = kp - np;
              els.push(M.elements[i][p] + M.elements[j][p]);
            } while (--np);
            M.elements[i] = els;
            break;
          }
        }
      }
      if (M.elements[i][i] != 0) {
        for (j = i + 1; j < k; j++) {
          var multiplier = M.elements[j][i] / M.elements[i][i];
          els = []; np = kp;
          do { p = kp - np;
            // Elements with column numbers up to an including the number
            // of the row that we're subtracting can safely be set straight to
            // zero, since that's the point of this routine and it avoids having
            // to loop over and correct rounding errors later
            els.push(p <= i ? 0 : M.elements[j][p] - M.elements[i][p] * multiplier);
          } while (--np);
          M.elements[j] = els;
        }
      }
    } while (--n);
    return M;
  },

  // Returns the determinant for square matrices
  determinant: function() {
    if (!this.isSquare()) { return null; }
    var M = this.toRightTriangular();
    var det = M.elements[0][0], n = M.elements.length - 1, k = n, i;
    do { i = k - n + 1;
      det = det * M.elements[i][i];
    } while (--n);
    return det;
  },

  // Returns true iff the matrix is singular
  isSingular: function() {
    return (this.isSquare() && this.determinant() === 0);
  },

  // Returns the result of attaching the given argument to the right-hand side of the matrix
  augment: function(matrix) {
    var M = matrix.elements || matrix;
    if (typeof(M[0][0]) == 'undefined') { M = Matrix.create(M).elements; }
    var T = this.dup(), cols = T.elements[0].length;
    var ni = T.elements.length, ki = ni, i, nj, kj = M[0].length, j;
    if (ni != M.length) { return null; }
    do { i = ki - ni;
      nj = kj;
      do { j = kj - nj;
        T.elements[i][cols + j] = M[i][j];
      } while (--nj);
    } while (--ni);
    return T;
  },

  // Returns the inverse (if one exists) using Gauss-Jordan
  inverse: function() {
    if (!this.isSquare() || this.isSingular()) { return null; }
    var ni = this.elements.length, ki = ni, i, j;
    var M = this.augment(Matrix.I(ni)).toRightTriangular();
    var np, kp = M.elements[0].length, p, els, divisor;
    var inverse_elements = [], new_element;
    // Matrix is non-singular so there will be no zeros on the diagonal
    // Cycle through rows from last to first
    do { i = ni - 1;
      // First, normalise diagonal elements to 1
      els = []; np = kp;
      inverse_elements[i] = [];
      divisor = M.elements[i][i];
      do { p = kp - np;
        new_element = M.elements[i][p] / divisor;
        els.push(new_element);
        // Shuffle of the current row of the right hand side into the results
        // array as it will not be modified by later runs through this loop
        if (p >= ki) { inverse_elements[i].push(new_element); }
      } while (--np);
      M.elements[i] = els;
      // Then, subtract this row from those above it to
      // give the identity matrix on the left hand side
      for (j = 0; j < i; j++) {
        els = []; np = kp;
        do { p = kp - np;
          els.push(M.elements[j][p] - M.elements[i][p] * M.elements[j][i]);
        } while (--np);
        M.elements[j] = els;
      }
    } while (--ni);
    return Matrix.create(inverse_elements);
  },

  // Set the matrix's elements from an array. If the argument passed
  // is a vector, the resulting matrix will be a single column.
  setElements: function(els) {
    var i, elements = els.elements || els;
    if (typeof(elements[0][0]) != 'undefined') {
      var ni = elements.length, ki = ni, nj, kj, j;
      this.elements = [];
      do { i = ki - ni;
        nj = elements[i].length; kj = nj;
        this.elements[i] = [];
        do { j = kj - nj;
          this.elements[i][j] = elements[i][j];
        } while (--nj);
      } while(--ni);
      return this;
    }
    var n = elements.length, k = n;
    this.elements = [];
    do { i = k - n;
      this.elements.push([elements[i]]);
    } while (--n);
    return this;
  }
};

// Constructor function
Matrix.create = function(elements) {
  var M = new Matrix();
  return M.setElements(elements);
};

// Identity matrix of size n
Matrix.I = function(n) {
  var els = [], k = n, i, nj, j;
  do { i = k - n;
    els[i] = []; nj = k;
    do { j = k - nj;
      els[i][j] = (i == j) ? 1 : 0;
    } while (--nj);
  } while (--n);
  return Matrix.create(els);
};
