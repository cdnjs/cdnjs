/*
jQWidgets v12.2.0 (2021-Sep)
Copyright (c) 2011-2021 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.extend(a.jqx._jqxChart.prototype,{_moduleWaterfall:true,_isSummary:function(e,c){var f=this.seriesGroups[e];for(var d=0;d<f.series.length;d++){if(undefined===f.series[d].summary){continue}var b=this._getDataValue(c,f.series[d].summary,e);if(undefined!==b){return true}}return false},_applyWaterfall:function(x,z,g,f,A,h,C,e,p){var o=this.seriesGroups[g];if(x.length==0){return x}var t=f;var b={};var c=[];var d=undefined;var D=[];for(var v=0;v<o.series.length;v++){D.push(this._isSerieVisible(g,v))}var r={};for(var w=0;w<z;w++){var m=f;var n=0;var l=this._isSummary(g,w);for(var v=0;v<x.length;v++){if(!D[v]){continue}var B=0;if(l){B=m==f?A:0;x[v][w].value=b[v];x[v][w].summary=true;d=x[v][w].value<B;if(e){d=!d}var s=0;if(!isNaN(h)){s=this._getDataPointOffsetDiff(x[v][w].value+n,n==0?A:n,B||A,h,C,f,e)}else{s=this._getDataPointOffsetDiff(x[v][w].value,B,B,NaN,C,f,e)}x[v][w].to=m+(d?s:-s);x[v][w].from=m;if(p){n+=x[v][w].value;m=x[v][w].to}continue}var u=p?-1:v;if(isNaN(x[v][w].value)){continue}if(undefined===r[u]){B=A;r[u]=true}d=x[v][w].value<B;if(e){d=!d}var q=NaN,s=NaN;if(!p){q=w==0?f:x[v][c[v]].to}else{q=t}var s=0;if(!isNaN(h)){s=this._getDataPointOffsetDiff(x[v][w].value+(isNaN(b[u])?0:b[u]),isNaN(b[u])?A:b[u],B||A,h,C,q,e)}else{s=this._getDataPointOffsetDiff(x[v][w].value,B,B,NaN,C,f,e)}x[v][w].to=t=q+(d?s:-s);x[v][w].from=q;if(isNaN(b[u])){b[u]=x[v][w].value}else{b[u]+=x[v][w].value}if(u==-1){if(isNaN(b[v])){b[v]=x[v][w].value}else{b[v]+=x[v][w].value}}if(!p){c[v]=w}}}return x}})})(jqxBaseFramework);

