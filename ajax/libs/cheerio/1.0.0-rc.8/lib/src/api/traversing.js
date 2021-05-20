"use strict";
/**
 * Methods for traversing the DOM structure.
 *
 * @module cheerio/traversing
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBack = exports.add = exports.end = exports.slice = exports.index = exports.get = exports.eq = exports.last = exports.first = exports.has = exports.not = exports.filter = exports.map = exports.each = exports.contents = exports.children = exports.siblings = exports.prevUntil = exports.prevAll = exports.prev = exports.nextUntil = exports.nextAll = exports.next = exports.closest = exports.parentsUntil = exports.parents = exports.parent = exports.find = void 0;
var tslib_1 = require("tslib");
var domhandler_1 = require("domhandler");
var select = tslib_1.__importStar(require("cheerio-select"));
var utils_1 = require("../utils");
var htmlparser2_1 = require("htmlparser2");
var uniqueSort = htmlparser2_1.DomUtils.uniqueSort;
var reSiblingSelector = /^\s*[~+]/;
/**
 * Get the descendants of each element in the current set of matched elements,
 * filtered by a selector, jQuery object, or element.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('#fruits').find('li').length;
 * //=> 3
 * $('#fruits').find($('.apple')).length;
 * //=> 1
 * ```
 *
 * @param selectorOrHaystack - Element to look for.
 * @returns The found elements.
 * @see {@link https://api.jquery.com/find/}
 */
function find(selectorOrHaystack) {
    if (!selectorOrHaystack) {
        return this._make([]);
    }
    var context = this.toArray();
    if (typeof selectorOrHaystack !== 'string') {
        var contains_1 = this.constructor.contains;
        var haystack = utils_1.isCheerio(selectorOrHaystack)
            ? selectorOrHaystack.get()
            : [selectorOrHaystack];
        return this._make(haystack.filter(function (elem) { return context.some(function (node) { return contains_1(node, elem); }); }));
    }
    var elems = reSiblingSelector.test(selectorOrHaystack)
        ? context
        : context.reduce(function (newElems, elem) {
            return domhandler_1.hasChildren(elem)
                ? newElems.concat(elem.children.filter(utils_1.isTag))
                : newElems;
        }, []);
    var options = { context: context, xmlMode: this.options.xmlMode };
    return this._make(select.select(selectorOrHaystack, elems, options));
}
exports.find = find;
/**
 * Get the parent of each element in the current set of matched elements,
 * optionally filtered by a selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.pear').parent().attr('id');
 * //=> fruits
 * ```
 *
 * @param selector - If specified filter for parent.
 * @returns The parents.
 * @see {@link https://api.jquery.com/parent/}
 */
function parent(selector) {
    var set = [];
    utils_1.domEach(this, function (_, elem) {
        var parentElem = elem.parent;
        if (parentElem &&
            parentElem.type !== 'root' &&
            !set.includes(parentElem)) {
            set.push(parentElem);
        }
    });
    return selector ? filter.call(set, selector, this) : this._make(set);
}
exports.parent = parent;
/**
 * Get a set of parents filtered by `selector` of each element in the current
 * set of match elements.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.orange').parents().length;
 * //=> 2
 * $('.orange').parents('#fruits').length;
 * //=> 1
 * ```
 *
 * @param selector - If specified filter for parents.
 * @returns The parents.
 * @see {@link https://api.jquery.com/parents/}
 */
function parents(selector) {
    var _this = this;
    var parentNodes = [];
    /*
     * When multiple DOM elements are in the original set, the resulting set will
     * be in *reverse* order of the original elements as well, with duplicates
     * removed.
     */
    this.get()
        .reverse()
        .forEach(function (elem) {
        return traverseParents(_this, elem.parent, selector, Infinity).forEach(function (node) {
            // We know these must be `Element`s, as we filter out root nodes.
            if (!parentNodes.includes(node)) {
                parentNodes.push(node);
            }
        });
    });
    return this._make(parentNodes);
}
exports.parents = parents;
/**
 * Get the ancestors of each element in the current set of matched elements, up
 * to but not including the element matched by the selector, DOM node, or cheerio object.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.orange').parentsUntil('#food').length;
 * //=> 1
 * ```
 *
 * @param selector - Selector for element to stop at.
 * @param filterBy - Optional filter for parents.
 * @returns The parents.
 * @see {@link https://api.jquery.com/parentsUntil/}
 */
