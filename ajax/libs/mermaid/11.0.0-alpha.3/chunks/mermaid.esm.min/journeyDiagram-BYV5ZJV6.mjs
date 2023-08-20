import{a as mt,b as xt,c as kt,f as K}from"./chunk-I7BR2WXJ.mjs";import{s as _t}from"./chunk-WP2Y5IRR.mjs";import"./chunk-ELPTGKJU.mjs";import{f as ht,g as ut,h as pt,i as ft,j as yt,k as dt,l as gt}from"./chunk-SHRXPEEC.mjs";import"./chunk-CQ3HXODQ.mjs";import{G as J,a as o,m as q,ra as P,ua as ct}from"./chunk-NJCFPDYV.mjs";var Q=function(){var t=o(function(_,n,a,h){for(a=a||{},h=_.length;h--;a[_[h]]=n);return a},"o"),e=[1,2],i=[1,5],s=[6,9,11,17,18,20,22,23,24,26],r=[1,15],u=[1,16],c=[1,17],f=[1,18],p=[1,19],k=[1,20],x=[1,24],m=[4,6,9,11,17,18,20,22,23,24,26],y={trace:o(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,directive:7,line:8,SPACE:9,statement:10,NEWLINE:11,openDirective:12,typeDirective:13,closeDirective:14,":":15,argDirective:16,title:17,acc_title:18,acc_title_value:19,acc_descr:20,acc_descr_value:21,acc_descr_multiline_value:22,section:23,taskName:24,taskData:25,open_directive:26,type_directive:27,arg_directive:28,close_directive:29,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",9:"SPACE",11:"NEWLINE",15:":",17:"title",18:"acc_title",19:"acc_title_value",20:"acc_descr",21:"acc_descr_value",22:"acc_descr_multiline_value",23:"section",24:"taskName",25:"taskData",26:"open_directive",27:"type_directive",28:"arg_directive",29:"close_directive"},productions_:[0,[3,3],[3,2],[5,0],[5,2],[8,2],[8,1],[8,1],[8,1],[7,4],[7,6],[10,1],[10,2],[10,2],[10,1],[10,1],[10,2],[10,1],[12,1],[13,1],[16,1],[14,1]],performAction:o(function(n,a,h,d,g,l,D){var b=l.length-1;switch(g){case 1:return l[b-1];case 3:this.$=[];break;case 4:l[b-1].push(l[b]),this.$=l[b-1];break;case 5:case 6:this.$=l[b];break;case 7:case 8:this.$=[];break;case 11:d.setDiagramTitle(l[b].substr(6)),this.$=l[b].substr(6);break;case 12:this.$=l[b].trim(),d.setAccTitle(this.$);break;case 13:case 14:this.$=l[b].trim(),d.setAccDescription(this.$);break;case 15:d.addSection(l[b].substr(8)),this.$=l[b].substr(8);break;case 16:d.addTask(l[b-1],l[b]),this.$="task";break;case 18:d.parseDirective("%%{","open_directive");break;case 19:d.parseDirective(l[b],"type_directive");break;case 20:l[b]=l[b].trim().replace(/'/g,'"'),d.parseDirective(l[b],"arg_directive");break;case 21:d.parseDirective("}%%","close_directive","journey");break}},"anonymous"),table:[{3:1,4:e,7:3,12:4,26:i},{1:[3]},t(s,[2,3],{5:6}),{3:7,4:e,7:3,12:4,26:i},{13:8,27:[1,9]},{27:[2,18]},{6:[1,10],7:21,8:11,9:[1,12],10:13,11:[1,14],12:4,17:r,18:u,20:c,22:f,23:p,24:k,26:i},{1:[2,2]},{14:22,15:[1,23],29:x},t([15,29],[2,19]),t(s,[2,8],{1:[2,1]}),t(s,[2,4]),{7:21,10:25,12:4,17:r,18:u,20:c,22:f,23:p,24:k,26:i},t(s,[2,6]),t(s,[2,7]),t(s,[2,11]),{19:[1,26]},{21:[1,27]},t(s,[2,14]),t(s,[2,15]),{25:[1,28]},t(s,[2,17]),{11:[1,29]},{16:30,28:[1,31]},{11:[2,21]},t(s,[2,5]),t(s,[2,12]),t(s,[2,13]),t(s,[2,16]),t(m,[2,9]),{14:32,29:x},{29:[2,20]},{11:[1,33]},t(m,[2,10])],defaultActions:{5:[2,18],7:[2,2],24:[2,21],31:[2,20]},parseError:o(function(n,a){if(a.recoverable)this.trace(n);else{var h=new Error(n);throw h.hash=a,h}},"parseError"),parse:o(function(n){var a=this,h=[0],d=[],g=[null],l=[],D=this.table,b="",z=0,st=0,at=0,Ct=2,ot=1,Pt=l.slice.call(arguments,1),w=Object.create(this.lexer),I={yy:{}};for(var X in this.yy)Object.prototype.hasOwnProperty.call(this.yy,X)&&(I.yy[X]=this.yy[X]);w.setInput(n,I.yy),I.yy.lexer=w,I.yy.parser=this,typeof w.yylloc>"u"&&(w.yylloc={});var G=w.yylloc;l.push(G);var At=w.options&&w.options.ranges;typeof I.yy.parseError=="function"?this.parseError=I.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Qt(M){h.length=h.length-2*M,g.length=g.length-M,l.length=l.length-M}o(Qt,"popStack");function It(){var M;return M=d.pop()||w.lex()||ot,typeof M!="number"&&(M instanceof Array&&(d=M,M=d.pop()),M=a.symbols_[M]||M),M}o(It,"lex");for(var T,H,V,$,te,U,L={},Y,C,lt,O;;){if(V=h[h.length-1],this.defaultActions[V]?$=this.defaultActions[V]:((T===null||typeof T>"u")&&(T=It()),$=D[V]&&D[V][T]),typeof $>"u"||!$.length||!$[0]){var Z="";O=[];for(Y in D[V])this.terminals_[Y]&&Y>Ct&&O.push("'"+this.terminals_[Y]+"'");w.showPosition?Z="Parse error on line "+(z+1)+`:
`+w.showPosition()+`
Expecting `+O.join(", ")+", got '"+(this.terminals_[T]||T)+"'":Z="Parse error on line "+(z+1)+": Unexpected "+(T==ot?"end of input":"'"+(this.terminals_[T]||T)+"'"),this.parseError(Z,{text:w.match,token:this.terminals_[T]||T,line:w.yylineno,loc:G,expected:O})}if($[0]instanceof Array&&$.length>1)throw new Error("Parse Error: multiple actions possible at state: "+V+", token: "+T);switch($[0]){case 1:h.push(T),g.push(w.yytext),l.push(w.yylloc),h.push($[1]),T=null,H?(T=H,H=null):(st=w.yyleng,b=w.yytext,z=w.yylineno,G=w.yylloc,at>0&&at--);break;case 2:if(C=this.productions_[$[1]][1],L.$=g[g.length-C],L._$={first_line:l[l.length-(C||1)].first_line,last_line:l[l.length-1].last_line,first_column:l[l.length-(C||1)].first_column,last_column:l[l.length-1].last_column},At&&(L._$.range=[l[l.length-(C||1)].range[0],l[l.length-1].range[1]]),U=this.performAction.apply(L,[b,st,z,I.yy,$[1],g,l].concat(Pt)),typeof U<"u")return U;C&&(h=h.slice(0,-1*C*2),g=g.slice(0,-1*C),l=l.slice(0,-1*C)),h.push(this.productions_[$[1]][0]),g.push(L.$),l.push(L._$),lt=D[h[h.length-2]][h[h.length-1]],h.push(lt);break;case 3:return!0}}return!0},"parse")},S=function(){var _={EOF:1,parseError:o(function(a,h){if(this.yy.parser)this.yy.parser.parseError(a,h);else throw new Error(a)},"parseError"),setInput:function(n,a){return this.yy=a||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var a=n.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var a=n.length,h=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var g=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===d.length?this.yylloc.first_column:0)+d[d.length-h.length].length-h[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[g[0],g[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),a=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+a+"^"},test_match:function(n,a){var h,d,g;if(this.options.backtrack_lexer&&(g={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(g.yylloc.range=this.yylloc.range.slice(0))),d=n[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],h=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var l in g)this[l]=g[l];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,a,h,d;this._more||(this.yytext="",this.match="");for(var g=this._currentRules(),l=0;l<g.length;l++)if(h=this._input.match(this.rules[g[l]]),h&&(!a||h[0].length>a[0].length)){if(a=h,d=l,this.options.backtrack_lexer){if(n=this.test_match(h,g[l]),n!==!1)return n;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(n=this.test_match(a,g[d]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:o(function(){var a=this.next();return a||this.lex()},"lex"),begin:o(function(a){this.conditionStack.push(a)},"begin"),popState:o(function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:o(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:o(function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},"topState"),pushState:o(function(a){this.begin(a)},"pushState"),stateStackSize:o(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:o(function(a,h,d,g){var l=g;switch(d){case 0:return this.begin("open_directive"),26;break;case 1:return this.begin("type_directive"),27;break;case 2:return this.popState(),this.begin("arg_directive"),15;break;case 3:return this.popState(),this.popState(),29;break;case 4:return 28;case 5:break;case 6:break;case 7:return 11;case 8:break;case 9:break;case 10:return 4;case 11:return 17;case 12:return this.begin("acc_title"),18;break;case 13:return this.popState(),"acc_title_value";break;case 14:return this.begin("acc_descr"),20;break;case 15:return this.popState(),"acc_descr_value";break;case 16:this.begin("acc_descr_multiline");break;case 17:this.popState();break;case 18:return"acc_descr_multiline_value";case 19:return 23;case 20:return 24;case 21:return 25;case 22:return 15;case 23:return 6;case 24:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{open_directive:{rules:[1],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},acc_descr_multiline:{rules:[17,18],inclusive:!1},acc_descr:{rules:[15],inclusive:!1},acc_title:{rules:[13],inclusive:!1},INITIAL:{rules:[0,5,6,7,8,9,10,11,12,14,16,19,20,21,22,23,24],inclusive:!0}}};return _}();y.lexer=S;function v(){this.yy={}}return o(v,"Parser"),v.prototype=y,y.Parser=v,new v}();Q.parser=Q;var bt=Q;var R="",tt=[],B=[],j=[],Vt=o(function(t,e,i){_t.parseDirective(this,t,e,i)},"parseDirective"),Ft=o(function(){tt.length=0,B.length=0,R="",j.length=0,ht()},"clear"),Lt=o(function(t){R=t,tt.push(t)},"addSection"),Rt=o(function(){return tt},"getSections"),Nt=o(function(){let t=vt(),e=100,i=0;for(;!t&&i<e;)t=vt(),i++;return B.push(...j),B},"getTasks"),Dt=o(function(){let t=[];return B.forEach(i=>{i.people&&t.push(...i.people)}),[...new Set(t)].sort()},"updateActors"),Bt=o(function(t,e){let i=e.substr(1).split(":"),s=0,r=[];i.length===1?(s=Number(i[0]),r=[]):(s=Number(i[0]),r=i[1].split(","));let u=r.map(f=>f.trim()),c={section:R,type:R,people:u,task:t,score:s};j.push(c)},"addTask"),jt=o(function(t){let e={section:R,type:R,description:t,task:t,classes:[]};B.push(e)},"addTaskOrg"),vt=o(function(){let t=o(function(i){return j[i].processed},"compileTask"),e=!0;for(let[i,s]of j.entries())t(i),e=e&&s.processed;return e},"compileTasks"),zt=o(function(){return Dt()},"getActors"),et={parseDirective:Vt,getConfig:()=>P().journey,clear:Ft,setDiagramTitle:dt,getDiagramTitle:gt,setAccTitle:ut,getAccTitle:pt,setAccDescription:ft,getAccDescription:yt,addSection:Lt,getSections:Rt,getTasks:Nt,addTask:Bt,addTaskOrg:jt,getActors:zt};var Yt=o(t=>`.label {
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
`,"getStyles"),wt=Yt;var rt=o(function(t,e){return mt(t,e)},"drawRect"),Ot=o(function(t,e){let s=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),r=t.append("g");r.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),r.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(p){let k=J().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);p.append("path").attr("class","mouth").attr("d",k).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}o(u,"smile");function c(p){let k=J().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);p.append("path").attr("class","mouth").attr("d",k).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}o(c,"sad");function f(p){p.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return o(f,"ambivalent"),e.score>3?u(r):e.score<3?c(r):f(r),s},"drawFace"),St=o(function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),i.class!==void 0&&i.attr("class",i.class),e.title!==void 0&&i.append("title").text(e.title),i},"drawCircle"),Mt=o(function(t,e){return kt(t,e)},"drawText"),qt=o(function(t,e){function i(r,u,c,f,p){return r+","+u+" "+(r+c)+","+u+" "+(r+c)+","+(u+f-p)+" "+(r+c-p*1.2)+","+(u+f)+" "+r+","+(u+f)}o(i,"genPoints");let s=t.append("polygon");s.attr("points",i(e.x,e.y,50,20,7)),s.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,Mt(t,e)},"drawLabel"),Wt=o(function(t,e,i){let s=t.append("g"),r=K();r.x=e.x,r.y=e.y,r.fill=e.fill,r.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),r.height=i.height,r.class="journey-section section-type-"+e.num,r.rx=3,r.ry=3,rt(s,r),$t(i)(e.text,s,r.x,r.y,r.width,r.height,{class:"journey-section section-type-"+e.num},i,e.colour)},"drawSection"),Tt=-1,Xt=o(function(t,e,i){let s=e.x+i.width/2,r=t.append("g");Tt++;let u=300+5*30;r.append("line").attr("id","task"+Tt).attr("x1",s).attr("y1",e.y).attr("x2",s).attr("y2",u).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Ot(r,{cx:s,cy:300+(5-e.score)*30,score:e.score});let c=K();c.x=e.x,c.y=e.y,c.fill=e.fill,c.width=i.width,c.height=i.height,c.class="task task-type-"+e.num,c.rx=3,c.ry=3,rt(r,c);let f=e.x+14;e.people.forEach(p=>{let k=e.actors[p].color,x={cx:f,cy:e.y,r:7,fill:k,stroke:"#000",title:p,pos:e.actors[p].position};St(r,x),f+=10}),$t(i)(e.task,r,c.x,c.y,c.width,c.height,{class:"task"},i,e.colour)},"drawTask"),Gt=o(function(t,e){xt(t,e)},"drawBackgroundRect"),$t=function(){function t(r,u,c,f,p,k,x,m){let y=u.append("text").attr("x",c+p/2).attr("y",f+k/2+5).style("font-color",m).style("text-anchor","middle").text(r);s(y,x)}o(t,"byText");function e(r,u,c,f,p,k,x,m,y){let{taskFontSize:S,taskFontFamily:v}=m,_=r.split(/<br\s*\/?>/gi);for(let n=0;n<_.length;n++){let a=n*S-S*(_.length-1)/2,h=u.append("text").attr("x",c+p/2).attr("y",f).attr("fill",y).style("text-anchor","middle").style("font-size",S).style("font-family",v);h.append("tspan").attr("x",c+p/2).attr("dy",a).text(_[n]),h.attr("y",f+k/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),s(h,x)}}o(e,"byTspan");function i(r,u,c,f,p,k,x,m){let y=u.append("switch"),v=y.append("foreignObject").attr("x",c).attr("y",f).attr("width",p).attr("height",k).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");v.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(r),e(r,y,c,f,p,k,x,m),s(v,x)}o(i,"byFo");function s(r,u){for(let c in u)c in u&&r.attr(c,u[c])}return o(s,"_setTextAttrs"),function(r){return r.textPlacement==="fo"?i:r.textPlacement==="old"?t:e}}(),Ht=o(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),N={drawRect:rt,drawCircle:St,drawSection:Wt,drawText:Mt,drawLabel:qt,drawTask:Xt,drawBackgroundRect:Gt,initGraphics:Ht};var Ut=o(function(t){Object.keys(t).forEach(function(i){W[i]=t[i]})},"setConf"),A={};function Zt(t){let e=P().journey,i=60;Object.keys(A).forEach(s=>{let r=A[s].color,u={cx:20,cy:i,r:7,fill:r,stroke:"#000",pos:A[s].position};N.drawCircle(t,u);let c={x:40,y:i+7,fill:"#666",text:s,textMargin:e.boxTextMargin|5};N.drawText(t,c),i+=20})}o(Zt,"drawActorLegend");var W=P().journey,F=W.leftMargin,Jt=o(function(t,e,i,s){let r=P().journey,u=P().securityLevel,c;u==="sandbox"&&(c=q("#i"+e));let f=u==="sandbox"?q(c.nodes()[0].contentDocument.body):q("body");E.init();let p=f.select("#"+e);N.initGraphics(p);let k=s.db.getTasks(),x=s.db.getDiagramTitle(),m=s.db.getActors();for(let a in A)delete A[a];let y=0;m.forEach(a=>{A[a]={color:r.actorColours[y%r.actorColours.length],position:y},y++}),Zt(p),E.insert(0,0,F,Object.keys(A).length*50),Kt(p,k,0);let S=E.getBounds();x&&p.append("text").text(x).attr("x",F).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);let v=S.stopy-S.starty+2*r.diagramMarginY,_=F+S.stopx+2*r.diagramMarginX;ct(p,v,_,r.useMaxWidth),p.append("line").attr("x1",F).attr("y1",r.height*4).attr("x2",_-F-4).attr("y2",r.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let n=x?70:0;p.attr("viewBox",`${S.startx} -25 ${_} ${v+n}`),p.attr("preserveAspectRatio","xMinYMin meet"),p.attr("height",v+n+25)},"draw"),E={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,i,s){t[e]===void 0?t[e]=i:t[e]=s(i,t[e])},updateBounds:function(t,e,i,s){let r=P().journey,u=this,c=0;function f(p){return o(function(x){c++;let m=u.sequenceItems.length-c+1;u.updateVal(x,"starty",e-m*r.boxMargin,Math.min),u.updateVal(x,"stopy",s+m*r.boxMargin,Math.max),u.updateVal(E.data,"startx",t-m*r.boxMargin,Math.min),u.updateVal(E.data,"stopx",i+m*r.boxMargin,Math.max),p!=="activation"&&(u.updateVal(x,"startx",t-m*r.boxMargin,Math.min),u.updateVal(x,"stopx",i+m*r.boxMargin,Math.max),u.updateVal(E.data,"starty",e-m*r.boxMargin,Math.min),u.updateVal(E.data,"stopy",s+m*r.boxMargin,Math.max))},"updateItemBounds")}o(f,"updateFn"),this.sequenceItems.forEach(f())},insert:function(t,e,i,s){let r=Math.min(t,i),u=Math.max(t,i),c=Math.min(e,s),f=Math.max(e,s);this.updateVal(E.data,"startx",r,Math.min),this.updateVal(E.data,"starty",c,Math.min),this.updateVal(E.data,"stopx",u,Math.max),this.updateVal(E.data,"stopy",f,Math.max),this.updateBounds(r,c,u,f)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},it=W.sectionFills,Et=W.sectionColours,Kt=o(function(t,e,i){let s=P().journey,r="",u=s.height*2+s.diagramMarginY,c=i+u,f=0,p="#CCC",k="black",x=0;for(let[m,y]of e.entries()){if(r!==y.section){p=it[f%it.length],x=f%it.length,k=Et[f%Et.length];let v=0,_=y.section;for(let a=m;a<e.length&&e[a].section==_;a++)v=v+1;let n={x:m*s.taskMargin+m*s.width+F,y:50,text:y.section,fill:p,num:x,colour:k,taskCount:v};N.drawSection(t,n,s),r=y.section,f++}let S=y.people.reduce((v,_)=>(A[_]&&(v[_]=A[_]),v),{});y.x=m*s.taskMargin+m*s.width+F,y.y=c,y.width=s.diagramMarginX,y.height=s.diagramMarginY,y.colour=k,y.fill=p,y.num=x,y.actors=S,N.drawTask(t,y,s),E.insert(y.x,y.y,y.x+y.width+s.taskMargin,300+5*30)}},"drawTasks"),nt={setConf:Ut,draw:Jt};var Te={parser:bt,db:et,renderer:nt,styles:wt,init:t=>{nt.setConf(t.journey),et.clear()}};export{Te as diagram};
