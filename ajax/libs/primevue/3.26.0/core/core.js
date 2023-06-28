this.primevue = this.primevue || {};
this.primevue.utils = (function (exports) {
    'use strict';

    var DomHandler = {
        innerWidth(el) {
            if (el) {
                let width = el.offsetWidth;
                let style = getComputedStyle(el);

                width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

                return width;
            }

            return 0;
        },

        width(el) {
            if (el) {
                let width = el.offsetWidth;
                let style = getComputedStyle(el);

                width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);

                return width;
            }

            return 0;
        },

        getWindowScrollTop() {
            let doc = document.documentElement;

            return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        },

        getWindowScrollLeft() {
            let doc = document.documentElement;

            return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        },

        getOuterWidth(el, margin) {
            if (el) {
                let width = el.offsetWidth;

                if (margin) {
                    let style = getComputedStyle(el);

                    width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                }

                return width;
            }

            return 0;
        },

        getOuterHeight(el, margin) {
            if (el) {
                let height = el.offsetHeight;

                if (margin) {
                    let style = getComputedStyle(el);

                    height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
                }

                return height;
            }

            return 0;
        },

        getClientHeight(el, margin) {
            if (el) {
                let height = el.clientHeight;

                if (margin) {
                    let style = getComputedStyle(el);

                    height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
                }

                return height;
            }

            return 0;
        },

        getViewport() {
            let win = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                w = win.innerWidth || e.clientWidth || g.clientWidth,
                h = win.innerHeight || e.clientHeight || g.clientHeight;

            return { width: w, height: h };
        },

        getOffset(el) {
            if (el) {
                let rect = el.getBoundingClientRect();

                return {
                    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
                    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0)
                };
            }

            return {
                top: 'auto',
                left: 'auto'
            };
        },

        index(element) {
            if (element) {
                let children = element.parentNode.childNodes;
                let num = 0;

                for (let i = 0; i < children.length; i++) {
                    if (children[i] === element) return num;
                    if (children[i].nodeType === 1) num++;
                }
            }

            return -1;
        },

        addMultipleClasses(element, className) {
            if (element && className) {
                if (element.classList) {
                    let styles = className.split(' ');

                    for (let i = 0; i < styles.length; i++) {
                        element.classList.add(styles[i]);
                    }
                } else {
                    let styles = className.split(' ');

                    for (let i = 0; i < styles.length; i++) {
                        element.className += ' ' + styles[i];
                    }
                }
            }
        },

        addClass(element, className) {
            if (element && className) {
                if (element.classList) element.classList.add(className);
                else element.className += ' ' + className;
            }
        },

        removeClass(element, className) {
            if (element && className) {
                if (element.classList) element.classList.remove(className);
                else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        },

        hasClass(element, className) {
            if (element) {
                if (element.classList) return element.classList.contains(className);
                else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
            }

            return false;
        },

        find(element, selector) {
            return this.isElement(element) ? element.querySelectorAll(selector) : [];
        },

        findSingle(element, selector) {
            return this.isElement(element) ? element.querySelector(selector) : null;
        },

        getHeight(el) {
            if (el) {
                let height = el.offsetHeight;
                let style = getComputedStyle(el);

                height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

                return height;
            }

            return 0;
        },

        getWidth(el) {
            if (el) {
                let width = el.offsetWidth;
                let style = getComputedStyle(el);

                width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

                return width;
            }

            return 0;
        },

        absolutePosition(element, target) {
            if (element) {
                let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
                let elementOuterHeight = elementDimensions.height;
                let elementOuterWidth = elementDimensions.width;
                let targetOuterHeight = target.offsetHeight;
                let targetOuterWidth = target.offsetWidth;
                let targetOffset = target.getBoundingClientRect();
                let windowScrollTop = this.getWindowScrollTop();
                let windowScrollLeft = this.getWindowScrollLeft();
                let viewport = this.getViewport();
                let top, left;

                if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
                    top = targetOffset.top + windowScrollTop - elementOuterHeight;
                    element.style.transformOrigin = 'bottom';

                    if (top < 0) {
                        top = windowScrollTop;
                    }
                } else {
                    top = targetOuterHeight + targetOffset.top + windowScrollTop;
                    element.style.transformOrigin = 'top';
                }

                if (targetOffset.left + elementOuterWidth > viewport.width) left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
                else left = targetOffset.left + windowScrollLeft;

                element.style.top = top + 'px';
                element.style.left = left + 'px';
            }
        },

        relativePosition(element, target) {
            if (element) {
                let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
                const targetHeight = target.offsetHeight;
                const targetOffset = target.getBoundingClientRect();
                const viewport = this.getViewport();
                let top, left;

                if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
                    top = -1 * elementDimensions.height;
                    element.style.transformOrigin = 'bottom';

                    if (targetOffset.top + top < 0) {
                        top = -1 * targetOffset.top;
                    }
                } else {
                    top = targetHeight;
                    element.style.transformOrigin = 'top';
                }

                if (elementDimensions.width > viewport.width) {
                    // element wider then viewport and cannot fit on screen (align at left side of viewport)
                    left = targetOffset.left * -1;
                } else if (targetOffset.left + elementDimensions.width > viewport.width) {
                    // element wider then viewport but can be fit on screen (align at right side of viewport)
                    left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
                } else {
                    // element fits on screen (align with target)
                    left = 0;
                }

                element.style.top = top + 'px';
                element.style.left = left + 'px';
            }
        },

        getParents(element, parents = []) {
            return element['parentNode'] === null ? parents : this.getParents(element.parentNode, parents.concat([element.parentNode]));
        },

        getScrollableParents(element) {
            let scrollableParents = [];

            if (element) {
                let parents = this.getParents(element);
                const overflowRegex = /(auto|scroll)/;

                const overflowCheck = (node) => {
                    let styleDeclaration = window['getComputedStyle'](node, null);

                    return overflowRegex.test(styleDeclaration.getPropertyValue('overflow')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowX')) || overflowRegex.test(styleDeclaration.getPropertyValue('overflowY'));
                };

                for (let parent of parents) {
                    let scrollSelectors = parent.nodeType === 1 && parent.dataset['scrollselectors'];

                    if (scrollSelectors) {
                        let selectors = scrollSelectors.split(',');

                        for (let selector of selectors) {
                            let el = this.findSingle(parent, selector);

                            if (el && overflowCheck(el)) {
                                scrollableParents.push(el);
                            }
                        }
                    }

                    if (parent.nodeType !== 9 && overflowCheck(parent)) {
                        scrollableParents.push(parent);
                    }
                }
            }

            return scrollableParents;
        },

        getHiddenElementOuterHeight(element) {
            if (element) {
                element.style.visibility = 'hidden';
                element.style.display = 'block';
                let elementHeight = element.offsetHeight;

                element.style.display = 'none';
                element.style.visibility = 'visible';

                return elementHeight;
            }

            return 0;
        },

        getHiddenElementOuterWidth(element) {
            if (element) {
                element.style.visibility = 'hidden';
                element.style.display = 'block';
                let elementWidth = element.offsetWidth;

                element.style.display = 'none';
                element.style.visibility = 'visible';

                return elementWidth;
            }

            return 0;
        },

        getHiddenElementDimensions(element) {
            if (element) {
                let dimensions = {};

                element.style.visibility = 'hidden';
                element.style.display = 'block';
                dimensions.width = element.offsetWidth;
                dimensions.height = element.offsetHeight;
                element.style.display = 'none';
                element.style.visibility = 'visible';

                return dimensions;
            }

            return 0;
        },

        fadeIn(element, duration) {
            if (element) {
                element.style.opacity = 0;

                let last = +new Date();
                let opacity = 0;

                let tick = function () {
                    opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
                    element.style.opacity = opacity;
                    last = +new Date();

                    if (+opacity < 1) {
                        (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
                    }
                };

                tick();
            }
        },

        fadeOut(element, ms) {
            if (element) {
                let opacity = 1,
                    interval = 50,
                    duration = ms,
                    gap = interval / duration;

                let fading = setInterval(() => {
                    opacity -= gap;

                    if (opacity <= 0) {
                        opacity = 0;
                        clearInterval(fading);
                    }

                    element.style.opacity = opacity;
                }, interval);
            }
        },

        getUserAgent() {
            return navigator.userAgent;
        },

        appendChild(element, target) {
            if (this.isElement(target)) target.appendChild(element);
            else if (target.el && target.elElement) target.elElement.appendChild(element);
            else throw new Error('Cannot append ' + target + ' to ' + element);
        },

        isElement(obj) {
            return typeof HTMLElement === 'object' ? obj instanceof HTMLElement : obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        },

        scrollInView(container, item) {
            let borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
            let borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
            let paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
            let paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
            let containerRect = container.getBoundingClientRect();
            let itemRect = item.getBoundingClientRect();
            let offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
            let scroll = container.scrollTop;
            let elementHeight = container.clientHeight;
            let itemHeight = this.getOuterHeight(item);

            if (offset < 0) {
                container.scrollTop = scroll + offset;
            } else if (offset + itemHeight > elementHeight) {
                container.scrollTop = scroll + offset - elementHeight + itemHeight;
            }
        },

        clearSelection() {
            if (window.getSelection) {
                if (window.getSelection().empty) {
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                    window.getSelection().removeAllRanges();
                }
            } else if (document['selection'] && document['selection'].empty) {
                try {
                    document['selection'].empty();
                } catch (error) {
                    //ignore IE bug
                }
            }
        },

        getSelection() {
            if (window.getSelection) return window.getSelection().toString();
            else if (document.getSelection) return document.getSelection().toString();
            else if (document['selection']) return document['selection'].createRange().text;

            return null;
        },

        calculateScrollbarWidth() {
            if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;

            let scrollDiv = document.createElement('div');

            scrollDiv.className = 'p-scrollbar-measure';
            document.body.appendChild(scrollDiv);

            let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

            document.body.removeChild(scrollDiv);

            this.calculatedScrollbarWidth = scrollbarWidth;

            return scrollbarWidth;
        },

        getBrowser() {
            if (!this.browser) {
                let matched = this.resolveUserAgent();

                this.browser = {};

                if (matched.browser) {
                    this.browser[matched.browser] = true;
                    this.browser['version'] = matched.version;
                }

                if (this.browser['chrome']) {
                    this.browser['webkit'] = true;
                } else if (this.browser['webkit']) {
                    this.browser['safari'] = true;
                }
            }

            return this.browser;
        },

        resolveUserAgent() {
            let ua = navigator.userAgent.toLowerCase();
            let match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || (ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) || [];

            return {
                browser: match[1] || '',
                version: match[2] || '0'
            };
        },

        isVisible(element) {
            return element && element.offsetParent != null;
        },

        invokeElementMethod(element, methodName, args) {
            element[methodName].apply(element, args);
        },

        isExist(element) {
            return !!(element !== null && typeof element !== 'undefined' && element.nodeName && element.parentNode);
        },

        isClient() {
            return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
        },

        focus(el, options) {
            el && document.activeElement !== el && el.focus(options);
        },

        isFocusableElement(element, selector = '') {
            return this.isElement(element)
                ? element.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`)
                : false;
        },

        getFocusableElements(element, selector = '') {
            let focusableElements = this.find(
                element,
                `button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${selector}`
            );

            let visibleFocusableElements = [];

            for (let focusableElement of focusableElements) {
                if (getComputedStyle(focusableElement).display != 'none' && getComputedStyle(focusableElement).visibility != 'hidden') visibleFocusableElements.push(focusableElement);
            }

            return visibleFocusableElements;
        },

        getFirstFocusableElement(element, selector) {
            const focusableElements = this.getFocusableElements(element, selector);

            return focusableElements.length > 0 ? focusableElements[0] : null;
        },

        getLastFocusableElement(element, selector) {
            const focusableElements = this.getFocusableElements(element, selector);

            return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
        },

        getNextFocusableElement(container, element, selector) {
            const focusableElements = this.getFocusableElements(container, selector);
            const index = focusableElements.length > 0 ? focusableElements.findIndex((el) => el === element) : -1;
            const nextIndex = index > -1 && focusableElements.length >= index + 1 ? index + 1 : -1;

            return nextIndex > -1 ? focusableElements[nextIndex] : null;
        },

        isClickable(element) {
            if (element) {
                const targetNode = element.nodeName;
                const parentNode = element.parentElement && element.parentElement.nodeName;

                return (
                    targetNode === 'INPUT' ||
                    targetNode === 'TEXTAREA' ||
                    targetNode === 'BUTTON' ||
                    targetNode === 'A' ||
                    parentNode === 'INPUT' ||
                    parentNode === 'TEXTAREA' ||
                    parentNode === 'BUTTON' ||
                    parentNode === 'A' ||
                    !!element.closest('.p-button, .p-checkbox, .p-radiobutton')
                );
            }

            return false;
        },

        applyStyle(element, style) {
            if (typeof style === 'string') {
                element.style.cssText = style;
            } else {
                for (let prop in style) {
                    element.style[prop] = style[prop];
                }
            }
        },

        isIOS() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
        },

        isAndroid() {
            return /(android)/i.test(navigator.userAgent);
        },

        isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        },

        exportCSV(csv, filename) {
            let blob = new Blob([csv], {
                type: 'application/csv;charset=utf-8;'
            });

            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob(blob, filename + '.csv');
            } else {
                let link = document.createElement('a');

                if (link.download !== undefined) {
                    link.setAttribute('href', URL.createObjectURL(blob));
                    link.setAttribute('download', filename + '.csv');
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    csv = 'data:text/csv;charset=utf-8,' + csv;
                    window.open(encodeURI(csv));
                }
            }
        }
    };

    class ConnectedOverlayScrollHandler {
        constructor(element, listener = () => {}) {
            this.element = element;
            this.listener = listener;
        }

        bindScrollListener() {
            this.scrollableParents = DomHandler.getScrollableParents(this.element);

            for (let i = 0; i < this.scrollableParents.length; i++) {
                this.scrollableParents[i].addEventListener('scroll', this.listener);
            }
        }

        unbindScrollListener() {
            if (this.scrollableParents) {
                for (let i = 0; i < this.scrollableParents.length; i++) {
                    this.scrollableParents[i].removeEventListener('scroll', this.listener);
                }
            }
        }

        destroy() {
            this.unbindScrollListener();
            this.element = null;
            this.listener = null;
            this.scrollableParents = null;
        }
    }

    function primebus() {
        const allHandlers = new Map();

        return {
            on(type, handler) {
                let handlers = allHandlers.get(type);

                if (!handlers) handlers = [handler];
                else handlers.push(handler);

                allHandlers.set(type, handlers);
            },

            off(type, handler) {
                let handlers = allHandlers.get(type);

                if (handlers) {
                    handlers.splice(handlers.indexOf(handler) >>> 0, 1);
                }
            },

            emit(type, evt) {
                let handlers = allHandlers.get(type);

                if (handlers) {
                    handlers.slice().map((handler) => {
                        handler(evt);
                    });
                }
            }
        };
    }

    var ObjectUtils = {
        equals(obj1, obj2, field) {
            if (field) return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
            else return this.deepEquals(obj1, obj2);
        },

        deepEquals(a, b) {
            if (a === b) return true;

            if (a && b && typeof a == 'object' && typeof b == 'object') {
                var arrA = Array.isArray(a),
                    arrB = Array.isArray(b),
                    i,
                    length,
                    key;

                if (arrA && arrB) {
                    length = a.length;
                    if (length != b.length) return false;
                    for (i = length; i-- !== 0; ) if (!this.deepEquals(a[i], b[i])) return false;

                    return true;
                }

                if (arrA != arrB) return false;

                var dateA = a instanceof Date,
                    dateB = b instanceof Date;

                if (dateA != dateB) return false;
                if (dateA && dateB) return a.getTime() == b.getTime();

                var regexpA = a instanceof RegExp,
                    regexpB = b instanceof RegExp;

                if (regexpA != regexpB) return false;
                if (regexpA && regexpB) return a.toString() == b.toString();

                var keys = Object.keys(a);

                length = keys.length;

                if (length !== Object.keys(b).length) return false;

                for (i = length; i-- !== 0; ) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

                for (i = length; i-- !== 0; ) {
                    key = keys[i];
                    if (!this.deepEquals(a[key], b[key])) return false;
                }

                return true;
            }

            return a !== a && b !== b;
        },

        resolveFieldData(data, field) {
            if (data && Object.keys(data).length && field) {
                if (this.isFunction(field)) {
                    return field(data);
                } else if (field.indexOf('.') === -1) {
                    return data[field];
                } else {
                    let fields = field.split('.');
                    let value = data;

                    for (var i = 0, len = fields.length; i < len; ++i) {
                        if (value == null) {
                            return null;
                        }

                        value = value[fields[i]];
                    }

                    return value;
                }
            } else {
                return null;
            }
        },

        isFunction(obj) {
            return !!(obj && obj.constructor && obj.call && obj.apply);
        },

        getItemValue(obj, ...params) {
            return this.isFunction(obj) ? obj(...params) : obj;
        },

        filter(value, fields, filterValue) {
            var filteredItems = [];

            if (value) {
                for (let item of value) {
                    for (let field of fields) {
                        if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                            filteredItems.push(item);
                            break;
                        }
                    }
                }
            }

            return filteredItems;
        },

        reorderArray(value, from, to) {
            if (value && from !== to) {
                if (to >= value.length) {
                    to %= value.length;
                    from %= value.length;
                }

                value.splice(to, 0, value.splice(from, 1)[0]);
            }
        },

        findIndexInList(value, list) {
            let index = -1;

            if (list) {
                for (let i = 0; i < list.length; i++) {
                    if (list[i] === value) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        },

        contains(value, list) {
            if (value != null && list && list.length) {
                for (let val of list) {
                    if (this.equals(value, val)) return true;
                }
            }

            return false;
        },

        insertIntoOrderedArray(item, index, arr, sourceArr) {
            if (arr.length > 0) {
                let injected = false;

                for (let i = 0; i < arr.length; i++) {
                    let currentItemIndex = this.findIndexInList(arr[i], sourceArr);

                    if (currentItemIndex > index) {
                        arr.splice(i, 0, item);
                        injected = true;
                        break;
                    }
                }

                if (!injected) {
                    arr.push(item);
                }
            } else {
                arr.push(item);
            }
        },

        removeAccents(str) {
            if (str && str.search(/[\xC0-\xFF]/g) > -1) {
                str = str
                    .replace(/[\xC0-\xC5]/g, 'A')
                    .replace(/[\xC6]/g, 'AE')
                    .replace(/[\xC7]/g, 'C')
                    .replace(/[\xC8-\xCB]/g, 'E')
                    .replace(/[\xCC-\xCF]/g, 'I')
                    .replace(/[\xD0]/g, 'D')
                    .replace(/[\xD1]/g, 'N')
                    .replace(/[\xD2-\xD6\xD8]/g, 'O')
                    .replace(/[\xD9-\xDC]/g, 'U')
                    .replace(/[\xDD]/g, 'Y')
                    .replace(/[\xDE]/g, 'P')
                    .replace(/[\xE0-\xE5]/g, 'a')
                    .replace(/[\xE6]/g, 'ae')
                    .replace(/[\xE7]/g, 'c')
                    .replace(/[\xE8-\xEB]/g, 'e')
                    .replace(/[\xEC-\xEF]/g, 'i')
                    .replace(/[\xF1]/g, 'n')
                    .replace(/[\xF2-\xF6\xF8]/g, 'o')
                    .replace(/[\xF9-\xFC]/g, 'u')
                    .replace(/[\xFE]/g, 'p')
                    .replace(/[\xFD\xFF]/g, 'y');
            }

            return str;
        },

        getVNodeProp(vnode, prop) {
            let props = vnode.props;

            if (props) {
                let kebapProp = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
                let propName = Object.prototype.hasOwnProperty.call(props, kebapProp) ? kebapProp : prop;

                return vnode.type.props[prop].type === Boolean && props[propName] === '' ? true : props[propName];
            }

            return null;
        },

        isEmpty(value) {
            return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0) || (!(value instanceof Date) && typeof value === 'object' && Object.keys(value).length === 0);
        },

        isNotEmpty(value) {
            return !this.isEmpty(value);
        },

        isPrintableCharacter(char = '') {
            return this.isNotEmpty(char) && char.length === 1 && char.match(/\S| /);
        },

        /**
         * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
         * https://caniuse.com/mdn-javascript_builtins_array_findlast
         */
        findLast(arr, callback) {
            let item;

            if (this.isNotEmpty(arr)) {
                try {
                    item = arr.findLast(callback);
                } catch {
                    item = [...arr].reverse().find(callback);
                }
            }

            return item;
        },

        /**
         * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
         * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
         */
        findLastIndex(arr, callback) {
            let index = -1;

            if (this.isNotEmpty(arr)) {
                try {
                    index = arr.findLastIndex(callback);
                } catch {
                    index = arr.lastIndexOf([...arr].reverse().find(callback));
                }
            }

            return index;
        }
    };

    var lastId = 0;

    function UniqueComponentId (prefix = 'pv_id_') {
        lastId++;

        return `${prefix}${lastId}`;
    }

    function handler() {
        let zIndexes = [];

        const generateZIndex = (key, autoZIndex, baseZIndex = 999) => {
            const lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
            const newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;

            zIndexes.push({ key, value: newZIndex });

            return newZIndex;
        };

        const revertZIndex = (zIndex) => {
            zIndexes = zIndexes.filter((obj) => obj.value !== zIndex);
        };

        const getCurrentZIndex = (key, autoZIndex) => {
            return getLastZIndex(key, autoZIndex).value;
        };

        const getLastZIndex = (key, autoZIndex, baseZIndex = 0) => {
            return [...zIndexes].reverse().find((obj) => (autoZIndex ? true : obj.key === key)) || { key, value: baseZIndex };
        };

        const getZIndex = (el) => {
            return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
        };

        return {
            get: getZIndex,
            set: (key, el, baseZIndex) => {
                if (el) {
                    el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
                }
            },
            clear: (el) => {
                if (el) {
                    revertZIndex(getZIndex(el));
                    el.style.zIndex = '';
                }
            },
            getCurrent: (key) => getCurrentZIndex(key, true)
        };
    }

    var ZIndexUtils = handler();

    exports.ConnectedOverlayScrollHandler = ConnectedOverlayScrollHandler;
    exports.DomHandler = DomHandler;
    exports.EventBus = primebus;
    exports.ObjectUtils = ObjectUtils;
    exports.UniqueComponentId = UniqueComponentId;
    exports.ZIndexUtils = ZIndexUtils;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});

this.primevue = this.primevue || {};
this.primevue.api = (function (exports, utils) {
    'use strict';

    const FilterMatchMode = {
        STARTS_WITH: 'startsWith',
        CONTAINS: 'contains',
        NOT_CONTAINS: 'notContains',
        ENDS_WITH: 'endsWith',
        EQUALS: 'equals',
        NOT_EQUALS: 'notEquals',
        IN: 'in',
        LESS_THAN: 'lt',
        LESS_THAN_OR_EQUAL_TO: 'lte',
        GREATER_THAN: 'gt',
        GREATER_THAN_OR_EQUAL_TO: 'gte',
        BETWEEN: 'between',
        DATE_IS: 'dateIs',
        DATE_IS_NOT: 'dateIsNot',
        DATE_BEFORE: 'dateBefore',
        DATE_AFTER: 'dateAfter'
    };

    const FilterOperator = {
        AND: 'and',
        OR: 'or'
    };

    const FilterService = {
        filter(value, fields, filterValue, filterMatchMode, filterLocale) {
            let filteredItems = [];

            if (value) {
                for (let item of value) {
                    for (let field of fields) {
                        let fieldValue = utils.ObjectUtils.resolveFieldData(item, field);

                        if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                            filteredItems.push(item);
                            break;
                        }
                    }
                }
            }

            return filteredItems;
        },
        filters: {
            startsWith(value, filter, filterLocale) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                let filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                let stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

                return stringValue.slice(0, filterValue.length) === filterValue;
            },
            contains(value, filter, filterLocale) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                let filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                let stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

                return stringValue.indexOf(filterValue) !== -1;
            },
            notContains(value, filter, filterLocale) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                let filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                let stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

                return stringValue.indexOf(filterValue) === -1;
            },
            endsWith(value, filter, filterLocale) {
                if (filter === undefined || filter === null || filter.trim() === '') {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                let filterValue = utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
                let stringValue = utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);

                return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
            },
            equals(value, filter, filterLocale) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                if (value.getTime && filter.getTime) return value.getTime() === filter.getTime();
                else return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            },
            notEquals(value, filter, filterLocale) {
                if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
                    return false;
                }

                if (value === undefined || value === null) {
                    return true;
                }

                if (value.getTime && filter.getTime) return value.getTime() !== filter.getTime();
                else return utils.ObjectUtils.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != utils.ObjectUtils.removeAccents(filter.toString()).toLocaleLowerCase(filterLocale);
            },
            in(value, filter) {
                if (filter === undefined || filter === null || filter.length === 0) {
                    return true;
                }

                for (let i = 0; i < filter.length; i++) {
                    if (utils.ObjectUtils.equals(value, filter[i])) {
                        return true;
                    }
                }

                return false;
            },
            between(value, filter) {
                if (filter == null || filter[0] == null || filter[1] == null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                if (value.getTime) return filter[0].getTime() <= value.getTime() && value.getTime() <= filter[1].getTime();
                else return filter[0] <= value && value <= filter[1];
            },
            lt(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                if (value.getTime && filter.getTime) return value.getTime() < filter.getTime();
                else return value < filter;
            },
            lte(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                if (value.getTime && filter.getTime) return value.getTime() <= filter.getTime();
                else return value <= filter;
            },
            gt(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                if (value.getTime && filter.getTime) return value.getTime() > filter.getTime();
                else return value > filter;
            },
            gte(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                if (value.getTime && filter.getTime) return value.getTime() >= filter.getTime();
                else return value >= filter;
            },
            dateIs(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                return value.toDateString() === filter.toDateString();
            },
            dateIsNot(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                return value.toDateString() !== filter.toDateString();
            },
            dateBefore(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                return value.getTime() < filter.getTime();
            },
            dateAfter(value, filter) {
                if (filter === undefined || filter === null) {
                    return true;
                }

                if (value === undefined || value === null) {
                    return false;
                }

                return value.getTime() > filter.getTime();
            }
        },
        register(rule, fn) {
            this.filters[rule] = fn;
        }
    };

    const PrimeIcons = {
        ALIGN_CENTER: 'pi pi-align-center',
        ALIGN_JUSTIFY: 'pi pi-align-justify',
        ALIGN_LEFT: 'pi pi-align-left',
        ALIGN_RIGHT: 'pi pi-align-right',
        AMAZON: 'pi pi-amazon',
        ANDROID: 'pi pi-android',
        ANGLE_DOUBLE_DOWN: 'pi pi-angle-double-down',
        ANGLE_DOUBLE_LEFT: 'pi pi-angle-double-left',
        ANGLE_DOUBLE_RIGHT: 'pi pi-angle-double-right',
        ANGLE_DOUBLE_UP: 'pi pi-angle-double-up',
        ANGLE_DOWN: 'pi pi-angle-down',
        ANGLE_LEFT: 'pi pi-angle-left',
        ANGLE_RIGHT: 'pi pi-angle-right',
        ANGLE_UP: 'pi pi-angle-up',
        APPLE: 'pi pi-apple',
        ARROW_CIRCLE_DOWN: 'pi pi-arrow-circle-down',
        ARROW_CIRCLE_LEFT: 'pi pi-arrow-circle-left',
        ARROW_CIRCLE_RIGHT: 'pi pi-arrow-circle-right',
        ARROW_CIRCLE_UP: 'pi pi-arrow-circle-up',
        ARROW_DOWN: 'pi pi-arrow-down',
        ARROW_DOWN_LEFT: 'pi pi-arrow-down-left',
        ARROW_DOWN_RIGHT: 'pi pi-arrow-down-right',
        ARROW_LEFT: 'pi pi-arrow-left',
        ARROW_RIGHT: 'pi pi-arrow-right',
        ARROW_RIGHT_ARROW_LEFT: 'pi pi-arrow-right-arrow-left',
        ARROW_UP: 'pi pi-arrow-up',
        ARROW_UP_LEFT: 'pi pi-arrow-up-left',
        ARROW_UP_RIGHT: 'pi pi-arrow-up-right',
        ARROW_H: 'pi pi-arrows-h',
        ARROW_V: 'pi pi-arrows-v',
        ARROW_A: 'pi pi-arrows-alt',
        AT: 'pi pi-at',
        BACKWARD: 'pi pi-backward',
        BAN: 'pi pi-ban',
        BARS: 'pi pi-bars',
        BELL: 'pi pi-bell',
        BITCOIN: 'pi pi-bitcoin',
        BOLT: 'pi pi-bolt',
        BOOK: 'pi pi-book',
        BOOKMARK: 'pi pi-bookmark',
        BOOKMARK_FILL: 'pi pi-bookmark-fill',
        BOX: 'pi pi-box',
        BRIEFCASE: 'pi pi-briefcase',
        BUILDING: 'pi pi-building',
        CALENDAR: 'pi pi-calendar',
        CALENDAR_MINUS: 'pi pi-calendar-minus',
        CALENDAR_PLUS: 'pi pi-calendar-plus',
        CALENDAR_TIMES: 'pi pi-calendar-times',
        CALCULATOR: 'pi pi-calculator',
        CAMERA: 'pi pi-camera',
        CAR: 'pi pi-car',
        CARET_DOWN: 'pi pi-caret-down',
        CARET_LEFT: 'pi pi-caret-left',
        CARET_RIGHT: 'pi pi-caret-right',
        CARET_UP: 'pi pi-caret-up',
        CART_PLUS: 'pi pi-cart-plus',
        CHART_BAR: 'pi pi-chart-bar',
        CHART_LINE: 'pi pi-chart-line',
        CHART_PIE: 'pi pi-chart-pie',
        CHECK: 'pi pi-check',
        CHECK_CIRCLE: 'pi pi-check-circle',
        CHECK_SQUARE: 'pi pi-check-square',
        CHEVRON_CIRCLE_DOWN: 'pi pi-chevron-circle-down',
        CHEVRON_CIRCLE_LEFT: 'pi pi-chevron-circle-left',
        CHEVRON_CIRCLE_RIGHT: 'pi pi-chevron-circle-right',
        CHEVRON_CIRCLE_UP: 'pi pi-chevron-circle-up',
        CHEVRON_DOWN: 'pi pi-chevron-down',
        CHEVRON_LEFT: 'pi pi-chevron-left',
        CHEVRON_RIGHT: 'pi pi-chevron-right',
        CHEVRON_UP: 'pi pi-chevron-up',
        CIRCLE: 'pi pi-circle',
        CIRCLE_FILL: 'pi pi-circle-fill',
        CLOCK: 'pi pi-clock',
        CLONE: 'pi pi-clone',
        CLOUD: 'pi pi-cloud',
        CLOUD_DOWNLOAD: 'pi pi-cloud-download',
        CLOUD_UPLOAD: 'pi pi-cloud-upload',
        CODE: 'pi pi-code',
        COG: 'pi pi-cog',
        COMMENT: 'pi pi-comment',
        COMMENTS: 'pi pi-comments',
        COMPASS: 'pi pi-compass',
        COPY: 'pi pi-copy',
        CREDIT_CARD: 'pi pi-credit-card',
        DATABASE: 'pi pi-database',
        DELETELEFT: 'pi pi-delete-left',
        DESKTOP: 'pi pi-desktop',
        DIRECTIONS: 'pi pi-directions',
        DIRECTIONS_ALT: 'pi pi-directions-alt',
        DISCORD: 'pi pi-discord',
        DOLLAR: 'pi pi-dollar',
        DOWNLOAD: 'pi pi-download',
        EJECT: 'pi pi-eject',
        ELLIPSIS_H: 'pi pi-ellipsis-h',
        ELLIPSIS_V: 'pi pi-ellipsis-v',
        ENVELOPE: 'pi pi-envelope',
        ERASER: 'pi pi-eraser',
        EURO: 'pi pi-euro',
        EXCLAMATION_CIRCLE: 'pi pi-exclamation-circle',
        EXCLAMATION_TRIANGLE: 'pi pi-exclamation-triangle',
        EXTERNAL_LINK: 'pi pi-external-link',
        EYE: 'pi pi-eye',
        EYE_SLASH: 'pi pi-eye-slash',
        FACEBOOK: 'pi pi-facebook',
        FAST_BACKWARD: 'pi pi-fast-backward',
        FAST_FORWARD: 'pi pi-fast-forward',
        FILE: 'pi pi-file',
        FILE_EDIT: 'pi pi-file-edit',
        FILE_EXCEL: 'pi pi-file-excel',
        FILE_EXPORT: 'pi pi-file-export',
        FILE_IMPORT: 'pi pi-file-import',
        FILE_PDF: 'pi pi-file-pdf',
        FILE_WORD: 'pi pi-file-word',
        FILTER: 'pi pi-filter',
        FILTER_FILL: 'pi pi-filter-fill',
        FILTER_SLASH: 'pi pi-filter-slash',
        FLAG: 'pi pi-flag',
        FLAG_FILL: 'pi pi-flag-fill',
        FOLDER: 'pi pi-folder',
        FOLDER_OPEN: 'pi pi-folder-open',
        FORWARD: 'pi pi-forward',
        GIFT: 'pi pi-gift',
        GITHUB: 'pi pi-github',
        GLOBE: 'pi pi-globe',
        GOOGLE: 'pi pi-google',
        HASHTAG: 'pi pi-hashtag',
        HEART: 'pi pi-heart',
        HEART_FILL: 'pi pi-heart-fill',
        HISTORY: 'pi pi-history',
        HOURGLASS: 'pi pi-hourglass',
        HOME: 'pi pi-home',
        ID_CARD: 'pi pi-id-card',
        IMAGE: 'pi pi-image',
        IMAGES: 'pi pi-images',
        INBOX: 'pi pi-inbox',
        INFO: 'pi pi-info',
        INFO_CIRCLE: 'pi pi-info-circle',
        INSTAGRAM: 'pi pi-instagram',
        KEY: 'pi pi-key',
        LANGUAGE: 'pi pi-language',
        LINK: 'pi pi-link',
        LINKEDIN: 'pi pi-linkedin',
        LIST: 'pi pi-list',
        LOCK: 'pi pi-lock',
        LOCK_OPEN: 'pi pi-lock-open',
        MAP: 'pi pi-map',
        MAP_MARKER: 'pi pi-map-marker',
        MEGAPHONE: 'pi pi-megaphone',
        MICREPHONE: 'pi pi-microphone',
        MICROSOFT: 'pi pi-microsoft',
        MINUS: 'pi pi-minus',
        MINUS_CIRCLE: 'pi pi-minus-circle',
        MOBILE: 'pi pi-mobile',
        MONEY_BILL: 'pi pi-money-bill',
        MOON: 'pi pi-moon',
        PALETTE: 'pi pi-palette',
        PAPERCLIP: 'pi pi-paperclip',
        PAUSE: 'pi pi-pause',
        PAYPAL: 'pi pi-paypal',
        PENCIL: 'pi pi-pencil',
        PERCENTAGE: 'pi pi-percentage',
        PHONE: 'pi pi-phone',
        PLAY: 'pi pi-play',
        PLUS: 'pi pi-plus',
        PLUS_CIRCLE: 'pi pi-plus-circle',
        POUND: 'pi pi-pound',
        POWER_OFF: 'pi pi-power-off',
        PRIME: 'pi pi-prime',
        PRINT: 'pi pi-print',
        QRCODE: 'pi pi-qrcode',
        QUESTION: 'pi pi-question',
        QUESTION_CIRCLE: 'pi pi-question-circle',
        REDDIT: 'pi pi-reddit',
        REFRESH: 'pi pi-refresh',
        REPLAY: 'pi pi-replay',
        REPLY: 'pi pi-reply',
        SAVE: 'pi pi-save',
        SEARCH: 'pi pi-search',
        SEARCH_MINUS: 'pi pi-search-minus',
        SEARCH_PLUS: 'pi pi-search-plus',
        SEND: 'pi pi-send',
        SERVER: 'pi pi-server',
        SHARE_ALT: 'pi pi-share-alt',
        SHIELD: 'pi pi-shield',
        SHOPPING_BAG: 'pi pi-shopping-bag',
        SHOPPING_CART: 'pi pi-shopping-cart',
        SIGN_IN: 'pi pi-sign-in',
        SIGN_OUT: 'pi pi-sign-out',
        SITEMAP: 'pi pi-sitemap',
        SLACK: 'pi pi-slack',
        SLIDERS_H: 'pi pi-sliders-h',
        SLIDERS_V: 'pi pi-sliders-v',
        SORT: 'pi pi-sort',
        SORT_ALPHA_DOWN: 'pi pi-sort-alpha-down',
        SORT_ALPHA_ALT_DOWN: 'pi pi-sort-alpha-alt-down',
        SORT_ALPHA_UP: 'pi pi-sort-alpha-up',
        SORT_ALPHA_ALT_UP: 'pi pi-sort-alpha-alt-up',
        SORT_ALT: 'pi pi-sort-alt',
        SORT_ALT_SLASH: 'pi pi-sort-slash',
        SORT_AMOUNT_DOWN: 'pi pi-sort-amount-down',
        SORT_AMOUNT_DOWN_ALT: 'pi pi-sort-amount-down-alt',
        SORT_AMOUNT_UP: 'pi pi-sort-amount-up',
        SORT_AMOUNT_UP_ALT: 'pi pi-sort-amount-up-alt',
        SORT_DOWN: 'pi pi-sort-down',
        SORT_NUMERIC_DOWN: 'pi pi-sort-numeric-down',
        SORT_NUMERIC_ALT_DOWN: 'pi pi-sort-numeric-alt-down',
        SORT_NUMERIC_UP: 'pi pi-sort-numeric-up',
        SORT_NUMERIC_ALT_UP: 'pi pi-sort-numeric-alt-up',
        SORT_UP: 'pi pi-sort-up',
        SPINNER: 'pi pi-spinner',
        STAR: 'pi pi-star',
        STAR_FILL: 'pi pi-star-fill',
        STEP_BACKWARD: 'pi pi-step-backward',
        STEP_BACKWARD_ALT: 'pi pi-step-backward-alt',
        STEP_FORWARD: 'pi pi-step-forward',
        STEP_FORWARD_ALT: 'pi pi-step-forward-alt',
        STOP: 'pi pi-stop',
        STOPWATCH: 'pi pi-stop-watch',
        STOP_CIRCLE: 'pi pi-stop-circle',
        SUN: 'pi pi-sun',
        SYNC: 'pi pi-sync',
        TABLE: 'pi pi-table',
        TABLET: 'pi pi-tablet',
        TAG: 'pi pi-tag',
        TAGS: 'pi pi-tags',
        TELEGRAM: 'pi pi-telegram',
        TH_LARGE: 'pi pi-th-large',
        THUMBS_DOWN: 'pi pi-thumbs-down',
        THUMBS_DOWN_FILL: 'pi pi-thumbs-down-fill',
        THUMBS_UP: 'pi pi-thumbs-up',
        THUMBS_UP_FILL: 'pi pi-thumbs-up-fill',
        TICKET: 'pi pi-ticket',
        TIMES: 'pi pi-times',
        TIMES_CIRCLE: 'pi pi-times-circle',
        TRASH: 'pi pi-trash',
        TRUCK: 'pi pi-truck',
        TWITTER: 'pi pi-twitter',
        UNDO: 'pi pi-undo',
        UNLOCK: 'pi pi-unlock',
        UPLOAD: 'pi pi-upload',
        USER: 'pi pi-user',
        USER_EDIT: 'pi pi-user-edit',
        USER_MINUS: 'pi pi-user-minus',
        USER_PLUS: 'pi pi-user-plus',
        USERS: 'pi pi-users',
        VERIFIED: 'pi pi-verified',
        VIDEO: 'pi pi-video',
        VIMEO: 'pi pi-vimeo',
        VOLUME_DOWN: 'pi pi-volume-down',
        VOLUME_OFF: 'pi pi-volume-off',
        VOLUME_UP: 'pi pi-volume-up',
        WALLET: 'pi pi-wallet',
        WHATSAPP: 'pi pi-whatsapp',
        WIFI: 'pi pi-wifi',
        WINDOW_MAXIMIZE: 'pi pi-window-maximize',
        WINDOW_MINIMIZE: 'pi pi-window-minimize',
        WRENCH: 'pi pi-wrench',
        YOUTUBE: 'pi pi-youtube'
    };

    const ToastSeverities = {
        INFO: 'info',
        WARN: 'warn',
        ERROR: 'error',
        SUCCESS: 'success'
    };

    exports.FilterMatchMode = FilterMatchMode;
    exports.FilterOperator = FilterOperator;
    exports.FilterService = FilterService;
    exports.PrimeIcons = PrimeIcons;
    exports.ToastSeverity = ToastSeverities;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, primevue.utils);

this.primevue = this.primevue || {};
this.primevue.config = (function (exports, api, vue) {
    'use strict';

    const defaultOptions = {
        ripple: false,
        inputStyle: 'outlined',
        locale: {
            startsWith: 'Starts with',
            contains: 'Contains',
            notContains: 'Not contains',
            endsWith: 'Ends with',
            equals: 'Equals',
            notEquals: 'Not equals',
            noFilter: 'No Filter',
            lt: 'Less than',
            lte: 'Less than or equal to',
            gt: 'Greater than',
            gte: 'Greater than or equal to',
            dateIs: 'Date is',
            dateIsNot: 'Date is not',
            dateBefore: 'Date is before',
            dateAfter: 'Date is after',
            clear: 'Clear',
            apply: 'Apply',
            matchAll: 'Match All',
            matchAny: 'Match Any',
            addRule: 'Add Rule',
            removeRule: 'Remove Rule',
            accept: 'Yes',
            reject: 'No',
            choose: 'Choose',
            upload: 'Upload',
            cancel: 'Cancel',
            completed: 'Completed',
            pending: 'Pending',
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            chooseYear: 'Choose Year',
            chooseMonth: 'Choose Month',
            chooseDate: 'Choose Date',
            prevDecade: 'Previous Decade',
            nextDecade: 'Next Decade',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            prevMonth: 'Previous Month',
            nextMonth: 'Next Month',
            prevHour: 'Previous Hour',
            nextHour: 'Next Hour',
            prevMinute: 'Previous Minute',
            nextMinute: 'Next Minute',
            prevSecond: 'Previous Second',
            nextSecond: 'Next Second',
            am: 'am',
            pm: 'pm',
            today: 'Today',
            weekHeader: 'Wk',
            firstDayOfWeek: 0,
            dateFormat: 'mm/dd/yy',
            weak: 'Weak',
            medium: 'Medium',
            strong: 'Strong',
            passwordPrompt: 'Enter a password',
            emptyFilterMessage: 'No results found', // @deprecated Use 'emptySearchMessage' option instead.
            searchMessage: '{0} results are available',
            selectionMessage: '{0} items selected',
            emptySelectionMessage: 'No selected item',
            emptySearchMessage: 'No results found',
            emptyMessage: 'No available options',
            aria: {
                trueLabel: 'True',
                falseLabel: 'False',
                nullLabel: 'Not Selected',
                star: '1 star',
                stars: '{star} stars',
                selectAll: 'All items selected',
                unselectAll: 'All items unselected',
                close: 'Close',
                previous: 'Previous',
                next: 'Next',
                navigation: 'Navigation',
                scrollTop: 'Scroll Top',
                moveTop: 'Move Top',
                moveUp: 'Move Up',
                moveDown: 'Move Down',
                moveBottom: 'Move Bottom',
                moveToTarget: 'Move to Target',
                moveToSource: 'Move to Source',
                moveAllToTarget: 'Move All to Target',
                moveAllToSource: 'Move All to Source',
                pageLabel: '{page}',
                firstPageLabel: 'First Page',
                lastPageLabel: 'Last Page',
                nextPageLabel: 'Next Page',
                prevPageLabel: 'Previous Page',
                rowsPerPageLabel: 'Rows per page',
                jumpToPageDropdownLabel: 'Jump to Page Dropdown',
                jumpToPageInputLabel: 'Jump to Page Input',
                selectRow: 'Row Selected',
                unselectRow: 'Row Unselected',
                expandRow: 'Row Expanded',
                collapseRow: 'Row Collapsed',
                showFilterMenu: 'Show Filter Menu',
                hideFilterMenu: 'Hide Filter Menu',
                filterOperator: 'Filter Operator',
                filterConstraint: 'Filter Constraint',
                editRow: 'Row Edit',
                saveEdit: 'Save Edit',
                cancelEdit: 'Cancel Edit',
                listView: 'List View',
                gridView: 'Grid View',
                slide: 'Slide',
                slideNumber: '{slideNumber}',
                zoomImage: 'Zoom Image',
                zoomIn: 'Zoom In',
                zoomOut: 'Zoom Out',
                rotateRight: 'Rotate Right',
                rotateLeft: 'Rotate Left'
            }
        },
        filterMatchModeOptions: {
            text: [api.FilterMatchMode.STARTS_WITH, api.FilterMatchMode.CONTAINS, api.FilterMatchMode.NOT_CONTAINS, api.FilterMatchMode.ENDS_WITH, api.FilterMatchMode.EQUALS, api.FilterMatchMode.NOT_EQUALS],
            numeric: [api.FilterMatchMode.EQUALS, api.FilterMatchMode.NOT_EQUALS, api.FilterMatchMode.LESS_THAN, api.FilterMatchMode.LESS_THAN_OR_EQUAL_TO, api.FilterMatchMode.GREATER_THAN, api.FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
            date: [api.FilterMatchMode.DATE_IS, api.FilterMatchMode.DATE_IS_NOT, api.FilterMatchMode.DATE_BEFORE, api.FilterMatchMode.DATE_AFTER]
        },
        zIndex: {
            modal: 1100,
            overlay: 1000,
            menu: 1000,
            tooltip: 1100
        }
    };

    const PrimeVueSymbol = Symbol();

    function usePrimeVue() {
        const PrimeVue = vue.inject(PrimeVueSymbol);

        if (!PrimeVue) {
            throw new Error('PrimeVue is not installed!');
        }

        return PrimeVue;
    }

    function switchTheme(currentTheme, newTheme, linkElementId, callback) {
        const linkElement = document.getElementById(linkElementId);
        const cloneLinkElement = linkElement.cloneNode(true);
        const newThemeUrl = linkElement.getAttribute('href').replace(currentTheme, newTheme);

        cloneLinkElement.setAttribute('id', linkElementId + '-clone');
        cloneLinkElement.setAttribute('href', newThemeUrl);
        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', linkElementId);

            if (callback) {
                callback();
            }
        });
        linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling);
    }

    var PrimeVue = {
        install: (app, options) => {
            let configOptions = options ? { ...defaultOptions, ...options } : { ...defaultOptions };
            const PrimeVue = {
                config: vue.reactive(configOptions),
                changeTheme: switchTheme
            };

            app.config.globalProperties.$primevue = PrimeVue;
            app.provide(PrimeVueSymbol, PrimeVue);
        }
    };

    exports["default"] = PrimeVue;
    exports.usePrimeVue = usePrimeVue;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, primevue.api, Vue);

this.primevue = this.primevue || {};
this.primevue.ripple = (function (utils) {
    'use strict';

    let timeout;

    function bindEvents(el) {
        el.addEventListener('mousedown', onMouseDown);
    }

    function unbindEvents(el) {
        el.removeEventListener('mousedown', onMouseDown);
    }

    function create(el) {
        let ink = document.createElement('span');

        ink.className = 'p-ink';
        ink.setAttribute('role', 'presentation');
        ink.setAttribute('aria-hidden', 'true');
        el.appendChild(ink);

        ink.addEventListener('animationend', onAnimationEnd);
    }

    function remove(el) {
        let ink = getInk(el);

        if (ink) {
            unbindEvents(el);
            ink.removeEventListener('animationend', onAnimationEnd);
            ink.remove();
        }
    }

    function onMouseDown(event) {
        let target = event.currentTarget;
        let ink = getInk(target);

        if (!ink || getComputedStyle(ink, null).display === 'none') {
            return;
        }

        utils.DomHandler.removeClass(ink, 'p-ink-active');

        if (!utils.DomHandler.getHeight(ink) && !utils.DomHandler.getWidth(ink)) {
            let d = Math.max(utils.DomHandler.getOuterWidth(target), utils.DomHandler.getOuterHeight(target));

            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }

        let offset = utils.DomHandler.getOffset(target);
        let x = event.pageX - offset.left + document.body.scrollTop - utils.DomHandler.getWidth(ink) / 2;
        let y = event.pageY - offset.top + document.body.scrollLeft - utils.DomHandler.getHeight(ink) / 2;

        ink.style.top = y + 'px';
        ink.style.left = x + 'px';
        utils.DomHandler.addClass(ink, 'p-ink-active');

        timeout = setTimeout(() => {
            if (ink) {
                utils.DomHandler.removeClass(ink, 'p-ink-active');
            }
        }, 401);
    }

    function onAnimationEnd(event) {
        if (timeout) {
            clearTimeout(timeout);
        }

        utils.DomHandler.removeClass(event.currentTarget, 'p-ink-active');
    }

    function getInk(el) {
        for (let i = 0; i < el.children.length; i++) {
            if (typeof el.children[i].className === 'string' && el.children[i].className.indexOf('p-ink') !== -1) {
                return el.children[i];
            }
        }

        return null;
    }

    const Ripple = {
        mounted(el, binding) {
            if (binding.instance.$primevue && binding.instance.$primevue.config && binding.instance.$primevue.config.ripple) {
                create(el);
                bindEvents(el);
            }
        },
        unmounted(el) {
            remove(el);
        }
    };

    return Ripple;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.portal = (function (utils, vue) {
    'use strict';

    var script = {
        name: 'Portal',
        props: {
            appendTo: {
                type: String,
                default: 'body'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                mounted: false
            };
        },
        mounted() {
            this.mounted = utils.DomHandler.isClient();
        },
        computed: {
            inline() {
                return this.disabled || this.appendTo === 'self';
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return ($options.inline)
        ? vue.renderSlot(_ctx.$slots, "default", { key: 0 })
        : ($data.mounted)
          ? (vue.openBlock(), vue.createBlock(vue.Teleport, {
              key: 1,
              to: $props.appendTo
            }, [
              vue.renderSlot(_ctx.$slots, "default")
            ], 8, ["to"]))
          : vue.createCommentVNode("", true)
    }

    script.render = render;

    return script;

})(primevue.utils, Vue);

this.primevue = this.primevue || {};
this.primevue.tooltip = (function (utils) {
    'use strict';

    function bindEvents(el) {
        const modifiers = el.$_ptooltipModifiers;

        if (modifiers.focus) {
            el.addEventListener('focus', onFocus);
            el.addEventListener('blur', onBlur);
        } else {
            el.addEventListener('mouseenter', onMouseEnter);
            el.addEventListener('mouseleave', onMouseLeave);
            el.addEventListener('click', onClick);
        }

        el.addEventListener('keydown', onKeydown);
    }

    function unbindEvents(el) {
        const modifiers = el.$_ptooltipModifiers;

        if (modifiers.focus) {
            el.removeEventListener('focus', onFocus);
            el.removeEventListener('blur', onBlur);
        } else {
            el.removeEventListener('mouseenter', onMouseEnter);
            el.removeEventListener('mouseleave', onMouseLeave);
            el.removeEventListener('click', onClick);
        }

        el.removeEventListener('keydown', onKeydown);
    }

    function bindScrollListener(el) {
        if (!el.$_ptooltipScrollHandler) {
            el.$_ptooltipScrollHandler = new utils.ConnectedOverlayScrollHandler(el, function () {
                hide(el);
            });
        }

        el.$_ptooltipScrollHandler.bindScrollListener();
    }

    function unbindScrollListener(el) {
        if (el.$_ptooltipScrollHandler) {
            el.$_ptooltipScrollHandler.unbindScrollListener();
        }
    }

    function onMouseEnter(event) {
        show(event.currentTarget);
    }

    function onMouseLeave(event) {
        hide(event.currentTarget);
    }

    function onFocus(event) {
        show(event.currentTarget);
    }

    function onBlur(event) {
        hide(event.currentTarget);
    }

    function onClick(event) {
        hide(event.currentTarget);
    }

    function onKeydown(event) {
        event.code === 'Escape' && hide(event.currentTarget);
    }

    function show(el) {
        if (el.$_ptooltipDisabled) {
            return;
        }

        let tooltipElement = create(el);

        align(el);
        utils.DomHandler.fadeIn(tooltipElement, 250);

        window.addEventListener('resize', function onWindowResize() {
            if (!utils.DomHandler.isTouchDevice()) {
                hide(el);
            }

            this.removeEventListener('resize', onWindowResize);
        });

        bindScrollListener(el);
        utils.ZIndexUtils.set('tooltip', tooltipElement, el.$_ptooltipZIndex);
    }

    function hide(el) {
        remove(el);
        unbindScrollListener(el);
    }

    function getTooltipElement(el) {
        return document.getElementById(el.$_ptooltipId);
    }

    function create(el) {
        const id = el.$_ptooltipIdAttr !== '' ? el.$_ptooltipIdAttr : utils.UniqueComponentId() + '_tooltip';

        el.$_ptooltipId = id;

        let container = document.createElement('div');

        container.id = id;

        let tooltipArrow = document.createElement('div');

        tooltipArrow.className = 'p-tooltip-arrow';
        container.appendChild(tooltipArrow);

        let tooltipText = document.createElement('div');

        tooltipText.className = 'p-tooltip-text';

        if (el.$_ptooltipEscape) {
            tooltipText.innerHTML = el.$_ptooltipValue;
        } else {
            tooltipText.innerHTML = '';
            tooltipText.appendChild(document.createTextNode(el.$_ptooltipValue));
        }

        container.setAttribute('role', 'tooltip');
        container.appendChild(tooltipText);
        document.body.appendChild(container);

        container.style.display = 'inline-block';

        if (el.$_ptooltipFitContent) {
            container.style.width = 'fit-content';
        }

        return container;
    }

    function remove(el) {
        if (el) {
            let tooltipElement = getTooltipElement(el);

            if (tooltipElement && tooltipElement.parentElement) {
                utils.ZIndexUtils.clear(tooltipElement);
                document.body.removeChild(tooltipElement);
            }

            el.$_ptooltipId = null;
        }
    }

    function align(el) {
        const modifiers = el.$_ptooltipModifiers;

        if (modifiers.top) {
            alignTop(el);

            if (isOutOfBounds(el)) {
                alignBottom(el);

                if (isOutOfBounds(el)) {
                    alignTop(el);
                }
            }
        } else if (modifiers.left) {
            alignLeft(el);

            if (isOutOfBounds(el)) {
                alignRight(el);

                if (isOutOfBounds(el)) {
                    alignTop(el);

                    if (isOutOfBounds(el)) {
                        alignBottom(el);

                        if (isOutOfBounds(el)) {
                            alignLeft(el);
                        }
                    }
                }
            }
        } else if (modifiers.bottom) {
            alignBottom(el);

            if (isOutOfBounds(el)) {
                alignTop(el);

                if (isOutOfBounds(el)) {
                    alignBottom(el);
                }
            }
        } else {
            alignRight(el);

            if (isOutOfBounds(el)) {
                alignLeft(el);

                if (isOutOfBounds(el)) {
                    alignTop(el);

                    if (isOutOfBounds(el)) {
                        alignBottom(el);

                        if (isOutOfBounds(el)) {
                            alignRight(el);
                        }
                    }
                }
            }
        }
    }

    function getHostOffset(el) {
        let offset = el.getBoundingClientRect();
        let targetLeft = offset.left + utils.DomHandler.getWindowScrollLeft();
        let targetTop = offset.top + utils.DomHandler.getWindowScrollTop();

        return { left: targetLeft, top: targetTop };
    }

    function alignRight(el) {
        preAlign(el, 'right');
        let tooltipElement = getTooltipElement(el);
        let hostOffset = getHostOffset(el);
        let left = hostOffset.left + utils.DomHandler.getOuterWidth(el);
        let top = hostOffset.top + (utils.DomHandler.getOuterHeight(el) - utils.DomHandler.getOuterHeight(tooltipElement)) / 2;

        tooltipElement.style.left = left + 'px';
        tooltipElement.style.top = top + 'px';
    }

    function alignLeft(el) {
        preAlign(el, 'left');
        let tooltipElement = getTooltipElement(el);
        let hostOffset = getHostOffset(el);
        let left = hostOffset.left - utils.DomHandler.getOuterWidth(tooltipElement);
        let top = hostOffset.top + (utils.DomHandler.getOuterHeight(el) - utils.DomHandler.getOuterHeight(tooltipElement)) / 2;

        tooltipElement.style.left = left + 'px';
        tooltipElement.style.top = top + 'px';
    }

    function alignTop(el) {
        preAlign(el, 'top');
        let tooltipElement = getTooltipElement(el);
        let hostOffset = getHostOffset(el);
        let left = hostOffset.left + (utils.DomHandler.getOuterWidth(el) - utils.DomHandler.getOuterWidth(tooltipElement)) / 2;
        let top = hostOffset.top - utils.DomHandler.getOuterHeight(tooltipElement);

        tooltipElement.style.left = left + 'px';
        tooltipElement.style.top = top + 'px';
    }

    function alignBottom(el) {
        preAlign(el, 'bottom');
        let tooltipElement = getTooltipElement(el);
        let hostOffset = getHostOffset(el);
        let left = hostOffset.left + (utils.DomHandler.getOuterWidth(el) - utils.DomHandler.getOuterWidth(tooltipElement)) / 2;
        let top = hostOffset.top + utils.DomHandler.getOuterHeight(el);

        tooltipElement.style.left = left + 'px';
        tooltipElement.style.top = top + 'px';
    }

    function preAlign(el, position) {
        let tooltipElement = getTooltipElement(el);

        tooltipElement.style.left = -999 + 'px';
        tooltipElement.style.top = -999 + 'px';
        tooltipElement.className = `p-tooltip p-component p-tooltip-${position} ${el.$_ptooltipClass || ''}`;
    }

    function isOutOfBounds(el) {
        let tooltipElement = getTooltipElement(el);
        let offset = tooltipElement.getBoundingClientRect();
        let targetTop = offset.top;
        let targetLeft = offset.left;
        let width = utils.DomHandler.getOuterWidth(tooltipElement);
        let height = utils.DomHandler.getOuterHeight(tooltipElement);
        let viewport = utils.DomHandler.getViewport();

        return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    }

    function getTarget(el) {
        return utils.DomHandler.hasClass(el, 'p-inputwrapper') ? utils.DomHandler.findSingle(el, 'input') : el;
    }

    function getModifiers(options) {
        // modifiers
        if (options.modifiers && Object.keys(options.modifiers).length) {
            return options.modifiers;
        }

        // arg
        if (options.arg && typeof options.arg === 'object') {
            return Object.entries(options.arg).reduce((acc, [key, val]) => {
                if (key === 'event' || key === 'position') acc[val] = true;

                return acc;
            }, {});
        }

        return {};
    }

    const Tooltip = {
        beforeMount(el, options) {
            let target = getTarget(el);

            target.$_ptooltipModifiers = getModifiers(options);

            if (!options.value) return;
            else if (typeof options.value === 'string') {
                target.$_ptooltipValue = options.value;
                target.$_ptooltipDisabled = false;
                target.$_ptooltipEscape = false;
                target.$_ptooltipClass = null;
                target.$_ptooltipFitContent = true;
                target.$_ptooltipIdAttr = '';
            } else if (typeof options.value === 'object' && options.value) {
                if (utils.ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === '') return;
                else {
                    /* eslint-disable */
                    target.$_ptooltipValue = options.value.value;
                    target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
                    target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : false;
                    target.$_ptooltipClass = options.value.class;
                    target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
                    target.$_ptooltipIdAttr = options.value.id || '';
                }
            }

            target.$_ptooltipZIndex = options.instance.$primevue && options.instance.$primevue.config && options.instance.$primevue.config.zIndex.tooltip;
            bindEvents(target);
        },
        unmounted(el) {
            let target = getTarget(el);
            remove(target);
            unbindEvents(target);

            if (target.$_ptooltipScrollHandler) {
                target.$_ptooltipScrollHandler.destroy();
                target.$_ptooltipScrollHandler = null;
            }
        },
        updated(el, options) {
            let target = getTarget(el);
            target.$_ptooltipModifiers = getModifiers(options);

            if (!options.value) {
                unbindEvents(target);
                return;
            }

            if (typeof options.value === 'string') {
                target.$_ptooltipValue = options.value;
                target.$_ptooltipDisabled = false;
                target.$_ptooltipEscape = false;
                target.$_ptooltipClass = null;
                target.$_ptooltipIdAttr = '';

                bindEvents(target);
            } else if (typeof options.value === 'object' && options.value) {
                if (utils.ObjectUtils.isEmpty(options.value.value) || options.value.value.trim() === '') {
                    unbindEvents(target);
                    return;
                } else {
                    /* eslint-disable */
                    target.$_ptooltipValue = options.value.value;
                    target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
                    target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : false;
                    target.$_ptooltipClass = options.value.class;
                    target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
                    target.$_ptooltipIdAttr = options.value.id || '';

                    bindEvents(target);
                }
            }
        }
    };

    return Tooltip;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.focustrap = (function (utils) {
    'use strict';

    function bind(el, binding) {
        const { onFocusIn, onFocusOut } = binding.value || {};

        el.$_pfocustrap_mutationobserver = new MutationObserver((mutationList) => {
            mutationList.forEach((mutation) => {
                if (mutation.type === 'childList' && !el.contains(document.activeElement)) {
                    const findNextFocusableElement = (el) => {
                        const focusableElement = utils.DomHandler.isFocusableElement(el) ? el : utils.DomHandler.getFirstFocusableElement(el);

                        return utils.ObjectUtils.isNotEmpty(focusableElement) ? focusableElement : findNextFocusableElement(el.nextSibling);
                    };

                    utils.DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
                }
            });
        });

        el.$_pfocustrap_mutationobserver.disconnect();
        el.$_pfocustrap_mutationobserver.observe(el, {
            childList: true
        });

        el.$_pfocustrap_focusinlistener = (event) => onFocusIn && onFocusIn(event);
        el.$_pfocustrap_focusoutlistener = (event) => onFocusOut && onFocusOut(event);

        el.addEventListener('focusin', el.$_pfocustrap_focusinlistener);
        el.addEventListener('focusout', el.$_pfocustrap_focusoutlistener);
    }

    function unbind(el) {
        el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
        el.$_pfocustrap_focusinlistener && el.removeEventListener('focusin', el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
        el.$_pfocustrap_focusoutlistener && el.removeEventListener('focusout', el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
    }

    function autoFocus(el, binding) {
        const { autoFocusSelector = '', firstFocusableSelector = '', autoFocus = false } = binding.value || {};
        let focusableElement = utils.DomHandler.getFirstFocusableElement(el, `[autofocus]:not(.p-hidden-focusable)${autoFocusSelector}`);

        autoFocus && !focusableElement && (focusableElement = utils.DomHandler.getFirstFocusableElement(el, `:not(.p-hidden-focusable)${firstFocusableSelector}`));
        utils.DomHandler.focus(focusableElement);
    }

    function onFirstHiddenElementFocus(event) {
        const { currentTarget, relatedTarget } = event;
        const focusableElement =
            relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement
                ? utils.DomHandler.getFirstFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`)
                : currentTarget.$_pfocustrap_lasthiddenfocusableelement;

        utils.DomHandler.focus(focusableElement);
    }

    function onLastHiddenElementFocus(event) {
        const { currentTarget, relatedTarget } = event;
        const focusableElement =
            relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement
                ? utils.DomHandler.getLastFocusableElement(currentTarget.parentElement, `:not(.p-hidden-focusable)${currentTarget.$_pfocustrap_focusableselector}`)
                : currentTarget.$_pfocustrap_firsthiddenfocusableelement;

        utils.DomHandler.focus(focusableElement);
    }

    function createHiddenFocusableElements(el, binding) {
        const { tabIndex = 0, firstFocusableSelector = '', lastFocusableSelector = '' } = binding.value || {};

        const createFocusableElement = (onFocus) => {
            const element = document.createElement('span');

            element.classList = 'p-hidden-accessible p-hidden-focusable';
            element.tabIndex = tabIndex;
            element.setAttribute('aria-hidden', 'true');
            element.setAttribute('role', 'presentation');
            element.addEventListener('focus', onFocus);

            return element;
        };

        const firstFocusableElement = createFocusableElement(onFirstHiddenElementFocus);
        const lastFocusableElement = createFocusableElement(onLastHiddenElementFocus);

        firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
        firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;

        lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
        lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;

        el.prepend(firstFocusableElement);
        el.append(lastFocusableElement);
    }

    const FocusTrap = {
        mounted(el, binding) {
            const { disabled } = binding.value || {};

            if (!disabled) {
                createHiddenFocusableElements(el, binding);
                bind(el, binding);
                autoFocus(el, binding);
            }
        },
        updated(el, binding) {
            const { disabled } = binding.value || {};

            disabled && unbind(el);
        },
        unmounted(el) {
            unbind(el);
        }
    };

    return FocusTrap;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.virtualscroller = (function (utils, vue) {
    'use strict';

    var script = {
        name: 'VirtualScroller',
        emits: ['update:numToleratedItems', 'scroll', 'scroll-index-change', 'lazy-load'],
        props: {
            id: {
                type: String,
                default: null
            },
            style: null,
            class: null,
            items: {
                type: Array,
                default: null
            },
            itemSize: {
                type: [Number, Array],
                default: 0
            },
            scrollHeight: null,
            scrollWidth: null,
            orientation: {
                type: String,
                default: 'vertical'
            },
            numToleratedItems: {
                type: Number,
                default: null
            },
            delay: {
                type: Number,
                default: 0
            },
            resizeDelay: {
                type: Number,
                default: 10
            },
            lazy: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loaderDisabled: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Array,
                default: null
            },
            loading: {
                type: Boolean,
                default: false
            },
            showSpacer: {
                type: Boolean,
                default: true
            },
            showLoader: {
                type: Boolean,
                default: false
            },
            tabindex: {
                type: Number,
                default: 0
            },
            inline: {
                type: Boolean,
                default: false
            },
            step: {
                type: Number,
                default: 0
            },
            appendOnly: {
                type: Boolean,
                default: false
            },
            autoSize: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                first: this.isBoth() ? { rows: 0, cols: 0 } : 0,
                last: this.isBoth() ? { rows: 0, cols: 0 } : 0,
                page: this.isBoth() ? { rows: 0, cols: 0 } : 0,
                numItemsInViewport: this.isBoth() ? { rows: 0, cols: 0 } : 0,
                lastScrollPos: this.isBoth() ? { top: 0, left: 0 } : 0,
                d_numToleratedItems: this.numToleratedItems,
                d_loading: this.loading,
                loaderArr: [],
                spacerStyle: {},
                contentStyle: {}
            };
        },
        element: null,
        content: null,
        lastScrollPos: null,
        scrollTimeout: null,
        resizeTimeout: null,
        defaultWidth: 0,
        defaultHeight: 0,
        defaultContentWidth: 0,
        defaultContentHeight: 0,
        isRangeChanged: false,
        lazyLoadState: {},
        resizeListener: null,
        initialized: false,
        watch: {
            numToleratedItems(newValue) {
                this.d_numToleratedItems = newValue;
            },
            loading(newValue) {
                this.d_loading = newValue;
            },
            items(newValue, oldValue) {
                if (!oldValue || oldValue.length !== (newValue || []).length) {
                    this.init();
                    this.calculateAutoSize();
                }
            },
            itemSize() {
                this.init();
                this.calculateAutoSize();
            },
            orientation() {
                this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
            },
            scrollHeight() {
                this.init();
                this.calculateAutoSize();
            },
            scrollWidth() {
                this.init();
                this.calculateAutoSize();
            }
        },
        mounted() {
            this.viewInit();

            this.lastScrollPos = this.isBoth() ? { top: 0, left: 0 } : 0;
            this.lazyLoadState = this.lazyLoadState || {};
        },
        updated() {
            !this.initialized && this.viewInit();
        },
        unmounted() {
            this.unbindResizeListener();

            this.initialized = false;
        },
        methods: {
            viewInit() {
                if (utils.DomHandler.isVisible(this.element)) {
                    this.setContentEl(this.content);
                    this.init();
                    this.bindResizeListener();

                    this.defaultWidth = utils.DomHandler.getWidth(this.element);
                    this.defaultHeight = utils.DomHandler.getHeight(this.element);
                    this.defaultContentWidth = utils.DomHandler.getWidth(this.content);
                    this.defaultContentHeight = utils.DomHandler.getHeight(this.content);
                    this.initialized = true;
                }
            },
            init() {
                if (!this.disabled) {
                    this.setSize();
                    this.calculateOptions();
                    this.setSpacerSize();
                }
            },
            isVertical() {
                return this.orientation === 'vertical';
            },
            isHorizontal() {
                return this.orientation === 'horizontal';
            },
            isBoth() {
                return this.orientation === 'both';
            },
            scrollTo(options) {
                this.lastScrollPos = this.both ? { top: 0, left: 0 } : 0;
                this.element?.scrollTo(options);
            },
            scrollToIndex(index, behavior = 'auto') {
                const both = this.isBoth();
                const horizontal = this.isHorizontal();
                const first = this.first;
                const { numToleratedItems } = this.calculateNumItems();
                const contentPos = this.getContentPosition();
                const itemSize = this.itemSize;
                const calculateFirst = (_index = 0, _numT) => (_index <= _numT ? 0 : _index);
                const calculateCoord = (_first, _size, _cpos) => _first * _size + _cpos;
                const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
                let newFirst = both ? { rows: 0, cols: 0 } : 0;
                let isRangeChanged = false;

                if (both) {
                    newFirst = { rows: calculateFirst(index[0], numToleratedItems[0]), cols: calculateFirst(index[1], numToleratedItems[1]) };
                    scrollTo(calculateCoord(newFirst.cols, itemSize[1], contentPos.left), calculateCoord(newFirst.rows, itemSize[0], contentPos.top));
                    isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
                } else {
                    newFirst = calculateFirst(index, numToleratedItems);
                    horizontal ? scrollTo(calculateCoord(newFirst, itemSize, contentPos.left), 0) : scrollTo(0, calculateCoord(newFirst, itemSize, contentPos.top));
                    isRangeChanged = newFirst !== first;
                }

                this.isRangeChanged = isRangeChanged;
                this.first = newFirst;
            },
            scrollInView(index, to, behavior = 'auto') {
                if (to) {
                    const both = this.isBoth();
                    const horizontal = this.isHorizontal();
                    const { first, viewport } = this.getRenderedRange();
                    const scrollTo = (left = 0, top = 0) => this.scrollTo({ left, top, behavior });
                    const isToStart = to === 'to-start';
                    const isToEnd = to === 'to-end';

                    if (isToStart) {
                        if (both) {
                            if (viewport.first.rows - first.rows > index[0]) {
                                scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows - 1) * this.itemSize[0]);
                            } else if (viewport.first.cols - first.cols > index[1]) {
                                scrollTo((viewport.first.cols - 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
                            }
                        } else {
                            if (viewport.first - first > index) {
                                const pos = (viewport.first - 1) * this.itemSize;

                                horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                            }
                        }
                    } else if (isToEnd) {
                        if (both) {
                            if (viewport.last.rows - first.rows <= index[0] + 1) {
                                scrollTo(viewport.first.cols * this.itemSize[1], (viewport.first.rows + 1) * this.itemSize[0]);
                            } else if (viewport.last.cols - first.cols <= index[1] + 1) {
                                scrollTo((viewport.first.cols + 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
                            }
                        } else {
                            if (viewport.last - first <= index + 1) {
                                const pos = (viewport.first + 1) * this.itemSize;

                                horizontal ? scrollTo(pos, 0) : scrollTo(0, pos);
                            }
                        }
                    }
                } else {
                    this.scrollToIndex(index, behavior);
                }
            },
            getRenderedRange() {
                const calculateFirstInViewport = (_pos, _size) => Math.floor(_pos / (_size || _pos));

                let firstInViewport = this.first;
                let lastInViewport = 0;

                if (this.element) {
                    const both = this.isBoth();
                    const horizontal = this.isHorizontal();
                    const { scrollTop, scrollLeft } = this.element.scrollTop;

                    if (both) {
                        firstInViewport = { rows: calculateFirstInViewport(scrollTop, this.itemSize[0]), cols: calculateFirstInViewport(scrollLeft, this.itemSize[1]) };
                        lastInViewport = { rows: firstInViewport.rows + this.numItemsInViewport.rows, cols: firstInViewport.cols + this.numItemsInViewport.cols };
                    } else {
                        const scrollPos = horizontal ? scrollLeft : scrollTop;

                        firstInViewport = calculateFirstInViewport(scrollPos, this.itemSize);
                        lastInViewport = firstInViewport + this.numItemsInViewport;
                    }
                }

                return {
                    first: this.first,
                    last: this.last,
                    viewport: {
                        first: firstInViewport,
                        last: lastInViewport
                    }
                };
            },
            calculateNumItems() {
                const both = this.isBoth();
                const horizontal = this.isHorizontal();
                const itemSize = this.itemSize;
                const contentPos = this.getContentPosition();
                const contentWidth = this.element ? this.element.offsetWidth - contentPos.left : 0;
                const contentHeight = this.element ? this.element.offsetHeight - contentPos.top : 0;
                const calculateNumItemsInViewport = (_contentSize, _itemSize) => Math.ceil(_contentSize / (_itemSize || _contentSize));
                const calculateNumToleratedItems = (_numItems) => Math.ceil(_numItems / 2);
                const numItemsInViewport = both
                    ? { rows: calculateNumItemsInViewport(contentHeight, itemSize[0]), cols: calculateNumItemsInViewport(contentWidth, itemSize[1]) }
                    : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, itemSize);

                const numToleratedItems = this.d_numToleratedItems || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));

                return { numItemsInViewport, numToleratedItems };
            },
            calculateOptions() {
                const both = this.isBoth();
                const first = this.first;
                const { numItemsInViewport, numToleratedItems } = this.calculateNumItems();
                const calculateLast = (_first, _num, _numT, _isCols = false) => this.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
                const last = both
                    ? { rows: calculateLast(first.rows, numItemsInViewport.rows, numToleratedItems[0]), cols: calculateLast(first.cols, numItemsInViewport.cols, numToleratedItems[1], true) }
                    : calculateLast(first, numItemsInViewport, numToleratedItems);

                this.last = last;
                this.numItemsInViewport = numItemsInViewport;
                this.d_numToleratedItems = numToleratedItems;
                this.$emit('update:numToleratedItems', this.d_numToleratedItems);

                if (this.showLoader) {
                    this.loaderArr = both ? Array.from({ length: numItemsInViewport.rows }).map(() => Array.from({ length: numItemsInViewport.cols })) : Array.from({ length: numItemsInViewport });
                }

                if (this.lazy) {
                    Promise.resolve().then(() => {
                        this.lazyLoadState = {
                            first: this.step ? (both ? { rows: 0, cols: first.cols } : 0) : first,
                            last: Math.min(this.step ? this.step : last, this.items.length)
                        };

                        this.$emit('lazy-load', this.lazyLoadState);
                    });
                }
            },
            calculateAutoSize() {
                if (this.autoSize && !this.d_loading) {
                    Promise.resolve().then(() => {
                        if (this.content) {
                            const both = this.isBoth();
                            const horizontal = this.isHorizontal();
                            const vertical = this.isVertical();

                            this.content.style.minHeight = this.content.style.minWidth = 'auto';
                            this.content.style.position = 'relative';
                            this.element.style.contain = 'none';

                            const [contentWidth, contentHeight] = [utils.DomHandler.getWidth(this.content), utils.DomHandler.getHeight(this.content)];

                            contentWidth !== this.defaultContentWidth && (this.element.style.width = '');
                            contentHeight !== this.defaultContentHeight && (this.element.style.height = '');

                            const [width, height] = [utils.DomHandler.getWidth(this.element), utils.DomHandler.getHeight(this.element)];

                            (both || horizontal) && (this.element.style.width = width < this.defaultWidth ? width + 'px' : this.scrollWidth || this.defaultWidth + 'px');
                            (both || vertical) && (this.element.style.height = height < this.defaultHeight ? height + 'px' : this.scrollHeight || this.defaultHeight + 'px');

                            this.content.style.minHeight = this.content.style.minWidth = '';
                            this.content.style.position = '';
                            this.element.style.contain = '';
                        }
                    });
                }
            },
            getLast(last = 0, isCols) {
                return this.items ? Math.min(isCols ? (this.columns || this.items[0]).length : this.items.length, last) : 0;
            },
            getContentPosition() {
                if (this.content) {
                    const style = getComputedStyle(this.content);
                    const left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
                    const right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
                    const top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
                    const bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);

                    return { left, right, top, bottom, x: left + right, y: top + bottom };
                }

                return { left: 0, right: 0, top: 0, bottom: 0, x: 0, y: 0 };
            },
            setSize() {
                if (this.element) {
                    const both = this.isBoth();
                    const horizontal = this.isHorizontal();
                    const parentElement = this.element.parentElement;
                    const width = this.scrollWidth || `${this.element.offsetWidth || parentElement.offsetWidth}px`;
                    const height = this.scrollHeight || `${this.element.offsetHeight || parentElement.offsetHeight}px`;
                    const setProp = (_name, _value) => (this.element.style[_name] = _value);

                    if (both || horizontal) {
                        setProp('height', height);
                        setProp('width', width);
                    } else {
                        setProp('height', height);
                    }
                }
            },
            setSpacerSize() {
                const items = this.items;

                if (items) {
                    const both = this.isBoth();
                    const horizontal = this.isHorizontal();
                    const contentPos = this.getContentPosition();
                    const setProp = (_name, _value, _size, _cpos = 0) => (this.spacerStyle = { ...this.spacerStyle, ...{ [`${_name}`]: (_value || []).length * _size + _cpos + 'px' } });

                    if (both) {
                        setProp('height', items, this.itemSize[0], contentPos.y);
                        setProp('width', this.columns || items[1], this.itemSize[1], contentPos.x);
                    } else {
                        horizontal ? setProp('width', this.columns || items, this.itemSize, contentPos.x) : setProp('height', items, this.itemSize, contentPos.y);
                    }
                }
            },
            setContentPosition(pos) {
                if (this.content && !this.appendOnly) {
                    const both = this.isBoth();
                    const horizontal = this.isHorizontal();
                    const first = pos ? pos.first : this.first;
                    const calculateTranslateVal = (_first, _size) => _first * _size;
                    const setTransform = (_x = 0, _y = 0) => (this.contentStyle = { ...this.contentStyle, ...{ transform: `translate3d(${_x}px, ${_y}px, 0)` } });

                    if (both) {
                        setTransform(calculateTranslateVal(first.cols, this.itemSize[1]), calculateTranslateVal(first.rows, this.itemSize[0]));
                    } else {
                        const translateVal = calculateTranslateVal(first, this.itemSize);

                        horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
                    }
                }
            },
            onScrollPositionChange(event) {
                const target = event.target;
                const both = this.isBoth();
                const horizontal = this.isHorizontal();
                const contentPos = this.getContentPosition();
                const calculateScrollPos = (_pos, _cpos) => (_pos ? (_pos > _cpos ? _pos - _cpos : _pos) : 0);
                const calculateCurrentIndex = (_pos, _size) => Math.floor(_pos / (_size || _pos));

                const calculateTriggerIndex = (_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
                    return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
                };

                const calculateFirst = (_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) => {
                    if (_currentIndex <= _numT) return 0;
                    else return Math.max(0, _isScrollDownOrRight ? (_currentIndex < _triggerIndex ? _first : _currentIndex - _numT) : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
                };

                const calculateLast = (_currentIndex, _first, _last, _num, _numT, _isCols) => {
                    let lastValue = _first + _num + 2 * _numT;

                    if (_currentIndex >= _numT) {
                        lastValue += _numT + 1;
                    }

                    return this.getLast(lastValue, _isCols);
                };

                const scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
                const scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);

                let newFirst = both ? { rows: 0, cols: 0 } : 0;
                let newLast = this.last;
                let isRangeChanged = false;
                let newScrollPos = this.lastScrollPos;

                if (both) {
                    const isScrollDown = this.lastScrollPos.top <= scrollTop;
                    const isScrollRight = this.lastScrollPos.left <= scrollLeft;

                    if (!this.appendOnly || (this.appendOnly && (isScrollDown || isScrollRight))) {
                        const currentIndex = { rows: calculateCurrentIndex(scrollTop, this.itemSize[0]), cols: calculateCurrentIndex(scrollLeft, this.itemSize[1]) };
                        const triggerIndex = {
                            rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                            cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                        };

                        newFirst = {
                            rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
                            cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
                        };
                        newLast = {
                            rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
                            cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
                        };

                        isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
                        newScrollPos = { top: scrollTop, left: scrollLeft };
                    }
                } else {
                    const scrollPos = horizontal ? scrollLeft : scrollTop;
                    const isScrollDownOrRight = this.lastScrollPos <= scrollPos;

                    if (!this.appendOnly || (this.appendOnly && isScrollDownOrRight)) {
                        const currentIndex = calculateCurrentIndex(scrollPos, this.itemSize);
                        const triggerIndex = calculateTriggerIndex(currentIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);

                        newFirst = calculateFirst(currentIndex, triggerIndex, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
                        newLast = calculateLast(currentIndex, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
                        isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
                        newScrollPos = scrollPos;
                    }
                }

                return {
                    first: newFirst,
                    last: newLast,
                    isRangeChanged,
                    scrollPos: newScrollPos
                };
            },
            onScrollChange(event) {
                const { first, last, isRangeChanged, scrollPos } = this.onScrollPositionChange(event);

                if (isRangeChanged) {
                    const newState = { first, last };

                    this.setContentPosition(newState);

                    this.first = first;
                    this.last = last;
                    this.lastScrollPos = scrollPos;

                    this.$emit('scroll-index-change', newState);

                    if (this.lazy && this.isPageChanged(first)) {
                        const lazyLoadState = {
                            first: this.step ? Math.min(this.getPageByFirst(first) * this.step, this.items.length - this.step) : first,
                            last: Math.min(this.step ? (this.getPageByFirst(first) + 1) * this.step : last, this.items.length)
                        };
                        const isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;

                        isLazyStateChanged && this.$emit('lazy-load', lazyLoadState);
                        this.lazyLoadState = lazyLoadState;
                    }
                }
            },
            onScroll(event) {
                this.$emit('scroll', event);

                if (this.delay && this.isPageChanged()) {
                    if (this.scrollTimeout) {
                        clearTimeout(this.scrollTimeout);
                    }

                    if (!this.d_loading && this.showLoader) {
                        const { isRangeChanged } = this.onScrollPositionChange(event);
                        const changed = isRangeChanged || (this.step ? this.isPageChanged() : false);

                        changed && (this.d_loading = true);
                    }

                    this.scrollTimeout = setTimeout(() => {
                        this.onScrollChange(event);

                        if (this.d_loading && this.showLoader && (!this.lazy || this.loading === undefined)) {
                            this.d_loading = false;
                            this.page = this.getPageByFirst();
                        }
                    }, this.delay);
                } else {
                    this.onScrollChange(event);
                }
            },
            onResize() {
                if (this.resizeTimeout) {
                    clearTimeout(this.resizeTimeout);
                }

                this.resizeTimeout = setTimeout(() => {
                    if (utils.DomHandler.isVisible(this.element)) {
                        const both = this.isBoth();
                        const vertical = this.isVertical();
                        const horizontal = this.isHorizontal();
                        const [width, height] = [utils.DomHandler.getWidth(this.element), utils.DomHandler.getHeight(this.element)];
                        const [isDiffWidth, isDiffHeight] = [width !== this.defaultWidth, height !== this.defaultHeight];
                        const reinit = both ? isDiffWidth || isDiffHeight : horizontal ? isDiffWidth : vertical ? isDiffHeight : false;

                        if (reinit) {
                            this.d_numToleratedItems = this.numToleratedItems;
                            this.defaultWidth = width;
                            this.defaultHeight = height;
                            this.defaultContentWidth = utils.DomHandler.getWidth(this.content);
                            this.defaultContentHeight = utils.DomHandler.getHeight(this.content);

                            this.init();
                        }
                    }
                }, this.resizeDelay);
            },
            bindResizeListener() {
                if (!this.resizeListener) {
                    this.resizeListener = this.onResize.bind(this);

                    window.addEventListener('resize', this.resizeListener);
                    window.addEventListener('orientationchange', this.resizeListener);
                }
            },
            unbindResizeListener() {
                if (this.resizeListener) {
                    window.removeEventListener('resize', this.resizeListener);
                    window.removeEventListener('orientationchange', this.resizeListener);
                    this.resizeListener = null;
                }
            },
            getOptions(renderedIndex) {
                const count = (this.items || []).length;
                const index = this.isBoth() ? this.first.rows + renderedIndex : this.first + renderedIndex;

                return {
                    index,
                    count,
                    first: index === 0,
                    last: index === count - 1,
                    even: index % 2 === 0,
                    odd: index % 2 !== 0
                };
            },
            getLoaderOptions(index, extOptions) {
                let count = this.loaderArr.length;

                return {
                    index,
                    count,
                    first: index === 0,
                    last: index === count - 1,
                    even: index % 2 === 0,
                    odd: index % 2 !== 0,
                    ...extOptions
                };
            },
            getPageByFirst(first) {
                return Math.floor(((first ?? this.first) + this.d_numToleratedItems * 4) / (this.step || 1));
            },
            isPageChanged(first) {
                return this.step ? this.page !== this.getPageByFirst(first ?? this.first) : true;
            },
            setContentEl(el) {
                this.content = el || this.content || utils.DomHandler.findSingle(this.element, '.p-virtualscroller-content');
            },
            elementRef(el) {
                this.element = el;
            },
            contentRef(el) {
                this.content = el;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-virtualscroller',
                    {
                        'p-virtualscroller-inline': this.inline,
                        'p-virtualscroller-both p-both-scroll': this.isBoth(),
                        'p-virtualscroller-horizontal p-horizontal-scroll': this.isHorizontal()
                    },
                    this.class
                ];
            },
            contentClass() {
                return [
                    'p-virtualscroller-content',
                    {
                        'p-virtualscroller-loading': this.d_loading
                    }
                ];
            },
            loaderClass() {
                return [
                    'p-virtualscroller-loader',
                    {
                        'p-component-overlay': !this.$slots.loader
                    }
                ];
            },
            loadedItems() {
                if (this.items && !this.d_loading) {
                    if (this.isBoth()) return this.items.slice(this.appendOnly ? 0 : this.first.rows, this.last.rows).map((item) => (this.columns ? item : item.slice(this.appendOnly ? 0 : this.first.cols, this.last.cols)));
                    else if (this.isHorizontal() && this.columns) return this.items;
                    else return this.items.slice(this.appendOnly ? 0 : this.first, this.last);
                }

                return [];
            },
            loadedRows() {
                return this.d_loading ? (this.loaderDisabled ? this.loaderArr : []) : this.loadedItems;
            },
            loadedColumns() {
                if (this.columns) {
                    const both = this.isBoth();
                    const horizontal = this.isHorizontal();

                    if (both || horizontal) {
                        return this.d_loading && this.loaderDisabled ? (both ? this.loaderArr[0] : this.loaderArr) : this.columns.slice(both ? this.first.cols : this.first, both ? this.last.cols : this.last);
                    }
                }

                return this.columns;
            }
        }
    };

    const _hoisted_1 = ["tabindex"];
    const _hoisted_2 = {
      key: 1,
      class: "p-virtualscroller-loading-icon pi pi-spinner pi-spin"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (!$props.disabled)
        ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            ref: $options.elementRef,
            class: vue.normalizeClass($options.containerClass),
            tabindex: $props.tabindex,
            style: vue.normalizeStyle($props.style),
            onScroll: _cache[0] || (_cache[0] = (...args) => ($options.onScroll && $options.onScroll(...args)))
          }, [
            vue.renderSlot(_ctx.$slots, "content", {
              styleClass: $options.contentClass,
              items: $options.loadedItems,
              getItemOptions: $options.getOptions,
              loading: $data.d_loading,
              getLoaderOptions: $options.getLoaderOptions,
              itemSize: $props.itemSize,
              rows: $options.loadedRows,
              columns: $options.loadedColumns,
              contentRef: $options.contentRef,
              spacerStyle: $data.spacerStyle,
              contentStyle: $data.contentStyle,
              vertical: $options.isVertical(),
              horizontal: $options.isHorizontal(),
              both: $options.isBoth()
            }, () => [
              vue.createElementVNode("div", {
                ref: $options.contentRef,
                class: vue.normalizeClass($options.contentClass),
                style: vue.normalizeStyle($data.contentStyle)
              }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.loadedItems, (item, index) => {
                  return vue.renderSlot(_ctx.$slots, "item", {
                    key: index,
                    item: item,
                    options: $options.getOptions(index)
                  })
                }), 128))
              ], 6)
            ]),
            ($props.showSpacer)
              ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: "p-virtualscroller-spacer",
                  style: vue.normalizeStyle($data.spacerStyle)
                }, null, 4))
              : vue.createCommentVNode("", true),
            (!$props.loaderDisabled && $props.showLoader && $data.d_loading)
              ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 1,
                  class: vue.normalizeClass($options.loaderClass)
                }, [
                  (_ctx.$slots && _ctx.$slots.loader)
                    ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($data.loaderArr, (_, index) => {
                        return vue.renderSlot(_ctx.$slots, "loader", {
                          key: index,
                          options: $options.getLoaderOptions(index, $options.isBoth() && { numCols: _ctx.d_numItemsInViewport.cols })
                        })
                      }), 128))
                    : (vue.openBlock(), vue.createElementBlock("i", _hoisted_2))
                ], 2))
              : vue.createCommentVNode("", true)
          ], 46, _hoisted_1))
        : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
            vue.renderSlot(_ctx.$slots, "default"),
            vue.renderSlot(_ctx.$slots, "content", {
              items: $props.items,
              rows: $props.items,
              columns: $options.loadedColumns
            })
          ], 64))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-virtualscroller {\n    position: relative;\n    overflow: auto;\n    contain: strict;\n    transform: translateZ(0);\n    will-change: scroll-position;\n    outline: 0 none;\n}\n.p-virtualscroller-content {\n    position: absolute;\n    top: 0;\n    left: 0;\n    /* contain: content; */\n    min-height: 100%;\n    min-width: 100%;\n    will-change: transform;\n}\n.p-virtualscroller-spacer {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 1px;\n    width: 1px;\n    transform-origin: 0 0;\n    pointer-events: none;\n}\n.p-virtualscroller .p-virtualscroller-loader {\n    position: sticky;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n.p-virtualscroller-loader.p-component-overlay {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-virtualscroller-loading-icon {\n    font-size: 2rem;\n}\n.p-virtualscroller-horizontal > .p-virtualscroller-content {\n    display: flex;\n}\n\n/* Inline */\n.p-virtualscroller-inline .p-virtualscroller-content {\n    position: static;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.utils, Vue);

this.primevue = this.primevue || {};
this.primevue.confirmationeventbus = (function (utils) {
	'use strict';

	var ConfirmationEventBus = utils.EventBus();

	return ConfirmationEventBus;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.toasteventbus = (function (utils) {
	'use strict';

	var ToastEventBus = utils.EventBus();

	return ToastEventBus;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.overlayeventbus = (function (utils) {
	'use strict';

	var OverlayEventBus = utils.EventBus();

	return OverlayEventBus;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.dynamicdialogeventbus = (function (utils) {
	'use strict';

	var DynamicDialogEventBus = utils.EventBus();

	return DynamicDialogEventBus;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.terminalservice = (function (utils) {
	'use strict';

	var TerminalService = utils.EventBus();

	return TerminalService;

})(primevue.utils);

this.primevue = this.primevue || {};
this.primevue.useconfirm = (function (exports, vue) {
    'use strict';

    const PrimeVueConfirmSymbol = Symbol();

    function useConfirm() {
        const PrimeVueConfirm = vue.inject(PrimeVueConfirmSymbol);

        if (!PrimeVueConfirm) {
            throw new Error('No PrimeVue Confirmation provided!');
        }

        return PrimeVueConfirm;
    }

    exports.PrimeVueConfirmSymbol = PrimeVueConfirmSymbol;
    exports.useConfirm = useConfirm;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, Vue);

this.primevue = this.primevue || {};
this.primevue.usetoast = (function (exports, vue) {
    'use strict';

    const PrimeVueToastSymbol = Symbol();

    function useToast() {
        const PrimeVueToast = vue.inject(PrimeVueToastSymbol);

        if (!PrimeVueToast) {
            throw new Error('No PrimeVue Toast provided!');
        }

        return PrimeVueToast;
    }

    exports.PrimeVueToastSymbol = PrimeVueToastSymbol;
    exports.useToast = useToast;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, Vue);

this.primevue = this.primevue || {};
this.primevue.usedialog = (function (exports, vue) {
    'use strict';

    const PrimeVueDialogSymbol = Symbol();

    function useDialog() {
        const PrimeVueDialog = vue.inject(PrimeVueDialogSymbol);

        if (!PrimeVueDialog) {
            throw new Error('No PrimeVue Dialog provided!');
        }

        return PrimeVueDialog;
    }

    exports.PrimeVueDialogSymbol = PrimeVueDialogSymbol;
    exports.useDialog = useDialog;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, Vue);

this.primevue = this.primevue || {};
this.primevue.button = (function (Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script = {
        name: 'Button',
        props: {
            label: {
                type: String,
                default: null
            },
            icon: {
                type: String,
                default: null
            },
            iconPos: {
                type: String,
                default: 'left'
            },
            iconClass: {
                type: String,
                default: null
            },
            badge: {
                type: String,
                default: null
            },
            badgeClass: {
                type: String,
                default: null
            },
            loading: {
                type: Boolean,
                default: false
            },
            loadingIcon: {
                type: String,
                default: 'pi pi-spinner pi-spin'
            },
            link: {
                type: Boolean,
                default: false
            },
            severity: {
                type: String,
                default: null
            },
            raised: {
                type: Boolean,
                default: false
            },
            rounded: {
                type: Boolean,
                default: false
            },
            text: {
                type: Boolean,
                default: false
            },
            outlined: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: null
            },
            plain: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            buttonClass() {
                return [
                    'p-button p-component',
                    {
                        'p-button-icon-only': this.icon && !this.label,
                        'p-button-vertical': (this.iconPos === 'top' || this.iconPos === 'bottom') && this.label,
                        'p-disabled': this.$attrs.disabled || this.loading,
                        'p-button-loading': this.loading,
                        'p-button-loading-label-only': this.loading && !this.icon && this.label,
                        'p-button-link': this.link,
                        [`p-button-${this.severity}`]: this.severity,
                        'p-button-raised': this.raised,
                        'p-button-rounded': this.rounded,
                        'p-button-text': this.text,
                        'p-button-outlined': this.outlined,
                        'p-button-sm': this.size === 'small',
                        'p-button-lg': this.size === 'large',
                        'p-button-plain': this.plain
                    }
                ];
            },
            iconStyleClass() {
                return [
                    this.loading ? 'p-button-loading-icon ' + this.loadingIcon : this.icon,
                    'p-button-icon',
                    this.iconClass,
                    {
                        'p-button-icon-left': this.iconPos === 'left' && this.label,
                        'p-button-icon-right': this.iconPos === 'right' && this.label,
                        'p-button-icon-top': this.iconPos === 'top' && this.label,
                        'p-button-icon-bottom': this.iconPos === 'bottom' && this.label
                    }
                ];
            },
            badgeStyleClass() {
                return [
                    'p-badge p-component',
                    this.badgeClass,
                    {
                        'p-badge-no-gutter': this.badge && String(this.badge).length === 1
                    }
                ];
            },
            disabled() {
                return this.$attrs.disabled || this.loading;
            },
            defaultAriaLabel() {
                return this.label ? this.label + (this.badge ? ' ' + this.badge : '') : this.$attrs['aria-label'];
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1 = ["aria-label", "disabled"];
    const _hoisted_2 = { class: "p-button-label" };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
        class: vue.normalizeClass($options.buttonClass),
        type: "button",
        "aria-label": $options.defaultAriaLabel,
        disabled: $options.disabled
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          ($props.loading && !$props.icon)
            ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 0,
                class: vue.normalizeClass($options.iconStyleClass)
              }, null, 2))
            : vue.createCommentVNode("", true),
          ($props.icon)
            ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 1,
                class: vue.normalizeClass($options.iconStyleClass)
              }, null, 2))
            : vue.createCommentVNode("", true),
          vue.createElementVNode("span", _hoisted_2, vue.toDisplayString($props.label || ' '), 1),
          ($props.badge)
            ? (vue.openBlock(), vue.createElementBlock("span", {
                key: 2,
                class: vue.normalizeClass($options.badgeStyleClass)
              }, vue.toDisplayString($props.badge), 3))
            : vue.createCommentVNode("", true)
        ])
      ], 10, _hoisted_1)), [
        [_directive_ripple]
      ])
    }

    script.render = render;

    return script;

})(primevue.ripple, Vue);

this.primevue = this.primevue || {};
this.primevue.inputtext = (function (vue) {
    'use strict';

    var script = {
        name: 'InputText',
        emits: ['update:modelValue'],
        props: {
            modelValue: null
        },
        methods: {
            onInput(event) {
                this.$emit('update:modelValue', event.target.value);
            }
        },
        computed: {
            filled() {
                return this.modelValue != null && this.modelValue.toString().length > 0;
            }
        }
    };

    const _hoisted_1 = ["value"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("input", {
        class: vue.normalizeClass(['p-inputtext p-component', { 'p-filled': $options.filled }]),
        value: $props.modelValue,
        onInput: _cache[0] || (_cache[0] = (...args) => ($options.onInput && $options.onInput(...args)))
      }, null, 42, _hoisted_1))
    }

    script.render = render;

    return script;

})(Vue);

this.primevue = this.primevue || {};
this.primevue.inputnumber = (function (Button, InputText, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Button__default = /*#__PURE__*/_interopDefaultLegacy(Button);
    var InputText__default = /*#__PURE__*/_interopDefaultLegacy(InputText);

    var script = {
        name: 'InputNumber',
        emits: ['update:modelValue', 'input', 'focus', 'blur'],
        props: {
            modelValue: {
                type: Number,
                default: null
            },
            format: {
                type: Boolean,
                default: true
            },
            showButtons: {
                type: Boolean,
                default: false
            },
            buttonLayout: {
                type: String,
                default: 'stacked'
            },
            incrementButtonClass: {
                type: String,
                default: null
            },
            decrementButtonClass: {
                type: String,
                default: null
            },
            incrementButtonIcon: {
                type: String,
                default: 'pi pi-angle-up'
            },
            decrementButtonIcon: {
                type: String,
                default: 'pi pi-angle-down'
            },
            locale: {
                type: String,
                default: undefined
            },
            localeMatcher: {
                type: String,
                default: undefined
            },
            mode: {
                type: String,
                default: 'decimal'
            },
            prefix: {
                type: String,
                default: null
            },
            suffix: {
                type: String,
                default: null
            },
            currency: {
                type: String,
                default: undefined
            },
            currencyDisplay: {
                type: String,
                default: undefined
            },
            useGrouping: {
                type: Boolean,
                default: true
            },
            minFractionDigits: {
                type: Number,
                default: undefined
            },
            maxFractionDigits: {
                type: Number,
                default: undefined
            },
            min: {
                type: Number,
                default: null
            },
            max: {
                type: Number,
                default: null
            },
            step: {
                type: Number,
                default: 1
            },
            allowEmpty: {
                type: Boolean,
                default: true
            },
            highlightOnFocus: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: null
            },
            inputId: {
                type: String,
                default: null
            },
            inputClass: {
                type: [String, Object],
                default: null
            },
            inputStyle: {
                type: Object,
                default: null
            },
            inputProps: {
                type: null,
                default: null
            },
            incrementButtonProps: {
                type: null,
                default: null
            },
            decrementButtonProps: {
                type: null,
                default: null
            },
            'aria-labelledby': {
                type: String,
                default: null
            },
            'aria-label': {
                type: String,
                default: null
            }
        },
        numberFormat: null,
        _numeral: null,
        _decimal: null,
        _group: null,
        _minusSign: null,
        _currency: null,
        _suffix: null,
        _prefix: null,
        _index: null,
        groupChar: '',
        isSpecialChar: null,
        prefixChar: null,
        suffixChar: null,
        timer: null,
        data() {
            return {
                d_modelValue: this.modelValue,
                focused: false
            };
        },
        watch: {
            modelValue(newValue) {
                this.d_modelValue = newValue;
            },
            locale(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            localeMatcher(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            mode(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            currency(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            currencyDisplay(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            useGrouping(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            minFractionDigits(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            maxFractionDigits(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            suffix(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            },
            prefix(newValue, oldValue) {
                this.updateConstructParser(newValue, oldValue);
            }
        },
        created() {
            this.constructParser();
        },
        methods: {
            getOptions() {
                return {
                    localeMatcher: this.localeMatcher,
                    style: this.mode,
                    currency: this.currency,
                    currencyDisplay: this.currencyDisplay,
                    useGrouping: this.useGrouping,
                    minimumFractionDigits: this.minFractionDigits,
                    maximumFractionDigits: this.maxFractionDigits
                };
            },
            constructParser() {
                this.numberFormat = new Intl.NumberFormat(this.locale, this.getOptions());
                const numerals = [...new Intl.NumberFormat(this.locale, { useGrouping: false }).format(9876543210)].reverse();
                const index = new Map(numerals.map((d, i) => [d, i]));

                this._numeral = new RegExp(`[${numerals.join('')}]`, 'g');
                this._group = this.getGroupingExpression();
                this._minusSign = this.getMinusSignExpression();
                this._currency = this.getCurrencyExpression();
                this._decimal = this.getDecimalExpression();
                this._suffix = this.getSuffixExpression();
                this._prefix = this.getPrefixExpression();
                this._index = (d) => index.get(d);
            },
            updateConstructParser(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.constructParser();
                }
            },
            escapeRegExp(text) {
                return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            },
            getDecimalExpression() {
                const formatter = new Intl.NumberFormat(this.locale, { ...this.getOptions(), useGrouping: false });

                return new RegExp(`[${formatter.format(1.1).replace(this._currency, '').trim().replace(this._numeral, '')}]`, 'g');
            },
            getGroupingExpression() {
                const formatter = new Intl.NumberFormat(this.locale, { useGrouping: true });

                this.groupChar = formatter.format(1000000).trim().replace(this._numeral, '').charAt(0);

                return new RegExp(`[${this.groupChar}]`, 'g');
            },
            getMinusSignExpression() {
                const formatter = new Intl.NumberFormat(this.locale, { useGrouping: false });

                return new RegExp(`[${formatter.format(-1).trim().replace(this._numeral, '')}]`, 'g');
            },
            getCurrencyExpression() {
                if (this.currency) {
                    const formatter = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency, currencyDisplay: this.currencyDisplay, minimumFractionDigits: 0, maximumFractionDigits: 0 });

                    return new RegExp(`[${formatter.format(1).replace(/\s/g, '').replace(this._numeral, '').replace(this._group, '')}]`, 'g');
                }

                return new RegExp(`[]`, 'g');
            },
            getPrefixExpression() {
                if (this.prefix) {
                    this.prefixChar = this.prefix;
                } else {
                    const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay });

                    this.prefixChar = formatter.format(1).split('1')[0];
                }

                return new RegExp(`${this.escapeRegExp(this.prefixChar || '')}`, 'g');
            },
            getSuffixExpression() {
                if (this.suffix) {
                    this.suffixChar = this.suffix;
                } else {
                    const formatter = new Intl.NumberFormat(this.locale, { style: this.mode, currency: this.currency, currencyDisplay: this.currencyDisplay, minimumFractionDigits: 0, maximumFractionDigits: 0 });

                    this.suffixChar = formatter.format(1).split('1')[1];
                }

                return new RegExp(`${this.escapeRegExp(this.suffixChar || '')}`, 'g');
            },
            formatValue(value) {
                if (value != null) {
                    if (value === '-') {
                        // Minus sign
                        return value;
                    }

                    if (this.format) {
                        let formatter = new Intl.NumberFormat(this.locale, this.getOptions());
                        let formattedValue = formatter.format(value);

                        if (this.prefix) {
                            formattedValue = this.prefix + formattedValue;
                        }

                        if (this.suffix) {
                            formattedValue = formattedValue + this.suffix;
                        }

                        return formattedValue;
                    }

                    return value.toString();
                }

                return '';
            },
            parseValue(text) {
                let filteredText = text
                    .replace(this._suffix, '')
                    .replace(this._prefix, '')
                    .trim()
                    .replace(/\s/g, '')
                    .replace(this._currency, '')
                    .replace(this._group, '')
                    .replace(this._minusSign, '-')
                    .replace(this._decimal, '.')
                    .replace(this._numeral, this._index);

                if (filteredText) {
                    if (filteredText === '-')
                        // Minus sign
                        return filteredText;

                    let parsedValue = +filteredText;

                    return isNaN(parsedValue) ? null : parsedValue;
                }

                return null;
            },
            repeat(event, interval, dir) {
                if (this.readonly) {
                    return;
                }

                let i = interval || 500;

                this.clearTimer();
                this.timer = setTimeout(() => {
                    this.repeat(event, 40, dir);
                }, i);

                this.spin(event, dir);
            },
            spin(event, dir) {
                if (this.$refs.input) {
                    let step = this.step * dir;
                    let currentValue = this.parseValue(this.$refs.input.$el.value) || 0;
                    let newValue = this.validateValue(currentValue + step);

                    this.updateInput(newValue, null, 'spin');
                    this.updateModel(event, newValue);

                    this.handleOnInput(event, currentValue, newValue);
                }
            },
            onUpButtonMouseDown(event) {
                if (!this.disabled) {
                    this.$refs.input.$el.focus();
                    this.repeat(event, null, 1);
                    event.preventDefault();
                }
            },
            onUpButtonMouseUp() {
                if (!this.disabled) {
                    this.clearTimer();
                }
            },
            onUpButtonMouseLeave() {
                if (!this.disabled) {
                    this.clearTimer();
                }
            },
            onUpButtonKeyUp() {
                if (!this.disabled) {
                    this.clearTimer();
                }
            },
            onUpButtonKeyDown(event) {
                if (event.keyCode === 32 || event.keyCode === 13) {
                    this.repeat(event, null, 1);
                }
            },
            onDownButtonMouseDown(event) {
                if (!this.disabled) {
                    this.$refs.input.$el.focus();
                    this.repeat(event, null, -1);
                    event.preventDefault();
                }
            },
            onDownButtonMouseUp() {
                if (!this.disabled) {
                    this.clearTimer();
                }
            },
            onDownButtonMouseLeave() {
                if (!this.disabled) {
                    this.clearTimer();
                }
            },
            onDownButtonKeyUp() {
                if (!this.disabled) {
                    this.clearTimer();
                }
            },
            onDownButtonKeyDown(event) {
                if (event.keyCode === 32 || event.keyCode === 13) {
                    this.repeat(event, null, -1);
                }
            },
            onUserInput() {
                if (this.isSpecialChar) {
                    this.$refs.input.$el.value = this.lastValue;
                }

                this.isSpecialChar = false;
            },
            onInputKeyDown(event) {
                if (this.readonly) {
                    return;
                }

                this.lastValue = event.target.value;

                if (event.shiftKey || event.altKey) {
                    this.isSpecialChar = true;

                    return;
                }

                let selectionStart = event.target.selectionStart;
                let selectionEnd = event.target.selectionEnd;
                let inputValue = event.target.value;
                let newValueStr = null;

                if (event.altKey) {
                    event.preventDefault();
                }

                switch (event.code) {
                    case 'ArrowUp':
                        this.spin(event, 1);
                        event.preventDefault();
                        break;

                    case 'ArrowDown':
                        this.spin(event, -1);
                        event.preventDefault();
                        break;

                    case 'ArrowLeft':
                        if (!this.isNumeralChar(inputValue.charAt(selectionStart - 1))) {
                            event.preventDefault();
                        }

                        break;

                    case 'ArrowRight':
                        if (!this.isNumeralChar(inputValue.charAt(selectionStart))) {
                            event.preventDefault();
                        }

                        break;

                    case 'Tab':
                    case 'Enter':
                        newValueStr = this.validateValue(this.parseValue(inputValue));
                        this.$refs.input.$el.value = this.formatValue(newValueStr);
                        this.$refs.input.$el.setAttribute('aria-valuenow', newValueStr);
                        this.updateModel(event, newValueStr);
                        break;

                    case 'Backspace': {
                        event.preventDefault();

                        if (selectionStart === selectionEnd) {
                            const deleteChar = inputValue.charAt(selectionStart - 1);
                            const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);

                            if (this.isNumeralChar(deleteChar)) {
                                const decimalLength = this.getDecimalLength(inputValue);

                                if (this._group.test(deleteChar)) {
                                    this._group.lastIndex = 0;
                                    newValueStr = inputValue.slice(0, selectionStart - 2) + inputValue.slice(selectionStart - 1);
                                } else if (this._decimal.test(deleteChar)) {
                                    this._decimal.lastIndex = 0;

                                    if (decimalLength) {
                                        this.$refs.input.$el.setSelectionRange(selectionStart - 1, selectionStart - 1);
                                    } else {
                                        newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                                    }
                                } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                                    const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';

                                    newValueStr = inputValue.slice(0, selectionStart - 1) + insertedText + inputValue.slice(selectionStart);
                                } else if (decimalCharIndexWithoutPrefix === 1) {
                                    newValueStr = inputValue.slice(0, selectionStart - 1) + '0' + inputValue.slice(selectionStart);
                                    newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                                } else {
                                    newValueStr = inputValue.slice(0, selectionStart - 1) + inputValue.slice(selectionStart);
                                }
                            }

                            this.updateValue(event, newValueStr, null, 'delete-single');
                        } else {
                            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                            this.updateValue(event, newValueStr, null, 'delete-range');
                        }

                        break;
                    }

                    case 'Delete':
                        event.preventDefault();

                        if (selectionStart === selectionEnd) {
                            const deleteChar = inputValue.charAt(selectionStart);
                            const { decimalCharIndex, decimalCharIndexWithoutPrefix } = this.getDecimalCharIndexes(inputValue);

                            if (this.isNumeralChar(deleteChar)) {
                                const decimalLength = this.getDecimalLength(inputValue);

                                if (this._group.test(deleteChar)) {
                                    this._group.lastIndex = 0;
                                    newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 2);
                                } else if (this._decimal.test(deleteChar)) {
                                    this._decimal.lastIndex = 0;

                                    if (decimalLength) {
                                        this.$refs.input.$el.setSelectionRange(selectionStart + 1, selectionStart + 1);
                                    } else {
                                        newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                                    }
                                } else if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                                    const insertedText = this.isDecimalMode() && (this.minFractionDigits || 0) < decimalLength ? '' : '0';

                                    newValueStr = inputValue.slice(0, selectionStart) + insertedText + inputValue.slice(selectionStart + 1);
                                } else if (decimalCharIndexWithoutPrefix === 1) {
                                    newValueStr = inputValue.slice(0, selectionStart) + '0' + inputValue.slice(selectionStart + 1);
                                    newValueStr = this.parseValue(newValueStr) > 0 ? newValueStr : '';
                                } else {
                                    newValueStr = inputValue.slice(0, selectionStart) + inputValue.slice(selectionStart + 1);
                                }
                            }

                            this.updateValue(event, newValueStr, null, 'delete-back-single');
                        } else {
                            newValueStr = this.deleteRange(inputValue, selectionStart, selectionEnd);
                            this.updateValue(event, newValueStr, null, 'delete-range');
                        }

                        break;

                    case 'Home':
                        if (this.min) {
                            this.updateModel(event, this.min);
                            event.preventDefault();
                        }

                        break;

                    case 'End':
                        if (this.max) {
                            this.updateModel(event, this.max);
                            event.preventDefault();
                        }

                        break;
                }
            },
            onInputKeyPress(event) {
                if (this.readonly) {
                    return;
                }

                event.preventDefault();
                let code = event.which || event.keyCode;
                let char = String.fromCharCode(code);
                const isDecimalSign = this.isDecimalSign(char);
                const isMinusSign = this.isMinusSign(char);

                if ((48 <= code && code <= 57) || isMinusSign || isDecimalSign) {
                    this.insert(event, char, { isDecimalSign, isMinusSign });
                }
            },
            onPaste(event) {
                event.preventDefault();
                let data = (event.clipboardData || window['clipboardData']).getData('Text');

                if (data) {
                    let filteredData = this.parseValue(data);

                    if (filteredData != null) {
                        this.insert(event, filteredData.toString());
                    }
                }
            },
            allowMinusSign() {
                return this.min === null || this.min < 0;
            },
            isMinusSign(char) {
                if (this._minusSign.test(char) || char === '-') {
                    this._minusSign.lastIndex = 0;

                    return true;
                }

                return false;
            },
            isDecimalSign(char) {
                if (this._decimal.test(char)) {
                    this._decimal.lastIndex = 0;

                    return true;
                }

                return false;
            },
            isDecimalMode() {
                return this.mode === 'decimal';
            },
            getDecimalCharIndexes(val) {
                let decimalCharIndex = val.search(this._decimal);

                this._decimal.lastIndex = 0;

                const filteredVal = val.replace(this._prefix, '').trim().replace(/\s/g, '').replace(this._currency, '');
                const decimalCharIndexWithoutPrefix = filteredVal.search(this._decimal);

                this._decimal.lastIndex = 0;

                return { decimalCharIndex, decimalCharIndexWithoutPrefix };
            },
            getCharIndexes(val) {
                const decimalCharIndex = val.search(this._decimal);

                this._decimal.lastIndex = 0;
                const minusCharIndex = val.search(this._minusSign);

                this._minusSign.lastIndex = 0;
                const suffixCharIndex = val.search(this._suffix);

                this._suffix.lastIndex = 0;
                const currencyCharIndex = val.search(this._currency);

                this._currency.lastIndex = 0;

                return { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex };
            },
            insert(event, text, sign = { isDecimalSign: false, isMinusSign: false }) {
                const minusCharIndexOnText = text.search(this._minusSign);

                this._minusSign.lastIndex = 0;

                if (!this.allowMinusSign() && minusCharIndexOnText !== -1) {
                    return;
                }

                const selectionStart = this.$refs.input.$el.selectionStart;
                const selectionEnd = this.$refs.input.$el.selectionEnd;
                let inputValue = this.$refs.input.$el.value.trim();
                const { decimalCharIndex, minusCharIndex, suffixCharIndex, currencyCharIndex } = this.getCharIndexes(inputValue);
                let newValueStr;

                if (sign.isMinusSign) {
                    if (selectionStart === 0) {
                        newValueStr = inputValue;

                        if (minusCharIndex === -1 || selectionEnd !== 0) {
                            newValueStr = this.insertText(inputValue, text, 0, selectionEnd);
                        }

                        this.updateValue(event, newValueStr, text, 'insert');
                    }
                } else if (sign.isDecimalSign) {
                    if (decimalCharIndex > 0 && selectionStart === decimalCharIndex) {
                        this.updateValue(event, inputValue, text, 'insert');
                    } else if (decimalCharIndex > selectionStart && decimalCharIndex < selectionEnd) {
                        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                        this.updateValue(event, newValueStr, text, 'insert');
                    } else if (decimalCharIndex === -1 && this.maxFractionDigits) {
                        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                        this.updateValue(event, newValueStr, text, 'insert');
                    }
                } else {
                    const maxFractionDigits = this.numberFormat.resolvedOptions().maximumFractionDigits;
                    const operation = selectionStart !== selectionEnd ? 'range-insert' : 'insert';

                    if (decimalCharIndex > 0 && selectionStart > decimalCharIndex) {
                        if (selectionStart + text.length - (decimalCharIndex + 1) <= maxFractionDigits) {
                            const charIndex = currencyCharIndex >= selectionStart ? currencyCharIndex - 1 : suffixCharIndex >= selectionStart ? suffixCharIndex : inputValue.length;

                            newValueStr = inputValue.slice(0, selectionStart) + text + inputValue.slice(selectionStart + text.length, charIndex) + inputValue.slice(charIndex);
                            this.updateValue(event, newValueStr, text, operation);
                        }
                    } else {
                        newValueStr = this.insertText(inputValue, text, selectionStart, selectionEnd);
                        this.updateValue(event, newValueStr, text, operation);
                    }
                }
            },
            insertText(value, text, start, end) {
                let textSplit = text === '.' ? text : text.split('.');

                if (textSplit.length === 2) {
                    const decimalCharIndex = value.slice(start, end).search(this._decimal);

                    this._decimal.lastIndex = 0;

                    return decimalCharIndex > 0 ? value.slice(0, start) + this.formatValue(text) + value.slice(end) : value || this.formatValue(text);
                } else if (end - start === value.length) {
                    return this.formatValue(text);
                } else if (start === 0) {
                    return text + value.slice(end);
                } else if (end === value.length) {
                    return value.slice(0, start) + text;
                } else {
                    return value.slice(0, start) + text + value.slice(end);
                }
            },
            deleteRange(value, start, end) {
                let newValueStr;

                if (end - start === value.length) newValueStr = '';
                else if (start === 0) newValueStr = value.slice(end);
                else if (end === value.length) newValueStr = value.slice(0, start);
                else newValueStr = value.slice(0, start) + value.slice(end);

                return newValueStr;
            },
            initCursor() {
                let selectionStart = this.$refs.input.$el.selectionStart;
                let inputValue = this.$refs.input.$el.value;
                let valueLength = inputValue.length;
                let index = null;

                // remove prefix
                let prefixLength = (this.prefixChar || '').length;

                inputValue = inputValue.replace(this._prefix, '');
                selectionStart = selectionStart - prefixLength;

                let char = inputValue.charAt(selectionStart);

                if (this.isNumeralChar(char)) {
                    return selectionStart + prefixLength;
                }

                //left
                let i = selectionStart - 1;

                while (i >= 0) {
                    char = inputValue.charAt(i);

                    if (this.isNumeralChar(char)) {
                        index = i + prefixLength;
                        break;
                    } else {
                        i--;
                    }
                }

                if (index !== null) {
                    this.$refs.input.$el.setSelectionRange(index + 1, index + 1);
                } else {
                    i = selectionStart;

                    while (i < valueLength) {
                        char = inputValue.charAt(i);

                        if (this.isNumeralChar(char)) {
                            index = i + prefixLength;
                            break;
                        } else {
                            i++;
                        }
                    }

                    if (index !== null) {
                        this.$refs.input.$el.setSelectionRange(index, index);
                    }
                }

                return index || 0;
            },
            onInputClick() {
                const currentValue = this.$refs.input.$el.value;

                if (!this.readonly && currentValue !== utils.DomHandler.getSelection()) {
                    this.initCursor();
                }
            },
            isNumeralChar(char) {
                if (char.length === 1 && (this._numeral.test(char) || this._decimal.test(char) || this._group.test(char) || this._minusSign.test(char))) {
                    this.resetRegex();

                    return true;
                }

                return false;
            },
            resetRegex() {
                this._numeral.lastIndex = 0;
                this._decimal.lastIndex = 0;
                this._group.lastIndex = 0;
                this._minusSign.lastIndex = 0;
            },
            updateValue(event, valueStr, insertedValueStr, operation) {
                let currentValue = this.$refs.input.$el.value;
                let newValue = null;

                if (valueStr != null) {
                    newValue = this.parseValue(valueStr);
                    newValue = !newValue && !this.allowEmpty ? 0 : newValue;
                    this.updateInput(newValue, insertedValueStr, operation, valueStr);

                    this.handleOnInput(event, currentValue, newValue);
                }
            },
            handleOnInput(event, currentValue, newValue) {
                if (this.isValueChanged(currentValue, newValue)) {
                    this.$emit('input', { originalEvent: event, value: newValue, formattedValue: currentValue });
                }
            },
            isValueChanged(currentValue, newValue) {
                if (newValue === null && currentValue !== null) {
                    return true;
                }

                if (newValue != null) {
                    let parsedCurrentValue = typeof currentValue === 'string' ? this.parseValue(currentValue) : currentValue;

                    return newValue !== parsedCurrentValue;
                }

                return false;
            },
            validateValue(value) {
                if (value === '-' || value == null) {
                    return null;
                }

                if (this.min != null && value < this.min) {
                    return this.min;
                }

                if (this.max != null && value > this.max) {
                    return this.max;
                }

                return value;
            },
            updateInput(value, insertedValueStr, operation, valueStr) {
                insertedValueStr = insertedValueStr || '';

                let inputValue = this.$refs.input.$el.value;
                let newValue = this.formatValue(value);
                let currentLength = inputValue.length;

                if (newValue !== valueStr) {
                    newValue = this.concatValues(newValue, valueStr);
                }

                if (currentLength === 0) {
                    this.$refs.input.$el.value = newValue;
                    this.$refs.input.$el.setSelectionRange(0, 0);
                    const index = this.initCursor();
                    const selectionEnd = index + insertedValueStr.length;

                    this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
                } else {
                    let selectionStart = this.$refs.input.$el.selectionStart;
                    let selectionEnd = this.$refs.input.$el.selectionEnd;

                    this.$refs.input.$el.value = newValue;
                    let newLength = newValue.length;

                    if (operation === 'range-insert') {
                        const startValue = this.parseValue((inputValue || '').slice(0, selectionStart));
                        const startValueStr = startValue !== null ? startValue.toString() : '';
                        const startExpr = startValueStr.split('').join(`(${this.groupChar})?`);
                        const sRegex = new RegExp(startExpr, 'g');

                        sRegex.test(newValue);

                        const tExpr = insertedValueStr.split('').join(`(${this.groupChar})?`);
                        const tRegex = new RegExp(tExpr, 'g');

                        tRegex.test(newValue.slice(sRegex.lastIndex));

                        selectionEnd = sRegex.lastIndex + tRegex.lastIndex;
                        this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
                    } else if (newLength === currentLength) {
                        if (operation === 'insert' || operation === 'delete-back-single') this.$refs.input.$el.setSelectionRange(selectionEnd + 1, selectionEnd + 1);
                        else if (operation === 'delete-single') this.$refs.input.$el.setSelectionRange(selectionEnd - 1, selectionEnd - 1);
                        else if (operation === 'delete-range' || operation === 'spin') this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
                    } else if (operation === 'delete-back-single') {
                        let prevChar = inputValue.charAt(selectionEnd - 1);
                        let nextChar = inputValue.charAt(selectionEnd);
                        let diff = currentLength - newLength;
                        let isGroupChar = this._group.test(nextChar);

                        if (isGroupChar && diff === 1) {
                            selectionEnd += 1;
                        } else if (!isGroupChar && this.isNumeralChar(prevChar)) {
                            selectionEnd += -1 * diff + 1;
                        }

                        this._group.lastIndex = 0;
                        this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
                    } else if (inputValue === '-' && operation === 'insert') {
                        this.$refs.input.$el.setSelectionRange(0, 0);
                        const index = this.initCursor();
                        const selectionEnd = index + insertedValueStr.length + 1;

                        this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
                    } else {
                        selectionEnd = selectionEnd + (newLength - currentLength);
                        this.$refs.input.$el.setSelectionRange(selectionEnd, selectionEnd);
                    }
                }

                this.$refs.input.$el.setAttribute('aria-valuenow', value);
            },
            concatValues(val1, val2) {
                if (val1 && val2) {
                    let decimalCharIndex = val2.search(this._decimal);

                    this._decimal.lastIndex = 0;

                    if (this.suffixChar) {
                        return val1.replace(this.suffixChar, '').split(this._decimal)[0] + val2.replace(this.suffixChar, '').slice(decimalCharIndex) + this.suffixChar;
                    } else {
                        return decimalCharIndex !== -1 ? val1.split(this._decimal)[0] + val2.slice(decimalCharIndex) : val1;
                    }
                }

                return val1;
            },
            getDecimalLength(value) {
                if (value) {
                    const valueSplit = value.split(this._decimal);

                    if (valueSplit.length === 2) {
                        return valueSplit[1].replace(this._suffix, '').trim().replace(/\s/g, '').replace(this._currency, '').length;
                    }
                }

                return 0;
            },
            updateModel(event, value) {
                this.d_modelValue = value;
                this.$emit('update:modelValue', value);
            },
            onInputFocus(event) {
                this.focused = true;

                if (!this.disabled && !this.readonly && this.$refs.input.$el.value !== utils.DomHandler.getSelection() && this.highlightOnFocus) {
                    event.target.select();
                }

                this.$emit('focus', event);
            },
            onInputBlur(event) {
                this.focused = false;

                let input = event.target;
                let newValue = this.validateValue(this.parseValue(input.value));

                this.$emit('blur', { originalEvent: event, value: input.value });

                input.value = this.formatValue(newValue);
                input.setAttribute('aria-valuenow', newValue);
                this.updateModel(event, newValue);
            },
            clearTimer() {
                if (this.timer) {
                    clearInterval(this.timer);
                }
            },
            maxBoundry() {
                return this.d_modelValue >= this.max;
            },
            minBoundry() {
                return this.d_modelValue <= this.min;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-inputnumber p-component p-inputwrapper',
                    {
                        'p-inputwrapper-filled': this.filled,
                        'p-inputwrapper-focus': this.focused,
                        'p-inputnumber-buttons-stacked': this.showButtons && this.buttonLayout === 'stacked',
                        'p-inputnumber-buttons-horizontal': this.showButtons && this.buttonLayout === 'horizontal',
                        'p-inputnumber-buttons-vertical': this.showButtons && this.buttonLayout === 'vertical'
                    }
                ];
            },

            upButtonClass() {
                return [
                    'p-inputnumber-button p-inputnumber-button-up',
                    this.incrementButtonClass,
                    {
                        'p-disabled': this.showButtons && this.max !== null && this.maxBoundry()
                    }
                ];
            },
            downButtonClass() {
                return [
                    'p-inputnumber-button p-inputnumber-button-down',
                    this.decrementButtonClass,
                    {
                        'p-disabled': this.showButtons && this.min !== null && this.minBoundry()
                    }
                ];
            },
            filled() {
                return this.modelValue != null && this.modelValue.toString().length > 0;
            },
            upButtonListeners() {
                return {
                    mousedown: (event) => this.onUpButtonMouseDown(event),
                    mouseup: (event) => this.onUpButtonMouseUp(event),
                    mouseleave: (event) => this.onUpButtonMouseLeave(event),
                    keydown: (event) => this.onUpButtonKeyDown(event),
                    keyup: (event) => this.onUpButtonKeyUp(event)
                };
            },
            downButtonListeners() {
                return {
                    mousedown: (event) => this.onDownButtonMouseDown(event),
                    mouseup: (event) => this.onDownButtonMouseUp(event),
                    mouseleave: (event) => this.onDownButtonMouseLeave(event),
                    keydown: (event) => this.onDownButtonKeyDown(event),
                    keyup: (event) => this.onDownButtonKeyUp(event)
                };
            },
            formattedValue() {
                const val = !this.modelValue && !this.allowEmpty ? 0 : this.modelValue;

                return this.formatValue(val);
            },
            getFormatter() {
                return this.numberFormat;
            }
        },
        components: {
            INInputText: InputText__default["default"],
            INButton: Button__default["default"]
        }
    };

    const _hoisted_1 = {
      key: 0,
      class: "p-inputnumber-button-group"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_INInputText = vue.resolveComponent("INInputText");
      const _component_INButton = vue.resolveComponent("INButton");

      return (vue.openBlock(), vue.createElementBlock("span", {
        class: vue.normalizeClass($options.containerClass)
      }, [
        vue.createVNode(_component_INInputText, vue.mergeProps({
          ref: "input",
          id: $props.inputId,
          class: ["p-inputnumber-input", $props.inputClass],
          role: "spinbutton",
          style: $props.inputStyle,
          value: $options.formattedValue,
          "aria-valuemin": $props.min,
          "aria-valuemax": $props.max,
          "aria-valuenow": $props.modelValue,
          disabled: $props.disabled,
          readonly: $props.readonly,
          placeholder: $props.placeholder,
          "aria-labelledby": _ctx.ariaLabelledby,
          "aria-label": _ctx.ariaLabel,
          onInput: $options.onUserInput,
          onKeydown: $options.onInputKeyDown,
          onKeypress: $options.onInputKeyPress,
          onPaste: $options.onPaste,
          onClick: $options.onInputClick,
          onFocus: $options.onInputFocus,
          onBlur: $options.onInputBlur
        }, $props.inputProps), null, 16, ["id", "class", "style", "value", "aria-valuemin", "aria-valuemax", "aria-valuenow", "disabled", "readonly", "placeholder", "aria-labelledby", "aria-label", "onInput", "onKeydown", "onKeypress", "onPaste", "onClick", "onFocus", "onBlur"]),
        ($props.showButtons && $props.buttonLayout === 'stacked')
          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, [
              vue.createVNode(_component_INButton, vue.mergeProps({
                class: $options.upButtonClass,
                icon: $props.incrementButtonIcon
              }, vue.toHandlers($options.upButtonListeners), {
                disabled: $props.disabled,
                tabindex: -1,
                "aria-hidden": "true"
              }, $props.incrementButtonProps), null, 16, ["class", "icon", "disabled"]),
              vue.createVNode(_component_INButton, vue.mergeProps({
                class: $options.downButtonClass,
                icon: $props.decrementButtonIcon
              }, vue.toHandlers($options.downButtonListeners), {
                disabled: $props.disabled,
                tabindex: -1,
                "aria-hidden": "true"
              }, $props.decrementButtonProps), null, 16, ["class", "icon", "disabled"])
            ]))
          : vue.createCommentVNode("", true),
        ($props.showButtons && $props.buttonLayout !== 'stacked')
          ? (vue.openBlock(), vue.createBlock(_component_INButton, vue.mergeProps({
              key: 1,
              class: $options.upButtonClass,
              icon: $props.incrementButtonIcon
            }, vue.toHandlers($options.upButtonListeners), {
              disabled: $props.disabled,
              tabindex: -1,
              "aria-hidden": "true"
            }, $props.incrementButtonProps), null, 16, ["class", "icon", "disabled"]))
          : vue.createCommentVNode("", true),
        ($props.showButtons && $props.buttonLayout !== 'stacked')
          ? (vue.openBlock(), vue.createBlock(_component_INButton, vue.mergeProps({
              key: 2,
              class: $options.downButtonClass,
              icon: $props.decrementButtonIcon
            }, vue.toHandlers($options.downButtonListeners), {
              disabled: $props.disabled,
              tabindex: -1,
              "aria-hidden": "true"
            }, $props.decrementButtonProps), null, 16, ["class", "icon", "disabled"]))
          : vue.createCommentVNode("", true)
      ], 2))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-inputnumber {\n    display: inline-flex;\n}\n.p-inputnumber-button {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex: 0 0 auto;\n}\n.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button .p-button-label,\n.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button .p-button-label {\n    display: none;\n}\n.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-up {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    padding: 0;\n}\n.p-inputnumber-buttons-stacked .p-inputnumber-input {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-inputnumber-buttons-stacked .p-button.p-inputnumber-button-down {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    border-bottom-left-radius: 0;\n    padding: 0;\n}\n.p-inputnumber-buttons-stacked .p-inputnumber-button-group {\n    display: flex;\n    flex-direction: column;\n}\n.p-inputnumber-buttons-stacked .p-inputnumber-button-group .p-button.p-inputnumber-button {\n    flex: 1 1 auto;\n}\n.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-up {\n    order: 3;\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.p-inputnumber-buttons-horizontal .p-inputnumber-input {\n    order: 2;\n    border-radius: 0;\n}\n.p-inputnumber-buttons-horizontal .p-button.p-inputnumber-button-down {\n    order: 1;\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.p-inputnumber-buttons-vertical {\n    flex-direction: column;\n}\n.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-up {\n    order: 1;\n    border-bottom-left-radius: 0;\n    border-bottom-right-radius: 0;\n    width: 100%;\n}\n.p-inputnumber-buttons-vertical .p-inputnumber-input {\n    order: 2;\n    border-radius: 0;\n    text-align: center;\n}\n.p-inputnumber-buttons-vertical .p-button.p-inputnumber-button-down {\n    order: 3;\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n    width: 100%;\n}\n.p-inputnumber-input {\n    flex: 1 1 auto;\n}\n.p-fluid .p-inputnumber {\n    width: 100%;\n}\n.p-fluid .p-inputnumber .p-inputnumber-input {\n    width: 1%;\n}\n.p-fluid .p-inputnumber-buttons-vertical .p-inputnumber-input {\n    width: 100%;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.button, primevue.inputtext, primevue.utils, Vue);

this.primevue = this.primevue || {};
this.primevue.message = (function (Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script = {
        name: 'Message',
        emits: ['close'],
        props: {
            severity: {
                type: String,
                default: 'info'
            },
            closable: {
                type: Boolean,
                default: true
            },
            sticky: {
                type: Boolean,
                default: true
            },
            life: {
                type: Number,
                default: 3000
            },
            icon: {
                type: String,
                default: null
            },
            closeIcon: {
                type: String,
                default: 'pi pi-times'
            },
            closeButtonProps: {
                type: null,
                default: null
            }
        },
        timeout: null,
        data() {
            return {
                visible: true
            };
        },
        mounted() {
            if (!this.sticky) {
                this.x();
            }
        },
        methods: {
            close(event) {
                this.visible = false;
                this.$emit('close', event);
            },
            x() {
                setTimeout(() => {
                    this.visible = false;
                }, this.life);
            }
        },
        computed: {
            containerClass() {
                return 'p-message p-component p-message-' + this.severity;
            },
            iconClass() {
                return [
                    'p-message-icon pi',
                    this.icon
                        ? this.icon
                        : {
                              'pi-info-circle': this.severity === 'info',
                              'pi-check': this.severity === 'success',
                              'pi-exclamation-triangle': this.severity === 'warn',
                              'pi-times-circle': this.severity === 'error'
                          }
                ];
            },
            closeAriaLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1 = { class: "p-message-wrapper" };
    const _hoisted_2 = { class: "p-message-text" };
    const _hoisted_3 = ["aria-label"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createBlock(vue.Transition, {
        name: "p-message",
        appear: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("div", {
            class: vue.normalizeClass($options.containerClass),
            role: "alert",
            "aria-live": "assertive",
            "aria-atomic": "true"
          }, [
            vue.createElementVNode("div", _hoisted_1, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass($options.iconClass)
              }, null, 2),
              vue.createElementVNode("div", _hoisted_2, [
                vue.renderSlot(_ctx.$slots, "default")
              ]),
              ($props.closable)
                ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                    key: 0,
                    class: "p-message-close p-link",
                    "aria-label": $options.closeAriaLabel,
                    type: "button",
                    onClick: _cache[0] || (_cache[0] = $event => ($options.close($event)))
                  }, $props.closeButtonProps), [
                    vue.createElementVNode("i", {
                      class: vue.normalizeClass(['p-message-close-icon', $props.closeIcon])
                    }, null, 2)
                  ], 16, _hoisted_3)), [
                    [_directive_ripple]
                  ])
                : vue.createCommentVNode("", true)
            ])
          ], 2), [
            [vue.vShow, $data.visible]
          ])
        ]),
        _: 3
      }))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-message-wrapper {\n    display: flex;\n    align-items: center;\n}\n.p-message-close {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-message-close.p-link {\n    margin-left: auto;\n    overflow: hidden;\n    position: relative;\n}\n.p-message-enter-from {\n    opacity: 0;\n}\n.p-message-enter-active {\n    transition: opacity 0.3s;\n}\n.p-message.p-message-leave-from {\n    max-height: 1000px;\n}\n.p-message.p-message-leave-to {\n    max-height: 0;\n    opacity: 0;\n    margin: 0 !important;\n}\n.p-message-leave-active {\n    overflow: hidden;\n    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s, margin 0.15s;\n}\n.p-message-leave-active .p-message-close {\n    display: none;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.ripple, Vue);

this.primevue = this.primevue || {};
this.primevue.progressbar = (function (vue) {
    'use strict';

    var script = {
        name: 'ProgressBar',
        props: {
            value: {
                type: Number,
                default: null
            },
            mode: {
                type: String,
                default: 'determinate'
            },
            showValue: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-progressbar p-component',
                    {
                        'p-progressbar-determinate': this.determinate,
                        'p-progressbar-indeterminate': this.indeterminate
                    }
                ];
            },
            progressStyle() {
                return {
                    width: this.value + '%',
                    display: 'flex'
                };
            },
            indeterminate() {
                return this.mode === 'indeterminate';
            },
            determinate() {
                return this.mode === 'determinate';
            }
        }
    };

    const _hoisted_1 = ["aria-valuenow"];
    const _hoisted_2 = {
      key: 0,
      class: "p-progressbar-label"
    };
    const _hoisted_3 = {
      key: 1,
      class: "p-progressbar-indeterminate-container"
    };
    const _hoisted_4 = /*#__PURE__*/vue.createElementVNode("div", { class: "p-progressbar-value p-progressbar-value-animate" }, null, -1);
    const _hoisted_5 = [
      _hoisted_4
    ];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("div", {
        role: "progressbar",
        class: vue.normalizeClass($options.containerClass),
        "aria-valuemin": "0",
        "aria-valuenow": $props.value,
        "aria-valuemax": "100"
      }, [
        ($options.determinate)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: "p-progressbar-value p-progressbar-value-animate",
              style: vue.normalizeStyle($options.progressStyle)
            }, [
              ($props.value != null && $props.value !== 0 && $props.showValue)
                ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                    vue.renderSlot(_ctx.$slots, "default", {}, () => [
                      vue.createTextVNode(vue.toDisplayString($props.value + '%'), 1)
                    ])
                  ]))
                : vue.createCommentVNode("", true)
            ], 4))
          : vue.createCommentVNode("", true),
        ($options.indeterminate)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, _hoisted_5))
          : vue.createCommentVNode("", true)
      ], 10, _hoisted_1))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-progressbar {\n    position: relative;\n    overflow: hidden;\n}\n.p-progressbar-determinate .p-progressbar-value {\n    height: 100%;\n    width: 0%;\n    position: absolute;\n    display: none;\n    border: 0 none;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n}\n.p-progressbar-determinate .p-progressbar-label {\n    display: inline-flex;\n}\n.p-progressbar-determinate .p-progressbar-value-animate {\n    transition: width 1s ease-in-out;\n}\n.p-progressbar-indeterminate .p-progressbar-value::before {\n    content: '';\n    position: absolute;\n    background-color: inherit;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    will-change: left, right;\n    -webkit-animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n    animation: p-progressbar-indeterminate-anim 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;\n}\n.p-progressbar-indeterminate .p-progressbar-value::after {\n    content: '';\n    position: absolute;\n    background-color: inherit;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    will-change: left, right;\n    -webkit-animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n    animation: p-progressbar-indeterminate-anim-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n    -webkit-animation-delay: 1.15s;\n    animation-delay: 1.15s;\n}\n@-webkit-keyframes p-progressbar-indeterminate-anim {\n0% {\n        left: -35%;\n        right: 100%;\n}\n60% {\n        left: 100%;\n        right: -90%;\n}\n100% {\n        left: 100%;\n        right: -90%;\n}\n}\n@keyframes p-progressbar-indeterminate-anim {\n0% {\n        left: -35%;\n        right: 100%;\n}\n60% {\n        left: 100%;\n        right: -90%;\n}\n100% {\n        left: 100%;\n        right: -90%;\n}\n}\n@-webkit-keyframes p-progressbar-indeterminate-anim-short {\n0% {\n        left: -200%;\n        right: 100%;\n}\n60% {\n        left: 107%;\n        right: -8%;\n}\n100% {\n        left: 107%;\n        right: -8%;\n}\n}\n@keyframes p-progressbar-indeterminate-anim-short {\n0% {\n        left: -200%;\n        right: 100%;\n}\n60% {\n        left: 107%;\n        right: -8%;\n}\n100% {\n        left: 107%;\n        right: -8%;\n}\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(Vue);

this.primevue = this.primevue || {};
this.primevue.dropdown = (function (api, OverlayEventBus, Portal, Ripple, utils, VirtualScroller, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var VirtualScroller__default = /*#__PURE__*/_interopDefaultLegacy(VirtualScroller);

    var script = {
        name: 'Dropdown',
        emits: ['update:modelValue', 'change', 'focus', 'blur', 'before-show', 'before-hide', 'show', 'hide', 'filter'],
        props: {
            modelValue: null,
            options: Array,
            optionLabel: null,
            optionValue: null,
            optionDisabled: null,
            optionGroupLabel: null,
            optionGroupChildren: null,
            scrollHeight: {
                type: String,
                default: '200px'
            },
            filter: Boolean,
            filterPlaceholder: String,
            filterLocale: String,
            filterMatchMode: {
                type: String,
                default: 'contains'
            },
            filterFields: {
                type: Array,
                default: null
            },
            editable: Boolean,
            placeholder: {
                type: String,
                default: null
            },
            disabled: {
                type: Boolean,
                default: false
            },
            dataKey: null,
            showClear: {
                type: Boolean,
                default: false
            },
            inputId: {
                type: String,
                default: null
            },
            inputClass: {
                type: [String, Object],
                default: null
            },
            inputStyle: {
                type: Object,
                default: null
            },
            inputProps: {
                type: null,
                default: null
            },
            panelClass: {
                type: [String, Object],
                default: null
            },
            panelStyle: {
                type: Object,
                default: null
            },
            panelProps: {
                type: null,
                default: null
            },
            filterInputProps: {
                type: null,
                default: null
            },
            clearIconProps: {
                type: null,
                default: null
            },
            appendTo: {
                type: String,
                default: 'body'
            },
            loading: {
                type: Boolean,
                default: false
            },
            clearIcon: {
                type: String,
                default: 'pi pi-times'
            },
            dropdownIcon: {
                type: String,
                default: 'pi pi-chevron-down'
            },
            filterIcon: {
                type: String,
                default: 'pi pi-search'
            },
            loadingIcon: {
                type: String,
                default: 'pi pi-spinner pi-spin'
            },
            resetFilterOnHide: {
                type: Boolean,
                default: false
            },
            virtualScrollerOptions: {
                type: Object,
                default: null
            },
            autoOptionFocus: {
                type: Boolean,
                default: true
            },
            autoFilterFocus: {
                type: Boolean,
                default: false
            },
            selectOnFocus: {
                type: Boolean,
                default: false
            },
            filterMessage: {
                type: String,
                default: null
            },
            selectionMessage: {
                type: String,
                default: null
            },
            emptySelectionMessage: {
                type: String,
                default: null
            },
            emptyFilterMessage: {
                type: String,
                default: null
            },
            emptyMessage: {
                type: String,
                default: null
            },
            tabindex: {
                type: Number,
                default: 0
            },
            'aria-label': {
                type: String,
                default: null
            },
            'aria-labelledby': {
                type: String,
                default: null
            }
        },
        outsideClickListener: null,
        scrollHandler: null,
        resizeListener: null,
        overlay: null,
        list: null,
        virtualScroller: null,
        searchTimeout: null,
        searchValue: null,
        isModelValueChanged: false,
        focusOnHover: false,
        data() {
            return {
                id: this.$attrs.id,
                focused: false,
                focusedOptionIndex: -1,
                filterValue: null,
                overlayVisible: false
            };
        },
        watch: {
            '$attrs.id': function (newValue) {
                this.id = newValue || utils.UniqueComponentId();
            },
            modelValue() {
                this.isModelValueChanged = true;
            },
            options() {
                this.autoUpdateModel();
            }
        },
        mounted() {
            this.id = this.id || utils.UniqueComponentId();

            this.autoUpdateModel();
        },
        updated() {
            if (this.overlayVisible && this.isModelValueChanged) {
                this.scrollInView(this.findSelectedOptionIndex());
            }

            this.isModelValueChanged = false;
        },
        beforeUnmount() {
            this.unbindOutsideClickListener();
            this.unbindResizeListener();

            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            if (this.overlay) {
                utils.ZIndexUtils.clear(this.overlay);
                this.overlay = null;
            }
        },
        methods: {
            getOptionIndex(index, fn) {
                return this.virtualScrollerDisabled ? index : fn && fn(index)['index'];
            },
            getOptionLabel(option) {
                return this.optionLabel ? utils.ObjectUtils.resolveFieldData(option, this.optionLabel) : option;
            },
            getOptionValue(option) {
                return this.optionValue ? utils.ObjectUtils.resolveFieldData(option, this.optionValue) : option;
            },
            getOptionRenderKey(option, index) {
                return (this.dataKey ? utils.ObjectUtils.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + '_' + index;
            },
            isOptionDisabled(option) {
                return this.optionDisabled ? utils.ObjectUtils.resolveFieldData(option, this.optionDisabled) : false;
            },
            isOptionGroup(option) {
                return this.optionGroupLabel && option.optionGroup && option.group;
            },
            getOptionGroupLabel(optionGroup) {
                return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupLabel);
            },
            getOptionGroupChildren(optionGroup) {
                return utils.ObjectUtils.resolveFieldData(optionGroup, this.optionGroupChildren);
            },
            getAriaPosInset(index) {
                return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter((option) => this.isOptionGroup(option)).length : index) + 1;
            },
            show(isFocus) {
                this.$emit('before-show');
                this.overlayVisible = true;
                this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;

                isFocus && utils.DomHandler.focus(this.$refs.focusInput);
            },
            hide(isFocus) {
                const _hide = () => {
                    this.$emit('before-hide');
                    this.overlayVisible = false;
                    this.focusedOptionIndex = -1;
                    this.searchValue = '';

                    this.resetFilterOnHide && (this.filterValue = null);
                    isFocus && utils.DomHandler.focus(this.$refs.focusInput);
                };

                setTimeout(() => {
                    _hide();
                }, 0); // For ScreenReaders
            },
            onFocus(event) {
                if (this.disabled) {
                    // For ScreenReaders
                    return;
                }

                this.focused = true;
                this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.overlayVisible && this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : -1;
                this.overlayVisible && this.scrollInView(this.focusedOptionIndex);
                this.$emit('focus', event);
            },
            onBlur(event) {
                this.focused = false;
                this.focusedOptionIndex = -1;
                this.searchValue = '';
                this.$emit('blur', event);
            },
            onKeyDown(event) {
                if (this.disabled) {
                    event.preventDefault();

                    return;
                }

                const metaKey = event.metaKey || event.ctrlKey;

                switch (event.code) {
                    case 'ArrowDown':
                        this.onArrowDownKey(event);
                        break;

                    case 'ArrowUp':
                        this.onArrowUpKey(event, this.editable);
                        break;

                    case 'ArrowLeft':
                    case 'ArrowRight':
                        this.onArrowLeftKey(event, this.editable);
                        break;

                    case 'Home':
                        this.onHomeKey(event, this.editable);
                        break;

                    case 'End':
                        this.onEndKey(event, this.editable);
                        break;

                    case 'PageDown':
                        this.onPageDownKey(event);
                        break;

                    case 'PageUp':
                        this.onPageUpKey(event);
                        break;

                    case 'Space':
                        this.onSpaceKey(event, this.editable);
                        break;

                    case 'Enter':
                    case 'NumpadEnter':
                        this.onEnterKey(event);
                        break;

                    case 'Escape':
                        this.onEscapeKey(event);
                        break;

                    case 'Tab':
                        this.onTabKey(event);
                        break;

                    case 'Backspace':
                        this.onBackspaceKey(event, this.editable);
                        break;

                    case 'ShiftLeft':
                    case 'ShiftRight':
                        //NOOP
                        break;

                    default:
                        if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
                            !this.overlayVisible && this.show();
                            !this.editable && this.searchOptions(event, event.key);
                        }

                        break;
                }
            },
            onEditableInput(event) {
                const value = event.target.value;

                this.searchValue = '';
                const matched = this.searchOptions(event, value);

                !matched && (this.focusedOptionIndex = -1);

                this.updateModel(event, value);
            },
            onContainerClick(event) {
                if (this.disabled || this.loading) {
                    return;
                }

                if (utils.DomHandler.hasClass(event.target, 'p-dropdown-clear-icon') || event.target.tagName === 'INPUT') {
                    return;
                } else if (!this.overlay || !this.overlay.contains(event.target)) {
                    this.overlayVisible ? this.hide(true) : this.show(true);
                }
            },
            onClearClick(event) {
                this.updateModel(event, null);
            },
            onFirstHiddenFocus(event) {
                const focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getFirstFocusableElement(this.overlay, ':not(.p-hidden-focusable)') : this.$refs.focusInput;

                utils.DomHandler.focus(focusableEl);
            },
            onLastHiddenFocus(event) {
                const focusableEl = event.relatedTarget === this.$refs.focusInput ? utils.DomHandler.getLastFocusableElement(this.overlay, ':not(.p-hidden-focusable)') : this.$refs.focusInput;

                utils.DomHandler.focus(focusableEl);
            },
            onOptionSelect(event, option, isHide = true) {
                const value = this.getOptionValue(option);

                this.updateModel(event, value);
                isHide && this.hide(true);
            },
            onOptionMouseMove(event, index) {
                if (this.focusOnHover) {
                    this.changeFocusedOptionIndex(event, index);
                }
            },
            onFilterChange(event) {
                const value = event.target.value;

                this.filterValue = value;
                this.focusedOptionIndex = -1;
                this.$emit('filter', { originalEvent: event, value });

                !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
            },
            onFilterKeyDown(event) {
                switch (event.code) {
                    case 'ArrowDown':
                        this.onArrowDownKey(event);
                        break;

                    case 'ArrowUp':
                        this.onArrowUpKey(event, true);
                        break;

                    case 'ArrowLeft':
                    case 'ArrowRight':
                        this.onArrowLeftKey(event, true);
                        break;

                    case 'Home':
                        this.onHomeKey(event, true);
                        break;

                    case 'End':
                        this.onEndKey(event, true);
                        break;

                    case 'Enter':
                        this.onEnterKey(event);
                        break;

                    case 'Escape':
                        this.onEscapeKey(event);
                        break;

                    case 'Tab':
                        this.onTabKey(event, true);
                        break;
                }
            },
            onFilterBlur() {
                this.focusedOptionIndex = -1;
            },
            onFilterUpdated() {
                if (this.overlayVisible) {
                    this.alignOverlay();
                }
            },
            onOverlayClick(event) {
                OverlayEventBus__default["default"].emit('overlay-click', {
                    originalEvent: event,
                    target: this.$el
                });
            },
            onOverlayKeyDown(event) {
                switch (event.code) {
                    case 'Escape':
                        this.onEscapeKey(event);
                        break;
                }
            },
            onArrowDownKey(event) {
                const optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.findFirstFocusedOptionIndex();

                this.changeFocusedOptionIndex(event, optionIndex);

                !this.overlayVisible && this.show();
                event.preventDefault();
            },
            onArrowUpKey(event, pressedInInputText = false) {
                if (event.altKey && !pressedInInputText) {
                    if (this.focusedOptionIndex !== -1) {
                        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                    }

                    this.overlayVisible && this.hide();
                    event.preventDefault();
                } else {
                    const optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.findLastFocusedOptionIndex();

                    this.changeFocusedOptionIndex(event, optionIndex);

                    !this.overlayVisible && this.show();
                    event.preventDefault();
                }
            },
            onArrowLeftKey(event, pressedInInputText = false) {
                pressedInInputText && (this.focusedOptionIndex = -1);
            },
            onHomeKey(event, pressedInInputText = false) {
                if (pressedInInputText) {
                    event.currentTarget.setSelectionRange(0, 0);
                    this.focusedOptionIndex = -1;
                } else {
                    this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());

                    !this.overlayVisible && this.show();
                }

                event.preventDefault();
            },
            onEndKey(event, pressedInInputText = false) {
                if (pressedInInputText) {
                    const target = event.currentTarget;
                    const len = target.value.length;

                    target.setSelectionRange(len, len);
                    this.focusedOptionIndex = -1;
                } else {
                    this.changeFocusedOptionIndex(event, this.findLastOptionIndex());

                    !this.overlayVisible && this.show();
                }

                event.preventDefault();
            },
            onPageUpKey(event) {
                this.scrollInView(0);
                event.preventDefault();
            },
            onPageDownKey(event) {
                this.scrollInView(this.visibleOptions.length - 1);
                event.preventDefault();
            },
            onEnterKey(event) {
                if (!this.overlayVisible) {
                    this.onArrowDownKey(event);
                } else {
                    if (this.focusedOptionIndex !== -1) {
                        this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                    }

                    this.hide();
                }

                event.preventDefault();
            },
            onSpaceKey(event, pressedInInputText = false) {
                !pressedInInputText && this.onEnterKey(event);
            },
            onEscapeKey(event) {
                this.overlayVisible && this.hide(true);
                event.preventDefault();
            },
            onTabKey(event, pressedInInputText = false) {
                if (!pressedInInputText) {
                    if (this.overlayVisible && this.hasFocusableElements()) {
                        utils.DomHandler.focus(this.$refs.firstHiddenFocusableElementOnOverlay);

                        event.preventDefault();
                    } else {
                        if (this.focusedOptionIndex !== -1) {
                            this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
                        }

                        this.overlayVisible && this.hide(this.filter);
                    }
                }
            },
            onBackspaceKey(event, pressedInInputText = false) {
                if (pressedInInputText) {
                    !this.overlayVisible && this.show();
                }
            },
            onOverlayEnter(el) {
                utils.ZIndexUtils.set('overlay', el, this.$primevue.config.zIndex.overlay);
                this.alignOverlay();
                this.scrollInView();

                this.autoFilterFocus && utils.DomHandler.focus(this.$refs.filterInput);
            },
            onOverlayAfterEnter() {
                this.bindOutsideClickListener();
                this.bindScrollListener();
                this.bindResizeListener();

                this.$emit('show');
            },
            onOverlayLeave() {
                this.unbindOutsideClickListener();
                this.unbindScrollListener();
                this.unbindResizeListener();

                this.$emit('hide');
                this.overlay = null;
            },
            onOverlayAfterLeave(el) {
                utils.ZIndexUtils.clear(el);
            },
            alignOverlay() {
                if (this.appendTo === 'self') {
                    utils.DomHandler.relativePosition(this.overlay, this.$el);
                } else {
                    this.overlay.style.minWidth = utils.DomHandler.getOuterWidth(this.$el) + 'px';
                    utils.DomHandler.absolutePosition(this.overlay, this.$el);
                }
            },
            bindOutsideClickListener() {
                if (!this.outsideClickListener) {
                    this.outsideClickListener = (event) => {
                        if (this.overlayVisible && this.overlay && !this.$el.contains(event.target) && !this.overlay.contains(event.target)) {
                            this.hide();
                        }
                    };

                    document.addEventListener('click', this.outsideClickListener);
                }
            },
            unbindOutsideClickListener() {
                if (this.outsideClickListener) {
                    document.removeEventListener('click', this.outsideClickListener);
                    this.outsideClickListener = null;
                }
            },
            bindScrollListener() {
                if (!this.scrollHandler) {
                    this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.$refs.container, () => {
                        if (this.overlayVisible) {
                            this.hide();
                        }
                    });
                }

                this.scrollHandler.bindScrollListener();
            },
            unbindScrollListener() {
                if (this.scrollHandler) {
                    this.scrollHandler.unbindScrollListener();
                }
            },
            bindResizeListener() {
                if (!this.resizeListener) {
                    this.resizeListener = () => {
                        if (this.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                            this.hide();
                        }
                    };

                    window.addEventListener('resize', this.resizeListener);
                }
            },
            unbindResizeListener() {
                if (this.resizeListener) {
                    window.removeEventListener('resize', this.resizeListener);
                    this.resizeListener = null;
                }
            },
            hasFocusableElements() {
                return utils.DomHandler.getFocusableElements(this.overlay, ':not(.p-hidden-focusable)').length > 0;
            },
            isOptionMatched(option) {
                return this.isValidOption(option) && this.getOptionLabel(option).toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale));
            },
            isValidOption(option) {
                return option && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
            },
            isValidSelectedOption(option) {
                return this.isValidOption(option) && this.isSelected(option);
            },
            isSelected(option) {
                return this.isValidOption(option) && utils.ObjectUtils.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
            },
            findFirstOptionIndex() {
                return this.visibleOptions.findIndex((option) => this.isValidOption(option));
            },
            findLastOptionIndex() {
                return utils.ObjectUtils.findLastIndex(this.visibleOptions, (option) => this.isValidOption(option));
            },
            findNextOptionIndex(index) {
                const matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex((option) => this.isValidOption(option)) : -1;

                return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
            },
            findPrevOptionIndex(index) {
                const matchedOptionIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleOptions.slice(0, index), (option) => this.isValidOption(option)) : -1;

                return matchedOptionIndex > -1 ? matchedOptionIndex : index;
            },
            findSelectedOptionIndex() {
                return this.hasSelectedOption ? this.visibleOptions.findIndex((option) => this.isValidSelectedOption(option)) : -1;
            },
            findFirstFocusedOptionIndex() {
                const selectedIndex = this.findSelectedOptionIndex();

                return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
            },
            findLastFocusedOptionIndex() {
                const selectedIndex = this.findSelectedOptionIndex();

                return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
            },
            searchOptions(event, char) {
                this.searchValue = (this.searchValue || '') + char;

                let optionIndex = -1;
                let matched = false;

                if (this.focusedOptionIndex !== -1) {
                    optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option));
                    optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex((option) => this.isOptionMatched(option)) : optionIndex + this.focusedOptionIndex;
                } else {
                    optionIndex = this.visibleOptions.findIndex((option) => this.isOptionMatched(option));
                }

                if (optionIndex !== -1) {
                    matched = true;
                }

                if (optionIndex === -1 && this.focusedOptionIndex === -1) {
                    optionIndex = this.findFirstFocusedOptionIndex();
                }

                if (optionIndex !== -1) {
                    this.changeFocusedOptionIndex(event, optionIndex);
                }

                if (this.searchTimeout) {
                    clearTimeout(this.searchTimeout);
                }

                this.searchTimeout = setTimeout(() => {
                    this.searchValue = '';
                    this.searchTimeout = null;
                }, 500);

                return matched;
            },
            changeFocusedOptionIndex(event, index) {
                if (this.focusedOptionIndex !== index) {
                    this.focusedOptionIndex = index;
                    this.scrollInView();

                    if (this.selectOnFocus) {
                        this.onOptionSelect(event, this.visibleOptions[index], false);
                    }
                }
            },
            scrollInView(index = -1) {
                const id = index !== -1 ? `${this.id}_${index}` : this.focusedOptionId;
                const element = utils.DomHandler.findSingle(this.list, `li[id="${id}"]`);

                if (element) {
                    element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
                } else if (!this.virtualScrollerDisabled) {
                    setTimeout(() => {
                        this.virtualScroller && this.virtualScroller.scrollToIndex(index !== -1 ? index : this.focusedOptionIndex);
                    }, 0);
                }
            },
            autoUpdateModel() {
                if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
                    this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
                    this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
                }
            },
            updateModel(event, value) {
                this.$emit('update:modelValue', value);
                this.$emit('change', { originalEvent: event, value });
            },
            flatOptions(options) {
                return (options || []).reduce((result, option, index) => {
                    result.push({ optionGroup: option, group: true, index });

                    const optionGroupChildren = this.getOptionGroupChildren(option);

                    optionGroupChildren && optionGroupChildren.forEach((o) => result.push(o));

                    return result;
                }, []);
            },
            overlayRef(el) {
                this.overlay = el;
            },
            listRef(el, contentRef) {
                this.list = el;
                contentRef && contentRef(el); // For VirtualScroller
            },
            virtualScrollerRef(el) {
                this.virtualScroller = el;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-dropdown p-component p-inputwrapper',
                    {
                        'p-disabled': this.disabled,
                        'p-dropdown-clearable': this.showClear && !this.disabled,
                        'p-focus': this.focused,
                        'p-inputwrapper-filled': this.modelValue,
                        'p-inputwrapper-focus': this.focused || this.overlayVisible,
                        'p-overlay-open': this.overlayVisible
                    }
                ];
            },
            inputStyleClass() {
                return [
                    'p-dropdown-label p-inputtext',
                    this.inputClass,
                    {
                        'p-placeholder': !this.editable && this.label === this.placeholder,
                        'p-dropdown-label-empty': !this.editable && !this.$slots['value'] && (this.label === 'p-emptylabel' || this.label.length === 0)
                    }
                ];
            },
            panelStyleClass() {
                return [
                    'p-dropdown-panel p-component',
                    this.panelClass,
                    {
                        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                        'p-ripple-disabled': this.$primevue.config.ripple === false
                    }
                ];
            },
            dropdownIconClass() {
                return ['p-dropdown-trigger-icon', this.loading ? this.loadingIcon : this.dropdownIcon];
            },
            visibleOptions() {
                const options = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];

                if (this.filterValue) {
                    const filteredOptions = api.FilterService.filter(options, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);

                    if (this.optionGroupLabel) {
                        const optionGroups = this.options || [];
                        const filtered = [];

                        optionGroups.forEach((group) => {
                            const filteredItems = group.items.filter((item) => filteredOptions.includes(item));

                            if (filteredItems.length > 0) filtered.push({ ...group, items: [...filteredItems] });
                        });

                        return this.flatOptions(filtered);
                    }

                    return filteredOptions;
                }

                return options;
            },
            hasSelectedOption() {
                return utils.ObjectUtils.isNotEmpty(this.modelValue);
            },
            label() {
                const selectedOptionIndex = this.findSelectedOptionIndex();

                return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || 'p-emptylabel';
            },
            editableInputValue() {
                const selectedOptionIndex = this.findSelectedOptionIndex();

                return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.modelValue || '';
            },
            equalityKey() {
                return this.optionValue ? null : this.dataKey;
            },
            searchFields() {
                return this.filterFields || [this.optionLabel];
            },
            filterResultMessageText() {
                return utils.ObjectUtils.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll('{0}', this.visibleOptions.length) : this.emptyFilterMessageText;
            },
            filterMessageText() {
                return this.filterMessage || this.$primevue.config.locale.searchMessage || '';
            },
            emptyFilterMessageText() {
                return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || '';
            },
            emptyMessageText() {
                return this.emptyMessage || this.$primevue.config.locale.emptyMessage || '';
            },
            selectionMessageText() {
                return this.selectionMessage || this.$primevue.config.locale.selectionMessage || '';
            },
            emptySelectionMessageText() {
                return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || '';
            },
            selectedMessageText() {
                return this.hasSelectedOption ? this.selectionMessageText.replaceAll('{0}', '1') : this.emptySelectionMessageText;
            },
            focusedOptionId() {
                return this.focusedOptionIndex !== -1 ? `${this.id}_${this.focusedOptionIndex}` : null;
            },
            ariaSetSize() {
                return this.visibleOptions.filter((option) => !this.isOptionGroup(option)).length;
            },
            virtualScrollerDisabled() {
                return !this.virtualScrollerOptions;
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        },
        components: {
            VirtualScroller: VirtualScroller__default["default"],
            Portal: Portal__default["default"]
        }
    };

    const _hoisted_1 = ["id"];
    const _hoisted_2 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant"];
    const _hoisted_3 = ["id", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-disabled"];
    const _hoisted_4 = { class: "p-dropdown-trigger" };
    const _hoisted_5 = {
      key: 0,
      class: "p-dropdown-header"
    };
    const _hoisted_6 = { class: "p-dropdown-filter-container" };
    const _hoisted_7 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
    const _hoisted_8 = {
      role: "status",
      "aria-live": "polite",
      class: "p-hidden-accessible"
    };
    const _hoisted_9 = ["id"];
    const _hoisted_10 = ["id"];
    const _hoisted_11 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove"];
    const _hoisted_12 = {
      key: 0,
      class: "p-dropdown-empty-message",
      role: "option"
    };
    const _hoisted_13 = {
      key: 1,
      class: "p-dropdown-empty-message",
      role: "option"
    };
    const _hoisted_14 = {
      key: 1,
      role: "status",
      "aria-live": "polite",
      class: "p-hidden-accessible"
    };
    const _hoisted_15 = {
      role: "status",
      "aria-live": "polite",
      class: "p-hidden-accessible"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_VirtualScroller = vue.resolveComponent("VirtualScroller");
      const _component_Portal = vue.resolveComponent("Portal");
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("div", {
        ref: "container",
        id: $data.id,
        class: vue.normalizeClass($options.containerClass),
        onClick: _cache[16] || (_cache[16] = (...args) => ($options.onContainerClick && $options.onContainerClick(...args)))
      }, [
        ($props.editable)
          ? (vue.openBlock(), vue.createElementBlock("input", vue.mergeProps({
              key: 0,
              ref: "focusInput",
              id: $props.inputId,
              type: "text",
              style: $props.inputStyle,
              class: $options.inputStyleClass,
              value: $options.editableInputValue,
              placeholder: $props.placeholder,
              tabindex: !$props.disabled ? $props.tabindex : -1,
              disabled: $props.disabled,
              autocomplete: "off",
              role: "combobox",
              "aria-label": _ctx.ariaLabel,
              "aria-labelledby": _ctx.ariaLabelledby,
              "aria-haspopup": "listbox",
              "aria-expanded": $data.overlayVisible,
              "aria-controls": $data.id + '_list',
              "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
              onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onBlur && $options.onBlur(...args))),
              onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args))),
              onInput: _cache[3] || (_cache[3] = (...args) => ($options.onEditableInput && $options.onEditableInput(...args)))
            }, $props.inputProps), null, 16, _hoisted_2))
          : (vue.openBlock(), vue.createElementBlock("span", vue.mergeProps({
              key: 1,
              ref: "focusInput",
              id: $props.inputId,
              style: $props.inputStyle,
              class: $options.inputStyleClass,
              tabindex: !$props.disabled ? $props.tabindex : -1,
              role: "combobox",
              "aria-label": _ctx.ariaLabel || ($options.label === 'p-emptylabel' ? undefined : $options.label),
              "aria-labelledby": _ctx.ariaLabelledby,
              "aria-haspopup": "listbox",
              "aria-expanded": $data.overlayVisible,
              "aria-controls": $data.id + '_list',
              "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
              "aria-disabled": $props.disabled,
              onFocus: _cache[4] || (_cache[4] = (...args) => ($options.onFocus && $options.onFocus(...args))),
              onBlur: _cache[5] || (_cache[5] = (...args) => ($options.onBlur && $options.onBlur(...args))),
              onKeydown: _cache[6] || (_cache[6] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args)))
            }, $props.inputProps), [
              vue.renderSlot(_ctx.$slots, "value", {
                value: $props.modelValue,
                placeholder: $props.placeholder
              }, () => [
                vue.createTextVNode(vue.toDisplayString($options.label === 'p-emptylabel' ? ' ' : $options.label || 'empty'), 1)
              ])
            ], 16, _hoisted_3)),
        ($props.showClear && $props.modelValue != null)
          ? (vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
              key: 2,
              class: ['p-dropdown-clear-icon', $props.clearIcon],
              onClick: _cache[7] || (_cache[7] = (...args) => ($options.onClearClick && $options.onClearClick(...args)))
            }, $props.clearIconProps), null, 16))
          : vue.createCommentVNode("", true),
        vue.createElementVNode("div", _hoisted_4, [
          vue.renderSlot(_ctx.$slots, "indicator", {}, () => [
            vue.createElementVNode("span", {
              class: vue.normalizeClass($options.dropdownIconClass),
              "aria-hidden": "true"
            }, null, 2)
          ])
        ]),
        vue.createVNode(_component_Portal, { appendTo: $props.appendTo }, {
          default: vue.withCtx(() => [
            vue.createVNode(vue.Transition, {
              name: "p-connected-overlay",
              onEnter: $options.onOverlayEnter,
              onAfterEnter: $options.onOverlayAfterEnter,
              onLeave: $options.onOverlayLeave,
              onAfterLeave: $options.onOverlayAfterLeave
            }, {
              default: vue.withCtx(() => [
                ($data.overlayVisible)
                  ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                      key: 0,
                      ref: $options.overlayRef,
                      style: $props.panelStyle,
                      class: $options.panelStyleClass,
                      onClick: _cache[14] || (_cache[14] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args))),
                      onKeydown: _cache[15] || (_cache[15] = (...args) => ($options.onOverlayKeyDown && $options.onOverlayKeyDown(...args)))
                    }, $props.panelProps), [
                      vue.createElementVNode("span", {
                        ref: "firstHiddenFocusableElementOnOverlay",
                        role: "presentation",
                        "aria-hidden": "true",
                        class: "p-hidden-accessible p-hidden-focusable",
                        tabindex: 0,
                        onFocus: _cache[8] || (_cache[8] = (...args) => ($options.onFirstHiddenFocus && $options.onFirstHiddenFocus(...args)))
                      }, null, 544),
                      vue.renderSlot(_ctx.$slots, "header", {
                        value: $props.modelValue,
                        options: $options.visibleOptions
                      }),
                      ($props.filter)
                        ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                            vue.createElementVNode("div", _hoisted_6, [
                              vue.createElementVNode("input", vue.mergeProps({
                                ref: "filterInput",
                                type: "text",
                                value: $data.filterValue,
                                onVnodeUpdated: _cache[9] || (_cache[9] = (...args) => ($options.onFilterUpdated && $options.onFilterUpdated(...args))),
                                class: "p-dropdown-filter p-inputtext p-component",
                                placeholder: $props.filterPlaceholder,
                                role: "searchbox",
                                autocomplete: "off",
                                "aria-owns": $data.id + '_list',
                                "aria-activedescendant": $options.focusedOptionId,
                                onKeydown: _cache[10] || (_cache[10] = (...args) => ($options.onFilterKeyDown && $options.onFilterKeyDown(...args))),
                                onBlur: _cache[11] || (_cache[11] = (...args) => ($options.onFilterBlur && $options.onFilterBlur(...args))),
                                onInput: _cache[12] || (_cache[12] = (...args) => ($options.onFilterChange && $options.onFilterChange(...args)))
                              }, $props.filterInputProps), null, 16, _hoisted_7),
                              vue.createElementVNode("span", {
                                class: vue.normalizeClass(['p-dropdown-filter-icon', $props.filterIcon])
                              }, null, 2)
                            ]),
                            vue.createElementVNode("span", _hoisted_8, vue.toDisplayString($options.filterResultMessageText), 1)
                          ]))
                        : vue.createCommentVNode("", true),
                      vue.createElementVNode("div", {
                        class: "p-dropdown-items-wrapper",
                        style: vue.normalizeStyle({ 'max-height': $options.virtualScrollerDisabled ? $props.scrollHeight : '' })
                      }, [
                        vue.createVNode(_component_VirtualScroller, vue.mergeProps({ ref: $options.virtualScrollerRef }, $props.virtualScrollerOptions, {
                          items: $options.visibleOptions,
                          style: { height: $props.scrollHeight },
                          tabindex: -1,
                          disabled: $options.virtualScrollerDisabled
                        }), vue.createSlots({
                          content: vue.withCtx(({ styleClass, contentRef, items, getItemOptions, contentStyle, itemSize }) => [
                            vue.createElementVNode("ul", {
                              ref: (el) => $options.listRef(el, contentRef),
                              id: $data.id + '_list',
                              class: vue.normalizeClass(['p-dropdown-items', styleClass]),
                              style: vue.normalizeStyle(contentStyle),
                              role: "listbox"
                            }, [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(items, (option, i) => {
                                return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                  key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                                }, [
                                  ($options.isOptionGroup(option))
                                    ? (vue.openBlock(), vue.createElementBlock("li", {
                                        key: 0,
                                        id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                                        style: vue.normalizeStyle({ height: itemSize ? itemSize + 'px' : undefined }),
                                        class: "p-dropdown-item-group",
                                        role: "option"
                                      }, [
                                        vue.renderSlot(_ctx.$slots, "optiongroup", {
                                          option: option.optionGroup,
                                          index: $options.getOptionIndex(i, getItemOptions)
                                        }, () => [
                                          vue.createTextVNode(vue.toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 1)
                                        ])
                                      ], 12, _hoisted_10))
                                    : vue.withDirectives((vue.openBlock(), vue.createElementBlock("li", {
                                        key: 1,
                                        id: $data.id + '_' + $options.getOptionIndex(i, getItemOptions),
                                        style: vue.normalizeStyle({ height: itemSize ? itemSize + 'px' : undefined }),
                                        class: vue.normalizeClass(['p-dropdown-item', { 'p-highlight': $options.isSelected(option), 'p-focus': $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions), 'p-disabled': $options.isOptionDisabled(option) }]),
                                        role: "option",
                                        "aria-label": $options.getOptionLabel(option),
                                        "aria-selected": $options.isSelected(option),
                                        "aria-disabled": $options.isOptionDisabled(option),
                                        "aria-setsize": $options.ariaSetSize,
                                        "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                                        onClick: $event => ($options.onOptionSelect($event, option)),
                                        onMousemove: $event => ($options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions)))
                                      }, [
                                        vue.renderSlot(_ctx.$slots, "option", {
                                          option: option,
                                          index: $options.getOptionIndex(i, getItemOptions)
                                        }, () => [
                                          vue.createTextVNode(vue.toDisplayString($options.getOptionLabel(option)), 1)
                                        ])
                                      ], 46, _hoisted_11)), [
                                        [_directive_ripple]
                                      ])
                                ], 64))
                              }), 128)),
                              ($data.filterValue && (!items || (items && items.length === 0)))
                                ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_12, [
                                    vue.renderSlot(_ctx.$slots, "emptyfilter", {}, () => [
                                      vue.createTextVNode(vue.toDisplayString($options.emptyFilterMessageText), 1)
                                    ])
                                  ]))
                                : (!$props.options || ($props.options && $props.options.length === 0))
                                  ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_13, [
                                      vue.renderSlot(_ctx.$slots, "empty", {}, () => [
                                        vue.createTextVNode(vue.toDisplayString($options.emptyMessageText), 1)
                                      ])
                                    ]))
                                  : vue.createCommentVNode("", true)
                            ], 14, _hoisted_9)
                          ]),
                          _: 2
                        }, [
                          (_ctx.$slots.loader)
                            ? {
                                name: "loader",
                                fn: vue.withCtx(({ options }) => [
                                  vue.renderSlot(_ctx.$slots, "loader", { options: options })
                                ]),
                                key: "0"
                              }
                            : undefined
                        ]), 1040, ["items", "style", "disabled"])
                      ], 4),
                      vue.renderSlot(_ctx.$slots, "footer", {
                        value: $props.modelValue,
                        options: $options.visibleOptions
                      }),
                      (!$props.options || ($props.options && $props.options.length === 0))
                        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_14, vue.toDisplayString($options.emptyMessageText), 1))
                        : vue.createCommentVNode("", true),
                      vue.createElementVNode("span", _hoisted_15, vue.toDisplayString($options.selectedMessageText), 1),
                      vue.createElementVNode("span", {
                        ref: "lastHiddenFocusableElementOnOverlay",
                        role: "presentation",
                        "aria-hidden": "true",
                        class: "p-hidden-accessible p-hidden-focusable",
                        tabindex: 0,
                        onFocus: _cache[13] || (_cache[13] = (...args) => ($options.onLastHiddenFocus && $options.onLastHiddenFocus(...args)))
                      }, null, 544)
                    ], 16))
                  : vue.createCommentVNode("", true)
              ]),
              _: 3
            }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
          ]),
          _: 3
        }, 8, ["appendTo"])
      ], 10, _hoisted_1))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-dropdown {\n    display: inline-flex;\n    cursor: pointer;\n    position: relative;\n    user-select: none;\n}\n.p-dropdown-clear-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-dropdown-trigger {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n}\n.p-dropdown-label {\n    display: block;\n    white-space: nowrap;\n    overflow: hidden;\n    flex: 1 1 auto;\n    width: 1%;\n    text-overflow: ellipsis;\n    cursor: pointer;\n}\n.p-dropdown-label-empty {\n    overflow: hidden;\n    opacity: 0;\n}\ninput.p-dropdown-label {\n    cursor: default;\n}\n.p-dropdown .p-dropdown-panel {\n    min-width: 100%;\n}\n.p-dropdown-panel {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-dropdown-items-wrapper {\n    overflow: auto;\n}\n.p-dropdown-item {\n    cursor: pointer;\n    font-weight: normal;\n    white-space: nowrap;\n    position: relative;\n    overflow: hidden;\n}\n.p-dropdown-item-group {\n    cursor: auto;\n}\n.p-dropdown-items {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-dropdown-filter {\n    width: 100%;\n}\n.p-dropdown-filter-container {\n    position: relative;\n}\n.p-dropdown-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-fluid .p-dropdown {\n    display: flex;\n}\n.p-fluid .p-dropdown .p-dropdown-label {\n    width: 1%;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.api, primevue.overlayeventbus, primevue.portal, primevue.ripple, primevue.utils, primevue.virtualscroller, Vue);

this.primevue = this.primevue || {};
this.primevue.dialog = (function (FocusTrap, Portal, Ripple, utils, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var FocusTrap__default = /*#__PURE__*/_interopDefaultLegacy(FocusTrap);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script = {
        name: 'Dialog',
        inheritAttrs: false,
        emits: ['update:visible', 'show', 'hide', 'after-hide', 'maximize', 'unmaximize', 'dragend'],
        props: {
            header: {
                type: null,
                default: null
            },
            footer: {
                type: null,
                default: null
            },
            visible: {
                type: Boolean,
                default: false
            },
            modal: {
                type: Boolean,
                default: null
            },
            contentStyle: {
                type: null,
                default: null
            },
            contentClass: {
                type: String,
                default: null
            },
            contentProps: {
                type: null,
                default: null
            },
            rtl: {
                type: Boolean,
                default: null
            },
            maximizable: {
                type: Boolean,
                default: false
            },
            dismissableMask: {
                type: Boolean,
                default: false
            },
            closable: {
                type: Boolean,
                default: true
            },
            closeOnEscape: {
                type: Boolean,
                default: true
            },
            showHeader: {
                type: Boolean,
                default: true
            },
            baseZIndex: {
                type: Number,
                default: 0
            },
            autoZIndex: {
                type: Boolean,
                default: true
            },
            position: {
                type: String,
                default: 'center'
            },
            breakpoints: {
                type: Object,
                default: null
            },
            draggable: {
                type: Boolean,
                default: true
            },
            keepInViewport: {
                type: Boolean,
                default: true
            },
            minX: {
                type: Number,
                default: 0
            },
            minY: {
                type: Number,
                default: 0
            },
            appendTo: {
                type: String,
                default: 'body'
            },
            closeIcon: {
                type: String,
                default: 'pi pi-times'
            },
            maximizeIcon: {
                type: String,
                default: 'pi pi-window-maximize'
            },
            minimizeIcon: {
                type: String,
                default: 'pi pi-window-minimize'
            },
            closeButtonProps: {
                type: null,
                default: null
            },
            _instance: null
        },
        provide() {
            return {
                dialogRef: vue.computed(() => this._instance)
            };
        },
        data() {
            return {
                containerVisible: this.visible,
                maximized: false,
                focusableMax: null,
                focusableClose: null
            };
        },
        documentKeydownListener: null,
        container: null,
        mask: null,
        content: null,
        headerContainer: null,
        footerContainer: null,
        maximizableButton: null,
        closeButton: null,
        styleElement: null,
        dragging: null,
        documentDragListener: null,
        documentDragEndListener: null,
        lastPageX: null,
        lastPageY: null,
        updated() {
            if (this.visible) {
                this.containerVisible = this.visible;
            }
        },
        beforeUnmount() {
            this.unbindDocumentState();
            this.unbindGlobalListeners();
            this.destroyStyle();

            if (this.mask && this.autoZIndex) {
                utils.ZIndexUtils.clear(this.mask);
            }

            this.container = null;
            this.mask = null;
        },
        mounted() {
            if (this.breakpoints) {
                this.createStyle();
            }
        },
        methods: {
            close() {
                this.$emit('update:visible', false);
            },
            onBeforeEnter(el) {
                el.setAttribute(this.attributeSelector, '');
            },
            onEnter() {
                this.$emit('show');
                this.focus();
                this.enableDocumentSettings();
                this.bindGlobalListeners();

                if (this.autoZIndex) {
                    utils.ZIndexUtils.set('modal', this.mask, this.baseZIndex + this.$primevue.config.zIndex.modal);
                }
            },
            onBeforeLeave() {
                if (this.modal) {
                    utils.DomHandler.addClass(this.mask, 'p-component-overlay-leave');
                }
            },
            onLeave() {
                this.$emit('hide');
                this.focusableClose = null;
                this.focusableMax = null;
            },
            onAfterLeave() {
                if (this.autoZIndex) {
                    utils.ZIndexUtils.clear(this.mask);
                }

                this.containerVisible = false;
                this.unbindDocumentState();
                this.unbindGlobalListeners();
                this.$emit('after-hide');
            },
            onMaskClick(event) {
                if (this.dismissableMask && this.modal && this.mask === event.target) {
                    this.close();
                }
            },
            focus() {
                const findFocusableElement = (container) => {
                    return container.querySelector('[autofocus]');
                };

                let focusTarget = this.$slots.footer && findFocusableElement(this.footerContainer);

                if (!focusTarget) {
                    focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);

                    if (!focusTarget) {
                        focusTarget = this.$slots.default && findFocusableElement(this.content);

                        if (!focusTarget) {
                            if (this.maximizable) {
                                this.focusableMax = true;
                                focusTarget = this.maximizableButton;
                            } else {
                                this.focusableClose = true;
                                focusTarget = this.closeButton;
                            }
                        }
                    }
                }

                if (focusTarget) {
                    utils.DomHandler.focus(focusTarget);
                }
            },
            maximize(event) {
                if (this.maximized) {
                    this.maximized = false;
                    this.$emit('unmaximize', event);
                } else {
                    this.maximized = true;
                    this.$emit('maximize', event);
                }

                if (!this.modal) {
                    if (this.maximized) utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
                    else utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
            },
            enableDocumentSettings() {
                if (this.modal || (this.maximizable && this.maximized)) {
                    utils.DomHandler.addClass(document.body, 'p-overflow-hidden');
                }
            },
            unbindDocumentState() {
                if (this.modal || (this.maximizable && this.maximized)) {
                    utils.DomHandler.removeClass(document.body, 'p-overflow-hidden');
                }
            },
            onKeyDown(event) {
                if (event.code === 'Escape' && this.closeOnEscape) {
                    this.close();
                }
            },
            bindDocumentKeyDownListener() {
                if (!this.documentKeydownListener) {
                    this.documentKeydownListener = this.onKeyDown.bind(this);
                    window.document.addEventListener('keydown', this.documentKeydownListener);
                }
            },
            unbindDocumentKeyDownListener() {
                if (this.documentKeydownListener) {
                    window.document.removeEventListener('keydown', this.documentKeydownListener);
                    this.documentKeydownListener = null;
                }
            },
            getPositionClass() {
                const positions = ['left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
                const pos = positions.find((item) => item === this.position);

                return pos ? `p-dialog-${pos}` : '';
            },
            containerRef(el) {
                this.container = el;
            },
            maskRef(el) {
                this.mask = el;
            },
            contentRef(el) {
                this.content = el;
            },
            headerContainerRef(el) {
                this.headerContainer = el;
            },
            footerContainerRef(el) {
                this.footerContainer = el;
            },
            maximizableRef(el) {
                this.maximizableButton = el;
            },
            closeButtonRef(el) {
                this.closeButton = el;
            },
            createStyle() {
                if (!this.styleElement) {
                    this.styleElement = document.createElement('style');
                    this.styleElement.type = 'text/css';
                    document.head.appendChild(this.styleElement);

                    let innerHTML = '';

                    for (let breakpoint in this.breakpoints) {
                        innerHTML += `
                        @media screen and (max-width: ${breakpoint}) {
                            .p-dialog[${this.attributeSelector}] {
                                width: ${this.breakpoints[breakpoint]} !important;
                            }
                        }
                    `;
                    }

                    this.styleElement.innerHTML = innerHTML;
                }
            },
            destroyStyle() {
                if (this.styleElement) {
                    document.head.removeChild(this.styleElement);
                    this.styleElement = null;
                }
            },
            initDrag(event) {
                if (utils.DomHandler.hasClass(event.target, 'p-dialog-header-icon') || utils.DomHandler.hasClass(event.target.parentElement, 'p-dialog-header-icon')) {
                    return;
                }

                if (this.draggable) {
                    this.dragging = true;
                    this.lastPageX = event.pageX;
                    this.lastPageY = event.pageY;

                    this.container.style.margin = '0';
                    utils.DomHandler.addClass(document.body, 'p-unselectable-text');
                }
            },
            bindGlobalListeners() {
                if (this.draggable) {
                    this.bindDocumentDragListener();
                    this.bindDocumentDragEndListener();
                }

                if (this.closeOnEscape && this.closable) {
                    this.bindDocumentKeyDownListener();
                }
            },
            unbindGlobalListeners() {
                this.unbindDocumentDragListener();
                this.unbindDocumentDragEndListener();
                this.unbindDocumentKeyDownListener();
            },
            bindDocumentDragListener() {
                this.documentDragListener = (event) => {
                    if (this.dragging) {
                        let width = utils.DomHandler.getOuterWidth(this.container);
                        let height = utils.DomHandler.getOuterHeight(this.container);
                        let deltaX = event.pageX - this.lastPageX;
                        let deltaY = event.pageY - this.lastPageY;
                        let offset = this.container.getBoundingClientRect();
                        let leftPos = offset.left + deltaX;
                        let topPos = offset.top + deltaY;
                        let viewport = utils.DomHandler.getViewport();

                        this.container.style.position = 'fixed';

                        if (this.keepInViewport) {
                            if (leftPos >= this.minX && leftPos + width < viewport.width) {
                                this.lastPageX = event.pageX;
                                this.container.style.left = leftPos + 'px';
                            }

                            if (topPos >= this.minY && topPos + height < viewport.height) {
                                this.lastPageY = event.pageY;
                                this.container.style.top = topPos + 'px';
                            }
                        } else {
                            this.lastPageX = event.pageX;
                            this.container.style.left = leftPos + 'px';
                            this.lastPageY = event.pageY;
                            this.container.style.top = topPos + 'px';
                        }
                    }
                };

                window.document.addEventListener('mousemove', this.documentDragListener);
            },
            unbindDocumentDragListener() {
                if (this.documentDragListener) {
                    window.document.removeEventListener('mousemove', this.documentDragListener);
                    this.documentDragListener = null;
                }
            },
            bindDocumentDragEndListener() {
                this.documentDragEndListener = (event) => {
                    if (this.dragging) {
                        this.dragging = false;
                        utils.DomHandler.removeClass(document.body, 'p-unselectable-text');

                        this.$emit('dragend', event);
                    }
                };

                window.document.addEventListener('mouseup', this.documentDragEndListener);
            },
            unbindDocumentDragEndListener() {
                if (this.documentDragEndListener) {
                    window.document.removeEventListener('mouseup', this.documentDragEndListener);
                    this.documentDragEndListener = null;
                }
            }
        },
        computed: {
            maskClass() {
                return ['p-dialog-mask', { 'p-component-overlay p-component-overlay-enter': this.modal }, this.getPositionClass()];
            },
            dialogClass() {
                return [
                    'p-dialog p-component',
                    {
                        'p-dialog-rtl': this.rtl,
                        'p-dialog-maximized': this.maximizable && this.maximized,
                        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                        'p-ripple-disabled': this.$primevue.config.ripple === false
                    }
                ];
            },
            maximizeIconClass() {
                return [
                    'p-dialog-header-maximize-icon',
                    {
                        [this.maximizeIcon]: !this.maximized,
                        [this.minimizeIcon]: this.maximized
                    }
                ];
            },
            ariaId() {
                return utils.UniqueComponentId();
            },
            ariaLabelledById() {
                return this.header != null || this.$attrs['aria-labelledby'] !== null ? this.ariaId + '_header' : null;
            },
            closeAriaLabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : undefined;
            },
            attributeSelector() {
                return utils.UniqueComponentId();
            },
            contentStyleClass() {
                return ['p-dialog-content', this.contentClass];
            }
        },
        directives: {
            ripple: Ripple__default["default"],
            focustrap: FocusTrap__default["default"]
        },
        components: {
            Portal: Portal__default["default"]
        }
    };

    const _hoisted_1 = ["aria-labelledby", "aria-modal"];
    const _hoisted_2 = ["id"];
    const _hoisted_3 = { class: "p-dialog-header-icons" };
    const _hoisted_4 = ["autofocus", "tabindex"];
    const _hoisted_5 = ["autofocus", "aria-label"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_Portal = vue.resolveComponent("Portal");
      const _directive_ripple = vue.resolveDirective("ripple");
      const _directive_focustrap = vue.resolveDirective("focustrap");

      return (vue.openBlock(), vue.createBlock(_component_Portal, { appendTo: $props.appendTo }, {
        default: vue.withCtx(() => [
          ($data.containerVisible)
            ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                ref: $options.maskRef,
                class: vue.normalizeClass($options.maskClass),
                onClick: _cache[3] || (_cache[3] = (...args) => ($options.onMaskClick && $options.onMaskClick(...args)))
              }, [
                vue.createVNode(vue.Transition, {
                  name: "p-dialog",
                  onBeforeEnter: $options.onBeforeEnter,
                  onEnter: $options.onEnter,
                  onBeforeLeave: $options.onBeforeLeave,
                  onLeave: $options.onLeave,
                  onAfterLeave: $options.onAfterLeave,
                  appear: ""
                }, {
                  default: vue.withCtx(() => [
                    ($props.visible)
                      ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                          key: 0,
                          ref: $options.containerRef,
                          class: $options.dialogClass,
                          role: "dialog",
                          "aria-labelledby": $options.ariaLabelledById,
                          "aria-modal": $props.modal
                        }, _ctx.$attrs), [
                          ($props.showHeader)
                            ? (vue.openBlock(), vue.createElementBlock("div", {
                                key: 0,
                                ref: $options.headerContainerRef,
                                class: "p-dialog-header",
                                onMousedown: _cache[2] || (_cache[2] = (...args) => ($options.initDrag && $options.initDrag(...args)))
                              }, [
                                vue.renderSlot(_ctx.$slots, "header", {}, () => [
                                  ($props.header)
                                    ? (vue.openBlock(), vue.createElementBlock("span", {
                                        key: 0,
                                        id: $options.ariaLabelledById,
                                        class: "p-dialog-title"
                                      }, vue.toDisplayString($props.header), 9, _hoisted_2))
                                    : vue.createCommentVNode("", true)
                                ]),
                                vue.createElementVNode("div", _hoisted_3, [
                                  ($props.maximizable)
                                    ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
                                        key: 0,
                                        ref: $options.maximizableRef,
                                        autofocus: $data.focusableMax,
                                        class: "p-dialog-header-icon p-dialog-header-maximize p-link",
                                        onClick: _cache[0] || (_cache[0] = (...args) => ($options.maximize && $options.maximize(...args))),
                                        type: "button",
                                        tabindex: $props.maximizable ? '0' : '-1'
                                      }, [
                                        vue.createElementVNode("span", {
                                          class: vue.normalizeClass($options.maximizeIconClass)
                                        }, null, 2)
                                      ], 8, _hoisted_4)), [
                                        [_directive_ripple]
                                      ])
                                    : vue.createCommentVNode("", true),
                                  ($props.closable)
                                    ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", vue.mergeProps({
                                        key: 1,
                                        ref: $options.closeButtonRef,
                                        autofocus: $data.focusableClose,
                                        class: "p-dialog-header-icon p-dialog-header-close p-link",
                                        onClick: _cache[1] || (_cache[1] = (...args) => ($options.close && $options.close(...args))),
                                        "aria-label": $options.closeAriaLabel,
                                        type: "button"
                                      }, $props.closeButtonProps), [
                                        vue.createElementVNode("span", {
                                          class: vue.normalizeClass(['p-dialog-header-close-icon', $props.closeIcon])
                                        }, null, 2)
                                      ], 16, _hoisted_5)), [
                                        [_directive_ripple]
                                      ])
                                    : vue.createCommentVNode("", true)
                                ])
                              ], 544))
                            : vue.createCommentVNode("", true),
                          vue.createElementVNode("div", vue.mergeProps({
                            ref: $options.contentRef,
                            class: $options.contentStyleClass,
                            style: $props.contentStyle
                          }, $props.contentProps), [
                            vue.renderSlot(_ctx.$slots, "default")
                          ], 16),
                          ($props.footer || _ctx.$slots.footer)
                            ? (vue.openBlock(), vue.createElementBlock("div", {
                                key: 1,
                                ref: $options.footerContainerRef,
                                class: "p-dialog-footer"
                              }, [
                                vue.renderSlot(_ctx.$slots, "footer", {}, () => [
                                  vue.createTextVNode(vue.toDisplayString($props.footer), 1)
                                ])
                              ], 512))
                            : vue.createCommentVNode("", true)
                        ], 16, _hoisted_1)), [
                          [_directive_focustrap, { disabled: !$props.modal }]
                        ])
                      : vue.createCommentVNode("", true)
                  ]),
                  _: 3
                }, 8, ["onBeforeEnter", "onEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
              ], 2))
            : vue.createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["appendTo"]))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-dialog-mask {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    pointer-events: none;\n}\n.p-dialog-mask.p-component-overlay {\n    pointer-events: auto;\n}\n.p-dialog {\n    display: flex;\n    flex-direction: column;\n    pointer-events: auto;\n    max-height: 90%;\n    transform: scale(1);\n}\n.p-dialog-content {\n    overflow-y: auto;\n}\n.p-dialog-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    flex-shrink: 0;\n}\n.p-dialog-footer {\n    flex-shrink: 0;\n}\n.p-dialog .p-dialog-header-icons {\n    display: flex;\n    align-items: center;\n}\n.p-dialog .p-dialog-header-icon {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n}\n\n/* Fluid */\n.p-fluid .p-dialog-footer .p-button {\n    width: auto;\n}\n\n/* Animation */\n/* Center */\n.p-dialog-enter-active {\n    transition: all 150ms cubic-bezier(0, 0, 0.2, 1);\n}\n.p-dialog-leave-active {\n    transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.p-dialog-enter-from,\n.p-dialog-leave-to {\n    opacity: 0;\n    transform: scale(0.7);\n}\n\n/* Top, Bottom, Left, Right, Top* and Bottom* */\n.p-dialog-top .p-dialog,\n.p-dialog-bottom .p-dialog,\n.p-dialog-left .p-dialog,\n.p-dialog-right .p-dialog,\n.p-dialog-topleft .p-dialog,\n.p-dialog-topright .p-dialog,\n.p-dialog-bottomleft .p-dialog,\n.p-dialog-bottomright .p-dialog {\n    margin: 0.75rem;\n    transform: translate3d(0px, 0px, 0px);\n}\n.p-dialog-top .p-dialog-enter-active,\n.p-dialog-top .p-dialog-leave-active,\n.p-dialog-bottom .p-dialog-enter-active,\n.p-dialog-bottom .p-dialog-leave-active,\n.p-dialog-left .p-dialog-enter-active,\n.p-dialog-left .p-dialog-leave-active,\n.p-dialog-right .p-dialog-enter-active,\n.p-dialog-right .p-dialog-leave-active,\n.p-dialog-topleft .p-dialog-enter-active,\n.p-dialog-topleft .p-dialog-leave-active,\n.p-dialog-topright .p-dialog-enter-active,\n.p-dialog-topright .p-dialog-leave-active,\n.p-dialog-bottomleft .p-dialog-enter-active,\n.p-dialog-bottomleft .p-dialog-leave-active,\n.p-dialog-bottomright .p-dialog-enter-active,\n.p-dialog-bottomright .p-dialog-leave-active {\n    transition: all 0.3s ease-out;\n}\n.p-dialog-top .p-dialog-enter-from,\n.p-dialog-top .p-dialog-leave-to {\n    transform: translate3d(0px, -100%, 0px);\n}\n.p-dialog-bottom .p-dialog-enter-from,\n.p-dialog-bottom .p-dialog-leave-to {\n    transform: translate3d(0px, 100%, 0px);\n}\n.p-dialog-left .p-dialog-enter-from,\n.p-dialog-left .p-dialog-leave-to,\n.p-dialog-topleft .p-dialog-enter-from,\n.p-dialog-topleft .p-dialog-leave-to,\n.p-dialog-bottomleft .p-dialog-enter-from,\n.p-dialog-bottomleft .p-dialog-leave-to {\n    transform: translate3d(-100%, 0px, 0px);\n}\n.p-dialog-right .p-dialog-enter-from,\n.p-dialog-right .p-dialog-leave-to,\n.p-dialog-topright .p-dialog-enter-from,\n.p-dialog-topright .p-dialog-leave-to,\n.p-dialog-bottomright .p-dialog-enter-from,\n.p-dialog-bottomright .p-dialog-leave-to {\n    transform: translate3d(100%, 0px, 0px);\n}\n\n/* Maximize */\n.p-dialog-maximized {\n    -webkit-transition: none;\n    transition: none;\n    transform: none;\n    width: 100vw !important;\n    height: 100vh !important;\n    top: 0px !important;\n    left: 0px !important;\n    max-height: 100%;\n    height: 100%;\n}\n.p-dialog-maximized .p-dialog-content {\n    flex-grow: 1;\n}\n\n/* Position */\n.p-dialog-left {\n    justify-content: flex-start;\n}\n.p-dialog-right {\n    justify-content: flex-end;\n}\n.p-dialog-top {\n    align-items: flex-start;\n}\n.p-dialog-topleft {\n    justify-content: flex-start;\n    align-items: flex-start;\n}\n.p-dialog-topright {\n    justify-content: flex-end;\n    align-items: flex-start;\n}\n.p-dialog-bottom {\n    align-items: flex-end;\n}\n.p-dialog-bottomleft {\n    justify-content: flex-start;\n    align-items: flex-end;\n}\n.p-dialog-bottomright {\n    justify-content: flex-end;\n    align-items: flex-end;\n}\n.p-confirm-dialog .p-dialog-content {\n    display: flex;\n    align-items: center;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.focustrap, primevue.portal, primevue.ripple, primevue.utils, Vue);

this.primevue = this.primevue || {};
this.primevue.paginator = (function (utils, vue, Ripple, Dropdown, InputNumber) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);
    var Dropdown__default = /*#__PURE__*/_interopDefaultLegacy(Dropdown);
    var InputNumber__default = /*#__PURE__*/_interopDefaultLegacy(InputNumber);

    var script$9 = {
        name: 'CurrentPageReport',
        props: {
            pageCount: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number,
                default: 0
            },
            page: {
                type: Number,
                default: 0
            },
            first: {
                type: Number,
                default: 0
            },
            rows: {
                type: Number,
                default: 0
            },
            totalRecords: {
                type: Number,
                default: 0
            },
            template: {
                type: String,
                default: '({currentPage} of {totalPages})'
            }
        },
        computed: {
            text() {
                let text = this.template
                    .replace('{currentPage}', this.currentPage)
                    .replace('{totalPages}', this.pageCount)
                    .replace('{first}', this.pageCount > 0 ? this.first + 1 : 0)
                    .replace('{last}', Math.min(this.first + this.rows, this.totalRecords))
                    .replace('{rows}', this.rows)
                    .replace('{totalRecords}', this.totalRecords);

                return text;
            }
        }
    };

    const _hoisted_1$6 = { class: "p-paginator-current" };

    function render$9(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("span", _hoisted_1$6, vue.toDisplayString($options.text), 1))
    }

    script$9.render = render$9;

    var script$8 = {
        name: 'FirstPageLink',
        computed: {
            containerClass() {
                return [
                    'p-paginator-first p-paginator-element p-link',
                    {
                        'p-disabled': this.$attrs.disabled
                    }
                ];
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$5 = /*#__PURE__*/vue.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-double-left" }, null, -1);
    const _hoisted_2$5 = [
      _hoisted_1$5
    ];

    function render$8(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
        class: vue.normalizeClass($options.containerClass),
        type: "button"
      }, _hoisted_2$5, 2)), [
        [_directive_ripple]
      ])
    }

    script$8.render = render$8;

    var script$7 = {
        name: 'JumpToPageDropdown',
        emits: ['page-change'],
        props: {
            page: Number,
            pageCount: Number,
            disabled: Boolean
        },
        methods: {
            onChange(value) {
                this.$emit('page-change', value);
            }
        },
        computed: {
            pageOptions() {
                let opts = [];

                for (let i = 0; i < this.pageCount; i++) {
                    opts.push({ label: String(i + 1), value: i });
                }

                return opts;
            }
        },
        components: {
            JTPDropdown: Dropdown__default["default"]
        }
    };

    function render$7(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_JTPDropdown = vue.resolveComponent("JTPDropdown");

      return (vue.openBlock(), vue.createBlock(_component_JTPDropdown, {
        modelValue: $props.page,
        options: $options.pageOptions,
        optionLabel: "label",
        optionValue: "value",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ($options.onChange($event))),
        class: "p-paginator-page-options",
        disabled: $props.disabled
      }, null, 8, ["modelValue", "options", "disabled"]))
    }

    script$7.render = render$7;

    var script$6 = {
        name: 'JumpToPageInput',
        inheritAttrs: false,
        emits: ['page-change'],
        props: {
            page: Number,
            pageCount: Number,
            disabled: Boolean
        },
        data() {
            return {
                d_page: this.page
            };
        },
        watch: {
            page(newValue) {
                this.d_page = newValue;
            }
        },
        methods: {
            onChange(value) {
                if (value !== this.page) {
                    this.d_page = value;
                    this.$emit('page-change', value - 1);
                }
            }
        },
        computed: {
            inputArialabel() {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.jumpToPageInputLabel : undefined;
            }
        },
        components: {
            JTPInput: InputNumber__default["default"]
        }
    };

    function render$6(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_JTPInput = vue.resolveComponent("JTPInput");

      return (vue.openBlock(), vue.createBlock(_component_JTPInput, {
        ref: "jtpInput",
        modelValue: $data.d_page,
        class: "p-paginator-page-input",
        "aria-label": $options.inputArialabel,
        disabled: $props.disabled,
        "onUpdate:modelValue": $options.onChange
      }, null, 8, ["modelValue", "aria-label", "disabled", "onUpdate:modelValue"]))
    }

    script$6.render = render$6;

    var script$5 = {
        name: 'LastPageLink',
        computed: {
            containerClass() {
                return [
                    'p-paginator-last p-paginator-element p-link',
                    {
                        'p-disabled': this.$attrs.disabled
                    }
                ];
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$4 = /*#__PURE__*/vue.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-double-right" }, null, -1);
    const _hoisted_2$4 = [
      _hoisted_1$4
    ];

    function render$5(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
        class: vue.normalizeClass($options.containerClass),
        type: "button"
      }, _hoisted_2$4, 2)), [
        [_directive_ripple]
      ])
    }

    script$5.render = render$5;

    var script$4 = {
        name: 'NextPageLink',
        computed: {
            containerClass() {
                return [
                    'p-paginator-next p-paginator-element p-link',
                    {
                        'p-disabled': this.$attrs.disabled
                    }
                ];
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$3 = /*#__PURE__*/vue.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-right" }, null, -1);
    const _hoisted_2$3 = [
      _hoisted_1$3
    ];

    function render$4(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
        class: vue.normalizeClass($options.containerClass),
        type: "button"
      }, _hoisted_2$3, 2)), [
        [_directive_ripple]
      ])
    }

    script$4.render = render$4;

    var script$3 = {
        name: 'PageLinks',
        inheritAttrs: false,
        emits: ['click'],
        props: {
            value: Array,
            page: Number
        },
        methods: {
            onPageLinkClick(event, pageLink) {
                this.$emit('click', {
                    originalEvent: event,
                    value: pageLink
                });
            },
            ariaPageLabel(value) {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.pageLabel.replace(/{page}/g, value) : undefined;
            }
        },
        computed: {},
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$2 = { class: "p-paginator-pages" };
    const _hoisted_2$2 = ["aria-label", "aria-current", "onClick"];

    function render$3(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("span", _hoisted_1$2, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.value, (pageLink) => {
          return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
            key: pageLink,
            class: vue.normalizeClass(['p-paginator-page p-paginator-element p-link', { 'p-highlight': pageLink - 1 === $props.page }]),
            type: "button",
            "aria-label": $options.ariaPageLabel(pageLink),
            "aria-current": pageLink - 1 === $props.page ? 'page' : undefined,
            onClick: $event => ($options.onPageLinkClick($event, pageLink))
          }, [
            vue.createTextVNode(vue.toDisplayString(pageLink), 1)
          ], 10, _hoisted_2$2)), [
            [_directive_ripple]
          ])
        }), 128))
      ]))
    }

    script$3.render = render$3;

    var script$2 = {
        name: 'PrevPageLink',
        computed: {
            containerClass() {
                return [
                    'p-paginator-prev p-paginator-element p-link',
                    {
                        'p-disabled': this.$attrs.disabled
                    }
                ];
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$1 = /*#__PURE__*/vue.createElementVNode("span", { class: "p-paginator-icon pi pi-angle-left" }, null, -1);
    const _hoisted_2$1 = [
      _hoisted_1$1
    ];

    function render$2(_ctx, _cache, $props, $setup, $data, $options) {
      const _directive_ripple = vue.resolveDirective("ripple");

      return vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
        class: vue.normalizeClass($options.containerClass),
        type: "button"
      }, _hoisted_2$1, 2)), [
        [_directive_ripple]
      ])
    }

    script$2.render = render$2;

    var script$1 = {
        name: 'RowsPerPageDropdown',
        emits: ['rows-change'],
        props: {
            options: Array,
            rows: Number,
            disabled: Boolean
        },
        methods: {
            onChange(value) {
                this.$emit('rows-change', value);
            }
        },
        computed: {
            rowsOptions() {
                let opts = [];

                if (this.options) {
                    for (let i = 0; i < this.options.length; i++) {
                        opts.push({ label: String(this.options[i]), value: this.options[i] });
                    }
                }

                return opts;
            }
        },
        components: {
            RPPDropdown: Dropdown__default["default"]
        }
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_RPPDropdown = vue.resolveComponent("RPPDropdown");

      return (vue.openBlock(), vue.createBlock(_component_RPPDropdown, {
        modelValue: $props.rows,
        options: $options.rowsOptions,
        optionLabel: "label",
        optionValue: "value",
        "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ($options.onChange($event))),
        class: "p-paginator-rpp-options",
        disabled: $props.disabled
      }, null, 8, ["modelValue", "options", "disabled"]))
    }

    script$1.render = render$1;

    var script = {
        name: 'Paginator',
        emits: ['update:first', 'update:rows', 'page'],
        props: {
            totalRecords: {
                type: Number,
                default: 0
            },
            rows: {
                type: Number,
                default: 0
            },
            first: {
                type: Number,
                default: 0
            },
            pageLinkSize: {
                type: Number,
                default: 5
            },
            rowsPerPageOptions: {
                type: Array,
                default: null
            },
            template: {
                type: [Object, String],
                default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
            },
            currentPageReportTemplate: {
                type: null,
                default: '({currentPage} of {totalPages})'
            },
            alwaysShow: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                d_first: this.first,
                d_rows: this.rows
            };
        },
        watch: {
            first(newValue) {
                this.d_first = newValue;
            },
            rows(newValue) {
                this.d_rows = newValue;
            },
            totalRecords(newValue) {
                if (this.page > 0 && newValue && this.d_first >= newValue) {
                    this.changePage(this.pageCount - 1);
                }
            }
        },
        mounted() {
            this.setPaginatorAttribute();
            this.createStyle();
        },
        methods: {
            changePage(p) {
                const pc = this.pageCount;

                if (p >= 0 && p < pc) {
                    this.d_first = this.d_rows * p;
                    const state = {
                        page: p,
                        first: this.d_first,
                        rows: this.d_rows,
                        pageCount: pc
                    };

                    this.$emit('update:first', this.d_first);
                    this.$emit('update:rows', this.d_rows);
                    this.$emit('page', state);
                }
            },

            changePageToFirst(event) {
                if (!this.isFirstPage) {
                    this.changePage(0);
                }

                event.preventDefault();
            },
            changePageToPrev(event) {
                this.changePage(this.page - 1);
                event.preventDefault();
            },
            changePageLink(event) {
                this.changePage(event.value - 1);
                event.originalEvent.preventDefault();
            },
            changePageToNext(event) {
                this.changePage(this.page + 1);
                event.preventDefault();
            },
            changePageToLast(event) {
                if (!this.isLastPage) {
                    this.changePage(this.pageCount - 1);
                }

                event.preventDefault();
            },
            onRowChange(value) {
                this.d_rows = value;
                this.changePage(this.page);
            },
            createStyle() {
                if (this.hasBreakpoints()) {
                    this.styleElement = document.createElement('style');
                    this.styleElement.type = 'text/css';
                    document.head.appendChild(this.styleElement);

                    let innerHTML = '';

                    const keys = Object.keys(this.template);
                    const sortedBreakpoints = {};

                    keys.sort((a, b) => parseInt(a) - parseInt(b)).forEach((key) => {
                        sortedBreakpoints[key] = this.template[key];
                    });

                    for (const [index, [key]] of Object.entries(Object.entries(sortedBreakpoints))) {
                        const minValue = Object.entries(sortedBreakpoints)[index - 1] ? `and (min-width:${Object.keys(sortedBreakpoints)[index - 1]})` : '';

                        if (key === 'default') {
                            innerHTML += `
                            @media screen ${minValue} {
                                .paginator[${this.attributeSelector}],
                                .p-paginator-default{
                                    display: flex !important;
                                }
                            }
                        `;
                        } else {
                            innerHTML += `
                        .paginator[${this.attributeSelector}], .p-paginator-${key} {
                                display: none !important;
                            }
                        @media screen ${minValue} and (max-width: ${key}) {
                            .paginator[${this.attributeSelector}], .p-paginator-${key} {
                                display: flex !important;
                            }
                            .paginator[${this.attributeSelector}],
                            .p-paginator-default{
                                display: none !important;
                            }
                        }
                    `;
                        }
                    }

                    this.styleElement.innerHTML = innerHTML;
                }
            },
            hasBreakpoints() {
                return typeof this.template === 'object';
            },
            getPaginatorClasses(key) {
                return [
                    {
                        'p-paginator-default': !this.hasBreakpoints(),
                        [`p-paginator-${key}`]: this.hasBreakpoints()
                    }
                ];
            },
            setPaginatorAttribute() {
                if (this.$refs.paginator && this.$refs.paginator.length >= 0) {
                    [...this.$refs.paginator].forEach((el) => {
                        el.setAttribute(this.attributeSelector, '');
                    });
                }
            },
            getAriaLabel(labelType) {
                return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria[labelType] : undefined;
            }
        },
        computed: {
            templateItems() {
                let keys = {};

                if (this.hasBreakpoints()) {
                    keys = this.template;

                    if (!keys.default) {
                        keys.default = 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown';
                    }

                    for (const item in keys) {
                        keys[item] = this.template[item].split(' ').map((value) => {
                            return value.trim();
                        });
                    }

                    return keys;
                }

                keys['default'] = this.template.split(' ').map((value) => {
                    return value.trim();
                });

                return keys;
            },
            page() {
                return Math.floor(this.d_first / this.d_rows);
            },
            pageCount() {
                return Math.ceil(this.totalRecords / this.d_rows);
            },
            isFirstPage() {
                return this.page === 0;
            },
            isLastPage() {
                return this.page === this.pageCount - 1;
            },
            calculatePageLinkBoundaries() {
                const numberOfPages = this.pageCount;
                const visiblePages = Math.min(this.pageLinkSize, numberOfPages);

                //calculate range, keep current in middle if necessary
                let start = Math.max(0, Math.ceil(this.page - visiblePages / 2));
                let end = Math.min(numberOfPages - 1, start + visiblePages - 1);

                //check when approaching to last page
                const delta = this.pageLinkSize - (end - start + 1);

                start = Math.max(0, start - delta);

                return [start, end];
            },
            pageLinks() {
                let pageLinks = [];
                let boundaries = this.calculatePageLinkBoundaries;
                let start = boundaries[0];
                let end = boundaries[1];

                for (var i = start; i <= end; i++) {
                    pageLinks.push(i + 1);
                }

                return pageLinks;
            },
            currentState() {
                return {
                    page: this.page,
                    first: this.d_first,
                    rows: this.d_rows
                };
            },
            empty() {
                return this.pageCount === 0;
            },
            currentPage() {
                return this.pageCount > 0 ? this.page + 1 : 0;
            },
            attributeSelector() {
                return utils.UniqueComponentId();
            }
        },
        components: {
            CurrentPageReport: script$9,
            FirstPageLink: script$8,
            LastPageLink: script$5,
            NextPageLink: script$4,
            PageLinks: script$3,
            PrevPageLink: script$2,
            RowsPerPageDropdown: script$1,
            JumpToPageDropdown: script$7,
            JumpToPageInput: script$6
        }
    };

    const _hoisted_1 = { key: 0 };
    const _hoisted_2 = {
      key: 0,
      class: "p-paginator-left-content"
    };
    const _hoisted_3 = {
      key: 1,
      class: "p-paginator-right-content"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_FirstPageLink = vue.resolveComponent("FirstPageLink");
      const _component_PrevPageLink = vue.resolveComponent("PrevPageLink");
      const _component_NextPageLink = vue.resolveComponent("NextPageLink");
      const _component_LastPageLink = vue.resolveComponent("LastPageLink");
      const _component_PageLinks = vue.resolveComponent("PageLinks");
      const _component_CurrentPageReport = vue.resolveComponent("CurrentPageReport");
      const _component_RowsPerPageDropdown = vue.resolveComponent("RowsPerPageDropdown");
      const _component_JumpToPageDropdown = vue.resolveComponent("JumpToPageDropdown");
      const _component_JumpToPageInput = vue.resolveComponent("JumpToPageInput");

      return ($props.alwaysShow ? true : $options.pageLinks && $options.pageLinks.length > 1)
        ? (vue.openBlock(), vue.createElementBlock("nav", _hoisted_1, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.templateItems, (value, key) => {
              return (vue.openBlock(), vue.createElementBlock("div", {
                key: key,
                ref_for: true,
                ref: "paginator",
                class: vue.normalizeClass(["p-paginator p-component", $options.getPaginatorClasses(key)])
              }, [
                (_ctx.$slots.start)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                      vue.renderSlot(_ctx.$slots, "start", { state: $options.currentState })
                    ]))
                  : vue.createCommentVNode("", true),
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(value, (item) => {
                  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: item }, [
                    (item === 'FirstPageLink')
                      ? (vue.openBlock(), vue.createBlock(_component_FirstPageLink, {
                          key: 0,
                          "aria-label": $options.getAriaLabel('firstPageLabel'),
                          onClick: _cache[0] || (_cache[0] = $event => ($options.changePageToFirst($event))),
                          disabled: $options.isFirstPage || $options.empty
                        }, null, 8, ["aria-label", "disabled"]))
                      : (item === 'PrevPageLink')
                        ? (vue.openBlock(), vue.createBlock(_component_PrevPageLink, {
                            key: 1,
                            "aria-label": $options.getAriaLabel('prevPageLabel'),
                            onClick: _cache[1] || (_cache[1] = $event => ($options.changePageToPrev($event))),
                            disabled: $options.isFirstPage || $options.empty
                          }, null, 8, ["aria-label", "disabled"]))
                        : (item === 'NextPageLink')
                          ? (vue.openBlock(), vue.createBlock(_component_NextPageLink, {
                              key: 2,
                              "aria-label": $options.getAriaLabel('nextPageLabel'),
                              onClick: _cache[2] || (_cache[2] = $event => ($options.changePageToNext($event))),
                              disabled: $options.isLastPage || $options.empty
                            }, null, 8, ["aria-label", "disabled"]))
                          : (item === 'LastPageLink')
                            ? (vue.openBlock(), vue.createBlock(_component_LastPageLink, {
                                key: 3,
                                "aria-label": $options.getAriaLabel('lastPageLabel'),
                                onClick: _cache[3] || (_cache[3] = $event => ($options.changePageToLast($event))),
                                disabled: $options.isLastPage || $options.empty
                              }, null, 8, ["aria-label", "disabled"]))
                            : (item === 'PageLinks')
                              ? (vue.openBlock(), vue.createBlock(_component_PageLinks, {
                                  key: 4,
                                  "aria-label": $options.getAriaLabel('pageLabel'),
                                  value: $options.pageLinks,
                                  page: $options.page,
                                  onClick: _cache[4] || (_cache[4] = $event => ($options.changePageLink($event)))
                                }, null, 8, ["aria-label", "value", "page"]))
                              : (item === 'CurrentPageReport')
                                ? (vue.openBlock(), vue.createBlock(_component_CurrentPageReport, {
                                    key: 5,
                                    "aria-live": "polite",
                                    template: $props.currentPageReportTemplate,
                                    currentPage: $options.currentPage,
                                    page: $options.page,
                                    pageCount: $options.pageCount,
                                    first: $data.d_first,
                                    rows: $data.d_rows,
                                    totalRecords: $props.totalRecords
                                  }, null, 8, ["template", "currentPage", "page", "pageCount", "first", "rows", "totalRecords"]))
                                : (item === 'RowsPerPageDropdown' && $props.rowsPerPageOptions)
                                  ? (vue.openBlock(), vue.createBlock(_component_RowsPerPageDropdown, {
                                      key: 6,
                                      "aria-label": $options.getAriaLabel('rowsPerPageLabel'),
                                      rows: $data.d_rows,
                                      options: $props.rowsPerPageOptions,
                                      onRowsChange: _cache[5] || (_cache[5] = $event => ($options.onRowChange($event))),
                                      disabled: $options.empty
                                    }, null, 8, ["aria-label", "rows", "options", "disabled"]))
                                  : (item === 'JumpToPageDropdown')
                                    ? (vue.openBlock(), vue.createBlock(_component_JumpToPageDropdown, {
                                        key: 7,
                                        "aria-label": $options.getAriaLabel('jumpToPageDropdownLabel'),
                                        page: $options.page,
                                        pageCount: $options.pageCount,
                                        onPageChange: _cache[6] || (_cache[6] = $event => ($options.changePage($event))),
                                        disabled: $options.empty
                                      }, null, 8, ["aria-label", "page", "pageCount", "disabled"]))
                                    : (item === 'JumpToPageInput')
                                      ? (vue.openBlock(), vue.createBlock(_component_JumpToPageInput, {
                                          key: 8,
                                          page: $options.currentPage,
                                          onPageChange: _cache[7] || (_cache[7] = $event => ($options.changePage($event))),
                                          disabled: $options.empty
                                        }, null, 8, ["page", "disabled"]))
                                      : vue.createCommentVNode("", true)
                  ], 64))
                }), 128)),
                (_ctx.$slots.end)
                  ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3, [
                      vue.renderSlot(_ctx.$slots, "end", { state: $options.currentState })
                    ]))
                  : vue.createCommentVNode("", true)
              ], 2))
            }), 128))
          ]))
        : vue.createCommentVNode("", true)
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-paginator-default {\n    display: flex;\n}\n.p-paginator {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    flex-wrap: wrap;\n}\n.p-paginator-left-content {\n    margin-right: auto;\n}\n.p-paginator-right-content {\n    margin-left: auto;\n}\n.p-paginator-page,\n.p-paginator-next,\n.p-paginator-last,\n.p-paginator-first,\n.p-paginator-prev,\n.p-paginator-current {\n    cursor: pointer;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    line-height: 1;\n    user-select: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-paginator-element:focus {\n    z-index: 1;\n    position: relative;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.utils, Vue, primevue.ripple, primevue.dropdown, primevue.inputnumber);

this.primevue = this.primevue || {};
this.primevue.tree = (function (utils, Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script$1 = {
        name: 'TreeNode',
        emits: ['node-toggle', 'node-click', 'checkbox-change'],
        props: {
            node: {
                type: null,
                default: null
            },
            expandedKeys: {
                type: null,
                default: null
            },
            selectionKeys: {
                type: null,
                default: null
            },
            selectionMode: {
                type: String,
                default: null
            },
            templates: {
                type: null,
                default: null
            },
            level: {
                type: Number,
                default: null
            },
            index: {
                type: Number,
                default: null
            }
        },
        nodeTouched: false,
        mounted() {
            const hasTreeSelectParent = this.$refs.currentNode.closest('.p-treeselect-items-wrapper');

            if (hasTreeSelectParent) {
                this.setAllNodesTabIndexes();
            }
        },
        methods: {
            toggle() {
                this.$emit('node-toggle', this.node);
            },
            label(node) {
                return typeof node.label === 'function' ? node.label() : node.label;
            },
            onChildNodeToggle(node) {
                this.$emit('node-toggle', node);
            },
            onClick(event) {
                if (utils.DomHandler.hasClass(event.target, 'p-tree-toggler') || utils.DomHandler.hasClass(event.target.parentElement, 'p-tree-toggler')) {
                    return;
                }

                if (this.isCheckboxSelectionMode()) {
                    this.toggleCheckbox();
                } else {
                    this.$emit('node-click', {
                        originalEvent: event,
                        nodeTouched: this.nodeTouched,
                        node: this.node
                    });
                }

                this.nodeTouched = false;
            },
            onChildNodeClick(event) {
                this.$emit('node-click', event);
            },
            onTouchEnd() {
                this.nodeTouched = true;
            },
            onKeyDown(event) {
                if (!this.isSameNode(event)) return;

                switch (event.code) {
                    case 'Tab':
                        this.onTabKey(event);

                        break;

                    case 'ArrowDown':
                        this.onArrowDown(event);

                        break;

                    case 'ArrowUp':
                        this.onArrowUp(event);

                        break;

                    case 'ArrowRight':
                        this.onArrowRight(event);

                        break;

                    case 'ArrowLeft':
                        this.onArrowLeft(event);

                        break;

                    case 'Enter':
                    case 'Space':
                        this.onEnterKey(event);

                        break;
                }
            },
            onArrowDown(event) {
                const nodeElement = event.target;
                const listElement = nodeElement.children[1];

                if (listElement) {
                    this.focusRowChange(nodeElement, listElement.children[0]);
                } else {
                    if (nodeElement.nextElementSibling) {
                        this.focusRowChange(nodeElement, nodeElement.nextElementSibling);
                    } else {
                        let nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);

                        if (nextSiblingAncestor) {
                            this.focusRowChange(nodeElement, nextSiblingAncestor);
                        }
                    }
                }

                event.preventDefault();
            },
            onArrowUp(event) {
                const nodeElement = event.target;

                if (nodeElement.previousElementSibling) {
                    this.focusRowChange(nodeElement, nodeElement.previousElementSibling, this.findLastVisibleDescendant(nodeElement.previousElementSibling));
                } else {
                    let parentNodeElement = this.getParentNodeElement(nodeElement);

                    if (parentNodeElement) {
                        this.focusRowChange(nodeElement, parentNodeElement);
                    }
                }

                event.preventDefault();
            },
            onArrowRight(event) {
                if (this.leaf || this.expanded) return;

                event.currentTarget.tabIndex = -1;

                this.$emit('node-toggle', this.node);
                this.$nextTick(() => {
                    this.onArrowDown(event);
                });
            },
            onArrowLeft(event) {
                const togglerElement = utils.DomHandler.findSingle(event.currentTarget, '.p-tree-toggler');

                if (this.level === 0 && !this.expanded) {
                    return false;
                }

                if (this.expanded && !this.leaf) {
                    togglerElement.click();

                    return false;
                }

                const target = this.findBeforeClickableNode(event.currentTarget);

                if (target) {
                    this.focusRowChange(event.currentTarget, target);
                }
            },
            onEnterKey(event) {
                this.setTabIndexForSelectionMode(event, this.nodeTouched);
                this.onClick(event);

                event.preventDefault();
            },
            onTabKey() {
                this.setAllNodesTabIndexes();
            },
            setAllNodesTabIndexes() {
                const nodes = utils.DomHandler.find(this.$refs.currentNode.closest('.p-tree-container'), '.p-treenode');

                const hasSelectedNode = [...nodes].some((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');

                [...nodes].forEach((node) => {
                    node.tabIndex = -1;
                });

                if (hasSelectedNode) {
                    const selectedNodes = [...nodes].filter((node) => node.getAttribute('aria-selected') === 'true' || node.getAttribute('aria-checked') === 'true');

                    selectedNodes[0].tabIndex = 0;

                    return;
                }

                [...nodes][0].tabIndex = 0;
            },
            setTabIndexForSelectionMode(event, nodeTouched) {
                if (this.selectionMode !== null) {
                    const elements = [...utils.DomHandler.find(this.$refs.currentNode.parentElement, '.p-treenode')];

                    event.currentTarget.tabIndex = nodeTouched === false ? -1 : 0;

                    if (elements.every((element) => element.tabIndex === -1)) {
                        elements[0].tabIndex = 0;
                    }
                }
            },
            focusRowChange(firstFocusableRow, currentFocusedRow, lastVisibleDescendant) {
                firstFocusableRow.tabIndex = '-1';
                currentFocusedRow.tabIndex = '0';

                this.focusNode(lastVisibleDescendant || currentFocusedRow);
            },
            findBeforeClickableNode(node) {
                const parentListElement = node.closest('ul').closest('li');

                if (parentListElement) {
                    const prevNodeButton = utils.DomHandler.findSingle(parentListElement, 'button');

                    if (prevNodeButton && prevNodeButton.style.visibility !== 'hidden') {
                        return parentListElement;
                    }

                    return this.findBeforeClickableNode(node.previousElementSibling);
                }

                return null;
            },
            toggleCheckbox() {
                let _selectionKeys = this.selectionKeys ? { ...this.selectionKeys } : {};
                const _check = !this.checked;

                this.propagateDown(this.node, _check, _selectionKeys);

                this.$emit('checkbox-change', {
                    node: this.node,
                    check: _check,
                    selectionKeys: _selectionKeys
                });
            },
            propagateDown(node, check, selectionKeys) {
                if (check) selectionKeys[node.key] = { checked: true, partialChecked: false };
                else delete selectionKeys[node.key];

                if (node.children && node.children.length) {
                    for (let child of node.children) {
                        this.propagateDown(child, check, selectionKeys);
                    }
                }
            },
            propagateUp(event) {
                let check = event.check;
                let _selectionKeys = { ...event.selectionKeys };
                let checkedChildCount = 0;
                let childPartialSelected = false;

                for (let child of this.node.children) {
                    if (_selectionKeys[child.key] && _selectionKeys[child.key].checked) checkedChildCount++;
                    else if (_selectionKeys[child.key] && _selectionKeys[child.key].partialChecked) childPartialSelected = true;
                }

                if (check && checkedChildCount === this.node.children.length) {
                    _selectionKeys[this.node.key] = { checked: true, partialChecked: false };
                } else {
                    if (!check) {
                        delete _selectionKeys[this.node.key];
                    }

                    if (childPartialSelected || (checkedChildCount > 0 && checkedChildCount !== this.node.children.length)) _selectionKeys[this.node.key] = { checked: false, partialChecked: true };
                    else delete _selectionKeys[this.node.key];
                }

                this.$emit('checkbox-change', {
                    node: event.node,
                    check: event.check,
                    selectionKeys: _selectionKeys
                });
            },
            onChildCheckboxChange(event) {
                this.$emit('checkbox-change', event);
            },
            findNextSiblingOfAncestor(nodeElement) {
                let parentNodeElement = this.getParentNodeElement(nodeElement);

                if (parentNodeElement) {
                    if (parentNodeElement.nextElementSibling) return parentNodeElement.nextElementSibling;
                    else return this.findNextSiblingOfAncestor(parentNodeElement);
                } else {
                    return null;
                }
            },
            findLastVisibleDescendant(nodeElement) {
                const childrenListElement = nodeElement.children[1];

                if (childrenListElement) {
                    const lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];

                    return this.findLastVisibleDescendant(lastChildElement);
                } else {
                    return nodeElement;
                }
            },
            getParentNodeElement(nodeElement) {
                const parentNodeElement = nodeElement.parentElement.parentElement;

                return utils.DomHandler.hasClass(parentNodeElement, 'p-treenode') ? parentNodeElement : null;
            },
            focusNode(element) {
                element.focus();
            },
            isCheckboxSelectionMode() {
                return this.selectionMode === 'checkbox';
            },
            isSameNode(event) {
                return event.currentTarget && (event.currentTarget.isSameNode(event.target) || event.currentTarget.isSameNode(event.target.closest('.p-treenode')));
            }
        },
        computed: {
            hasChildren() {
                return this.node.children && this.node.children.length > 0;
            },
            expanded() {
                return this.expandedKeys && this.expandedKeys[this.node.key] === true;
            },
            leaf() {
                return this.node.leaf === false ? false : !(this.node.children && this.node.children.length);
            },
            selectable() {
                return this.node.selectable === false ? false : this.selectionMode != null;
            },
            selected() {
                return this.selectionMode && this.selectionKeys ? this.selectionKeys[this.node.key] === true : false;
            },
            containerClass() {
                return ['p-treenode', { 'p-treenode-leaf': this.leaf }];
            },
            contentClass() {
                return [
                    'p-treenode-content',
                    this.node.styleClass,
                    {
                        'p-treenode-selectable': this.selectable,
                        'p-highlight': this.checkboxMode ? this.checked : this.selected
                    }
                ];
            },
            icon() {
                return ['p-treenode-icon', this.node.icon];
            },
            toggleIcon() {
                return ['p-tree-toggler-icon pi pi-fw', this.expanded ? this.node.expandedIcon || 'pi-chevron-down' : this.node.collapsedIcon || 'pi-chevron-right'];
            },
            checkboxClass() {
                return ['p-checkbox-box', { 'p-highlight': this.checked, 'p-indeterminate': this.partialChecked }];
            },
            checkboxIcon() {
                return ['p-checkbox-icon', { 'pi pi-check': this.checked, 'pi pi-minus': this.partialChecked }];
            },
            checkboxMode() {
                return this.selectionMode === 'checkbox' && this.node.selectable !== false;
            },
            checked() {
                return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].checked : false;
            },
            partialChecked() {
                return this.selectionKeys ? this.selectionKeys[this.node.key] && this.selectionKeys[this.node.key].partialChecked : false;
            },
            ariaChecked() {
                return this.selectionMode === 'single' || this.selectionMode === 'multiple' ? this.selected : undefined;
            },
            ariaSelected() {
                return this.checkboxMode ? this.checked : undefined;
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$1 = ["aria-label", "aria-selected", "aria-expanded", "aria-setsize", "aria-posinset", "aria-level", "aria-checked", "tabindex"];
    const _hoisted_2$1 = {
      key: 0,
      class: "p-checkbox p-component",
      "aria-hidden": "true"
    };
    const _hoisted_3$1 = { class: "p-treenode-label" };
    const _hoisted_4$1 = {
      key: 0,
      class: "p-treenode-children",
      role: "group"
    };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_TreeNode = vue.resolveComponent("TreeNode", true);
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("li", {
        ref: "currentNode",
        class: vue.normalizeClass($options.containerClass),
        role: "treeitem",
        "aria-label": $options.label($props.node),
        "aria-selected": $options.ariaSelected,
        "aria-expanded": $options.expanded,
        "aria-setsize": $props.node.children ? $props.node.children.length : 0,
        "aria-posinset": $props.index + 1,
        "aria-level": $props.level,
        "aria-checked": $options.ariaChecked,
        tabindex: $props.index === 0 ? 0 : -1,
        onKeydown: _cache[3] || (_cache[3] = (...args) => ($options.onKeyDown && $options.onKeyDown(...args)))
      }, [
        vue.createElementVNode("div", {
          class: vue.normalizeClass($options.contentClass),
          onClick: _cache[1] || (_cache[1] = (...args) => ($options.onClick && $options.onClick(...args))),
          onTouchend: _cache[2] || (_cache[2] = (...args) => ($options.onTouchEnd && $options.onTouchEnd(...args))),
          style: vue.normalizeStyle($props.node.style)
        }, [
          vue.withDirectives((vue.openBlock(), vue.createElementBlock("button", {
            type: "button",
            class: "p-tree-toggler p-link",
            onClick: _cache[0] || (_cache[0] = (...args) => ($options.toggle && $options.toggle(...args))),
            tabindex: "-1",
            "aria-hidden": "true"
          }, [
            vue.createElementVNode("span", {
              class: vue.normalizeClass($options.toggleIcon)
            }, null, 2)
          ])), [
            [_directive_ripple]
          ]),
          ($options.checkboxMode)
            ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$1, [
                vue.createElementVNode("div", {
                  class: vue.normalizeClass($options.checkboxClass),
                  role: "checkbox"
                }, [
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass($options.checkboxIcon)
                  }, null, 2)
                ], 2)
              ]))
            : vue.createCommentVNode("", true),
          vue.createElementVNode("span", {
            class: vue.normalizeClass($options.icon)
          }, null, 2),
          vue.createElementVNode("span", _hoisted_3$1, [
            ($props.templates[$props.node.type] || $props.templates['default'])
              ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.templates[$props.node.type] || $props.templates['default']), {
                  key: 0,
                  node: $props.node
                }, null, 8, ["node"]))
              : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createTextVNode(vue.toDisplayString($options.label($props.node)), 1)
                ], 64))
          ])
        ], 38),
        ($options.hasChildren && $options.expanded)
          ? (vue.openBlock(), vue.createElementBlock("ul", _hoisted_4$1, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.node.children, (childNode) => {
                return (vue.openBlock(), vue.createBlock(_component_TreeNode, {
                  key: childNode.key,
                  node: childNode,
                  templates: $props.templates,
                  level: $props.level + 1,
                  expandedKeys: $props.expandedKeys,
                  onNodeToggle: $options.onChildNodeToggle,
                  onNodeClick: $options.onChildNodeClick,
                  selectionMode: $props.selectionMode,
                  selectionKeys: $props.selectionKeys,
                  onCheckboxChange: $options.propagateUp
                }, null, 8, ["node", "templates", "level", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange"]))
              }), 128))
            ]))
          : vue.createCommentVNode("", true)
      ], 42, _hoisted_1$1))
    }

    script$1.render = render$1;

    var script = {
        name: 'Tree',
        emits: ['node-expand', 'node-collapse', 'update:expandedKeys', 'update:selectionKeys', 'node-select', 'node-unselect'],
        props: {
            value: {
                type: null,
                default: null
            },
            expandedKeys: {
                type: null,
                default: null
            },
            selectionKeys: {
                type: null,
                default: null
            },
            selectionMode: {
                type: String,
                default: null
            },
            metaKeySelection: {
                type: Boolean,
                default: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            loadingIcon: {
                type: String,
                default: 'pi pi-spinner'
            },
            filter: {
                type: Boolean,
                default: false
            },
            filterBy: {
                type: String,
                default: 'label'
            },
            filterMode: {
                type: String,
                default: 'lenient'
            },
            filterPlaceholder: {
                type: String,
                default: null
            },
            filterLocale: {
                type: String,
                default: undefined
            },
            scrollHeight: {
                type: String,
                default: null
            },
            level: {
                type: Number,
                default: 0
            },
            'aria-labelledby': {
                type: String,
                default: null
            },
            'aria-label': {
                type: String,
                default: null
            }
        },
        data() {
            return {
                d_expandedKeys: this.expandedKeys || {},
                filterValue: null
            };
        },
        watch: {
            expandedKeys(newValue) {
                this.d_expandedKeys = newValue;
            }
        },
        methods: {
            onNodeToggle(node) {
                const key = node.key;

                if (this.d_expandedKeys[key]) {
                    delete this.d_expandedKeys[key];
                    this.$emit('node-collapse', node);
                } else {
                    this.d_expandedKeys[key] = true;
                    this.$emit('node-expand', node);
                }

                this.d_expandedKeys = { ...this.d_expandedKeys };
                this.$emit('update:expandedKeys', this.d_expandedKeys);
            },
            onNodeClick(event) {
                if (this.selectionMode != null && event.node.selectable !== false) {
                    const metaSelection = event.nodeTouched ? false : this.metaKeySelection;
                    const _selectionKeys = metaSelection ? this.handleSelectionWithMetaKey(event) : this.handleSelectionWithoutMetaKey(event);

                    this.$emit('update:selectionKeys', _selectionKeys);
                }
            },
            onCheckboxChange(event) {
                this.$emit('update:selectionKeys', event.selectionKeys);

                if (event.check) this.$emit('node-select', event.node);
                else this.$emit('node-unselect', event.node);
            },
            handleSelectionWithMetaKey(event) {
                const originalEvent = event.originalEvent;
                const node = event.node;
                const metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
                const selected = this.isNodeSelected(node);
                let _selectionKeys;

                if (selected && metaKey) {
                    if (this.isSingleSelectionMode()) {
                        _selectionKeys = {};
                    } else {
                        _selectionKeys = { ...this.selectionKeys };
                        delete _selectionKeys[node.key];
                    }

                    this.$emit('node-unselect', node);
                } else {
                    if (this.isSingleSelectionMode()) {
                        _selectionKeys = {};
                    } else if (this.isMultipleSelectionMode()) {
                        _selectionKeys = !metaKey ? {} : this.selectionKeys ? { ...this.selectionKeys } : {};
                    }

                    _selectionKeys[node.key] = true;
                    this.$emit('node-select', node);
                }

                return _selectionKeys;
            },
            handleSelectionWithoutMetaKey(event) {
                const node = event.node;
                const selected = this.isNodeSelected(node);
                let _selectionKeys;

                if (this.isSingleSelectionMode()) {
                    if (selected) {
                        _selectionKeys = {};
                        this.$emit('node-unselect', node);
                    } else {
                        _selectionKeys = {};
                        _selectionKeys[node.key] = true;
                        this.$emit('node-select', node);
                    }
                } else {
                    if (selected) {
                        _selectionKeys = { ...this.selectionKeys };
                        delete _selectionKeys[node.key];

                        this.$emit('node-unselect', node);
                    } else {
                        _selectionKeys = this.selectionKeys ? { ...this.selectionKeys } : {};
                        _selectionKeys[node.key] = true;

                        this.$emit('node-select', node);
                    }
                }

                return _selectionKeys;
            },
            isSingleSelectionMode() {
                return this.selectionMode === 'single';
            },
            isMultipleSelectionMode() {
                return this.selectionMode === 'multiple';
            },
            isNodeSelected(node) {
                return this.selectionMode && this.selectionKeys ? this.selectionKeys[node.key] === true : false;
            },
            isChecked(node) {
                return this.selectionKeys ? this.selectionKeys[node.key] && this.selectionKeys[node.key].checked : false;
            },
            isNodeLeaf(node) {
                return node.leaf === false ? false : !(node.children && node.children.length);
            },
            onFilterKeydown(event) {
                if (event.which === 13) {
                    event.preventDefault();
                }
            },
            findFilteredNodes(node, paramsWithoutNode) {
                if (node) {
                    let matched = false;

                    if (node.children) {
                        let childNodes = [...node.children];

                        node.children = [];

                        for (let childNode of childNodes) {
                            let copyChildNode = { ...childNode };

                            if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                                matched = true;
                                node.children.push(copyChildNode);
                            }
                        }
                    }

                    if (matched) {
                        return true;
                    }
                }
            },
            isFilterMatched(node, { searchFields, filterText, strict }) {
                let matched = false;

                for (let field of searchFields) {
                    let fieldValue = String(utils.ObjectUtils.resolveFieldData(node, field)).toLocaleLowerCase(this.filterLocale);

                    if (fieldValue.indexOf(filterText) > -1) {
                        matched = true;
                    }
                }

                if (!matched || (strict && !this.isNodeLeaf(node))) {
                    matched = this.findFilteredNodes(node, { searchFields, filterText, strict }) || matched;
                }

                return matched;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-tree p-component',
                    {
                        'p-tree-selectable': this.selectionMode != null,
                        'p-tree-loading': this.loading,
                        'p-tree-flex-scrollable': this.scrollHeight === 'flex'
                    }
                ];
            },
            loadingIconClass() {
                return ['p-tree-loading-icon pi-spin', this.loadingIcon];
            },
            filteredValue() {
                let filteredNodes = [];
                const searchFields = this.filterBy.split(',');
                const filterText = this.filterValue.trim().toLocaleLowerCase(this.filterLocale);
                const strict = this.filterMode === 'strict';

                for (let node of this.value) {
                    let _node = { ...node };
                    let paramsWithoutNode = { searchFields, filterText, strict };

                    if (
                        (strict && (this.findFilteredNodes(_node, paramsWithoutNode) || this.isFilterMatched(_node, paramsWithoutNode))) ||
                        (!strict && (this.isFilterMatched(_node, paramsWithoutNode) || this.findFilteredNodes(_node, paramsWithoutNode)))
                    ) {
                        filteredNodes.push(_node);
                    }
                }

                return filteredNodes;
            },
            valueToRender() {
                if (this.filterValue && this.filterValue.trim().length > 0) return this.filteredValue;
                else return this.value;
            }
        },
        components: {
            TreeNode: script$1
        }
    };

    const _hoisted_1 = {
      key: 0,
      class: "p-tree-loading-overlay p-component-overlay"
    };
    const _hoisted_2 = {
      key: 1,
      class: "p-tree-filter-container"
    };
    const _hoisted_3 = ["placeholder"];
    const _hoisted_4 = /*#__PURE__*/vue.createElementVNode("span", { class: "p-tree-filter-icon pi pi-search" }, null, -1);
    const _hoisted_5 = ["aria-labelledby", "aria-label"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_TreeNode = vue.resolveComponent("TreeNode");

      return (vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass($options.containerClass)
      }, [
        ($props.loading)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
              vue.createElementVNode("i", {
                class: vue.normalizeClass($options.loadingIconClass)
              }, null, 2)
            ]))
          : vue.createCommentVNode("", true),
        ($props.filter)
          ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
              vue.withDirectives(vue.createElementVNode("input", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.filterValue) = $event)),
                type: "text",
                autocomplete: "off",
                class: "p-tree-filter p-inputtext p-component",
                placeholder: $props.filterPlaceholder,
                onKeydown: _cache[1] || (_cache[1] = (...args) => ($options.onFilterKeydown && $options.onFilterKeydown(...args)))
              }, null, 40, _hoisted_3), [
                [vue.vModelText, $data.filterValue]
              ]),
              _hoisted_4
            ]))
          : vue.createCommentVNode("", true),
        vue.createElementVNode("div", {
          class: "p-tree-wrapper",
          style: vue.normalizeStyle({ maxHeight: $props.scrollHeight })
        }, [
          vue.createElementVNode("ul", {
            class: "p-tree-container",
            role: "tree",
            "aria-labelledby": _ctx.ariaLabelledby,
            "aria-label": _ctx.ariaLabel
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.valueToRender, (node, index) => {
              return (vue.openBlock(), vue.createBlock(_component_TreeNode, {
                key: node.key,
                node: node,
                templates: _ctx.$slots,
                level: $props.level + 1,
                index: index,
                expandedKeys: $data.d_expandedKeys,
                onNodeToggle: $options.onNodeToggle,
                onNodeClick: $options.onNodeClick,
                selectionMode: $props.selectionMode,
                selectionKeys: $props.selectionKeys,
                onCheckboxChange: $options.onCheckboxChange
              }, null, 8, ["node", "templates", "level", "index", "expandedKeys", "onNodeToggle", "onNodeClick", "selectionMode", "selectionKeys", "onCheckboxChange"]))
            }), 128))
          ], 8, _hoisted_5)
        ], 4)
      ], 2))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-tree-container {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    overflow: auto;\n}\n.p-treenode-children {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n}\n.p-tree-wrapper {\n    overflow: auto;\n}\n.p-treenode-selectable {\n    cursor: pointer;\n    user-select: none;\n}\n.p-tree-toggler {\n    cursor: pointer;\n    user-select: none;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n    flex-shrink: 0;\n}\n.p-treenode-leaf > .p-treenode-content .p-tree-toggler {\n    visibility: hidden;\n}\n.p-treenode-content {\n    display: flex;\n    align-items: center;\n}\n.p-tree-filter {\n    width: 100%;\n}\n.p-tree-filter-container {\n    position: relative;\n    display: block;\n    width: 100%;\n}\n.p-tree-filter-icon {\n    position: absolute;\n    top: 50%;\n    margin-top: -0.5rem;\n}\n.p-tree-loading {\n    position: relative;\n    min-height: 4rem;\n}\n.p-tree .p-tree-loading-overlay {\n    position: absolute;\n    z-index: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n.p-tree-flex-scrollable {\n    display: flex;\n    flex: 1;\n    height: 100%;\n    flex-direction: column;\n}\n.p-tree-flex-scrollable .p-tree-wrapper {\n    flex: 1;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.utils, primevue.ripple, Vue);

this.primevue = this.primevue || {};
this.primevue.menu = (function (OverlayEventBus, Portal, utils, Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script$1 = {
        name: 'Menuitem',
        inheritAttrs: false,
        emits: ['item-click'],
        props: {
            item: null,
            template: null,
            exact: null,
            id: null,
            focusedOptionId: null
        },
        methods: {
            getItemProp(processedItem, name) {
                return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name]) : undefined;
            },
            onItemActionClick(event, navigate) {
                navigate && navigate(event);
            },
            onItemClick(event) {
                const command = this.getItemProp(this.item, 'command');

                command && command({ originalEvent: event, item: this.item.item });
                this.$emit('item-click', { originalEvent: event, item: this.item, id: this.id });
            },
            containerClass() {
                return ['p-menuitem', this.item.class, { 'p-focus': this.id === this.focusedOptionId, 'p-disabled': this.disabled() }];
            },
            linkClass(routerProps) {
                return [
                    'p-menuitem-link',
                    {
                        'router-link-active': routerProps && routerProps.isActive,
                        'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
                    }
                ];
            },
            visible() {
                return typeof this.item.visible === 'function' ? this.item.visible() : this.item.visible !== false;
            },
            disabled() {
                return typeof this.item.disabled === 'function' ? this.item.disabled() : this.item.disabled;
            },
            label() {
                return typeof this.item.label === 'function' ? this.item.label() : this.item.label;
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$1 = ["id", "aria-label", "aria-disabled"];
    const _hoisted_2$1 = ["href", "onClick"];
    const _hoisted_3$1 = { class: "p-menuitem-text" };
    const _hoisted_4$1 = ["href", "target"];
    const _hoisted_5$1 = { class: "p-menuitem-text" };

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_router_link = vue.resolveComponent("router-link");
      const _directive_ripple = vue.resolveDirective("ripple");

      return ($options.visible())
        ? (vue.openBlock(), vue.createElementBlock("li", {
            key: 0,
            id: $props.id,
            class: vue.normalizeClass($options.containerClass()),
            role: "menuitem",
            style: vue.normalizeStyle($props.item.style),
            "aria-label": $options.label(),
            "aria-disabled": $options.disabled()
          }, [
            vue.createElementVNode("div", {
              class: "p-menuitem-content",
              onClick: _cache[0] || (_cache[0] = $event => ($options.onItemClick($event)))
            }, [
              (!$props.template)
                ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                    ($props.item.to && !$options.disabled())
                      ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                          key: 0,
                          to: $props.item.to,
                          custom: ""
                        }, {
                          default: vue.withCtx(({ navigate, href, isActive, isExactActive }) => [
                            vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", {
                              href: href,
                              class: vue.normalizeClass($options.linkClass({ isActive, isExactActive })),
                              tabindex: "-1",
                              "aria-hidden": "true",
                              onClick: $event => ($options.onItemActionClick($event, navigate))
                            }, [
                              ($props.item.icon)
                                ? (vue.openBlock(), vue.createElementBlock("span", {
                                    key: 0,
                                    class: vue.normalizeClass(['p-menuitem-icon', $props.item.icon])
                                  }, null, 2))
                                : vue.createCommentVNode("", true),
                              vue.createElementVNode("span", _hoisted_3$1, vue.toDisplayString($options.label()), 1)
                            ], 10, _hoisted_2$1)), [
                              [_directive_ripple]
                            ])
                          ]),
                          _: 1
                        }, 8, ["to"]))
                      : vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", {
                          key: 1,
                          href: $props.item.url,
                          class: vue.normalizeClass($options.linkClass()),
                          target: $props.item.target,
                          tabindex: "-1",
                          "aria-hidden": "true"
                        }, [
                          ($props.item.icon)
                            ? (vue.openBlock(), vue.createElementBlock("span", {
                                key: 0,
                                class: vue.normalizeClass(['p-menuitem-icon', $props.item.icon])
                              }, null, 2))
                            : vue.createCommentVNode("", true),
                          vue.createElementVNode("span", _hoisted_5$1, vue.toDisplayString($options.label()), 1)
                        ], 10, _hoisted_4$1)), [
                          [_directive_ripple]
                        ])
                  ], 64))
                : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template), {
                    key: 1,
                    item: $props.item
                  }, null, 8, ["item"]))
            ])
          ], 14, _hoisted_1$1))
        : vue.createCommentVNode("", true)
    }

    script$1.render = render$1;

    var script = {
        name: 'Menu',
        inheritAttrs: false,
        emits: ['show', 'hide', 'focus', 'blur'],
        props: {
            popup: {
                type: Boolean,
                default: false
            },
            model: {
                type: Array,
                default: null
            },
            appendTo: {
                type: String,
                default: 'body'
            },
            autoZIndex: {
                type: Boolean,
                default: true
            },
            baseZIndex: {
                type: Number,
                default: 0
            },
            exact: {
                type: Boolean,
                default: true
            },
            tabindex: {
                type: Number,
                default: 0
            },
            'aria-label': {
                type: String,
                default: null
            },
            'aria-labelledby': {
                type: String,
                default: null
            }
        },
        data() {
            return {
                id: this.$attrs.id,
                overlayVisible: false,
                focused: false,
                focusedOptionIndex: -1,
                selectedOptionIndex: -1
            };
        },
        watch: {
            '$attrs.id': function (newValue) {
                this.id = newValue || utils.UniqueComponentId();
            }
        },
        target: null,
        outsideClickListener: null,
        scrollHandler: null,
        resizeListener: null,
        container: null,
        list: null,
        mounted() {
            this.id = this.id || utils.UniqueComponentId();

            if (!this.popup) {
                this.bindResizeListener();
                this.bindOutsideClickListener();
            }
        },
        beforeUnmount() {
            this.unbindResizeListener();
            this.unbindOutsideClickListener();

            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            this.target = null;

            if (this.container && this.autoZIndex) {
                utils.ZIndexUtils.clear(this.container);
            }

            this.container = null;
        },
        methods: {
            itemClick(event) {
                const item = event.item;

                if (this.disabled(item)) {
                    return;
                }

                if (item.command) {
                    item.command(event);
                }

                if (item.to && event.navigate) {
                    event.navigate(event.originalEvent);
                }

                if (this.overlayVisible) this.hide();

                if (!this.popup && this.focusedOptionIndex !== event.id) {
                    this.focusedOptionIndex = event.id;
                }
            },
            onListFocus(event) {
                this.focused = true;

                if (!this.popup) {
                    if (this.selectedOptionIndex !== -1) {
                        this.changeFocusedOptionIndex(this.selectedOptionIndex);
                        this.selectedOptionIndex = -1;
                    } else this.changeFocusedOptionIndex(0);
                }

                this.$emit('focus', event);
            },
            onListBlur(event) {
                this.focused = false;
                this.focusedOptionIndex = -1;
                this.$emit('blur', event);
            },
            onListKeyDown(event) {
                switch (event.code) {
                    case 'ArrowDown':
                        this.onArrowDownKey(event);
                        break;

                    case 'ArrowUp':
                        this.onArrowUpKey(event);
                        break;

                    case 'Home':
                        this.onHomeKey(event);
                        break;

                    case 'End':
                        this.onEndKey(event);
                        break;

                    case 'Enter':
                        this.onEnterKey(event);
                        break;

                    case 'Space':
                        this.onSpaceKey(event);
                        break;

                    case 'Escape':
                        if (this.popup) {
                            utils.DomHandler.focus(this.target);
                            this.hide();
                        }

                    case 'Tab':
                        this.overlayVisible && this.hide();
                        break;
                }
            },
            onArrowDownKey(event) {
                const optionIndex = this.findNextOptionIndex(this.focusedOptionIndex);

                this.changeFocusedOptionIndex(optionIndex);
                event.preventDefault();
            },
            onArrowUpKey(event) {
                if (event.altKey && this.popup) {
                    utils.DomHandler.focus(this.target);
                    this.hide();
                    event.preventDefault();
                } else {
                    const optionIndex = this.findPrevOptionIndex(this.focusedOptionIndex);

                    this.changeFocusedOptionIndex(optionIndex);
                    event.preventDefault();
                }
            },
            onHomeKey(event) {
                this.changeFocusedOptionIndex(0);
                event.preventDefault();
            },
            onEndKey(event) {
                this.changeFocusedOptionIndex(utils.DomHandler.find(this.container, 'li.p-menuitem:not(.p-disabled)').length - 1);
                event.preventDefault();
            },
            onEnterKey(event) {
                const element = utils.DomHandler.findSingle(this.list, `li[id="${`${this.focusedOptionIndex}`}"]`);
                const anchorElement = element && utils.DomHandler.findSingle(element, '.p-menuitem-link');

                this.popup && utils.DomHandler.focus(this.target);
                anchorElement ? anchorElement.click() : element && element.click();

                event.preventDefault();
            },
            onSpaceKey(event) {
                this.onEnterKey(event);
            },
            findNextOptionIndex(index) {
                const links = utils.DomHandler.find(this.container, 'li.p-menuitem:not(.p-disabled)');
                const matchedOptionIndex = [...links].findIndex((link) => link.id === index);

                return matchedOptionIndex > -1 ? matchedOptionIndex + 1 : 0;
            },
            findPrevOptionIndex(index) {
                const links = utils.DomHandler.find(this.container, 'li.p-menuitem:not(.p-disabled)');
                const matchedOptionIndex = [...links].findIndex((link) => link.id === index);

                return matchedOptionIndex > -1 ? matchedOptionIndex - 1 : 0;
            },
            changeFocusedOptionIndex(index) {
                const links = utils.DomHandler.find(this.container, 'li.p-menuitem:not(.p-disabled)');
                let order = index >= links.length ? links.length - 1 : index < 0 ? 0 : index;

                order > -1 && (this.focusedOptionIndex = links[order].getAttribute('id'));
            },
            toggle(event) {
                if (this.overlayVisible) this.hide();
                else this.show(event);
            },
            show(event) {
                this.overlayVisible = true;
                this.target = event.currentTarget;
            },
            hide() {
                this.overlayVisible = false;
                this.target = null;
            },
            onEnter(el) {
                this.alignOverlay();
                this.bindOutsideClickListener();
                this.bindResizeListener();
                this.bindScrollListener();

                if (this.autoZIndex) {
                    utils.ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
                }

                if (this.popup) {
                    utils.DomHandler.focus(this.list);
                    this.changeFocusedOptionIndex(0);
                }

                this.$emit('show');
            },
            onLeave() {
                this.unbindOutsideClickListener();
                this.unbindResizeListener();
                this.unbindScrollListener();
                this.$emit('hide');
            },
            onAfterLeave(el) {
                if (this.autoZIndex) {
                    utils.ZIndexUtils.clear(el);
                }
            },
            alignOverlay() {
                utils.DomHandler.absolutePosition(this.container, this.target);
                this.container.style.minWidth = utils.DomHandler.getOuterWidth(this.target) + 'px';
            },
            bindOutsideClickListener() {
                if (!this.outsideClickListener) {
                    this.outsideClickListener = (event) => {
                        const isOutsideContainer = this.container && !this.container.contains(event.target);
                        const isOutsideTarget = !(this.target && (this.target === event.target || this.target.contains(event.target)));

                        if (this.overlayVisible && isOutsideContainer && isOutsideTarget) {
                            this.hide();
                        } else if (!this.popup && isOutsideContainer && isOutsideTarget) {
                            this.focusedOptionIndex = -1;
                        }
                    };

                    document.addEventListener('click', this.outsideClickListener);
                }
            },
            unbindOutsideClickListener() {
                if (this.outsideClickListener) {
                    document.removeEventListener('click', this.outsideClickListener);
                    this.outsideClickListener = null;
                }
            },
            bindScrollListener() {
                if (!this.scrollHandler) {
                    this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.target, () => {
                        if (this.overlayVisible) {
                            this.hide();
                        }
                    });
                }

                this.scrollHandler.bindScrollListener();
            },
            unbindScrollListener() {
                if (this.scrollHandler) {
                    this.scrollHandler.unbindScrollListener();
                }
            },
            bindResizeListener() {
                if (!this.resizeListener) {
                    this.resizeListener = () => {
                        if (this.overlayVisible && !utils.DomHandler.isTouchDevice()) {
                            this.hide();
                        }
                    };

                    window.addEventListener('resize', this.resizeListener);
                }
            },
            unbindResizeListener() {
                if (this.resizeListener) {
                    window.removeEventListener('resize', this.resizeListener);
                    this.resizeListener = null;
                }
            },
            visible(item) {
                return typeof item.visible === 'function' ? item.visible() : item.visible !== false;
            },
            disabled(item) {
                return typeof item.disabled === 'function' ? item.disabled() : item.disabled;
            },
            label(item) {
                return typeof item.label === 'function' ? item.label() : item.label;
            },
            separatorClass(item) {
                return ['p-menuitem-separator', item.class];
            },
            onOverlayClick(event) {
                OverlayEventBus__default["default"].emit('overlay-click', {
                    originalEvent: event,
                    target: this.target
                });
            },
            containerRef(el) {
                this.container = el;
            },
            listRef(el) {
                this.list = el;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-menu p-component',
                    {
                        'p-menu-overlay': this.popup,
                        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                        'p-ripple-disabled': this.$primevue.config.ripple === false
                    }
                ];
            },
            focusedOptionId() {
                return this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : null;
            }
        },
        components: {
            PVMenuitem: script$1,
            Portal: Portal__default["default"]
        }
    };

    const _hoisted_1 = ["id"];
    const _hoisted_2 = {
      key: 0,
      class: "p-menu-start"
    };
    const _hoisted_3 = ["id", "tabindex", "aria-activedescendant", "aria-label", "aria-labelledby"];
    const _hoisted_4 = ["id"];
    const _hoisted_5 = {
      key: 1,
      class: "p-menu-end"
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_PVMenuitem = vue.resolveComponent("PVMenuitem");
      const _component_Portal = vue.resolveComponent("Portal");

      return (vue.openBlock(), vue.createBlock(_component_Portal, {
        appendTo: $props.appendTo,
        disabled: !$props.popup
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.Transition, {
            name: "p-connected-overlay",
            onEnter: $options.onEnter,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave
          }, {
            default: vue.withCtx(() => [
              ($props.popup ? $data.overlayVisible : true)
                ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                    key: 0,
                    ref: $options.containerRef,
                    id: $data.id,
                    class: $options.containerClass
                  }, _ctx.$attrs, {
                    onClick: _cache[3] || (_cache[3] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args)))
                  }), [
                    (_ctx.$slots.start)
                      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2, [
                          vue.renderSlot(_ctx.$slots, "start")
                        ]))
                      : vue.createCommentVNode("", true),
                    vue.createElementVNode("ul", {
                      ref: $options.listRef,
                      id: $data.id + '_list',
                      class: "p-menu-list p-reset",
                      role: "menu",
                      tabindex: $props.tabindex,
                      "aria-activedescendant": $data.focused ? $options.focusedOptionId : undefined,
                      "aria-label": _ctx.ariaLabel,
                      "aria-labelledby": _ctx.ariaLabelledby,
                      onFocus: _cache[0] || (_cache[0] = (...args) => ($options.onListFocus && $options.onListFocus(...args))),
                      onBlur: _cache[1] || (_cache[1] = (...args) => ($options.onListBlur && $options.onListBlur(...args))),
                      onKeydown: _cache[2] || (_cache[2] = (...args) => ($options.onListKeyDown && $options.onListKeyDown(...args)))
                    }, [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.model, (item, i) => {
                        return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                          key: $options.label(item) + i.toString()
                        }, [
                          (item.items && $options.visible(item) && !item.separator)
                            ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                                (item.items)
                                  ? (vue.openBlock(), vue.createElementBlock("li", {
                                      key: 0,
                                      id: $data.id + '_' + i,
                                      class: "p-submenu-header",
                                      role: "none"
                                    }, [
                                      vue.renderSlot(_ctx.$slots, "item", { item: item }, () => [
                                        vue.createTextVNode(vue.toDisplayString($options.label(item)), 1)
                                      ])
                                    ], 8, _hoisted_4))
                                  : vue.createCommentVNode("", true),
                                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.items, (child, j) => {
                                  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                    key: child.label + i + '_' + j
                                  }, [
                                    ($options.visible(child) && !child.separator)
                                      ? (vue.openBlock(), vue.createBlock(_component_PVMenuitem, {
                                          key: 0,
                                          id: $data.id + '_' + i + '_' + j,
                                          item: child,
                                          template: _ctx.$slots.item,
                                          exact: $props.exact,
                                          focusedOptionId: $options.focusedOptionId,
                                          onItemClick: $options.itemClick
                                        }, null, 8, ["id", "item", "template", "exact", "focusedOptionId", "onItemClick"]))
                                      : ($options.visible(child) && child.separator)
                                        ? (vue.openBlock(), vue.createElementBlock("li", {
                                            key: 'separator' + i + j,
                                            class: vue.normalizeClass($options.separatorClass(item)),
                                            style: vue.normalizeStyle(child.style),
                                            role: "separator"
                                          }, null, 6))
                                        : vue.createCommentVNode("", true)
                                  ], 64))
                                }), 128))
                              ], 64))
                            : ($options.visible(item) && item.separator)
                              ? (vue.openBlock(), vue.createElementBlock("li", {
                                  key: 'separator' + i.toString(),
                                  class: vue.normalizeClass($options.separatorClass(item)),
                                  style: vue.normalizeStyle(item.style),
                                  role: "separator"
                                }, null, 6))
                              : (vue.openBlock(), vue.createBlock(_component_PVMenuitem, {
                                  key: $options.label(item) + i.toString(),
                                  id: $data.id + '_' + i,
                                  item: item,
                                  template: _ctx.$slots.item,
                                  exact: $props.exact,
                                  focusedOptionId: $options.focusedOptionId,
                                  onItemClick: $options.itemClick
                                }, null, 8, ["id", "item", "template", "exact", "focusedOptionId", "onItemClick"]))
                        ], 64))
                      }), 128))
                    ], 40, _hoisted_3),
                    (_ctx.$slots.end)
                      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                          vue.renderSlot(_ctx.$slots, "end")
                        ]))
                      : vue.createCommentVNode("", true)
                  ], 16, _hoisted_1))
                : vue.createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["onEnter", "onLeave", "onAfterLeave"])
        ]),
        _: 3
      }, 8, ["appendTo", "disabled"]))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-menu-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-menu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-menu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-menu .p-menuitem-text {\n    line-height: 1;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.overlayeventbus, primevue.portal, primevue.utils, primevue.ripple, Vue);

