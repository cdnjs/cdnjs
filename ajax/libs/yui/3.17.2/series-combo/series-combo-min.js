/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-combo",function(e,t){e.ComboSeries=e.Base.create("comboSeries",e.CartesianSeries,[e.Fills,e.Lines,e.Plots],{drawSeries:function(){this.get("showAreaFill")&&this.drawFill.apply(this,this._getClosingPoints()),this.get("showLines")&&this.drawLines(),this.get("showMarkers")&&this.drawPlots()},_toggleVisible:function(e){var t,n,r,i;this.get("showAreaFill")&&this._path&&this._path.set("visible",e),this.get("showLines")&&this._lineGraphic&&this._lineGraphic.set("visible",e);if(this.get("showMarkers")){t=this.get("markers");if(t){i=0,r=t.length;for(;i<r;++i)n=t[i],n&&n.set("visible",e)}}},_getDefaultStyles:function(){var t=e.ComboSeries.superclass._getDefaultStyles();return t.line=this._getLineDefaults(),t.marker=this._getPlotDefaults(),t.area=this._getAreaDefaults(),t}},{ATTRS:{type:{value:"combo"},showAreaFill:{value:!1},showLines:{value:!0},showMarkers:{value:!0},marker:{lazyAdd:!1,getter:function(){return this.get("styles").marker},setter:function(e){this.set("styles",{marker:e})}},line:{lazyAdd:!1,getter:function(){return this.get("styles").line},setter:function(e){this.set("styles",{line:e})}},area:{lazyAdd:!1,getter:function(){return this.get("styles").area},setter:function(e){this.set("styles",{area:e})}}}})},"3.17.2",{requires:["series-cartesian","series-line-util","series-plot-util","series-fill-util"]});
