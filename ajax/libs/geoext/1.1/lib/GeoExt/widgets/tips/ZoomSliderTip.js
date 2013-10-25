/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @requires GeoExt/widgets/tips/SliderTip.js
 */

/** api: (extends)
 *  GeoExt/widgets/tips/SliderTip.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = ZoomSliderTip
 *  base_link = `Ext.Tip <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Tip>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to create a slider tip to display scale and resolution:
 * 
 *  .. code-block:: javascript
 *     
 *      var slider = new GeoExt.ZoomSlider({
 *          renderTo: document.body,
 *          width: 200,
 *          map: map,
 *          plugins: new GeoExt.ZoomSliderTip({
 *              template: "Scale: 1 : {scale}<br>Resolution: {resolution}"
 *          })
 *      });
 */

/** api: constructor
 *  .. class:: ZoomSliderTip(config)
 *   
 *      Create a slider tip displaying :class:`GeoExt.ZoomSlider` values.
 */
GeoExt.ZoomSliderTip = Ext.extend(GeoExt.SliderTip, {
    
    /** api: config[template]
     *  ``String``
     *  Template for the tip. Can be customized using the following keywords in
     *  curly braces:
     *  
     *  * ``zoom`` - the zoom level
     *  * ``resolution`` - the resolution
     *  * ``scale`` - the scale denominator
     */
    template: '<div>Zoom Level: {zoom}</div>' +
        '<div>Resolution: {resolution}</div>' +
        '<div>Scale: 1 : {scale}</div>',
    
    /** private: property[compiledTemplate]
     *  ``Ext.Template``
     *  The template compiled from the ``template`` string on init.
     */
    compiledTemplate: null,
    
    /** private: method[init]
     *  Called to initialize the plugin.
     */
    init: function(slider) {
        this.compiledTemplate = new Ext.Template(this.template);
        GeoExt.ZoomSliderTip.superclass.init.call(this, slider);
    },
    
    /** private: method[getText]
     *  :param slider: ``Ext.slider.SingleSlider`` The slider this tip is attached to.
     */
    getText: function(thumb) {
        var data = {
            zoom: thumb.value,
            resolution: this.slider.getResolution(),
            scale: Math.round(this.slider.getScale()) 
        };
        return this.compiledTemplate.apply(data);
    }
});
