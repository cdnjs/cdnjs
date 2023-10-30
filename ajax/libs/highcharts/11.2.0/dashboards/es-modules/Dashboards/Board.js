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
 *  - Pawel Lysy
 *  - Karol Kolodziej
 *
 * */
'use strict';
import Bindings from './Actions/Bindings.js';
import ComponentRegistry from './Components/ComponentRegistry.js';
import DashboardsAccessibility from './Accessibility/DashboardsAccessibility.js';
import DataCursor from '../Data/DataCursor.js';
import DataCursorHelper from './SerializeHelper/DataCursorHelper.js';
import DataPool from '../Data/DataPool.js';
import EditMode from './EditMode/EditMode.js';
import Fullscreen from './EditMode/Fullscreen.js';
import Globals from './Globals.js';
import Layout from './Layout/Layout.js';
import Serializable from './Serializable.js';
import U from '../Core/Utilities.js';
import HTMLComponent from './Components/HTMLComponent.js';
const { merge, addEvent, error, objectEach, uniqueKey, createElement } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that represents a dashboard.
 *
 * @example
 * const dashboard = Dashboards.board('container', {
 *      gui: {
 *          layouts: [{
 *              id: 'layout-1',
 *              rows: [{
 *                  cells: [{
 *                      id: 'dashboard-col-0'
 *                  }]
 *              }]
 *          }]
 *      },
 *      components: [{
 *          cell: 'dashboard-col-0',
 *          type: 'Highcharts',
 *          chartOptions: {
 *              series: [{
 *                  data: [1, 2, 3, 4]
 *              }]
 *          }
 *      }]
 * });
 */