function parentsUntil(selector, filterBy) {
    var parentNodes = [];
    var untilNode;
    var untilNodes;
    if (typeof selector === 'string') {
        untilNodes = this.parents(selector).toArray();
    }
    else if (selector && utils_1.isCheerio(selector)) {
        untilNodes = selector.toArray();
    }
    else if (selector) {
        untilNode = selector;
    }
    /*
     * When multiple DOM elements are in the original set, the resulting set will
     * be in *reverse* order of the original elements as well, with duplicates
     * removed.
     */
    this.toArray()
        .reverse()
        .forEach(function (elem) {
        while (elem.parent) {
            elem = elem.parent;
            if ((untilNode && elem !== untilNode) ||
                (untilNodes && !untilNodes.includes(elem)) ||
                (!untilNode && !untilNodes)) {
                if (utils_1.isTag(elem) && !parentNodes.includes(elem)) {
                    parentNodes.push(elem);
                }
            }
            else {
                break;
            }
        }
    }, this);
    return filterBy
        ? filter.call(parentNodes, filterBy, this)
        : this._make(parentNodes);
}
exports.parentsUntil = parentsUntil;
/**
 * For each element in the set, get the first element that matches the selector
 * by testing the element itself and traversing up through its ancestors in the DOM tree.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.orange').closest();
 * //=> []
 *
 * $('.orange').closest('.apple');
 * // => []
 *
 * $('.orange').closest('li');
 * //=> [<li class="orange">Orange</li>]
 *
 * $('.orange').closest('#fruits');
 * //=> [<ul id="fruits"> ... </ul>]
 * ```
 *
 * @param selector - Selector for the element to find.
 * @returns The closest nodes.
 * @see {@link https://api.jquery.com/closest/}
 */
function closest(selector) {
    var _this = this;
    var set = [];
    if (!selector) {
        return this._make(set);
    }
    utils_1.domEach(this, function (_, elem) {
        var closestElem = traverseParents(_this, elem, selector, 1)[0];
        // Do not add duplicate elements to the set
        if (closestElem && !set.includes(closestElem)) {
            set.push(closestElem);
        }
    });
    return this._make(set);
}
exports.closest = closest;
/**
 * Gets the next sibling of the first selected element, optionally filtered by a selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.apple').next().hasClass('orange');
 * //=> true
 * ```
 *
 * @param selector - If specified filter for sibling.
 * @returns The next nodes.
 * @see {@link https://api.jquery.com/next/}
 */
function next(selector) {
    var elems = [];
    utils_1.domEach(this, function (_, elem) {
        while (elem.next) {
            elem = elem.next;
            if (utils_1.isTag(elem)) {
                elems.push(elem);
                return;
            }
        }
    });
    return selector ? filter.call(elems, selector, this) : this._make(elems);
}
exports.next = next;
/**
 * Gets all the following siblings of the first selected element, optionally
 * filtered by a selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.apple').nextAll();
 * //=> [<li class="orange">Orange</li>, <li class="pear">Pear</li>]
 * $('.apple').nextAll('.orange');
 * //=> [<li class="orange">Orange</li>]
 * ```
 *
 * @param selector - If specified filter for siblings.
 * @returns The next nodes.
 * @see {@link https://api.jquery.com/nextAll/}
 */
function nextAll(selector) {
    var elems = [];
    utils_1.domEach(this, function (_, elem) {
        while (elem.next) {
            elem = elem.next;
            if (utils_1.isTag(elem) && !elems.includes(elem)) {
                elems.push(elem);
            }
        }
    });
    return selector ? filter.call(elems, selector, this) : this._make(elems);
}
exports.nextAll = nextAll;
/**
 * Gets all the following siblings up to but not including the element matched
 * by the selector, optionally filtered by another selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.apple').nextUntil('.pear');
 * //=> [<li class="orange">Orange</li>]
 * ```
 *
 * @param selector - Selector for element to stop at.
 * @param filterSelector - If specified filter for siblings.
 * @returns The next nodes.
 * @see {@link https://api.jquery.com/nextUntil/}
 */
