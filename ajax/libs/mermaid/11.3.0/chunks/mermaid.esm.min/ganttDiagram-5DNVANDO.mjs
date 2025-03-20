import{m as Ct}from"./chunk-JCRXNOLL.mjs";import{a as Qt}from"./chunk-TI4EEUUG.mjs";import{L as it,M as rt,P as st,Q as at,R as ot,S as ct,T as lt,U as ut,V as dt,X as te,a as nt,b as ue,ba as ft,ca as ht,da as mt,ea as kt,fa as ke,ga as yt,ja as pt,ka as Me,la as Ae,ma as Le,na as Ie,oa as Ye,pa as gt,qa as bt,ra as xt,sa as Tt,ta as vt,ua as wt,va as _t,wa as We,xa as Fe,ya as Dt}from"./chunk-XP6OA2RL.mjs";import"./chunk-6BY5RJGC.mjs";import{a as o,b as Ee,e as le}from"./chunk-GTKDMUJJ.mjs";var Et=Ee((Oe,Pe)=>{"use strict";(function(e,t){typeof Oe=="object"&&typeof Pe<"u"?Pe.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self).dayjs_plugin_isoWeek=t()})(Oe,function(){"use strict";var e="day";return function(t,s,a){var r=o(function(D){return D.add(4-D.isoWeekday(),e)},"a"),f=s.prototype;f.isoWeekYear=function(){return r(this).year()},f.isoWeek=function(D){if(!this.$utils().u(D))return this.add(7*(D-this.isoWeek()),e);var _,L,S,F,G=r(this),z=(_=this.isoWeekYear(),L=this.$u,S=(L?a.utc:a)().year(_).startOf("year"),F=4-S.isoWeekday(),S.isoWeekday()>4&&(F+=7),S.add(F,e));return G.diff(z,"week")+1},f.isoWeekday=function(D){return this.$utils().u(D)?this.day()||7:this.day(this.day()%7?D:D-7)};var m=f.startOf;f.startOf=function(D,_){var L=this.$utils(),S=!!L.u(_)||_;return L.p(D)==="isoweek"?S?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):m.bind(this)(D,_)}}})});var Mt=Ee((ze,Ne)=>{"use strict";(function(e,t){typeof ze=="object"&&typeof Ne<"u"?Ne.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self).dayjs_plugin_customParseFormat=t()})(ze,function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,s=/\d/,a=/\d\d/,r=/\d\d?/,f=/\d*[^-_:/,()\s\d]+/,m={},D=o(function(p){return(p=+p)+(p>68?1900:2e3)},"a"),_=o(function(p){return function(k){this[p]=+k}},"f"),L=[/[+-]\d\d:?(\d\d)?|Z/,function(p){(this.zone||(this.zone={})).offset=function(k){if(!k||k==="Z")return 0;var A=k.match(/([+-]|\d\d)/g),I=60*A[1]+(+A[2]||0);return I===0?0:A[0]==="+"?-I:I}(p)}],S=o(function(p){var k=m[p];return k&&(k.indexOf?k:k.s.concat(k.f))},"u"),F=o(function(p,k){var A,I=m.meridiem;if(I){for(var N=1;N<=24;N+=1)if(p.indexOf(I(N,0,k))>-1){A=N>12;break}}else A=p===(k?"pm":"PM");return A},"d"),G={A:[f,function(p){this.afternoon=F(p,!1)}],a:[f,function(p){this.afternoon=F(p,!0)}],Q:[s,function(p){this.month=3*(p-1)+1}],S:[s,function(p){this.milliseconds=100*+p}],SS:[a,function(p){this.milliseconds=10*+p}],SSS:[/\d{3}/,function(p){this.milliseconds=+p}],s:[r,_("seconds")],ss:[r,_("seconds")],m:[r,_("minutes")],mm:[r,_("minutes")],H:[r,_("hours")],h:[r,_("hours")],HH:[r,_("hours")],hh:[r,_("hours")],D:[r,_("day")],DD:[a,_("day")],Do:[f,function(p){var k=m.ordinal,A=p.match(/\d+/);if(this.day=A[0],k)for(var I=1;I<=31;I+=1)k(I).replace(/\[|\]/g,"")===p&&(this.day=I)}],w:[r,_("week")],ww:[a,_("week")],M:[r,_("month")],MM:[a,_("month")],MMM:[f,function(p){var k=S("months"),A=(S("monthsShort")||k.map(function(I){return I.slice(0,3)})).indexOf(p)+1;if(A<1)throw new Error;this.month=A%12||A}],MMMM:[f,function(p){var k=S("months").indexOf(p)+1;if(k<1)throw new Error;this.month=k%12||k}],Y:[/[+-]?\d+/,_("year")],YY:[a,function(p){this.year=D(p)}],YYYY:[/\d{4}/,_("year")],Z:L,ZZ:L};function z(p){var k,A;k=p,A=m&&m.formats;for(var I=(p=k.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(g,v,b){var x=b&&b.toUpperCase();return v||A[b]||e[b]||A[x].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(y,w,c){return w||c.slice(1)})})).match(t),N=I.length,R=0;R<N;R+=1){var K=I[R],U=G[K],B=U&&U[0],j=U&&U[1];I[R]=j?{regex:B,parser:j}:K.replace(/^\[|\]$/g,"")}return function(g){for(var v={},b=0,x=0;b<N;b+=1){var y=I[b];if(typeof y=="string")x+=y.length;else{var w=y.regex,c=y.parser,l=g.slice(x),h=w.exec(l)[0];c.call(v,h),g=g.replace(h,"")}}return function(d){var T=d.afternoon;if(T!==void 0){var n=d.hours;T?n<12&&(d.hours+=12):n===12&&(d.hours=0),delete d.afternoon}}(v),v}}return o(z,"l"),function(p,k,A){A.p.customParseFormat=!0,p&&p.parseTwoDigitYear&&(D=p.parseTwoDigitYear);var I=k.prototype,N=I.parse;I.parse=function(R){var K=R.date,U=R.utc,B=R.args;this.$u=U;var j=B[1];if(typeof j=="string"){var g=B[2]===!0,v=B[3]===!0,b=g||v,x=B[2];v&&(x=B[2]),m=this.$locale(),!g&&x&&(m=A.Ls[x]),this.$d=function(l,h,d,T){try{if(["x","X"].indexOf(h)>-1)return new Date((h==="X"?1e3:1)*l);var n=z(h)(l),u=n.year,i=n.month,M=n.day,C=n.hours,E=n.minutes,P=n.seconds,Y=n.milliseconds,ae=n.zone,W=n.week,Z=new Date,ne=M||(u||i?1:Z.getDate()),ie=u||Z.getFullYear(),oe=0;u&&!i||(oe=i>0?i-1:Z.getMonth());var he,me=C||0,V=E||0,re=P||0,Q=Y||0;return ae?new Date(Date.UTC(ie,oe,ne,me,V,re,Q+60*ae.offset*1e3)):d?new Date(Date.UTC(ie,oe,ne,me,V,re,Q)):(he=new Date(ie,oe,ne,me,V,re,Q),W&&(he=T(he).week(W).toDate()),he)}catch{return new Date("")}}(K,j,U,A),this.init(),x&&x!==!0&&(this.$L=this.locale(x).$L),b&&K!=this.format(j)&&(this.$d=new Date("")),m={}}else if(j instanceof Array)for(var y=j.length,w=1;w<=y;w+=1){B[1]=j[w-1];var c=A.apply(this,B);if(c.isValid()){this.$d=c.$d,this.$L=c.$L,this.init();break}w===y&&(this.$d=new Date(""))}else N.call(this,R)}}})});var At=Ee((Re,Be)=>{"use strict";(function(e,t){typeof Re=="object"&&typeof Be<"u"?Be.exports=t():typeof define=="function"&&define.amd?define(t):(e=typeof globalThis<"u"?globalThis:e||self).dayjs_plugin_advancedFormat=t()})(Re,function(){"use strict";return function(e,t){var s=t.prototype,a=s.format;s.format=function(r){var f=this,m=this.$locale();if(!this.isValid())return a.bind(this)(r);var D=this.$utils(),_=(r||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(L){switch(L){case"Q":return Math.ceil((f.$M+1)/3);case"Do":return m.ordinal(f.$D);case"gggg":return f.weekYear();case"GGGG":return f.isoWeekYear();case"wo":return m.ordinal(f.week(),"W");case"w":case"ww":return D.s(f.week(),L==="w"?1:2,"0");case"W":case"WW":return D.s(f.isoWeek(),L==="W"?1:2,"0");case"k":case"kk":return D.s(String(f.$H===0?24:f.$H),L==="k"?1:2,"0");case"X":return Math.floor(f.$d.getTime()/1e3);case"x":return f.$d.getTime();case"z":return"["+f.offsetName()+"]";case"zzz":return"["+f.offsetName("long")+"]";default:return L}});return a.bind(this)(_)}}})});var Ve=function(){var e=o(function(w,c,l,h){for(l=l||{},h=w.length;h--;l[w[h]]=c);return l},"o"),t=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],s=[1,26],a=[1,27],r=[1,28],f=[1,29],m=[1,30],D=[1,31],_=[1,32],L=[1,33],S=[1,34],F=[1,9],G=[1,10],z=[1,11],p=[1,12],k=[1,13],A=[1,14],I=[1,15],N=[1,16],R=[1,19],K=[1,20],U=[1,21],B=[1,22],j=[1,23],g=[1,25],v=[1,35],b={trace:o(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:o(function(c,l,h,d,T,n,u){var i=n.length-1;switch(T){case 1:return n[i-1];case 2:this.$=[];break;case 3:n[i-1].push(n[i]),this.$=n[i-1];break;case 4:case 5:this.$=n[i];break;case 6:case 7:this.$=[];break;case 8:d.setWeekday("monday");break;case 9:d.setWeekday("tuesday");break;case 10:d.setWeekday("wednesday");break;case 11:d.setWeekday("thursday");break;case 12:d.setWeekday("friday");break;case 13:d.setWeekday("saturday");break;case 14:d.setWeekday("sunday");break;case 15:d.setWeekend("friday");break;case 16:d.setWeekend("saturday");break;case 17:d.setDateFormat(n[i].substr(11)),this.$=n[i].substr(11);break;case 18:d.enableInclusiveEndDates(),this.$=n[i].substr(18);break;case 19:d.TopAxis(),this.$=n[i].substr(8);break;case 20:d.setAxisFormat(n[i].substr(11)),this.$=n[i].substr(11);break;case 21:d.setTickInterval(n[i].substr(13)),this.$=n[i].substr(13);break;case 22:d.setExcludes(n[i].substr(9)),this.$=n[i].substr(9);break;case 23:d.setIncludes(n[i].substr(9)),this.$=n[i].substr(9);break;case 24:d.setTodayMarker(n[i].substr(12)),this.$=n[i].substr(12);break;case 27:d.setDiagramTitle(n[i].substr(6)),this.$=n[i].substr(6);break;case 28:this.$=n[i].trim(),d.setAccTitle(this.$);break;case 29:case 30:this.$=n[i].trim(),d.setAccDescription(this.$);break;case 31:d.addSection(n[i].substr(8)),this.$=n[i].substr(8);break;case 33:d.addTask(n[i-1],n[i]),this.$="task";break;case 34:this.$=n[i-1],d.setClickEvent(n[i-1],n[i],null);break;case 35:this.$=n[i-2],d.setClickEvent(n[i-2],n[i-1],n[i]);break;case 36:this.$=n[i-2],d.setClickEvent(n[i-2],n[i-1],null),d.setLink(n[i-2],n[i]);break;case 37:this.$=n[i-3],d.setClickEvent(n[i-3],n[i-2],n[i-1]),d.setLink(n[i-3],n[i]);break;case 38:this.$=n[i-2],d.setClickEvent(n[i-2],n[i],null),d.setLink(n[i-2],n[i-1]);break;case 39:this.$=n[i-3],d.setClickEvent(n[i-3],n[i-1],n[i]),d.setLink(n[i-3],n[i-2]);break;case 40:this.$=n[i-1],d.setLink(n[i-1],n[i]);break;case 41:case 47:this.$=n[i-1]+" "+n[i];break;case 42:case 43:case 45:this.$=n[i-2]+" "+n[i-1]+" "+n[i];break;case 44:case 46:this.$=n[i-3]+" "+n[i-2]+" "+n[i-1]+" "+n[i];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},e(t,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:s,13:a,14:r,15:f,16:m,17:D,18:_,19:18,20:L,21:S,22:F,23:G,24:z,25:p,26:k,27:A,28:I,29:N,30:R,31:K,33:U,35:B,36:j,37:24,38:g,40:v},e(t,[2,7],{1:[2,1]}),e(t,[2,3]),{9:36,11:17,12:s,13:a,14:r,15:f,16:m,17:D,18:_,19:18,20:L,21:S,22:F,23:G,24:z,25:p,26:k,27:A,28:I,29:N,30:R,31:K,33:U,35:B,36:j,37:24,38:g,40:v},e(t,[2,5]),e(t,[2,6]),e(t,[2,17]),e(t,[2,18]),e(t,[2,19]),e(t,[2,20]),e(t,[2,21]),e(t,[2,22]),e(t,[2,23]),e(t,[2,24]),e(t,[2,25]),e(t,[2,26]),e(t,[2,27]),{32:[1,37]},{34:[1,38]},e(t,[2,30]),e(t,[2,31]),e(t,[2,32]),{39:[1,39]},e(t,[2,8]),e(t,[2,9]),e(t,[2,10]),e(t,[2,11]),e(t,[2,12]),e(t,[2,13]),e(t,[2,14]),e(t,[2,15]),e(t,[2,16]),{41:[1,40],43:[1,41]},e(t,[2,4]),e(t,[2,28]),e(t,[2,29]),e(t,[2,33]),e(t,[2,34],{42:[1,42],43:[1,43]}),e(t,[2,40],{41:[1,44]}),e(t,[2,35],{43:[1,45]}),e(t,[2,36]),e(t,[2,38],{42:[1,46]}),e(t,[2,37]),e(t,[2,39])],defaultActions:{},parseError:o(function(c,l){if(l.recoverable)this.trace(c);else{var h=new Error(c);throw h.hash=l,h}},"parseError"),parse:o(function(c){var l=this,h=[0],d=[],T=[null],n=[],u=this.table,i="",M=0,C=0,E=0,P=2,Y=1,ae=n.slice.call(arguments,1),W=Object.create(this.lexer),Z={yy:{}};for(var ne in this.yy)Object.prototype.hasOwnProperty.call(this.yy,ne)&&(Z.yy[ne]=this.yy[ne]);W.setInput(c,Z.yy),Z.yy.lexer=W,Z.yy.parser=this,typeof W.yylloc>"u"&&(W.yylloc={});var ie=W.yylloc;n.push(ie);var oe=W.options&&W.options.ranges;typeof Z.yy.parseError=="function"?this.parseError=Z.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function he(X){h.length=h.length-2*X,T.length=T.length-X,n.length=n.length-X}o(he,"popStack");function me(){var X;return X=d.pop()||W.lex()||Y,typeof X!="number"&&(X instanceof Array&&(d=X,X=d.pop()),X=l.symbols_[X]||X),X}o(me,"lex");for(var V,re,Q,H,On,Ce,ce={},be,$,tt,xe;;){if(Q=h[h.length-1],this.defaultActions[Q]?H=this.defaultActions[Q]:((V===null||typeof V>"u")&&(V=me()),H=u[Q]&&u[Q][V]),typeof H>"u"||!H.length||!H[0]){var Se="";xe=[];for(be in u[Q])this.terminals_[be]&&be>P&&xe.push("'"+this.terminals_[be]+"'");W.showPosition?Se="Parse error on line "+(M+1)+`:
`+W.showPosition()+`
Expecting `+xe.join(", ")+", got '"+(this.terminals_[V]||V)+"'":Se="Parse error on line "+(M+1)+": Unexpected "+(V==Y?"end of input":"'"+(this.terminals_[V]||V)+"'"),this.parseError(Se,{text:W.match,token:this.terminals_[V]||V,line:W.yylineno,loc:ie,expected:xe})}if(H[0]instanceof Array&&H.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Q+", token: "+V);switch(H[0]){case 1:h.push(V),T.push(W.yytext),n.push(W.yylloc),h.push(H[1]),V=null,re?(V=re,re=null):(C=W.yyleng,i=W.yytext,M=W.yylineno,ie=W.yylloc,E>0&&E--);break;case 2:if($=this.productions_[H[1]][1],ce.$=T[T.length-$],ce._$={first_line:n[n.length-($||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-($||1)].first_column,last_column:n[n.length-1].last_column},oe&&(ce._$.range=[n[n.length-($||1)].range[0],n[n.length-1].range[1]]),Ce=this.performAction.apply(ce,[i,C,M,Z.yy,H[1],T,n].concat(ae)),typeof Ce<"u")return Ce;$&&(h=h.slice(0,-1*$*2),T=T.slice(0,-1*$),n=n.slice(0,-1*$)),h.push(this.productions_[H[1]][0]),T.push(ce.$),n.push(ce._$),tt=u[h[h.length-2]][h[h.length-1]],h.push(tt);break;case 3:return!0}}return!0},"parse")},x=function(){var w={EOF:1,parseError:o(function(l,h){if(this.yy.parser)this.yy.parser.parseError(l,h);else throw new Error(l)},"parseError"),setInput:o(function(c,l){return this.yy=l||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:o(function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var l=c.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},"input"),unput:o(function(c){var l=c.length,h=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var T=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===d.length?this.yylloc.first_column:0)+d[d.length-h.length].length-h[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[T[0],T[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},"unput"),more:o(function(){return this._more=!0,this},"more"),reject:o(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:o(function(c){this.unput(this.match.slice(c))},"less"),pastInput:o(function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:o(function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:o(function(){var c=this.pastInput(),l=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+l+"^"},"showPosition"),test_match:o(function(c,l){var h,d,T;if(this.options.backtrack_lexer&&(T={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(T.yylloc.range=this.yylloc.range.slice(0))),d=c[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],h=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var n in T)this[n]=T[n];return!1}return!1},"test_match"),next:o(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,l,h,d;this._more||(this.yytext="",this.match="");for(var T=this._currentRules(),n=0;n<T.length;n++)if(h=this._input.match(this.rules[T[n]]),h&&(!l||h[0].length>l[0].length)){if(l=h,d=n,this.options.backtrack_lexer){if(c=this.test_match(h,T[n]),c!==!1)return c;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(c=this.test_match(l,T[d]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:o(function(){var l=this.next();return l||this.lex()},"lex"),begin:o(function(l){this.conditionStack.push(l)},"begin"),popState:o(function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:o(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:o(function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},"topState"),pushState:o(function(l){this.begin(l)},"pushState"),stateStackSize:o(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:o(function(l,h,d,T){var n=T;switch(d){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),31;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),33;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return w}();b.lexer=x;function y(){this.yy={}}return o(y,"Parser"),y.prototype=b,b.Parser=y,new y}();Ve.parser=Ve;var St=Ve;var Yt=le(Qt(),1),q=le(nt(),1),Wt=le(Et(),1),Ft=le(Mt(),1),Vt=le(At(),1);q.default.extend(Wt.default);q.default.extend(Ft.default);q.default.extend(Vt.default);var Lt={friday:5,saturday:6},J="",Xe="",qe,Ue="",ye=[],pe=[],Ze=new Map,Qe=[],we=[],fe="",Ke="",Ot=["active","done","crit","milestone"],Je=[],ge=!1,$e=!1,et="sunday",_e="saturday",je=0,Kt=o(function(){Qe=[],we=[],fe="",Je=[],Te=0,He=void 0,ve=void 0,O=[],J="",Xe="",Ke="",qe=void 0,Ue="",ye=[],pe=[],ge=!1,$e=!1,je=0,Ze=new Map,st(),et="sunday",_e="saturday"},"clear"),Jt=o(function(e){Xe=e},"setAxisFormat"),$t=o(function(){return Xe},"getAxisFormat"),en=o(function(e){qe=e},"setTickInterval"),tn=o(function(){return qe},"getTickInterval"),nn=o(function(e){Ue=e},"setTodayMarker"),rn=o(function(){return Ue},"getTodayMarker"),sn=o(function(e){J=e},"setDateFormat"),an=o(function(){ge=!0},"enableInclusiveEndDates"),on=o(function(){return ge},"endDatesAreInclusive"),cn=o(function(){$e=!0},"enableTopAxis"),ln=o(function(){return $e},"topAxisEnabled"),un=o(function(e){Ke=e},"setDisplayMode"),dn=o(function(){return Ke},"getDisplayMode"),fn=o(function(){return J},"getDateFormat"),hn=o(function(e){ye=e.toLowerCase().split(/[\s,]+/)},"setIncludes"),mn=o(function(){return ye},"getIncludes"),kn=o(function(e){pe=e.toLowerCase().split(/[\s,]+/)},"setExcludes"),yn=o(function(){return pe},"getExcludes"),pn=o(function(){return Ze},"getLinks"),gn=o(function(e){fe=e,Qe.push(e)},"addSection"),bn=o(function(){return Qe},"getSections"),xn=o(function(){let e=It(),t=10,s=0;for(;!e&&s<t;)e=It(),s++;return we=O,we},"getTasks"),Pt=o(function(e,t,s,a){return a.includes(e.format(t.trim()))?!1:s.includes("weekends")&&(e.isoWeekday()===Lt[_e]||e.isoWeekday()===Lt[_e]+1)||s.includes(e.format("dddd").toLowerCase())?!0:s.includes(e.format(t.trim()))},"isInvalidDate"),Tn=o(function(e){et=e},"setWeekday"),vn=o(function(){return et},"getWeekday"),wn=o(function(e){_e=e},"setWeekend"),zt=o(function(e,t,s,a){if(!s.length||e.manualEndTime)return;let r;e.startTime instanceof Date?r=(0,q.default)(e.startTime):r=(0,q.default)(e.startTime,t,!0),r=r.add(1,"d");let f;e.endTime instanceof Date?f=(0,q.default)(e.endTime):f=(0,q.default)(e.endTime,t,!0);let[m,D]=_n(r,f,t,s,a);e.endTime=m.toDate(),e.renderEndTime=D},"checkTaskDates"),_n=o(function(e,t,s,a,r){let f=!1,m=null;for(;e<=t;)f||(m=t.toDate()),f=Pt(e,s,a,r),f&&(t=t.add(1,"d")),e=e.add(1,"d");return[t,m]},"fixTaskDates"),Ge=o(function(e,t,s){s=s.trim();let r=/^after\s+(?<ids>[\d\w- ]+)/.exec(s);if(r!==null){let m=null;for(let _ of r.groups.ids.split(" ")){let L=se(_);L!==void 0&&(!m||L.endTime>m.endTime)&&(m=L)}if(m)return m.endTime;let D=new Date;return D.setHours(0,0,0,0),D}let f=(0,q.default)(s,t.trim(),!0);if(f.isValid())return f.toDate();{ue.debug("Invalid date:"+s),ue.debug("With date format:"+t.trim());let m=new Date(s);if(m===void 0||isNaN(m.getTime())||m.getFullYear()<-1e4||m.getFullYear()>1e4)throw new Error("Invalid date:"+s);return m}},"getStartDate"),Nt=o(function(e){let t=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(e.trim());return t!==null?[Number.parseFloat(t[1]),t[2]]:[NaN,"ms"]},"parseDuration"),Rt=o(function(e,t,s,a=!1){s=s.trim();let f=/^until\s+(?<ids>[\d\w- ]+)/.exec(s);if(f!==null){let S=null;for(let G of f.groups.ids.split(" ")){let z=se(G);z!==void 0&&(!S||z.startTime<S.startTime)&&(S=z)}if(S)return S.startTime;let F=new Date;return F.setHours(0,0,0,0),F}let m=(0,q.default)(s,t.trim(),!0);if(m.isValid())return a&&(m=m.add(1,"d")),m.toDate();let D=(0,q.default)(e),[_,L]=Nt(s);if(!Number.isNaN(_)){let S=D.add(_,L);S.isValid()&&(D=S)}return D.toDate()},"getEndDate"),Te=0,de=o(function(e){return e===void 0?(Te=Te+1,"task"+Te):e},"parseId"),Dn=o(function(e,t){let s;t.substr(0,1)===":"?s=t.substr(1,t.length):s=t;let a=s.split(","),r={};Xt(a,r,Ot);for(let m=0;m<a.length;m++)a[m]=a[m].trim();let f="";switch(a.length){case 1:r.id=de(),r.startTime=e.endTime,f=a[0];break;case 2:r.id=de(),r.startTime=Ge(void 0,J,a[0]),f=a[1];break;case 3:r.id=de(a[0]),r.startTime=Ge(void 0,J,a[1]),f=a[2];break;default:}return f&&(r.endTime=Rt(r.startTime,J,f,ge),r.manualEndTime=(0,q.default)(f,"YYYY-MM-DD",!0).isValid(),zt(r,J,pe,ye)),r},"compileData"),Cn=o(function(e,t){let s;t.substr(0,1)===":"?s=t.substr(1,t.length):s=t;let a=s.split(","),r={};Xt(a,r,Ot);for(let f=0;f<a.length;f++)a[f]=a[f].trim();switch(a.length){case 1:r.id=de(),r.startTime={type:"prevTaskEnd",id:e},r.endTime={data:a[0]};break;case 2:r.id=de(),r.startTime={type:"getStartDate",startData:a[0]},r.endTime={data:a[1]};break;case 3:r.id=de(a[0]),r.startTime={type:"getStartDate",startData:a[1]},r.endTime={data:a[2]};break;default:}return r},"parseData"),He,ve,O=[],Bt={},Sn=o(function(e,t){let s={section:fe,type:fe,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:t},task:e,classes:[]},a=Cn(ve,t);s.raw.startTime=a.startTime,s.raw.endTime=a.endTime,s.id=a.id,s.prevTaskId=ve,s.active=a.active,s.done=a.done,s.crit=a.crit,s.milestone=a.milestone,s.order=je,je++;let r=O.push(s);ve=s.id,Bt[s.id]=r-1},"addTask"),se=o(function(e){let t=Bt[e];return O[t]},"findTaskById"),En=o(function(e,t){let s={section:fe,type:fe,description:e,task:e,classes:[]},a=Dn(He,t);s.startTime=a.startTime,s.endTime=a.endTime,s.id=a.id,s.active=a.active,s.done=a.done,s.crit=a.crit,s.milestone=a.milestone,He=s,we.push(s)},"addTaskOrg"),It=o(function(){let e=o(function(s){let a=O[s],r="";switch(O[s].raw.startTime.type){case"prevTaskEnd":{let f=se(a.prevTaskId);a.startTime=f.endTime;break}case"getStartDate":r=Ge(void 0,J,O[s].raw.startTime.startData),r&&(O[s].startTime=r);break}return O[s].startTime&&(O[s].endTime=Rt(O[s].startTime,J,O[s].raw.endTime.data,ge),O[s].endTime&&(O[s].processed=!0,O[s].manualEndTime=(0,q.default)(O[s].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),zt(O[s],J,pe,ye))),O[s].processed},"compileTask"),t=!0;for(let[s,a]of O.entries())e(s),t=t&&a.processed;return t},"compileTasks"),Mn=o(function(e,t){let s=t;te().securityLevel!=="loose"&&(s=(0,Yt.sanitizeUrl)(t)),e.split(",").forEach(function(a){se(a)!==void 0&&(Gt(a,()=>{window.open(s,"_self")}),Ze.set(a,s))}),jt(e,"clickable")},"setLink"),jt=o(function(e,t){e.split(",").forEach(function(s){let a=se(s);a!==void 0&&a.classes.push(t)})},"setClass"),An=o(function(e,t,s){if(te().securityLevel!=="loose"||t===void 0)return;let a=[];if(typeof s=="string"){a=s.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let f=0;f<a.length;f++){let m=a[f].trim();m.startsWith('"')&&m.endsWith('"')&&(m=m.substr(1,m.length-2)),a[f]=m}}a.length===0&&a.push(e),se(e)!==void 0&&Gt(e,()=>{Ct.runFunc(t,...a)})},"setClickFun"),Gt=o(function(e,t){Je.push(function(){let s=document.querySelector(`[id="${e}"]`);s!==null&&s.addEventListener("click",function(){t()})},function(){let s=document.querySelector(`[id="${e}-text"]`);s!==null&&s.addEventListener("click",function(){t()})})},"pushFun"),Ln=o(function(e,t,s){e.split(",").forEach(function(a){An(a,t,s)}),jt(e,"clickable")},"setClickEvent"),In=o(function(e){Je.forEach(function(t){t(e)})},"bindFunctions"),Ht={getConfig:o(()=>te().gantt,"getConfig"),clear:Kt,setDateFormat:sn,getDateFormat:fn,enableInclusiveEndDates:an,endDatesAreInclusive:on,enableTopAxis:cn,topAxisEnabled:ln,setAxisFormat:Jt,getAxisFormat:$t,setTickInterval:en,getTickInterval:tn,setTodayMarker:nn,getTodayMarker:rn,setAccTitle:at,getAccTitle:ot,setDiagramTitle:ut,getDiagramTitle:dt,setDisplayMode:un,getDisplayMode:dn,setAccDescription:ct,getAccDescription:lt,addSection:gn,getSections:bn,getTasks:xn,addTask:Sn,findTaskById:se,addTaskOrg:En,setIncludes:hn,getIncludes:mn,setExcludes:kn,getExcludes:yn,setClickEvent:Ln,setLink:Mn,getLinks:pn,bindFunctions:In,parseDuration:Nt,isInvalidDate:Pt,setWeekday:Tn,getWeekday:vn,setWeekend:wn};function Xt(e,t,s){let a=!0;for(;a;)a=!1,s.forEach(function(r){let f="^\\s*"+r+"\\s*$",m=new RegExp(f);e[0].match(m)&&(t[r]=!0,e.shift(1),a=!0)})}o(Xt,"getTaskTags");var De=le(nt(),1);var Yn=o(function(){ue.debug("Something is calling, setConf, remove the call")},"setConf"),qt={monday:bt,tuesday:xt,wednesday:Tt,thursday:vt,friday:wt,saturday:_t,sunday:gt},Wn=o((e,t)=>{let s=[...e].map(()=>-1/0),a=[...e].sort((f,m)=>f.startTime-m.startTime||f.order-m.order),r=0;for(let f of a)for(let m=0;m<s.length;m++)if(f.startTime>=s[m]){s[m]=f.endTime,f.order=m+t,m>r&&(r=m);break}return r},"getMaxIntersections"),ee,Fn=o(function(e,t,s,a){let r=te().gantt,f=te().securityLevel,m;f==="sandbox"&&(m=ke("#i"+t));let D=f==="sandbox"?ke(m.nodes()[0].contentDocument.body):ke("body"),_=f==="sandbox"?m.nodes()[0].contentDocument:document,L=_.getElementById(t);ee=L.parentElement.offsetWidth,ee===void 0&&(ee=1200),r.useWidth!==void 0&&(ee=r.useWidth);let S=a.db.getTasks(),F=[];for(let g of S)F.push(g.type);F=j(F);let G={},z=2*r.topPadding;if(a.db.getDisplayMode()==="compact"||r.displayMode==="compact"){let g={};for(let b of S)g[b.section]===void 0?g[b.section]=[b]:g[b.section].push(b);let v=0;for(let b of Object.keys(g)){let x=Wn(g[b],v)+1;v+=x,z+=x*(r.barHeight+r.barGap),G[b]=x}}else{z+=S.length*(r.barHeight+r.barGap);for(let g of F)G[g]=S.filter(v=>v.type===g).length}L.setAttribute("viewBox","0 0 "+ee+" "+z);let p=D.select(`[id="${t}"]`),k=Dt().domain([ht(S,function(g){return g.startTime}),ft(S,function(g){return g.endTime})]).rangeRound([0,ee-r.leftPadding-r.rightPadding]);function A(g,v){let b=g.startTime,x=v.startTime,y=0;return b>x?y=1:b<x&&(y=-1),y}o(A,"taskCompare"),S.sort(A),I(S,ee,z),rt(p,z,ee,r.useMaxWidth),p.append("text").text(a.db.getDiagramTitle()).attr("x",ee/2).attr("y",r.titleTopMargin).attr("class","titleText");function I(g,v,b){let x=r.barHeight,y=x+r.barGap,w=r.topPadding,c=r.leftPadding,l=pt().domain([0,F.length]).range(["#00B9FA","#F95002"]).interpolate(yt);R(y,w,c,v,b,g,a.db.getExcludes(),a.db.getIncludes()),K(c,w,v,b),N(g,y,w,c,x,l,v,b),U(y,w,c,x,l),B(c,w,v,b)}o(I,"makeGantt");function N(g,v,b,x,y,w,c){let h=[...new Set(g.map(u=>u.order))].map(u=>g.find(i=>i.order===u));p.append("g").selectAll("rect").data(h).enter().append("rect").attr("x",0).attr("y",function(u,i){return i=u.order,i*v+b-2}).attr("width",function(){return c-r.rightPadding/2}).attr("height",v).attr("class",function(u){for(let[i,M]of F.entries())if(u.type===M)return"section section"+i%r.numberSectionStyles;return"section section0"});let d=p.append("g").selectAll("rect").data(g).enter(),T=a.db.getLinks();if(d.append("rect").attr("id",function(u){return u.id}).attr("rx",3).attr("ry",3).attr("x",function(u){return u.milestone?k(u.startTime)+x+.5*(k(u.endTime)-k(u.startTime))-.5*y:k(u.startTime)+x}).attr("y",function(u,i){return i=u.order,i*v+b}).attr("width",function(u){return u.milestone?y:k(u.renderEndTime||u.endTime)-k(u.startTime)}).attr("height",y).attr("transform-origin",function(u,i){return i=u.order,(k(u.startTime)+x+.5*(k(u.endTime)-k(u.startTime))).toString()+"px "+(i*v+b+.5*y).toString()+"px"}).attr("class",function(u){let i="task",M="";u.classes.length>0&&(M=u.classes.join(" "));let C=0;for(let[P,Y]of F.entries())u.type===Y&&(C=P%r.numberSectionStyles);let E="";return u.active?u.crit?E+=" activeCrit":E=" active":u.done?u.crit?E=" doneCrit":E=" done":u.crit&&(E+=" crit"),E.length===0&&(E=" task"),u.milestone&&(E=" milestone "+E),E+=C,E+=" "+M,i+E}),d.append("text").attr("id",function(u){return u.id+"-text"}).text(function(u){return u.task}).attr("font-size",r.fontSize).attr("x",function(u){let i=k(u.startTime),M=k(u.renderEndTime||u.endTime);u.milestone&&(i+=.5*(k(u.endTime)-k(u.startTime))-.5*y),u.milestone&&(M=i+y);let C=this.getBBox().width;return C>M-i?M+C+1.5*r.leftPadding>c?i+x-5:M+x+5:(M-i)/2+i+x}).attr("y",function(u,i){return i=u.order,i*v+r.barHeight/2+(r.fontSize/2-2)+b}).attr("text-height",y).attr("class",function(u){let i=k(u.startTime),M=k(u.endTime);u.milestone&&(M=i+y);let C=this.getBBox().width,E="";u.classes.length>0&&(E=u.classes.join(" "));let P=0;for(let[ae,W]of F.entries())u.type===W&&(P=ae%r.numberSectionStyles);let Y="";return u.active&&(u.crit?Y="activeCritText"+P:Y="activeText"+P),u.done?u.crit?Y=Y+" doneCritText"+P:Y=Y+" doneText"+P:u.crit&&(Y=Y+" critText"+P),u.milestone&&(Y+=" milestoneText"),C>M-i?M+C+1.5*r.leftPadding>c?E+" taskTextOutsideLeft taskTextOutside"+P+" "+Y:E+" taskTextOutsideRight taskTextOutside"+P+" "+Y+" width-"+C:E+" taskText taskText"+P+" "+Y+" width-"+C}),te().securityLevel==="sandbox"){let u;u=ke("#i"+t);let i=u.nodes()[0].contentDocument;d.filter(function(M){return T.has(M.id)}).each(function(M){var C=i.querySelector("#"+M.id),E=i.querySelector("#"+M.id+"-text");let P=C.parentNode;var Y=i.createElement("a");Y.setAttribute("xlink:href",T.get(M.id)),Y.setAttribute("target","_top"),P.appendChild(Y),Y.appendChild(C),Y.appendChild(E)})}}o(N,"drawRects");function R(g,v,b,x,y,w,c,l){if(c.length===0&&l.length===0)return;let h,d;for(let{startTime:C,endTime:E}of w)(h===void 0||C<h)&&(h=C),(d===void 0||E>d)&&(d=E);if(!h||!d)return;if((0,De.default)(d).diff((0,De.default)(h),"year")>5){ue.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}let T=a.db.getDateFormat(),n=[],u=null,i=(0,De.default)(h);for(;i.valueOf()<=d;)a.db.isInvalidDate(i,T,c,l)?u?u.end=i:u={start:i,end:i}:u&&(n.push(u),u=null),i=i.add(1,"d");p.append("g").selectAll("rect").data(n).enter().append("rect").attr("id",function(C){return"exclude-"+C.start.format("YYYY-MM-DD")}).attr("x",function(C){return k(C.start)+b}).attr("y",r.gridLineStartPadding).attr("width",function(C){let E=C.end.add(1,"day");return k(E)-k(C.start)}).attr("height",y-v-r.gridLineStartPadding).attr("transform-origin",function(C,E){return(k(C.start)+b+.5*(k(C.end)-k(C.start))).toString()+"px "+(E*g+.5*y).toString()+"px"}).attr("class","exclude-range")}o(R,"drawExcludeDays");function K(g,v,b,x){let y=kt(k).tickSize(-x+v+r.gridLineStartPadding).tickFormat(Fe(a.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d")),c=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(a.db.getTickInterval()||r.tickInterval);if(c!==null){let l=c[1],h=c[2],d=a.db.getWeekday()||r.weekday;switch(h){case"millisecond":y.ticks(Me.every(l));break;case"second":y.ticks(Ae.every(l));break;case"minute":y.ticks(Le.every(l));break;case"hour":y.ticks(Ie.every(l));break;case"day":y.ticks(Ye.every(l));break;case"week":y.ticks(qt[d].every(l));break;case"month":y.ticks(We.every(l));break}}if(p.append("g").attr("class","grid").attr("transform","translate("+g+", "+(x-50)+")").call(y).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),a.db.topAxisEnabled()||r.topAxis){let l=mt(k).tickSize(-x+v+r.gridLineStartPadding).tickFormat(Fe(a.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));if(c!==null){let h=c[1],d=c[2],T=a.db.getWeekday()||r.weekday;switch(d){case"millisecond":l.ticks(Me.every(h));break;case"second":l.ticks(Ae.every(h));break;case"minute":l.ticks(Le.every(h));break;case"hour":l.ticks(Ie.every(h));break;case"day":l.ticks(Ye.every(h));break;case"week":l.ticks(qt[T].every(h));break;case"month":l.ticks(We.every(h));break}}p.append("g").attr("class","grid").attr("transform","translate("+g+", "+v+")").call(l).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}o(K,"makeGrid");function U(g,v){let b=0,x=Object.keys(G).map(y=>[y,G[y]]);p.append("g").selectAll("text").data(x).enter().append(function(y){let w=y[0].split(it.lineBreakRegex),c=-(w.length-1)/2,l=_.createElementNS("http://www.w3.org/2000/svg","text");l.setAttribute("dy",c+"em");for(let[h,d]of w.entries()){let T=_.createElementNS("http://www.w3.org/2000/svg","tspan");T.setAttribute("alignment-baseline","central"),T.setAttribute("x","10"),h>0&&T.setAttribute("dy","1em"),T.textContent=d,l.appendChild(T)}return l}).attr("x",10).attr("y",function(y,w){if(w>0)for(let c=0;c<w;c++)return b+=x[w-1][1],y[1]*g/2+b*g+v;else return y[1]*g/2+v}).attr("font-size",r.sectionFontSize).attr("class",function(y){for(let[w,c]of F.entries())if(y[0]===c)return"sectionTitle sectionTitle"+w%r.numberSectionStyles;return"sectionTitle"})}o(U,"vertLabels");function B(g,v,b,x){let y=a.db.getTodayMarker();if(y==="off")return;let w=p.append("g").attr("class","today"),c=new Date,l=w.append("line");l.attr("x1",k(c)+g).attr("x2",k(c)+g).attr("y1",r.titleTopMargin).attr("y2",x-r.titleTopMargin).attr("class","today"),y!==""&&l.attr("style",y.replace(/,/g,";"))}o(B,"drawToday");function j(g){let v={},b=[];for(let x=0,y=g.length;x<y;++x)Object.prototype.hasOwnProperty.call(v,g[x])||(v[g[x]]=!0,b.push(g[x]));return b}o(j,"checkUnique")},"draw"),Ut={setConf:Yn,draw:Fn};var Vn=o(e=>`
  .mermaid-main-font {
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .exclude-range {
    fill: ${e.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${e.sectionBkgColor};
  }

  .section2 {
    fill: ${e.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${e.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${e.titleColor};
  }

  .sectionTitle1 {
    fill: ${e.titleColor};
  }

  .sectionTitle2 {
    fill: ${e.titleColor};
  }

  .sectionTitle3 {
    fill: ${e.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${e.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${e.fontFamily};
    fill: ${e.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${e.todayLineColor};
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
    fill: ${e.taskTextDarkColor};
    text-anchor: start;
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }

  .taskTextOutsideLeft {
    fill: ${e.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${e.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${e.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${e.taskBkgColor};
    stroke: ${e.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${e.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${e.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${e.activeTaskBkgColor};
    stroke: ${e.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${e.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${e.doneTaskBorderColor};
    fill: ${e.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${e.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${e.critBorderColor};
    fill: ${e.doneTaskBkgColor};
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
    fill: ${e.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${e.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.titleColor||e.textColor};
    font-family: var(--mermaid-font-family, "trebuchet ms", verdana, arial, sans-serif);
  }
`,"getStyles"),Zt=Vn;var oi={parser:St,db:Ht,renderer:Ut,styles:Zt};export{oi as diagram};
