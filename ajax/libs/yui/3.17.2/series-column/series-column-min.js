/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-column",function(e,t){e.ColumnSeries=e.Base.create("columnSeries",e.MarkerSeries,[e.Histogram],{_getMarkerDimensions:function(e,t,n,r){var i={left:e+r};return this._bottomOrigin>=t?(i.top=t,i.calculatedSize=this._bottomOrigin-i.top):(i.top=this._bottomOrigin,i.calculatedSize=t-this._bottomOrigin),i},updateMarkerState:function(e,t){if(this._markers&&this._markers[t]){var n=this._copyObject(this.get("styles").marker),r,i=this._getState(e),s=this.get("xcoords"),o=this.get("ycoords"),u=this._markers[t],a,f,l=this.get("seriesTypeCollection"),c=l?l.length:0,h=0,p=0,d,v=0,m=[],g=this.get("order"),y;r=i==="off"||!n[i]?this._copyObject(n):this._copyObject(n[i]),r.fill.color=this._getItemColor(r.fill.color,t),r.border.color=this._getItemColor(r.border.color,t),y=this._getMarkerDimensions(s[t],o[t],n.width,p),r.height=y.calculatedSize,r.width=Math.min(this._maxSize,r.width),u.set(r);for(;v<c;++v)m[v]=s[t]+h,f=l[v].get("styles").marker,h+=Math.min(this._maxSize,f.width),g>v&&(p=h),p-=h/2;for(v=0;v<c;++v)a=l[v].get("markers"),a&&(d=a[t],d&&d!==undefined&&d.set("x",m[v]-h/2))}}},{ATTRS:{type:{value:"column"}}})},"3.17.2",{requires:["series-marker","series-histogram-base"]});
