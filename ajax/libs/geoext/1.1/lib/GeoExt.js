/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/*
 * The code in this file is based on code taken from OpenLayers.
 *
 * Copyright (c) 2006-2007 MetaCarta, Inc., published under the Clear BSD
 * license.  See http://svn.openlayers.org/trunk/openlayers/license.txt for the
 * full text of the license.
 */
 
(function() {

    /**
     * Check to see if GeoExt.singleFile is true. It is true if the
     * GeoExt/SingleFile.js is included before this one, as it is
     * the case in single file builds.
     */
    var singleFile = (typeof GeoExt == "object" && GeoExt.singleFile);

    /**
     * The relative path of this script.
     */
    var scriptName = singleFile ? "GeoExt.js" : "lib/GeoExt.js";

    /**
     * Function returning the path of this script.
     */
    var getScriptLocation = function() {
        var scriptLocation = "";
        // If we load other scripts right before GeoExt using the same
        // mechanism to add script resources dynamically (e.g. OpenLayers), 
        // document.getElementsByTagName will not find the GeoExt script tag
        // in FF2. Using document.documentElement.getElementsByTagName instead
        // works around this issue.
        var scripts = document.documentElement.getElementsByTagName('script');
        for(var i=0, len=scripts.length; i<len; i++) {
            var src = scripts[i].getAttribute('src');
            if(src) {
                var index = src.lastIndexOf(scriptName); 
                // set path length for src up to a query string
                var pathLength = src.lastIndexOf('?');
                if(pathLength < 0) {
                    pathLength = src.length;
                }
                // is it found, at the end of the URL?
                if((index > -1) && (index + scriptName.length == pathLength)) {
                    scriptLocation = src.slice(0, pathLength - scriptName.length);
                    break;
                }
            }
        }
        return scriptLocation;
    };

    /**
     * If GeoExt.singleFile is false then the JavaScript files in the jsfiles
     * array are autoloaded.
     */
    if(!singleFile) {
        var jsfiles = new Array(
            "GeoExt/data/AttributeReader.js",
            "GeoExt/data/AttributeStore.js",
            "GeoExt/data/FeatureRecord.js",
            "GeoExt/data/FeatureReader.js",
            "GeoExt/data/FeatureStore.js",
            "GeoExt/data/LayerRecord.js",
            "GeoExt/data/LayerReader.js",
            "GeoExt/data/LayerStore.js",
            "GeoExt/data/ScaleStore.js",
            "GeoExt/data/StyleReader.js",
            "GeoExt/data/WMSCapabilitiesReader.js",
            "GeoExt/data/WMSCapabilitiesStore.js",
            "GeoExt/data/WFSCapabilitiesReader.js",
            "GeoExt/data/WFSCapabilitiesStore.js",
            "GeoExt/data/WMSDescribeLayerReader.js",
            "GeoExt/data/WMSDescribeLayerStore.js",
            "GeoExt/data/WMCReader.js",
            "GeoExt/widgets/Action.js",
            "GeoExt/data/ProtocolProxy.js",
            "GeoExt/widgets/FeatureRenderer.js",
            "GeoExt/widgets/MapPanel.js",
            "GeoExt/widgets/Popup.js",
            "GeoExt/widgets/form.js",
            "GeoExt/widgets/form/SearchAction.js",
            "GeoExt/widgets/form/BasicForm.js",
            "GeoExt/widgets/form/FormPanel.js",
            "GeoExt/widgets/grid/SymbolizerColumn.js",
            "GeoExt/widgets/tips/SliderTip.js",
            "GeoExt/widgets/tips/LayerOpacitySliderTip.js",
            "GeoExt/widgets/tips/ZoomSliderTip.js",
            "GeoExt/widgets/tree/LayerNode.js",
            "GeoExt/widgets/tree/TreeNodeUIEventMixin.js",
            "GeoExt/plugins/TreeNodeComponent.js",
            "GeoExt/plugins/TreeNodeRadioButton.js",
            "GeoExt/plugins/TreeNodeActions.js",
            "GeoExt/widgets/tree/LayerLoader.js",
            "GeoExt/widgets/tree/LayerContainer.js",
            "GeoExt/widgets/tree/BaseLayerContainer.js",
            "GeoExt/widgets/tree/OverlayLayerContainer.js",
            "GeoExt/widgets/tree/LayerParamNode.js",
            "GeoExt/widgets/tree/LayerParamLoader.js",
            "GeoExt/widgets/tree/WMSCapabilitiesLoader.js",
            "GeoExt/widgets/LayerOpacitySlider.js",
            "GeoExt/widgets/LayerLegend.js",
            "GeoExt/widgets/LegendImage.js",
            "GeoExt/widgets/UrlLegend.js",
            "GeoExt/widgets/WMSLegend.js",
            "GeoExt/widgets/VectorLegend.js",
            "GeoExt/widgets/LegendPanel.js",
            "GeoExt/widgets/ZoomSlider.js",
            "GeoExt/widgets/grid/FeatureSelectionModel.js",
            "GeoExt/data/PrintPage.js",
            "GeoExt/data/PrintProvider.js",
            "GeoExt/plugins/PrintPageField.js",
            "GeoExt/plugins/PrintProviderField.js",
            "GeoExt/plugins/PrintExtent.js",
            "GeoExt/plugins/AttributeForm.js",
            "GeoExt/widgets/PrintMapPanel.js",
            "GeoExt/state/PermalinkProvider.js",
            "GeoExt/Lang.js"
        );

        var len = jsfiles.length;
        var allScriptTags = new Array(len);
        var host = getScriptLocation() + "lib/";    
        for (var i=0; i<len; i++) {
            allScriptTags[i] = "<script src='" + host + jsfiles[i] +"'></script>"; 
        }
        document.write(allScriptTags.join(""));
    }
})();
