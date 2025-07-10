/*! License details at fancyapps.com/license */
const e=function(e){var t=(new DOMParser).parseFromString(e,"text/html").body;if(t.childElementCount>1){for(var n=document.createElement("div");t.firstChild;)n.appendChild(t.firstChild);return n}let r=t.firstChild;return!r||r instanceof HTMLElement?r:((n=document.createElement("div")).appendChild(r),n)};export{e as stringToHtml};
