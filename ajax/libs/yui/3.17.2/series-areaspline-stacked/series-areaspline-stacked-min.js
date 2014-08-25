/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-areaspline-stacked",function(e,t){e.StackedAreaSplineSeries=e.Base.create("stackedAreaSplineSeries",e.AreaSeries,[e.CurveUtil,e.StackingUtil],{drawSeries:function(){this._stackCoordinates(),this.drawStackedAreaSpline()}},{ATTRS:{type:{value:"stackedAreaSpline"}}})},"3.17.2",{requires:["series-stacked","series-areaspline"]});
