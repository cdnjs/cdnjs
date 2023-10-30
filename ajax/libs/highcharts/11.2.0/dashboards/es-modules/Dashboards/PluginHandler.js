/* *
 *
 *  (c) 2009 - 2023 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */
'use strict';
import Board from './Board.js';
import Sync from './Components/Sync/Sync.js';
import ComponentRegistry from './Components/ComponentRegistry.js';
/* *
 *
 *  Namespace
 *
 * */
var PluginHandler;
(function (PluginHandler) {
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
    /** @internal */
    PluginHandler.registry = {};
    /**
     * Revision of the Dashboard plugin API.
     *
     * @internal
     */
    PluginHandler.revision = 0;
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a dashboard plugin.
     *
     * @param {Dashboards.Plugin} plugin
     * Dashboard plugin to register.
     *
     * @param {string} [key]
     * Plugin key for the registry. (Default: `plugin.name`)
     */
    function addPlugin(plugin, key = plugin.name) {
        const { maxRevision, minRevision, onRegister } = plugin;
        if (PluginHandler.registry[key]) {
            // only throw error with custom key
            if (key !== plugin.name) {
                throw new Error(`Plugin '${key}' already registered.`);
            }
            return;
        }
        if ((typeof minRevision === 'number' && minRevision > PluginHandler.revision) ||
            (typeof maxRevision === 'number' && maxRevision < PluginHandler.revision)) {
            throw new Error(`Plugin '${key}' does not support revision ${PluginHandler.revision}.`);
        }
        onRegister({
            Board,
            ComponentRegistry,
            Sync,
            revision: PluginHandler.revision
        });
        PluginHandler.registry[key] = plugin;
    }
    PluginHandler.addPlugin = addPlugin;
    /**
     * Removes a dashboard plugin.
     *
     * @param {string} key
     * Plugin key in the registry.
     */
    function removePlugin(key) {
        if (PluginHandler.registry[key]) {
            PluginHandler.registry[key].onUnregister({
                ComponentRegistry: ComponentRegistry,
                Board,
                Sync,
                revision: PluginHandler.revision
            });
            delete PluginHandler.registry[key];
        }
    }
    PluginHandler.removePlugin = removePlugin;
})(PluginHandler || (PluginHandler = {}));
/* *
 *
 *  Default Export
 *
 * */
export default PluginHandler;
