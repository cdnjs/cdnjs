/*!
  * Stickyfill – `position: sticky` polyfill
  * v. 2.0.5 | https://github.com/wilddeer/stickyfill
  * MIT License
  */

;(function(window, document) {
    'use strict';
    
    /*
     * 1. Check if the browser supports `position: sticky` natively or is too old to run the polyfill.
     *    If either of these is the case set `seppuku` flag. It will be checked later to disable key features
     *    of the polyfill, but the API will remain functional to avoid breaking things.
     */
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var seppuku = false;
    
    // The polyfill cant’t function properly without `getComputedStyle`.
    if (!window.getComputedStyle) seppuku = true;
    // Dont’t get in a way if the browser supports `position: sticky` natively.
    else {
            var testNode = document.createElement('div');
    
            if (['', '-webkit-', '-moz-', '-ms-'].some(function (prefix) {
                try {
                    testNode.style.position = prefix + 'sticky';
                } catch (e) {}
    
                return testNode.style.position != '';
            })) seppuku = true;
        }
    
    /*
     * 2. “Global” vars used across the polyfill
     */
    
    // Check if Shadow Root constructor exists to make further checks simpler
    var shadowRootExists = typeof ShadowRoot !== 'undefined';
    
    // Last saved scroll position
    var scroll = {
        top: null,
        left: null
    };
    
    // Array of created Sticky instances
    var stickies = [];
    
    /*
     * 3. Utility functions
     */
    function extend(targetObj, sourceObject) {
        for (var key in sourceObject) {
            if (sourceObject.hasOwnProperty(key)) {
                targetObj[key] = sourceObject[key];
            }
        }
    }
    
    function parseNumeric(val) {
        return parseFloat(val) || 0;
    }
    
    function getDocOffsetTop(node) {
        var docOffsetTop = 0;
    
        while (node) {
            docOffsetTop += node.offsetTop;
            node = node.offsetParent;
        }
    
        return docOffsetTop;
    }
    
    /*
     * 4. Sticky class
     */
    
    var Sticky = function () {
        function Sticky(node) {
            _classCallCheck(this, Sticky);
    
            if (!(node instanceof HTMLElement)) throw new Error('First argument must be HTMLElement');
            if (stickies.some(function (sticky) {
                return sticky._node === node;
            })) throw new Error('Stickyfill is already applied to this node');
    
            this._node = node;
            this._stickyMode = null;
            this._active = false;
    
            stickies.push(this);
    
            this.refresh();
        }
    
        _createClass(Sticky, [{
            key: 'refresh',
            value: function refresh() {
                if (seppuku || this._removed) return;
                if (this._active) this._deactivate();
    
                var node = this._node;
    
                /*
                 * 1. Save node computed props
                 */
                var nodeComputedStyle = getComputedStyle(node);
                var nodeComputedProps = {
                    top: nodeComputedStyle.top,
                    display: nodeComputedStyle.display,
                    marginTop: nodeComputedStyle.marginTop,
                    marginBottom: nodeComputedStyle.marginBottom,
                    marginLeft: nodeComputedStyle.marginLeft,
                    marginRight: nodeComputedStyle.marginRight,
                    cssFloat: nodeComputedStyle.cssFloat
                };
    
                /*
                 * 2. Check if the node can be activated
                 */
                if (isNaN(parseFloat(nodeComputedProps.top)) || nodeComputedProps.display == 'table-cell' || nodeComputedProps.display == 'none') return;
    
                this._active = true;
    
                /*
                 * 3. Get necessary node parameters
                 */
                var referenceNode = node.parentNode;
                var parentNode = shadowRootExists && referenceNode instanceof ShadowRoot ? referenceNode.host : referenceNode;
                var nodeWinOffset = node.getBoundingClientRect();
                var parentWinOffset = parentNode.getBoundingClientRect();
                var parentComputedStyle = getComputedStyle(parentNode);
    
                this._parent = {
                    node: parentNode,
                    styles: {
                        position: parentNode.style.position
                    },
                    offsetHeight: parentNode.offsetHeight
                };
                this._offsetToWindow = {
                    left: nodeWinOffset.left,
                    right: document.documentElement.clientWidth - nodeWinOffset.right
                };
                this._offsetToParent = {
                    top: nodeWinOffset.top - parentWinOffset.top - parseNumeric(parentComputedStyle.borderTopWidth),
                    left: nodeWinOffset.left - parentWinOffset.left - parseNumeric(parentComputedStyle.borderLeftWidth),
                    right: -nodeWinOffset.right + parentWinOffset.right - parseNumeric(parentComputedStyle.borderRightWidth)
                };
                this._styles = {
                    position: node.style.position,
                    top: node.style.top,
                    bottom: node.style.bottom,
                    left: node.style.left,
                    right: node.style.right,
                    width: node.style.width,
                    marginTop: node.style.marginTop,
                    marginLeft: node.style.marginLeft,
                    marginRight: node.style.marginRight
                };
    
                var nodeTopValue = parseNumeric(nodeComputedProps.top);
                this._limits = {
                    start: nodeWinOffset.top + window.pageYOffset - nodeTopValue,
                    end: parentWinOffset.top + window.pageYOffset + parentNode.offsetHeight - parseNumeric(parentComputedStyle.borderBottomWidth) - node.offsetHeight - nodeTopValue - parseNumeric(nodeComputedProps.marginBottom)
                };
    
                /*
                 * 4. Ensure that the node will be positioned relatively to the parent node
                 */
                var parentPosition = parentComputedStyle.position;
    
                if (parentPosition != 'absolute' && parentPosition != 'relative') {
                    parentNode.style.position = 'relative';
                }
    
                /*
                 * 5. Recalc node position.
                 *    It’s important to do this before clone injection to avoid scrolling bug in Chrome.
                 */
                this._recalcPosition();
    
                /*
                 * 6. Create a clone
                 */
                var clone = this._clone = {};
                clone.node = document.createElement('div');
    
                // Apply styles to the clone
                extend(clone.node.style, {
                    width: nodeWinOffset.right - nodeWinOffset.left + 'px',
                    height: nodeWinOffset.bottom - nodeWinOffset.top + 'px',
                    marginTop: nodeComputedProps.marginTop,
                    marginBottom: nodeComputedProps.marginBottom,
                    marginLeft: nodeComputedProps.marginLeft,
                    marginRight: nodeComputedProps.marginRight,
                    cssFloat: nodeComputedProps.cssFloat,
                    padding: 0,
                    border: 0,
                    borderSpacing: 0,
                    fontSize: '1em',
                    position: 'static'
                });
    
                referenceNode.insertBefore(clone.node, node);
                clone.docOffsetTop = getDocOffsetTop(clone.node);
            }
        }, {
            key: '_recalcPosition',
            value: function _recalcPosition() {
                if (!this._active || this._removed) return;
    
                var stickyMode = scroll.top <= this._limits.start ? 'start' : scroll.top >= this._limits.end ? 'end' : 'middle';
    
                if (this._stickyMode == stickyMode) return;
    
                switch (stickyMode) {
                    case 'start':
                        extend(this._node.style, {
                            position: 'absolute',
                            left: this._offsetToParent.left + 'px',
                            right: this._offsetToParent.right + 'px',
                            top: this._offsetToParent.top + 'px',
                            bottom: 'auto',
                            width: 'auto',
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 0
                        });
                        break;
    
                    case 'middle':
                        extend(this._node.style, {
                            position: 'fixed',
                            left: this._offsetToWindow.left + 'px',
                            right: this._offsetToWindow.right + 'px',
                            top: this._styles.top,
                            bottom: 'auto',
                            width: 'auto',
                            marginLeft: 0,
                            marginRight: 0,
                            marginTop: 0
                        });
                        break;
    
                    case 'end':
                        extend(this._node.style, {
                            position: 'absolute',
                            left: this._offsetToParent.left + 'px',
                            right: this._offsetToParent.right + 'px',
                            top: 'auto',
                            bottom: 0,
                            width: 'auto',
                            marginLeft: 0,
                            marginRight: 0
                        });
                        break;
                }
    
                this._stickyMode = stickyMode;
            }
        }, {
            key: '_fastCheck',
            value: function _fastCheck() {
                if (!this._active || this._removed) return;
    
                if (Math.abs(getDocOffsetTop(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) this.refresh();
            }
        }, {
            key: '_deactivate',
            value: function _deactivate() {
                var _this = this;
    
                if (!this._active || this._removed) return;
    
                this._clone.node.parentNode.removeChild(this._clone.node);
                delete this._clone;
    
                extend(this._node.style, this._styles);
                delete this._styles;
    
                // Check whether element’s parent node is used by other stickies.
                // If not, restore parent node’s styles.
                if (!stickies.some(function (sticky) {
                    return sticky !== _this && sticky._parent && sticky._parent.node === _this._parent.node;
                })) {
                    extend(this._parent.node.style, this._parent.styles);
                }
                delete this._parent;
    
                this._stickyMode = null;
                this._active = false;
    
                delete this._offsetToWindow;
                delete this._offsetToParent;
                delete this._limits;
            }
        }, {
            key: 'remove',
            value: function remove() {
                var _this2 = this;
    
                this._deactivate();
    
                stickies.some(function (sticky, index) {
                    if (sticky._node === _this2._node) {
                        stickies.splice(index, 1);
                        return true;
                    }
                });
    
                this._removed = true;
            }
        }]);
    
        return Sticky;
    }();
    
    /*
     * 5. Stickyfill API
     */
    
    
    var Stickyfill = {
        stickies: stickies,
        Sticky: Sticky,
    
        addOne: function addOne(node) {
            // Check whether it’s a node
            if (!(node instanceof HTMLElement)) {
                // Maybe it’s a node list of some sort?
                // Take first node from the list then
                if (node.length && node[0]) node = node[0];else return;
            }
    
            // Check if Stickyfill is already applied to the node
            // and return existing sticky
            for (var i = 0; i < stickies.length; i++) {
                if (stickies[i]._node === node) return stickies[i];
            }
    
            // Create and return new sticky
            return new Sticky(node);
        },
        add: function add(nodeList) {
            // If it’s a node make an array of one node
            if (nodeList instanceof HTMLElement) nodeList = [nodeList];
            // Check if the argument is an iterable of some sort
            if (!nodeList.length) return;
    
            // Add every element as a sticky and return an array of created Sticky instances
            var addedStickies = [];
    
            var _loop = function _loop(i) {
                var node = nodeList[i];
    
                // If it’s not an HTMLElement – create an empty element to preserve 1-to-1
                // correlation with input list
                if (!(node instanceof HTMLElement)) {
                    addedStickies.push(void 0);
                    return 'continue';
                }
    
                // If Stickyfill is already applied to the node
                // add existing sticky
                if (stickies.some(function (sticky) {
                    if (sticky._node === node) {
                        addedStickies.push(sticky);
                        return true;
                    }
                })) return 'continue';
    
                // Create and add new sticky
                addedStickies.push(new Sticky(node));
            };
    
            for (var i = 0; i < nodeList.length; i++) {
                var _ret = _loop(i);
    
                if (_ret === 'continue') continue;
            }
    
            return addedStickies;
        },
        refreshAll: function refreshAll() {
            stickies.forEach(function (sticky) {
                return sticky.refresh();
            });
        },
        removeOne: function removeOne(node) {
            // Check whether it’s a node
            if (!(node instanceof HTMLElement)) {
                // Maybe it’s a node list of some sort?
                // Take first node from the list then
                if (node.length && node[0]) node = node[0];else return;
            }
    
            // Remove the stickies bound to the nodes in the list
            stickies.some(function (sticky) {
                if (sticky._node === node) {
                    sticky.remove();
                    return true;
                }
            });
        },
        remove: function remove(nodeList) {
            // If it’s a node make an array of one node
            if (nodeList instanceof HTMLElement) nodeList = [nodeList];
            // Check if the argument is an iterable of some sort
            if (!nodeList.length) return;
    
            // Remove the stickies bound to the nodes in the list
    
            var _loop2 = function _loop2(i) {
                var node = nodeList[i];
    
                stickies.some(function (sticky) {
                    if (sticky._node === node) {
                        sticky.remove();
                        return true;
                    }
                });
            };
    
            for (var i = 0; i < nodeList.length; i++) {
                _loop2(i);
            }
        },
        removeAll: function removeAll() {
            while (stickies.length) {
                stickies[0].remove();
            }
        }
    };
    
    /*
     * 6. Setup events (unless the polyfill was disabled)
     */
    function init() {
        // Watch for scroll position changes and trigger recalc/refresh if needed
        function checkScroll() {
            if (window.pageXOffset != scroll.left) {
                scroll.top = window.pageYOffset;
                scroll.left = window.pageXOffset;
    
                Stickyfill.refreshAll();
            } else if (window.pageYOffset != scroll.top) {
                scroll.top = window.pageYOffset;
                scroll.left = window.pageXOffset;
    
                // recalc position for all stickies
                stickies.forEach(function (sticky) {
                    return sticky._recalcPosition();
                });
            }
        }
    
        checkScroll();
        window.addEventListener('scroll', checkScroll);
    
        // Watch for window resizes and device orientation changes and trigger refresh
        window.addEventListener('resize', Stickyfill.refreshAll);
        window.addEventListener('orientationchange', Stickyfill.refreshAll);
    
        //Fast dirty check for layout changes every 500ms
        var fastCheckTimer = void 0;
    
        function startFastCheckTimer() {
            fastCheckTimer = setInterval(function () {
                stickies.forEach(function (sticky) {
                    return sticky._fastCheck();
                });
            }, 500);
        }
    
        function stopFastCheckTimer() {
            clearInterval(fastCheckTimer);
        }
    
        var docHiddenKey = void 0;
        var visibilityChangeEventName = void 0;
    
        if ('hidden' in document) {
            docHiddenKey = 'hidden';
            visibilityChangeEventName = 'visibilitychange';
        } else if ('webkitHidden' in document) {
            docHiddenKey = 'webkitHidden';
            visibilityChangeEventName = 'webkitvisibilitychange';
        }
    
        if (visibilityChangeEventName) {
            if (!document[docHiddenKey]) startFastCheckTimer();
    
            document.addEventListener(visibilityChangeEventName, function () {
                if (document[docHiddenKey]) {
                    stopFastCheckTimer();
                } else {
                    startFastCheckTimer();
                }
            });
        } else startFastCheckTimer();
    }
    
    if (!seppuku) init();
    
    /*
     * 7. Expose Stickyfill
     */
    if (typeof module != 'undefined' && module.exports) {
        module.exports = Stickyfill;
    } else {
        window.Stickyfill = Stickyfill;
    }
    
})(window, document);