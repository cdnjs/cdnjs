/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-area",function(e,t){e.AreaSeries=e.Base.create("areaSeries",e.CartesianSeries,[e.Fills],{drawSeries:function(){this.drawFill.apply(this,this._getClosingPoints())},_setStyles:function(t){return t.area||(t={area:t}),e.AreaSeries.superclass._setStyles.apply(this,[t])},_getDefaultStyles:function(){var t=this._mergeStyles({area:this._getAreaDefaults()},e.AreaSeries.superclass._getDefaultStyles());return t}},{ATTRS:{type:{value:"area"}}})},"3.16.0",{requires:["series-cartesian","series-fill-util"]});
