import{a as H,c as F}from"./chunk-JJQVDDLD.mjs";import{a as W,c as z,f as O,k as U}from"./chunk-M3HODACO.mjs";import"./chunk-KD2STDBF.mjs";import"./chunk-M3OUVPMK.mjs";import"./chunk-MGPXXO54.mjs";import{n as N,o as v}from"./chunk-7HHNZHC5.mjs";import{d as R}from"./chunk-LT56AXER.mjs";import"./chunk-6WMSPMWD.mjs";import{a as f,c as h,p as T,t as G}from"./chunk-RKGGAEC6.mjs";import{select as L,line as Y,curveLinear as D}from"d3";var A=f((t,r,e)=>{let{parentById:o}=e,l=new Set,n=t;for(;n;){if(l.add(n),n===r)return n;n=o[n]}for(n=r;n;){if(l.has(n))return n;n=o[n]}return"root"},"findCommonAncestor");import"dagre-d3-es/src/dagre-js/label/add-html-label.js";import j from"elkjs/lib/elk.bundled.js";var M=new j,g={},tt={};var C={},et=f(async function(t,r,e,o,l,n,k){let w=e.select(`[id="${r}"]`).insert("g").attr("class","nodes"),c=Object.keys(t);return await Promise.all(c.map(async function(u){let i=t[u],b="default";i.classes.length>0&&(b=i.classes.join(" ")),b=b+" flowchart-label";let _=v(i.styles),a=i.text!==void 0?i.text:i.id,y,p={width:0,height:0},I=[{id:i.id+"-west",layoutOptions:{"port.side":"WEST"}},{id:i.id+"-east",layoutOptions:{"port.side":"EAST"}},{id:i.id+"-south",layoutOptions:{"port.side":"SOUTH"}},{id:i.id+"-north",layoutOptions:{"port.side":"NORTH"}}],E=0,d="",B={};switch(i.type){case"round":E=5,d="rect";break;case"square":d="rect";break;case"diamond":d="question",B={portConstraints:"FIXED_SIDE"};break;case"hexagon":d="hexagon";break;case"odd":d="rect_left_inv_arrow";break;case"lean_right":d="lean_right";break;case"lean_left":d="lean_left";break;case"trapezoid":d="trapezoid";break;case"inv_trapezoid":d="inv_trapezoid";break;case"odd_right":d="rect_left_inv_arrow";break;case"circle":d="circle";break;case"ellipse":d="ellipse";break;case"stadium":d="stadium";break;case"subroutine":d="subroutine";break;case"cylinder":d="cylinder";break;case"group":d="rect";break;case"doublecircle":d="doublecircle";break;default:d="rect"}let $={labelStyle:_.labelStyle,shape:d,labelText:a,labelType:i.labelType,rx:E,ry:E,class:b,style:_.style,id:i.id,link:i.link,linkTarget:i.linkTarget,tooltip:l.db.getTooltip(i.id)||"",domId:l.db.lookUpDomId(i.id),haveCallback:i.haveCallback,width:i.type==="group"?500:void 0,dir:i.dir,type:i.type,props:i.props,padding:T().flowchart.padding},S,x;if($.type!=="group")x=await O(w,$,i.dir),S=x.node().getBBox();else{let ft=o.createElementNS("http://www.w3.org/2000/svg","text"),{shapeSvg:X,bbox:P}=await z(w,$,void 0,!0);p.width=P.width,p.wrappingWidth=T().flowchart.wrappingWidth,p.height=P.height,p.labelNode=X.node(),$.labelData=p}let m={id:i.id,ports:i.type==="diamond"?I:[],layoutOptions:B,labelText:a,labelData:p,domId:l.db.lookUpDomId(i.id),width:S?.width,height:S?.height,type:i.type,el:x,parent:n.parentById[i.id]};C[$.id]=m})),k},"addVertices"),V=f((t,r,e)=>{let o={TB:{in:{north:"north"},out:{south:"west",west:"east",east:"south"}},LR:{in:{west:"west"},out:{east:"south",south:"north",north:"east"}},RL:{in:{east:"east"},out:{west:"north",north:"south",south:"west"}},BT:{in:{south:"south"},out:{north:"east",east:"west",west:"north"}}};return o.TD=o.TB,h.info("abc88",e,r,t),o[e][r][t]},"getNextPosition"),q=f((t,r,e)=>{if(h.info("getNextPort abc88",{node:t,edgeDirection:r,graphDirection:e}),!g[t])switch(e){case"TB":case"TD":g[t]={inPosition:"north",outPosition:"south"};break;case"BT":g[t]={inPosition:"south",outPosition:"north"};break;case"RL":g[t]={inPosition:"east",outPosition:"west"};break;case"LR":g[t]={inPosition:"west",outPosition:"east"};break}let o=r==="in"?g[t].inPosition:g[t].outPosition;return r==="in"?g[t].inPosition=V(g[t].inPosition,r,e):g[t].outPosition=V(g[t].outPosition,r,e),o},"getNextPort"),rt=f((t,r)=>{let e=t.start,o=t.end,l=e,n=o,k=C[e],s=C[o];return!k||!s?{source:e,target:o}:(k.type==="diamond"&&(e=`${e}-${q(e,"out",r)}`),s.type==="diamond"&&(o=`${o}-${q(o,"in",r)}`),{source:e,target:o,sourceId:l,targetId:n})},"getEdgeStartEndPoint"),ot=f(function(t,r,e,o){h.info("abc78 edges = ",t);let l=o.insert("g").attr("class","edgeLabels"),n={},k=r.db.getDirection(),s,w;if(t.defaultStyle!==void 0){let c=v(t.defaultStyle);s=c.style,w=c.labelStyle}return t.forEach(function(c){let u="L-"+c.start+"-"+c.end;n[u]===void 0?(n[u]=0,h.info("abc78 new entry",u,n[u])):(n[u]++,h.info("abc78 new entry",u,n[u]));let i=u+"-"+n[u];h.info("abc78 new link id to be used is",u,i,n[u]);let b="LS-"+c.start,_="LE-"+c.end,a={style:"",labelStyle:""};switch(a.minlen=c.length||1,c.type==="arrow_open"?a.arrowhead="none":a.arrowhead="normal",a.arrowTypeStart="arrow_open",a.arrowTypeEnd="arrow_open",c.type){case"double_arrow_cross":a.arrowTypeStart="arrow_cross";case"arrow_cross":a.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":a.arrowTypeStart="arrow_point";case"arrow_point":a.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":a.arrowTypeStart="arrow_circle";case"arrow_circle":a.arrowTypeEnd="arrow_circle";break}let y="",p="";switch(c.stroke){case"normal":y="fill:none;",s!==void 0&&(y=s),w!==void 0&&(p=w),a.thickness="normal",a.pattern="solid";break;case"dotted":a.thickness="normal",a.pattern="dotted",a.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":a.thickness="thick",a.pattern="solid",a.style="stroke-width: 3.5px;fill:none;";break}if(c.style!==void 0){let S=v(c.style);y=S.style,p=S.labelStyle}a.style=a.style+=y,a.labelStyle=a.labelStyle+=p,c.interpolate!==void 0?a.curve=N(c.interpolate,D):t.defaultInterpolate!==void 0?a.curve=N(t.defaultInterpolate,D):a.curve=N(tt.curve,D),c.text===void 0?c.style!==void 0&&(a.arrowheadStyle="fill: #333"):(a.arrowheadStyle="fill: #333",a.labelpos="c"),a.labelType=c.labelType,a.label=c.text.replace(R.lineBreakRegex,`
`),c.style===void 0&&(a.style=a.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),a.labelStyle=a.labelStyle.replace("color:","fill:"),a.id=i,a.classes="flowchart-link "+b+" "+_;let I=U(l,a),{source:E,target:d,sourceId:B,targetId:$}=rt(c,k);h.debug("abc78 source and target",E,d),e.edges.push({id:"e"+c.start+c.end,sources:[E],targets:[d],sourceId:B,targetId:$,labelEl:I,labels:[{width:a.width,height:a.height,orgWidth:a.width,orgHeight:a.height,text:a.label,layoutOptions:{"edgeLabels.inline":"true","edgeLabels.placement":"CENTER"}}],edgeData:a})}),e},"addEdges"),at=f(function(t,r,e,o){let l="";switch(o&&(l=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,l=l.replace(/\(/g,"\\("),l=l.replace(/\)/g,"\\)")),r.arrowTypeStart){case"arrow_cross":t.attr("marker-start","url("+l+"#"+e+"-crossStart)");break;case"arrow_point":t.attr("marker-start","url("+l+"#"+e+"-pointStart)");break;case"arrow_barb":t.attr("marker-start","url("+l+"#"+e+"-barbStart)");break;case"arrow_circle":t.attr("marker-start","url("+l+"#"+e+"-circleStart)");break;case"aggregation":t.attr("marker-start","url("+l+"#"+e+"-aggregationStart)");break;case"extension":t.attr("marker-start","url("+l+"#"+e+"-extensionStart)");break;case"composition":t.attr("marker-start","url("+l+"#"+e+"-compositionStart)");break;case"dependency":t.attr("marker-start","url("+l+"#"+e+"-dependencyStart)");break;case"lollipop":t.attr("marker-start","url("+l+"#"+e+"-lollipopStart)");break;default:}switch(r.arrowTypeEnd){case"arrow_cross":t.attr("marker-end","url("+l+"#"+e+"-crossEnd)");break;case"arrow_point":t.attr("marker-end","url("+l+"#"+e+"-pointEnd)");break;case"arrow_barb":t.attr("marker-end","url("+l+"#"+e+"-barbEnd)");break;case"arrow_circle":t.attr("marker-end","url("+l+"#"+e+"-circleEnd)");break;case"aggregation":t.attr("marker-end","url("+l+"#"+e+"-aggregationEnd)");break;case"extension":t.attr("marker-end","url("+l+"#"+e+"-extensionEnd)");break;case"composition":t.attr("marker-end","url("+l+"#"+e+"-compositionEnd)");break;case"dependency":t.attr("marker-end","url("+l+"#"+e+"-dependencyEnd)");break;case"lollipop":t.attr("marker-end","url("+l+"#"+e+"-lollipopEnd)");break;default:}},"addMarkersToEdge"),lt=f(function(t,r){h.info("Extracting classes"),r.db.clear("ver-2");try{return r.parse(t),r.db.getClasses()}catch{return{}}},"getClasses"),nt=f(function(t){let r={parentById:{},childrenById:{}},e=t.getSubGraphs();return h.info("Subgraphs - ",e),e.forEach(function(o){o.nodes.forEach(function(l){r.parentById[l]=o.id,r.childrenById[o.id]===void 0&&(r.childrenById[o.id]=[]),r.childrenById[o.id].push(l)})}),e.forEach(function(o){let l={id:o.id};r.parentById[o.id]!==void 0&&(l.parent=r.parentById[o.id])}),r},"addSubGraphs"),st=f(function(t,r,e){let o=A(t,r,e);if(o===void 0||o==="root")return{x:0,y:0};let l=C[o].offset;return{x:l.posX,y:l.posY}},"calcOffset"),it=f(function(t,r,e,o,l){let n=st(r.sourceId,r.targetId,l),k=r.sections[0].startPoint,s=r.sections[0].endPoint,c=(r.sections[0].bendPoints?r.sections[0].bendPoints:[]).map(p=>[p.x+n.x,p.y+n.y]),u=[[k.x+n.x,k.y+n.y],...c,[s.x+n.x,s.y+n.y]],i=Y().curve(D),b=t.insert("path").attr("d",i(u)).attr("class","path "+e.classes).attr("fill","none"),_=t.insert("g").attr("class","edgeLabel"),a=L(_.node().appendChild(r.labelEl)),y=a.node().firstChild.getBoundingClientRect();a.attr("width",y.width),a.attr("height",y.height),_.attr("transform",`translate(${r.labels[0].x+n.x}, ${r.labels[0].y+n.y})`),at(b,e,o.type,o.arrowMarkerAbsolute)},"insertEdge"),J=f((t,r)=>{t.forEach(e=>{e.children||(e.children=[]);let o=r.childrenById[e.id];o&&o.forEach(l=>{e.children.push(C[l])}),J(e.children,r)})},"insertChildren"),ct=f(async function(t,r,e,o){o.db.clear(),C={},g={},o.db.setGen("gen-2"),o.parser.parse(t);let l=L("body").append("div").attr("style","height:400px").attr("id","cy"),n={id:"root",layoutOptions:{"elk.hierarchyHandling":"INCLUDE_CHILDREN","org.eclipse.elk.padding":"[top=100, left=100, bottom=110, right=110]","elk.layered.spacing.edgeNodeBetweenLayers":"30","elk.direction":"DOWN"},children:[],edges:[]};switch(h.info("Drawing flowchart using v3 renderer",M),o.db.getDirection()){case"BT":n.layoutOptions["elk.direction"]="UP";break;case"TB":n.layoutOptions["elk.direction"]="DOWN";break;case"LR":n.layoutOptions["elk.direction"]="RIGHT";break;case"RL":n.layoutOptions["elk.direction"]="LEFT";break}let{securityLevel:s,flowchart:w}=T(),c;s==="sandbox"&&(c=L("#i"+r));let u=s==="sandbox"?L(c.nodes()[0].contentDocument.body):L("body"),i=s==="sandbox"?c.nodes()[0].contentDocument:document,b=u.select(`[id="${r}"]`);W(b,["point","circle","cross"],o.type,o.arrowMarkerAbsolute);let a=o.db.getVertices(),y,p=o.db.getSubGraphs();h.info("Subgraphs - ",p);for(let x=p.length-1;x>=0;x--)y=p[x],o.db.addVertex(y.id,{text:y.title,type:y.labelType},"group",void 0,y.classes,y.dir);let I=b.insert("g").attr("class","subgraphs"),E=nt(o.db);n=await et(a,r,u,i,o,E,n);let d=b.insert("g").attr("class","edges edgePath"),B=o.db.getEdges();n=ot(B,o,n,b),Object.keys(C).forEach(x=>{let m=C[x];m.parent||n.children.push(m),E.childrenById[x]!==void 0&&(m.labels=[{text:m.labelText,layoutOptions:{"nodeLabels.placement":"[H_CENTER, V_TOP, INSIDE]"},width:m.labelData.width,height:m.labelData.height}],delete m.x,delete m.y,delete m.width,delete m.height)}),J(n.children,E),h.info("after layout",JSON.stringify(n,null,2));let S=await M.layout(n);K(0,0,S.children,b,I,o,0),h.info("after layout",S),S.edges?.map(x=>{it(d,x,x.edgeData,o,E)}),G({},b,w.diagramPadding,w.useMaxWidth),l.remove()},"draw"),K=f((t,r,e,o,l,n,k)=>{e.forEach(function(s){if(s)if(C[s.id].offset={posX:s.x+t,posY:s.y+r,x:t,y:r,depth:k,width:s.width,height:s.height},s.type==="group"){let w=l.insert("g").attr("class","subgraph");w.insert("rect").attr("class","subgraph subgraph-lvl-"+k%5+" node").attr("x",s.x+t).attr("y",s.y+r).attr("width",s.width).attr("height",s.height);let c=w.insert("g").attr("class","label"),u=T().flowchart.htmlLabels?s.labelData.width/2:0;c.attr("transform",`translate(${s.labels[0].x+t+s.x+u}, ${s.labels[0].y+r+s.y+3})`),c.node().appendChild(s.labelData.labelNode),h.info("Id (UGH)= ",s.type,s.labels)}else h.info("Id (UGH)= ",s.id),s.el.attr("transform",`translate(${s.x+t+s.width/2}, ${s.y+r+s.height/2})`)}),e.forEach(function(s){s&&s.type==="group"&&K(t+s.x,r+s.y,s.children,o,l,n,k+1)})},"drawNodes"),Q={getClasses:lt,draw:ct};var dt=f(t=>{let r="";for(let e=0;e<5;e++)r+=`
      .subgraph-lvl-${e} {
        fill: ${t[`surface${e}`]};
        stroke: ${t[`surfacePeer${e}`]};
      }
    `;return r},"genSections"),ut=f(t=>`.label {
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
      opacity: 0.85;
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

  .flowchart-label text {
    text-anchor: middle;
  }

  ${dt(t)}
`,"getStyles"),Z=ut;var Ht={db:F,renderer:Q,parser:H,styles:Z};export{Ht as diagram};
