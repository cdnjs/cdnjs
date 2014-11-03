/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-marker",function(e,t){e.MarkerSeries=e.Base.create("markerSeries",e.CartesianSeries,[e.Plots],{_setStyles:function(t){return t.marker||(t={marker:t}),t=this._parseMarkerStyles(t),e.MarkerSeries.superclass._mergeStyles.apply(this,[t,this._getDefaultStyles()])}},{ATTRS:{type:{value:"marker"}}})},"3.16.0",{requires:["series-cartesian","series-plot-util"]});
