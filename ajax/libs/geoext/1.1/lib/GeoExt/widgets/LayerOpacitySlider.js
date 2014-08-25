/* Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * Published under the BSD license.
 * See http://geoext.org/svn/geoext/core/trunk/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/tips/LayerOpacitySliderTip.js
 * @include GeoExt/data/LayerRecord.js
 * @require OpenLayers/Layer.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = LayerOpacitySlider
 *  base_link = `Ext.slider.SingleSlider <http://dev.sencha.com/deploy/dev/docs/?class=Ext.slider.SingleSlider>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to render a slider outside the map viewport:
 *
 *  .. code-block:: javascript
 *
 *      var slider = new GeoExt.LayerOpacitySlider({
 *          renderTo: document.body,
 *          width: 200,
 *          layer: layer
 *      });
 *
 *  Sample code to add a slider to a map panel:
 *
 *  .. code-block:: javascript
 *
 *      var layer = new OpenLayers.Layer.WMS(
 *          "Global Imagery",
 *          "http://maps.opengeo.org/geowebcache/service/wms",
 *          {layers: "bluemarble"}
 *      );
 *      var panel = new GeoExt.MapPanel({
 *          renderTo: document.body,
 *          height: 300,
 *          width: 400,
 *          map: {
 *              controls: [new OpenLayers.Control.Navigation()]
 *          },
 *          layers: [layer],
 *          extent: [-5, 35, 15, 55],
 *          items: [{
 *              xtype: "gx_opacityslider",
 *              layer: layer,
 *              aggressive: true,
 *              vertical: true,
 *              height: 100,
 *              x: 10,
 *              y: 20
 *          }]
 *      });
 */

/** api: constructor
 *  .. class:: LayerOpacitySlider(config)
 *
 *      Create a slider for controlling a layer's opacity.
 */
