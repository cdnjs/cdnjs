(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.embed = factory());
}(this, (function () { 'use strict';

var justExtend = extend;
function extend() {
    var args = [].slice.call(arguments);
    var deep = false;
    if (typeof args[0] == 'boolean') {
        deep = args.shift();
    }
    var result = args[0];
    if (!result || typeof result != 'object' && typeof result != 'function') {
        throw new Error('extendee must be an object');
    }
    var extenders = args.slice(1);
    var len = extenders.length;
    for (var i = 0;i < len; i++) {
        var extender = extenders[i];
        for (var key in extender) {
            var value = extender[key];
            if (deep && value && (typeof value == 'object' || typeof value == 'function')) {
                var base = Array.isArray(value) ? [] : {};
                result[key] = extend(true, result[key] || base, value);
            } else {
                result[key] = value;
            }
        }
    }
    return result;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var pReduce = createCommonjsModule(function (module) {
    'use strict';
    module.exports = (function (iterable, reducer, initVal) { return new Promise(function (resolve, reject) {
        var iterator = iterable[Symbol.iterator]();
        var i = 0;
        var next = function (total) {
            var el = iterator.next();
            if (el.done) {
                resolve(total);
                return;
            }
            Promise.all([total,el.value]).then(function (value) {
                next(reducer(value[0], value[1], i++));
            }).catch(reject);
        };
        next(initVal);
    }); });
});

var pWaterfall = function (iterable, initVal) { return pReduce(iterable, function (prev, fn) { return fn(prev); }, initVal); };

var isDom = isNode;
function isNode(val) {
    return !val || typeof val !== 'object' ? false : typeof window === 'object' && typeof window.Node === 'object' ? val instanceof window.Node : typeof val.nodeType === 'number' && typeof val.nodeName === 'string';
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;

function combineEmbedsText(embeds) {
    return embeds.sort(function (a, b) { return a.index - b.index; }).map(function (ref) {
        var content = ref.content;

        return content;
    }).join(" ");
}

function appendEmbedsAtEnd(ref) {
    var result = ref.result;
    var _embeds = ref._embeds;

    return (result + " " + (combineEmbedsText(_embeds)));
}

function isElementPresent(ref) {
    var input = ref.input;
    var target = ref.target;

    return isDom(input) || target && isDom(target);
}

var EmbedJS = function EmbedJS(options) {
    var defaultOptions = {
        plugins: [],
        preset: null,
        fetch: isBrowser && (window.fetch || window.unfetch),
        inlineEmbed: true,
        replaceUrl: false,
        _embeds: [],
        _services: []
    };
    var input = options.input;
    var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
    var preset = options.preset;
    if (!input) {
        throw new Error("You need to pass input element or string in the options object.");
    }
    var inputString = isDom(input) ? input.innerHTML : input;
    this.options = justExtend({}, defaultOptions, options, {
        result: inputString,
        plugins: preset ? plugins.concat(preset) : plugins,
        inputString: inputString
    });
};
EmbedJS.prototype.text = function text () {
    var options = this.resetOptions();
    var transformers = options.plugins.map(function (p) { return p.transform; });
    return pWaterfall(transformers, options);
};
EmbedJS.prototype.resetOptions = function resetOptions () {
    return justExtend({}, this.options, {
        _embeds: []
    });
};
EmbedJS.prototype.load = function load () {
        var this$1 = this;

    this.options.plugins.forEach(function (p) { return p.onLoad && p.onLoad(this$1.options); });
};
EmbedJS.prototype.render = function render () {
        var this$1 = this;

    return new Promise(function ($return, $error) {
        var input, target, inlineEmbed, element;
        var options;
        var assign;
            ((assign = this$1.options, input = assign.input, target = assign.target, inlineEmbed = assign.inlineEmbed));
        if (!isElementPresent(this$1.options)) {
            return $error(new Error("You haven't passed the input as an element."));
        }
        if (isDom(input) && input.classList.contains("ejs-applied")) {
            options = this$1.options;
            return $If_1.call(this$1);
        } else {
            return this$1.text().then(function ($await_2) {
                try {
                    options = $await_2;
                    element = target || input;
                    element.innerHTML = inlineEmbed ? options.result : appendEmbedsAtEnd(options);
                    element.classList.add("ejs-applied");
                    return $If_1.call(this$1);
                } catch ($boundEx) {
                    return $error($boundEx);
                }
            }, $error);
        }
        function $If_1() {
            this.load();
            return $return(options);
        }
            
    });
};
EmbedJS.prototype.destroy = function destroy () {
    var ref = this.options;
        var inputString = ref.inputString;
        var input = ref.input;
        var target = ref.target;
    if (!isElementPresent(this.options)) {
        throw new Error("You haven't passed the input as an element.");
    }
    var element = target || input;
    element.innerHTML = inputString;
    element.classList.remove("ejs-applied");
    return this.options;
};

return EmbedJS;

})));
//# sourceMappingURL=embed.js.map
