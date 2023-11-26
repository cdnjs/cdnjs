import{a as ft,b as pt,c as dt,f as H}from"./chunk-UD4JGMYJ.mjs";import"./chunk-OGOS6LNA.mjs";import{J as G,Ka as st,Na as at,Oa as ot,Pa as lt,Qa as ct,Ra as ht,Sa as ut,Ta as yt,Va as $,a as l,m as z}from"./chunk-ONLVDUB4.mjs";var U=function(){var t=l(function(g,n,s,a){for(s=s||{},a=g.length;a--;s[g[a]]=n);return s},"o"),e=[6,8,10,11,12,14,16,17,18],i=[1,9],c=[1,10],r=[1,11],u=[1,12],h=[1,13],d=[1,14],f={trace:l(function(){},"trace"),yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NEWLINE:10,title:11,acc_title:12,acc_title_value:13,acc_descr:14,acc_descr_value:15,acc_descr_multiline_value:16,section:17,taskName:18,taskData:19,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",8:"SPACE",10:"NEWLINE",11:"title",12:"acc_title",13:"acc_title_value",14:"acc_descr",15:"acc_descr_value",16:"acc_descr_multiline_value",17:"section",18:"taskName",19:"taskData"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,2]],performAction:l(function(n,s,a,y,p,o,M){var _=o.length-1;switch(p){case 1:return o[_-1];case 2:this.$=[];break;case 3:o[_-1].push(o[_]),this.$=o[_-1];break;case 4:case 5:this.$=o[_];break;case 6:case 7:this.$=[];break;case 8:y.setDiagramTitle(o[_].substr(6)),this.$=o[_].substr(6);break;case 9:this.$=o[_].trim(),y.setAccTitle(this.$);break;case 10:case 11:this.$=o[_].trim(),y.setAccDescription(this.$);break;case 12:y.addSection(o[_].substr(8)),this.$=o[_].substr(8);break;case 13:y.addTask(o[_-1],o[_]),this.$="task";break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:i,12:c,14:r,16:u,17:h,18:d},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:15,11:i,12:c,14:r,16:u,17:h,18:d},t(e,[2,5]),t(e,[2,6]),t(e,[2,8]),{13:[1,16]},{15:[1,17]},t(e,[2,11]),t(e,[2,12]),{19:[1,18]},t(e,[2,4]),t(e,[2,9]),t(e,[2,10]),t(e,[2,13])],defaultActions:{},parseError:l(function(n,s){if(s.recoverable)this.trace(n);else{var a=new Error(n);throw a.hash=s,a}},"parseError"),parse:l(function(n){var s=this,a=[0],y=[],p=[null],o=[],M=this.table,_="",N=0,et=0,nt=0,Tt=2,rt=1,Mt=o.slice.call(arguments,1),k=Object.create(this.lexer),C={yy:{}};for(var O in this.yy)Object.prototype.hasOwnProperty.call(this.yy,O)&&(C.yy[O]=this.yy[O]);k.setInput(n,C.yy),C.yy.lexer=k,C.yy.parser=this,typeof k.yylloc>"u"&&(k.yylloc={});var q=k.yylloc;o.push(q);var St=k.options&&k.options.ranges;typeof C.yy.parseError=="function"?this.parseError=C.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function Gt(v){a.length=a.length-2*v,p.length=p.length-v,o.length=o.length-v}l(Gt,"popStack");function $t(){var v;return v=y.pop()||k.lex()||rt,typeof v!="number"&&(v instanceof Array&&(y=v,v=y.pop()),v=s.symbols_[v]||v),v}l($t,"lex");for(var b,D,P,w,Ht,W,A={},B,S,it,j;;){if(P=a[a.length-1],this.defaultActions[P]?w=this.defaultActions[P]:((b===null||typeof b>"u")&&(b=$t()),w=M[P]&&M[P][b]),typeof w>"u"||!w.length||!w[0]){var X="";j=[];for(B in M[P])this.terminals_[B]&&B>Tt&&j.push("'"+this.terminals_[B]+"'");k.showPosition?X="Parse error on line "+(N+1)+`:
`+k.showPosition()+`
Expecting `+j.join(", ")+", got '"+(this.terminals_[b]||b)+"'":X="Parse error on line "+(N+1)+": Unexpected "+(b==rt?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(X,{text:k.match,token:this.terminals_[b]||b,line:k.yylineno,loc:q,expected:j})}if(w[0]instanceof Array&&w.length>1)throw new Error("Parse Error: multiple actions possible at state: "+P+", token: "+b);switch(w[0]){case 1:a.push(b),p.push(k.yytext),o.push(k.yylloc),a.push(w[1]),b=null,D?(b=D,D=null):(et=k.yyleng,_=k.yytext,N=k.yylineno,q=k.yylloc,nt>0&&nt--);break;case 2:if(S=this.productions_[w[1]][1],A.$=p[p.length-S],A._$={first_line:o[o.length-(S||1)].first_line,last_line:o[o.length-1].last_line,first_column:o[o.length-(S||1)].first_column,last_column:o[o.length-1].last_column},St&&(A._$.range=[o[o.length-(S||1)].range[0],o[o.length-1].range[1]]),W=this.performAction.apply(A,[_,et,N,C.yy,w[1],p,o].concat(Mt)),typeof W<"u")return W;S&&(a=a.slice(0,-1*S*2),p=p.slice(0,-1*S),o=o.slice(0,-1*S)),a.push(this.productions_[w[1]][0]),p.push(A.$),o.push(A._$),it=M[a[a.length-2]][a[a.length-1]],a.push(it);break;case 3:return!0}}return!0},"parse")},x=function(){var g={EOF:1,parseError:l(function(s,a){if(this.yy.parser)this.yy.parser.parseError(s,a);else throw new Error(s)},"parseError"),setInput:function(n,s){return this.yy=s||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var s=n.match(/(?:\r\n?|\n).*/g);return s?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var s=n.length,a=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-s),this.offset-=s;var y=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),a.length-1&&(this.yylineno-=a.length-1);var p=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:a?(a.length===y.length?this.yylloc.first_column:0)+y[y.length-a.length].length-a[0].length:this.yylloc.first_column-s},this.options.ranges&&(this.yylloc.range=[p[0],p[0]+this.yyleng-s]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),s=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+s+"^"},test_match:function(n,s){var a,y,p;if(this.options.backtrack_lexer&&(p={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(p.yylloc.range=this.yylloc.range.slice(0))),y=n[0].match(/(?:\r\n?|\n).*/g),y&&(this.yylineno+=y.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:y?y[y.length-1].length-y[y.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],a=this.performAction.call(this,this.yy,this,s,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a)return a;if(this._backtrack){for(var o in p)this[o]=p[o];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,s,a,y;this._more||(this.yytext="",this.match="");for(var p=this._currentRules(),o=0;o<p.length;o++)if(a=this._input.match(this.rules[p[o]]),a&&(!s||a[0].length>s[0].length)){if(s=a,y=o,this.options.backtrack_lexer){if(n=this.test_match(a,p[o]),n!==!1)return n;if(this._backtrack){s=!1;continue}else return!1}else if(!this.options.flex)break}return s?(n=this.test_match(s,p[y]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:l(function(){var s=this.next();return s||this.lex()},"lex"),begin:l(function(s){this.conditionStack.push(s)},"begin"),popState:l(function(){var s=this.conditionStack.length-1;return s>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:l(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:l(function(s){return s=this.conditionStack.length-1-Math.abs(s||0),s>=0?this.conditionStack[s]:"INITIAL"},"topState"),pushState:l(function(s){this.begin(s)},"pushState"),stateStackSize:l(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:l(function(s,a,y,p){var o=p;switch(y){case 0:break;case 1:break;case 2:return 10;case 3:break;case 4:break;case 5:return 4;case 6:return 11;case 7:return this.begin("acc_title"),12;break;case 8:return this.popState(),"acc_title_value";break;case 9:return this.begin("acc_descr"),14;break;case 10:return this.popState(),"acc_descr_value";break;case 11:this.begin("acc_descr_multiline");break;case 12:this.popState();break;case 13:return"acc_descr_multiline_value";case 14:return 17;case 15:return 18;case 16:return 19;case 17:return":";case 18:return 6;case 19:return"INVALID"}},"anonymous"),rules:[/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[12,13],inclusive:!1},acc_descr:{rules:[10],inclusive:!1},acc_title:{rules:[8],inclusive:!1},INITIAL:{rules:[0,1,2,3,4,5,6,7,9,11,14,15,16,17,18,19],inclusive:!0}}};return g}();f.lexer=x;function m(){this.yy={}}return l(m,"Parser"),m.prototype=f,f.Parser=m,new m}();U.parser=U;var gt=U;var V="",Z=[],L=[],R=[],Et=l(function(){Z.length=0,L.length=0,V="",R.length=0,at()},"clear"),Ct=l(function(t){V=t,Z.push(t)},"addSection"),Pt=l(function(){return Z},"getSections"),It=l(function(){let t=mt(),e=100,i=0;for(;!t&&i<e;)t=mt(),i++;return L.push(...R),L},"getTasks"),At=l(function(){let t=[];return L.forEach(i=>{i.people&&t.push(...i.people)}),[...new Set(t)].sort()},"updateActors"),Vt=l(function(t,e){let i=e.substr(1).split(":"),c=0,r=[];i.length===1?(c=Number(i[0]),r=[]):(c=Number(i[0]),r=i[1].split(","));let u=r.map(d=>d.trim()),h={section:V,type:V,people:u,task:t,score:c};R.push(h)},"addTask"),Ft=l(function(t){let e={section:V,type:V,description:t,task:t,classes:[]};L.push(e)},"addTaskOrg"),mt=l(function(){let t=l(function(i){return R[i].processed},"compileTask"),e=!0;for(let[i,c]of R.entries())t(i),e=e&&c.processed;return e},"compileTasks"),Lt=l(function(){return At()},"getActors"),J={getConfig:()=>$().journey,clear:Et,setDiagramTitle:ut,getDiagramTitle:yt,setAccTitle:ot,getAccTitle:lt,setAccDescription:ct,getAccDescription:ht,addSection:Ct,getSections:Pt,getTasks:It,addTask:Vt,addTaskOrg:Ft,getActors:Lt};var Rt=l(t=>`.label {
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
`,"getStyles"),xt=Rt;var K=l(function(t,e){return ft(t,e)},"drawRect"),Nt=l(function(t,e){let c=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),r=t.append("g");r.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),r.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function u(f){let x=G().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);f.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}l(u,"smile");function h(f){let x=G().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);f.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}l(h,"sad");function d(f){f.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return l(d,"ambivalent"),e.score>3?u(r):e.score<3?h(r):d(r),c},"drawFace"),_t=l(function(t,e){let i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),i.class!==void 0&&i.attr("class",i.class),e.title!==void 0&&i.append("title").text(e.title),i},"drawCircle"),bt=l(function(t,e){return dt(t,e)},"drawText"),Bt=l(function(t,e){function i(r,u,h,d,f){return r+","+u+" "+(r+h)+","+u+" "+(r+h)+","+(u+d-f)+" "+(r+h-f*1.2)+","+(u+d)+" "+r+","+(u+d)}l(i,"genPoints");let c=t.append("polygon");c.attr("points",i(e.x,e.y,50,20,7)),c.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,bt(t,e)},"drawLabel"),jt=l(function(t,e,i){let c=t.append("g"),r=H();r.x=e.x,r.y=e.y,r.fill=e.fill,r.width=i.width*e.taskCount+i.diagramMarginX*(e.taskCount-1),r.height=i.height,r.class="journey-section section-type-"+e.num,r.rx=3,r.ry=3,K(c,r),vt(i)(e.text,c,r.x,r.y,r.width,r.height,{class:"journey-section section-type-"+e.num},i,e.colour)},"drawSection"),kt=-1,zt=l(function(t,e,i){let c=e.x+i.width/2,r=t.append("g");kt++;let u=300+5*30;r.append("line").attr("id","task"+kt).attr("x1",c).attr("y1",e.y).attr("x2",c).attr("y2",u).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Nt(r,{cx:c,cy:300+(5-e.score)*30,score:e.score});let h=H();h.x=e.x,h.y=e.y,h.fill=e.fill,h.width=i.width,h.height=i.height,h.class="task task-type-"+e.num,h.rx=3,h.ry=3,K(r,h);let d=e.x+14;e.people.forEach(f=>{let x=e.actors[f].color,m={cx:d,cy:e.y,r:7,fill:x,stroke:"#000",title:f,pos:e.actors[f].position};_t(r,m),d+=10}),vt(i)(e.task,r,h.x,h.y,h.width,h.height,{class:"task"},i,e.colour)},"drawTask"),Yt=l(function(t,e){pt(t,e)},"drawBackgroundRect"),vt=function(){function t(r,u,h,d,f,x,m,g){let n=u.append("text").attr("x",h+f/2).attr("y",d+x/2+5).style("font-color",g).style("text-anchor","middle").text(r);c(n,m)}l(t,"byText");function e(r,u,h,d,f,x,m,g,n){let{taskFontSize:s,taskFontFamily:a}=g,y=r.split(/<br\s*\/?>/gi);for(let p=0;p<y.length;p++){let o=p*s-s*(y.length-1)/2,M=u.append("text").attr("x",h+f/2).attr("y",d).attr("fill",n).style("text-anchor","middle").style("font-size",s).style("font-family",a);M.append("tspan").attr("x",h+f/2).attr("dy",o).text(y[p]),M.attr("y",d+x/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),c(M,m)}}l(e,"byTspan");function i(r,u,h,d,f,x,m,g){let n=u.append("switch"),a=n.append("foreignObject").attr("x",h).attr("y",d).attr("width",f).attr("height",x).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");a.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(r),e(r,n,h,d,f,x,m,g),c(a,m)}l(i,"byFo");function c(r,u){for(let h in u)h in u&&r.attr(h,u[h])}return l(c,"_setTextAttrs"),function(r){return r.textPlacement==="fo"?i:r.textPlacement==="old"?t:e}}(),Ot=l(function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},"initGraphics"),F={drawRect:K,drawCircle:_t,drawSection:jt,drawText:bt,drawLabel:Bt,drawTask:zt,drawBackgroundRect:Yt,initGraphics:Ot};var qt=l(function(t){Object.keys(t).forEach(function(i){Y[i]=t[i]})},"setConf"),E={};function Dt(t){let e=$().journey,i=60;Object.keys(E).forEach(c=>{let r=E[c].color,u={cx:20,cy:i,r:7,fill:r,stroke:"#000",pos:E[c].position};F.drawCircle(t,u);let h={x:40,y:i+7,fill:"#666",text:c,textMargin:e.boxTextMargin|5};F.drawText(t,h),i+=20})}l(Dt,"drawActorLegend");var Y=$().journey,I=Y.leftMargin,Wt=l(function(t,e,i,c){let r=$().journey,u=$().securityLevel,h;u==="sandbox"&&(h=z("#i"+e));let d=u==="sandbox"?z(h.nodes()[0].contentDocument.body):z("body");T.init();let f=d.select("#"+e);F.initGraphics(f);let x=c.db.getTasks(),m=c.db.getDiagramTitle(),g=c.db.getActors();for(let o in E)delete E[o];let n=0;g.forEach(o=>{E[o]={color:r.actorColours[n%r.actorColours.length],position:n},n++}),Dt(f),T.insert(0,0,I,Object.keys(E).length*50),Xt(f,x,0);let s=T.getBounds();m&&f.append("text").text(m).attr("x",I).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);let a=s.stopy-s.starty+2*r.diagramMarginY,y=I+s.stopx+2*r.diagramMarginX;st(f,a,y,r.useMaxWidth),f.append("line").attr("x1",I).attr("y1",r.height*4).attr("x2",y-I-4).attr("y2",r.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");let p=m?70:0;f.attr("viewBox",`${s.startx} -25 ${y} ${a+p}`),f.attr("preserveAspectRatio","xMinYMin meet"),f.attr("height",a+p+25)},"draw"),T={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,i,c){t[e]===void 0?t[e]=i:t[e]=c(i,t[e])},updateBounds:function(t,e,i,c){let r=$().journey,u=this,h=0;function d(f){return l(function(m){h++;let g=u.sequenceItems.length-h+1;u.updateVal(m,"starty",e-g*r.boxMargin,Math.min),u.updateVal(m,"stopy",c+g*r.boxMargin,Math.max),u.updateVal(T.data,"startx",t-g*r.boxMargin,Math.min),u.updateVal(T.data,"stopx",i+g*r.boxMargin,Math.max),f!=="activation"&&(u.updateVal(m,"startx",t-g*r.boxMargin,Math.min),u.updateVal(m,"stopx",i+g*r.boxMargin,Math.max),u.updateVal(T.data,"starty",e-g*r.boxMargin,Math.min),u.updateVal(T.data,"stopy",c+g*r.boxMargin,Math.max))},"updateItemBounds")}l(d,"updateFn"),this.sequenceItems.forEach(d())},insert:function(t,e,i,c){let r=Math.min(t,i),u=Math.max(t,i),h=Math.min(e,c),d=Math.max(e,c);this.updateVal(T.data,"startx",r,Math.min),this.updateVal(T.data,"starty",h,Math.min),this.updateVal(T.data,"stopx",u,Math.max),this.updateVal(T.data,"stopy",d,Math.max),this.updateBounds(r,h,u,d)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},Q=Y.sectionFills,wt=Y.sectionColours,Xt=l(function(t,e,i){let c=$().journey,r="",u=c.height*2+c.diagramMarginY,h=i+u,d=0,f="#CCC",x="black",m=0;for(let[g,n]of e.entries()){if(r!==n.section){f=Q[d%Q.length],m=d%Q.length,x=wt[d%wt.length];let a=0,y=n.section;for(let o=g;o<e.length&&e[o].section==y;o++)a=a+1;let p={x:g*c.taskMargin+g*c.width+I,y:50,text:n.section,fill:f,num:m,colour:x,taskCount:a};F.drawSection(t,p,c),r=n.section,d++}let s=n.people.reduce((a,y)=>(E[y]&&(a[y]=E[y]),a),{});n.x=g*c.taskMargin+g*c.width+I,n.y=h,n.width=c.diagramMarginX,n.height=c.diagramMarginY,n.colour=x,n.fill=f,n.num=m,n.actors=s,F.drawTask(t,n,c),T.insert(n.x,n.y,n.x+n.width+c.taskMargin,300+5*30)}},"drawTasks"),tt={setConf:qt,draw:Wt};var me={parser:gt,db:J,renderer:tt,styles:xt,init:t=>{tt.setConf(t.journey),J.clear()}};export{me as diagram};
