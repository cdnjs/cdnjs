"use strict";
import{s as ie}from"./chunk-W3YBFA2J.mjs";import"./chunk-YJU3MKRE.mjs";import{L as ee,a as xe}from"./chunk-QJ3EQYPD.mjs";import{a as Gt}from"./chunk-JGEKJJ2K.mjs";import{a as Jt,b as Kt,c as Qt,d as Zt,e as Ht,f as $t,g as te}from"./chunk-K4VM4JX7.mjs";import{V as jt,a as Bt,b as Z,d as Yt,e as Rt,f as Nt,g as Wt,ga as N,h as H,j as Xt,m as qt,n as bt,o as xt,p as vt,q as Tt,r as _t,s as wt,t as Ut}from"./chunk-IVQLRXYF.mjs";import{c as o,g as yt}from"./chunk-AXW634CS.mjs";var Ct=function(){var t=o(function(z,d,a,l){for(a=a||{},l=z.length;l--;a[z[l]]=d);return a},"o"),f=[1,3],r=[1,5],i=[7,9,11,12,13,14,15,16,17,18,19,20,21,23,25,26,28,35,40],s=[1,15],m=[1,16],k=[1,17],O=[1,18],F=[1,19],J=[1,20],P=[1,21],X=[1,22],I=[1,23],_=[1,24],E=[1,25],it=[1,26],nt=[1,27],rt=[1,29],st=[1,31],at=[1,34],ct=[5,7,9,11,12,13,14,15,16,17,18,19,20,21,23,25,26,28,35,40],K={trace:o(function(){},"trace"),yy:{},symbols_:{error:2,start:3,directive:4,gantt:5,document:6,EOF:7,line:8,SPACE:9,statement:10,NL:11,dateFormat:12,inclusiveEndDates:13,topAxis:14,axisFormat:15,tickInterval:16,excludes:17,includes:18,todayMarker:19,title:20,acc_title:21,acc_title_value:22,acc_descr:23,acc_descr_value:24,acc_descr_multiline_value:25,section:26,clickStatement:27,taskTxt:28,taskData:29,openDirective:30,typeDirective:31,closeDirective:32,":":33,argDirective:34,click:35,callbackname:36,callbackargs:37,href:38,clickStatementDebug:39,open_directive:40,type_directive:41,arg_directive:42,close_directive:43,$accept:0,$end:1},terminals_:{2:"error",5:"gantt",7:"EOF",9:"SPACE",11:"NL",12:"dateFormat",13:"inclusiveEndDates",14:"topAxis",15:"axisFormat",16:"tickInterval",17:"excludes",18:"includes",19:"todayMarker",20:"title",21:"acc_title",22:"acc_title_value",23:"acc_descr",24:"acc_descr_value",25:"acc_descr_multiline_value",26:"section",28:"taskTxt",29:"taskData",33:":",35:"click",36:"callbackname",37:"callbackargs",38:"href",40:"open_directive",41:"type_directive",42:"arg_directive",43:"close_directive"},productions_:[0,[3,2],[3,3],[6,0],[6,2],[8,2],[8,1],[8,1],[8,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,2],[10,2],[10,1],[10,1],[10,1],[10,2],[10,1],[4,4],[4,6],[27,2],[27,3],[27,3],[27,4],[27,3],[27,4],[27,2],[39,2],[39,3],[39,3],[39,4],[39,3],[39,4],[39,2],[30,1],[31,1],[34,1],[32,1]],performAction:o(function(d,a,l,c,h,e,v){var n=e.length-1;switch(h){case 2:return e[n-1];case 3:this.$=[];break;case 4:e[n-1].push(e[n]),this.$=e[n-1];break;case 5:case 6:this.$=e[n];break;case 7:case 8:this.$=[];break;case 9:c.setDateFormat(e[n].substr(11)),this.$=e[n].substr(11);break;case 10:c.enableInclusiveEndDates(),this.$=e[n].substr(18);break;case 11:c.TopAxis(),this.$=e[n].substr(8);break;case 12:c.setAxisFormat(e[n].substr(11)),this.$=e[n].substr(11);break;case 13:c.setTickInterval(e[n].substr(13)),this.$=e[n].substr(13);break;case 14:c.setExcludes(e[n].substr(9)),this.$=e[n].substr(9);break;case 15:c.setIncludes(e[n].substr(9)),this.$=e[n].substr(9);break;case 16:c.setTodayMarker(e[n].substr(12)),this.$=e[n].substr(12);break;case 17:c.setDiagramTitle(e[n].substr(6)),this.$=e[n].substr(6);break;case 18:this.$=e[n].trim(),c.setAccTitle(this.$);break;case 19:case 20:this.$=e[n].trim(),c.setAccDescription(this.$);break;case 21:c.addSection(e[n].substr(8)),this.$=e[n].substr(8);break;case 23:c.addTask(e[n-1],e[n]),this.$="task";break;case 27:this.$=e[n-1],c.setClickEvent(e[n-1],e[n],null);break;case 28:this.$=e[n-2],c.setClickEvent(e[n-2],e[n-1],e[n]);break;case 29:this.$=e[n-2],c.setClickEvent(e[n-2],e[n-1],null),c.setLink(e[n-2],e[n]);break;case 30:this.$=e[n-3],c.setClickEvent(e[n-3],e[n-2],e[n-1]),c.setLink(e[n-3],e[n]);break;case 31:this.$=e[n-2],c.setClickEvent(e[n-2],e[n],null),c.setLink(e[n-2],e[n-1]);break;case 32:this.$=e[n-3],c.setClickEvent(e[n-3],e[n-1],e[n]),c.setLink(e[n-3],e[n-2]);break;case 33:this.$=e[n-1],c.setLink(e[n-1],e[n]);break;case 34:case 40:this.$=e[n-1]+" "+e[n];break;case 35:case 36:case 38:this.$=e[n-2]+" "+e[n-1]+" "+e[n];break;case 37:case 39:this.$=e[n-3]+" "+e[n-2]+" "+e[n-1]+" "+e[n];break;case 41:c.parseDirective("%%{","open_directive");break;case 42:c.parseDirective(e[n],"type_directive");break;case 43:e[n]=e[n].trim().replace(/'/g,'"'),c.parseDirective(e[n],"arg_directive");break;case 44:c.parseDirective("}%%","close_directive","gantt");break}},"anonymous"),table:[{3:1,4:2,5:f,30:4,40:r},{1:[3]},{3:6,4:2,5:f,30:4,40:r},t(i,[2,3],{6:7}),{31:8,41:[1,9]},{41:[2,41]},{1:[2,1]},{4:30,7:[1,10],8:11,9:[1,12],10:13,11:[1,14],12:s,13:m,14:k,15:O,16:F,17:J,18:P,19:X,20:I,21:_,23:E,25:it,26:nt,27:28,28:rt,30:4,35:st,40:r},{32:32,33:[1,33],43:at},t([33,43],[2,42]),t(i,[2,8],{1:[2,2]}),t(i,[2,4]),{4:30,10:35,12:s,13:m,14:k,15:O,16:F,17:J,18:P,19:X,20:I,21:_,23:E,25:it,26:nt,27:28,28:rt,30:4,35:st,40:r},t(i,[2,6]),t(i,[2,7]),t(i,[2,9]),t(i,[2,10]),t(i,[2,11]),t(i,[2,12]),t(i,[2,13]),t(i,[2,14]),t(i,[2,15]),t(i,[2,16]),t(i,[2,17]),{22:[1,36]},{24:[1,37]},t(i,[2,20]),t(i,[2,21]),t(i,[2,22]),{29:[1,38]},t(i,[2,24]),{36:[1,39],38:[1,40]},{11:[1,41]},{34:42,42:[1,43]},{11:[2,44]},t(i,[2,5]),t(i,[2,18]),t(i,[2,19]),t(i,[2,23]),t(i,[2,27],{37:[1,44],38:[1,45]}),t(i,[2,33],{36:[1,46]}),t(ct,[2,25]),{32:47,43:at},{43:[2,43]},t(i,[2,28],{38:[1,48]}),t(i,[2,29]),t(i,[2,31],{37:[1,49]}),{11:[1,50]},t(i,[2,30]),t(i,[2,32]),t(ct,[2,26])],defaultActions:{5:[2,41],6:[2,1],34:[2,44],43:[2,43]},parseError:o(function(d,a){if(a.recoverable)this.trace(d);else{var l=new Error(d);throw l.hash=a,l}},"parseError"),parse:o(function(d){var a=this,l=[0],c=[],h=[null],e=[],v=this.table,n="",x=0,D=0,B=0,u=2,g=1,T=e.slice.call(arguments,1),p=Object.create(this.lexer),w={yy:{}};for(var y in this.yy)Object.prototype.hasOwnProperty.call(this.yy,y)&&(w.yy[y]=this.yy[y]);p.setInput(d,w.yy),w.yy.lexer=p,w.yy.parser=this,typeof p.yylloc=="undefined"&&(p.yylloc={});var b=p.yylloc;e.push(b);var mt=p.options&&p.options.ranges;typeof w.yy.parseError=="function"?this.parseError=w.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Ot(A){l.length=l.length-2*A,h.length=h.length-A,e.length=e.length-A}o(Ot,"popStack");function be(){var A;return A=c.pop()||p.lex()||g,typeof A!="number"&&(A instanceof Array&&(c=A,A=c.pop()),A=a.symbols_[A]||A),A}o(be,"lex");for(var S,kt,W,L,ei,pt,q={},ot,Y,Pt,lt;;){if(W=l[l.length-1],this.defaultActions[W]?L=this.defaultActions[W]:((S===null||typeof S=="undefined")&&(S=be()),L=v[W]&&v[W][S]),typeof L=="undefined"||!L.length||!L[0]){var gt="";lt=[];for(ot in v[W])this.terminals_[ot]&&ot>u&&lt.push("'"+this.terminals_[ot]+"'");p.showPosition?gt="Parse error on line "+(x+1)+`:
`+p.showPosition()+`
Expecting `+lt.join(", ")+", got '"+(this.terminals_[S]||S)+"'":gt="Parse error on line "+(x+1)+": Unexpected "+(S==g?"end of input":"'"+(this.terminals_[S]||S)+"'"),this.parseError(gt,{text:p.match,token:this.terminals_[S]||S,line:p.yylineno,loc:b,expected:lt})}if(L[0]instanceof Array&&L.length>1)throw new Error("Parse Error: multiple actions possible at state: "+W+", token: "+S);switch(L[0]){case 1:l.push(S),h.push(p.yytext),e.push(p.yylloc),l.push(L[1]),S=null,kt?(S=kt,kt=null):(D=p.yyleng,n=p.yytext,x=p.yylineno,b=p.yylloc,B>0&&B--);break;case 2:if(Y=this.productions_[L[1]][1],q.$=h[h.length-Y],q._$={first_line:e[e.length-(Y||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(Y||1)].first_column,last_column:e[e.length-1].last_column},mt&&(q._$.range=[e[e.length-(Y||1)].range[0],e[e.length-1].range[1]]),pt=this.performAction.apply(q,[n,D,x,w.yy,L[1],h,e].concat(T)),typeof pt!="undefined")return pt;Y&&(l=l.slice(0,-1*Y*2),h=h.slice(0,-1*Y),e=e.slice(0,-1*Y)),l.push(this.productions_[L[1]][0]),h.push(q.$),e.push(q._$),Pt=v[l[l.length-2]][l[l.length-1]],l.push(Pt);break;case 3:return!0}}return!0},"parse")},ht=function(){var z={EOF:1,parseError:o(function(a,l){if(this.yy.parser)this.yy.parser.parseError(a,l);else throw new Error(a)},"parseError"),setInput:function(d,a){return this.yy=a||this.yy||{},this._input=d,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var d=this._input[0];this.yytext+=d,this.yyleng++,this.offset++,this.match+=d,this.matched+=d;var a=d.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),d},unput:function(d){var a=d.length,l=d.split(/(?:\r\n?|\n)/g);this._input=d+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var c=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),l.length-1&&(this.yylineno-=l.length-1);var h=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:l?(l.length===c.length?this.yylloc.first_column:0)+c[c.length-l.length].length-l[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[h[0],h[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(d){this.unput(this.match.slice(d))},pastInput:function(){var d=this.matched.substr(0,this.matched.length-this.match.length);return(d.length>20?"...":"")+d.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var d=this.match;return d.length<20&&(d+=this._input.substr(0,20-d.length)),(d.substr(0,20)+(d.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var d=this.pastInput(),a=new Array(d.length+1).join("-");return d+this.upcomingInput()+`
`+a+"^"},test_match:function(d,a){var l,c,h;if(this.options.backtrack_lexer&&(h={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(h.yylloc.range=this.yylloc.range.slice(0))),c=d[0].match(/(?:\r\n?|\n).*/g),c&&(this.yylineno+=c.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:c?c[c.length-1].length-c[c.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+d[0].length},this.yytext+=d[0],this.match+=d[0],this.matches=d,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(d[0].length),this.matched+=d[0],l=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),l)return l;if(this._backtrack){for(var e in h)this[e]=h[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var d,a,l,c;this._more||(this.yytext="",this.match="");for(var h=this._currentRules(),e=0;e<h.length;e++)if(l=this._input.match(this.rules[h[e]]),l&&(!a||l[0].length>a[0].length)){if(a=l,c=e,this.options.backtrack_lexer){if(d=this.test_match(l,h[e]),d!==!1)return d;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(d=this.test_match(a,h[c]),d!==!1?d:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:o(function(){var a=this.next();return a||this.lex()},"lex"),begin:o(function(a){this.conditionStack.push(a)},"begin"),popState:o(function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:o(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:o(function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:o(function(a){this.begin(a)},"pushState"),stateStackSize:o(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:o(function(a,l,c,h){var e=h;switch(c){case 0:return this.begin("open_directive"),40;break;case 1:return this.begin("type_directive"),41;break;case 2:return this.popState(),this.begin("arg_directive"),33;break;case 3:return this.popState(),this.popState(),43;break;case 4:return 42;case 5:return this.begin("acc_title"),21;break;case 6:return this.popState(),"acc_title_value";break;case 7:return this.begin("acc_descr"),23;break;case 8:return this.popState(),"acc_descr_value";break;case 9:this.begin("acc_descr_multiline");break;case 10:this.popState();break;case 11:return"acc_descr_multiline_value";case 12:break;case 13:break;case 14:break;case 15:return 11;case 16:break;case 17:break;case 18:break;case 19:this.begin("href");break;case 20:this.popState();break;case 21:return 38;case 22:this.begin("callbackname");break;case 23:this.popState();break;case 24:this.popState(),this.begin("callbackargs");break;case 25:return 36;case 26:this.popState();break;case 27:return 37;case 28:this.begin("click");break;case 29:this.popState();break;case 30:return 35;case 31:return 5;case 32:return 12;case 33:return 13;case 34:return 14;case 35:return 15;case 36:return 16;case 37:return 18;case 38:return 17;case 39:return 19;case 40:return"date";case 41:return 20;case 42:return"accDescription";case 43:return 26;case 44:return 28;case 45:return 29;case 46:return 33;case 47:return 7;case 48:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[10,11],inclusive:!1},acc_descr:{rules:[8],inclusive:!1},acc_title:{rules:[6],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},callbackargs:{rules:[26,27],inclusive:!1},callbackname:{rules:[23,24,25],inclusive:!1},href:{rules:[20,21],inclusive:!1},click:{rules:[29,30],inclusive:!1},INITIAL:{rules:[0,5,7,9,12,13,14,15,16,17,18,19,22,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],inclusive:!0}}};return z}();K.lexer=ht;function Q(){this.yy={}}return o(Q,"Parser"),Q.prototype=K,K.Parser=Q,new Q}();Ct.parser=Ct;var ne=Ct;var V=yt(Bt(),1),se=yt(xe(),1);var M="",At="",It,Lt="",$=[],tt=[],Ft={},zt=[],dt=[],j="",ae=["active","done","crit","milestone"],Mt=[],et=!1,Vt=!1,Dt=0,ve=o(function(t,f,r){ie.parseDirective(this,t,f,r)},"parseDirective"),Te=o(function(){zt=[],dt=[],j="",Mt=[],ut=0,Et=void 0,ft=void 0,C=[],M="",At="",It=void 0,Lt="",$=[],tt=[],et=!1,Vt=!1,Dt=0,Ft={},Jt()},"clear"),_e=o(function(t){At=t},"setAxisFormat"),we=o(function(){return At},"getAxisFormat"),Ce=o(function(t){It=t},"setTickInterval"),De=o(function(){return It},"getTickInterval"),Se=o(function(t){Lt=t},"setTodayMarker"),Ee=o(function(){return Lt},"getTodayMarker"),Ae=o(function(t){M=t},"setDateFormat"),Ie=o(function(){et=!0},"enableInclusiveEndDates"),Le=o(function(){return et},"endDatesAreInclusive"),Fe=o(function(){Vt=!0},"enableTopAxis"),ze=o(function(){return Vt},"topAxisEnabled"),Me=o(function(){return M},"getDateFormat"),Ve=o(function(t){$=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Oe=o(function(){return $},"getIncludes"),Pe=o(function(t){tt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),Be=o(function(){return tt},"getExcludes"),Ye=o(function(){return Ft},"getLinks"),Re=o(function(t){j=t,zt.push(t)},"addSection"),Ne=o(function(){return zt},"getSections"),We=o(function(){let t=re(),f=10,r=0;for(;!t&&r<f;)t=re(),r++;return dt=C,dt},"getTasks"),ce=o(function(t,f,r,i){return i.includes(t.format(f.trim()))?!1:t.isoWeekday()>=6&&r.includes("weekends")||r.includes(t.format("dddd").toLowerCase())?!0:r.includes(t.format(f.trim()))},"isInvalidDate"),oe=o(function(t,f,r,i){if(!r.length||t.manualEndTime)return;let s=(0,V.default)(t.startTime,f,!0);s.add(1,"d");let m=(0,V.default)(t.endTime,f,!0),k=Xe(s,m,f,r,i);t.endTime=m.toDate(),t.renderEndTime=k},"checkTaskDates"),Xe=o(function(t,f,r,i,s){let m=!1,k=null;for(;t<=f;)m||(k=f.toDate()),m=ce(t,r,i,s),m&&f.add(1,"d"),t.add(1,"d");return k},"fixTaskDates"),St=o(function(t,f,r){r=r.trim();let s=/^after\s+([\d\w- ]+)/.exec(r.trim());if(s!==null){let k=null;if(s[1].split(" ").forEach(function(O){let F=G(O);F!==void 0&&(k?F.endTime>k.endTime&&(k=F):k=F)}),k)return k.endTime;{let O=new Date;return O.setHours(0,0,0,0),O}}let m=(0,V.default)(r,f.trim(),!0);if(m.isValid())return m.toDate();{Z.debug("Invalid date:"+r),Z.debug("With date format:"+f.trim());let k=new Date(r);if(k===void 0||isNaN(k.getTime()))throw new Error("Invalid date:"+r);return k}},"getStartDate"),le=o(function(t){let f=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return f!==null?V.default.duration(Number.parseFloat(f[1]),f[2]):V.default.duration.invalid()},"parseDuration"),ue=o(function(t,f,r,i=!1){r=r.trim();let s=(0,V.default)(r,f.trim(),!0);if(s.isValid())return i&&s.add(1,"d"),s.toDate();let m=(0,V.default)(t),k=le(r);return k.isValid()&&m.add(k),m.toDate()},"getEndDate"),ut=0,U=o(function(t){return t===void 0?(ut=ut+1,"task"+ut):t},"parseId"),qe=o(function(t,f){let r;f.substr(0,1)===":"?r=f.substr(1,f.length):r=f;let i=r.split(","),s={};ke(i,s,ae);for(let k=0;k<i.length;k++)i[k]=i[k].trim();let m="";switch(i.length){case 1:s.id=U(),s.startTime=t.endTime,m=i[0];break;case 2:s.id=U(),s.startTime=St(void 0,M,i[0]),m=i[1];break;case 3:s.id=U(i[0]),s.startTime=St(void 0,M,i[1]),m=i[2];break;default:}return m&&(s.endTime=ue(s.startTime,M,m,et),s.manualEndTime=(0,V.default)(m,"YYYY-MM-DD",!0).isValid(),oe(s,M,tt,$)),s},"compileData"),Ue=o(function(t,f){let r;f.substr(0,1)===":"?r=f.substr(1,f.length):r=f;let i=r.split(","),s={};ke(i,s,ae);for(let m=0;m<i.length;m++)i[m]=i[m].trim();switch(i.length){case 1:s.id=U(),s.startTime={type:"prevTaskEnd",id:t},s.endTime={data:i[0]};break;case 2:s.id=U(),s.startTime={type:"getStartDate",startData:i[0]},s.endTime={data:i[1]};break;case 3:s.id=U(i[0]),s.startTime={type:"getStartDate",startData:i[1]},s.endTime={data:i[2]};break;default:}return s},"parseData"),Et,ft,C=[],fe={},je=o(function(t,f){let r={section:j,type:j,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:f},task:t,classes:[]},i=Ue(ft,f);r.raw.startTime=i.startTime,r.raw.endTime=i.endTime,r.id=i.id,r.prevTaskId=ft,r.active=i.active,r.done=i.done,r.crit=i.crit,r.milestone=i.milestone,r.order=Dt,Dt++;let s=C.push(r);ft=r.id,fe[r.id]=s-1},"addTask"),G=o(function(t){let f=fe[t];return C[f]},"findTaskById"),Ge=o(function(t,f){let r={section:j,type:j,description:t,task:t,classes:[]},i=qe(Et,f);r.startTime=i.startTime,r.endTime=i.endTime,r.id=i.id,r.active=i.active,r.done=i.done,r.crit=i.crit,r.milestone=i.milestone,Et=r,dt.push(r)},"addTaskOrg"),re=o(function(){let t=o(function(r){let i=C[r],s="";switch(C[r].raw.startTime.type){case"prevTaskEnd":{let m=G(i.prevTaskId);i.startTime=m.endTime;break}case"getStartDate":s=St(void 0,M,C[r].raw.startTime.startData),s&&(C[r].startTime=s);break}return C[r].startTime&&(C[r].endTime=ue(C[r].startTime,M,C[r].raw.endTime.data,et),C[r].endTime&&(C[r].processed=!0,C[r].manualEndTime=(0,V.default)(C[r].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),oe(C[r],M,tt,$))),C[r].processed},"compileTask"),f=!0;for(let[r,i]of C.entries())t(r),f=f&&i.processed;return f},"compileTasks"),Je=o(function(t,f){let r=f;N().securityLevel!=="loose"&&(r=(0,se.sanitizeUrl)(f)),t.split(",").forEach(function(i){G(i)!==void 0&&(he(i,()=>{window.open(r,"_self")}),Ft[i]=r)}),de(t,"clickable")},"setLink"),de=o(function(t,f){t.split(",").forEach(function(r){let i=G(r);i!==void 0&&i.classes.push(f)})},"setClass"),Ke=o(function(t,f,r){if(N().securityLevel!=="loose"||f===void 0)return;let i=[];if(typeof r=="string"){i=r.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let m=0;m<i.length;m++){let k=i[m].trim();k.charAt(0)==='"'&&k.charAt(k.length-1)==='"'&&(k=k.substr(1,k.length-2)),i[m]=k}}i.length===0&&i.push(t),G(t)!==void 0&&he(t,()=>{ee.runFunc(f,...i)})},"setClickFun"),he=o(function(t,f){Mt.push(function(){let r=document.querySelector(`[id="${t}"]`);r!==null&&r.addEventListener("click",function(){f()})},function(){let r=document.querySelector(`[id="${t}-text"]`);r!==null&&r.addEventListener("click",function(){f()})})},"pushFun"),Qe=o(function(t,f,r){t.split(",").forEach(function(i){Ke(i,f,r)}),de(t,"clickable")},"setClickEvent"),Ze=o(function(t){Mt.forEach(function(f){f(t)})},"bindFunctions"),me={parseDirective:ve,getConfig:()=>N().gantt,clear:Te,setDateFormat:Ae,getDateFormat:Me,enableInclusiveEndDates:Ie,endDatesAreInclusive:Le,enableTopAxis:Fe,topAxisEnabled:ze,setAxisFormat:_e,getAxisFormat:we,setTickInterval:Ce,getTickInterval:De,setTodayMarker:Se,getTodayMarker:Ee,setAccTitle:Kt,getAccTitle:Qt,setDiagramTitle:$t,getDiagramTitle:te,setAccDescription:Zt,getAccDescription:Ht,addSection:Re,getSections:Ne,getTasks:We,addTask:je,findTaskById:G,addTaskOrg:Ge,setIncludes:Ve,getIncludes:Oe,setExcludes:Pe,getExcludes:Be,setClickEvent:Qe,setLink:Je,getLinks:Ye,bindFunctions:Ze,parseDuration:le,isInvalidDate:ce};function ke(t,f,r){let i=!0;for(;i;)i=!1,r.forEach(function(s){let m="^\\s*"+s+"\\s*$",k=new RegExp(m);t[0].match(k)&&(f[s]=!0,t.shift(1),i=!0)})}o(ke,"getTaskTags");var pe=yt(Bt(),1);var He=o(function(){Z.debug("Something is calling, setConf, remove the call")},"setConf"),R,$e=o(function(t,f,r,i){let s=N().gantt,m=N().securityLevel,k;m==="sandbox"&&(k=H("#i"+f));let O=m==="sandbox"?H(k.nodes()[0].contentDocument.body):H("body"),F=m==="sandbox"?k.nodes()[0].contentDocument:document,J=F.getElementById(f);R=J.parentElement.offsetWidth,R===void 0&&(R=1200),s.useWidth!==void 0&&(R=s.useWidth);let P=i.db.getTasks(),X=P.length*(s.barHeight+s.barGap)+2*s.topPadding;J.setAttribute("viewBox","0 0 "+R+" "+X);let I=O.select(`[id="${f}"]`),_=Ut().domain([Rt(P,function(a){return a.startTime}),Yt(P,function(a){return a.endTime})]).rangeRound([0,R-s.leftPadding-s.rightPadding]),E=[];for(let a of P)E.push(a.type);let it=E;E=Q(E);function nt(a,l){let c=a.startTime,h=l.startTime,e=0;return c>h?e=1:c<h&&(e=-1),e}o(nt,"taskCompare"),P.sort(nt),rt(P,R,X),Gt(I,X,R,s.useMaxWidth),I.append("text").text(i.db.getDiagramTitle()).attr("x",R/2).attr("y",s.titleTopMargin).attr("class","titleText");function rt(a,l,c){let h=s.barHeight,e=h+s.barGap,v=s.topPadding,n=s.leftPadding,x=qt().domain([0,E.length]).range(["#00B9FA","#F95002"]).interpolate(Xt);at(e,v,n,l,c,a,i.db.getExcludes(),i.db.getIncludes()),ct(n,v,l,c),st(a,e,v,n,h,x,l,c),K(e,v,n,h,x),ht(n,v,l,c)}o(rt,"makeGant");function st(a,l,c,h,e,v,n){I.append("g").selectAll("rect").data(a).enter().append("rect").attr("x",0).attr("y",function(u,g){return g=u.order,g*l+c-2}).attr("width",function(){return n-s.rightPadding/2}).attr("height",l).attr("class",function(u){for(let[g,T]of E.entries())if(u.type===T)return"section section"+g%s.numberSectionStyles;return"section section0"});let x=I.append("g").selectAll("rect").data(a).enter(),D=i.db.getLinks();if(x.append("rect").attr("id",function(u){return u.id}).attr("rx",3).attr("ry",3).attr("x",function(u){return u.milestone?_(u.startTime)+h+.5*(_(u.endTime)-_(u.startTime))-.5*e:_(u.startTime)+h}).attr("y",function(u,g){return g=u.order,g*l+c}).attr("width",function(u){return u.milestone?e:_(u.renderEndTime||u.endTime)-_(u.startTime)}).attr("height",e).attr("transform-origin",function(u,g){return g=u.order,(_(u.startTime)+h+.5*(_(u.endTime)-_(u.startTime))).toString()+"px "+(g*l+c+.5*e).toString()+"px"}).attr("class",function(u){let g="task",T="";u.classes.length>0&&(T=u.classes.join(" "));let p=0;for(let[y,b]of E.entries())u.type===b&&(p=y%s.numberSectionStyles);let w="";return u.active?u.crit?w+=" activeCrit":w=" active":u.done?u.crit?w=" doneCrit":w=" done":u.crit&&(w+=" crit"),w.length===0&&(w=" task"),u.milestone&&(w=" milestone "+w),w+=p,w+=" "+T,g+w}),x.append("text").attr("id",function(u){return u.id+"-text"}).text(function(u){return u.task}).attr("font-size",s.fontSize).attr("x",function(u){let g=_(u.startTime),T=_(u.renderEndTime||u.endTime);u.milestone&&(g+=.5*(_(u.endTime)-_(u.startTime))-.5*e),u.milestone&&(T=g+e);let p=this.getBBox().width;return p>T-g?T+p+1.5*s.leftPadding>n?g+h-5:T+h+5:(T-g)/2+g+h}).attr("y",function(u,g){return g=u.order,g*l+s.barHeight/2+(s.fontSize/2-2)+c}).attr("text-height",e).attr("class",function(u){let g=_(u.startTime),T=_(u.endTime);u.milestone&&(T=g+e);let p=this.getBBox().width,w="";u.classes.length>0&&(w=u.classes.join(" "));let y=0;for(let[mt,Ot]of E.entries())u.type===Ot&&(y=mt%s.numberSectionStyles);let b="";return u.active&&(u.crit?b="activeCritText"+y:b="activeText"+y),u.done?u.crit?b=b+" doneCritText"+y:b=b+" doneText"+y:u.crit&&(b=b+" critText"+y),u.milestone&&(b+=" milestoneText"),p>T-g?T+p+1.5*s.leftPadding>n?w+" taskTextOutsideLeft taskTextOutside"+y+" "+b:w+" taskTextOutsideRight taskTextOutside"+y+" "+b+" width-"+p:w+" taskText taskText"+y+" "+b+" width-"+p}),N().securityLevel==="sandbox"){let u;u=H("#i"+f);let g=u.nodes()[0].contentDocument;x.filter(function(T){return D[T.id]!==void 0}).each(function(T){var p=g.querySelector("#"+T.id),w=g.querySelector("#"+T.id+"-text");let y=p.parentNode;var b=g.createElement("a");b.setAttribute("xlink:href",D[T.id]),b.setAttribute("target","_top"),y.appendChild(b),b.appendChild(p),b.appendChild(w)})}}o(st,"drawRects");function at(a,l,c,h,e,v,n,x){let D=v.reduce((y,{startTime:b})=>y?Math.min(y,b):b,0),B=v.reduce((y,{endTime:b})=>y?Math.max(y,b):b,0),u=i.db.getDateFormat();if(!D||!B)return;let g=[],T=null,p=(0,pe.default)(D);for(;p.valueOf()<=B;)i.db.isInvalidDate(p,u,n,x)?T?T.end=p.clone():T={start:p.clone(),end:p.clone()}:T&&(g.push(T),T=null),p.add(1,"d");I.append("g").selectAll("rect").data(g).enter().append("rect").attr("id",function(y){return"exclude-"+y.start.format("YYYY-MM-DD")}).attr("x",function(y){return _(y.start)+c}).attr("y",s.gridLineStartPadding).attr("width",function(y){let b=y.end.clone().add(1,"day");return _(b)-_(y.start)}).attr("height",e-l-s.gridLineStartPadding).attr("transform-origin",function(y,b){return(_(y.start)+c+.5*(_(y.end)-_(y.start))).toString()+"px "+(b*a+.5*e).toString()+"px"}).attr("class","exclude-range")}o(at,"drawExcludeDays");function ct(a,l,c,h){let e=Wt(_).tickSize(-h+l+s.gridLineStartPadding).tickFormat(wt(i.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d")),n=/^([1-9]\d*)(minute|hour|day|week|month)$/.exec(i.db.getTickInterval()||s.tickInterval);if(n!==null){let x=n[1];switch(n[2]){case"minute":e.ticks(bt.every(x));break;case"hour":e.ticks(xt.every(x));break;case"day":e.ticks(vt.every(x));break;case"week":e.ticks(Tt.every(x));break;case"month":e.ticks(_t.every(x));break}}if(I.append("g").attr("class","grid").attr("transform","translate("+a+", "+(h-50)+")").call(e).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),i.db.topAxisEnabled()||s.topAxis){let x=Nt(_).tickSize(-h+l+s.gridLineStartPadding).tickFormat(wt(i.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d"));if(n!==null){let D=n[1];switch(n[2]){case"minute":x.ticks(bt.every(D));break;case"hour":x.ticks(xt.every(D));break;case"day":x.ticks(vt.every(D));break;case"week":x.ticks(Tt.every(D));break;case"month":x.ticks(_t.every(D));break}}I.append("g").attr("class","grid").attr("transform","translate("+a+", "+l+")").call(x).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}o(ct,"makeGrid");function K(a,l){let c=[],h=0;for(let[e,v]of E.entries())c[e]=[v,d(v,it)];I.append("g").selectAll("text").data(c).enter().append(function(e){let v=e[0].split(jt.lineBreakRegex),n=-(v.length-1)/2,x=F.createElementNS("http://www.w3.org/2000/svg","text");x.setAttribute("dy",n+"em");for(let[D,B]of v.entries()){let u=F.createElementNS("http://www.w3.org/2000/svg","tspan");u.setAttribute("alignment-baseline","central"),u.setAttribute("x","10"),D>0&&u.setAttribute("dy","1em"),u.textContent=B,x.appendChild(u)}return x}).attr("x",10).attr("y",function(e,v){if(v>0)for(let n=0;n<v;n++)return h+=c[v-1][1],e[1]*a/2+h*a+l;else return e[1]*a/2+l}).attr("font-size",s.sectionFontSize).attr("font-size",s.sectionFontSize).attr("class",function(e){for(let[v,n]of E.entries())if(e[0]===n)return"sectionTitle sectionTitle"+v%s.numberSectionStyles;return"sectionTitle"})}o(K,"vertLabels");function ht(a,l,c,h){let e=i.db.getTodayMarker();if(e==="off")return;let v=I.append("g").attr("class","today"),n=new Date,x=v.append("line");x.attr("x1",_(n)+a).attr("x2",_(n)+a).attr("y1",s.titleTopMargin).attr("y2",h-s.titleTopMargin).attr("class","today"),e!==""&&x.attr("style",e.replace(/,/g,";"))}o(ht,"drawToday");function Q(a){let l={},c=[];for(let h=0,e=a.length;h<e;++h)Object.prototype.hasOwnProperty.call(l,a[h])||(l[a[h]]=!0,c.push(a[h]));return c}o(Q,"checkUnique");function z(a){let l=a.length,c={};for(;l;)c[a[--l]]=(c[a[l]]||0)+1;return c}o(z,"getCounts");function d(a,l){return z(l)[a]||0}o(d,"getCount")},"draw"),ge={setConf:He,draw:$e};var ti=o(t=>`
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
`,"getStyles"),ye=ti;var wi={parser:ne,db:me,renderer:ge,styles:ye};export{wi as diagram};
