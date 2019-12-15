/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.13 (2019-08-06)
 */
!function(){"use strict";var n=tinymce.util.Tools.resolve("tinymce.PluginManager"),o=function(n){var e=n.getParam("nonbreaking_force_tab",0);return"boolean"==typeof e?!0===e?3:0:e},i=function(n){return n.getParam("nonbreaking_wrap",!0,"boolean")},a=function(n,e){for(var t="",o=0;o<e;o++)t+=n;return t},r=function(n,e){var t,o=i(n)||n.plugins.visualchars?'<span class="'+((t=n).plugins.visualchars&&t.plugins.visualchars.isEnabled()?"mce-nbsp-wrap mce-nbsp":"mce-nbsp-wrap")+'" contenteditable="false">'+a("&nbsp;",e)+"</span>":a("&nbsp;",e);n.undoManager.transact(function(){return n.insertContent(o)})},e=function(n){n.addCommand("mceNonBreaking",function(){r(n,1)})},c=tinymce.util.Tools.resolve("tinymce.util.VK"),t=function(e){var t=o(e);0<t&&e.on("keydown",function(n){if(n.keyCode===c.TAB&&!n.isDefaultPrevented()){if(n.shiftKey)return;n.preventDefault(),n.stopImmediatePropagation(),r(e,t)}})},u=function(n){n.ui.registry.addButton("nonbreaking",{icon:"non-breaking",tooltip:"Nonbreaking space",onAction:function(){return n.execCommand("mceNonBreaking")}}),n.ui.registry.addMenuItem("nonbreaking",{icon:"non-breaking",text:"Nonbreaking space",onAction:function(){return n.execCommand("mceNonBreaking")}})};!function s(){n.add("nonbreaking",function(n){e(n),u(n),t(n)})}()}();