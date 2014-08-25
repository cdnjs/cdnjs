/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("event-mousewheel",function(e,t){var n="DOMMouseScroll",r=function(t){var r=e.Array(t,0,!0),i;return e.UA.gecko?(r[0]=n,i=e.config.win):i=e.config.doc,r.length<3?r[2]=i:r.splice(2,0,i),r};e.Env.evt.plugins.mousewheel={on:function(){return e.Event._attach(r(arguments))},detach:function(){return e.Event.detach.apply(e.Event,r(arguments))}}},"3.15.0",{requires:["node-base"]});
