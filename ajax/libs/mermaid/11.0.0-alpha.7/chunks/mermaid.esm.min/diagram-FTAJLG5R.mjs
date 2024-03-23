import{a as T}from"./chunk-FI6ZHBMQ.mjs";import{a as v}from"./chunk-OWPF4DIE.mjs";import"./chunk-MED7QE4J.mjs";import"./chunk-35FVJ6R2.mjs";import"./chunk-STA64UF7.mjs";import"./chunk-NUELN2OO.mjs";import{a as z}from"./chunk-77XW3JYJ.mjs";import"./chunk-VMDNBU76.mjs";import"./chunk-LEAL3RNQ.mjs";import{l as u}from"./chunk-GUXPPH4Y.mjs";import"./chunk-EZ6AQD5Z.mjs";import"./chunk-RS46GSJM.mjs";import{Fa as x,Ia as C,La as B,Ma as S,Na as $,Oa as w,Pa as W,Qa as F,Ra as j,b,pa as h}from"./chunk-YQ72SJ4U.mjs";import{a as o}from"./chunk-J73WXDYM.mjs";var A={packet:[]},D=structuredClone(A),q=h.packet,L=o(()=>{let t=u({...q,...x().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),N=o(()=>D.packet,"getPacket"),I=o(t=>{t.length>0&&D.packet.push(t)},"pushWord"),M=o(()=>{B(),D=structuredClone(A)},"clear"),d={pushWord:I,getPacket:N,getConfig:L,clear:M,setAccTitle:S,getAccTitle:$,setDiagramTitle:F,getDiagramTitle:j,getAccDescription:W,setAccDescription:w};var V=1e4,Y=o(t=>{T(t,d);let e=-1,i=[],s=1,{bitsPerRow:c}=d.getConfig();for(let{start:r,end:a,label:m}of t.blocks){if(a&&a<r)throw new Error(`Packet block ${r} - ${a} is invalid. End must be greater than start.`);if(r!==e+1)throw new Error(`Packet block ${r} - ${a??r} is not contiguous. It should start from ${e+1}.`);for(e=a??r,b.debug(`Packet block ${r} - ${e} with label ${m}`);i.length<=c+1&&d.getPacket().length<V;){let[y,l]=U({start:r,end:a,label:m},s,c);if(i.push(y),y.end+1===s*c&&(d.pushWord(i),i=[],s++),!l)break;({start:r,end:a,label:m}=l)}}d.pushWord(i)},"populate"),U=o((t,e,i)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*i?[t,void 0]:[{start:t.start,end:e*i-1,label:t.label},{start:e*i,end:t.end,label:t.label}]},"getNextFittingBlock"),E={parse:async t=>{let e=await v("packet",t);b.debug(e),Y(e)}};var H=o((t,e,i,s)=>{let c=s.db,r=c.getConfig(),{rowHeight:a,paddingY:m,bitWidth:y,bitsPerRow:l}=r,P=c.getPacket(),n=c.getDiagramTitle(),f=a+m,p=f*(P.length+1)-(n?0:a),k=y*l+2,g=z(e);g.attr("viewbox",`0 0 ${k} ${p}`),C(g,p,k,r.useMaxWidth);for(let[O,_]of P.entries())K(g,_,O,r);g.append("text").text(n).attr("x",k/2).attr("y",p-f/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),K=o((t,e,i,{rowHeight:s,paddingX:c,paddingY:r,bitWidth:a,bitsPerRow:m,showBits:y})=>{let l=t.append("g"),P=i*(s+r)+r;for(let n of e){let f=n.start%m*a+1,p=(n.end-n.start+1)*a-c;if(l.append("rect").attr("x",f).attr("y",P).attr("width",p).attr("height",s).attr("class","packetBlock"),l.append("text").attr("x",f+p/2).attr("y",P+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(n.label),!y)continue;let k=n.end===n.start,g=P-2;l.append("text").attr("x",f+(k?p/2:0)).attr("y",g).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(n.start),k||l.append("text").attr("x",f+p).attr("y",g).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(n.end)}},"drawWord"),G={draw:H};var X={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},R=o(({packet:t}={})=>{let e=u(X,t);return`
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
	`},"styles");var Dt={parser:E,db:d,renderer:G,styles:R};export{Dt as diagram};
