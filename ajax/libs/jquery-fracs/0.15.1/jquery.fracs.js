/* jQuery.fracs 0.15.1 - http://larsjung.de/jquery-fracs/ */
(function () {
'use strict';

// Some often used references.
var $ = jQuery;
var $window = $(window);
var $document = $(document);
var extend = $.extend;
var isFn = $.isFunction;
var mathMax = Math.max;
var mathMin = Math.min;
var mathRound = Math.round;

var getId = (function () {

        var ids = {};
        var nextId = 1;

        return function (element) {

            if (!element) {
                return 0;
            }
            if (!ids[element]) {
                ids[element] = nextId;
                nextId += 1;
            }
            return ids[element];
        };
    }());

function isTypeOf(obj, type) {

    return typeof obj === type;
}

function isInstanceOf(obj, type) {

    return obj instanceof type;
}

function isHTMLElement(obj) {

    return obj && obj.nodeType;
}

function getHTMLElement(obj) {

    return isHTMLElement(obj) ? obj : (isInstanceOf(obj, $) ? obj[0] : undefined);
}

function reduce(elements, fn, current) {

    $.each(elements, function (idx, element) {

        current = fn.call(element, current, idx, element);
    });
    return current;
}

function equal(obj1, obj2, props) {

    var i, l, prop;

    if (obj1 === obj2) {
        return true;
    }
    if (!obj1 || !obj2 || obj1.constructor !== obj2.constructor) {
        return false;
    }
    for (i = 0, l = props.length; i < l; i += 1) {
        prop = props[i];
        if (obj1[prop] && isFn(obj1[prop].equals) && !obj1[prop].equals(obj2[prop])) {
            return false;
        }
        if (obj1[prop] !== obj2[prop]) {
            return false;
        }
    }
    return true;
}




// Objects
// =======

// Rect
// ----
// Holds the position and dimensions of a rectangle. The position might be
// relative to document, viewport or element space.
function Rect(left, top, width, height) {

    // Top left corner of the rectangle rounded to integers.
    this.left = mathRound(left);
    this.top = mathRound(top);

    // Dimensions rounded to integers.
    this.width = mathRound(width);
    this.height = mathRound(height);

    // Bottom right corner of the rectangle.
    this.right = this.left + this.width;
    this.bottom = this.top + this.height;
}

// ### Prototype
extend(Rect.prototype, {

    // Checks if this instance equals `that` in position and dimensions.
    equals: function (that) {

        return equal(this, that, ['left', 'top', 'width', 'height']);
    },

    // Returns the area of this rectangle.
    area: function () {

        return this.width * this.height;
    },

    // Returns a new `Rect` representig this rect relative to `rect`.
    relativeTo: function (rect) {

        return new Rect(this.left - rect.left, this.top - rect.top, this.width, this.height);
    },

    // Returns a new rectangle representing the intersection of this
    // instance and `rect`. If there is no intersection the return value
    // is `null`.
    intersection: function (rect) {

        if (!isInstanceOf(rect, Rect)) {
            return null;
        }

        var left = mathMax(this.left, rect.left);
        var right = mathMin(this.right, rect.right);
        var top = mathMax(this.top, rect.top);
        var bottom = mathMin(this.bottom, rect.bottom);
        var width = right - left;
        var height = bottom - top;

        return (width >= 0 && height >= 0) ? new Rect(left, top, width, height) : null;
    },

    // Returns a new rectangle representing the smallest rectangle
    // containing this instance and `rect`.
    envelope: function (rect) {

        if (!isInstanceOf(rect, Rect)) {
            return this;
        }

        var left = mathMin(this.left, rect.left);
        var right = mathMax(this.right, rect.right);
        var top = mathMin(this.top, rect.top);
        var bottom = mathMax(this.bottom, rect.bottom);
        var width = right - left;
        var height = bottom - top;

        return new Rect(left, top, width, height);
    }
});

// ### Static methods
extend(Rect, {

    // Returns a new instance of `Rect` representing the content of the
    // specified element. Since the coordinates are in content space the
    // `left` and `top` values are always set to `0`. If `inDocSpace` is
    // `true` the rect gets returned in document space.
    ofContent: function (element, inContentSpace) {

        if (!element || element === document || element === window) {
            return new Rect(0, 0, $document.width(), $document.height());
        }

        if (inContentSpace) {
            return new Rect(0, 0, element.scrollWidth, element.scrollHeight);
        } else {
            return new Rect(element.offsetLeft - element.scrollLeft, element.offsetTop - element.scrollTop, element.scrollWidth, element.scrollHeight);
        }
    },

    // Returns a new instance of `Rect` representing the viewport of the
    // specified element. If `inDocSpace` is `true` the rect gets returned
    // in document space instead of content space.
    ofViewport: function (element, inContentSpace) {

        if (!element || element === document || element === window) {
            return new Rect($window.scrollLeft(), $window.scrollTop(), $window.width(), $window.height());
        }

        if (inContentSpace) {
            return new Rect(element.scrollLeft, element.scrollTop, element.clientWidth, element.clientHeight);
        } else {
            return new Rect(element.offsetLeft, element.offsetTop, element.clientWidth, element.clientHeight);
        }
    },

    // Returns a new instance of `Rect` representing a given
    // `HTMLElement`. The dimensions respect padding and border widths. If
    // the element is invisible (as determined by jQuery) the return value
    // is null.
    ofElement: function (element) {

        var $element = $(element);
        if (!$element.is(':visible')) {
            return null;
        }

        var offset = $element.offset();
        return new Rect(offset.left, offset.top, $element.outerWidth(), $element.outerHeight());
    }
});



// Fractions
// ---------
// The heart of the library. Creates and holds the
// fractions data for the two specified rects. `viewport` defaults to
// `Rect.ofViewport()`.
function Fractions(visible, viewport, possible, rects) {

    this.visible = visible || 0;
    this.viewport = viewport || 0;
    this.possible = possible || 0;
    this.rects = (rects && extend({}, rects)) || null;
}

// ### Prototype
extend(Fractions.prototype, {

    // Checks if this instance equals `that` in all attributes.
    equals: function (that) {

        return this.fracsEqual(that) && this.rectsEqual(that);
    },

    // Checks if this instance equals `that` in all fraction attributes.
    fracsEqual: function (that) {

        return equal(this, that, ['visible', 'viewport', 'possible']);
    },

    // Checks if this instance equals `that` in all rectangle attributes.
    rectsEqual: function (that) {

        return equal(this.rects, that.rects, ['document', 'element', 'viewport']);
    }
});

// ### Static methods
extend(Fractions, {

    of: function (rect, viewport) {

        var intersection, intersectionArea, possibleArea;

        rect = (isHTMLElement(rect) && Rect.ofElement(rect)) || rect;
        viewport = (isHTMLElement(viewport) && Rect.ofViewport(viewport)) || viewport || Rect.ofViewport();

        if (!(rect instanceof Rect)) {
            return new Fractions();
        }
        intersection = rect.intersection(viewport);
        if (!intersection) {
            return new Fractions();
        }

        intersectionArea = intersection.area();
        possibleArea = mathMin(rect.width, viewport.width) * mathMin(rect.height, viewport.height);
        return new Fractions(
            intersectionArea / rect.area(),
            intersectionArea / viewport.area(),
            intersectionArea / possibleArea,
            {
                document: intersection,
                element: intersection.relativeTo(rect),
                viewport: intersection.relativeTo(viewport)
            }
        );
    }
});



// Group
// -----
function Group(elements, viewport) {

    this.els = elements;
    this.viewport = viewport;
}

// ### Helpers

// Accepted values for `property` parameters below.
var rectProps = ['width', 'height', 'left', 'right', 'top', 'bottom'];
var fracsProps = ['possible', 'visible', 'viewport'];

// Returns the specified `property` for `HTMLElement element` or `0`
// if `property` is invalid.
function getValue(element, viewport, property) {

    var obj;

    if ($.inArray(property, rectProps) >= 0) {
        obj = Rect.ofElement(element);
    } else if ($.inArray(property, fracsProps) >= 0) {
        obj = Fractions.of(element, viewport);
    }
    return obj ? obj[property] : 0;
}

// Sorting functions.
function sortAscending(entry1, entry2) {

    return entry1.val - entry2.val;
}

function sortDescending(entry1, entry2) {

    return entry2.val - entry1.val;
}

// ### Prototype
extend(Group.prototype, {

    // Returns a sorted list of objects `{el: HTMLElement, val: Number}`
    // for the specified `property`. `descending` defaults to `false`.
    sorted: function (property, descending) {

        var viewport = this.viewport;

        return $.map(this.els, function (element) {

                    return {
                        el: element,
                        val: getValue(element, viewport, property)
                    };
                })
                .sort(descending ? sortDescending : sortAscending);
    },

    // Returns the first element of the sorted list returned by `sorted` above,
    // or `null` if this list is empty.
    best: function (property, descending) {

        return this.els.length ? this.sorted(property, descending)[0] : null;
    }
});



// ScrollState
// -----------
function ScrollState(element) {

    var content = Rect.ofContent(element, true);
    var viewport = Rect.ofViewport(element, true);
    var w = content.width - viewport.width;
    var h = content.height - viewport.height;

    this.content = content;
    this.viewport = viewport;
    this.width = w <= 0 ? null : viewport.left / w;
    this.height = h <= 0 ? null : viewport.top / h;
    this.left = viewport.left;
    this.top = viewport.top;
    this.right = content.right - viewport.right;
    this.bottom = content.bottom - viewport.bottom;
}

// ### Prototype
extend(ScrollState.prototype, {

    // Checks if this instance equals `that`.
    equals: function (that) {

        return equal(this, that, ['width', 'height', 'left', 'top', 'right', 'bottom', 'content', 'viewport']);
    }
});



// Viewport
// --------
function Viewport(element) {

    this.el = element || window;
}

// ### Prototype
extend(Viewport.prototype, {

    // Checks if this instance equals `that`.
    equals: function (that) {

        return equal(this, that, ['el']);
    },

    scrollState: function () {

        return new ScrollState(this.el);
    },

    scrollTo: function (left, top, duration) {

        var $el = this.el === window ? $('html,body') : $(this.el);

        left = left || 0;
        top = top || 0;
        duration = isNaN(duration) ? 1000 : duration;

        $el.stop(true).animate({scrollLeft: left, scrollTop: top}, duration);
    },

    scroll: function (left, top, duration) {

        var $el = this.el === window ? $window : $(this.el);

        left = left || 0;
        top = top || 0;

        this.scrollTo($el.scrollLeft() + left, $el.scrollTop() + top, duration);
    },

    scrollToRect: function (rect, paddingLeft, paddingTop, duration) {

        paddingLeft = paddingLeft || 0;
        paddingTop = paddingTop || 0;

        this.scrollTo(rect.left - paddingLeft, rect.top - paddingTop, duration);
    },

    scrollToElement: function (element, paddingLeft, paddingTop, duration) {

        var rect = Rect.ofElement(element).relativeTo(Rect.ofContent(this.el));

        this.scrollToRect(rect, paddingLeft, paddingTop, duration);
    }
});





// Callbacks
// =========

// callbacks mix-in
// ----------------
// Expects `context: HTMLElement` and `updatedValue: function`.
var callbacksMixIn = {

    // Initial setup.
    init: function () {

        this.callbacks = $.Callbacks('memory unique');
        this.currVal = null;
        this.prevVal = null;

        // A proxy to make `check` bindable to events.
        this.checkProxy = $.proxy(this.check, this);

        this.autoCheck();
    },

    // Adds a new callback function.
    bind: function (callback) {

        this.callbacks.add(callback);
    },

    // Removes a previously added callback function.
    unbind: function (callback) {

        if (callback) {
            this.callbacks.remove(callback);
        } else {
            this.callbacks.empty();
        }
    },

    // Triggers all callbacks with the current values.
    trigger: function () {

        this.callbacks.fireWith(this.context, [this.currVal, this.prevVal]);
    },

    // Checks if value changed, updates attributes `currVal` and
    // `prevVal` accordingly and triggers the callbacks. Returns
    // `true` if value changed, otherwise `false`.
    check: function (event) {

        var value = this.updatedValue(event);

        if (value === undefined) {
            return false;
        }

        this.prevVal = this.currVal;
        this.currVal = value;
        this.trigger();
        return true;
    },

    // Auto-check configuration.
    $autoTarget: $window,
    autoEvents: 'load resize scroll',

    // Enables/disables automated checking for changes on the specified `window`
    // events.
    autoCheck: function (on) {

        this.$autoTarget[on === false ? 'off' : 'on'](this.autoEvents, this.checkProxy);
    }
};



// FracsCallbacks
// --------------
function FracsCallbacks(element, viewport) {

    this.context = element;
    this.viewport = viewport;
    this.init();
}

// ### Prototype
extend(FracsCallbacks.prototype, callbacksMixIn, {
    updatedValue: function () {

        var value = Fractions.of(this.context, this.viewport);

        if (!this.currVal || !this.currVal.equals(value)) {
            return value;
        }
    }
});



// GroupCallbacks
// --------------
function GroupCallbacks(elements, viewport, property, descending) {

    this.context = new Group(elements, viewport);
    this.property = property;
    this.descending = descending;
    this.init();
}

// ### Prototype
extend(GroupCallbacks.prototype, callbacksMixIn, {
    updatedValue: function () {

        var best = this.context.best(this.property, this.descending);

        if (best) {
            best = best.val > 0 ? best.el : null;
            if (this.currVal !== best) {
                return best;
            }
        }
    }
});



// ScrollStateCallbacks
// --------------------
function ScrollStateCallbacks(element) {

    if (!element || element === window || element === document) {
        this.context = window;
    } else {
        this.context = element;
        this.$autoTarget = $(element);
    }
    this.init();
}

// ### Prototype
extend(ScrollStateCallbacks.prototype, callbacksMixIn, {
    updatedValue: function () {

        var value = new ScrollState(this.context);

        if (!this.currVal || !this.currVal.equals(value)) {
            return value;
        }
    }
});



/* modplug 1.5.0 - http://larsjung.de/modplug/ */
function modplug(t,n){"use strict";function e(n,e,u,s){return u=r(u)?u.apply(n,e):u,r(s[u])?s[u].apply(n,e):void i.error('Method "'+u+'" does not exist on jQuery.'+t)}function u(t){t&&(o(c,t.statics),o(l,t.methods)),c.modplug=u}var s=[].slice,i=jQuery,o=i.extend,r=i.isFunction,a=o({},n),c=function d(){return e(this,s.call(arguments),a.defaultStatic,d)},l=function f(t){return r(f[t])?f[t].apply(this,s.call(arguments,1)):e(this,s.call(arguments),a.defaultMethod,f)};u.prev={statics:i[t],methods:i.fn[t]},u(n),i[t]=c,i.fn[t]=l};



// Register the plug-in
// ====================

// The namespace used to register the plug-in and to attach data to
// elements.
var namespace = 'fracs';

// The methods are sorted in alphabetical order. All methods that do not
// provide a return value will return `this` to enable method chaining.
modplug(namespace, {

    // Static methods
    // --------------
    // These methods are accessible via `$.fracs.<methodname>`.
    statics: {

        // Build version.
        version: '0.15.1',

        // Publish object constructors (for testing).
        Rect: Rect,
        Fractions: Fractions,
        Group: Group,
        ScrollState: ScrollState,
        Viewport: Viewport,
        FracsCallbacks: FracsCallbacks,
        GroupCallbacks: GroupCallbacks,
        ScrollStateCallbacks: ScrollStateCallbacks,

        // ### fracs
        // This is the **default method**. So instead of calling
        // `$.fracs.fracs(...)` simply call `$.fracs(...)`.
        //
        // Returns the fractions for a given `Rect` and `viewport`,
        // viewport defaults to `$.fracs.viewport()`.
        //
        //      $.fracs(rect: Rect, [viewport: Rect]): Fractions
        fracs: function (rect, viewport) {

            return Fractions.of(rect, viewport);
        }
    },

    // Instance methods
    // ----------------
    // These methods are accessible via `$(selector).fracs('<methodname>', ...)`.
    methods: {

        // ### 'content'
        // Returns the content rect of the first selected element in content space.
        // If no element is selected it returns the document rect.
        //
        //      .fracs('content'): Rect
        content: function (inContentSpace) {

            return this.length ? Rect.ofContent(this[0], inContentSpace) : null;
        },

        // ### 'envelope'
        // Returns the smallest rectangle that containes all selected elements.
        //
        //      .fracs('envelope'): Rect
        envelope: function () {

            return reduce(this, function (current) {

                var rect = Rect.ofElement(this);
                return current ? current.envelope(rect) : rect;
            });
        },

        // ### 'fracs'
        // This is the **default method**. So the first parameter `'fracs'`
        // can be omitted.
        //
        // Returns the fractions for the first selected element.
        //
        //      .fracs(): Fractions
        //
        // Binds a callback function that will be invoked if fractions have changed
        // after a `window resize` or `window scroll` event.
        //
        //      .fracs(callback(fracs: Fractions, prevFracs: Fractions)): jQuery
        //
        // Unbinds the specified callback function.
        //
        //      .fracs('unbind', callback): jQuery
        //
        // Unbinds all callback functions.
        //
        //      .fracs('unbind'): jQuery
        //
        // Checks if fractions changed and if so invokes all bound callback functions.
        //
        //      .fracs('check'): jQuery
        fracs: function (action, callback, viewport) {

            if (!isTypeOf(action, 'string')) {
                viewport = callback;
                callback = action;
                action = null;
            }
            if (!isFn(callback)) {
                viewport = callback;
                callback = null;
            }
            viewport = getHTMLElement(viewport);

            var ns = namespace + '.fracs.' + getId(viewport);

            if (action === 'unbind') {
                return this.each(function () {

                    var cbs = $(this).data(ns);

                    if (cbs) {
                        cbs.unbind(callback);
                    }
                });
            } else if (action === 'check') {
                return this.each(function () {

                    var cbs = $(this).data(ns);

                    if (cbs) {
                        cbs.check();
                    }
                });
            } else if (isFn(callback)) {
                return this.each(function () {

                    var $this = $(this),
                        cbs = $this.data(ns);

                    if (!cbs) {
                        cbs = new FracsCallbacks(this, viewport);
                        $this.data(ns, cbs);
                    }
                    cbs.bind(callback);
                });
            }

            return this.length ? Fractions.of(this[0], viewport) : null;
        },

        // ### 'intersection'
        // Returns the greatest rectangle that is contained in all selected elements.
        //
        //      .fracs('intersection'): Rect
        intersection: function () {

            return reduce(this, function (current) {

                var rect = Rect.ofElement(this);
                return current ? current.intersection(rect) : rect;
            });
        },

        // ### 'max'
        // Reduces the set of selected elements to those with the maximum value
        // of the specified property.
        // Valid values for property are `possible`, `visible`, `viewport`,
        // `width`, `height`, `left`, `right`, `top`, `bottom`.
        //
        //      .fracs('max', property: String): jQuery
        //
        // Binds a callback function to the set of selected elements that gets
        // triggert whenever the element with the highest value of the specified
        // property changes.
        //
        //      .fracs('max', property: String, callback(best: Element, prevBest: Element)): jQuery
        max: function (property, callback, viewport) {

            if (!isFn(callback)) {
                viewport = callback;
                callback = null;
            }
            viewport = getHTMLElement(viewport);

            if (callback) {
                new GroupCallbacks(this, viewport, property, true).bind(callback);
                return this;
            }

            return this.pushStack(new Group(this, viewport).best(property, true).el);
        },

        // ### 'min'
        // Reduces the set of selected elements to those with the minimum value
        // of the specified property.
        // Valid values for property are `possible`, `visible`, `viewport`,
        // `width`, `height`, `left`, `right`, `top`, `bottom`.
        //
        //      .fracs('min', property: String): jQuery
        //
        // Binds a callback function to the set of selected elements that gets
        // triggert whenever the element with the lowest value of the specified
        // property changes.
        //
        //      .fracs('min', property: String, callback(best: Element, prevBest: Element)): jQuery
        min: function (property, callback, viewport) {

            if (!isFn(callback)) {
                viewport = callback;
                callback = null;
            }
            viewport = getHTMLElement(viewport);

            if (callback) {
                new GroupCallbacks(this, viewport, property).bind(callback);
                return this;
            }

            return this.pushStack(new Group(this, viewport).best(property).el);
        },

        // ### 'rect'
        // Returns the dimensions for the first selected element in document space.
        //
        //      .fracs('rect'): Rect
        rect: function () {

            return this.length ? Rect.ofElement(this[0]) : null;
        },

        // ### 'scrollState'
        // Returns the current scroll state for the first selected element.
        //
        //      .fracs('scrollState'): ScrollState
        //
        // Binds a callback function that will be invoked if scroll state has changed
        // after a `resize` or `scroll` event.
        //
        //      .fracs('scrollState', callback(scrollState: scrollState, prevScrollState: scrollState)): jQuery
        //
        // Unbinds the specified callback function.
        //
        //      .fracs('scrollState', 'unbind', callback): jQuery
        //
        // Unbinds all callback functions.
        //
        //      .fracs('scrollState', 'unbind'): jQuery
        //
        // Checks if scroll state changed and if so invokes all bound callback functions.
        //
        //      .fracs('scrollState', 'check'): jQuery
        scrollState: function (action, callback) {

            var ns = namespace + '.scrollState';

            if (!isTypeOf(action, 'string')) {
                callback = action;
                action = null;
            }

            if (action === 'unbind') {
                return this.each(function () {

                    var cbs = $(this).data(ns);

                    if (cbs) {
                        cbs.unbind(callback);
                    }
                });
            } else if (action === 'check') {
                return this.each(function () {

                    var cbs = $(this).data(ns);

                    if (cbs) {
                        cbs.check();
                    }
                });
            } else if (isFn(callback)) {
                return this.each(function () {

                    var $this = $(this),
                        cbs = $this.data(ns);

                    if (!cbs) {
                        cbs = new ScrollStateCallbacks(this);
                        $this.data(ns, cbs);
                    }
                    cbs.bind(callback);
                });
            }

            return this.length ? new ScrollState(this[0]) : null;
        },

        // ### 'scroll'
        // Scrolls the selected elements relative to its current position,
        // `padding` defaults to `0`, `duration` to `1000`.
        //
        //      .fracs('scroll', element: HTMLElement/jQuery, [paddingLeft: int,] [paddingTop: int,] [duration: int]): jQuery
        scroll: function (left, top, duration) {

            return this.each(function () {

                new Viewport(this).scroll(left, top, duration);
            });
        },

        // ### 'scrollTo'
        // Scrolls the selected elements to the specified element or an absolute position,
        // `padding` defaults to `0`, `duration` to `1000`.
        //
        //      .fracs('scrollTo', element: HTMLElement/jQuery, [paddingLeft: int,] [paddingTop: int,] [duration: int]): jQuery
        //      .fracs('scrollTo', [left: int,] [top: int,] [duration: int]): jQuery
        scrollTo: function (element, paddingLeft, paddingTop, duration) {

            if ($.isNumeric(element)) {
                duration = paddingTop;
                paddingTop = paddingLeft;
                paddingLeft = element;
                element = null;
            }

            element = getHTMLElement(element);

            return this.each(function () {

                if (element) {
                    new Viewport(this).scrollToElement(element, paddingLeft, paddingTop, duration);
                } else {
                    new Viewport(this).scrollTo(paddingLeft, paddingTop, duration);
                }
            });
        },

        // ### 'scrollToThis'
        // Scrolls the viewport (window) to the first selected element in the specified time,
        // `padding` defaults to `0`, `duration` to `1000`.
        //
        //      .fracs('scrollToThis', [paddingLeft: int,] [paddingTop: int,] [duration: int,] [viewport: HTMLElement/jQuery]): jQuery
        scrollToThis: function (paddingLeft, paddingTop, duration, viewport) {

            viewport = new Viewport(getHTMLElement(viewport));

            viewport.scrollToElement(this[0], paddingLeft, paddingTop, duration);
            return this;
        },

        // ### 'softLink'
        // Converts all selected page intern links `<a href="#...">` into soft links.
        // Uses `scrollTo` to scroll to the location.
        //
        //      .fracs('softLink', [paddingLeft: int,] [paddingTop: int,] [duration: int,] [viewport: HTMLElement/jQuery]): jQuery
        softLink: function (paddingLeft, paddingTop, duration, viewport) {

            viewport = new Viewport(getHTMLElement(viewport));

            return this.filter('a[href^=#]').each(function () {
                var $a = $(this);
                $a.on('click', function () {
                    viewport.scrollToElement($($a.attr('href'))[0], paddingLeft, paddingTop, duration);
                });
            });
        },

        // ### 'sort'
        // Sorts the set of selected elements by the specified property.
        // Valid values for property are `possible`, `visible`, `viewport`,
        // `width`, `height`, `left`, `right`, `top`, `bottom`. The default
        // sort order is descending.
        //
        //      .fracs('sort', property: String, [ascending: boolean]): jQuery
        sort: function (property, ascending, viewport) {

            if (!isTypeOf(ascending, 'boolean')) {
                viewport = ascending;
                ascending = null;
            }
            viewport = getHTMLElement(viewport);

            return this.pushStack($.map(new Group(this, viewport).sorted(property, !ascending), function (entry) {
                return entry.el;
            }));
        },

        // ### 'viewport'
        // Returns the current viewport of the first selected element in content space.
        // If no element is selected it returns the document's viewport.
        //
        //      .fracs('viewport'): Rect
        viewport: function (inContentSpace) {

            return this.length ? Rect.ofViewport(this[0], inContentSpace) : null;
        }
    },

    // Defaults
    // --------
    defaultStatic: 'fracs',
    defaultMethod: 'fracs'
});

}());
