/**
 * @license AngularJS v1.3.10
 * (c) 2010-2014 Google, Inc. http://angularjs.org
 * License: MIT
 */
!function(a,b,c){"use strict";/**
 * @ngdoc module
 * @name ngSanitize
 * @description
 *
 * # ngSanitize
 *
 * The `ngSanitize` module provides functionality to sanitize HTML.
 *
 *
 * <div doc-module-components="ngSanitize"></div>
 *
 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.
 */
/*
 * HTML Parser By Misko Hevery (misko@hevery.com)
 * based on:  HTML Parser By John Resig (ejohn.org)
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 *
 * // Use like so:
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 */
/**
 * @ngdoc service
 * @name $sanitize
 * @kind function
 *
 * @description
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
 *   then serialized back to properly escaped html string. This means that no unsafe input can make
 *   it into the returned string, however, since our parser is more strict than a typical browser
 *   parser, it's possible that some obscure input, which would be recognized as valid HTML by a
 *   browser, won't make it through the sanitizer. The input may also contain SVG markup.
 *   The whitelist is configured using the functions `aHrefSanitizationWhitelist` and
 *   `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider `$compileProvider`}.
 *
 * @param {string} html HTML input.
 * @returns {string} Sanitized HTML.
 *
 * @example
   <example module="sanitizeExample" deps="angular-sanitize.js">
   <file name="index.html">
     <script>
         angular.module('sanitizeExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
             $scope.snippet =
               '<p style="color:blue">an html\n' +
               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +
               'snippet</p>';
             $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml($scope.snippet);
             };
           }]);
     </script>
     <div ng-controller="ExampleController">
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <td>Directive</td>
           <td>How</td>
           <td>Source</td>
           <td>Rendered</td>
         </tr>
         <tr id="bind-html-with-sanitize">
           <td>ng-bind-html</td>
           <td>Automatically uses $sanitize</td>
           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind-html="snippet"></div></td>
         </tr>
         <tr id="bind-html-with-trust">
           <td>ng-bind-html</td>
           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>
           <td>
           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
&lt;/div&gt;</pre>
           </td>
           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>
         </tr>
         <tr id="bind-default">
           <td>ng-bind</td>
           <td>Automatically escapes</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
       </div>
   </file>
   <file name="protractor.js" type="protractor">
     it('should sanitize the html snippet by default', function() {
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
     });

     it('should inline raw snippet if bound to a trusted value', function() {
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).
         toBe("<p style=\"color:blue\">an html\n" +
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
              "snippet</p>");
     });

     it('should escape snippet without any filter', function() {
       expect(element(by.css('#bind-default div')).getInnerHtml()).
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
              "snippet&lt;/p&gt;");
     });

     it('should update', function() {
       element(by.model('snippet')).clear();
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-html-with-sanitize div')).getInnerHtml()).
         toBe('new <b>text</b>');
       expect(element(by.css('#bind-html-with-trust div')).getInnerHtml()).toBe(
         'new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-default div')).getInnerHtml()).toBe(
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
     });
   </file>
   </example>
 */
function d(){this.$get=["$$sanitizeUri",function(a){return function(b){"undefined"!=typeof arguments[1]&&(arguments[1].version="taSanitize");var c=[];return g(b,l(c,function(b,c){return!/^unsafe/.test(a(b,c))})),c.join("")}}]}function e(a){var c=[],d=l(c,b.noop);return d.chars(a),c.join("")}function f(a){var b,c={},d=a.split(",");for(b=0;b<d.length;b++)c[d[b]]=!0;return c}/**
 * @example
 * htmlParser(htmlString, {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * });
 *
 * @param {string} html string
 * @param {object} handler
 */
function g(a,c){function d(a,d,f,g){if(d=b.lowercase(d),D[d])for(;k.last()&&E[k.last()];)e("",k.last());C[d]&&k.last()==d&&e("",d),g=z[d]||!!g,g||k.push(d);var i={};f.replace(p,function(a,b,c,d,e){var f=c||d||e||"";i[b]=h(f)}),c.start&&c.start(d,i,g)}function e(a,d){var e,f=0;if(d=b.lowercase(d))
// Find the closest opened tag of the same type
for(f=k.length-1;f>=0&&k[f]!=d;f--);if(f>=0){
// Close all the open elements, up the stack
for(e=k.length-1;e>=f;e--)c.end&&c.end(k[e]);
// Remove the open elements from the stack
k.length=f}}"string"!=typeof a&&(a=null===a||"undefined"==typeof a?"":""+a);var f,g,i,j,k=[],l=a;for(k.last=function(){return k[k.length-1]};a;){
// Make sure we're not in a script or style element
if(j="",g=!0,k.last()&&G[k.last()])a=a.replace(new RegExp("([^]*)<\\s*\\/\\s*"+k.last()+"[^>]*>","i"),function(a,b){return b=b.replace(s,"$1").replace(v,"$1"),c.chars&&c.chars(h(b)),""}),e("",k.last());else{
// White space
if(y.test(a)){if(i=a.match(y)){i[0];c.whitespace&&c.whitespace(i[0]),a=a.replace(i[0],""),g=!1}}else t.test(a)?(i=a.match(t),i&&(c.comment&&c.comment(i[1]),a=a.replace(i[0],""),g=!1)):u.test(a)?(i=a.match(u),i&&(a=a.replace(i[0],""),g=!1)):r.test(a)?(i=a.match(o),i&&(a=a.substring(i[0].length),i[0].replace(o,e),g=!1)):q.test(a)&&(i=a.match(n),i?(
// We only have a valid start-tag if there is a '>'.
i[4]&&(a=a.substring(i[0].length),i[0].replace(n,d)),g=!1):(
// no ending tag found --- this piece should be encoded as an entity.
j+="<",a=a.substring(1)));g&&(f=a.indexOf("<"),j+=f<0?a:a.substring(0,f),a=f<0?"":a.substring(f),c.chars&&c.chars(h(j)))}if(a==l)throw m("badparse","The sanitizer was unable to parse the following block of html: {0}",a);l=a}
// Clean up any remaining tags
e()}/**
 * decodes all entities into regular string
 * @param value
 * @returns {string} A string with decoded entities.
 */
function h(a){if(!a)return"";
// Note: IE8 does not preserve spaces at the start/end of innerHTML
// so we must capture them and reattach them afterward
var b=N.exec(a),c=b[1],d=b[3],e=b[2];
// innerText depends on styling as it doesn't display hidden elements.
// Therefore, it's better to use textContent not to cause unnecessary
// reflows. However, IE<9 don't support textContent so the innerText
// fallback is necessary.
return e&&(M.innerHTML=e.replace(/</g,"&lt;"),e="textContent"in M?M.textContent:M.innerText),c+e+d}/**
 * Escapes all potentially dangerous characters, so that the
 * resulting string can be safely inserted into attribute or
 * element text.
 * @param value
 * @returns {string} escaped text
 */
function i(a){return a.replace(/&/g,"&amp;").replace(w,function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1);return"&#"+(1024*(b-55296)+(c-56320)+65536)+";"}).replace(x,function(a){
// unsafe chars are: \u0000-\u001f \u007f-\u009f \u00ad \u0600-\u0604 \u070f \u17b4 \u17b5 \u200c-\u200f \u2028-\u202f \u2060-\u206f \ufeff \ufff0-\uffff from jslint.com/lint.html
// decimal values are: 0-31, 127-159, 173, 1536-1540, 1807, 6068, 6069, 8204-8207, 8232-8239, 8288-8303, 65279, 65520-65535
var b=a.charCodeAt(0);
// if unsafe character encode
// if unsafe character encode
return b<=159||173==b||b>=1536&&b<=1540||1807==b||6068==b||6069==b||b>=8204&&b<=8207||b>=8232&&b<=8239||b>=8288&&b<=8303||65279==b||b>=65520&&b<=65535?"&#"+b+";":a}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}
// Custom logic for accepting certain style options only - textAngular
// Currently allows only the color, background-color, text-align, float, width and height attributes
// all other attributes should be easily done through classes.
function j(a){var c="",d=a.split(";");return b.forEach(d,function(a){var d=a.split(":");if(2==d.length){var e=O(b.lowercase(d[0])),a=O(b.lowercase(d[1]));(("color"===e||"background-color"===e)&&(a.match(/^rgb\([0-9%,\. ]*\)$/i)||a.match(/^rgba\([0-9%,\. ]*\)$/i)||a.match(/^hsl\([0-9%,\. ]*\)$/i)||a.match(/^hsla\([0-9%,\. ]*\)$/i)||a.match(/^#[0-9a-f]{3,6}$/i)||a.match(/^[a-z]*$/i))||"text-align"===e&&("left"===a||"right"===a||"center"===a||"justify"===a)||"text-decoration"===e&&("underline"===a||"line-through"===a)||"font-weight"===e&&"bold"===a||"font-style"===e&&"italic"===a||"float"===e&&("left"===a||"right"===a||"none"===a)||"vertical-align"===e&&("baseline"===a||"sub"===a||"super"===a||"test-top"===a||"text-bottom"===a||"middle"===a||"top"===a||"bottom"===a||a.match(/[0-9]*(px|em)/)||a.match(/[0-9]+?%/))||"font-size"===e&&("xx-small"===a||"x-small"===a||"small"===a||"medium"===a||"large"===a||"x-large"===a||"xx-large"===a||"larger"===a||"smaller"===a||a.match(/[0-9]*\.?[0-9]*(px|em|rem|mm|q|cm|in|pt|pc|%)/))||("width"===e||"height"===e)&&a.match(/[0-9\.]*(px|em|rem|%)/)||// Reference #520
"direction"===e&&a.match(/^ltr|rtl|initial|inherit$/))&&(c+=e+": "+a+";")}}),c}
// this function is used to manually allow specific attributes on specific tags with certain prerequisites
function k(a,b,c,d){
// catch the div placeholder for the iframe replacement
return!("img"!==a||!b["ta-insert-video"]||"ta-insert-video"!==c&&"allowfullscreen"!==c&&"frameborder"!==c&&("contenteditable"!==c||"false"!==d))}/**
 * create an HTML/XML writer which writes to buffer
 * @param {Array} buf use buf.jain('') to get out sanitized html string
 * @returns {object} in the form of {
 *     start: function(tag, attrs, unary) {},
 *     end: function(tag) {},
 *     chars: function(text) {},
 *     comment: function(text) {}
 * }
 */
function l(a,c){var d=!1,e=b.bind(a,a.push);return{start:function(a,f,g){a=b.lowercase(a),!d&&G[a]&&(d=a),d||H[a]!==!0||(e("<"),e(a),b.forEach(f,function(d,g){var h=b.lowercase(g),l="img"===a&&"src"===h||"background"===h;("style"===h&&""!==(d=j(d))||k(a,f,h,d)||L[h]===!0&&(I[h]!==!0||c(d,l)))&&(e(" "),e(g),e('="'),e(i(d)),e('"'))}),e(g?"/>":">"))},comment:function(a){e(a)},whitespace:function(a){e(i(a))},end:function(a){a=b.lowercase(a),d||H[a]!==!0||(e("</"),e(a),e(">")),a==d&&(d=!1)},chars:function(a){d||e(i(a))}}}var m=b.$$minErr("$sanitize"),n=/^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/,o=/^<\/\s*([\w:-]+)[^>]*>/,p=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,q=/^</,r=/^<\//,s=/<!--(.*?)-->/g,t=/(^<!--.*?-->)/,u=/<!DOCTYPE([^>]*?)>/i,v=/<!\[CDATA\[(.*?)]]>/g,w=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
// Match everything outside of normal chars and " (quote character)
x=/([^\#-~| |!])/g,y=/^(\s+)/,z=f("area,br,col,hr,img,wbr,input"),A=f("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),B=f("rp,rt"),C=b.extend({},B,A),D=b.extend({},A,f("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),E=b.extend({},B,f("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),F=f("animate,animateColor,animateMotion,animateTransform,circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,set,stop,svg,switch,text,title,tspan,use"),G=f("script,style"),H=b.extend({},z,D,E,C,F),I=f("background,cite,href,longdesc,src,usemap,xlink:href"),J=f("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,id,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"),K=f("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,attributeName,attributeType,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan"),L=b.extend({},I,K,J),M=document.createElement("pre"),N=/^(\s*)([\s\S]*?)(\s*)$/,O=function(){
// native trim is way faster: http://jsperf.com/angular-trim-test
// but IE doesn't have it... :-(
// TODO: we should move this into IE/ES5 polyfill
// native trim is way faster: http://jsperf.com/angular-trim-test
// but IE doesn't have it... :-(
// TODO: we should move this into IE/ES5 polyfill
return String.prototype.trim?function(a){return b.isString(a)?a.trim():a}:function(a){return b.isString(a)?a.replace(/^\s\s*/,"").replace(/\s\s*$/,""):a}}();
// define ngSanitize module and register $sanitize service
b.module("ngSanitize",[]).provider("$sanitize",d),/* global sanitizeText: false */
/**
 * @ngdoc filter
 * @name linky
 * @kind function
 *
 * @description
 * Finds links in text input and turns them into html links. Supports http/https/ftp/mailto and
 * plain email address links.
 *
 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.
 *
 * @param {string} text Input text.
 * @param {string} target Window (_blank|_self|_parent|_top) or named frame to open links in.
 * @returns {string} Html-linkified text.
 *
 * @usage
   <span ng-bind-html="linky_expression | linky"></span>
 *
 * @example
   <example module="linkyExample" deps="angular-sanitize.js">
     <file name="index.html">
       <script>
         angular.module('linkyExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', function($scope) {
             $scope.snippet =
               'Pretty text with some links:\n'+
               'http://angularjs.org/,\n'+
               'mailto:us@somewhere.org,\n'+
               'another@somewhere.org,\n'+
               'and one more: ftp://127.0.0.1/.';
             $scope.snippetWithTarget = 'http://angularjs.org/';
           }]);
       </script>
       <div ng-controller="ExampleController">
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <td>Filter</td>
           <td>Source</td>
           <td>Rendered</td>
         </tr>
         <tr id="linky-filter">
           <td>linky filter</td>
           <td>
             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>
           </td>
           <td>
             <div ng-bind-html="snippet | linky"></div>
           </td>
         </tr>
         <tr id="linky-target">
          <td>linky target</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithTarget | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithTarget | linky:'_blank'"></div>
          </td>
         </tr>
         <tr id="escaped-html">
           <td>no filter</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
     </file>
     <file name="protractor.js" type="protractor">
       it('should linkify the snippet with urls', function() {
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
       });

       it('should not linkify snippet without the linky filter', function() {
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
       });

       it('should update', function() {
         element(by.model('snippet')).clear();
         element(by.model('snippet')).sendKeys('new http://link.');
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('new http://link.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
             .toBe('new http://link.');
       });

       it('should work with the target property', function() {
        expect(element(by.id('linky-target')).
            element(by.binding("snippetWithTarget | linky:'_blank'")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
       });
     </file>
   </example>
 */
b.module("ngSanitize").filter("linky",["$sanitize",function(a){var c=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"”’]/,d=/^mailto:/;return function(f,g){function h(a){a&&n.push(e(a))}function i(a,c){n.push("<a "),b.isDefined(g)&&n.push('target="',g,'" '),n.push('href="',a.replace(/"/g,"&quot;"),'">'),h(c),n.push("</a>")}if(!f)return f;for(var j,k,l,m=f,n=[];j=m.match(c);)
// We can not end in these as they are sometimes found at the end of the sentence
k=j[0],
// if we did not match ftp/http/www/mailto then assume mailto
j[2]||j[4]||(k=(j[3]?"http://":"mailto:")+k),l=j.index,h(m.substr(0,l)),i(k,j[0].replace(d,"")),m=m.substring(l+j[0].length);return h(m),a(n.join(""))}}])}(window,window.angular);