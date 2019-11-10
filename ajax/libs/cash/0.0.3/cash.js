(function () {

    cash = $ = function (selector, context) {
        return new cash.fn.init(selector, context);
    };

    cash.fn = cash.prototype = {
        cash: true,
        length: 0
    };

    var idMatch = /^#[\w-]*$/,
        classMatch = /^\.[\w-]*$/,
        singlet = /^[\w-]*$/;

    cash.fn.init = function (selector, context) {
        var result = [],
            matcher, elem;
        if (!selector) {
            return this;
        }
        this.length = 1;
        if (typeof selector !== "string") {
            if (selector.cash) {
                return selector;
            }
            this[0] = selector;
            return this;
        }
        if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
            result = $.parseHTML(selector);
        } else {
            matcher = idMatch.test(selector);
            elem = selector.slice(1);
            if (!context && matcher) {
                this[0] = document.getElementById(elem);
                return this;
            } else {
                context = ($(context)[0] || document);
                result = [].slice.call(
                singlet.test(elem) ? classMatch.test(selector) ? document.getElementsByClassName(elem) : document.getElementsByTagName(selector) : context.querySelectorAll(selector));
            }
        }
        this.length = 0;
        $.merge(this, result);
        return this;
    };

    cash.fn.init.prototype = cash.fn;

    cash.each = function (collection, callback) {
        var i = 0,
            l = collection.length;
        for (; i < l; i++) {
            callback.call(collection[i], collection[i], i, collection);
        }
    };

    cash.extend = cash.fn.extend = function (target, source) {
        var prop;
        if (!source) {
            source = target;
            target = this;
        }
        for (prop in source) {
            if (source.hasOwnProperty(prop)) {
                target[prop] = source[prop];
            }
        }
        return this;
    };

    cash.matches = function (el, selector) {
        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    };

    cash.merge = function (first, second) {
        var len = +second.length,
            j = 0,
            i = first.length;
        for (; j < len; j++) {
            first[i++] = second[j];
        }
        first.length = i;
        return first;
    };

    cash.parseHTML = function (str) {
        var parsed = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/).exec(str);
        if (parsed) {
            return [document.createElement(parsed[1])];
        }
        parsed = buildFragment(str);
        return [].slice.call(parsed.childNodes);
    };

    cash.unique = function (collection) {
        return cash.merge(cash(), [].slice.call(collection).filter(function (item, index, self) {
            return self.indexOf(item) === index;
        }));
    };

    function buildFragment(str) {
        var fragment, tmp;
        fragment = fragment || document.createDocumentFragment();
        tmp = tmp || fragment.appendChild(document.createElement("div"));
        tmp.innerHTML = str;
        return tmp;
    }


    cash.ajax = function (options) {
        var request = new XMLHttpRequest();
        request.open(options.type, options.url, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                if (options.success) {
                    options.success.call(this, request.responseText);
                }
            } else {
                if (options.error) {
                    options.error.call(this, request.statusText);
                }
            }
        };
        request.onerror = function () {
            if (options.error) {
                options.error.call(this, request.statusText);
            }
        };
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        request.send(options.data || "");
    };

    var notWhiteMatch = /\S+/g;

    cash.fn.extend({

        addClass: function (className) { // TODO: tear out into module for IE9
            var classes = className.match(notWhiteMatch),
                spacedName, l;
            this.each(function (v) {
                l = classes.length;
                if (v.classList) {
                    while (l--) {
                        v.classList.add(classes[l]);
                    }
                } else {
                    while (l--) {
                        spacedName = " " + v.className + " ";
                        if (spacedName.indexOf(" " + classes[l] + " ") === -1) {
                            v.className += " " + classes[l];
                        }
                    }
                }
            });
            return this;
        },

        attr: function (attr, value) {
            if (!value) {
                return this[0].getAttribute(attr);
            } else {
                this.each(function (v) {
                    v.setAttribute(attr, value);
                });
                return this;
            }
        },

        hasClass: function (className) { // TODO: tear out into module for IE9
            if (this[0].classList) {
                return this[0].classList.contains(className);
            } else {
                return this[0].className.indexOf(className) !== -1;
            }
        },

        prop: function (prop) {
            return this[0][prop];
        },

        removeAttr: function (attr) {
            this.each(function (v) {
                v.removeAttribute(attr);
            });
            return this;
        },

        removeClass: function (className) { // TODO: tear out into module for IE9
            var classes = className.match(notWhiteMatch),
                l, newClassName;
            this.each(function (v) {
                l = classes.length;
                if (v.classList) {
                    while (l--) {
                        v.classList.remove(classes[l]);
                    }
                } else {
                    newClassName = " " + v.className + " ";
                    while (l--) {
                        newClassName = newClassName.replace(" " + classes[l] + " ", " ");
                    }
                    v.className = newClassName.trim();
                }
            });
            return this;
        }

    });


    cash.fn.extend({

        add: function () {
            var arr = [],
                i = 0;
            arr = [].slice.call(this);
            for (var l = arguments.length; i < l; i++) {
                arr = arr.concat([].slice.call(cash(arguments[i])));
            }
            return cash.unique(arr);
        },

        each: function (callback) {
            cash.each(this, callback);
        },

        eq: function (index) {
            return $(this[index]);
        },

        filter: function () {
            if (typeof arguments[0] === "string") {
                var selector = arguments[0];
                return Array.prototype.filter.call(this, function (e) {
                    return cash.matches(e, selector);
                });
            } else {
                return Array.prototype.filter.call(this, arguments[0]);
            }
        },

        first: function () {
            return $(this[0]);
        },

        get: function (num) {
            return this[num];
        },

        index: function (elem) {
            if (!elem) {
                return Array.prototype.slice.call(cash(this[0]).parent().children()).indexOf(this[0]);
            } else {
                return Array.prototype.slice.call(cash(elem).children()).indexOf(this[0]);
            }
        },

        last: function () {
            return $(this[this.length - 1]);
        }

    });

    cash.fn.extend({
        css: function () {
            var computed, prop, value, collection;
            if (typeof arguments[0] === "object") {
                collection = arguments[0];
                this.each(function (v) {
                    for (var key in collection) {
                        if (collection.hasOwnProperty(key)) {
                            v.style[key] = collection[key];
                        }
                    }
                });
            } else {
                prop = arguments[0];
                value = arguments[1];
                if (arguments.length > 1) {
                    this.each(function (v) {
                        v.style[prop] = value;
                    });
                    return this;
                } else {
                    computed = window.getComputedStyle(this[0], null);
                    return computed[prop];
                }
            }
        }
    });

    cash.fn.extend({

        data: function (key, value) { // TODO: tear out into module for IE9
            if (!value) {
                return this[0].dataset ? this[0].dataset[key] : $(this[0]).attr("data-" + key);
            } else {
                this.each(function (v) {
                    if (v.dataset) {
                        v.dataset[key] = value;
                    } else {
                        $(v).attr("data-" + key, value);
                    }
                });
                return this;
            }
        },

        removeData: function (name) { // TODO: tear out into module for IE9
            this.each(function (v) {
                if (v.dataset) {
                    delete v.dataset[name];
                } else {
                    $(v).removeAttr("data-" + name);
                }
            });
            return this;
        }

    });

    cash.fn.extend({

        height: function () {
            return this[0].getBoundingClientRect().height;
        },

        innerWidth: function () {
            return this[0].clientWidth;
        },

        innerHeight: function () {
            return this[0].clientHeight;
        },

        outerWidth: function (margins) {
            if (margins === true) {
                return this[0].offsetWidth + (parseInt(getComputed(this, "margin-left"), 10) || parseInt(getComputed(this, "marginLeft"), 10) || 0) + (parseInt(getComputed(this, "margin-right"), 10) || parseInt(getComputed(this, "marginRight"), 10) || 0);
            }
            return this[0].offsetWidth;
        },

        outerHeight: function (margins) {
            if (margins === true) {
                return this[0].offsetHeight + (parseInt(getComputed(this, "margin-top"), 10) || parseInt(getComputed(this, "marginTop"), 10) || 0) + (parseInt(getComputed(this, "margin-bottom"), 10) || parseInt(getComputed(this, "marginBottom"), 10) || 0);
            }
            return this[0].offsetHeight;
        },

        width: function () {
            return this[0].getBoundingClientRect().width;
        }

    });

    function getComputed(el, prop) {
        var computed;
        computed = window.getComputedStyle(el[0], null);
        return computed[prop];
    }

    var _eventCache = {};

    cash.fn.extend({

        off: function () {
            var eventName = arguments[0],
                callback = arguments[1];
            this.each(function (v) {
                if (callback) {
                    v.removeEventListener(eventName, callback);
                } else {
                    for (var i in _eventCache[$(v).data("cshid")][eventName]) {
                        v.removeEventListener(eventName, _eventCache[$(v).data("cshid")][eventName][i]);
                    }
                }
            });
            return this;
        },

        on: function () {
            var eventName, delegate, callback;

            if (typeof arguments[1] === "function") {
                eventName = arguments[0];
                callback = arguments[1];
                this.each(function (v) {
                    registerEvent($(v), eventName, callback);
                    v.addEventListener(eventName, callback);
                });
                return this;
            } else {
                eventName = arguments[0];
                delegate = arguments[1];
                callback = arguments[2];
                this.each(function (v) {
                    var handler = function (e) {
                        var t = e.target;
                        if ($.matches(t, delegate)) {
                            callback.call(t);
                        } else {
                            while (!$.matches(t, delegate)) {
                                if (t === v) {
                                    return t = false;
                                }
                                t = t.parentNode;
                            }
                            if (t) {
                                callback.call(t);
                            }
                        }
                    };
                    registerEvent($(v), eventName, handler);
                    v.addEventListener(eventName, handler);
                });
                return this;
            }
        },

        ready: function (callback) {
            this[0].addEventListener("DOMContentLoaded", callback);
        },

        trigger: function (eventName) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(eventName, true, false);
            this.each(function (v) {
                v.dispatchEvent(evt);
            });
            return this;
        }

    });

    function registerEvent(node, eventName, callback) {
        var nid = $(node).data("cshid") || guid();
        $(node).data("cshid", nid);
        if (!(nid in _eventCache)) {
            _eventCache[nid] = {};
        }
        if (!(eventName in _eventCache[nid])) {
            _eventCache[nid][eventName] = [];
        }
        _eventCache[nid][eventName].push(callback);
    }

    function guid() {
        function _p8(s) {
            var p = (Math.random().toString(16) + "000000000").substr(2, 8);
            return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    }

    cash.fn.extend({

        serialize: function () {
            var form = this[0];
            var field, query = "";
            for (var i = form.elements.length - 1; i >= 0; i--) {
                field = form.elements[i];
                if (field.name && field.type !== "file" && field.type !== "reset") {
                    if (field.type === "select-multiple") {
                        for (var j = form.elements[i].options.length - 1; j >= 0; j--) {
                            if (field.options[j].selected) {
                                query += "&" + field.name + "=" + encodeURIComponent(field.options[j].value).replace(/%20/g, "+");
                            }
                        }
                    }
                    else {
                        if ((field.type !== "submit" && field.type !== "button")) {
                            query += "&" + field.name + "=" + encodeURIComponent(field.value).replace(/%20/g, "+");
                        }
                    }
                }
            }
            return query.substr(1);
        },

        val: function (value) {
            if (value === undefined) {
                return this[0].value;
            } else {
                this.each(function (v) {
                    v.value = value;
                });
                return this;
            }
        }

    });

    cash.fn.extend({

        append: function (content) {
            this[0].appendChild($(content)[0]);
            return this;
        },

        appendTo: function (content) {
            $(content)[0].appendChild(this[0]);
            return this;
        },

        clone: function () {
            return $(this[0].cloneNode(true));
        },

        empty: function () {
            this.each(function (v) {
                v.innerHTML = "";
            });
            return this;
        },

        html: function (content) {
            var source;
            if (content === "undefined") {
                return this[0].innerHTML;
            } else {
                source = typeof content === "object" ? $(content)[0].outerHTML : content;
                this.each(function (v) {
                    v.innerHTML = "" + source;
                });
                return this;
            }
        },

        insertAfter: function (selector) {
            $(selector)[0].insertAdjacentHTML("afterend", this[0].outerHTML);
            return this;
        },

        insertBefore: function (selector) {
            $(selector)[0].insertAdjacentHTML("beforebegin", this[0].outerHTML);
            return this;
        },

        prepend: function (selector) {
            $(this)[0].insertAdjacentHTML("afterBegin", $(selector)[0].outerHTML);
            return this;
        },

        prependTo: function (selector) {
            $(selector)[0].insertAdjacentHTML("afterBegin", this[0].outerHTML);
            return this;
        },

        remove: function () {
            this.each(function (v) {
                v.parentNode.removeChild(v);
            });
        },

        text: function (content) {
            if (!content) {
                return this[0].textContent;
            } else {
                this.each(function (v) {
                    v.textContent = content;
                });
                return this;
            }
        }

    });

    cash.fn.extend({

        children: function (selector) {
            if (!selector) {
                var children = this[0].children;
                cash.fn.extend(children, cash.fn);
                return children;
            } else {
                return cash(this[0].children).filter(function (v) {
                    return cash.matches(v, selector);
                });
            }
        },

        closest: function (selector) {
            if (!selector || cash.matches(this[0], selector)) {
                return this;
            } else {
                return this.parent().closest(selector);
            }
        },

        is: function (selector) {
            if (!selector) {
                return false;
            }
            if (selector.cash) {
                return this[0] === selector[0];
            }
            return typeof selector === "string" ? cash.matches(this[0], selector) : false;
        },

        find: function (selector) {
            var result;
            result = this[0].querySelectorAll(selector);
            cash.fn.extend(result, cash.fn);
            return result;
        },

        has: function (selector) {
            return Array.prototype.filter.call(this, function (el) {
                return cash(el).find(selector).length !== 0;
            });
        },

        next: function () {
            return cash(this[0].nextElementSibling);
        },

        not: function (selector) {
            return Array.prototype.filter.call(this, function (el) {
                return !cash.matches(el, selector);
            });
        },

        parent: function () {
            var result = Array.prototype.map.call(this, function (item) {
                return item.parentElement || document.body.parentNode;
            });
            return cash.unique(result);
        },

        parents: function (selector) {
            var last, result = [],
                count = 0;
            this.each(function (item) {
                last = item;
                while (last !== document.body.parentNode) {
                    last = last.parentElement;
                    if (!selector || (selector && cash.matches(last, selector))) {
                        result[count] = last;
                        count++;
                    }
                }
            });
            return cash.unique(result);
        },

        prev: function () {
            return cash(this[0].previousElementSibling);
        },

        siblings: function () {
            var collection = this.parent().children(),
                el = this[0];
            return Array.prototype.filter.call(collection, function (i) {
                return i !== el;
            });
        }

    });
}.call(window));