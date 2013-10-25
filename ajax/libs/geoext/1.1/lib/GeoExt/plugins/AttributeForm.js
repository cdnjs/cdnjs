/**
 * Copyright (c) 2008-2009 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/*
 * @include GeoExt/widgets/form.js
 */

Ext.namespace("GeoExt.plugins");

/** api: (define)
 *  module = GeoExt.plugins
 *  class = AttributeForm
 */

/** api: example
 *  Sample code showing how to use an Ext form panel as a feature
 *  attribute form (for editing features for example).
 *
 *  .. code-block:: javascript
 *
 *      var formPanel = new Ext.form.FormPanel({
 *          autoScroll: true,
 *          height: 300,
 *          width: 350,
 *          defaults: {
 *              maxLengthText: "too long",
 *              minLengthText: "too short"
 *          }
 *          plugins: [
 *              new GeoExt.plugins.AttributeForm({
 *                  attributeStore: new GeoExt.data.AttributeStore({
 *                      url: "http://some.wfs",
 *                      baseParams: {
 *                          "SERVICE": "WFS",
 *                          "VERSION": "1.1.0",
 *                          "REQUEST": "DescribeFeatureType",
 *                          "TYPENAME": "the_typename"
 *                      }
 *                  })
 *              })
 *          ]
 *      });
 */

/** api: constructor
 *  .. class:: AttributeForm
 *
 *  This plugin allows creating form items from attribute records
 *  and fill a form panel with these items.
 */

GeoExt.plugins.AttributeForm = function(config) {
    Ext.apply(this, config);
};

GeoExt.plugins.AttributeForm.prototype = {

    /** api: config[attributeStore]
     *  ``Ext.data.Store`` The attribute store to bind to this plugin.
     *  It can be any Ext store configured with a
     *  :class:`GeoExt.data.AttributeReader`. If set form items
     *  will be created from the attribute records in the form. In
     *  most cases this store will be a :class:`GeoExt.data.AttributeStore`.
     */
    /** private: property[attributeStore]
     *  ``Ext.data.Store`` The attribute store.
     */
    attributeStore: null,

    /** private: property[formPanel]
     *  ``Ext.form.FormPanel`` This form panel.
     */
    formPanel: null,
    
    /** api: config[recordToFieldOptions]
     *  ``Object`` Options to pass on to :meth:`GeoExt.form.recordToField`.
     */

    /** private: method[init]
     *  :param formPanel: class:`Ext.form.FormPanel`
     *
     *  Initializes the plugin.
     */
    init: function(formPanel) {
        this.formPanel = formPanel;
        if(this.attributeStore instanceof Ext.data.Store) {
            this.fillForm();
            this.bind(this.attributeStore);
        }
        formPanel.on("destroy", this.onFormDestroy, this);
    },

    /** private: method[bind]
     *  :param store: ``Ext.data.Store`` The attribute store this form panel
     *  is to be bound to.
     *
     *  Bind the panel to the attribute store passed as a parameter.
     */
    bind: function(store) {
        this.unbind();
        store.on({
            "load": this.onLoad,
            scope: this
        });
        this.attributeStore = store;
    },

    /** private: method[unbind]
     *
     *  Unbind the panel from the attribute store it is currently bound
     *  to, if any.
     */
    unbind: function() {
        if(this.attributeStore) {
            this.attributeStore.un("load", this.onLoad, this);
        }
    },

    /** private: method[onLoad]
     *
     *  Callback called when the store is loaded.
     */
    onLoad: function() {
        if(this.formPanel.items) {
            this.formPanel.removeAll();
        }
        this.fillForm();
    },

    /** private: method[fillForm]
     *
     *  For each attribute record in the attribute store create
     *  a form field and add it to the form.
     */
    fillForm: function() {
        this.attributeStore.each(function(record) {
            var field = GeoExt.form.recordToField(record, Ext.apply({
                checkboxLabelProperty: 'fieldLabel'
            }, this.recordToFieldOptions || {}));
            if(field) {
                this.formPanel.add(field);
            }
        }, this);
        this.formPanel.doLayout();
    },

    /** private: method[onFormDestroy]
     */
    onFormDestroy: function() {
        this.unbind();
    }
};

/** api: ptype = gx_attributeform */
Ext.preg("gx_attributeform", GeoExt.plugins.AttributeForm);
