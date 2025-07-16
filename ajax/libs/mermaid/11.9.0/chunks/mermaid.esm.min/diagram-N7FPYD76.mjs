import{a as z}from"./chunk-4KE642ED.mjs";import{a as j}from"./chunk-UQ4X76PG.mjs";import"./chunk-PLCDSWN2.mjs";import"./chunk-BQEYV4WX.mjs";import"./chunk-F5P7Q7EI.mjs";import"./chunk-MO23DTBY.mjs";import"./chunk-YVFZI336.mjs";import{a as E}from"./chunk-HEMZA52I.mjs";import{l as y}from"./chunk-YR5264OA.mjs";import"./chunk-TI4EEUUG.mjs";import{A as x,N as C,Q as w,R as S,S as B,T as $,U as v,V as W,W as F,b as P,s as D}from"./chunk-U6SPV2NK.mjs";import"./chunk-F5X5OFIH.mjs";import"./chunk-CIPFSH2J.mjs";import"./chunk-QFDCAKKT.mjs";import"./chunk-5ZJXQJOJ.mjs";import"./chunk-YPUTD6PB.mjs";import"./chunk-6BY5RJGC.mjs";import{a}from"./chunk-GTKDMUJJ.mjs";var G={packet:[]},h=structuredClone(G),q=D.packet,V=a(()=>{let t=y({...q,...x().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),L=a(()=>h.packet,"getPacket"),N=a(t=>{t.length>0&&h.packet.push(t)},"pushWord"),I=a(()=>{w(),h=structuredClone(G)},"clear"),f={pushWord:N,getPacket:L,getConfig:V,clear:I,setAccTitle:S,getAccTitle:B,setDiagramTitle:W,getDiagramTitle:F,getAccDescription:v,setAccDescription:$};var M=1e4,Y=a(t=>{z(t,f);let e=-1,i=[],n=1,{bitsPerRow:s}=f.getConfig();for(let{start:r,end:o,bits:l,label:k}of t.blocks){if(r!==void 0&&o!==void 0&&o<r)throw new Error(`Packet block ${r} - ${o} is invalid. End must be greater than start.`);if(r??=e+1,r!==e+1)throw new Error(`Packet block ${r} - ${o??r} is not contiguous. It should start from ${e+1}.`);if(l===0)throw new Error(`Packet block ${r} is invalid. Cannot have a zero bit field.`);for(o??=r+(l??1)-1,l??=o-r+1,e=o,P.debug(`Packet block ${r} - ${e} with label ${k}`);i.length<=s+1&&f.getPacket().length<M;){let[d,p]=U({start:r,end:o,bits:l,label:k},n,s);if(i.push(d),d.end+1===n*s&&(f.pushWord(i),i=[],n++),!p)break;({start:r,end:o,bits:l,label:k}=p)}}f.pushWord(i)},"populate"),U=a((t,e,i)=>{if(t.start===void 0)throw new Error("start should have been set during first phase");if(t.end===void 0)throw new Error("end should have been set during first phase");if(t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);if(t.end+1<=e*i)return[t,void 0];let n=e*i-1,s=e*i;return[{start:t.start,end:n,label:t.label,bits:n-t.start},{start:s,end:t.end,label:t.label,bits:t.end-s}]},"getNextFittingBlock"),T={parse:a(async t=>{let e=await j("packet",t);P.debug(e),Y(e)},"parse")};var H=a((t,e,i,n)=>{let s=n.db,r=s.getConfig(),{rowHeight:o,paddingY:l,bitWidth:k,bitsPerRow:d}=r,p=s.getPacket(),c=s.getDiagramTitle(),g=o+l,m=g*(p.length+1)-(c?0:o),u=k*d+2,b=E(e);b.attr("viewbox",`0 0 ${u} ${m}`),C(b,m,u,r.useMaxWidth);for(let[O,_]of p.entries())K(b,_,O,r);b.append("text").text(c).attr("x",u/2).attr("y",m-g/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),K=a((t,e,i,{rowHeight:n,paddingX:s,paddingY:r,bitWidth:o,bitsPerRow:l,showBits:k})=>{let d=t.append("g"),p=i*(n+r)+r;for(let c of e){let g=c.start%l*o+1,m=(c.end-c.start+1)*o-s;if(d.append("rect").attr("x",g).attr("y",p).attr("width",m).attr("height",n).attr("class","packetBlock"),d.append("text").attr("x",g+m/2).attr("y",p+n/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(c.label),!k)continue;let u=c.end===c.start,b=p-2;d.append("text").attr("x",g+(u?m/2:0)).attr("y",b).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",u?"middle":"start").text(c.start),u||d.append("text").attr("x",g+m).attr("y",b).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(c.end)}},"drawWord"),A={draw:H};var X={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},R=a(({packet:t}={})=>{let e=y(X,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles");var ht={parser:T,db:f,renderer:A,styles:R};export{ht as diagram};