function nextUntil(selector, filterSelector) {
    var elems = [];
    var untilNode;
    var untilNodes;
    if (typeof selector === 'string') {
        untilNodes = this.nextAll(selector).toArray();
    }
    else if (selector && utils_1.isCheerio(selector)) {
        untilNodes = selector.get();
    }
    else if (selector) {
        untilNode = selector;
    }
    utils_1.domEach(this, function (_, elem) {
        while (elem.next) {
            elem = elem.next;
            if ((untilNode && elem !== untilNode) ||
                (untilNodes && !untilNodes.includes(elem)) ||
                (!untilNode && !untilNodes)) {
                if (utils_1.isTag(elem) && !elems.includes(elem)) {
                    elems.push(elem);
                }
            }
            else {
                break;
            }
        }
    });
    return filterSelector
        ? filter.call(elems, filterSelector, this)
        : this._make(elems);
}
exports.nextUntil = nextUntil;
/**
 * Gets the previous sibling of the first selected element optionally filtered
 * by a selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.orange').prev().hasClass('apple');
 * //=> true
 * ```
 *
 * @param selector - If specified filter for siblings.
 * @returns The previous nodes.
 * @see {@link https://api.jquery.com/prev/}
 */
function prev(selector) {
    var elems = [];
    utils_1.domEach(this, function (_, elem) {
        while (elem.prev) {
            elem = elem.prev;
            if (utils_1.isTag(elem)) {
                elems.push(elem);
                return;
            }
        }
    });
    return selector ? filter.call(elems, selector, this) : this._make(elems);
}
exports.prev = prev;
/**
 * Gets all the preceding siblings of the first selected element, optionally
 * filtered by a selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.pear').prevAll();
 * //=> [<li class="orange">Orange</li>, <li class="apple">Apple</li>]
 *
 * $('.pear').prevAll('.orange');
 * //=> [<li class="orange">Orange</li>]
 * ```
 *
 * @param selector - If specified filter for siblings.
 * @returns The previous nodes.
 * @see {@link https://api.jquery.com/prevAll/}
 */
function prevAll(selector) {
    var elems = [];
    utils_1.domEach(this, function (_, elem) {
        while (elem.prev) {
            elem = elem.prev;
            if (utils_1.isTag(elem) && !elems.includes(elem)) {
                elems.push(elem);
            }
        }
    });
    return selector ? filter.call(elems, selector, this) : this._make(elems);
}
exports.prevAll = prevAll;
/**
 * Gets all the preceding siblings up to but not including the element matched
 * by the selector, optionally filtered by another selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.pear').prevUntil('.apple');
 * //=> [<li class="orange">Orange</li>]
 * ```
 *
 * @param selector - Selector for element to stop at.
 * @param filterSelector - If specified filter for siblings.
 * @returns The previous nodes.
 * @see {@link https://api.jquery.com/prevUntil/}
 */
function prevUntil(selector, filterSelector) {
    var elems = [];
    var untilNode;
    var untilNodes;
    if (typeof selector === 'string') {
        untilNodes = this.prevAll(selector).toArray();
    }
    else if (selector && utils_1.isCheerio(selector)) {
        untilNodes = selector.get();
    }
    else if (selector) {
        untilNode = selector;
    }
    utils_1.domEach(this, function (_, elem) {
        while (elem.prev) {
            elem = elem.prev;
            if ((untilNode && elem !== untilNode) ||
                (untilNodes && !untilNodes.includes(elem)) ||
                (!untilNode && !untilNodes)) {
                if (utils_1.isTag(elem) && !elems.includes(elem)) {
                    elems.push(elem);
                }
            }
            else {
                break;
            }
        }
    });
    return filterSelector
        ? filter.call(elems, filterSelector, this)
        : this._make(elems);
}
exports.prevUntil = prevUntil;
/**
 * Get the siblings of each element (excluding the element) in the set of
 * matched elements, optionally filtered by a selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.pear').siblings().length;
 * //=> 2
 *
 * $('.pear').siblings('.orange').length;
 * //=> 1
 * ```
 *
 * @param selector - If specified filter for siblings.
 * @returns The siblings.
 * @see {@link https://api.jquery.com/siblings/}
 */
