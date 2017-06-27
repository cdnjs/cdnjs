/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/BaseTypes.js
 */

/** api: (define)
 *  module = GeoExt.data
 *  class = ProtocolProxy
 *  base_link = `Ext.data.DataProxy <http://dev.sencha.com/deploy/dev/docs/?class=Ext.data.DataProxy>`_
 */
Ext.namespace('GeoExt', 'GeoExt.data');

GeoExt.data.ProtocolProxy = function(config) {
    Ext.apply(this, config);
    GeoExt.data.ProtocolProxy.superclass.constructor.apply(this, arguments);
};

/** api: constructor
 *  .. class:: ProtocolProxy
 *   
 *      A data proxy for use with ``OpenLayers.Protocol`` objects.
 */
Ext.extend(GeoExt.data.ProtocolProxy, Ext.data.DataProxy, {

    /** api: config[protocol]
     *  ``OpenLayers.Protocol``
     *  The protocol used to fetch features.
     */
    protocol: null,

    /** api: config[abortPrevious]
     *  ``Boolean``
     *  Abort any previous request before issuing another.  Default is ``true``.
     */
    abortPrevious: true,

    /** api: config[setParamsAsOptions]
     *  ``Boolean``
     *  Should options.params be set directly on options before passing it into
     *  the protocol's read method? Default is ``false``.
     */
    setParamsAsOptions: false,

    /** private: property[response]
     *  ``OpenLayers.Protocol.Response``
     *  The response returned by the read call on the protocol.
     */
    response: null,

    /** private: method[load]
     *  :param params: ``Object`` An object containing properties which are to
     *      be used as HTTP parameters for the request to the remote server.
     *  :param reader: ``Ext.data.DataReader`` The Reader object which converts
     *      the data object into a block of ``Ext.data.Records``.
     *  :param callback: ``Function`` The function into which to pass the block
     *      of ``Ext.data.Records``. The function is passed the Record block
     *      object, the ``args`` argument passed to the load function, and a
     *      boolean success indicator.
     *  :param scope: ``Object`` The scope in which to call the callback.
     *  :param arg: ``Object`` An optional argument which is passed to the
     *      callback as its second parameter.
     *
     *  Calls ``read`` on the protocol.
     */
    load: function(params, reader, callback, scope, arg) {
        if (this.fireEvent("beforeload", this, params) !== false) {
            var o = {
                params: params || {},
                request: {
                    callback: callback,
                    scope: scope,
                    arg: arg
                },
                reader: reader
            };
            var cb = OpenLayers.Function.bind(this.loadResponse, this, o);
            if (this.abortPrevious) {
                this.abortRequest();
            }
            var options = {
                params: params,
                callback: cb,
                scope: this
            };
            Ext.applyIf(options, arg);
            if (this.setParamsAsOptions === true) {
                Ext.applyIf(options, options.params);
                delete options.params;
            }
            this.response = this.protocol.read(options);
        } else {
           callback.call(scope || this, null, arg, false);
        }
    },

    /** private: method[abortRequest]
     *  Called to abort any ongoing request.
     */
    abortRequest: function() {
        if (this.response) {
            this.protocol.abort(this.response);
            this.response = null;
        }
    },

    /** private: method[loadResponse]
     *  :param o: ``Object``
     *  :param response: ``OpenLayers.Protocol.Response``
     *  
     *  Handle response from the protocol
     */
    loadResponse: function(o, response) {
        if (response.success()) {
            var result = o.reader.read(response);
            this.fireEvent("load", this, o, o.request.arg);
            o.request.callback.call(
               o.request.scope, result, o.request.arg, true);
        } else {
            this.fireEvent("loadexception", this, o, response);
            o.request.callback.call(
                o.request.scope, null, o.request.arg, false);
        }
    }
});
