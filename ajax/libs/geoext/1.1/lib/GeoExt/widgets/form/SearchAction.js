/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt.form
 *  class = SearchAction
 *  base_link = `Ext.form.Action <http://dev.sencha.com/deploy/dev/docs/?class=Ext.form.Action>`_
 */

/**
 * @include GeoExt/widgets/form.js
 */

Ext.namespace("GeoExt.form");
 
/** api: example
 *  Sample code showing how to use a GeoExt SearchAction with an Ext form panel:
 *  
 *  .. code-block:: javascript
 *
 *      var formPanel = new Ext.form.Panel({
 *          renderTo: "formpanel",
 *          items: [{
 *              xtype: "textfield",
 *              name: "name__like",
 *              value: "mont"
 *          }, {
 *              xtype: "textfield",
 *              name: "elevation__ge",
 *              value: "2000"
 *          }]
 *      });
 *
 *      var searchAction = new GeoExt.form.SearchAction(formPanel.getForm(), {
 *          protocol: new OpenLayers.Protocol.WFS({
 *              url: "http://publicus.opengeo.org/geoserver/wfs",
 *              featureType: "tasmania_roads",
 *              featureNS: "http://www.openplans.org/topp"
 *          }),
 *          abortPrevious: true
 *      });
 *
 *      formPanel.getForm().doAction(searchAction, {
 *          callback: function(response) {
 *              // response.features includes the features read
 *              // from the server through the protocol
 *          }
 *      });
 */

/** api: constructor
 *  .. class:: SearchAction(form, options)
 *
 *      A specific ``Ext.form.Action`` to be used when using a form to do
 *      trigger search requests througn an ``OpenLayers.Protocol``.
 *
 *      Arguments:
 *
 *      * form ``Ext.form.BasicForm`` A basic form instance.
 *      * options ``Object`` Options passed to the protocol'read method
 *            One can add an abortPrevious property to these options, if set
 *            to true, the abort method will be called on the protocol if
 *            there's a pending request.
 *
 *      When run this action builds an ``OpenLayers.Filter`` from the form
 *      and passes this filter to its protocol's read method. The form fields
 *      must be named after a specific convention, so that an appropriate 
 *      ``OpenLayers.Filter.Comparison`` filter is created for each
 *      field.
 *
 *      For example a field with the name ``foo__like`` would result in an
 *      ``OpenLayers.Filter.Comparison`` of type
 *      ``OpenLayers.Filter.Comparison.LIKE`` being created.
 *
 *      Here is the convention:
 *
 *      * ``<name>__eq: OpenLayers.Filter.Comparison.EQUAL_TO``
 *      * ``<name>__ne: OpenLayers.Filter.Comparison.NOT_EQUAL_TO``
 *      * ``<name>__lt: OpenLayers.Filter.Comparison.LESS_THAN``
 *      * ``<name>__le: OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO``
 *      * ``<name>__gt: OpenLayers.Filter.Comparison.GREATER_THAN``
 *      * ``<name>__ge: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO``
 *      * ``<name>__like: OpenLayers.Filter.Comparison.LIKE``
 *
 *      In most cases your would not directly create ``GeoExt.form.SearchAction``
 *      objects, but use :class:`GeoExt.form.FormPanel` instead.
 */
GeoExt.form.SearchAction = Ext.extend(Ext.form.Action, {
    /** private: property[type]
     *  ``String`` The action type string.
     */
    type: "search",

    /** api: property[response]
     *  ``OpenLayers.Protocol.Response`` A reference to the response
     *  resulting from the search request. Read-only.
     */
    response: null,

    /** private */
    constructor: function(form, options) {
        GeoExt.form.SearchAction.superclass.constructor.call(this, form, options);
    },

    /** private: method[run]
     *  Run the action.
     */
    run: function() {
        var o = this.options;
        var f = GeoExt.form.toFilter(this.form, o.logicalOp, o.wildcard);
        if(o.clientValidation === false || this.form.isValid()){

            if (o.abortPrevious && this.form.prevResponse) {
                o.protocol.abort(this.form.prevResponse);
            }

            this.form.prevResponse = o.protocol.read(
                Ext.applyIf({
                    filter: f,
                    callback: this.handleResponse,
                    scope: this
                }, o)
            );

        } else if(o.clientValidation !== false){
            // client validation failed
            this.failureType = Ext.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    },

    /** private: method[handleResponse]
     *  :param response: ``OpenLayers.Protocol.Response`` The response
     *  object.
     *
     *  Handle the response to the search query.
     */
    handleResponse: function(response) {
        this.form.prevResponse = null;
        this.response = response;
        if(response.success()) {
            this.form.afterAction(this, true);
        } else {
            this.form.afterAction(this, false);
        }
        var o = this.options;
        if(o.callback) {
            o.callback.call(o.scope, response);
        }
    }
});
