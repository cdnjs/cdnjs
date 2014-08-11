/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-combospline",function(e,t){e.ComboSplineSeries=e.Base.create("comboSplineSeries",e.ComboSeries,[e.CurveUtil],{drawSeries:function(){this.get("showAreaFill")&&this.drawAreaSpline(),this.get("showLines")&&this.drawSpline(),this.get("showMarkers")&&this.drawPlots()}},{ATTRS:{type:{value:"comboSpline"}}})},"3.16.0",{requires:["series-combo","series-curve-util"]});