function siblings(selector) {
    var _this = this;
    // TODO Still get siblings if `parent` is null; see DomUtils' `getSiblings`.
    var parent = this.parent();
    var elems = parent
        .children()
        .toArray()
        // TODO: This removes all elements in the selection. Note that they could be added here, if siblings are part of the selection.
        .filter(function (elem) { return !_this.is(elem); });
    return selector ? filter.call(elems, selector, this) : this._make(elems);
}
exports.siblings = siblings;
/**
 * Gets the children of the first selected element.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('#fruits').children().length;
 * //=> 3
 *
 * $('#fruits').children('.pear').text();
 * //=> Pear
 * ```
 *
 * @param selector - If specified filter for children.
 * @returns The children.
 * @see {@link https://api.jquery.com/children/}
 */
function children(selector) {
    var elems = this.toArray().reduce(function (newElems, elem) {
        return domhandler_1.hasChildren(elem)
            ? newElems.concat(elem.children.filter(utils_1.isTag))
            : newElems;
    }, []);
    return selector ? filter.call(elems, selector, this) : this._make(elems);
}
exports.children = children;
/**
 * Gets the children of each element in the set of matched elements, including
 * text and comment nodes.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('#fruits').contents().length;
 * //=> 3
 * ```
 *
 * @returns The children.
 * @see {@link https://api.jquery.com/contents/}
 */
function contents() {
    var elems = this.toArray().reduce(function (newElems, elem) {
        return domhandler_1.hasChildren(elem) ? newElems.concat(elem.children) : newElems;
    }, []);
    return this._make(elems);
}
exports.contents = contents;
/**
 * Iterates over a cheerio object, executing a function for each matched
 * element. When the callback is fired, the function is fired in the context of
 * the DOM element, so `this` refers to the current element, which is equivalent
 * to the function parameter `element`. To break out of the `each` loop early,
 * return with `false`.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * const fruits = [];
 *
 * $('li').each(function (i, elem) {
 *   fruits[i] = $(this).text();
 * });
 *
 * fruits.join(', ');
 * //=> Apple, Orange, Pear
 * ```
 *
 * @param fn - Function to execute.
 * @returns The instance itself, useful for chaining.
 * @see {@link https://api.jquery.com/each/}
 */
function each(fn) {
    var i = 0;
    var len = this.length;
    while (i < len && fn.call(this[i], i, this[i]) !== false)
        ++i;
    return this;
}
exports.each = each;
/**
 * Pass each element in the current matched set through a function, producing a
 * new Cheerio object containing the return values. The function can return an
 * individual data item or an array of data items to be inserted into the
 * resulting set. If an array is returned, the elements inside the array are
 * inserted into the set. If the function returns null or undefined, no element
 * will be inserted.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('li')
 *   .map(function (i, el) {
 *     // this === el
 *     return $(this).text();
 *   })
 *   .toArray()
 *   .join(' ');
 * //=> "apple orange pear"
 * ```
 *
 * @param fn - Function to execute.
 * @returns The mapped elements, wrapped in a Cheerio collection.
 * @see {@link https://api.jquery.com/map/}
 */
function map(fn) {
    var elems = [];
    for (var i = 0; i < this.length; i++) {
        var el = this[i];
        var val = fn.call(el, i, el);
        if (val != null) {
            elems = elems.concat(val);
        }
    }
    return this._make(elems);
}
exports.map = map;
function getFilterFn(match) {
    if (typeof match === 'function') {
        return function (el, i) {
            return match.call(el, i, el);
        };
    }
    if (utils_1.isCheerio(match)) {
        return match.is.bind(match);
    }
    return function (el) {
        return match === el;
    };
}
/**
 * Iterates over a cheerio object, reducing the set of selector elements to
 * those that match the selector or pass the function's test. When a Cheerio
 * selection is specified, return only the elements contained in that selection.
 * When an element is specified, return only that element (if it is contained in
 * the original selection). If using the function method, the function is
 * executed in the context of the selected element, so `this` refers to the
 * current element.
 *
 * @category Traversing
 * @example <caption>Selector</caption>
 *
 * ```js
 * $('li').filter('.orange').attr('class');
 * //=> orange
 * ```
 *
 * @example <caption>Function</caption>
 *
 * ```js
 * $('li')
 *   .filter(function (i, el) {
 *     // this === el
 *     return $(this).attr('class') === 'orange';
 *   })
 *   .attr('class'); //=> orange
 * ```
 *
 * @param match - Value to look for, following the rules above.
 * @param container - Optional node to filter instead.
 * @returns The filtered collection.
 * @see {@link https://api.jquery.com/filter/}
 */
