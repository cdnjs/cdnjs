/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-bar",function(e,t){e.BarSeries=e.Base.create("barSeries",e.MarkerSeries,[e.Histogram],{_getMarkerDimensions:function(e,t,n,r){var i={top:t+r};return e>=this._leftOrigin?(i.left=this._leftOrigin,i.calculatedSize=e-i.left):(i.left=e,i.calculatedSize=this._leftOrigin-e),i},updateMarkerState:function(e,t){if(this._markers&&this._markers[t]){var n=this._copyObject(this.get("styles").marker),r,i=this._getState(e),s=this.get("xcoords"),o=this.get("ycoords"),u=this._markers[t],a,f=this.get("seriesTypeCollection"),l=f?f.length:0,c,h=0,p=0,d,v=0,m=[],g=this.get("order"),y;r=i==="off"||!n[i]?n:n[i],r.fill.color=this._getItemColor(r.fill.color,t),r.border.color=this._getItemColor(r.border.color,t),y=this._getMarkerDimensions(s[t],o[t],n.height,p),r.width=y.calculatedSize,r.height=Math.min(this._maxSize,r.height),u.set(r);for(;v<l;++v)m[v]=o[t]+h,c=f[v].get("styles").marker,h+=Math.min(this._maxSize,c.height),g>v&&(p=h),p-=h/2;for(v=0;v<l;++v)a=f[v].get("markers"),a&&(d=a[t],d&&d!==undefined&&d.set("y",m[v]-h/2))}}},{ATTRS:{type:{value:"bar"},direction:{value:"vertical"}}})},"3.15.0",{requires:["series-marker","series-histogram-base"]});
