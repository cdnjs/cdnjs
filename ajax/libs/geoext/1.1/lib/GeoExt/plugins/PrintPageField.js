/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */
Ext.namespace("GeoExt.plugins");

/** api: (define)
 *  module = GeoExt.plugins
 *  class = PrintPageField
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */

/** api: example
 *  A form with a combo box for the scale and text fields for rotation and a
 *  page title. The page title is a custom parameter of the print module's
 *  page configuration:
 * 
 *  .. code-block:: javascript
 *     
 *      var printPage = new GeoExt.data.PrintPage({
 *          printProvider: new GeoExt.data.PrintProvider({
 *              capabilities: printCapabilities
 *          })
 *      });
 *      new Ext.form.FormPanel({
 *          renderTo: "form",
 *          width: 200,
 *          height: 300,
 *          items: [{
 *              xtype: "combo",
 *              displayField: "name",
 *              store: printPage.scales, // printPage.scale
 *              name: "scale",
 *              fieldLabel: "Scale",
 *              typeAhead: true,
 *              mode: "local",
 *              forceSelection: true,
 *              triggerAction: "all",
 *              selectOnFocus: true,
 *              plugins: new GeoExt.plugins.PrintPageField({
 *                  printPage: printPage
 *              })
 *          }, {
 *              xtype: "textfield",
 *              name: "rotation", // printPage.rotation
 *              fieldLabel: "Rotation",
 *              plugins: new GeoExt.plugins.PrintPageField({
 *                  printPage: printPage
 *              })
 *          }, {
 *              xtype: "textfield",
 *              name: "mapTitle", // printPage.customParams["mapTitle"]
 *              fieldLabel: "Map Title",
 *              plugins: new GeoExt.plugins.PrintPageField({
 *                  printPage: printPage
 *              })
 *          }]
 *      });
 */

/** api: constructor
 *  .. class:: PrintPageField
 * 
 *  A plugin for ``Ext.form.Field`` components which provides synchronization
 *  with a :class:`GeoExt.data.PrintPage`. The field name has to match the
 *  respective property of the printPage (e.g. ``scale``, ``rotation``).
 */
GeoExt.plugins.PrintPageField = Ext.extend(Ext.util.Observable, {
    
    /** api: config[printPage]
     *  ``GeoExt.data.PrintPage`` The print page to synchronize with.
     */

    /** private: property[printPage]
     *  ``GeoExt.data.PrintPage`` The print page to synchronize with.
     *  Read-only.
     */
    printPage: null,
    
    /** private: property[target]
     *  ``Ext.form.Field`` This plugin's target field.
     */
    target: null,
    
    /** private: method[constructor]
     */
    constructor: function(config) {
        this.initialConfig = config;
        Ext.apply(this, config);
        
        GeoExt.plugins.PrintPageField.superclass.constructor.apply(this, arguments);
    },
    
    /** private: method[init]
     *  :param target: ``Ext.form.Field`` The component that this plugin
     *      extends.
     * @param {Object} target
     */
    init: function(target) {
        this.target = target;
        var onCfg = {
            "beforedestroy": this.onBeforeDestroy,
            scope: this
        };
        var eventName = target instanceof Ext.form.ComboBox ?
                            "select" : target instanceof Ext.form.Checkbox ?
                                "check" : "valid";
        onCfg[eventName] = this.onFieldChange;
        target.on(onCfg);
        this.printPage.on({
            "change": this.onPageChange,
            scope: this
        });
        this.printPage.printProvider.on({
            "layoutchange": this.onLayoutChange,
            scope: this
        });
        this.setValue(this.printPage);
    },

    /** private: method[onFieldChange]
     *  :param field: ``Ext.form.Field``
     *  :param record: ``Ext.data.Record`` Optional.
     *  
     *  Handler for the target field's "valid" or "select" event.
     */
    onFieldChange: function(field, record) {
        var printProvider = this.printPage.printProvider;
        var value = field.getValue();
        this._updating = true;
        if(field.store === printProvider.scales || field.name === "scale") {
            this.printPage.setScale(record);
        } else if(field.name == "rotation") {
            !isNaN(value) && this.printPage.setRotation(value);
        } else {
            this.printPage.customParams[field.name] = value;
        }
        delete this._updating;
    },

    /** private: method[onPageChange]
     *  :param printPage: :class:`GeoExt.data.PrintPage`
     *  
     *  Handler for the "change" event for the page this plugin is configured
     *  with.
     */
    onPageChange: function(printPage) {
        if(!this._updating) {
            this.setValue(printPage);
        }
    },
    
    /** private: method[onPageChange]
     *  :param printProvider: :class:`GeoExt.data.PrintProvider`
     *  :param layout: ``Ext.Record``
     *  
     *  Handler for the "layoutchange" event of the printProvider.
     */
    onLayoutChange: function(printProvider, layout) {
        var t = this.target;
        t.name == "rotation" && t.setDisabled(!layout.get("rotation"));
    },

    /** private: method[setValue]
     *  :param printPage: :class:`GeoExt.data.PrintPage`
     *
     *  Sets the value in the target field.
     */
    setValue: function(printPage) {
        var t = this.target;
        t.suspendEvents();
        if(t.store === printPage.printProvider.scales || t.name === "scale") {
            if(printPage.scale) {
                t.setValue(printPage.scale.get(t.displayField));
            }
        } else if(t.name == "rotation") {
            t.setValue(printPage.rotation);
        }
        t.resumeEvents();
    },

    /** private: method[onBeforeDestroy]
     */
    onBeforeDestroy: function() {
        this.target.un("beforedestroy", this.onBeforeDestroy, this);
        this.target.un("select", this.onFieldChange, this);
        this.target.un("valid", this.onFieldChange, this);
        this.printPage.un("change", this.onPageChange, this);
        this.printPage.printProvider.un("layoutchange", this.onLayoutChange,
            this);
    }

});

/** api: ptype = gx_printpagefield */
Ext.preg("gx_printpagefield", GeoExt.plugins.PrintPageField);
