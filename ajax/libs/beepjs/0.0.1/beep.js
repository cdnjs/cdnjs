/**
 * Copyright 2010 Neuman Vong. All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 */
(function(ns) {
var utils = {
    amplify: function(gain) {
        return function(sample) {
            return sample * gain; 
        };
    },
    ushort: function(sample) {
        return String.fromCharCode(255 & sample,
                                   255 & sample >> 8);
    },
    ulong: function(sample) {
        return String.fromCharCode(255 & sample,
                                   255 & sample >> 8,
                                   255 & sample >> 16,
                                   255 & sample >> 24);
    },
    gcd: function(a, b) {
        while (b) {
            var a_ = a;
            a = b, b = a_ % b;
        }
        return a;
    },
    lcm: function(a, b) {
        return Math.floor(a * b / utils.gcd(a, b));
    },
    compose: function(fns) {
        return function(a) {
            for (var i = 0; i < fns.length; i++) {
                a = fns[i](a);
            }
            return a;
        };
    },
    map: function(fn, items) {
        var result = [];
        for (var i = 0; i < items.length; i++) {
            result.push(fn.call(this, items[i]));
        }
        return result;
    },
    getattr: function(attr) {
        return function(items) {
            return items[attr];
        };
    },
    zip: function() {
        if (arguments.length == 0) return [];
        var lists = Array.prototype.slice.call(arguments);
        var result = [];
        var min = Math.min.apply(null, utils.map(utils.getattr("length"), lists));
        for (var i = 0; i < min; i++) {
            result.push(utils.map(utils.getattr(i), lists));
        }
        return result;
    },
    sum: function(numbers) {
        return utils.foldl(function(a, b) { return a + b; }, numbers);
    },
    bind: function(ctx, fn) {
        return function() {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(ctx, args);
        };
    },
    foldl: function(fn, items) {
        if (items.length == 1) return items[0];
        var result = fn(items[0], items[1]);
        for (var i = 2; i < items.length; i++) {
            result = fn(result, items[i]);
        }
        return result;
    },
    mulmod: function(a, b, c) {
        return (a * b) % c;
    },
    range: function(len) {
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(i);
        }
        return result;
    }
};
function Beep(samplerate) {
    if (!(this instanceof Beep)) return new Beep(samplerate);
    if (typeof samplerate != "number" || samplerate < 1) return null;
    this.channels = 1;
    this.bitdepth = 16;
    this.samplerate = samplerate;
    this.sine = [];
    var factor = (2 * Math.PI) / parseFloat(samplerate);
    for (var n = 0; n < samplerate; n++) {
        this.sine.push(Math.sin(n * factor));
    }
}
Beep.prototype = {
    generate: function(freqs) {
        freqs = freqs instanceof Array ? freqs : [freqs];
        var map = utils.bind(this, utils.map);
        var periods = map(function(a) {
            return utils.lcm(this.samplerate, a) / a; }, freqs);
        var lcm = utils.foldl(utils.lcm, periods);
        var sample = function(time) {
            return function(freq) {
                return this.sine[utils.mulmod(time, freq, this.samplerate)];
            };
        };
        return map(function(t) { return utils.sum(map(sample(t), freqs)); },
                   utils.range(lcm));
    },
    encode: function(freqs, duration, filters) {
        freqs = freqs instanceof Array ? freqs : [freqs];
        var transforms = utils.compose(
            (filters || []).concat([utils.ushort]));
        var samples = utils.map(transforms, this.generate(freqs));
        var reps = Math.ceil(duration * this.samplerate / samples.length);
        var fulldata = new Array(reps + 1).join(samples.join(""));
        var data = fulldata.substr(0, this.samplerate * duration * 2);
        var fmtChunk = [
            ["f", "m", "t", " "].join(""),
            utils.ulong(Beep.PCM_CHUNK_SIZE),
            utils.ushort(Beep.LINEAR_QUANTIZATION),
            utils.ushort(this.channels),
            utils.ulong(this.samplerate),
            utils.ulong(this.samplerate * this.channels * this.bitdepth / 8),
            utils.ushort(this.bitdepth / 8),
            utils.ushort(this.bitdepth)
        ].join("");
        var dataChunk = [
            ["d", "a", "t", "a"].join(""),
            utils.ulong(data.length * this.channels * this.bitdepth / 8),
            data
        ].join("");
        var header = [
            ["R", "I", "F", "F"].join(""),
            utils.ulong(4 + (8 + fmtChunk.length) + (8 + dataChunk.length)),
            ["W", "A", "V", "E"].join("")
        ].join("");
        return [header, fmtChunk, dataChunk].join("");
    },
    play: function(freq, duration, filters) {
        filters = filters || [];
        var data = btoa(this.encode(freq, duration, filters));
        var audio = document.createElement("audio");
        audio.src = "data:audio/x-wav;base64," + data;
        audio.play();
    }
};
Beep.LINEAR_QUANTIZATION = 1;
Beep.PCM_CHUNK_SIZE = 16;
Beep.utils = utils;
ns.Beep = Beep;
})(window[window.NS_BEEP] || window);
