/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("io-form",function(e,t){var n=encodeURIComponent;e.IO.stringify=function(t,n){n=n||{};var r=e.IO.prototype._serialize({id:t,useDisabled:n.useDisabled},n.extra&&typeof n.extra=="object"?e.QueryString.stringify(n.extra):n.extra);return r},e.mix(e.IO.prototype,{_serialize:function(t,r){var i=[],s=t.useDisabled||!1,o=0,u=typeof t.id=="string"?t.id:t.id.getAttribute("id"),a,f,l,c,h,p,d,v,m,g;u||(u=e.guid("io:"),t.id.setAttribute("id",u)),f=e.config.doc.getElementById(u);if(!f||!f.elements)return r||"";for(p=0,d=f.elements.length;p<d;++p){a=f.elements[p],h=a.disabled,l=a.name;if(s?l:l&&!h){l=n(l)+"=",c=n(a.value);switch(a.type){case"select-one":a.selectedIndex>-1&&(g=a.options[a.selectedIndex],i[o++]=l+n(g.attributes.value&&g.attributes.value.specified?g.value:g.text));break;case"select-multiple":if(a.selectedIndex>-1)for(v=a.selectedIndex,m=a.options.length;v<m;++v)g=a.options[v],g.selected&&(i[o++]=l+n(g.attributes.value&&g.attributes.value.specified?g.value:g.text));break;case"radio":case"checkbox":a.checked&&(i[o++]=l+c);break;case"file":case undefined:case"reset":case"button":break;case"submit":default:i[o++]=l+c}}}return r&&(i[o++]=r),i.join("&")}},!0)},"3.15.0",{requires:["io-base","node-base"]});
