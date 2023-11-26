import{e as vt}from"./chunk-WGNKRIJQ.mjs";import{Na as Ot,Oa as Nt,Pa as Rt,Qa as wt,Ra as Bt,Sa as $t,Ta as Pt,Va as w,a as n,g as E,ja as V}from"./chunk-ONLVDUB4.mjs";var Tt=function(){var t=n(function(C,r,a,i){for(a=a||{},i=C.length;i--;a[C[i]]=r);return a},"o"),s=[1,2],o=[1,3],u=[1,4],p=[2,4],y=[1,9],S=[1,11],x=[1,15],d=[1,16],D=[1,17],_=[1,18],B=[1,30],U=[1,19],j=[1,20],z=[1,21],H=[1,22],X=[1,23],K=[1,25],W=[1,26],J=[1,27],q=[1,28],Q=[1,29],Z=[1,32],tt=[1,33],et=[1,34],st=[1,35],$=[1,31],c=[1,4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],it=[1,4,5,13,14,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],Lt=[4,5,15,16,18,20,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],pt={trace:n(function(){},"trace"),yy:{},symbols_:{error:2,start:3,SPACE:4,NL:5,SD:6,document:7,line:8,statement:9,classDefStatement:10,cssClassStatement:11,idStatement:12,DESCR:13,"-->":14,HIDE_EMPTY:15,scale:16,WIDTH:17,COMPOSIT_STATE:18,STRUCT_START:19,STRUCT_STOP:20,STATE_DESCR:21,AS:22,ID:23,FORK:24,JOIN:25,CHOICE:26,CONCURRENT:27,note:28,notePosition:29,NOTE_TEXT:30,direction:31,acc_title:32,acc_title_value:33,acc_descr:34,acc_descr_value:35,acc_descr_multiline_value:36,classDef:37,CLASSDEF_ID:38,CLASSDEF_STYLEOPTS:39,DEFAULT:40,class:41,CLASSENTITY_IDS:42,STYLECLASS:43,direction_tb:44,direction_bt:45,direction_rl:46,direction_lr:47,eol:48,";":49,EDGE_STATE:50,STYLE_SEPARATOR:51,left_of:52,right_of:53,$accept:0,$end:1},terminals_:{2:"error",4:"SPACE",5:"NL",6:"SD",13:"DESCR",14:"-->",15:"HIDE_EMPTY",16:"scale",17:"WIDTH",18:"COMPOSIT_STATE",19:"STRUCT_START",20:"STRUCT_STOP",21:"STATE_DESCR",22:"AS",23:"ID",24:"FORK",25:"JOIN",26:"CHOICE",27:"CONCURRENT",28:"note",30:"NOTE_TEXT",32:"acc_title",33:"acc_title_value",34:"acc_descr",35:"acc_descr_value",36:"acc_descr_multiline_value",37:"classDef",38:"CLASSDEF_ID",39:"CLASSDEF_STYLEOPTS",40:"DEFAULT",41:"class",42:"CLASSENTITY_IDS",43:"STYLECLASS",44:"direction_tb",45:"direction_bt",46:"direction_rl",47:"direction_lr",49:";",50:"EDGE_STATE",51:"STYLE_SEPARATOR",52:"left_of",53:"right_of"},productions_:[0,[3,2],[3,2],[3,2],[7,0],[7,2],[8,2],[8,1],[8,1],[9,1],[9,1],[9,1],[9,2],[9,3],[9,4],[9,1],[9,2],[9,1],[9,4],[9,3],[9,6],[9,1],[9,1],[9,1],[9,1],[9,4],[9,4],[9,1],[9,2],[9,2],[9,1],[10,3],[10,3],[11,3],[31,1],[31,1],[31,1],[31,1],[48,1],[48,1],[12,1],[12,1],[12,3],[12,3],[29,1],[29,1]],performAction:n(function(r,a,i,h,f,e,P){var l=e.length-1;switch(f){case 3:return h.setRootDoc(e[l]),e[l];break;case 4:this.$=[];break;case 5:e[l]!="nl"&&(e[l-1].push(e[l]),this.$=e[l-1]);break;case 6:case 7:this.$=e[l];break;case 8:this.$="nl";break;case 11:this.$=e[l];break;case 12:let rt=e[l-1];rt.description=h.trimColon(e[l]),this.$=rt;break;case 13:this.$={stmt:"relation",state1:e[l-2],state2:e[l]};break;case 14:let nt=h.trimColon(e[l]);this.$={stmt:"relation",state1:e[l-3],state2:e[l-1],description:nt};break;case 18:this.$={stmt:"state",id:e[l-3],type:"default",description:"",doc:e[l-1]};break;case 19:var L=e[l],N=e[l-2].trim();if(e[l].match(":")){var F=e[l].split(":");L=F[0],N=[N,F[1]]}this.$={stmt:"state",id:L,type:"default",description:N};break;case 20:this.$={stmt:"state",id:e[l-3],type:"default",description:e[l-5],doc:e[l-1]};break;case 21:this.$={stmt:"state",id:e[l],type:"fork"};break;case 22:this.$={stmt:"state",id:e[l],type:"join"};break;case 23:this.$={stmt:"state",id:e[l],type:"choice"};break;case 24:this.$={stmt:"state",id:h.getDividerId(),type:"divider"};break;case 25:this.$={stmt:"state",id:e[l-1].trim(),note:{position:e[l-2].trim(),text:e[l].trim()}};break;case 28:this.$=e[l].trim(),h.setAccTitle(this.$);break;case 29:case 30:this.$=e[l].trim(),h.setAccDescription(this.$);break;case 31:case 32:this.$={stmt:"classDef",id:e[l-1].trim(),classes:e[l].trim()};break;case 33:this.$={stmt:"applyClass",id:e[l-1].trim(),styleClass:e[l].trim()};break;case 34:h.setDirection("TB"),this.$={stmt:"dir",value:"TB"};break;case 35:h.setDirection("BT"),this.$={stmt:"dir",value:"BT"};break;case 36:h.setDirection("RL"),this.$={stmt:"dir",value:"RL"};break;case 37:h.setDirection("LR"),this.$={stmt:"dir",value:"LR"};break;case 40:case 41:this.$={stmt:"state",id:e[l].trim(),type:"default",description:""};break;case 42:this.$={stmt:"state",id:e[l-2].trim(),classes:[e[l].trim()],type:"default",description:""};break;case 43:this.$={stmt:"state",id:e[l-2].trim(),classes:[e[l].trim()],type:"default",description:""};break}},"anonymous"),table:[{3:1,4:s,5:o,6:u},{1:[3]},{3:5,4:s,5:o,6:u},{3:6,4:s,5:o,6:u},t([1,4,5,15,16,18,21,23,24,25,26,27,28,32,34,36,37,41,44,45,46,47,50],p,{7:7}),{1:[2,1]},{1:[2,2]},{1:[2,3],4:y,5:S,8:8,9:10,10:12,11:13,12:14,15:x,16:d,18:D,21:_,23:B,24:U,25:j,26:z,27:H,28:X,31:24,32:K,34:W,36:J,37:q,41:Q,44:Z,45:tt,46:et,47:st,50:$},t(c,[2,5]),{9:36,10:12,11:13,12:14,15:x,16:d,18:D,21:_,23:B,24:U,25:j,26:z,27:H,28:X,31:24,32:K,34:W,36:J,37:q,41:Q,44:Z,45:tt,46:et,47:st,50:$},t(c,[2,7]),t(c,[2,8]),t(c,[2,9]),t(c,[2,10]),t(c,[2,11],{13:[1,37],14:[1,38]}),t(c,[2,15]),{17:[1,39]},t(c,[2,17],{19:[1,40]}),{22:[1,41]},t(c,[2,21]),t(c,[2,22]),t(c,[2,23]),t(c,[2,24]),{29:42,30:[1,43],52:[1,44],53:[1,45]},t(c,[2,27]),{33:[1,46]},{35:[1,47]},t(c,[2,30]),{38:[1,48],40:[1,49]},{42:[1,50]},t(it,[2,40],{51:[1,51]}),t(it,[2,41],{51:[1,52]}),t(c,[2,34]),t(c,[2,35]),t(c,[2,36]),t(c,[2,37]),t(c,[2,6]),t(c,[2,12]),{12:53,23:B,50:$},t(c,[2,16]),t(Lt,p,{7:54}),{23:[1,55]},{23:[1,56]},{22:[1,57]},{23:[2,44]},{23:[2,45]},t(c,[2,28]),t(c,[2,29]),{39:[1,58]},{39:[1,59]},{43:[1,60]},{23:[1,61]},{23:[1,62]},t(c,[2,13],{13:[1,63]}),{4:y,5:S,8:8,9:10,10:12,11:13,12:14,15:x,16:d,18:D,20:[1,64],21:_,23:B,24:U,25:j,26:z,27:H,28:X,31:24,32:K,34:W,36:J,37:q,41:Q,44:Z,45:tt,46:et,47:st,50:$},t(c,[2,19],{19:[1,65]}),{30:[1,66]},{23:[1,67]},t(c,[2,31]),t(c,[2,32]),t(c,[2,33]),t(it,[2,42]),t(it,[2,43]),t(c,[2,14]),t(c,[2,18]),t(Lt,p,{7:68}),t(c,[2,25]),t(c,[2,26]),{4:y,5:S,8:8,9:10,10:12,11:13,12:14,15:x,16:d,18:D,20:[1,69],21:_,23:B,24:U,25:j,26:z,27:H,28:X,31:24,32:K,34:W,36:J,37:q,41:Q,44:Z,45:tt,46:et,47:st,50:$},t(c,[2,20])],defaultActions:{5:[2,1],6:[2,2],44:[2,44],45:[2,45]},parseError:n(function(r,a){if(a.recoverable)this.trace(r);else{var i=new Error(r);throw i.hash=a,i}},"parseError"),parse:n(function(r){var a=this,i=[0],h=[],f=[null],e=[],P=this.table,l="",L=0,N=0,F=0,rt=2,nt=1,ee=e.slice.call(arguments,1),k=Object.create(this.lexer),I={yy:{}};for(var St in this.yy)Object.prototype.hasOwnProperty.call(this.yy,St)&&(I.yy[St]=this.yy[St]);k.setInput(r,I.yy),I.yy.lexer=k,I.yy.parser=this,typeof k.yylloc>"u"&&(k.yylloc={});var kt=k.yylloc;e.push(kt);var se=k.options&&k.options.ranges;typeof I.yy.parseError=="function"?this.parseError=I.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Ce(m){i.length=i.length-2*m,f.length=f.length-m,e.length=e.length-m}n(Ce,"popStack");function ie(){var m;return m=h.pop()||k.lex()||nt,typeof m!="number"&&(m instanceof Array&&(h=m,m=h.pop()),m=a.symbols_[m]||m),m}n(ie,"lex");for(var b,gt,v,T,Le,bt,R={},at,A,It,ot;;){if(v=i[i.length-1],this.defaultActions[v]?T=this.defaultActions[v]:((b===null||typeof b>"u")&&(b=ie()),T=P[v]&&P[v][b]),typeof T>"u"||!T.length||!T[0]){var mt="";ot=[];for(at in P[v])this.terminals_[at]&&at>rt&&ot.push("'"+this.terminals_[at]+"'");k.showPosition?mt="Parse error on line "+(L+1)+`:
`+k.showPosition()+`
Expecting `+ot.join(", ")+", got '"+(this.terminals_[b]||b)+"'":mt="Parse error on line "+(L+1)+": Unexpected "+(b==nt?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(mt,{text:k.match,token:this.terminals_[b]||b,line:k.yylineno,loc:kt,expected:ot})}if(T[0]instanceof Array&&T.length>1)throw new Error("Parse Error: multiple actions possible at state: "+v+", token: "+b);switch(T[0]){case 1:i.push(b),f.push(k.yytext),e.push(k.yylloc),i.push(T[1]),b=null,gt?(b=gt,gt=null):(N=k.yyleng,l=k.yytext,L=k.yylineno,kt=k.yylloc,F>0&&F--);break;case 2:if(A=this.productions_[T[1]][1],R.$=f[f.length-A],R._$={first_line:e[e.length-(A||1)].first_line,last_line:e[e.length-1].last_line,first_column:e[e.length-(A||1)].first_column,last_column:e[e.length-1].last_column},se&&(R._$.range=[e[e.length-(A||1)].range[0],e[e.length-1].range[1]]),bt=this.performAction.apply(R,[l,N,L,I.yy,T[1],f,e].concat(ee)),typeof bt<"u")return bt;A&&(i=i.slice(0,-1*A*2),f=f.slice(0,-1*A),e=e.slice(0,-1*A)),i.push(this.productions_[T[1]][0]),f.push(R.$),e.push(R._$),It=P[i[i.length-2]][i[i.length-1]],i.push(It);break;case 3:return!0}}return!0},"parse")},te=function(){var C={EOF:1,parseError:n(function(a,i){if(this.yy.parser)this.yy.parser.parseError(a,i);else throw new Error(a)},"parseError"),setInput:function(r,a){return this.yy=a||this.yy||{},this._input=r,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var r=this._input[0];this.yytext+=r,this.yyleng++,this.offset++,this.match+=r,this.matched+=r;var a=r.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),r},unput:function(r){var a=r.length,i=r.split(/(?:\r\n?|\n)/g);this._input=r+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var h=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),i.length-1&&(this.yylineno-=i.length-1);var f=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:i?(i.length===h.length?this.yylloc.first_column:0)+h[h.length-i.length].length-i[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[f[0],f[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(r){this.unput(this.match.slice(r))},pastInput:function(){var r=this.matched.substr(0,this.matched.length-this.match.length);return(r.length>20?"...":"")+r.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var r=this.match;return r.length<20&&(r+=this._input.substr(0,20-r.length)),(r.substr(0,20)+(r.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var r=this.pastInput(),a=new Array(r.length+1).join("-");return r+this.upcomingInput()+`
`+a+"^"},test_match:function(r,a){var i,h,f;if(this.options.backtrack_lexer&&(f={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(f.yylloc.range=this.yylloc.range.slice(0))),h=r[0].match(/(?:\r\n?|\n).*/g),h&&(this.yylineno+=h.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:h?h[h.length-1].length-h[h.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+r[0].length},this.yytext+=r[0],this.match+=r[0],this.matches=r,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(r[0].length),this.matched+=r[0],i=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),i)return i;if(this._backtrack){for(var e in f)this[e]=f[e];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var r,a,i,h;this._more||(this.yytext="",this.match="");for(var f=this._currentRules(),e=0;e<f.length;e++)if(i=this._input.match(this.rules[f[e]]),i&&(!a||i[0].length>a[0].length)){if(a=i,h=e,this.options.backtrack_lexer){if(r=this.test_match(i,f[e]),r!==!1)return r;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(r=this.test_match(a,f[h]),r!==!1?r:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:n(function(){var a=this.next();return a||this.lex()},"lex"),begin:n(function(a){this.conditionStack.push(a)},"begin"),popState:n(function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:n(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:n(function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:n(function(a){this.begin(a)},"pushState"),stateStackSize:n(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:n(function(a,i,h,f){var e=f;switch(h){case 0:return 40;case 1:return 44;case 2:return 45;case 3:return 46;case 4:return 47;case 5:break;case 6:break;case 7:return 5;case 8:break;case 9:break;case 10:break;case 11:break;case 12:return this.pushState("SCALE"),16;break;case 13:return 17;case 14:this.popState();break;case 15:return this.begin("acc_title"),32;break;case 16:return this.popState(),"acc_title_value";break;case 17:return this.begin("acc_descr"),34;break;case 18:return this.popState(),"acc_descr_value";break;case 19:this.begin("acc_descr_multiline");break;case 20:this.popState();break;case 21:return"acc_descr_multiline_value";case 22:return this.pushState("CLASSDEF"),37;break;case 23:return this.popState(),this.pushState("CLASSDEFID"),"DEFAULT_CLASSDEF_ID";break;case 24:return this.popState(),this.pushState("CLASSDEFID"),38;break;case 25:return this.popState(),39;break;case 26:return this.pushState("CLASS"),41;break;case 27:return this.popState(),this.pushState("CLASS_STYLE"),42;break;case 28:return this.popState(),43;break;case 29:return this.pushState("SCALE"),16;break;case 30:return 17;case 31:this.popState();break;case 32:this.pushState("STATE");break;case 33:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),24;break;case 34:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;break;case 35:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),26;break;case 36:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),24;break;case 37:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),25;break;case 38:return this.popState(),i.yytext=i.yytext.slice(0,-10).trim(),26;break;case 39:return 44;case 40:return 45;case 41:return 46;case 42:return 47;case 43:this.pushState("STATE_STRING");break;case 44:return this.pushState("STATE_ID"),"AS";break;case 45:return this.popState(),"ID";break;case 46:this.popState();break;case 47:return"STATE_DESCR";case 48:return 18;case 49:this.popState();break;case 50:return this.popState(),this.pushState("struct"),19;break;case 51:break;case 52:return this.popState(),20;break;case 53:break;case 54:return this.begin("NOTE"),28;break;case 55:return this.popState(),this.pushState("NOTE_ID"),52;break;case 56:return this.popState(),this.pushState("NOTE_ID"),53;break;case 57:this.popState(),this.pushState("FLOATING_NOTE");break;case 58:return this.popState(),this.pushState("FLOATING_NOTE_ID"),"AS";break;case 59:break;case 60:return"NOTE_TEXT";case 61:return this.popState(),"ID";break;case 62:return this.popState(),this.pushState("NOTE_TEXT"),23;break;case 63:return this.popState(),i.yytext=i.yytext.substr(2).trim(),30;break;case 64:return this.popState(),i.yytext=i.yytext.slice(0,-8).trim(),30;break;case 65:return 6;case 66:return 6;case 67:return 15;case 68:return 50;case 69:return 23;case 70:return i.yytext=i.yytext.trim(),13;break;case 71:return 14;case 72:return 27;case 73:return 51;case 74:return 5;case 75:return"INVALID"}},"anonymous"),rules:[/^(?:default\b)/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:[\s]+)/i,/^(?:((?!\n)\s)+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:classDef\s+)/i,/^(?:DEFAULT\s+)/i,/^(?:\w+\s+)/i,/^(?:[^\n]*)/i,/^(?:class\s+)/i,/^(?:(\w+)+((,\s*\w+)*))/i,/^(?:[^\n]*)/i,/^(?:scale\s+)/i,/^(?:\d+)/i,/^(?:\s+width\b)/i,/^(?:state\s+)/i,/^(?:.*<<fork>>)/i,/^(?:.*<<join>>)/i,/^(?:.*<<choice>>)/i,/^(?:.*\[\[fork\]\])/i,/^(?:.*\[\[join\]\])/i,/^(?:.*\[\[choice\]\])/i,/^(?:.*direction\s+TB[^\n]*)/i,/^(?:.*direction\s+BT[^\n]*)/i,/^(?:.*direction\s+RL[^\n]*)/i,/^(?:.*direction\s+LR[^\n]*)/i,/^(?:["])/i,/^(?:\s*as\s+)/i,/^(?:[^\n\{]*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n\s\{]+)/i,/^(?:\n)/i,/^(?:\{)/i,/^(?:%%(?!\{)[^\n]*)/i,/^(?:\})/i,/^(?:[\n])/i,/^(?:note\s+)/i,/^(?:left of\b)/i,/^(?:right of\b)/i,/^(?:")/i,/^(?:\s*as\s*)/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[^\n]*)/i,/^(?:\s*[^:\n\s\-]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:[\s\S]*?end note\b)/i,/^(?:stateDiagram\s+)/i,/^(?:stateDiagram-v2\s+)/i,/^(?:hide empty description\b)/i,/^(?:\[\*\])/i,/^(?:[^:\n\s\-\{]+)/i,/^(?:\s*:[^:\n;]+)/i,/^(?:-->)/i,/^(?:--)/i,/^(?::::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{LINE:{rules:[9,10],inclusive:!1},struct:{rules:[9,10,22,26,32,39,40,41,42,51,52,53,54,68,69,70,71,72],inclusive:!1},FLOATING_NOTE_ID:{rules:[61],inclusive:!1},FLOATING_NOTE:{rules:[58,59,60],inclusive:!1},NOTE_TEXT:{rules:[63,64],inclusive:!1},NOTE_ID:{rules:[62],inclusive:!1},NOTE:{rules:[55,56,57],inclusive:!1},CLASS_STYLE:{rules:[28],inclusive:!1},CLASS:{rules:[27],inclusive:!1},CLASSDEFID:{rules:[25],inclusive:!1},CLASSDEF:{rules:[23,24],inclusive:!1},acc_descr_multiline:{rules:[20,21],inclusive:!1},acc_descr:{rules:[18],inclusive:!1},acc_title:{rules:[16],inclusive:!1},SCALE:{rules:[13,14,30,31],inclusive:!1},ALIAS:{rules:[],inclusive:!1},STATE_ID:{rules:[45],inclusive:!1},STATE_STRING:{rules:[46,47],inclusive:!1},FORK_STATE:{rules:[],inclusive:!1},STATE:{rules:[9,10,33,34,35,36,37,38,43,44,48,49,50],inclusive:!1},ID:{rules:[9,10],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,8,10,11,12,15,17,19,22,26,29,32,50,54,65,66,67,68,69,70,71,73,74,75],inclusive:!0}}};return C}();pt.lexer=te;function yt(){this.yy={}}return n(yt,"Parser"),yt.prototype=pt,pt.Parser=yt,new yt}();Tt.parser=Tt;var Ie=Tt;var Ft="LR",Ne="TB",lt="state",_t="relation",Vt="classDef",Yt="applyClass",ct="default",Gt="divider";var At="[*]",zt="start",Ht=At,Xt="end",Mt="color",Ut="fill",re="bgFill",ne=",";function Kt(){return{}}n(Kt,"newClassesList");var Wt=Ft,ft=[],Y=Kt(),Jt=n(()=>({relations:[],states:{},documents:{}}),"newDoc"),dt={root:Jt()},g=dt.root,G=0,jt=0,ae={LINE:0,DOTTED_LINE:1},oe={AGGREGATION:0,EXTENSION:1,COMPOSITION:2,DEPENDENCY:3},ht=n(t=>JSON.parse(JSON.stringify(t)),"clone"),le=n(t=>{E.info("Setting root doc",t),ft=t},"setRootDoc"),ce=n(()=>ft,"getRootDoc"),ut=n((t,s,o)=>{if(s.stmt===_t)ut(t,s.state1,!0),ut(t,s.state2,!1);else if(s.stmt===lt&&(s.id==="[*]"?(s.id=o?t.id+"_start":t.id+"_end",s.start=o):s.id=s.id.trim()),s.doc){let u=[],p=[],y;for(y=0;y<s.doc.length;y++)if(s.doc[y].type===Gt){let S=ht(s.doc[y]);S.doc=ht(p),u.push(S),p=[]}else p.push(s.doc[y]);if(u.length>0&&p.length>0){let S={stmt:lt,id:vt(),type:"divider",doc:ht(p)};u.push(ht(S)),s.doc=u}s.doc.forEach(S=>ut(s,S,!0))}},"docTranslator"),he=n(()=>(ut({id:"root"},{id:"root",doc:ft},!0),{id:"root",doc:ft}),"getRootDocV2"),ue=n(t=>{let s;t.doc?s=t.doc:s=t,E.info(s),qt(!0),E.info("Extract",s),s.forEach(o=>{switch(o.stmt){case lt:O(o.id.trim(),o.type,o.doc,o.description,o.note,o.classes,o.styles,o.textStyles);break;case _t:Qt(o.state1,o.state2,o.description);break;case Vt:Zt(o.id.trim(),o.classes);break;case Yt:Ct(o.id.trim(),o.styleClass);break}})},"extract"),O=n(function(t,s=ct,o=null,u=null,p=null,y=null,S=null,x=null){let d=t?.trim();g.states[d]===void 0?(E.info("Adding state ",d,u),g.states[d]={id:d,descriptions:[],type:s,doc:o,note:p,classes:[],styles:[],textStyles:[]}):(g.states[d].doc||(g.states[d].doc=o),g.states[d].type||(g.states[d].type=s)),u&&(E.info("Setting state description",d,u),typeof u=="string"&&Dt(d,u.trim()),typeof u=="object"&&u.forEach(D=>Dt(d,D.trim()))),p&&(g.states[d].note=p,g.states[d].note.text=V.sanitizeText(g.states[d].note.text,w())),y&&(E.info("Setting state classes",d,y),(typeof y=="string"?[y]:y).forEach(_=>Ct(d,_.trim()))),S&&(E.info("Setting state styles",d,S),(typeof S=="string"?[S]:S).forEach(_=>Te(d,_.trim()))),x&&(E.info("Setting state styles",d,S),(typeof x=="string"?[x]:x).forEach(_=>_e(d,_.trim())))},"addState"),qt=n(function(t){dt={root:Jt()},g=dt.root,G=0,Y=Kt(),t||Ot()},"clear"),M=n(function(t){return g.states[t]},"getState"),fe=n(function(){return g.states},"getStates"),de=n(function(){E.info("Documents = ",dt)},"logDocuments"),pe=n(function(){return g.relations},"getRelations");function Et(t=""){let s=t;return t===At&&(G++,s=`${zt}${G}`),s}n(Et,"startIdIfNeeded");function xt(t="",s=ct){return t===At?zt:s}n(xt,"startTypeIfNeeded");function ye(t=""){let s=t;return t===Ht&&(G++,s=`${Xt}${G}`),s}n(ye,"endIdIfNeeded");function Se(t="",s=ct){return t===Ht?Xt:s}n(Se,"endTypeIfNeeded");function ke(t,s,o){let u=Et(t.id.trim()),p=xt(t.id.trim(),t.type),y=Et(s.id.trim()),S=xt(s.id.trim(),s.type);O(u,p,t.doc,t.description,t.note,t.classes,t.styles,t.textStyles),O(y,S,s.doc,s.description,s.note,s.classes,s.styles,s.textStyles),g.relations.push({id1:u,id2:y,relationTitle:V.sanitizeText(o,w())})}n(ke,"addRelationObjs");var Qt=n(function(t,s,o){if(typeof t=="object")ke(t,s,o);else{let u=Et(t.trim()),p=xt(t),y=ye(s.trim()),S=Se(s);O(u,p),O(y,S),g.relations.push({id1:u,id2:y,title:V.sanitizeText(o,w())})}},"addRelation"),Dt=n(function(t,s){let o=g.states[t],u=s.startsWith(":")?s.replace(":","").trim():s;o.descriptions.push(V.sanitizeText(u,w()))},"addDescription"),ge=n(function(t){return t.substring(0,1)===":"?t.substr(2).trim():t.trim()},"cleanupLabel"),be=n(()=>(jt++,"divider-id-"+jt),"getDividerId"),Zt=n(function(t,s=""){Y[t]===void 0&&(Y[t]={id:t,styles:[],textStyles:[]});let o=Y[t];s?.split(ne).forEach(u=>{let p=u.replace(/([^;]*);/,"$1").trim();if(u.match(Mt)){let S=p.replace(Ut,re).replace(Mt,Ut);o.textStyles.push(S)}o.styles.push(p)})},"addStyleClass"),me=n(function(){return Y},"getClasses"),Ct=n(function(t,s){t.split(",").forEach(function(o){let u=M(o);if(u===void 0){let p=o.trim();O(p),u=M(p)}u.classes.push(s)})},"setCssClass"),Te=n(function(t,s){let o=M(t);o!==void 0&&o.textStyles.push(s)},"setStyle"),_e=n(function(t,s){let o=M(t);o!==void 0&&o.textStyles.push(s)},"setTextStyle"),Ee=n(()=>Wt,"getDirection"),xe=n(t=>{Wt=t},"setDirection"),De=n(t=>t&&t[0]===":"?t.substr(1).trim():t.trim(),"trimColon"),Ye={getConfig:()=>w().state,addState:O,clear:qt,getState:M,getStates:fe,getRelations:pe,getClasses:me,getDirection:Ee,addRelation:Qt,getDividerId:be,setDirection:xe,cleanupLabel:ge,lineType:ae,relationType:oe,logDocuments:de,getRootDoc:ce,setRootDoc:le,getRootDocV2:he,extract:ue,trimColon:De,getAccTitle:Rt,setAccTitle:Nt,getAccDescription:Bt,setAccDescription:wt,addStyleClass:Zt,setCssClass:Ct,addDescription:Dt,setDiagramTitle:$t,getDiagramTitle:Pt};var Ae=n(t=>`
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
`,"getStyles"),Ue=Ae;export{Ie as a,Ft as b,Ne as c,lt as d,_t as e,ct as f,Gt as g,Ye as h,Ue as i};
