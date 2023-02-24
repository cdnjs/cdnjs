"use strict";
import{a as M,c as W}from"./chunk-QOKXIXBE.mjs";import{a as V,e as q,j as J}from"./chunk-56Y3H425.mjs";import"./chunk-YLWRCH3P.mjs";import"./chunk-YXDSGNIF.mjs";import"./chunk-JHUKXRQA.mjs";import{m as R,n as G}from"./chunk-2VMR5VN5.mjs";import{b as U}from"./chunk-J6WLZWQH.mjs";import"./chunk-EMJEVTTF.mjs";import{c as f,e as z,f as k,i as O,k as F,u as P}from"./chunk-PHEFMIGI.mjs";import{select as T,line as rt,curveLinear as A}from"d3";var K=f((t,r,e)=>{let{parentById:o}=e,s=new Set,l=t;for(;l;){if(s.add(l),l===r)return l;l=o[l]}for(l=r;l;){if(s.has(l))return l;l=o[l]}return"root"},"findCommonAncestor");import{addHtmlLabel as ot}from"dagre-d3-es/src/dagre-js/label/add-html-label.js";var H,S={},at={};var _={},st=f(function(t,r,e,o,s,l,m){let n=e.select(`[id="${r}"]`),x=n.insert("g").attr("class","nodes");return Object.keys(t).forEach(function(p){let i=t[p],y="default";i.classes.length>0&&(y=i.classes.join(" "));let C=G(i.styles),a=i.text!==void 0?i.text:i.id,u,h={width:0,height:0};if(O(P().flowchart.htmlLabels)){let b={label:a.replace(/fa[blrs]?:fa-[\w-]+/g,D=>`<i class='${D.replace(":"," ")}'></i>`)};u=ot(n,b).node();let v=u.getBBox();h.width=v.width,h.height=v.height,h.labelNode=u,u.parentNode.removeChild(u)}else{let b=o.createElementNS("http://www.w3.org/2000/svg","text");b.setAttribute("style",C.labelStyle.replace("color:","fill:"));let v=a.split(F.lineBreakRegex);for(let et of v){let I=o.createElementNS("http://www.w3.org/2000/svg","tspan");I.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),I.setAttribute("dy","1em"),I.setAttribute("x","1"),I.textContent=et,b.appendChild(I)}u=b;let D=u.getBBox();h.width=D.width,h.height=D.height,h.labelNode=u}let L=[{id:i.id+"-west",layoutOptions:{"port.side":"WEST"}},{id:i.id+"-east",layoutOptions:{"port.side":"EAST"}},{id:i.id+"-south",layoutOptions:{"port.side":"SOUTH"}},{id:i.id+"-north",layoutOptions:{"port.side":"NORTH"}}],g=0,d="",$={};switch(i.type){case"round":g=5,d="rect";break;case"square":d="rect";break;case"diamond":d="question",$={portConstraints:"FIXED_SIDE"};break;case"hexagon":d="hexagon";break;case"odd":d="rect_left_inv_arrow";break;case"lean_right":d="lean_right";break;case"lean_left":d="lean_left";break;case"trapezoid":d="trapezoid";break;case"inv_trapezoid":d="inv_trapezoid";break;case"odd_right":d="rect_left_inv_arrow";break;case"circle":d="circle";break;case"ellipse":d="ellipse";break;case"stadium":d="stadium";break;case"subroutine":d="subroutine";break;case"cylinder":d="cylinder";break;case"group":d="rect";break;case"doublecircle":d="doublecircle";break;default:d="rect"}let N={labelStyle:C.labelStyle,shape:d,labelText:a,rx:g,ry:g,class:y,style:C.style,id:i.id,link:i.link,linkTarget:i.linkTarget,tooltip:s.db.getTooltip(i.id)||"",domId:s.db.lookUpDomId(i.id),haveCallback:i.haveCallback,width:i.type==="group"?500:void 0,dir:i.dir,type:i.type,props:i.props,padding:P().flowchart.padding},E,B;N.type!=="group"&&(B=q(x,N,i.dir),E=B.node().getBBox());let w={id:i.id,ports:i.type==="diamond"?L:[],layoutOptions:$,labelText:a,labelData:h,domId:s.db.lookUpDomId(i.id),width:E==null?void 0:E.width,height:E==null?void 0:E.height,type:i.type,el:B,parent:l.parentById[i.id]};_[N.id]=w}),m},"addVertices"),Q=f((t,r,e)=>{let o={TB:{in:{north:"north"},out:{south:"west",west:"east",east:"south"}},LR:{in:{west:"west"},out:{east:"south",south:"north",north:"east"}},RL:{in:{east:"east"},out:{west:"north",north:"south",south:"west"}},BT:{in:{south:"south"},out:{north:"east",east:"west",west:"north"}}};return o.TD=o.TB,k.info("abc88",e,r,t),o[e][r][t]},"getNextPosition"),Z=f((t,r,e)=>{if(k.info("getNextPort abc88",{node:t,edgeDirection:r,graphDirection:e}),!S[t])switch(e){case"TB":case"TD":S[t]={inPosition:"north",outPosition:"south"};break;case"BT":S[t]={inPosition:"south",outPosition:"north"};break;case"RL":S[t]={inPosition:"east",outPosition:"west"};break;case"LR":S[t]={inPosition:"west",outPosition:"east"};break}let o=r==="in"?S[t].inPosition:S[t].outPosition;return r==="in"?S[t].inPosition=Q(S[t].inPosition,r,e):S[t].outPosition=Q(S[t].outPosition,r,e),o},"getNextPort"),lt=f((t,r)=>{let e=t.start,o=t.end,s=_[e],l=_[o];return!s||!l?{source:e,target:o}:(s.type==="diamond"&&(e=`${e}-${Z(e,"out",r)}`),l.type==="diamond"&&(o=`${o}-${Z(o,"in",r)}`),{source:e,target:o})},"getEdgeStartEndPoint"),nt=f(function(t,r,e,o){k.info("abc78 edges = ",t);let s=o.insert("g").attr("class","edgeLabels"),l={},m=r.db.getDirection(),n,x;if(t.defaultStyle!==void 0){let c=G(t.defaultStyle);n=c.style,x=c.labelStyle}return t.forEach(function(c){var p="L-"+c.start+"-"+c.end;l[p]===void 0?(l[p]=0,k.info("abc78 new entry",p,l[p])):(l[p]++,k.info("abc78 new entry",p,l[p]));let i=p+"-"+l[p];k.info("abc78 new link id to be used is",p,i,l[p]);var y="LS-"+c.start,C="LE-"+c.end;let a={style:"",labelStyle:""};switch(a.minlen=c.length||1,c.type==="arrow_open"?a.arrowhead="none":a.arrowhead="normal",a.arrowTypeStart="arrow_open",a.arrowTypeEnd="arrow_open",c.type){case"double_arrow_cross":a.arrowTypeStart="arrow_cross";case"arrow_cross":a.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":a.arrowTypeStart="arrow_point";case"arrow_point":a.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":a.arrowTypeStart="arrow_circle";case"arrow_circle":a.arrowTypeEnd="arrow_circle";break}let u="",h="";switch(c.stroke){case"normal":u="fill:none;",n!==void 0&&(u=n),x!==void 0&&(h=x),a.thickness="normal",a.pattern="solid";break;case"dotted":a.thickness="normal",a.pattern="dotted",a.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":a.thickness="thick",a.pattern="solid",a.style="stroke-width: 3.5px;fill:none;";break}if(c.style!==void 0){let $=G(c.style);u=$.style,h=$.labelStyle}a.style=a.style+=u,a.labelStyle=a.labelStyle+=h,c.interpolate!==void 0?a.curve=R(c.interpolate,A):t.defaultInterpolate!==void 0?a.curve=R(t.defaultInterpolate,A):a.curve=R(at.curve,A),c.text===void 0?c.style!==void 0&&(a.arrowheadStyle="fill: #333"):(a.arrowheadStyle="fill: #333",a.labelpos="c"),a.labelType="text",a.label=c.text.replace(F.lineBreakRegex,`
`),c.style===void 0&&(a.style=a.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),a.labelStyle=a.labelStyle.replace("color:","fill:"),a.id=i,a.classes="flowchart-link "+y+" "+C;let L=J(s,a),{source:g,target:d}=lt(c,m);k.debug("abc78 source and target",g,d),e.edges.push({id:"e"+c.start+c.end,sources:[g],targets:[d],labelEl:L,labels:[{width:a.width,height:a.height,orgWidth:a.width,orgHeight:a.height,text:a.label,layoutOptions:{"edgeLabels.inline":"true","edgeLabels.placement":"CENTER"}}],edgeData:a})}),e},"addEdges"),it=f(function(t,r,e,o){let s="";switch(o&&(s=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,s=s.replace(/\(/g,"\\("),s=s.replace(/\)/g,"\\)")),r.arrowTypeStart){case"arrow_cross":t.attr("marker-start","url("+s+"#"+e+"-crossStart)");break;case"arrow_point":t.attr("marker-start","url("+s+"#"+e+"-pointStart)");break;case"arrow_barb":t.attr("marker-start","url("+s+"#"+e+"-barbStart)");break;case"arrow_circle":t.attr("marker-start","url("+s+"#"+e+"-circleStart)");break;case"aggregation":t.attr("marker-start","url("+s+"#"+e+"-aggregationStart)");break;case"extension":t.attr("marker-start","url("+s+"#"+e+"-extensionStart)");break;case"composition":t.attr("marker-start","url("+s+"#"+e+"-compositionStart)");break;case"dependency":t.attr("marker-start","url("+s+"#"+e+"-dependencyStart)");break;case"lollipop":t.attr("marker-start","url("+s+"#"+e+"-lollipopStart)");break;default:}switch(r.arrowTypeEnd){case"arrow_cross":t.attr("marker-end","url("+s+"#"+e+"-crossEnd)");break;case"arrow_point":t.attr("marker-end","url("+s+"#"+e+"-pointEnd)");break;case"arrow_barb":t.attr("marker-end","url("+s+"#"+e+"-barbEnd)");break;case"arrow_circle":t.attr("marker-end","url("+s+"#"+e+"-circleEnd)");break;case"aggregation":t.attr("marker-end","url("+s+"#"+e+"-aggregationEnd)");break;case"extension":t.attr("marker-end","url("+s+"#"+e+"-extensionEnd)");break;case"composition":t.attr("marker-end","url("+s+"#"+e+"-compositionEnd)");break;case"dependency":t.attr("marker-end","url("+s+"#"+e+"-dependencyEnd)");break;case"lollipop":t.attr("marker-end","url("+s+"#"+e+"-lollipopEnd)");break;default:}},"addMarkersToEdge"),ct=f(function(t,r){k.info("Extracting classes"),r.db.clear("ver-2");try{return r.parse(t),r.db.getClasses()}catch(e){return{}}},"getClasses"),dt=f(function(t){let r={parentById:{},childrenById:{}},e=t.getSubGraphs();return k.info("Subgraphs - ",e),e.forEach(function(o){o.nodes.forEach(function(s){r.parentById[s]=o.id,r.childrenById[o.id]===void 0&&(r.childrenById[o.id]=[]),r.childrenById[o.id].push(s)})}),e.forEach(function(o){let s={id:o.id};r.parentById[o.id]!==void 0&&(s.parent=r.parentById[o.id])}),r},"addSubGraphs"),ut=f(function(t,r,e){let o=K(t,r,e);if(o===void 0||o==="root")return{x:0,y:0};let s=_[o].offset;return{x:s.posX,y:s.posY}},"calcOffset"),ft=f(function(t,r,e,o,s){let l=ut(r.sources[0],r.targets[0],s),m=r.sections[0].startPoint,n=r.sections[0].endPoint,c=(r.sections[0].bendPoints?r.sections[0].bendPoints:[]).map(h=>[h.x+l.x,h.y+l.y]),p=[[m.x+l.x,m.y+l.y],...c,[n.x+l.x,n.y+l.y]],i=rt().curve(A),y=t.insert("path").attr("d",i(p)).attr("class","path").attr("fill","none"),C=t.insert("g").attr("class","edgeLabel"),a=T(C.node().appendChild(r.labelEl)),u=a.node().firstChild.getBoundingClientRect();a.attr("width",u.width),a.attr("height",u.height),C.attr("transform",`translate(${r.labels[0].x+l.x}, ${r.labels[0].y+l.y})`),it(y,e,o.type,o.arrowMarkerAbsolute)},"insertEdge"),X=f((t,r)=>{t.forEach(e=>{e.children||(e.children=[]);let o=r.childrenById[e.id];o&&o.forEach(s=>{e.children.push(_[s])}),X(e.children,r)})},"insertChildren"),pt=f(function(t,r,e,o){return z(this,null,function*(){var B;if(!H){let w=(yield import("elkjs/lib/elk.bundled.js")).default;H=new w}o.db.clear(),_={},o.db.setGen("gen-2"),o.parser.parse(t);let s=T("body").append("div").attr("style","height:400px").attr("id","cy"),l={id:"root",layoutOptions:{"elk.hierarchyHandling":"INCLUDE_CHILDREN","org.eclipse.elk.padding":"[top=100, left=100, bottom=110, right=110]","elk.layered.spacing.edgeNodeBetweenLayers":"30","elk.direction":"DOWN"},children:[],edges:[]};switch(k.info("Drawing flowchart using v3 renderer",H),o.db.getDirection()){case"BT":l.layoutOptions["elk.direction"]="UP";break;case"TB":l.layoutOptions["elk.direction"]="DOWN";break;case"LR":l.layoutOptions["elk.direction"]="RIGHT";break;case"RL":l.layoutOptions["elk.direction"]="LEFT";break}let{securityLevel:n,flowchart:x}=P(),c;n==="sandbox"&&(c=T("#i"+r));let p=n==="sandbox"?T(c.nodes()[0].contentDocument.body):T("body"),i=n==="sandbox"?c.nodes()[0].contentDocument:document,y=p.select(`[id="${r}"]`);V(y,["point","circle","cross"],o.type,o.arrowMarkerAbsolute);let a=o.db.getVertices(),u,h=o.db.getSubGraphs();k.info("Subgraphs - ",h);for(let w=h.length-1;w>=0;w--)u=h[w],o.db.addVertex(u.id,u.title,"group",void 0,u.classes,u.dir);let L=y.insert("g").attr("class","subgraphs"),g=dt(o.db);l=st(a,r,p,i,o,g,l);let d=y.insert("g").attr("class","edges edgePath"),$=o.db.getEdges();l=nt($,o,l,y),Object.keys(_).forEach(w=>{let b=_[w];b.parent||l.children.push(b),g.childrenById[w]!==void 0&&(b.labels=[{text:b.labelText,layoutOptions:{"nodeLabels.placement":"[H_CENTER, V_TOP, INSIDE]"},width:b.labelData.width,height:b.labelData.height}],delete b.x,delete b.y,delete b.width,delete b.height)}),X(l.children,g),k.info("after layout",JSON.stringify(l,null,2));let E=yield H.layout(l);Y(0,0,E.children,y,L,o,0),k.info("after layout",E),(B=E.edges)==null||B.map(w=>{ft(d,w,w.edgeData,o,g)}),U({},y,x.diagramPadding,x.useMaxWidth),s.remove()})},"draw"),Y=f((t,r,e,o,s,l,m)=>{e.forEach(function(n){if(n)if(_[n.id].offset={posX:n.x+t,posY:n.y+r,x:t,y:r,depth:m,width:n.width,height:n.height},n.type==="group"){let x=s.insert("g").attr("class","subgraph");x.insert("rect").attr("class","subgraph subgraph-lvl-"+m%5+" node").attr("x",n.x+t).attr("y",n.y+r).attr("width",n.width).attr("height",n.height);let c=x.insert("g").attr("class","label");c.attr("transform",`translate(${n.labels[0].x+t+n.x}, ${n.labels[0].y+r+n.y})`),c.node().appendChild(n.labelData.labelNode),k.info("Id (UGH)= ",n.type,n.labels)}else k.info("Id (UGH)= ",n.id),n.el.attr("transform",`translate(${n.x+t+n.width/2}, ${n.y+r+n.height/2})`)}),e.forEach(function(n){n&&n.type==="group"&&Y(t+n.x,r+n.y,n.children,o,s,l,m+1)})},"drawNodes"),j={getClasses:ct,draw:pt};var ht=f(t=>{let r="";for(let e=0;e<5;e++)r+=`
      .subgraph-lvl-${e} {
        fill: ${t[`surface${e}`]};
        stroke: ${t[`surfacePeer${e}`]};
      }
    `;return r},"genSections"),bt=f(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor||t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span {
    color: ${t.titleColor};
  }

  .label text,span {
    fill: ${t.nodeTextColor||t.textColor};
    color: ${t.nodeTextColor||t.textColor};
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
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
  .subgraph {
    stroke-width:2;
    rx:3;
  }
  // .subgraph-lvl-1 {
  //   fill:#ccc;
  //   // stroke:black;
  // }
  ${ht(t)}
`,"getStyles"),tt=bt;var Gt={db:W,renderer:j,parser:M,styles:tt};export{Gt as diagram};
