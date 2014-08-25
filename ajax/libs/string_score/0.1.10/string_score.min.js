/*!
 * string_score.js: String Scoring Algorithm 0.1.10 
 *
 * http://joshaven.com/string_score
 * https://github.com/joshaven/string_score
 *
 * Copyright (C) 2009-2011 Joshaven Potter <yourtech@gmail.com>
 * Special thanks to all of the contributors listed here https://github.com/joshaven/string_score
 * MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Date: Tue Mar 1 2011
*/
String.prototype.score=function(m,s){if(this==m){return 1}if(m==""){return 0}var f=0,q=m.length,g=this,p=g.length,o,k,e=1,j;for(var d=0,r,n,h,a,b,l;d<q;++d){h=m.charAt(d);a=g.indexOf(h.toLowerCase());b=g.indexOf(h.toUpperCase());l=Math.min(a,b);n=(l>-1)?l:Math.max(a,b);if(n===-1){if(s){e+=1-s;continue}else{return 0}}else{r=0.1}if(g[n]===h){r+=0.1}if(n===0){r+=0.6;if(d===0){o=1}}else{if(g.charAt(n-1)===" "){r+=0.8}}g=g.substring(n+1,p);f+=r}k=f/q;j=((k*(q/p))+k)/2;j=j/e;if(o&&(j+0.15<1)){j+=0.15}return j};