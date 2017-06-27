(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('moment'));
    } else if (typeof define === 'function' && define.amd) {
        define('moment-recur', ['moment'], factory);
    } else {
        root.moment = factory(root.moment);
    }
}(this, function (moment) {
    var hasModule;
    
    hasModule = (typeof module !== "undefined" && module !== null) && (module.exports != null);
    
    if (typeof moment === 'undefined') {
      throw Error("Can't find moment");
    }
    
    // Interval object for creating and matching interval-based rules
    var Interval = (function() {
        function createInterval(units, measure) {
            // Make sure all of the units are integers greater than 0.
            for (var unit in units) {
                if (units.hasOwnProperty(unit)) {
                    if ( parseInt(unit, 10) <= 0 ) {
                        throw Error('Intervals must be greater than zero');
                    }
                }
            }
            
            return {
                measure: measure.toLowerCase(),
                units: units
            };
        }
        
        function matchInterval(type, units, start, date) {
            // Get the difference between the start date and the provded date,
            // using the required measure based on the type of rule
            var diff = start.diff(date, type, true);
            
            // Check to see if any of the units provided match the date
            for (var unit in units) {
                if (units.hasOwnProperty(unit)) {
                    unit = parseInt(unit, 10);
                    
                    // If the units devide evenly into the difference, we have a match
                    if ((diff % unit) === 0) {
                        return true;
                    }
                }
            }
            
            return false;
        }
        
        return {
          create: createInterval,
          match: matchInterval
        };
    })();
    
    // Calendar object for creating and matching calendar-based rules
    var Calendar = (function (){
        // Dictionary of unit types based on measures
        var unitTypes = {
            "daysOfMonth": "date",
            "daysOfWeek": "day",
            "weeksOfMonth": "monthWeek",
            "weeksOfYear": "weeks",
            "monthsOfYear": "months"
        };
        
        // Dictionary of ranges based on measures
        var ranges = {
            "daysOfMonth"  : { low: 1, high: 31 },
            "daysOfWeek"   : { low: 0, high: 6 },
            "weeksOfMonth" : { low: 0, high: 4 },
            "weeksOfYear"  : { low: 0, high: 52 },
            "monthsOfYear" : { low: 0, high: 11 }
        };
        
        // Private function for cehcking the range of calendar values
        function checkRange(low, high, list) {
            list.forEach(function(v) {
                if ( v < low || v > high ) {
                    throw Error('Value should be in range ' + low + ' to ' + high);
                }
            });
        }
        
        // Private function to convert day and month names to numbers
        function namesToNumbers(list, nameType) {
            var unit, unitInt, unitNum;
            var newList = {};
            
            for(unit in list) {
                if (list.hasOwnProperty(unit)) {
                    unitInt = parseInt(unit, 10);
                    
                    if (isNaN(unitInt)) {
                        unitInt = unit;
                    }
                    
                    unitNum = moment().set(nameType, unitInt).get(nameType);
                    newList[unitNum] = list[unit];
                }
            }
            
            return newList;
        }
        
        function createCalendarRule(list, measure) {
            var keys = [];
            
            // Convert day/month names to numbers, if needed
            if (measure === "daysOfWeek") {
                list = namesToNumbers(list, "days");
            }
            
            if (measure === "monthsOfYear") {
                list = namesToNumbers(list, "months");
            }
            
            for (var key in list) if (hasOwnProperty.call(list, key)) keys.push(key);
            
            // Make sure the listed units are in the measure's range
            checkRange( ranges[measure].low, 
                        ranges[measure].high, 
                        keys );
            
            return {
                measure: measure,
                units: list
            };
        }
        
        function matchCalendarRule(measure, list, date) {
            // Get the unit type (i.e. date, day, week, monthWeek, weeks, months)
            var unitType = unitTypes[measure];
            
            // Get the unit based on the required measure of the date
            var unit = date[unitType]();
            
            // If the unit is in our list, return true, else return false
            if ( list[unit] ) {
                return true;
            }
            
            return false;
        }
        
        return {
            create: createCalendarRule,
            match: matchCalendarRule
        };
    })();
    
    // The main Recur object to provide an interface for settings, rules, and matching
    var Recur = (function() {
       
        // A dictionary used to match rule measures to rule types
        var ruleTypes = {
            "days": "interval",
            "weeks": "interval",
            "months": "interval",
            "years": "interval",
            "daysOfWeek": "calendar",
            "daysOfMonth": "calendar",
            "weeksOfMonth": "calendar",
            "weeksOfYear": "calendar",
            "monthsOfYear": "calendar"
        };
        
        // a dictionary of plural and singular measures
        var measures = {
            "days": "day",
            "weeks": "week",
            "months": "month",
            "years": "year",
            "daysOfWeek": "dayOfWeek",
            "daysOfMonth": "dayOfMonth",
            "weeksOfMonth": "weekOfMonth",
            "weeksOfYear": "weekOfYear",
            "monthsOfYear": "monthOfYear"
        };
        
        
        /////////////////////////////////
        // Private Methods             //
        // Must be called with .call() //
        /////////////////////////////////
        
        // Private method that tries to set a rule.
        function trigger() {
            var rule;
            var ruleType = ruleTypes[this.measure];
            
            if (!(this instanceof Recur)) {
                throw Error("Private method trigger() was called directly or not called as instance of Recur!");
            }
            
            // Make sure units and measure is defined and not null
            if ((typeof this.units === "undefined" || this.units === null) || !this.measure) {
                return this;
            }
            
            // Error if we don't have a valid ruleType
            if (ruleType !== "calendar" && ruleType !== "interval") {
                throw Error("Invlid measure provided: " + this.measure);
            }
            
            // Create the rule
            if (ruleType === "interval") {
                if ( !this.start ) {
                    throw Error("Must have a start date set to set an interval!");
                }
                
                rule = Interval.create(this.units, this.measure);
            }
            
            if (ruleType === "calendar") {
                rule = Calendar.create(this.units, this.measure);
            }
            
            // Remove the temporary rule data
            this.units = null;
            this.measure = null;
            
            // Remove existing rule based on measure
            for (var i = 0; i < this.rules.length; i++) {
                if (this.rules[i].measure === rule.measure) {
                    this.rules.splice(i, 1);
                }
            }
            
            this.rules.push(rule);
            return this;
        }
        
        // Private method to get next and previous occurances
        function getOccurances(num, format, type) {
            var currentDate, date;
            var dates = [];
            
            if (!(this instanceof Recur)) {
                throw Error("Private method trigger() was called directly or not called as instance of Recur!");
            }
            
            if ( !this.start && !this.from ) {
                throw Error("Cannot get occurances without start or from date.");
            }
            
            // Start from the from date, or the start date if from is not set.
            currentDate = (this.from || this.start).clone();
            
            // Get the next N dates
            while(dates.length < num) {
                if (type === "next") {
                    currentDate.add(1, "day");
                }
                else {
                    currentDate.subtract(1, "day");
                }
                
                console.log("Match: " + currentDate.format("L") + " - " + this.matches(currentDate, true));
                
                if (this.matches(currentDate, true)) {
                    date = format ? currentDate.format(format) : currentDate.clone();
                    dates.push(date);
                }
            }
            
            return dates;
        }
        
        
        ///////////////////////
        // Private Functions //
        ///////////////////////
        
        // Private function to see if a date is within range of start/end
        function inRange(start, end, date) {
            if (start && date.isBefore(start)) { return false; }
            if (end && date.isAfter(end)) { return false; }
            return true;
        }
        
        // Private function to turn units into objects
        function unitsToObject(units) {
            var list = {};
            
            if ( toString.call(units) == '[object Array]' ) {
                units.forEach(function(v) {
                    list[v] = true;
                });
            }
            else if ( units === Object(units) ) {
                list = units;
            }
            else if ( (toString.call(units) == '[object Number]') || (toString.call(units) == '[object String]') ) {
                list[units] = true;
            }
            else {
                throw Error("Provide an array, object, string or number when passing units!");
            }
            
            return list;
        }
        
        // Private function to check if a date is an exception
        function isException(exceptions, date) {
            for (var i = 0, len = exceptions.length; i < len; i++ ) {
                if (moment(exceptions[i]).isSame(date)) {
                    return true;
                }
            }
            
            return false;
        }
        
        // Private function to pluralize measure names for use with dictionaries.
        function pluralize(measure) {
            switch(measure) {
                case "day":
                    return "days";
                    
                case "week":
                    return "weeks";
                    
                case "month":
                    return "months";
                    
                case "year":
                    return "years";
                
                case "dayOfWeek":
                    return "daysOfWeek";
                    
                case "dayOfMonth":
                    return "daysOfMonth";
                    
                case "weekOfMonth":
                    return "weeksOfMonth";
                    
                case "weekOfYear":
                    return "weeksOfYear";
                    
                case "monthOfYear":
                    return "monthsOfYear";
                    
                default:
                    return measure;
            }
        }
        
        // Private funtion to see if all rules matche
        function matchAllRules(rules, date, start) {
            var i, len, rule, type;
            
            for ( i = 0, len = rules.length; i < len; i++ ) {
                rule = rules[i];
                type = ruleTypes[rule.measure];
                
                if (type === "interval") {
                    if ( !Interval.match(rule.measure, rule.units, start, date) ) {
                        return false;
                    }
                }
                else if (type === "calendar") {
                    if ( !Calendar.match(rule.measure, rule.units, date) ) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            
            return true;
        }
        
        // Private function to create measure functions
        function createMeasure(measure) {
            return function(units) {
                this.every.call(this, units, measure);
                return this;
            };
        }
        
        
        //////////////////////
        // Public Functions //
        //////////////////////
        
        // Recur Object Constrcutor
        var Recur = function(options) {
            if ( options.start ) {
                this.start = moment(options.start).dateOnly();
            }
        
            if ( options.end ) {
                this.end = moment(options.end).dateOnly();
            }
    
            // Our list of rules, all of which must match
            this.rules = options.rules || [];
            
            // Our list of exceptions. Match always fails on these dates.
            this.exceptions = options.exceptions || [];
            
            // Temporary units integer, array, or object. Does not get imported/exported.
            this.units = null;
            
            // Tempoarary measure type. Does not get imported/exported.
            this.measure = null;
            
            // Tempoarary from date for next/previous. Does not get imported/exported.
            this.from = null;
        
            return this;
        };
        
        // Get/Set start date
        Recur.prototype.startDate = function(date) {
            if (date === null) {
                this.start = null;
                return this;
            }
            
            if (date) {
                this.start = moment(date).dateOnly();
                return this;
            }
            
            return this.start;
        };
        
        // Get/Set end date
        Recur.prototype.endDate = function(date) {
            if (date === null) {
                this.end = null;
                return this;
            }
            
            if (date) {
                this.end = moment(date).dateOnly();
                return this;
            }
            
            return this.end;
        };
        
        // Get/Set a temporary from date
        Recur.prototype.fromDate = function(date) {
             if (date === null) {
                this.from = null;
                return this;
            }
            
            if (date) {
                this.from = moment(date).dateOnly();
                return this;
            }
            
            return this.from;
        };
        
        // Export the settings, rules, and exceptions of this recurring date
        Recur.prototype.save = function() {
            var data = {};
            
            if (this.start && moment(this.start).isValid()) {
                data.start = this.start.format("L");
            }
            
            if (this.end && moment(this.end).isValid()) {
                data.end = this.end.format("L");
            }
            
            data.exceptions = [];
            for (var i = 0, len = this.exceptions.length; i < len; i++) {
                data.exceptions.push(this.exceptions[i].format("L"));
            }
            
            data.rules = this.rules;
            
            return data;
        };
        
        // Return boolean value based on whether this date repeats (has rules or not)
        Recur.prototype.repeats = function() {
            if (this.rules.length > 0) {
                return true;
            }
            
            return false;
        };
        
        // Set the units and, optionally, the measure
        Recur.prototype.every = function(units, measure) {
            
            if ((typeof units !== "undefined") && (units !== null)) {
                this.units = unitsToObject(units);
            }
            
            if ((typeof measure !== "undefined") && (measure !== null)) {
                this.measure = pluralize(measure);
            }
            
            return trigger.call(this);
        };
        
        // Creates an exception date to prevent matches, even if rules match
        Recur.prototype.except = function(date) {
            date = moment(date).dateOnly();
            this.exceptions.push(date);
            return this;
        };
        
        // Forgets rules (by passing measure) and exceptions (by passing date)
        Recur.prototype.forget = function(dateOrRule) {
            var i, len;
            var whatMoment = moment(dateOrRule);
            
            // If valid date, try to remove it from exceptions
            if (whatMoment.isValid()) {
                for (i = 0, len = this.exceptions.length; i < len; i++) {
                    if (whatMoment.isSame(this.exceptions[i])) {
                        this.exceptions.splice(i, 1);
                        return this;
                    }
                }
                
                return this;
            }
            
            // Otherwise, try to remove it from the rules
            for (i = 0, len = this.rules.length; i < len; i++) {
                if (this.rules[i].measure === pluralize(dateOrRule)) {
                    this.rules.splice(i, 1);
                }
            }
        };
        
        // Attempts to match a date to the rules
        Recur.prototype.matches = function(dateToMatch, ignoreStartEnd) {
            var date = moment(dateToMatch).dateOnly();
            
            if (!date.isValid()) {
                throw Error("Invalid date supplied to match method: " + dateToMatch);
            }

            if (!ignoreStartEnd && !inRange(this.start, this.end, date)) { return false }
            
            if (isException(this.exceptions, date)) { return false; }
        
            if (!matchAllRules(this.rules, date, this.start)) { return false; }
        
            // if we passed everything above, then this date matches
            return true;
        };
        
        // Get next N occurances
        Recur.prototype.next = function(num, format) {
            return getOccurances.call(this, num, format, "next");
        };
        
        // Get previous N occurances
        Recur.prototype.previous = function(num, format) {
            return getOccurances.call(this, num, format, "previous");
        };
        
        // Create the measure functions (days(), months(), daysOfMonth(), monthsOfYear(), etc.)
        for (var measure in measures) {
            if (ruleTypes.hasOwnProperty(measure)) {
                Recur.prototype[measure] = Recur.prototype[measures[measure]] = createMeasure(measure);
            }
        }
        
        return Recur;
    }());
    
    // Recur can be created the following ways:
    // moment.recur()
    // moment.recur(options)
    // moment.recur(start)
    // moment.recur(start, end)
    moment.recur = function(start, end) {
        // If we have an object, use it as a set of options
        if ( start === Object(start) ) {
            return new Recur( start );
        }
    
        // else, use the values passed
        return new Recur({ start: start, end: end });
    };

    // Recur can also be created the following ways:
    // moment().recur()
    // moment().recur(options)
    // moment().recur(start, end)
    // moment(start).recur(end)
    // moment().recur(end)
    moment.fn.recur = function(start, end) {
        // If we have an object, use it as a set of options
        if ( start === Object(start) ) {
            // if we have no start date, use the moment
            if ( typeof start.start === 'undefined' ) {
                start.start = this;
            }
            
            return new Recur( start );
        }
        
        // if there is no end value, use the start value as the end
        if ( !end ) {
            end = start;
            start = undefined;
        }
        
        // use the moment for the start value
        if (!start) {
            start = this;
        }
    
        return new Recur({ start: start, end: end, moment: this });
    };
    
    // Plugin for calculating the week of the month of a date
    moment.fn.monthWeek = function() {
        // First day of the first week of the month
        var week0 = this.clone().startOf("month").startOf("week");
        
        // First day of week
        var day0 = this.clone().startOf("week");
        
        return day0.diff(week0, "weeks");
    };
    
    // Plugin for removing all time information from a given date
    moment.fn.dateOnly = function() {
        return this.hours(0).minutes(0).seconds(0).milliseconds(0);  
    };
    
    
    return moment;
}));