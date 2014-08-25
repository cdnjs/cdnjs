/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("axis-time",function(e,t){e.TimeAxis=e.Base.create("timeAxis",e.Axis,[e.TimeImpl],{_getLabelByIndex:function(e,t){var n=this.get("minimum"),r=this.get("maximum"),i,s;return t-=1,i=(r-n)/t*e,s=n+i,s},_getLabelData:function(e,t,n,r,i,s,o,u,a){var f,l,c=[],h=[],p,d=s;a=a||this._getDataValuesByCount(u,r,i);for(l=0;l<u;l+=1)f=this._getNumber(a[l]),f<=i&&f>=r&&(p={},p[t]=e,p[n]=this._getCoordFromValue(r,i,o,f,d),c.push(p),h.push(f));return{points:c,values:h}}})},"3.17.2",{requires:["axis","axis-time-base"]});