GeoExt.LayerOpacitySlider = Ext.extend(Ext.slider.SingleSlider, {

    /** api: config[layer]
     *  ``OpenLayers.Layer`` or :class:`GeoExt.data.LayerRecord`
     *  The layer this slider changes the opacity of. (required)
     */
    /** private: property[layer]
     *  ``OpenLayers.Layer``
     */
    layer: null,

    /** api: config[complementaryLayer]
     *  ``OpenLayers.Layer`` or :class:`GeoExt.data.LayerRecord` 
     *  If provided, a layer that will be made invisible (its visibility is
     *  set to false) when the slider value is set to its max value. If this
     *  slider is used to fade visibility between to layers, setting
     *  ``complementaryLayer`` and ``changeVisibility`` will make sure that
     *  only visible tiles are loaded when the slider is set to its min or max
     *  value. (optional)
     */
    complementaryLayer: null,

    /** api: config[delay]
     *  ``Number`` Time in milliseconds before setting the opacity value to the
     *  layer. If the value change again within that time, the original value
     *  is not set. Only applicable if aggressive is true.
     */
    delay: 5,

    /** api: config[changeVisibilityDelay]
     *  ``Number`` Time in milliseconds before changing the layer's visibility.
     *  If the value changes again within that time, the layer's visibility
     *  change does not occur. Only applicable if changeVisibility is true.
     *  Defaults to 5.
     */
    changeVisibilityDelay: 5,

    /** api: config[aggressive]
     *  ``Boolean``
     *  If set to true, the opacity is changed as soon as the thumb is moved.
     *  Otherwise when the thumb is released (default).
     */
    aggressive: false,

    /** api: config[changeVisibility]
     *  ``Boolean``
     *  If set to true, the layer's visibility is handled by the
     *  slider, the slider makes the layer invisible when its
     *  value is changed to the min value, and makes the layer
     *  visible again when its value goes from the min value
     *  to some other value. The layer passed to the constructor
     *  must be visible, as its visibility is fully handled by
     *  the slider. Defaults to false.
     */
    changeVisibility: false,

    /** api: config[value]
     *  ``Number``
     *  The value to initialize the slider with. This value is
     *  taken into account only if the layer's opacity is null.
     *  If the layer's opacity is null and this value is not
     *  defined in the config object then the slider initializes
     *  it to the max value.
     */
    value: null,

    /** api: config[inverse]
     *  ``Boolean``
     *  If true, we will work with transparency instead of with opacity.
     *  Defaults to false.
     */
    /** private: property[inverse]
     *  ``Boolean``
     */
    inverse: false,

    /** private: method[constructor]
     *  Construct the component.
     */
    constructor: function(config) {
        if (config.layer) {
            this.layer = this.getLayer(config.layer);
            this.bind();
            this.complementaryLayer = this.getLayer(config.complementaryLayer);
            // before we call getOpacityValue inverse should be set
            if (config.inverse !== undefined) {
                this.inverse = config.inverse;
            }
            config.value = (config.value !== undefined) ? 
                config.value : this.getOpacityValue(this.layer);
            delete config.layer;
            delete config.complementaryLayer;
        }
        GeoExt.LayerOpacitySlider.superclass.constructor.call(this, config);
    },

    /** private: method[bind]
     */
    bind: function() {
        if (this.layer && this.layer.map) {
            this.layer.map.events.on({
                changelayer: this.update,
                scope: this
            });
        }
    },

    /** private: method[unbind]
     */
    unbind: function() {
        if (this.layer && this.layer.map && this.layer.map.events) {
            this.layer.map.events.un({
                changelayer: this.update,
                scope: this
            });
        }
    },

    /** private: method[update]
     *  Registered as a listener for opacity change.  Updates the value of the slider.
     */
    update: function(evt) {
        if (evt.property === "opacity" && evt.layer == this.layer &&
            !this._settingOpacity) {
            this.setValue(this.getOpacityValue(this.layer));
        }
    },

    /** api: method[setLayer]
     *  :param layer: ``OpenLayers.Layer`` or :class:`GeoExt.data.LayerRecord`
     *
     *  Bind a new layer to the opacity slider.
     */
    setLayer: function(layer) {
        this.unbind();
        this.layer = this.getLayer(layer);
        this.setValue(this.getOpacityValue(layer));
        this.bind();
    },

    /** private: method[getOpacityValue]
     *  :param layer: ``OpenLayers.Layer`` or :class:`GeoExt.data.LayerRecord`
     *  :return:  ``Integer`` The opacity for the layer.
     *
     *  Returns the opacity value for the layer.
     */
    getOpacityValue: function(layer) {
        var value;
        if (layer && layer.opacity !== null) {
            value = parseInt(layer.opacity * (this.maxValue - this.minValue));
        } else {
            value = this.maxValue;
        }
        if (this.inverse === true) {
            value = (this.maxValue - this.minValue) - value;
        }
        return value;
    },

    /** private: method[getLayer]
     *  :param layer: ``OpenLayers.Layer`` or :class:`GeoExt.data.LayerRecord`
     *  :return:  ``OpenLayers.Layer`` The OpenLayers layer object
     *
     *  Returns the OpenLayers layer object for a layer record or a plain layer 
     *  object.
     */
    getLayer: function(layer) {
        if (layer instanceof OpenLayers.Layer) {
            return layer;
        } else if (layer instanceof GeoExt.data.LayerRecord) {
            return layer.getLayer();
        }
    },

    /** private: method[initComponent]
     *  Initialize the component.
     */
    initComponent: function() {

        GeoExt.LayerOpacitySlider.superclass.initComponent.call(this);

        if (this.changeVisibility && this.layer &&
            (this.layer.opacity == 0 || 
            (this.inverse === false && this.value == this.minValue) || 
            (this.inverse === true && this.value == this.maxValue))) {
            this.layer.setVisibility(false);
        }

        if (this.complementaryLayer &&
            ((this.layer && this.layer.opacity == 1) ||
             (this.inverse === false && this.value == this.maxValue) ||
             (this.inverse === true && this.value == this.minValue))) {
            this.complementaryLayer.setVisibility(false);
        }

        if (this.aggressive === true) {
            this.on('change', this.changeLayerOpacity, this, {
                buffer: this.delay
            });
        } else {
            this.on('changecomplete', this.changeLayerOpacity, this);
        }

        if (this.changeVisibility === true) {
            this.on('change', this.changeLayerVisibility, this, {
                buffer: this.changeVisibilityDelay
            });
        }

        if (this.complementaryLayer) {
            this.on('change', this.changeComplementaryLayerVisibility, this, {
                buffer: this.changeVisibilityDelay
            });
        }
        this.on("beforedestroy", this.unbind, this);
    },

    /** private: method[changeLayerOpacity]
     *  :param slider: :class:`GeoExt.LayerOpacitySlider`
     *  :param value: ``Number`` The slider value
     *
     *  Updates the ``OpenLayers.Layer`` opacity value.
     */
    changeLayerOpacity: function(slider, value) {
        if (this.layer) {
            value = value / (this.maxValue - this.minValue);
            if (this.inverse === true) {
                value = 1 - value;
            }
            this._settingOpacity = true;
            this.layer.setOpacity(value);
            delete this._settingOpacity;
        }
    },

    /** private: method[changeLayerVisibility]
     *  :param slider: :class:`GeoExt.LayerOpacitySlider`
     *  :param value: ``Number`` The slider value
     *
     *  Updates the ``OpenLayers.Layer`` visibility.
     */
    changeLayerVisibility: function(slider, value) {
        var currentVisibility = this.layer.getVisibility();
        if ((this.inverse === false && value == this.minValue) ||
            (this.inverse === true && value == this.maxValue) &&
            currentVisibility === true) {
            this.layer.setVisibility(false);
        } else if ((this.inverse === false && value > this.minValue) ||
            (this.inverse === true && value < this.maxValue) &&
                   currentVisibility == false) {
            this.layer.setVisibility(true);
        }
    },

    /** private: method[changeComplementaryLayerVisibility]
     *  :param slider: :class:`GeoExt.LayerOpacitySlider`
     *  :param value: ``Number`` The slider value
     *
     *  Updates the complementary ``OpenLayers.Layer`` visibility.
     */
    changeComplementaryLayerVisibility: function(slider, value) {
        var currentVisibility = this.complementaryLayer.getVisibility();
        if ((this.inverse === false && value == this.maxValue) ||
            (this.inverse === true && value == this.minValue) &&
            currentVisibility === true) {
            this.complementaryLayer.setVisibility(false);
        } else if ((this.inverse === false && value < this.maxValue) ||
            (this.inverse === true && value > this.minValue) &&
                   currentVisibility == false) {
            this.complementaryLayer.setVisibility(true);
        }
    },

    /** private: method[addToMapPanel]
     *  :param panel: :class:`GeoExt.MapPanel`
     *
     *  Called by a MapPanel if this component is one of the items in the panel.
     */
    addToMapPanel: function(panel) {
        this.on({
            render: function() {
                var el = this.getEl();
                el.setStyle({
                    position: "absolute",
                    zIndex: panel.map.Z_INDEX_BASE.Control
                });
                el.on({
                    mousedown: this.stopMouseEvents,
                    click: this.stopMouseEvents
                });
            },
            scope: this
        });
    },

    /** private: method[removeFromMapPanel]
     *  :param panel: :class:`GeoExt.MapPanel`
     *
     *  Called by a MapPanel if this component is one of the items in the panel.
     */
    removeFromMapPanel: function(panel) {
        var el = this.getEl();
        el.un({
            mousedown: this.stopMouseEvents,
            click: this.stopMouseEvents,
            scope: this
        });
        this.unbind();
    },

    /** private: method[stopMouseEvents]
     *  :param e: ``Object``
     */
    stopMouseEvents: function(e) {
        e.stopEvent();
    }
});

/** api: xtype = gx_opacityslider */
Ext.reg('gx_opacityslider', GeoExt.LayerOpacitySlider);
