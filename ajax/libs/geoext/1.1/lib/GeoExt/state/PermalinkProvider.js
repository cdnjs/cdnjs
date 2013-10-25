/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Util.js
 */

/** api: (define)
 *  module = GeoExt.state
 *  class = PermalinkProvider
 *  base_link = `Ext.state.Provider <http://dev.sencha.com/deploy/dev/docs/?class=Ext.state.Provider>`_
 */
Ext.namespace("GeoExt.state");

/** api: example
 *  Sample code displaying a new permalink each time the map is moved.
 *
 *  .. code-block:: javascript
 *
 *      // create permalink provider
 *      var permalinkProvider = new GeoExt.state.PermalinkProvider();
 *
 *      // set it in the state manager
 *      Ext.state.Manager.setProvider(permalinkProvider);
 *
 *      // create a map panel, and make it stateful
 *      var mapPanel = new GeoExt.MapPanel({
 *          renderTo: "map",
 *          layers: [
 *              new OpenLayers.Layer.WMS(
 *                  "Global Imagery",
 *                  "http://maps.opengeo.org/geowebcache/service/wms",
 *                  {layers: "bluemarble"}
 *              )
 *          ],
 *          stateId: "map",
 *          prettyStateKeys: true // for pretty permalinks
 *      });
 *
 *      // display permalink each time state is changed
 *      permalinkProvider.on({
 *          statechanged: function(provider, name, value) {
 *              alert(provider.getLink());
 *          }
 *      });
 */

/** api: constructor
 *  .. class:: PermalinkProvider(config)
 *
 *      Create a permalink provider.
 *
 */
GeoExt.state.PermalinkProvider = function(config) {
    GeoExt.state.PermalinkProvider.superclass.constructor.apply(this, arguments);

    config = config || {};

    var url = config.url;
    delete config.url;

    Ext.apply(this, config);

    this.state = this.readURL(url);
};

Ext.extend(GeoExt.state.PermalinkProvider, Ext.state.Provider, {

    /** api: config[encodeType]
     *  ``Boolean`` Specifies whether type of state values should be encoded
     *  and decoded. Set it to false if you work with components that don't
     *  require encoding types, and want pretty permalinks. Defaults to true.
     */
    /** private: property[encodeType]
     *  ``Boolean``
     */
    encodeType: true,

    /** private: method[readURL]
     *  :param url: ``String`` The URL to get the state from.
     *  :return: ``Object`` The state object.
     *
     *  Create a state object from a URL.
     */
    readURL: function(url) {
        var state = {};
        var params = OpenLayers.Util.getParameters(url);
        var k, split, stateId;
        for(k in params) {
            if(params.hasOwnProperty(k)) {
                split = k.split("_");
                if(split.length > 1) {
                    stateId = split[0];
                    state[stateId] = state[stateId] || {};
                    state[stateId][split.slice(1).join("_")] = this.encodeType ?
                        this.decodeValue(params[k]) : params[k];
                }
            }
        }
        return state;
    },

    /** api: method[getLink]
     *  :param base: ``String`` The base URL, optional.
     *  :return: ``String`` The permalink.
     *
     *  Return the permalink corresponding to the current state.
     */
    getLink: function(base) {
        base = base || document.location.href;

        var params = {};

        var id, k, state = this.state;
        for(id in state) {
            if(state.hasOwnProperty(id)) {
                for(k in state[id]) {
                    params[id + "_" + k] = this.encodeType ?
                        unescape(this.encodeValue(state[id][k])) : state[id][k];
                }
            }
        }

        // merge params in the URL into the state params
        OpenLayers.Util.applyDefaults(
            params, OpenLayers.Util.getParameters(base));

        var paramsStr = OpenLayers.Util.getParameterString(params);

        var qMark = base.indexOf("?");
        if(qMark > 0) {
            base = base.substring(0, qMark);
        }

        return Ext.urlAppend(base, paramsStr);
    }
});