this.primevue = this.primevue || {};
this.primevue.tieredmenu = (function (OverlayEventBus, Portal, utils, Ripple, vue) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var OverlayEventBus__default = /*#__PURE__*/_interopDefaultLegacy(OverlayEventBus);
    var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
    var Ripple__default = /*#__PURE__*/_interopDefaultLegacy(Ripple);

    var script$1 = {
        name: 'TieredMenuSub',
        emits: ['item-click', 'item-mouseenter'],
        props: {
            menuId: {
                type: String,
                default: null
            },
            focusedItemId: {
                type: String,
                default: null
            },
            items: {
                type: Array,
                default: null
            },
            level: {
                type: Number,
                default: 0
            },
            template: {
                type: Function,
                default: null
            },
            activeItemPath: {
                type: Object,
                default: null
            },
            exact: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            getItemId(processedItem) {
                return `${this.menuId}_${processedItem.key}`;
            },
            getItemKey(processedItem) {
                return this.getItemId(processedItem);
            },
            getItemProp(processedItem, name, params) {
                return processedItem && processedItem.item ? utils.ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
            },
            getItemLabel(processedItem) {
                return this.getItemProp(processedItem, 'label');
            },
            isItemActive(processedItem) {
                return this.activeItemPath.some((path) => path.key === processedItem.key);
            },
            isItemVisible(processedItem) {
                return this.getItemProp(processedItem, 'visible') !== false;
            },
            isItemDisabled(processedItem) {
                return this.getItemProp(processedItem, 'disabled');
            },
            isItemFocused(processedItem) {
                return this.focusedItemId === this.getItemId(processedItem);
            },
            isItemGroup(processedItem) {
                return utils.ObjectUtils.isNotEmpty(processedItem.items);
            },
            onItemClick(event, processedItem) {
                this.getItemProp(processedItem, 'command', { originalEvent: event, item: processedItem.item });
                this.$emit('item-click', { originalEvent: event, processedItem, isFocus: true });
            },
            onItemMouseEnter(event, processedItem) {
                this.$emit('item-mouseenter', { originalEvent: event, processedItem });
            },
            onItemActionClick(event, navigate) {
                navigate && navigate(event);
            },
            getAriaSetSize() {
                return this.items.filter((processedItem) => this.isItemVisible(processedItem) && !this.getItemProp(processedItem, 'separator')).length;
            },
            getAriaPosInset(index) {
                return index - this.items.slice(0, index).filter((processedItem) => this.isItemVisible(processedItem) && this.getItemProp(processedItem, 'separator')).length + 1;
            },
            getItemClass(processedItem) {
                return [
                    'p-menuitem',
                    this.getItemProp(processedItem, 'class'),
                    {
                        'p-menuitem-active p-highlight': this.isItemActive(processedItem),
                        'p-focus': this.isItemFocused(processedItem),
                        'p-disabled': this.isItemDisabled(processedItem)
                    }
                ];
            },
            getItemActionClass(processedItem, routerProps) {
                return [
                    'p-menuitem-link',
                    {
                        'router-link-active': routerProps && routerProps.isActive,
                        'router-link-active-exact': this.exact && routerProps && routerProps.isExactActive
                    }
                ];
            },
            getItemIconClass(processedItem) {
                return ['p-menuitem-icon', this.getItemProp(processedItem, 'icon')];
            },
            getSeparatorItemClass(processedItem) {
                return ['p-menuitem-separator', this.getItemProp(processedItem, 'class')];
            }
        },
        directives: {
            ripple: Ripple__default["default"]
        }
    };

    const _hoisted_1$1 = ["id", "aria-label", "aria-disabled", "aria-expanded", "aria-haspopup", "aria-level", "aria-setsize", "aria-posinset"];
    const _hoisted_2 = ["onClick", "onMouseenter"];
    const _hoisted_3 = ["href", "onClick"];
    const _hoisted_4 = { class: "p-menuitem-text" };
    const _hoisted_5 = ["href", "target"];
    const _hoisted_6 = { class: "p-menuitem-text" };
    const _hoisted_7 = {
      key: 1,
      class: "p-submenu-icon pi pi-angle-right"
    };
    const _hoisted_8 = ["id"];

    function render$1(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_router_link = vue.resolveComponent("router-link");
      const _component_TieredMenuSub = vue.resolveComponent("TieredMenuSub", true);
      const _directive_ripple = vue.resolveDirective("ripple");

      return (vue.openBlock(), vue.createElementBlock("ul", null, [
        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.items, (processedItem, index) => {
          return (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
            key: $options.getItemKey(processedItem)
          }, [
            ($options.isItemVisible(processedItem) && !$options.getItemProp(processedItem, 'separator'))
              ? (vue.openBlock(), vue.createElementBlock("li", {
                  key: 0,
                  id: $options.getItemId(processedItem),
                  style: vue.normalizeStyle($options.getItemProp(processedItem, 'style')),
                  class: vue.normalizeClass($options.getItemClass(processedItem)),
                  role: "menuitem",
                  "aria-label": $options.getItemLabel(processedItem),
                  "aria-disabled": $options.isItemDisabled(processedItem) || undefined,
                  "aria-expanded": $options.isItemGroup(processedItem) ? $options.isItemActive(processedItem) : undefined,
                  "aria-haspopup": $options.isItemGroup(processedItem) && !$options.getItemProp(processedItem, 'to') ? 'menu' : undefined,
                  "aria-level": $props.level + 1,
                  "aria-setsize": $options.getAriaSetSize(),
                  "aria-posinset": $options.getAriaPosInset(index)
                }, [
                  vue.createElementVNode("div", {
                    class: "p-menuitem-content",
                    onClick: $event => ($options.onItemClick($event, processedItem)),
                    onMouseenter: $event => ($options.onItemMouseEnter($event, processedItem))
                  }, [
                    (!$props.template)
                      ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                          ($options.getItemProp(processedItem, 'to') && !$options.isItemDisabled(processedItem))
                            ? (vue.openBlock(), vue.createBlock(_component_router_link, {
                                key: 0,
                                to: $options.getItemProp(processedItem, 'to'),
                                custom: ""
                              }, {
                                default: vue.withCtx(({ navigate, href, isActive, isExactActive }) => [
                                  vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", {
                                    href: href,
                                    class: vue.normalizeClass($options.getItemActionClass(processedItem, { isActive, isExactActive })),
                                    tabindex: "-1",
                                    "aria-hidden": "true",
                                    onClick: $event => ($options.onItemActionClick($event, navigate))
                                  }, [
                                    ($options.getItemProp(processedItem, 'icon'))
                                      ? (vue.openBlock(), vue.createElementBlock("span", {
                                          key: 0,
                                          class: vue.normalizeClass($options.getItemIconClass(processedItem))
                                        }, null, 2))
                                      : vue.createCommentVNode("", true),
                                    vue.createElementVNode("span", _hoisted_4, vue.toDisplayString($options.getItemLabel(processedItem)), 1)
                                  ], 10, _hoisted_3)), [
                                    [_directive_ripple]
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["to"]))
                            : vue.withDirectives((vue.openBlock(), vue.createElementBlock("a", {
                                key: 1,
                                href: $options.getItemProp(processedItem, 'url'),
                                class: vue.normalizeClass($options.getItemActionClass(processedItem)),
                                target: $options.getItemProp(processedItem, 'target'),
                                tabindex: "-1",
                                "aria-hidden": "true"
                              }, [
                                ($options.getItemProp(processedItem, 'icon'))
                                  ? (vue.openBlock(), vue.createElementBlock("span", {
                                      key: 0,
                                      class: vue.normalizeClass($options.getItemIconClass(processedItem))
                                    }, null, 2))
                                  : vue.createCommentVNode("", true),
                                vue.createElementVNode("span", _hoisted_6, vue.toDisplayString($options.getItemLabel(processedItem)), 1),
                                ($options.isItemGroup(processedItem))
                                  ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7))
                                  : vue.createCommentVNode("", true)
                              ], 10, _hoisted_5)), [
                                [_directive_ripple]
                              ])
                        ], 64))
                      : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.template), {
                          key: 1,
                          item: processedItem.item
                        }, null, 8, ["item"]))
                  ], 40, _hoisted_2),
                  ($options.isItemVisible(processedItem) && $options.isItemGroup(processedItem))
                    ? (vue.openBlock(), vue.createBlock(_component_TieredMenuSub, {
                        key: 0,
                        id: $options.getItemId(processedItem) + '_list',
                        role: "menu",
                        class: "p-submenu-list",
                        menuId: $props.menuId,
                        focusedItemId: $props.focusedItemId,
                        items: processedItem.items,
                        template: $props.template,
                        activeItemPath: $props.activeItemPath,
                        exact: $props.exact,
                        level: $props.level + 1,
                        onItemClick: _cache[0] || (_cache[0] = $event => (_ctx.$emit('item-click', $event))),
                        onItemMouseenter: _cache[1] || (_cache[1] = $event => (_ctx.$emit('item-mouseenter', $event)))
                      }, null, 8, ["id", "menuId", "focusedItemId", "items", "template", "activeItemPath", "exact", "level"]))
                    : vue.createCommentVNode("", true)
                ], 14, _hoisted_1$1))
              : vue.createCommentVNode("", true),
            ($options.isItemVisible(processedItem) && $options.getItemProp(processedItem, 'separator'))
              ? (vue.openBlock(), vue.createElementBlock("li", {
                  key: 1,
                  id: $options.getItemId(processedItem),
                  style: vue.normalizeStyle($options.getItemProp(processedItem, 'style')),
                  class: vue.normalizeClass($options.getSeparatorItemClass(processedItem)),
                  role: "separator"
                }, null, 14, _hoisted_8))
              : vue.createCommentVNode("", true)
          ], 64))
        }), 128))
      ]))
    }

    script$1.render = render$1;

    var script = {
        name: 'TieredMenu',
        inheritAttrs: false,
        emits: ['focus', 'blur', 'before-show', 'before-hide', 'hide', 'show'],
        props: {
            popup: {
                type: Boolean,
                default: false
            },
            model: {
                type: Array,
                default: null
            },
            appendTo: {
                type: String,
                default: 'body'
            },
            autoZIndex: {
                type: Boolean,
                default: true
            },
            baseZIndex: {
                type: Number,
                default: 0
            },
            exact: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            tabindex: {
                type: Number,
                default: 0
            },
            'aria-labelledby': {
                type: String,
                default: null
            },
            'aria-label': {
                type: String,
                default: null
            }
        },
        outsideClickListener: null,
        scrollHandler: null,
        resizeListener: null,
        target: null,
        container: null,
        menubar: null,
        searchTimeout: null,
        searchValue: null,
        data() {
            return {
                id: this.$attrs.id,
                focused: false,
                focusedItemInfo: { index: -1, level: 0, parentKey: '' },
                activeItemPath: [],
                visible: !this.popup,
                dirty: false
            };
        },
        watch: {
            '$attrs.id': function (newValue) {
                this.id = newValue || utils.UniqueComponentId();
            },
            activeItemPath(newPath) {
                if (!this.popup) {
                    if (utils.ObjectUtils.isNotEmpty(newPath)) {
                        this.bindOutsideClickListener();
                        this.bindResizeListener();
                    } else {
                        this.unbindOutsideClickListener();
                        this.unbindResizeListener();
                    }
                }
            }
        },
        mounted() {
            this.id = this.id || utils.UniqueComponentId();
        },
        beforeUnmount() {
            this.unbindOutsideClickListener();
            this.unbindResizeListener();

            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            if (this.container && this.autoZIndex) {
                utils.ZIndexUtils.clear(this.container);
            }

            this.target = null;
            this.container = null;
        },
        methods: {
            getItemProp(item, name) {
                return item ? utils.ObjectUtils.getItemValue(item[name]) : undefined;
            },
            getItemLabel(item) {
                return this.getItemProp(item, 'label');
            },
            isItemDisabled(item) {
                return this.getItemProp(item, 'disabled');
            },
            isItemGroup(item) {
                return utils.ObjectUtils.isNotEmpty(this.getItemProp(item, 'items'));
            },
            isItemSeparator(item) {
                return this.getItemProp(item, 'separator');
            },
            getProccessedItemLabel(processedItem) {
                return processedItem ? this.getItemLabel(processedItem.item) : undefined;
            },
            isProccessedItemGroup(processedItem) {
                return processedItem && utils.ObjectUtils.isNotEmpty(processedItem.items);
            },
            toggle(event) {
                this.visible ? this.hide(event, true) : this.show(event);
            },
            show(event, isFocus) {
                if (this.popup) {
                    this.$emit('before-show');
                    this.visible = true;
                    this.target = this.target || event.currentTarget;
                    this.relatedTarget = event.relatedTarget || null;
                }

                this.focusedItemInfo = { index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '' };

                isFocus && utils.DomHandler.focus(this.menubar);
            },
            hide(event, isFocus) {
                if (this.popup) {
                    this.$emit('before-hide');
                    this.visible = false;
                }

                this.activeItemPath = [];
                this.focusedItemInfo = { index: -1, level: 0, parentKey: '' };

                isFocus && utils.DomHandler.focus(this.relatedTarget || this.target || this.menubar);
                this.dirty = false;
            },
            onFocus(event) {
                this.focused = true;
                this.focusedItemInfo = this.focusedItemInfo.index !== -1 ? this.focusedItemInfo : { index: this.findFirstFocusedItemIndex(), level: 0, parentKey: '' };

                this.$emit('focus', event);
            },
            onBlur(event) {
                this.focused = false;
                this.focusedItemInfo = { index: -1, level: 0, parentKey: '' };
                this.searchValue = '';
                this.dirty = false;
                this.$emit('blur', event);
            },
            onKeyDown(event) {
                if (this.disabled) {
                    event.preventDefault();

                    return;
                }

                const metaKey = event.metaKey || event.ctrlKey;

                switch (event.code) {
                    case 'ArrowDown':
                        this.onArrowDownKey(event);
                        break;

                    case 'ArrowUp':
                        this.onArrowUpKey(event);
                        break;

                    case 'ArrowLeft':
                        this.onArrowLeftKey(event);
                        break;

                    case 'ArrowRight':
                        this.onArrowRightKey(event);
                        break;

                    case 'Home':
                        this.onHomeKey(event);
                        break;

                    case 'End':
                        this.onEndKey(event);
                        break;

                    case 'Space':
                        this.onSpaceKey(event);
                        break;

                    case 'Enter':
                        this.onEnterKey(event);
                        break;

                    case 'Escape':
                        this.onEscapeKey(event);
                        break;

                    case 'Tab':
                        this.onTabKey(event);
                        break;

                    case 'PageDown':
                    case 'PageUp':
                    case 'Backspace':
                    case 'ShiftLeft':
                    case 'ShiftRight':
                        //NOOP
                        break;

                    default:
                        if (!metaKey && utils.ObjectUtils.isPrintableCharacter(event.key)) {
                            this.searchItems(event, event.key);
                        }

                        break;
                }
            },
            onItemChange(event) {
                const { processedItem, isFocus } = event;

                if (utils.ObjectUtils.isEmpty(processedItem)) return;

                const { index, key, level, parentKey, items } = processedItem;
                const grouped = utils.ObjectUtils.isNotEmpty(items);

                const activeItemPath = this.activeItemPath.filter((p) => p.parentKey !== parentKey && p.parentKey !== key);

                grouped && activeItemPath.push(processedItem);

                this.focusedItemInfo = { index, level, parentKey };
                this.activeItemPath = activeItemPath;

                grouped && (this.dirty = true);
                isFocus && utils.DomHandler.focus(this.menubar);
            },
            onOverlayClick(event) {
                OverlayEventBus__default["default"].emit('overlay-click', {
                    originalEvent: event,
                    target: this.target
                });
            },
            onItemClick(event) {
                const { originalEvent, processedItem } = event;
                const grouped = this.isProccessedItemGroup(processedItem);
                const root = utils.ObjectUtils.isEmpty(processedItem.parent);
                const selected = this.isSelected(processedItem);

                if (selected) {
                    const { index, key, level, parentKey } = processedItem;

                    this.activeItemPath = this.activeItemPath.filter((p) => key !== p.key && key.startsWith(p.key));
                    this.focusedItemInfo = { index, level, parentKey };

                    this.dirty = !root;
                    utils.DomHandler.focus(this.menubar);
                } else {
                    if (grouped) {
                        this.onItemChange(event);
                    } else {
                        const rootProcessedItem = root ? processedItem : this.activeItemPath.find((p) => p.parentKey === '');

                        this.hide(originalEvent);
                        this.changeFocusedItemIndex(originalEvent, rootProcessedItem ? rootProcessedItem.index : -1);

                        utils.DomHandler.focus(this.menubar);
                    }
                }
            },
            onItemMouseEnter(event) {
                if (this.dirty) {
                    this.onItemChange(event);
                }
            },
            onArrowDownKey(event) {
                const itemIndex = this.focusedItemInfo.index !== -1 ? this.findNextItemIndex(this.focusedItemInfo.index) : this.findFirstFocusedItemIndex();

                this.changeFocusedItemIndex(event, itemIndex);
                event.preventDefault();
            },
            onArrowUpKey(event) {
                if (event.altKey) {
                    if (this.focusedItemInfo.index !== -1) {
                        const processedItem = this.visibleItems[this.focusedItemInfo.index];
                        const grouped = this.isProccessedItemGroup(processedItem);

                        !grouped && this.onItemChange({ originalEvent: event, processedItem });
                    }

                    this.popup && this.hide(event, true);
                    event.preventDefault();
                } else {
                    const itemIndex = this.focusedItemInfo.index !== -1 ? this.findPrevItemIndex(this.focusedItemInfo.index) : this.findLastFocusedItemIndex();

                    this.changeFocusedItemIndex(event, itemIndex);
                    event.preventDefault();
                }
            },
            onArrowLeftKey(event) {
                const processedItem = this.visibleItems[this.focusedItemInfo.index];
                const parentItem = this.activeItemPath.find((p) => p.key === processedItem.parentKey);
                const root = utils.ObjectUtils.isEmpty(processedItem.parent);

                if (!root) {
                    this.focusedItemInfo = { index: -1, parentKey: parentItem ? parentItem.parentKey : '' };
                    this.searchValue = '';
                    this.onArrowDownKey(event);
                }

                this.activeItemPath = this.activeItemPath.filter((p) => p.parentKey !== this.focusedItemInfo.parentKey);

                event.preventDefault();
            },
            onArrowRightKey(event) {
                const processedItem = this.visibleItems[this.focusedItemInfo.index];
                const grouped = this.isProccessedItemGroup(processedItem);

                if (grouped) {
                    this.onItemChange({ originalEvent: event, processedItem });
                    this.focusedItemInfo = { index: -1, parentKey: processedItem.key };
                    this.searchValue = '';
                    this.onArrowDownKey(event);
                }

                event.preventDefault();
            },
            onHomeKey(event) {
                this.changeFocusedItemIndex(event, this.findFirstItemIndex());
                event.preventDefault();
            },
            onEndKey(event) {
                this.changeFocusedItemIndex(event, this.findLastItemIndex());
                event.preventDefault();
            },
            onEnterKey(event) {
                if (this.focusedItemInfo.index !== -1) {
                    const element = utils.DomHandler.findSingle(this.menubar, `li[id="${`${this.focusedItemId}`}"]`);
                    const anchorElement = element && utils.DomHandler.findSingle(element, '.p-menuitem-link');

                    anchorElement ? anchorElement.click() : element && element.click();

                    if (!this.popup) {
                        const processedItem = this.visibleItems[this.focusedItemInfo.index];
                        const grouped = this.isProccessedItemGroup(processedItem);

                        !grouped && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());
                    }
                }

                event.preventDefault();
            },
            onSpaceKey(event) {
                this.onEnterKey(event);
            },
            onEscapeKey(event) {
                this.hide(event, true);
                !this.popup && (this.focusedItemInfo.index = this.findFirstFocusedItemIndex());

                event.preventDefault();
            },
            onTabKey(event) {
                if (this.focusedItemInfo.index !== -1) {
                    const processedItem = this.visibleItems[this.focusedItemInfo.index];
                    const grouped = this.isProccessedItemGroup(processedItem);

                    !grouped && this.onItemChange({ originalEvent: event, processedItem });
                }

                this.hide();
            },
            onEnter(el) {
                if (this.autoZIndex) {
                    utils.ZIndexUtils.set('menu', el, this.baseZIndex + this.$primevue.config.zIndex.menu);
                }

                this.alignOverlay();
                utils.DomHandler.focus(this.menubar);
                this.scrollInView();
            },
            onAfterEnter() {
                this.bindOutsideClickListener();
                this.bindScrollListener();
                this.bindResizeListener();

                this.$emit('show');
            },
            onLeave() {
                this.unbindOutsideClickListener();
                this.unbindScrollListener();
                this.unbindResizeListener();

                this.$emit('hide');
                this.container = null;
                this.dirty = false;
            },
            onAfterLeave(el) {
                if (this.autoZIndex) {
                    utils.ZIndexUtils.clear(el);
                }
            },
            alignOverlay() {
                this.container.style.minWidth = utils.DomHandler.getOuterWidth(this.target) + 'px';
                utils.DomHandler.absolutePosition(this.container, this.target);
            },
            bindOutsideClickListener() {
                if (!this.outsideClickListener) {
                    this.outsideClickListener = (event) => {
                        const isOutsideContainer = this.container && !this.container.contains(event.target);
                        const isOutsideTarget = this.popup ? !(this.target && (this.target === event.target || this.target.contains(event.target))) : true;

                        if (isOutsideContainer && isOutsideTarget) {
                            this.hide();
                        }
                    };

                    document.addEventListener('click', this.outsideClickListener);
                }
            },
            unbindOutsideClickListener() {
                if (this.outsideClickListener) {
                    document.removeEventListener('click', this.outsideClickListener);
                    this.outsideClickListener = null;
                }
            },
            bindScrollListener() {
                if (!this.scrollHandler) {
                    this.scrollHandler = new utils.ConnectedOverlayScrollHandler(this.target, (event) => {
                        this.hide(event, true);
                    });
                }

                this.scrollHandler.bindScrollListener();
            },
            unbindScrollListener() {
                if (this.scrollHandler) {
                    this.scrollHandler.unbindScrollListener();
                }
            },
            bindResizeListener() {
                if (!this.resizeListener) {
                    this.resizeListener = (event) => {
                        if (!utils.DomHandler.isTouchDevice()) {
                            this.hide(event, true);
                        }
                    };

                    window.addEventListener('resize', this.resizeListener);
                }
            },
            unbindResizeListener() {
                if (this.resizeListener) {
                    window.removeEventListener('resize', this.resizeListener);
                    this.resizeListener = null;
                }
            },
            isItemMatched(processedItem) {
                return this.isValidItem(processedItem) && this.getProccessedItemLabel(processedItem).toLocaleLowerCase().startsWith(this.searchValue.toLocaleLowerCase());
            },
            isValidItem(processedItem) {
                return !!processedItem && !this.isItemDisabled(processedItem.item) && !this.isItemSeparator(processedItem.item);
            },
            isValidSelectedItem(processedItem) {
                return this.isValidItem(processedItem) && this.isSelected(processedItem);
            },
            isSelected(processedItem) {
                return this.activeItemPath.some((p) => p.key === processedItem.key);
            },
            findFirstItemIndex() {
                return this.visibleItems.findIndex((processedItem) => this.isValidItem(processedItem));
            },
            findLastItemIndex() {
                return utils.ObjectUtils.findLastIndex(this.visibleItems, (processedItem) => this.isValidItem(processedItem));
            },
            findNextItemIndex(index) {
                const matchedItemIndex = index < this.visibleItems.length - 1 ? this.visibleItems.slice(index + 1).findIndex((processedItem) => this.isValidItem(processedItem)) : -1;

                return matchedItemIndex > -1 ? matchedItemIndex + index + 1 : index;
            },
            findPrevItemIndex(index) {
                const matchedItemIndex = index > 0 ? utils.ObjectUtils.findLastIndex(this.visibleItems.slice(0, index), (processedItem) => this.isValidItem(processedItem)) : -1;

                return matchedItemIndex > -1 ? matchedItemIndex : index;
            },
            findSelectedItemIndex() {
                return this.visibleItems.findIndex((processedItem) => this.isValidSelectedItem(processedItem));
            },
            findFirstFocusedItemIndex() {
                const selectedIndex = this.findSelectedItemIndex();

                return selectedIndex < 0 ? this.findFirstItemIndex() : selectedIndex;
            },
            findLastFocusedItemIndex() {
                const selectedIndex = this.findSelectedItemIndex();

                return selectedIndex < 0 ? this.findLastItemIndex() : selectedIndex;
            },
            searchItems(event, char) {
                this.searchValue = (this.searchValue || '') + char;

                let itemIndex = -1;
                let matched = false;

                if (this.focusedItemInfo.index !== -1) {
                    itemIndex = this.visibleItems.slice(this.focusedItemInfo.index).findIndex((processedItem) => this.isItemMatched(processedItem));
                    itemIndex = itemIndex === -1 ? this.visibleItems.slice(0, this.focusedItemInfo.index).findIndex((processedItem) => this.isItemMatched(processedItem)) : itemIndex + this.focusedItemInfo.index;
                } else {
                    itemIndex = this.visibleItems.findIndex((processedItem) => this.isItemMatched(processedItem));
                }

                if (itemIndex !== -1) {
                    matched = true;
                }

                if (itemIndex === -1 && this.focusedItemInfo.index === -1) {
                    itemIndex = this.findFirstFocusedItemIndex();
                }

                if (itemIndex !== -1) {
                    this.changeFocusedItemIndex(event, itemIndex);
                }

                if (this.searchTimeout) {
                    clearTimeout(this.searchTimeout);
                }

                this.searchTimeout = setTimeout(() => {
                    this.searchValue = '';
                    this.searchTimeout = null;
                }, 500);

                return matched;
            },
            changeFocusedItemIndex(event, index) {
                if (this.focusedItemInfo.index !== index) {
                    this.focusedItemInfo.index = index;
                    this.scrollInView();
                }
            },
            scrollInView(index = -1) {
                const id = index !== -1 ? `${this.id}_${index}` : this.focusedItemId;
                const element = utils.DomHandler.findSingle(this.menubar, `li[id="${id}"]`);

                if (element) {
                    element.scrollIntoView && element.scrollIntoView({ block: 'nearest', inline: 'start' });
                }
            },
            createProcessedItems(items, level = 0, parent = {}, parentKey = '') {
                const processedItems = [];

                items &&
                    items.forEach((item, index) => {
                        const key = (parentKey !== '' ? parentKey + '_' : '') + index;
                        const newItem = {
                            item,
                            index,
                            level,
                            key,
                            parent,
                            parentKey
                        };

                        newItem['items'] = this.createProcessedItems(item.items, level + 1, newItem, key);
                        processedItems.push(newItem);
                    });

                return processedItems;
            },
            containerRef(el) {
                this.container = el;
            },
            menubarRef(el) {
                this.menubar = el ? el.$el : undefined;
            }
        },
        computed: {
            containerClass() {
                return [
                    'p-tieredmenu p-component',
                    {
                        'p-tieredmenu-overlay': this.popup,
                        'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                        'p-ripple-disabled': this.$primevue.config.ripple === false
                    }
                ];
            },
            processedItems() {
                return this.createProcessedItems(this.model || []);
            },
            visibleItems() {
                const processedItem = this.activeItemPath.find((p) => p.key === this.focusedItemInfo.parentKey);

                return processedItem ? processedItem.items : this.processedItems;
            },
            focusedItemId() {
                return this.focusedItemInfo.index !== -1 ? `${this.id}${utils.ObjectUtils.isNotEmpty(this.focusedItemInfo.parentKey) ? '_' + this.focusedItemInfo.parentKey : ''}_${this.focusedItemInfo.index}` : null;
            }
        },
        components: {
            TieredMenuSub: script$1,
            Portal: Portal__default["default"]
        }
    };

    const _hoisted_1 = ["id"];

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      const _component_TieredMenuSub = vue.resolveComponent("TieredMenuSub");
      const _component_Portal = vue.resolveComponent("Portal");

      return (vue.openBlock(), vue.createBlock(_component_Portal, {
        appendTo: $props.appendTo,
        disabled: !$props.popup
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(vue.Transition, {
            name: "p-connected-overlay",
            onEnter: $options.onEnter,
            onAfterEnter: $options.onAfterEnter,
            onLeave: $options.onLeave,
            onAfterLeave: $options.onAfterLeave
          }, {
            default: vue.withCtx(() => [
              ($data.visible)
                ? (vue.openBlock(), vue.createElementBlock("div", vue.mergeProps({
                    key: 0,
                    ref: $options.containerRef,
                    id: $data.id,
                    class: $options.containerClass,
                    onClick: _cache[0] || (_cache[0] = (...args) => ($options.onOverlayClick && $options.onOverlayClick(...args)))
                  }, _ctx.$attrs), [
                    vue.createVNode(_component_TieredMenuSub, {
                      ref: $options.menubarRef,
                      id: $data.id + '_list',
                      class: "p-tieredmenu-root-list",
                      tabindex: !$props.disabled ? $props.tabindex : -1,
                      role: "menubar",
                      "aria-label": _ctx.ariaLabel,
                      "aria-labelledby": _ctx.ariaLabelledby,
                      "aria-disabled": $props.disabled || undefined,
                      "aria-orientation": "vertical",
                      "aria-activedescendant": $data.focused ? $options.focusedItemId : undefined,
                      menuId: $data.id,
                      focusedItemId: $data.focused ? $options.focusedItemId : undefined,
                      items: $options.processedItems,
                      template: _ctx.$slots.item,
                      activeItemPath: $data.activeItemPath,
                      exact: $props.exact,
                      level: 0,
                      onFocus: $options.onFocus,
                      onBlur: $options.onBlur,
                      onKeydown: $options.onKeyDown,
                      onItemClick: $options.onItemClick,
                      onItemMouseenter: $options.onItemMouseEnter
                    }, null, 8, ["id", "tabindex", "aria-label", "aria-labelledby", "aria-disabled", "aria-activedescendant", "menuId", "focusedItemId", "items", "template", "activeItemPath", "exact", "onFocus", "onBlur", "onKeydown", "onItemClick", "onItemMouseenter"])
                  ], 16, _hoisted_1))
                : vue.createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])
        ]),
        _: 1
      }, 8, ["appendTo", "disabled"]))
    }

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "\n.p-tieredmenu-overlay {\n    position: absolute;\n    top: 0;\n    left: 0;\n}\n.p-tieredmenu ul {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n.p-tieredmenu .p-submenu-list {\n    position: absolute;\n    min-width: 100%;\n    z-index: 1;\n    display: none;\n}\n.p-tieredmenu .p-menuitem-link {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    text-decoration: none;\n    overflow: hidden;\n    position: relative;\n}\n.p-tieredmenu .p-menuitem-text {\n    line-height: 1;\n}\n.p-tieredmenu .p-menuitem {\n    position: relative;\n}\n.p-tieredmenu .p-menuitem-link .p-submenu-icon {\n    margin-left: auto;\n}\n.p-tieredmenu .p-menuitem-active > .p-submenu-list {\n    display: block;\n    left: 100%;\n    top: 0;\n}\n";
    styleInject(css_248z);

    script.render = render;

    return script;

})(primevue.overlayeventbus, primevue.portal, primevue.utils, primevue.ripple, Vue);

