/*
 Selection save and restore module for Rangy.
 Saves and restores user selections using marker invisible elements in the DOM.

 Part of Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Depends on Rangy core.

 Copyright 2012, Tim Down
 Licensed under the MIT license.
 Version: 1.2.3
 Build date: 26 February 2012
*/
rangy.createModule("SaveRestore",function(h,m){function n(a,g){var e="selectionBoundary_"+ +new Date+"_"+(""+Math.random()).slice(2),c,f=p.getDocument(a.startContainer),d=a.cloneRange();d.collapse(g);c=f.createElement("span");c.id=e;c.style.lineHeight="0";c.style.display="none";c.className="rangySelectionBoundary";c.appendChild(f.createTextNode(q));d.insertNode(c);d.detach();return c}function o(a,g,e,c){if(a=(a||document).getElementById(e)){g[c?"setStartBefore":"setEndBefore"](a);a.parentNode.removeChild(a)}else m.warn("Marker element has been removed. Cannot restore selection.")}
function r(a,g){return g.compareBoundaryPoints(a.START_TO_START,a)}function k(a,g){var e=(a||document).getElementById(g);e&&e.parentNode.removeChild(e)}h.requireModules(["DomUtil","DomRange","WrappedRange"]);var p=h.dom,q="\ufeff";h.saveSelection=function(a){a=a||window;var g=a.document;if(h.isSelectionValid(a)){var e=h.getSelection(a),c=e.getAllRanges(),f=[],d,j;c.sort(r);for(var b=0,i=c.length;b<i;++b){d=c[b];if(d.collapsed){j=n(d,false);f.push({markerId:j.id,collapsed:true})}else{j=n(d,false);
d=n(d,true);f[b]={startMarkerId:d.id,endMarkerId:j.id,collapsed:false,backwards:c.length==1&&e.isBackwards()}}}for(b=i-1;b>=0;--b){d=c[b];if(d.collapsed)d.collapseBefore((g||document).getElementById(f[b].markerId));else{d.setEndBefore((g||document).getElementById(f[b].endMarkerId));d.setStartAfter((g||document).getElementById(f[b].startMarkerId))}}e.setRanges(c);return{win:a,doc:g,rangeInfos:f,restored:false}}else m.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.")};
h.restoreSelection=function(a,g){if(!a.restored){for(var e=a.rangeInfos,c=h.getSelection(a.win),f=[],d=e.length,j=d-1,b,i;j>=0;--j){b=e[j];i=h.createRange(a.doc);if(b.collapsed)if(b=(a.doc||document).getElementById(b.markerId)){b.style.display="inline";var l=b.previousSibling;if(l&&l.nodeType==3){b.parentNode.removeChild(b);i.collapseToPoint(l,l.length)}else{i.collapseBefore(b);b.parentNode.removeChild(b)}}else m.warn("Marker element has been removed. Cannot restore selection.");else{o(a.doc,i,b.startMarkerId,
true);o(a.doc,i,b.endMarkerId,false)}d==1&&i.normalizeBoundaries();f[j]=i}if(d==1&&g&&h.features.selectionHasExtend&&e[0].backwards){c.removeAllRanges();c.addRange(f[0],true)}else c.setRanges(f);a.restored=true}};h.removeMarkerElement=k;h.removeMarkers=function(a){for(var g=a.rangeInfos,e=0,c=g.length,f;e<c;++e){f=g[e];if(f.collapsed)k(a.doc,f.markerId);else{k(a.doc,f.startMarkerId);k(a.doc,f.endMarkerId)}}}});
