"use strict";
import{s as Gt}from"./chunk-W3YBFA2J.mjs";import{C as Yt}from"./chunk-QJ3EQYPD.mjs";import{a as Rt,b as wt,c as Bt,d as Pt,e as Vt,f as Ft,g as $t}from"./chunk-K4VM4JX7.mjs";import{V as $,b as E,ga as w}from"./chunk-IVQLRXYF.mjs";import{c as a}from"./chunk-AXW634CS.mjs";var Et=function(){var t=a(function(A,r,c,i){for(c=c||{},i=A.length;i--;c[A[i]]=r);return c},"o"),s=[1,2],n=[1,3],u=[1,5],f=[1,7],y=[2,5],S=[1,15],D=[1,17],p=[1,21],x=[1,22],T=[1,23],U=[1,24],B=[1,37],j=[1,25],z=[1,26],H=[1,27],X=[1,28],K=[1,29],W=[1,32],J=[1,33],q=[1,34],Q=[1,35],Z=[1,36],tt=[1,39],et=[1,40],st=[1,41],it=[1,42],P=[1,38],It=[1,45],h=[1,4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],rt=[1,4,5,14,15,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],yt=[1,4,5,7,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],Ot=[4,5,16,17,19,21,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],St={trace:a(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,directive:6,SD:7,document:8,line:9,statement:10,classDefStatement:11,cssClassStatement:12,idStatement:13,DESCR:14,"-->":15,HIDE_EMPTY:16,scale:17,WIDTH:18,COMPOSIT_STATE:19,STRUCT_START:20,STRUCT_STOP:21,STATE_DESCR:22,AS:23,ID:24,FORK:25,JOIN:26,CHOICE:27,CONCURRENT:28,note:29,notePosition:30,NOTE_TEXT:31,direction:32,acc_title:33,acc_title_value:34,acc_descr:35,acc_descr_value:36,acc_descr_multiline_value:37,classDef:38,CLASSDEF_ID:39,CLASSDEF_STYLEOPTS:40,DEFAULT:41,class:42,CLASSENTITY_IDS:43,STYLECLASS:44,openDirective:45,typeDirective:46,closeDirective:47,":":48,argDirective:49,direction_tb:50,direction_bt:51,direction_rl:52,direction_lr:53,eol:54,";":55,EDGE_STATE:56,STYLE_SEPARATOR:57,left_of:58,right_of:59,open_directive:60,type_directive:61,arg_directive:62,close_directive:63,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",7:"SD",14:"DESCR",15:"-->",16:"HIDE_EMPTY",17:"scale",18:"WIDTH",19:"COMPOSIT_STATE",20:"STRUCT_START",21:"STRUCT_STOP",22:"STATE_DESCR",23:"AS",24:"ID",25:"FORK",26:"JOIN",27:"CHOICE",28:"CONCURRENT",29:"note",31:"NOTE_TEXT",33:"acc_title",34:"acc_title_value",35:"acc_descr",36:"acc_descr_value",37:"acc_descr_multiline_value",38:"classDef",39:"CLASSDEF_ID",40:"CLASSDEF_STYLEOPTS",41:"DEFAULT",42:"class",43:"CLASSENTITY_IDS",44:"STYLECLASS",48:":",50:"direction_tb",51:"direction_bt",52:"direction_rl",53:"direction_lr",55:";",56:"EDGE_STATE",57:"STYLE_SEPARATOR",58:"left_of",59:"right_of",60:"open_directive",61:"type_directive",62:"arg_directive",63:"close_directive"},productions_:[0,[3,2],[3,2],[3,2],[3,2],[8,0],[8,2],[9,2],[9,1],[9,1],[10,1],[10,1],[10,1],[10,2],[10,3],[10,4],[10,1],[10,2],[10,1],[10,4],[10,3],[10,6],[10,1],[10,1],[10,1],[10,1],[10,4],[10,4],[10,1],[10,1],[10,2],[10,2],[10,1],[11,3],[11,3],[12,3],[6,3],[6,5],[32,1],[32,1],[32,1],[32,1],[54,1],[54,1],[13,1],[13,1],[13,3],[13,3],[30,1],[30,1],[45,1],[46,1],[49,1],[47,1]],performAction:a(function(r,c,i,l,d,e,V){var o=e.length-1;switch(d){case 4:return l.setRootDoc(e[o]),e[o];break;case 5:this.$=[];break;case 6:e[o]!="nl"&&(e[o-1].push(e[o]),this.$=e[o-1]);break;case 7:case 8:this.$=e[o];break;case 9:this.$="nl";break;case 12:this.$=e[o];break;case 13:let at=e[o-1];at.description=l.trimColon(e[o]),this.$=at;break;case 14:this.$={stmt:"relation",state1:e[o-2],state2:e[o]};break;case 15:let nt=l.trimColon(e[o]);this.$={stmt:"relation",state1:e[o-3],state2:e[o-1],description:nt};break;case 19:this.$={stmt:"state",id:e[o-3],type:"default",description:"",doc:e[o-1]};break;case 20:var C=e[o],N=e[o-2].trim();if(e[o].match(":")){var F=e[o].split(":");C=F[0],N=[N,F[1]]}this.$={stmt:"state",id:C,type:"default",description:N};break;case 21:this.$={stmt:"state",id:e[o-3],type:"default",description:e[o-5],doc:e[o-1]};break;case 22:this.$={stmt:"state",id:e[o],type:"fork"};break;case 23:this.$={stmt:"state",id:e[o],type:"join"};break;case 24:this.$={stmt:"state",id:e[o],type:"choice"};break;case 25:this.$={stmt:"state",id:l.getDividerId(),type:"divider"};break;case 26:this.$={stmt:"state",id:e[o-1].trim(),note:{position:e[o-2].trim(),text:e[o].trim()}};break;case 30:this.$=e[o].trim(),l.setAccTitle(this.$);break;case 31:case 32:this.$=e[o].trim(),l.setAccDescription(this.$);break;case 33:case 34:this.$={stmt:"classDef",id:e[o-1].trim(),classes:e[o].trim()};break;case 35:this.$={stmt:"applyClass",id:e[o-1].trim(),styleClass:e[o].trim()};break;case 38:l.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 39:l.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 40:l.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 41:l.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 44:case 45:this.$={stmt:"state",id:e[o].trim(),type:"default",description:""};break;case 46:this.$={stmt:"state",id:e[o-2].trim(),classes:[e[o].trim()],type:"default",description:""};break;case 47:this.$={stmt:"state",id:e[o-2].trim(),classes:[e[o].trim()],type:"default",description:""};break;case 50:l.parseDirective("%%{","open_directive");break;case 51:l.parseDirective(e[o],"type_directive");break;case 52:e[o]=e[o].trim().replace(/'/g,'"'),l.parseDirective(e[o],"arg_directive");break;case 53:l.parseDirective("}%%","close_directive","state");break}},"anonymous"),table:[{3:1,4:s,5:n,6:4,7:u,45:6,60:f},{1:[3]},{3:8,4:s,5:n,6:4,7:u,45:6,60:f},{3:9,4:s,5:n,6:4,7:u,45:6,60:f},{3:10,4:s,5:n,6:4,7:u,45:6,60:f},t([1,4,5,16,17,19,22,24,25,26,27,28,29,33,35,37,38,42,50,51,52,53,56,60],y,{8:11}),{46:12,61:[1,13]},{61:[2,50]},{1:[2,1]},{1:[2,2]},{1:[2,3]},{1:[2,4],4:S,5:D,6:30,9:14,10:16,11:18,12:19,13:20,16:p,17:x,19:T,22:U,24:B,25:j,26:z,27:H,28:X,29:K,32:31,33:W,35:J,37:q,38:Q,42:Z,45:6,50:tt,51:et,52:st,53:it,56:P,60:f},{47:43,48:[1,44],63:It},t([48,63],[2,51]),t(h,[2,6]),{6:30,10:46,11:18,12:19,13:20,16:p,17:x,19:T,22:U,24:B,25:j,26:z,27:H,28:X,29:K,32:31,33:W,35:J,37:q,38:Q,42:Z,45:6,50:tt,51:et,52:st,53:it,56:P,60:f},t(h,[2,8]),t(h,[2,9]),t(h,[2,10]),t(h,[2,11]),t(h,[2,12],{14:[1,47],15:[1,48]}),t(h,[2,16]),{18:[1,49]},t(h,[2,18],{20:[1,50]}),{23:[1,51]},t(h,[2,22]),t(h,[2,23]),t(h,[2,24]),t(h,[2,25]),{30:52,31:[1,53],58:[1,54],59:[1,55]},t(h,[2,28]),t(h,[2,29]),{34:[1,56]},{36:[1,57]},t(h,[2,32]),{39:[1,58],41:[1,59]},{43:[1,60]},t(rt,[2,44],{57:[1,61]}),t(rt,[2,45],{57:[1,62]}),t(h,[2,38]),t(h,[2,39]),t(h,[2,40]),t(h,[2,41]),t(yt,[2,36]),{49:63,62:[1,64]},t(yt,[2,53]),t(h,[2,7]),t(h,[2,13]),{13:65,24:B,56:P},t(h,[2,17]),t(Ot,y,{8:66}),{24:[1,67]},{24:[1,68]},{23:[1,69]},{24:[2,48]},{24:[2,49]},t(h,[2,30]),t(h,[2,31]),{40:[1,70]},{40:[1,71]},{44:[1,72]},{24:[1,73]},{24:[1,74]},{47:75,63:It},{63:[2,52]},t(h,[2,14],{14:[1,76]}),{4:S,5:D,6:30,9:14,10:16,11:18,12:19,13:20,16:p,17:x,19:T,21:[1,77],22:U,24:B,25:j,26:z,27:H,28:X,29:K,32:31,33:W,35:J,37:q,38:Q,42:Z,45:6,50:tt,51:et,52:st,53:it,56:P,60:f},t(h,[2,20],{20:[1,78]}),{31:[1,79]},{24:[1,80]},t(h,[2,33]),t(h,[2,34]),t(h,[2,35]),t(rt,[2,46]),t(rt,[2,47]),t(yt,[2,37]),t(h,[2,15]),t(h,[2,19]),t(Ot,y,{8:81}),t(h,[2,26]),t(h,[2,27]),{4:S,5:D,6:30,9:14,10:16,11:18,12:19,13:20,16:p,17:x,19:T,21:[1,82],22:U,24:B,25:j,26:z,27:H,28:X,29:K,32:31,33:W,35:J,37:q,38:Q,42:Z,45:6,50:tt,51:et,52:st,53:it,56:P,60:f},t(h,[2,21])],defaultActions:{7:[2,50],8:[2,1],9:[2,2],10:[2,3],54:[2,48],55:[2,49],64:[2,52]},parseError:a(function(r,c){if(c.recoverable)this.trace(r);else{var i=new Error(r);throw i.hash=c,i}},"parseError"),parse:a(function(r){var c=this,i=[0],l=[],d=[null],e=[],V=this.table,o="",C=0,N=0,F=0,at=2,nt=1,ae=e.slice.call(arguments,1),g=Object.create(this.lexer),L={yy:{}};for(var kt in this.yy)Object.prototype.hasOwnProperty.call(this.yy,kt)&&(L.yy[kt]=this.yy[kt]);g.setInput(r,L.yy),L.yy.lexer=g,L.yy.parser=this,typeof g.yylloc=="undefined"&&(g.yylloc={});var bt=g.yylloc;e.push(bt);var ne=g.options&&g.options.ranges;typeof L.yy.parseError=="function"?this.parseError=L.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Ne(_){i.length=i.length-2*_,d.length=d.length-_,e.length=e.length-_}a(Ne,"popStack");function ce(){var _;return _=l.pop()||g.lex()||nt,typeof _!="number"&&(_ instanceof Array&&(l=_,_=l.pop()),_=c.symbols_[_]||_),_}a(ce,"lex");for(var b,_t,I,m,Re,mt,R={},ct,v,Nt,ot;;){if(I=i[i.length-1],this.defaultActions[I]?m=this.defaultActions[I]:((b===null||typeof b=="undefined")&&(b=ce()),m=V[I]&&V[I][b]),typeof m=="undefined"||!m.length||!m[0]){var Tt="";ot=[];for(ct in V[I])this.terminals_[ct]&&ct>at&&ot.push("'"+this.terminals_[ct]+"'");g.showPosition?Tt="Parse error on line "+(C+1)+`:
`+g.showPosition()+`
Expecting `+ot.join(", ")+", got '"+(this.terminals_[b]||b)+"'":Tt="Parse error on line "+(C+1)+": Unexpected "+(b==nt?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(Tt,{text:g.match,token:this.terminals_[b]||b,line:g.yylineno,loc:bt,expected:ot})}if(m[0]instanceof Array&&m.length>1)throw new Error("Parse Error: multiple actions possible at state: "+I+", token: "+b);switch(m[0]){case 1:i.push(b),d.push(g.yytext),e.push(g.yylloc),i.push(m[1]),b=null,_t?(b=_t,_t=null):(N=g.yyleng,o=g.yytext,C=g.yylineno,bt=g.yylloc,F>0&&F--);break;case 2:if(v=this.productions_[m[1]][1],R.$=d[d.length-v],R._$={first_line:e[e.length-(v||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(v||1)].first_column,last_column:e[e.length-1].last_column},ne&&(R._$.range=[e[e.length-(v||1)].range[0],e[e.length-1].range[1]]),mt=this.performAction.apply(R,[o,N,C,L.yy,m[1],d,e].concat(ae)),typeof mt!="undefined")return mt;v&&(i=i.slice(0,-1*v*2),d=d.slice(0,-1*v),e=e.slice(0,-1*v)),i.push(this.productions_[m[1]][0]),d.push(R.$),e.push(R._$),Nt=V[i[i.length-2]][i[i.length-1]],i.push(Nt);break;case 3:return!0}}return!0},"parse")},re=function(){var A={EOF:1,parseError:a(function(c,i){if(this.yy.parser)this.yy.parser.parseError(c,i);else throw new Error(c)},"parseError"),setInput:function(r,c){return this.yy=c||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var c=r.match(/(?:\r\n?|\n).*/g);return c?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var c=r.length,i=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-c),this.offset-=c;var l=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var d=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===l.length?this.yylloc.first_column:0)+l[l.length-i.length].length-i[0].length:this.yylloc.first_column-c},this.options.ranges&&(this.yylloc.range=[d[0],d[0]+this.yyleng-c]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),c=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+c+"^"},test_match:function(r,c){var i,l,d;if(this.options.backtrack_lexer&&(d={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(d.yylloc.range=this.yylloc.range.slice(0))),l=r[0].match(/(?:\r\n?|\n).*/g),l&&(this.yylineno+=l.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:l?l[l.length-1].length-l[l.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],i=this.performAction.call(this,this.yy,this,c,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack){for(var e in d)this[e]=d[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,c,i,l;this._more||(this.yytext="",this.match="");for(var d=this._currentRules(),e=0;e<d.length;e++)if(i=this._input.match(this.rules[d[e]]),i&&(!c||i[0].length>c[0].length)){if(c=i,l=e,this.options.backtrack_lexer){if(r=this.test_match(i,d[e]),r!==!1)return r;if(this._backtrack){c=!1;continue}else return!1}else if(!this.options.flex)break}return c?(r=this.test_match(c,d[l]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:a(function(){var c=this.next();return c||this.lex()},"lex"),begin:a(function(c){this.conditionStack.push(c)},"begin"),popState:a(function(){var c=this.conditionStack.length-1;return c>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:a(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:a(function(c){return c=this.conditionStack.length-1-Math.abs(c||0),c>=0?this.conditionStack[c]:"INITIAL"},"topState"),pushState:a(function(c){this.begin(c)},"pushState"),stateStackSize:a(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:a(function(c,i,l,d){var e=d;switch(l){case 0:return 41;case 1:return 50;case 2:return 51;case 3:return 52;case 4:return 53;case 5:return this.begin("open_directive"),60;break;case 6:return this.begin("type_directive"),61;break;case 7:return this.popState(),this.begin("arg_directive"),48;break;case 8:return this.popState(),this.popState(),63;break;case 9:return 62;case 10:break;case 11:break;case 12:return 5;case 13:break;case 14:break;case 15:break;case 16:break;case 17:return this.pushState("SCALE"),17;break;case 18:return 18;case 19:this.popState();break;case 20:return this.begin("acc_title"),33;break;case 21:return this.popState(),"acc_title_value";break;case 22:return this.begin("acc_descr"),35;break;case 23:return this.popState(),"acc_descr_value";break;case 24:this.begin("acc_descr_multiline");break;case 25:this.popState();break;case 26:return"acc_descr_multiline_value";case 27:return this.pushState("CLASSDEF"),38;break;case 28:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";break;case 29:return this.popState(),this.pushState("CLASSDEFID"),39;break;case 30:return this.popState(),40;break;case 31:return this.pushState("CLASS"),42;break;case 32:return this.popState(),this.pushState("CLASS_STYLE"),43;break;case 33:return this.popState(),44;break;case 34:return this.pushState("SCALE"),17;break;case 35:return 18;case 36:this.popState();break;case 37:this.pushState("STATE");break;case 38:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;break;case 39:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),26;break;case 40:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),27;break;case 41:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;break;case 42:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),26;break;case 43:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),27;break;case 44:return 50;case 45:return 51;case 46:return 52;case 47:return 53;case 48:this.pushState("STATE_STRING");break;case 49:return this.pushState("STATE_ID"),"AS";break;case 50:return this.popState(),"ID";break;case 51:this.popState();break;case 52:return"STATE_DESCR";case 53:return 19;case 54:this.popState();break;case 55:return this.popState(),this.pushState("struct"),20;break;case 56:break;case 57:return this.popState(),21;break;case 58:break;case 59:return this.begin("NOTE"),29;break;case 60:return this.popState(),this.pushState("NOTE_ID"),58;break;case 61:return this.popState(),this.pushState("NOTE_ID"),59;break;case 62:this.popState(),this.pushState("FLOATING_NOTE");break;case 63:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";break;case 64:break;case 65:return"NOTE_TEXT";case 66:return this.popState(),"ID";break;case 67:return this.popState(),this.pushState("NOTE_TEXT"),24;break;case 68:return this.popState(),i.yytext=i.yytext.substr(2).trim(),31;break;case 69:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),31;break;case 70:return 7;case 71:return 7;case 72:return 16;case 73:return 56;case 74:return 24;case 75:return i.yytext=i.yytext.trim(),14;break;case 76:return 15;case 77:return 28;case 78:return 57;case 79:return 5;case 80:return"INVALID"}},"anonymous"),rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[14,15],inclusive:!1},close_directive:{rules:[14,15],inclusive:!1},arg_directive:{rules:[8,9,14,15],inclusive:!1},type_directive:{rules:[7,8,14,15],inclusive:!1},open_directive:{rules:[6,14,15],inclusive:!1},struct:{rules:[14,15,27,31,37,44,45,46,47,56,57,58,59,73,74,75,76,77],inclusive:!1},FLOATING_NOTE_ID:{rules:[66],inclusive:!1},FLOATING_NOTE:{rules:[63,64,65],inclusive:!1},NOTE_TEXT:{rules:[68,69],inclusive:!1},NOTE_ID:{rules:[67],inclusive:!1},NOTE:{rules:[60,61,62],inclusive:!1},CLASS_STYLE:{rules:[33],inclusive:!1},CLASS:{rules:[32],inclusive:!1},CLASSDEFID:{rules:[30],inclusive:!1},CLASSDEF:{rules:[28,29],inclusive:!1},acc_descr_multiline:{rules:[25,26],inclusive:!1},acc_descr:{rules:[23],inclusive:!1},acc_title:{rules:[21],inclusive:!1},SCALE:{rules:[18,19,35,36],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[50],inclusive:!1},STATE_STRING:{rules:[51,52],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[14,15,38,39,40,41,42,43,48,49,53,54,55],inclusive:!1},ID:{rules:[14,15],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,10,11,12,13,15,16,17,20,22,24,27,31,34,37,55,59,70,71,72,73,74,75,76,78,79,80],inclusive:!0}}};return A}();St.lexer=re;function gt(){this.yy={}}return a(gt,"Parser"),gt.prototype=St,St.Parser=gt,new gt}();Et.parser=Et;var we=Et;var Mt="LR",Ve="TB",lt="state",xt="relation",Ut="classDef",jt="applyClass",ht="default",zt="divider";var Ct="[*]",Wt="start",Jt=Ct,qt="end",Ht="color",Xt="fill",oe="bgFill",le=",";function Qt(){return{}}a(Qt,"newClassesList");var Zt=Mt,dt=[],Y=Qt(),te=a(()=>({relations:[],states:{},documents:{}}),"newDoc"),pt={root:te()},k=pt.root,G=0,Kt=0,he={LINE:0,DOTTED_LINE:1},ue={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},ut=a(t=>JSON.parse(JSON.stringify(t)),"clone"),fe=a(function(t,s,n){Gt.parseDirective(this,t,s,n)},"parseDirective"),de=a(t=>{E.info("Setting root doc",t),dt=t},"setRootDoc"),pe=a(()=>dt,"getRootDoc"),ft=a((t,s,n)=>{if(s.stmt===xt)ft(t,s.state1,!0),ft(t,s.state2,!1);else if(s.stmt===lt&&(s.id==="[*]"?(s.id=n?t.id+"_start":t.id+"_end",s.start=n):s.id=s.id.trim()),s.doc){let u=[],f=[],y;for(y=0;y<s.doc.length;y++)if(s.doc[y].type===zt){let S=ut(s.doc[y]);S.doc=ut(f),u.push(S),f=[]}else f.push(s.doc[y]);if(u.length>0&&f.length>0){let S={stmt:lt,id:Yt(),type:"divider",doc:ut(f)};u.push(ut(S)),s.doc=u}s.doc.forEach(S=>ft(s,S,!0))}},"docTranslator"),ye=a(()=>(ft({id:"root"},{id:"root",doc:dt},!0),{id:"root",doc:dt}),"getRootDocV2"),Se=a(t=>{let s;t.doc?s=t.doc:s=t,E.info(s),ee(!0),E.info("Extract",s),s.forEach(n=>{switch(n.stmt){case lt:O(n.id.trim(),n.type,n.doc,n.description,n.note,n.classes,n.styles,n.textStyles);break;case xt:se(n.state1,n.state2,n.description);break;case Ut:ie(n.id.trim(),n.classes);break;case jt:Lt(n.id.trim(),n.styleClass);break}})},"extract"),O=a(function(t,s=ht,n=null,u=null,f=null,y=null,S=null,D=null){let p=t==null?void 0:t.trim();k.states[p]===void 0?(E.info("Adding state ",p,u),k.states[p]={id:p,descriptions:[],type:s,doc:n,note:f,classes:[],styles:[],textStyles:[]}):(k.states[p].doc||(k.states[p].doc=n),k.states[p].type||(k.states[p].type=s)),u&&(E.info("Setting state description",p,u),typeof u=="string"&&At(p,u.trim()),typeof u=="object"&&u.forEach(x=>At(p,x.trim()))),f&&(k.states[p].note=f,k.states[p].note.text=$.sanitizeText(k.states[p].note.text,w())),y&&(E.info("Setting state classes",p,y),(typeof y=="string"?[y]:y).forEach(T=>Lt(p,T.trim()))),S&&(E.info("Setting state styles",p,S),(typeof S=="string"?[S]:S).forEach(T=>De(p,T.trim()))),D&&(E.info("Setting state styles",p,S),(typeof D=="string"?[D]:D).forEach(T=>Ae(p,T.trim())))},"addState"),ee=a(function(t){pt={root:te()},k=pt.root,G=0,Y=Qt(),t||Rt()},"clear"),M=a(function(t){return k.states[t]},"getState"),ge=a(function(){return k.states},"getStates"),ke=a(function(){E.info("Documents = ",pt)},"logDocuments"),be=a(function(){return k.relations},"getRelations");function vt(t=""){let s=t;return t===Ct&&(G++,s=`${Wt}${G}`),s}a(vt,"startIdIfNeeded");function Dt(t="",s=ht){return t===Ct?Wt:s}a(Dt,"startTypeIfNeeded");function _e(t=""){let s=t;return t===Jt&&(G++,s=`${qt}${G}`),s}a(_e,"endIdIfNeeded");function me(t="",s=ht){return t===Jt?qt:s}a(me,"endTypeIfNeeded");function Te(t,s,n){let u=vt(t.id.trim()),f=Dt(t.id.trim(),t.type),y=vt(s.id.trim()),S=Dt(s.id.trim(),s.type);O(u,f,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),O(y,S,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),k.relations.push({id1:u,id2:y,relationTitle:$.sanitizeText(n,w())})}a(Te,"addRelationObjs");var se=a(function(t,s,n){if(typeof t=="object")Te(t,s,n);else{let u=vt(t.trim()),f=Dt(t),y=_e(s.trim()),S=me(s);O(u,f),O(y,S),k.relations.push({id1:u,id2:y,title:$.sanitizeText(n,w())})}},"addRelation"),At=a(function(t,s){let n=k.states[t],u=s.startsWith(":")?s.replace(":","").trim():s;n.descriptions.push($.sanitizeText(u,w()))},"addDescription"),Ee=a(function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},"cleanupLabel"),xe=a(()=>(Kt++,"divider-id-"+Kt),"getDividerId"),ie=a(function(t,s=""){Y[t]===void 0&&(Y[t]={id:t,styles:[],textStyles:[]});let n=Y[t];s!=null&&s.split(le).forEach(u=>{let f=u.replace(/([^;]*);/,"$1").trim();if(u.match(Ht)){let S=f.replace(Xt,oe).replace(Ht,Xt);n.textStyles.push(S)}n.styles.push(f)})},"addStyleClass"),ve=a(function(){return Y},"getClasses"),Lt=a(function(t,s){t.split(",").forEach(function(n){let u=M(n);if(u===void 0){let f=n.trim();O(f),u=M(f)}u.classes.push(s)})},"setCssClass"),De=a(function(t,s){let n=M(t);n!==void 0&&n.textStyles.push(s)},"setStyle"),Ae=a(function(t,s){let n=M(t);n!==void 0&&n.textStyles.push(s)},"setTextStyle"),Ce=a(()=>Zt,"getDirection"),Le=a(t=>{Zt=t},"setDirection"),Ie=a(t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),"trimColon"),He={parseDirective:fe,getConfig:()=>w().state,addState:O,clear:ee,getState:M,getStates:ge,getRelations:be,getClasses:ve,getDirection:Ce,addRelation:se,getDividerId:xe,setDirection:Le,cleanupLabel:Ee,lineType:he,relationType:ue,logDocuments:ke,getRootDoc:pe,setRootDoc:de,getRootDocV2:ye,extract:Se,trimColon:Ie,getAccTitle:Bt,setAccTitle:wt,getAccDescription:Vt,setAccDescription:Pt,addStyleClass:ie,setCssClass:Lt,addDescription:At,setDiagramTitle:Ft,getDiagramTitle:$t};var Oe=a(t=>`
defs #statediagram-barbEnd {
    fill: ${t.transitionColor};
    stroke: ${t.transitionColor};
  }
g.stateGroup text {
  fill: ${t.nodeBorder};
  stroke: none;
  font-size: 10px;
}
g.stateGroup text {
  fill: ${t.textColor};
  stroke: none;
  font-size: 10px;

}
g.stateGroup .state-title {
  font-weight: bolder;
  fill: ${t.stateLabelColor};
}

g.stateGroup rect {
  fill: ${t.mainBkg};
  stroke: ${t.nodeBorder};
}

g.stateGroup line {
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.transition {
  stroke: ${t.transitionColor};
  stroke-width: 1;
  fill: none;
}

.stateGroup .composit {
  fill: ${t.background};
  border-bottom: 1px
}

.stateGroup .alt-composit {
  fill: #e0e0e0;
  border-bottom: 1px
}

.state-note {
  stroke: ${t.noteBorderColor};
  fill: ${t.noteBkgColor};

  text {
    fill: ${t.noteTextColor};
    stroke: none;
    font-size: 10px;
  }
}

.stateLabel .box {
  stroke: none;
  stroke-width: 0;
  fill: ${t.mainBkg};
  opacity: 0.5;
}

.edgeLabel .label rect {
  fill: ${t.labelBackgroundColor};
  opacity: 0.5;
}
.edgeLabel .label text {
  fill: ${t.transitionLabelColor||t.tertiaryTextColor};
}
.label div .edgeLabel {
  color: ${t.transitionLabelColor||t.tertiaryTextColor};
}

.stateLabel text {
  fill: ${t.stateLabelColor};
  font-size: 10px;
  font-weight: bold;
}

.node circle.state-start {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node .fork-join {
  fill: ${t.specialStateColor};
  stroke: ${t.specialStateColor};
}

.node circle.state-end {
  fill: ${t.innerEndBackground};
  stroke: ${t.background};
  stroke-width: 1.5
}
.end-state-inner {
  fill: ${t.compositeBackground||t.background};
  // stroke: ${t.background};
  stroke-width: 1.5
}

.node rect {
  fill: ${t.stateBkg||t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}
.node polygon {
  fill: ${t.mainBkg};
  stroke: ${t.stateBorder||t.nodeBorder};;
  stroke-width: 1px;
}
#statediagram-barbEnd {
  fill: ${t.lineColor};
}

.statediagram-cluster rect {
  fill: ${t.compositeTitleBackground};
  stroke: ${t.stateBorder||t.nodeBorder};
  stroke-width: 1px;
}

.cluster-label, .nodeLabel {
  color: ${t.stateLabelColor};
}

.statediagram-cluster rect.outer {
  rx: 5px;
  ry: 5px;
}
.statediagram-state .divider {
  stroke: ${t.stateBorder||t.nodeBorder};
}

.statediagram-state .title-state {
  rx: 5px;
  ry: 5px;
}
.statediagram-cluster.statediagram-cluster .inner {
  fill: ${t.compositeBackground||t.background};
}
.statediagram-cluster.statediagram-cluster-alt .inner {
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.statediagram-cluster .inner {
  rx:0;
  ry:0;
}

.statediagram-state rect.basic {
  rx: 5px;
  ry: 5px;
}
.statediagram-state rect.divider {
  stroke-dasharray: 10,10;
  fill: ${t.altBackground?t.altBackground:"#efefef"};
}

.note-edge {
  stroke-dasharray: 5;
}

.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}
.statediagram-note rect {
  fill: ${t.noteBkgColor};
  stroke: ${t.noteBorderColor};
  stroke-width: 1px;
  rx: 0;
  ry: 0;
}

.statediagram-note text {
  fill: ${t.noteTextColor};
}

.statediagram-note .nodeLabel {
  color: ${t.noteTextColor};
}
.statediagram .edgeLabel {
  color: red; // ${t.noteTextColor};
}

#dependencyStart, #dependencyEnd {
  fill: ${t.lineColor};
  stroke: ${t.lineColor};
  stroke-width: 1;
}

.statediagramTitleText {
  text-anchor: middle;
  font-size: 18px;
  fill: ${t.textColor};
}
`,"getStyles"),We=Oe;export{we as a,Mt as b,Ve as c,lt as d,xt as e,ht as f,zt as g,He as h,We as i};
