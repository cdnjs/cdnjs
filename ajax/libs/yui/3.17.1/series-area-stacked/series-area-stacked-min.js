/*
YUI 3.17.1 (build 0eb5a52)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-area-stacked",function(e,t){e.StackedAreaSeries=e.Base.create("stackedAreaSeries",e.AreaSeries,[e.StackingUtil],{setAreaData:function(){e.StackedAreaSeries.superclass.setAreaData.apply(this),this._stackCoordinates.apply(this)},drawSeries:function(){this.drawFill.apply(this,this._getStackedClosingPoints())}},{ATTRS:{type:{value:"stackedArea"}}})},"3.17.1",{requires:["series-stacked","series-area"]});
