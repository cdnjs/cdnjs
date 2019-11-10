/*
    radialIndicator.js v 1.4.0
    Author: Sudhanshu Yadav
    Copyright (c) 2015,2016 Sudhanshu Yadav - ignitersworld.com , released under the MIT license.
    Demo on: ignitersworld.com/lab/radialIndicator.html
*/
;(function (factory) {
    /** support UMD ***/
    var global = Function('return this')() || (42, eval)('this');
    if (typeof define === "function" && define.amd) {
        define(["jquery"], function ($) {
            return (global.radialIndicator = factory($, global));
        });
    } else if (typeof module === "object" && module.exports) {
        module.exports = global.document ?
            factory(require("jquery"), global) :
            function (w) {
                if (!w.document) {
                    throw new Error("radialIndiactor requires a window with a document");
                }
                return factory(require("jquery")(w), w);
            };
    } else {
        global.radialIndicator = factory(global.jQuery, global);
    }
}(function ($, window, undefined) {

    var document = window.document;

    "use strict";
    //circumfence and quart value to start bar from top
    var circ = Math.PI * 2,
        quart = Math.PI / 2;


    //function to smooth canvas drawing for ratina devices

    //method to manage device pixel ratio in ratina devices
    var smoothCanvas = (function() {
        var ctx = document.createElement("canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx.webkitBackingStorePixelRatio ||
                ctx.mozBackingStorePixelRatio ||
                ctx.msBackingStorePixelRatio ||
                ctx.oBackingStorePixelRatio ||
                ctx.backingStorePixelRatio || 1,

            ratio = dpr / bsr; //PIXEL RATIO

        return function(w, h, canvasElm) {
            var can = canvasElm || document.createElement("canvas");
            can.width = w * ratio;
            can.height = h * ratio;
            can.style.width = w + "px";
            can.style.height = h + "px";
            can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
            return can;
        }
    }());

    //function to convert hex to rgb
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
    }

    function getPropVal(curShift, perShift, bottomRange, topRange) {
        return Math.round(bottomRange + ((topRange - bottomRange) * curShift / perShift));
    }


    //function to get current color in case of
    function getCurrentColor(curPer, bottomVal, topVal, bottomColor, topColor) {
        var rgbAryTop = topColor.indexOf('#') != -1 ? hexToRgb(topColor) : topColor.match(/\d+/g),
            rgbAryBottom = bottomColor.indexOf('#') != -1 ? hexToRgb(bottomColor) : bottomColor.match(/\d+/g),
            perShift = topVal - bottomVal,
            curShift = curPer - bottomVal;

        if (!rgbAryTop || !rgbAryBottom) return null;

        return 'rgb(' + getPropVal(curShift, perShift, rgbAryBottom[0], rgbAryTop[0]) + ',' + getPropVal(curShift, perShift, rgbAryBottom[1], rgbAryTop[1]) + ',' + getPropVal(curShift, perShift, rgbAryBottom[2], rgbAryTop[2]) + ')';
    }

    //to merge object
    function merge() {
        var arg = arguments,
            target = arg[0];
        for (var i = 1, ln = arg.length; i < ln; i++) {
            var obj = arg[i];
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    target[k] = obj[k];
                }
            }
        }
        return target;
    }

    //function to apply formatting on number depending on parameter
    function formatter(pattern) {
        return function(num) {
            if (!pattern) return num.toString();
            num = num || 0
            var numRev = num.toString().split('').reverse(),
                output = pattern.split("").reverse(),
                i = 0,
                lastHashReplaced = 0;

            //changes hash with numbers
            for (var ln = output.length; i < ln; i++) {
                if (!numRev.length) break;
                if (output[i] == "#") {
                    lastHashReplaced = i;
                    output[i] = numRev.shift();
                }
            }

            //add overflowing numbers before prefix
            output.splice(lastHashReplaced + 1, output.lastIndexOf('#') - lastHashReplaced, numRev.reverse().join(""));

            return output.reverse().join('');
        }
    }


    //circle bar class
    function Indicator(container, indOption) {
        var self = this;

        indOption = indOption || {};
        indOption = merge({}, radialIndicator.defaults, indOption);

        this.indOption = indOption;

        //create a queryselector if a selector string is passed in container
        if (typeof container == "string")
            container = document.querySelector(container);

        //get the first element if container is a node list
        if (container.length)
            container = container[0];

        this.container = container;

        //create a canvas element
        var canElm = document.createElement("canvas");
        container.appendChild(canElm);

        this.canElm = canElm; // dom object where drawing will happen

        this.ctx = canElm.getContext('2d'); //get 2d canvas context

        //add intial value
        this.current_value = indOption.initValue || indOption.minValue || 0;


        //handeling user interaction
        var startListener = function(e) {
            if (!indOption.interaction) return;

            var touchMove = e.type == "touchstart" ? "touchmove" : "mousemove",
                touchEnd = e.type == "touchstart" ? "touchend" : "mouseup",
                position = canElm.getBoundingClientRect(),
                cy = position.top + canElm.offsetHeight / 2,
                cx = position.left + canElm.offsetWidth / 2;

            var moveListener = function(e) {
                e.preventDefault();

                //get the cordinates
                var mx = e.clientX || e.touches[0].clientX,
                    my = e.clientY || e.touches[0].clientY,
                    radian = (circ + quart + Math.atan2((my - cy), (mx - cx))) % (circ + 0.0175),
                    radius = (indOption.radius - 1 + indOption.barWidth / 2),
                    circum = circ * radius,
                    precision = indOption.precision != null ? indOption.precision : 0,
                    precisionNo = Math.pow(10, precision),
                    val = Math.round(precisionNo * radian * radius * (indOption.maxValue - indOption.minValue) / circum) / precisionNo;

                self.value(val);
            };

            var endListener = function() {
                document.removeEventListener(touchMove, moveListener, false);
                document.removeEventListener(touchEnd, endListener, false);
            };

            document.addEventListener(touchMove, moveListener, false);
            document.addEventListener(touchEnd, endListener, false);
        };

        canElm.addEventListener('touchstart', startListener, false);
        canElm.addEventListener('mousedown', startListener, false);


        canElm.addEventListener("mousewheel", MouseWheelHandler, false);
        canElm.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

        function MouseWheelHandler(e) {
            if (!indOption.interaction) return;
            e.preventDefault();

            // cross-browser wheel delta
            var delta = -(Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)))),
                precision = indOption.precision != null ? indOption.precision : 0,
                precisionNo = Math.pow(10, precision),
                diff = indOption.maxValue - indOption.minValue,
                val = self.current_value + Math.round(precisionNo * delta * diff / Math.min(diff, 100)) / precisionNo;

            self.value(val);

            return false;
        }
    }


    Indicator.prototype = {
        constructor: radialIndicator,
        _init: function() {
            var indOption = this.indOption,
                canElm = this.canElm,
                ctx = this.ctx,
                dim = (indOption.radius + indOption.barWidth) * 2; //elm width and height

            //create a formatter function
            this.formatter = typeof indOption.format == "function" ? indOption.format : formatter(indOption.format);

            //maximum text length;
            this.maxLength = indOption.percentage ? 4 : this.formatter(indOption.maxValue).length;

            //smooth the canvas elm for ratina display
            smoothCanvas(dim, dim, canElm);

            //draw background bar
            this._drawBarBg();

            //put the initial value if defined
            this.value(this.current_value);

            return this;
        },
        //draw background bar
        _drawBarBg: function() {
            var indOption = this.indOption,
                ctx = this.ctx,
                dim = (indOption.radius + indOption.barWidth) * 2, //elm width and height
                center = dim / 2; //center point in both x and y axis

            //draw nackground circle
            ctx.strokeStyle = indOption.barBgColor; //background circle color
            ctx.lineWidth = indOption.barWidth;
            if (indOption.barBgColor != "transparent") {
                ctx.beginPath();
                ctx.arc(center, center, indOption.radius - 1 + indOption.barWidth / 2, 0, 2 * Math.PI);
                ctx.stroke();
            }
        },
        //update the value of indicator without animation
        value: function(val) {
            //return the val if val is not provided
            if (val === undefined || isNaN(val)) {
                return this.current_value;
            }

            val = parseFloat(val);

            var ctx = this.ctx,
                indOption = this.indOption,
                curColor = indOption.barColor,
                dim = (indOption.radius + indOption.barWidth) * 2,
                minVal = indOption.minValue,
                maxVal = indOption.maxValue,
                center = dim / 2;

            //limit the val in range of minumum and maximum value
            val = val < minVal ? minVal : val > maxVal ? maxVal : val;

            var precision = indOption.precision != null ? indOption.precision : 0,
                precisionNo = Math.pow(10, precision),
                perVal = Math.round(((val - minVal) * precisionNo / (maxVal - minVal)) * 100) / precisionNo, //percentage value tp two decimal precision
                dispVal = indOption.percentage ? perVal + '%' : this.formatter(val); //formatted value

            //save val on object
            this.current_value = val;


            //draw the bg circle
            ctx.clearRect(0, 0, dim, dim);
            this._drawBarBg();

            //get current color if color range is set
            if (typeof curColor == "object") {
                var range = Object.keys(curColor);

                for (var i = 1, ln = range.length; i < ln; i++) {
                    var bottomVal = range[i - 1],
                        topVal = range[i],
                        bottomColor = curColor[bottomVal],
                        topColor = curColor[topVal],
                        newColor = val == bottomVal ? bottomColor : val == topVal ? topColor : val > bottomVal && val < topVal ? indOption.interpolate ? getCurrentColor(val, bottomVal, topVal, bottomColor, topColor) : topColor : false;

                    if (newColor != false) {
                        curColor = newColor;
                        break;
                    }
                }
            }

            //draw th circle value
            ctx.strokeStyle = curColor;

            //add linecap if value setted on options
            if (indOption.roundCorner) ctx.lineCap = "round";

            ctx.beginPath();
            var start, end
            if (indOption.reverse) {
                start = circ * ((100 - perVal) / 100) - quart
                // Start and end can't be equal or nothing is rendered
                // so shave of a tiny amount of the end
                end = (-quart) - 0.00001
            } else {
                start = -(quart)
                end = ((circ) * perVal / 100) - quart
            }
            ctx.arc(center, center, indOption.radius - 1 + indOption.barWidth / 2, start, end, false);
            ctx.stroke();

            //add percentage text
            if (indOption.displayNumber) {
                var cFont = ctx.font.split(' '),
                    weight = indOption.fontWeight,
                    fontSize = indOption.fontSize || (dim / (this.maxLength - (Math.floor(this.maxLength * 1.4 / 4) - 1)));

                cFont = indOption.fontFamily || cFont[cFont.length - 1];

                ctx.fillStyle = indOption.fontColor || curColor;
                ctx.font = weight + " " + fontSize + "px " + cFont;
                ctx.textAlign = "center";
                ctx.textBaseline = indOption.textBaseline;
                ctx.fillText(dispVal, center, center);
            }

            //call onChange callback
            indOption.onChange.call(this.container,val);

            return this;
        },
        //animate progressbar to the value
        animate: function(val) {
            var indOption = this.indOption,
                counter = this.current_value || indOption.minValue,
                self = this,
                minVal = indOption.minValue,
                maxVal = indOption.maxValue,
                frameNum = indOption.frameNum || (indOption.percentage ? 100 : 500),
                precision = indOption.precision != null ? indOption.precision : Math.ceil(Math.log(maxVal - minVal / frameNum)),
                precisionNo = Math.pow(10, precision),
                incBy = (maxVal - minVal) / frameNum ; //increment by .2% on every tick and 1% if showing as percentage

            //limit the val in range of minumum and maximum value
            val = val < minVal ? minVal : val > maxVal ? maxVal : val;

            var back = val < counter;

            //clear interval function if already started
            if (this.intvFunc) clearInterval(this.intvFunc);

            this.intvFunc = setInterval(function() {

                if ((!back && counter >= val) || (back && counter <= val)) {
                    if (self.current_value == counter) {
                        clearInterval(self.intvFunc);
                        if (indOption.onAnimationComplete) indOption.onAnimationComplete(self.current_value);
                        return;
                    } else {
                        counter = val;
                    }
                }

                self.value(counter); //dispaly the value

                if (counter != val) {
                    counter = Math.round((counter + (back ? -incBy : incBy)) * precisionNo) / precisionNo;
                } //increment or decrement till counter does not reach  to value
            }, indOption.frameTime);

            return this;
        },
        //method to update options
        option: function(key, val) {
            if (val === undefined) return this.option[key];

            if (['radius', 'barWidth', 'barBgColor', 'format', 'maxValue', 'percentage'].indexOf(key) != -1) {
                this.indOption[key] = val;
                this._init().value(this.current_value);
            }
            this.indOption[key] = val;
        }

    };

    /** Initializer function **/
    function radialIndicator(container, options) {
        var progObj = new Indicator(container, options);
        progObj._init();
        return progObj;
    }

    //radial indicator defaults
    radialIndicator.defaults = {
        reverse: false,
        radius: 50, //inner radius of indicator
        barWidth: 5, //bar width
        barBgColor: '#eeeeee', //unfilled bar color
        barColor: '#99CC33', //filled bar color , can be a range also having different colors on different value like {0 : "#ccc", 50 : '#333', 100: '#000'}
        format: null, //format indicator numbers, can be a # formator ex (##,###.##) or a function
        frameTime: 10, //miliseconds to move from one frame to another
        frameNum: null, //Defines numbers of frame in indicator, defaults to 100 when showing percentage and 500 for other values
        fontColor: null, //font color
        fontFamily: null, //defines font family
        fontWeight: 'bold', //defines font weight
        fontSize: null, //define the font size of indicator number
        textBaseline: 'middle', //define the text base line of indicator number
        interpolate: true, //interpolate color between ranges
        percentage: false, //show percentage of value
        precision: null, //default value for precision depend on difference between min and max divided by number of frames
        displayNumber: true, //display indicator number
        roundCorner: false, //have round corner in filled bar
        minValue: 0, //minimum value
        maxValue: 100, //maximum value
        initValue: 0, //define initial value of indicator,
        interaction: false, //if true it allows to change radial indicator value using mouse or touch interaction
        onChange: function() {}
    };

    window.radialIndicator = radialIndicator;

    //add as a jquery plugin
    if ($) {
        $.fn.radialIndicator = function(options) {
            return this.each(function() {
                var newPCObj = radialIndicator(this, options);
                $.data(this, 'radialIndicator', newPCObj);
            });
        };
    }

    return radialIndicator;

}));
