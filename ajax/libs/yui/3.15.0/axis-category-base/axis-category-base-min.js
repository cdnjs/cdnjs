/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("axis-category-base",function(e,t){function r(){}var n=e.Lang;r.NAME="categoryImpl",r.ATTRS={labelFormat:{value:null},calculateEdgeOffset:{value:!0}},r.prototype={formatLabel:function(e){return e},_indices:null,GUID:"yuicategoryaxis",_type:"category",_updateMinAndMax:function(){this._dataMaximum=Math.max(this.get("data").length-1,0),this._dataMinimum=0},_getKeyArray:function(e,t){var n=0,r,i=[],s=[],o=t.length;this._indices||(this._indices={});for(;n<o;++n)r=t[n],i[n]=n,s[n]=r[e];return this._indices[e]=i,s},getDataByKey:function(e){this._indices||this.get("keys");var t=this._indices;return t&&t[e]?t[e]:null},getTotalMajorUnits:function(){return this.get("data").length},_getCoordFromValue:function(e,t,r,i,s){var o,u,a;return n.isNumber(i)?(o=t-e,u=r/o,a=(i-e)*u,a=s+a):a=NaN,a},getKeyValueAt:function(e,t){var n=NaN,r=this.get("keys");return r[e]&&r[e][t]&&(n=r[e][t]),n}},e.CategoryImpl=r,e.CategoryAxisBase=e.Base.create("categoryAxisBase",e.AxisBase,[e.CategoryImpl])},"3.15.0",{requires:["axis-base"]});
