/*!
 * jQuery Cookiebar Plugin
 * https://github.com/carlwoodhouse/jquery.cookieBar
 *
 * Copyright 2012, Carl Woodhouse
 * Disclaimer: if you still get fined for not complying with the eu cookielaw, it's not our fault.
 */
 
!function(a){a.fn.cookieBar=function(b){var c=a.extend({closeButton:"none",secure:!1,path:"/",domain:""},b);return this.each(function(){var d=a(this);d.hide(),"none"==c.closeButton&&(d.append('<a class="cookiebar-close">Continue</a>'),c=a.extend({closeButton:".cookiebar-close"},b)),"hide"!=a.cookie("cookiebar")&&d.show(),d.find(c.closeButton).click(function(){return d.hide(),a.cookie("cookiebar","hide",{path:c.path,secure:c.secure,domain:c.domain,expires:30}),!1})})},a.cookieBar=function(b){a("body").prepend('<div class="ui-widget"><div style="display: none;" class="cookie-message ui-widget-header blue"><p>By using this website you allow us to place cookies on your computer. They are harmless and never personally identify you.</p></div></div>'),a(".cookie-message").cookieBar(b)}}(jQuery),

/*!
 * Dependancy:
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */

function(a){a.cookie=function(b,c,d){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(c))||null===c||void 0===c)){if(d=a.extend({},d),(null===c||void 0===c)&&(d.expires=-1),"number"==typeof d.expires){var e=d.expires,f=d.expires=new Date;f.setDate(f.getDate()+e)}return c=String(c),document.cookie=[encodeURIComponent(b),"=",d.raw?c:encodeURIComponent(c),d.expires?"; expires="+d.expires.toUTCString():"",d.path?"; path="+d.path:"",d.domain?"; domain="+d.domain:"",d.secure?"; secure":""].join("")}d=c||{};for(var g,h=d.raw?function(a){return a}:decodeURIComponent,i=document.cookie.split("; "),j=0;g=i[j]&&i[j].split("=");j++)if(h(g[0])===b)return h(g[1]||"");return null}}(jQuery);