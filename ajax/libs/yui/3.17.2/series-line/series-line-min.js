/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-line",function(e,t){e.LineSeries=e.Base.create("lineSeries",e.CartesianSeries,[e.Lines],{drawSeries:function(){this.drawLines()},_setStyles:function(t){return t.line||(t={line:t}),e.LineSeries.superclass._setStyles.apply(this,[t])},_getDefaultStyles:function(){var t=this._mergeStyles({line:this._getLineDefaults()},e.LineSeries.superclass._getDefaultStyles());return t}},{ATTRS:{type:{value:"line"}}})},"3.17.2",{requires:["series-cartesian","series-line-util"]});
