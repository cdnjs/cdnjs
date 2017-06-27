/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-ohlc",function(e,t){function n(){n.superclass.constructor.apply(this,arguments)}n.NAME="ohlcSeries",n.ATTRS={type:{value:"ohlc"},graphic:{lazyAdd:!1,setter:function(e){return this.get("rendered")||this.set("rendered",!0),this.set("upmarker",e.addShape({type:"path"})),this.set("downmarker",e.addShape({type:"path"})),e}},upmarker:{},downmarker:{}},e.extend(n,e.RangeSeries,{_drawMarkers:function(e,t,n,r,i,s,o,u,a){var f=this.get("upmarker"),l=this.get("downmarker"),c,h,p,d,v,m,g=a.padding.left,y,b,w,E,S;f.set(a.upmarker),l.set(a.downmarker),f.clear(),l.clear();for(E=0;E<s;E+=1)w=e[E]+g,v=w-u,m=w+u,c=t[E],h=n[E],p=r[E],d=i[E],b=c>d,S=p-h,y=b?f:l,y.moveTo(v,c),y.lineTo(w,c),y.moveTo(w,h),y.lineTo(w,p),y.moveTo(w,d),y.lineTo(m,d);f.end(),l.end()},_toggleVisible:function(e){this.get("upmarker").set("visible",e),this.get("downmarker").set("visible",e)},destructor:function(){var e=this.get("upmarker"),t=this.get("downmarker");e&&e.destroy(),t&&t.destroy()},_getDefaultStyles:function(){var e={upmarker:{stroke:{color:"#00aa00",alpha:1,weight:1}},downmarker:{stroke:{color:"#aa0000",alpha:1,weight:1}}};return this._mergeStyles(e,n.superclass._getDefaultStyles())}}),e.OHLCSeries=n},"3.15.0",{requires:["series-range"]});
