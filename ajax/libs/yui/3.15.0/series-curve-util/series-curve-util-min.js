/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-curve-util",function(e,t){function n(){}n.prototype={getCurveControlPoints:function(e,t){var n=[],r=1,i=e.length-1,s=[],o=[];if(i<1)return null;n[0]={startx:e[0],starty:t[0],endx:e[1],endy:t[1]};if(i===1)return n[0].ctrlx1=(2*e[0]+e[1])/3,n[0].ctrly2=(2*t[0]+t[1])/3,n[0].ctrlx2=2*n[0].ctrlx1-e[0],n[0].ctrly2=2*n[0].ctrly1-t[0],n;for(;r<i;++r)n.push({startx:Math.round(e[r]),starty:Math.round(t[r]),endx:Math.round(e[r+1]),endy:Math.round(t[r+1])}),s[r]=4*e[r]+2*e[r+1],o[r]=4*t[r]+2*t[r+1];s[0]=e[0]+2*e[1],s[i-1]=(8*e[i-1]+e[i])/2,s=this.getControlPoints(s.concat()),o[0]=t[0]+2*t[1],o[i-1]=(8*t[i-1]+t[i])/2,o=this.getControlPoints(o.concat());for(r=0;r<i;++r)n[r].ctrlx1=Math.round(s[r]),n[r].ctrly1=Math.round(o[r]),r<i-1?(n[r].ctrlx2=Math.round(2*e[r+1]-s[r+1]),n[r].ctrly2=Math.round(2*t[r+1]-o[r+1])):(n[r].ctrlx2=Math.round((e[i]+s[i-1])/2),n[r].ctrly2=Math.round((t[i]+o[i-1])/2));return n},getControlPoints:function(e){var t=e.length,n=[],r=[],i=2,s=1;n[0]=e[0]/i;for(;s<t;++s)r[s]=1/i,i=(s<t-1?4:3.5)-r[s],n[s]=(e[s]-n[s-1])/i;for(s=1;s<t;++s)n[t-s-1]-=r[t-s]*n[t-s];return n}},e.CurveUtil=n},"3.15.0");