this.primevue = this.primevue || {};
this.primevue.badge = (function (utils, vue) {
    'use strict';

    var script = {
        name: 'Badge',
        props: {
            value: {
                type: [String, Number],
                default: null
            },
            severity: {
                type: String,
                default: null
            },
            size: {
                type: String,
                default: null
            }
        },
        computed: {
            containerClass() {
                return this.$slots.default ? 'p-overlay-badge' : this.badgeClass;
            },
            badgeClass() {
                return [
                    'p-badge p-component',
                    {
                        'p-badge-no-gutter': utils.ObjectUtils.isNotEmpty(this.value) && String(this.value).length === 1,
                        'p-badge-dot': utils.ObjectUtils.isEmpty(this.value) && !this.$slots.default,
                        'p-badge-lg': this.size === 'large',
                        'p-badge-xl': this.size === 'xlarge',
                        'p-badge-info': this.severity === 'info',
                        'p-badge-success': this.severity === 'success',
                        'p-badge-warning': this.severity === 'warning',
                        'p-badge-danger': this.severity === 'danger'
                    }
                ];
            }
        }
    };

    function render(_ctx, _cache, $props, $setup, $data, $options) {
      return (vue.openBlock(), vue.createElementBlock("span", {
        class: vue.normalizeClass($options.badgeClass)
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createTextVNode(vue.toDisplayString($props.value), 1)
        ])
      ], 2))
    }

    script.render = render;

    return script;

})(primevue.utils, Vue);

