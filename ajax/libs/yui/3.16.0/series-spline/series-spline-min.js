/*
YUI 3.16.0 (build 76f0e08)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-spline",function(e,t){e.SplineSeries=e.Base.create("splineSeries",e.LineSeries,[e.CurveUtil,e.Lines],{drawSeries:function(){this.drawSpline()}},{ATTRS:{type:{value:"spline"}}})},"3.16.0",{requires:["series-line","series-curve-util"]});
