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
/* *
 *
 *  Namespace
 *
 * */
/**
 * Global Dashboards namespace in classic `<scripts>`-based implementations.
 *
 * @namespace Dashboards
 */
var Globals;
(function (Globals) {
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
     * Prefix of a GUIElement HTML class name.
     */
    Globals.classNamePrefix = 'highcharts-dashboards-';
    /** @internal */
    Globals.classNames = {
        layout: Globals.classNamePrefix + 'layout',
        cell: Globals.classNamePrefix + 'cell',
        cellHover: Globals.classNamePrefix + 'cell-state-hover',
        cellActive: Globals.classNamePrefix + 'cell-state-active',
        cellLoading: Globals.classNamePrefix + 'cell-state-loading',
        row: Globals.classNamePrefix + 'row',
        layoutsWrapper: Globals.classNamePrefix + 'layouts-wrapper',
        boardContainer: Globals.classNamePrefix + 'wrapper'
    };
    /** @internal */
    Globals.guiElementType = {
        row: 'row',
        cell: 'cell',
        layout: 'layout'
    };
    /** @internal */
    Globals.responsiveBreakpoints = {
        small: 'small',
        medium: 'medium',
        large: 'large'
    };
    /**
     * Contains all Board instances of this window.
     */
    Globals.boards = [];
    /**
     * Reference to the window used by Dashboards.
     */
    Globals.win = window;
})(Globals || (Globals = {}));
/* *
 *
 *  Default Export
 *
 * */
export default Globals;
