/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sebastian Bochan
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */
'use strict';
import CallbackRegistry from '../CallbackRegistry.js';
import EditableOptions from './EditableOptions.js';
import Globals from '../Globals.js';
const { classNamePrefix } = Globals;
import U from '../../Core/Utilities.js';
const { createElement, isArray, merge, fireEvent, addEvent, objectEach, isFunction, getStyle, relativeLength, diffObjects } = U;
import CU from './ComponentUtilities.js';
const { getMargins, getPaddings } = CU;
import ComponentGroup from './ComponentGroup.js';
import DU from '../Utilities.js';
const { uniqueKey } = DU;
import Sync from './Sync/Sync.js';
/* *
 *
 *  Class
 *
 * */
/**
 *
 * Abstract Class of component.
 *
 * @internal
 *
 */
/**
 * Abstract Class of component.
 * @internal
 */
class Component {
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     *
     * Creates HTML text element like header or title
     *
     * @param tagName
     * HTML tag name used as wrapper of text like `h2` or `p`.
     * @param elementName
     * Name of element
     * @param textOptions
     * The options for the component
     * @returns
     * HTML object when title is created, otherwise undefined
     *
     * @internal
     */
    static createTextElement(tagName, elementName, textOptions) {
        if (typeof textOptions === 'object') {
            const { className, text, style } = textOptions;
            return createElement(tagName, {
                className: className || `${classNamePrefix}component-${elementName}`,
                textContent: text
            }, style);
        }
        if (typeof textOptions === 'string') {
            return createElement(tagName, {
                className: `${classNamePrefix}component-${elementName}`,
                textContent: textOptions
            }, {});
        }
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a component in the cell.
     *
     * @param cell
     * Instance of cell, where component is attached.
     *
     * @param options
     * The options for the component.
     */
    constructor(cell, options) {
        /**
         * Registry of callbacks registered on the component. Used in the Highcharts
         * component to keep track of chart events.
         *
         * @internal
         */
        this.callbackRegistry = new CallbackRegistry();
        /**
         * Event listeners tied to the current DataTable. Used for rerendering the
         * component on data changes.
         *
         * @internal
         */
        this.tableEvents = [];
        /**
         * Event listeners tied to the parent cell. Used for rendering/resizing the
         * component on interactions.
         *
         * @internal
         */
        this.cellListeners = [];
        /**
         * The active group of the component. Used for sync.
         *
         * @internal
         */
        this.activeGroup = void 0;
        /**
         * Timeouts for calls to `Component.resizeTo()`.
         *
         * @internal
        /* *
         */
        this.resizeTimeouts = [];
        /**
         * Timeouts for resizing the content. I.e. `chart.setSize()`.
         *
         * @internal
         * */
        this.innerResizeTimeouts = [];
        this.board = cell.row.layout.board;
        this.parentElement = cell.container;
        this.cell = cell;
        this.options = merge(Component.defaultOptions, options);
        this.id = this.options.id && this.options.id.length ?
            this.options.id :
            uniqueKey();
        this.editableOptions =
            new EditableOptions(this, options.editableOptionsBindings);
        this.presentationModifier = this.options.presentationModifier;
        this.dimensions = {
            width: null,
            height: null
        };
        this.element = createElement('div', {
            className: this.options.className
        }, {}, this.parentElement);
        this.contentElement = createElement('div', {
            className: `${this.options.className}-content`
        }, {
            height: '100%'
        }, this.element, true);
        this.filterAndAssignSyncOptions();
        this.setupEventListeners();
        this.attachCellListeneres();
        this.on('tableChanged', () => {
            this.onTableChanged();
        });
        this.on('update', () => {
            this.cell.setLoadingState();
        });
        this.on('afterRender', () => {
            this.cell.setLoadingState(false);
        });
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Inits connectors for the component and rerenders it.
     *
     * @returns
     * Promise resolving to the component.
     */
    async initConnector() {
        if (this.options.connector?.id &&
            this.connectorId !== this.options.connector.id) {
            this.cell.setLoadingState();
            const connector = await this.board.dataPool
                .getConnector(this.options.connector.id);
            this.setConnector(connector);
        }
        return this;
    }
    /**
    * Filter the sync options that are declared in the component options.
    * Assigns the sync options to the component and to the sync instance.
    *
    * @param defaultHandlers
    * Sync handlers on component.
    *
    * @internal
    */
    filterAndAssignSyncOptions(defaultHandlers = this.constructor.syncHandlers) {
        const sync = this.options.sync || {};
        const syncHandlers = Object.keys(sync)
            .reduce((carry, handlerName) => {
            if (handlerName) {
                const handler = sync[handlerName];
                if (handler && typeof handler === 'object') {
                    carry[handlerName] = handler;
                }
                if (handler && typeof handler === 'boolean') {
                    carry[handlerName] = defaultHandlers[handlerName];
                }
            }
            return carry;
        }, {});
        this.sync ? this.sync.syncConfig = syncHandlers : void 0;
        this.syncHandlers = syncHandlers;
    }
    /**
     * Setup listeners on cell/other things up the chain
     *
     * @internal
     */
    attachCellListeneres() {
        // remove old listeners
        while (this.cellListeners.length) {
            const destroy = this.cellListeners.pop();
            if (destroy) {
                destroy();
            }
        }
        if (this.cell && Object.keys(this.cell).length) {
            const board = this.cell.row.layout.board;
            this.cellListeners.push(
            // Listen for resize on dashboard
            addEvent(board, 'cellResize', () => {
                this.resizeTo(this.parentElement);
            }), 
            // Listen for changed parent
            addEvent(this.cell.row, 'cellChange', (e) => {
                const { row } = e;
                if (row && this.cell) {
                    const hasLeftTheRow = row.getCellIndex(this.cell) === void 0;
                    if (hasLeftTheRow) {
                        if (this.cell) {
                            this.setCell(this.cell);
                        }
                    }
                }
            }));
        }
    }
    /**
     * Set a parent cell.
     * @param cell
     * Instance of a cell.
     * @param resize
     * Flag that allow to resize the component.
     *
     * @internal
     */
    setCell(cell, resize = false) {
        this.cell = cell;
        if (cell.container) {
            this.parentElement = cell.container;
        }
        this.attachCellListeneres();
        if (resize) {
            this.resizeTo(this.parentElement);
        }
    }
    /**
     * Adds event listeners to data table.
     * @param table
     * Data table that is source of data.
     * @internal
     */
    setupTableListeners(table) {
        const connector = this.connector;
        if (connector) {
            if (table) {
                [
                    'afterDeleteColumns',
                    'afterDeleteRows',
                    'afterSetCell',
                    'afterSetConnector',
                    'afterSetColumns',
                    'afterSetRows'
                ].forEach((event) => {
                    this.tableEvents.push((table)
                        .on(event, (e) => {
                        clearInterval(this.tableEventTimeout);
                        this.tableEventTimeout = Globals.win.setTimeout(() => {
                            this.emit({
                                ...e,
                                type: 'tableChanged'
                            });
                            this.tableEventTimeout = void 0;
                        }, 0);
                    }));
                });
            }
            this.tableEvents.push(connector.on('afterLoad', () => {
                this.emit({
                    target: this,
                    type: 'tableChanged'
                });
            }));
        }
    }
    /**
     * Remove event listeners in data table.
     * @internal
     */
    clearTableListeners() {
        const connector = this.connector, tableEvents = this.tableEvents;
        if (tableEvents.length) {
            tableEvents.forEach((removeEventCallback) => removeEventCallback());
        }
        if (connector) {
            tableEvents.push(connector.table.on('afterSetModifier', (e) => {
                if (e.type === 'afterSetModifier') {
                    this.emit({
                        ...e,
                        type: 'tableChanged'
                    });
                }
            }));
        }
    }
    /**
     * Attaches data store to the component.
     * @param connector
     * Connector of data.
     *
     * @returns
     * Component which can be used in chaining.
     *
     * @internal
     */
    setConnector(connector) {
        fireEvent(this, 'setConnector', { connector });
        // Clean up old event listeners
        while (this.tableEvents.length) {
            const eventCallback = this.tableEvents.pop();
            if (typeof eventCallback === 'function') {
                eventCallback();
            }
        }
        this.connector = connector;
        if (connector) {
            // Set up event listeners
            this.clearTableListeners();
            this.setupTableListeners(connector.table);
            // re-setup if modifier changes
            connector.table.on('setModifier', () => this.clearTableListeners());
            connector.table.on('afterSetModifier', (e) => {
                if (e.type === 'afterSetModifier' && e.modified) {
                    this.setupTableListeners(e.modified);
                }
            });
            // Add the component to a group based on the
            // connector table id by default
            // TODO: make this configurable
            const tableID = connector.table.id;
            if (!ComponentGroup.getComponentGroup(tableID)) {
                ComponentGroup.addComponentGroup(new ComponentGroup(tableID));
            }
            const group = ComponentGroup.getComponentGroup(tableID);
            if (group) {
                group.addComponents([this.id]);
                this.activeGroup = group;
            }
        }
        fireEvent(this, 'afterSetConnector', { connector });
        return this;
    }
    /** @internal */
    setActiveGroup(group) {
        if (typeof group === 'string') {
            group = ComponentGroup.getComponentGroup(group) || null;
        }
        if (group instanceof ComponentGroup) {
            this.activeGroup = group;
        }
        if (group === null) {
            this.activeGroup = void 0;
        }
        if (this.activeGroup) {
            this.activeGroup.addComponents([this.id]);
        }
    }
    /**
     * Gets height of the component's content.
     *
     * @returns
     * Current height as number.
     * @internal
     */
    getContentHeight() {
        const parentHeight = this.dimensions.height || Number(getStyle(this.element, 'height'));
        const titleHeight = this.titleElement ?
            this.titleElement.clientHeight + getMargins(this.titleElement).y :
            0;
        const captionHeight = this.captionElement ?
            this.captionElement.clientHeight +
                getMargins(this.captionElement).y :
            0;
        return parentHeight - titleHeight - captionHeight;
    }
    /**
     * Resize the component
     * @param width
     * The width to set the component to.
     * Can be pixels, a percentage string or null.
     * Null will unset the style
     * @param height
     * The height to set the component to.
     * Can be pixels, a percentage string or null.
     * Null will unset the style.
     */
    resize(width, height) {
        if (height) {
            // Get offset for border, padding
            const pad = getPaddings(this.element).y + getMargins(this.element).y;
            this.dimensions.height = relativeLength(height, Number(getStyle(this.parentElement, 'height'))) - pad;
            this.element.style.height = this.dimensions.height + 'px';
            this.contentElement.style.height = this.getContentHeight() + 'px';
        }
        if (width) {
            const pad = getPaddings(this.element).x + getMargins(this.element).x;
            this.dimensions.width = relativeLength(width, Number(getStyle(this.parentElement, 'width'))) - pad;
            this.element.style.width = this.dimensions.width + 'px';
        }
        if (height === null) {
            this.dimensions.height = null;
            this.element.style.removeProperty('height');
        }
        if (width === null) {
            this.dimensions.width = null;
            this.element.style.removeProperty('width');
        }
        fireEvent(this, 'resize', {
            width,
            height
        });
    }
    /**
     * Adjusts size of component to parent's cell size when animation is done.
     * @param element
     * HTML element that is resized.
     */
    resizeTo(element) {
        while (this.resizeTimeouts.length) {
            const timeout = this.resizeTimeouts.pop();
            if (timeout) {
                cancelAnimationFrame(timeout);
            }
        }
        const timeoutID = requestAnimationFrame(() => {
            const { width, height } = element.getBoundingClientRect();
            const padding = getPaddings(element);
            const margins = getMargins(element);
            this.resize(width - padding.x - margins.x, height - padding.y - margins.y);
        });
        this.resizeTimeouts.push(timeoutID);
    }
    /**
     * Handles updating via options.
     * @param newOptions
     * The options to apply.
     *
     * @param shouldRerender
     * Set to true if the update should rerender the component.
     */
    async update(newOptions, shouldRerender = true) {
        const eventObject = {
            options: newOptions,
            shouldForceRerender: false
        };
        // Update options
        fireEvent(this, 'update', eventObject);
        this.options = merge(this.options, newOptions);
        if (this.options.connector?.id &&
            this.connectorId !== this.options.connector.id) {
            const connector = await this.board.dataPool
                .getConnector(this.options.connector.id);
            this.setConnector(connector);
        }
        this.options = merge(this.options, newOptions);
        if (shouldRerender || eventObject.shouldForceRerender) {
            this.render();
        }
    }
    /**
     * Private method which sets up event listeners for the component.
     *
     * @internal
     */
    setupEventListeners() {
        const events = this.options.events;
        if (events) {
            Object.keys(events).forEach((key) => {
                const eventCallback = events[key];
                if (eventCallback) {
                    this.callbackRegistry.addCallback(key, {
                        type: 'component',
                        func: eventCallback
                    });
                }
            });
            objectEach(events, (eventCallback, eventType) => {
                if (isFunction(eventCallback)) {
                    this.on(eventType, eventCallback);
                }
            });
        }
        // TODO: Replace with a resize observer.
        window.addEventListener('resize', () => this.resizeTo(this.parentElement));
    }
    /**
     * Adds title at the top of component's container.
     *
     * @param titleOptions
     * The options for the title.
     */
    setTitle(titleOptions) {
        const titleElement = this.titleElement, shouldExist = titleOptions &&
            (typeof titleOptions === 'string' || titleOptions.text);
        if (shouldExist) {
            const newTitle = Component.createTextElement('h2', 'title', titleOptions);
            if (newTitle) {
                if (!titleElement) {
                    this.element.insertBefore(newTitle, this.element.firstChild);
                }
                else {
                    titleElement.replaceWith(newTitle);
                }
                this.titleElement = newTitle;
            }
        }
        else {
            if (titleElement) {
                titleElement.remove();
                delete this.titleElement;
                return;
            }
        }
    }
    /**
     * Adds caption at the bottom of component's container.
     *
     * @param captionOptions
     * The options for the caption.
     */
    setCaption(captionOptions) {
        const captionElement = this.captionElement, shouldExist = captionOptions &&
            (typeof captionOptions === 'string' || captionOptions.text);
        if (shouldExist) {
            const newCaption = Component.createTextElement('div', 'caption', captionOptions);
            if (newCaption) {
                if (!captionElement) {
                    this.element.appendChild(newCaption);
                }
                else {
                    captionElement.replaceWith(newCaption);
                }
                this.titleElement = newCaption;
            }
        }
        else {
            if (captionElement) {
                captionElement.remove();
                delete this.captionElement;
                return;
            }
        }
    }
    /**
     * Handles setting things up on initial render.
     *
     * @returns
     * The component for chaining.
     *
     * @internal
     */
    async load() {
        await this.initConnector();
        this.render();
        return this;
    }
    /**
     * Renders the component.
     *
     * @returns
     * The component for chaining.
     *
     * @internal
     */
    render() {
        this.emit({ type: 'render' });
        this.resizeTo(this.parentElement);
        this.setTitle(this.options.title);
        this.setCaption(this.options.caption);
        return this;
    }
    /**
     * Destroys the component.
     */
    destroy() {
        /**
         * TODO: Should perhaps set an `isActive` flag to false.
         */
        while (this.element.firstChild) {
            this.element.firstChild.remove();
        }
        // Unregister events
        this.tableEvents.forEach((eventCallback) => eventCallback());
        this.element.remove();
    }
    /** @internal */
    on(type, callback) {
        return addEvent(this, type, callback);
    }
    /** @internal */
    emit(e) {
        if (!e.target) {
            e.target = this;
        }
        fireEvent(this, e.type, e);
    }
    /**
     * Converts the class instance to a class JSON.
     * @internal
     *
     * @returns
     * Class JSON of this Component instance.
     *
     * @internal
     */
    toJSON() {
        const dimensions = {
            width: 0,
            height: 0
        };
        objectEach(this.dimensions, function (value, key) {
            if (value === null) {
                return;
            }
            dimensions[key] = value;
        });
        const json = {
            $class: this.options.type,
            // connector: this.connector ? this.connector.toJSON() : void 0,
            options: {
                cell: this.options.cell,
                parentElement: this.parentElement.id,
                dimensions,
                id: this.id,
                type: this.type
            }
        };
        return json;
    }
    /**
     * Get the component's options.
     * @returns
     * The JSON of component's options.
     *
     * @internal
     *
     */
    getOptions() {
        return diffObjects(this.options, Component.defaultOptions);
    }
    getEditableOptions() {
        const component = this;
        return merge(component.options);
    }
    getEditableOptionValue(propertyPath) {
        const component = this;
        if (!propertyPath) {
            return;
        }
        let result = component.getEditableOptions();
        for (let i = 0, end = propertyPath.length; i < end; i++) {
            if (!result) {
                return;
            }
            if (isArray(result)) {
                result = result[0];
            }
            result = result[propertyPath[i]];
        }
        return result;
    }
}
/* *
 *
 *  Properties
 *
 * */
/** @internal */
Component.Sync = Sync;
/**
 * Default options of the component.
 */
Component.defaultOptions = {
    className: `${classNamePrefix}component`,
    id: '',
    title: false,
    caption: false,
    sync: Sync.defaultHandlers,
    editableOptions: [{
            name: 'connectorName',
            propertyPath: ['connector', 'id'],
            type: 'select'
        }, {
            name: 'title',
            propertyPath: ['title'],
            type: 'input'
        }, {
            name: 'caption',
            propertyPath: ['caption'],
            type: 'input'
        }]
};
/**
 * Default sync Handlers.
 */
Component.syncHandlers = {};
export default Component;
