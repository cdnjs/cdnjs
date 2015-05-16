/*
 * jsy JavaScript Library v0.0.12
 * https://github.com/labidiaymen/jsy
 * Author Labidi Aymen
 * Released under the MIT license
 * Copyright 2015
 */
 
var JSY, _jsy;

(function() {
    JSY = _jsy = function(o) {
        return new JSY(o);
    };
    var JSY = function(o) {
        this.author = 'Labidi Aymen';
        this.var = o;
        this.lastresult = "";
        this.version = '1.0.1';
        return this;
    };
    var allPrototypes = ['number', 'string', 'array', 'boolean'];
    // Expose the prototype object via JSY.fn
    JSY.fn = JSY.prototype = {
        // API Methods
        alert: function(s) {
            if (this.condition)
                if (s)
                    alert(s)
                else
                    alert(this.var)
            else if (typeof this.condition != 'undefined')
                if (s)
                    alert(s)
                else
                    alert(this.var)
            return this;
        },
        log: function(s) {
            if (this.condition)
                if (s)
                    console.log(s)
                else
                    console.log(this.var)
            return this;
        },
        ifEqual: function(x) {
            this.condition = this.equal(x)
            return this;
        },
        getType: function() {
            if (this.var instanceof Array)
                return "array";
            return typeof this.var;
        },
        ifType: function(x) {
            this.condition = this.getType() == x
            return this;
        },
        isArray: function() {
            return this.getType() == "array";
        },
        inArray: function(x) {
            if (this.getType() == "array")
                for (var i = 0; i < this.var.length; i++) {
                    if (this.var[i] == x) return true;
                }
            return false
        },
        isEmpty: function() {
            if (this.var == null) return true;
            if (this.var.length > 0) return false;
            if (this.var.length === 0) return true;
            for (var key in this.var) {
                if (hasOwnProperty.call(this.var, key)) return false;
            }
            if (this.getType() == "number")
                if (this.var.toString() != 0) return false;
            return true;
        },
        ifisFloat: function() {
            this.condition = this.isFloat();
            return this;
        },
        isFloat: function() {
            if (this.getType() == "string")
                return this.var == Number(this.var) && this.var % 1 !== 0;
            else if (this.getType() == "number")
                return this.var % 1 != 0;
            else
                return false

        },
        ifisInt: function() {
            this.condition = this.isInt();
            return this;
        },
        isInt: function() {
            if (this.getType() == "string")
                return this.var == Number(this.var) && this.var % 1 === 0;
            else if (this.getType() == "number")
                return this.var % 1 === 0;
            else
                return false

        },
        equal: function(x) {

            if (['number', 'string', 'boolean'].indexOf(this.getType()) > -1)
                return this.var === x;
            else
                return this.var.toString() == x.toString();
        },
        hasRows: function() {
            if (this.getType() == "array")
                return this.var.length > 0;
            return false
        },
        isEmail: function() {
            if (['string'].indexOf(this.getType()) > -1) {
                var rex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                return rex.test(this.var);
            } else
                return false;
        },
        ifisEmail: function() {
            this.condition = this.isEmail();
            return this;
        },
        isNegative: function() {

            if (['number', 'string'].indexOf(this.getType()) > -1)
                return this.var < 0;
            else
                return false;
        },
        ifisNegative: function() {
            this.condition = this.isNegative();
            return this;
        },
        isPositive: function() {
            if (['number', 'string'].indexOf(this.getType()) > -1)
                return this.var > 0;
            else
                return false;
        },
        ifisPositive: function() {
            this.condition = this.isPositive();
            return this;
        },
        ifisEmpty: function() {
            this.condition = this.isEmpty();
            return this;
        },
        then: function(func) {
            if (this.condition) func();
            return this;
        },
        else: function(func) {
            if (!this.condition) func();
            return this;
        },
        end: function(func) {
            func();
            return this;
        },
        lengthBetween: function(min, max) {
            if (['array', 'string'].indexOf(this.getType()) > -1)
                return this.var.length >= min && this.var.length <= max;
            else
                return false;
        },
        ifLengthBetween: function(min, max) {
            this.condition = this.lengthBetween(min, max);
            return this;
        },
    };

}());
