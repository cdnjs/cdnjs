import{m as Ce}from"./chunk-QS5O44OF.mjs";import{a as Qe}from"./chunk-TI4EEUUG.mjs";import{L as ie,M as re,P as se,Q as ae,R as oe,S as ce,T as le,U as ue,V as de,X as et,a as ne,b as ut,ca as fe,da as he,ea as ke,fa as me,ga as mt,ha as ye,ka as pe,la as Mt,ma as At,na as Lt,oa as It,pa as Yt,qa as ge,ra as be,sa as xe,ta as Te,ua as ve,va as we,wa as _e,xa as Ft,ya as Wt,za as De}from"./chunk-QJLC67TO.mjs";import"./chunk-6BY5RJGC.mjs";import{a as o,b as Et,e as lt}from"./chunk-GTKDMUJJ.mjs";var Ee=Et((Ot,Pt)=>{"use strict";(function(t,e){typeof Ot=="object"&&typeof Pt<"u"?Pt.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_isoWeek=e()})(Ot,function(){"use strict";var t="day";return function(e,s,a){var r=o(function(D){return D.add(4-D.isoWeekday(),t)},"a"),f=s.prototype;f.isoWeekYear=function(){return r(this).year()},f.isoWeek=function(D){if(!this.$utils().u(D))return this.add(7*(D-this.isoWeek()),t);var _,L,S,W,G=r(this),z=(_=this.isoWeekYear(),L=this.$u,S=(L?a.utc:a)().year(_).startOf("year"),W=4-S.isoWeekday(),S.isoWeekday()>4&&(W+=7),S.add(W,t));return G.diff(z,"week")+1},f.isoWeekday=function(D){return this.$utils().u(D)?this.day()||7:this.day(this.day()%7?D:D-7)};var k=f.startOf;f.startOf=function(D,_){var L=this.$utils(),S=!!L.u(_)||_;return L.p(D)==="isoweek"?S?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):k.bind(this)(D,_)}}})});var Me=Et((zt,Nt)=>{"use strict";(function(t,e){typeof zt=="object"&&typeof Nt<"u"?Nt.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_customParseFormat=e()})(zt,function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,s=/\d/,a=/\d\d/,r=/\d\d?/,f=/\d*[^-_:/,()\s\d]+/,k={},D=o(function(p){return(p=+p)+(p>68?1900:2e3)},"a"),_=o(function(p){return function(m){this[p]=+m}},"f"),L=[/[+-]\d\d:?(\d\d)?|Z/,function(p){(this.zone||(this.zone={})).offset=function(m){if(!m||m==="Z")return 0;var A=m.match(/([+-]|\d\d)/g),I=60*A[1]+(+A[2]||0);return I===0?0:A[0]==="+"?-I:I}(p)}],S=o(function(p){var m=k[p];return m&&(m.indexOf?m:m.s.concat(m.f))},"u"),W=o(function(p,m){var A,I=k.meridiem;if(I){for(var N=1;N<=24;N+=1)if(p.indexOf(I(N,0,m))>-1){A=N>12;break}}else A=p===(m?"pm":"PM");return A},"d"),G={A:[f,function(p){this.afternoon=W(p,!1)}],a:[f,function(p){this.afternoon=W(p,!0)}],Q:[s,function(p){this.month=3*(p-1)+1}],S:[s,function(p){this.milliseconds=100*+p}],SS:[a,function(p){this.milliseconds=10*+p}],SSS:[/\d{3}/,function(p){this.milliseconds=+p}],s:[r,_("seconds")],ss:[r,_("seconds")],m:[r,_("minutes")],mm:[r,_("minutes")],H:[r,_("hours")],h:[r,_("hours")],HH:[r,_("hours")],hh:[r,_("hours")],D:[r,_("day")],DD:[a,_("day")],Do:[f,function(p){var m=k.ordinal,A=p.match(/\d+/);if(this.day=A[0],m)for(var I=1;I<=31;I+=1)m(I).replace(/\[|\]/g,"")===p&&(this.day=I)}],w:[r,_("week")],ww:[a,_("week")],M:[r,_("month")],MM:[a,_("month")],MMM:[f,function(p){var m=S("months"),A=(S("monthsShort")||m.map(function(I){return I.slice(0,3)})).indexOf(p)+1;if(A<1)throw new Error;this.month=A%12||A}],MMMM:[f,function(p){var m=S("months").indexOf(p)+1;if(m<1)throw new Error;this.month=m%12||m}],Y:[/[+-]?\d+/,_("year")],YY:[a,function(p){this.year=D(p)}],YYYY:[/\d{4}/,_("year")],Z:L,ZZ:L};function z(p){var m,A;m=p,A=k&&k.formats;for(var I=(p=m.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(g,v,b){var x=b&&b.toUpperCase();return v||A[b]||t[b]||A[x].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(y,w,c){return w||c.slice(1)})})).match(e),N=I.length,R=0;R<N;R+=1){var K=I[R],U=G[K],B=U&&U[0],j=U&&U[1];I[R]=j?{regex:B,parser:j}:K.replace(/^\[|\]$/g,"")}return function(g){for(var v={},b=0,x=0;b<N;b+=1){var y=I[b];if(typeof y=="string")x+=y.length;else{var w=y.regex,c=y.parser,l=g.slice(x),h=w.exec(l)[0];c.call(v,h),g=g.replace(h,"")}}return function(d){var T=d.afternoon;if(T!==void 0){var n=d.hours;T?n<12&&(d.hours+=12):n===12&&(d.hours=0),delete d.afternoon}}(v),v}}return o(z,"l"),function(p,m,A){A.p.customParseFormat=!0,p&&p.parseTwoDigitYear&&(D=p.parseTwoDigitYear);var I=m.prototype,N=I.parse;I.parse=function(R){var K=R.date,U=R.utc,B=R.args;this.$u=U;var j=B[1];if(typeof j=="string"){var g=B[2]===!0,v=B[3]===!0,b=g||v,x=B[2];v&&(x=B[2]),k=this.$locale(),!g&&x&&(k=A.Ls[x]),this.$d=function(l,h,d,T){try{if(["x","X"].indexOf(h)>-1)return new Date((h==="X"?1e3:1)*l);var n=z(h)(l),u=n.year,i=n.month,M=n.day,C=n.hours,E=n.minutes,P=n.seconds,Y=n.milliseconds,at=n.zone,F=n.week,Z=new Date,nt=M||(u||i?1:Z.getDate()),it=u||Z.getFullYear(),ot=0;u&&!i||(ot=i>0?i-1:Z.getMonth());var ht,kt=C||0,V=E||0,rt=P||0,Q=Y||0;return at?new Date(Date.UTC(it,ot,nt,kt,V,rt,Q+60*at.offset*1e3)):d?new Date(Date.UTC(it,ot,nt,kt,V,rt,Q)):(ht=new Date(it,ot,nt,kt,V,rt,Q),F&&(ht=T(ht).week(F).toDate()),ht)}catch{return new Date("")}}(K,j,U,A),this.init(),x&&x!==!0&&(this.$L=this.locale(x).$L),b&&K!=this.format(j)&&(this.$d=new Date("")),k={}}else if(j instanceof Array)for(var y=j.length,w=1;w<=y;w+=1){B[1]=j[w-1];var c=A.apply(this,B);if(c.isValid()){this.$d=c.$d,this.$L=c.$L,this.init();break}w===y&&(this.$d=new Date(""))}else N.call(this,R)}}})});var Ae=Et((Rt,Bt)=>{"use strict";(function(t,e){typeof Rt=="object"&&typeof Bt<"u"?Bt.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_advancedFormat=e()})(Rt,function(){"use strict";return function(t,e){var s=e.prototype,a=s.format;s.format=function(r){var f=this,k=this.$locale();if(!this.isValid())return a.bind(this)(r);var D=this.$utils(),_=(r||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(L){switch(L){case"Q":return Math.ceil((f.$M+1)/3);case"Do":return k.ordinal(f.$D);case"gggg":return f.weekYear();case"GGGG":return f.isoWeekYear();case"wo":return k.ordinal(f.week(),"W");case"w":case"ww":return D.s(f.week(),L==="w"?1:2,"0");case"W":case"WW":return D.s(f.isoWeek(),L==="W"?1:2,"0");case"k":case"kk":return D.s(String(f.$H===0?24:f.$H),L==="k"?1:2,"0");case"X":return Math.floor(f.$d.getTime()/1e3);case"x":return f.$d.getTime();case"z":return"["+f.offsetName()+"]";case"zzz":return"["+f.offsetName("long")+"]";default:return L}});return a.bind(this)(_)}}})});var Vt=function(){var t=o(function(w,c,l,h){for(l=l||{},h=w.length;h--;l[w[h]]=c);return l},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],s=[1,26],a=[1,27],r=[1,28],f=[1,29],k=[1,30],D=[1,31],_=[1,32],L=[1,33],S=[1,34],W=[1,9],G=[1,10],z=[1,11],p=[1,12],m=[1,13],A=[1,14],I=[1,15],N=[1,16],R=[1,19],K=[1,20],U=[1,21],B=[1,22],j=[1,23],g=[1,25],v=[1,35],b={trace:o(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:o(function(c,l,h,d,T,n,u){var i=n.length-1;switch(T){case 1:return n[i-1];case 2:this.$=[];break;case 3:n[i-1].push(n[i]),this.$=n[i-1];break;case 4:case 5:this.$=n[i];break;case 6:case 7:this.$=[];break;case 8:d.setWeekday("monday");break;case 9:d.setWeekday("tuesday");break;case 10:d.setWeekday("wednesday");break;case 11:d.setWeekday("thursday");break;case 12:d.setWeekday("friday");break;case 13:d.setWeekday("saturday");break;case 14:d.setWeekday("sunday");break;case 15:d.setWeekend("friday");break;case 16:d.setWeekend("saturday");break;case 17:d.setDateFormat(n[i].substr(11)),this.$=n[i].substr(11);break;case 18:d.enableInclusiveEndDates(),this.$=n[i].substr(18);break;case 19:d.TopAxis(),this.$=n[i].substr(8);break;case 20:d.setAxisFormat(n[i].substr(11)),this.$=n[i].substr(11);break;case 21:d.setTickInterval(n[i].substr(13)),this.$=n[i].substr(13);break;case 22:d.setExcludes(n[i].substr(9)),this.$=n[i].substr(9);break;case 23:d.setIncludes(n[i].substr(9)),this.$=n[i].substr(9);break;case 24:d.setTodayMarker(n[i].substr(12)),this.$=n[i].substr(12);break;case 27:d.setDiagramTitle(n[i].substr(6)),this.$=n[i].substr(6);break;case 28:this.$=n[i].trim(),d.setAccTitle(this.$);break;case 29:case 30:this.$=n[i].trim(),d.setAccDescription(this.$);break;case 31:d.addSection(n[i].substr(8)),this.$=n[i].substr(8);break;case 33:d.addTask(n[i-1],n[i]),this.$="task";break;case 34:this.$=n[i-1],d.setClickEvent(n[i-1],n[i],null);break;case 35:this.$=n[i-2],d.setClickEvent(n[i-2],n[i-1],n[i]);break;case 36:this.$=n[i-2],d.setClickEvent(n[i-2],n[i-1],null),d.setLink(n[i-2],n[i]);break;case 37:this.$=n[i-3],d.setClickEvent(n[i-3],n[i-2],n[i-1]),d.setLink(n[i-3],n[i]);break;case 38:this.$=n[i-2],d.setClickEvent(n[i-2],n[i],null),d.setLink(n[i-2],n[i-1]);break;case 39:this.$=n[i-3],d.setClickEvent(n[i-3],n[i-1],n[i]),d.setLink(n[i-3],n[i-2]);break;case 40:this.$=n[i-1],d.setLink(n[i-1],n[i]);break;case 41:case 47:this.$=n[i-1]+" "+n[i];break;case 42:case 43:case 45:this.$=n[i-2]+" "+n[i-1]+" "+n[i];break;case 44:case 46:this.$=n[i-3]+" "+n[i-2]+" "+n[i-1]+" "+n[i];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:s,13:a,14:r,15:f,16:k,17:D,18:_,19:18,20:L,21:S,22:W,23:G,24:z,25:p,26:m,27:A,28:I,29:N,30:R,31:K,33:U,35:B,36:j,37:24,38:g,40:v},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:s,13:a,14:r,15:f,16:k,17:D,18:_,19:18,20:L,21:S,22:W,23:G,24:z,25:p,26:m,27:A,28:I,29:N,30:R,31:K,33:U,35:B,36:j,37:24,38:g,40:v},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:o(function(c,l){if(l.recoverable)this.trace(c);else{var h=new Error(c);throw h.hash=l,h}},"parseError"),parse:o(function(c){var l=this,h=[0],d=[],T=[null],n=[],u=this.table,i="",M=0,C=0,E=0,P=2,Y=1,at=n.slice.call(arguments,1),F=Object.create(this.lexer),Z={yy:{}};for(var nt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,nt)&&(Z.yy[nt]=this.yy[nt]);F.setInput(c,Z.yy),Z.yy.lexer=F,Z.yy.parser=this,typeof F.yylloc>"u"&&(F.yylloc={});var it=F.yylloc;n.push(it);var ot=F.options&&F.options.ranges;typeof Z.yy.parseError=="function"?this.parseError=Z.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ht(X){h.length=h.length-2*X,T.length=T.length-X,n.length=n.length-X}o(ht,"popStack");function kt(){var X;return X=d.pop()||F.lex()||Y,typeof X!="number"&&(X instanceof Array&&(d=X,X=d.pop()),X=l.symbols_[X]||X),X}o(kt,"lex");for(var V,rt,Q,H,On,Ct,ct={},bt,J,ee,xt;;){if(Q=h[h.length-1],this.defaultActions[Q]?H=this.defaultActions[Q]:((V===null||typeof V>"u")&&(V=kt()),H=u[Q]&&u[Q][V]),typeof H>"u"||!H.length||!H[0]){var St="";xt=[];for(bt in u[Q])this.terminals_[bt]&&bt>P&&xt.push("'"+this.terminals_[bt]+"'");F.showPosition?St="Parse error on line "+(M+1)+`:
`+F.showPosition()+`
Expecting `+xt.join(", ")+", got '"+(this.terminals_[V]||V)+"'":St="Parse error on line "+(M+1)+": Unexpected "+(V==Y?"end of input":"'"+(this.terminals_[V]||V)+"'"),this.parseError(St,{text:F.match,token:this.terminals_[V]||V,line:F.yylineno,loc:it,expected:xt})}if(H[0]instanceof Array&&H.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Q+", token: "+V);switch(H[0]){case 1:h.push(V),T.push(F.yytext),n.push(F.yylloc),h.push(H[1]),V=null,rt?(V=rt,rt=null):(C=F.yyleng,i=F.yytext,M=F.yylineno,it=F.yylloc,E>0&&E--);break;case 2:if(J=this.productions_[H[1]][1],ct.$=T[T.length-J],ct._$={first_line:n[n.length-(J||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(J||1)].first_column,last_column:n[n.length-1].last_column},ot&&(ct._$.range=[n[n.length-(J||1)].range[0],n[n.length-1].range[1]]),Ct=this.performAction.apply(ct,[i,C,M,Z.yy,H[1],T,n].concat(at)),typeof Ct<"u")return Ct;J&&(h=h.slice(0,-1*J*2),T=T.slice(0,-1*J),n=n.slice(0,-1*J)),h.push(this.productions_[H[1]][0]),T.push(ct.$),n.push(ct._$),ee=u[h[h.length-2]][h[h.length-1]],h.push(ee);break;case 3:return!0}}return!0},"parse")},x=function(){var w={EOF:1,parseError:o(function(l,h){if(this.yy.parser)this.yy.parser.parseError(l,h);else throw new Error(l)},"parseError"),setInput:o(function(c,l){return this.yy=l||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:o(function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var l=c.match(/(?:\r\n?|\n).*/g);return l?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},"input"),unput:o(function(c){var l=c.length,h=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-l),this.offset-=l;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var T=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===d.length?this.yylloc.first_column:0)+d[d.length-h.length].length-h[0].length:this.yylloc.first_column-l},this.options.ranges&&(this.yylloc.range=[T[0],T[0]+this.yyleng-l]),this.yyleng=this.yytext.length,this},"unput"),more:o(function(){return this._more=!0,this},"more"),reject:o(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:o(function(c){this.unput(this.match.slice(c))},"less"),pastInput:o(function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:o(function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:o(function(){var c=this.pastInput(),l=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+l+"^"},"showPosition"),test_match:o(function(c,l){var h,d,T;if(this.options.backtrack_lexer&&(T={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(T.yylloc.range=this.yylloc.range.slice(0))),d=c[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],h=this.performAction.call(this,this.yy,this,l,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var n in T)this[n]=T[n];return!1}return!1},"test_match"),next:o(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,l,h,d;this._more||(this.yytext="",this.match="");for(var T=this._currentRules(),n=0;n<T.length;n++)if(h=this._input.match(this.rules[T[n]]),h&&(!l||h[0].length>l[0].length)){if(l=h,d=n,this.options.backtrack_lexer){if(c=this.test_match(h,T[n]),c!==!1)return c;if(this._backtrack){l=!1;continue}else return!1}else if(!this.options.flex)break}return l?(c=this.test_match(l,T[d]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:o(function(){var l=this.next();return l||this.lex()},"lex"),begin:o(function(l){this.conditionStack.push(l)},"begin"),popState:o(function(){var l=this.conditionStack.length-1;return l>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:o(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:o(function(l){return l=this.conditionStack.length-1-Math.abs(l||0),l>=0?this.conditionStack[l]:"INITIAL"},"topState"),pushState:o(function(l){this.begin(l)},"pushState"),stateStackSize:o(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:o(function(l,h,d,T){var n=T;switch(d){case 0:return this.begin("open_directive"),"open_directive";break;case 1:return this.begin("acc_title"),31;break;case 2:return this.popState(),"acc_title_value";break;case 3:return this.begin("acc_descr"),33;break;case 4:return this.popState(),"acc_descr_value";break;case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return w}();b.lexer=x;function y(){this.yy={}}return o(y,"Parser"),y.prototype=b,b.Parser=y,new y}();Vt.parser=Vt;var Se=Vt;var Ye=lt(Qe(),1),q=lt(ne(),1),Fe=lt(Ee(),1),We=lt(Me(),1),Ve=lt(Ae(),1);q.default.extend(Fe.default);q.default.extend(We.default);q.default.extend(Ve.default);var Le={friday:5,saturday:6},$="",Xt="",qt,Ut="",yt=[],pt=[],Zt=new Map,Qt=[],wt=[],ft="",Kt="",Oe=["active","done","crit","milestone"],$t=[],gt=!1,Jt=!1,te="sunday",_t="saturday",jt=0,Ke=o(function(){Qt=[],wt=[],ft="",$t=[],Tt=0,Ht=void 0,vt=void 0,O=[],$="",Xt="",Kt="",qt=void 0,Ut="",yt=[],pt=[],gt=!1,Jt=!1,jt=0,Zt=new Map,se(),te="sunday",_t="saturday"},"clear"),$e=o(function(t){Xt=t},"setAxisFormat"),Je=o(function(){return Xt},"getAxisFormat"),tn=o(function(t){qt=t},"setTickInterval"),en=o(function(){return qt},"getTickInterval"),nn=o(function(t){Ut=t},"setTodayMarker"),rn=o(function(){return Ut},"getTodayMarker"),sn=o(function(t){$=t},"setDateFormat"),an=o(function(){gt=!0},"enableInclusiveEndDates"),on=o(function(){return gt},"endDatesAreInclusive"),cn=o(function(){Jt=!0},"enableTopAxis"),ln=o(function(){return Jt},"topAxisEnabled"),un=o(function(t){Kt=t},"setDisplayMode"),dn=o(function(){return Kt},"getDisplayMode"),fn=o(function(){return $},"getDateFormat"),hn=o(function(t){yt=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),kn=o(function(){return yt},"getIncludes"),mn=o(function(t){pt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),yn=o(function(){return pt},"getExcludes"),pn=o(function(){return Zt},"getLinks"),gn=o(function(t){ft=t,Qt.push(t)},"addSection"),bn=o(function(){return Qt},"getSections"),xn=o(function(){let t=Ie(),e=10,s=0;for(;!t&&s<e;)t=Ie(),s++;return wt=O,wt},"getTasks"),Pe=o(function(t,e,s,a){return a.includes(t.format(e.trim()))?!1:s.includes("weekends")&&(t.isoWeekday()===Le[_t]||t.isoWeekday()===Le[_t]+1)||s.includes(t.format("dddd").toLowerCase())?!0:s.includes(t.format(e.trim()))},"isInvalidDate"),Tn=o(function(t){te=t},"setWeekday"),vn=o(function(){return te},"getWeekday"),wn=o(function(t){_t=t},"setWeekend"),ze=o(function(t,e,s,a){if(!s.length||t.manualEndTime)return;let r;t.startTime instanceof Date?r=(0,q.default)(t.startTime):r=(0,q.default)(t.startTime,e,!0),r=r.add(1,"d");let f;t.endTime instanceof Date?f=(0,q.default)(t.endTime):f=(0,q.default)(t.endTime,e,!0);let[k,D]=_n(r,f,e,s,a);t.endTime=k.toDate(),t.renderEndTime=D},"checkTaskDates"),_n=o(function(t,e,s,a,r){let f=!1,k=null;for(;t<=e;)f||(k=e.toDate()),f=Pe(t,s,a,r),f&&(e=e.add(1,"d")),t=t.add(1,"d");return[e,k]},"fixTaskDates"),Gt=o(function(t,e,s){s=s.trim();let r=/^after\s+(?<ids>[\d\w- ]+)/.exec(s);if(r!==null){let k=null;for(let _ of r.groups.ids.split(" ")){let L=st(_);L!==void 0&&(!k||L.endTime>k.endTime)&&(k=L)}if(k)return k.endTime;let D=new Date;return D.setHours(0,0,0,0),D}let f=(0,q.default)(s,e.trim(),!0);if(f.isValid())return f.toDate();{ut.debug("Invalid date:"+s),ut.debug("With date format:"+e.trim());let k=new Date(s);if(k===void 0||isNaN(k.getTime())||k.getFullYear()<-1e4||k.getFullYear()>1e4)throw new Error("Invalid date:"+s);return k}},"getStartDate"),Ne=o(function(t){let e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return e!==null?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),Re=o(function(t,e,s,a=!1){s=s.trim();let f=/^until\s+(?<ids>[\d\w- ]+)/.exec(s);if(f!==null){let S=null;for(let G of f.groups.ids.split(" ")){let z=st(G);z!==void 0&&(!S||z.startTime<S.startTime)&&(S=z)}if(S)return S.startTime;let W=new Date;return W.setHours(0,0,0,0),W}let k=(0,q.default)(s,e.trim(),!0);if(k.isValid())return a&&(k=k.add(1,"d")),k.toDate();let D=(0,q.default)(t),[_,L]=Ne(s);if(!Number.isNaN(_)){let S=D.add(_,L);S.isValid()&&(D=S)}return D.toDate()},"getEndDate"),Tt=0,dt=o(function(t){return t===void 0?(Tt=Tt+1,"task"+Tt):t},"parseId"),Dn=o(function(t,e){let s;e.substr(0,1)===":"?s=e.substr(1,e.length):s=e;let a=s.split(","),r={};Xe(a,r,Oe);for(let k=0;k<a.length;k++)a[k]=a[k].trim();let f="";switch(a.length){case 1:r.id=dt(),r.startTime=t.endTime,f=a[0];break;case 2:r.id=dt(),r.startTime=Gt(void 0,$,a[0]),f=a[1];break;case 3:r.id=dt(a[0]),r.startTime=Gt(void 0,$,a[1]),f=a[2];break;default:}return f&&(r.endTime=Re(r.startTime,$,f,gt),r.manualEndTime=(0,q.default)(f,"YYYY-MM-DD",!0).isValid(),ze(r,$,pt,yt)),r},"compileData"),Cn=o(function(t,e){let s;e.substr(0,1)===":"?s=e.substr(1,e.length):s=e;let a=s.split(","),r={};Xe(a,r,Oe);for(let f=0;f<a.length;f++)a[f]=a[f].trim();switch(a.length){case 1:r.id=dt(),r.startTime={type:"prevTaskEnd",id:t},r.endTime={data:a[0]};break;case 2:r.id=dt(),r.startTime={type:"getStartDate",startData:a[0]},r.endTime={data:a[1]};break;case 3:r.id=dt(a[0]),r.startTime={type:"getStartDate",startData:a[1]},r.endTime={data:a[2]};break;default:}return r},"parseData"),Ht,vt,O=[],Be={},Sn=o(function(t,e){let s={section:ft,type:ft,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},a=Cn(vt,e);s.raw.startTime=a.startTime,s.raw.endTime=a.endTime,s.id=a.id,s.prevTaskId=vt,s.active=a.active,s.done=a.done,s.crit=a.crit,s.milestone=a.milestone,s.order=jt,jt++;let r=O.push(s);vt=s.id,Be[s.id]=r-1},"addTask"),st=o(function(t){let e=Be[t];return O[e]},"findTaskById"),En=o(function(t,e){let s={section:ft,type:ft,description:t,task:t,classes:[]},a=Dn(Ht,e);s.startTime=a.startTime,s.endTime=a.endTime,s.id=a.id,s.active=a.active,s.done=a.done,s.crit=a.crit,s.milestone=a.milestone,Ht=s,wt.push(s)},"addTaskOrg"),Ie=o(function(){let t=o(function(s){let a=O[s],r="";switch(O[s].raw.startTime.type){case"prevTaskEnd":{let f=st(a.prevTaskId);a.startTime=f.endTime;break}case"getStartDate":r=Gt(void 0,$,O[s].raw.startTime.startData),r&&(O[s].startTime=r);break}return O[s].startTime&&(O[s].endTime=Re(O[s].startTime,$,O[s].raw.endTime.data,gt),O[s].endTime&&(O[s].processed=!0,O[s].manualEndTime=(0,q.default)(O[s].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),ze(O[s],$,pt,yt))),O[s].processed},"compileTask"),e=!0;for(let[s,a]of O.entries())t(s),e=e&&a.processed;return e},"compileTasks"),Mn=o(function(t,e){let s=e;et().securityLevel!=="loose"&&(s=(0,Ye.sanitizeUrl)(e)),t.split(",").forEach(function(a){st(a)!==void 0&&(Ge(a,()=>{window.open(s,"_self")}),Zt.set(a,s))}),je(t,"clickable")},"setLink"),je=o(function(t,e){t.split(",").forEach(function(s){let a=st(s);a!==void 0&&a.classes.push(e)})},"setClass"),An=o(function(t,e,s){if(et().securityLevel!=="loose"||e===void 0)return;let a=[];if(typeof s=="string"){a=s.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let f=0;f<a.length;f++){let k=a[f].trim();k.startsWith('"')&&k.endsWith('"')&&(k=k.substr(1,k.length-2)),a[f]=k}}a.length===0&&a.push(t),st(t)!==void 0&&Ge(t,()=>{Ce.runFunc(e,...a)})},"setClickFun"),Ge=o(function(t,e){$t.push(function(){let s=document.querySelector(`[id="${t}"]`);s!==null&&s.addEventListener("click",function(){e()})},function(){let s=document.querySelector(`[id="${t}-text"]`);s!==null&&s.addEventListener("click",function(){e()})})},"pushFun"),Ln=o(function(t,e,s){t.split(",").forEach(function(a){An(a,e,s)}),je(t,"clickable")},"setClickEvent"),In=o(function(t){$t.forEach(function(e){e(t)})},"bindFunctions"),He={getConfig:o(()=>et().gantt,"getConfig"),clear:Ke,setDateFormat:sn,getDateFormat:fn,enableInclusiveEndDates:an,endDatesAreInclusive:on,enableTopAxis:cn,topAxisEnabled:ln,setAxisFormat:$e,getAxisFormat:Je,setTickInterval:tn,getTickInterval:en,setTodayMarker:nn,getTodayMarker:rn,setAccTitle:ae,getAccTitle:oe,setDiagramTitle:ue,getDiagramTitle:de,setDisplayMode:un,getDisplayMode:dn,setAccDescription:ce,getAccDescription:le,addSection:gn,getSections:bn,getTasks:xn,addTask:Sn,findTaskById:st,addTaskOrg:En,setIncludes:hn,getIncludes:kn,setExcludes:mn,getExcludes:yn,setClickEvent:Ln,setLink:Mn,getLinks:pn,bindFunctions:In,parseDuration:Ne,isInvalidDate:Pe,setWeekday:Tn,getWeekday:vn,setWeekend:wn};function Xe(t,e,s){let a=!0;for(;a;)a=!1,s.forEach(function(r){let f="^\\s*"+r+"\\s*$",k=new RegExp(f);t[0].match(k)&&(e[r]=!0,t.shift(1),a=!0)})}o(Xe,"getTaskTags");var Dt=lt(ne(),1);var Yn=o(function(){ut.debug("Something is calling, setConf, remove the call")},"setConf"),qe={monday:be,tuesday:xe,wednesday:Te,thursday:ve,friday:we,saturday:_e,sunday:ge},Fn=o((t,e)=>{let s=[...t].map(()=>-1/0),a=[...t].sort((f,k)=>f.startTime-k.startTime||f.order-k.order),r=0;for(let f of a)for(let k=0;k<s.length;k++)if(f.startTime>=s[k]){s[k]=f.endTime,f.order=k+e,k>r&&(r=k);break}return r},"getMaxIntersections"),tt,Wn=o(function(t,e,s,a){let r=et().gantt,f=et().securityLevel,k;f==="sandbox"&&(k=mt("#i"+e));let D=f==="sandbox"?mt(k.nodes()[0].contentDocument.body):mt("body"),_=f==="sandbox"?k.nodes()[0].contentDocument:document,L=_.getElementById(e);tt=L.parentElement.offsetWidth,tt===void 0&&(tt=1200),r.useWidth!==void 0&&(tt=r.useWidth);let S=a.db.getTasks(),W=[];for(let g of S)W.push(g.type);W=j(W);let G={},z=2*r.topPadding;if(a.db.getDisplayMode()==="compact"||r.displayMode==="compact"){let g={};for(let b of S)g[b.section]===void 0?g[b.section]=[b]:g[b.section].push(b);let v=0;for(let b of Object.keys(g)){let x=Fn(g[b],v)+1;v+=x,z+=x*(r.barHeight+r.barGap),G[b]=x}}else{z+=S.length*(r.barHeight+r.barGap);for(let g of W)G[g]=S.filter(v=>v.type===g).length}L.setAttribute("viewBox","0 0 "+tt+" "+z);let p=D.select(`[id="${e}"]`),m=De().domain([he(S,function(g){return g.startTime}),fe(S,function(g){return g.endTime})]).rangeRound([0,tt-r.leftPadding-r.rightPadding]);function A(g,v){let b=g.startTime,x=v.startTime,y=0;return b>x?y=1:b<x&&(y=-1),y}o(A,"taskCompare"),S.sort(A),I(S,tt,z),re(p,z,tt,r.useMaxWidth),p.append("text").text(a.db.getDiagramTitle()).attr("x",tt/2).attr("y",r.titleTopMargin).attr("class","titleText");function I(g,v,b){let x=r.barHeight,y=x+r.barGap,w=r.topPadding,c=r.leftPadding,l=pe().domain([0,W.length]).range(["#00B9FA","#F95002"]).interpolate(ye);R(y,w,c,v,b,g,a.db.getExcludes(),a.db.getIncludes()),K(c,w,v,b),N(g,y,w,c,x,l,v,b),U(y,w,c,x,l),B(c,w,v,b)}o(I,"makeGantt");function N(g,v,b,x,y,w,c){let h=[...new Set(g.map(u=>u.order))].map(u=>g.find(i=>i.order===u));p.append("g").selectAll("rect").data(h).enter().append("rect").attr("x",0).attr("y",function(u,i){return i=u.order,i*v+b-2}).attr("width",function(){return c-r.rightPadding/2}).attr("height",v).attr("class",function(u){for(let[i,M]of W.entries())if(u.type===M)return"section section"+i%r.numberSectionStyles;return"section section0"});let d=p.append("g").selectAll("rect").data(g).enter(),T=a.db.getLinks();if(d.append("rect").attr("id",function(u){return u.id}).attr("rx",3).attr("ry",3).attr("x",function(u){return u.milestone?m(u.startTime)+x+.5*(m(u.endTime)-m(u.startTime))-.5*y:m(u.startTime)+x}).attr("y",function(u,i){return i=u.order,i*v+b}).attr("width",function(u){return u.milestone?y:m(u.renderEndTime||u.endTime)-m(u.startTime)}).attr("height",y).attr("transform-origin",function(u,i){return i=u.order,(m(u.startTime)+x+.5*(m(u.endTime)-m(u.startTime))).toString()+"px "+(i*v+b+.5*y).toString()+"px"}).attr("class",function(u){let i="task",M="";u.classes.length>0&&(M=u.classes.join(" "));let C=0;for(let[P,Y]of W.entries())u.type===Y&&(C=P%r.numberSectionStyles);let E="";return u.active?u.crit?E+=" activeCrit":E=" active":u.done?u.crit?E=" doneCrit":E=" done":u.crit&&(E+=" crit"),E.length===0&&(E=" task"),u.milestone&&(E=" milestone "+E),E+=C,E+=" "+M,i+E}),d.append("text").attr("id",function(u){return u.id+"-text"}).text(function(u){return u.task}).attr("font-size",r.fontSize).attr("x",function(u){let i=m(u.startTime),M=m(u.renderEndTime||u.endTime);u.milestone&&(i+=.5*(m(u.endTime)-m(u.startTime))-.5*y),u.milestone&&(M=i+y);let C=this.getBBox().width;return C>M-i?M+C+1.5*r.leftPadding>c?i+x-5:M+x+5:(M-i)/2+i+x}).attr("y",function(u,i){return i=u.order,i*v+r.barHeight/2+(r.fontSize/2-2)+b}).attr("text-height",y).attr("class",function(u){let i=m(u.startTime),M=m(u.endTime);u.milestone&&(M=i+y);let C=this.getBBox().width,E="";u.classes.length>0&&(E=u.classes.join(" "));let P=0;for(let[at,F]of W.entries())u.type===F&&(P=at%r.numberSectionStyles);let Y="";return u.active&&(u.crit?Y="activeCritText"+P:Y="activeText"+P),u.done?u.crit?Y=Y+" doneCritText"+P:Y=Y+" doneText"+P:u.crit&&(Y=Y+" critText"+P),u.milestone&&(Y+=" milestoneText"),C>M-i?M+C+1.5*r.leftPadding>c?E+" taskTextOutsideLeft taskTextOutside"+P+" "+Y:E+" taskTextOutsideRight taskTextOutside"+P+" "+Y+" width-"+C:E+" taskText taskText"+P+" "+Y+" width-"+C}),et().securityLevel==="sandbox"){let u;u=mt("#i"+e);let i=u.nodes()[0].contentDocument;d.filter(function(M){return T.has(M.id)}).each(function(M){var C=i.querySelector("#"+M.id),E=i.querySelector("#"+M.id+"-text");let P=C.parentNode;var Y=i.createElement("a");Y.setAttribute("xlink:href",T.get(M.id)),Y.setAttribute("target","_top"),P.appendChild(Y),Y.appendChild(C),Y.appendChild(E)})}}o(N,"drawRects");function R(g,v,b,x,y,w,c,l){if(c.length===0&&l.length===0)return;let h,d;for(let{startTime:C,endTime:E}of w)(h===void 0||C<h)&&(h=C),(d===void 0||E>d)&&(d=E);if(!h||!d)return;if((0,Dt.default)(d).diff((0,Dt.default)(h),"year")>5){ut.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}let T=a.db.getDateFormat(),n=[],u=null,i=(0,Dt.default)(h);for(;i.valueOf()<=d;)a.db.isInvalidDate(i,T,c,l)?u?u.end=i:u={start:i,end:i}:u&&(n.push(u),u=null),i=i.add(1,"d");p.append("g").selectAll("rect").data(n).enter().append("rect").attr("id",function(C){return"exclude-"+C.start.format("YYYY-MM-DD")}).attr("x",function(C){return m(C.start)+b}).attr("y",r.gridLineStartPadding).attr("width",function(C){let E=C.end.add(1,"day");return m(E)-m(C.start)}).attr("height",y-v-r.gridLineStartPadding).attr("transform-origin",function(C,E){return(m(C.start)+b+.5*(m(C.end)-m(C.start))).toString()+"px "+(E*g+.5*y).toString()+"px"}).attr("class","exclude-range")}o(R,"drawExcludeDays");function K(g,v,b,x){let y=me(m).tickSize(-x+v+r.gridLineStartPadding).tickFormat(Wt(a.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d")),c=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(a.db.getTickInterval()||r.tickInterval);if(c!==null){let l=c[1],h=c[2],d=a.db.getWeekday()||r.weekday;switch(h){case"millisecond":y.ticks(Mt.every(l));break;case"second":y.ticks(At.every(l));break;case"minute":y.ticks(Lt.every(l));break;case"hour":y.ticks(It.every(l));break;case"day":y.ticks(Yt.every(l));break;case"week":y.ticks(qe[d].every(l));break;case"month":y.ticks(Ft.every(l));break}}if(p.append("g").attr("class","grid").attr("transform","translate("+g+", "+(x-50)+")").call(y).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),a.db.topAxisEnabled()||r.topAxis){let l=ke(m).tickSize(-x+v+r.gridLineStartPadding).tickFormat(Wt(a.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));if(c!==null){let h=c[1],d=c[2],T=a.db.getWeekday()||r.weekday;switch(d){case"millisecond":l.ticks(Mt.every(h));break;case"second":l.ticks(At.every(h));break;case"minute":l.ticks(Lt.every(h));break;case"hour":l.ticks(It.every(h));break;case"day":l.ticks(Yt.every(h));break;case"week":l.ticks(qe[T].every(h));break;case"month":l.ticks(Ft.every(h));break}}p.append("g").attr("class","grid").attr("transform","translate("+g+", "+v+")").call(l).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}o(K,"makeGrid");function U(g,v){let b=0,x=Object.keys(G).map(y=>[y,G[y]]);p.append("g").selectAll("text").data(x).enter().append(function(y){let w=y[0].split(ie.lineBreakRegex),c=-(w.length-1)/2,l=_.createElementNS("http://www.w3.org/2000/svg","text");l.setAttribute("dy",c+"em");for(let[h,d]of w.entries()){let T=_.createElementNS("http://www.w3.org/2000/svg","tspan");T.setAttribute("alignment-baseline","central"),T.setAttribute("x","10"),h>0&&T.setAttribute("dy","1em"),T.textContent=d,l.appendChild(T)}return l}).attr("x",10).attr("y",function(y,w){if(w>0)for(let c=0;c<w;c++)return b+=x[w-1][1],y[1]*g/2+b*g+v;else return y[1]*g/2+v}).attr("font-size",r.sectionFontSize).attr("class",function(y){for(let[w,c]of W.entries())if(y[0]===c)return"sectionTitle sectionTitle"+w%r.numberSectionStyles;return"sectionTitle"})}o(U,"vertLabels");function B(g,v,b,x){let y=a.db.getTodayMarker();if(y==="off")return;let w=p.append("g").attr("class","today"),c=new Date,l=w.append("line");l.attr("x1",m(c)+g).attr("x2",m(c)+g).attr("y1",r.titleTopMargin).attr("y2",x-r.titleTopMargin).attr("class","today"),y!==""&&l.attr("style",y.replace(/,/g,";"))}o(B,"drawToday");function j(g){let v={},b=[];for(let x=0,y=g.length;x<y;++x)Object.prototype.hasOwnProperty.call(v,g[x])||(v[g[x]]=!0,b.push(g[x]));return b}o(j,"checkUnique")},"draw"),Ue={setConf:Yn,draw:Wn};var Vn=o(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
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
    font-family: ${t.fontFamily};
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
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
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
    font-family: ${t.fontFamily};
  }
`,"getStyles"),Ze=Vn;var oi={parser:Se,db:He,renderer:Ue,styles:Ze};export{oi as diagram};
