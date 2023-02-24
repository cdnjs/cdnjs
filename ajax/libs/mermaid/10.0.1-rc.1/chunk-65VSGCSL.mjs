"use strict";
import{b as P}from"./chunk-7PSWLX2Z.mjs";import{a as V}from"./chunk-DKVPHEKY.mjs";import{m as $,n as E,x as F}from"./chunk-2VMR5VN5.mjs";import{b as z}from"./chunk-J6WLZWQH.mjs";import{c as m,f as h,i as G,k as L,u as _}from"./chunk-PHEFMIGI.mjs";import*as q from"dagre-d3-es/src/graphlib/index.js";import{select as B,curveLinear as N,selectAll as H}from"d3";import{addHtmlLabel as W}from"dagre-d3-es/src/dagre-js/label/add-html-label.js";var M={},X=m(function(t){let n=Object.keys(t);for(let S of n)M[S]=t[S]},"setConf"),R=m(function(t,n,S,s,d,p){let b=s.select(`[id="${S}"]`);Object.keys(t).forEach(function(i){let r=t[i],y="default";r.classes.length>0&&(y=r.classes.join(" "));let u=E(r.styles),e=r.text!==void 0?r.text:r.id,a;if(G(_().flowchart.htmlLabels)){let x={label:e.replace(/fa[blrs]?:fa-[\w-]+/g,g=>`<i class='${g.replace(":"," ")}'></i>`)};a=W(b,x).node(),a.parentNode.removeChild(a)}else{let x=d.createElementNS("http://www.w3.org/2000/svg","text");x.setAttribute("style",u.labelStyle.replace("color:","fill:"));let g=e.split(L.lineBreakRegex);for(let T of g){let v=d.createElementNS("http://www.w3.org/2000/svg","tspan");v.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),v.setAttribute("dy","1em"),v.setAttribute("x","1"),v.textContent=T,x.appendChild(v)}a=x}let c=0,l="";switch(r.type){case"round":c=5,l="rect";break;case"square":l="rect";break;case"diamond":l="question";break;case"hexagon":l="hexagon";break;case"odd":l="rect_left_inv_arrow";break;case"lean_right":l="lean_right";break;case"lean_left":l="lean_left";break;case"trapezoid":l="trapezoid";break;case"inv_trapezoid":l="inv_trapezoid";break;case"odd_right":l="rect_left_inv_arrow";break;case"circle":l="circle";break;case"ellipse":l="ellipse";break;case"stadium":l="stadium";break;case"subroutine":l="subroutine";break;case"cylinder":l="cylinder";break;case"group":l="rect";break;case"doublecircle":l="doublecircle";break;default:l="rect"}n.setNode(r.id,{labelStyle:u.labelStyle,shape:l,labelText:e,rx:c,ry:c,class:y,style:u.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:p.db.getTooltip(r.id)||"",domId:p.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:_().flowchart.padding}),h.info("setNode",{labelStyle:u.labelStyle,shape:l,labelText:e,rx:c,ry:c,class:y,style:u.style,id:r.id,domId:p.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:_().flowchart.padding})})},"addVertices"),U=m(function(t,n,S){h.info("abc78 edges = ",t);let s=0,d={},p,b;if(t.defaultStyle!==void 0){let o=E(t.defaultStyle);p=o.style,b=o.labelStyle}t.forEach(function(o){s++;var i="L-"+o.start+"-"+o.end;d[i]===void 0?(d[i]=0,h.info("abc78 new entry",i,d[i])):(d[i]++,h.info("abc78 new entry",i,d[i]));let r=i+"-"+d[i];h.info("abc78 new link id to be used is",i,r,d[i]);var y="LS-"+o.start,u="LE-"+o.end;let e={style:"",labelStyle:""};switch(e.minlen=o.length||1,o.type==="arrow_open"?e.arrowhead="none":e.arrowhead="normal",e.arrowTypeStart="arrow_open",e.arrowTypeEnd="arrow_open",o.type){case"double_arrow_cross":e.arrowTypeStart="arrow_cross";case"arrow_cross":e.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":e.arrowTypeStart="arrow_point";case"arrow_point":e.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":e.arrowTypeStart="arrow_circle";case"arrow_circle":e.arrowTypeEnd="arrow_circle";break}let a="",c="";switch(o.stroke){case"normal":a="fill:none;",p!==void 0&&(a=p),b!==void 0&&(c=b),e.thickness="normal",e.pattern="solid";break;case"dotted":e.thickness="normal",e.pattern="dotted",e.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":e.thickness="thick",e.pattern="solid",e.style="stroke-width: 3.5px;fill:none;";break;case"invisible":e.thickness="invisible",e.pattern="solid",e.style="stroke-width: 0;fill:none;";break}if(o.style!==void 0){let l=E(o.style);a=l.style,c=l.labelStyle}e.style=e.style+=a,e.labelStyle=e.labelStyle+=c,o.interpolate!==void 0?e.curve=$(o.interpolate,N):t.defaultInterpolate!==void 0?e.curve=$(t.defaultInterpolate,N):e.curve=$(M.curve,N),o.text===void 0?o.style!==void 0&&(e.arrowheadStyle="fill: #333"):(e.arrowheadStyle="fill: #333",e.labelpos="c"),e.labelType="text",e.label=o.text.replace(L.lineBreakRegex,`
`),o.style===void 0&&(e.style=e.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),e.labelStyle=e.labelStyle.replace("color:","fill:"),e.id=r,e.classes="flowchart-link "+y+" "+u,n.setEdge(o.start,o.end,e,s)})},"addEdges"),J=m(function(t,n){h.info("Extracting classes"),n.db.clear();try{return n.parse(t),n.db.getClasses()}catch(S){return}},"getClasses"),K=m(function(t,n,S,s){h.info("Drawing flowchart"),s.db.clear(),P.setGen("gen-2"),s.parser.parse(t);let d=s.db.getDirection();d===void 0&&(d="TD");let{securityLevel:p,flowchart:b}=_(),o=b.nodeSpacing||50,i=b.rankSpacing||50,r;p==="sandbox"&&(r=B("#i"+n));let y=p==="sandbox"?B(r.nodes()[0].contentDocument.body):B("body"),u=p==="sandbox"?r.nodes()[0].contentDocument:document,e=new q.Graph({multigraph:!0,compound:!0}).setGraph({rankdir:d,nodesep:o,ranksep:i,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}}),a,c=s.db.getSubGraphs();h.info("Subgraphs - ",c);for(let f=c.length-1;f>=0;f--)a=c[f],h.info("Subgraph - ",a),s.db.addVertex(a.id,a.title,"group",void 0,a.classes,a.dir);let l=s.db.getVertices(),x=s.db.getEdges();h.info("Edges",x);let g=0;for(g=c.length-1;g>=0;g--){a=c[g],H("cluster").append("text");for(let f=0;f<a.nodes.length;f++)h.info("Setting up subgraphs",a.nodes[f],a.id),e.setParent(a.nodes[f],a.id)}R(l,e,n,y,u,s),U(x,e,s);let T=y.select(`[id="${n}"]`),v=y.select("#"+n+" g");if(V(v,e,["point","circle","cross"],"flowchart",n),F.insertTitle(T,"flowchartTitleText",b.titleTopMargin,s.db.getDiagramTitle()),z(e,T,b.diagramPadding,b.useMaxWidth),s.db.indexNodes("subGraph"+g),!b.htmlLabels){let f=u.querySelectorAll('[id="'+n+'"] .edgeLabel .label');for(let k of f){let C=k.getBBox(),w=u.createElementNS("http://www.w3.org/2000/svg","rect");w.setAttribute("rx",0),w.setAttribute("ry",0),w.setAttribute("width",C.width),w.setAttribute("height",C.height),k.insertBefore(w,k.firstChild)}}Object.keys(l).forEach(function(f){let k=l[f];if(k.link){let C=B("#"+n+' [id="'+f+'"]');if(C){let w=u.createElementNS("http://www.w3.org/2000/svg","a");w.setAttributeNS("http://www.w3.org/2000/svg","class",k.classes.join(" ")),w.setAttributeNS("http://www.w3.org/2000/svg","href",k.link),w.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),p==="sandbox"?w.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):k.linkTarget&&w.setAttributeNS("http://www.w3.org/2000/svg","target",k.linkTarget);let A=C.insert(function(){return w},":first-child"),D=C.select(".label-container");D&&A.append(function(){return D.node()});let I=C.select(".label");I&&A.append(function(){return I.node()})}}})},"draw"),se={setConf:X,addVertices:R,addEdges:U,getClasses:J,draw:K};var Q=m(t=>`.label {
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
`,"getStyles"),de=Q;export{se as a,de as b};
