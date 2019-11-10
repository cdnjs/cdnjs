/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.0-1 (2019-02-04)
 */
!function(){"use strict";var t=tinymce.util.Tools.resolve("tinymce.PluginManager"),c=tinymce.util.Tools.resolve("tinymce.util.Tools"),n=function(t,n){var e,i=t.dom,o=t.selection.getSelectedBlocks();o.length&&(e=i.getAttrib(o[0],"dir"),c.each(o,function(t){i.getParent(t.parentNode,'*[dir="'+n+'"]',i.getRoot())||i.setAttrib(t,"dir",e!==n?n:null)}),t.nodeChanged())},e=function(t){t.addCommand("mceDirectionLTR",function(){n(t,"ltr")}),t.addCommand("mceDirectionRTL",function(){n(t,"rtl")})},i=function(n){var e=[];return c.each("h1 h2 h3 h4 h5 h6 div p".split(" "),function(t){e.push(t+"[dir="+n+"]")}),e.join(",")},o=function(n){n.ui.registry.addToggleButton("ltr",{tooltip:"Left to right",icon:"ltr",onAction:function(){return n.execCommand("mceDirectionLTR")},onSetup:function(t){return n.selection.selectorChangedWithUnbind(i("ltr"),t.setActive).unbind}}),n.ui.registry.addToggleButton("rtl",{tooltip:"Right to left",icon:"rtl",onAction:function(){return n.execCommand("mceDirectionRTL")},onSetup:function(t){return n.selection.selectorChangedWithUnbind(i("rtl"),t.setActive).unbind}})};t.add("directionality",function(t){e(t),o(t)}),function r(){}}();