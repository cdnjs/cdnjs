/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("base-base",function(e,t){function o(){i.apply(this,arguments),s.apply(this,arguments),r.apply(this,arguments)}var n=e.AttributeCore,r=e.AttributeExtras,i=e.BaseCore,s=e.BaseObservable;o._ATTR_CFG=i._ATTR_CFG.concat(s._ATTR_CFG),o._NON_ATTRS_CFG=i._NON_ATTRS_CFG.concat(s._NON_ATTRS_CFG),o.NAME="base",o.ATTRS=n.protectAttrs(i.ATTRS),o.modifyAttrs=i.modifyAttrs,e.mix(o,i,!1,null,1),e.mix(o,r,!1,null,1),e.mix(o,s,!0,null,1),o.prototype.constructor=o,e.Base=o},"3.15.0",{requires:["attribute-base","base-core","base-observable"]});