function filter(match, container) {
    if (container === void 0) { container = this; }
    if (!utils_1.isCheerio(container)) {
        throw new Error('Not able to create a Cheerio instance.');
    }
    var nodes = utils_1.isCheerio(this) ? this.toArray() : this;
    var elements = nodes.filter(utils_1.isTag);
    elements =
        typeof match === 'string'
            ? select.filter(match, elements, container.options)
            : elements.filter(getFilterFn(match));
    return container._make(elements);
}
exports.filter = filter;
/**
 * Remove elements from the set of matched elements. Given a Cheerio object that
 * represents a set of DOM elements, the `.not()` method constructs a new
 * Cheerio object from a subset of the matching elements. The supplied selector
 * is tested against each element; the elements that don't match the selector
 * will be included in the result.
 *
 * The `.not()` method can take a function as its argument in the same way that
 * `.filter()` does. Elements for which the function returns `true` are excluded
 * from the filtered set; all other elements are included.
 *
 * @category Traversing
 * @example <caption>Selector</caption>
 *
 * ```js
 * $('li').not('.apple').length;
 * //=> 2
 * ```
 *
 * @example <caption>Function</caption>
 *
 * ```js
 * $('li').not(function (i, el) {
 *   // this === el
 *   return $(this).attr('class') === 'orange';
 * }).length; //=> 2
 * ```
 *
 * @param match - Value to look for, following the rules above.
 * @param container - Optional node to filter instead.
 * @returns The filtered collection.
 * @see {@link https://api.jquery.com/not/}
 */
function not(match, container) {
    if (container === void 0) { container = this; }
    if (!utils_1.isCheerio(container)) {
        throw new Error('Not able to create a Cheerio instance.');
    }
    var nodes = utils_1.isCheerio(this) ? this.toArray() : this;
    if (typeof match === 'string') {
        var elements = nodes.filter(utils_1.isTag);
        var matches_1 = new Set(select.filter(match, elements, container.options));
        nodes = nodes.filter(function (el) { return !matches_1.has(el); });
    }
    else {
        var filterFn_1 = getFilterFn(match);
        nodes = nodes.filter(function (el, i) { return !filterFn_1(el, i); });
    }
    return container._make(nodes);
}
exports.not = not;
/**
 * Filters the set of matched elements to only those which have the given DOM
 * element as a descendant or which have a descendant that matches the given
 * selector. Equivalent to `.filter(':has(selector)')`.
 *
 * @category Traversing
 * @example <caption>Selector</caption>
 *
 * ```js
 * $('ul').has('.pear').attr('id');
 * //=> fruits
 * ```
 *
 * @example <caption>Element</caption>
 *
 * ```js
 * $('ul').has($('.pear')[0]).attr('id');
 * //=> fruits
 * ```
 *
 * @param selectorOrHaystack - Element to look for.
 * @returns The filtered collection.
 * @see {@link https://api.jquery.com/has/}
 */
function has(selectorOrHaystack) {
    var _this = this;
    return filter.call(this, typeof selectorOrHaystack === 'string'
        ? // Using the `:has` selector here short-circuits searches.
            ":has(" + selectorOrHaystack + ")"
        : function (_, el) { return _this._make(el).find(selectorOrHaystack).length > 0; });
}
exports.has = has;
/**
 * Will select the first element of a cheerio object.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('#fruits').children().first().text();
 * //=> Apple
 * ```
 *
 * @returns The first element.
 * @see {@link https://api.jquery.com/first/}
 */
function first() {
    return this.length > 1 ? this._make(this[0]) : this;
}
exports.first = first;
/**
 * Will select the last element of a cheerio object.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('#fruits').children().last().text();
 * //=> Pear
 * ```
 *
 * @returns The last element.
 * @see {@link https://api.jquery.com/last/}
 */
