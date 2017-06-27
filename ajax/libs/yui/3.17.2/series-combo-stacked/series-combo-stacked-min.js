/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("series-combo-stacked",function(e,t){e.StackedComboSeries=e.Base.create("stackedComboSeries",e.ComboSeries,[e.StackingUtil],{setAreaData:function(){e.StackedComboSeries.superclass.setAreaData.apply(this),this._stackCoordinates.apply(this)},drawSeries:function(){this.get("showAreaFill")&&this.drawFill.apply(this,this._getStackedClosingPoints()),this.get("showLines")&&this.drawLines(),this.get("showMarkers")&&this.drawPlots()}},{ATTRS:{type:{value:"stackedCombo"},showAreaFill:{value:!0}}})},"3.17.2",{requires:["series-stacked","series-combo"]});
