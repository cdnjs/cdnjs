/*
    radialIndicator.js v 1.0.1
    Author: Sudhanshu Yadav
    Copyright (c) 2015 Sudhanshu Yadav - ignitersworld.com , released under the MIT license.
    Demo on: ignitersworld.com/lab/radialIndicator.html
*/

;(function ($, window, document) {
    "use strict";
    //circumfence and quart value to start bar from top
    var circ = Math.PI * 2,
        quart = Math.PI / 2;


    //function to smooth canvas drawing for ratina devices 

    //method to manage device pixel ratio in ratina devices
    var smoothCanvas = (function () {
        var ctx = document.createElement("canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1,

            ratio = dpr / bsr; //PIXEL RATIO

        return function (w, h, canvasElm) {
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
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
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
        return function (num) {
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

    }


    Indicator.prototype = {
        constructor: radialIndicator,
        init: function () {
            var indOption = this.indOption,
                canElm = this.canElm,
                ctx = this.ctx,
                dim = (indOption.radius + indOption.barWidth) * 2, //elm width and height
                center = dim / 2; //center point in both x and y axis


            //create a formatter function
            this.formatter = typeof indOption.format == "function" ? indOption.format : formatter(indOption.format);

            //maximum text length;
            this.maxLength = indOption.percentage ? 4 : this.formatter(indOption.maxValue).length;

            //smooth the canvas elm for ratina display
            smoothCanvas(dim, dim, canElm);

            //draw a grey circle
            ctx.strokeStyle = indOption.barBgColor; //background circle color
            ctx.lineWidth = indOption.barWidth;
            ctx.beginPath();
            ctx.arc(center, center, indOption.radius, 0, 2 * Math.PI);
            ctx.stroke();

            //store the image data after grey circle draw
            this.imgData = ctx.getImageData(0, 0, dim, dim);

            //put the initial value if defined
            this.value(this.current_value);

            return this;
        },
        //update the value of indicator without animation
        value: function (val) {
            //return the val if val is not provided
            if (val === undefined || isNaN(val)) {
                return this.current_value;
            }

            val = parseInt(val);

            var ctx = this.ctx,
                indOption = this.indOption,
                curColor = indOption.barColor,
                dim = (indOption.radius + indOption.barWidth) * 2,
                minVal = indOption.minValue,
                maxVal = indOption.maxValue,
                center = dim / 2;

            //limit the val in range of 0 to 100
            val = val < minVal ? minVal : val > maxVal ? maxVal : val;

            var perVal = Math.round(((val - minVal) * 100 / (maxVal - minVal)) * 100) / 100, //percentage value tp two decimal precision
                dispVal = indOption.percentage ? perVal + '%' : this.formatter(val); //formatted value

            //save val on object
            this.current_value = val;


            //draw the bg circle
            ctx.putImageData(this.imgData, 0, 0);

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
            ctx.arc(center, center, indOption.radius, -(quart), ((circ) * perVal / 100) - quart, false);
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
                ctx.textBaseline = 'middle';
                ctx.fillText(dispVal, center, center);
            }

            return this;
        },
        //animate progressbar to the value
        animate: function (val) {

            var indOption = this.indOption,
                counter = this.current_value || indOption.minValue,
                self = this,
                incBy = Math.ceil((indOption.maxValue - indOption.minValue) / (indOption.frameNum || (indOption.percentage ? 100 : 500))), //increment by .2% on every tick and 1% if showing as percentage
                back = val < counter;

            //clear interval function if already started
            if (this.intvFunc) clearInterval(this.intvFunc);

            this.intvFunc = setInterval(function () {

                if ((!back && counter >= val) || (back && counter <= val)) {
                    if (self.current_value == counter) {
                        clearInterval(self.intvFunc);
                        return;
                    } else {
                        counter = val;
                    }
                }

                self.value(counter); //dispaly the value

                if (counter != val) {
                    counter = counter + (back ? -incBy : incBy)
                }; //increment or decrement till counter does not reach  to value
            }, indOption.frameTime);

            return this;
        },
        //method to update options
        option: function (key, val) {
            if (val === undefined) return this.option[key];

            if (['radius', 'barWidth', 'barBgColor', 'format', 'maxValue', 'percentage'].indexOf(key) != -1) {
                this.indOption[key] = val;
                this.init().value(this.current_value);
            }
            this.indOption[key] = val;
        }

    };

    /** Initializer function **/
    function radialIndicator(container, options) {
        var progObj = new Indicator(container, options);
        progObj.init();
        return progObj;
    }

    //radial indicator defaults
    radialIndicator.defaults = {
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
        interpolate: true, //interpolate color between ranges
        percentage: false, //show percentage of value
        displayNumber: true, //display indicator number
        roundCorner: false, //have round corner in filled bar
        minValue: 0, //minimum value
        maxValue: 100, //maximum value
        initValue: 0 //define initial value of indicator
    };

    window.radialIndicator = radialIndicator;

    //add as a jquery plugin
    if ($) {
        $.fn.radialIndicator = function (options) {
            return this.each(function () {
                var newPCObj = radialIndicator(this, options);
                $.data(this, 'radialIndicator', newPCObj);
            });
        };
    }

}(window.jQuery, window, document, void 0));