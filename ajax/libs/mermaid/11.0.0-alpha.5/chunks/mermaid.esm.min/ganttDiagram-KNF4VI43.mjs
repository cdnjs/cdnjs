import{m as ke}from"./chunk-WGNKRIJQ.mjs";import{a as He}from"./chunk-OGOS6LNA.mjs";import"./chunk-MG65RD4Q.mjs";import{A as ce,B as le,C as ue,D as de,E as fe,F as Lt,G as It,H as he,Ka as ye,Na as pe,Oa as ge,Pa as be,Qa as xe,Ra as Te,Sa as ve,Ta as we,Va as et,a as c,c as Dt,e as rt,f as $t,g as st,i as te,j as ee,ja as me,k as ne,l as ie,m as dt,o as re,s as se,t as Ct,u as St,v as Et,w as Mt,x as At,y as ae,z as oe}from"./chunk-ONLVDUB4.mjs";var De=Dt((Ft,Wt)=>{"use strict";(function(t,n){typeof Ft=="object"&&typeof Wt<"u"?Wt.exports=n():typeof define=="function"&&define.amd?define(n):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_isoWeek=n()})(Ft,function(){"use strict";var t="day";return function(n,a,i){var s=c(function(T){return T.add(4-T.isoWeekday(),t)},"a"),d=a.prototype;d.isoWeekYear=function(){return s(this).year()},d.isoWeek=function(T){if(!this.$utils().u(T))return this.add(7*(T-this.isoWeek()),t);var E,I,Y,O,U=s(this),b=(E=this.isoWeekYear(),I=this.$u,Y=(I?i.utc:i)().year(E).startOf("year"),O=4-Y.isoWeekday(),Y.isoWeekday()>4&&(O+=7),Y.add(O,t));return U.diff(b,"week")+1},d.isoWeekday=function(T){return this.$utils().u(T)?this.day()||7:this.day(this.day()%7?T:T-7)};var m=d.startOf;d.startOf=function(T,E){var I=this.$utils(),Y=!!I.u(E)||E;return I.p(T)==="isoweek"?Y?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):m.bind(this)(T,E)}}})});var Ce=Dt((Ot,Vt)=>{"use strict";(function(t,n){typeof Ot=="object"&&typeof Vt<"u"?Vt.exports=n():typeof define=="function"&&define.amd?define(n):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_customParseFormat=n()})(Ot,function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},n=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,a=/\d\d/,i=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,d={},m=c(function(b){return(b=+b)+(b>68?1900:2e3)},"s"),T=c(function(b){return function(D){this[b]=+D}},"a"),E=[/[+-]\d\d:?(\d\d)?|Z/,function(b){(this.zone||(this.zone={})).offset=function(D){if(!D||D==="Z")return 0;var g=D.match(/([+-]|\d\d)/g),M=60*g[1]+(+g[2]||0);return M===0?0:g[0]==="+"?-M:M}(b)}],I=c(function(b){var D=d[b];return D&&(D.indexOf?D:D.s.concat(D.f))},"h"),Y=c(function(b,D){var g,M=d.meridiem;if(M){for(var z=1;z<=24;z+=1)if(b.indexOf(M(z,0,D))>-1){g=z>12;break}}else g=b===(D?"pm":"PM");return g},"u"),O={A:[s,function(b){this.afternoon=Y(b,!1)}],a:[s,function(b){this.afternoon=Y(b,!0)}],S:[/\d/,function(b){this.milliseconds=100*+b}],SS:[a,function(b){this.milliseconds=10*+b}],SSS:[/\d{3}/,function(b){this.milliseconds=+b}],s:[i,T("seconds")],ss:[i,T("seconds")],m:[i,T("minutes")],mm:[i,T("minutes")],H:[i,T("hours")],h:[i,T("hours")],HH:[i,T("hours")],hh:[i,T("hours")],D:[i,T("day")],DD:[a,T("day")],Do:[s,function(b){var D=d.ordinal,g=b.match(/\d+/);if(this.day=g[0],D)for(var M=1;M<=31;M+=1)D(M).replace(/\[|\]/g,"")===b&&(this.day=M)}],M:[i,T("month")],MM:[a,T("month")],MMM:[s,function(b){var D=I("months"),g=(I("monthsShort")||D.map(function(M){return M.slice(0,3)})).indexOf(b)+1;if(g<1)throw new Error;this.month=g%12||g}],MMMM:[s,function(b){var D=I("months").indexOf(b)+1;if(D<1)throw new Error;this.month=D%12||D}],Y:[/[+-]?\d+/,T("year")],YY:[a,function(b){this.year=m(b)}],YYYY:[/\d{4}/,T("year")],Z:E,ZZ:E};function U(b){var D,g;D=b,g=d&&d.formats;for(var M=(b=D.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(H,y,w){var x=w&&w.toUpperCase();return y||g[w]||t[w]||g[x].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(p,r,f){return r||f.slice(1)})})).match(n),z=M.length,P=0;P<z;P+=1){var Z=M[P],X=O[Z],N=X&&X[0],B=X&&X[1];M[P]=B?{regex:N,parser:B}:Z.replace(/^\[|\]$/g,"")}return function(H){for(var y={},w=0,x=0;w<z;w+=1){var p=M[w];if(typeof p=="string")x+=p.length;else{var r=p.regex,f=p.parser,h=H.slice(x),o=r.exec(h)[0];f.call(y,o),H=H.replace(o,"")}}return function(k){var e=k.afternoon;if(e!==void 0){var L=k.hours;e?L<12&&(k.hours+=12):L===12&&(k.hours=0),delete k.afternoon}}(y),y}}return c(U,"c"),function(b,D,g){g.p.customParseFormat=!0,b&&b.parseTwoDigitYear&&(m=b.parseTwoDigitYear);var M=D.prototype,z=M.parse;M.parse=function(P){var Z=P.date,X=P.utc,N=P.args;this.$u=X;var B=N[1];if(typeof B=="string"){var H=N[2]===!0,y=N[3]===!0,w=H||y,x=N[2];y&&(x=N[2]),d=this.$locale(),!H&&x&&(d=g.Ls[x]),this.$d=function(h,o,k){try{if(["x","X"].indexOf(o)>-1)return new Date((o==="X"?1e3:1)*h);var e=U(o)(h),L=e.year,u=e.month,l=e.day,v=e.hours,A=e.minutes,C=e.seconds,S=e.milliseconds,V=e.zone,_=new Date,R=l||(L||u?1:_.getDate()),J=L||_.getFullYear(),tt=0;L&&!u||(tt=u>0?u-1:_.getMonth());var lt=v||0,kt=A||0,ut=C||0,F=S||0;return V?new Date(Date.UTC(J,tt,R,lt,kt,ut,F+60*V.offset*1e3)):k?new Date(Date.UTC(J,tt,R,lt,kt,ut,F)):new Date(J,tt,R,lt,kt,ut,F)}catch{return new Date("")}}(Z,B,X),this.init(),x&&x!==!0&&(this.$L=this.locale(x).$L),w&&Z!=this.format(B)&&(this.$d=new Date("")),d={}}else if(B instanceof Array)for(var p=B.length,r=1;r<=p;r+=1){N[1]=B[r-1];var f=g.apply(this,N);if(f.isValid()){this.$d=f.$d,this.$L=f.$L,this.init();break}r===p&&(this.$d=new Date(""))}else z.call(this,P)}}})});var Se=Dt((zt,Pt)=>{"use strict";(function(t,n){typeof zt=="object"&&typeof Pt<"u"?Pt.exports=n():typeof define=="function"&&define.amd?define(n):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_advancedFormat=n()})(zt,function(){"use strict";return function(t,n){var a=n.prototype,i=a.format;a.format=function(s){var d=this,m=this.$locale();if(!this.isValid())return i.bind(this)(s);var T=this.$utils(),E=(s||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(I){switch(I){case"Q":return Math.ceil((d.$M+1)/3);case"Do":return m.ordinal(d.$D);case"gggg":return d.weekYear();case"GGGG":return d.isoWeekYear();case"wo":return m.ordinal(d.week(),"W");case"w":case"ww":return T.s(d.week(),I==="w"?1:2,"0");case"W":case"WW":return T.s(d.isoWeek(),I==="W"?1:2,"0");case"k":case"kk":return T.s(String(d.$H===0?24:d.$H),I==="k"?1:2,"0");case"X":return Math.floor(d.$d.getTime()/1e3);case"x":return d.$d.getTime();case"z":return"["+d.offsetName()+"]";case"zzz":return"["+d.offsetName("long")+"]";default:return I}});return i.bind(this)(E)}}})});var Yt=function(){var t=c(function(p,r,f,h){for(f=f||{},h=p.length;h--;f[p[h]]=r);return f},"o"),n=[6,8,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,32,33,35,37],a=[1,25],i=[1,26],s=[1,27],d=[1,28],m=[1,29],T=[1,30],E=[1,31],I=[1,9],Y=[1,10],O=[1,11],U=[1,12],b=[1,13],D=[1,14],g=[1,15],M=[1,16],z=[1,18],P=[1,19],Z=[1,20],X=[1,21],N=[1,22],B=[1,24],H=[1,32],y={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,dateFormat:19,inclusiveEndDates:20,topAxis:21,axisFormat:22,tickInterval:23,excludes:24,includes:25,todayMarker:26,title:27,acc_title:28,acc_title_value:29,acc_descr:30,acc_descr_value:31,acc_descr_multiline_value:32,section:33,clickStatement:34,taskTxt:35,taskData:36,click:37,callbackname:38,callbackargs:39,href:40,clickStatementDebug:41,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",19:"dateFormat",20:"inclusiveEndDates",21:"topAxis",22:"axisFormat",23:"tickInterval",24:"excludes",25:"includes",26:"todayMarker",27:"title",28:"acc_title",29:"acc_title_value",30:"acc_descr",31:"acc_descr_value",32:"acc_descr_multiline_value",33:"section",35:"taskTxt",36:"taskData",37:"click",38:"callbackname",39:"callbackargs",40:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[34,2],[34,3],[34,3],[34,4],[34,3],[34,4],[34,2],[41,2],[41,3],[41,3],[41,4],[41,3],[41,4],[41,2]],performAction:c(function(r,f,h,o,k,e,L){var u=e.length-1;switch(k){case 1:return e[u-1];case 2:this.$=[];break;case 3:e[u-1].push(e[u]),this.$=e[u-1];break;case 4:case 5:this.$=e[u];break;case 6:case 7:this.$=[];break;case 8:o.setWeekday("monday");break;case 9:o.setWeekday("tuesday");break;case 10:o.setWeekday("wednesday");break;case 11:o.setWeekday("thursday");break;case 12:o.setWeekday("friday");break;case 13:o.setWeekday("saturday");break;case 14:o.setWeekday("sunday");break;case 15:o.setDateFormat(e[u].substr(11)),this.$=e[u].substr(11);break;case 16:o.enableInclusiveEndDates(),this.$=e[u].substr(18);break;case 17:o.TopAxis(),this.$=e[u].substr(8);break;case 18:o.setAxisFormat(e[u].substr(11)),this.$=e[u].substr(11);break;case 19:o.setTickInterval(e[u].substr(13)),this.$=e[u].substr(13);break;case 20:o.setExcludes(e[u].substr(9)),this.$=e[u].substr(9);break;case 21:o.setIncludes(e[u].substr(9)),this.$=e[u].substr(9);break;case 22:o.setTodayMarker(e[u].substr(12)),this.$=e[u].substr(12);break;case 24:o.setDiagramTitle(e[u].substr(6)),this.$=e[u].substr(6);break;case 25:this.$=e[u].trim(),o.setAccTitle(this.$);break;case 26:case 27:this.$=e[u].trim(),o.setAccDescription(this.$);break;case 28:o.addSection(e[u].substr(8)),this.$=e[u].substr(8);break;case 30:o.addTask(e[u-1],e[u]),this.$="task";break;case 31:this.$=e[u-1],o.setClickEvent(e[u-1],e[u],null);break;case 32:this.$=e[u-2],o.setClickEvent(e[u-2],e[u-1],e[u]);break;case 33:this.$=e[u-2],o.setClickEvent(e[u-2],e[u-1],null),o.setLink(e[u-2],e[u]);break;case 34:this.$=e[u-3],o.setClickEvent(e[u-3],e[u-2],e[u-1]),o.setLink(e[u-3],e[u]);break;case 35:this.$=e[u-2],o.setClickEvent(e[u-2],e[u],null),o.setLink(e[u-2],e[u-1]);break;case 36:this.$=e[u-3],o.setClickEvent(e[u-3],e[u-1],e[u]),o.setLink(e[u-3],e[u-2]);break;case 37:this.$=e[u-1],o.setLink(e[u-1],e[u]);break;case 38:case 44:this.$=e[u-1]+" "+e[u];break;case 39:case 40:case 42:this.$=e[u-2]+" "+e[u-1]+" "+e[u];break;case 41:case 43:this.$=e[u-3]+" "+e[u-2]+" "+e[u-1]+" "+e[u];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(n,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:a,13:i,14:s,15:d,16:m,17:T,18:E,19:I,20:Y,21:O,22:U,23:b,24:D,25:g,26:M,27:z,28:P,30:Z,32:X,33:N,34:23,35:B,37:H},t(n,[2,7],{1:[2,1]}),t(n,[2,3]),{9:33,11:17,12:a,13:i,14:s,15:d,16:m,17:T,18:E,19:I,20:Y,21:O,22:U,23:b,24:D,25:g,26:M,27:z,28:P,30:Z,32:X,33:N,34:23,35:B,37:H},t(n,[2,5]),t(n,[2,6]),t(n,[2,15]),t(n,[2,16]),t(n,[2,17]),t(n,[2,18]),t(n,[2,19]),t(n,[2,20]),t(n,[2,21]),t(n,[2,22]),t(n,[2,23]),t(n,[2,24]),{29:[1,34]},{31:[1,35]},t(n,[2,27]),t(n,[2,28]),t(n,[2,29]),{36:[1,36]},t(n,[2,8]),t(n,[2,9]),t(n,[2,10]),t(n,[2,11]),t(n,[2,12]),t(n,[2,13]),t(n,[2,14]),{38:[1,37],40:[1,38]},t(n,[2,4]),t(n,[2,25]),t(n,[2,26]),t(n,[2,30]),t(n,[2,31],{39:[1,39],40:[1,40]}),t(n,[2,37],{38:[1,41]}),t(n,[2,32],{40:[1,42]}),t(n,[2,33]),t(n,[2,35],{39:[1,43]}),t(n,[2,34]),t(n,[2,36])],defaultActions:{},parseError:c(function(r,f){if(f.recoverable)this.trace(r);else{var h=new Error(r);throw h.hash=f,h}},"parseError"),parse:c(function(r){var f=this,h=[0],o=[],k=[null],e=[],L=this.table,u="",l=0,v=0,A=0,C=2,S=1,V=e.slice.call(arguments,1),_=Object.create(this.lexer),R={yy:{}};for(var J in this.yy)Object.prototype.hasOwnProperty.call(this.yy,J)&&(R.yy[J]=this.yy[J]);_.setInput(r,R.yy),R.yy.lexer=_,R.yy.parser=this,typeof _.yylloc>"u"&&(_.yylloc={});var tt=_.yylloc;e.push(tt);var lt=_.options&&_.options.ranges;typeof R.yy.parseError=="function"?this.parseError=R.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function kt(j){h.length=h.length-2*j,k.length=k.length-j,e.length=e.length-j}c(kt,"popStack");function ut(){var j;return j=o.pop()||_.lex()||S,typeof j!="number"&&(j instanceof Array&&(o=j,j=o.pop()),j=f.symbols_[j]||j),j}c(ut,"lex");for(var F,yt,nt,q,In,wt,it={},pt,K,Kt,gt;;){if(nt=h[h.length-1],this.defaultActions[nt]?q=this.defaultActions[nt]:((F===null||typeof F>"u")&&(F=ut()),q=L[nt]&&L[nt][F]),typeof q>"u"||!q.length||!q[0]){var _t="";gt=[];for(pt in L[nt])this.terminals_[pt]&&pt>C&&gt.push("'"+this.terminals_[pt]+"'");_.showPosition?_t="Parse error on line "+(l+1)+`:
`+_.showPosition()+`
Expecting `+gt.join(", ")+", got '"+(this.terminals_[F]||F)+"'":_t="Parse error on line "+(l+1)+": Unexpected "+(F==S?"end of input":"'"+(this.terminals_[F]||F)+"'"),this.parseError(_t,{text:_.match,token:this.terminals_[F]||F,line:_.yylineno,loc:tt,expected:gt})}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+nt+", token: "+F);switch(q[0]){case 1:h.push(F),k.push(_.yytext),e.push(_.yylloc),h.push(q[1]),F=null,yt?(F=yt,yt=null):(v=_.yyleng,u=_.yytext,l=_.yylineno,tt=_.yylloc,A>0&&A--);break;case 2:if(K=this.productions_[q[1]][1],it.$=k[k.length-K],it._$={first_line:e[e.length-(K||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(K||1)].first_column,last_column:e[e.length-1].last_column},lt&&(it._$.range=[e[e.length-(K||1)].range[0],e[e.length-1].range[1]]),wt=this.performAction.apply(it,[u,v,l,R.yy,q[1],k,e].concat(V)),typeof wt<"u")return wt;K&&(h=h.slice(0,-1*K*2),k=k.slice(0,-1*K),e=e.slice(0,-1*K)),h.push(this.productions_[q[1]][0]),k.push(it.$),e.push(it._$),Kt=L[h[h.length-2]][h[h.length-1]],h.push(Kt);break;case 3:return!0}}return!0},"parse")},w=function(){var p={EOF:1,parseError:c(function(f,h){if(this.yy.parser)this.yy.parser.parseError(f,h);else throw new Error(f)},"parseError"),setInput:function(r,f){return this.yy=f||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var f=r.match(/(?:\r\n?|\n).*/g);return f?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var f=r.length,h=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-f),this.offset-=f;var o=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var k=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===o.length?this.yylloc.first_column:0)+o[o.length-h.length].length-h[0].length:this.yylloc.first_column-f},this.options.ranges&&(this.yylloc.range=[k[0],k[0]+this.yyleng-f]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),f=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+f+"^"},test_match:function(r,f){var h,o,k;if(this.options.backtrack_lexer&&(k={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(k.yylloc.range=this.yylloc.range.slice(0))),o=r[0].match(/(?:\r\n?|\n).*/g),o&&(this.yylineno+=o.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:o?o[o.length-1].length-o[o.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],h=this.performAction.call(this,this.yy,this,f,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var e in k)this[e]=k[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,f,h,o;this._more||(this.yytext="",this.match="");for(var k=this._currentRules(),e=0;e<k.length;e++)if(h=this._input.match(this.rules[k[e]]),h&&(!f||h[0].length>f[0].length)){if(f=h,o=e,this.options.backtrack_lexer){if(r=this.test_match(h,k[e]),r!==!1)return r;if(this._backtrack){f=!1;continue}else return!1}else if(!this.options.flex)break}return f?(r=this.test_match(f,k[o]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:c(function(){var f=this.next();return f||this.lex()},"lex"),begin:c(function(f){this.conditionStack.push(f)},"begin"),popState:c(function(){var f=this.conditionStack.length-1;return f>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(f){return f=this.conditionStack.length-1-Math.abs(f||0),f>=0?this.conditionStack[f]:"INITIAL"},"topState"),pushState:c(function(f){this.begin(f)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(f,h,o,k){var e=k;switch(o){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),28;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),30;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:break;case 15:this.begin("href");break;case 16:this.popState();break;case 17:return 40;case 18:this.begin("callbackname");break;case 19:this.popState();break;case 20:this.popState(),this.begin("callbackargs");break;case 21:return 38;case 22:this.popState();break;case 23:return 39;case 24:this.begin("click");break;case 25:this.popState();break;case 26:return 37;case 27:return 4;case 28:return 19;case 29:return 20;case 30:return 21;case 31:return 22;case 32:return 23;case 33:return 25;case 34:return 24;case 35:return 26;case 36:return 12;case 37:return 13;case 38:return 14;case 39:return 15;case 40:return 16;case 41:return 17;case 42:return 18;case 43:return"date";case 44:return 27;case 45:return"accDescription";case 46:return 33;case 47:return 35;case 48:return 36;case 49:return":";case 50:return 6;case 51:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[22,23],inclusive:!1},callbackname:{rules:[19,20,21],inclusive:!1},href:{rules:[16,17],inclusive:!1},click:{rules:[25,26],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,15,18,24,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51],inclusive:!0}}};return p}();y.lexer=w;function x(){this.yy={}}return c(x,"Parser"),x.prototype=y,y.Parser=x,new x}();Yt.parser=Yt;var _e=Yt;var Me=rt(He(),1),G=rt($t(),1),Ae=rt(De(),1),Le=rt(Ce(),1),Ie=rt(Se(),1);G.default.extend(Ae.default);G.default.extend(Le.default);G.default.extend(Ie.default);var Q="",jt="",Gt,Xt="",ft=[],ht=[],Ht={},qt=[],Tt=[],ot="",Ut="",Ye=["active","done","crit","milestone"],Zt=[],mt=!1,Qt=!1,Jt="sunday",Nt=0,qe=c(function(){qt=[],Tt=[],ot="",Zt=[],bt=0,Rt=void 0,xt=void 0,W=[],Q="",jt="",Ut="",Gt=void 0,Xt="",ft=[],ht=[],mt=!1,Qt=!1,Nt=0,Ht={},pe(),Jt="sunday"},"clear"),Ue=c(function(t){jt=t},"setAxisFormat"),Ze=c(function(){return jt},"getAxisFormat"),Qe=c(function(t){Gt=t},"setTickInterval"),Je=c(function(){return Gt},"getTickInterval"),Ke=c(function(t){Xt=t},"setTodayMarker"),$e=c(function(){return Xt},"getTodayMarker"),tn=c(function(t){Q=t},"setDateFormat"),en=c(function(){mt=!0},"enableInclusiveEndDates"),nn=c(function(){return mt},"endDatesAreInclusive"),rn=c(function(){Qt=!0},"enableTopAxis"),sn=c(function(){return Qt},"topAxisEnabled"),an=c(function(t){Ut=t},"setDisplayMode"),on=c(function(){return Ut},"getDisplayMode"),cn=c(function(){return Q},"getDateFormat"),ln=c(function(t){ft=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),un=c(function(){return ft},"getIncludes"),dn=c(function(t){ht=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),fn=c(function(){return ht},"getExcludes"),hn=c(function(){return Ht},"getLinks"),mn=c(function(t){ot=t,qt.push(t)},"addSection"),kn=c(function(){return qt},"getSections"),yn=c(function(){let t=Ee(),n=10,a=0;for(;!t&&a<n;)t=Ee(),a++;return Tt=W,Tt},"getTasks"),Fe=c(function(t,n,a,i){return i.includes(t.format(n.trim()))?!1:t.isoWeekday()>=6&&a.includes("weekends")||a.includes(t.format("dddd").toLowerCase())?!0:a.includes(t.format(n.trim()))},"isInvalidDate"),pn=c(function(t){Jt=t},"setWeekday"),gn=c(function(){return Jt},"getWeekday"),We=c(function(t,n,a,i){if(!a.length||t.manualEndTime)return;let s;t.startTime instanceof Date?s=(0,G.default)(t.startTime):s=(0,G.default)(t.startTime,n,!0),s=s.add(1,"d");let d;t.endTime instanceof Date?d=(0,G.default)(t.endTime):d=(0,G.default)(t.endTime,n,!0);let[m,T]=bn(s,d,n,a,i);t.endTime=m.toDate(),t.renderEndTime=T},"checkTaskDates"),bn=c(function(t,n,a,i,s){let d=!1,m=null;for(;t<=n;)d||(m=n.toDate()),d=Fe(t,a,i,s),d&&(n=n.add(1,"d")),t=t.add(1,"d");return[n,m]},"fixTaskDates"),Bt=c(function(t,n,a){a=a.trim();let s=/^after\s+([\d\w- ]+)/.exec(a.trim());if(s!==null){let m=null;if(s[1].split(" ").forEach(function(T){let E=ct(T);E!==void 0&&(m?E.endTime>m.endTime&&(m=E):m=E)}),m)return m.endTime;{let T=new Date;return T.setHours(0,0,0,0),T}}let d=(0,G.default)(a,n.trim(),!0);if(d.isValid())return d.toDate();{st.debug("Invalid date:"+a),st.debug("With date format:"+n.trim());let m=new Date(a);if(m===void 0||isNaN(m.getTime())||m.getFullYear()<-1e4||m.getFullYear()>1e4)throw new Error("Invalid date:"+a);return m}},"getStartDate"),Oe=c(function(t){let n=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return n!==null?[Number.parseFloat(n[1]),n[2]]:[NaN,"ms"]},"parseDuration"),Ve=c(function(t,n,a,i=!1){a=a.trim();let s=(0,G.default)(a,n.trim(),!0);if(s.isValid())return i&&(s=s.add(1,"d")),s.toDate();let d=(0,G.default)(t),[m,T]=Oe(a);if(!Number.isNaN(m)){let E=d.add(m,T);E.isValid()&&(d=E)}return d.toDate()},"getEndDate"),bt=0,at=c(function(t){return t===void 0?(bt=bt+1,"task"+bt):t},"parseId"),xn=c(function(t,n){let a;n.substr(0,1)===":"?a=n.substr(1,n.length):a=n;let i=a.split(","),s={};Re(i,s,Ye);for(let m=0;m<i.length;m++)i[m]=i[m].trim();let d="";switch(i.length){case 1:s.id=at(),s.startTime=t.endTime,d=i[0];break;case 2:s.id=at(),s.startTime=Bt(void 0,Q,i[0]),d=i[1];break;case 3:s.id=at(i[0]),s.startTime=Bt(void 0,Q,i[1]),d=i[2];break;default:}return d&&(s.endTime=Ve(s.startTime,Q,d,mt),s.manualEndTime=(0,G.default)(d,"YYYY-MM-DD",!0).isValid(),We(s,Q,ht,ft)),s},"compileData"),Tn=c(function(t,n){let a;n.substr(0,1)===":"?a=n.substr(1,n.length):a=n;let i=a.split(","),s={};Re(i,s,Ye);for(let d=0;d<i.length;d++)i[d]=i[d].trim();switch(i.length){case 1:s.id=at(),s.startTime={type:"prevTaskEnd",id:t},s.endTime={data:i[0]};break;case 2:s.id=at(),s.startTime={type:"getStartDate",startData:i[0]},s.endTime={data:i[1]};break;case 3:s.id=at(i[0]),s.startTime={type:"getStartDate",startData:i[1]},s.endTime={data:i[2]};break;default:}return s},"parseData"),Rt,xt,W=[],ze={},vn=c(function(t,n){let a={section:ot,type:ot,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:n},task:t,classes:[]},i=Tn(xt,n);a.raw.startTime=i.startTime,a.raw.endTime=i.endTime,a.id=i.id,a.prevTaskId=xt,a.active=i.active,a.done=i.done,a.crit=i.crit,a.milestone=i.milestone,a.order=Nt,Nt++;let s=W.push(a);xt=a.id,ze[a.id]=s-1},"addTask"),ct=c(function(t){let n=ze[t];return W[n]},"findTaskById"),wn=c(function(t,n){let a={section:ot,type:ot,description:t,task:t,classes:[]},i=xn(Rt,n);a.startTime=i.startTime,a.endTime=i.endTime,a.id=i.id,a.active=i.active,a.done=i.done,a.crit=i.crit,a.milestone=i.milestone,Rt=a,Tt.push(a)},"addTaskOrg"),Ee=c(function(){let t=c(function(a){let i=W[a],s="";switch(W[a].raw.startTime.type){case"prevTaskEnd":{let d=ct(i.prevTaskId);i.startTime=d.endTime;break}case"getStartDate":s=Bt(void 0,Q,W[a].raw.startTime.startData),s&&(W[a].startTime=s);break}return W[a].startTime&&(W[a].endTime=Ve(W[a].startTime,Q,W[a].raw.endTime.data,mt),W[a].endTime&&(W[a].processed=!0,W[a].manualEndTime=(0,G.default)(W[a].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),We(W[a],Q,ht,ft))),W[a].processed},"compileTask"),n=!0;for(let[a,i]of W.entries())t(a),n=n&&i.processed;return n},"compileTasks"),_n=c(function(t,n){let a=n;et().securityLevel!=="loose"&&(a=(0,Me.sanitizeUrl)(n)),t.split(",").forEach(function(i){ct(i)!==void 0&&(Ne(i,()=>{window.open(a,"_self")}),Ht[i]=a)}),Pe(t,"clickable")},"setLink"),Pe=c(function(t,n){t.split(",").forEach(function(a){let i=ct(a);i!==void 0&&i.classes.push(n)})},"setClass"),Dn=c(function(t,n,a){if(et().securityLevel!=="loose"||n===void 0)return;let i=[];if(typeof a=="string"){i=a.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let d=0;d<i.length;d++){let m=i[d].trim();m.charAt(0)==='"'&&m.charAt(m.length-1)==='"'&&(m=m.substr(1,m.length-2)),i[d]=m}}i.length===0&&i.push(t),ct(t)!==void 0&&Ne(t,()=>{ke.runFunc(n,...i)})},"setClickFun"),Ne=c(function(t,n){Zt.push(function(){let a=document.querySelector(`[id="${t}"]`);a!==null&&a.addEventListener("click",function(){n()})},function(){let a=document.querySelector(`[id="${t}-text"]`);a!==null&&a.addEventListener("click",function(){n()})})},"pushFun"),Cn=c(function(t,n,a){t.split(",").forEach(function(i){Dn(i,n,a)}),Pe(t,"clickable")},"setClickEvent"),Sn=c(function(t){Zt.forEach(function(n){n(t)})},"bindFunctions"),Be={getConfig:()=>et().gantt,clear:qe,setDateFormat:tn,getDateFormat:cn,enableInclusiveEndDates:en,endDatesAreInclusive:nn,enableTopAxis:rn,topAxisEnabled:sn,setAxisFormat:Ue,getAxisFormat:Ze,setTickInterval:Qe,getTickInterval:Je,setTodayMarker:Ke,getTodayMarker:$e,setAccTitle:ge,getAccTitle:be,setDiagramTitle:ve,getDiagramTitle:we,setDisplayMode:an,getDisplayMode:on,setAccDescription:xe,getAccDescription:Te,addSection:mn,getSections:kn,getTasks:yn,addTask:vn,findTaskById:ct,addTaskOrg:wn,setIncludes:ln,getIncludes:un,setExcludes:dn,getExcludes:fn,setClickEvent:Cn,setLink:_n,getLinks:hn,bindFunctions:Sn,parseDuration:Oe,isInvalidDate:Fe,setWeekday:pn,getWeekday:gn};function Re(t,n,a){let i=!0;for(;i;)i=!1,a.forEach(function(s){let d="^\\s*"+s+"\\s*$",m=new RegExp(d);t[0].match(m)&&(n[s]=!0,t.shift(1),i=!0)})}c(Re,"getTaskTags");var vt=rt($t(),1);var En=c(function(){st.debug("Something is calling, setConf, remove the call")},"setConf"),je={monday:oe,tuesday:ce,wednesday:le,thursday:ue,friday:de,saturday:fe,sunday:ae},Mn=c((t,n)=>{let a=[...t].map(()=>-1/0),i=[...t].sort((d,m)=>d.startTime-m.startTime||d.order-m.order),s=0;for(let d of i)for(let m=0;m<a.length;m++)if(d.startTime>=a[m]){a[m]=d.endTime,d.order=m+n,m>s&&(s=m);break}return s},"getMaxIntersections"),$,An=c(function(t,n,a,i){let s=et().gantt,d=et().securityLevel,m;d==="sandbox"&&(m=dt("#i"+n));let T=d==="sandbox"?dt(m.nodes()[0].contentDocument.body):dt("body"),E=d==="sandbox"?m.nodes()[0].contentDocument:document,I=E.getElementById(n);$=I.parentElement.offsetWidth,$===void 0&&($=1200),s.useWidth!==void 0&&($=s.useWidth);let Y=i.db.getTasks(),O=[];for(let y of Y)O.push(y.type);O=H(O);let U={},b=2*s.topPadding;if(i.db.getDisplayMode()==="compact"||s.displayMode==="compact"){let y={};for(let x of Y)y[x.section]===void 0?y[x.section]=[x]:y[x.section].push(x);let w=0;for(let x of Object.keys(y)){let p=Mn(y[x],w)+1;w+=p,b+=p*(s.barHeight+s.barGap),U[x]=p}}else{b+=Y.length*(s.barHeight+s.barGap);for(let y of O)U[y]=Y.filter(w=>w.type===y).length}I.setAttribute("viewBox","0 0 "+$+" "+b);let D=T.select(`[id="${n}"]`),g=he().domain([ee(Y,function(y){return y.startTime}),te(Y,function(y){return y.endTime})]).rangeRound([0,$-s.leftPadding-s.rightPadding]);function M(y,w){let x=y.startTime,p=w.startTime,r=0;return x>p?r=1:x<p&&(r=-1),r}c(M,"taskCompare"),Y.sort(M),z(Y,$,b),ye(D,b,$,s.useMaxWidth),D.append("text").text(i.db.getDiagramTitle()).attr("x",$/2).attr("y",s.titleTopMargin).attr("class","titleText");function z(y,w,x){let p=s.barHeight,r=p+s.barGap,f=s.topPadding,h=s.leftPadding,o=se().domain([0,O.length]).range(["#00B9FA","#F95002"]).interpolate(re);Z(r,f,h,w,x,y,i.db.getExcludes(),i.db.getIncludes()),X(h,f,w,x),P(y,r,f,h,p,o,w,x),N(r,f,h,p,o),B(h,f,w,x)}c(z,"makeGant");function P(y,w,x,p,r,f,h){let k=[...new Set(y.map(l=>l.order))].map(l=>y.find(v=>v.order===l));D.append("g").selectAll("rect").data(k).enter().append("rect").attr("x",0).attr("y",function(l,v){return v=l.order,v*w+x-2}).attr("width",function(){return h-s.rightPadding/2}).attr("height",w).attr("class",function(l){for(let[v,A]of O.entries())if(l.type===A)return"section section"+v%s.numberSectionStyles;return"section section0"});let e=D.append("g").selectAll("rect").data(y).enter(),L=i.db.getLinks();if(e.append("rect").attr("id",function(l){return l.id}).attr("rx",3).attr("ry",3).attr("x",function(l){return l.milestone?g(l.startTime)+p+.5*(g(l.endTime)-g(l.startTime))-.5*r:g(l.startTime)+p}).attr("y",function(l,v){return v=l.order,v*w+x}).attr("width",function(l){return l.milestone?r:g(l.renderEndTime||l.endTime)-g(l.startTime)}).attr("height",r).attr("transform-origin",function(l,v){return v=l.order,(g(l.startTime)+p+.5*(g(l.endTime)-g(l.startTime))).toString()+"px "+(v*w+x+.5*r).toString()+"px"}).attr("class",function(l){let v="task",A="";l.classes.length>0&&(A=l.classes.join(" "));let C=0;for(let[V,_]of O.entries())l.type===_&&(C=V%s.numberSectionStyles);let S="";return l.active?l.crit?S+=" activeCrit":S=" active":l.done?l.crit?S=" doneCrit":S=" done":l.crit&&(S+=" crit"),S.length===0&&(S=" task"),l.milestone&&(S=" milestone "+S),S+=C,S+=" "+A,v+S}),e.append("text").attr("id",function(l){return l.id+"-text"}).text(function(l){return l.task}).attr("font-size",s.fontSize).attr("x",function(l){let v=g(l.startTime),A=g(l.renderEndTime||l.endTime);l.milestone&&(v+=.5*(g(l.endTime)-g(l.startTime))-.5*r),l.milestone&&(A=v+r);let C=this.getBBox().width;return C>A-v?A+C+1.5*s.leftPadding>h?v+p-5:A+p+5:(A-v)/2+v+p}).attr("y",function(l,v){return v=l.order,v*w+s.barHeight/2+(s.fontSize/2-2)+x}).attr("text-height",r).attr("class",function(l){let v=g(l.startTime),A=g(l.endTime);l.milestone&&(A=v+r);let C=this.getBBox().width,S="";l.classes.length>0&&(S=l.classes.join(" "));let V=0;for(let[R,J]of O.entries())l.type===J&&(V=R%s.numberSectionStyles);let _="";return l.active&&(l.crit?_="activeCritText"+V:_="activeText"+V),l.done?l.crit?_=_+" doneCritText"+V:_=_+" doneText"+V:l.crit&&(_=_+" critText"+V),l.milestone&&(_+=" milestoneText"),C>A-v?A+C+1.5*s.leftPadding>h?S+" taskTextOutsideLeft taskTextOutside"+V+" "+_:S+" taskTextOutsideRight taskTextOutside"+V+" "+_+" width-"+C:S+" taskText taskText"+V+" "+_+" width-"+C}),et().securityLevel==="sandbox"){let l;l=dt("#i"+n);let v=l.nodes()[0].contentDocument;e.filter(function(A){return L[A.id]!==void 0}).each(function(A){var C=v.querySelector("#"+A.id),S=v.querySelector("#"+A.id+"-text");let V=C.parentNode;var _=v.createElement("a");_.setAttribute("xlink:href",L[A.id]),_.setAttribute("target","_top"),V.appendChild(_),_.appendChild(C),_.appendChild(S)})}}c(P,"drawRects");function Z(y,w,x,p,r,f,h,o){if(h.length===0&&o.length===0)return;let k,e;for(let{startTime:C,endTime:S}of f)(k===void 0||C<k)&&(k=C),(e===void 0||S>e)&&(e=S);if(!k||!e)return;if((0,vt.default)(e).diff((0,vt.default)(k),"year")>5){st.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}let L=i.db.getDateFormat(),u=[],l=null,v=(0,vt.default)(k);for(;v.valueOf()<=e;)i.db.isInvalidDate(v,L,h,o)?l?l.end=v:l={start:v,end:v}:l&&(u.push(l),l=null),v=v.add(1,"d");D.append("g").selectAll("rect").data(u).enter().append("rect").attr("id",function(C){return"exclude-"+C.start.format("YYYY-MM-DD")}).attr("x",function(C){return g(C.start)+x}).attr("y",s.gridLineStartPadding).attr("width",function(C){let S=C.end.add(1,"day");return g(S)-g(C.start)}).attr("height",r-w-s.gridLineStartPadding).attr("transform-origin",function(C,S){return(g(C.start)+x+.5*(g(C.end)-g(C.start))).toString()+"px "+(S*y+.5*r).toString()+"px"}).attr("class","exclude-range")}c(Z,"drawExcludeDays");function X(y,w,x,p){let r=ie(g).tickSize(-p+w+s.gridLineStartPadding).tickFormat(It(i.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d")),h=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(i.db.getTickInterval()||s.tickInterval);if(h!==null){let o=h[1],k=h[2],e=i.db.getWeekday()||s.weekday;switch(k){case"millisecond":r.ticks(Ct.every(o));break;case"second":r.ticks(St.every(o));break;case"minute":r.ticks(Et.every(o));break;case"hour":r.ticks(Mt.every(o));break;case"day":r.ticks(At.every(o));break;case"week":r.ticks(je[e].every(o));break;case"month":r.ticks(Lt.every(o));break}}if(D.append("g").attr("class","grid").attr("transform","translate("+y+", "+(p-50)+")").call(r).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),i.db.topAxisEnabled()||s.topAxis){let o=ne(g).tickSize(-p+w+s.gridLineStartPadding).tickFormat(It(i.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d"));if(h!==null){let k=h[1],e=h[2],L=i.db.getWeekday()||s.weekday;switch(e){case"millisecond":o.ticks(Ct.every(k));break;case"second":o.ticks(St.every(k));break;case"minute":o.ticks(Et.every(k));break;case"hour":o.ticks(Mt.every(k));break;case"day":o.ticks(At.every(k));break;case"week":o.ticks(je[L].every(k));break;case"month":o.ticks(Lt.every(k));break}}D.append("g").attr("class","grid").attr("transform","translate("+y+", "+w+")").call(o).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(X,"makeGrid");function N(y,w){let x=0,p=Object.keys(U).map(r=>[r,U[r]]);D.append("g").selectAll("text").data(p).enter().append(function(r){let f=r[0].split(me.lineBreakRegex),h=-(f.length-1)/2,o=E.createElementNS("http://www.w3.org/2000/svg","text");o.setAttribute("dy",h+"em");for(let[k,e]of f.entries()){let L=E.createElementNS("http://www.w3.org/2000/svg","tspan");L.setAttribute("alignment-baseline","central"),L.setAttribute("x","10"),k>0&&L.setAttribute("dy","1em"),L.textContent=e,o.appendChild(L)}return o}).attr("x",10).attr("y",function(r,f){if(f>0)for(let h=0;h<f;h++)return x+=p[f-1][1],r[1]*y/2+x*y+w;else return r[1]*y/2+w}).attr("font-size",s.sectionFontSize).attr("class",function(r){for(let[f,h]of O.entries())if(r[0]===h)return"sectionTitle sectionTitle"+f%s.numberSectionStyles;return"sectionTitle"})}c(N,"vertLabels");function B(y,w,x,p){let r=i.db.getTodayMarker();if(r==="off")return;let f=D.append("g").attr("class","today"),h=new Date,o=f.append("line");o.attr("x1",g(h)+y).attr("x2",g(h)+y).attr("y1",s.titleTopMargin).attr("y2",p-s.titleTopMargin).attr("class","today"),r!==""&&o.attr("style",r.replace(/,/g,";"))}c(B,"drawToday");function H(y){let w={},x=[];for(let p=0,r=y.length;p<r;++p)Object.prototype.hasOwnProperty.call(w,y[p])||(w[y[p]]=!0,x.push(y[p]));return x}c(H,"checkUnique")},"draw"),Ge={setConf:En,draw:An};var Ln=c(t=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,"getStyles"),Xe=Ln;var ni={parser:_e,db:Be,renderer:Ge,styles:Xe};export{ni as diagram};
