/*! Lazy Load XT v1.1.0 2016-01-12
 * http://ressio.github.io/lazy-load-xt
 * (C) 2016 RESS.io
 * Licensed under MIT */

(function (window, document, Element, undefined) {
    function Wrapper(collection) {
        if (collection) {
            for (var i = 0, length = collection.length; i < length; i++) {
                this[i] = collection[i];
            }
            this.length = length;
        }
    }

    function $(selector) {
        if (selector instanceof Wrapper) {
            return selector;
        }
        return new Wrapper((typeof selector === 'string') ? document.querySelectorAll(selector)
            : (selector && (selector === window || selector.nodeType) ? [selector] : selector));
    }

    $.fn = {
        constructor: Wrapper,
        length: 0
    };
    Wrapper.prototype = $.fn;

    $.extend = function (target) {
        var options, name, copy, i = 0, length = arguments.length;
        if (length <= 1) {
            target = this;
        } else {
            i = 1;
        }
        for (; i < length; i++) {
            options = arguments[i];
            for (name in options) {
                copy = options[name];
                if (copy !== undefined && copy !== target) {
                    target[name] = copy;
                }
            }
        }
        return target;
    };
    $.fn.extend = $.extend;

    var prev_$ = window.$;
    window.$ = $;

    $.extend({
        noConflict: function () {
            window.$ = prev_$;
            return $;
        },
        isFunction: function (obj) {
            return (typeof obj === 'function');
        },
        contains: function (a, b) {
            if (b) {
                while ((b = b.parentNode)) {
                    if (b === a) {
                        return true;
                    }
                }
            }
            return false;
        },
        each: function (array, callback) {
            var value, i = 0, length = array.length;
            for (; i < length; i++) {
                value = array[i];
                if (callback.call(value, i, value) === false) {
                    return false;
                }
            }
            return true;
        },
        grep: function (elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;
            for (; i < length; i++) {
                callbackInverse = !callback(i, elems[i]);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }
            return matches;
        },
        map: function (elems, callback) {
            var value,
                i = 0,
                length = elems.length,
                ret = [];
            for (; i < length; i++) {
                value = callback(i, elems[i]);
                if (value != null) {
                    ret.push(value);
                }
            }
            return ret;
        }
    });

    var DATAKEYPROP = '__jqlight_data__';
    $.fn.extend({
        each: function (callback, args) {
            $.each(this, callback, args);
            return this;
        },
        ready: function (fn) {
            if (/complete|loaded|interactive/.test(document.readyState) && document.body) {
                fn();
            } else {
                $(document).on('DOMContentLoaded', fn);
            }
            return this;
        },
        addClass: function (value) {
            return eachClass(this, value, function (cur, clazz, found) {
                return found ? cur : cur + clazz + ' ';
            });
        },
        removeClass: function (value) {
            return eachClass(this, value, function (cur, clazz, found) {
                return found ? cur.replace(' ' + clazz + ' ', ' ') : cur;
            });
        },
        on: function (types, selector, fn) {
            if (fn == null) {
                // ( types, fn )
                fn = selector;
                selector = undefined;
            }
            types = types.split(' ');
            return this.each(function (i, elem) {
                var listener = selector ? delegateHandler.bind(elem, selector, fn) : fn;
                $.each(types, function (j, eventName) {
                    if (eventName) {
                        elem.addEventListener(eventName, listener);
                    }
                });
            });
        },
        off: function (types, selector, fn) {
            if (selector === false || $.isFunction(selector)) {
                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            types = types.split(' ');
            return this.each(function (i, elem) {
                $.each(types, function (j, eventName) {
                    if (eventName) {
                        elem.removeEventListener(eventName, fn);
                    }
                });
            });
        },
        trigger: function (type, data) {
            return this.each(function () {
                var evt;
                if (window.CustomEvent) {
                    evt = new CustomEvent(type, {detail: data});
                } else {
                    evt = document.createEvent('CustomEvent');
                    evt.initCustomEvent(type, true, true, data);
                }
                this.dispatchEvent(evt);
            });
        },
        data: function (key, value) {
            if (typeof key === 'string' && value === undefined) {
                var elem = this[0];
                return elem && elem[DATAKEYPROP] ? elem[DATAKEYPROP][key] : undefined;
            }
            this.each(function (i, elem) {
                elem[DATAKEYPROP] = elem[DATAKEYPROP] || {};
                elem[DATAKEYPROP][key] = value;
            });
            return this;
        },
        map: function (callback) {
            return $($.map(this, callback));
        },
        filter: function (callback) {
            return $($.grep(this, callback));
        },
        attr: function (name, value) {
            if (value === undefined) {
                return this.length ? this[0].getAttribute(name) : undefined;
            }
            $.each(this, function (i, elem) {
                elem.setAttribute(name, value + '');
            });
            return this;
        }
    });

    function eachClass(obj, value, callback) {
        var classes = ( value || '' ).match(/\S+/g) || [],
            elem, cur, clazz, j, origValue, finalValue,
            i = 0,
            len = obj.length;
        while (i < len) {
            elem = obj[i++];
            if (elem.nodeType === 1) {
                origValue = elem.className;
                cur = origValue ? ( ' ' + origValue + ' ' ).replace(/[\t\r\n\f]/g, ' ') : ' ';
                j = 0;
                while ((clazz = classes[j++])) {
                    cur = callback(cur, clazz, cur.indexOf(' ' + clazz + ' ') >= 0);
                }
                finalValue = cur.slice(1, -1);
                if (origValue !== finalValue) {
                    elem.className = finalValue;
                }
            }
        }
        return obj;
    }

    function delegateHandler(selector, handler, event) {
        var currentTarget = closest.call([event.target], selector, this)[0];
        if (currentTarget && currentTarget !== this) {
            handler.call(currentTarget, event);
        }
    }

    var matches = Element.matches || Element.matchesSelector || Element.mozMatchesSelector || Element.msMatchesSelector || Element.oMatchesSelector || Element.webkitMatchesSelector;

    function closest(selector, context) {
        var nodes = [];
        $.each(this, function (i, node) {
            while (node && node !== context) {
                if (matches.call(node, selector)) {
                    nodes.push(node);
                    break;
                }
                node = node.parentElement;
            }
        });
        return $($.grep(nodes, function (index, item) {
            return nodes.indexOf(item) === index;
        }));
    }
})(window, document, Element.prototype);
