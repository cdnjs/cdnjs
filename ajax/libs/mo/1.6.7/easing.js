(function(){
/**
 * An easing library supports jquery.js, standalone module and CSS timing functions
 *
 * using AMD (Asynchronous Module Definition) API with OzJS
 * see http://ozjs.org for details
 *
 * Copyright (C) 2010-2012, Dexter.Yy, MIT License
 * vim: et:ts=4:sw=4:sts=4
 */
var _ = require('./lang/mix');
var base = require('./easing/base');
var timing = require('./easing/timing');
var functions = require('./easing/functions');
var bezier = require('./easing/bezier');

    module.exports = _.mix(_.copy(base), timing, {
        functions: functions,
        bezier: bezier 
    });



})();