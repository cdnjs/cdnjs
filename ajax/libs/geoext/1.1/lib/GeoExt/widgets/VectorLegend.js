/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/FeatureRenderer.js
 * @requires GeoExt/widgets/LayerLegend.js
 * @requires OpenLayers/Style.js
 * @requires OpenLayers/Rule.js
 * @requires OpenLayers/Layer/Vector.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = VectorLegend
 */

/** api: (extends)
 * GeoExt/widgets/LayerLegend.js
 */

Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: VectorLegend(config)
 *
 *      Create a vector legend.
 */
GeoExt.VectorLegend = Ext.extend(GeoExt.LayerLegend, {

    /** api: config[layerRecord]
     *  :class:`GeoExt.data.LayerRecord`
     *  The record containing a vector layer that this legend will be based on.  
     *  One of ``layerRecord``, ``layer``,  or ``rules`` must be specified in 
     *  the config.
     */
    layerRecord: null,
    
    /** api: config[layer]
     *  ``OpenLayers.Layer.Vector``
     *  The layer that this legend will be based on.  One of ``layer``, 
     *  ``rules``, or ``layerRecord`` must be specified in the config.
     */
    layer: null,

    /** api: config[rules]
     * ``Array(OpenLayers.Rule)``
     *  List of rules.  One of ``rules``, ``layer``, or ``layerRecord`` must be 
     *  specified in the config.  The ``symbolType`` property must also be
     *  provided if only ``rules`` are given in the config.
     */
    rules: null,
    
    /** api: config[symbolType]
     *  ``String``
     *  The symbol type for legend swatches.  Must be one of ``"Point"``, 
     *  ``"Line"``, or ``"Polygon"``.  If not provided, the ``layer`` or
     *  ``layerRecord`` config property must be specified, and the geometry type
     *  of the first feature found on the layer will be used. If a rule does
     *  not have a symbolizer for ``symbolType``, we look at the symbolizers
     *  for the rule, and see if it has a ``"Point"``, ``"Line"`` or
     *  ``"Polygon"`` symbolizer, which we use for rendering a swatch of the
     *  respective geometry type. 
     */
    symbolType: null,

    /** api: config[untitledPrefix]
     *  ``String``
     *  The prefix to use as a title for rules with no title or
     *  name.  Default is ``"Untitled "``.  Prefix will be appended with a
     *  number that corresponds to the index of the rule (1 for first rule).
     */
    untitledPrefix: "Untitled ",
    
    /** api: config[clickableSymbol]
     *  ``Boolean``
     *  Set cursor style to "pointer" for symbolizers.  Register for
     *  the ``symbolclick`` event to handle clicks.  Note that click events
     *  are fired regardless of this value.  If ``false``, no cursor style will
     *  be set.  Default is ``false``.
     */
    clickableSymbol: false,
    
    /** api: config[clickableTitle]
     *  ``Boolean``
     *  Set cursor style to "pointer" for rule titles.  Register for
     *  the ``titleclick`` event to handle clicks.  Note that click events
     *  are fired regardless of this value.  If ``false``, no cursor style will
     *  be set.  Default is ``false``.
     */
    clickableTitle: false,
    
    /** api: config[selectOnClick]
     *  ``Boolean``
     *  Set to true if a rule should be selected by clicking on the
     *  symbol or title. Selection will trigger the ruleselected event, and
     *  a click on a selected rule will unselect it and trigger the
     *  ``ruleunselected`` event. Default is ``false``.
     */
    selectOnClick: false,
    
    /** api: config[enableDD]
     *  ``Boolean``
     *  Allow drag and drop of rules. Default is ``false``.
     */
    enableDD: false,
    
    /** api: config[bodyBorder]
     *  ``Boolean``
     *  Show a border around the legend panel. Default is ``false``.
     */
    bodyBorder: false,

    /** private: property[feature]
     *  ``OpenLayers.Feature.Vector``
     *  Cached feature for rendering.
     */
    feature: null,
    
    /** private: property[selectedRule]
     *  ``OpenLayers.Rule``
     *  The rule that is currently selected.
     */
    selectedRule: null,

    /** private: property[currentScaleDenominator]
     *  ``Number`` 
     *  The current scale denominator of any map associated with this
     *  legend.  Use :meth`setCurrentScaleDenominator` to change this.  If not
     *  set an entry for each rule will be rendered.  If set, only rules that
     *  apply for the given scale will be rendered.
     */
    currentScaleDenominator: null,
    
    /** private: method[initComponent]
     *  Initializes the Vector legend.
     */
    initComponent: function() {
        GeoExt.VectorLegend.superclass.initComponent.call(this);
        if (this.layerRecord) {
            this.layer = this.layerRecord.getLayer();
            if (this.layer.map) {
                this.map = this.layer.map;
                this.currentScaleDenominator = this.layer.map.getScale();
                this.layer.map.events.on({
                    "zoomend": this.onMapZoom,
                    scope: this
                });
            }
        }
        
        // determine symbol type
        if (!this.symbolType) {
            if (this.feature) {
                this.symbolType = this.symbolTypeFromFeature(this.feature);
            } else if (this.layer) {
                if (this.layer.features.length > 0) {
                    var feature = this.layer.features[0].clone();
                    feature.attributes = {};
                    this.feature = feature;
                    this.symbolType = this.symbolTypeFromFeature(this.feature);
                } else {
                    this.layer.events.on({
                        featuresadded: this.onFeaturesAdded,
                        scope: this
                    });
                }
            }
        }
        
        // set rules if not provided
        if (this.layer && this.feature && !this.rules) {
            this.setRules();
        }

        this.rulesContainer = new Ext.Container({
            autoEl: {}
        });
        
        this.add(this.rulesContainer);
        
        this.addEvents(
            /** api: event[titleclick]
             *  Fires when a rule title is clicked.
             *
             *  Listener arguments:
             *  
             *  * comp - :class:`GeoExt.VectorLegend`` This component.
             *  * rule - ``OpenLayers.Rule`` The rule whose title was clicked.
             */
            "titleclick", 

            /** api: event[symbolclick]
             *  Fires when a rule symbolizer is clicked.
             *
             *  Listener arguments:
             *  
             *  * comp - :class:`GeoExt.VectorLegend`` This component.
             *  * rule - ``OpenLayers.Rule`` The rule whose symbol was clicked.
             */
            "symbolclick",

            /** api: event[ruleclick]
             *  Fires when a rule entry is clicked (fired with symbolizer or
             *  title click).
             *
             *  Listener arguments:
             *  
             *  * comp - :class:`GeoExt.VectorLegend`` This component.
             *  * rule - ``OpenLayers.Rule`` The rule that was clicked.
             */
            "ruleclick",
            
            /** api: event[ruleselected]
             *  Fires when a rule is clicked and ``selectOnClick`` is set to 
             *  ``true``.
             * 
             *  Listener arguments:
             *  
             *  * comp - :class:`GeoExt.VectorLegend`` This component.
             *  * rule - ``OpenLayers.Rule`` The rule that was selected.
             */
            "ruleselected",
            
            /** api: event[ruleunselected]
             *  Fires when the selected rule is clicked and ``selectOnClick`` 
             *  is set to ``true``, or when a rule is unselected by selecting a
             *  different one.
             * 
             *  Listener arguments:
             *  
             *  * comp - :class:`GeoExt.VectorLegend`` This component.
             *  * rule - ``OpenLayers.Rule`` The rule that was unselected.
             */
            "ruleunselected",
            
            /** api: event[rulemoved]
             *  Fires when a rule is moved.
             * 
             *  Listener arguments:
             *  
             *  * comp - :class:`GeoExt.VectorLegend`` This component.
             *  * rule - ``OpenLayers.Rule`` The rule that was moved.
             */
            "rulemoved"
        ); 
        
        this.update();
    },
    
    /** private: method[onMapZoom]
     *  Listener for map zoomend.
     */
    onMapZoom: function() {
        this.setCurrentScaleDenominator(
            this.layer.map.getScale()
        );
    },
    
    /** private: method[symbolTypeFromFeature]
     *  :arg feature:  ``OpenLayers.Feature.Vector``
     *
     *  Determine the symbol type given a feature.
     */
    symbolTypeFromFeature: function(feature) {
        var match = feature.geometry.CLASS_NAME.match(/Point|Line|Polygon/);
        return (match && match[0]) || "Point";
    },
    
    /** private: method[onFeaturesAdded]
     *  Set as a one time listener for the ``featuresadded`` event on the layer
     *  if it was provided with no features originally.
     */
    onFeaturesAdded: function() {
        this.layer.events.un({
            featuresadded: this.onFeaturesAdded,
            scope: this
        });
        var feature = this.layer.features[0].clone();
        feature.attributes = {};
        this.feature = feature;
        this.symbolType = this.symbolTypeFromFeature(this.feature);
        if (!this.rules) {
            this.setRules();
        }
        this.update();
    },
    
    /** private: method[setRules]
     *  Sets the ``rules`` property for this.  This is called when the component
     *  is constructed without rules.  Rules will be derived from the layer's 
     *  style map if it has one.
     */
    setRules: function() {
        var style = this.layer.styleMap && this.layer.styleMap.styles["default"];
        if (!style) {
            style = new OpenLayers.Style();
        }
        if (style.rules.length === 0) {
            this.rules = [
                new OpenLayers.Rule({
                    title: style.title,
                    symbolizer: style.createSymbolizer(this.feature)
                })
            ];
        } else {
            this.rules = style.rules;                
        }
    },
    
    /** api: method[setCurrentScaleDenominator]
     *  :arg scale: ``Number`` The scale denominator.
     *
     *  Set the current scale denominator.  This will hide entries for any
     *  rules that don't apply at the current scale.
     */
    setCurrentScaleDenominator: function(scale) {
        if (scale !== this.currentScaleDenominator) {
            this.currentScaleDenominator = scale;
            this.update();
        }
    },

    /** private: method[getRuleEntry]
     *  :arg rule: ``OpenLayers.Rule``
     *  :returns: ``Ext.Container``
     *
     *  Get the item corresponding to the rule.
     */
    getRuleEntry: function(rule) {
        return this.rulesContainer.items.get(this.rules.indexOf(rule));
    },

    /** private: method[addRuleEntry]
     *  :arg rule: ``OpenLayers.Rule``
     *  :arg noDoLayout: ``Boolean``  Don't call doLayout after adding rule.
     *      Default is ``false``.
     *
     *  Add a new rule entry in the rules container. This
     *  method does not add the rule to the rules array.
     */
    addRuleEntry: function(rule, noDoLayout) {
        this.rulesContainer.add(this.createRuleEntry(rule));
        if (!noDoLayout) {
            this.doLayout();
        }
    },

    /** private: method[removeRuleEntry]
     *  :arg rule: ``OpenLayers.Rule``
     *  :arg noDoLayout: ``Boolean``  Don't call doLayout after removing rule.
     *      Default is ``false``.
     *
     *  Remove a rule entry from the rules container, this
     *  method assumes the rule is in the rules array, and
     *  it does not remove the rule from the rules array.
     */
    removeRuleEntry: function(rule, noDoLayout) {
        var ruleEntry = this.getRuleEntry(rule);
        if (ruleEntry) {
            this.rulesContainer.remove(ruleEntry);
            if (!noDoLayout) {
                this.doLayout();
            }
        }
    },
    
    /** private: method[selectRuleEntry]
     */
    selectRuleEntry: function(rule) {
        var newSelection = rule != this.selectedRule;
        if (this.selectedRule) {
            this.unselect();
        }
        if (newSelection) {
            var ruleEntry = this.getRuleEntry(rule);
            ruleEntry.body.addClass("x-grid3-row-selected");
            this.selectedRule = rule;
            this.fireEvent("ruleselected", this, rule);
        }
    },
    
    /** private: method[unselect]
     */
    unselect: function() {
        this.rulesContainer.items.each(function(item, i) {
            if (this.rules[i] == this.selectedRule) {
                item.body.removeClass("x-grid3-row-selected");
                this.selectedRule = null;
                this.fireEvent("ruleunselected", this, this.rules[i]);
            }
        }, this);
    },

    /** private: method[createRuleEntry]
     */
    createRuleEntry: function(rule) {
        var applies = true;
        if (this.currentScaleDenominator != null) {
            if (rule.minScaleDenominator) {
                applies = applies && (this.currentScaleDenominator >= rule.minScaleDenominator);
            }
            if (rule.maxScaleDenominator) {
                applies = applies && (this.currentScaleDenominator < rule.maxScaleDenominator);
            }
        }
        return {
            xtype: "panel",
            layout: "column",
            border: false,
            hidden: !applies,
            bodyStyle: this.selectOnClick ? {cursor: "pointer"} : undefined,
            defaults: {
                border: false
            },
            items: [
                this.createRuleRenderer(rule),
                this.createRuleTitle(rule)
            ],
            listeners: {
                render: function(comp){
                    this.selectOnClick && comp.getEl().on({
                        click: function(comp){
                            this.selectRuleEntry(rule);
                        },
                        scope: this
                    });
                    if (this.enableDD == true) {
                        this.addDD(comp);
                    }
                },
                scope: this
            }
        };
    },

    /** private: method[createRuleRenderer]
     *  :arg rule: ``OpenLayers.Rule``
     *  :returns: ``GeoExt.FeatureRenderer``
     *
     *  Create a renderer for the rule.
     */
    createRuleRenderer: function(rule) {
        var types = [this.symbolType, "Point", "Line", "Polygon"];
        var type, haveType;
        var symbolizers = rule.symbolizers;
        if (!symbolizers) {
            // TODO: remove this when OpenLayers.Symbolizer is used everywhere
            var symbolizer = rule.symbolizer;
            for (var i=0, len=types.length; i<len; ++i) {
                type = types[i];
                if (symbolizer[type]) {
                    symbolizer = symbolizer[type];
                    haveType = true;
                    break;
                }
            }
            symbolizers = [symbolizer];
        } else {
            var Type;
            outer: for (var i=0, ii=types.length; i<ii; ++i) {
                type = types[i];
                Type = OpenLayers.Symbolizer[type];
                if (Type) {
                    for (var j=0, jj=symbolizers.length; j<jj; ++j) {
                        if (symbolizers[j] instanceof Type) {
                            haveType = true;
                            break outer;
                        }
                    }
                }
            }
        }
        return {
            xtype: "gx_renderer",
            symbolType: haveType ? type : this.symbolType,
            symbolizers: symbolizers,
            style: this.clickableSymbol ? {cursor: "pointer"} : undefined,
            listeners: {
                click: function() {
                    if (this.clickableSymbol) {
                        this.fireEvent("symbolclick", this, rule);
                        this.fireEvent("ruleclick", this, rule);
                    }
                },
                scope: this
            }
        };
    },

    /** private: method[createRuleTitle]
     *  :arg rule: ``OpenLayers.Rule``
     *  :returns: ``Ext.Component``
     *
     *  Create a title component for the rule.
     */
    createRuleTitle: function(rule) {
        return {
            cls: "x-form-item",
            style: "padding: 0.2em 0.5em 0;", // TODO: css
            bodyStyle: Ext.applyIf({background: "transparent"}, 
                this.clickableTitle ? {cursor: "pointer"} : undefined),
            html: this.getRuleTitle(rule),
            listeners: {
                render: function(comp) {
                    this.clickableTitle && comp.getEl().on({
                        click: function() {
                            this.fireEvent("titleclick", this, rule);
                            this.fireEvent("ruleclick", this, rule);
                        },
                        scope: this
                    });
                },
                scope: this
            }
        };
    },
    
    /** private: method[addDD]
     *  :arg component: ``Ext.Component``
     *
     *  Adds drag & drop functionality to a rule entry.
     */
    addDD: function(component) {
        var ct = component.ownerCt;
        var panel = this;
        new Ext.dd.DragSource(component.getEl(), {
            ddGroup: ct.id,
            onDragOut: function(e, targetId) {
                var target = Ext.getCmp(targetId);
                target.removeClass("gx-ruledrag-insert-above");
                target.removeClass("gx-ruledrag-insert-below");
                return Ext.dd.DragZone.prototype.onDragOut.apply(this, arguments);
            },
            onDragEnter: function(e, targetId) {
                var target = Ext.getCmp(targetId);
                var cls;
                var sourcePos = ct.items.indexOf(component);
                var targetPos = ct.items.indexOf(target);
                if (sourcePos > targetPos) {
                    cls = "gx-ruledrag-insert-above";
                } else if (sourcePos < targetPos) {
                    cls = "gx-ruledrag-insert-below";
                }                
                cls && target.addClass(cls);
                return Ext.dd.DragZone.prototype.onDragEnter.apply(this, arguments);
            },
            onDragDrop: function(e, targetId) {
                panel.moveRule(ct.items.indexOf(component),
                    ct.items.indexOf(Ext.getCmp(targetId)));
                return Ext.dd.DragZone.prototype.onDragDrop.apply(this, arguments);
            },
            getDragData: function(e) {
                var sourceEl = e.getTarget(".x-column-inner");
                if(sourceEl) {
                    var d = sourceEl.cloneNode(true);
                    d.id = Ext.id();
                    return {
                        sourceEl: sourceEl,
                        repairXY: Ext.fly(sourceEl).getXY(),
                        ddel: d
                    }
                }
            }
        });
        new Ext.dd.DropTarget(component.getEl(), {
            ddGroup: ct.id,
            notifyDrop: function() {
                return true;
            }
        });
    },
    
    /** api: method[update]
     *  Update rule titles and symbolizers.
     */
    update: function() {
        GeoExt.VectorLegend.superclass.update.apply(this, arguments);
        if (this.symbolType && this.rules) {
            if (this.rulesContainer.items) {
                var comp;
                for (var i=this.rulesContainer.items.length-1; i>=0; --i) {
                    comp = this.rulesContainer.getComponent(i);
                    this.rulesContainer.remove(comp, true);
                }
            }
            for (var i=0, ii=this.rules.length; i<ii; ++i) {
                this.addRuleEntry(this.rules[i], true);
            }
            this.doLayout();
            // make sure that the selected rule is still selected after update
            if (this.selectedRule) {
                this.getRuleEntry(this.selectedRule).body.addClass("x-grid3-row-selected");
            }
        }
    },

    /** private: method[updateRuleEntry]
     *  :arg rule: ``OpenLayers.Rule``
     *
     *  Update the renderer and the title of a rule.
     */
    updateRuleEntry: function(rule) {
        var ruleEntry = this.getRuleEntry(rule);
        if (ruleEntry) {
            ruleEntry.removeAll();
            ruleEntry.add(this.createRuleRenderer(rule));
            ruleEntry.add(this.createRuleTitle(rule));
            ruleEntry.doLayout();
        }
    },
    
    /** private: method[moveRule]
     */
    moveRule: function(sourcePos, targetPos) {
        var srcRule = this.rules[sourcePos];
        this.rules.splice(sourcePos, 1);
        this.rules.splice(targetPos, 0, srcRule);
        this.update();
        this.fireEvent("rulemoved", this, srcRule);
    },
    
    /** private: method[getRuleTitle]
     *  :returns: ``String``
     *
     *  Get a rule title given a rule.
     */
    getRuleTitle: function(rule) {
        var title = rule.title || rule.name || "";
        if (!title && this.untitledPrefix) {
            title = this.untitledPrefix + (this.rules.indexOf(rule) + 1);
        }
        return title;
    },

    /** private: method[beforeDestroy]
     *  Override.
     */
    beforeDestroy: function() {
        if (this.layer) {
            if (this.layer.events) {
                this.layer.events.un({
                    featuresadded: this.onFeaturesAdded,
                    scope: this
                });
            }
            if (this.layer.map && this.layer.map.events) {
                this.layer.map.events.un({
                    "zoomend": this.onMapZoom,
                    scope: this
                });
            }
        }
        delete this.layer;
        delete this.map;
        delete this.rules;
        GeoExt.VectorLegend.superclass.beforeDestroy.apply(this, arguments);
    },

    /** private: method[onStoreRemove]
     *  Handler for remove event of the layerStore
     *
     *  :param store: ``Ext.data.Store`` The store from which the record was
     *      removed.
     *  :param record: ``Ext.data.Record`` The record object corresponding
     *      to the removed layer.
     *  :param index: ``Integer`` The index in the store.
     */
    onStoreRemove: function(store, record, index) {
        if (record.getLayer() === this.layer) {
            if (this.map && this.map.events) {
                this.map.events.un({
                    "zoomend": this.onMapZoom,
                    scope: this
                });
    }
        }
    },

    /** private: method[onStoreAdd]
     *  Handler for add event of the layerStore
     *
     *  :param store: ``Ext.data.Store`` The store to which the record was
     *      added.
     *  :param records: Array(``Ext.data.Record``) The record object(s) corresponding
     *      to the added layer(s).
     *  :param index: ``Integer`` The index in the store at which the record
     *      was added.
     */
    onStoreAdd: function(store, records, index) {
        for (var i=0, len=records.length; i<len; i++) {
            var record = records[i];
            if (record.getLayer() === this.layer) {
                if (this.layer.map && this.layer.map.events) {
                    this.layer.map.events.on({
                        "zoomend": this.onMapZoom,
                        scope: this
});
                }
            }
        }
    }

});

/** private: method[supports]
 *  Private override
 */
GeoExt.VectorLegend.supports = function(layerRecord) {
    return layerRecord.getLayer() instanceof OpenLayers.Layer.Vector ? 1 : 0;
};

/** api: legendtype = gx_vectorlegend */
GeoExt.LayerLegend.types["gx_vectorlegend"] = GeoExt.VectorLegend;

/** api: xtype = gx_vectorlegend */
Ext.reg("gx_vectorlegend", GeoExt.VectorLegend); 
