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
import ComponentRegistry from '../Components/ComponentRegistry.js';
import Globals from '../Globals.js';
import U from '../../Core/Utilities.js';
const { addEvent, fireEvent, error } = U;
/* *
 *
 *  Namespace
 *
 * */
var Bindings;
(function (Bindings) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    function getGUIElement(idOrElement) {
        const container = typeof idOrElement === 'string' ?
            document.getElementById(idOrElement) : idOrElement;
        let guiElement;
        if (container !== null) {
            fireEvent(container, 'bindedGUIElement', {}, function (e) {
                guiElement = e.guiElement;
            });
        }
        return guiElement;
    }
    async function addComponent(options, cell) {
        const optionsStates = options.states;
        const optionsEvents = options.events;
        cell = cell || Bindings.getCell(options.cell || '');
        if (!cell?.container || !options.type) {
            error(`The component is misconfigured and is unable to find the
                HTML cell element ${options.cell} to render the content.`);
            return;
        }
        const componentContainer = cell.container;
        let ComponentClass = ComponentRegistry.types[options.type];
        if (!ComponentClass) {
            error(`The component's type ${options.type} does not exist.`);
            ComponentClass =
                ComponentRegistry.types['HTML'];
            options.title = {
                text: cell.row.layout.board?.editMode?.lang.errorMessage,
                className: Globals.classNamePrefix + 'component-title-error ' +
                    Globals.classNamePrefix + 'component-title'
            };
        }
        const component = new ComponentClass(cell, options);
        const promise = component.load()['catch']((e) => {
            // eslint-disable-next-line no-console
            console.error(e);
            component.update({
                connector: {
                    id: ''
                },
                title: {
                    text: cell?.row.layout.board?.editMode?.lang.errorMessage,
                    className: Globals.classNamePrefix + 'component-title-error ' +
                        Globals.classNamePrefix + 'component-title'
                }
            });
        });
        fireEvent(component, 'mount');
        component.setCell(cell);
        cell.mountedComponent = component;
        cell.row.layout.board.mountedComponents.push({
            options: options,
            component: component,
            cell: cell
        });
        // events
        if (optionsEvents && optionsEvents.click) {
            addEvent(componentContainer, 'click', () => {
                optionsEvents.click();
                if (cell &&
                    component &&
                    componentContainer &&
                    optionsStates &&
                    optionsStates.active) {
                    cell.setActiveState();
                }
            });
        }
        // states
        if (optionsStates?.hover) {
            componentContainer.classList.add(Globals.classNames.cellHover);
        }
        fireEvent(component, 'afterLoad');
        return promise;
    }
    Bindings.addComponent = addComponent;
    /** @internal */
    function componentFromJSON(json, cellContainer // @todo
    ) {
        let componentClass = ComponentRegistry.types[json.$class];
        if (!componentClass) {
            return;
        }
        const cell = Bindings.getCell(json.options.cell || '');
        if (!cell) {
            return;
        }
        const component = componentClass.fromJSON(json, cell);
        if (component) {
            component.render();
        }
        return component;
    }
    Bindings.componentFromJSON = componentFromJSON;
    function getCell(idOrElement) {
        const cell = getGUIElement(idOrElement);
        if (!(cell && cell.getType() === 'cell')) {
            return;
        }
        return cell;
    }
    Bindings.getCell = getCell;
    function getRow(idOrElement) {
        const row = getGUIElement(idOrElement);
        if (!(row && row.getType() === 'row')) {
            return;
        }
        return row;
    }
    Bindings.getRow = getRow;
    function getLayout(idOrElement) {
        const layout = getGUIElement(idOrElement);
        if (!(layout && layout.getType() === 'layout')) {
            return;
        }
        return layout;
    }
    Bindings.getLayout = getLayout;
})(Bindings || (Bindings = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Bindings;
