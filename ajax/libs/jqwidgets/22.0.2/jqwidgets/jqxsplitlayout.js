/*
jQWidgets v22.0.0 (2025-Jan)
Copyright (c) 2011-2025 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

﻿/* tslint:disable */
/* eslint-disable */
(function(){
    if (typeof document === 'undefined') { 
        return;
    }
if (!window.JQX) {
    window.JQX = {
        Utilities: {
            Core: {
                isMobile() {
                    var isMobile = /(iphone|ipod|ipad|android|iemobile|blackberry|bada)/.test(window.navigator.userAgent.toLowerCase());
                    var iOS = function () {
                        return [
                            'iPad Simulator',
                            'iPhone Simulator',
                            'iPod Simulator',
                            'iPad',
                            'iPhone',
                            'iPod'
                        ].includes(navigator.platform)
                            // iPad on iOS 13 detection
                            || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
                    }

                    if (!isMobile) {
                        return iOS();
                    }

                    return isMobile;
                }
            }
        }
    }
}


class LayoutItem extends HTMLElement {
    constructor() {
        super();

        this._properties = {
            'min': 50,
            'label': 'Item',
            'modifiers': ['resize', 'drag', 'close'],
            'size': null
        }
    }

    _setProperty(property, value) {
        var that = this;

        if (that._properties[property] === value) {
            return;
        }

        that._properties[property] = value;
        that._updating = true;

        if (property === 'disabled' || property === 'modifiers') {
            if (value) {
                that.setAttribute(property, value);
            }
            else {
                that.removeAttribute(property);
            }
        }
        else {
            if (value === null) {
                that.removeAttribute(property);
            }
            else {
                that.setAttribute(property, value);
            }
        }

        if (!that.isCompleted) {
            return;
        }

        var layout = that.closest('jqx-layout');

        if (layout) {
            if (!layout._resizeDetails && !layout._updating && layout.isRendered) {
                layout.refresh();
            }
        }
        that._updating = false;
    }

    get label() {
        return this._properties['label'];
    }

    set label(value) {
        this._setProperty('label', value);
    }

    get modifiers() {
        return this._properties['modifiers'];
    }

    set modifiers(value) {
        this._setProperty('modifiers', value);
    }

    get min() {
        return this._properties['min'];
    }

    set min(value) {
        this._setProperty('min', value);
    }

    get size() {
        return this._properties['size'];
    }

    set size(value) {
        if (value !== null) {
            if (typeof value === 'string') {
                this._setProperty('size', value);
            }
            else {
                this._setProperty('size', Math.max(this.min, value));
            }
        }
        else {
            this._setProperty('size', value);
        }
    }

    static get observedAttributes() {
        return ['min', 'size', 'label', 'modifiers'];
    }


    attributeChangedCallback(name, oldValue, newValue) {
        var that = this;

        if (oldValue === newValue) {
            return;
        }

        if (!that.isCompleted) {
            return;
        }

        if (name === 'size') {
            if (!that._updating) {
                if (newValue === null) {
                    this[name] = null;
                    return;
                }

                that[name] = Math.max(that.min, parseInt(newValue));
            }
        }
        else {
            that[name] = newValue;
        }
    }

    connectedCallback() {
        if (!this.isCompleted) {
            this.render();
        }
    }

    whenRendered(callback) {
        var that = this;

        if (that.isRendered) {
            callback();
            return;
        }

        if (!that.whenRenderedCallbacks) {
            that.whenRenderedCallbacks = [];
        }

        that.whenRenderedCallbacks.push(callback);
    }

    render() {
        var that = this;

        if (!that.hasAttribute('data-id')) {
            that.setAttribute('data-id', 'id' + Math.random().toString(16).slice(2));
        }

        if (!that.hasAttribute('label')) {
            that.setAttribute('label', that.label);
        }

        if (!that.hasAttribute('min')) {
            that.setAttribute('min', that.min);
        }

        if (!that.hasAttribute('label')) {
            that.setAttribute('label', that.label);
        }

        if (!that.hasAttribute('modifiers')) {
            that.setAttribute('modifiers', that.modifiers);
        }

        for (var i = 0; i < that.attributes.length; i++) {
            var attribute = that.attributes[i];
            var attributeName = attribute.name;
            var attributeValue = attribute.value;

            if (!isNaN(attributeValue) && (attributeName === 'min' || attributeName === 'size')) {
                that._properties[attributeName] = parseInt(attributeValue);
                continue;
            }

            that._properties[attributeName] = attributeValue;
        }

        that.classList.add('jqx-layout-item');

        that.isCompleted = true;

        if (that.whenRenderedCallbacks) {
            for (var i = 0; i < that.whenRenderedCallbacks.length; i++) {
                that.whenRenderedCallbacks[i]();
            }

            that.whenRenderedCallbacks = [];
        }
    }
}

class LayoutGroup extends LayoutItem {
    constructor() {
        super();

        this._properties['label'] = 'Group';
        this._properties['orientation'] = 'vertical'
    }

    get orientation() {
        return this._properties.orientation;
    }

    set orientation(value) {
        this._setProperty('orientation', value);
    }

    static get observedAttributes() {
        return ['min', 'size', 'modifiers', 'orientation', 'position'];
    }

    render() {
        var that = this;

        super.render();

        that.className = 'jqx-layout-group';

        if (!that.hasAttribute('orientation')) {
            that.setAttribute('orientation', that._properties['orientation']);
        }
        else {
            that._properties['orientation'] = that.getAttribute('orientation');
        }
    }
}

class TabLayoutGroup extends LayoutGroup {
    constructor() {
        super();
        this._properties['position'] = 'top'
        this._properties['label'] = 'TabGroup';
    }

    get position() {
        return this._properties.position;
    }

    set position(value) {
        this._setProperty('position', value);
    }

    render() {
        var that = this;

        super.render();

        if (!that.hasAttribute('position') && that.position) {
            that.setAttribute('position', 'top');
        }
    }

    static get observedAttributes() {
        return ['min', 'size', 'modifiers', 'orientation', 'position'];
    }
}

class TabLayoutItem extends LayoutGroup {
    constructor() {
        super();
        this._properties['label'] = 'TabItem';
    }
}


(function ($) {
    "use strict";
    $.jqx.jqxWidget("jqxSplitLayout", "", {});

    $.extend($.jqx._jqxSplitLayout.prototype, {
        defineInstance: function () {
            var settings = {
                'dataSource': null,
                'ready': null,
                'orientation': 'vertical'
            };

            if (this === $.jqx._jqxSplitLayout.prototype) {
                return settings;
            }

            $.extend(true, this, settings);
            return settings;
        },

        createInstance: function () {
            var that = this;
            this._properties = {
                'dataSource': null,
                'ready': null,
                'orientation': 'vertical'
            }

            var that = this;

            that.layout = document.createElement('jqx-split-layout');
            that.layout.style.width = '100%';
            that.layout.style.height = '100%';
            that.element.className += that.toThemeProperty("jqx-split-layout-component jqx-rc-all jqx-widget");
            that.layout.dataSource = that.dataSource;
            that.layout.orientation = that.orientation;
            that.layout.ready = that.ready;
            that.element.appendChild(that.layout);
        },

        propertyChangedHandler: function (object, key, oldValue, value) {
            var that = object;

            if (oldValue != value || value instanceof Object) {
                if (!that.layout) {
                    return;
                }

                that.layout[key] = value;
            }
        },

        render: function () {
            var that = this;

            if (!that.layout) {
                return;
            }

            that.layout.render();
        },

        refresh() {
            var that = this;

            if (!that.layout) {
                return;
            }

            if (!that.layout.isRendered) {
                return;
            }

            that.layout.refresh();
        },

        dataBind() {
            var that = this;

            if (!that.layout) {
                return;
            }

            that.layout.dataBind();
        }
    });
})(jqxBaseFramework);

class SplitLayout extends HTMLElement {
    constructor() {
        super();

        this._properties = {
            'dataSource': null,
            'orientation': 'vertical'
        }
    }


    get orientation() {
        return this._properties['orientation'];
    }

    set orientation(value) {
        this._properties['orientation'] = value;
    }

    get dataSource() {
        return this._properties['dataSource'];
    }

    set dataSource(value) {
        this._properties['dataSource'] = value;
    }


    _dragStart(event) {
        event.stopPropagation();
        event.preventDefault();
    }

    _leaveHandler() {
        var that = this;

        if (that._resizeDetails) {
            return;
        }

        that._handleButtonsVisibility(null);
        that._hideSplitter();

        requestAnimationFrame(function () {
            //       that.classList.remove('outline');
        })
    }

    _enterHandler() {
        var that = this;

        if (that._resizeDetails) {
            return;
        }

        that._handleButtonsVisibility(that._selectedItem);

        that._updateSplitter();

        requestAnimationFrame(function () {
            that.classList.add('outline');
        })
    }

    /**
    * Element's HTML template.
    */
    template() {
        return '<div class="jqx-container" id="container" role="presentation"><jqx-layout-group data-id="root" id="itemsContainer"></jqx-layout-group><div root-splitter id="splitter" class="jqx-layout-splitter"></div>';
    }

    /**
    * Updates the element when a property is changed.
    * @param {string} propertyName The name of the property.
    * @param {number/string} oldValue The previously entered value. Max, min and value are of type Number. The rest are of type String.
    * @param {number/string} newValue The new entered value. Max, min and value are of type Number. The rest are of type String.
    */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        var that = this;

        switch (propertyName) {
            case 'orientation':
                if (that.$.itemsContainer) {
                    that.$.itemsContainer.orientation = that.orientation;
                }
                break;
            case 'dataSource':
                that.dataBind();
                break;
            case 'selectedIndex':
                that._handleItemClick(that.getItem(newValue + ''), true);
                break;
            default:
                super.propertyChangedHandler(propertyName, oldValue, newValue);
                break;
        }
    }

    dataBind() {
        var that = this;

        that.$.itemsContainer.innerHTML = '';

        var template = '';
        var processDataSource = function (dataSource, isTabLayoutGroup) {
            for (var i = 0; i < dataSource.length; i++) {
                var item = dataSource[i];

                var size = item.size;
                var min = item.min;
                var modifiers = item.modifiers;
                var type = item.type;
                var position = item.position;
                var orientation = item.orientation ? item.orientation : 'vertical';
                var id = item.id;
                var label = item.label;

                var props = '';

                if (id !== undefined) {
                    props += `id="${id}" `
                }

                if (size !== undefined) {
                    props += `size="${size}" `
                }

                if (label !== undefined) {
                    props += `label="${label}" `
                }


                if (min !== undefined) {
                    props += `min="${min}" `
                }

                if (modifiers !== undefined) {
                    props += `modifiers="${modifiers}" `
                }

                if (position !== undefined) {
                    props += `position="${position}" `
                }

                if (item.items) {
                    props += `orientation=${orientation} `

                    if (type === 'tabs') {
                        template += `<jqx-tab-layout-group ${props}>`;
                        processDataSource(item.items, true);
                        template += '</jqx-tab-layout-group>'
                    }
                    else {
                        template += `<jqx-layout-group ${props}>`;
                        processDataSource(item.items);
                        template += '</jqx-layout-group>'
                    }
                }
                else {
                    var content = item.content || '';
                    if (isTabLayoutGroup) {
                        template += `<jqx-tab-layout-item ${props}>` + content + '</jqx-tab-layout-item>';
                    }
                    else {
                        if (type === 'tabs') {
                            template += `<jqx-tab-layout-group>`;
                            template += `<jqx-tab-layout-item ${props}>` + content + '</jqx-tab-layout-item>';
                            template += '</jqx-tab-layout-group>'
                        }
                        else {
                            template += `<jqx-layout-item ${props}>` + content + '</jqx-layout-item>';
                        }
                    }
                }
            }
        }

        processDataSource(that.dataSource);
        that.$.itemsContainer.innerHTML = template;
        that.refresh();
    }


    /**
     * Element's render funciton
     */
    render() {
        var that = this;

        that.setAttribute('role', 'group');

        if (that.selectedIndex) {
            that._handleItemClick(that.getItem(that.selectedIndex + ''), true);
        }


        var render = (function () {
            if (!that.dataSource) {
                that.dataSource = that._getDataSource(that._getLayout());
            }
            else {
                that.dataBind();
            }

            that.$.itemsContainer.orientation = that.orientation;

            that.refresh();
            that._updateSplitter();
            that.isRendered = true;
            that.classList.add('outline');

            if (that.ready) {
                that.ready();
            }
        })

        if (document.readyState === 'complete') {
            render();
        }
        else {
            window.addEventListener('load', (function () {
                render();
            }));
        }
    }

    connectedCallback() {
        var that = this;

        var setup = function () {
            var fragment = document.createDocumentFragment();

            while (that.childNodes.length) {
                fragment.appendChild(that.firstChild);
            }

            that.innerHTML = that.template();
            that.classList.add('jqx-widget');
            that.$ = {
                container: that.querySelector("#container"),
                itemsContainer: that.querySelector("#itemsContainer"),
                splitter: that.querySelector("#splitter")
            };

            delete that.$.container.id;
            delete that.$.itemsContainer.id;
            delete that.$.splitter.id;

            that.$.itemsContainer.appendChild(fragment);
            that.classList.add('jqx-split-layout');

            document.addEventListener('pointerdown', function (event) {
                that._documentDownHandler(event);
            });

            document.addEventListener('pointermove', function (event) {
                that._documentMoveHandler(event);
            });

            document.addEventListener('pointerup', function (event) {
                that._documentUpHandler(event);
            });

            document.addEventListener('selectstart', function (event) {
                that._documentSelectStartHandler(event);
            });

            document.addEventListener('keyup', function (event) {
                that._keyUpHandler(event);
            });

            that.addEventListener('mouseleave', function (event) {
                that._leaveHandler(event);
            });

            that.addEventListener('mouseenter', function (event) {
                that._enterHandler(event);
            });

            that.addEventListener('dragStart', function (event) {
                that._dragStart(event);
            });

            that.render();
        }

        if (document.readyState === 'complete') {
            setup();
        }
        else {
            window.addEventListener('load', function () {
                setup();
            });
        }
    }

    /**
    * Returns the Splitter item according to the index
    * @param {any} index - string, e.g. '0.1'
    */
    getItem(index) {
        var that = this;

        if (index === undefined || index === null) {
            return;
        }

        index = (index + '').split('.');

        var items = that._getDataSource(that._getLayout()),
            item;

        for (var i = 0; i < index.length; i++) {
            item = items[index[i]];

            if (!item) {
                break;
            }

            items = item.items;
        }

        return item;
    }


    /**
     * Document down handler
     * @param {any} event
     */
    _documentDownHandler(event) {
        var that = this,
            target = event.target;

        if (that.contains(target) && target.closest) {
            that._target = target;
            that._updateSplitter();
        }
    }

    /**
     * Document move handler
     * @param {any} event
     */
    _documentMoveHandler(event) {
        var that = this,
            target = event.target,
            menu = that._contextMenu;

        if (menu && !JQX.Utilities.Core.isMobile) {
            if (menu.querySelector('.jqx-layout-context-menu-item[hover]')) {
                var items = menu.children;

                for (var i = 0; i < items.length; i++) {
                    items[i].removeAttribute('hover');
                }
            }

            if (menu.contains(target) && target.closest && target.closest('.jqx-layout-context-menu-item')) {
                target.setAttribute('hover', '');
            }
        }

        if (that._dragDetails) {
            var offsetX = Math.abs(that._dragDetails.pageX - event.pageX);
            var offsetY = Math.abs(that._dragDetails.pageY - event.pageY);

            if (offsetY <= 5 && offsetX <= 5) {
                return;
            }

            if (!that._dragDetails.feedback.parentElement) {
                document.body.appendChild(that._dragDetails.feedback);
                document.body.appendChild(that._dragDetails.overlay)
                setTimeout(function () {
                    that._dragDetails.feedback.classList.add('dragging');
                }, 100);
            }

            that._dragDetails.dragging = true;

            that._dragDetails.feedback.style.left = event.pageX - that._dragDetails.feedback.offsetWidth / 2 - 5 + 'px';
            that._dragDetails.feedback.style.top = event.pageY - that._dragDetails.feedback.offsetHeight / 2 - 5 + 'px';

            var elements = document.elementsFromPoint(event.pageX, event.pageY);
            var group = null;
            var isTabStrip = false;

            for (var i = 0; i < elements.length; i++) {
                var element = elements[i];

                if (that._dragDetails.feedback.contains(element)) {
                    continue;
                }

                if (element.classList.contains('jqx-layout-tab-strip')) {
                    if (that._dragDetails.element.contains(element)) {
                        continue;
                    }

                    group = element.parentElement;
                    isTabStrip = true;
                    break;
                }

                if ((element.parentElement === that._dragDetails.parent || element === that._dragDetails.parent) && that._dragDetails.layoutGroup.items.length === 1) {
                    continue;
                }

                if (that._dragDetails.element.contains(element)) {
                    continue;
                }

                if (element instanceof TabLayoutItem) {
                    group = element.parentElement;
                    break;
                }
                else if (element instanceof TabLayoutGroup) {
                    group = element;
                    break;
                }
            }

            var getPosition = function (group, size) {
                var offset = that.offset(group);
                var position = null;
                var edgeSize = 50;

                var height = size;
                var width = size;

                if (!size) {
                    width = group.offsetWidth / 3;
                    height = group.offsetHeight / 3;
                }
                else {
                    edgeSize = 0;
                }

                var positionRects = [
                    {
                        left: offset.left,
                        top: offset.top,
                        right: offset.left + edgeSize,
                        bottom: offset.top + edgeSize,
                        position: 'top'
                    },
                    {
                        left: offset.left + edgeSize,
                        top: offset.top,
                        right: offset.left + group.offsetWidth - edgeSize,
                        bottom: offset.top + height - edgeSize,
                        position: 'top'
                    },
                    {
                        left: offset.left + group.offsetWidth - edgeSize,
                        top: offset.top,
                        right: offset.left + group.offsetWidth,
                        bottom: offset.top + edgeSize,
                        position: 'top'
                    },
                    {
                        left: offset.left,
                        top: offset.top + edgeSize,
                        right: offset.left + width,
                        bottom: offset.top + group.offsetHeight - edgeSize,
                        position: 'left'
                    },
                    {
                        left: offset.left + group.offsetWidth - width,
                        top: offset.top + edgeSize,
                        right: offset.left + group.offsetWidth,
                        bottom: offset.top + group.offsetHeight - edgeSize,
                        position: 'right'
                    },
                    {
                        left: offset.left,
                        top: offset.top + group.offsetHeight - edgeSize,
                        right: offset.left + edgeSize,
                        bottom: offset.top + group.offsetHeight,
                        position: 'bottom'
                    },
                    {
                        left: offset.left + edgeSize,
                        top: offset.top + group.offsetHeight - height + edgeSize,
                        right: offset.left + group.offsetWidth - edgeSize,
                        bottom: offset.top + group.offsetHeight,
                        position: 'bottom'
                    },
                    {
                        left: offset.left + group.offsetWidth - edgeSize,
                        top: offset.top + group.offsetHeight - edgeSize,
                        right: offset.left + group.offsetWidth,
                        bottom: offset.top + group.offsetHeight,
                        position: 'bottom'
                    },
                ]

                for (var i = 0; i < positionRects.length; i++) {
                    var rect = positionRects[i];

                    if (rect.left <= event.pageX && event.pageX <= rect.right) {
                        if (rect.top <= event.pageY && event.pageY <= rect.bottom) {
                            position = rect.position;
                            break;
                        }
                    }
                }

                return position;
            }

            var rootGroup = that.querySelector('jqx-layout-group');

            var position = getPosition(rootGroup, 10);
            var currentGroup = null;

            if (!position) {
                if (!group) {
                    that._handleDropArea(null);
                }
                else {
                    if (isTabStrip) {
                        if (group !== that._dragDetails.parent) {
                            position = 'center';
                            currentGroup = group;
                        }
                    }
                    else {
                        position = getPosition(group) || 'center';
                        currentGroup = group
                    }
                }
            }
            else {
                currentGroup = rootGroup;
            }

            if (currentGroup) {
                that._dragDetails.current = currentGroup;
                that._dragDetails.position = position;
                that._handleDropArea(currentGroup, position);
            }
        }

        if (that._resizeDetails) {
            var offsetX = Math.abs(that._resizeDetails.clientX - event.clientX);
            var offsetY = Math.abs(that._resizeDetails.clientY - event.clientY);

            var splitter = that._resizeDetails.splitter;
            var item = that._resizeDetails.item;
            var itemRect = that._resizeDetails.itemRect;
            var previousItemRect = that._resizeDetails.previousItemRect;
            var previousItem = that._resizeDetails.previousItem;
            var nextItemRect = that._resizeDetails.nextItemRect;
            var nextItem = that._resizeDetails.nextItem;
            var minSize = parseInt(item.getAttribute('min'));

            var resetSplitter = function (splitter) {
                if (splitter.classList.contains('jqx-visibility-hidden')) {
                    return;
                }

                splitter.style.right = '';
                splitter.style.top = '';
                splitter.style.left = '';
                splitter.style.bottom = '';
            }

            resetSplitter(splitter);
            resetSplitter(that.$.splitter);

            splitter.classList.remove('error');
            splitter.classList.add('active');

            if (!that._resizeDetails.dragging) {
                if (splitter.classList.contains('horizontal') && offsetY <= 5) {
                    return;
                }
                else if (splitter.classList.contains('vertical') && offsetX <= 5) {
                    return;
                }

                that._resizeDetails.dragging = true;
            }

            var normalized = {
                'clientPos': 'clientX',
                'pos': 'x',
                'size': 'width',
                'near': 'left',
                'far': 'right',
                'offsetSize': 'offsetWidth'
            }

            if (splitter.classList.contains('horizontal')) {
                normalized = {
                    'clientPos': 'clientY',
                    'pos': 'y',
                    'size': 'height',
                    'near': 'top',
                    'far': 'bottom',
                    'offsetSize': 'offsetHeight'
                }
            }

            var updateSplitter = function (splitter) {
                var offset = that.offset(splitter);
                var elementOffset = that.offset(that);

                elementOffset.left++;
                elementOffset.top++;

                that.$.splitter.style.width = splitter.offsetWidth + 'px';
                that.$.splitter.style.height = splitter.offsetHeight + 'px';

                that.$.splitter.className = splitter.className;

                that.$.splitter.style.left = offset.left - elementOffset.left + 'px';
                that.$.splitter.style.top = offset.top - elementOffset.top + 'px';

                splitter.setAttribute('drag', '');
                that.$.splitter.setAttribute('drag', '');
            }

            if (splitter.classList.contains('last')) {
                var newPosition = event[normalized.clientPos] - that._resizeDetails.splitterRect[normalized.pos];
                var maxPosition = itemRect[normalized.size] - minSize;

                if (newPosition > maxPosition) {
                    newPosition = maxPosition;
                    splitter.classList.add('error');
                }

                if (previousItemRect) {
                    var minSize = parseInt(previousItem.getAttribute('min'));

                    var minPosition = previousItemRect[normalized.size] - minSize;
                    if (newPosition < -minPosition) {
                        newPosition = -minPosition;
                        splitter.classList.add('error');
                    }
                }

                splitter.style[normalized.near] = newPosition + 'px';

                var newSize = item[normalized.offsetSize] - newPosition;

                item.setAttribute('size', newSize);

                if (previousItem) {
                    var previousItemSize = item[normalized.offsetSize] + previousItem[normalized.offsetSize] - newSize;

                    previousItem.setAttribute('size', previousItemSize);
                }
            }
            else {
                var newPosition = -event[normalized.clientPos] + that._resizeDetails.splitterRect[normalized.pos];
                var minPosition = itemRect[normalized.size] - minSize;

                if (newPosition > minPosition) {
                    newPosition = minPosition;
                    splitter.classList.add('error');
                }

                if (nextItemRect) {
                    var minSize = parseInt(nextItem.getAttribute('min'));

                    var maxPosition = -nextItemRect[normalized.size] + minSize;
                    if (newPosition < maxPosition) {
                        newPosition = maxPosition;
                        splitter.classList.add('error');
                    }
                }


                splitter.style[normalized.far] = newPosition + 'px';

                var newSize = item[normalized.offsetSize] - newPosition;

                item.setAttribute('size', newSize);

                if (nextItem) {
                    var nextItemSize = nextItem[normalized.offsetSize] + item[normalized.offsetSize] - newSize;

                    nextItem.setAttribute('size', nextItemSize);
                }
            }

            updateSplitter(splitter);
        }
    }

    _offsetTop(element) {
        var that = this;

        if (!element) {
            return 0;
        }

        return element.offsetTop + that._offsetTop(element.offsetParent);
    }

    _offsetLeft(element) {
        var that = this;

        if (!element) {
            return 0;
        }

        return element.offsetLeft + that._offsetLeft(element.offsetParent);
    }

    offset(element) {
        return { left: this._offsetLeft(element), top: this._offsetTop(element) }
    }

    _keyUpHandler(event) {
        var that = this;
        if (event.key === 'Escape') {
            if (that._dragDetails) {
                that._dragDetails.feedback.remove();
                that._dragDetails.overlay.remove();
                that._dragDetails = null;
                that._handleDropArea(null);
            }

            if (that._resizeDetails) {
                var drag = that._resizeDetails;

                drag.splitter.classList.contains('last') ? drag.previousItem.size = drag.previousItemSize : drag.nextItem.size = drag.nextItem.previousItemSize;
                drag.item.size = drag.itemSize;

                that.refresh();
                that._handleItemClick(drag.item);
                that._resizeDetails = null;
                return;
            }
        }
        else if (event.key === 'Delete') {
            if (that._selectedItem) {
                that._removeLayoutItem(that._selectedItem);
            }
        }
    }

    _endDrag() {
        var that = this;

        that._handleDropArea(null);

        if (!that._dragDetails.dragging) {
            that._dragDetails = null;
            return;
        }

        var group = that._dragDetails.current;
        var item = that._dragDetails.element;
        var position = that._dragDetails.position;

        that._handleDropArea(null);

        if (group) {
            that._addTabLayoutItem(group, position, item);
            that._removeLayoutItem(item);

            if (group.parentElement && Array.from(group.parentElement.parentElement.children).filter(function (value) {
                if (value.classList.contains('jqx-layout-group')) {
                    return true;
                }

                return false;
            }).length === 1) {
                var parent = group.parentElement;
                var parentGroup = parent.parentElement;
                var ownerGroup = parentGroup.parentElement;

                if (!(parentGroup.getAttribute('data-id') === 'root' || ownerGroup.getAttribute('data-id') === 'root') && ownerGroup !== that) {
                    var index = Array.from(ownerGroup.children).indexOf(parent.parentElement);

                    if (index >= 0) {
                        ownerGroup.insertBefore(parent, ownerGroup.children[index])
                    }
                    else {
                        ownerGroup.appendChild(parent);
                    }

                    parentGroup.remove();
                }
            }

            that.refresh();
            that._updateSplitter();

            requestAnimationFrame(function () {
                that.classList.add('outline');
                that.querySelectorAll('.jqx-element').forEach(function (control) {
                    that.dispatchEvent(new CustomEvent('resize'));

                });
            })
        }

        that.dispatchEvent(new CustomEvent('stateChange', { type: 'insert', item: item }));

        that._dragDetails.feedback.remove();
        that._dragDetails.overlay.remove();
        that._dragDetails = null;
    }
    /**
     * Document up handler
     * @param {any} event
     */
    _documentUpHandler(event) {
        var that = this,
            isMobile = JQX.Utilities.Core.isMobile,
            target = isMobile ? document.elementFromPoint(event.pageX - window.pageXOffset, event.pageY - window.pageYOffset) : event.target;


        if (event.button === 2) {
            return;
        }

        if (that._dragDetails) {
            that._endDrag(event);
        }

        if (that._resizeDetails) {
            var drag = that._resizeDetails;

            if (drag.item) {
                drag.item.style.overflow = '';
            }

            if (drag.previousItem) {
                drag.previousItem.style.overflow = '';
            }

            if (drag.nextItem) {
                drag.nextItem.style.overflow = '';
            }

            that.refresh();
            that._handleItemClick(drag.item);
            that._resizeDetails = null;
            window.dispatchEvent(new Event('resize'));

            that.querySelectorAll('.jqx-element').forEach(function (control) {
                control.dispatchEvent(new CustomEvent('resize'));
            });
            return;
        }

        if (!that.contains(target)) {
            return;
        }

        that.classList.add('outline');

        if (that._target && !target.item) {
            if (target instanceof TabLayoutItem) {
                that._handleItemClick(target);
            }
            else {
                that._handleItemClick(target.closest('.jqx-layout-item'));
            }
        }

        if (that._target) {
            if (that._target !== target) {
                delete that._target;
                return;
            }

            if (!event.button && target.closest('.jqx-layout-buttons-container')) {
                var button = event.target;

                that._handleButtonClick(button.item, button.position);
            }
            else if (target.closest('.jqx-layout-context-menu') && (!isMobile && !event.button || isMobile)) {
                that._handleMenuItemClick(target.closest('.jqx-layout-context-menu-item'));
            }

            delete that._target;
        }
    }

    /**
    * Document Select Start event handler
    */
    _documentSelectStartHandler(event) {
        var that = this;

        if (that._target) {
            event.preventDefault();
        }
    }

    /**
     * Adds labels to the items that do not have set
     * @param {any} data
     */
    _getDataSource(layout, path, index) {
        var that = this;

        var data = [];

        if (!index) {
            index = 0;
        }

        if (!path) {
            path = '';
        }

        for (var i = 0; i < layout.length; i++) {
            var layoutItem = layout[i];

            var item = {
                label: layoutItem.label,
                id: layoutItem.getAttribute('data-id'),
                orientation: layoutItem.orientation,
                size: layoutItem.size,
                min: layoutItem.min,
                type: layoutItem.type,
                modifiers: layoutItem.modifiers,
                position: layoutItem.position
            }

            layoutItem.removeAttribute('index');

            if (layoutItem instanceof LayoutGroup) {
                data.push(item);

                item.index = path !== '' ? path + '.' + index : index.toString();
                layoutItem.setAttribute('index', item.index);

                if (layoutItem.items) {
                    var items = that._getDataSource(layoutItem.items, item.index, 0);
                    item.items = items;
                }
            }
            else if (layoutItem instanceof LayoutItem) {
                if (layoutItem.items) {
                    var items = that._getDataSource(layoutItem.items, path, index);

                    data = data.concat(items);
                }
                else {
                    item.index = path !== '' ? path + '.' + index : index.toString();
                    layoutItem.setAttribute('index', item.index);

                    data.push(item);
                }
            }

            index++;
        }

        return data;
    }

    /**
     * Generates the JSON array of the current structure of the element
     */
    _getLayout() {
        var that = this;
        var group = !arguments.length ? that.$.itemsContainer : arguments[0];

        if (that._buttons) {
            that._buttons.remove();
        }

        if (that._dropArea) {
            that._dropArea.remove();
        }

        var splitters = that.querySelectorAll('.jqx-layout-splitter');

        for (var i = 0; i < splitters.length; i++) {
            var splitter = splitters[i];

            if (splitter !== that.$.splitter) {
                splitter.remove();
            }
        }

        group.items = Array.from(group.children);
        group.items = group.items.filter(function (value) {
            return value !== group.tabs && value.hasAttribute('data-id');
        });

        var items = group.items.map(function (value) {
            if (value.classList.contains('jqx-layout-tab-strip')) {
                return null;
            }

            var item = value;
            var itemGroup = value instanceof LayoutGroup ? value : null;

            if (itemGroup) {
                item.items = that._getLayout(itemGroup)
            }

            return item;
        });

        if (group !== that.$.itemsContainer) {
            return items.filter(function (value) {
                return value !== null && value !== group.tabs
            });
        }

        var data = [];
        var item = group;

        item.items = items.filter(function (value) {
            return value !== null && value !== group.tabs
        });

        data.push(item);

        return data;
    }


    _updateSplitter() {
        var that = this;

        if (that._buttons && that._dragDetails) {
            that._buttons.remove();
        }

        that._removeSplitter();
        var items = that.querySelectorAll('[data-id]');

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item.getAttribute('data-id') === 'root') {
                continue;
            }

            if (item.hasAttribute('role')) {
                var role = item.getAttribute('role');

                if (role === 'gridcell' || role === 'row' || role === 'columnheader' || role === 'rowheader') {
                    continue;
                }
            }

            item.setAttribute('hover', '');
            that._handleSplitter(item);
        }
    }

    _hideSplitter() {
        var that = this;

        var items = that.querySelectorAll('[data-id]');

        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            item.removeAttribute('hover');
        }
    }

    _removeSplitter() {
        var that = this;
        var splitters = that.querySelectorAll('.jqx-layout-splitter');

        for (var i = 0; i < splitters.length; i++) {
            var splitter = splitters[i];

            if (splitter !== that.$.splitter) {
                splitter.remove();
            }
        }

        that._hideSplitter();
    }

    /**
     * Handles item selection
     * @param {any} target - target element that was clicked
     * @param {any} isOnDemand - selection on demand
     */
    _handleItemClick(target) {
        var that = this,
            previouslySelectedIndex = that.selectedIndex;

        var item = null;

        if (!target) {
            that.selectedIndex = null;
            that.querySelectorAll('[data-id]').forEach(function (i) { i.removeAttribute('selected') });
            that._selectedItem = null;
            return;
        }
        else {
            item = target instanceof HTMLElement ? target : that.querySelector('[data-id=' + target.id + ']');

            if (item && item.readonly) {
                that.selectedIndex = null;
                return;
            }

            that.querySelectorAll('[data-id]').forEach(function (i) { i.removeAttribute('selected') });

            if (!item) {
                that.refresh();
                return;
            }

            that.selectedIndex = item.getAttribute('index');

            item.setAttribute('selected', '');
            item.setAttribute('hover', '');
            that._selectedItem = item;
            if (item.classList.contains('jqx-hidden')) {
                that.refresh();
            }

            that._handleButtonsVisibility(item);

            if (previouslySelectedIndex !== that.selectedIndex) {
                that.dispatchEvent(new CustomEvent('change'));
            }
        }

        that._updateSplitter();
    }

    /**
     * Handles Layout Button click
     * @param {any} target
     */
    _handleButtonClick(target, position) {
        var that = this,
            newItem = that._addLayoutItem(target, position);

        //Select the new empty item
        that.dispatchEvent(new CustomEvent('stateChange', { type: 'insert', item: newItem }));

        that._handleItemClick(newItem, true);
    }



    _removeLayoutItem(item) {
        var that = this;

        if (item.getAttribute('data-id') === 'root') {
            return;
        }

        if (item instanceof LayoutItem && item.parentElement.items.length === 1) {
            var parent = item.parentElement;
            var currentParent = parent;

            while (parent && parent.items && parent.items.length === 1) {
                if (parent.getAttribute('data-id') === 'root') {
                    break;
                }

                currentParent = parent;
                parent = parent.parentElement;
            }

            if (currentParent.getAttribute('data-id') !== 'root') {
                currentParent.remove();
            }
            else if (that.allowLiveSplit) {
                currentParent.appendChild(document.createElement('jqx-layout-item'));
            }
        }
        else {
            item.remove();
        }

        that.refresh();

        that.dispatchEvent(new CustomEvent('stateChange', { type: 'delete', item: item }));
    }

    /**
    * Refreshes the UI Component.
    */
    refresh() {
        var that = this;

        if (that._isUpdating) {
            return;
        }

        that.dataSource = that._getDataSource(that._getLayout());

        that.$.splitter.className = 'jqx-visibility-hidden jqx-layout-splitter';

        var refreshLayoutGroup = function (group) {
            var item = that.getItem(group.getAttribute('index'));

            if (!item) {
                return;
            }
            group.style.gridTemplateColumns = '';
            group.style.gridTemplateRows = '';

            var template = '';
            var percentages = 0;
            var withSizeCount = 0;

            if (group instanceof TabLayoutGroup) {
                if (group.tabs) {
                    group.tabs.remove();
                }

                var header = document.createElement('div');
                header.classList.add('jqx-layout-tab-strip');

                if (that._selectedItem && group.contains(that._selectedItem) && that._selectedItem instanceof TabLayoutItem) {
                    group.selectedIndex = Math.max(0, group.items.indexOf(that._selectedItem));
                }

                if (group.selectedIndex >= group.children.length) {
                    group.selectedIndex = 0;
                }

                for (var i = 0; i < group.children.length; i++) {
                    var child = group.children[i];
                    var childItem = that.getItem(child.getAttribute('index'));

                    if (!childItem) {
                        continue;
                    }

                    var tab = document.createElement('div');
                    tab.classList.add('jqx-layout-tab');
                    tab.innerHTML = '<label>' + childItem.label + '</label><span class="jqx-close-button"></span>';
                    header.appendChild(tab);
                    child.setAttribute('tab', '');
                    child.classList.add('jqx-hidden');
                    tab.content = child;
                    tab.item = childItem;
                    tab.group = item;

                    if (child.modifiers) {
                        if (child.modifiers.indexOf('close') === -1) {
                            tab.querySelector('.jqx-close-button').classList.add('jqx-hidden');
                        }
                    }
                    else {
                        tab.querySelector('.jqx-close-button').classList.add('jqx-hidden');
                    }

                    if (undefined === group.selectedIndex || i === group.selectedIndex) {
                        tab.classList.add('selected');
                        child.classList.remove('jqx-hidden');
                        group.selectedIndex = i;
                    }


                    tab.onpointerup = function (event) {
                        if (event.target.classList.contains('jqx-close-button') && tab.close) {
                            group.selectedIndex = 0;
                            that._removeLayoutItem(that._selectedItem);
                            that._handleItemClick(parent);
                        }
                    }
                    tab.onpointerdown = function (event) {
                        var parent = this.closest('.jqx-layout-group');
                        that._handleItemClick(this.content);
                        tab.close = false;
                        if (!event.target.classList.contains('jqx-close-button')) {
                            if (childItem.modifiers && childItem.modifiers.indexOf('drag') >= 0 && parent.modifiers.indexOf('drag') >= 0) {
                                that._beginDrag(parent, this, event);
                            }
                        }
                        else {
                            tab.close = true;
                        }
                    }

                }


                group.tabs = header;

                if (item.position === 'top' || item.position === 'left') {
                    group.insertBefore(header, group.firstChild);
                }
                else {
                    group.appendChild(header);
                }
            }
            else {
                for (var i = 0; i < group.children.length; i++) {
                    var child = group.children[i];

                    if (child.hasAttribute('size')) {
                        var size = child.getAttribute('size');

                        var pixels = parseFloat(size);
                        var groupSize = group.orientation === 'vertical' ? group.offsetWidth : group.offsetHeight;
                        var percentage = size.indexOf('%') >= 0 ? parseFloat(size) : parseFloat((pixels / groupSize) * 100);

                        percentages += percentage;
                        withSizeCount++;

                        if (withSizeCount === group.children.length) {
                            if (percentages < 100) {
                                template += '1fr ';
                                percentages = 100;
                                continue;
                            }
                            else if (percentages > 100) {
                                percentages -= percentage;
                                percentage = 100 - percentages;
                                percentages = 100;
                            }
                        }
                        else if (percentages > 100 || percentage === 0) {
                            withSizeCount = group.children.length;
                            percentages = 0;
                            break;
                        }

                        template += percentage + '% ';
                        continue;
                    }

                    template += '1fr ';
                }

                if (withSizeCount === group.children.length) {
                    if (percentages < 99 || percentages > 100) {
                        template = '';

                        for (var i = 0; i < group.children.length; i++) {
                            var child = group.children[i];

                            child.removeAttribute('size');
                            template += '1fr ';
                        }
                    }
                }

                if (group.orientation === 'vertical') {
                    group.style.gridTemplateColumns = template;
                }
                else {
                    group.style.gridTemplateRows = template;
                }
            }

            group.items = Array.from(group.children);
            group.items = group.items.filter(function (value) {
                return value !== group.tabs;
            });
        }

        var layoutGroups = that.querySelectorAll('.jqx-layout-group');

        for (var i = 0; i < layoutGroups.length; i++) {
            refreshLayoutGroup(layoutGroups[i]);
        }
    }

    _beginDrag(parent, element, event) {
        var that = this;

        if (that._dragDetails) {
            that._dragDetails.feedback.remove();
        }

        var feedback = document.createElement('div');
        var overlay = document.createElement('div');
        var tabs = parent.querySelector('.jqx-layout-tab-strip');
        var label = '';

        if (tabs) {
            for (var i = 0; i < Array.from(tabs.children).length; i++) {
                if (i === parent.selectedIndex) {
                    label = tabs.children[i].innerText;
                }
            }
        }

        feedback.innerHTML = `<jqx-split-layout><jqx-tab-layout-group><jqx-tab-layout-item label="${label}"></jqx-tab-layout-item></jqx-tab-layout-group></jqx-split-layout>`
        that._feedback = feedback;
        that._feedback.classList.add('jqx-split-layout-feedback', 'jqx-split-layout', 'jqx-widget');

        overlay.classList.add('jqx-split-layout-overlay');

        that._dragDetails = {
            element: element.content,
            item: element.item,
            layoutGroup: element.group,
            parent: parent,
            overlay: overlay,
            feedback: feedback,
            pageX: event.pageX,
            pageY: event.pageY
        }
    }

    moveChildren(oldItem, newItem) {
        newItem.innerHTML = '';
        var content = oldItem;

        while (content.firstChild) {
            var child = content.firstChild;
            newItem.appendChild(child);
        }
    }

    createLayoutItem(type, position) {
        var that = this;

        var getLayoutItem = function () {
            var item = document.createElement('jqx-layout-item');

            item.innerHTML = '';

            that.dispatchEvent(new CustomEvent('createItem', { type: 'layoutItem', item: item }));

            return item;
        }

        var getTabLayoutItem = function () {
            var item = document.createElement('jqx-tab-layout-item');

            item.innerHTML = '';

            that.dispatchEvent(new CustomEvent('createItem', { type: 'tabLayoutItem', item: item }));

            return item;
        }

        var getLayoutGroup = function (position) {
            var item = document.createElement('jqx-layout-group');
            var orientation = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';

            that.dispatchEvent(new CustomEvent('createGroup', { type: 'layoutGroup', item: item }));

            item.setAttribute('orientation', orientation);
            item.orientation = orientation;

            return item;
        }

        var getTabLayoutGroup = function (position) {
            var item = document.createElement('jqx-tab-layout-group');
            var orientation = position === 'top' || position === 'bottom' ? 'horizontal' : 'vertical';

            item.setAttribute('orientation', orientation);
            item.orientation = orientation;

            that.dispatchEvent(new CustomEvent('tabLayoutGroup', { type: 'layoutGroup', item: item }));

            return item;
        }

        if (type === 'layoutItem' || !type) {
            return getLayoutItem();
        }
        else if (type === 'tabLayoutItem' || !type) {
            return getTabLayoutItem();
        }
        else if (type === 'tabLayoutGroup') {
            return getTabLayoutGroup(position);
        }
        else {
            return getLayoutGroup(position);
        }
    }

    _addTabLayoutItem(targetItem, position, myItem) {
        var that = this;
        var newItem = that.createLayoutItem('tabLayoutItem');

        var parentLayoutGroup = targetItem.closest('jqx-tab-layout-group');
        var layoutGroup;

        if (myItem) {
            newItem.label = myItem.label;
            newItem.modifiers = myItem.modifiers;
            that.moveChildren(myItem, newItem);
        }

        var resetGroup = function (group) {
            for (var i = 0; i < group.children.length; i++) {
                var child = group.children[i];

                child.removeAttribute('size');
            }

            group.removeAttribute('size');
        }

        var addTabItemChild = function (position) {
            targetItem.removeAttribute('size');

            if (targetItem.querySelector('jqx-layout-group')) {
                that._addLayoutItem(targetItem.querySelector('jqx-layout-group'), position);
            }
            else {
                layoutGroup = that.createLayoutItem('layoutGroup', position);

                var newLayoutItem = that.createLayoutItem();
                that.moveChildren(targetItem, newLayoutItem)

                if (position === 'top' || position === 'left') {
                    layoutGroup.appendChild(that.createLayoutItem());
                    layoutGroup.appendChild(newLayoutItem);
                }
                else {
                    layoutGroup.appendChild(newLayoutItem);
                    layoutGroup.appendChild(that.createLayoutItem());
                }

                targetItem.appendChild(layoutGroup);
            }
        }

        var addRootTab = function (tabLayoutGroup, position) {

            var parentLayoutGroup = targetItem.parentElement;
            var layoutGroup = targetItem;
            var newLayoutGroup = that.createLayoutItem('layoutGroup', position);

            parentLayoutGroup.insertBefore(newLayoutGroup, layoutGroup);

            if (position === 'top' || position === 'left') {
                newLayoutGroup.append(tabLayoutGroup);
                newLayoutGroup.appendChild(layoutGroup);
            }
            else {
                newLayoutGroup.appendChild(layoutGroup);
                newLayoutGroup.append(tabLayoutGroup);
            }

            if (layoutGroup.getAttribute('data-id') === 'root') {
                layoutGroup.setAttribute('data-id', newLayoutGroup.getAttribute('data-id'));
                newLayoutGroup.setAttribute('data-id', 'root');
                that.$.itemsContainer = newLayoutGroup;
            }

            resetGroup(layoutGroup);
            resetGroup(parentLayoutGroup);
        }

        if (myItem) {
            switch (position) {
                case 'center': {
                    if (targetItem instanceof TabLayoutGroup || targetItem instanceof TabLayoutItem) {
                        parentLayoutGroup.appendChild(newItem);
                    }
                    else {
                        var tabLayoutGroup = that.createLayoutItem('tabLayoutGroup', 'top');
                        tabLayoutGroup.appendChild(newItem);

                        if (targetItem instanceof LayoutGroup && !(targetItem instanceof TabLayoutItem)) {
                            targetItem.appendChild(tabLayoutGroup);
                            resetGroup(targetItem);
                        }
                        else if (targetItem instanceof LayoutItem) {
                            layoutGroup = that.createLayoutItem('layoutGroup');

                            targetItem.parentElement.insertBefore(layoutGroup, targetItem);
                            layoutGroup.appendChild(targetItem);
                            layoutGroup.appendChild(tabLayoutGroup);
                            resetGroup(layoutGroup);
                        }
                    }
                }
                    break;
                case 'left':
                case 'right': {
                    var tabLayoutGroup = that.createLayoutItem('tabLayoutGroup', 'top');
                    tabLayoutGroup.appendChild(newItem);
                    if (targetItem.getAttribute('data-id') === 'root') {
                        tabLayoutGroup.position = position;
                        addRootTab(tabLayoutGroup, position);
                    }
                    else {
                        addRootTab(tabLayoutGroup, position);
                    }
                }
                    break;
                case 'top':
                case 'bottom': {
                    var tabLayoutGroup = that.createLayoutItem('tabLayoutGroup', 'top');
                    tabLayoutGroup.appendChild(newItem);

                    if (targetItem.getAttribute('data-id') === 'root') {
                        tabLayoutGroup.position = position;
                        addRootTab(tabLayoutGroup, position);
                    }
                    else {
                        addRootTab(tabLayoutGroup, position);
                    }
                    break;
                }
            }

            return;
        }

        switch (position) {
            case 'center':
                if (targetItem instanceof TabLayoutGroup || targetItem instanceof TabLayoutItem) {
                    parentLayoutGroup.appendChild(newItem);
                }
                else {
                    addTabItemChild();
                }
                break;
            case 'left':
            case 'right':
                if (targetItem instanceof TabLayoutGroup) {
                    var firstItem = targetItem.querySelector('jqx-tab-layout-item');

                    if (firstItem && position === 'left') {
                        targetItem.insertBefore(newItem, firstItem);
                    }
                    else {
                        targetItem.appendChild(newItem);
                    }
                }
                else if (targetItem instanceof TabLayoutItem) {
                    var tabLayoutGroup = that.createLayoutItem('tabLayoutGroup', 'top');
                    var parentLayoutGroup = targetItem.parentElement;

                    tabLayoutGroup.appendChild(newItem);

                    layoutGroup = that.createLayoutItem('layoutGroup');

                    parentLayoutGroup.parentElement.insertBefore(layoutGroup, parentLayoutGroup);

                    if (position === 'right') {
                        layoutGroup.appendChild(parentLayoutGroup);
                        layoutGroup.appendChild(tabLayoutGroup);
                    }
                    else if (position === 'left') {
                        layoutGroup.appendChild(tabLayoutGroup);
                        layoutGroup.appendChild(parentLayoutGroup);
                    }
                }
                else if (myItem) {
                    var tabLayoutGroup = that.createLayoutItem('tabLayoutGroup', 'top');
                    tabLayoutGroup.appendChild(newItem);

                    if (targetItem instanceof LayoutGroup) {
                        targetItem.insertBefore(targetItem.firstChild, tabLayoutGroup);
                    }
                    else if (targetItem instanceof LayoutItem) {
                        layoutGroup = that.createLayoutItem('layoutGroup');
                        layoutGroup.orientation = parentLayoutGroup.orientation;
                        layoutGroup.setAttribute('orientation', parentLayoutGroup.orientation);

                        targetItem.removeAttribute('size');
                        targetItem.parentElement.insertBefore(layoutGroup, targetItem);
                        layoutGroup.appendChild(targetItem);
                        layoutGroup.appendChild(tabLayoutGroup);
                    }
                }
                else {
                    addTabItemChild(position);
                }
                break;
            case 'top':
            case 'bottom':
                if (targetItem instanceof TabLayoutGroup) {
                    layoutGroup = that.createLayoutItem('layoutGroup', 'top');
                    targetItem.removeAttribute('size');

                    targetItem.parentElement.insertBefore(layoutGroup, targetItem);

                    if (position === 'top') {
                        layoutGroup.appendChild(that.createLayoutItem());
                        layoutGroup.appendChild(targetItem);
                    }
                    else {
                        layoutGroup.appendChild(targetItem);
                        layoutGroup.appendChild(that.createLayoutItem());
                    }
                }
                else {
                    addTabItemChild(position);
                }
                break;
        }

        that.refresh();
    }

    /**
     * Creates a new item by splitting the target Splitter
     */
    _addLayoutItem(targetItem, position, myItem) {
        var that = this;

        if (!targetItem) {
            return;
        }

        var resetGroup = function (group) {
            for (var i = 0; i < group.children.length; i++) {
                var child = group.children[i];

                child.removeAttribute('size');
            }

            group.removeAttribute('size');
        }

        var isTabItem = targetItem instanceof TabLayoutItem || targetItem instanceof TabLayoutGroup || (myItem && myItem instanceof TabLayoutItem);

        if (isTabItem) {
            return that._addTabLayoutItem(targetItem, position, myItem);
        }

        var newItem = that.createLayoutItem();

        var parentLayoutGroup = targetItem.closest('.jqx-layout-group');
        var layoutGroup;

        if (myItem) {
            that.moveChildren(myItem, newItem);
        }

        if (position === 'center') {
            if (targetItem instanceof LayoutGroup) {
                layoutGroup = parentLayoutGroup;
                layoutGroup.appendChild(newItem);

                resetGroup(layoutGroup);
                that.refresh();

                return newItem;
            }
            else if (targetItem instanceof LayoutItem) {
                layoutGroup = that.createLayoutItem('layoutGroup');
                layoutGroup.orientation = parentLayoutGroup.orientation;
                layoutGroup.setAttribute('orientation', parentLayoutGroup.orientation);

                targetItem.removeAttribute('size');
                targetItem.parentElement.insertBefore(layoutGroup, targetItem);
                layoutGroup.appendChild(targetItem);
                layoutGroup.appendChild(newItem);

                that.refresh();

                return layoutGroup;
            }
        }

        if (parentLayoutGroup.orientation === 'vertical' && (position === 'left' || position === 'right') ||
            parentLayoutGroup.orientation === 'horizontal' && (position === 'top' || position === 'bottom')) {
            layoutGroup = parentLayoutGroup;

            if (targetItem instanceof LayoutGroup) {
                if (position === 'left' || position === 'top') {
                    layoutGroup.insertBefore(newItem, layoutGroup.children[0]);
                }
                else {
                    layoutGroup.appendChild(newItem);
                }

                resetGroup(targetItem);
            }
            else {
                var layoutGroupItems = layoutGroup.items,
                    newItemIndex = Math.max(0, layoutGroupItems.indexOf(targetItem) + (position === 'top' || position === 'left' ? 0 : 1));

                layoutGroup.insertBefore(newItem, layoutGroupItems[newItemIndex]);
                resetGroup(layoutGroup);
            }
        }
        else {
            if (targetItem instanceof LayoutGroup) {
                var parentLayoutGroup = targetItem.parentElement;
                layoutGroup = targetItem;
                var newLayoutGroup = that.createLayoutItem('layoutGroup', position);

                parentLayoutGroup.insertBefore(newLayoutGroup, layoutGroup);

                if (position === 'top' || position === 'left') {
                    newLayoutGroup.append(newItem);
                    newLayoutGroup.appendChild(layoutGroup);
                }
                else {
                    newLayoutGroup.appendChild(layoutGroup);
                    newLayoutGroup.append(newItem);
                }

                if (layoutGroup.getAttribute('data-id') === 'root') {
                    layoutGroup.setAttribute('data-id', newLayoutGroup.getAttribute('data-id'));
                    newLayoutGroup.setAttribute('data-id', 'root');
                    that.$.itemsContainer = newLayoutGroup;
                }

                resetGroup(parentLayoutGroup);
            }
            else {
                layoutGroup = that.createLayoutItem('layoutGroup', position);

                parentLayoutGroup.insertBefore(layoutGroup, targetItem);

                if (position === 'top' || position === 'left') {
                    layoutGroup.appendChild(newItem);
                    layoutGroup.appendChild(targetItem);
                }
                else {
                    layoutGroup.appendChild(targetItem);
                    layoutGroup.appendChild(newItem);
                }

                resetGroup(layoutGroup);
            }
        }

        that.refresh();

        return newItem;
    }

    /**
     * Shows/Hides the Add buttons
     * @param {any} item
     */
    _handleButtonsVisibility(item) {
        var that = this;

        if (!that._buttons) {
            that._buttons = document.createElement('div');
            that._buttons.classList.add('jqx-layout-buttons-container');
            that._buttons.innerHTML = `<div role="button" position="top"></div>
                                       <div role="button" position="bottom"></div>
                                       <div role="button" position="center"></div>
                                       <div role="button" position="left"></div>
                                       <div role="button" position="right"></div>`;

        }

        if (!item) {
            if (that._buttons.parentElement) {
                that._buttons.parentElement.removeChild(that._buttons);

                return;
            }
        }

        if (item) {
            var buttonPosition = item._buttonPosition || [],
                buttons = that._buttons.children;


            for (var b = 0; b < buttons.length; b++) {
                var button = buttons[b];

                button.position = button.getAttribute('position');
                button.item = item;
                buttonPosition.length && buttonPosition.indexOf(button.getAttribute('position')) < 0 ? button.classList.add('jqx-hidden') : button.classList.remove('jqx-hidden');

                button.onmouseenter = function () {
                    button.setAttribute('hover', '');
                }
                button.onmouseleave = function () {
                    button.removeAttribute('hover')
                }
            }

            if (that.allowLiveSplit && that._buttons.parentElement !== item) {
                item.appendChild(that._buttons);
            }
        }
    }

    _handleDropArea(item, position = 'center') {
        var that = this;

        var positionDropArea = function (position) {
            var areaSize = 50;

            switch (position) {
                case 'left':
                    that._dropArea.style.top = '0px';
                    that._dropArea.style.left = '0px';
                    that._dropArea.style.width = areaSize + '%';
                    that._dropArea.style.height = '100%';
                    break;
                case 'right':
                    that._dropArea.style.top = '0px';
                    that._dropArea.style.left = `calc(100% - ${areaSize}%)`;
                    that._dropArea.style.width = areaSize + '%';
                    that._dropArea.style.height = '100%';
                    break;
                case 'top':
                    that._dropArea.style.top = '0px';
                    that._dropArea.style.left = '0px';
                    that._dropArea.style.width = '100%';
                    that._dropArea.style.height = areaSize + '%';
                    break;
                case 'bottom':
                    that._dropArea.style.top = `calc(100% - ${areaSize}%)`;
                    that._dropArea.style.left = '0px';
                    that._dropArea.style.width = '100%';
                    that._dropArea.style.height = areaSize + '%';
                    break;
                case 'center':
                    that._dropArea.style.top = '0px';
                    that._dropArea.style.left = '0px';
                    that._dropArea.style.width = '100%';
                    that._dropArea.style.height = '100%';
                    break;
            }
        }

        if (that._dropArea && that._dropArea.parentElement === item) {
            positionDropArea(position);
            return;
        }

        if (that._dropArea) {
            that._dropArea.remove();
        }

        if (!that._dragDetails || !item) {
            return;
        }

        that._dropArea = document.createElement('div');
        that._dropArea.classList.add('jqx-layout-drop-area');

        item.appendChild(that._dropArea);

        that._dropArea.style.opacity = 1;
        positionDropArea(position);
    }

    _handleSplitter(item) {
        var that = this;

        if (!item) {
            return;
        }

        if (item.hasAttribute('tab')) {
            item = item.parentElement;
        }

        if (item._splitter) {
            item._splitter.remove();
        }

        if (!item._splitter) {
            item._splitter = document.createElement('div');
        }

        if (that._dragDetails && that._dragDetails.dragging) {
            item._splitter.remove();
            return;
        }

        if (item.modifiers.indexOf('resize') === -1) {
            return;
        }

        item.appendChild(item._splitter);

        var layoutGroup = item.parentElement;

        if (layoutGroup) {
            item._splitter.className = 'jqx-layout-splitter';

            item._splitter.item = item;

            item._splitter.removeAttribute('drag');

            var orientation = layoutGroup.orientation;

            if (item.nextElementSibling && item.nextElementSibling.hasAttribute('data-id')) {
                item._splitter.classList.add(orientation);
            }
            else if (item.previousElementSibling && item.previousElementSibling.hasAttribute('data-id')) {
                item._splitter.classList.add(orientation);
                item._splitter.classList.add('last');
            }

            var handleResize = function (splitter) {
                splitter.style.top = '';
                splitter.style.left = '';
                splitter.style.bottom = '';
                splitter.style.right = '';

                splitter.onpointerdown = function (event) {
                    var item = event.target.item;
                    item.style.overflow = 'hidden';

                    that._resizeDetails = {
                        splitter: event.target,
                        splitterRect: event.target.getBoundingClientRect(),
                        itemRect: item.getBoundingClientRect(),
                        item: item,
                        itemSize: item.size,
                        group: item.parentElement,
                        clientX: event.clientX,
                        clientY: event.clientY
                    }

                    if (that._selectedItem !== item) {
                        that.querySelectorAll('[data-id]').forEach(function (i) { i.removeAttribute('selected') });
                        that.selectedIndex = item.getAttribute('index');
                        item.setAttribute('selected', '');
                        that._selectedItem = item;
                        that._handleButtonsVisibility(item);
                    }

                    if (item.previousElementSibling && item.previousElementSibling.hasAttribute('data-id')) {
                        that._resizeDetails.previousItemRect = item.previousElementSibling.getBoundingClientRect();
                        that._resizeDetails.previousItem = item.previousElementSibling;
                        that._resizeDetails.previousItemSize = item.previousElementSibling.size;
                        that._resizeDetails.previousItem.style.overflow = 'hidden';
                    }
                    else {
                        that._resizeDetails.previousItemRect = null;
                        that._resizeDetails.previousItem = null;
                    }

                    if (item.nextElementSibling && item.nextElementSibling.hasAttribute('data-id')) {
                        that._resizeDetails.nextItemRect = item.nextElementSibling.getBoundingClientRect();
                        that._resizeDetails.nextItem = item.nextElementSibling;
                        that._resizeDetails.nextItemSize = item.nextElementSibling.size;
                        that._resizeDetails.nextItem.style.overflow = 'hidden';
                    }
                    else {
                        that._resizeDetails.nextItemRect = null;
                        that._resizeDetails.nextItem = null;
                    }
                }
            }

            handleResize(item._splitter);
        }
    }
}


customElements.define('jqx-layout-group', LayoutGroup);
customElements.define('jqx-layout-item', LayoutItem);
customElements.define('jqx-tab-layout-group', TabLayoutGroup);
customElements.define('jqx-tab-layout-item', TabLayoutItem);
customElements.define('jqx-split-layout', SplitLayout);

})();



