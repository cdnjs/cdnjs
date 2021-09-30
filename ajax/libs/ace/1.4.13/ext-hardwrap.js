define("ace/ext/hardwrap",["require","exports","module","ace/range"],function(e,t,n){"use strict";function i(e,t){function d(e,t,n){if(e.length<t)return;var r=e.slice(0,t),i=e.slice(t),s=/^(?:(\s+)|(\S+)(\s+))/.exec(i),o=/(?:(\s+)|(\s+)(\S+))$/.exec(r),u=0,a=0;o&&!o[2]&&(u=t-o[1].length,a=t),s&&!s[2]&&(u||(u=t),a=t+s[1].length);if(u)return{start:u,end:a};if(o&&o[2]&&o.index>n)return{start:o.index,end:o.index+o[3].length}}var n=t.column||e.getOption("printMarginColumn"),i=Math.min(t.startRow,t.endRow),s=Math.max(t.startRow,t.endRow),o=e.session;while(i<=s){var u=o.getLine(i);if(u.length>n){var a=d(u,n,5);a&&o.replace(new r(i,a.start,i,a.end),"\n"),s++}else if(/\S/.test(u)&&i!=s){var f=o.getLine(i+1);if(f&&/\S/.test(f)){var l=u.replace(/\s+$/,""),c=f.replace(/^\s+/,""),h=l+" "+c,a=d(h,n,5);if(a&&a.start>l.length||h.length<n){var p=new r(i,l.length,i+1,f.length-c.length);o.replace(p," "),i--,s--}}}i++}}var r=e("../range").Range;t.hardWrap=i});                (function() {
                    window.require(["ace/ext/hardwrap"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            