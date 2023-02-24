"use strict";
import{s as mt}from"./chunk-LFAWHMOD.mjs";import"./chunk-YJU3MKRE.mjs";import"./chunk-QJ3EQYPD.mjs";import{a as ct}from"./chunk-JGEKJJ2K.mjs";import{a as ht,b as ut,c as pt,d as yt,e as ft,f as dt,g as gt}from"./chunk-K4VM4JX7.mjs";import{ga as A,h as W,u as Q}from"./chunk-IVQLRXYF.mjs";import{c as a}from"./chunk-AXW634CS.mjs";var D=function(){var t=a(function(_,s,o,h){for(o=o||{},h=_.length;h--;o[_[h]]=s);return o},"o"),e=[1,2],r=[1,5],n=[6,9,11,17,18,20,22,23,24,26],i=[1,15],u=[1,16],c=[1,17],y=[1,18],p=[1,19],k=[1,20],m=[1,24],x=[4,6,9,11,17,18,20,22,23,24,26],f={trace:a(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,directive:7,line:8,SPACE:9,statement:10,NEWLINE:11,openDirective:12,typeDirective:13,closeDirective:14,":":15,argDirective:16,title:17,acc_title:18,acc_title_value:19,acc_descr:20,acc_descr_value:21,acc_descr_multiline_value:22,section:23,taskName:24,taskData:25,open_directive:26,type_directive:27,arg_directive:28,close_directive:29,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",9:"SPACE",11:"NEWLINE",15:":",17:"title",18:"acc_title",19:"acc_title_value",20:"acc_descr",21:"acc_descr_value",22:"acc_descr_multiline_value",23:"section",24:"taskName",25:"taskData",26:"open_directive",27:"type_directive",28:"arg_directive",29:"close_directive"},productions_:[0,[3,3],[3,2],[5,0],[5,2],[8,2],[8,1],[8,1],[8,1],[7,4],[7,6],[10,1],[10,2],[10,2],[10,1],[10,1],[10,2],[10,1],[12,1],[13,1],[16,1],[14,1]],performAction:a(function(s,o,h,d,g,l,B){var b=l.length-1;switch(g){case 1:return l[b-1];case 3:this.$=[];break;case 4:l[b-1].push(l[b]),this.$=l[b-1];break;case 5:case 6:this.$=l[b];break;case 7:case 8:this.$=[];break;case 11:d.setDiagramTitle(l[b].substr(6)),this.$=l[b].substr(6);break;case 12:this.$=l[b].trim(),d.setAccTitle(this.$);break;case 13:case 14:this.$=l[b].trim(),d.setAccDescription(this.$);break;case 15:d.addSection(l[b].substr(8)),this.$=l[b].substr(8);break;case 16:d.addTask(l[b-1],l[b]),this.$="task";break;case 18:d.parseDirective("%%{","open_directive");break;case 19:d.parseDirective(l[b],"type_directive");break;case 20:l[b]=l[b].trim().replace(/'/g,'"'),d.parseDirective(l[b],"arg_directive");break;case 21:d.parseDirective("}%%","close_directive","journey");break}},"anonymous"),table:[{3:1,4:e,7:3,12:4,26:r},{1:[3]},t(n,[2,3],{5:6}),{3:7,4:e,7:3,12:4,26:r},{13:8,27:[1,9]},{27:[2,18]},{6:[1,10],7:21,8:11,9:[1,12],10:13,11:[1,14],12:4,17:i,18:u,20:c,22:y,23:p,24:k,26:r},{1:[2,2]},{14:22,15:[1,23],29:m},t([15,29],[2,19]),t(n,[2,8],{1:[2,1]}),t(n,[2,4]),{7:21,10:25,12:4,17:i,18:u,20:c,22:y,23:p,24:k,26:r},t(n,[2,6]),t(n,[2,7]),t(n,[2,11]),{19:[1,26]},{21:[1,27]},t(n,[2,14]),t(n,[2,15]),{25:[1,28]},t(n,[2,17]),{11:[1,29]},{16:30,28:[1,31]},{11:[2,21]},t(n,[2,5]),t(n,[2,12]),t(n,[2,13]),t(n,[2,16]),t(x,[2,9]),{14:32,29:m},{29:[2,20]},{11:[1,33]},t(x,[2,10])],defaultActions:{5:[2,18],7:[2,2],24:[2,21],31:[2,20]},parseError:a(function(s,o){if(o.recoverable)this.trace(s);else{var h=new Error(s);throw h.hash=o,h}},"parseError"),parse:a(function(s){var o=this,h=[0],d=[],g=[null],l=[],B=this.table,b="",Y=0,st=0,at=0,St=2,ot=1,Et=l.slice.call(arguments,1),v=Object.create(this.lexer),C={yy:{}};for(var X in this.yy)Object.prototype.hasOwnProperty.call(this.yy,X)&&(C.yy[X]=this.yy[X]);v.setInput(s,C.yy),C.yy.lexer=v,C.yy.parser=this,typeof v.yylloc=="undefined"&&(v.yylloc={});var U=v.yylloc;l.push(U);var $t=v.options&&v.options.ranges;typeof C.yy.parseError=="function"?this.parseError=C.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Kt(S){h.length=h.length-2*S,g.length=g.length-S,l.length=l.length-S}a(Kt,"popStack");function Pt(){var S;return S=d.pop()||v.lex()||ot,typeof S!="number"&&(S instanceof Array&&(d=S,S=d.pop()),S=o.symbols_[S]||S),S}a(Pt,"lex");for(var T,Z,V,E,Qt,J,L={},q,P,lt,O;;){if(V=h[h.length-1],this.defaultActions[V]?E=this.defaultActions[V]:((T===null||typeof T=="undefined")&&(T=Pt()),E=B[V]&&B[V][T]),typeof E=="undefined"||!E.length||!E[0]){var K="";O=[];for(q in B[V])this.terminals_[q]&&q>St&&O.push("'"+this.terminals_[q]+"'");v.showPosition?K="Parse error on line "+(Y+1)+`:
`+v.showPosition()+`
Expecting `+O.join(", ")+", got '"+(this.terminals_[T]||T)+"'":K="Parse error on line "+(Y+1)+": Unexpected "+(T==ot?"end of input":"'"+(this.terminals_[T]||T)+"'"),this.parseError(K,{text:v.match,token:this.terminals_[T]||T,line:v.yylineno,loc:U,expected:O})}if(E[0]instanceof Array&&E.length>1)throw new Error("Parse Error: multiple actions possible at state: "+V+", token: "+T);switch(E[0]){case 1:h.push(T),g.push(v.yytext),l.push(v.yylloc),h.push(E[1]),T=null,Z?(T=Z,Z=null):(st=v.yyleng,b=v.yytext,Y=v.yylineno,U=v.yylloc,at>0&&at--);break;case 2:if(P=this.productions_[E[1]][1],L.$=g[g.length-P],L._$={first_line:l[l.length-(P||1)].first_line,last_line:l[l.length-1].last_line,first_column:l[l.length-(P||1)].first_column,last_column:l[l.length-1].last_column},$t&&(L._$.range=[l[l.length-(P||1)].range[0],l[l.length-1].range[1]]),J=this.performAction.apply(L,[b,st,Y,C.yy,E[1],g,l].concat(Et)),typeof J!="undefined")return J;P&&(h=h.slice(0,-1*P*2),g=g.slice(0,-1*P),l=l.slice(0,-1*P)),h.push(this.productions_[E[1]][0]),g.push(L.$),l.push(L._$),lt=B[h[h.length-2]][h[h.length-1]],h.push(lt);break;case 3:return!0}}return!0},"parse")},M=function(){var _={EOF:1,parseError:a(function(o,h){if(this.yy.parser)this.yy.parser.parseError(o,h);else throw new Error(o)},"parseError"),setInput:function(s,o){return this.yy=o||this.yy||{},this._input=s,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var s=this._input[0];this.yytext+=s,this.yyleng++,this.offset++,this.match+=s,this.matched+=s;var o=s.match(/(?:\r\n?|\n).*/g);return o?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),s},unput:function(s){var o=s.length,h=s.split(/(?:\r\n?|\n)/g);this._input=s+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-o),this.offset-=o;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var g=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===d.length?this.yylloc.first_column:0)+d[d.length-h.length].length-h[0].length:this.yylloc.first_column-o},this.options.ranges&&(this.yylloc.range=[g[0],g[0]+this.yyleng-o]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(s){this.unput(this.match.slice(s))},pastInput:function(){var s=this.matched.substr(0,this.matched.length-this.match.length);return(s.length>20?"...":"")+s.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var s=this.match;return s.length<20&&(s+=this._input.substr(0,20-s.length)),(s.substr(0,20)+(s.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var s=this.pastInput(),o=new Array(s.length+1).join("-");return s+this.upcomingInput()+`
`+o+"^"},test_match:function(s,o){var h,d,g;if(this.options.backtrack_lexer&&(g={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(g.yylloc.range=this.yylloc.range.slice(0))),d=s[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+s[0].length},this.yytext+=s[0],this.match+=s[0],this.matches=s,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(s[0].length),this.matched+=s[0],h=this.performAction.call(this,this.yy,this,o,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var l in g)this[l]=g[l];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var s,o,h,d;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),l=0;l<g.length;l++)if(h=this._input.match(this.rules[g[l]]),h&&(!o||h[0].length>o[0].length)){if(o=h,d=l,this.options.backtrack_lexer){if(s=this.test_match(h,g[l]),s!==!1)return s;if(this._backtrack){o=!1;continue}else return!1}else if(!this.options.flex)break}return o?(s=this.test_match(o,g[d]),s!==!1?s:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:a(function(){var o=this.next();return o||this.lex()},"lex"),begin:a(function(o){this.conditionStack.push(o)},"begin"),popState:a(function(){var o=this.conditionStack.length-1;return o>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:a(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:a(function(o){return o=this.conditionStack.length-1-Math.abs(o||0),o>=0?this.conditionStack[o]:"INITIAL"},"topState"),pushState:a(function(o){this.begin(o)},"pushState"),stateStackSize:a(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:a(function(o,h,d,g){var l=g;switch(d){case 0:return this.begin("open_directive"),26;break;case 1:return this.begin("type_directive"),27;break;case 2:return this.popState(),this.begin("arg_directive"),15;break;case 3:return this.popState(),this.popState(),29;break;case 4:return 28;case 5:break;case 6:break;case 7:return 11;case 8:break;case 9:break;case 10:return 4;case 11:return 17;case 12:return this.begin("acc_title"),18;break;case 13:return this.popState(),"acc_title_value";break;case 14:return this.begin("acc_descr"),20;break;case 15:return this.popState(),"acc_descr_value";break;case 16:this.begin("acc_descr_multiline");break;case 17:this.popState();break;case 18:return"acc_descr_multiline_value";case 19:return 23;case 20:return 24;case 21:return 25;case 22:return 15;case 23:return 6;case 24:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{open_directive:{rules:[1],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},acc_descr_multiline:{rules:[17,18],inclusive:!1},acc_descr:{rules:[15],inclusive:!1},acc_title:{rules:[13],inclusive:!1},INITIAL:{rules:[0,5,6,7,8,9,10,11,12,14,16,19,20,21,22,23,24],inclusive:!0}}};return _}();f.lexer=M;function w(){this.yy={}}return a(w,"Parser"),w.prototype=f,f.Parser=w,new w}();D.parser=D;var xt=D;var N="",tt=[],j=[],z=[],At=a(function(t,e,r){mt.parseDirective(this,t,e,r)},"parseDirective"),It=a(function(){tt.length=0,j.length=0,N="",z.length=0,ht()},"clear"),Ct=a(function(t){N=t,tt.push(t)},"addSection"),Vt=a(function(){return tt},"getSections"),Ft=a(function(){let t=kt(),e=100,r=0;for(;!t&&r<e;)t=kt(),r++;return j.push(...z),j},"getTasks"),Lt=a(function(){let t=[];return j.forEach(r=>{r.people&&t.push(...r.people)}),[...new Set(t)].sort()},"updateActors"),Nt=a(function(t,e){let r=e.substr(1).split(":"),n=0,i=[];r.length===1?(n=Number(r[0]),i=[]):(n=Number(r[0]),i=r[1].split(","));let u=i.map(y=>y.trim()),c={section:N,type:N,people:u,task:t,score:n};z.push(c)},"addTask"),Rt=a(function(t){let e={section:N,type:N,description:t,task:t,classes:[]};j.push(e)},"addTaskOrg"),kt=a(function(){let t=a(function(r){return z[r].processed},"compileTask"),e=!0;for(let[r,n]of z.entries())t(r),e=e&&n.processed;return e},"compileTasks"),Bt=a(function(){return Lt()},"getActors"),et={parseDirective:At,getConfig:()=>A().journey,clear:It,setDiagramTitle:dt,getDiagramTitle:gt,setAccTitle:ut,getAccTitle:pt,setAccDescription:yt,getAccDescription:ft,addSection:Ct,getSections:Vt,getTasks:Ft,addTask:Nt,addTaskOrg:Rt,getActors:Bt};var jt=a(t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,"getStyles"),_t=jt;var G=a(function(t,e){let r=t.append("rect");return r.attr("x",e.x),r.attr("y",e.y),r.attr("fill",e.fill),r.attr("stroke",e.stroke),r.attr("width",e.width),r.attr("height",e.height),r.attr("rx",e.rx),r.attr("ry",e.ry),e.class!==void 0&&r.attr("class",e.class),r},"drawRect"),zt=a(function(t,e){let n=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),i=t.append("g");i.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),i.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(p){let k=Q().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);p.append("path").attr("class","mouth").attr("d",k).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}a(u,"smile");function c(p){let k=Q().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);p.append("path").attr("class","mouth").attr("d",k).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}a(c,"sad");function y(p){p.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return a(y,"ambivalent"),e.score>3?u(i):e.score<3?c(i):y(i),n},"drawFace"),vt=a(function(t,e){let r=t.append("circle");return r.attr("cx",e.cx),r.attr("cy",e.cy),r.attr("class","actor-"+e.pos),r.attr("fill",e.fill),r.attr("stroke",e.stroke),r.attr("r",e.r),r.class!==void 0&&r.attr("class",r.class),e.title!==void 0&&r.append("title").text(e.title),r},"drawCircle"),wt=a(function(t,e){let r=e.text.replace(/<br\s*\/?>/gi," "),n=t.append("text");n.attr("x",e.x),n.attr("y",e.y),n.attr("class","legend"),n.style("text-anchor",e.anchor),e.class!==void 0&&n.attr("class",e.class);let i=n.append("tspan");return i.attr("x",e.x+e.textMargin*2),i.text(r),n},"drawText"),Yt=a(function(t,e){function r(i,u,c,y,p){return i+","+u+" "+(i+c)+","+u+" "+(i+c)+","+(u+y-p)+" "+(i+c-p*1.2)+","+(u+y)+" "+i+","+(u+y)}a(r,"genPoints");let n=t.append("polygon");n.attr("points",r(e.x,e.y,50,20,7)),n.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,wt(t,e)},"drawLabel"),qt=a(function(t,e,r){let n=t.append("g"),i=rt();i.x=e.x,i.y=e.y,i.fill=e.fill,i.width=r.width,i.height=r.height,i.class="journey-section section-type-"+e.num,i.rx=3,i.ry=3,G(n,i),Tt(r)(e.text,n,i.x,i.y,i.width,i.height,{class:"journey-section section-type-"+e.num},r,e.colour)},"drawSection"),bt=-1,Ot=a(function(t,e,r){let n=e.x+r.width/2,i=t.append("g");bt++;let u=300+5*30;i.append("line").attr("id","task"+bt).attr("x1",n).attr("y1",e.y).attr("x2",n).attr("y2",u).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),zt(i,{cx:n,cy:300+(5-e.score)*30,score:e.score});let c=rt();c.x=e.x,c.y=e.y,c.fill=e.fill,c.width=r.width,c.height=r.height,c.class="task task-type-"+e.num,c.rx=3,c.ry=3,G(i,c);let y=e.x+14;e.people.forEach(p=>{let k=e.actors[p].color,m={cx:y,cy:e.y,r:7,fill:k,stroke:"#000",title:p,pos:e.actors[p].position};vt(i,m),y+=10}),Tt(r)(e.task,i,c.x,c.y,c.width,c.height,{class:"task"},r,e.colour)},"drawTask"),Wt=a(function(t,e){G(t,{x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,class:"rect"}).lower()},"drawBackgroundRect"),Gt=a(function(){return{x:0,y:0,fill:void 0,"text-anchor":"start",width:100,height:100,textMargin:0,rx:0,ry:0}},"getTextObj"),rt=a(function(){return{x:0,y:0,width:100,anchor:"start",height:100,rx:0,ry:0}},"getNoteRect"),Tt=function(){function t(i,u,c,y,p,k,m,x){let f=u.append("text").attr("x",c+p/2).attr("y",y+k/2+5).style("font-color",x).style("text-anchor","middle").text(i);n(f,m)}a(t,"byText");function e(i,u,c,y,p,k,m,x,f){let{taskFontSize:M,taskFontFamily:w}=x,_=i.split(/<br\s*\/?>/gi);for(let s=0;s<_.length;s++){let o=s*M-M*(_.length-1)/2,h=u.append("text").attr("x",c+p/2).attr("y",y).attr("fill",f).style("text-anchor","middle").style("font-size",M).style("font-family",w);h.append("tspan").attr("x",c+p/2).attr("dy",o).text(_[s]),h.attr("y",y+k/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),n(h,m)}}a(e,"byTspan");function r(i,u,c,y,p,k,m,x){let f=u.append("switch"),w=f.append("foreignObject").attr("x",c).attr("y",y).attr("width",p).attr("height",k).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");w.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(i),e(i,f,c,y,p,k,m,x),n(w,m)}a(r,"byFo");function n(i,u){for(let c in u)c in u&&i.attr(c,u[c])}return a(n,"_setTextAttrs"),function(i){return i.textPlacement==="fo"?r:i.textPlacement==="old"?t:e}}(),Ht=a(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),R={drawRect:G,drawCircle:vt,drawSection:qt,drawText:wt,drawLabel:Yt,drawTask:Ot,drawBackgroundRect:Wt,getTextObj:Gt,getNoteRect:rt,initGraphics:Ht};var Xt=a(function(t){Object.keys(t).forEach(function(r){H[r]=t[r]})},"setConf"),I={};function Ut(t){let e=A().journey,r=60;Object.keys(I).forEach(n=>{let i=I[n].color,u={cx:20,cy:r,r:7,fill:i,stroke:"#000",pos:I[n].position};R.drawCircle(t,u);let c={x:40,y:r+7,fill:"#666",text:n,textMargin:e.boxTextMargin|5};R.drawText(t,c),r+=20})}a(Ut,"drawActorLegend");var H=A().journey,F=H.leftMargin,Zt=a(function(t,e,r,n){let i=A().journey;n.db.clear(),n.parser.parse(t+`
`);let u=A().securityLevel,c;u==="sandbox"&&(c=W("#i"+e));let y=u==="sandbox"?W(c.nodes()[0].contentDocument.body):W("body");$.init();let p=y.select("#"+e);R.initGraphics(p);let k=n.db.getTasks(),m=n.db.getDiagramTitle(),x=n.db.getActors();for(let o in I)delete I[o];let f=0;x.forEach(o=>{I[o]={color:i.actorColours[f%i.actorColours.length],position:f},f++}),Ut(p),$.insert(0,0,F,Object.keys(I).length*50),Jt(p,k,0);let M=$.getBounds();m&&p.append("text").text(m).attr("x",F).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);let w=M.stopy-M.starty+2*i.diagramMarginY,_=F+M.stopx+2*i.diagramMarginX;ct(p,w,_,i.useMaxWidth),p.append("line").attr("x1",F).attr("y1",i.height*4).attr("x2",_-F-4).attr("y2",i.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let s=m?70:0;p.attr("viewBox",`${M.startx} -25 ${_} ${w+s}`),p.attr("preserveAspectRatio","xMinYMin meet"),p.attr("height",w+s+25)},"draw"),$={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,r,n){t[e]===void 0?t[e]=r:t[e]=n(r,t[e])},updateBounds:function(t,e,r,n){let i=A().journey,u=this,c=0;function y(p){return a(function(m){c++;let x=u.sequenceItems.length-c+1;u.updateVal(m,"starty",e-x*i.boxMargin,Math.min),u.updateVal(m,"stopy",n+x*i.boxMargin,Math.max),u.updateVal($.data,"startx",t-x*i.boxMargin,Math.min),u.updateVal($.data,"stopx",r+x*i.boxMargin,Math.max),p!=="activation"&&(u.updateVal(m,"startx",t-x*i.boxMargin,Math.min),u.updateVal(m,"stopx",r+x*i.boxMargin,Math.max),u.updateVal($.data,"starty",e-x*i.boxMargin,Math.min),u.updateVal($.data,"stopy",n+x*i.boxMargin,Math.max))},"updateItemBounds")}a(y,"updateFn"),this.sequenceItems.forEach(y())},insert:function(t,e,r,n){let i=Math.min(t,r),u=Math.max(t,r),c=Math.min(e,n),y=Math.max(e,n);this.updateVal($.data,"startx",i,Math.min),this.updateVal($.data,"starty",c,Math.min),this.updateVal($.data,"stopx",u,Math.max),this.updateVal($.data,"stopy",y,Math.max),this.updateBounds(i,c,u,y)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},it=H.sectionFills,Mt=H.sectionColours,Jt=a(function(t,e,r){let n=A().journey,i="",u=n.height*2+n.diagramMarginY,c=r+u,y=0,p="#CCC",k="black",m=0;for(let[x,f]of e.entries()){if(i!==f.section){p=it[y%it.length],m=y%it.length,k=Mt[y%Mt.length];let w={x:x*n.taskMargin+x*n.width+F,y:50,text:f.section,fill:p,num:m,colour:k};R.drawSection(t,w,n),i=f.section,y++}let M=f.people.reduce((w,_)=>(I[_]&&(w[_]=I[_]),w),{});f.x=x*n.taskMargin+x*n.width+F,f.y=c,f.width=n.diagramMarginX,f.height=n.diagramMarginY,f.colour=k,f.fill=p,f.num=m,f.actors=M,R.drawTask(t,f,n),$.insert(f.x,f.y,f.x+f.width+n.taskMargin,300+5*30)}},"drawTasks"),nt={setConf:Xt,draw:Zt};var be={parser:xt,db:et,renderer:nt,styles:_t,init:t=>{nt.setConf(t.journey),et.clear()}};export{be as diagram};