class Board {
    // Implementation:
    static board(renderTo, options, async) {
        return new Board(renderTo, options).init(async);
    }
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Creates a dashboard with components like charts, tables, and HTML
     * elements.
     *
     * @internal
     * @param renderTo
     * The DOM element to render to, or its id.
     *
     * @param options
     * The options for the dashboard.
     */
    constructor(renderTo, options) {
        /**
         * The container referenced by the `renderTo` option when creating the
         * dashboard.
         * @internal
         * */
        this.boardWrapper = void 0;
        /**
         * The main container for the dashboard. Created inside the element
         * specified by user when creating the dashboard.
         * */
        this.container = void 0;
        this.options = merge(Board.defaultOptions, options);
        this.dataPool = new DataPool(options.dataPool);
        this.id = uniqueKey();
        this.guiEnabled = (this.options.gui || {}).enabled;
        this.layouts = [];
        this.mountedComponents = [];
        this.initContainer(renderTo);
        // Create layouts wrapper.
        this.layoutsWrapper = createElement('div', {
            className: Globals.classNames.layoutsWrapper
        }, {}, this.container);
        // Init edit mode.
        if (EditMode && !(this.options.editMode &&
            !this.options.editMode.enabled)) {
            this.editMode = new EditMode(this, this.options.editMode);
        }
        // Add table cursors support.
        this.dataCursor = new DataCursor();
        // Add fullscreen support.
        this.fullscreen = new Fullscreen(this);
        this.index = Globals.boards.length;
        Globals.boards.push(this);
        // a11y module
        this.a11y = new DashboardsAccessibility(this);
    }
    // Implementation:
    init(async) {
        const options = this.options;
        if (options.gui && this.options.gui) {
            this.setLayouts(this.options.gui);
        }
        // Init layouts from JSON.
        if (options.layoutsJSON && !this.layouts.length) {
            this.setLayoutsFromJSON(options.layoutsJSON);
        }
        let componentPromises = (options.components) ?
            this.setComponents(options.components) : [];
        // Init events.
        this.initEvents();
        if (async) {
            return Promise.all(componentPromises).then(() => this);
        }
        return this;
    }
    /**
     * Initializes the events.
     * @internal
     */
    initEvents() {
        const board = this, runReflow = () => {
            board.reflow();
        };
        if (typeof ResizeObserver === 'function') {
            this.resizeObserver = new ResizeObserver(runReflow);
            this.resizeObserver.observe(board.container);
        }
        else {
            const unbind = addEvent(window, 'resize', runReflow);
            addEvent(this, 'destroy', unbind);
        }
    }
    /**
     * Initialize the container for the dashboard.
     * @internal
     *
     * @param renderTo
     * The DOM element to render to, or its id.
     */
    initContainer(renderTo) {
        const board = this;
        if (typeof renderTo === 'string') {
            renderTo = window.document.getElementById(renderTo);
        }
        // Display an error if the renderTo doesn't exist.
        if (!renderTo) {
            error(13, true);
        }
        // Clear the container from any content.
        renderTo.innerHTML = '';
        // Set the main wrapper container.
        board.boardWrapper = renderTo;
        // Add container for the board.
        board.container = createElement('div', {
            className: Globals.classNames.boardContainer
        }, {}, this.boardWrapper);
    }
    /**
     * Creates a new layouts and adds it to the dashboard based on the options.
     * @internal
     *
     * @param guiOptions
     * The GUI options for the layout.
     *
     */
    setLayouts(guiOptions) {
        const board = this, layoutsOptions = guiOptions.layouts;
        for (let i = 0, iEnd = layoutsOptions.length; i < iEnd; ++i) {
            board.layouts.push(new Layout(board, merge({}, guiOptions.layoutOptions, layoutsOptions[i])));
        }
    }
    /**
     * Set the layouts from JSON.
     * @internal
     *
     * @param json
     * An array of layout JSON objects.
     *
     */
    setLayoutsFromJSON(json) {
        const board = this;
        let layout;
        for (let i = 0, iEnd = json.length; i < iEnd; ++i) {
            layout = Layout.fromJSON(json[i], board);
            if (layout) {
                board.layouts.push(layout);
            }
        }
    }
    /**
     * Set the components from options.
     * @internal
     *
     * @param components
     * An array of component options.
     *
     */
    setComponents(components) {
        const promises = [];
        for (let i = 0, iEnd = components.length; i < iEnd; ++i) {
            promises.push(Bindings.addComponent(components[i]));
        }
        return promises;
    }
    /**
     * Returns the current size of the layout container based on the selected
     * responsive breakpoints.
     * @internal
     *
     * @returns Return current size of the layout container in px.
     */
    getLayoutContainerSize() {
        const board = this, responsiveOptions = board.options.responsiveBreakpoints, cntWidth = (board.layoutsWrapper || {}).clientWidth;
        let size = Globals.responsiveBreakpoints.large;
        if (responsiveOptions) {
            if (cntWidth <= responsiveOptions.small) {
                size = Globals.responsiveBreakpoints.small;
            }
            else if (cntWidth > responsiveOptions.small &&
                cntWidth <= responsiveOptions.medium) {
                size = Globals.responsiveBreakpoints.medium;
            }
        }
        return size;
    }
    /**
     * Destroy the whole dashboard, its layouts and elements.
     */
    destroy() {
        const board = this;
        // Destroy layouts.
        for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
            board.layouts[i].destroy();
        }
        // Remove resizeObserver from the board
        this.resizeObserver?.unobserve(board.container);
        // Destroy container.
        board.container.remove();
        // @ToDo Destroy bindings.
        // Delete all properties.
        objectEach(board, function (val, key) {
            delete board[key];
        });
        Globals.boards[this.index] = void 0;
        return;
    }
    /**
     * Export layouts to the local storage.
     */
    exportLocal() {
        localStorage.setItem(
        // Dashboard.prefix + this.id,
        Globals.classNamePrefix + '1', // temporary for demo test
        JSON.stringify(this.toJSON()));
    }
    /**
     * Import the dashboard's layouts from the local storage.
     *
     * @param id
     * The id of the layout to import.
     *
     * @returns Returns the imported layout.
     */
    importLayoutLocal(id) {
        return Layout.importLocal(id, this);
    }
    /**
     * Reflow the dashboard. Hide the toolbars and context pointer. Reflow the
     * layouts and its cells.
     */
    reflow() {
        const board = this, cntSize = board.getLayoutContainerSize();
        let layout;
        if (board.editMode) {
            board.editMode.hideToolbars(['cell', 'row']);
            board.editMode.hideContextPointer();
        }
        for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
            this.reflowLayout(board.layouts[i], cntSize);
        }
    }
    reflowLayout(layout, cntSize) {
        let row, cell;
        for (let j = 0, jEnd = layout.rows.length; j < jEnd; ++j) {
            row = layout.rows[j];
            for (let k = 0, kEnd = row.cells.length; k < kEnd; ++k) {
                cell = row.cells[k];
                cell.reflow(cntSize);
                if (cell.nestedLayout) {
                    this.reflowLayout(cell.nestedLayout, cntSize);
                }
            }
        }
    }
    /**
     * Converts the given JSON to a class instance.
     *
     * @param json
     * JSON to deserialize as a class instance or object.
     *
     * @returns Returns the class instance or object.
     */
    fromJSON(json) {
        const options = json.options, board = new Board(options.containerId, {
            componentOptions: options.componentOptions,
            responsiveBreakpoints: options.responsiveBreakpoints,
            dataPool: options.dataPool,
            layoutsJSON: options.layouts
        });
        board.dataCursor = DataCursorHelper.fromJSON(json.dataCursor);
        return board;
    }
    /**
     * Converts the class instance to a class JSON.
     *
     * @returns Class JSON of this Dashboard instance.
     */
    toJSON() {
        const board = this, layouts = [];
        // Get layouts JSON.
        for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
            layouts.push(board.layouts[i].toJSON());
        }
        return {
            $class: 'Board',
            dataCursor: DataCursorHelper.toJSON(board.dataCursor),
            options: {
                containerId: board.container.id,
                dataPool: board.options.dataPool,
                guiEnabled: board.guiEnabled,
                layouts: layouts,
                componentOptions: board.options.componentOptions,
                responsiveBreakpoints: board.options.responsiveBreakpoints
            }
        };
    }
    /**
     * Convert the current state of board's options into JSON. The function does
     * not support converting functions or events into JSON object.
     *
     * @returns
     * The JSON of boards's options.
     */
    getOptions() {
        const board = this, layouts = [], components = [];
        for (let i = 0, iEnd = board.layouts.length; i < iEnd; ++i) {
            layouts.push(board.layouts[i].getOptions());
        }
        for (let i = 0, iEnd = board.mountedComponents.length; i < iEnd; ++i) {
            if (board.mountedComponents[i].cell &&
                board.mountedComponents[i].cell.mountedComponent) {
                components.push(board.mountedComponents[i].component.getOptions());
            }
        }
        return {
            ...this.options,
            gui: {
                layouts
            },
            components: components
        };
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
(function (Board) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Global dashboard settings.
     * @internal
     *
     */
    Board.defaultOptions = {
        gui: {
            enabled: true,
            layoutOptions: {
                rowClassName: void 0,
                cellClassName: void 0
            },
            layouts: []
        },
        components: [],
        responsiveBreakpoints: {
            small: 576,
            medium: 992,
            large: 1200
        }
    };
    /**
     * @internal
     */
    Board.componentTypes = ComponentRegistry.types;
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Import layouts from the local storage.
     *
     * @returns Returns the Dashboard instance or undefined.
     */
    function importLocal() {
        const dashboardJSON = localStorage.getItem(
        // Dashboard.prefix + this.id,
        Globals.classNamePrefix + '1' // temporary for demo test
        );
        if (dashboardJSON) {
            try {
                return Serializable
                    .fromJSON(JSON.parse(dashboardJSON));
            }
            catch (e) {
                // nothing to do
            }
        }
    }
    Board.importLocal = importLocal;
})(Board || (Board = {}));
/* *
 *
 *  Registry
 *
 * */
Serializable.registerClassPrototype('Board', Board.prototype);
ComponentRegistry.registerComponent('HTML', HTMLComponent);
/* *
 *
 *  Default Export
 *
 * */
export default Board;
