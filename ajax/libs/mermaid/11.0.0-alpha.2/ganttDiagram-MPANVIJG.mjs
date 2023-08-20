import{s as _e}from"./chunk-UR2MHPN3.mjs";import{L as Te,a as Ue}from"./chunk-BMJLAD6R.mjs";import{e as he,f as ke,g as ye,h as pe,i as ge,j as be,k as xe,l as ve}from"./chunk-B5PMS7SM.mjs";import"./chunk-QEUXDD35.mjs";import{A as ue,B as de,C as At,D as Mt,E as fe,a as c,c as Dt,e as ct,f as Kt,g as ft,i as $t,j as te,k as ee,l as ie,m as ht,o as ne,r as re,ra as et,s as St,t as Ct,u as Et,ua as me,v as se,w as ae,x as oe,y as ce,z as le}from"./chunk-FI53XPFH.mjs";var De=Dt((It,Yt)=>{"use strict";(function(t,o){typeof It=="object"&&typeof Yt<"u"?Yt.exports=o():typeof define=="function"&&define.amd?define(o):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_isoWeek=o()})(It,function(){"use strict";var t="day";return function(o,n,e){var r=c(function(x){return x.add(4-x.isoWeekday(),t)},"a"),u=n.prototype;u.isoWeekYear=function(){return r(this).year()},u.isoWeek=function(x){if(!this.$utils().u(x))return this.add(7*(x-this.isoWeek()),t);var M,Y,F,V,U=r(this),g=(M=this.isoWeekYear(),Y=this.$u,F=(Y?e.utc:e)().year(M).startOf("year"),V=4-F.isoWeekday(),F.isoWeekday()>4&&(V+=7),F.add(V,t));return U.diff(g,"week")+1},u.isoWeekday=function(x){return this.$utils().u(x)?this.day()||7:this.day(this.day()%7?x:x-7)};var m=u.startOf;u.startOf=function(x,M){var Y=this.$utils(),F=!!Y.u(M)||M;return Y.p(x)==="isoweek"?F?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):m.bind(this)(x,M)}}})});var Se=Dt((Ft,Wt)=>{"use strict";(function(t,o){typeof Ft=="object"&&typeof Wt<"u"?Wt.exports=o():typeof define=="function"&&define.amd?define(o):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_customParseFormat=o()})(Ft,function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},o=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,e=/\d\d?/,r=/\d*[^-_:/,()\s\d]+/,u={},m=c(function(g){return(g=+g)+(g>68?1900:2e3)},"s"),x=c(function(g){return function(_){this[g]=+_}},"a"),M=[/[+-]\d\d:?(\d\d)?|Z/,function(g){(this.zone||(this.zone={})).offset=function(_){if(!_||_==="Z")return 0;var p=_.match(/([+-]|\d\d)/g),L=60*p[1]+(+p[2]||0);return L===0?0:p[0]==="+"?-L:L}(g)}],Y=c(function(g){var _=u[g];return _&&(_.indexOf?_:_.s.concat(_.f))},"h"),F=c(function(g,_){var p,L=u.meridiem;if(L){for(var P=1;P<=24;P+=1)if(g.indexOf(L(P,0,_))>-1){p=P>12;break}}else p=g===(_?"pm":"PM");return p},"u"),V={A:[r,function(g){this.afternoon=F(g,!1)}],a:[r,function(g){this.afternoon=F(g,!0)}],S:[/\d/,function(g){this.milliseconds=100*+g}],SS:[n,function(g){this.milliseconds=10*+g}],SSS:[/\d{3}/,function(g){this.milliseconds=+g}],s:[e,x("seconds")],ss:[e,x("seconds")],m:[e,x("minutes")],mm:[e,x("minutes")],H:[e,x("hours")],h:[e,x("hours")],HH:[e,x("hours")],hh:[e,x("hours")],D:[e,x("day")],DD:[n,x("day")],Do:[r,function(g){var _=u.ordinal,p=g.match(/\d+/);if(this.day=p[0],_)for(var L=1;L<=31;L+=1)_(L).replace(/\[|\]/g,"")===g&&(this.day=L)}],M:[e,x("month")],MM:[n,x("month")],MMM:[r,function(g){var _=Y("months"),p=(Y("monthsShort")||_.map(function(L){return L.slice(0,3)})).indexOf(g)+1;if(p<1)throw new Error;this.month=p%12||p}],MMMM:[r,function(g){var _=Y("months").indexOf(g)+1;if(_<1)throw new Error;this.month=_%12||_}],Y:[/[+-]?\d+/,x("year")],YY:[n,function(g){this.year=m(g)}],YYYY:[/\d{4}/,x("year")],Z:M,ZZ:M};function U(g){var _,p;_=g,p=u&&u.formats;for(var L=(g=_.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(q,y,T){var b=T&&T.toUpperCase();return y||p[T]||t[T]||p[b].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(v,k,C){return k||C.slice(1)})})).match(o),P=L.length,N=0;N<P;N+=1){var Q=L[N],X=V[Q],B=X&&X[0],R=X&&X[1];L[N]=R?{regex:B,parser:R}:Q.replace(/^\[|\]$/g,"")}return function(q){for(var y={},T=0,b=0;T<P;T+=1){var v=L[T];if(typeof v=="string")b+=v.length;else{var k=v.regex,C=v.parser,D=q.slice(b),w=k.exec(D)[0];C.call(y,w),q=q.replace(w,"")}}return function(l){var d=l.afternoon;if(d!==void 0){var h=l.hours;d?h<12&&(l.hours+=12):h===12&&(l.hours=0),delete l.afternoon}}(y),y}}return c(U,"c"),function(g,_,p){p.p.customParseFormat=!0,g&&g.parseTwoDigitYear&&(m=g.parseTwoDigitYear);var L=_.prototype,P=L.parse;L.parse=function(N){var Q=N.date,X=N.utc,B=N.args;this.$u=X;var R=B[1];if(typeof R=="string"){var q=B[2]===!0,y=B[3]===!0,T=q||y,b=B[2];y&&(b=B[2]),u=this.$locale(),!q&&b&&(u=p.Ls[b]),this.$d=function(D,w,l){try{if(["x","X"].indexOf(w)>-1)return new Date((w==="X"?1e3:1)*D);var d=U(w)(D),h=d.year,f=d.month,a=d.day,i=d.hours,E=d.minutes,s=d.seconds,S=d.milliseconds,W=d.zone,A=new Date,it=a||(h||f?1:A.getDate()),tt=h||A.getFullYear(),at=0;h&&!f||(at=f>0?f-1:A.getMonth());var I=i||0,Z=E||0,nt=s||0,rt=S||0;return W?new Date(Date.UTC(tt,at,it,I,Z,nt,rt+60*W.offset*1e3)):l?new Date(Date.UTC(tt,at,it,I,Z,nt,rt)):new Date(tt,at,it,I,Z,nt,rt)}catch{return new Date("")}}(Q,R,X),this.init(),b&&b!==!0&&(this.$L=this.locale(b).$L),T&&Q!=this.format(R)&&(this.$d=new Date("")),u={}}else if(R instanceof Array)for(var v=R.length,k=1;k<=v;k+=1){B[1]=R[k-1];var C=p.apply(this,B);if(C.isValid()){this.$d=C.$d,this.$L=C.$L,this.init();break}k===v&&(this.$d=new Date(""))}else P.call(this,N)}}})});var Ce=Dt((zt,Vt)=>{"use strict";(function(t,o){typeof zt=="object"&&typeof Vt<"u"?Vt.exports=o():typeof define=="function"&&define.amd?define(o):(t=typeof globalThis<"u"?globalThis:t||self).dayjs_plugin_advancedFormat=o()})(zt,function(){"use strict";return function(t,o){var n=o.prototype,e=n.format;n.format=function(r){var u=this,m=this.$locale();if(!this.isValid())return e.bind(this)(r);var x=this.$utils(),M=(r||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(Y){switch(Y){case"Q":return Math.ceil((u.$M+1)/3);case"Do":return m.ordinal(u.$D);case"gggg":return u.weekYear();case"GGGG":return u.isoWeekYear();case"wo":return m.ordinal(u.week(),"W");case"w":case"ww":return x.s(u.week(),Y==="w"?1:2,"0");case"W":case"WW":return x.s(u.isoWeek(),Y==="W"?1:2,"0");case"k":case"kk":return x.s(String(u.$H===0?24:u.$H),Y==="k"?1:2,"0");case"X":return Math.floor(u.$d.getTime()/1e3);case"x":return u.$d.getTime();case"z":return"["+u.offsetName()+"]";case"zzz":return"["+u.offsetName("long")+"]";default:return Y}});return e.bind(this)(M)}}})});var Lt=function(){var t=c(function(w,l,d,h){for(d=d||{},h=w.length;h--;d[w[h]]=l);return d},"o"),o=[1,3],n=[1,5],e=[7,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,33,34,36,43,48],r=[1,32],u=[1,33],m=[1,34],x=[1,35],M=[1,36],Y=[1,37],F=[1,38],V=[1,15],U=[1,16],g=[1,17],_=[1,18],p=[1,19],L=[1,20],P=[1,21],N=[1,22],Q=[1,24],X=[1,25],B=[1,26],R=[1,27],q=[1,28],y=[1,30],T=[1,39],b=[1,42],v=[5,7,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,33,34,36,43,48],k={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,directive:4,gantt:5,document:6,EOF:7,line:8,SPACE:9,statement:10,NL:11,weekday:12,weekday_monday:13,weekday_tuesday:14,weekday_wednesday:15,weekday_thursday:16,weekday_friday:17,weekday_saturday:18,weekday_sunday:19,dateFormat:20,inclusiveEndDates:21,topAxis:22,axisFormat:23,tickInterval:24,excludes:25,includes:26,todayMarker:27,title:28,acc_title:29,acc_title_value:30,acc_descr:31,acc_descr_value:32,acc_descr_multiline_value:33,section:34,clickStatement:35,taskTxt:36,taskData:37,openDirective:38,typeDirective:39,closeDirective:40,":":41,argDirective:42,click:43,callbackname:44,callbackargs:45,href:46,clickStatementDebug:47,open_directive:48,type_directive:49,arg_directive:50,close_directive:51,$accept:0,$end:1},terminals_:{2:"error",5:"gantt",7:"EOF",9:"SPACE",11:"NL",13:"weekday_monday",14:"weekday_tuesday",15:"weekday_wednesday",16:"weekday_thursday",17:"weekday_friday",18:"weekday_saturday",19:"weekday_sunday",20:"dateFormat",21:"inclusiveEndDates",22:"topAxis",23:"axisFormat",24:"tickInterval",25:"excludes",26:"includes",27:"todayMarker",28:"title",29:"acc_title",30:"acc_title_value",31:"acc_descr",32:"acc_descr_value",33:"acc_descr_multiline_value",34:"section",36:"taskTxt",37:"taskData",41:":",43:"click",44:"callbackname",45:"callbackargs",46:"href",48:"open_directive",49:"type_directive",50:"arg_directive",51:"close_directive"},productions_:[0,[3,2],[3,3],[6,0],[6,2],[8,2],[8,1],[8,1],[8,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,2],[10,2],[10,1],[10,1],[10,1],[10,2],[10,1],[4,4],[4,6],[35,2],[35,3],[35,3],[35,4],[35,3],[35,4],[35,2],[47,2],[47,3],[47,3],[47,4],[47,3],[47,4],[47,2],[38,1],[39,1],[42,1],[40,1]],performAction:c(function(l,d,h,f,a,i,E){var s=i.length-1;switch(a){case 2:return i[s-1];case 3:this.$=[];break;case 4:i[s-1].push(i[s]),this.$=i[s-1];break;case 5:case 6:this.$=i[s];break;case 7:case 8:this.$=[];break;case 9:f.setWeekday("monday");break;case 10:f.setWeekday("tuesday");break;case 11:f.setWeekday("wednesday");break;case 12:f.setWeekday("thursday");break;case 13:f.setWeekday("friday");break;case 14:f.setWeekday("saturday");break;case 15:f.setWeekday("sunday");break;case 16:f.setDateFormat(i[s].substr(11)),this.$=i[s].substr(11);break;case 17:f.enableInclusiveEndDates(),this.$=i[s].substr(18);break;case 18:f.TopAxis(),this.$=i[s].substr(8);break;case 19:f.setAxisFormat(i[s].substr(11)),this.$=i[s].substr(11);break;case 20:f.setTickInterval(i[s].substr(13)),this.$=i[s].substr(13);break;case 21:f.setExcludes(i[s].substr(9)),this.$=i[s].substr(9);break;case 22:f.setIncludes(i[s].substr(9)),this.$=i[s].substr(9);break;case 23:f.setTodayMarker(i[s].substr(12)),this.$=i[s].substr(12);break;case 25:f.setDiagramTitle(i[s].substr(6)),this.$=i[s].substr(6);break;case 26:this.$=i[s].trim(),f.setAccTitle(this.$);break;case 27:case 28:this.$=i[s].trim(),f.setAccDescription(this.$);break;case 29:f.addSection(i[s].substr(8)),this.$=i[s].substr(8);break;case 31:f.addTask(i[s-1],i[s]),this.$="task";break;case 35:this.$=i[s-1],f.setClickEvent(i[s-1],i[s],null);break;case 36:this.$=i[s-2],f.setClickEvent(i[s-2],i[s-1],i[s]);break;case 37:this.$=i[s-2],f.setClickEvent(i[s-2],i[s-1],null),f.setLink(i[s-2],i[s]);break;case 38:this.$=i[s-3],f.setClickEvent(i[s-3],i[s-2],i[s-1]),f.setLink(i[s-3],i[s]);break;case 39:this.$=i[s-2],f.setClickEvent(i[s-2],i[s],null),f.setLink(i[s-2],i[s-1]);break;case 40:this.$=i[s-3],f.setClickEvent(i[s-3],i[s-1],i[s]),f.setLink(i[s-3],i[s-2]);break;case 41:this.$=i[s-1],f.setLink(i[s-1],i[s]);break;case 42:case 48:this.$=i[s-1]+" "+i[s];break;case 43:case 44:case 46:this.$=i[s-2]+" "+i[s-1]+" "+i[s];break;case 45:case 47:this.$=i[s-3]+" "+i[s-2]+" "+i[s-1]+" "+i[s];break;case 49:f.parseDirective("%%{","open_directive");break;case 50:f.parseDirective(i[s],"type_directive");break;case 51:i[s]=i[s].trim().replace(/'/g,'"'),f.parseDirective(i[s],"arg_directive");break;case 52:f.parseDirective("}%%","close_directive","gantt");break}},"anonymous"),table:[{3:1,4:2,5:o,38:4,48:n},{1:[3]},{3:6,4:2,5:o,38:4,48:n},t(e,[2,3],{6:7}),{39:8,49:[1,9]},{49:[2,49]},{1:[2,1]},{4:31,7:[1,10],8:11,9:[1,12],10:13,11:[1,14],12:23,13:r,14:u,15:m,16:x,17:M,18:Y,19:F,20:V,21:U,22:g,23:_,24:p,25:L,26:P,27:N,28:Q,29:X,31:B,33:R,34:q,35:29,36:y,38:4,43:T,48:n},{40:40,41:[1,41],51:b},t([41,51],[2,50]),t(e,[2,8],{1:[2,2]}),t(e,[2,4]),{4:31,10:43,12:23,13:r,14:u,15:m,16:x,17:M,18:Y,19:F,20:V,21:U,22:g,23:_,24:p,25:L,26:P,27:N,28:Q,29:X,31:B,33:R,34:q,35:29,36:y,38:4,43:T,48:n},t(e,[2,6]),t(e,[2,7]),t(e,[2,16]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),{30:[1,44]},{32:[1,45]},t(e,[2,28]),t(e,[2,29]),t(e,[2,30]),{37:[1,46]},t(e,[2,32]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),{44:[1,47],46:[1,48]},{11:[1,49]},{42:50,50:[1,51]},{11:[2,52]},t(e,[2,5]),t(e,[2,26]),t(e,[2,27]),t(e,[2,31]),t(e,[2,35],{45:[1,52],46:[1,53]}),t(e,[2,41],{44:[1,54]}),t(v,[2,33]),{40:55,51:b},{51:[2,51]},t(e,[2,36],{46:[1,56]}),t(e,[2,37]),t(e,[2,39],{45:[1,57]}),{11:[1,58]},t(e,[2,38]),t(e,[2,40]),t(v,[2,34])],defaultActions:{5:[2,49],6:[2,1],42:[2,52],51:[2,51]},parseError:c(function(l,d){if(d.recoverable)this.trace(l);else{var h=new Error(l);throw h.hash=d,h}},"parseError"),parse:c(function(l){var d=this,h=[0],f=[],a=[null],i=[],E=this.table,s="",S=0,W=0,A=0,it=2,tt=1,at=i.slice.call(arguments,1),I=Object.create(this.lexer),Z={yy:{}};for(var nt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,nt)&&(Z.yy[nt]=this.yy[nt]);I.setInput(l,Z.yy),Z.yy.lexer=I,Z.yy.parser=this,typeof I.yylloc>"u"&&(I.yylloc={});var rt=I.yylloc;i.push(rt);var Qt=I.options&&I.options.ranges;typeof Z.yy.parseError=="function"?this.parseError=Z.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Fi(j){h.length=h.length-2*j,a.length=a.length-j,i.length=i.length-j}c(Fi,"popStack");function He(){var j;return j=f.pop()||I.lex()||tt,typeof j!="number"&&(j instanceof Array&&(f=j,j=f.pop()),j=d.symbols_[j]||j),j}c(He,"lex");for(var O,Tt,st,H,Wi,_t,ot={},pt,K,Jt,gt;;){if(st=h[h.length-1],this.defaultActions[st]?H=this.defaultActions[st]:((O===null||typeof O>"u")&&(O=He()),H=E[st]&&E[st][O]),typeof H>"u"||!H.length||!H[0]){var wt="";gt=[];for(pt in E[st])this.terminals_[pt]&&pt>it&&gt.push("'"+this.terminals_[pt]+"'");I.showPosition?wt="Parse error on line "+(S+1)+`:
`+I.showPosition()+`
Expecting `+gt.join(", ")+", got '"+(this.terminals_[O]||O)+"'":wt="Parse error on line "+(S+1)+": Unexpected "+(O==tt?"end of input":"'"+(this.terminals_[O]||O)+"'"),this.parseError(wt,{text:I.match,token:this.terminals_[O]||O,line:I.yylineno,loc:rt,expected:gt})}if(H[0]instanceof Array&&H.length>1)throw new Error("Parse Error: multiple actions possible at state: "+st+", token: "+O);switch(H[0]){case 1:h.push(O),a.push(I.yytext),i.push(I.yylloc),h.push(H[1]),O=null,Tt?(O=Tt,Tt=null):(W=I.yyleng,s=I.yytext,S=I.yylineno,rt=I.yylloc,A>0&&A--);break;case 2:if(K=this.productions_[H[1]][1],ot.$=a[a.length-K],ot._$={first_line:i[i.length-(K||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(K||1)].first_column,last_column:i[i.length-1].last_column},Qt&&(ot._$.range=[i[i.length-(K||1)].range[0],i[i.length-1].range[1]]),_t=this.performAction.apply(ot,[s,W,S,Z.yy,H[1],a,i].concat(at)),typeof _t<"u")return _t;K&&(h=h.slice(0,-1*K*2),a=a.slice(0,-1*K),i=i.slice(0,-1*K)),h.push(this.productions_[H[1]][0]),a.push(ot.$),i.push(ot._$),Jt=E[h[h.length-2]][h[h.length-1]],h.push(Jt);break;case 3:return!0}}return!0},"parse")},C=function(){var w={EOF:1,parseError:c(function(d,h){if(this.yy.parser)this.yy.parser.parseError(d,h);else throw new Error(d)},"parseError"),setInput:function(l,d){return this.yy=d||this.yy||{},this._input=l,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var l=this._input[0];this.yytext+=l,this.yyleng++,this.offset++,this.match+=l,this.matched+=l;var d=l.match(/(?:\r\n?|\n).*/g);return d?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),l},unput:function(l){var d=l.length,h=l.split(/(?:\r\n?|\n)/g);this._input=l+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-d),this.offset-=d;var f=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var a=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===f.length?this.yylloc.first_column:0)+f[f.length-h.length].length-h[0].length:this.yylloc.first_column-d},this.options.ranges&&(this.yylloc.range=[a[0],a[0]+this.yyleng-d]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(l){this.unput(this.match.slice(l))},pastInput:function(){var l=this.matched.substr(0,this.matched.length-this.match.length);return(l.length>20?"...":"")+l.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var l=this.match;return l.length<20&&(l+=this._input.substr(0,20-l.length)),(l.substr(0,20)+(l.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var l=this.pastInput(),d=new Array(l.length+1).join("-");return l+this.upcomingInput()+`
`+d+"^"},test_match:function(l,d){var h,f,a;if(this.options.backtrack_lexer&&(a={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(a.yylloc.range=this.yylloc.range.slice(0))),f=l[0].match(/(?:\r\n?|\n).*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-f[f.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+l[0].length},this.yytext+=l[0],this.match+=l[0],this.matches=l,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(l[0].length),this.matched+=l[0],h=this.performAction.call(this,this.yy,this,d,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var i in a)this[i]=a[i];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var l,d,h,f;this._more||(this.yytext="",this.match="");for(var a=this._currentRules(),i=0;i<a.length;i++)if(h=this._input.match(this.rules[a[i]]),h&&(!d||h[0].length>d[0].length)){if(d=h,f=i,this.options.backtrack_lexer){if(l=this.test_match(h,a[i]),l!==!1)return l;if(this._backtrack){d=!1;continue}else return!1}else if(!this.options.flex)break}return d?(l=this.test_match(d,a[f]),l!==!1?l:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:c(function(){var d=this.next();return d||this.lex()},"lex"),begin:c(function(d){this.conditionStack.push(d)},"begin"),popState:c(function(){var d=this.conditionStack.length-1;return d>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(d){return d=this.conditionStack.length-1-Math.abs(d||0),d>=0?this.conditionStack[d]:"INITIAL"},"topState"),pushState:c(function(d){this.begin(d)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(d,h,f,a){var i=a;switch(f){case 0:return this.begin("open_directive"),48;break;case 1:return this.begin("type_directive"),49;break;case 2:return this.popState(),this.begin("arg_directive"),41;break;case 3:return this.popState(),this.popState(),51;break;case 4:return 50;case 5:return this.begin("acc_title"),29;break;case 6:return this.popState(),"acc_title_value";break;case 7:return this.begin("acc_descr"),31;break;case 8:return this.popState(),"acc_descr_value";break;case 9:this.begin("acc_descr_multiline");break;case 10:this.popState();break;case 11:return"acc_descr_multiline_value";case 12:break;case 13:break;case 14:break;case 15:return 11;case 16:break;case 17:break;case 18:break;case 19:this.begin("href");break;case 20:this.popState();break;case 21:return 46;case 22:this.begin("callbackname");break;case 23:this.popState();break;case 24:this.popState(),this.begin("callbackargs");break;case 25:return 44;case 26:this.popState();break;case 27:return 45;case 28:this.begin("click");break;case 29:this.popState();break;case 30:return 43;case 31:return 5;case 32:return 20;case 33:return 21;case 34:return 22;case 35:return 23;case 36:return 24;case 37:return 26;case 38:return 25;case 39:return 27;case 40:return 13;case 41:return 14;case 42:return 15;case 43:return 16;case 44:return 17;case 45:return 18;case 46:return 19;case 47:return"date";case 48:return 28;case 49:return"accDescription";case 50:return 34;case 51:return 36;case 52:return 37;case 53:return 41;case 54:return 7;case 55:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[10,11],inclusive:!1},acc_descr:{rules:[8],inclusive:!1},acc_title:{rules:[6],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},callbackargs:{rules:[26,27],inclusive:!1},callbackname:{rules:[23,24,25],inclusive:!1},href:{rules:[20,21],inclusive:!1},click:{rules:[29,30],inclusive:!1},INITIAL:{rules:[0,5,7,9,12,13,14,15,16,17,18,19,22,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],inclusive:!0}}};return w}();k.lexer=C;function D(){this.yy={}}return c(D,"Parser"),D.prototype=k,k.Parser=D,new D}();Lt.parser=Lt;var we=Lt;var Ae=ct(Ue(),1),G=ct(Kt(),1),Me=ct(De(),1),Le=ct(Se(),1),Ie=ct(Ce(),1);G.default.extend(Me.default);G.default.extend(Le.default);G.default.extend(Ie.default);var J="",Bt="",Rt,jt="",mt=[],kt=[],Gt={},Xt=[],vt=[],ut="",qt="",Ye=["active","done","crit","milestone"],Ht=[],yt=!1,Ut=!1,Zt="sunday",Ot=0,Ze=c(function(t,o,n){_e.parseDirective(this,t,o,n)},"parseDirective"),Qe=c(function(){Xt=[],vt=[],ut="",Ht=[],bt=0,Nt=void 0,xt=void 0,z=[],J="",Bt="",qt="",Rt=void 0,jt="",mt=[],kt=[],yt=!1,Ut=!1,Ot=0,Gt={},ke(),Zt="sunday"},"clear"),Je=c(function(t){Bt=t},"setAxisFormat"),Ke=c(function(){return Bt},"getAxisFormat"),$e=c(function(t){Rt=t},"setTickInterval"),ti=c(function(){return Rt},"getTickInterval"),ei=c(function(t){jt=t},"setTodayMarker"),ii=c(function(){return jt},"getTodayMarker"),ni=c(function(t){J=t},"setDateFormat"),ri=c(function(){yt=!0},"enableInclusiveEndDates"),si=c(function(){return yt},"endDatesAreInclusive"),ai=c(function(){Ut=!0},"enableTopAxis"),oi=c(function(){return Ut},"topAxisEnabled"),ci=c(function(t){qt=t},"setDisplayMode"),li=c(function(){return qt},"getDisplayMode"),ui=c(function(){return J},"getDateFormat"),di=c(function(t){mt=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),fi=c(function(){return mt},"getIncludes"),hi=c(function(t){kt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),mi=c(function(){return kt},"getExcludes"),ki=c(function(){return Gt},"getLinks"),yi=c(function(t){ut=t,Xt.push(t)},"addSection"),pi=c(function(){return Xt},"getSections"),gi=c(function(){let t=Ee(),o=10,n=0;for(;!t&&n<o;)t=Ee(),n++;return vt=z,vt},"getTasks"),Fe=c(function(t,o,n,e){return e.includes(t.format(o.trim()))?!1:t.isoWeekday()>=6&&n.includes("weekends")||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(t.format(o.trim()))},"isInvalidDate"),bi=c(function(t){Zt=t},"setWeekday"),xi=c(function(){return Zt},"getWeekday"),We=c(function(t,o,n,e){if(!n.length||t.manualEndTime)return;let r;t.startTime instanceof Date?r=(0,G.default)(t.startTime):r=(0,G.default)(t.startTime,o,!0),r=r.add(1,"d");let u;t.endTime instanceof Date?u=(0,G.default)(t.endTime):u=(0,G.default)(t.endTime,o,!0);let[m,x]=vi(r,u,o,n,e);t.endTime=m.toDate(),t.renderEndTime=x},"checkTaskDates"),vi=c(function(t,o,n,e,r){let u=!1,m=null;for(;t<=o;)u||(m=o.toDate()),u=Fe(t,n,e,r),u&&(o=o.add(1,"d")),t=t.add(1,"d");return[o,m]},"fixTaskDates"),Pt=c(function(t,o,n){n=n.trim();let r=/^after\s+([\d\w- ]+)/.exec(n.trim());if(r!==null){let m=null;if(r[1].split(" ").forEach(function(x){let M=dt(x);M!==void 0&&(m?M.endTime>m.endTime&&(m=M):m=M)}),m)return m.endTime;{let x=new Date;return x.setHours(0,0,0,0),x}}let u=(0,G.default)(n,o.trim(),!0);if(u.isValid())return u.toDate();{ft.debug("Invalid date:"+n),ft.debug("With date format:"+o.trim());let m=new Date(n);if(m===void 0||isNaN(m.getTime())||m.getFullYear()<-1e4||m.getFullYear()>1e4)throw new Error("Invalid date:"+n);return m}},"getStartDate"),ze=c(function(t){let o=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return o!==null?[Number.parseFloat(o[1]),o[2]]:[NaN,"ms"]},"parseDuration"),Ve=c(function(t,o,n,e=!1){n=n.trim();let r=(0,G.default)(n,o.trim(),!0);if(r.isValid())return e&&(r=r.add(1,"d")),r.toDate();let u=(0,G.default)(t),[m,x]=ze(n);if(!Number.isNaN(m)){let M=u.add(m,x);M.isValid()&&(u=M)}return u.toDate()},"getEndDate"),bt=0,lt=c(function(t){return t===void 0?(bt=bt+1,"task"+bt):t},"parseId"),Ti=c(function(t,o){let n;o.substr(0,1)===":"?n=o.substr(1,o.length):n=o;let e=n.split(","),r={};Re(e,r,Ye);for(let m=0;m<e.length;m++)e[m]=e[m].trim();let u="";switch(e.length){case 1:r.id=lt(),r.startTime=t.endTime,u=e[0];break;case 2:r.id=lt(),r.startTime=Pt(void 0,J,e[0]),u=e[1];break;case 3:r.id=lt(e[0]),r.startTime=Pt(void 0,J,e[1]),u=e[2];break;default:}return u&&(r.endTime=Ve(r.startTime,J,u,yt),r.manualEndTime=(0,G.default)(u,"YYYY-MM-DD",!0).isValid(),We(r,J,kt,mt)),r},"compileData"),_i=c(function(t,o){let n;o.substr(0,1)===":"?n=o.substr(1,o.length):n=o;let e=n.split(","),r={};Re(e,r,Ye);for(let u=0;u<e.length;u++)e[u]=e[u].trim();switch(e.length){case 1:r.id=lt(),r.startTime={type:"prevTaskEnd",id:t},r.endTime={data:e[0]};break;case 2:r.id=lt(),r.startTime={type:"getStartDate",startData:e[0]},r.endTime={data:e[1]};break;case 3:r.id=lt(e[0]),r.startTime={type:"getStartDate",startData:e[1]},r.endTime={data:e[2]};break;default:}return r},"parseData"),Nt,xt,z=[],Oe={},wi=c(function(t,o){let n={section:ut,type:ut,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:o},task:t,classes:[]},e=_i(xt,o);n.raw.startTime=e.startTime,n.raw.endTime=e.endTime,n.id=e.id,n.prevTaskId=xt,n.active=e.active,n.done=e.done,n.crit=e.crit,n.milestone=e.milestone,n.order=Ot,Ot++;let r=z.push(n);xt=n.id,Oe[n.id]=r-1},"addTask"),dt=c(function(t){let o=Oe[t];return z[o]},"findTaskById"),Di=c(function(t,o){let n={section:ut,type:ut,description:t,task:t,classes:[]},e=Ti(Nt,o);n.startTime=e.startTime,n.endTime=e.endTime,n.id=e.id,n.active=e.active,n.done=e.done,n.crit=e.crit,n.milestone=e.milestone,Nt=n,vt.push(n)},"addTaskOrg"),Ee=c(function(){let t=c(function(n){let e=z[n],r="";switch(z[n].raw.startTime.type){case"prevTaskEnd":{let u=dt(e.prevTaskId);e.startTime=u.endTime;break}case"getStartDate":r=Pt(void 0,J,z[n].raw.startTime.startData),r&&(z[n].startTime=r);break}return z[n].startTime&&(z[n].endTime=Ve(z[n].startTime,J,z[n].raw.endTime.data,yt),z[n].endTime&&(z[n].processed=!0,z[n].manualEndTime=(0,G.default)(z[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),We(z[n],J,kt,mt))),z[n].processed},"compileTask"),o=!0;for(let[n,e]of z.entries())t(n),o=o&&e.processed;return o},"compileTasks"),Si=c(function(t,o){let n=o;et().securityLevel!=="loose"&&(n=(0,Ae.sanitizeUrl)(o)),t.split(",").forEach(function(e){dt(e)!==void 0&&(Ne(e,()=>{window.open(n,"_self")}),Gt[e]=n)}),Pe(t,"clickable")},"setLink"),Pe=c(function(t,o){t.split(",").forEach(function(n){let e=dt(n);e!==void 0&&e.classes.push(o)})},"setClass"),Ci=c(function(t,o,n){if(et().securityLevel!=="loose"||o===void 0)return;let e=[];if(typeof n=="string"){e=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let u=0;u<e.length;u++){let m=e[u].trim();m.charAt(0)==='"'&&m.charAt(m.length-1)==='"'&&(m=m.substr(1,m.length-2)),e[u]=m}}e.length===0&&e.push(t),dt(t)!==void 0&&Ne(t,()=>{Te.runFunc(o,...e)})},"setClickFun"),Ne=c(function(t,o){Ht.push(function(){let n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){o()})},function(){let n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){o()})})},"pushFun"),Ei=c(function(t,o,n){t.split(",").forEach(function(e){Ci(e,o,n)}),Pe(t,"clickable")},"setClickEvent"),Ai=c(function(t){Ht.forEach(function(o){o(t)})},"bindFunctions"),Be={parseDirective:Ze,getConfig:()=>et().gantt,clear:Qe,setDateFormat:ni,getDateFormat:ui,enableInclusiveEndDates:ri,endDatesAreInclusive:si,enableTopAxis:ai,topAxisEnabled:oi,setAxisFormat:Je,getAxisFormat:Ke,setTickInterval:$e,getTickInterval:ti,setTodayMarker:ei,getTodayMarker:ii,setAccTitle:ye,getAccTitle:pe,setDiagramTitle:xe,getDiagramTitle:ve,setDisplayMode:ci,getDisplayMode:li,setAccDescription:ge,getAccDescription:be,addSection:yi,getSections:pi,getTasks:gi,addTask:wi,findTaskById:dt,addTaskOrg:Di,setIncludes:di,getIncludes:fi,setExcludes:hi,getExcludes:mi,setClickEvent:Ei,setLink:Si,getLinks:ki,bindFunctions:Ai,parseDuration:ze,isInvalidDate:Fe,setWeekday:bi,getWeekday:xi};function Re(t,o,n){let e=!0;for(;e;)e=!1,n.forEach(function(r){let u="^\\s*"+r+"\\s*$",m=new RegExp(u);t[0].match(m)&&(o[r]=!0,t.shift(1),e=!0)})}c(Re,"getTaskTags");var Ge=ct(Kt(),1);var Mi=c(function(){ft.debug("Something is calling, setConf, remove the call")},"setConf"),je={monday:ae,tuesday:oe,wednesday:ce,thursday:le,friday:ue,saturday:de,sunday:se},Li=c((t,o)=>{let n=[...t].map(()=>-1/0),e=[...t].sort((u,m)=>u.startTime-m.startTime||u.order-m.order),r=0;for(let u of e)for(let m=0;m<n.length;m++)if(u.startTime>=n[m]){n[m]=u.endTime,u.order=m+o,m>r&&(r=m);break}return r},"getMaxIntersections"),$,Ii=c(function(t,o,n,e){let r=et().gantt,u=et().securityLevel,m;u==="sandbox"&&(m=ht("#i"+o));let x=u==="sandbox"?ht(m.nodes()[0].contentDocument.body):ht("body"),M=u==="sandbox"?m.nodes()[0].contentDocument:document,Y=M.getElementById(o);$=Y.parentElement.offsetWidth,$===void 0&&($=1200),r.useWidth!==void 0&&($=r.useWidth);let F=e.db.getTasks(),V=[];for(let y of F)V.push(y.type);V=q(V);let U={},g=2*r.topPadding;if(e.db.getDisplayMode()==="compact"||r.displayMode==="compact"){let y={};for(let b of F)y[b.section]===void 0?y[b.section]=[b]:y[b.section].push(b);let T=0;for(let b of Object.keys(y)){let v=Li(y[b],T)+1;T+=v,g+=v*(r.barHeight+r.barGap),U[b]=v}}else{g+=F.length*(r.barHeight+r.barGap);for(let y of V)U[y]=F.filter(T=>T.type===y).length}Y.setAttribute("viewBox","0 0 "+$+" "+g);let _=x.select(`[id="${o}"]`),p=fe().domain([te(F,function(y){return y.startTime}),$t(F,function(y){return y.endTime})]).rangeRound([0,$-r.leftPadding-r.rightPadding]);function L(y,T){let b=y.startTime,v=T.startTime,k=0;return b>v?k=1:b<v&&(k=-1),k}c(L,"taskCompare"),F.sort(L),P(F,$,g),me(_,g,$,r.useMaxWidth),_.append("text").text(e.db.getDiagramTitle()).attr("x",$/2).attr("y",r.titleTopMargin).attr("class","titleText");function P(y,T,b){let v=r.barHeight,k=v+r.barGap,C=r.topPadding,D=r.leftPadding,w=re().domain([0,V.length]).range(["#00B9FA","#F95002"]).interpolate(ne);Q(k,C,D,T,b,y,e.db.getExcludes(),e.db.getIncludes()),X(D,C,T,b),N(y,k,C,D,v,w,T,b),B(k,C,D,v,w),R(D,C,T,b)}c(P,"makeGant");function N(y,T,b,v,k,C,D){let l=[...new Set(y.map(a=>a.order))].map(a=>y.find(i=>i.order===a));_.append("g").selectAll("rect").data(l).enter().append("rect").attr("x",0).attr("y",function(a,i){return i=a.order,i*T+b-2}).attr("width",function(){return D-r.rightPadding/2}).attr("height",T).attr("class",function(a){for(let[i,E]of V.entries())if(a.type===E)return"section section"+i%r.numberSectionStyles;return"section section0"});let d=_.append("g").selectAll("rect").data(y).enter(),h=e.db.getLinks();if(d.append("rect").attr("id",function(a){return a.id}).attr("rx",3).attr("ry",3).attr("x",function(a){return a.milestone?p(a.startTime)+v+.5*(p(a.endTime)-p(a.startTime))-.5*k:p(a.startTime)+v}).attr("y",function(a,i){return i=a.order,i*T+b}).attr("width",function(a){return a.milestone?k:p(a.renderEndTime||a.endTime)-p(a.startTime)}).attr("height",k).attr("transform-origin",function(a,i){return i=a.order,(p(a.startTime)+v+.5*(p(a.endTime)-p(a.startTime))).toString()+"px "+(i*T+b+.5*k).toString()+"px"}).attr("class",function(a){let i="task",E="";a.classes.length>0&&(E=a.classes.join(" "));let s=0;for(let[W,A]of V.entries())a.type===A&&(s=W%r.numberSectionStyles);let S="";return a.active?a.crit?S+=" activeCrit":S=" active":a.done?a.crit?S=" doneCrit":S=" done":a.crit&&(S+=" crit"),S.length===0&&(S=" task"),a.milestone&&(S=" milestone "+S),S+=s,S+=" "+E,i+S}),d.append("text").attr("id",function(a){return a.id+"-text"}).text(function(a){return a.task}).attr("font-size",r.fontSize).attr("x",function(a){let i=p(a.startTime),E=p(a.renderEndTime||a.endTime);a.milestone&&(i+=.5*(p(a.endTime)-p(a.startTime))-.5*k),a.milestone&&(E=i+k);let s=this.getBBox().width;return s>E-i?E+s+1.5*r.leftPadding>D?i+v-5:E+v+5:(E-i)/2+i+v}).attr("y",function(a,i){return i=a.order,i*T+r.barHeight/2+(r.fontSize/2-2)+b}).attr("text-height",k).attr("class",function(a){let i=p(a.startTime),E=p(a.endTime);a.milestone&&(E=i+k);let s=this.getBBox().width,S="";a.classes.length>0&&(S=a.classes.join(" "));let W=0;for(let[it,tt]of V.entries())a.type===tt&&(W=it%r.numberSectionStyles);let A="";return a.active&&(a.crit?A="activeCritText"+W:A="activeText"+W),a.done?a.crit?A=A+" doneCritText"+W:A=A+" doneText"+W:a.crit&&(A=A+" critText"+W),a.milestone&&(A+=" milestoneText"),s>E-i?E+s+1.5*r.leftPadding>D?S+" taskTextOutsideLeft taskTextOutside"+W+" "+A:S+" taskTextOutsideRight taskTextOutside"+W+" "+A+" width-"+s:S+" taskText taskText"+W+" "+A+" width-"+s}),et().securityLevel==="sandbox"){let a;a=ht("#i"+o);let i=a.nodes()[0].contentDocument;d.filter(function(E){return h[E.id]!==void 0}).each(function(E){var s=i.querySelector("#"+E.id),S=i.querySelector("#"+E.id+"-text");let W=s.parentNode;var A=i.createElement("a");A.setAttribute("xlink:href",h[E.id]),A.setAttribute("target","_top"),W.appendChild(A),A.appendChild(s),A.appendChild(S)})}}c(N,"drawRects");function Q(y,T,b,v,k,C,D,w){let l=C.reduce((s,{startTime:S})=>s?Math.min(s,S):S,0),d=C.reduce((s,{endTime:S})=>s?Math.max(s,S):S,0),h=e.db.getDateFormat();if(!l||!d)return;let f=[],a=null,i=(0,Ge.default)(l);for(;i.valueOf()<=d;)e.db.isInvalidDate(i,h,D,w)?a?a.end=i:a={start:i,end:i}:a&&(f.push(a),a=null),i=i.add(1,"d");_.append("g").selectAll("rect").data(f).enter().append("rect").attr("id",function(s){return"exclude-"+s.start.format("YYYY-MM-DD")}).attr("x",function(s){return p(s.start)+b}).attr("y",r.gridLineStartPadding).attr("width",function(s){let S=s.end.add(1,"day");return p(S)-p(s.start)}).attr("height",k-T-r.gridLineStartPadding).attr("transform-origin",function(s,S){return(p(s.start)+b+.5*(p(s.end)-p(s.start))).toString()+"px "+(S*y+.5*k).toString()+"px"}).attr("class","exclude-range")}c(Q,"drawExcludeDays");function X(y,T,b,v){let k=ie(p).tickSize(-v+T+r.gridLineStartPadding).tickFormat(Mt(e.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d")),D=/^([1-9]\d*)(minute|hour|day|week|month)$/.exec(e.db.getTickInterval()||r.tickInterval);if(D!==null){let w=D[1],l=D[2],d=e.db.getWeekday()||r.weekday;switch(l){case"minute":k.ticks(St.every(w));break;case"hour":k.ticks(Ct.every(w));break;case"day":k.ticks(Et.every(w));break;case"week":k.ticks(je[d].every(w));break;case"month":k.ticks(At.every(w));break}}if(_.append("g").attr("class","grid").attr("transform","translate("+y+", "+(v-50)+")").call(k).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),e.db.topAxisEnabled()||r.topAxis){let w=ee(p).tickSize(-v+T+r.gridLineStartPadding).tickFormat(Mt(e.db.getAxisFormat()||r.axisFormat||"%Y-%m-%d"));if(D!==null){let l=D[1],d=D[2],h=e.db.getWeekday()||r.weekday;switch(d){case"minute":w.ticks(St.every(l));break;case"hour":w.ticks(Ct.every(l));break;case"day":w.ticks(Et.every(l));break;case"week":w.ticks(je[h].every(l));break;case"month":w.ticks(At.every(l));break}}_.append("g").attr("class","grid").attr("transform","translate("+y+", "+T+")").call(w).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(X,"makeGrid");function B(y,T){let b=0,v=Object.keys(U).map(k=>[k,U[k]]);_.append("g").selectAll("text").data(v).enter().append(function(k){let C=k[0].split(he.lineBreakRegex),D=-(C.length-1)/2,w=M.createElementNS("http://www.w3.org/2000/svg","text");w.setAttribute("dy",D+"em");for(let[l,d]of C.entries()){let h=M.createElementNS("http://www.w3.org/2000/svg","tspan");h.setAttribute("alignment-baseline","central"),h.setAttribute("x","10"),l>0&&h.setAttribute("dy","1em"),h.textContent=d,w.appendChild(h)}return w}).attr("x",10).attr("y",function(k,C){if(C>0)for(let D=0;D<C;D++)return b+=v[C-1][1],k[1]*y/2+b*y+T;else return k[1]*y/2+T}).attr("font-size",r.sectionFontSize).attr("class",function(k){for(let[C,D]of V.entries())if(k[0]===D)return"sectionTitle sectionTitle"+C%r.numberSectionStyles;return"sectionTitle"})}c(B,"vertLabels");function R(y,T,b,v){let k=e.db.getTodayMarker();if(k==="off")return;let C=_.append("g").attr("class","today"),D=new Date,w=C.append("line");w.attr("x1",p(D)+y).attr("x2",p(D)+y).attr("y1",r.titleTopMargin).attr("y2",v-r.titleTopMargin).attr("class","today"),k!==""&&w.attr("style",k.replace(/,/g,";"))}c(R,"drawToday");function q(y){let T={},b=[];for(let v=0,k=y.length;v<k;++v)Object.prototype.hasOwnProperty.call(T,y[v])||(T[y[v]]=!0,b.push(y[v]));return b}c(q,"checkUnique")},"draw"),Xe={setConf:Mi,draw:Ii};var Yi=c(t=>`
  .mermaid-main-font {
    font-family: "trebuchet ms", verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
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
    // font-size: ${t.ganttFontSize};
    // text-height: 14px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
    text {
      font-family: ${t.fontFamily};
      fill: ${t.textColor};
    }
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
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }

  // .taskText:not([font-size]) {
  //   font-size: ${t.ganttFontSize};
  // }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    // font-size: ${t.ganttFontSize};
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);

  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
    // font-size: ${t.ganttFontSize};
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
    fill: ${t.textColor}    ;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
  }
`,"getStyles"),qe=Yi;var on={parser:we,db:Be,renderer:Xe,styles:qe};export{on as diagram};
