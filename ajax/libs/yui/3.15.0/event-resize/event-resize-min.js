/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-resize",function(e,t){e.Event.define("windowresize",{on:e.UA.gecko&&e.UA.gecko<1.91?function(t,n,r){n._handle=e.Event.attach("resize",function(e){r.fire(e)})}:function(t,n,r){var i=e.config.windowResizeDelay||100;n._handle=e.Event.attach("resize",function(t){n._timer&&n._timer.cancel(),n._timer=e.later(i,e,function(){r.fire(t)})})},detach:function(e,t){t._timer&&t._timer.cancel(),t._handle.detach()}})},"3.15.0",{requires:["node-base","event-synthetic"]});
