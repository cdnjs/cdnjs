/**
 * TinyMCE version 7.9.1 (2025-05-29)
 */

(function () {
    'use strict';

    var global$7 = tinymce.util.Tools.resolve('tinymce.PluginManager');

    /* eslint-disable @typescript-eslint/no-wrapper-object-types */
    const hasProto = (v, constructor, predicate) => {
        var _a;
        if (predicate(v, constructor.prototype)) {
            return true;
        }
        else {
            // String-based fallback time
            return ((_a = v.constructor) === null || _a === void 0 ? void 0 : _a.name) === constructor.name;
        }
    };
    const typeOf = (x) => {
        const t = typeof x;
        if (x === null) {
            return 'null';
        }
        else if (t === 'object' && Array.isArray(x)) {
            return 'array';
        }
        else if (t === 'object' && hasProto(x, String, (o, proto) => proto.isPrototypeOf(o))) {
            return 'string';
        }
        else {
            return t;
        }
    };
    const isType$1 = (type) => (value) => typeOf(value) === type;
    const isSimpleType = (type) => (value) => typeof value === type;
    const isString = isType$1('string');
    const isObject = isType$1('object');
    const isArray = isType$1('array');
    const isBoolean = isSimpleType('boolean');
    const isNullable = (a) => a === null || a === undefined;
    const isNonNullable = (a) => !isNullable(a);
    const isFunction = isSimpleType('function');
    const isNumber = isSimpleType('number');

    const noop = () => { };
    /** Compose two unary functions. Similar to compose, but avoids using Function.prototype.apply. */
    const compose1 = (fbc, fab) => (a) => fbc(fab(a));
    const constant = (value) => {
        return () => {
            return value;
        };
    };
    const tripleEquals = (a, b) => {
        return a === b;
    };
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    function curry(fn, ...initialArgs) {
        return (...restArgs) => {
            const all = initialArgs.concat(restArgs);
            return fn.apply(null, all);
        };
    }
    const not = (f) => (t) => !f(t);
    const never = constant(false);

    /**
     * The `Optional` type represents a value (of any type) that potentially does
     * not exist. Any `Optional<T>` can either be a `Some<T>` (in which case the
     * value does exist) or a `None` (in which case the value does not exist). This
     * module defines a whole lot of FP-inspired utility functions for dealing with
     * `Optional` objects.
     *
     * Comparison with null or undefined:
     * - We don't get fancy null coalescing operators with `Optional`
     * - We do get fancy helper functions with `Optional`
     * - `Optional` support nesting, and allow for the type to still be nullable (or
     * another `Optional`)
     * - There is no option to turn off strict-optional-checks like there is for
     * strict-null-checks
     */
    class Optional {
        // The internal representation has a `tag` and a `value`, but both are
        // private: able to be console.logged, but not able to be accessed by code
        constructor(tag, value) {
            this.tag = tag;
            this.value = value;
        }
        // --- Identities ---
        /**
         * Creates a new `Optional<T>` that **does** contain a value.
         */
        static some(value) {
            return new Optional(true, value);
        }
        /**
         * Create a new `Optional<T>` that **does not** contain a value. `T` can be
         * any type because we don't actually have a `T`.
         */
        static none() {
            return Optional.singletonNone;
        }
        /**
         * Perform a transform on an `Optional` type. Regardless of whether this
         * `Optional` contains a value or not, `fold` will return a value of type `U`.
         * If this `Optional` does not contain a value, the `U` will be created by
         * calling `onNone`. If this `Optional` does contain a value, the `U` will be
         * created by calling `onSome`.
         *
         * For the FP enthusiasts in the room, this function:
         * 1. Could be used to implement all of the functions below
         * 2. Forms a catamorphism
         */
        fold(onNone, onSome) {
            if (this.tag) {
                return onSome(this.value);
            }
            else {
                return onNone();
            }
        }
        /**
         * Determine if this `Optional` object contains a value.
         */
        isSome() {
            return this.tag;
        }
        /**
         * Determine if this `Optional` object **does not** contain a value.
         */
        isNone() {
            return !this.tag;
        }
        // --- Functor (name stolen from Haskell / maths) ---
        /**
         * Perform a transform on an `Optional` object, **if** there is a value. If
         * you provide a function to turn a T into a U, this is the function you use
         * to turn an `Optional<T>` into an `Optional<U>`. If this **does** contain
         * a value then the output will also contain a value (that value being the
         * output of `mapper(this.value)`), and if this **does not** contain a value
         * then neither will the output.
         */
        map(mapper) {
            if (this.tag) {
                return Optional.some(mapper(this.value));
            }
            else {
                return Optional.none();
            }
        }
        // --- Monad (name stolen from Haskell / maths) ---
        /**
         * Perform a transform on an `Optional` object, **if** there is a value.
         * Unlike `map`, here the transform itself also returns an `Optional`.
         */
        bind(binder) {
            if (this.tag) {
                return binder(this.value);
            }
            else {
                return Optional.none();
            }
        }
        // --- Traversable (name stolen from Haskell / maths) ---
        /**
         * For a given predicate, this function finds out if there **exists** a value
         * inside this `Optional` object that meets the predicate. In practice, this
         * means that for `Optional`s that do not contain a value it returns false (as
         * no predicate-meeting value exists).
         */
        exists(predicate) {
            return this.tag && predicate(this.value);
        }
        /**
         * For a given predicate, this function finds out if **all** the values inside
         * this `Optional` object meet the predicate. In practice, this means that
         * for `Optional`s that do not contain a value it returns true (as all 0
         * objects do meet the predicate).
         */
        forall(predicate) {
            return !this.tag || predicate(this.value);
        }
        filter(predicate) {
            if (!this.tag || predicate(this.value)) {
                return this;
            }
            else {
                return Optional.none();
            }
        }
        // --- Getters ---
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided `Optional` object does not contain a
         * value.
         */
        getOr(replacement) {
            return this.tag ? this.value : replacement;
        }
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided `Optional` object does not contain a
         * value.  Unlike `getOr`, in this method the `replacement` object is also
         * `Optional` - meaning that this method will always return an `Optional`.
         */
        or(replacement) {
            return this.tag ? this : replacement;
        }
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided `Optional` object does not contain a
         * value. Unlike `getOr`, in this method the `replacement` value is
         * "thunked" - that is to say that you don't pass a value to `getOrThunk`, you
         * pass a function which (if called) will **return** the `value` you want to
         * use.
         */
        getOrThunk(thunk) {
            return this.tag ? this.value : thunk();
        }
        /**
         * Get the value out of the inside of the `Optional` object, using a default
         * `replacement` value if the provided Optional object does not contain a
         * value.
         *
         * Unlike `or`, in this method the `replacement` value is "thunked" - that is
         * to say that you don't pass a value to `orThunk`, you pass a function which
         * (if called) will **return** the `value` you want to use.
         *
         * Unlike `getOrThunk`, in this method the `replacement` value is also
         * `Optional`, meaning that this method will always return an `Optional`.
         */
        orThunk(thunk) {
            return this.tag ? this : thunk();
        }
        /**
         * Get the value out of the inside of the `Optional` object, throwing an
         * exception if the provided `Optional` object does not contain a value.
         *
         * WARNING:
         * You should only be using this function if you know that the `Optional`
         * object **is not** empty (otherwise you're throwing exceptions in production
         * code, which is bad).
         *
         * In tests this is more acceptable.
         *
         * Prefer other methods to this, such as `.each`.
         */
        getOrDie(message) {
            if (!this.tag) {
                throw new Error(message !== null && message !== void 0 ? message : 'Called getOrDie on None');
            }
            else {
                return this.value;
            }
        }
        // --- Interop with null and undefined ---
        /**
         * Creates an `Optional` value from a nullable (or undefined-able) input.
         * Null, or undefined, is converted to `None`, and anything else is converted
         * to `Some`.
         */
        static from(value) {
            return isNonNullable(value) ? Optional.some(value) : Optional.none();
        }
        /**
         * Converts an `Optional` to a nullable type, by getting the value if it
         * exists, or returning `null` if it does not.
         */
        getOrNull() {
            return this.tag ? this.value : null;
        }
        /**
         * Converts an `Optional` to an undefined-able type, by getting the value if
         * it exists, or returning `undefined` if it does not.
         */
        getOrUndefined() {
            return this.value;
        }
        // --- Utilities ---
        /**
         * If the `Optional` contains a value, perform an action on that value.
         * Unlike the rest of the methods on this type, `.each` has side-effects. If
         * you want to transform an `Optional<T>` **into** something, then this is not
         * the method for you. If you want to use an `Optional<T>` to **do**
         * something, then this is the method for you - provided you're okay with not
         * doing anything in the case where the `Optional` doesn't have a value inside
         * it. If you're not sure whether your use-case fits into transforming
         * **into** something or **doing** something, check whether it has a return
         * value. If it does, you should be performing a transform.
         */
        each(worker) {
            if (this.tag) {
                worker(this.value);
            }
        }
        /**
         * Turn the `Optional` object into an array that contains all of the values
         * stored inside the `Optional`. In practice, this means the output will have
         * either 0 or 1 elements.
         */
        toArray() {
            return this.tag ? [this.value] : [];
        }
        /**
         * Turn the `Optional` object into a string for debugging or printing. Not
         * recommended for production code, but good for debugging. Also note that
         * these days an `Optional` object can be logged to the console directly, and
         * its inner value (if it exists) will be visible.
         */
        toString() {
            return this.tag ? `some(${this.value})` : 'none()';
        }
    }
    // Sneaky optimisation: every instance of Optional.none is identical, so just
    // reuse the same object
    Optional.singletonNone = new Optional(false);

    /* eslint-disable @typescript-eslint/unbound-method */
    const nativeSlice = Array.prototype.slice;
    const nativeIndexOf = Array.prototype.indexOf;
    const nativePush = Array.prototype.push;
    /* eslint-enable */
    const rawIndexOf = (ts, t) => nativeIndexOf.call(ts, t);
    const contains$1 = (xs, x) => rawIndexOf(xs, x) > -1;
    const exists = (xs, pred) => {
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (pred(x, i)) {
                return true;
            }
        }
        return false;
    };
    const map = (xs, f) => {
        // pre-allocating array size when it's guaranteed to be known
        // http://jsperf.com/push-allocated-vs-dynamic/22
        const len = xs.length;
        const r = new Array(len);
        for (let i = 0; i < len; i++) {
            const x = xs[i];
            r[i] = f(x, i);
        }
        return r;
    };
    // Unwound implementing other functions in terms of each.
    // The code size is roughly the same, and it should allow for better optimisation.
    // const each = function<T, U>(xs: T[], f: (x: T, i?: number, xs?: T[]) => void): void {
    const each$1 = (xs, f) => {
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            f(x, i);
        }
    };
    const filter$1 = (xs, pred) => {
        const r = [];
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (pred(x, i)) {
                r.push(x);
            }
        }
        return r;
    };
    /*
     * Groups an array into contiguous arrays of like elements. Whether an element is like or not depends on f.
     *
     * f is a function that derives a value from an element - e.g. true or false, or a string.
     * Elements are like if this function generates the same value for them (according to ===).
     *
     *
     * Order of the elements is preserved. Arr.flatten() on the result will return the original list, as with Haskell groupBy function.
     *  For a good explanation, see the group function (which is a special case of groupBy)
     *  http://hackage.haskell.org/package/base-4.7.0.0/docs/Data-List.html#v:group
     */
    const groupBy = (xs, f) => {
        if (xs.length === 0) {
            return [];
        }
        else {
            let wasType = f(xs[0]); // initial case for matching
            const r = [];
            let group = [];
            for (let i = 0, len = xs.length; i < len; i++) {
                const x = xs[i];
                const type = f(x);
                if (type !== wasType) {
                    r.push(group);
                    group = [];
                }
                wasType = type;
                group.push(x);
            }
            if (group.length !== 0) {
                r.push(group);
            }
            return r;
        }
    };
    const foldl = (xs, f, acc) => {
        each$1(xs, (x, i) => {
            acc = f(acc, x, i);
        });
        return acc;
    };
    const findUntil = (xs, pred, until) => {
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (pred(x, i)) {
                return Optional.some(x);
            }
            else if (until(x, i)) {
                break;
            }
        }
        return Optional.none();
    };
    const find = (xs, pred) => {
        return findUntil(xs, pred, never);
    };
    const flatten = (xs) => {
        // Note, this is possible because push supports multiple arguments:
        // http://jsperf.com/concat-push/6
        // Note that in the past, concat() would silently work (very slowly) for array-like objects.
        // With this change it will throw an error.
        const r = [];
        for (let i = 0, len = xs.length; i < len; ++i) {
            // Ensure that each value is an array itself
            if (!isArray(xs[i])) {
                throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
            }
            nativePush.apply(r, xs[i]);
        }
        return r;
    };
    const bind = (xs, f) => flatten(map(xs, f));
    const reverse = (xs) => {
        const r = nativeSlice.call(xs, 0);
        r.reverse();
        return r;
    };
    const get$1 = (xs, i) => i >= 0 && i < xs.length ? Optional.some(xs[i]) : Optional.none();
    const head = (xs) => get$1(xs, 0);
    const last = (xs) => get$1(xs, xs.length - 1);
    const unique = (xs, comparator) => {
        const r = [];
        const isDuplicated = isFunction(comparator) ?
            (x) => exists(r, (i) => comparator(i, x)) :
            (x) => contains$1(r, x);
        for (let i = 0, len = xs.length; i < len; i++) {
            const x = xs[i];
            if (!isDuplicated(x)) {
                r.push(x);
            }
        }
        return r;
    };

    // There are many variations of Object iteration that are faster than the 'for-in' style:
    // http://jsperf.com/object-keys-iteration/107
    //
    // Use the native keys if it is available (IE9+), otherwise fall back to manually filtering
    const keys = Object.keys;
    const each = (obj, f) => {
        const props = keys(obj);
        for (let k = 0, len = props.length; k < len; k++) {
            const i = props[k];
            const x = obj[i];
            f(x, i);
        }
    };
    const objAcc = (r) => (x, i) => {
        r[i] = x;
    };
    const internalFilter = (obj, pred, onTrue, onFalse) => {
        each(obj, (x, i) => {
            (pred(x, i) ? onTrue : onFalse)(x, i);
        });
    };
    const filter = (obj, pred) => {
        const t = {};
        internalFilter(obj, pred, objAcc(t), noop);
        return t;
    };

    const Cell = (initial) => {
        let value = initial;
        const get = () => {
            return value;
        };
        const set = (v) => {
            value = v;
        };
        return {
            get,
            set
        };
    };

    // Use window object as the global if it's available since CSP will block script evals
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const Global = typeof window !== 'undefined' ? window : Function('return this;')();

    /**
     * **Is** the value stored inside this Optional object equal to `rhs`?
     */
    const is$2 = (lhs, rhs, comparator = tripleEquals) => lhs.exists((left) => comparator(left, rhs));
    /**
     * Are these two Optional objects equal? Equality here means either they're both
     * `Some` (and the values are equal under the comparator) or they're both `None`.
     */
    const equals = (lhs, rhs, comparator = tripleEquals) => lift2(lhs, rhs, comparator).getOr(lhs.isNone() && rhs.isNone());
    /*
    Notes on the lift functions:
    - We used to have a generic liftN, but we were concerned about its type-safety, and the below variants were faster in microbenchmarks.
    - The getOrDie calls are partial functions, but are checked beforehand. This is faster and more convenient (but less safe) than folds.
    - && is used instead of a loop for simplicity and performance.
    */
    const lift2 = (oa, ob, f) => oa.isSome() && ob.isSome() ? Optional.some(f(oa.getOrDie(), ob.getOrDie())) : Optional.none();

    /** path :: ([String], JsObj?) -> JsObj */
    const path = (parts, scope) => {
        let o = scope !== undefined && scope !== null ? scope : Global;
        for (let i = 0; i < parts.length && o !== undefined && o !== null; ++i) {
            o = o[parts[i]];
        }
        return o;
    };
    /** resolve :: (String, JsObj?) -> JsObj */
    const resolve = (p, scope) => {
        const parts = p.split('.');
        return path(parts, scope);
    };

    const blank = (r) => (s) => s.replace(r, '');
    /** removes all leading and trailing spaces */
    const trim = blank(/^\s+|\s+$/g);
    const isNotEmpty = (s) => s.length > 0;
    const isEmpty$2 = (s) => !isNotEmpty(s);

    const zeroWidth = '\uFEFF';
    const isZwsp = (char) => char === zeroWidth;

    const fromHtml = (html, scope) => {
        const doc = scope || document;
        const div = doc.createElement('div');
        div.innerHTML = html;
        if (!div.hasChildNodes() || div.childNodes.length > 1) {
            const message = 'HTML does not have a single root node';
            // eslint-disable-next-line no-console
            console.error(message, html);
            throw new Error(message);
        }
        return fromDom$1(div.childNodes[0]);
    };
    const fromTag = (tag, scope) => {
        const doc = scope || document;
        const node = doc.createElement(tag);
        return fromDom$1(node);
    };
    const fromText = (text, scope) => {
        const doc = scope || document;
        const node = doc.createTextNode(text);
        return fromDom$1(node);
    };
    const fromDom$1 = (node) => {
        // TODO: Consider removing this check, but left atm for safety
        if (node === null || node === undefined) {
            throw new Error('Node cannot be null or undefined');
        }
        return {
            dom: node
        };
    };
    const fromPoint = (docElm, x, y) => Optional.from(docElm.dom.elementFromPoint(x, y)).map(fromDom$1);
    // tslint:disable-next-line:variable-name
    const SugarElement = {
        fromHtml,
        fromTag,
        fromText,
        fromDom: fromDom$1,
        fromPoint
    };

    const COMMENT = 8;
    const DOCUMENT_FRAGMENT = 11;
    const ELEMENT = 1;
    const TEXT = 3;

    const is$1 = (element, selector) => {
        const dom = element.dom;
        if (dom.nodeType !== ELEMENT) {
            return false;
        }
        else {
            const elem = dom;
            if (elem.matches !== undefined) {
                return elem.matches(selector);
            }
            else if (elem.msMatchesSelector !== undefined) {
                return elem.msMatchesSelector(selector);
            }
            else if (elem.webkitMatchesSelector !== undefined) {
                return elem.webkitMatchesSelector(selector);
            }
            else if (elem.mozMatchesSelector !== undefined) {
                // cast to any as mozMatchesSelector doesn't exist in TS DOM lib
                return elem.mozMatchesSelector(selector);
            }
            else {
                throw new Error('Browser lacks native selectors');
            } // unfortunately we can't throw this on startup :(
        }
    };

    const eq = (e1, e2) => e1.dom === e2.dom;
    // Returns: true if node e1 contains e2, otherwise false.
    // (returns false if e1===e2: A node does not contain itself).
    const contains = (e1, e2) => {
        const d1 = e1.dom;
        const d2 = e2.dom;
        return d1 === d2 ? false : d1.contains(d2);
    };
    const is = is$1;

    const unsafe = (name, scope) => {
        return resolve(name, scope);
    };
    const getOrDie = (name, scope) => {
        const actual = unsafe(name, scope);
        if (actual === undefined || actual === null) {
            throw new Error(name + ' not available on this browser');
        }
        return actual;
    };

    const getPrototypeOf = Object.getPrototypeOf;
    /*
     * IE9 and above
     *
     * MDN no use on this one, but here's the link anyway:
     * https://developer.mozilla.org/en/docs/Web/API/HTMLElement
     */
    const sandHTMLElement = (scope) => {
        return getOrDie('HTMLElement', scope);
    };
    const isPrototypeOf = (x) => {
        // use Resolve to get the window object for x and just return undefined if it can't find it.
        // undefined scope later triggers using the global window.
        const scope = resolve('ownerDocument.defaultView', x);
        // TINY-7374: We can't rely on looking at the owner window HTMLElement as the element may have
        // been constructed in a different window and then appended to the current window document.
        return isObject(x) && (sandHTMLElement(scope).prototype.isPrototypeOf(x) || /^HTML\w*Element$/.test(getPrototypeOf(x).constructor.name));
    };

    const name = (element) => {
        const r = element.dom.nodeName;
        return r.toLowerCase();
    };
    const type = (element) => element.dom.nodeType;
    const isType = (t) => (element) => type(element) === t;
    const isComment = (element) => type(element) === COMMENT || name(element) === '#comment';
    const isHTMLElement = (element) => isElement$1(element) && isPrototypeOf(element.dom);
    const isElement$1 = isType(ELEMENT);
    const isText = isType(TEXT);
    const isDocumentFragment = isType(DOCUMENT_FRAGMENT);
    const isTag = (tag) => (e) => isElement$1(e) && name(e) === tag;

    const parent = (element) => Optional.from(element.dom.parentNode).map(SugarElement.fromDom);
    const parentElement = (element) => Optional.from(element.dom.parentElement).map(SugarElement.fromDom);
    const nextSibling = (element) => Optional.from(element.dom.nextSibling).map(SugarElement.fromDom);
    const children = (element) => map(element.dom.childNodes, SugarElement.fromDom);
    const child = (element, index) => {
        const cs = element.dom.childNodes;
        return Optional.from(cs[index]).map(SugarElement.fromDom);
    };
    const firstChild = (element) => child(element, 0);
    const lastChild = (element) => child(element, element.dom.childNodes.length - 1);

    /**
     * Is the element a ShadowRoot?
     *
     * Note: this is insufficient to test if any element is a shadow root, but it is sufficient to differentiate between
     * a Document and a ShadowRoot.
     */
    const isShadowRoot = (dos) => isDocumentFragment(dos) && isNonNullable(dos.dom.host);
    const getRootNode = (e) => SugarElement.fromDom(e.dom.getRootNode());
    /** If this element is in a ShadowRoot, return it. */
    const getShadowRoot = (e) => {
        const r = getRootNode(e);
        return isShadowRoot(r) ? Optional.some(r) : Optional.none();
    };
    /** Return the host of a ShadowRoot.
     *
     * This function will throw if Shadow DOM is unsupported in the browser, or if the host is null.
     * If you actually have a ShadowRoot, this shouldn't happen.
     */
    const getShadowHost = (e) => SugarElement.fromDom(e.dom.host);

    const before$1 = (marker, element) => {
        const parent$1 = parent(marker);
        parent$1.each((v) => {
            v.dom.insertBefore(element.dom, marker.dom);
        });
    };
    const after = (marker, element) => {
        const sibling = nextSibling(marker);
        sibling.fold(() => {
            const parent$1 = parent(marker);
            parent$1.each((v) => {
                append$1(v, element);
            });
        }, (v) => {
            before$1(v, element);
        });
    };
    const prepend = (parent, element) => {
        const firstChild$1 = firstChild(parent);
        firstChild$1.fold(() => {
            append$1(parent, element);
        }, (v) => {
            parent.dom.insertBefore(element.dom, v.dom);
        });
    };
    const append$1 = (parent, element) => {
        parent.dom.appendChild(element.dom);
    };

    const before = (marker, elements) => {
        each$1(elements, (x) => {
            before$1(marker, x);
        });
    };
    const append = (parent, elements) => {
        each$1(elements, (x) => {
            append$1(parent, x);
        });
    };

    const rawSet = (dom, key, value) => {
        /*
         * JQuery coerced everything to a string, and silently did nothing on text node/null/undefined.
         *
         * We fail on those invalid cases, only allowing numbers and booleans.
         */
        if (isString(value) || isBoolean(value) || isNumber(value)) {
            dom.setAttribute(key, value + '');
        }
        else {
            // eslint-disable-next-line no-console
            console.error('Invalid call to Attribute.set. Key ', key, ':: Value ', value, ':: Element ', dom);
            throw new Error('Attribute value was not simple');
        }
    };
    const setAll = (element, attrs) => {
        const dom = element.dom;
        each(attrs, (v, k) => {
            rawSet(dom, k, v);
        });
    };
    const clone$1 = (element) => foldl(element.dom.attributes, (acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
    }, {});

    const empty = (element) => {
        // shortcut "empty node" trick. Requires IE 9.
        element.dom.textContent = '';
        // If the contents was a single empty text node, the above doesn't remove it. But, it's still faster in general
        // than removing every child node manually.
        // The following is (probably) safe for performance as 99.9% of the time the trick works and
        // Traverse.children will return an empty array.
        each$1(children(element), (rogue) => {
            remove(rogue);
        });
    };
    const remove = (element) => {
        const dom = element.dom;
        if (dom.parentNode !== null) {
            dom.parentNode.removeChild(dom);
        }
    };

    const clone = (original, isDeep) => SugarElement.fromDom(original.dom.cloneNode(isDeep));
    /** Deep clone - everything copied including children */
    const deep = (original) => clone(original, true);
    /** Shallow clone, with a new tag */
    const shallowAs = (original, tag) => {
        const nu = SugarElement.fromTag(tag);
        const attributes = clone$1(original);
        setAll(nu, attributes);
        return nu;
    };
    /** Change the tag name, but keep all children */
    const mutate = (original, tag) => {
        const nu = shallowAs(original, tag);
        after(original, nu);
        const children$1 = children(original);
        append(nu, children$1);
        remove(original);
        return nu;
    };

    const fromDom = (nodes) => map(nodes, SugarElement.fromDom);

    // some elements, such as mathml, don't have style attributes
    // others, such as angular elements, have style attributes that aren't a CSSStyleDeclaration
    const isSupported = (dom) => 
    // eslint-disable-next-line @typescript-eslint/unbound-method
    dom.style !== undefined && isFunction(dom.style.getPropertyValue);

    // Node.contains() is very, very, very good performance
    // http://jsperf.com/closest-vs-contains/5
    const inBody = (element) => {
        // Technically this is only required on IE, where contains() returns false for text nodes.
        // But it's cheap enough to run everywhere and Sugar doesn't have platform detection (yet).
        const dom = isText(element) ? element.dom.parentNode : element.dom;
        // use ownerDocument.body to ensure this works inside iframes.
        // Normally contains is bad because an element "contains" itself, but here we want that.
        if (dom === undefined || dom === null || dom.ownerDocument === null) {
            return false;
        }
        const doc = dom.ownerDocument;
        return getShadowRoot(SugarElement.fromDom(dom)).fold(() => doc.body.contains(dom), compose1(inBody, getShadowHost));
    };

    const internalSet = (dom, property, value) => {
        // This is going to hurt. Apologies.
        // JQuery coerces numbers to pixels for certain property names, and other times lets numbers through.
        // we're going to be explicit; strings only.
        if (!isString(value)) {
            // eslint-disable-next-line no-console
            console.error('Invalid call to CSS.set. Property ', property, ':: Value ', value, ':: Element ', dom);
            throw new Error('CSS value must be a string: ' + value);
        }
        // removed: support for dom().style[property] where prop is camel case instead of normal property name
        if (isSupported(dom)) {
            dom.style.setProperty(property, value);
        }
    };
    const set = (element, property, value) => {
        const dom = element.dom;
        internalSet(dom, property, value);
    };

    const fromElements = (elements, scope) => {
        const doc = scope || document;
        const fragment = doc.createDocumentFragment();
        each$1(elements, (element) => {
            fragment.appendChild(element.dom);
        });
        return SugarElement.fromDom(fragment);
    };

    var ClosestOrAncestor = (is, ancestor, scope, a, isRoot) => {
        if (is(scope, a)) {
            return Optional.some(scope);
        }
        else if (isFunction(isRoot) && isRoot(scope)) {
            return Optional.none();
        }
        else {
            return ancestor(scope, a, isRoot);
        }
    };

    const ancestor$3 = (scope, predicate, isRoot) => {
        let element = scope.dom;
        const stop = isFunction(isRoot) ? isRoot : never;
        while (element.parentNode) {
            element = element.parentNode;
            const el = SugarElement.fromDom(element);
            if (predicate(el)) {
                return Optional.some(el);
            }
            else if (stop(el)) {
                break;
            }
        }
        return Optional.none();
    };
    const closest$2 = (scope, predicate, isRoot) => {
        // This is required to avoid ClosestOrAncestor passing the predicate to itself
        const is = (s, test) => test(s);
        return ClosestOrAncestor(is, ancestor$3, scope, predicate, isRoot);
    };

    const ancestor$2 = (scope, selector, isRoot) => ancestor$3(scope, (e) => is$1(e, selector), isRoot);
    // Returns Some(closest ancestor element (sugared)) matching 'selector' up to isRoot, or None() otherwise
    const closest$1 = (scope, selector, isRoot) => {
        const is = (element, selector) => is$1(element, selector);
        return ClosestOrAncestor(is, ancestor$2, scope, selector, isRoot);
    };

    const closest = (target) => closest$1(target, '[contenteditable]');
    const isEditable = (element, assumeEditable = false) => {
        if (inBody(element)) {
            return element.dom.isContentEditable;
        }
        else {
            // Find the closest contenteditable element and check if it's editable
            return closest(element).fold(constant(assumeEditable), (editable) => getRaw(editable) === 'true');
        }
    };
    const getRaw = (element) => element.dom.contentEditable;

    const ancestor$1 = (scope, predicate, isRoot) => ancestor$3(scope, predicate, isRoot).isSome();

    const ancestor = (element, target) => ancestor$1(element, curry(eq, target));

    var global$6 = tinymce.util.Tools.resolve('tinymce.dom.RangeUtils');

    var global$5 = tinymce.util.Tools.resolve('tinymce.dom.TreeWalker');

    var global$4 = tinymce.util.Tools.resolve('tinymce.util.VK');

    var global$3 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    const matchNodeName = (name) => (node) => isNonNullable(node) && node.nodeName.toLowerCase() === name;
    const matchNodeNames = (regex) => (node) => isNonNullable(node) && regex.test(node.nodeName);
    const isTextNode$1 = (node) => isNonNullable(node) && node.nodeType === 3;
    const isElement = (node) => isNonNullable(node) && node.nodeType === 1;
    const isListNode = matchNodeNames(/^(OL|UL|DL)$/);
    const isOlUlNode = matchNodeNames(/^(OL|UL)$/);
    const isOlNode = matchNodeName('ol');
    const isListItemNode = matchNodeNames(/^(LI|DT|DD)$/);
    const isDlItemNode = matchNodeNames(/^(DT|DD)$/);
    const isTableCellNode = matchNodeNames(/^(TH|TD)$/);
    const isBr = matchNodeName('br');
    const isFirstChild = (node) => { var _a; return ((_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.firstChild) === node; };
    const isTextBlock = (editor, node) => isNonNullable(node) && node.nodeName in editor.schema.getTextBlockElements();
    const isBlock = (node, blockElements) => isNonNullable(node) && node.nodeName in blockElements;
    const isVoid = (editor, node) => isNonNullable(node) && node.nodeName in editor.schema.getVoidElements();
    const isBogusBr = (dom, node) => {
        if (!isBr(node)) {
            return false;
        }
        return dom.isBlock(node.nextSibling) && !isBr(node.previousSibling);
    };
    const isEmpty$1 = (dom, elm, keepBookmarks) => {
        const empty = dom.isEmpty(elm);
        if (keepBookmarks && dom.select('span[data-mce-type=bookmark]', elm).length > 0) {
            return false;
        }
        return empty;
    };
    const isChildOfBody = (dom, elm) => dom.isChildOf(elm, dom.getRoot());

    const option = (name) => (editor) => editor.options.get(name);
    const register$3 = (editor) => {
        const registerOption = editor.options.register;
        registerOption('lists_indent_on_tab', {
            processor: 'boolean',
            default: true
        });
    };
    const shouldIndentOnTab = option('lists_indent_on_tab');
    const getForcedRootBlock = option('forced_root_block');
    const getForcedRootBlockAttrs = option('forced_root_block_attrs');

    const createTextBlock = (editor, contentNode, attrs = {}) => {
        const dom = editor.dom;
        const blockElements = editor.schema.getBlockElements();
        const fragment = dom.createFragment();
        const blockName = getForcedRootBlock(editor);
        const blockAttrs = getForcedRootBlockAttrs(editor);
        let node;
        let textBlock;
        let hasContentNode = false;
        textBlock = dom.create(blockName, {
            ...blockAttrs,
            ...(attrs.style ? { style: attrs.style } : {})
        });
        if (!isBlock(contentNode.firstChild, blockElements)) {
            fragment.appendChild(textBlock);
        }
        while ((node = contentNode.firstChild)) {
            const nodeName = node.nodeName;
            if (!hasContentNode && (nodeName !== 'SPAN' || node.getAttribute('data-mce-type') !== 'bookmark')) {
                hasContentNode = true;
            }
            if (isBlock(node, blockElements)) {
                fragment.appendChild(node);
                textBlock = null;
            }
            else {
                if (!textBlock) {
                    textBlock = dom.create(blockName, blockAttrs);
                    fragment.appendChild(textBlock);
                }
                textBlock.appendChild(node);
            }
        }
        // BR is needed in empty blocks
        if (!hasContentNode && textBlock) {
            textBlock.appendChild(dom.create('br', { 'data-mce-bogus': '1' }));
        }
        return fragment;
    };

    const DOM$2 = global$3.DOM;
    const splitList = (editor, list, li) => {
        const removeAndKeepBookmarks = (targetNode) => {
            const parent = targetNode.parentNode;
            if (parent) {
                global$2.each(bookmarks, (node) => {
                    parent.insertBefore(node, li.parentNode);
                });
            }
            DOM$2.remove(targetNode);
        };
        const bookmarks = DOM$2.select('span[data-mce-type="bookmark"]', list);
        const newBlock = createTextBlock(editor, li);
        const tmpRng = DOM$2.createRng();
        tmpRng.setStartAfter(li);
        tmpRng.setEndAfter(list);
        const fragment = tmpRng.extractContents();
        for (let node = fragment.firstChild; node; node = node.firstChild) {
            if (node.nodeName === 'LI' && editor.dom.isEmpty(node)) {
                DOM$2.remove(node);
                break;
            }
        }
        if (!editor.dom.isEmpty(fragment)) {
            DOM$2.insertAfter(fragment, list);
        }
        DOM$2.insertAfter(newBlock, list);
        const parent = li.parentElement;
        if (parent && isEmpty$1(editor.dom, parent)) {
            removeAndKeepBookmarks(parent);
        }
        DOM$2.remove(li);
        if (isEmpty$1(editor.dom, list)) {
            DOM$2.remove(list);
        }
    };

    const isDescriptionDetail = isTag('dd');
    const isDescriptionTerm = isTag('dt');
    const outdentDlItem = (editor, item) => {
        if (isDescriptionDetail(item)) {
            mutate(item, 'dt');
        }
        else if (isDescriptionTerm(item)) {
            parentElement(item).each((dl) => splitList(editor, dl.dom, item.dom));
        }
    };
    const indentDlItem = (item) => {
        if (isDescriptionTerm(item)) {
            mutate(item, 'dd');
        }
    };
    const dlIndentation = (editor, indentation, dlItems) => {
        if (indentation === "Indent" /* Indentation.Indent */) {
            each$1(dlItems, indentDlItem);
        }
        else {
            each$1(dlItems, (item) => outdentDlItem(editor, item));
        }
    };

    const getNormalizedPoint = (container, offset) => {
        if (isTextNode$1(container)) {
            return { container, offset };
        }
        const node = global$6.getNode(container, offset);
        if (isTextNode$1(node)) {
            return {
                container: node,
                offset: offset >= container.childNodes.length ? node.data.length : 0
            };
        }
        else if (node.previousSibling && isTextNode$1(node.previousSibling)) {
            return {
                container: node.previousSibling,
                offset: node.previousSibling.data.length
            };
        }
        else if (node.nextSibling && isTextNode$1(node.nextSibling)) {
            return {
                container: node.nextSibling,
                offset: 0
            };
        }
        return { container, offset };
    };
    const normalizeRange = (rng) => {
        const outRng = rng.cloneRange();
        const rangeStart = getNormalizedPoint(rng.startContainer, rng.startOffset);
        outRng.setStart(rangeStart.container, rangeStart.offset);
        const rangeEnd = getNormalizedPoint(rng.endContainer, rng.endOffset);
        outRng.setEnd(rangeEnd.container, rangeEnd.offset);
        return outRng;
    };

    const listNames = ['OL', 'UL', 'DL'];
    const listSelector = listNames.join(',');
    const getParentList = (editor, node) => {
        const selectionStart = node || editor.selection.getStart(true);
        return editor.dom.getParent(selectionStart, listSelector, getClosestListHost(editor, selectionStart));
    };
    const isParentListSelected = (parentList, selectedBlocks) => isNonNullable(parentList) && selectedBlocks.length === 1 && selectedBlocks[0] === parentList;
    const findSubLists = (parentList) => filter$1(parentList.querySelectorAll(listSelector), isListNode);
    const getSelectedSubLists = (editor) => {
        const parentList = getParentList(editor);
        const selectedBlocks = editor.selection.getSelectedBlocks();
        if (isParentListSelected(parentList, selectedBlocks)) {
            return findSubLists(parentList);
        }
        else {
            return filter$1(selectedBlocks, (elm) => {
                return isListNode(elm) && parentList !== elm;
            });
        }
    };
    const findParentListItemsNodes = (editor, elms) => {
        const listItemsElms = global$2.map(elms, (elm) => {
            const parentLi = editor.dom.getParent(elm, 'li,dd,dt', getClosestListHost(editor, elm));
            return parentLi ? parentLi : elm;
        });
        return unique(listItemsElms);
    };
    const getSelectedListItems = (editor) => {
        const selectedBlocks = editor.selection.getSelectedBlocks();
        return filter$1(findParentListItemsNodes(editor, selectedBlocks), isListItemNode);
    };
    const getSelectedDlItems = (editor) => filter$1(getSelectedListItems(editor), isDlItemNode);
    const getClosestEditingHost = (editor, elm) => {
        const parentTableCell = editor.dom.getParents(elm, 'TD,TH');
        return parentTableCell.length > 0 ? parentTableCell[0] : editor.getBody();
    };
    const isListHost = (schema, node) => !isListNode(node) && !isListItemNode(node) && exists(listNames, (listName) => schema.isValidChild(node.nodeName, listName));
    const getClosestListHost = (editor, elm) => {
        const parentBlocks = editor.dom.getParents(elm, editor.dom.isBlock);
        const isNotForcedRootBlock = (elm) => elm.nodeName.toLowerCase() !== getForcedRootBlock(editor);
        const parentBlock = find(parentBlocks, (elm) => isNotForcedRootBlock(elm) && isListHost(editor.schema, elm));
        return parentBlock.getOr(editor.getBody());
    };
    const isListInsideAnLiWithFirstAndLastNotListElement = (list) => parent(list).exists((parent) => isListItemNode(parent.dom)
        && firstChild(parent).exists((firstChild) => !isListNode(firstChild.dom))
        && lastChild(parent).exists((lastChild) => !isListNode(lastChild.dom)));
    const findLastParentListNode = (editor, elm) => {
        const parentLists = editor.dom.getParents(elm, 'ol,ul', getClosestListHost(editor, elm));
        return last(parentLists);
    };
    const getSelectedLists = (editor) => {
        const firstList = findLastParentListNode(editor, editor.selection.getStart());
        const subsequentLists = filter$1(editor.selection.getSelectedBlocks(), isOlUlNode);
        return firstList.toArray().concat(subsequentLists);
    };
    const getParentLists = (editor) => {
        const elm = editor.selection.getStart();
        return editor.dom.getParents(elm, 'ol,ul', getClosestListHost(editor, elm));
    };
    const getSelectedListRoots = (editor) => {
        const selectedLists = getSelectedLists(editor);
        const parentLists = getParentLists(editor);
        return find(parentLists, (p) => isListInsideAnLiWithFirstAndLastNotListElement(SugarElement.fromDom(p))).fold(() => getUniqueListRoots(editor, selectedLists), (l) => [l]);
    };
    const getUniqueListRoots = (editor, lists) => {
        const listRoots = map(lists, (list) => findLastParentListNode(editor, list).getOr(list));
        return unique(listRoots);
    };

    const isCustomList = (list) => /\btox\-/.test(list.className);
    const inList = (parents, listName) => findUntil(parents, isListNode, isTableCellNode)
        .exists((list) => list.nodeName === listName && !isCustomList(list));
    // Advlist/core/ListUtils.ts - Duplicated in Advlist plugin
    const isWithinNonEditable = (editor, element) => element !== null && !editor.dom.isEditable(element);
    const selectionIsWithinNonEditableList = (editor) => {
        const parentList = getParentList(editor);
        return isWithinNonEditable(editor, parentList) || !editor.selection.isEditable();
    };
    const isWithinNonEditableList = (editor, element) => {
        const parentList = editor.dom.getParent(element, 'ol,ul,dl');
        return isWithinNonEditable(editor, parentList) || !editor.selection.isEditable();
    };
    const setNodeChangeHandler = (editor, nodeChangeHandler) => {
        const initialNode = editor.selection.getNode();
        // Set the initial state
        nodeChangeHandler({
            parents: editor.dom.getParents(initialNode),
            element: initialNode
        });
        editor.on('NodeChange', nodeChangeHandler);
        return () => editor.off('NodeChange', nodeChangeHandler);
    };

    const fireListEvent = (editor, action, element) => editor.dispatch('ListMutation', { action, element });

    const isList = (el) => is(el, 'OL,UL');
    const isListItem = (el) => is(el, 'LI');
    const hasFirstChildList = (el) => firstChild(el).exists(isList);
    const hasLastChildList = (el) => lastChild(el).exists(isList);

    const isEntryList = (entry) => 'listAttributes' in entry;
    const isEntryComment = (entry) => 'isComment' in entry;
    const isEntryFragment = (entry) => 'isFragment' in entry;
    const isIndented = (entry) => entry.depth > 0;
    const isSelected = (entry) => entry.isSelected;
    const cloneItemContent = (li) => {
        const children$1 = children(li);
        const content = hasLastChildList(li) ? children$1.slice(0, -1) : children$1;
        return map(content, deep);
    };
    const createEntry = (li, depth, isSelected) => parent(li).filter(isElement$1).map((list) => ({
        depth,
        dirty: false,
        isSelected,
        content: cloneItemContent(li),
        itemAttributes: clone$1(li),
        listAttributes: clone$1(list),
        listType: name(list),
        isInPreviousLi: false
    }));

    const joinSegment = (parent, child) => {
        append$1(parent.item, child.list);
    };
    const joinSegments = (segments) => {
        for (let i = 1; i < segments.length; i++) {
            joinSegment(segments[i - 1], segments[i]);
        }
    };
    const appendSegments = (head$1, tail) => {
        lift2(last(head$1), head(tail), joinSegment);
    };
    const createSegment = (scope, listType) => {
        const segment = {
            list: SugarElement.fromTag(listType, scope),
            item: SugarElement.fromTag('li', scope)
        };
        append$1(segment.list, segment.item);
        return segment;
    };
    const createSegments = (scope, entry, size) => {
        const segments = [];
        for (let i = 0; i < size; i++) {
            segments.push(createSegment(scope, isEntryList(entry) ? entry.listType : entry.parentListType));
        }
        return segments;
    };
    const populateSegments = (segments, entry) => {
        for (let i = 0; i < segments.length - 1; i++) {
            set(segments[i].item, 'list-style-type', 'none');
        }
        last(segments).each((segment) => {
            if (isEntryList(entry)) {
                setAll(segment.list, entry.listAttributes);
                setAll(segment.item, entry.itemAttributes);
            }
            append(segment.item, entry.content);
        });
    };
    const normalizeSegment = (segment, entry) => {
        if (name(segment.list) !== entry.listType) {
            segment.list = mutate(segment.list, entry.listType);
        }
        setAll(segment.list, entry.listAttributes);
    };
    const createItem = (scope, attr, content) => {
        const item = SugarElement.fromTag('li', scope);
        setAll(item, attr);
        append(item, content);
        return item;
    };
    const appendItem = (segment, item) => {
        append$1(segment.list, item);
        segment.item = item;
    };
    const writeShallow = (scope, cast, entry) => {
        const newCast = cast.slice(0, entry.depth);
        last(newCast).each((segment) => {
            if (isEntryList(entry)) {
                const item = createItem(scope, entry.itemAttributes, entry.content);
                appendItem(segment, item);
                normalizeSegment(segment, entry);
            }
            else if (isEntryFragment(entry)) {
                append(segment.item, entry.content);
            }
            else {
                const item = SugarElement.fromHtml(`<!--${entry.content}-->`);
                append$1(segment.list, item);
            }
        });
        return newCast;
    };
    const writeDeep = (scope, cast, entry) => {
        const segments = createSegments(scope, entry, entry.depth - cast.length);
        joinSegments(segments);
        populateSegments(segments, entry);
        appendSegments(cast, segments);
        return cast.concat(segments);
    };
    const composeList = (scope, entries) => {
        let firstCommentEntryOpt = Optional.none();
        const cast = foldl(entries, (cast, entry, i) => {
            if (!isEntryComment(entry)) {
                return entry.depth > cast.length ? writeDeep(scope, cast, entry) : writeShallow(scope, cast, entry);
            }
            else {
                // this is needed becuase if the first element of the list is a comment we would not have the data to create the new list
                if (i === 0) {
                    firstCommentEntryOpt = Optional.some(entry);
                    return cast;
                }
                return writeShallow(scope, cast, entry);
            }
        }, []);
        firstCommentEntryOpt.each((firstCommentEntry) => {
            const item = SugarElement.fromHtml(`<!--${firstCommentEntry.content}-->`);
            head(cast).each((fistCast) => {
                prepend(fistCast.list, item);
            });
        });
        return head(cast).map((segment) => segment.list);
    };

    const indentEntry = (indentation, entry) => {
        switch (indentation) {
            case "Indent" /* Indentation.Indent */:
                entry.depth++;
                break;
            case "Outdent" /* Indentation.Outdent */:
                entry.depth--;
                break;
            case "Flatten" /* Indentation.Flatten */:
                entry.depth = 0;
        }
        entry.dirty = true;
    };

    const cloneListProperties = (target, source) => {
        if (isEntryList(target) && isEntryList(source)) {
            target.listType = source.listType;
            target.listAttributes = { ...source.listAttributes };
        }
    };
    const cleanListProperties = (entry) => {
        // Remove the start attribute if generating a new list
        entry.listAttributes = filter(entry.listAttributes, (_value, key) => key !== 'start');
    };
    // Closest entry above/below in the same list
    const closestSiblingEntry = (entries, start) => {
        const depth = entries[start].depth;
        // Ignore dirty items as they've been moved and won't have the right list data yet
        const matches = (entry) => entry.depth === depth && !entry.dirty;
        const until = (entry) => entry.depth < depth;
        // Check in reverse to see if there's an entry as the same depth before the current entry
        // but if not, then try to walk forwards as well
        return findUntil(reverse(entries.slice(0, start)), matches, until)
            .orThunk(() => findUntil(entries.slice(start + 1), matches, until));
    };
    const normalizeEntries = (entries) => {
        each$1(entries, (entry, i) => {
            closestSiblingEntry(entries, i).fold(() => {
                if (entry.dirty && isEntryList(entry)) {
                    cleanListProperties(entry);
                }
            }, (matchingEntry) => cloneListProperties(entry, matchingEntry));
        });
        return entries;
    };

    const parseSingleItem = (depth, itemSelection, selectionState, item) => {
        var _a;
        if (isComment(item)) {
            return [{
                    depth: depth + 1,
                    content: (_a = item.dom.nodeValue) !== null && _a !== void 0 ? _a : '',
                    dirty: false,
                    isSelected: false,
                    isComment: true
                }];
        }
        itemSelection.each((selection) => {
            if (eq(selection.start, item)) {
                selectionState.set(true);
            }
        });
        const currentItemEntry = createEntry(item, depth, selectionState.get());
        // Update selectionState (end)
        itemSelection.each((selection) => {
            if (eq(selection.end, item)) {
                selectionState.set(false);
            }
        });
        const childListEntries = lastChild(item)
            .filter(isList)
            .map((list) => parseList(depth, itemSelection, selectionState, list))
            .getOr([]);
        return currentItemEntry.toArray().concat(childListEntries);
    };
    const parseItem = (depth, itemSelection, selectionState, item) => firstChild(item).filter(isList).fold(() => parseSingleItem(depth, itemSelection, selectionState, item), (list) => {
        const parsedSiblings = foldl(children(item), (acc, liChild, i) => {
            if (i === 0) {
                return acc;
            }
            else {
                if (isListItem(liChild)) {
                    return acc.concat(parseSingleItem(depth, itemSelection, selectionState, liChild));
                }
                else {
                    const fragment = {
                        isFragment: true,
                        depth,
                        content: [liChild],
                        isSelected: false,
                        dirty: false,
                        parentListType: name(list)
                    };
                    return acc.concat(fragment);
                }
            }
        }, []);
        return parseList(depth, itemSelection, selectionState, list).concat(parsedSiblings);
    });
    const parseList = (depth, itemSelection, selectionState, list) => bind(children(list), (element) => {
        const parser = isList(element) ? parseList : parseItem;
        const newDepth = depth + 1;
        return parser(newDepth, itemSelection, selectionState, element);
    });
    const parseLists = (lists, itemSelection) => {
        const selectionState = Cell(false);
        const initialDepth = 0;
        return map(lists, (list) => ({
            sourceList: list,
            entries: parseList(initialDepth, itemSelection, selectionState, list)
        }));
    };

    const outdentedComposer = (editor, entries) => {
        const normalizedEntries = normalizeEntries(entries);
        return map(normalizedEntries, (entry) => {
            const content = !isEntryComment(entry)
                ? fromElements(entry.content)
                : fromElements([SugarElement.fromHtml(`<!--${entry.content}-->`)]);
            const listItemAttrs = isEntryList(entry) ? entry.itemAttributes : {};
            return SugarElement.fromDom(createTextBlock(editor, content.dom, listItemAttrs));
        });
    };
    const indentedComposer = (editor, entries) => {
        const normalizedEntries = normalizeEntries(entries);
        return composeList(editor.contentDocument, normalizedEntries).toArray();
    };
    const composeEntries = (editor, entries) => bind(groupBy(entries, isIndented), (entries) => {
        const groupIsIndented = head(entries).exists(isIndented);
        return groupIsIndented ? indentedComposer(editor, entries) : outdentedComposer(editor, entries);
    });
    const indentSelectedEntries = (entries, indentation) => {
        each$1(filter$1(entries, isSelected), (entry) => indentEntry(indentation, entry));
    };
    const getItemSelection = (editor) => {
        const selectedListItems = map(getSelectedListItems(editor), SugarElement.fromDom);
        return lift2(find(selectedListItems, not(hasFirstChildList)), find(reverse(selectedListItems), not(hasFirstChildList)), (start, end) => ({ start, end }));
    };
    const listIndentation = (editor, lists, indentation) => {
        const entrySets = parseLists(lists, getItemSelection(editor));
        each$1(entrySets, (entrySet) => {
            indentSelectedEntries(entrySet.entries, indentation);
            const composedLists = composeEntries(editor, entrySet.entries);
            each$1(composedLists, (composedList) => {
                fireListEvent(editor, indentation === "Indent" /* Indentation.Indent */ ? "IndentList" /* ListAction.IndentList */ : "OutdentList" /* ListAction.OutdentList */, composedList.dom);
            });
            before(entrySet.sourceList, composedLists);
            remove(entrySet.sourceList);
        });
    };

    const selectionIndentation = (editor, indentation) => {
        const lists = fromDom(getSelectedListRoots(editor));
        const dlItems = fromDom(getSelectedDlItems(editor));
        let isHandled = false;
        if (lists.length || dlItems.length) {
            const bookmark = editor.selection.getBookmark();
            listIndentation(editor, lists, indentation);
            dlIndentation(editor, indentation, dlItems);
            editor.selection.moveToBookmark(bookmark);
            editor.selection.setRng(normalizeRange(editor.selection.getRng()));
            editor.nodeChanged();
            isHandled = true;
        }
        return isHandled;
    };
    const handleIndentation = (editor, indentation) => !selectionIsWithinNonEditableList(editor) && selectionIndentation(editor, indentation);
    const indentListSelection = (editor) => handleIndentation(editor, "Indent" /* Indentation.Indent */);
    const outdentListSelection = (editor) => handleIndentation(editor, "Outdent" /* Indentation.Outdent */);
    const flattenListSelection = (editor) => handleIndentation(editor, "Flatten" /* Indentation.Flatten */);

    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.BookmarkManager');

    const DOM$1 = global$3.DOM;
    /**
     * Returns a range bookmark. This will convert indexed bookmarks into temporary span elements with
     * index 0 so that they can be restored properly after the DOM has been modified. Text bookmarks will not have spans
     * added to them since they can be restored after a dom operation.
     *
     * So this: <p><b>|</b><b>|</b></p>
     * becomes: <p><b><span data-mce-type="bookmark">|</span></b><b data-mce-type="bookmark">|</span></b></p>
     *
     * @param  {DOMRange} rng DOM Range to get bookmark on.
     * @return {Object} Bookmark object.
     */
    const createBookmark = (rng) => {
        const bookmark = {};
        const setupEndPoint = (start) => {
            let container = rng[start ? 'startContainer' : 'endContainer'];
            let offset = rng[start ? 'startOffset' : 'endOffset'];
            if (isElement(container)) {
                const offsetNode = DOM$1.create('span', { 'data-mce-type': 'bookmark' });
                if (container.hasChildNodes()) {
                    offset = Math.min(offset, container.childNodes.length - 1);
                    if (start) {
                        container.insertBefore(offsetNode, container.childNodes[offset]);
                    }
                    else {
                        DOM$1.insertAfter(offsetNode, container.childNodes[offset]);
                    }
                }
                else {
                    container.appendChild(offsetNode);
                }
                container = offsetNode;
                offset = 0;
            }
            bookmark[start ? 'startContainer' : 'endContainer'] = container;
            bookmark[start ? 'startOffset' : 'endOffset'] = offset;
        };
        setupEndPoint(true);
        if (!rng.collapsed) {
            setupEndPoint();
        }
        return bookmark;
    };
    const resolveBookmark = (bookmark) => {
        const restoreEndPoint = (start) => {
            const nodeIndex = (container) => {
                var _a;
                let node = (_a = container.parentNode) === null || _a === void 0 ? void 0 : _a.firstChild;
                let idx = 0;
                while (node) {
                    if (node === container) {
                        return idx;
                    }
                    // Skip data-mce-type=bookmark nodes
                    if (!isElement(node) || node.getAttribute('data-mce-type') !== 'bookmark') {
                        idx++;
                    }
                    node = node.nextSibling;
                }
                return -1;
            };
            let container = bookmark[start ? 'startContainer' : 'endContainer'];
            let offset = bookmark[start ? 'startOffset' : 'endOffset'];
            if (!container) {
                return;
            }
            if (isElement(container) && container.parentNode) {
                const node = container;
                offset = nodeIndex(container);
                container = container.parentNode;
                DOM$1.remove(node);
                if (!container.hasChildNodes() && DOM$1.isBlock(container)) {
                    container.appendChild(DOM$1.create('br'));
                }
            }
            bookmark[start ? 'startContainer' : 'endContainer'] = container;
            bookmark[start ? 'startOffset' : 'endOffset'] = offset;
        };
        restoreEndPoint(true);
        restoreEndPoint();
        const rng = DOM$1.createRng();
        rng.setStart(bookmark.startContainer, bookmark.startOffset);
        if (bookmark.endContainer) {
            rng.setEnd(bookmark.endContainer, bookmark.endOffset);
        }
        return normalizeRange(rng);
    };

    const listToggleActionFromListName = (listName) => {
        switch (listName) {
            case 'UL': return "ToggleUlList" /* ListAction.ToggleUlList */;
            case 'OL': return "ToggleOlList" /* ListAction.ToggleOlList */;
            case 'DL': return "ToggleDLList" /* ListAction.ToggleDLList */;
        }
    };

    const updateListStyle = (dom, el, detail) => {
        const type = detail['list-style-type'] ? detail['list-style-type'] : null;
        dom.setStyle(el, 'list-style-type', type);
    };
    const setAttribs = (elm, attrs) => {
        global$2.each(attrs, (value, key) => {
            elm.setAttribute(key, value);
        });
    };
    const updateListAttrs = (dom, el, detail) => {
        setAttribs(el, detail['list-attributes']);
        global$2.each(dom.select('li', el), (li) => {
            setAttribs(li, detail['list-item-attributes']);
        });
    };
    const updateListWithDetails = (dom, el, detail) => {
        updateListStyle(dom, el, detail);
        updateListAttrs(dom, el, detail);
    };
    const removeStyles = (dom, element, styles) => {
        global$2.each(styles, (style) => dom.setStyle(element, style, ''));
    };
    const isInline = (editor, node) => isNonNullable(node) && !isBlock(node, editor.schema.getBlockElements());
    const getEndPointNode = (editor, rng, start, root) => {
        let container = rng[start ? 'startContainer' : 'endContainer'];
        const offset = rng[start ? 'startOffset' : 'endOffset'];
        // Resolve node index
        if (isElement(container)) {
            container = container.childNodes[Math.min(offset, container.childNodes.length - 1)] || container;
        }
        if (!start && isBr(container.nextSibling)) {
            container = container.nextSibling;
        }
        const findBlockAncestor = (node) => {
            while (!editor.dom.isBlock(node) && node.parentNode && root !== node) {
                node = node.parentNode;
            }
            return node;
        };
        // The reason why the next two if statements exist is because when the root node is a table cell (possibly some other node types)
        // then the highest we can go up the dom hierarchy is one level below the table cell.
        // So what happens when we have a bunch of inline nodes and text nodes in the table cell
        // and when the selection is collapsed inside one of the inline nodes then only that inline node (or text node) will be included
        // in the created list because that would be one level below td node and the other inline nodes won't be included.
        // So the fix proposed is to traverse left when looking for start node (and traverse right when looking for end node)
        // and keep traversing as long as we have an inline or text node (same for traversing right).
        // This way we end up including all the inline elements in the created list.
        // For more info look at #TINY-6853
        const findBetterContainer = (container, forward) => {
            var _a;
            const walker = new global$5(container, findBlockAncestor(container));
            const dir = forward ? 'next' : 'prev';
            let node;
            while ((node = walker[dir]())) {
                if (!(isVoid(editor, node) || isZwsp(node.textContent) || ((_a = node.textContent) === null || _a === void 0 ? void 0 : _a.length) === 0)) {
                    return Optional.some(node);
                }
            }
            return Optional.none();
        };
        // Traverse left to include inline/text nodes
        if (start && isTextNode$1(container)) {
            if (isZwsp(container.textContent)) {
                container = findBetterContainer(container, false).getOr(container);
            }
            else {
                if (container.parentNode !== null && isInline(editor, container.parentNode)) {
                    container = container.parentNode;
                }
                while (container.previousSibling !== null && (isInline(editor, container.previousSibling) || isTextNode$1(container.previousSibling))) {
                    container = container.previousSibling;
                }
            }
        }
        // Traverse right to include inline/text nodes
        if (!start && isTextNode$1(container)) {
            if (isZwsp(container.textContent)) {
                container = findBetterContainer(container, true).getOr(container);
            }
            else {
                if (container.parentNode !== null && isInline(editor, container.parentNode)) {
                    container = container.parentNode;
                }
                while (container.nextSibling !== null && (isInline(editor, container.nextSibling) || isTextNode$1(container.nextSibling))) {
                    container = container.nextSibling;
                }
            }
        }
        while (container.parentNode !== root) {
            const parent = container.parentNode;
            if (isTextBlock(editor, container)) {
                return container;
            }
            if (/^(TD|TH)$/.test(parent.nodeName)) {
                return container;
            }
            container = parent;
        }
        return container;
    };
    const getSelectedTextBlocks = (editor, rng, root) => {
        const textBlocks = [];
        const dom = editor.dom;
        const startNode = getEndPointNode(editor, rng, true, root);
        const endNode = getEndPointNode(editor, rng, false, root);
        let block;
        const siblings = [];
        for (let node = startNode; node; node = node.nextSibling) {
            siblings.push(node);
            if (node === endNode) {
                break;
            }
        }
        global$2.each(siblings, (node) => {
            var _a;
            if (isTextBlock(editor, node)) {
                textBlocks.push(node);
                block = null;
                return;
            }
            if (dom.isBlock(node) || isBr(node)) {
                if (isBr(node)) {
                    dom.remove(node);
                }
                block = null;
                return;
            }
            const nextSibling = node.nextSibling;
            if (global$1.isBookmarkNode(node)) {
                if (isListNode(nextSibling) || isTextBlock(editor, nextSibling) || (!nextSibling && node.parentNode === root)) {
                    block = null;
                    return;
                }
            }
            if (!block) {
                block = dom.create('p');
                (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(block, node);
                textBlocks.push(block);
            }
            block.appendChild(node);
        });
        return textBlocks;
    };
    const hasCompatibleStyle = (dom, sib, detail) => {
        const sibStyle = dom.getStyle(sib, 'list-style-type');
        let detailStyle = detail ? detail['list-style-type'] : '';
        detailStyle = detailStyle === null ? '' : detailStyle;
        return sibStyle === detailStyle;
    };
    /*
      Find the first element we would transform into a li-element if given no constraints.
      If the common ancestor is higher up than that provide it as the starting-point for the search for the root instead of the first selected element.
      This helps avoid issues with divs that should become li-elements are detected as the root when they should not be.
    */
    const getRootSearchStart = (editor, range) => {
        const start = editor.selection.getStart(true);
        const startPoint = getEndPointNode(editor, range, true, editor.getBody());
        if (ancestor(SugarElement.fromDom(startPoint), SugarElement.fromDom(range.commonAncestorContainer))) {
            return range.commonAncestorContainer;
        }
        else {
            return start;
        }
    };
    const applyList = (editor, listName, detail) => {
        const rng = editor.selection.getRng();
        let listItemName = 'LI';
        const root = getClosestListHost(editor, getRootSearchStart(editor, rng));
        const dom = editor.dom;
        if (dom.getContentEditable(editor.selection.getNode()) === 'false') {
            return;
        }
        listName = listName.toUpperCase();
        if (listName === 'DL') {
            listItemName = 'DT';
        }
        const bookmark = createBookmark(rng);
        const selectedTextBlocks = filter$1(getSelectedTextBlocks(editor, rng, root), editor.dom.isEditable);
        global$2.each(selectedTextBlocks, (block) => {
            let listBlock;
            const sibling = block.previousSibling;
            const parent = block.parentNode;
            if (!isListItemNode(parent)) {
                if (sibling && isListNode(sibling) && sibling.nodeName === listName && hasCompatibleStyle(dom, sibling, detail)) {
                    listBlock = sibling;
                    block = dom.rename(block, listItemName);
                    sibling.appendChild(block);
                }
                else {
                    listBlock = dom.create(listName);
                    parent.insertBefore(listBlock, block);
                    listBlock.appendChild(block);
                    block = dom.rename(block, listItemName);
                }
                removeStyles(dom, block, [
                    'margin', 'margin-right', 'margin-bottom', 'margin-left', 'margin-top',
                    'padding', 'padding-right', 'padding-bottom', 'padding-left', 'padding-top'
                ]);
                updateListWithDetails(dom, listBlock, detail);
                mergeWithAdjacentLists(editor.dom, listBlock);
            }
        });
        editor.selection.setRng(resolveBookmark(bookmark));
    };
    const isValidLists = (list1, list2) => {
        return isListNode(list1) && list1.nodeName === (list2 === null || list2 === void 0 ? void 0 : list2.nodeName);
    };
    const hasSameListStyle = (dom, list1, list2) => {
        const targetStyle = dom.getStyle(list1, 'list-style-type', true);
        const style = dom.getStyle(list2, 'list-style-type', true);
        return targetStyle === style;
    };
    const hasSameClasses = (elm1, elm2) => {
        return elm1.className === elm2.className;
    };
    const shouldMerge = (dom, list1, list2) => {
        return isValidLists(list1, list2) &&
            // Note: isValidLists will ensure list1 and list2 are a HTMLElement. Unfortunately TypeScript doesn't
            // support type guards on multiple variables. See https://github.com/microsoft/TypeScript/issues/26916
            hasSameListStyle(dom, list1, list2) &&
            hasSameClasses(list1, list2);
    };
    const mergeWithAdjacentLists = (dom, listBlock) => {
        let node;
        let sibling = listBlock.nextSibling;
        if (shouldMerge(dom, listBlock, sibling)) {
            const liSibling = sibling;
            while ((node = liSibling.firstChild)) {
                listBlock.appendChild(node);
            }
            dom.remove(liSibling);
        }
        sibling = listBlock.previousSibling;
        if (shouldMerge(dom, listBlock, sibling)) {
            const liSibling = sibling;
            while ((node = liSibling.lastChild)) {
                listBlock.insertBefore(node, listBlock.firstChild);
            }
            dom.remove(liSibling);
        }
    };
    const updateList$1 = (editor, list, listName, detail) => {
        if (list.nodeName !== listName) {
            const newList = editor.dom.rename(list, listName);
            updateListWithDetails(editor.dom, newList, detail);
            fireListEvent(editor, listToggleActionFromListName(listName), newList);
        }
        else {
            updateListWithDetails(editor.dom, list, detail);
            fireListEvent(editor, listToggleActionFromListName(listName), list);
        }
    };
    const updateCustomList = (editor, list, listName, detail) => {
        list.classList.forEach((cls, _, classList) => {
            if (cls.startsWith('tox-')) {
                classList.remove(cls);
                if (classList.length === 0) {
                    list.removeAttribute('class');
                }
            }
        });
        if (list.nodeName !== listName) {
            const newList = editor.dom.rename(list, listName);
            updateListWithDetails(editor.dom, newList, detail);
            fireListEvent(editor, listToggleActionFromListName(listName), newList);
        }
        else {
            updateListWithDetails(editor.dom, list, detail);
            fireListEvent(editor, listToggleActionFromListName(listName), list);
        }
    };
    const toggleMultipleLists = (editor, parentList, lists, listName, detail) => {
        const parentIsList = isListNode(parentList);
        if (parentIsList && parentList.nodeName === listName && !hasListStyleDetail(detail) && !isCustomList(parentList)) {
            flattenListSelection(editor);
        }
        else {
            applyList(editor, listName, detail);
            const bookmark = createBookmark(editor.selection.getRng());
            const allLists = parentIsList ? [parentList, ...lists] : lists;
            const updateFunction = (parentIsList && isCustomList(parentList)) ? updateCustomList : updateList$1;
            global$2.each(allLists, (elm) => {
                updateFunction(editor, elm, listName, detail);
            });
            editor.selection.setRng(resolveBookmark(bookmark));
        }
    };
    const hasListStyleDetail = (detail) => {
        return 'list-style-type' in detail;
    };
    const toggleSingleList = (editor, parentList, listName, detail) => {
        if (parentList === editor.getBody()) {
            return;
        }
        if (parentList) {
            if (parentList.nodeName === listName && !hasListStyleDetail(detail) && !isCustomList(parentList)) {
                flattenListSelection(editor);
            }
            else {
                const bookmark = createBookmark(editor.selection.getRng());
                if (isCustomList(parentList)) {
                    parentList.classList.forEach((cls, _, classList) => {
                        if (cls.startsWith('tox-')) {
                            classList.remove(cls);
                            if (classList.length === 0) {
                                parentList.removeAttribute('class');
                            }
                        }
                    });
                }
                updateListWithDetails(editor.dom, parentList, detail);
                const newList = editor.dom.rename(parentList, listName);
                mergeWithAdjacentLists(editor.dom, newList);
                editor.selection.setRng(resolveBookmark(bookmark));
                applyList(editor, listName, detail);
                fireListEvent(editor, listToggleActionFromListName(listName), newList);
            }
        }
        else {
            applyList(editor, listName, detail);
            fireListEvent(editor, listToggleActionFromListName(listName), parentList);
        }
    };
    const toggleList = (editor, listName, _detail) => {
        const parentList = getParentList(editor);
        if (isWithinNonEditableList(editor, parentList)) {
            return;
        }
        const selectedSubLists = getSelectedSubLists(editor);
        const detail = isObject(_detail) ? _detail : {};
        if (selectedSubLists.length > 0) {
            toggleMultipleLists(editor, parentList, selectedSubLists, listName, detail);
        }
        else {
            toggleSingleList(editor, parentList, listName, detail);
        }
    };

    const DOM = global$3.DOM;
    const normalizeList = (dom, list) => {
        const parentNode = list.parentElement;
        // Move UL/OL to previous LI if it's the only child of a LI
        if (parentNode && parentNode.nodeName === 'LI' && parentNode.firstChild === list) {
            const sibling = parentNode.previousSibling;
            if (sibling && sibling.nodeName === 'LI') {
                sibling.appendChild(list);
                if (isEmpty$1(dom, parentNode)) {
                    DOM.remove(parentNode);
                }
            }
            else {
                DOM.setStyle(parentNode, 'listStyleType', 'none');
            }
        }
        // Append OL/UL to previous LI if it's in a parent OL/UL i.e. old HTML4
        if (isListNode(parentNode)) {
            const sibling = parentNode.previousSibling;
            if (sibling && sibling.nodeName === 'LI') {
                sibling.appendChild(list);
            }
        }
    };
    const normalizeLists = (dom, element) => {
        const lists = global$2.grep(dom.select('ol,ul', element));
        global$2.each(lists, (list) => {
            normalizeList(dom, list);
        });
    };

    const findNextCaretContainer = (editor, rng, isForward, root) => {
        let node = rng.startContainer;
        const offset = rng.startOffset;
        if (isTextNode$1(node) && (isForward ? offset < node.data.length : offset > 0)) {
            return node;
        }
        const nonEmptyBlocks = editor.schema.getNonEmptyElements();
        if (isElement(node)) {
            node = global$6.getNode(node, offset);
        }
        const walker = new global$5(node, root);
        // Delete at <li>|<br></li> then jump over the bogus br
        if (isForward) {
            if (isBogusBr(editor.dom, node)) {
                walker.next();
            }
        }
        const walkFn = isForward ? walker.next.bind(walker) : walker.prev2.bind(walker);
        while ((node = walkFn())) {
            if (node.nodeName === 'LI' && !node.hasChildNodes()) {
                return node;
            }
            if (nonEmptyBlocks[node.nodeName]) {
                return node;
            }
            if (isTextNode$1(node) && node.data.length > 0) {
                return node;
            }
        }
        return null;
    };
    const hasOnlyOneBlockChild = (dom, elm) => {
        const childNodes = elm.childNodes;
        return childNodes.length === 1 && !isListNode(childNodes[0]) && dom.isBlock(childNodes[0]);
    };
    const isUnwrappable = (node) => Optional.from(node)
        .map(SugarElement.fromDom)
        .filter(isHTMLElement)
        .exists((el) => isEditable(el) && !contains$1(['details'], name(el)));
    const unwrapSingleBlockChild = (dom, elm) => {
        if (hasOnlyOneBlockChild(dom, elm) && isUnwrappable(elm.firstChild)) {
            dom.remove(elm.firstChild, true);
        }
    };
    const moveChildren = (dom, fromElm, toElm) => {
        let node;
        const targetElm = hasOnlyOneBlockChild(dom, toElm) ? toElm.firstChild : toElm;
        unwrapSingleBlockChild(dom, fromElm);
        if (!isEmpty$1(dom, fromElm, true)) {
            while ((node = fromElm.firstChild)) {
                targetElm.appendChild(node);
            }
        }
    };
    const mergeLiElements = (dom, fromElm, toElm) => {
        let listNode;
        const ul = fromElm.parentNode;
        if (!isChildOfBody(dom, fromElm) || !isChildOfBody(dom, toElm)) {
            return;
        }
        if (isListNode(toElm.lastChild)) {
            listNode = toElm.lastChild;
        }
        if (ul === toElm.lastChild) {
            if (isBr(ul.previousSibling)) {
                dom.remove(ul.previousSibling);
            }
        }
        const node = toElm.lastChild;
        if (node && isBr(node) && fromElm.hasChildNodes()) {
            dom.remove(node);
        }
        if (isEmpty$1(dom, toElm, true)) {
            empty(SugarElement.fromDom(toElm));
        }
        moveChildren(dom, fromElm, toElm);
        if (listNode) {
            toElm.appendChild(listNode);
        }
        const contains$1 = contains(SugarElement.fromDom(toElm), SugarElement.fromDom(fromElm));
        const nestedLists = contains$1 ? dom.getParents(fromElm, isListNode, toElm) : [];
        dom.remove(fromElm);
        each$1(nestedLists, (list) => {
            if (isEmpty$1(dom, list) && list !== dom.getRoot()) {
                dom.remove(list);
            }
        });
    };
    const mergeIntoEmptyLi = (editor, fromLi, toLi) => {
        empty(SugarElement.fromDom(toLi));
        mergeLiElements(editor.dom, fromLi, toLi);
        editor.selection.setCursorLocation(toLi, 0);
    };
    const mergeForward = (editor, rng, fromLi, toLi) => {
        const dom = editor.dom;
        if (dom.isEmpty(toLi)) {
            mergeIntoEmptyLi(editor, fromLi, toLi);
        }
        else {
            const bookmark = createBookmark(rng);
            mergeLiElements(dom, fromLi, toLi);
            editor.selection.setRng(resolveBookmark(bookmark));
        }
    };
    const mergeBackward = (editor, rng, fromLi, toLi) => {
        const bookmark = createBookmark(rng);
        mergeLiElements(editor.dom, fromLi, toLi);
        const resolvedBookmark = resolveBookmark(bookmark);
        editor.selection.setRng(resolvedBookmark);
    };
    const backspaceDeleteFromListToListCaret = (editor, isForward) => {
        const dom = editor.dom, selection = editor.selection;
        const selectionStartElm = selection.getStart();
        const root = getClosestEditingHost(editor, selectionStartElm);
        const li = dom.getParent(selection.getStart(), 'LI', root);
        if (li) {
            const ul = li.parentElement;
            if (ul === editor.getBody() && isEmpty$1(dom, ul)) {
                return true;
            }
            const rng = normalizeRange(selection.getRng());
            const otherLi = dom.getParent(findNextCaretContainer(editor, rng, isForward, root), 'LI', root);
            const willMergeParentIntoChild = otherLi && (isForward ? dom.isChildOf(li, otherLi) : dom.isChildOf(otherLi, li));
            if (otherLi && otherLi !== li && !willMergeParentIntoChild) {
                editor.undoManager.transact(() => {
                    if (isForward) {
                        mergeForward(editor, rng, otherLi, li);
                    }
                    else {
                        if (isFirstChild(li)) {
                            outdentListSelection(editor);
                        }
                        else {
                            mergeBackward(editor, rng, li, otherLi);
                        }
                    }
                });
                return true;
            }
            else if (willMergeParentIntoChild && !isForward && otherLi !== li) {
                const commonAncestorParent = rng.commonAncestorContainer.parentElement;
                if (!commonAncestorParent || dom.isChildOf(otherLi, commonAncestorParent)) {
                    return false;
                }
                editor.undoManager.transact(() => {
                    const bookmark = createBookmark(rng);
                    moveChildren(dom, commonAncestorParent, otherLi);
                    commonAncestorParent.remove();
                    const resolvedBookmark = resolveBookmark(bookmark);
                    editor.selection.setRng(resolvedBookmark);
                });
                return true;
            }
            else if (!otherLi) {
                if (!isForward && rng.startOffset === 0 && rng.endOffset === 0) {
                    editor.undoManager.transact(() => {
                        flattenListSelection(editor);
                    });
                    return true;
                }
            }
        }
        return false;
    };
    const removeBlock = (dom, block, root) => {
        const parentBlock = dom.getParent(block.parentNode, dom.isBlock, root);
        dom.remove(block);
        if (parentBlock && dom.isEmpty(parentBlock)) {
            dom.remove(parentBlock);
        }
    };
    const backspaceDeleteIntoListCaret = (editor, isForward) => {
        const dom = editor.dom;
        const selectionStartElm = editor.selection.getStart();
        const root = getClosestEditingHost(editor, selectionStartElm);
        const block = dom.getParent(selectionStartElm, dom.isBlock, root);
        if (block && dom.isEmpty(block, undefined, { checkRootAsContent: true })) {
            const rng = normalizeRange(editor.selection.getRng());
            const nextCaretContainer = findNextCaretContainer(editor, rng, isForward, root);
            const otherLi = dom.getParent(nextCaretContainer, 'LI', root);
            if (nextCaretContainer && otherLi) {
                const findValidElement = (element) => contains$1(['td', 'th', 'caption'], name(element));
                const findRoot = (node) => node.dom === root;
                const otherLiCell = closest$2(SugarElement.fromDom(otherLi), findValidElement, findRoot);
                const caretCell = closest$2(SugarElement.fromDom(rng.startContainer), findValidElement, findRoot);
                if (!equals(otherLiCell, caretCell, eq)) {
                    return false;
                }
                editor.undoManager.transact(() => {
                    const parentNode = otherLi.parentNode;
                    removeBlock(dom, block, root);
                    mergeWithAdjacentLists(dom, parentNode);
                    editor.selection.select(nextCaretContainer, true);
                    editor.selection.collapse(isForward);
                });
                return true;
            }
        }
        return false;
    };
    const backspaceDeleteCaret = (editor, isForward) => {
        return backspaceDeleteFromListToListCaret(editor, isForward) || backspaceDeleteIntoListCaret(editor, isForward);
    };
    const hasListSelection = (editor) => {
        const selectionStartElm = editor.selection.getStart();
        const root = getClosestEditingHost(editor, selectionStartElm);
        const startListParent = editor.dom.getParent(selectionStartElm, 'LI,DT,DD', root);
        return startListParent || getSelectedListItems(editor).length > 0;
    };
    const backspaceDeleteRange = (editor) => {
        if (hasListSelection(editor)) {
            editor.undoManager.transact(() => {
                // Some delete actions may prevent the input event from being fired. If we do not detect it, we fire it ourselves.
                let shouldFireInput = true;
                const inputHandler = () => shouldFireInput = false;
                editor.on('input', inputHandler);
                editor.execCommand('Delete');
                editor.off('input', inputHandler);
                if (shouldFireInput) {
                    editor.dispatch('input');
                }
                normalizeLists(editor.dom, editor.getBody());
            });
            return true;
        }
        return false;
    };
    const backspaceDelete = (editor, isForward) => {
        const selection = editor.selection;
        return !isWithinNonEditableList(editor, selection.getNode()) && (selection.isCollapsed() ?
            backspaceDeleteCaret(editor, isForward) : backspaceDeleteRange(editor));
    };
    const setup$2 = (editor) => {
        editor.on('ExecCommand', (e) => {
            const cmd = e.command.toLowerCase();
            if ((cmd === 'delete' || cmd === 'forwarddelete') && hasListSelection(editor)) {
                normalizeLists(editor.dom, editor.getBody());
            }
        });
        editor.on('keydown', (e) => {
            if (e.keyCode === global$4.BACKSPACE) {
                if (backspaceDelete(editor, false)) {
                    e.preventDefault();
                }
            }
            else if (e.keyCode === global$4.DELETE) {
                if (backspaceDelete(editor, true)) {
                    e.preventDefault();
                }
            }
        });
    };

    const get = (editor) => ({
        backspaceDelete: (isForward) => {
            backspaceDelete(editor, isForward);
        }
    });

    const updateList = (editor, update) => {
        const parentList = getParentList(editor);
        if (parentList === null || isWithinNonEditableList(editor, parentList)) {
            return;
        }
        editor.undoManager.transact(() => {
            if (isObject(update.styles)) {
                editor.dom.setStyles(parentList, update.styles);
            }
            if (isObject(update.attrs)) {
                each(update.attrs, (v, k) => editor.dom.setAttrib(parentList, k, v));
            }
        });
    };

    // Example: 'AB' -> 28
    const parseAlphabeticBase26 = (str) => {
        const chars = reverse(trim(str).split(''));
        const values = map(chars, (char, i) => {
            const charValue = char.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            return Math.pow(26, i) * charValue;
        });
        return foldl(values, (sum, v) => sum + v, 0);
    };
    // Example: 28 -> 'AB'
    const composeAlphabeticBase26 = (value) => {
        value--;
        if (value < 0) {
            return '';
        }
        else {
            const remainder = value % 26;
            const quotient = Math.floor(value / 26);
            const rest = composeAlphabeticBase26(quotient);
            const char = String.fromCharCode('A'.charCodeAt(0) + remainder);
            return rest + char;
        }
    };
    const isUppercase = (str) => /^[A-Z]+$/.test(str);
    const isLowercase = (str) => /^[a-z]+$/.test(str);
    const isNumeric = (str) => /^[0-9]+$/.test(str);
    const deduceListType = (start) => {
        if (isNumeric(start)) {
            return 2 /* ListType.Numeric */;
        }
        else if (isUppercase(start)) {
            return 0 /* ListType.UpperAlpha */;
        }
        else if (isLowercase(start)) {
            return 1 /* ListType.LowerAlpha */;
        }
        else if (isEmpty$2(start)) {
            return 3 /* ListType.None */;
        }
        else {
            return 4 /* ListType.Unknown */;
        }
    };
    const parseStartValue = (start) => {
        switch (deduceListType(start)) {
            case 2 /* ListType.Numeric */:
                return Optional.some({
                    listStyleType: Optional.none(),
                    start
                });
            case 0 /* ListType.UpperAlpha */:
                return Optional.some({
                    listStyleType: Optional.some('upper-alpha'),
                    start: parseAlphabeticBase26(start).toString()
                });
            case 1 /* ListType.LowerAlpha */:
                return Optional.some({
                    listStyleType: Optional.some('lower-alpha'),
                    start: parseAlphabeticBase26(start).toString()
                });
            case 3 /* ListType.None */:
                return Optional.some({
                    listStyleType: Optional.none(),
                    start: ''
                });
            case 4 /* ListType.Unknown */:
                return Optional.none();
        }
    };
    const parseDetail = (detail) => {
        const start = parseInt(detail.start, 10);
        if (is$2(detail.listStyleType, 'upper-alpha')) {
            return composeAlphabeticBase26(start);
        }
        else if (is$2(detail.listStyleType, 'lower-alpha')) {
            return composeAlphabeticBase26(start).toLowerCase();
        }
        else {
            return detail.start;
        }
    };

    const open = (editor) => {
        // Find the current list and skip opening if the selection isn't in an ordered list
        const currentList = getParentList(editor);
        if (!isOlNode(currentList) || isWithinNonEditableList(editor, currentList)) {
            return;
        }
        editor.windowManager.open({
            title: 'List Properties',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'input',
                        name: 'start',
                        label: 'Start list at number',
                        inputMode: 'numeric'
                    }
                ]
            },
            initialData: {
                start: parseDetail({
                    start: editor.dom.getAttrib(currentList, 'start', '1'),
                    listStyleType: Optional.from(editor.dom.getStyle(currentList, 'list-style-type'))
                })
            },
            buttons: [
                {
                    type: 'cancel',
                    name: 'cancel',
                    text: 'Cancel'
                },
                {
                    type: 'submit',
                    name: 'save',
                    text: 'Save',
                    primary: true
                }
            ],
            onSubmit: (api) => {
                const data = api.getData();
                parseStartValue(data.start).each((detail) => {
                    editor.execCommand('mceListUpdate', false, {
                        attrs: {
                            start: detail.start === '1' ? '' : detail.start
                        },
                        styles: {
                            'list-style-type': detail.listStyleType.getOr('')
                        }
                    });
                });
                api.close();
            }
        });
    };

    const queryListCommandState = (editor, listName) => () => {
        const parentList = getParentList(editor);
        return isNonNullable(parentList) && parentList.nodeName === listName;
    };
    const registerDialog = (editor) => {
        editor.addCommand('mceListProps', () => {
            open(editor);
        });
    };
    const register$2 = (editor) => {
        editor.on('BeforeExecCommand', (e) => {
            const cmd = e.command.toLowerCase();
            if (cmd === 'indent') {
                indentListSelection(editor);
            }
            else if (cmd === 'outdent') {
                outdentListSelection(editor);
            }
        });
        editor.addCommand('InsertUnorderedList', (ui, detail) => {
            toggleList(editor, 'UL', detail);
        });
        editor.addCommand('InsertOrderedList', (ui, detail) => {
            toggleList(editor, 'OL', detail);
        });
        editor.addCommand('InsertDefinitionList', (ui, detail) => {
            toggleList(editor, 'DL', detail);
        });
        editor.addCommand('RemoveList', () => {
            flattenListSelection(editor);
        });
        registerDialog(editor);
        editor.addCommand('mceListUpdate', (ui, detail) => {
            if (isObject(detail)) {
                updateList(editor, detail);
            }
        });
        editor.addQueryStateHandler('InsertUnorderedList', queryListCommandState(editor, 'UL'));
        editor.addQueryStateHandler('InsertOrderedList', queryListCommandState(editor, 'OL'));
        editor.addQueryStateHandler('InsertDefinitionList', queryListCommandState(editor, 'DL'));
    };

    var global = tinymce.util.Tools.resolve('tinymce.html.Node');

    const isTextNode = (node) => node.type === 3;
    const isEmpty = (nodeBuffer) => nodeBuffer.length === 0;
    const wrapInvalidChildren = (list) => {
        const insertListItem = (buffer, refNode) => {
            const li = global.create('li');
            each$1(buffer, (node) => li.append(node));
            if (refNode) {
                list.insert(li, refNode, true);
            }
            else {
                list.append(li);
            }
        };
        const reducer = (buffer, node) => {
            if (isTextNode(node)) {
                return [...buffer, node];
            }
            else if (!isEmpty(buffer) && !isTextNode(node)) {
                insertListItem(buffer, node);
                return [];
            }
            else {
                return buffer;
            }
        };
        const restBuffer = foldl(list.children(), reducer, []);
        if (!isEmpty(restBuffer)) {
            insertListItem(restBuffer);
        }
    };
    const setup$1 = (editor) => {
        editor.on('PreInit', () => {
            const { parser } = editor;
            parser.addNodeFilter('ul,ol', (nodes) => each$1(nodes, wrapInvalidChildren));
        });
    };

    const setupTabKey = (editor) => {
        editor.on('keydown', (e) => {
            // Check for tab but not ctrl/cmd+tab since it switches browser tabs
            if (e.keyCode !== global$4.TAB || global$4.metaKeyPressed(e)) {
                return;
            }
            editor.undoManager.transact(() => {
                if (e.shiftKey ? outdentListSelection(editor) : indentListSelection(editor)) {
                    e.preventDefault();
                }
            });
        });
    };
    const setup = (editor) => {
        if (shouldIndentOnTab(editor)) {
            setupTabKey(editor);
        }
        setup$2(editor);
    };

    const setupToggleButtonHandler = (editor, listName) => (api) => {
        const toggleButtonHandler = (e) => {
            api.setActive(inList(e.parents, listName));
            api.setEnabled(!isWithinNonEditableList(editor, e.element) && editor.selection.isEditable());
        };
        api.setEnabled(editor.selection.isEditable());
        return setNodeChangeHandler(editor, toggleButtonHandler);
    };
    const register$1 = (editor) => {
        const exec = (command) => () => editor.execCommand(command);
        if (!editor.hasPlugin('advlist')) {
            editor.ui.registry.addToggleButton('numlist', {
                icon: 'ordered-list',
                active: false,
                tooltip: 'Numbered list',
                onAction: exec('InsertOrderedList'),
                onSetup: setupToggleButtonHandler(editor, 'OL')
            });
            editor.ui.registry.addToggleButton('bullist', {
                icon: 'unordered-list',
                active: false,
                tooltip: 'Bullet list',
                onAction: exec('InsertUnorderedList'),
                onSetup: setupToggleButtonHandler(editor, 'UL')
            });
        }
    };

    const setupMenuButtonHandler = (editor, listName) => (api) => {
        const menuButtonHandler = (e) => api.setEnabled(inList(e.parents, listName) && !isWithinNonEditableList(editor, e.element));
        return setNodeChangeHandler(editor, menuButtonHandler);
    };
    const register = (editor) => {
        const listProperties = {
            text: 'List properties...',
            icon: 'ordered-list',
            onAction: () => editor.execCommand('mceListProps'),
            onSetup: setupMenuButtonHandler(editor, 'OL')
        };
        editor.ui.registry.addMenuItem('listprops', listProperties);
        editor.ui.registry.addContextMenu('lists', {
            update: (node) => {
                const parentList = getParentList(editor, node);
                return isOlNode(parentList) ? ['listprops'] : [];
            }
        });
    };

    var Plugin = () => {
        global$7.add('lists', (editor) => {
            register$3(editor);
            setup$1(editor);
            if (!editor.hasPlugin('rtc', true)) {
                setup(editor);
                register$2(editor);
            }
            else {
                registerDialog(editor);
            }
            register$1(editor);
            register(editor);
            return get(editor);
        });
    };

    Plugin();
    /** *****
     * DO NOT EXPORT ANYTHING
     *
     * IF YOU DO ROLLUP WILL LEAVE A GLOBAL ON THE PAGE
     *******/

})();
