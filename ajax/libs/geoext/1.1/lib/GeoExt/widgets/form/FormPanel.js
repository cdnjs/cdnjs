/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt.form
 *  class = FormPanel
 *  base_link = `Ext.form.FormPanel <http://dev.sencha.com/deploy/dev/docs/?class=Ext.form.FormPanel>`_
 */

/**
 * @include GeoExt/widgets/form/BasicForm.js
 */

Ext.namespace("GeoExt.form");

/** api: example
 *  Sample code showing how to use a GeoExt form panel.
 *
 *  .. code-block:: javascript
 *
 *      var formPanel = new GeoExt.form.FormPanel({
 *          renderTo: "formpanel",
 *          protocol: new OpenLayers.Protocol.WFS({
 *              url: "http://publicus.opengeo.org/geoserver/wfs",
 *              featureType: "tasmania_roads",
 *              featureNS: "http://www.openplans.org/topp"
 *          }),
 *          items: [{
 *              xtype: "textfield",
 *              name: "name__ilike",
 *              value: "mont"
 *          }, {
 *              xtype: "textfield",
 *              name: "elevation__ge",
 *              value: "2000"
 *          }],
 *          listeners: {
 *              actioncomplete: function(form, action) {
 *                  // this listener triggers when the search request
 *                  // is complete, the OpenLayers.Protocol.Response
 *                  // resulting from the request is available
 *                  // in "action.response"
 *              }
 *          }
 *      });
 *
 *      formPanel.addButton({
 *          text: "search",
 *          handler: function() {
 *              this.search();
 *          },
 *          scope: formPanel
 *      });
 */

/** api: constructor
 *  .. class:: FormPanel(config)
 *
 *      A specific ``Ext.form.FormPanel`` whose internal form is a
 *      :class:`GeoExt.form.BasicForm` instead of ``Ext.form.BasicForm``.
 *      One would use this form to do search requests through
 *      an ``OpenLayers.Protocol`` object (``OpenLayers.Protocol.WFS``
 *      for example).
 *
 *      Look at :class:`GeoExt.form.SearchAction` to understand how
 *      form fields must be named for appropriate filters to be
 *      passed to the protocol.
 */
GeoExt.form.FormPanel = Ext.extend(Ext.form.FormPanel, {
    /** api: config[protocol]
     *  ``OpenLayers.Protocol`` The protocol instance this form panel
     *  is configured with, actions resulting from this form
     *  will be performed through the protocol.
     */
    protocol: null,

    /** private: method[createForm]
     *  Create the internal :class:`GeoExt.form.BasicForm` instance.
     */
    createForm: function() {
        delete this.initialConfig.listeners;
        return new GeoExt.form.BasicForm(null, this.initialConfig);
    },

    /** api: method[search]
     *  :param options: ``Object`` The options passed to the
     *      :class:`GeoExt.form.SearchAction` constructor.
     *
     *  Shortcut to the internal form's search method.
     */
    search: function(options) {
        this.getForm().search(options);
    }
});

/** api: xtype = gx_formpanel */
Ext.reg("gx_formpanel", GeoExt.form.FormPanel);
