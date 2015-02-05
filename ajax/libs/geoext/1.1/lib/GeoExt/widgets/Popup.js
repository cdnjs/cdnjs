/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/MapPanel.js
 * @require OpenLayers/Feature/Vector.js
 * @require OpenLayers/Geometry.js
 * @require OpenLayers/BaseTypes/Pixel.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = Popup
 *  base_link = `Ext.Window <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Window>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to create a popup anchored to a feature:
 * 
 *  .. code-block:: javascript
 *     
 *      var popup = new GeoExt.Popup({
 *          title: "My Popup",
 *          location: feature,
 *          width: 200,
 *          html: "<div>Popup content</div>",
 *          collapsible: true
 *      });
 */

/** api: constructor
 *  .. class:: Popup(config)
 *   
 *      Popups are a specialized Window that supports anchoring
 *      to a particular location in a MapPanel.  When a popup
 *      is anchored to a location, that means that the popup
 *      will visibly point to the location on the map, and move
 *      accordingly when the map is panned or zoomed.
 */
GeoExt.Popup = Ext.extend(Ext.Window, {

    /** api: config[anchored]
     *  ``Boolean``  The popup begins anchored to its location.  Default is
     *  ``true``.
     */
    anchored: true,

    /** api: config[map]
     *  ``OpenLayers.Map`` or :class:`GeoExt.MapPanel`
     *  The map this popup will be anchored to (only required if ``anchored``
     *  is set to true and the map cannot be derived from the ``location``'s
     *  layer.
     */
    map: null,

    /** api: config[panIn]
     *  ``Boolean`` The popup should pan the map so that the popup is
     *  fully in view when it is rendered.  Default is ``true``.
     */
    panIn: true,

    /** api: config[unpinnable]
     *  ``Boolean`` The popup should have a "unpin" tool that unanchors it from
     *  its location.  Default is ``true``.
     */
    unpinnable: true,

    /** api: config[location]
     *  ``OpenLayers.Feature.Vector`` or ``OpenLayers.LonLat`` or
     *  ``OpenLayers.Pixel`` or ``OpenLayers.Geometry`` A location for this 
     *  popup's anchor.
     */
    
    /** private: property[location]
     *  ``OpenLayers.LonLat``
     */
    location: null,

    /** private: property[insideViewport]
     *  ``Boolean`` Wether the popup is currently inside the map viewport.
     */
    insideViewport: null,

    /**
     * Some Ext.Window defaults need to be overriden here
     * because some Ext.Window behavior is not currently supported.
     */    

    /** private: config[animCollapse]
     *  ``Boolean`` Animate the transition when the panel is collapsed.
     *  Default is ``false``.  Collapsing animation is not supported yet for
     *  popups.
     */
    animCollapse: false,

    /** private: config[draggable]
     *  ``Boolean`` Enable dragging of this Panel.  Defaults to ``false``
     *  because the popup defaults to being anchored, and anchored popups
     *  should not be draggable.
     */
    draggable: false,

    /** private: config[shadow]
     *  ``Boolean`` Give the popup window a shadow.  Defaults to ``false``
     *  because shadows are not supported yet for popups (the shadow does
     *  not look good with the anchor).
     */
    shadow: false,

    /** api: config[popupCls]
     *  ``String`` CSS class name for the popup DOM elements.  Default is
     *  "gx-popup".
     */
    popupCls: "gx-popup",

    /** api: config[ancCls]
     *  ``String``  CSS class name for the popup's anchor.
     */
    ancCls: null,

    /** api: config[anchorPosition]
     *  ``String``  Controls the anchor position for the popup. If set to
     *  ``auto``, the anchor will be positioned on the top or the bottom of
     *  the window, minimizing map movement. Supported values are ``bottom-left``,
     *  ``bottom-right``, ``top-left``, ``top-right`` or ``auto``.
     *  Defaults to ``auto``.
     */
    anchorPosition: "auto",

    /** private: method[initComponent]
     *  Initializes the popup.
     */
    initComponent: function() {
        if(this.map instanceof GeoExt.MapPanel) {
            this.map = this.map.map;
        }
        if(!this.map && this.location instanceof OpenLayers.Feature.Vector &&
                                                        this.location.layer) {
            this.map = this.location.layer.map;
        }
        if (this.location instanceof OpenLayers.Feature.Vector) {
            this.location = this.location.geometry;
        }
        if (this.location instanceof OpenLayers.Geometry) {
            if (typeof this.location.getCentroid == "function") {
                this.location = this.location.getCentroid();
            }
            this.location = this.location.getBounds().getCenterLonLat();
        } else if (this.location instanceof OpenLayers.Pixel) {
            this.location = this.map.getLonLatFromViewPortPx(this.location);
        }

        var mapExtent =  this.map.getExtent();
        if (mapExtent && this.location) {
            this.insideViewport = mapExtent.containsLonLat(this.location);
        }

        if(this.anchored) {
            this.addAnchorEvents();
        }

        this.baseCls = this.popupCls + " " + this.baseCls;

        this.elements += ',anc';

        GeoExt.Popup.superclass.initComponent.call(this);
    },

    /** private: method[onRender]
     *  Executes when the popup is rendered.
     */
    onRender: function(ct, position) {
        GeoExt.Popup.superclass.onRender.call(this, ct, position);
        this.ancCls = this.popupCls + "-anc";
        //create anchor dom element.
        this.createElement("anc", this.el.dom);
    },

    /** private: method[initTools]
     *  Initializes the tools on the popup.  In particular,
     *  it adds the 'unpin' tool if the popup is unpinnable.
     */
    initTools : function() {
        if(this.unpinnable) {
            this.addTool({
                id: 'unpin',
                handler: this.unanchorPopup.createDelegate(this, [])
            });
        }

        GeoExt.Popup.superclass.initTools.call(this);
    },

    /** private: method[show]
     *  Override.
     */
    show: function() {
        GeoExt.Popup.superclass.show.apply(this, arguments);
        if(this.anchored) {
            this.position();
            if(this.panIn && !this._mapMove) {
                this.panIntoView();
            }
        }
    },
    
    /** private: method[maximize]
     *  Override.
     */
    maximize: function() {
        if(!this.maximized && this.anc) {
            this.unanchorPopup();
        }
        GeoExt.Popup.superclass.maximize.apply(this, arguments);
    },
    
    /** api: method[setSize]
     *  :param w: ``Integer``
     *  :param h: ``Integer``
     *  
     *  Sets the size of the popup, taking into account the size of the anchor.
     */
    setSize: function(w, h) {
        if(this.anc) {
            var ancSize = this.anc.getSize();
            if(typeof w == 'object') {
                h = w.height - ancSize.height;
                w = w.width;
            } else if(!isNaN(h)){
                h = h - ancSize.height;
            }
        }
        GeoExt.Popup.superclass.setSize.call(this, w, h);
    },

    /** private: method[position]
     *  Positions the popup relative to its location
     */
    position: function() {
        if(this._mapMove === true) {
            this.insideViewport = this.map.getExtent().containsLonLat(this.location);
            if(this.insideViewport !== this.isVisible()) {
                this.setVisible(this.insideViewport);
            }
        }

        if(this.isVisible()) {
            var locationPx = this.map.getPixelFromLonLat(this.location),
                mapBox = Ext.fly(this.map.div).getBox(true),
                top = locationPx.y + mapBox.y,
                left = locationPx.x + mapBox.x,
                elSize = this.el.getSize(),
                ancSize = this.anc.getSize(),
                ancPos = this.anchorPosition;

            if (ancPos.indexOf("right") > -1 || locationPx.x > mapBox.width / 2) {
                // right
                this.anc.addClass("right");
                var ancRight = this.el.getX(true) + elSize.width -
                               this.anc.getX(true) - ancSize.width;
                left -= elSize.width - ancRight - ancSize.width / 2;
            } else {
                // left
                this.anc.removeClass("right");
                var ancLeft = this.anc.getLeft(true);
                left -= ancLeft + ancSize.width / 2;
            }

            if (ancPos.indexOf("bottom") > -1 || locationPx.y > mapBox.height / 2) {
                // bottom
                this.anc.removeClass("top");
                top -= elSize.height + ancSize.height;
            } else {
                // top
                this.anc.addClass("top");
                top += ancSize.height; // ok
            }

            this.setPosition(left, top);
        }
    },

    /** private: method[unanchorPopup]
     *  Unanchors a popup from its location.  This removes the popup from its
     *  MapPanel and adds it to the page body.
     */
    unanchorPopup: function() {
        this.removeAnchorEvents();
        
        //make the window draggable
        this.draggable = true;
        this.header.addClass("x-window-draggable");
        this.dd = new Ext.Window.DD(this);

        //remove anchor
        this.anc.remove();
        this.anc = null;

        //hide unpin tool
        this.tools.unpin.hide();
    },

    /** private: method[panIntoView]
     *  Pans the MapPanel's map so that an anchored popup can come entirely
     *  into view, with padding specified as per normal OpenLayers.Map popup
     *  padding.
     */ 
    panIntoView: function() {
        var mapBox = Ext.fly(this.map.div).getBox(true); 

        //assumed viewport takes up whole body element of map panel
        var popupPos =  this.getPosition(true);
        popupPos[0] -= mapBox.x;
        popupPos[1] -= mapBox.y;
       
        var panelSize = [mapBox.width, mapBox.height]; // [X,Y]

        var popupSize = this.getSize();

        var newPos = [popupPos[0], popupPos[1]];

        //For now, using native OpenLayers popup padding.  This may not be ideal.
        var padding = this.map.paddingForPopups;

        // X
        if(popupPos[0] < padding.left) {
            newPos[0] = padding.left;
        } else if(popupPos[0] + popupSize.width > panelSize[0] - padding.right) {
            newPos[0] = panelSize[0] - padding.right - popupSize.width;
        }

        // Y
        if(popupPos[1] < padding.top) {
            newPos[1] = padding.top;
        } else if(popupPos[1] + popupSize.height > panelSize[1] - padding.bottom) {
            newPos[1] = panelSize[1] - padding.bottom - popupSize.height;
        }

        var dx = popupPos[0] - newPos[0];
        var dy = popupPos[1] - newPos[1];

        this.map.pan(dx, dy);
    },
    
    /** private: method[onMapMove]
     */
    onMapMove: function() {
        if (!(this.hidden && this.insideViewport)){       
            this._mapMove = true;
            this.position();
            delete this._mapMove;
        }
    },
    
    /** private: method[addAnchorEvents]
     */
    addAnchorEvents: function() {
        this.map.events.on({
            "move" : this.onMapMove,
            scope : this            
        });
        
        this.on({
            "resize": this.position,
            "collapse": this.position,
            "expand": this.position,
            scope: this
        });
    },
    
    /** private: method[removeAnchorEvents]
     */
    removeAnchorEvents: function() {
        //stop position with location
        this.map.events.un({
            "move" : this.onMapMove,
            scope : this
        });

        this.un("resize", this.position, this);
        this.un("collapse", this.position, this);
        this.un("expand", this.position, this);

    },

    /** private: method[beforeDestroy]
     *  Cleanup events before destroying the popup.
     */
    beforeDestroy: function() {
        if(this.anchored) {
            this.removeAnchorEvents();
        }
        GeoExt.Popup.superclass.beforeDestroy.call(this);
    }
});

/** api: xtype = gx_popup */
Ext.reg('gx_popup', GeoExt.Popup); 
