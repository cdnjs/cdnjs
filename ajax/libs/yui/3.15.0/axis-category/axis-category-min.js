/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("axis-category",function(e,t){var n=e.Lang;e.CategoryAxis=e.Base.create("categoryAxis",e.Axis,[e.CategoryImpl],{getMinimumValue:function(){var e=this.get("data"),t=e[0];return t},getMaximumValue:function(){var e=this.get("data"),t=e.length-1,n=e[t];return n},_getLabelByIndex:function(e){var t,n=this.get("data");return t=n[e],t},_getLabelData:function(t,r,i,s,o,u,a,f,l){var c,h,p=[],d=[],v,m,g=this.get("data"),y=u;l=l||g;for(h=0;h<f;h+=1)c=l[h],m=e.Array.indexOf(g,c),n.isNumber(m)&&m>-1&&(v={},v[r]=t,v[i]=this._getCoordFromValue(s,o,a,m,y),p.push(v),d.push(c));return{points:p,values:d}}})},"3.15.0",{requires:["axis","axis-category-base"]});
