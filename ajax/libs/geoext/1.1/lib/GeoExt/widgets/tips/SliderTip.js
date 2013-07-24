/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = GeoExt
 *  class = SliderTip
 *  base_link = `Ext.Tip <http://dev.sencha.com/deploy/dev/docs/?class=Ext.slider.Tip>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to create a slider tip to display slider value on hover:
 * 
 *  .. code-block:: javascript
 *     
 *      var slider = new Ext.slider.SingleSlider({
 *          renderTo: document.body,
 *          width: 200,
 *          plugins: new GeoExt.SliderTip()
 *      });
 */

/** api: constructor
 *  .. class:: SliderTip(config)
 *   
 *      Create a slider tip displaying ``Ext.slider.SingleSlider`` values over slider thumbs.
 */
GeoExt.SliderTip = Ext.extend(Ext.slider.Tip, {

    /** api: config[hover]
     *  ``Boolean``
     *  Display the tip when hovering over the thumb.  If ``false``, tip will
     *  only be displayed while dragging.  Default is ``true``.
     */
    hover: true,
    
    /** api: config[minWidth]
     *  ``Number``
     *  Minimum width of the tip.  Default is 10.
     */
    minWidth: 10,

    /** api: config[offsets]
     *  ``Array(Number)``
     *  A two item list that provides x, y offsets for the tip.  Default is
     *  [0, -10].
     */
    offsets : [0, -10],
    
    /** private: property[dragging]
     *  ``Boolean``
     *  The thumb is currently being dragged.
     */
    dragging: false,

    /** private: method[init]
     *  :param slider: ``Ext.slider.SingleSlider``
     *  
     *  Called when the plugin is initialized.
     */
    init: function(slider) {
        GeoExt.SliderTip.superclass.init.apply(this, arguments);
        if (this.hover) {
            slider.on("render", this.registerThumbListeners, this);
        }
        this.slider = slider;
    },

    /** private: method[registerThumbListeners]
     *  Set as a listener for 'render' if hover is true.
     */
    registerThumbListeners: function() {
        var thumb, el;
        for (var i=0, ii=this.slider.thumbs.length; i<ii; ++i) {
            thumb = this.slider.thumbs[i];
            el = thumb.tracker.el;
            (function(thumb, el) {
                el.on({
                    mouseover: function(e) {
                        this.onSlide(this.slider, e, thumb);
                        this.dragging = false;
                    },
                    mouseout: function() {
                        if (!this.dragging) {
                            this.hide.apply(this, arguments);
                        }
                    },
                    scope: this
                })
            }).apply(this, [thumb, el]);
        }
    },

    /** private: method[onSlide]
     *  :param slider: ``Ext.slider.SingleSlider``
     *
     *  Listener for dragstart and drag.
     */
    onSlide: function(slider, e, thumb) {
        this.dragging = true;
        return GeoExt.SliderTip.superclass.onSlide.apply(this, arguments);
    }

});
