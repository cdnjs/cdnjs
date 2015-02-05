/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-line-stacked",function(e,t){e.StackedLineSeries=e.Base.create("stackedLineSeries",e.LineSeries,[e.StackingUtil],{setAreaData:function(){e.StackedLineSeries.superclass.setAreaData.apply(this),this._stackCoordinates.apply(this)}},{ATTRS:{type:{value:"stackedLine"}}})},"3.15.0",{requires:["series-stacked","series-line"]});
