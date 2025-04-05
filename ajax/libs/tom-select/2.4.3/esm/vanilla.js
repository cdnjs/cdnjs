import { iterate } from "./utils.js";
/**
 * Return a dom element from either a dom query string, jQuery object, a dom element or html string
 * https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
 *
 * param query should be {}
 */
export const getDom = (query) => {
    if (query.jquery) {
        return query[0];
    }
    if (query instanceof HTMLElement) {
        return query;
    }
    if (isHtmlString(query)) {
        var tpl = document.createElement('template');
        tpl.innerHTML = query.trim(); // Never return a text node of whitespace as the result
        return tpl.content.firstChild;
    }
    return document.querySelector(query);
};
export const isHtmlString = (arg) => {
    if (typeof arg === 'string' && arg.indexOf('<') > -1) {
        return true;
    }
    return false;
};
export const escapeQuery = (query) => {
    return query.replace(/['"\\]/g, '\\$&');
};
/**
 * Dispatch an event
 *
 */
export const triggerEvent = (dom_el, event_name) => {
    var event = document.createEvent('HTMLEvents');
    event.initEvent(event_name, true, false);
    dom_el.dispatchEvent(event);
};
/**
 * Apply CSS rules to a dom element
 *
 */
export const applyCSS = (dom_el, css) => {
    Object.assign(dom_el.style, css);
};
/**
 * Add css classes
 *
 */
export const addClasses = (elmts, ...classes) => {
    var norm_classes = classesArray(classes);
    elmts = castAsArray(elmts);
    elmts.map(el => {
        norm_classes.map(cls => {
            el.classList.add(cls);
        });
    });
};
/**
 * Remove css classes
 *
 */
export const removeClasses = (elmts, ...classes) => {
    var norm_classes = classesArray(classes);
    elmts = castAsArray(elmts);
    elmts.map(el => {
        norm_classes.map(cls => {
            el.classList.remove(cls);
        });
    });
};
/**
 * Return arguments
 *
 */
export const classesArray = (args) => {
    var classes = [];
    iterate(args, (_classes) => {
        if (typeof _classes === 'string') {
            _classes = _classes.trim().split(/[\t\n\f\r\s]/);
        }
        if (Array.isArray(_classes)) {
            classes = classes.concat(_classes);
        }
    });
    return classes.filter(Boolean);
};
/**
 * Create an array from arg if it's not already an array
 *
 */
export const castAsArray = (arg) => {
    if (!Array.isArray(arg)) {
        arg = [arg];
    }
    return arg;
};
/**
 * Get the closest node to the evt.target matching the selector
 * Stops at wrapper
 *
 */
export const parentMatch = (target, selector, wrapper) => {
    if (wrapper && !wrapper.contains(target)) {
        return;
    }
    while (target && target.matches) {
        if (target.matches(selector)) {
            return target;
        }
        target = target.parentNode;
    }
};
/**
 * Get the first or last item from an array
 *
 * > 0 - right (last)
 * <= 0 - left (first)
 *
 */
export const getTail = (list, direction = 0) => {
    if (direction > 0) {
        return list[list.length - 1];
    }
    return list[0];
};
/**
 * Return true if an object is empty
 *
 */
export const isEmptyObject = (obj) => {
    return (Object.keys(obj).length === 0);
};
/**
 * Get the index of an element amongst sibling nodes of the same type
 *
 */
export const nodeIndex = (el, amongst) => {
    if (!el)
        return -1;
    amongst = amongst || el.nodeName;
    var i = 0;
    while (el = el.previousElementSibling) {
        if (el.matches(amongst)) {
            i++;
        }
    }
    return i;
};
/**
 * Set attributes of an element
 *
 */
export const setAttr = (el, attrs) => {
    iterate(attrs, (val, attr) => {
        if (val == null) {
            el.removeAttribute(attr);
        }
        else {
            el.setAttribute(attr, '' + val);
        }
    });
};
/**
 * Replace a node
 */
export const replaceNode = (existing, replacement) => {
    if (existing.parentNode)
        existing.parentNode.replaceChild(replacement, existing);
};
//# sourceMappingURL=vanilla.js.map