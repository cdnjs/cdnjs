/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("node-event-simulate",function(e,t){e.Node.prototype.simulate=function(t,n){e.Event.simulate(e.Node.getDOMNode(this),t,n)},e.Node.prototype.simulateGesture=function(t,n,r){e.Event.simulateGesture(this,t,n,r)}},"3.15.0",{requires:["node-base","event-simulate","gesture-simulate"]});
