/**
 * utils.ts 12.3.2
 * Copyright (c) 2021-2025 Alain Dumesny - see GridStack root license
 */
/**
 * @internal Checks for obsolete method names and provides deprecation warnings.
 * Creates a wrapper function that logs a deprecation warning when called.
 *
 * @param self the object context to apply the function to
 * @param f the new function to call
 * @param oldName the deprecated method name
 * @param newName the new method name to use instead
 * @param rev the version when the deprecation was introduced
 * @returns a wrapper function that warns about deprecation
 */
// eslint-disable-next-line
export function obsolete(self, f, oldName, newName, rev) {
    const wrapper = (...args) => {
        console.warn('gridstack.js: Function `' + oldName + '` is deprecated in ' + rev + ' and has been replaced ' +
            'with `' + newName + '`. It will be **removed** in a future release');
        return f.apply(self, args);
    };
    wrapper.prototype = f.prototype;
    return wrapper;
}
/**
 * @internal Checks for obsolete grid options and migrates them to new names.
 * Automatically copies old option values to new option names and shows deprecation warnings.
 *
 * @param opts the options object to check and migrate
 * @param oldName the deprecated option name
 * @param newName the new option name to use instead
 * @param rev the version when the deprecation was introduced
 */
export function obsoleteOpts(opts, oldName, newName, rev) {
    if (opts[oldName] !== undefined) {
        opts[newName] = opts[oldName];
        console.warn('gridstack.js: Option `' + oldName + '` is deprecated in ' + rev + ' and has been replaced with `' +
            newName + '`. It will be **removed** in a future release');
    }
}
/**
 * @internal Checks for obsolete grid options that have been completely removed.
 * Shows deprecation warnings for options that are no longer supported.
 *
 * @param opts the options object to check
 * @param oldName the removed option name
 * @param rev the version when the option was removed
 * @param info additional information about the removal
 */
export function obsoleteOptsDel(opts, oldName, rev, info) {
    if (opts[oldName] !== undefined) {
        console.warn('gridstack.js: Option `' + oldName + '` is deprecated in ' + rev + info);
    }
}
/**
 * @internal Checks for obsolete HTML element attributes and migrates them.
 * Automatically copies old attribute values to new attribute names and shows deprecation warnings.
 *
 * @param el the HTML element to check and migrate
 * @param oldName the deprecated attribute name
 * @param newName the new attribute name to use instead
 * @param rev the version when the deprecation was introduced
 */
export function obsoleteAttr(el, oldName, newName, rev) {
    const oldAttr = el.getAttribute(oldName);
    if (oldAttr !== null) {
        el.setAttribute(newName, oldAttr);
        console.warn('gridstack.js: attribute `' + oldName + '`=' + oldAttr + ' is deprecated on this object in ' + rev + ' and has been replaced with `' +
            newName + '`. It will be **removed** in a future release');
    }
}
/**
 * Collection of utility methods used throughout GridStack.
 * These are general-purpose helper functions for DOM manipulation,
 * positioning calculations, object operations, and more.
 */
