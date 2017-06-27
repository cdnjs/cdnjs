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
    
    // Used to disable drawing on IE8, which can't use canvas
    var cant_draw = false;
    
    var debug = (location.hash === "#debug");
    function debug_log(msg) {
        if(debug) {
            console.log(msg);
        }
    }
    
    var allUnits = ["Days", "Hours", "Minutes", "Seconds"];
    var nextUnits = {
        Seconds: "Minutes",
        Minutes: "Hours",
        Hours: "Days",
        Days: "Years"
    };
    var secondsIn = {
        Seconds: 1,
        Minutes: 60,
        Hours: 3600,
        Days: 86400,
        Months: 2678400,
        Years: 31536000
    };
    
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
    
    function parse_date(str) {
        var match = str.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);
        if (match !== null && match.length > 0) {
            var parts = str.split(" ");
            var date = parts[0].split("-");
            var time = parts[1].split(":");
            return new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
        }
        // Fallback for different date formats
        var d = Date.parse(str);
        if(!isNaN(d)) return d;
        d = Date.parse(str.replace(/-/g, '/').replace('T', ' '));
        if(!isNaN(d)) return d;
        // Cant find anything
        return new Date();
    }
    
    function parse_times(diff, old_diff, total_duration, units) {
        var raw_time = {};
        var raw_old_time = {};
        var time = {};
        var pct = {};
        var old_time = {};
        
        var greater_unit = null;
        for(var i in units) {
            var unit = units[i];
            var maxUnits;
            
            if(greater_unit === null) {
                maxUnits = total_duration / secondsIn[unit];
            }
            else {
                maxUnits = secondsIn[greater_unit] / secondsIn[unit];
            }
            
            var curUnits = (diff / secondsIn[unit]);
            var oldUnits = (old_diff / secondsIn[unit]);
            
            if(unit !== "Days"){
                curUnits = curUnits % maxUnits;
                oldUnits = oldUnits % maxUnits;
            }
            
            raw_time[unit] = curUnits;
            time[unit] = Math.abs(curUnits);
            raw_old_time[unit] = oldUnits;
            old_time[unit] = Math.abs(oldUnits);
            pct[unit] = Math.abs(curUnits) / maxUnits;
            
            greater_unit = unit;
        }
        
        return {
            raw_time: raw_time,
            raw_old_time: raw_old_time,
            time: time,
            old_time: old_time,
            pct: pct
        };
    }
    
    var TC_Instance_List = {};
    // Try fetch/share instance
    if(window !== window.top && typeof window.top.TC_Instance_List !== "undefined") {
        TC_Instance_List = window.top.TC_Instance_List;
    }
    else {
        window.top.TC_Instance_List = TC_Instance_List;
    }

    var TC_Instance = function(element, options) {
        this.element = element;
        this.container;
        this.timer = null;
        this.listeners = null;
        this.data = {
            total_duration: null,
            prev_time: null,
            drawn_units: [],
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
        
        this.config = null;
        this.setOptions(options);
        this.initialize();
    };
    
    TC_Instance.prototype.initialize = function(clear_listeners) {
        // Initialize drawn units
        this.data.drawn_units = [];
        for(var unit in this.config.time) {
            if(this.config.time[unit].show){
                this.data.drawn_units.push(unit);
            }
        }
        
        // Avoid stacking
        $(this.element).children('div.time_circles').remove();
        
        if(typeof clear_listeners === "undefined") clear_listeners = true;
        if(clear_listeners || this.listeners === null) {
            this.listeners = { all: [], visible: [] };
        }
        this.container = $("<div>");
        this.container.addClass('time_circles');
        this.container.appendTo(this.element);

        this.data.attributes.canvas = $("<canvas>");
        try {
            this.data.attributes.context = this.data.attributes.canvas[0].getContext('2d');
        }
        catch(e) {
            cant_draw = true;
        }
        
        var height = this.element.offsetHeight;
        var width = this.element.offsetWidth;
        if(height === 0) height = $(this.element).height();
        if(width === 0) width = $(this.element).width();
        
        if(height === 0 && width > 0) height = width / this.data.drawn_units.length;
        else if(width === 0 && height > 0) width = height * this.data.drawn_units.length;
        
        this.data.attributes.canvas[0].height = height;
        this.data.attributes.canvas[0].width = width;
        this.data.attributes.canvas.appendTo(this.container);

        this.data.attributes.item_size = Math.min(this.data.attributes.canvas[0].width / this.data.drawn_units.length, this.data.attributes.canvas[0].height);
        this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width;
        this.data.attributes.radius = ((this.data.attributes.item_size * 0.8) - this.data.attributes.line_width) / 2;
        this.data.attributes.outer_radius = this.data.attributes.radius + 0.5 * Math.max(this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width);

        // Prepare Time Elements
        var i = 0;
        for (var key in this.data.text_elements) {
            if(!this.config.time[key].show) continue;
            
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
        
        if (this.config.start && this.timer === null)
            this.start();
    };
    
    TC_Instance.prototype.updateArc = function() {
        var diff, old_diff;

        var prevDate = this.data.prev_time;
        var curDate = new Date();
        this.data.prev_time = curDate;
        
        if(prevDate === null) prevDate = curDate;
        
        // If not counting past zero, and time < 0, then simply draw the zero point once, and call stop
        if (!this.config.count_past_zero) {
            if(curDate > this.data.attributes.ref_date) {
                for (var i in this.data.drawn_units) {
                    // TODO: listeners!
                    var key = this.data.drawn_units[i];

                    // Set the text value
                    this.data.text_elements[key].text("0");
                    var x = (i * this.data.attributes.item_size) + (this.data.attributes.item_size / 2);
                    var y = this.data.attributes.item_size / 2;
                    var color = this.config.time[key].color;
                    this.drawArc(x, y, color, 0);
                }
                this.stop();
                return;
            }
        }
        
        // Compare current time with reference
        diff = (this.data.attributes.ref_date - curDate) / 1000;
        old_diff = (this.data.attributes.ref_date - prevDate) / 1000;
        
        var visible_times = parse_times(diff, old_diff, this.data.total_duration, this.data.drawn_units);
        var all_times = parse_times(diff, old_diff, secondsIn["Years"], allUnits);
        
        var i = 0;
        var j = 0;
        var lastKey = null;
        
        var cur_shown = this.data.drawn_units.slice();
        for (var i in allUnits) {
            var key = allUnits[i];
            
            // Notify (all) listeners
            if(Math.floor(all_times.raw_time[key]) !== Math.floor(all_times.raw_old_time[key])) {
                this.notifyListeners(key, Math.floor(all_times.time[key]), Math.floor(diff), "all");
            }
            
            if(cur_shown.indexOf(key) < 0) continue;
            
            // Notify (visible) listeners
            if(Math.floor(visible_times.raw_time[key]) !== Math.floor(visible_times.raw_old_time[key])) {
                this.notifyListeners(key, Math.floor(visible_times.time[key]), Math.floor(diff), "visible");
            }
            
            // Set the text value
            this.data.text_elements[key].text(Math.floor(Math.abs(visible_times.time[key])));

            var x = (j * this.data.attributes.item_size) + (this.data.attributes.item_size / 2);
            var y = this.data.attributes.item_size / 2;
            var color = this.config.time[key].color;
            
            if (lastKey !== null) {
                if (Math.floor(visible_times.time[lastKey]) > Math.floor(visible_times.old_time[lastKey])) {
                    this.radialFade(x, y, color, 1, key);
                    this.data.state.fading[key] = true;
                }
                else if (Math.floor(visible_times.time[lastKey]) < Math.floor(visible_times.old_time[lastKey])) {
                    this.radialFade(x, y, color, 0, key);
                    this.data.state.fading[key] = true;
                }
            }
            if (!this.data.state.fading[key]) {
                this.drawArc(x, y, color, visible_times.pct[key]);
            }
            lastKey = key;
            j++;
        }
    };
    
    TC_Instance.prototype.drawArc = function(x, y, color, pct) {
        if(cant_draw) return;
        
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
        
        // Direction
        var startAngle, endAngle, counterClockwise;
        var defaultOffset = (-0.5 * Math.PI);
        var fullCircle = 2 * Math.PI;
        startAngle = defaultOffset + (this.config.start_angle / 360 * fullCircle);
        var offset = (2 * pct * Math.PI);
        
        if(this.config.direction === "Both") {
            counterClockwise = false;
            startAngle -= (offset / 2);
            endAngle = startAngle + offset;
        }
        else {
            if(this.config.direction === "Clockwise") {
                counterClockwise = false;
                endAngle = startAngle + offset;
            }
            else {
                counterClockwise = true;
                endAngle = startAngle - offset;
            }
        }
        startAngle = (startAngle + fullCircle) % fullCircle;
        endAngle = (endAngle + fullCircle) % fullCircle;

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
                window.top.setTimeout(function() {
                    _this.drawArc(x, y, rgba, 1);
                }, 50 * i);
            }());
            from += step;
        }
        window.top.setTimeout(function() {
            _this.data.state.fading[key] = false;
        }, 50 * i);
    };

    TC_Instance.prototype.timeLeft = function() {
        var now = new Date();
        return ((this.data.attributes.ref_date - now) / 1000);
    };
    
    TC_Instance.prototype.start = function() {
        // Check if a date was passed in html attribute or jquery data
        var attr_data_date = $(this.element).data('date');
        if (typeof attr_data_date === "undefined") {
            attr_data_date = $(this.element).attr('data-date');
        }
        if (typeof attr_data_date === "string") {
            this.data.attributes.ref_date = parse_date(attr_data_date);
        }
        
        // Check if this is an unpause of a timer
        else if (typeof this.data.attributes.timer === "number") {
            this.data.attributes.ref_date = (new Date()).getTime() + (this.data.attributes.timer * 1000);
        }
        else {
            // Try to get data-timer
            var attr_data_timer = $(this.element).data('timer');
            if (typeof attr_data_timer === "undefined") {
                attr_data_timer = $(this.element).attr('data-timer');
            }
            if (typeof attr_data_timer === "string") {
                attr_data_timer = parseFloat(attr_data_timer);
            }
            if(typeof attr_data_timer === "number") {
                this.data.attributes.ref_date = (new Date()).getTime() + (attr_data_timer * 1000);
            }
            else {
                // data-timer and data-date were both not set
                // use config date
                this.data.attributes.ref_date = this.config.ref_date;
            }
        }

        // Start running
        var _this = this;
        this.timer = window.top.setInterval(function() { _this.updateArc(); }, this.config.refresh_interval * 1000);
    };

    TC_Instance.prototype.restart = function() {
        this.data.attributes.timer = null;
        this.start();
    };

    TC_Instance.prototype.stop = function() {
        if (typeof this.data.attributes.timer === "number") {
            this.data.attributes.timer = this.timeLeft(this);
        }
        // Stop running
        window.top.clearInterval(this.timer);
    };

    TC_Instance.prototype.destroy = function() {
        this.stop();
        this.container.remove();
        $(this.element).removeAttr('data-tc-id');
        $(this.element).removeData('tc-id');
    };
    
    TC_Instance.prototype.setOptions = function(options) {
        if(this.config === null) {
            this.default_options.ref_date = new Date();
            this.config = $.extend(true, {}, this.default_options);
        }
        $.extend(true, this.config, options);
        
        this.data.total_duration = this.config.total_duration;
        if(typeof this.data.total_duration === "string") {
            if(typeof secondsIn[this.data.total_duration] !== "undefined") {
                // If set to Years, Months, Days, Hours or Minutes, fetch the secondsIn value for that
                this.data.total_duration = secondsIn[this.data.total_duration];
            }
            else if (this.data.total_duration === "Auto") {
                // If set to auto, total_duration is the size of 1 unit, of the unit type bigger than the largest shown
                for(var unit in this.config.time) {
                    if(this.config.time[unit].show) {
                        this.data.total_duration = secondsIn[nextUnits[unit]];
                        break;
                    }
                }
            }
            else {
                // If it's a string, but neither of the above, user screwed up.
                this.data.total_duration = secondsIn["Years"];
                console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto");
            }
        }
    };
    
    TC_Instance.prototype.addListener = function(f, context, type) {
        if(typeof f !== "function") return;
        if(typeof type === "undefined") type = "visible";
        this.listeners[type].push({func: f, scope: context});
    };
    
    TC_Instance.prototype.notifyListeners = function(unit, value, total, type) {
        for(var i = 0; i < this.listeners[type].length; i++) {
            var listener = this.listeners[type][i];
            listener.func.apply(listener.scope, [unit, value, total]);
        }
    };
    
    TC_Instance.prototype.default_options = {
        ref_date: new Date(),
        start: true,
        refresh_interval: 0.1,
        count_past_zero: true,
        circle_bg_color: "#60686F",
        use_background: true,
        fg_width: 0.1,
        bg_width: 1.2,
        total_duration: "Auto",
        direction: "Clockwise",
        start_angle: 0,
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
    
    TC_Class.prototype.getInstance = function(element) {
        var instance;
        
        var cur_id = $(element).data("tc-id");
        if (typeof cur_id === "undefined") {
            cur_id = guid();
            $(element).attr("data-tc-id", cur_id);
        }
        if (typeof TC_Instance_List[cur_id] === "undefined") {
            var options = this.options;
            var element_options = $(element).data('options');
            if(typeof element_options === "string") {
                element_options = JSON.parse(element_options);
            }
            if(typeof element_options === "object") {
                options = $.extend(true, {}, this.options, element_options);
            }
            instance = new TC_Instance(element, options);
            TC_Instance_List[cur_id] = instance;
        }
        else {
            instance = TC_Instance_List[cur_id];
            if (typeof this.options !== "undefined") {
                instance.setOptions(this.options);
            }
        }
        return instance;
    };

    TC_Class.prototype.foreach = function(callback) {
        var _this = this;
        this.elements.each(function() {
            var instance = _this.getInstance(this);
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
    
    TC_Class.prototype.restart = function() {
        this.foreach(function(instance) {
            instance.restart();
        });
        return this;
    };
    
    TC_Class.prototype.rebuild = function() {
        this.foreach(function(instance) {
            instance.initialize(false);
        });
        return this;
    };
    
    TC_Class.prototype.getTime = function() {
        return this.getInstance(this.elements[0]).timeLeft();
    };
    
    TC_Class.prototype.addListener = function(f, type) {
        if(typeof type === "undefined") type = "visible";
        var _this = this;
        this.foreach(function(instance) {
            instance.addListener(f, _this.elements, type);
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