/**
 * Basic structure: TC_Class is the public class that is returned upon being called
 * 
 * So, if you do
 *      var tc = $(".timer").TimeCircles();
 *      
 * tc will contain an instance of the public TimeCircles class. It is important to
 * note that TimeCircles is not chained in the conventional way, check the
 * documentation for more info on how TimeCircles can be chained.
 * 
 * After being called/created, the public TimerCircles class will then- for each element
 * within it's collection, either fetch or create an instance of the private class.
 * Each function called upon the public class will be forwarded to each instance
 * of the private classes within the relevant element collection
 **/
(function($) {
    /**
     * Converts hex color code into object containing integer values for the r,g,b use
     * This function (hexToRgb) originates from:
     * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
     * @param {string} hex color code
     */
    function hexToRgb(hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Function s4() and guid() originate from:
     * http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
     */
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    /**
     * Creates a unique id
     * @returns {String}
     */
    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    
    var TC_Instance_List = {};

    var TC_Instance = function(element, options) {
        this.element = element;
        this.container;
        this.timer = null;
        this.data = {
            text_elements: {
                Days: null,
                Hours: null,
                Minutes: null,
                Seconds: null
            },
            attributes: {
                canvas: null,
                context: null,
                item_size: null,
                line_width: null,
                radius: null,
                outer_radius: null
            },
            state: {
                fading: {
                    Days: false,
                    Hours: false,
                    Minutes: false,
                    Seconds: false
                }
            }
        };
        this.listeners = [];
        this.config = null;
        this.setOptions(options);
        
        this.container = $("<div>");
        this.container.addClass('time_circles');
        this.container.appendTo(this.element);

        this.data.attributes.canvas = $("<canvas>");
        this.data.attributes.context = this.data.attributes.canvas[0].getContext('2d');
        
        var height = this.element.offsetHeight;
        var width = this.element.offsetWidth;
        if(height === 0 && width > 0) height = width / 4;
        else if(width === 0 && height > 0) width = height * 4;
        
        this.data.attributes.canvas[0].height = height;
        this.data.attributes.canvas[0].width = width;
        this.data.attributes.canvas.appendTo(this.container);

        this.data.attributes.item_size = Math.min(this.data.attributes.canvas[0].width / 4, this.data.attributes.canvas[0].height);
        this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width;
        this.data.attributes.radius = ((this.data.attributes.item_size * 0.8) - this.data.attributes.line_width) / 2;
        this.data.attributes.outer_radius = this.data.attributes.radius + 0.5 * Math.max(this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width);

        // Prepare Time Elements
        var i = 0;
        for (var key in this.data.text_elements) {
            var textElement = $("<div>");
            textElement.addClass('textDiv_' + key);
            textElement.css("top", Math.round(0.35 * this.data.attributes.item_size));
            textElement.css("left", Math.round(i++ * this.data.attributes.item_size));
            textElement.css("width", this.data.attributes.item_size);
            textElement.appendTo(this.container);
            
            var headerElement = $("<h4>");
            headerElement.text(this.config.time[key].text); // Options
            headerElement.css("font-size", Math.round(0.07 * this.data.attributes.item_size));
            headerElement.css("line-height", Math.round(0.07 * this.data.attributes.item_size) + "px");
            headerElement.appendTo(textElement);
            
            var numberElement = $("<span>");
            numberElement.css("font-size", Math.round(0.21 * this.data.attributes.item_size));
            numberElement.css("line-height", Math.round(0.07 * this.data.attributes.item_size) + "px");
            numberElement.appendTo(textElement);
            
            this.data.text_elements[key] = numberElement;
        }

        if (this.config.start)
            this.start();
    };

    TC_Instance.prototype.updateArc = function() {
        var diff, old_diff;

        var interval = (1000 * this.config.refresh_interval);
        var curDate = new Date();

        // Compare current time with reference
        if (this.config.count_past_zero) {
            var prevDate = curDate - interval;
            diff = Math.abs(curDate - this.data.attributes.ref_date) / 1000;
            old_diff = Math.abs(this.data.attributes.ref_date - prevDate) / 1000;
        }
        else {
            diff = Math.max(this.data.attributes.ref_date - curDate, 0) / 1000;
            old_diff = diff + (curDate > this.data.attributes.ref_date) ? 0 : interval;
        }

        var time = {
            Days: (diff / 60 / 60 / 24),
            Hours: (diff / 60 / 60) % 24,
            Minutes: (diff / 60) % 60,
            Seconds: diff % 60
        };
        var pct = {
            Days: time.Days / 365,
            Hours: time.Hours / 24,
            Minutes: time.Minutes / 60,
            Seconds: time.Seconds / 60
        };

        var old_time = {
            Days: (old_diff / 60 / 60 / 24),
            Hours: (old_diff / 60 / 60) % 24,
            Minutes: (old_diff / 60) % 60,
            Seconds: old_diff % 60
        };

        var i = 0;
        var lastKey = null;
        for (var key in time) {
            // Set the text value
            this.data.text_elements[key].text(Math.floor(time[key]));

            var x = (i * this.data.attributes.item_size) + (this.data.attributes.item_size / 2);
            var y = this.data.attributes.item_size / 2;
            var color = this.config.time[key].color;

            if(Math.floor(time[key]) !== Math.floor(old_time[key])) {
                this.notifyListeners(key, Math.floor(time[key]), Math.floor(diff));
            }
            // TODO: Check options for fading == true
            if (lastKey !== null) {
                if (Math.floor(time[lastKey]) > Math.floor(old_time[lastKey])) {
                    this.radialFade(x, y, color, 1, key);
                    this.data.state.fading[key] = true;
                }
                else if (Math.floor(time[lastKey]) < Math.floor(old_time[lastKey])) {
                    this.radialFade(x, y, color, 0, key);
                    this.data.state.fading[key] = true;
                }
            }
            if (!this.data.state.fading[key]) {
                this.drawArc(x, y, color, pct[key]);
            }
            lastKey = key;
            i++;
        }
    };
    
    TC_Instance.prototype.drawArc = function(x, y, color, pct) {
        var clear_radius = Math.max(this.data.attributes.outer_radius, this.data.attributes.item_size / 2);
        this.data.attributes.context.clearRect(
            x - clear_radius,
            y - clear_radius,
            clear_radius * 2,
            clear_radius * 2
            );

        if (this.config.use_background) {
            this.data.attributes.context.beginPath();
            this.data.attributes.context.arc(x, y, this.data.attributes.radius, 0, 2 * Math.PI, false);
            this.data.attributes.context.lineWidth = this.data.attributes.line_width * this.config.bg_width;

            // line color
            this.data.attributes.context.strokeStyle = this.config.circle_bg_color;
            this.data.attributes.context.stroke();
        }

        var startAngle = (-0.5 * Math.PI);
        var endAngle = (-0.5 * Math.PI) + (2 * pct * Math.PI);
        var counterClockwise = false;

        this.data.attributes.context.beginPath();
        this.data.attributes.context.arc(x, y, this.data.attributes.radius, startAngle, endAngle, counterClockwise);
        this.data.attributes.context.lineWidth = this.data.attributes.line_width;

        // line color
        this.data.attributes.context.strokeStyle = color;
        this.data.attributes.context.stroke();
    };

    TC_Instance.prototype.radialFade = function(x, y, color, from, key) {
        // TODO: Make fade_time option
        var rgb = hexToRgb(color);
        var _this = this; // We have a few inner scopes here that will need access to our instance

        var step = 0.2 * ((from === 1) ? -1 : 1);
        var i;
        for (i = 0; from <= 1 && from >= 0; i++) {
            // Create inner scope so our variables are not changed by the time the Timeout triggers
            (function() {
                var rgba = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + (Math.round(from * 10) / 10) + ")";
                setTimeout(function() {
                    _this.drawArc(x, y, rgba, 1);
                }, 50 * i);
            }());
            from += step;
        }
        setTimeout(function() {
            _this.data.state.fading[key] = false;
        }, 50 * i);
    };

    TC_Instance.prototype.timeLeft = function() {
        var now = new Date();
        return ((this.data.attributes.ref_date - now) / 1000);
    };

    TC_Instance.prototype.start = function() {
        // Check if a date was passed in html attribute, if not, fall back to config
        var attr_data_date = $(this.element).data('date');
        if (typeof attr_data_date === "string") {
            if (attr_data_date.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/).length > 0) {
                attr_data_date = attr_data_date.replace(' ', 'T');
            }
            this.data.attributes.ref_date = Date.parse(attr_data_date);
        }
        else {
            var attr_data_timer = $(this.element).attr('data-timer');
            if (typeof attr_data_timer === "string") {
                this.data.attributes.timer = parseFloat(attr_data_timer);
                $(this.element).removeAttr('data-timer');
            }
            else if (typeof this.config.timer === "string") {
                this.data.attributes.timer = parseFloat(this.config.timer);
                this.config.timer = null;
            }
            else if (typeof this.config.timer === "number") {
                this.data.attributes.timer = _this.config.timer;
                this.config.timer = null;
            }

            if (typeof this.data.attributes.timer === "number") {
                this.data.attributes.ref_date = (new Date()).getTime() + (this.data.attributes.timer * 1000);
            }
            else {
                this.data.attributes.ref_date = this.config.ref_date;
            }
        }

        // Start running
        var _this = this;
        this.timer = setInterval(function() { _this.updateArc(); }, this.config.refresh_interval * 1000);
    };

    TC_Instance.prototype.stop = function() {
        if (typeof this.data.attributes.timer === "number") {
            this.data.attributes.timer = this.timeLeft(this);
        }
        // Stop running
        clearInterval(this.timer);
    };

    TC_Instance.prototype.destroy = function() {
        this.stop();
        this.container.remove();
        $(this.element).removeData('tc-id');
    };

    TC_Instance.prototype.setOptions = function(options) {
        if(this.config === null) {
            this.default_options.ref_date = new Date();
            this.config = $.extend(true, {}, this.default_options);
        }
        $.extend(true, this.config, options);
    };
    
    TC_Instance.prototype.addListener = function(f) {
        if(typeof f !== "function") return;
        this.listeners.push(f);
    };
    
    TC_Instance.prototype.notifyListeners = function(unit, value, total) {
        for(var i = 0; i < this.listeners.length; i++) {
            this.listeners[i](unit, value, total);
        }
    }
    
    TC_Instance.prototype.default_options = {
        ref_date: new Date(),
        start: true,
        refresh_interval: 0.1,
        count_past_zero: true,
        circle_bg_color: "#60686F",
        use_background: true,
        fg_width: 0.1,
        bg_width: 1.2,
        time: {
            Days: {
                show: true,
                text: "Days",
                color: "#FC6"
            },
            Hours: {
                show: true,
                text: "Hours",
                color: "#9CF"
            },
            Minutes: {
                show: true,
                text: "Minutes",
                color: "#BFB"
            },
            Seconds: {
                show: true,
                text: "Seconds",
                color: "#F99"
            }
        }
    };

    // Time circle class
    var TC_Class = function(elements, options) {
        this.elements = elements;
        this.options = options;
        this.foreach();
    };

    TC_Class.prototype.foreach = function(callback) {
        var _this = this;
        this.elements.each(function() {
            var instance;
            var cur_id = $(this).data("tc-id");
            if (typeof cur_id === "undefined") {
                cur_id = guid();
                $(this).data("tc-id", cur_id);
            }
            if (typeof TC_Instance_List[cur_id] === "undefined") {
                var element_options = $(this).data('options');
                var options = _this.options;
                if(typeof element_options === "object") {
                    options = $.extend(true, {}, _this.options, element_options);
                }
                instance = new TC_Instance(this, options);
                TC_Instance_List[cur_id] = instance;
            }
            else {
                instance = TC_Instance_List[cur_id];
                if (typeof _this.options !== "undefined") {
                    instance.setOptions(_this.options);
                }
            }

            if (typeof callback === "function") {
                callback(instance);
            }
        });
        return this;
    };

    TC_Class.prototype.start = function() {
        this.foreach(function(instance) {
            instance.start();
        });
        return this;
    };

    TC_Class.prototype.stop = function() {
        this.foreach(function(instance) {
            instance.stop();
        });
        return this;
    };

    TC_Class.prototype.addListener = function(f) {
        this.foreach(function(instance) {
            instance.addListener(f);
        });
        return this;
    };
    
    TC_Class.prototype.destroy = function() {
        this.foreach(function(instance) {
            instance.destroy();
        });
        return this;
    };

    TC_Class.prototype.end = function() {
        return this.elements;
    };

    $.fn.TimeCircles = function(options) {
        return new TC_Class(this, options);
    };
}(jQuery));