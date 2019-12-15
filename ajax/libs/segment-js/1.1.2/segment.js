/**
 * segment - A JavaScript library to draw and animate SVG path strokes
 * @version v1.1.0
 * @link https://github.com/lmgonzalves/segment
 * @license MIT
 */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Segment = factory();
    }
}(this, function () {

    function Segment(path, begin, end, circular){
        this.path = path;
        this.reset();
        this.begin = typeof begin !== 'undefined' ? this.valueOf(begin) : 0;
        this.end = typeof end !== 'undefined' ? this.valueOf(end) : this.length;
        this.circular = typeof circular !== 'undefined' ? circular : false;
        this.timer = null;
        this.animationTimer = null;
        this.draw(this.begin, this.end, 0, {circular: this.circular});
    }

    Segment.prototype = {
        reset: function(){
            this.length = this.path.getTotalLength();
            this.path.style.strokeDashoffset = this.length * 2;
        },

        draw: function(begin, end, duration, options){
            this.circular = options && options.hasOwnProperty('circular') ? options.circular : false;
            if(duration){
                this.stop();

                var that = this;
                var delay = options && options.hasOwnProperty('delay') ? parseFloat(options.delay) * 1000 : 0;
                if(delay){
                    delete options.delay;
                    this.timer = setTimeout(function(){
                        that.draw(begin, end, duration, options);
                    }, delay);
                    return this.timer;
                }

                this.startTime = new Date();
                this.initBegin = this.begin;
                this.initEnd = this.end;
                this.finalBegin = this.valueOf(begin);
                this.finalEnd = this.valueOf(end);
                this.pausedTime = 0;
                this.duration = duration;
                this.easing = options && options.hasOwnProperty('easing') ? options.easing : null;
                this.callback = options && options.hasOwnProperty('callback') ? options.callback : null;

                this.animationTimer = requestAnimationFrame(this.play.bind(this));
            }else{
                this.path.style.strokeDasharray = this.strokeDasharray(begin, end);
            }
        },

        play: function() {
            var now = new Date();
            if (this.pausedTime) {
                this.startTime.setMilliseconds(this.startTime.getMilliseconds() + (now - this.pausedTime));
                this.pausedTime = 0;
            }
            var elapsed = (now - this.startTime) / 1000;
            var time = (elapsed / parseFloat(this.duration));
            var t = time;

            if(typeof this.easing === 'function'){
                t = this.easing(t);
            }

            if(time > 1){
                t = 1;
                this.stop();
            }else{
                this.animationTimer = requestAnimationFrame(this.play.bind(this));
            }

            this.drawStep(t);

            if(time > 1 && typeof this.callback === 'function'){
                return this.callback.call(this);
            }
        },

        pause: function() {
            if (this.animationTimer) {
                this.stop();
                this.pausedTime = new Date();
            }
        },

        resume: function() {
            if (!this.animationTimer) {
                this.animationTimer = requestAnimationFrame(this.play.bind(this));
            }
        },

        stop: function(){
            cancelAnimationFrame(this.animationTimer);
            this.animationTimer = null;
            clearTimeout(this.timer);
            this.timer = null;
        },

        drawStep: function(t) {
            this.begin = this.initBegin + (this.finalBegin - this.initBegin) * t;
            this.end = this.initEnd + (this.finalEnd - this.initEnd) * t;

            this.begin = this.begin < 0 && !this.circular ? 0 : this.begin;
            this.begin = this.begin > this.length && !this.circular ? this.length : this.begin;
            this.end = this.end < 0 && !this.circular ? 0 : this.end;
            this.end = this.end > this.length && !this.circular ? this.length : this.end;

            if (this.end - this.begin <= this.length && this.end - this.begin > 0) {
                this.draw(this.begin, this.end, 0, {circular: this.circular});
            } else {
                if (this.circular && this.end - this.begin > this.length) {
                    this.draw(0, this.length, 0, {circular: this.circular});
                } else {
                    this.draw(this.begin + (this.end - this.begin), this.end - (this.end - this.begin), 0, {circular: this.circular});
                }
            }
        },

        strokeDasharray: function(begin, end){
            this.begin = this.valueOf(begin);
            this.end = this.valueOf(end);
            if(this.circular){
                var division = this.begin > this.end || (this.begin < 0 && this.begin < this.length * -1)
                    ? parseInt(this.begin / parseInt(this.length)) : parseInt(this.end / parseInt(this.length));
                if(division !== 0){
                    this.begin = this.begin - this.length * division;
                    this.end = this.end - this.length * division;
                }
            }
            if(this.end > this.length){
                var plus = this.end - this.length;
                return [this.length, this.length, plus, this.begin - plus, this.end - this.begin].join(' ');
            }
            if(this.begin < 0){
                var minus = this.length + this.begin;
                if(this.end < 0){
                    return [this.length, this.length + this.begin, this.end - this.begin, minus - this.end, this.end - this.begin, this.length].join(' ');
                }else{
                    return [this.length, this.length + this.begin, this.end - this.begin, minus - this.end, this.length].join(' ');
                }
            }
            return [this.length, this.length + this.begin, this.end - this.begin].join(' ');
        },

        valueOf: function(input){
            var val = parseFloat(input);
            if(typeof input === 'string' || input instanceof String){
                if(~input.indexOf('%')){
                    var arr;
                    if(~input.indexOf('+')){
                        arr = input.split('+');
                        val = this.percent(arr[0]) + parseFloat(arr[1]);
                    }else if(~input.indexOf('-')){
                        arr = input.split('-');
                        if(arr.length === 3){
                            val = -this.percent(arr[1]) - parseFloat(arr[2]);
                        }else{
                            val = arr[0] ? this.percent(arr[0]) - parseFloat(arr[1]) : -this.percent(arr[1]);
                        }
                    }else{
                        val = this.percent(input);
                    }
                }
            }
            return val;
        },

        percent: function(value){
            return parseFloat(value) / 100 * this.length;
        }
    };

    return Segment;

}));
