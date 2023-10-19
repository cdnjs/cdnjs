/***

 ~~~ Version 3.0.4 ~~~

 ******************************************

    ____                   _____      __          __ 
   / __ \_________ _____ _/ ___/___  / /__  _____/ /_
  / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
 / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_  
/_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/  
               /____/                              

 ******************************************
 
 {*} {*} STAR THIS PROJECT ON GITHUB {*} {*}

 https://github.com/ThibaultJanBeyer/DragSelect
 Please give it a like, this is what makes me happy :-)
 Thank You

 {*} {*} STAR THIS PROJECT ON GITHUB {*} {*}
 
 ***************************************
 ********* GPLv3 / Commercial **********
 ***************************************
 Created 2017 by ThibaultJanBeyer
 Web: http://www.DragSelect.com/
 GitHub: https://github.com/ThibaultJanBeyer/DragSelect
 ***************************************
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DragSelect = factory());
})(this, (function () { 'use strict';

    const addModificationObservers = (nodes, cb) => {
        const callback = cb;
        window.addEventListener('resize', callback);
        window.addEventListener('scroll', callback);
        const observer = new MutationObserver(callback);
        const resizeObserver = new ResizeObserver(callback);
        nodes.forEach((el, i) => {
            observer.observe(el, {
                childList: i !== 0,
                attributes: true,
            });
            if (el instanceof Element)
                resizeObserver.observe(el);
        });
        /**
         * Removes all observers
         */
        const cleanup = () => {
            window.removeEventListener('resize', callback);
            window.removeEventListener('scroll', callback);
            observer.disconnect();
            resizeObserver.disconnect();
        };
        return { observer, resizeObserver, callback, cleanup };
    };

    /**
     * Returns a function, that, as long as it continues to be invoked, will not
     * be triggered. The function will be called after it stops being called for
     * `wait` milliseconds. All credits to [Trey Huffine]{@link https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086}
     */
    const debounce = (func, wait) => {
        let timeout;
        // This is the function that is returned and will be executed many times
        // We spread (...args) to capture any number of parameters we want to pass
        return (...args) => {
            // The callback function to be executed after
            // the debounce time has elapsed
            const later = () => {
                // null timeout to indicate the debounce ended
                timeout = undefined;
                // Execute the callback
                func(...args);
            };
            // This will reset the waiting every function execution.
            // This is the step that prevents the function from
            // being executed because it will never reach the
            // inside of the previous setTimeout
            clearTimeout(timeout);
            // Restart the debounce waiting period.
            // setTimeout returns a truthy value (it differs in web vs Node)
            timeout = setTimeout(later, wait);
        };
    };

    const getAllParentNodes = (node) => {
        const traverse = (toWatch, index = 0) => {
            const parent = toWatch[index]?.parentNode;
            if (parent) {
                toWatch.push(parent);
                index++;
                return traverse(toWatch, index);
            }
            return toWatch;
        };
        return traverse([node]);
    };

    /**
     * Returns the top/left/bottom/right/width/height
     * values of an area. If area is document then everything
     * except the sizes will be nulled.
     */
    const getAreaRect = (area, zoom) => {
        if (area instanceof Document)
            return {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        const rect = area.getBoundingClientRect();
        return {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            width: (area.clientWidth || rect.width) * zoom,
            height: (area.clientHeight || rect.height) * zoom,
        };
    };

    /** Fix: some elements have to have a special position attribute for calculations */
    const handleElementPositionAttribute = ({ computedStyle, node }) => {
        const { position } = computedStyle;
        const isPositioned = position === 'absolute' || position === 'relative' || position === 'fixed';
        if (!(node instanceof Document) && !isPositioned)
            node.style.position = 'relative';
    };

    /** Scroll the element in the specified direction */
    const scrollElement = (element, directions, multiplier = 1) => {
        if (!directions?.length || !element)
            return;
        const docEl = document &&
            document.documentElement &&
            document.documentElement.scrollTop &&
            document.documentElement;
        const _element = element instanceof Document ? docEl || document.body : element;
        const scrollTop = directions.includes('top') && _element.scrollTop > 0;
        const scrollBot = directions.includes('bottom') && _element.scrollTop < _element.scrollHeight;
        const scrollLeft = directions.includes('left') && _element.scrollLeft > 0;
        const scrollRight = directions.includes('right') && _element.scrollLeft < _element.scrollWidth;
        if (scrollTop)
            _element.scrollTop -= 1 * multiplier;
        if (scrollBot)
            _element.scrollTop += 1 * multiplier;
        if (scrollLeft)
            _element.scrollLeft -= 1 * multiplier;
        if (scrollRight)
            _element.scrollLeft += 1 * multiplier;
    };

    class Area {
        DS;
        PS;
        Settings;
        _observers;
        _node;
        _parentNodes;
        _computedStyle;
        _computedBorder;
        _rect;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this._node = this.Settings.area;
            this.setArea(this.Settings.area);
            this.PS.subscribe('Settings:updated:area', ({ settings: { area } }) => this.setArea(area));
            this.PS.subscribe('Interaction:init', this.init);
            this.PS.subscribe('Interaction:end', this.reset);
        }
        setArea = (area) => {
            this.reset();
            this._node = area;
            handleElementPositionAttribute({
                computedStyle: this.computedStyle,
                node: this._node,
            });
            // first immediate debounce to update values after dom-update
            setTimeout(() => {
                this.PS.publish('Area:modified:pre', { item: this.HTMLNode });
                this.reset();
                this.PS.publish('Area:modified', { item: this.HTMLNode });
            });
        };
        init = () => {
            this._observers = addModificationObservers(this.parentNodes, debounce((event) => {
                this.PS.publish('Area:modified:pre', { event, item: this.HTMLNode });
                this.reset();
                this.PS.publish('Area:modified', { event, item: this.HTMLNode });
            }, 60));
        };
        reset = () => {
            this._computedStyle = undefined;
            this._rect = undefined;
            this._computedBorder = undefined;
            this._parentNodes = undefined;
        };
        stop = () => {
            this._observers?.cleanup();
            this.reset();
        };
        /// ///////////////////////////////////////////////////////////////////////////////////
        // Scroll
        /** Scroll the area in the specified direction */
        scroll = (directions, multiplier) => {
            const data = {
                scroll_directions: directions,
                scroll_multiplier: multiplier,
            };
            this.PS.publish('Area:scroll:pre', data);
            scrollElement(this._node, directions, multiplier);
            this.PS.publish('Area:scroll', data);
        };
        /// ///////////////////////////////////////////////////////////////////////////////////
        // Node Getters
        get HTMLNode() {
            return this._node;
        }
        /** The computed border from the element (caches result) */
        get computedBorder() {
            if (this._computedBorder)
                return this._computedBorder;
            return {
                top: parseInt(this.computedStyle.borderTopWidth),
                bottom: parseInt(this.computedStyle.borderBottomWidth),
                left: parseInt(this.computedStyle.borderLeftWidth),
                right: parseInt(this.computedStyle.borderRightWidth),
            };
        }
        /** The computed styles from the element (caches result) */
        get computedStyle() {
            if (this._computedStyle)
                return this._computedStyle;
            if (this.HTMLNode instanceof Document)
                return (this._computedStyle = window.getComputedStyle(this.HTMLNode.body || this.HTMLNode.documentElement));
            return (this._computedStyle = window.getComputedStyle(this.HTMLNode));
        }
        /** The element rect (caches result) (without scrollbar or borders) */
        get rect() {
            if (this._rect)
                return this._rect;
            return (this._rect = getAreaRect(this.HTMLNode, this.DS.stores.SettingsStore.s.zoom));
        }
        get parentNodes() {
            if (this._parentNodes)
                return this._parentNodes;
            return (this._parentNodes = getAllParentNodes(this.HTMLNode));
        }
    }

    const calcVect = ({ x: x1, y: y1 }, operator, { x: x2, y: y2 }) => {
        const calculations = {
            '+': {
                x: x1 + x2,
                y: y1 + y2,
            },
            '-': {
                x: x1 - x2,
                y: y1 - y2,
            },
            '*': {
                x: x1 * x2,
                y: y1 * y2,
            },
            '/': {
                x: x1 / x2,
                y: y1 / y2,
            },
        };
        return calculations[operator];
    };
    const rect2vect = (rect) => ({ x: rect.left, y: rect.top });
    const vect2rect = (vect, dimension = 0) => ({
        left: vect.x,
        top: vect.y,
        right: vect.x,
        bottom: vect.y,
        width: dimension,
        height: dimension,
    });
    const num2vect = (n) => ({ x: n, y: n });

    const handleKeyboardDragPosDifference = ({ shiftKey, keyboardDragSpeed, zoom, key, dragKeys, scrollDiff, }) => {
        const posDirection = { x: 0, y: 0 };
        const increase = shiftKey
            ? keyboardDragSpeed * 4 * zoom
            : keyboardDragSpeed * zoom;
        if (dragKeys?.left.includes(key))
            posDirection.x = scrollDiff.x || -increase;
        if (dragKeys?.right.includes(key))
            posDirection.x = scrollDiff.x || increase;
        if (dragKeys?.up.includes(key))
            posDirection.y = scrollDiff.y || -increase;
        if (dragKeys?.down.includes(key))
            posDirection.y = scrollDiff.y || increase;
        return posDirection;
    };

    const getComputedTranslatePositions = (element) => {
        const position = {
            x: 0,
            y: 0,
        };
        const computed = window.getComputedStyle(element);
        if (!computed.transform || computed.transform === 'none')
            return position;
        if (computed.transform.indexOf('3d') >= 0) {
            const match = computed.transform.trim().match(/matrix3d\((.*?)\)/);
            if (match && match.length) {
                const values = match[1]?.split(',');
                position.x = parseInt(values[12]) || 0;
                position.y = parseInt(values[13]) || 0;
            }
            return position;
        }
        const match = computed.transform.trim().match(/matrix\((.*?)\)/);
        if (match && match.length) {
            const values = match[1]?.split(',');
            position.x = parseInt(values[4]) || 0;
            position.y = parseInt(values[5]) || 0;
        }
        return position;
    };
    const getTranslatedPositions = (element) => {
        const { transform } = element.style;
        if (!transform || transform.indexOf('translate') < 0)
            return getComputedTranslatePositions(element);
        const position = {
            x: 0,
            y: 0,
        };
        const match = transform.trim().match(/translate[3dD]*?\(.*?\)/);
        if (match) {
            const split = match[0]?.split('(');
            if (split) {
                const values = split[1]?.split(',');
                position.x = parseInt(values[0]) || 0;
                position.y = parseInt(values[1]) || 0;
            }
        }
        if (!position.x && !position.x)
            return getComputedTranslatePositions(element);
        return position;
    };
    const getTopLeftPosition = (element) => {
        const { style } = element;
        const position = {
            x: parseInt(style.left) || 0,
            y: parseInt(style.top) || 0,
        };
        // initial positions
        if (!position.x && !position.x) {
            const computed = window.getComputedStyle(element);
            return {
                x: parseInt(computed.left) || 0,
                y: parseInt(computed.top) || 0,
            };
        }
        return position;
    };
    /**
     * Returns the X and Y coordinates based on styles
     * Can handle translate and top/left
     */
    const getStylePosition = (element, useTranslate) => {
        if (useTranslate)
            return getTranslatedPositions(element);
        return getTopLeftPosition(element);
    };

    /** Sets the style position to the X and Y coordinates. Can handle translate and top/left */
    const setStylePosition = (element, values, useTranslate) => {
        if (useTranslate) {
            const prevTransform = element.style.transform;
            element.style.transform = `translate3d(${values.x}px,${values.y}px,1px) ${prevTransform.replace(/translate.*?\)/g, '')}`;
        }
        else {
            element.style.left = `${values.x}px`;
            element.style.top = `${values.y}px`;
        }
        return element;
    };

    /** Moves the element in a posDirection */
    const moveElement = ({ element, posDirection, useTransform }) => {
        const elementPos = getStylePosition(element, useTransform);
        const newPos = calcVect(elementPos, '+', posDirection);
        setStylePosition(element, newPos, useTransform);
    };

    /**
     * Modify direction value so that the rect of draggable elements
     * does not exceed the boundaries of container rect
     */
    const limitDirection = ({ containerRect, selectionRect, direction, scrollAmount }) => {
        const delta = {
            top: containerRect.top - selectionRect.top + scrollAmount.y,
            left: containerRect.left - selectionRect.left + scrollAmount.x,
            bottom: containerRect.bottom - selectionRect.bottom + scrollAmount.y,
            right: containerRect.right - selectionRect.right + scrollAmount.x,
        };
        if (direction.x === 0 && direction.y === 0)
            return direction;
        if (direction.y < 0)
            direction.y = Math.max(direction.y, delta.top);
        if (direction.x < 0)
            direction.x = Math.max(direction.x, delta.left);
        if (direction.y > 0)
            direction.y = Math.min(direction.y, delta.bottom);
        if (direction.x > 0)
            direction.x = Math.min(direction.x, delta.right);
        selectionRect.top += direction.y;
        selectionRect.bottom += direction.y;
        selectionRect.left += direction.x;
        selectionRect.right += direction.x;
        return direction;
    };

    class Drag {
        _prevCursorPos;
        _prevScrollPos;
        _elements = [];
        _dragKeys;
        _dragKeysFlat = [];
        _selectionRect = vect2rect(num2vect(0));
        DS;
        PS;
        Settings;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.PS.subscribe('Settings:updated:dragKeys', this.assignDragKeys);
            this.assignDragKeys();
            this.PS.subscribe('Interaction:start', this.start);
            this.PS.subscribe('Interaction:end', this.stop);
            this.PS.subscribe('Interaction:update', this.update);
            this.PS.subscribe('KeyStore:down', this.keyboardDrag);
            this.PS.subscribe('KeyStore:up', this.keyboardEnd);
        }
        assignDragKeys = () => {
            this._dragKeys = {
                up: this.Settings.dragKeys.up.map((k) => k.toLowerCase()),
                down: this.Settings.dragKeys.down.map((k) => k.toLowerCase()),
                left: this.Settings.dragKeys.left.map((k) => k.toLowerCase()),
                right: this.Settings.dragKeys.right.map((k) => k.toLowerCase()),
            };
            this._dragKeysFlat = [
                ...this._dragKeys.up,
                ...this._dragKeys.down,
                ...this._dragKeys.left,
                ...this._dragKeys.right,
            ];
        };
        keyboardDrag = ({ event, key, }) => {
            const _key = key.toLowerCase();
            if (!this.Settings.keyboardDrag ||
                !this._dragKeysFlat.includes(_key) ||
                !this.DS.SelectedSet.size ||
                !this.Settings.draggability ||
                this.DS.continue)
                return;
            const publishData = {
                event,
                isDragging: true,
                isDraggingKeyboard: true,
                key,
            };
            this.PS.publish(['Interaction:start:pre', 'Interaction:start'], publishData);
            this._elements = this.DS.getSelection();
            this._selectionRect = this.DS.Selection.boundingRect;
            this.handleZIndex(true);
            let posDirection = handleKeyboardDragPosDifference({
                shiftKey: this.DS.stores.KeyStore.currentValues.includes('shift'),
                keyboardDragSpeed: this.Settings.keyboardDragSpeed,
                zoom: this.Settings.zoom,
                key: _key,
                scrollDiff: this._scrollDiff,
                dragKeys: this._dragKeys,
            });
            posDirection = limitDirection({
                direction: posDirection,
                containerRect: this.DS.SelectorArea.rect,
                scrollAmount: this.DS.stores.ScrollStore.scrollAmount,
                selectionRect: this._selectionRect,
            });
            this.moveElements(posDirection);
            this.PS.publish(['Interaction:update:pre', 'Interaction:update'], publishData);
        };
        keyboardEnd = ({ event, key, }) => {
            const _key = key.toLowerCase();
            if (!this.Settings.keyboardDrag ||
                !this._dragKeysFlat.includes(_key) ||
                !this.DS.SelectedSet.size ||
                !this.Settings.draggability)
                return;
            const publishData = {
                event,
                isDragging: this.Settings.draggability,
                isDraggingKeyboard: true,
                key,
            };
            this.PS.publish(['Interaction:end:pre', 'Interaction:end'], publishData);
        };
        start = ({ isDragging, isDraggingKeyboard, }) => {
            if (!isDragging || isDraggingKeyboard)
                return;
            this._prevCursorPos = undefined;
            this._prevScrollPos = undefined;
            this._elements = this.DS.getSelection();
            this._selectionRect = this.DS.Selection.boundingRect;
            this.handleZIndex(true);
        };
        stop = () => {
            this._prevCursorPos = undefined;
            this._prevScrollPos = undefined;
            this.handleZIndex(false);
            this._elements = [];
        };
        update = ({ isDragging, isDraggingKeyboard, }) => {
            if (!isDragging ||
                !this._elements.length ||
                isDraggingKeyboard ||
                this.DS.continue)
                return;
            let posDirection = calcVect(this._cursorDiff, '+', this._scrollDiff);
            posDirection = limitDirection({
                direction: posDirection,
                containerRect: this.DS.SelectorArea.rect,
                scrollAmount: this.DS.stores.ScrollStore.scrollAmount,
                selectionRect: this._selectionRect,
            });
            this.moveElements(posDirection);
        };
        handleZIndex = (add) => {
            this._elements.forEach((element) => (element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) + (add ? 9999 : -9998)}`));
        };
        moveElements = (posDirection) => {
            // [PUBLICLY EXPOSED METHOD]
            const { elements, direction } = this.filterDragElements({
                elements: this._elements,
                direction: posDirection,
            });
            elements.forEach((element) => {
                moveElement({
                    element,
                    posDirection: direction,
                    containerRect: this.DS.SelectorArea.rect,
                    useTransform: this.Settings.useTransform,
                });
            });
        };
        get _cursorDiff() {
            const currentPointerVal = this.DS.stores.PointerStore.currentVal;
            const cursorDiff = this._prevCursorPos
                ? calcVect(currentPointerVal, '-', this._prevCursorPos)
                : { x: 0, y: 0 };
            this._prevCursorPos = currentPointerVal;
            return cursorDiff;
        }
        get _scrollDiff() {
            const currentScrollVal = this.DS.stores.ScrollStore.currentVal;
            const scrollDiff = this._prevScrollPos
                ? calcVect(currentScrollVal, '-', this._prevScrollPos)
                : { x: 0, y: 0 };
            this._prevScrollPos = currentScrollVal;
            return scrollDiff;
        }
        ////
        // [PUBLICLY EXPOSED METHODS]
        /**
         * Can be overridden to apply further filtering logic after the items to move are identified but before they actually get moved
         * Is expected to return the elements in the same shape as passed in
         */
        filterDragElements = ({ elements, direction, }) => ({
            elements,
            direction,
        });
    }

    const isCollision = (el1, el2, percent = 0) => {
        if (!el1 || !el2)
            return false;
        let element1 = el1;
        if (percent > 0) {
            const widthPoint = (el1.right - el1.left) * percent;
            const heightPoint = (el1.bottom - el1.top) * percent;
            element1 = {
                left: el1.left + widthPoint,
                right: el1.right - widthPoint,
                top: el1.top + heightPoint,
                bottom: el1.bottom - heightPoint,
            };
        }
        if (element1.left < el2.right && // 1.
            element1.right > el2.left && // 2.
            element1.top < el2.bottom && // 3.
            element1.bottom > el2.top // 4.
        )
            return true;
        // collision detected!
        return false;
    };

    const ensureArray = input => {
        if (!input)
            return [];
        if (!Array.isArray(input) && typeof input[Symbol.iterator] !== 'function')
            return [input];
        return [...new Set([...input])];
    };

    class DropZone {
        id;
        element;
        _droppables;
        _rect;
        _observers;
        _timeout;
        _itemsDropped = [];
        _itemsInside;
        DS;
        PS;
        Settings;
        isDestroyed = false;
        _parentNodes;
        constructor({ DS, PS, id, element, droppables, }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.id = id;
            this.element = element;
            if (droppables)
                this.droppables = ensureArray(droppables);
            this.element.classList.add(`${this.Settings.dropZoneClass}`);
            this.PS.subscribe('Settings:updated:dropZoneClass', ({ settings }) => {
                if (!this.element)
                    return;
                this.element.classList.remove(settings['dropZoneClass:pre']);
                this.element.classList.add(settings.dropZoneClass);
            });
            this._observers = addModificationObservers(this.parentNodes, debounce(() => (this._rect = undefined), this.Settings.refreshMemoryRate));
            this.PS.subscribe('Interaction:start', this.start);
            this.PS.subscribe('Interaction:end', this.stop);
        }
        setReadyClasses = (action) => {
            if (this.isDestroyed)
                return;
            const selectedEls = this.droppables.filter((el) => this.DS.SelectedSet.has(el));
            if (!selectedEls.length)
                return;
            selectedEls.forEach((item) => {
                item.classList[action](`${this.Settings.droppableClass}`);
                item.classList[action](`${this.Settings.droppableClass}-${this.id}`);
            });
            this.element.classList[action](`${this.Settings.dropZoneReadyClass}`);
        };
        /** This zone is NOT the target of a drop */
        handleNoDrop = () => {
            if (this.isDestroyed)
                return;
            // for each selected element that is not part of the target zone, remove the classes
            this.DS.SelectedSet.forEach((item) => {
                item.classList.remove(this.Settings.droppedTargetClass);
                item.classList.remove(`${this.Settings.droppedTargetClass}-${this.id}`);
            });
            // and remove them from the zones dropped items
            this._itemsDropped = this._itemsDropped.filter((item) => !this.DS.SelectedSet.has(item));
            // if the zone has no dropped left, also remove the zones class
            if (!this._itemsDropped?.length)
                this.element.classList.remove(`${this.Settings.dropZoneTargetClass}`);
        };
        /** This zone IS the target of a drop */
        handleDrop = () => {
            if (this.isDestroyed)
                return;
            this._itemsDropped = [
                ...new Set([
                    ...this._itemsDropped,
                    ...this.droppables?.filter((item) => this.DS.SelectedSet.has(item)),
                ]),
            ];
            // add the target class to the zones dropped items
            this._itemsDropped?.forEach((item) => {
                item.classList.add(`${this.Settings.droppedTargetClass}`);
                item.classList.add(`${this.Settings.droppedTargetClass}-${this.id}`);
            });
            // if the zone has dropped, add the zones class
            if (this._itemsDropped?.length)
                this.element.classList.add(`${this.Settings.dropZoneTargetClass}`);
        };
        handleItemsInsideClasses = () => {
            let isAnyInside = false;
            this.droppables.forEach((item) => {
                if (this.itemsInside?.includes(item)) {
                    item.classList.add(`${this.Settings.droppedInsideClass}`);
                    item.classList.add(`${this.Settings.droppedInsideClass}-${this.id}`);
                    isAnyInside = true;
                }
                else {
                    item.classList.remove(`${this.Settings.droppedInsideClass}-${this.id}`);
                    if (!item.className.includes(`${this.Settings.droppedInsideClass}-`))
                        item.classList.remove(`${this.Settings.droppedInsideClass}`);
                }
            });
            if (isAnyInside)
                this.element.classList.add(`${this.Settings.dropZoneInsideClass}`);
            else
                this.element.classList.remove(`${this.Settings.dropZoneInsideClass}`);
        };
        start = ({ isDragging }) => {
            if (!isDragging || this.isDestroyed)
                return;
            this.setReadyClasses('add');
        };
        stop = ({ isDragging }) => {
            if (!isDragging || this.isDestroyed)
                return;
            this.setReadyClasses('remove');
            this.handleItemsInsideClasses();
        };
        destroy() {
            this._observers?.cleanup();
            this.element.classList.remove(`${this.Settings.dropZoneClass}`);
            this.element.classList.remove(`${this.Settings.dropZoneTargetClass}`);
            this.element.classList.remove(`${this.Settings.dropZoneReadyClass}`);
            this.droppables.forEach((item) => {
                item.classList.remove(`${this.Settings.droppedTargetClass}`);
                item.classList.remove(`${this.Settings.droppedTargetClass}-${this.id}`);
                item.classList.remove(`${this.Settings.droppableClass}`);
                item.classList.remove(`${this.Settings.droppableClass}-${this.id}`);
            });
            this.PS.unsubscribe('Interaction:start', this.start);
            this.PS.unsubscribe('Interaction:end', this.stop);
            this.isDestroyed = true;
        }
        toObject = () => ({
            id: this.id,
            element: this.element,
            droppables: this.droppables,
            itemsDropped: this.itemsDropped,
            itemsInside: this.itemsInside,
        });
        get rect() {
            if (this.isDestroyed)
                return undefined;
            if (this._rect)
                return this._rect;
            return (this._rect = this.element.getBoundingClientRect());
        }
        get itemsDropped() {
            if (this.isDestroyed)
                return undefined;
            return this._itemsDropped;
        }
        get itemsInside() {
            if (this.isDestroyed)
                return undefined;
            if (this._itemsInside)
                return this._itemsInside;
            this._itemsInside = this.droppables.flatMap((item) => {
                const itemRect = this.DS.SelectableSet.rects.get(item);
                if (this.rect &&
                    isCollision(itemRect, this.rect, this.Settings.dropInsideThreshold))
                    return [item];
                return [];
            });
            // since elements can be moved while this getter is called, we need to update the values every X seconds
            if (this._timeout)
                clearTimeout(this._timeout);
            this._timeout = setTimeout(() => (this._itemsInside = undefined), this.Settings.refreshMemoryRate);
            return this._itemsInside;
        }
        get parentNodes() {
            if (this._parentNodes)
                return this._parentNodes;
            return (this._parentNodes = getAllParentNodes(this.element));
        }
        get droppables() {
            if (this._droppables)
                return this._droppables;
            return this.DS.SelectableSet.elements;
        }
        set droppables(value) {
            this._droppables = value;
        }
    }

    class DropZones {
        /** Get the drop zone by the zone element */
        _zoneByElement = new Map();
        /** Get the drop zone by the zone id */
        _zoneById = new Map();
        /** Get the drop zones by one zone item */
        _zonesByDroppable = new Map();
        /** Get the drop zones by one zone item */
        _zones;
        DS;
        PS;
        Settings;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.PS.subscribe('Settings:updated:dropZones', ({ settings }) => this.setDropZones(settings));
            this.setDropZones({ dropZones: this.Settings.dropZones });
            this.PS.subscribe('Interaction:end', this.stop);
        }
        setDropZones = ({ dropZones, }) => {
            if (!dropZones)
                return;
            if (this._zones)
                this._zones.forEach((zone) => zone.destroy());
            this._zones = dropZones.map((zone) => new DropZone({ DS: this.DS, PS: this.PS, ...zone }));
            this._zones.forEach((zone) => {
                this._zoneByElement.set(zone.element, zone);
                this._zoneById.set(zone.id, zone);
                zone.droppables.forEach((droppable) => {
                    const zones = this._zonesByDroppable.get(droppable);
                    if (!zones?.length)
                        return this._zonesByDroppable.set(droppable, [zone]);
                    this._zonesByDroppable.set(droppable, [...new Set([...zones, zone])]);
                });
            });
        };
        _handleDrops = (target) => {
            this._zones?.forEach((zone) => {
                if (zone !== target)
                    zone.handleNoDrop();
            });
            if (!target)
                return;
            target.handleDrop();
        };
        _getZoneByElementsFromPoint = (elements, { x, y }) => {
            for (let i = 0, il = elements.length; i < il; i++) {
                const zone = this._zoneByElement.get(elements[i]);
                if (isCollision(zone?.rect, { left: x, right: x, top: y, bottom: y }, Math.min(this.Settings.dropTargetThreshold, 0.5)))
                    return zone;
            }
        };
        stop = ({ isDragging, isDraggingKeyboard, event, }) => {
            if (!isDragging)
                return;
            const target = this.getTarget({ isDraggingKeyboard, event });
            this._handleDrops(target);
        };
        /// ///////////////////////////////////////////////////////////////////////////////////
        // Getters
        getItemsDroppedById = (zoneId) => {
            const zone = this._zoneById.get(zoneId);
            if (!zone)
                return console.warn(`[DragSelect] No zone found (id: ${zoneId})`);
            return zone.itemsDropped;
        };
        getItemsInsideById = (zoneId, addClasses) => {
            const zone = this._zoneById.get(zoneId);
            if (!zone)
                return console.warn(`[DragSelect] No zone found (id: ${zoneId})`);
            if (addClasses)
                zone.handleItemsInsideClasses();
            return zone.itemsInside;
        };
        getKeyboardItemCenter = (isDraggingKeyboard, event) => {
            if (!isDraggingKeyboard || !event)
                return;
            const rect = event.target?.getBoundingClientRect();
            // center of rect
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            return { x, y };
        };
        /** Returns first DropsZone under current pointer or coordinates if passed */
        getTarget = ({ coordinates, isDraggingKeyboard, event, }) => {
            if (!this._zones?.length)
                return;
            let keyboardCoordinates;
            if (!coordinates && isDraggingKeyboard && event) {
                keyboardCoordinates = this.getKeyboardItemCenter(isDraggingKeyboard, event);
            }
            const x = coordinates?.x ||
                keyboardCoordinates?.x ||
                this.DS.stores.PointerStore.currentVal.x;
            const y = coordinates?.y ||
                keyboardCoordinates?.y ||
                this.DS.stores.PointerStore.currentVal.y;
            const elements = document.elementsFromPoint(x, y);
            return this._getZoneByElementsFromPoint(elements, { x, y });
        };
    }

    class Interaction {
        isInteracting;
        isDragging = false;
        DS;
        PS;
        Settings;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            // not on every modification, just on change of area
            this.PS.subscribe('Settings:updated:area', ({ settings }) => {
                this.removeAreaEventListeners(settings['area:pre']);
                this.setAreaEventListeners(settings['area']);
            });
            this.PS.subscribe('PointerStore:updated', ({ event }) => this.update({ event }));
            this.PS.subscribe('Selectable:click', this.onClick);
            this.PS.subscribe('Selectable:pointer', ({ event }) => this.start(event));
            this.PS.subscribe('Interaction:start:pre', ({ event }) => this._start(event));
            this.PS.subscribe('Interaction:init:pre', this._init);
            this.PS.subscribe('Interaction:end:pre', ({ event }) => this._reset(event));
            this.PS.subscribe('Area:scroll', this.update);
        }
        init = () => this.PS.publish('Interaction:init:pre', { init: true });
        _init = () => {
            this.stop();
            this.setAreaEventListeners();
            this.PS.publish('Interaction:init', { init: true });
        };
        _canInteract(event) {
            const isKeyboardClick = 'clientX' in event &&
                event.clientX === 0 &&
                event.clientY === 0 &&
                event.detail === 0 &&
                event.target;
            if (('button' in event && event.button === 2) || // right-clicks
                this.isInteracting || // fix double-click issues
                (event.target && !this.DS.SelectorArea.isInside(event.target)) || // fix outside elements issue
                (!isKeyboardClick && !this.DS.SelectorArea.isClicked(event)) // make sure the mouse click is inside the area
            )
                return false;
            return true;
        }
        start = (event) => this.PS.publish('Interaction:start:pre', {
            event: event,
            isDragging: this.isDragging,
        });
        _start = (event) => {
            if (event.type === 'touchstart')
                event.preventDefault(); // Call preventDefault() to prevent double click issue, see https://github.com/ThibaultJanBeyer/DragSelect/pull/29 & https://developer.mozilla.org/vi/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
            if (!this._canInteract(event))
                return;
            this.isInteracting = true;
            this.isDragging = this.isDragEvent(event);
            this.PS.publish('Interaction:start', {
                event,
                isDragging: this.isDragging,
            });
            this.setDocEventListeners();
        };
        isDragEvent = (event) => {
            let clickedElement = null;
            if (event.target && 'closest' in event.target)
                clickedElement = event.target.closest(`.${this.Settings.selectableClass}`);
            if (!this.Settings.draggability ||
                this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) ||
                !clickedElement)
                return false;
            if (this.Settings.immediateDrag) {
                if (!this.DS.SelectedSet.size)
                    this.DS.SelectedSet.add(clickedElement);
                else if (!this.DS.SelectedSet.has(clickedElement)) {
                    this.DS.SelectedSet.clear();
                    this.DS.SelectedSet.add(clickedElement);
                }
            }
            if (this.DS.SelectedSet.has(clickedElement))
                return true;
            return false;
        };
        /**
         * Triggers when a node is actively selected: <button> nodes that are pressed via the keyboard.
         * Making DragSelect accessible for everyone!
         */
        onClick = ({ event }) => {
            if (!this._canInteract(event))
                return;
            if (event.detail > 0)
                return; // mouse interaction
            const { stores: { PointerStore, KeyStore }, SelectableSet, SelectedSet, } = this.DS;
            PointerStore.start(event);
            const node = event.target;
            if (node && !SelectableSet.has(node))
                return;
            if (!KeyStore.isMultiSelectKeyPressed(event))
                SelectedSet.clear();
            if (node)
                SelectedSet.toggle(node);
            this.reset(event); // simulate mouse-up (that does not exist on keyboard)
        };
        stop = (area = this.DS.Area.HTMLNode) => {
            this.removeAreaEventListeners(area);
            this.removeDocEventListeners();
        };
        update = ({ event, scroll_directions, scroll_multiplier, }) => {
            if (this.isInteracting)
                this.PS.publish(['Interaction:update:pre', 'Interaction:update'], {
                    event,
                    scroll_directions,
                    scroll_multiplier,
                    isDragging: this.isDragging,
                });
        };
        reset = (event) => this.PS.publish('Interaction:end:pre', {
            event,
            isDragging: this.isDragging,
        });
        _reset = (event) => {
            const { isDragging } = this;
            this.isInteracting = false;
            this.isDragging = false;
            this.removeDocEventListeners();
            this.PS.publish('Interaction:end', { event, isDragging });
        };
        //////////////////////////////////////////////////////////////////////////////////////
        // Event Listeners
        setAreaEventListeners = (area = this.DS.Area.HTMLNode) => {
            // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
            if (this.Settings.usePointerEvents)
                area.addEventListener('pointerdown', this.start, {
                    passive: false,
                });
            else
                area.addEventListener('mousedown', this.start);
            area.addEventListener('touchstart', this.start, {
                passive: false,
            });
        };
        removeAreaEventListeners = (area = this.DS.Area.HTMLNode) => {
            // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
            if (this.Settings.usePointerEvents) {
                area.removeEventListener('pointerdown', this.start, {
                    // @ts-ignore
                    passive: false,
                });
            }
            else
                area.removeEventListener('mousedown', this.start);
            area.removeEventListener('touchstart', this.start, {
                // @ts-ignore
                passive: false,
            });
        };
        setDocEventListeners = () => {
            // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
            if (this.Settings.usePointerEvents) {
                document.addEventListener('pointerup', this.reset);
                document.addEventListener('pointercancel', this.reset);
            }
            else
                document.addEventListener('mouseup', this.reset);
            document.addEventListener('touchend', this.reset);
        };
        removeDocEventListeners = () => {
            // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
            if (this.Settings.usePointerEvents) {
                document.removeEventListener('pointerup', this.reset);
                document.removeEventListener('pointercancel', this.reset);
            }
            else
                document.removeEventListener('mouseup', this.reset);
            document.removeEventListener('touchend', this.reset);
        };
    }

    class KeyStore {
        _currentValues = new Set();
        _keyMapping = {
            control: 'ctrlKey',
            shift: 'shiftKey',
            meta: 'metaKey',
        };
        DS;
        PS;
        settings;
        /**
         * @class KeyStore
         * @constructor KeyStore
         * @ignore
         */
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.settings = this.DS.stores.SettingsStore.s;
            this.PS.subscribe('Interaction:init', this.init);
        }
        init = () => {
            document.addEventListener('keydown', this.keydown);
            document.addEventListener('keyup', this.keyup);
            window.addEventListener('blur', this.reset);
        };
        keydown = (event) => {
            if (!event.key?.toLocaleLowerCase)
                return;
            const key = event.key.toLowerCase();
            this.PS.publish('KeyStore:down:pre', { event, key });
            this._currentValues.add(key);
            this.PS.publish('KeyStore:down', { event, key });
        };
        keyup = (event) => {
            if (!event.key?.toLocaleLowerCase)
                return;
            const key = event.key.toLowerCase();
            this.PS.publish('KeyStore:up:pre', { event, key });
            this._currentValues.delete(key);
            this.PS.publish('KeyStore:up', { event, key });
        };
        stop = () => {
            document.removeEventListener('keydown', this.keydown);
            document.removeEventListener('keyup', this.reset);
            window.removeEventListener('blur', this.reset);
            this.reset();
        };
        reset = () => this._currentValues.clear();
        isMultiSelectKeyPressed(event) {
            if (this.settings.multiSelectMode)
                return true;
            const multiSelectKeys = this.settings.multiSelectKeys?.map((key) => key.toLocaleLowerCase()) ?? [];
            if (this.currentValues.some((key) => multiSelectKeys.includes(key)))
                return true;
            if (event && multiSelectKeys.some((key) => event[this._keyMapping[key]]))
                return true;
            return false;
        }
        get currentValues() {
            return Array.from(this._currentValues.values());
        }
    }

    /**
     * Returns cursor x, y position based on event object
     */
    const getPointerPos = ({ event }) => ({
        x: event.clientX,
        y: event.clientY,
    });

    class PointerStore {
        _isMouseInteraction = false;
        // Position relative to area
        _initialValArea = { x: 0, y: 0 };
        _currentValArea = { x: 0, y: 0 };
        _lastValArea = { x: 0, y: 0 };
        // General Pointer Position
        _initialVal = { x: 0, y: 0 };
        _currentVal = { x: 0, y: 0 };
        _lastVal = { x: 0, y: 0 };
        _lastTouch;
        DS;
        PS;
        settings;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.settings = this.DS.stores.SettingsStore.s;
            this.PS.subscribe('Interaction:init', this.init);
            this.PS.subscribe('Interaction:start', ({ event }) => this.start(event));
            this.PS.subscribe('Interaction:end', ({ event }) => this.reset(event));
        }
        init = () => {
            if (this.settings.usePointerEvents)
                document.addEventListener('pointermove', this.update, { passive: false });
            else
                document.addEventListener('mousemove', this.update);
            document.addEventListener('touchmove', this.update, { passive: false });
        };
        start(event) {
            if (!event)
                return;
            this._isMouseInteraction = true;
            this.currentVal = this.initialVal = this.getPointerPosition(event);
        }
        getPointerPosition = (event) => getPointerPos({
            event: this._normalizedEvent(event),
        });
        update = (event) => {
            // type Event to satisfy event listeners, but we know type is : event as InteractionEvent
            if (!event)
                return;
            this.PS.publish('PointerStore:updated:pre', {
                event: event,
            });
            this.currentVal = this.getPointerPosition(event);
            if (!this._isMouseInteraction)
                return;
            this.PS.publish('PointerStore:updated', {
                event: event,
            });
        };
        stop = () => {
            // @TODO: fix pointer events mixing issue see [PR](https://github.com/ThibaultJanBeyer/DragSelect/pull/128#issuecomment-1154885289)
            if (this.settings.usePointerEvents)
                document.removeEventListener('pointermove', this.update, {
                    // @ts-ignore
                    passive: false,
                });
            else
                document.removeEventListener('mousemove', this.update);
            document.removeEventListener('touchmove', this.update, {
                // @ts-ignore
                passive: false,
            });
            this.reset();
        };
        reset = (event) => {
            this.currentVal = this.lastVal = this.getPointerPosition(event);
            // debounce in order "onClick" to work
            setTimeout(() => (this._isMouseInteraction = false), 100);
        };
        _normalizedEvent(event) {
            // null KeyboardEvents
            if (!event || event instanceof KeyboardEvent)
                return { clientX: 0, clientY: 0 };
            // touchend has not touches. so we take the last touch if a touchevent, we need to store the positions
            if ('touches' in event) {
                if (event.type !== 'touchend')
                    this._lastTouch = event;
                // if a touchevent, return the last touch rather than the regular event
                // as we need .touches[0] from that event
                return this._lastTouch?.touches[0] || event.touches[0];
            }
            return event;
        }
        /** First recorded pointer position within the area */
        get initialValArea() {
            if (!this._initialValArea)
                return { x: 0, y: 0 };
            return this._initialValArea;
        }
        /** Current pointer position within the area */
        get currentValArea() {
            if (!this._currentValArea)
                return { x: 0, y: 0 };
            return this._currentValArea;
        }
        /** Last recorded pointer position within the area */
        get lastValArea() {
            if (!this._lastValArea)
                return { x: 0, y: 0 };
            return this._lastValArea;
        }
        /** First recorded pointer position */
        get initialVal() {
            if (!this._initialVal)
                return { x: 0, y: 0 };
            return this._initialVal;
        }
        /** Current pointer position */
        get currentVal() {
            if (!this._currentVal)
                return { x: 0, y: 0 };
            return this._currentVal;
        }
        /** Last recorded pointer position */
        get lastVal() {
            if (!this._lastVal)
                return { x: 0, y: 0 };
            return this._lastVal;
        }
        set initialVal(value) {
            this._initialVal = value;
            this._initialValArea =
                value &&
                    calcVect(value, '-', calcVect(rect2vect(this.DS.Area.rect), '+', rect2vect(this.DS.Area.computedBorder)));
        }
        set currentVal(value) {
            this._currentVal = value;
            this._currentValArea =
                value &&
                    calcVect(value, '-', calcVect(rect2vect(this.DS.Area.rect), '+', rect2vect(this.DS.Area.computedBorder)));
        }
        set lastVal(value) {
            this._lastVal = value;
            this._lastValArea =
                value &&
                    calcVect(value, '-', calcVect(rect2vect(this.DS.Area.rect), '+', rect2vect(this.DS.Area.computedBorder)));
        }
    }

    class PubSub {
        subscribers = {};
        DS;
        constructor({ DS }) {
            this.DS = DS;
        }
        /**
         * Subscribe to an event
         * @returns event id, can be used to unsubscribe more efficiently
         */
        subscribe = (eventName, callback) => {
            if (!Array.isArray(this.subscribers[eventName]))
                this.subscribers[eventName] = [];
            const subscribers = this.subscribers[eventName];
            subscribers.push(callback);
            return subscribers.length - 1;
        };
        /**
         * Removes event subscription
         * @param callback the callback method signature, has to be exactly the same as when subscribing. Consider using "id" instead.
         * @param id event id returned when subscribed (more performant than callback search)
         */
        unsubscribe = (eventName, callback, id) => {
            const index = id ?? this.subscribers[eventName]?.findIndex((cb) => cb === callback);
            this.subscribers[eventName]?.splice(Number(index), 1);
        };
        /**
         * Publishes an event to all subscribers
         * @param eventName
         * @param data passed to the subscription method
         */
        publish = (eventName, data) => {
            if (Array.isArray(eventName))
                eventName.forEach((name) => this._publish(name, data));
            else
                this._publish(eventName, data);
        };
        _publish = (eventName, data) => {
            const subscribers = this.subscribers[eventName] ?? [];
            if (eventName.includes(`:pre`))
                this._handlePrePublish(subscribers, data);
            else
                this._handlePublish(subscribers, data);
        };
        // non-pre events are executed first in first out
        _handlePublish = (subscribers, data) => {
            for (let i = 0, il = subscribers.length; i < il; i++) {
                if (this.DS.stopped)
                    return;
                subscribers[i]?.(data);
            }
        };
        // pre events are executed last in first out (so user callbacks are called before DS callbacks)
        _handlePrePublish = (subscribers, data) => {
            let i = subscribers.length;
            while (i--) {
                if (this.DS.stopped)
                    return;
                subscribers[i]?.(data);
            }
        };
    }

    const getDocumentScroll = () => ({
        y: document.body?.scrollTop || document.documentElement?.scrollTop || 0,
        x: document.body?.scrollLeft || document.documentElement?.scrollLeft || 0,
    });

    const getCurrentScroll = area => {
        if (!area || area instanceof Document)
            return getDocumentScroll();
        return {
            x: area.scrollLeft >= 0 ? area.scrollLeft : getDocumentScroll().x,
            y: area.scrollTop >= 0 ? area.scrollTop : getDocumentScroll().y,
        };
    };

    const canScroll = area => {
        const scroll = getCurrentScroll(area);
        if (scroll.x || scroll.y)
            return true;
        if (area instanceof Document) {
            if (area.body)
                return _canScroll(area.body);
            return _canScroll(area.documentElement);
        }
        return _canScroll(area);
    };
    // @TODO: Determine if there is a better way to test scrollability
    const _canScroll = (el) => {
        const currentScrollTop = el.scrollTop;
        const canScroll = Boolean(el.scrollTop = 1);
        el.scrollTop = currentScrollTop;
        return canScroll;
    };

    class ScrollStore {
        _initialVal = { x: 0, y: 0 };
        _currentVal = { x: 0, y: 0 };
        _canScroll;
        DS;
        PS;
        Settings;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.PS.subscribe('Area:modified', () => {
                this.stop();
                this.init();
            });
            this.PS.subscribe('Interaction:init', this.init);
            this.PS.subscribe('Interaction:start', () => this.start());
            this.PS.subscribe('Interaction:end', () => this.reset());
        }
        init = () => this.addListeners();
        addListeners = () => this.DS.Area.HTMLNode.addEventListener('scroll', this.update);
        removeListeners = () => this.DS.Area.HTMLNode.removeEventListener('scroll', this.update);
        start = () => {
            this._currentVal = this._initialVal = getCurrentScroll(this.DS.Area.HTMLNode);
        };
        update = () => (this._currentVal = getCurrentScroll(this.DS.Area.HTMLNode));
        stop = () => {
            this.reset();
            this.removeListeners();
        };
        reset = () => {
            this._initialVal = { x: 0, y: 0 };
            this._canScroll = undefined;
        };
        get canScroll() {
            if (typeof this._canScroll === 'boolean')
                return this._canScroll;
            return (this._canScroll = canScroll(this.DS.Area.HTMLNode));
        }
        get scrollAmount() {
            const scrollDiff = calcVect(this.currentVal, '-', this.initialVal);
            // if area is zoomed, the scroll values are skewed, we need to fix that manually :(
            const zoom = num2vect(this.Settings.zoom);
            const zoomScroll = calcVect(calcVect(scrollDiff, '*', zoom), '-', scrollDiff);
            return {
                x: scrollDiff.x + zoomScroll.x,
                y: scrollDiff.y + zoomScroll.y,
            };
        }
        get initialVal() {
            if (!this._initialVal)
                return { x: 0, y: 0 };
            return this._initialVal;
        }
        get currentVal() {
            if (!this._currentVal)
                this._currentVal = getCurrentScroll(this.DS.Area.HTMLNode);
            return this._currentVal;
        }
    }

    class SelectableSet extends Set {
        _rects;
        _timeout;
        DS;
        PS;
        Settings;
        constructor({ DS, PS }) {
            super();
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.PS.subscribe('Interaction:init', this.init);
            this.PS.subscribe('Settings:updated:selectables', () => {
                this.clear();
                this.init();
            });
            this.PS.subscribe('Settings:updated:selectableClass', ({ settings }) => {
                this.forEach((el) => {
                    el.classList.remove(settings['selectableClass:pre']);
                    el.classList.add(settings.selectableClass);
                });
            });
        }
        init = () => ensureArray(this.Settings.selectables).forEach((el) => this.add(el));
        add(element) {
            if (!element || super.has(element))
                return this;
            const publishData = {
                items: this.elements,
                item: element,
            };
            this.PS.publish('Selectable:added:pre', publishData);
            element.classList.add(this.Settings.selectableClass);
            element.addEventListener('click', this._onClick);
            if (this.Settings.usePointerEvents)
                element.addEventListener('pointerdown', this._onPointer, { passive: false });
            else
                element.addEventListener('mousedown', this._onPointer);
            element.addEventListener('touchstart', this._onPointer, { passive: false });
            if (this.Settings.draggability && !this.Settings.useTransform)
                handleElementPositionAttribute({
                    computedStyle: window.getComputedStyle(element),
                    node: element,
                });
            this.PS.publish('Selectable:added', publishData);
            return super.add(element);
        }
        delete(element) {
            if (!element || !super.has(element))
                return true;
            const publishData = {
                items: this.elements,
                item: element,
            };
            this.PS.publish('Selectable:removed:pre', publishData);
            element.classList.remove(this.Settings.selectableClass);
            element.classList.remove(this.Settings.hoverClass);
            element.removeEventListener('click', this._onClick);
            if (this.Settings.usePointerEvents)
                element.removeEventListener('pointerdown', this._onPointer, {
                    // @ts-ignore
                    passive: false,
                });
            else
                element.removeEventListener('mousedown', this._onPointer);
            element.removeEventListener('touchstart', this._onPointer, {
                // @ts-ignore
                passive: false,
            });
            this.PS.publish('Selectable:removed', publishData);
            return super.delete(element);
        }
        clear = () => this.forEach((el) => this.delete(el));
        _onClick = (event) => // we know it’s only a MouseEvent
         this.PS.publish(['Selectable:click:pre', 'Selectable:click'], { event: event });
        _onPointer = (event) => // we know it’s only an InteractionEvent
         this.PS.publish(['Selectable:pointer:pre', 'Selectable:pointer'], { event: event });
        addAll = (elements) => elements.forEach((el) => this.add(el));
        deleteAll = (elements) => elements.forEach((el) => this.delete(el));
        /**
         * Gets the bounding rect from private memory if available. If not gets it from the DOM.
         * => Does not force rect calculation on all elements
         */
        getElementRect = (element) => this._rects ? this._rects.get(element) : element.getBoundingClientRect();
        get elements() {
            return Array.from(this.values());
        }
        get rects() {
            if (this._rects)
                return this._rects;
            this._rects = new Map();
            this.forEach((element) => this._rects?.set(element, element.getBoundingClientRect()));
            // since elements can be moved, we need to update the rects every X ms
            if (this._timeout)
                clearTimeout(this._timeout);
            this._timeout = setTimeout(() => (this._rects = undefined), this.Settings.refreshMemoryRate);
            return this._rects;
        }
    }

    class SelectedSet extends Set {
        _rects;
        _timeout;
        DS;
        PS;
        Settings;
        constructor({ DS, PS }) {
            super();
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
        }
        add(element) {
            if (!element || super.has(element))
                return this;
            const publishData = {
                items: this.elements,
                item: element,
            };
            this.PS.publish('Selected:added:pre', publishData);
            super.add(element);
            element.classList.add(this.Settings.selectedClass);
            element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) + 1}`;
            this.PS.publish('Selected:added', publishData);
            return this;
        }
        delete(element) {
            if (!element || !super.has(element))
                return true;
            const publishData = {
                items: this.elements,
                item: element,
            };
            this.PS.publish('Selected:removed:pre', publishData);
            const deleted = super.delete(element);
            element.classList.remove(this.Settings.selectedClass);
            element.style.zIndex = `${(parseInt(element.style.zIndex) || 0) - 1}`;
            this.PS.publish('Selected:removed', publishData);
            return deleted;
        }
        clear = () => this.forEach((el) => this.delete(el));
        /** Adds/Removes an element. If it is already selected = remove, if not = add. */
        toggle(element) {
            if (this.has(element))
                this.delete(element);
            else
                this.add(element);
            return element;
        }
        addAll = (elements) => elements.forEach((el) => this.add(el));
        deleteAll = (elements) => elements.forEach((el) => this.delete(el));
        get elements() {
            return Array.from(this.values());
        }
        get rects() {
            if (this._rects)
                return this._rects;
            this._rects = new Map();
            this.forEach((element) => this._rects?.set(element, element.getBoundingClientRect()));
            // since elements can be moved, we need to update the rects every X ms
            if (this._timeout)
                clearTimeout(this._timeout);
            this._timeout = setTimeout(() => (this._rects = undefined), this.Settings.refreshMemoryRate);
            return this._rects;
        }
    }

    const createSelectorElement = (customStyles) => {
        const selector = document.createElement('div');
        selector.style.position = 'absolute';
        if (!customStyles) {
            selector.style.background = 'rgba(0, 175, 255, 0.2)';
            selector.style.border = '1px solid rgba(0, 175, 255, 0.8)';
            selector.style.display = 'none';
            selector.style.pointerEvents = 'none'; // fix for issue #8 (ie11+)
        }
        return selector;
    };

    /** Reliably returns the exact x,y,w,h positions of the selector element */
    const getSelectorPosition = ({ scrollAmount, initialPointerPos, pointerPos }) => {
        /** check for direction
         *
         * This is quite complicated, so also quite complicated to explain. Lemme’ try:
         *
         * Problem #1:
         * Sadly in HTML we can not have negative sizes.
         * so if we want to scale our element 10px to the right then it is easy,
         * we just have to add +10px to the width. But if we want to scale the element
         * -10px to the left then things become more complicated, we have to move
         * the element -10px to the left on the x axis and also scale the element
         * by +10px width to fake a negative sizing.
         *
         * One solution to this problem is using css-transforms scale() with
         * transform-origin of top left. BUT we can’t use this since it will size
         * everything, then when your element has a border for example, the border will
         * get inanely huge. Also transforms are not widely supported in IE.
         *
         * Example #1:
         * Unfortunately, things get even more complicated when we are inside a scroll-able
         * DIV. Then, let’s say we scroll to the right by 10px and move the cursor right by 5px in our
         * checks we have to subtract 10px from the initialcursor position in our check
         * (since the initial position is moved to the left by 10px) so in our example:
         * 1. pointerPos.x (5) > initialPointerPos.x (0) - scrollAmount.x (10) === 5 > -10 === true
         * then set the x position to the cursors start position
         * selectorPos.x = initialPointerPos.x (0) - scrollAmount.x (10) === 10 // 2.
         * then we can calculate the elements width, which is
         * the new cursor position minus the initial one plus the scroll amount, so in our example:
         * 3. selectorPos.w = pointerPos.x (5) - initialPointerPos.x (0) + scrollAmount.x (10) === 15;
         *
         * let’s say after that movement we now scroll 20px to the left and move our cursor by 30px to the left:
         * 1b. pointerPos.x (-30) > initialPointerPos.x (0) - scrollAmount.x (-20) === -30 < --20 === -30 < +20 === false;
         * 2b. selectorPos.x = pointerPos.x (-30) === -30; move left position to cursor (for more info see Problem #1)
         * 3b. selectorPos.w = initialPointerPos.x (0) - pointerPos.x (-30) - scrollAmount.x (-20) === 0--30--20 === 0+30+20 === 50;  // scale width to original left position (for more info see Problem #1)
         *
         * same thing has to be done for top/bottom
         *
         * I hope that makes sense. Try stuff out and play around with variables to get a hang of it.
         */
        const selectorPos = {};
        // right
        if (pointerPos.x > initialPointerPos.x - scrollAmount.x) {
            // 1.
            selectorPos.left = initialPointerPos.x - scrollAmount.x; // 2.
            selectorPos.width = pointerPos.x - initialPointerPos.x + scrollAmount.x; // 3.
            // left
        }
        else {
            // 1b.
            selectorPos.left = pointerPos.x; // 2b.
            selectorPos.width = initialPointerPos.x - pointerPos.x - scrollAmount.x; // 3b.
        }
        // bottom
        if (pointerPos.y > initialPointerPos.y - scrollAmount.y) {
            selectorPos.top = initialPointerPos.y - scrollAmount.y;
            selectorPos.height = pointerPos.y - initialPointerPos.y + scrollAmount.y;
            // top
        }
        else {
            selectorPos.top = pointerPos.y;
            selectorPos.height = initialPointerPos.y - pointerPos.y - scrollAmount.y;
        }
        return selectorPos;
    };

    /** Updates element style left, top, width, height values according to pos input object */
    var updateElementStylePos = (element, pos) => {
        if (pos.left)
            element.style.left = `${pos.left}px`;
        if (pos.top)
            element.style.top = `${pos.top}px`;
        if (pos.width)
            element.style.width = `${pos.width}px`;
        if (pos.height)
            element.style.height = `${pos.height}px`;
    };

    class Selector {
        _rect;
        DS;
        PS;
        Settings;
        HTMLNode;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.HTMLNode = this.Settings.selector; // to make TS happy, will be replaced in `attachSelector`
            this.PS.subscribe('Settings:updated:selectorClass', ({ settings }) => {
                this.HTMLNode.classList.remove(settings['selectorClass:pre']);
                this.HTMLNode.classList.add(settings.selectorClass);
            });
            this.PS.subscribe('Settings:updated:selector', this.attachSelector);
            this.PS.subscribe('Settings:updated:customStyles', this.attachSelector);
            this.attachSelector();
            this.PS.subscribe('Interaction:start', this.start);
            this.PS.subscribe('Interaction:update', this.update);
            this.PS.subscribe('Interaction:end', this.stop);
        }
        attachSelector = () => {
            if (this.HTMLNode && this.DS.SelectorArea?.HTMLNode)
                this.DS.SelectorArea.HTMLNode.removeChild(this.HTMLNode);
            this.HTMLNode = this.Settings.selector || createSelectorElement(this.Settings.customStyles);
            this.HTMLNode.classList.add(this.Settings.selectorClass);
            if (this.HTMLNode && this.DS.SelectorArea?.HTMLNode)
                this.DS.SelectorArea.HTMLNode.appendChild(this.HTMLNode);
        };
        start = ({ isDragging }) => {
            if (isDragging)
                return;
            const { stores: { PointerStore }, } = this.DS;
            const pPos = PointerStore.initialValArea;
            updateElementStylePos(this.HTMLNode, vect2rect(pPos, 1));
            this.HTMLNode.style.display = 'block';
            this._rect = undefined;
        };
        stop = () => {
            this.HTMLNode.style.width = '0';
            this.HTMLNode.style.height = '0';
            this.HTMLNode.style.display = 'none';
        };
        /** Moves the selection to the correct place */
        update = ({ isDragging }) => {
            if (isDragging || this.DS.continue)
                return;
            const { stores: { ScrollStore, PointerStore }, } = this.DS;
            const pos = getSelectorPosition({
                scrollAmount: ScrollStore.scrollAmount,
                initialPointerPos: PointerStore.initialValArea,
                pointerPos: PointerStore.currentValArea,
            });
            updateElementStylePos(this.HTMLNode, pos);
            this._rect = undefined;
        };
        get rect() {
            if (this._rect)
                return this._rect;
            return (this._rect = this.HTMLNode.getBoundingClientRect());
        }
    }

    /** Logic when an element is selected */
    const handleSelection = ({ element, force, multiSelectionToggle, SelectedSet, hoverClassName, }) => {
        if (element.classList.contains(hoverClassName) && !force)
            return;
        if (!SelectedSet.has(element))
            SelectedSet.add(element);
        else if (multiSelectionToggle)
            SelectedSet.delete(element);
        element.classList.add(hoverClassName);
    };

    /** Logic when an element is de-selected */
    const handleUnSelection = ({ element, force, SelectedSet, PrevSelectedSet, hoverClassName, }) => {
        if (!element.classList.contains(hoverClassName) && !force)
            return;
        const inSelection = SelectedSet.has(element);
        const inPrevSelection = PrevSelectedSet.has(element);
        /**
         * Special for issue #9.
         * if a multi-select-key is pressed, ds 'remembers' the last selection and reverts
         * to that state if the selection is not kept, to mimic the natural OS behaviour
         * = if item was selected and is not in selection anymore, reselect it
         * = if item was not selected and is not in selection anymore, unselect it
         */
        if (inSelection && !inPrevSelection)
            SelectedSet.delete(element);
        else if (!inSelection && inPrevSelection)
            SelectedSet.add(element);
        element.classList.remove(hoverClassName);
    };

    // @TODO: calculate the difference in all directions based on the mouse position! (since the selection square ratio won’t change we don’t have to re-calculate and re-fetch the position of every element in the square during drag)
    /** Returns the compound bounding rect of multiple elements */
    const getSelectionRect = (SelectedSet) => {
        const rect = {
            top: Number.POSITIVE_INFINITY,
            left: Number.POSITIVE_INFINITY,
            bottom: Number.NEGATIVE_INFINITY,
            right: Number.NEGATIVE_INFINITY,
            width: Number.NEGATIVE_INFINITY,
            height: Number.NEGATIVE_INFINITY,
        };
        SelectedSet.rects.forEach(elementRect => {
            rect.top = Math.min(rect.top, elementRect.top || rect.top);
            rect.left = Math.min(rect.left, elementRect.left || rect.left);
            rect.bottom = Math.max(rect.bottom, elementRect.bottom || rect.bottom);
            rect.right = Math.max(rect.right, elementRect.right || rect.right);
        });
        rect.height = rect.bottom - rect.top;
        rect.width = rect.right - rect.left;
        return rect;
    };

    class Selection {
        _prevSelectedSet = new Set();
        _boundingRect;
        _timeout;
        DS;
        PS;
        Settings;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.PS.subscribe('Interaction:start', this.start);
            this.PS.subscribe('Interaction:update', this.update);
        }
        /** Stores the previous selection (solves #9) */
        _storePrevious(event) {
            const { stores: { KeyStore }, SelectedSet, } = this.DS;
            if (KeyStore.isMultiSelectKeyPressed(event))
                this._prevSelectedSet = new Set(SelectedSet);
            else
                this._prevSelectedSet = new Set();
        }
        start = ({ event, isDragging, }) => {
            if (isDragging)
                return;
            this._storePrevious(event);
            this._handleInsideSelection(true, event);
        };
        update = ({ isDragging }) => {
            if (isDragging || this.DS.continue)
                return;
            this._handleInsideSelection();
        };
        /** Checks if any selectable element is inside selection. */
        _handleInsideSelection = (force, event) => {
            const { SelectableSet, SelectorArea, Selector } = this.DS;
            const multiSelectionToggle = this.DS.stores.KeyStore.isMultiSelectKeyPressed(event) &&
                this.Settings.multiSelectToggling;
            const selectionThreshold = this.Settings.selectionThreshold;
            const elRects = SelectableSet.rects;
            const selectorRect = Selector.rect;
            const select = new Map();
            const unselect = new Map();
            for (const [element, elementRect] of elRects) {
                if (!SelectorArea.isInside(element, elementRect))
                    continue;
                if (isCollision(elementRect, selectorRect, selectionThreshold))
                    select.set(element, elementRect);
                else
                    unselect.set(element, elementRect);
            }
            if (this.DS.continue)
                return;
            // [PUBLICLY EXPOSED METHOD]
            const { select: filteredSelect, unselect: filteredUnselect } = this.filterSelected({ select, unselect, selectorRect });
            filteredSelect.forEach((_, element) => handleSelection({
                element,
                force,
                multiSelectionToggle,
                SelectedSet: this.DS.SelectedSet,
                hoverClassName: this.Settings.hoverClass,
            }));
            filteredUnselect.forEach((_, element) => handleUnSelection({
                element,
                force,
                SelectedSet: this.DS.SelectedSet,
                hoverClassName: this.Settings.hoverClass,
                PrevSelectedSet: this._prevSelectedSet,
            }));
        };
        get boundingRect() {
            if (this._boundingRect)
                return this._boundingRect;
            this._boundingRect = getSelectionRect(this.DS.SelectedSet);
            // since elements can be moved, we need to update the rects every X ms
            if (this._timeout)
                clearTimeout(this._timeout);
            this._timeout = setTimeout(() => (this._boundingRect = undefined), this.Settings.refreshMemoryRate);
            return this._boundingRect;
        }
        ////
        // [PUBLICLY EXPOSED METHODS]
        /**
         * Can be overridden to apply further filtering logic after the items to select are identified but before they actually get selected
         * Is expected to return the select / unselect maps in the same shape as passed in
         */
        filterSelected = ({ select, unselect, selectorRect, }) => ({ select, unselect });
    }

    const createSelectorAreaElement = () => {
        const node = document.createElement('div');
        node.style.position = 'fixed';
        node.style.overflow = 'hidden';
        node.style.pointerEvents = 'none';
        node.style.zIndex = '999999999999999999';
        return node;
    };

    /**
     * Returns the edges that an element is overflowing
     */
    const getOverflowEdges = ({ elementRect, containerRect, tolerance = {
        x: 0,
        y: 0,
    }, }) => {
        const edges = [];
        if (elementRect.top - tolerance.y < containerRect.top)
            edges.push('top');
        if (elementRect.left - tolerance.x < containerRect.left)
            edges.push('left');
        if (elementRect.bottom + tolerance.y > containerRect.bottom)
            edges.push('bottom');
        if (elementRect.right + tolerance.y > containerRect.right)
            edges.push('right');
        return edges;
    };

    class SelectorArea {
        _scrollInterval;
        _rect;
        currentEdges = [];
        DS;
        PS;
        Settings;
        HTMLNode;
        constructor({ DS, PS }) {
            this.DS = DS;
            this.PS = PS;
            this.Settings = this.DS.stores.SettingsStore.s;
            this.HTMLNode = createSelectorAreaElement();
            this.PS.subscribe('Settings:updated:selectorAreaClass', ({ settings }) => {
                this.HTMLNode.classList.remove(settings['selectorAreaClass:pre']);
                this.HTMLNode.classList.add(settings['selectorAreaClass']);
            });
            this.HTMLNode.classList.add(this.Settings.selectorAreaClass);
            this.PS.subscribe('Area:modified', this.updatePos);
            this.PS.subscribe('Area:modified', this.updatePos);
            this.PS.subscribe('Interaction:init', this.init);
            this.PS.subscribe('Interaction:start', ({ isDraggingKeyboard }) => this.startAutoScroll({ isDraggingKeyboard }));
            this.PS.subscribe('Interaction:end', () => {
                this.updatePos();
                this.stopAutoScroll();
            });
        }
        init = () => {
            this.applyElements('append');
            this.updatePos();
        };
        /** Adding / Removing elements to document */
        applyElements = (method) => {
            const docEl = document.body ? 'body' : 'documentElement';
            const methodName = `${method}Child`;
            this.HTMLNode[methodName](this.DS.Selector.HTMLNode);
            document[docEl][methodName](this.HTMLNode);
        };
        /** Updates the selectorAreas positions to match the areas */
        updatePos = () => {
            this._rect = undefined;
            const rect = this.DS.Area.rect;
            const border = this.DS.Area.computedBorder;
            const { style } = this.HTMLNode;
            const top = `${rect.top + border.top}px`;
            const left = `${rect.left + border.left}px`;
            const width = `${rect.width}px`;
            const height = `${rect.height}px`;
            if (style.top !== top)
                style.top = top;
            if (style.left !== left)
                style.left = left;
            if (style.width !== width)
                style.width = width;
            if (style.height !== height)
                style.height = height;
        };
        stop = (remove) => {
            this.stopAutoScroll();
            if (remove)
                this.applyElements('remove');
        };
        //////////////////////////////////////////////////////////////////////////////////////
        // AutoScroll
        startAutoScroll = ({ isDraggingKeyboard, }) => {
            if (isDraggingKeyboard)
                return;
            this.currentEdges = [];
            this._scrollInterval = setInterval(() => this.handleAutoScroll(), 16);
        };
        /** Creates an interval that auto-scrolls while the cursor is near the edge */
        handleAutoScroll = () => {
            if (this.DS.continue)
                return;
            const { stores: { PointerStore }, Area, } = this.DS;
            this.currentEdges = getOverflowEdges({
                elementRect: vect2rect(PointerStore.currentVal),
                containerRect: this.rect,
                tolerance: this.Settings.overflowTolerance,
            });
            if (this.currentEdges.length)
                Area.scroll(this.currentEdges, this.Settings.autoScrollSpeed);
        };
        stopAutoScroll = () => {
            this.currentEdges = [];
            clearInterval(this._scrollInterval);
        };
        //////////////////////////////////////////////////////////////////////////////////////
        // Booleans
        /**
         * Checks if the element is either inside the Selector Area (as a reachable child or touching the area)
         * @param elementRect - slight performance improvements when passed
         */
        isInside = (element, elementRect) => {
            if (this.DS.Area.HTMLNode.contains(element) &&
                this.DS.stores.ScrollStore.canScroll)
                return true;
            return isCollision(this.rect, elementRect || element.getBoundingClientRect());
        };
        /** checks if the click was triggered on the area. */
        isClicked(event) {
            const { stores: { PointerStore }, } = this.DS;
            const initialVal = event
                ? PointerStore.getPointerPosition(event)
                : PointerStore.initialVal;
            return isCollision({
                left: initialVal.x,
                top: initialVal.y,
                right: initialVal.x,
                bottom: initialVal.y,
            }, this.rect);
        }
        get rect() {
            if (this._rect)
                return this._rect;
            return (this._rect = this.HTMLNode.getBoundingClientRect());
        }
    }

    const wrongTypeWarn = (key, type) => console.warn(`[DragSelect] TypeIssue: setting "${key}" is not of type "${type}".`);
    const hydrateHelper = (key, value, withFallback, fallback) => {
        // no value available
        if (value === undefined)
            return withFallback ? { [key]: fallback } : {};
        // force unsetting of a value
        if (value === null)
            return { [key]: null };
        // TypeCheck [GENERIC]
        let isAvailable = true; // if it’s not undefined, it was set voluntarily
        let forceFallback = false;
        // TypeCheck [String]
        const expectedString = typeof fallback === 'string';
        if (expectedString)
            isAvailable = typeof value === 'string' || value instanceof String;
        if (expectedString && !isAvailable) {
            forceFallback = true;
            wrongTypeWarn(key, 'string');
        }
        // TypeCheck [Number]
        const expectedNumber = !Number.isNaN(fallback) && typeof fallback === 'number';
        if (expectedNumber)
            isAvailable = !Number.isNaN(value) && typeof value === 'number';
        if (expectedNumber && !isAvailable) {
            forceFallback = true;
            wrongTypeWarn(key, 'number');
        }
        // TypeCheck [Object]
        const expectedObject = Object.prototype.toString.call(fallback) === '[object Object]';
        if (expectedObject)
            isAvailable = Object.prototype.toString.call(value) === '[object Object]';
        if (expectedObject && !isAvailable) {
            forceFallback = true;
            wrongTypeWarn(key, 'object');
        }
        // TypeCheck [Boolean]
        const expectedBoolean = typeof fallback === 'boolean';
        if (expectedBoolean)
            isAvailable = typeof value === 'boolean';
        if (expectedBoolean && !isAvailable) {
            forceFallback = true;
            wrongTypeWarn(key, 'boolean');
        }
        // TypeCheck [Array]
        const expectedArray = Array.isArray(fallback);
        if (expectedArray)
            isAvailable = Array.isArray(value);
        if (expectedArray && !isAvailable) {
            forceFallback = true;
            wrongTypeWarn(key, 'array');
        }
        const isFallback = forceFallback || withFallback;
        // Special rule for [dragKeys]
        if (key === 'dragKeys' && isAvailable)
            return { [key]: Object.assign(fallback, value) };
        if (key === 'dragKeys' && !isAvailable)
            return isFallback ? { [key]: fallback } : {};
        // Special rule for [dropZones]
        if (key === 'dropZones' &&
            isAvailable &&
            Array.isArray(value) &&
            new Set(value.map((v) => v.id)).size !== value.length)
            console.warn(`[DragSelect] UniqueConstraintsIssue: setting "dropZones" contains duplicate ids.`);
        if (isAvailable)
            return { [key]: value };
        if (isFallback)
            return { [key]: fallback };
        return {};
    };
    /**
     * This helper method creates the setting object,
     * - if the settings provided are of wrong type, the fallback value will be used
     * - - except for if settings are undefined or explicitly marked as "null"
     * - if "withfallback" is true, it will return the object with all settings:
     * - - if not provided from the settings object (or wrong type), the fallback will be used
     * (the fallback value for each setting is the last prop of the hydrateHelper)
     */
    const hydrateSettings = (settings, withFallback) => ({
        ...hydrateHelper('area', settings.area, withFallback, document),
        ...hydrateHelper('selectables', settings.selectables, withFallback, null),
        ...hydrateHelper('autoScrollSpeed', settings.autoScrollSpeed, withFallback, 5),
        ...hydrateHelper('overflowTolerance', settings.overflowTolerance, withFallback, { x: 25, y: 25 }),
        ...hydrateHelper('zoom', settings.zoom, withFallback, 1),
        ...hydrateHelper('customStyles', settings.customStyles, withFallback, false),
        ...hydrateHelper('multiSelectMode', settings.multiSelectMode, withFallback, false),
        ...hydrateHelper('multiSelectToggling', settings.multiSelectToggling, withFallback, true),
        ...hydrateHelper('multiSelectKeys', settings.multiSelectKeys, withFallback, [
            'Control',
            'Shift',
            'Meta',
        ]),
        ...hydrateHelper('selector', settings.selector, withFallback, null),
        ...hydrateHelper('selectionThreshold', settings.selectionThreshold, withFallback, 0),
        ...hydrateHelper('draggability', settings.draggability, withFallback, true),
        ...hydrateHelper('immediateDrag', settings.immediateDrag, withFallback, true),
        ...hydrateHelper('keyboardDrag', settings.keyboardDrag, withFallback, true),
        ...hydrateHelper('dragKeys', settings.dragKeys, withFallback, {
            up: ['ArrowUp'],
            down: ['ArrowDown'],
            left: ['ArrowLeft'],
            right: ['ArrowRight'],
        }),
        ...hydrateHelper('keyboardDragSpeed', settings.keyboardDragSpeed, withFallback, 10),
        ...hydrateHelper('useTransform', settings.useTransform, withFallback, true),
        ...hydrateHelper('refreshMemoryRate', settings.refreshMemoryRate, withFallback, 80),
        ...hydrateHelper('dropZones', settings.dropZones, withFallback, []),
        ...hydrateHelper('dropInsideThreshold', settings.dropInsideThreshold, withFallback, 1),
        ...hydrateHelper('dropTargetThreshold', settings.dropTargetThreshold, withFallback, 0),
        ...hydrateHelper('usePointerEvents', settings.usePointerEvents, withFallback, false),
        ...hydrateHelper('hoverClass', settings.hoverClass, withFallback, 'ds-hover'),
        ...hydrateHelper('selectableClass', settings.selectableClass, withFallback, 'ds-selectable'),
        ...hydrateHelper('selectedClass', settings.selectedClass, withFallback, 'ds-selected'),
        ...hydrateHelper('selectorClass', settings.selectorClass, withFallback, 'ds-selector'),
        ...hydrateHelper('selectorAreaClass', settings.selectorAreaClass, withFallback, 'ds-selector-area'),
        ...hydrateHelper('droppedTargetClass', settings.droppedTargetClass, withFallback, 'ds-dropped-target'),
        ...hydrateHelper('droppedInsideClass', settings.droppedInsideClass, withFallback, 'ds-dropped-inside'),
        ...hydrateHelper('droppableClass', settings.droppableClass, withFallback, 'ds-droppable'),
        ...hydrateHelper('dropZoneClass', settings.dropZoneClass, withFallback, 'ds-dropzone'),
        ...hydrateHelper('dropZoneReadyClass', settings.dropZoneReadyClass, withFallback, 'ds-dropzone-ready'),
        ...hydrateHelper('dropZoneTargetClass', settings.dropZoneTargetClass, withFallback, 'ds-dropzone-target'),
        ...hydrateHelper('dropZoneInsideClass', settings.dropZoneInsideClass, withFallback, 'ds-dropzone-inside'),
    });

    class SettingsStore {
        _settings = {};
        /**
         * Holds the settings and their previous value `:pre`
         * @example {
         *    autoScrollSpeed: 3,
         *    'autoScrollSpeed:pre': 5
         * }
         **/
        s = {};
        PS;
        /**
         * @class ScrollStore
         * @constructor ScrollStore
         * @param {{ DS:DragSelect, settings:Settings }} p
         * @ignore
         */
        constructor({ PS, settings }) {
            this.PS = PS;
            this.update({ settings, init: true });
        }
        update = ({ settings, init }) => {
            this.PS.publish('Settings:updated:pre', {
                settings: this._settings,
                'settings:init': Boolean(init),
                'settings:new': settings
            });
            this._update({ settings, init });
        };
        _update = ({ settings = {}, init = false }) => {
            const _settings = hydrateSettings(settings, init);
            for (const [key, value] of Object.entries(_settings)) {
                ((key, value) => {
                    if (!(key in this._settings)) {
                        Object.defineProperty(this.s, key, {
                            get: () => this._settings[key],
                            set: (newValue) => this.update({ settings: { [key]: newValue } }),
                        });
                    }
                    this._settings[`${key}:pre`] = this._settings[key]; // need to cast as K, see https://stackoverflow.com/a/76070928/3712591
                    this._settings[key] = value;
                    const update = {
                        settings: this._settings,
                        'settings:init': init,
                        'settings:new': settings
                    };
                    this.PS.publish('Settings:updated', update);
                    this.PS.publish(`Settings:updated:${key}`, update);
                })(key, value); // method used for typecasting, see https://stackoverflow.com/q/76036535/3712591
            }
        };
    }

    const deprecatedNamesMap = {
        elementselect: 'DS:select',
        elementunselect: 'DS:unselect',
        autoscroll: 'DS:scroll',
        dragstart: 'DS:start',
        dragmove: 'DS:update',
        callback: 'DS:end',
        preelementselect: 'DS:select:pre',
        preelementunselect: 'DS:unselect:pre',
        preautoscroll: 'DS:scroll:pre',
        predragstart: 'DS:start:pre',
        predragmove: 'DS:update:pre',
        precallback: 'DS:end:pre',
    };
    const endExtraData = (data, DS) => {
        const target = DS.DropZones.getTarget(data);
        return {
            ...data,
            ...(target ? { dropTarget: target.toObject() } : {}),
        };
    };
    /** Maps internal events to external ones */
    const subscriberAliases = ({ PS, DS, }) => {
        const mapping = {
            'Selected:added': [
                { name: 'preelementselect' },
                { name: 'elementselect' },
                { name: 'DS:select:pre' },
                { name: 'DS:select' },
            ],
            'Selected:removed': [
                { name: 'preelementunselect' },
                { name: 'elementunselect' },
                { name: 'DS:unselect:pre' },
                { name: 'DS:unselect' },
            ],
            'Selectable:added': [{ name: 'DS:added:pre' }, { name: 'DS:added' }],
            'Selectable:removed': [{ name: 'DS:removed:pre' }, { name: 'DS:removed' }],
            'Area:scroll': [
                { name: 'preautoscroll' },
                { name: 'autoscroll' },
                { name: 'DS:scroll:pre' },
                { name: 'DS:scroll' },
            ],
            'Interaction:start': [
                { name: 'predragstart' },
                { name: 'dragstart' },
                { name: 'DS:start:pre' },
                { name: 'DS:start' },
            ],
            'Interaction:update': [
                { name: 'predragmove', condition: (data) => (data.event ? data : null) },
                { name: 'dragmove', condition: (data) => (data.event ? data : null) },
                {
                    name: 'DS:update:pre',
                    condition: (data) => (data.event ? data : null),
                },
                { name: 'DS:update', condition: (data) => (data.event ? data : null) },
            ],
            'Interaction:end': [
                { name: 'precallback', extraData: (data, DS) => endExtraData(data, DS) },
                { name: 'callback', extraData: (data, DS) => endExtraData(data, DS) },
                { name: 'DS:end:pre', extraData: (data, DS) => endExtraData(data, DS) },
                { name: 'DS:end', extraData: (data, DS) => endExtraData(data, DS) },
            ],
        };
        for (const [sub_name, sub_pubs] of Object.entries(mapping))
            addSubscribers({ sub_name, sub_pubs, DS, PS });
    };
    const addSubscribers = ({ sub_name, DS, PS, sub_pubs, }) => {
        // Subscribe to the internal event
        PS.subscribe(sub_name, (data) => 
        // publish to each of the mapped ones
        sub_pubs.forEach((sub_pub) => publish({ sub_pub, data, DS })));
    };
    const publish = ({ sub_pub, data, DS, }) => {
        // If the events condition is met, publish the external event
        const cleanedData = !sub_pub.condition ? data : sub_pub.condition(data, DS);
        if (cleanedData) {
            const extra = (sub_pub.extraData && sub_pub.extraData(data, DS)) || {};
            DS.publish(sub_pub.name, {
                // add extra data as needed
                items: DS.SelectedSet.elements,
                isDragging: DS.Interaction.isDragging,
                ...cleanedData,
                ...extra,
            });
        }
    };

    /*
        ____                   _____      __          __
       / __ \_________ _____ _/ ___/___  / /__  _____/ /_
      / / / / ___/ __ `/ __ `/\__ \/ _ \/ / _ \/ ___/ __/
     / /_/ / /  / /_/ / /_/ /___/ /  __/ /  __/ /__/ /_
    /_____/_/   \__,_/\__, //____/\___/_/\___/\___/\__/
                     /____/

     {*} {*} STAR THIS PROJECT ON GITHUB {*} {*}

     https://github.com/ThibaultJanBeyer/DragSelect
     Please give it a like, this is what makes me happy :-)
     Thank You

     {*} {*} STAR THIS PROJECT ON GITHUB {*} {*}

     ***************************************
     ********* GPLv3 / Commercial **********
     ***************************************
     Created 2017 by ThibaultJanBeyer
     Web: http://www.DragSelect.com/
     GitHub: https://github.com/ThibaultJanBeyer/DragSelect
     ***************************************
    */
    // Setup
    /// ///////////////////////////////////////////////////////////////////////////////////
    class DragSelect {
        /** used to skip all current Selection and dragNdrop functionality */
        continue = false;
        PubSub;
        stores;
        Area;
        Selector;
        SelectorArea;
        SelectableSet;
        SelectedSet;
        Selection;
        Drag;
        DropZones;
        Interaction;
        stopped;
        constructor(settings) {
            this.stopped = false;
            this.PubSub = new PubSub({ DS: this });
            this.stores = {};
            (this.stores.SettingsStore = new SettingsStore({
                settings,
                PS: this.PubSub,
            })),
                (this.stores.PointerStore = new PointerStore({
                    DS: this,
                    PS: this.PubSub,
                })),
                (this.stores.ScrollStore = new ScrollStore({
                    DS: this,
                    PS: this.PubSub,
                })),
                (this.stores.KeyStore = new KeyStore({ DS: this, PS: this.PubSub })),
                (this.Area = new Area({ DS: this, PS: this.PubSub }));
            this.Selector = new Selector({ DS: this, PS: this.PubSub });
            this.SelectorArea = new SelectorArea({ DS: this, PS: this.PubSub });
            this.SelectableSet = new SelectableSet({ DS: this, PS: this.PubSub });
            this.SelectedSet = new SelectedSet({ DS: this, PS: this.PubSub });
            this.Selection = new Selection({ DS: this, PS: this.PubSub });
            this.Drag = new Drag({ DS: this, PS: this.PubSub });
            this.DropZones = new DropZones({ DS: this, PS: this.PubSub });
            this.Interaction = new Interaction({ DS: this, PS: this.PubSub });
            subscriberAliases({ DS: this, PS: this.PubSub });
            this.PubSub.subscribe('Interaction:end', () => (this.continue = false));
            this.PubSub.subscribe('DS:end', ({ items }) => (this.continue = false));
            this.start();
        }
        // Useful methods for the user
        //////////////////////////////////////////////////////////////////////////////////////
        static isCollision;
        // any input data from the user is valid in this public PubSub but the exposed values are recommended
        /** Subscribe to events */
        subscribe = (eventName, callback) => {
            // Deprecation warnings
            if (deprecatedNamesMap[eventName])
                console.warn(`[DragSelect]: The event name "${eventName}" is deprecated and was/will be removed in a future version. Please use the new event name "${deprecatedNamesMap[eventName]}" instead.`);
            this.PubSub.subscribe(eventName, callback);
        };
        /** Un-Subscribe from events */
        unsubscribe = (eventName, callback, id) => this.PubSub.unsubscribe(eventName, callback, id);
        /** Publish events */
        publish = (eventName, data) => this.PubSub.publish(eventName, data);
        /** Initializes the functionality. Automatically triggered when created. Also, reset the functionality after a teardown */
        start = () => {
            this.stopped = false;
            this.Interaction.init();
        };
        /**
         * Complete function teardown
         * Will teardown/stop the whole functionality
         * @param remove if elements should be removed.
         * @param fromSelection if elements should also be added/removed to the selection.
         * @param withCallback if elements should also be added/removed to the selection.
         */
        stop(remove = true, fromSelection = true, withCallback = false) {
            if (withCallback)
                this.publish('DS:end', {
                    items: this.SelectedSet.elements,
                    isDragging: this.Interaction.isDragging,
                });
            this.Interaction.stop();
            this.Area.stop();
            this.Drag.stop();
            this.Selector.stop();
            this.SelectorArea.stop(remove);
            this.stores.KeyStore.stop();
            this.stores.PointerStore.stop();
            this.stores.ScrollStore.stop();
            if (remove)
                this.SelectableSet.clear();
            if (fromSelection)
                this.SelectedSet.clear();
            this.stopped = true;
        }
        /**
         * Utility to override DragSelect internal functionality:
         * Break will skip the selection or dragging functionality (until after the callback) but let everything continue to run.
         * Useful utility to write your own functionality/move/dragNdrop based on DragSelect pointer positions.
         */
        break = () => (this.continue = true);
        /** Update any setting dynamically */
        setSettings = (settings) => this.stores.SettingsStore.update({ settings });
        /** Returns the current selected nodes */
        getSelection = () => this.SelectedSet.elements;
        /**
         * Adds several elements to the selection list also adds the specific classes and take into account all calculations.
         * Does not clear the selection, in contrary to .setSelection. Can add multiple elements at once
         * @param elements one or multiple elements
         * @param triggerCallback if callback should be called
         * @param dontAddToSelectables if element should not be added to the list of selectable elements
         * @return all selected elements
         */
        addSelection(elements, triggerCallback = false, dontAddToSelectables = false) {
            const els = ensureArray(elements);
            this.SelectedSet.addAll(els);
            if (!dontAddToSelectables)
                this.addSelectables(elements, false, false);
            if (triggerCallback)
                this.PubSub.publish('DS:end', {
                    items: this.SelectedSet.elements,
                    isDragging: this.Interaction.isDragging,
                });
            return this.getSelection();
        }
        /**
         * Removes specific elements from the selection
         * Multiple elements can be given at once, in contrary to unselect
         * @param elements one or multiple elements
         * @param triggerCallback if callback should be called
         * @param removeFromSelectables if element should be removed from the list of selectable elements
         * @return all selected elements
         */
        removeSelection(elements, triggerCallback = false, removeFromSelectables = false) {
            const els = ensureArray(elements);
            this.SelectedSet.deleteAll(els);
            if (removeFromSelectables)
                this.removeSelectables(elements, false, false);
            if (triggerCallback)
                this.PubSub.publish('DS:end', {
                    items: this.SelectedSet.elements,
                    isDragging: this.Interaction.isDragging,
                });
            return this.getSelection();
        }
        /**
         * Toggles specific elements from the selection:
         * If element is not in selection it will be added, if it is already selected, it will be removed.
         * Multiple elements can be given at once.
         * @param elements one or multiple elements
         * @param triggerCallback if callback should be called
         * @param removeFromSelectables if element should not be added/removed to the list of selectable elements accordingly
         * @return all selected elements
         */
        toggleSelection(elements, triggerCallback = false, removeFromSelectables = false) {
            const els = ensureArray(elements);
            els.forEach((el) => this.SelectedSet.has(el)
                ? this.removeSelection(elements, triggerCallback, removeFromSelectables)
                : this.addSelection(elements, triggerCallback, removeFromSelectables));
            if (triggerCallback)
                this.PubSub.publish('DS:end', {
                    items: this.SelectedSet.elements,
                    isDragging: this.Interaction.isDragging,
                });
            return this.getSelection();
        }
        /**
         * Sets the current selected elements and optionally run the callback
         * By default, adds new elements also to the list of selectables
         * @param elements dom elements
         * @param triggerCallback if callback should be called
         * @param dontAddToSelectables if element should not be added to the list of selectable elements
         */
        setSelection(elements, triggerCallback = false, dontAddToSelectables = false) {
            this.clearSelection();
            this.addSelection(elements, triggerCallback, dontAddToSelectables);
            return this.getSelection();
        }
        /**
         * Unselect / Deselect all current selected Nodes
         * @param triggerCallback if callback should be called
         * @return this.selected, should be empty
         */
        clearSelection(triggerCallback = false) {
            this.SelectedSet.clear();
            if (triggerCallback)
                this.PubSub.publish('DS:end', {
                    items: this.SelectedSet.elements,
                    isDragging: this.Interaction.isDragging,
                });
            return this.getSelection();
        }
        /**
         * Add elements that can be selected. No node is added twice
         * @param elements dom element(s)
         * @param addToSelection if elements should also be added to current selection
         * @param triggerCallback if callback should be called
         * @return the added element(s)
         */
        addSelectables(elements, addToSelection, triggerCallback) {
            const els = ensureArray(elements);
            this.SelectableSet.addAll(els);
            if (addToSelection)
                this.SelectedSet.addAll(els);
            if (triggerCallback)
                this.PubSub.publish('DS:end', {
                    items: this.SelectedSet.elements,
                    isDragging: this.Interaction.isDragging,
                });
            return els;
        }
        /** Gets all nodes that can potentially be selected */
        getSelectables = () => this.SelectableSet.elements;
        /**
         * Remove elements from the elements that can be selected.
         * @param elements dom element(s)
         * @param removeFromSelection if elements should also be removed from current selection
         * @param triggerCallback if callback should be called
         * @return the removed element(s)
         */
        removeSelectables(elements, removeFromSelection, triggerCallback) {
            const els = ensureArray(elements);
            this.SelectableSet.deleteAll(els);
            if (removeFromSelection)
                this.removeSelection(elements);
            if (triggerCallback)
                this.PubSub.publish('DS:end', {
                    items: this.SelectedSet.elements,
                    isDragging: this.Interaction.isDragging,
                });
            return els;
        }
        /** The starting/initial position of the cursor/selector */
        getInitialCursorPosition = () => this.stores.PointerStore.initialVal;
        /** The last seen position of the cursor/selector */
        getCurrentCursorPosition = () => this.stores.PointerStore.currentVal;
        /** The previous position of the cursor/selector */
        getPreviousCursorPosition = () => this.stores.PointerStore.lastVal;
        /** The starting/initial position of the cursor/selector */
        getInitialCursorPositionArea = () => this.stores.PointerStore.initialValArea;
        /** The last seen position of the cursor/selector */
        getCurrentCursorPositionArea = () => this.stores.PointerStore.currentValArea;
        /** The previous position of the cursor/selector */
        getPreviousCursorPositionArea = () => this.stores.PointerStore.lastValArea;
        /** Whether the multi-selection key was pressed */
        isMultiSelect = (event) => this.stores.KeyStore.isMultiSelectKeyPressed(event);
        /** Whether the user is currently drag n dropping elements (instead of selection) */
        isDragging = () => this.Interaction.isDragging;
        /** Returns first DropsZone under coordinates, if no coordinated provided current pointer coordinates are used */
        getZoneByCoordinates = (coordinates) => this.DropZones.getTarget({ coordinates })?.toObject();
        /** Returns itemsDropped into zone by zone id */
        getItemsDroppedByZoneId = (zoneId) => this.DropZones.getItemsDroppedById(zoneId);
        /**
         * Returns itemsInside by zone id
         * @param addClasses whether or not to add/remove the "inside" classes to the items
         */
        getItemsInsideByZoneId = (zoneId, addClasses) => this.DropZones.getItemsInsideById(zoneId, addClasses);
    }
    DragSelect.isCollision = isCollision;

    return DragSelect;

}));
