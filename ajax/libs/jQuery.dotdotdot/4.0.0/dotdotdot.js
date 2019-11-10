;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Dotdotdot = factory();
  }
}(this, function() {
/*
 *	jQuery dotdotdot 4.0.0
 *	@requires jQuery 1.7.0 or later
 *
 *	dotdotdot.frebsite.nl
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	License: CC-BY-NC-4.0
 *	http://creativecommons.org/licenses/by-nc/4.0/
 */
/**
 * Class for a multiline ellipsis.
 */
class Dotdotdot {
    /**
     * Truncate a multiline element with an ellipsis.
     *
     * @param {HTMLElement} 	container						The element to truncate.
     * @param {object} 			[options=Dotdotdot.options]		Options for the menu.
     */
    constructor(container, options) {
        this.container = container;
        this.options = options;
        //	Set the watch timeout and -interval;
        this.watchTimeout = null;
        this.watchInterval = null;
        //	Set the resize event handler.
        this.resizeEvent = null;
        //	Extend the specified options with the default options.
        for (let option in Dotdotdot.options) {
            if (!Dotdotdot.options.hasOwnProperty(option)) {
                continue;
            }
            if (typeof this.options[option] == 'undefined') {
                this.options[option] = Dotdotdot.options[option];
            }
        }
        //	If the element allready is a dotdotdot instance.
        //		-> Destroy the previous instance.
        var oldAPI = this.container['dotdotdot'];
        if (oldAPI) {
            oldAPI.destroy();
        }
        //	Create the API.
        this.API = {};
        ['truncate', 'restore', 'destroy', 'watch', 'unwatch']
            .forEach((fn) => {
            this.API[fn] = () => {
                return this[fn].call(this);
            };
        });
        //	Store the API.
        this.container['dotdotdot'] = this.API;
        //	Store the original style attribute;
        this.originalStyle = this.container.getAttribute('style') || '';
        //	Collect the original contents.
        this.originalContent = this._getOriginalContent();
        //	Create the ellipsis Text node.
        this.ellipsis = document.createTextNode(this.options.ellipsis);
        //	Set CSS properties for the container.
        this._setStyles();
        //	Set the max-height for the container.
        if (this.options.height === null) {
            this.options.height = this._getMaxHeight();
        }
        //	Truncate the text.
        this.truncate();
        //	Set the watch.
        if (this.options.watch) {
            this.watch();
        }
    }
    /**
     *	Restore the container to a pre-init state.
     */
    restore() {
        //	Stop the watch.
        this.unwatch();
        //	Restore the original style.
        this.container.setAttribute('style', this.originalStyle);
        //	Restore the original classname.
        this.container.classList.remove('ddd-truncated');
        //	Restore the original contents.
        this.container.innerHTML = '';
        this.originalContent.forEach((element) => {
            this.container.append(element);
        });
    }
    /**
     * Fully destroy the plugin.
     */
    destroy() {
        this.restore();
        this.container['dotdotdot'] = null;
    }
    /**
     * Start a watch for the truncate process.
     */
    watch() {
        //	Stop any previous watch.
        this.unwatch();
        /**	The previously measure sizes. */
        var oldSizes = {
            width: null,
            height: null
        };
        /**
         * Measure the sizes and start the truncate proces.
         */
        var watchSizes = (element, width, height) => {
            //	Only if the container is visible.
            if (this.container.offsetWidth ||
                this.container.offsetHeight ||
                this.container.getClientRects().length) {
                let newSizes = {
                    'width': element[width],
                    'height': element[height]
                };
                if (oldSizes.width != newSizes.width ||
                    oldSizes.height != newSizes.height) {
                    this.truncate();
                }
                return newSizes;
            }
            return oldSizes;
        };
        //	Update onWindowResize.
        if (this.options.watch == 'window') {
            this.resizeEvent = (evnt) => {
                //	Debounce the resize event to prevent it from being called very often.
                if (this.watchTimeout) {
                    clearTimeout(this.watchTimeout);
                }
                this.watchTimeout = setTimeout(() => {
                    oldSizes = watchSizes(window, 'innerWidth', 'innerHeight');
                }, 100);
            };
            window.addEventListener('resize', this.resizeEvent);
        }
        //	Update in an interval.
        else {
            this.watchInterval = setInterval(() => {
                oldSizes = watchSizes(this.container, 'clientWidth', 'clientHeight');
            }, 1000);
        }
    }
    /**
     * Stop the watch.
     */
    unwatch() {
        //	Stop the windowResize handler.
        if (this.resizeEvent) {
            window.removeEventListener('resize', this.resizeEvent);
            this.resizeEvent = null;
        }
        //	Stop the watch interval.
        if (this.watchInterval) {
            clearInterval(this.watchInterval);
        }
        //	Stop the watch timeout.
        if (this.watchTimeout) {
            clearTimeout(this.watchTimeout);
        }
    }
    /**
     * Truncate the container.
     */
    truncate() {
        //	Fill the container with all the original content.
        this.container.innerHTML = '';
        this.originalContent.forEach((element) => {
            this.container.append(element.cloneNode(true));
        });
        //	Get the max height.
        this.maxHeight = this._getMaxHeight();
        //	Truncate the text.
        var isTruncated = false;
        if (!this._fits()) {
            isTruncated = true;
            this._truncateToNode(this.container);
        }
        //	Add a class to the container to indicate whether or not it is truncated.
        this.container.classList[isTruncated ? 'add' : 'remove']('ddd-truncated');
        //	Invoke the callback.
        this.options.callback.call(this.container, isTruncated);
        return isTruncated;
    }
    _truncateToNode(element) {
        var _coms = [], _elms = [];
        //	Empty the node 
        //		-> replace all contents with comments
        Dotdotdot.$.contents(element)
            .forEach((element) => {
            if (element.nodeType != 1 || !element.matches('.ddd-keep')) {
                let comment = document.createComment('');
                element.replaceWith(comment);
                _elms.push(element);
                _coms.push(comment);
            }
        });
        if (!_elms.length) {
            return;
        }
        //	Re-fill the node 
        //		-> replace comments with contents until it doesn't fit anymore
        for (var e = 0; e < _elms.length; e++) {
            _coms[e].replaceWith(_elms[e]);
            let ellipsis = this.ellipsis.cloneNode(true);
            switch (_elms[e].nodeType) {
                case 1:
                    _elms[e].append(ellipsis);
                    break;
                case 3:
                    _elms[e].after(ellipsis);
                    break;
                default:
                    console.log(_elms[e], _elms[e].nodeType);
            }
            let fits = this._fits();
            ellipsis.parentElement.removeChild(ellipsis);
            if (!fits) {
                if (this.options.truncate == 'node' && e > 1) {
                    _elms[e - 2].remove();
                    return;
                }
                break;
            }
        }
        //	Remove left over comments
        for (var c = e; c < _coms.length; c++) {
            _coms[c].remove();
        }
        //	Get last node 
        //		-> the node that overflows
        var _last = _elms[Math.max(0, Math.min(e, _elms.length - 1))];
        //	Border case
        //		-> the last node with only an ellipsis in it...
        if (_last.nodeType == 1) {
            var element = document.createElement(_last.nodeName);
            element.append(this.ellipsis);
            _last.replaceWith(element);
            //	... fits
            //		-> Restore the full last node
            if (this._fits()) {
                element.replaceWith(_last);
            }
            //	... doesn't fit
            //		-> remove it and go back one node
            else {
                element.remove();
                _last = _elms[Math.max(0, e - 1)];
            }
        }
        //	Proceed inside last node
        if (_last.nodeType == 1) {
            this._truncateToNode(_last);
        }
        else {
            this._truncateToWord(_last);
        }
    }
    _truncateToWord(element) {
        var text = element.textContent, seporator = (text.indexOf(' ') !== -1) ? ' ' : '\u3000', parts = text.split(seporator), content = '';
        for (var a = parts.length; a >= 0; a--) {
            content = parts.slice(0, a).join(seporator);
            element.textContent = this._addEllipsis(content);
            if (this._fits()) {
                if (this.options.truncate == 'letter') {
                    element.textContent = parts.slice(0, a + 1).join(seporator);
                    this._truncateToLetter(element);
                }
                break;
            }
        }
    }
    _truncateToLetter(element) {
        var txt = element.textContent, arr = txt.split(''), str = '';
        for (var a = arr.length; a >= 0; a--) {
            str = arr.slice(0, a).join('');
            if (!str.length) {
                continue;
            }
            element.textContent = this._addEllipsis(str);
            if (this._fits()) {
                break;
            }
        }
    }
    _fits() {
        console.log(this.container.scrollHeight);
        return (this.container.scrollHeight <= this.maxHeight + this.options.tolerance);
    }
    _addEllipsis(text) {
        var remove = [' ', '\u3000', ',', ';', '.', '!', '?'];
        while ($.inArray(text.slice(-1), remove) > -1) {
            text = text.slice(0, -1);
        }
        text += this.ellipsis.textContent;
        return text;
    }
    /**
     *	Set CSS properties for the container.
     */
    _setStyles() {
        var computedStyle = window.getComputedStyle(this.container);
        if (computedStyle['word-wrap'] !== 'break-word') {
            this.container.style['word-wrap'] = 'break-word';
        }
        if (computedStyle['white-space'] === 'nowrap') {
            this.container.style['white-space'] = 'normal';
        }
    }
    /**
     * Sanitize and collect the original contents.
     */
    _getOriginalContent() {
        let keep = 'script, style';
        if (this.options.keep) {
            keep += ', ' + this.options.keep;
        }
        //	Add "keep" class to nodes to keep.
        Dotdotdot.$.find(keep, this.container)
            .forEach((elem) => {
            elem.classList.add('ddd-keep');
        });
        [this.container, ...Dotdotdot.$.find('*', this.container)]
            .forEach((element) => {
            //	Removes empty Text nodes and joins adjacent Text nodes.
            element.normalize();
            //	Loop over all contents and remove nodes that can be removed.
            Dotdotdot.$.contents(element)
                .forEach((text) => {
                let remove = false;
                //	Remove Text nodes that do not take up space in the DOM.
                //	This kinda asumes a default display property for the elements in the container.
                if (text.nodeType == 3) {
                    if (text.textContent.trim() == '') {
                        let prev = text.previousSibling, next = text.nextSibling;
                        if (text.parentElement.matches('table, thead, tbody, tfoot, tr, dl, ul, ol, video')) {
                            remove = true;
                        }
                        else if (!prev || prev.matches('div, p, table, td, td, dt, dd, li')) {
                            remove = true;
                        }
                        else if (!next || next.matches('div, p, table, td, td, dt, dd, li')) {
                            remove = true;
                        }
                    }
                }
                //	Remove Comment nodes.
                else if (text.nodeType == 8) {
                    remove = true;
                }
                if (remove) {
                    element.removeChild(text);
                }
            });
        });
        //	Create a clone of all contents.
        let content = [];
        Dotdotdot.$.contents(this.container)
            .forEach((element) => {
            content.push(element.cloneNode(true));
        });
        return content;
    }
    _getMaxHeight() {
        if (typeof this.options.height == 'number') {
            return this.options.height;
        }
        var style = window.getComputedStyle(this.container);
        //	Find smallest CSS height
        var properties = ['maxHeight', 'height'], height = 0;
        for (var a = 0; a < properties.length; a++) {
            let property = style[properties[a]];
            if (property.slice(-2) == 'px') {
                height = parseFloat(property);
                break;
            }
        }
        //	Remove padding-top/bottom when needed.
        properties = [];
        switch (style.boxSizing) {
            case 'border-box':
                properties.push('borderTopWidth');
                properties.push('borderBottomWidth');
            //	no break -> padding needs to be added too
            case 'padding-box':
                properties.push('paddingTop');
                properties.push('paddingBottom');
                break;
        }
        for (var a = 0; a < properties.length; a++) {
            let property = style[properties[a]];
            if (property.slice(-2) == 'px') {
                height -= parseFloat(property);
            }
        }
        //	Sanitize
        return Math.max(height, 0);
    }
}
/**	Plugin version. */
Dotdotdot.version = '4.0.0';
/**	Default options. */
Dotdotdot.options = {
    ellipsis: '\u2026 ',
    callback: function (isTruncated) { },
    truncate: 'word',
    tolerance: 0,
    keep: null,
    watch: 'window',
    height: null
};
Dotdotdot.$ = {
    find: (selector, element) => {
        element = element || document;
        return Array.prototype.slice.call(element.querySelectorAll(selector));
    },
    contents: (element) => {
        element = element || document;
        return Array.prototype.slice.call(element.childNodes);
    }
};

return Dotdotdot;
}));
