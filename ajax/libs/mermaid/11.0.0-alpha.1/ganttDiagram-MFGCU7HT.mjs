import{d as Gt}from"./chunk-MGPXXO54.mjs";import{x as Ut}from"./chunk-7HHNZHC5.mjs";import{d as Pt,e as Nt,f as Wt,g as Yt,h as Rt,i as qt,j as jt,k as Xt}from"./chunk-LT56AXER.mjs";import"./chunk-6WMSPMWD.mjs";import{a as c,c as Z,p as q,s as Bt}from"./chunk-RKGGAEC6.mjs";var _t=function(){var t=c(function(b,l,u,f){for(u=u||{},f=b.length;f--;u[b[f]]=l);return u},"o"),o=[1,3],n=[1,5],i=[7,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,33,34,36,43,48],a=[1,32],k=[1,33],h=[1,34],L=[1,35],F=[1,36],Q=[1,37],B=[1,38],M=[1,15],j=[1,16],R=[1,17],z=[1,18],_=[1,19],it=[1,20],rt=[1,21],nt=[1,22],st=[1,24],at=[1,25],ct=[1,26],ot=[1,27],lt=[1,28],y=[1,30],T=[1,39],g=[1,42],p=[5,7,9,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,33,34,36,43,48],m={trace:c(function(){},"trace"),yy:{},symbols_:{error:2,start:3,directive:4,gantt:5,document:6,EOF:7,line:8,SPACE:9,statement:10,NL:11,weekday:12,weekday_monday:13,weekday_tuesday:14,weekday_wednesday:15,weekday_thursday:16,weekday_friday:17,weekday_saturday:18,weekday_sunday:19,dateFormat:20,inclusiveEndDates:21,topAxis:22,axisFormat:23,tickInterval:24,excludes:25,includes:26,todayMarker:27,title:28,acc_title:29,acc_title_value:30,acc_descr:31,acc_descr_value:32,acc_descr_multiline_value:33,section:34,clickStatement:35,taskTxt:36,taskData:37,openDirective:38,typeDirective:39,closeDirective:40,":":41,argDirective:42,click:43,callbackname:44,callbackargs:45,href:46,clickStatementDebug:47,open_directive:48,type_directive:49,arg_directive:50,close_directive:51,$accept:0,$end:1},terminals_:{2:"error",5:"gantt",7:"EOF",9:"SPACE",11:"NL",13:"weekday_monday",14:"weekday_tuesday",15:"weekday_wednesday",16:"weekday_thursday",17:"weekday_friday",18:"weekday_saturday",19:"weekday_sunday",20:"dateFormat",21:"inclusiveEndDates",22:"topAxis",23:"axisFormat",24:"tickInterval",25:"excludes",26:"includes",27:"todayMarker",28:"title",29:"acc_title",30:"acc_title_value",31:"acc_descr",32:"acc_descr_value",33:"acc_descr_multiline_value",34:"section",36:"taskTxt",37:"taskData",41:":",43:"click",44:"callbackname",45:"callbackargs",46:"href",48:"open_directive",49:"type_directive",50:"arg_directive",51:"close_directive"},productions_:[0,[3,2],[3,3],[6,0],[6,2],[8,2],[8,1],[8,1],[8,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[12,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,1],[10,2],[10,2],[10,1],[10,1],[10,1],[10,2],[10,1],[4,4],[4,6],[35,2],[35,3],[35,3],[35,4],[35,3],[35,4],[35,2],[47,2],[47,3],[47,3],[47,4],[47,3],[47,4],[47,2],[38,1],[39,1],[42,1],[40,1]],performAction:c(function(l,u,f,d,s,e,w){var r=e.length-1;switch(s){case 2:return e[r-1];case 3:this.$=[];break;case 4:e[r-1].push(e[r]),this.$=e[r-1];break;case 5:case 6:this.$=e[r];break;case 7:case 8:this.$=[];break;case 9:d.setWeekday("monday");break;case 10:d.setWeekday("tuesday");break;case 11:d.setWeekday("wednesday");break;case 12:d.setWeekday("thursday");break;case 13:d.setWeekday("friday");break;case 14:d.setWeekday("saturday");break;case 15:d.setWeekday("sunday");break;case 16:d.setDateFormat(e[r].substr(11)),this.$=e[r].substr(11);break;case 17:d.enableInclusiveEndDates(),this.$=e[r].substr(18);break;case 18:d.TopAxis(),this.$=e[r].substr(8);break;case 19:d.setAxisFormat(e[r].substr(11)),this.$=e[r].substr(11);break;case 20:d.setTickInterval(e[r].substr(13)),this.$=e[r].substr(13);break;case 21:d.setExcludes(e[r].substr(9)),this.$=e[r].substr(9);break;case 22:d.setIncludes(e[r].substr(9)),this.$=e[r].substr(9);break;case 23:d.setTodayMarker(e[r].substr(12)),this.$=e[r].substr(12);break;case 25:d.setDiagramTitle(e[r].substr(6)),this.$=e[r].substr(6);break;case 26:this.$=e[r].trim(),d.setAccTitle(this.$);break;case 27:case 28:this.$=e[r].trim(),d.setAccDescription(this.$);break;case 29:d.addSection(e[r].substr(8)),this.$=e[r].substr(8);break;case 31:d.addTask(e[r-1],e[r]),this.$="task";break;case 35:this.$=e[r-1],d.setClickEvent(e[r-1],e[r],null);break;case 36:this.$=e[r-2],d.setClickEvent(e[r-2],e[r-1],e[r]);break;case 37:this.$=e[r-2],d.setClickEvent(e[r-2],e[r-1],null),d.setLink(e[r-2],e[r]);break;case 38:this.$=e[r-3],d.setClickEvent(e[r-3],e[r-2],e[r-1]),d.setLink(e[r-3],e[r]);break;case 39:this.$=e[r-2],d.setClickEvent(e[r-2],e[r],null),d.setLink(e[r-2],e[r-1]);break;case 40:this.$=e[r-3],d.setClickEvent(e[r-3],e[r-1],e[r]),d.setLink(e[r-3],e[r-2]);break;case 41:this.$=e[r-1],d.setLink(e[r-1],e[r]);break;case 42:case 48:this.$=e[r-1]+" "+e[r];break;case 43:case 44:case 46:this.$=e[r-2]+" "+e[r-1]+" "+e[r];break;case 45:case 47:this.$=e[r-3]+" "+e[r-2]+" "+e[r-1]+" "+e[r];break;case 49:d.parseDirective("%%{","open_directive");break;case 50:d.parseDirective(e[r],"type_directive");break;case 51:e[r]=e[r].trim().replace(/'/g,'"'),d.parseDirective(e[r],"arg_directive");break;case 52:d.parseDirective("}%%","close_directive","gantt");break}},"anonymous"),table:[{3:1,4:2,5:o,38:4,48:n},{1:[3]},{3:6,4:2,5:o,38:4,48:n},t(i,[2,3],{6:7}),{39:8,49:[1,9]},{49:[2,49]},{1:[2,1]},{4:31,7:[1,10],8:11,9:[1,12],10:13,11:[1,14],12:23,13:a,14:k,15:h,16:L,17:F,18:Q,19:B,20:M,21:j,22:R,23:z,24:_,25:it,26:rt,27:nt,28:st,29:at,31:ct,33:ot,34:lt,35:29,36:y,38:4,43:T,48:n},{40:40,41:[1,41],51:g},t([41,51],[2,50]),t(i,[2,8],{1:[2,2]}),t(i,[2,4]),{4:31,10:43,12:23,13:a,14:k,15:h,16:L,17:F,18:Q,19:B,20:M,21:j,22:R,23:z,24:_,25:it,26:rt,27:nt,28:st,29:at,31:ct,33:ot,34:lt,35:29,36:y,38:4,43:T,48:n},t(i,[2,6]),t(i,[2,7]),t(i,[2,16]),t(i,[2,17]),t(i,[2,18]),t(i,[2,19]),t(i,[2,20]),t(i,[2,21]),t(i,[2,22]),t(i,[2,23]),t(i,[2,24]),t(i,[2,25]),{30:[1,44]},{32:[1,45]},t(i,[2,28]),t(i,[2,29]),t(i,[2,30]),{37:[1,46]},t(i,[2,32]),t(i,[2,9]),t(i,[2,10]),t(i,[2,11]),t(i,[2,12]),t(i,[2,13]),t(i,[2,14]),t(i,[2,15]),{44:[1,47],46:[1,48]},{11:[1,49]},{42:50,50:[1,51]},{11:[2,52]},t(i,[2,5]),t(i,[2,26]),t(i,[2,27]),t(i,[2,31]),t(i,[2,35],{45:[1,52],46:[1,53]}),t(i,[2,41],{44:[1,54]}),t(p,[2,33]),{40:55,51:g},{51:[2,51]},t(i,[2,36],{46:[1,56]}),t(i,[2,37]),t(i,[2,39],{45:[1,57]}),{11:[1,58]},t(i,[2,38]),t(i,[2,40]),t(p,[2,34])],defaultActions:{5:[2,49],6:[2,1],42:[2,52],51:[2,51]},parseError:c(function(l,u){if(u.recoverable)this.trace(l);else{var f=new Error(l);throw f.hash=u,f}},"parseError"),parse:c(function(l){var u=this,f=[0],d=[],s=[null],e=[],w=this.table,r="",x=0,A=0,D=0,pt=2,ut=1,ke=e.slice.call(arguments,1),S=Object.create(this.lexer),X={yy:{}};for(var gt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,gt)&&(X.yy[gt]=this.yy[gt]);S.setInput(l,X.yy),X.yy.lexer=S,X.yy.parser=this,typeof S.yylloc>"u"&&(S.yylloc={});var bt=S.yylloc;e.push(bt);var me=S.options&&S.options.ranges;typeof X.yy.parseError=="function"?this.parseError=X.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Ti(V){f.length=f.length-2*V,s.length=s.length-V,e.length=e.length-V}c(Ti,"popStack");function ye(){var V;return V=d.pop()||S.lex()||ut,typeof V!="number"&&(V instanceof Array&&(d=V,V=d.pop()),V=u.symbols_[V]||V),V}c(ye,"lex");for(var I,xt,U,O,vi,Tt,G={},dt,W,Ot,ft;;){if(U=f[f.length-1],this.defaultActions[U]?O=this.defaultActions[U]:((I===null||typeof I>"u")&&(I=ye()),O=w[U]&&w[U][I]),typeof O>"u"||!O.length||!O[0]){var vt="";ft=[];for(dt in w[U])this.terminals_[dt]&&dt>pt&&ft.push("'"+this.terminals_[dt]+"'");S.showPosition?vt="Parse error on line "+(x+1)+`:
`+S.showPosition()+`
Expecting `+ft.join(", ")+", got '"+(this.terminals_[I]||I)+"'":vt="Parse error on line "+(x+1)+": Unexpected "+(I==ut?"end of input":"'"+(this.terminals_[I]||I)+"'"),this.parseError(vt,{text:S.match,token:this.terminals_[I]||I,line:S.yylineno,loc:bt,expected:ft})}if(O[0]instanceof Array&&O.length>1)throw new Error("Parse Error: multiple actions possible at state: "+U+", token: "+I);switch(O[0]){case 1:f.push(I),s.push(S.yytext),e.push(S.yylloc),f.push(O[1]),I=null,xt?(I=xt,xt=null):(A=S.yyleng,r=S.yytext,x=S.yylineno,bt=S.yylloc,D>0&&D--);break;case 2:if(W=this.productions_[O[1]][1],G.$=s[s.length-W],G._$={first_line:e[e.length-(W||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(W||1)].first_column,last_column:e[e.length-1].last_column},me&&(G._$.range=[e[e.length-(W||1)].range[0],e[e.length-1].range[1]]),Tt=this.performAction.apply(G,[r,A,x,X.yy,O[1],s,e].concat(ke)),typeof Tt<"u")return Tt;W&&(f=f.slice(0,-1*W*2),s=s.slice(0,-1*W),e=e.slice(0,-1*W)),f.push(this.productions_[O[1]][0]),s.push(G.$),e.push(G._$),Ot=w[f[f.length-2]][f[f.length-1]],f.push(Ot);break;case 3:return!0}}return!0},"parse")},C=function(){var b={EOF:1,parseError:c(function(u,f){if(this.yy.parser)this.yy.parser.parseError(u,f);else throw new Error(u)},"parseError"),setInput:function(l,u){return this.yy=u||this.yy||{},this._input=l,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var l=this._input[0];this.yytext+=l,this.yyleng++,this.offset++,this.match+=l,this.matched+=l;var u=l.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),l},unput:function(l){var u=l.length,f=l.split(/(?:\r\n?|\n)/g);this._input=l+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),f.length-1&&(this.yylineno-=f.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:f?(f.length===d.length?this.yylloc.first_column:0)+d[d.length-f.length].length-f[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(l){this.unput(this.match.slice(l))},pastInput:function(){var l=this.matched.substr(0,this.matched.length-this.match.length);return(l.length>20?"...":"")+l.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var l=this.match;return l.length<20&&(l+=this._input.substr(0,20-l.length)),(l.substr(0,20)+(l.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var l=this.pastInput(),u=new Array(l.length+1).join("-");return l+this.upcomingInput()+`
`+u+"^"},test_match:function(l,u){var f,d,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),d=l[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+l[0].length},this.yytext+=l[0],this.match+=l[0],this.matches=l,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(l[0].length),this.matched+=l[0],f=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),f)return f;if(this._backtrack){for(var e in s)this[e]=s[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var l,u,f,d;this._more||(this.yytext="",this.match="");for(var s=this._currentRules(),e=0;e<s.length;e++)if(f=this._input.match(this.rules[s[e]]),f&&(!u||f[0].length>u[0].length)){if(u=f,d=e,this.options.backtrack_lexer){if(l=this.test_match(f,s[e]),l!==!1)return l;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(l=this.test_match(u,s[d]),l!==!1?l:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:c(function(){var u=this.next();return u||this.lex()},"lex"),begin:c(function(u){this.conditionStack.push(u)},"begin"),popState:c(function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:c(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:c(function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},"topState"),pushState:c(function(u){this.begin(u)},"pushState"),stateStackSize:c(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:c(function(u,f,d,s){var e=s;switch(d){case 0:return this.begin("open_directive"),48;break;case 1:return this.begin("type_directive"),49;break;case 2:return this.popState(),this.begin("arg_directive"),41;break;case 3:return this.popState(),this.popState(),51;break;case 4:return 50;case 5:return this.begin("acc_title"),29;break;case 6:return this.popState(),"acc_title_value";break;case 7:return this.begin("acc_descr"),31;break;case 8:return this.popState(),"acc_descr_value";break;case 9:this.begin("acc_descr_multiline");break;case 10:this.popState();break;case 11:return"acc_descr_multiline_value";case 12:break;case 13:break;case 14:break;case 15:return 11;case 16:break;case 17:break;case 18:break;case 19:this.begin("href");break;case 20:this.popState();break;case 21:return 46;case 22:this.begin("callbackname");break;case 23:this.popState();break;case 24:this.popState(),this.begin("callbackargs");break;case 25:return 44;case 26:this.popState();break;case 27:return 45;case 28:this.begin("click");break;case 29:this.popState();break;case 30:return 43;case 31:return 5;case 32:return 20;case 33:return 21;case 34:return 22;case 35:return 23;case 36:return 24;case 37:return 26;case 38:return 25;case 39:return 27;case 40:return 13;case 41:return 14;case 42:return 15;case 43:return 16;case 44:return 17;case 45:return 18;case 46:return 19;case 47:return"date";case 48:return 28;case 49:return"accDescription";case 50:return 34;case 51:return 36;case 52:return 37;case 53:return 41;case 54:return 7;case 55:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[10,11],inclusive:!1},acc_descr:{rules:[8],inclusive:!1},acc_title:{rules:[6],inclusive:!1},close_directive:{rules:[],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},open_directive:{rules:[1],inclusive:!1},callbackargs:{rules:[26,27],inclusive:!1},callbackname:{rules:[23,24,25],inclusive:!1},href:{rules:[20,21],inclusive:!1},click:{rules:[29,30],inclusive:!1},INITIAL:{rules:[0,5,7,9,12,13,14,15,16,17,18,19,22,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55],inclusive:!0}}};return b}();m.lexer=C;function v(){this.yy={}}return c(v,"Parser"),v.prototype=m,m.Parser=v,new v}();_t.parser=_t;var Ht=_t;import{sanitizeUrl as pe}from"@braintree/sanitize-url";import P from"dayjs";import ge from"dayjs/plugin/isoWeek.js";import be from"dayjs/plugin/customParseFormat.js";import xe from"dayjs/plugin/advancedFormat.js";P.extend(ge);P.extend(be);P.extend(xe);var N="",Et="",St,At="",$=[],tt=[],It={},Ft=[],mt=[],J="",Lt="",Kt=["active","done","crit","milestone"],Vt=[],et=!1,Mt=!1,zt="sunday",wt=0,Te=c(function(t,o,n){Gt.parseDirective(this,t,o,n)},"parseDirective"),ve=c(function(){Ft=[],mt=[],J="",Vt=[],ht=0,Dt=void 0,kt=void 0,E=[],N="",Et="",Lt="",St=void 0,At="",$=[],tt=[],et=!1,Mt=!1,wt=0,It={},Nt(),zt="sunday"},"clear"),_e=c(function(t){Et=t},"setAxisFormat"),we=c(function(){return Et},"getAxisFormat"),Ce=c(function(t){St=t},"setTickInterval"),De=c(function(){return St},"getTickInterval"),Ee=c(function(t){At=t},"setTodayMarker"),Se=c(function(){return At},"getTodayMarker"),Ae=c(function(t){N=t},"setDateFormat"),Ie=c(function(){et=!0},"enableInclusiveEndDates"),Fe=c(function(){return et},"endDatesAreInclusive"),Le=c(function(){Mt=!0},"enableTopAxis"),Ve=c(function(){return Mt},"topAxisEnabled"),Me=c(function(t){Lt=t},"setDisplayMode"),ze=c(function(){return Lt},"getDisplayMode"),Oe=c(function(){return N},"getDateFormat"),Pe=c(function(t){$=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Be=c(function(){return $},"getIncludes"),Ne=c(function(t){tt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),We=c(function(){return tt},"getExcludes"),Ye=c(function(){return It},"getLinks"),Re=c(function(t){J=t,Ft.push(t)},"addSection"),qe=c(function(){return Ft},"getSections"),je=c(function(){let t=Jt(),o=10,n=0;for(;!t&&n<o;)t=Jt(),n++;return mt=E,mt},"getTasks"),Qt=c(function(t,o,n,i){return i.includes(t.format(o.trim()))?!1:t.isoWeekday()>=6&&n.includes("weekends")||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(t.format(o.trim()))},"isInvalidDate"),Xe=c(function(t){zt=t},"setWeekday"),Ue=c(function(){return zt},"getWeekday"),Zt=c(function(t,o,n,i){if(!n.length||t.manualEndTime)return;let a;t.startTime instanceof Date?a=P(t.startTime):a=P(t.startTime,o,!0),a=a.add(1,"d");let k;t.endTime instanceof Date?k=P(t.endTime):k=P(t.endTime,o,!0);let[h,L]=Ge(a,k,o,n,i);t.endTime=h.toDate(),t.renderEndTime=L},"checkTaskDates"),Ge=c(function(t,o,n,i,a){let k=!1,h=null;for(;t<=o;)k||(h=o.toDate()),k=Qt(t,n,i,a),k&&(o=o.add(1,"d")),t=t.add(1,"d");return[o,h]},"fixTaskDates"),Ct=c(function(t,o,n){n=n.trim();let a=/^after\s+([\d\w- ]+)/.exec(n.trim());if(a!==null){let h=null;if(a[1].split(" ").forEach(function(L){let F=K(L);F!==void 0&&(h?F.endTime>h.endTime&&(h=F):h=F)}),h)return h.endTime;{let L=new Date;return L.setHours(0,0,0,0),L}}let k=P(n,o.trim(),!0);if(k.isValid())return k.toDate();{Z.debug("Invalid date:"+n),Z.debug("With date format:"+o.trim());let h=new Date(n);if(h===void 0||isNaN(h.getTime())||h.getFullYear()<-1e4||h.getFullYear()>1e4)throw new Error("Invalid date:"+n);return h}},"getStartDate"),$t=c(function(t){let o=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return o!==null?[Number.parseFloat(o[1]),o[2]]:[NaN,"ms"]},"parseDuration"),te=c(function(t,o,n,i=!1){n=n.trim();let a=P(n,o.trim(),!0);if(a.isValid())return i&&(a=a.add(1,"d")),a.toDate();let k=P(t),[h,L]=$t(n);if(!Number.isNaN(h)){let F=k.add(h,L);F.isValid()&&(k=F)}return k.toDate()},"getEndDate"),ht=0,H=c(function(t){return t===void 0?(ht=ht+1,"task"+ht):t},"parseId"),He=c(function(t,o){let n;o.substr(0,1)===":"?n=o.substr(1,o.length):n=o;let i=n.split(","),a={};se(i,a,Kt);for(let h=0;h<i.length;h++)i[h]=i[h].trim();let k="";switch(i.length){case 1:a.id=H(),a.startTime=t.endTime,k=i[0];break;case 2:a.id=H(),a.startTime=Ct(void 0,N,i[0]),k=i[1];break;case 3:a.id=H(i[0]),a.startTime=Ct(void 0,N,i[1]),k=i[2];break;default:}return k&&(a.endTime=te(a.startTime,N,k,et),a.manualEndTime=P(k,"YYYY-MM-DD",!0).isValid(),Zt(a,N,tt,$)),a},"compileData"),Je=c(function(t,o){let n;o.substr(0,1)===":"?n=o.substr(1,o.length):n=o;let i=n.split(","),a={};se(i,a,Kt);for(let k=0;k<i.length;k++)i[k]=i[k].trim();switch(i.length){case 1:a.id=H(),a.startTime={type:"prevTaskEnd",id:t},a.endTime={data:i[0]};break;case 2:a.id=H(),a.startTime={type:"getStartDate",startData:i[0]},a.endTime={data:i[1]};break;case 3:a.id=H(i[0]),a.startTime={type:"getStartDate",startData:i[1]},a.endTime={data:i[2]};break;default:}return a},"parseData"),Dt,kt,E=[],ee={},Ke=c(function(t,o){let n={section:J,type:J,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:o},task:t,classes:[]},i=Je(kt,o);n.raw.startTime=i.startTime,n.raw.endTime=i.endTime,n.id=i.id,n.prevTaskId=kt,n.active=i.active,n.done=i.done,n.crit=i.crit,n.milestone=i.milestone,n.order=wt,wt++;let a=E.push(n);kt=n.id,ee[n.id]=a-1},"addTask"),K=c(function(t){let o=ee[t];return E[o]},"findTaskById"),Qe=c(function(t,o){let n={section:J,type:J,description:t,task:t,classes:[]},i=He(Dt,o);n.startTime=i.startTime,n.endTime=i.endTime,n.id=i.id,n.active=i.active,n.done=i.done,n.crit=i.crit,n.milestone=i.milestone,Dt=n,mt.push(n)},"addTaskOrg"),Jt=c(function(){let t=c(function(n){let i=E[n],a="";switch(E[n].raw.startTime.type){case"prevTaskEnd":{let k=K(i.prevTaskId);i.startTime=k.endTime;break}case"getStartDate":a=Ct(void 0,N,E[n].raw.startTime.startData),a&&(E[n].startTime=a);break}return E[n].startTime&&(E[n].endTime=te(E[n].startTime,N,E[n].raw.endTime.data,et),E[n].endTime&&(E[n].processed=!0,E[n].manualEndTime=P(E[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Zt(E[n],N,tt,$))),E[n].processed},"compileTask"),o=!0;for(let[n,i]of E.entries())t(n),o=o&&i.processed;return o},"compileTasks"),Ze=c(function(t,o){let n=o;q().securityLevel!=="loose"&&(n=pe(o)),t.split(",").forEach(function(i){K(i)!==void 0&&(re(i,()=>{window.open(n,"_self")}),It[i]=n)}),ie(t,"clickable")},"setLink"),ie=c(function(t,o){t.split(",").forEach(function(n){let i=K(n);i!==void 0&&i.classes.push(o)})},"setClass"),$e=c(function(t,o,n){if(q().securityLevel!=="loose"||o===void 0)return;let i=[];if(typeof n=="string"){i=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let k=0;k<i.length;k++){let h=i[k].trim();h.charAt(0)==='"'&&h.charAt(h.length-1)==='"'&&(h=h.substr(1,h.length-2)),i[k]=h}}i.length===0&&i.push(t),K(t)!==void 0&&re(t,()=>{Ut.runFunc(o,...i)})},"setClickFun"),re=c(function(t,o){Vt.push(function(){let n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){o()})},function(){let n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){o()})})},"pushFun"),ti=c(function(t,o,n){t.split(",").forEach(function(i){$e(i,o,n)}),ie(t,"clickable")},"setClickEvent"),ei=c(function(t){Vt.forEach(function(o){o(t)})},"bindFunctions"),ne={parseDirective:Te,getConfig:()=>q().gantt,clear:ve,setDateFormat:Ae,getDateFormat:Oe,enableInclusiveEndDates:Ie,endDatesAreInclusive:Fe,enableTopAxis:Le,topAxisEnabled:Ve,setAxisFormat:_e,getAxisFormat:we,setTickInterval:Ce,getTickInterval:De,setTodayMarker:Ee,getTodayMarker:Se,setAccTitle:Wt,getAccTitle:Yt,setDiagramTitle:jt,getDiagramTitle:Xt,setDisplayMode:Me,getDisplayMode:ze,setAccDescription:Rt,getAccDescription:qt,addSection:Re,getSections:qe,getTasks:je,addTask:Ke,findTaskById:K,addTaskOrg:Qe,setIncludes:Pe,getIncludes:Be,setExcludes:Ne,getExcludes:We,setClickEvent:ti,setLink:Ze,getLinks:Ye,bindFunctions:ei,parseDuration:$t,isInvalidDate:Qt,setWeekday:Xe,getWeekday:Ue};function se(t,o,n){let i=!0;for(;i;)i=!1,n.forEach(function(a){let k="^\\s*"+a+"\\s*$",h=new RegExp(k);t[0].match(h)&&(o[a]=!0,t.shift(1),i=!0)})}c(se,"getTaskTags");import ii from"dayjs";import{select as yt,scaleTime as ri,min as ni,max as si,scaleLinear as ai,interpolateHcl as ci,axisBottom as oi,axisTop as li,timeFormat as ae,timeMinute as ce,timeHour as oe,timeDay as le,timeMonday as ui,timeTuesday as di,timeWednesday as fi,timeThursday as hi,timeFriday as ki,timeSaturday as mi,timeSunday as yi,timeMonth as ue}from"d3";var pi=c(function(){Z.debug("Something is calling, setConf, remove the call")},"setConf"),de={monday:ui,tuesday:di,wednesday:fi,thursday:hi,friday:ki,saturday:mi,sunday:yi},gi=c((t,o)=>{let n=[...t].map(()=>-1/0),i=[...t].sort((k,h)=>k.startTime-h.startTime||k.order-h.order),a=0;for(let k of i)for(let h=0;h<n.length;h++)if(k.startTime>=n[h]){n[h]=k.endTime,k.order=h+o,h>a&&(a=h);break}return a},"getMaxIntersections"),Y,bi=c(function(t,o,n,i){let a=q().gantt,k=q().securityLevel,h;k==="sandbox"&&(h=yt("#i"+o));let L=k==="sandbox"?yt(h.nodes()[0].contentDocument.body):yt("body"),F=k==="sandbox"?h.nodes()[0].contentDocument:document,Q=F.getElementById(o);Y=Q.parentElement.offsetWidth,Y===void 0&&(Y=1200),a.useWidth!==void 0&&(Y=a.useWidth);let B=i.db.getTasks(),M=[];for(let y of B)M.push(y.type);M=lt(M);let j={},R=2*a.topPadding;if(i.db.getDisplayMode()==="compact"||a.displayMode==="compact"){let y={};for(let g of B)y[g.section]===void 0?y[g.section]=[g]:y[g.section].push(g);let T=0;for(let g of Object.keys(y)){let p=gi(y[g],T)+1;T+=p,R+=p*(a.barHeight+a.barGap),j[g]=p}}else{R+=B.length*(a.barHeight+a.barGap);for(let y of M)j[y]=B.filter(T=>T.type===y).length}Q.setAttribute("viewBox","0 0 "+Y+" "+R);let z=L.select(`[id="${o}"]`),_=ri().domain([ni(B,function(y){return y.startTime}),si(B,function(y){return y.endTime})]).rangeRound([0,Y-a.leftPadding-a.rightPadding]);function it(y,T){let g=y.startTime,p=T.startTime,m=0;return g>p?m=1:g<p&&(m=-1),m}c(it,"taskCompare"),B.sort(it),rt(B,Y,R),Bt(z,R,Y,a.useMaxWidth),z.append("text").text(i.db.getDiagramTitle()).attr("x",Y/2).attr("y",a.titleTopMargin).attr("class","titleText");function rt(y,T,g){let p=a.barHeight,m=p+a.barGap,C=a.topPadding,v=a.leftPadding,b=ai().domain([0,M.length]).range(["#00B9FA","#F95002"]).interpolate(ci);st(m,C,v,T,g,y,i.db.getExcludes(),i.db.getIncludes()),at(v,C,T,g),nt(y,m,C,v,p,b,T,g),ct(m,C,v,p,b),ot(v,C,T,g)}c(rt,"makeGant");function nt(y,T,g,p,m,C,v){let l=[...new Set(y.map(s=>s.order))].map(s=>y.find(e=>e.order===s));z.append("g").selectAll("rect").data(l).enter().append("rect").attr("x",0).attr("y",function(s,e){return e=s.order,e*T+g-2}).attr("width",function(){return v-a.rightPadding/2}).attr("height",T).attr("class",function(s){for(let[e,w]of M.entries())if(s.type===w)return"section section"+e%a.numberSectionStyles;return"section section0"});let u=z.append("g").selectAll("rect").data(y).enter(),f=i.db.getLinks();if(u.append("rect").attr("id",function(s){return s.id}).attr("rx",3).attr("ry",3).attr("x",function(s){return s.milestone?_(s.startTime)+p+.5*(_(s.endTime)-_(s.startTime))-.5*m:_(s.startTime)+p}).attr("y",function(s,e){return e=s.order,e*T+g}).attr("width",function(s){return s.milestone?m:_(s.renderEndTime||s.endTime)-_(s.startTime)}).attr("height",m).attr("transform-origin",function(s,e){return e=s.order,(_(s.startTime)+p+.5*(_(s.endTime)-_(s.startTime))).toString()+"px "+(e*T+g+.5*m).toString()+"px"}).attr("class",function(s){let e="task",w="";s.classes.length>0&&(w=s.classes.join(" "));let r=0;for(let[A,D]of M.entries())s.type===D&&(r=A%a.numberSectionStyles);let x="";return s.active?s.crit?x+=" activeCrit":x=" active":s.done?s.crit?x=" doneCrit":x=" done":s.crit&&(x+=" crit"),x.length===0&&(x=" task"),s.milestone&&(x=" milestone "+x),x+=r,x+=" "+w,e+x}),u.append("text").attr("id",function(s){return s.id+"-text"}).text(function(s){return s.task}).attr("font-size",a.fontSize).attr("x",function(s){let e=_(s.startTime),w=_(s.renderEndTime||s.endTime);s.milestone&&(e+=.5*(_(s.endTime)-_(s.startTime))-.5*m),s.milestone&&(w=e+m);let r=this.getBBox().width;return r>w-e?w+r+1.5*a.leftPadding>v?e+p-5:w+p+5:(w-e)/2+e+p}).attr("y",function(s,e){return e=s.order,e*T+a.barHeight/2+(a.fontSize/2-2)+g}).attr("text-height",m).attr("class",function(s){let e=_(s.startTime),w=_(s.endTime);s.milestone&&(w=e+m);let r=this.getBBox().width,x="";s.classes.length>0&&(x=s.classes.join(" "));let A=0;for(let[pt,ut]of M.entries())s.type===ut&&(A=pt%a.numberSectionStyles);let D="";return s.active&&(s.crit?D="activeCritText"+A:D="activeText"+A),s.done?s.crit?D=D+" doneCritText"+A:D=D+" doneText"+A:s.crit&&(D=D+" critText"+A),s.milestone&&(D+=" milestoneText"),r>w-e?w+r+1.5*a.leftPadding>v?x+" taskTextOutsideLeft taskTextOutside"+A+" "+D:x+" taskTextOutsideRight taskTextOutside"+A+" "+D+" width-"+r:x+" taskText taskText"+A+" "+D+" width-"+r}),q().securityLevel==="sandbox"){let s;s=yt("#i"+o);let e=s.nodes()[0].contentDocument;u.filter(function(w){return f[w.id]!==void 0}).each(function(w){var r=e.querySelector("#"+w.id),x=e.querySelector("#"+w.id+"-text");let A=r.parentNode;var D=e.createElement("a");D.setAttribute("xlink:href",f[w.id]),D.setAttribute("target","_top"),A.appendChild(D),D.appendChild(r),D.appendChild(x)})}}c(nt,"drawRects");function st(y,T,g,p,m,C,v,b){let l=C.reduce((r,{startTime:x})=>r?Math.min(r,x):x,0),u=C.reduce((r,{endTime:x})=>r?Math.max(r,x):x,0),f=i.db.getDateFormat();if(!l||!u)return;let d=[],s=null,e=ii(l);for(;e.valueOf()<=u;)i.db.isInvalidDate(e,f,v,b)?s?s.end=e:s={start:e,end:e}:s&&(d.push(s),s=null),e=e.add(1,"d");z.append("g").selectAll("rect").data(d).enter().append("rect").attr("id",function(r){return"exclude-"+r.start.format("YYYY-MM-DD")}).attr("x",function(r){return _(r.start)+g}).attr("y",a.gridLineStartPadding).attr("width",function(r){let x=r.end.add(1,"day");return _(x)-_(r.start)}).attr("height",m-T-a.gridLineStartPadding).attr("transform-origin",function(r,x){return(_(r.start)+g+.5*(_(r.end)-_(r.start))).toString()+"px "+(x*y+.5*m).toString()+"px"}).attr("class","exclude-range")}c(st,"drawExcludeDays");function at(y,T,g,p){let m=oi(_).tickSize(-p+T+a.gridLineStartPadding).tickFormat(ae(i.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d")),v=/^([1-9]\d*)(minute|hour|day|week|month)$/.exec(i.db.getTickInterval()||a.tickInterval);if(v!==null){let b=v[1],l=v[2],u=i.db.getWeekday()||a.weekday;switch(l){case"minute":m.ticks(ce.every(b));break;case"hour":m.ticks(oe.every(b));break;case"day":m.ticks(le.every(b));break;case"week":m.ticks(de[u].every(b));break;case"month":m.ticks(ue.every(b));break}}if(z.append("g").attr("class","grid").attr("transform","translate("+y+", "+(p-50)+")").call(m).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),i.db.topAxisEnabled()||a.topAxis){let b=li(_).tickSize(-p+T+a.gridLineStartPadding).tickFormat(ae(i.db.getAxisFormat()||a.axisFormat||"%Y-%m-%d"));if(v!==null){let l=v[1],u=v[2],f=i.db.getWeekday()||a.weekday;switch(u){case"minute":b.ticks(ce.every(l));break;case"hour":b.ticks(oe.every(l));break;case"day":b.ticks(le.every(l));break;case"week":b.ticks(de[f].every(l));break;case"month":b.ticks(ue.every(l));break}}z.append("g").attr("class","grid").attr("transform","translate("+y+", "+T+")").call(b).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}c(at,"makeGrid");function ct(y,T){let g=0,p=Object.keys(j).map(m=>[m,j[m]]);z.append("g").selectAll("text").data(p).enter().append(function(m){let C=m[0].split(Pt.lineBreakRegex),v=-(C.length-1)/2,b=F.createElementNS("http://www.w3.org/2000/svg","text");b.setAttribute("dy",v+"em");for(let[l,u]of C.entries()){let f=F.createElementNS("http://www.w3.org/2000/svg","tspan");f.setAttribute("alignment-baseline","central"),f.setAttribute("x","10"),l>0&&f.setAttribute("dy","1em"),f.textContent=u,b.appendChild(f)}return b}).attr("x",10).attr("y",function(m,C){if(C>0)for(let v=0;v<C;v++)return g+=p[C-1][1],m[1]*y/2+g*y+T;else return m[1]*y/2+T}).attr("font-size",a.sectionFontSize).attr("class",function(m){for(let[C,v]of M.entries())if(m[0]===v)return"sectionTitle sectionTitle"+C%a.numberSectionStyles;return"sectionTitle"})}c(ct,"vertLabels");function ot(y,T,g,p){let m=i.db.getTodayMarker();if(m==="off")return;let C=z.append("g").attr("class","today"),v=new Date,b=C.append("line");b.attr("x1",_(v)+y).attr("x2",_(v)+y).attr("y1",a.titleTopMargin).attr("y2",p-a.titleTopMargin).attr("class","today"),m!==""&&b.attr("style",m.replace(/,/g,";"))}c(ot,"drawToday");function lt(y){let T={},g=[];for(let p=0,m=y.length;p<m;++p)Object.prototype.hasOwnProperty.call(T,y[p])||(T[y[p]]=!0,g.push(y[p]));return g}c(lt,"checkUnique")},"draw"),fe={setConf:pi,draw:bi};var xi=c(t=>`
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
`,"getStyles"),he=xi;var Qi={parser:Ht,db:ne,renderer:fe,styles:he};export{Qi as diagram};
