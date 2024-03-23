import{a as J}from"./chunk-FI6ZHBMQ.mjs";import{a as Z}from"./chunk-OWPF4DIE.mjs";import"./chunk-MED7QE4J.mjs";import"./chunk-35FVJ6R2.mjs";import"./chunk-STA64UF7.mjs";import"./chunk-NUELN2OO.mjs";import{a as H}from"./chunk-77XW3JYJ.mjs";import"./chunk-VMDNBU76.mjs";import"./chunk-LEAL3RNQ.mjs";import{k as _,l as z}from"./chunk-GUXPPH4Y.mjs";import"./chunk-EZ6AQD5Z.mjs";import"./chunk-RS46GSJM.mjs";import{E as T,H as R,Ia as B,La as W,Ma as I,Na as L,Oa as M,Pa as q,Qa as N,Ra as U,Ta as V,b as l,l as G,pa as F}from"./chunk-YQ72SJ4U.mjs";import{a as t}from"./chunk-J73WXDYM.mjs";var K=F.pie,u={sections:{},showData:!1,config:K},S=u.sections,b=u.showData,ce=structuredClone(K),pe=t(()=>structuredClone(ce),"getConfig"),le=t(()=>{S=structuredClone(u.sections),b=u.showData,W()},"clear"),me=t(({label:e,value:i})=>{S[e]===void 0&&(S[e]=i,l.debug(`added new section: ${e}, with value: ${i}`))},"addSection"),de=t(()=>S,"getSections"),fe=t(e=>{b=e},"setShowData"),ge=t(()=>b,"getShowData"),y={getConfig:pe,clear:le,setDiagramTitle:N,getDiagramTitle:U,setAccTitle:I,getAccTitle:L,setAccDescription:M,getAccDescription:q,addSection:me,getSections:de,setShowData:fe,getShowData:ge};var De=t((e,i)=>{J(e,i),i.setShowData(e.showData),e.sections.map(i.addSection)},"populateDb"),Q={parse:async e=>{let i=await Z("pie",e);l.debug(i),De(i,y)}};var ue=t(e=>`
  .pieCircle{
    stroke: ${e.pieStrokeColor};
    stroke-width : ${e.pieStrokeWidth};
    opacity : ${e.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${e.pieOuterStrokeColor};
    stroke-width: ${e.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${e.pieTitleTextSize};
    fill: ${e.pieTitleTextColor};
    font-family: ${e.fontFamily};
  }
  .slice {
    font-family: ${e.fontFamily};
    fill: ${e.pieSectionTextColor};
    font-size:${e.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${e.pieLegendTextColor};
    font-family: ${e.fontFamily};
    font-size: ${e.pieLegendTextSize};
  }
`,"getStyles"),X=ue;var Se=t(e=>{let i=Object.entries(e).map(n=>({label:n[0],value:n[1]})).sort((n,s)=>s.value-n.value);return R().value(n=>n.value)(i)},"createPieArcs"),ye=t((e,i,ee,n)=>{l.debug(`rendering pie chart
`+e);let s=n.db,w=V(),v=z(s.getConfig(),w.pie),$=40,a=18,d=4,c=450,P=c,h=H(i),p=h.append("g");p.attr("transform","translate("+P/2+","+c/2+")");let{themeVariables:r}=w,[k]=_(r.pieOuterStrokeWidth);k??=2;let E=v.textPosition,f=Math.min(P,c)/2-$,te=T().innerRadius(0).outerRadius(f),ie=T().innerRadius(f*E).outerRadius(f*E);p.append("circle").attr("cx",0).attr("cy",0).attr("r",f+k/2).attr("class","pieOuterCircle");let x=s.getSections(),C=Se(x),re=[r.pie1,r.pie2,r.pie3,r.pie4,r.pie5,r.pie6,r.pie7,r.pie8,r.pie9,r.pie10,r.pie11,r.pie12],m=G(re);p.selectAll("mySlices").data(C).enter().append("path").attr("d",te).attr("fill",o=>m(o.data.label)).attr("class","pieCircle");let O=0;Object.keys(x).forEach(o=>{O+=x[o]}),p.selectAll("mySlices").data(C).enter().append("text").text(o=>(o.data.value/O*100).toFixed(0)+"%").attr("transform",o=>"translate("+ie.centroid(o)+")").style("text-anchor","middle").attr("class","slice"),p.append("text").text(s.getDiagramTitle()).attr("x",0).attr("y",-(c-50)/2).attr("class","pieTitleText");let A=p.selectAll(".legend").data(m.domain()).enter().append("g").attr("class","legend").attr("transform",(o,g)=>{let D=a+d,ne=D*m.domain().length/2,ae=12*a,se=g*D-ne;return"translate("+ae+","+se+")"});A.append("rect").attr("width",a).attr("height",a).style("fill",m).style("stroke",m),A.data(C).append("text").attr("x",a+d).attr("y",a-d).text(o=>{let{label:g,value:D}=o.data;return s.getShowData()?`${g} [${D}]`:g});let oe=Math.max(...A.selectAll("text").nodes().map(o=>o?.getBoundingClientRect().width??0)),j=P+$+a+d+oe;h.attr("viewBox",`0 0 ${j} ${c}`),B(h,c,j,v.useMaxWidth)},"draw"),Y={draw:ye};var Ne={parser:Q,db:y,renderer:Y,styles:X};export{Ne as diagram};
