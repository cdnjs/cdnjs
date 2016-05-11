/**
 * segment - A little JavaScript class (without dependencies) to draw and animate SVG path strokes
 * @version v1.0.2
 * @link https://github.com/lmgonzalves/segment
 * @license MIT
 */

(function(){
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if(!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element){
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function(){ callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if(!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id){
            clearTimeout(id);
        };
}());

function Segment(path, begin, end){
    this.path = path;
    this.length = path.getTotalLength();
    this.path.style.strokeDashoffset = this.length * 2;
    this.begin = typeof begin !== 'undefined' ? this.valueOf(begin) : 0;
    this.end = typeof end !== 'undefined' ? this.valueOf(end) : this.length;
    this.circular = false;
    this.timer = null;
    this.draw(this.begin, this.end);
}

Segment.prototype = {
    draw : function(begin, end, duration, options){
        if(duration){
            var delay = options && options.hasOwnProperty('delay') ? parseFloat(options.delay) * 1000 : 0,
                easing = options && options.hasOwnProperty('easing') ? options.easing : null,
                callback = options && options.hasOwnProperty('callback') ? options.callback : null,
                that = this;

            this.circular = options && options.hasOwnProperty('circular') ? options.circular : false;

            this.stop();
            if(delay){
                delete options.delay;
                this.timer = setTimeout(function(){
                    that.draw(begin, end, duration, options);
                }, delay);
                return this.timer;
            }

            var startTime = new Date(),
                initBegin = this.begin,
                initEnd = this.end,
                finalBegin = this.valueOf(begin),
                finalEnd = this.valueOf(end);

            (function calc(){
                var now = new Date(),
                    elapsed = (now-startTime)/1000,
                    time = (elapsed/parseFloat(duration)),
                    t = time;

                if(typeof easing === 'function'){
                    t = easing(t);
                }

                if(time > 1){
                    t = 1;
                }else{
                    that.timer = window.requestAnimationFrame(calc);
                }

                that.begin = initBegin + (finalBegin - initBegin) * t;
                that.end = initEnd + (finalEnd - initEnd) * t;

                that.begin = that.begin < 0 && !that.circular ? 0 : that.begin;
                that.begin = that.begin > that.length && !that.circular ? that.length : that.begin;
                that.end = that.end < 0 && !that.circular ? 0 : that.end;
                that.end = that.end > that.length && !that.circular ? that.length : that.end;

                if(that.end - that.begin < that.length && that.end - that.begin > 0){
                    that.draw(that.begin, that.end);
                }else{
                    if(that.circular && that.end - that.begin > that.length){
                        that.draw(0, that.length);
                    }else{
                        that.draw(that.begin + (that.end - that.begin), that.end - (that.end - that.begin));
                    }
                }

                if(time > 1 && typeof callback === 'function'){
                    return callback.call(that);
                }
            })();
        }else{
            this.path.style.strokeDasharray = this.strokeDasharray(begin, end);
        }
    },

    strokeDasharray : function(begin, end){
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

    stop : function(){
        window.cancelAnimationFrame(this.timer);
        this.timer = null;
    },

    percent : function(value){
        return parseFloat(value) / 100 * this.length;
    }
};