function last() {
    return this.length > 0 ? this._make(this[this.length - 1]) : this;
}
exports.last = last;
/**
 * Reduce the set of matched elements to the one at the specified index. Use
 * `.eq(-i)` to count backwards from the last selected element.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('li').eq(0).text();
 * //=> Apple
 *
 * $('li').eq(-1).text();
 * //=> Pear
 * ```
 *
 * @param i - Index of the element to select.
 * @returns The element at the `i`th position.
 * @see {@link https://api.jquery.com/eq/}
 */
function eq(i) {
    var _a;
    i = +i;
    // Use the first identity optimization if possible
    if (i === 0 && this.length <= 1)
        return this;
    if (i < 0)
        i = this.length + i;
    return this._make((_a = this[i]) !== null && _a !== void 0 ? _a : []);
}
exports.eq = eq;
function get(i) {
    if (i == null) {
        return Array.prototype.slice.call(this);
    }
    return this[i < 0 ? this.length + i : i];
}
exports.get = get;
/**
 * Search for a given element from among the matched elements.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.pear').index();
 * //=> 2 $('.orange').index('li');
 * //=> 1
 * $('.apple').index($('#fruit, li'));
 * //=> 1
 * ```
 *
 * @param selectorOrNeedle - Element to look for.
 * @returns The index of the element.
 * @see {@link https://api.jquery.com/index/}
 */
function index(selectorOrNeedle) {
    var $haystack;
    var needle;
    if (selectorOrNeedle == null) {
        $haystack = this.parent().children();
        needle = this[0];
    }
    else if (typeof selectorOrNeedle === 'string') {
        $haystack = this._make(selectorOrNeedle);
        needle = this[0];
    }
    else {
        $haystack = this;
        needle = utils_1.isCheerio(selectorOrNeedle)
            ? selectorOrNeedle[0]
            : selectorOrNeedle;
    }
    return $haystack.get().indexOf(needle);
}
exports.index = index;
/**
 * Gets the elements matching the specified range (0-based position).
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('li').slice(1).eq(0).text();
 * //=> 'Orange'
 *
 * $('li').slice(1, 2).length;
 * //=> 1
 * ```
 *
 * @param start - An position at which the elements begin to be selected. If
 *   negative, it indicates an offset from the end of the set.
 * @param end - An position at which the elements stop being selected. If
 *   negative, it indicates an offset from the end of the set. If omitted, the
 *   range continues until the end of the set.
 * @returns The elements matching the specified range.
 * @see {@link https://api.jquery.com/slice/}
 */
function slice(start, end) {
    return this._make(Array.prototype.slice.call(this, start, end));
}
exports.slice = slice;
function traverseParents(self, elem, selector, limit) {
    var elems = [];
    while (elem && elems.length < limit && elem.type !== 'root') {
        if (!selector || filter.call([elem], selector, self).length) {
            elems.push(elem);
        }
        elem = elem.parent;
    }
    return elems;
}
/**
 * End the most recent filtering operation in the current chain and return the
 * set of matched elements to its previous state.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('li').eq(0).end().length;
 * //=> 3
 * ```
 *
 * @returns The previous state of the set of matched elements.
 * @see {@link https://api.jquery.com/end/}
 */
function end() {
    var _a;
    return (_a = this.prevObject) !== null && _a !== void 0 ? _a : this._make([]);
}
exports.end = end;
/**
 * Add elements to the set of matched elements.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('.apple').add('.orange').length;
 * //=> 2
 * ```
 *
 * @param other - Elements to add.
 * @param context - Optionally the context of the new selection.
 * @returns The combined set.
 * @see {@link https://api.jquery.com/add/}
 */
function add(other, context) {
    var selection = this._make(other, context);
    var contents = uniqueSort(tslib_1.__spreadArray(tslib_1.__spreadArray([], this.get()), selection.get()));
    return this._make(contents);
}
exports.add = add;
/**
 * Add the previous set of elements on the stack to the current set, optionally
 * filtered by a selector.
 *
 * @category Traversing
 * @example
 *
 * ```js
 * $('li').eq(0).addBack('.orange').length;
 * //=> 2
 * ```
 *
 * @param selector - Selector for the elements to add.
 * @returns The combined set.
 * @see {@link https://api.jquery.com/addBack/}
 */
function addBack(selector) {
    return this.prevObject
        ? this.add(selector ? this.prevObject.filter(selector) : this.prevObject)
        : this;
}
exports.addBack = addBack;
