/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("axis-stacked-base",function(e,t){function n(){}n.NAME="stackedImpl",n.prototype={_type:"stacked",_updateMinAndMax:function(){var e=0,t=0,n=0,r=0,i=0,s=0,o,u,a=this.get("keys"),f=this.get("setMin"),l=this.get("setMax");for(o in a)a.hasOwnProperty(o)&&(i=Math.max(i,a[o].length));for(;s<i;++s){n=0,r=0;for(o in a)if(a.hasOwnProperty(o)){u=a[o][s];if(isNaN(u))continue;u>=0?n+=u:r+=u}n>0?e=Math.max(e,n):e=Math.max(e,r),r<0?t=Math.min(t,r):t=Math.min(t,n)}this._actualMaximum=e,this._actualMinimum=t,l&&(e=this._setMaximum),f&&(t=this._setMinimum),this._roundMinAndMax(t,e,f,l)}},e.StackedImpl=n,e.StackedAxisBase=e.Base.create("stackedAxisBase",e.NumericAxisBase,[e.StackedImpl])},"3.17.2",{requires:["axis-numeric-base"]});
