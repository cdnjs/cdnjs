import{b as V}from"./chunk-JJQVDDLD.mjs";import{a as q}from"./chunk-QSKPVBPO.mjs";import{n as $,o as B,x as P}from"./chunk-7HHNZHC5.mjs";import{b as z,d as N}from"./chunk-LT56AXER.mjs";import{a as m,c as f,p as C,t as F}from"./chunk-RKGGAEC6.mjs";import*as M from"dagre-d3-es/src/graphlib/index.js";import{select as E,curveLinear as A,selectAll as W}from"d3";import{addHtmlLabel as X}from"dagre-d3-es/src/dagre-js/label/add-html-label.js";var R={},J=m(function(t){let n=Object.keys(t);for(let y of n)R[y]=t[y]},"setConf"),U=m(function(t,n,y,s,i,p){let u=s.select(`[id="${y}"]`);Object.keys(t).forEach(function(c){let r=t[c],g="default";r.classes.length>0&&(g=r.classes.join(" ")),g=g+" flowchart-label";let w=B(r.styles),e=r.text!==void 0?r.text:r.id,a;if(f.info("vertex",r,r.labelType),r.labelType==="markdown")f.info("vertex",r,r.labelType);else if(z(C().flowchart.htmlLabels)){let S={label:e.replace(/fa[blrs]?:fa-[\w-]+/g,k=>`<i class='${k.replace(":"," ")}'></i>`)};a=X(u,S).node(),a.parentNode.removeChild(a)}else{let S=i.createElementNS("http://www.w3.org/2000/svg","text");S.setAttribute("style",w.labelStyle.replace("color:","fill:"));let k=e.split(N.lineBreakRegex);for(let _ of k){let v=i.createElementNS("http://www.w3.org/2000/svg","tspan");v.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),v.setAttribute("dy","1em"),v.setAttribute("x","1"),v.textContent=_,S.appendChild(v)}a=S}let d=0,l="";switch(r.type){case"round":d=5,l="rect";break;case"square":l="rect";break;case"diamond":l="question";break;case"hexagon":l="hexagon";break;case"odd":l="rect_left_inv_arrow";break;case"lean_right":l="lean_right";break;case"lean_left":l="lean_left";break;case"trapezoid":l="trapezoid";break;case"inv_trapezoid":l="inv_trapezoid";break;case"odd_right":l="rect_left_inv_arrow";break;case"circle":l="circle";break;case"ellipse":l="ellipse";break;case"stadium":l="stadium";break;case"subroutine":l="subroutine";break;case"cylinder":l="cylinder";break;case"group":l="rect";break;case"doublecircle":l="doublecircle";break;default:l="rect"}n.setNode(r.id,{labelStyle:w.labelStyle,shape:l,labelText:e,labelType:r.labelType,rx:d,ry:d,class:g,style:w.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:p.db.getTooltip(r.id)||"",domId:p.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:C().flowchart.padding}),f.info("setNode",{labelStyle:w.labelStyle,labelType:r.labelType,shape:l,labelText:e,rx:d,ry:d,class:g,style:w.style,id:r.id,domId:p.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:C().flowchart.padding})})},"addVertices"),H=m(function(t,n,y){f.info("abc78 edges = ",t);let s=0,i={},p,u;if(t.defaultStyle!==void 0){let o=B(t.defaultStyle);p=o.style,u=o.labelStyle}t.forEach(function(o){s++;let c="L-"+o.start+"-"+o.end;i[c]===void 0?(i[c]=0,f.info("abc78 new entry",c,i[c])):(i[c]++,f.info("abc78 new entry",c,i[c]));let r=c+"-"+i[c];f.info("abc78 new link id to be used is",c,r,i[c]);let g="LS-"+o.start,w="LE-"+o.end,e={style:"",labelStyle:""};switch(e.minlen=o.length||1,o.type==="arrow_open"?e.arrowhead="none":e.arrowhead="normal",e.arrowTypeStart="arrow_open",e.arrowTypeEnd="arrow_open",o.type){case"double_arrow_cross":e.arrowTypeStart="arrow_cross";case"arrow_cross":e.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":e.arrowTypeStart="arrow_point";case"arrow_point":e.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":e.arrowTypeStart="arrow_circle";case"arrow_circle":e.arrowTypeEnd="arrow_circle";break}let a="",d="";switch(o.stroke){case"normal":a="fill:none;",p!==void 0&&(a=p),u!==void 0&&(d=u),e.thickness="normal",e.pattern="solid";break;case"dotted":e.thickness="normal",e.pattern="dotted",e.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":e.thickness="thick",e.pattern="solid",e.style="stroke-width: 3.5px;fill:none;";break;case"invisible":e.thickness="invisible",e.pattern="solid",e.style="stroke-width: 0;fill:none;";break}if(o.style!==void 0){let l=B(o.style);a=l.style,d=l.labelStyle}e.style=e.style+=a,e.labelStyle=e.labelStyle+=d,o.interpolate!==void 0?e.curve=$(o.interpolate,A):t.defaultInterpolate!==void 0?e.curve=$(t.defaultInterpolate,A):e.curve=$(R.curve,A),o.text===void 0?o.style!==void 0&&(e.arrowheadStyle="fill: #333"):(e.arrowheadStyle="fill: #333",e.labelpos="c"),e.labelType=o.labelType,e.label=o.text.replace(N.lineBreakRegex,`
`),o.style===void 0&&(e.style=e.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),e.labelStyle=e.labelStyle.replace("color:","fill:"),e.id=r,e.classes="flowchart-link "+g+" "+w,n.setEdge(o.start,o.end,e,s)})},"addEdges"),K=m(function(t,n){f.info("Extracting classes"),n.db.clear();try{return n.parse(t),n.db.getClasses()}catch{return}},"getClasses"),Q=m(async function(t,n,y,s){f.info("Drawing flowchart"),s.db.clear(),V.setGen("gen-2"),s.parser.parse(t);let i=s.db.getDirection();i===void 0&&(i="TD");let{securityLevel:p,flowchart:u}=C(),o=u.nodeSpacing||50,c=u.rankSpacing||50,r;p==="sandbox"&&(r=E("#i"+n));let g=p==="sandbox"?E(r.nodes()[0].contentDocument.body):E("body"),w=p==="sandbox"?r.nodes()[0].contentDocument:document,e=new M.Graph({multigraph:!0,compound:!0}).setGraph({rankdir:i,nodesep:o,ranksep:c,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),a,d=s.db.getSubGraphs();f.info("Subgraphs - ",d);for(let b=d.length-1;b>=0;b--)a=d[b],f.info("Subgraph - ",a),s.db.addVertex(a.id,{text:a.title,type:a.labelType},"group",void 0,a.classes,a.dir);let l=s.db.getVertices(),S=s.db.getEdges();f.info("Edges",S);let k=0;for(k=d.length-1;k>=0;k--){a=d[k],W("cluster").append("text");for(let b=0;b<a.nodes.length;b++)f.info("Setting up subgraphs",a.nodes[b],a.id),e.setParent(a.nodes[b],a.id)}U(l,e,n,g,w,s),H(S,e,s);let _=g.select(`[id="${n}"]`),v=g.select("#"+n+" g");if(await q(v,e,["point","circle","cross"],"flowchart",n),P.insertTitle(_,"flowchartTitleText",u.titleTopMargin,s.db.getDiagramTitle()),F(e,_,u.diagramPadding,u.useMaxWidth),s.db.indexNodes("subGraph"+k),!u.htmlLabels){let b=w.querySelectorAll('[id="'+n+'"] .edgeLabel .label');for(let x of b){let T=x.getBBox(),h=w.createElementNS("http://www.w3.org/2000/svg","rect");h.setAttribute("rx",0),h.setAttribute("ry",0),h.setAttribute("width",T.width),h.setAttribute("height",T.height),x.insertBefore(h,x.firstChild)}}Object.keys(l).forEach(function(b){let x=l[b];if(x.link){let T=E("#"+n+' [id="'+b+'"]');if(T){let h=w.createElementNS("http://www.w3.org/2000/svg","a");h.setAttributeNS("http://www.w3.org/2000/svg","class",x.classes.join(" ")),h.setAttributeNS("http://www.w3.org/2000/svg","href",x.link),h.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),p==="sandbox"?h.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):x.linkTarget&&h.setAttributeNS("http://www.w3.org/2000/svg","target",x.linkTarget);let D=T.insert(function(){return h},":first-child"),I=T.select(".label-container");I&&D.append(function(){return I.node()});let G=T.select(".label");G&&D.append(function(){return G.node()})}}})},"draw"),ce={setConf:J,addVertices:U,addEdges:H,getClasses:K,draw:Q};import*as L from"khroma";var Y=m((t,n)=>{let y=L.channel,s=y(t,"r"),i=y(t,"g"),p=y(t,"b");return L.rgba(s,i,p,n)},"fade"),Z=m(t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor||t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span,p {
    color: ${t.titleColor};
  }

  .label text,span,p {
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
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

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

  /* For html labels only */
  .labelBkg {
    background-color: ${Y(t.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span,p {
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
`,"getStyles"),fe=Z;export{ce as a,fe as b};
