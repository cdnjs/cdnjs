/*!
* Qoopido.js library v3.4.3, 2014-6-11
* https://github.com/dlueth/qoopido.js
* (c) 2014 Dirk Lueth
* Dual licensed under MIT and GPL
*//*!
* Qoopido.js library
*
* version: 3.4.3
* date:    2014-6-11
* author:  Dirk Lueth <info@qoopido.com>
* website: https://github.com/dlueth/qoopido.js
*
* Copyright (c) 2014 Dirk Lueth
*
* Dual licensed under the MIT and GPL licenses.
* - http://www.opensource.org/licenses/mit-license.php
* - http://www.gnu.org/copyleft/gpl.html
*/
!function(e){window.qoopido.register("jquery/function/prefetch",e,["jquery"])}(function(e,r,n,t,i){"use strict";var u=e.jquery||i.jQuery,f=u("head"),o=[];return u.prefetch=function(){var e=u.unique(u('a[rel="prefetch"]').removeAttr("rel").map(function(){return u(this).attr("href")}));e.each(function(e,r){-1===u.inArray(r,o)&&(u("<link />",{rel:"prefetch",href:r}).appendTo(f),u("<link />",{rel:"prerender",href:r}).appendTo(f))})},u});