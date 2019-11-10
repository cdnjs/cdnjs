/*!
 * Stickyfill -- `position: sticky` polyfill
 * v. 1.0.0 | https://github.com/wilddeer/stickyfill
 * Copyright Oleg Korsunsky | http://wd.dizaina.net/
 *
 * MIT License
 */
(function(doc, win) {
    var watchArray = [],
        scroll,
        initialized = false,
        html = doc.documentElement,
        noop = function() {};

    //test getComputedStyle
    if (!win.getComputedStyle) {
        seppuku();
    }

    //test for native support
    var prefixes = ['', '-webkit-', '-moz-', '-ms-'],
        block = document.createElement('div');

    for (var i = prefixes.length - 1; i >= 0; i--) {
        try {
            block.style.position = prefixes[i] + 'sticky';
        }
        catch(e) {}
        if (block.style.position != '') {
            seppuku();
        }
    }

    updateScrollPos();

    //commit seppuku!
    function seppuku() {
        init = add = rebuild = pause = stop = kill = noop;
    }

    function mergeObjects(targetObj, sourceObject) {
        for (key in sourceObject) {
            if (sourceObject.hasOwnProperty(key)) {
                targetObj[key] = sourceObject[key];
            }
        }
    }

    function parseNumeric(val) {
        return parseFloat(val) || 0;
    }

    function getViewportWidth() {
        return parseNumeric(getComputedStyle(html).marginLeft) +
                parseNumeric(getComputedStyle(html).marginRight) +
                html.offsetWidth;
    }

    function updateScrollPos() {
        scroll = {
            top: win.pageYOffset,
            left: win.pageXOffset
        };
    }

    function onScroll() {
        if (win.pageXOffset != scroll.left) {
            scroll.left = win.pageXOffset;
            rebuild();
        }
        
        if (win.pageYOffset != scroll.top) {
            scroll.top = win.pageYOffset;
            recalcAllPos();
        }
    }

    //fixes flickering
    function onWheel(event) {
        setTimeout(function() {
            if (win.pageYOffset != scroll.top) {
                scroll.top = win.pageYOffset;
                recalcAllPos();
            }
        }, 0);
    }

    function recalcAllPos() {
        for (var i = watchArray.length - 1; i >= 0; i--) {
            recalcElementPos(watchArray[i]);
        }
    }

    function recalcElementPos(el) {
        var currentMode = (scroll.top <= el.limit.start || isNaN(parseFloat(el.computed.top))? 0: scroll.top >= el.limit.end? 2: 1);

        if (el.mode != currentMode) {
            switchElementMode(el, currentMode);
        }
    }

    function initElement(el) {
        if (!el.clone) clone(el);
        el.parent.node.style.position = 'relative';
        if (!el.numeric.zIndex) el.node.style.zIndex = 999;
    }

    function deinitElement(el) {
        el.clone && killClone(el);
        mergeObjects(el.node.style, el.css);
        el.parent.node.style.position = el.parent.css.position;
        el.mode = -1;
    }

    function initAll() {
        for (var i = watchArray.length - 1; i >= 0; i--) {
            initElement(watchArray[i]);
        }
    }

    function deinitAll() {
        for (var i = watchArray.length - 1; i >= 0; i--) {
            deinitElement(watchArray[i]);
        }
    }

    function switchElementMode(el, mode) {
        switch (mode) {
            case 0:
                el.node.style.position = 'absolute';
                el.node.style.left = el.offset.left + 'px';
                el.node.style.right = el.offset.right + 'px';
                el.node.style.top = el.offset.top + 'px';
                el.node.style.bottom = 'auto';
                el.node.style.width = 'auto';
                el.node.style.marginLeft = 0;
                el.node.style.marginRight = 0;
                el.node.style.marginTop = 0;
                break;

            case 1:
                //if (!el.cell) el.clone.style.visibility = 'hidden';

                el.node.style.position = 'fixed';
                el.node.style.left = el.box.left + 'px';
                el.node.style.right = el.box.right + 'px';
                el.node.style.top = el.css.top;
                el.node.style.bottom = 'auto';
                el.node.style.width = 'auto';
                el.node.style.marginLeft = 0;
                el.node.style.marginRight = 0;
                el.node.style.marginTop = 0;
                break;

            case 2:
                //if (!el.cell) el.clone.style.visibility = 'hidden';

                el.node.style.position = 'absolute';
                el.node.style.left = el.offset.left + 'px';
                el.node.style.right = el.offset.right + 'px';
                el.node.style.top = 'auto';
                el.node.style.bottom = 0;
                el.node.style.width = 'auto';
                el.node.style.marginLeft = 0;
                el.node.style.marginRight = 0;
                break;
        }

        el.mode = mode;
    }

    function clone(el) {
        var refElement = el.node.nextSibling || el.node;

        el.clone = document.createElement(el.cell?el.node.tagName:'div');

        el.clone.style.height = el.height + 'px';
        el.clone.style.width = el.width + 'px';
        el.clone.style.marginTop = el.computed.marginTop;
        el.clone.style.marginBottom = el.computed.marginBottom;
        el.clone.style.marginLeft = el.computed.marginLeft;
        el.clone.style.marginRight = el.computed.marginRight;
        el.clone.style.padding = el.clone.style.border = el.clone.style.borderSpacing = 0;
        el.clone.style.position = 'static';

        el.node.parentNode.insertBefore(el.clone, refElement);

        if (el.cell) el.clone.appendChild(el.node);

        return el.clone;
    }

    function killClone(el) {
        if (el.cell) el.clone.parentNode.insertBefore(el.node, el.clone);
        el.clone.parentNode.removeChild(el.clone);
        el.clone = undefined;
    }

    function getElementParams(node) {
        var computedStyle = getComputedStyle(node),
            isCell = computedStyle.display == 'table-cell',
            cachePosition = node.style.position;

        if (win.opera || isCell) node.style.position = 'absolute';

        var computed = {
                top: computedStyle.top,
                marginTop: computedStyle.marginTop,
                marginBottom: computedStyle.marginBottom,
                marginLeft: computedStyle.marginLeft,
                marginRight: computedStyle.marginRight
            },
            numeric = {
                top: parseNumeric(computedStyle.top),
                marginBottom: parseNumeric(computedStyle.marginBottom),
                paddingLeft: parseNumeric(computedStyle.paddingLeft),
                paddingRight: parseNumeric(computedStyle.paddingRight),
                borderLeftWidth: parseNumeric(computedStyle.borderLeftWidth),
                borderRightWidth: parseNumeric(computedStyle.borderRightWidth),
                zIndex: parseNumeric(computedStyle.zIndex)
            };

        if (win.opera || isCell) node.style.position = cachePosition;

        var css = {
                position: node.style.position,
                top: node.style.top,
                bottom: node.style.bottom,
                left: node.style.left,
                right: node.style.right,
                width: node.style.width,
                marginTop: node.style.marginTop,
                marginLeft: node.style.marginLeft,
                marginRight: node.style.marginRight,
                zIndex: node.style.zIndex
            },
            parentNode = isCell? node.offsetParent: node.parentNode,
            nodeOffset = getElementOffset(node),
            parentOffset = getElementOffset(parentNode),
            
            parent = {
                node: parentNode,
                css: {
                    position: parentNode.style.position
                },
                numeric: {
                    borderLeftWidth: parseNumeric(getComputedStyle(parentNode).borderLeftWidth),
                    borderRightWidth: parseNumeric(getComputedStyle(parentNode).borderRightWidth),
                    borderTopWidth: parseNumeric(getComputedStyle(parentNode).borderTopWidth),
                    borderBottomWidth: parseNumeric(getComputedStyle(parentNode).borderBottomWidth)
                }
            },

            el = {
                node: node,
                box: {
                    left: nodeOffset.win.left,
                    right: getViewportWidth() - nodeOffset.win.right
                },
                offset: {
                    top: nodeOffset.win.top - parentOffset.win.top - parent.numeric.borderTopWidth,
                    left: nodeOffset.win.left - parentOffset.win.left - parent.numeric.borderLeftWidth,
                    right: -nodeOffset.win.right + parentOffset.win.right - parent.numeric.borderRightWidth
                },
                css: css,
                cell: isCell,
                computed: computed,
                numeric: numeric,
                width: nodeOffset.win.right - nodeOffset.win.left,
                height: nodeOffset.win.bottom - nodeOffset.win.top,
                mode: -1,
                parent: parent,
                clone: undefined,
                limit: {
                    start: nodeOffset.doc.top - numeric.top,
                    end: parentOffset.doc.top + parentNode.offsetHeight - parent.numeric.borderBottomWidth -
                        node.offsetHeight - numeric.top - numeric.marginBottom
                }
            };

        return el;
    }

    function getElementOffset(node) {
        var box = node.getBoundingClientRect();

            return {
                doc: {
                    top: box.top + win.pageYOffset,
                    left: box.left + win.pageXOffset
                },
                win: box
            };
    }

    function init() {
        if (initialized) return;

        initAll();
        updateScrollPos();
        recalcAllPos();
        win.addEventListener('scroll', onScroll);
        win.addEventListener('wheel', onWheel);

        //watch for width changes
        win.addEventListener('resize', rebuild);
        win.addEventListener('orientationchange', rebuild);

        initialized = true;
    }

    function rebuild() {
        if (!initialized) return;

        deinitAll();
        
        for (var i = watchArray.length - 1; i >= 0; i--) {
            watchArray[i] = getElementParams(watchArray[i].node);
        }
        
        initAll();
        recalcAllPos();
    }

    function pause() {
        win.removeEventListener('scroll', onScroll);
        win.removeEventListener('wheel', onWheel);
        win.removeEventListener('resize', rebuild);
        win.removeEventListener('orientationchange', rebuild);

        initialized = false;
    }

    function stop() {
        pause();
        deinitAll(); 
    }

    function kill() {
        stop();
        watchArray = [];
    }

    function add(node) {
        var el = getElementParams(node);

        watchArray.push(el);

        if (!initialized) {
            init();
        }
        else {
            initElement(el);
            recalcElementPos(el);
        }
    }

    //expose Stickyfill
    win.Stickyfill = {
        stickies: watchArray,
        add: add,
        init: init,
        rebuild: rebuild,
        pause: pause,
        stop: stop,
        kill: kill
    };
})(document, window);


//if jQuery is available -- create a plugin
if (window.jQuery) {
    (function($) {
        $.fn.Stickyfill = function(options) {
            this.each(function() {
                Stickyfill.add(this);
            });

            return this;
        };
    })(window.jQuery);
}
