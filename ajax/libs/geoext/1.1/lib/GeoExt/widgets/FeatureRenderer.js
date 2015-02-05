/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @require OpenLayers/Feature/Vector.js
 * @require OpenLayers/Geometry/Point.js
 * @require OpenLayers/Geometry/LineString.js
 * @require OpenLayers/Geometry/LinearRing.js
 * @require OpenLayers/Geometry/Polygon.js
 * @require OpenLayers/BaseTypes/Bounds.js
 * @require OpenLayers/BaseTypes/Size.js
 * @require OpenLayers/Renderer.js
 * @require OpenLayers/Symbolizer.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = FeatureRenderer
 *  base_link = `Ext.BoxComponent <http://dev.sencha.com/deploy/dev/docs/?class=Ext.BoxComponent>`_
 */
Ext.namespace('GeoExt');

/** api: constructor
 *  .. class:: FeatureRenderer(config)
 *   
 *      Create a box component for rendering a vector feature.
 */
GeoExt.FeatureRenderer = Ext.extend(Ext.BoxComponent, {

    /** api: config[feature]
     *  ``OpenLayers.Feature.Vector``
     *  Optional vector to be drawn.  If not provided, and if ``symbolizers``
     *  is configured with an array of plain symbolizer objects, ``symbolType``
     *  should be configured.
     */
    feature: undefined,
    
    /** api: config[symbolizers]
     *  ``Array(Object)``
     *  An array of ``OpenLayers.Symbolizer`` instances or plain symbolizer
     *  objects (in painters order) for rendering a  feature.  If no
     *  symbolizers are provided, the OpenLayers default will be used. If a
     *  symbolizer is an instance of ``OpenLayers.Symbolizer``, its type will
     *  override the symbolType for rendering.
     */
    symbolizers: [OpenLayers.Feature.Vector.style["default"]],

    /** api: config[symbolType]
     *  ``String``
     *  One of ``"Point"``, ``"Line"``, or ``"Polygon"``.  Only pertinent if 
     *  OpenLayers.Symbolizer objects are not used.  If ``feature``
     *  is provided, it will be preferred.  The default is "Polygon".
     */
    symbolType: "Polygon",
    
    /** private: property[resolution]
     *  ``Number``
     *  The resolution for the renderer.
     */
    resolution: 1,
    
    /** private: property[minWidth]
     *  ``Number``
     */
    minWidth: 20,

    /** private: property[minHeight]
     *  ``Number``
     */
    minHeight: 20,

    /** private: property[renderers]
     * ``Array(String)`` 
     *  List of supported Renderer classes. Add to this list to add support for 
     *  additional renderers. The first renderer in the list that returns 
     *  ``true`` for the ``supported`` method will be used, if not defined in 
     *  the ``renderer`` config property.
     */
    renderers: ["SVG", "VML", "Canvas"],

    /** private: property[rendererOptions]
     *  ``Object``
     *  Options for the renderer. See ``OpenLayers.Renderer`` for supported 
     *  options.
     */
    rendererOptions: null,
    
    /** private: property[pointFeature]
     *  ``OpenLayers.Feature.Vector``
     *  Feature with point geometry.
     */
    pointFeature: undefined,
    
    /** private: property[lineFeature]
     *  ``OpenLayers.Feature.Vector`` 
     *  Feature with LineString geometry.  Default zig-zag is provided.
     */
    lineFeature: undefined,

    /** private: property[polygonFeature]
     *  ``OpenLayers.Feature.Vector``
     *   Feature with Polygon geometry.  Default is a soft cornered rectangle.
     */
    polygonFeature: undefined,
    
    /** private: property[renderer]
     *  ``OpenLayers.Renderer``
     */
    renderer: null,

    /** private: method[initComponent]
     */
    initComponent: function() {
        GeoExt.FeatureRenderer.superclass.initComponent.apply(this, arguments);
        Ext.applyIf(this, {
            pointFeature: new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(0, 0)
            ),
            lineFeature: new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.LineString([
                    new OpenLayers.Geometry.Point(-8, -3),
                    new OpenLayers.Geometry.Point(-3, 3),
                    new OpenLayers.Geometry.Point(3, -3),
                    new OpenLayers.Geometry.Point(8, 3)
                ])
            ),
            polygonFeature: new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Polygon([
                    new OpenLayers.Geometry.LinearRing([
                        new OpenLayers.Geometry.Point(-8, -4),
                        new OpenLayers.Geometry.Point(-6, -6),
                        new OpenLayers.Geometry.Point(6, -6),
                        new OpenLayers.Geometry.Point(8, -4),
                        new OpenLayers.Geometry.Point(8, 4),
                        new OpenLayers.Geometry.Point(6, 6),
                        new OpenLayers.Geometry.Point(-6, 6),
                        new OpenLayers.Geometry.Point(-8, 4)
                    ])
                ])
            )
        });
        if(!this.feature) {
            this.setFeature(null, {draw: false});
        }
        this.addEvents(
            /** api: event[click]
             *  Fires when the feature is clicked on.
             *
             *  Listener arguments:
             *  
             *  * renderer - :class:`GeoExt.FeatureRenderer` This feature renderer.
             */
            "click"
        );
    },

    /** private: method[initCustomEvents]
     */
    initCustomEvents: function() {
        this.clearCustomEvents();
        this.el.on("click", this.onClick, this);
    },
    
    /** private: method[clearCustomEvents]
     */
    clearCustomEvents: function() {
        if (this.el && this.el.removeAllListeners) {
            this.el.removeAllListeners();            
        }
    },
    
    /** private: method[onClick]
     */
    onClick: function() {
        this.fireEvent("click", this);
    },

    /** private: method[onRender]
     */
    onRender: function(ct, position) {
        if(!this.el) {
            this.el = document.createElement("div");
            this.el.id = this.getId();
        }
        if(!this.renderer || !this.renderer.supported()) {  
            this.assignRenderer();
        }
        // monkey-patch renderer so we always get a resolution
        this.renderer.map = {
            getResolution: (function() {
                return this.resolution;
            }).createDelegate(this)
        };
        
        GeoExt.FeatureRenderer.superclass.onRender.apply(this, arguments);

        this.drawFeature();
    },

    /** private: method[afterRender]
     */
    afterRender: function() {
        GeoExt.FeatureRenderer.superclass.afterRender.apply(this, arguments);
        this.initCustomEvents();
    },

    /** private: method[onResize]
     */
    onResize: function(w, h) {
        this.setRendererDimensions();
        GeoExt.FeatureRenderer.superclass.onResize.apply(this, arguments);
    },
    
    /** private: method[setRendererDimensions]
     */
    setRendererDimensions: function() {
        var gb = this.feature.geometry.getBounds();
        var gw = gb.getWidth();
        var gh = gb.getHeight();
        /**
         * Determine resolution based on the following rules:
         * 1) always use value specified in config
         * 2) if not specified, use max res based on width or height of element
         * 3) if no width or height, assume a resolution of 1
         */
        var resolution = this.initialConfig.resolution;
        if(!resolution) {
            resolution = Math.max(gw / this.width || 0, gh / this.height || 0) || 1;
        }
        this.resolution = resolution;
        // determine height and width of element
        var width = Math.max(this.width || this.minWidth, gw / resolution);
        var height = Math.max(this.height || this.minHeight, gh / resolution);
        // determine bounds of renderer
        var center = gb.getCenterPixel();
        var bhalfw = width * resolution / 2;
        var bhalfh = height * resolution / 2;
        var bounds = new OpenLayers.Bounds(
            center.x - bhalfw, center.y - bhalfh,
            center.x + bhalfw, center.y + bhalfh
        );
        this.renderer.setSize(new OpenLayers.Size(Math.round(width), Math.round(height)));
        this.renderer.setExtent(bounds, true);
    },

    /** private: method[assignRenderer]
     *  Iterate through the available renderer implementations and selects 
     *  and assign the first one whose ``supported`` method returns ``true``.
     */
    assignRenderer: function()  {
        for(var i=0, len=this.renderers.length; i<len; ++i) {
            var Renderer = OpenLayers.Renderer[this.renderers[i]];
            if(Renderer && Renderer.prototype.supported()) {
                this.renderer = new Renderer(
                    this.el, this.rendererOptions
                );
                break;
            }  
        }  
    },
    
    /** api: method[setSymbolizers]
     *  :arg symbolizers: ``Array(Object)`` An array of symbolizers
     *  :arg options: ``Object``
     *
     *  Update the symbolizers used to render the feature.
     *
     *  Valid options:
     *  
     *  * draw - ``Boolean`` Draw the feature after setting it.  Default is ``true``.
     */
    setSymbolizers: function(symbolizers, options) {
        this.symbolizers = symbolizers;
        if(!options || options.draw) {
            this.drawFeature();
        }
    },
    
    /** api: method[setSymbolType]
     *  :arg type: ``String`` One of the ``symbolType`` strings.
     *  :arg options: ``Object``
     * 
     *  Create a new feature based on the geometry type and render it.
     *
     *  Valid options:
     *  
     *  * draw - ``Boolean`` Draw the feature after setting it.  Default is ``true``.
     */
    setSymbolType: function(type, options) {
        this.symbolType = type;
        this.setFeature(null, options);
    },
    
    /** api: method[setFeature]
     *  :arg feature: ``OpenLayers.Feature.Vector`` The feature to be rendered.  
     *      If none is provided, one will be created based on ``symbolType``.
     *  :arg options: ``Object``
     *
     *  Update the feature and redraw.
     *
     *  Valid options:
     *  
     *  * draw - ``Boolean`` Draw the feature after setting it.  Default is ``true``.
     */
    setFeature: function(feature, options) {
        this.feature = feature || this[this.symbolType.toLowerCase() + "Feature"];
        if(!options || options.draw) {
            this.drawFeature();
        }
    },

    /** private: method[drawFeature]
     *  Render the feature with the symbolizers.
     */
    drawFeature: function() {
        this.renderer.clear();
        this.setRendererDimensions();
        // TODO: remove this when OpenLayers.Symbolizer is required
        var Symbolizer = OpenLayers.Symbolizer;
        var Text = Symbolizer && Symbolizer.Text;
        var symbolizer, feature, geomType;
        for (var i=0, len=this.symbolizers.length; i<len; ++i) {
            symbolizer = this.symbolizers[i];
            feature = this.feature;
            // don't render text symbolizers
            if (!Text || !(symbolizer instanceof Text)) {
                if (Symbolizer && (symbolizer instanceof Symbolizer)) {
                    symbolizer = symbolizer.clone();
                    if (!this.initialConfig.feature) {
                        geomType = symbolizer.CLASS_NAME.split(".").pop().toLowerCase();
                        feature = this[geomType + "Feature"];
                    }
                } else {
                    // TODO: remove this when OpenLayers.Symbolizer is used everywhere
                    symbolizer = Ext.apply({}, symbolizer);
                }
                this.renderer.drawFeature(
                    feature.clone(),
                    symbolizer
                );
            }
        }
    },
    
    /** api: method[update]
     *  :arg options: ``Object`` Object with properties to be updated.
     * 
     *  Update the ``symbolType`` or ``feature`` and ``symbolizer`` and redraw
     *  the feature.
     *
     *  Valid options:
     *  
     *  * feature - ``OpenLayers.Feature.Vector`` The new or updated feature.  
     *      If provided, the feature gets precedence over ``symbolType``.
     *  * symbolType - ``String`` One of the allowed ``symbolType`` values.
     *  * symbolizers - ``Array(Object)`` An array of symbolizer objects.
     */
    update: function(options) {
        options = options || {};
        if(options.feature) {
            this.setFeature(options.feature, {draw: false});
        } else if(options.symbolType) {
            this.setSymbolType(options.symbolType, {draw: false});
        }
        if(options.symbolizers) {
            this.setSymbolizers(options.symbolizers, {draw: false});
        }
        this.drawFeature();
    },

    /** private: method[beforeDestroy]
     *  Private method called during the destroy sequence.
     */
    beforeDestroy: function() {
        this.clearCustomEvents();
        if (this.renderer) {
            this.renderer.destroy();
        }
    }
    
});

/** api: xtype = gx_renderer */
Ext.reg('gx_renderer', GeoExt.FeatureRenderer);