export class Utils {
    /**
     * Convert a potential selector into an actual list of HTML elements.
     * Supports CSS selectors, element references, and special ID handling.
     *
     * @param els selector string, HTMLElement, or array of elements
     * @param root optional root element to search within (defaults to document, useful for shadow DOM)
     * @returns array of HTML elements matching the selector
     *
     * @example
     * const elements = Utils.getElements('.grid-item');
     * const byId = Utils.getElements('#myWidget');
     * const fromShadow = Utils.getElements('.item', shadowRoot);
     */
    static getElements(els, root = document) {
        if (typeof els === 'string') {
            const doc = ('getElementById' in root) ? root : undefined;
            // Note: very common for people use to id='1,2,3' which is only legal as HTML5 id, but not CSS selectors
            // so if we start with a number, assume it's an id and just return that one item...
            // see https://github.com/gridstack/gridstack.js/issues/2234#issuecomment-1523796562
            if (doc && !isNaN(+els[0])) { // start with digit
                const el = doc.getElementById(els);
                return el ? [el] : [];
            }
            let list = root.querySelectorAll(els);
            if (!list.length && els[0] !== '.' && els[0] !== '#') {
                list = root.querySelectorAll('.' + els);
                if (!list.length) {
                    list = root.querySelectorAll('#' + els);
                }
            }
            return Array.from(list);
        }
        return [els];
    }
    /**
     * Convert a potential selector into a single HTML element.
     * Similar to getElements() but returns only the first match.
     *
     * @param els selector string or HTMLElement
     * @param root optional root element to search within (defaults to document)
     * @returns the first HTML element matching the selector, or null if not found
     *
     * @example
     * const element = Utils.getElement('#myWidget');
     * const first = Utils.getElement('.grid-item');
     */
    static getElement(els, root = document) {
        if (typeof els === 'string') {
            const doc = ('getElementById' in root) ? root : undefined;
            if (!els.length)
                return null;
            if (doc && els[0] === '#') {
                return doc.getElementById(els.substring(1));
            }
            if (els[0] === '#' || els[0] === '.' || els[0] === '[') {
                return root.querySelector(els);
            }
            // if we start with a digit, assume it's an id (error calling querySelector('#1')) as class are not valid CSS
            if (doc && !isNaN(+els[0])) { // start with digit
                return doc.getElementById(els);
            }
            // finally try string, then id, then class
            let el = root.querySelector(els);
            if (doc && !el) {
                el = doc.getElementById(els);
            }
            if (!el) {
                el = root.querySelector('.' + els);
            }
            return el;
        }
        return els;
    }
    /**
     * Check if a widget should be lazy loaded based on node or grid settings.
     *
     * @param n the grid node to check
     * @returns true if the item should be lazy loaded
     *
     * @example
     * if (Utils.lazyLoad(node)) {
     *   // Set up intersection observer for lazy loading
     * }
     */
    static lazyLoad(n) {
        return n.lazyLoad || n.grid?.opts?.lazyLoad && n.lazyLoad !== false;
    }
    /**
     * Create a div element with the specified CSS classes.
     *
     * @param classes array of CSS class names to add
     * @param parent optional parent element to append the div to
     * @returns the created div element
     *
     * @example
     * const div = Utils.createDiv(['grid-item', 'draggable']);
     * const nested = Utils.createDiv(['content'], parentDiv);
     */
    static createDiv(classes, parent) {
        const el = document.createElement('div');
        classes.forEach(c => { if (c)
            el.classList.add(c); });
        parent?.appendChild(el);
        return el;
    }
    /**
     * Check if a widget should resize to fit its content.
     *
     * @param n the grid node to check (can be undefined)
     * @param strict if true, only returns true for explicit sizeToContent:true (not numbers)
     * @returns true if the widget should resize to content
     *
     * @example
     * if (Utils.shouldSizeToContent(node)) {
     *   // Trigger content-based resizing
     * }
     */
    static shouldSizeToContent(n, strict = false) {
        return n?.grid && (strict ?
            (n.sizeToContent === true || (n.grid.opts.sizeToContent === true && n.sizeToContent === undefined)) :
            (!!n.sizeToContent || (n.grid.opts.sizeToContent && n.sizeToContent !== false)));
    }
    /**
     * Check if two grid positions overlap/intersect.
     *
     * @param a first position with x, y, w, h properties
     * @param b second position with x, y, w, h properties
     * @returns true if the positions overlap
     *
     * @example
     * const overlaps = Utils.isIntercepted(
     *   {x: 0, y: 0, w: 2, h: 1},
     *   {x: 1, y: 0, w: 2, h: 1}
     * ); // true - they overlap
     */
    static isIntercepted(a, b) {
        return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
    }
    /**
     * Check if two grid positions are touching (edges or corners).
     *
     * @param a first position
     * @param b second position
     * @returns true if the positions are touching
     *
     * @example
     * const touching = Utils.isTouching(
     *   {x: 0, y: 0, w: 2, h: 1},
     *   {x: 2, y: 0, w: 1, h: 1}
     * ); // true - they share an edge
     */
    static isTouching(a, b) {
        return Utils.isIntercepted(a, { x: b.x - 0.5, y: b.y - 0.5, w: b.w + 1, h: b.h + 1 });
    }
    /**
     * Calculate the overlapping area between two grid positions.
     *
     * @param a first position
     * @param b second position
     * @returns the area of overlap (0 if no overlap)
     *
     * @example
     * const overlap = Utils.areaIntercept(
     *   {x: 0, y: 0, w: 3, h: 2},
     *   {x: 1, y: 0, w: 3, h: 2}
     * ); // returns 4 (2x2 overlap)
     */
    static areaIntercept(a, b) {
        const x0 = (a.x > b.x) ? a.x : b.x;
        const x1 = (a.x + a.w < b.x + b.w) ? a.x + a.w : b.x + b.w;
        if (x1 <= x0)
            return 0; // no overlap
        const y0 = (a.y > b.y) ? a.y : b.y;
        const y1 = (a.y + a.h < b.y + b.h) ? a.y + a.h : b.y + b.h;
        if (y1 <= y0)
            return 0; // no overlap
        return (x1 - x0) * (y1 - y0);
    }
    /**
     * Calculate the total area of a grid position.
     *
     * @param a position with width and height
     * @returns the total area (width * height)
     *
     * @example
     * const area = Utils.area({x: 0, y: 0, w: 3, h: 2}); // returns 6
     */
    static area(a) {
        return a.w * a.h;
    }
    /**
     * Sort an array of grid nodes by position (y first, then x).
     *
     * @param nodes array of nodes to sort
     * @param dir sort direction: 1 for ascending (top-left first), -1 for descending
     * @returns the sorted array (modifies original)
     *
     * @example
     * const sorted = Utils.sort(nodes); // Sort top-left to bottom-right
     * const reverse = Utils.sort(nodes, -1); // Sort bottom-right to top-left
     */
    static sort(nodes, dir = 1) {
        const und = 10000;
        return nodes.sort((a, b) => {
            const diffY = dir * ((a.y ?? und) - (b.y ?? und));
            if (diffY === 0)
                return dir * ((a.x ?? und) - (b.x ?? und));
            return diffY;
        });
    }
    /**
     * Find a grid node by its ID.
     *
     * @param nodes array of nodes to search
     * @param id the ID to search for
     * @returns the node with matching ID, or undefined if not found
     *
     * @example
     * const node = Utils.find(nodes, 'widget-1');
     * if (node) console.log('Found node at:', node.x, node.y);
     */
    static find(nodes, id) {
        return id ? nodes.find(n => n.id === id) : undefined;
    }
    /**
     * Convert various value types to boolean.
     * Handles strings like 'false', 'no', '0' as false.
     *
     * @param v value to convert
     * @returns boolean representation
     *
     * @example
     * Utils.toBool('true');  // true
     * Utils.toBool('false'); // false
     * Utils.toBool('no');    // false
     * Utils.toBool('1');     // true
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static toBool(v) {
        if (typeof v === 'boolean') {
            return v;
        }
        if (typeof v === 'string') {
            v = v.toLowerCase();
            return !(v === '' || v === 'no' || v === 'false' || v === '0');
        }
        return Boolean(v);
    }
    /**
     * Convert a string value to a number, handling null and empty strings.
     *
     * @param value string or null value to convert
     * @returns number value, or undefined for null/empty strings
     *
     * @example
     * Utils.toNumber('42');  // 42
     * Utils.toNumber('');    // undefined
     * Utils.toNumber(null);  // undefined
     */
    static toNumber(value) {
        return (value === null || value.length === 0) ? undefined : Number(value);
    }
    /**
     * Parse a height value with units into numeric value and unit string.
     * Supports px, em, rem, vh, vw, %, cm, mm units.
     *
     * @param val height value as number or string with units
     * @returns object with h (height) and unit properties
     *
     * @example
     * Utils.parseHeight('100px');  // {h: 100, unit: 'px'}
     * Utils.parseHeight('2rem');   // {h: 2, unit: 'rem'}
     * Utils.parseHeight(50);       // {h: 50, unit: 'px'}
     */
    static parseHeight(val) {
        let h;
        let unit = 'px';
        if (typeof val === 'string') {
            if (val === 'auto' || val === '')
                h = 0;
            else {
                const match = val.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%|cm|mm)?$/);
                if (!match) {
                    throw new Error(`Invalid height val = ${val}`);
                }
                unit = match[2] || 'px';
                h = parseFloat(match[1]);
            }
        }
        else {
            h = val;
        }
        return { h, unit };
    }
    /**
     * Copy unset fields from source objects to target object (shallow merge with defaults).
     * Similar to Object.assign but only sets undefined/null fields.
     *
     * @param target the object to copy defaults into
     * @param sources one or more source objects to copy defaults from
     * @returns the modified target object
     *
     * @example
     * const config = { width: 100 };
     * Utils.defaults(config, { width: 200, height: 50 });
     * // config is now { width: 100, height: 50 }
     */
    // eslint-disable-next-line
    static defaults(target, ...sources) {
        sources.forEach(source => {
            for (const key in source) {
                if (!source.hasOwnProperty(key))
                    return;
                if (target[key] === null || target[key] === undefined) {
                    target[key] = source[key];
                }
                else if (typeof source[key] === 'object' && typeof target[key] === 'object') {
                    // property is an object, recursively add it's field over... #1373
                    Utils.defaults(target[key], source[key]);
                }
            }
        });
        return target;
    }
    /**
     * Compare two objects for equality (shallow comparison).
     * Checks if objects have the same fields and values at one level deep.
     *
     * @param a first object to compare
     * @param b second object to compare
     * @returns true if objects have the same values
     *
     * @example
     * Utils.same({x: 1, y: 2}, {x: 1, y: 2}); // true
     * Utils.same({x: 1}, {x: 1, y: 2}); // false
     */
    static same(a, b) {
        if (typeof a !== 'object')
            return a == b;
        if (typeof a !== typeof b)
            return false;
        // else we have object, check just 1 level deep for being same things...
        if (Object.keys(a).length !== Object.keys(b).length)
            return false;
        for (const key in a) {
            if (a[key] !== b[key])
                return false;
        }
        return true;
    }
    /**
     * Copy position and size properties from one widget to another.
     * Copies x, y, w, h and optionally min/max constraints.
     *
     * @param a target widget to copy to
     * @param b source widget to copy from
     * @param doMinMax if true, also copy min/max width/height constraints
     * @returns the target widget (a)
     *
     * @example
     * Utils.copyPos(widget1, widget2); // Copy position/size
     * Utils.copyPos(widget1, widget2, true); // Also copy constraints
     */
    static copyPos(a, b, doMinMax = false) {
        if (b.x !== undefined)
            a.x = b.x;
        if (b.y !== undefined)
            a.y = b.y;
        if (b.w !== undefined)
            a.w = b.w;
        if (b.h !== undefined)
            a.h = b.h;
        if (doMinMax) {
            if (b.minW)
                a.minW = b.minW;
            if (b.minH)
                a.minH = b.minH;
            if (b.maxW)
                a.maxW = b.maxW;
            if (b.maxH)
                a.maxH = b.maxH;
        }
        return a;
    }
    /** true if a and b has same size & position */
    static samePos(a, b) {
        return a && b && a.x === b.x && a.y === b.y && (a.w || 1) === (b.w || 1) && (a.h || 1) === (b.h || 1);
    }
    /** given a node, makes sure it's min/max are valid */
    static sanitizeMinMax(node) {
        // remove 0, undefine, null
        if (!node.minW) {
            delete node.minW;
        }
        if (!node.minH) {
            delete node.minH;
        }
        if (!node.maxW) {
            delete node.maxW;
        }
        if (!node.maxH) {
            delete node.maxH;
        }
    }
    /** removes field from the first object if same as the second objects (like diffing) and internal '_' for saving */
    static removeInternalAndSame(a, b) {
        if (typeof a !== 'object' || typeof b !== 'object')
            return;
        for (let key in a) {
            const aVal = a[key];
            const bVal = b[key];
            if (key[0] === '_' || aVal === bVal) {
                delete a[key];
            }
            else if (aVal && typeof aVal === 'object' && bVal !== undefined) {
                Utils.removeInternalAndSame(aVal, bVal);
                if (!Object.keys(aVal).length) {
                    delete a[key];
                }
            }
        }
    }
    /** removes internal fields '_' and default values for saving */
    static removeInternalForSave(n, removeEl = true) {
        for (let key in n) {
            if (key[0] === '_' || n[key] === null || n[key] === undefined)
                delete n[key];
        }
        delete n.grid;
        if (removeEl)
            delete n.el;
        // delete default values (will be re-created on read)
        if (!n.autoPosition)
            delete n.autoPosition;
        if (!n.noResize)
            delete n.noResize;
        if (!n.noMove)
            delete n.noMove;
        if (!n.locked)
            delete n.locked;
        if (n.w === 1 || n.w === n.minW)
            delete n.w;
        if (n.h === 1 || n.h === n.minH)
            delete n.h;
    }
    /** return the closest parent (or itself) matching the given class */
    // static closestUpByClass(el: HTMLElement, name: string): HTMLElement {
    //   while (el) {
    //     if (el.classList.contains(name)) return el;
    //     el = el.parentElement
    //   }
    //   return null;
    // }
    /** delay calling the given function for given delay, preventing new calls from happening while waiting */
    static throttle(func, delay) {
        let isWaiting = false;
        return (...args) => {
            if (!isWaiting) {
                isWaiting = true;
                setTimeout(() => { func(...args); isWaiting = false; }, delay);
            }
        };
    }
    static removePositioningStyles(el) {
        const style = el.style;
        if (style.position) {
            style.removeProperty('position');
        }
        if (style.left) {
            style.removeProperty('left');
        }
        if (style.top) {
            style.removeProperty('top');
        }
        if (style.width) {
            style.removeProperty('width');
        }
        if (style.height) {
            style.removeProperty('height');
        }
    }
    /** @internal returns the passed element if scrollable, else the closest parent that will, up to the entire document scrolling element */
    static getScrollElement(el) {
        if (!el)
            return document.scrollingElement || document.documentElement; // IE support
        const style = getComputedStyle(el);
        const overflowRegex = /(auto|scroll)/;
        if (overflowRegex.test(style.overflow + style.overflowY)) {
            return el;
        }
        else {
            return Utils.getScrollElement(el.parentElement);
        }
    }
    /** @internal */
    static updateScrollPosition(el, position, distance) {
        const scrollEl = Utils.getScrollElement(el);
        if (!scrollEl)
            return;
        const elRect = el.getBoundingClientRect();
        const scrollRect = scrollEl.getBoundingClientRect();
        const innerHeightOrClientHeight = (window.innerHeight || document.documentElement.clientHeight);
        const offsetDiffDown = elRect.bottom - Math.min(scrollRect.bottom, innerHeightOrClientHeight);
        const offsetDiffUp = elRect.top - Math.max(scrollRect.top, 0);
        const prevScroll = scrollEl.scrollTop;
        if (offsetDiffUp < 0 && distance < 0) {
            // scroll up
            if (el.offsetHeight > scrollRect.height) {
                scrollEl.scrollTop += distance;
            }
            else {
                scrollEl.scrollTop += Math.abs(offsetDiffUp) > Math.abs(distance) ? distance : offsetDiffUp;
            }
        }
        else if (offsetDiffDown > 0 && distance > 0) {
            // scroll down
            if (el.offsetHeight > scrollRect.height) {
                scrollEl.scrollTop += distance;
            }
            else {
                scrollEl.scrollTop += offsetDiffDown > distance ? distance : offsetDiffDown;
            }
        }
        position.top += scrollEl.scrollTop - prevScroll;
    }
    /**
     * @internal Function used to scroll the page.
     *
     * @param event `MouseEvent` that triggers the resize
     * @param el `HTMLElement` that's being resized
     * @param distance Distance from the V edges to start scrolling
     */
    static updateScrollResize(event, el, distance) {
        const scrollEl = Utils.getScrollElement(el);
        const height = scrollEl.clientHeight;
        // #1727 event.clientY is relative to viewport, so must compare this against position of scrollEl getBoundingClientRect().top
        // #1745 Special situation if scrollEl is document 'html': here browser spec states that
        // clientHeight is height of viewport, but getBoundingClientRect() is rectangle of html element;
        // this discrepancy arises because in reality scrollbar is attached to viewport, not html element itself.
        const offsetTop = (scrollEl === Utils.getScrollElement()) ? 0 : scrollEl.getBoundingClientRect().top;
        const pointerPosY = event.clientY - offsetTop;
        const top = pointerPosY < distance;
        const bottom = pointerPosY > height - distance;
        if (top) {
            // This also can be done with a timeout to keep scrolling while the mouse is
            // in the scrolling zone. (will have smoother behavior)
            scrollEl.scrollBy({ behavior: 'smooth', top: pointerPosY - distance });
        }
        else if (bottom) {
            scrollEl.scrollBy({ behavior: 'smooth', top: distance - (height - pointerPosY) });
        }
    }
    /** single level clone, returning a new object with same top fields. This will share sub objects and arrays */
    static clone(obj) {
        if (obj === null || obj === undefined || typeof (obj) !== 'object') {
            return obj;
        }
        // return Object.assign({}, obj);
        if (obj instanceof Array) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return [...obj];
        }
        return { ...obj };
    }
    /**
     * Recursive clone version that returns a full copy, checking for nested objects and arrays ONLY.
     * Note: this will use as-is any key starting with double __ (and not copy inside) some lib have circular dependencies.
     */
    static cloneDeep(obj) {
        // list of fields we will skip during cloneDeep (nested objects, other internal)
        const skipFields = ['parentGrid', 'el', 'grid', 'subGrid', 'engine'];
        // return JSON.parse(JSON.stringify(obj)); // doesn't work with date format ?
        const ret = Utils.clone(obj);
        for (const key in ret) {
            // NOTE: we don't support function/circular dependencies so skip those properties for now...
            if (ret.hasOwnProperty(key) && typeof (ret[key]) === 'object' && key.substring(0, 2) !== '__' && !skipFields.find(k => k === key)) {
                ret[key] = Utils.cloneDeep(obj[key]);
            }
        }
        return ret;
    }
    /** deep clone the given HTML node, removing teh unique id field */
    static cloneNode(el) {
        const node = el.cloneNode(true);
        node.removeAttribute('id');
        return node;
    }
    static appendTo(el, parent) {
        let parentNode;
        if (typeof parent === 'string') {
            parentNode = Utils.getElement(parent);
        }
        else {
            parentNode = parent;
        }
        if (parentNode) {
            parentNode.appendChild(el);
        }
    }
    // public static setPositionRelative(el: HTMLElement): void {
    //   if (!(/^(?:r|a|f)/).test(getComputedStyle(el).position)) {
    //     el.style.position = "relative";
    //   }
    // }
    static addElStyles(el, styles) {
        if (styles instanceof Object) {
            for (const s in styles) {
                if (styles.hasOwnProperty(s)) {
                    if (Array.isArray(styles[s])) {
                        // support fallback value
                        styles[s].forEach(val => {
                            el.style[s] = val;
                        });
                    }
                    else {
                        el.style[s] = styles[s];
                    }
                }
            }
        }
    }
    static initEvent(e, info) {
        const evt = { type: info.type };
        const obj = {
            button: 0,
            which: 0,
            buttons: 1,
            bubbles: true,
            cancelable: true,
            target: info.target ? info.target : e.target
        };
        ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].forEach(p => evt[p] = e[p]); // keys
        ['pageX', 'pageY', 'clientX', 'clientY', 'screenX', 'screenY'].forEach(p => evt[p] = e[p]); // point info
        return { ...evt, ...obj };
    }
    /** copies the MouseEvent (or convert Touch) properties and sends it as another event to the given target */
    static simulateMouseEvent(e, simulatedType, target) {
        const me = e;
        const simulatedEvent = new MouseEvent(simulatedType, {
            bubbles: true,
            composed: true,
            cancelable: true,
            view: window,
            detail: 1,
            screenX: e.screenX,
            screenY: e.screenY,
            clientX: e.clientX,
            clientY: e.clientY,
            ctrlKey: me.ctrlKey ?? false,
            altKey: me.altKey ?? false,
            shiftKey: me.shiftKey ?? false,
            metaKey: me.metaKey ?? false,
            button: 0,
            relatedTarget: e.target
        });
        (target || e.target).dispatchEvent(simulatedEvent);
    }
    /**
     * defines an element that is used to get the offset and scale from grid transforms
     * returns the scale and offsets from said element
    */
    static getValuesFromTransformedElement(parent) {
        const transformReference = document.createElement('div');
        Utils.addElStyles(transformReference, {
            opacity: '0',
            position: 'fixed',
            top: 0 + 'px',
            left: 0 + 'px',
            width: '1px',
            height: '1px',
            zIndex: '-999999',
        });
        parent.appendChild(transformReference);
        const transformValues = transformReference.getBoundingClientRect();
        parent.removeChild(transformReference);
        transformReference.remove();
        return {
            xScale: 1 / transformValues.width,
            yScale: 1 / transformValues.height,
            xOffset: transformValues.left,
            yOffset: transformValues.top,
        };
    }
    /** swap the given object 2 field values */
    static swap(o, a, b) {
        if (!o)
            return;
        const tmp = o[a];
        o[a] = o[b];
        o[b] = tmp;
    }
    /** returns true if event is inside the given element rectangle */
    // Note: Safari Mac has null event.relatedTarget which causes #1684 so check if DragEvent is inside the coordinates instead
    //    Utils.el.contains(event.relatedTarget as HTMLElement)
    // public static inside(e: MouseEvent, el: HTMLElement): boolean {
    //   // srcElement, toElement, target: all set to placeholder when leaving simple grid, so we can't use that (Chrome)
    //   const target: HTMLElement = e.relatedTarget || (e as any).fromElement;
    //   if (!target) {
    //     const { bottom, left, right, top } = el.getBoundingClientRect();
    //     return (e.x < right && e.x > left && e.y < bottom && e.y > top);
    //   }
    //   return el.contains(target);
    // }
    /** true if the item can be rotated (checking for prop, not space available) */
    static canBeRotated(n) {
        return !(!n || n.w === n.h || n.locked || n.noResize || n.grid?.opts.disableResize || (n.minW && n.minW === n.maxW) || (n.minH && n.minH === n.maxH));
    }
}
//# sourceMappingURL=utils.js.map