/* ===========================================================
 * trumbowyg.pasteimage.js v1.0
 * Basic base64 paste plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Alexandre Demode (Alex-D)
 *          Twitter : @AlexandreDemode
 *          Website : alex-d.fr
 */
!function(e){"use strict";e.extend(!0,e.trumbowyg,{plugins:{pasteImage:{init:function(e){e.pasteHandlers.push((function(t){try{for(var a,n=(t.originalEvent||t).clipboardData.items,i=!1,r=n.length-1;r>=0;r-=1)n[r].type.match(/^image\//)&&((a=new FileReader).onloadend=function(t){e.execCmd("insertImage",t.target.result,!1,!0)},a.readAsDataURL(n[r].getAsFile()),i=!0);i&&(t.stopPropagation(),t.preventDefault())}catch(e){}}))}}}})}(jQuery);