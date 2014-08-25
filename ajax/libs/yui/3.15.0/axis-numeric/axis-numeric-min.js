/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("axis-numeric",function(e,t){var n=e.Lang;e.NumericAxis=e.Base.create("numericAxis",e.Axis,[e.NumericImpl],{_getLabelByIndex:function(e,t){var n=this.get("minimum"),r=this.get("maximum"),i=(r-n)/(t-1),s,o=this.get("roundingMethod");return t-=1,e===0?s=n:e===t?s=r:(s=e*i,o==="niceNumber"&&(s=this._roundToNearest(s,i)),s+=n),parseFloat(s)},_getLabelData:function(e,t,n,r,i,s,o,u,a){var f,l,c=[],h=[],p,d=t==="x",v=d?o+s:s;a=a||this._getDataValuesByCount(u,r,i);for(l=0;l<u;l+=1)f=parseFloat(a[l]),f<=i&&f>=r&&(p={},p[t]=e,p[n]=this._getCoordFromValue(r,i,o,f,v,d),c.push(p),h.push(f));return{points:c,values:h}},_hasDataOverflow:function(){var e,t,r;return this.get("setMin")||this.get("setMax")?!0:(e=this.get("roundingMethod"),t=this._actualMinimum,r=this._actualMaximum,n.isNumber(e)&&(n.isNumber(r)&&r>this._dataMaximum||n.isNumber(t)&&t<this._dataMinimum)?!0:!1)}})},"3.15.0",{requires:["axis","axis-numeric-base"]});
