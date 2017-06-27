/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-range",function(e,t){function n(){n.superclass.constructor.apply(this,arguments)}n.NAME="rangeSeries",n.ATTRS={type:{value:"range"},ohlckeys:{valueFn:function(){return{open:"open",high:"high",low:"low",close:"close"}}}},e.extend(n,e.CartesianSeries,{_calculateMarkerWidth:function(e,t,n){var r=0;while(r<3&&n>-1)n-=1,r=Math.round(e/t-n),r%2===0&&(r-=1);return Math.max(1,r)},drawSeries:function(){var e=this.get("xcoords"),t=this.get("ycoords"),n=this.get("styles"),r=n.padding,i=e.length,s=this.get("width")-(r.left+r.right),o=this.get("ohlckeys"),u=t[o.open],a=t[o.high],f=t[o.low],l=t[o.close],c=this._calculateMarkerWidth(s,i,n.spacing),h=c/2;this._drawMarkers(e,u,a,f,l,i,c,h,n)},_getDefaultStyles:function(){var e={spacing:3};return this._mergeStyles(e,n.superclass._getDefaultStyles())}}),e.RangeSeries=n},"3.17.2",{requires:["series-cartesian"]});
