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
 *  class = PrintProviderField
 *  base_link = `Ext.util.Observable <http://dev.sencha.com/deploy/dev/docs/?class=Ext.util.Observable>`_
 */

/** api: example
 *  A form with combo boxes for layout and resolution, and a text field for a
 *  map title. The latter is a custom parameter to the print module, which is
 *  a default for all print pages. For setting custom parameters on the page
 *  level, use :class:`GeoExt.plugins.PrintPageField`):
 * 
 *  .. code-block:: javascript
 *     
 *      var printProvider = new GeoExt.data.PrintProvider({
 *          capabilities: printCapabilities
 *      });
 *      new Ext.form.FormPanel({
 *          renderTo: "form",
 *          width: 200,
 *          height: 300,
 *          items: [{
 *              xtype: "combo",
 *              displayField: "name",
 *              store: printProvider.layouts, // printProvider.layout
 *              fieldLabel: "Layout",
 *              typeAhead: true,
 *              mode: "local",
 *              forceSelection: true,
 *              triggerAction: "all",
 *              selectOnFocus: true,
 *              plugins: new GeoExt.plugins.PrintProviderField({
 *                  printProvider: printProvider
 *              })
 *          }, {
 *              xtype: "combo",
 *              displayField: "name",
 *              store: printProvider.dpis, // printProvider.dpi
 *              fieldLabel: "Resolution",
 *              typeAhead: true,
 *              mode: "local",
 *              forceSelection: true,
 *              triggerAction: "all",
 *              selectOnFocus: true,
 *              plugins: new GeoExt.plugins.PrintProviderField({
 *                  printProvider: printProvider
 *              })
 *          }, {
 *              xtype: "textfield",
 *              name: "mapTitle", // printProvider.customParams.mapTitle
 *              fieldLabel: "Map Title",
 *              plugins: new GeoExt.plugins.PrintProviderField({
 *                  printProvider: printProvider
 *              })
 *          }]
 *      }):
 */

/** api: constructor
 *  .. class:: PrintProviderField
 * 
 *  A plugin for ``Ext.form.Field`` components which provides synchronization
 *  with a :class:`GeoExt.data.PrintProvider`.
 */
GeoExt.plugins.PrintProviderField = Ext.extend(Ext.util.Observable, {
    
    /** api: config[printProvider]
     *  ``GeoExt.data.PrintProvider`` The print provider to use with this
     *  plugin's field. Not required if set on the owner container of the
     *  field.
     */
    
    /** private: property[target]
     *  ``Ext.form.Field`` This plugin's target field.
     */
    target: null,
    
    /** private: method[constructor]
     */
    constructor: function(config) {
        this.initialConfig = config;
        Ext.apply(this, config);
        
        GeoExt.plugins.PrintProviderField.superclass.constructor.apply(this, arguments);
    },
    
    /** private: method[init]
     *  :param target: ``Ext.form.Field`` The component that this plugin
     *      extends.
     */
    init: function(target) {
        this.target = target;
        var onCfg = {
            scope: this,
            "render": this.onRender,
            "beforedestroy": this.onBeforeDestroy
        };
        onCfg[target instanceof Ext.form.ComboBox ? "select" : "valid"] =
            this.onFieldChange;
        target.on(onCfg);
    },
    
    /** private: method[onRender]
     *  :param field: ``Ext.Form.Field``
     *  
     *  Handler for the target field's "render" event.
     */
    onRender: function(field) {
        var printProvider = this.printProvider || field.ownerCt.printProvider;
        if(field.store === printProvider.layouts) {
            field.setValue(printProvider.layout.get(field.displayField));
            printProvider.on({
                "layoutchange": this.onProviderChange,
                scope: this
            });
        } else if(field.store === printProvider.dpis) {
            field.setValue(printProvider.dpi.get(field.displayField));
            printProvider.on({
                "dpichange": this.onProviderChange,
                scope: this
            });
        } else if(field.initialConfig.value === undefined) {
            field.setValue(printProvider.customParams[field.name]);
        }
    },
    
    /** private: method[onFieldChange]
     *  :param field: ``Ext.form.Field``
     *  :param record: ``Ext.data.Record`` Optional.
     *  
     *  Handler for the target field's "valid" or "select" event.
     */
    onFieldChange: function(field, record) {
        var printProvider = this.printProvider || field.ownerCt.printProvider;
        var value = field.getValue();
        this._updating = true;
        if(record) {
            switch(field.store) {
                case printProvider.layouts:
                    printProvider.setLayout(record);
                    break;
                case printProvider.dpis:
                    printProvider.setDpi(record);
            }
        } else {
            printProvider.customParams[field.name] = value;
        }
        delete this._updating;
    },
    
    /** private: method[onProviderChange]
     *  :param printProvider: :class:`GeoExt.data.PrintProvider`
     *  :param rec: ``Ext.data.Record``
     *  
     *  Handler for the printProvider's dpichange and layoutchange event
     */
    onProviderChange: function(printProvider, rec) {
        if(!this._updating) {
            this.target.setValue(rec.get(this.target.displayField));
        }
    },
    
    /** private: method[onBeforeDestroy]
     */
    onBeforeDestroy: function() {
        var target = this.target;
        target.un("beforedestroy", this.onBeforeDestroy, this);
        target.un("render", this.onRender, this);
        target.un("select", this.onFieldChange, this);
        target.un("valid", this.onFieldChange, this);
        var printProvider = this.printProvider || target.ownerCt.printProvider;
        printProvider.un("layoutchange", this.onProviderChange, this);
        printProvider.un("dpichange", this.onProviderChange, this);
    }

});

/** api: ptype = gx_printproviderfield */
Ext.preg("gx_printproviderfield", GeoExt.plugins.PrintProviderField);
