/* ===========================================================
 * trumbowyg.pasteembed.js v1.0
 * Url paste to iframe with noembed. Plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Max Seelig
 *          Facebook : https://facebook.com/maxse
 *          Website : https://www.maxmade.nl/
 */
!function(t){"use strict";var e={enabled:!0,endpoints:["https://noembed.com/embed?nowrap=on","https://api.maxmade.nl/url2iframe/embed"]};t.extend(!0,t.trumbowyg,{plugins:{pasteEmbed:{init:function(n){n.o.plugins.pasteEmbed=t.extend(!0,{},e,n.o.plugins.pasteEmbed||{}),n.o.plugins.pasteEmbed.enabled&&n.pasteHandlers.push((function(e){try{var a=(e.originalEvent||e).clipboardData.getData("Text"),r=n.o.plugins.pasteEmbed.endpoints,s=null;if(a.startsWith("http")){e.stopPropagation(),e.preventDefault();var i={url:a.trim()},o="",p=0;s&&s.transport&&s.transport.abort(),s=t.ajax({crossOrigin:!0,url:r[p],type:"GET",data:i,cache:!1,dataType:"jsonp",success:function(t){t.html?(p=0,o=t.html):p+=1},error:function(){p+=1},complete:function(){0===o.length&&p<r.length-1&&(this.url=r[p],this.data=i,t.ajax(this)),p===r.length-1&&(o=t("<a>",{href:a,text:a}).prop("outerHTML")),o.length>0&&(p=0,n.execCmd("insertHTML",o))}})}}catch(t){}}))}}}})}(jQuery);