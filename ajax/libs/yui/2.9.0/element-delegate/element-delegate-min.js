/*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
(function(){var A=YAHOO.util.Event,B=[],C={mouseenter:true,mouseleave:true};YAHOO.lang.augmentObject(YAHOO.util.Element.prototype,{delegate:function(J,L,F,H,I){if(YAHOO.lang.isString(F)&&!YAHOO.util.Selector){return false;}if(!A._createDelegate){return false;}var E=A._getType(J),G=this.get("element"),M,K,D=function(N){return M.call(G,N);};if(C[J]){if(!A._createMouseDelegate){return false;}K=A._createMouseDelegate(L,H,I);M=A._createDelegate(function(P,O,N){return K.call(O,P,N);},F,H,I);}else{M=A._createDelegate(L,F,H,I);}B.push([G,E,L,D]);return this.on(E,D);},removeDelegate:function(H,G){var I=A._getType(H),E=A._getCacheIndex(B,this.get("element"),I,G),F,D;if(E>=0){D=B[E];}if(D){F=this.removeListener(D[1],D[3]);if(F){delete B[E][2];delete B[E][3];B.splice(E,1);}}return F;}});}());YAHOO.register("element-delegate",YAHOO.util.Element,{version:"2.9.0",build:"2800"});