;(function(){
var UPNG = {};

// Make available for import by `require()`
if (typeof module == "object") {module.exports = UPNG;}
else {window.UPNG = UPNG;}

var pako;
if (typeof require == "function") {pako = require("pako");}
else {pako = window.pako;}

function log() { if (typeof process=="undefined" || process.env.NODE_ENV=="development") console.log.apply(console, arguments);  }

(function(UPNG, pako){

UPNG.toRGBA8 = function(out)
{
	//console.log(out.ctype, out.depth);
	var w = out.width, h = out.height, area = w*h, bpp = UPNG.decode._getBPP(out);
	var bpl = Math.ceil(w*bpp/8);	// bytes per line

	var bf = new Uint8Array(area*4), bf32 = new Uint32Array(bf.buffer);
	var data = out.data, ctype = out.ctype, depth = out.depth;
	var rs = UPNG._bin.readUshort;

	if     (ctype==6) { // RGB + alpha
		var qarea = area<<2;
		if(depth== 8) for(var i=0; i<qarea;i++) {  bf[i] = data[i];  /*if((i&3)==3) bf[i]=255;*/  }
		if(depth==16) for(var i=0; i<qarea;i++) {  bf[i] = data[i<<1];  }
	}
	else if(ctype==2) {	// RGB
		var ts=out.tabs["tRNS"], tr=-1, tg=-1, tb=-1;
		if(ts) {  tr=ts[0];  tg=ts[1];  tb=ts[2];  }
		if(depth== 8) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*3;  bf[qi] = data[ti];  bf[qi+1] = data[ti+1];  bf[qi+2] = data[ti+2];  bf[qi+3] = 255;
			if(tr!=-1 && data[ti]   ==tr && data[ti+1]   ==tg && data[ti+2]   ==tb) bf[qi+3] = 0;  }
		if(depth==16) for(var i=0; i<area; i++) {  var qi=i<<2, ti=i*6;  bf[qi] = data[ti];  bf[qi+1] = data[ti+2];  bf[qi+2] = data[ti+4];  bf[qi+3] = 255;
			if(tr!=-1 && rs(data,ti)==tr && rs(data,ti+2)==tg && rs(data,ti+4)==tb) bf[qi+3] = 0;  }
	}
	else if(ctype==3) {	// palette
		var p=out.tabs["PLTE"], ap=out.tabs["tRNS"], tl=ap?ap.length:0;
		if(depth==1) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>3)]>>(7-((i&7)<<0)))& 1), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==2) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>2)]>>(6-((i&3)<<1)))& 3), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==4) for(var y=0; y<h; y++) {  var s0 = y*bpl, t0 = y*w;
			for(var i=0; i<w; i++) { var qi=(t0+i)<<2, j=((data[s0+(i>>1)]>>(4-((i&1)<<2)))&15), cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
		}
		if(depth==8) for(var i=0; i<area; i++ ) {  var qi=i<<2, j=data[i]                      , cj=3*j;  bf[qi]=p[cj];  bf[qi+1]=p[cj+1];  bf[qi+2]=p[cj+2];  bf[qi+3]=(j<tl)?ap[j]:255;  }
	}
	else if(ctype==4) {	// gray + alpha
		if(depth== 8)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<1, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+1];  }
		if(depth==16)  for(var i=0; i<area; i++) {  var qi=i<<2, di=i<<2, gr=data[di];  bf[qi]=gr;  bf[qi+1]=gr;  bf[qi+2]=gr;  bf[qi+3]=data[di+2];  }
	}
	else if(ctype==0) {	// gray
		var tr = out.tabs["tRNS"] ? out.tabs["tRNS"] : -1;
		if(depth== 1) for(var i=0; i<area; i++) {  var gr=255*((data[i>>3]>>(7 -((i&7)   )))& 1), al=(gr==tr*255)?0:255;  bf32[i]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
		if(depth== 2) for(var i=0; i<area; i++) {  var gr= 85*((data[i>>2]>>(6 -((i&3)<<1)))& 3), al=(gr==tr* 85)?0:255;  bf32[i]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
		if(depth== 4) for(var i=0; i<area; i++) {  var gr= 17*((data[i>>1]>>(4 -((i&1)<<2)))&15), al=(gr==tr* 17)?0:255;  bf32[i]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
		if(depth== 8) for(var i=0; i<area; i++) {  var gr=data[i  ] , al=(gr           ==tr)?0:255;  bf32[i]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
		if(depth==16) for(var i=0; i<area; i++) {  var gr=data[i<<1], al=(rs(data,i<<1)==tr)?0:255;  bf32[i]=(al<<24)|(gr<<16)|(gr<<8)|gr;  }
	}
	else log("unsupported color type", ctype);
	return bf;
}

UPNG.encode = function(buff, w, h, ps)
{
	if(ps==null) ps=0;
	var img = new Uint8Array(buff);
	var data = new Uint8Array(img.length+100);
	var wr=[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
	for(var i=0; i<8; i++) data[i]=wr[i];
	var offset = 8,  bin = UPNG._bin, crc = UPNG.crc.crc;

	var nimg = UPNG.encode.compress(img, w, h, ps);

	bin.writeUint (data,offset, 13);     offset+=4;
	bin.writeASCII(data,offset,"IHDR");  offset+=4;
	bin.writeUint (data,offset,w);  offset+=4;
	bin.writeUint (data,offset,h);  offset+=4;
	data[offset] = nimg.depth;  offset++;  // depth
	data[offset] = nimg.ctype;  offset++;  // ctype
	data[offset] = 0;  offset++;  // compress
	data[offset] = 0;  offset++;  // filter
	data[offset] = 0;  offset++;  // interlace
	bin.writeUint (data,offset,crc(data,offset-17,17));  offset+=4; // crc

	// 9 bytes to say, that it is sRGB
	bin.writeUint (data,offset, 1);      offset+=4;
	bin.writeASCII(data,offset,"sRGB");  offset+=4;
	data[offset] = 1;  offset++;
	bin.writeUint (data,offset,crc(data,offset-5,5));  offset+=4; // crc


	if(nimg.ctype==3) {
		var dl = nimg.plte.length;
		bin.writeUint (data,offset, dl*3);  offset+=4;
		bin.writeASCII(data,offset,"PLTE");  offset+=4;
		for(var i=0; i<dl; i++){
			var ti=i*3, c=nimg.plte[i], r=(c)&255, g=(c>>8)&255, b=(c>>16)&255;
			data[offset+ti+0]=r;  data[offset+ti+1]=g;  data[offset+ti+2]=b;
		}
		offset+=dl*3;
		bin.writeUint (data,offset,crc(data,offset-dl*3-4,dl*3+4));  offset+=4; // crc

		if(nimg.gotAlpha) {
			bin.writeUint (data,offset, dl);  offset+=4;
			bin.writeASCII(data,offset,"tRNS");  offset+=4;
			for(var i=0; i<dl; i++)  data[offset+i]=(nimg.plte[i]>>24)&255;
			offset+=dl;
			bin.writeUint (data,offset,crc(data,offset-dl-4,dl+4));  offset+=4; // crc
		}
	}

	var dl = nimg.data.length;
	bin.writeUint (data,offset, dl);     offset+=4;
	bin.writeASCII(data,offset,"IDAT");  offset+=4;
	for(var i=0; i<dl; i++) data[offset+i] = nimg.data[i];
	offset += dl;
	bin.writeUint (data,offset,crc(data,offset-dl-4,dl+4));  offset+=4; // crc

	bin.writeUint (data,offset, 0);     offset+=4;
	bin.writeASCII(data,offset,"IEND");  offset+=4;
	bin.writeUint (data,offset,crc(data,offset-4,4));  offset+=4; // crc

	return data.buffer.slice(0,offset);
}

UPNG.encode.compress = function(img, w, h, ps)
{
	if(ps!=0) img = UPNG.quantize(img, w, h, ps);

	var ctype = 6, depth = 8, plte=[], bpp = 4, bpl = 4*w;
	var img32 = new Uint32Array(img.buffer);
	var gotAlpha=false, cmap=[];
	for(var i=0; i<img.length; i+=4) {
		var c = img32[i>>2];  if(plte.length<600 && cmap[c]==null) {  cmap[c]=plte.length;  plte.push(c);  }
		if(img[i+3]!=255) gotAlpha = true;
	}
	var cc=plte.length;
	if(cc<=256) {
		if(cc<= 2) depth=1;  else if(cc<= 4) depth=2;  else if(cc<=16) depth=4;  else depth=8;
		bpl = Math.ceil(depth*w/8), nimg = new Uint8Array(bpl*h);
		for(var y=0; y<h; y++) {  var i=y*bpl, ii=y*w;
			if(depth==1) for(var x=0; x<w; x++) nimg[i+(x>>3)]  |=  (cmap[img32[ii+x]]<<(7-(x&7)  ));
			if(depth==2) for(var x=0; x<w; x++) nimg[i+(x>>2)]  |=  (cmap[img32[ii+x]]<<(6-(x&3)*2));
			if(depth==4) for(var x=0; x<w; x++) nimg[i+(x>>1)]  |=  (cmap[img32[ii+x]]<<(4-(x&1)*4));
			if(depth==8) for(var x=0; x<w; x++) nimg[i+ x    ]   =   cmap[img32[ii+x]];
		}
		img=nimg;  ctype=3;  bpp=1;
	}
	else if(gotAlpha==false) {
		var nimg = new Uint8Array(w*h*3), area=w*h;
		for(var i=0; i<area; i++) { var ti=i*3, qi=i*4;  nimg[ti]=img[qi];  nimg[ti+1]=img[qi+1];  nimg[ti+2]=img[qi+2];  }
		img=nimg;  ctype=2;  bpp=3;  bpl=3*w;
	}

	var data = new Uint8Array(w*h*bpp+h);
	return {ctype:ctype, depth:depth, plte:plte, gotAlpha:gotAlpha, data: UPNG.encode._filterZero(img,h,bpp,bpl,data)  };
}

UPNG.encode._filterZero = function(img,h,bpp,bpl,data)
{
	var fls = [];
	for(var t=0; t<5; t++) {  if(h*bpl>500000 && (t==2 || t==3 || t==4)) continue;
		for(var y=0; y<h; y++) UPNG.encode._filterLine(data, img, y, bpl, bpp, t);
		fls.push(pako["deflate"](data));  if(bpp==1) break;
	}
	var ti, tsize=1e9;
	for(var i=0; i<fls.length; i++) if(fls[i].length<tsize) {  ti=i;  tsize=fls[i].length;  }
	//log("top filter", ti);
	return fls[ti];
}
UPNG.encode._filterLine = function(data, img, y, bpl, bpp, type)
{
	var i = y*bpl, di = i+y, paeth = UPNG.decode._paeth
	data[di]=type;  di++;

	if(type==0) for(var x=0; x<bpl; x++) data[di+x] = img[i+x];
	else if(type==1) {
		for(var x=  0; x<bpp; x++) data[di+x] =  img[i+x];
		for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]-img[i+x-bpp]+256)&255;
	}
	else if(y==0) {
		for(var x=  0; x<bpp; x++) data[di+x] = img[i+x];

		if(type==2) for(var x=bpp; x<bpl; x++) data[di+x] = img[i+x];
		if(type==3) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - (img[i+x-bpp]>>1) +256)&255;
		if(type==4) for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x] - paeth(img[i+x-bpp], 0, 0) +256)&255;
	}
	else {
		if(type==2) { for(var x=  0; x<bpl; x++) data[di+x] = (img[i+x]+256 - img[i+x-bpl])&255;  }
		if(type==3) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - (img[i+x-bpl]>>1))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - ((img[i+x-bpl]+img[i+x-bpp])>>1))&255;  }
		if(type==4) { for(var x=  0; x<bpp; x++) data[di+x] = (img[i+x]+256 - paeth(0, img[i+x-bpl], 0))&255;
					  for(var x=bpp; x<bpl; x++) data[di+x] = (img[i+x]+256 - paeth(img[i+x-bpp], img[i+x-bpl], img[i+x-bpp-bpl]))&255;  }
	}
}

UPNG.crc = {
	table : ( function() {
	   var tab = new Uint32Array(256);
	   for (var n=0; n<256; n++) {
			var c = n;
			for (var k=0; k<8; k++) {
				if (c & 1)  c = 0xedb88320 ^ (c >>> 1);
				else        c = c >>> 1;
			}
			tab[n] = c;  }
		return tab;  })(),
	update : function(c, buf, off, len) {
		for (var i=0; i<len; i++)  c = UPNG.crc.table[(c ^ buf[off+i]) & 0xff] ^ (c >>> 8);
		return c;
	},
	crc : function(b,o,l)  {  return UPNG.crc.update(0xffffffff,b,o,l) ^ 0xffffffff;  }
}

UPNG.quantize = function(img, w, h, ps)
{
	var nimg = new Uint8Array(img.length), pind = new Uint16Array(w*h), area=w*h, edist=UPNG.quantize.dist;
	for(var i=0; i<area; i++) {
		var qi=i<<2, a=img[qi+3]/255;
		nimg[qi+0] = img[qi+0]*a;  nimg[qi+1] = img[qi+1]*a;  nimg[qi+2] = img[qi+2]*a;  nimg[qi+3] = img[qi+3];
	}
	var plte=[], used=[], pr=0, plim = Math.max(100, 10*ps);
	while(true) {
		used=[];  plte=[];
		var msk = 0xff - ((1<<pr)-1), add = ((1<<pr))>>1;
		for(var i=0; i<area; i++) {  var qi=i<<2;  var r=nimg[qi],g=nimg[qi+1],b=nimg[qi+2],a=nimg[qi+3];
			var nr=(r&msk)+add, ng=(g&msk)+add, nb=(b&msk)+add, na=(a&msk)+add, key=(na<<24)|(nb<<16)|(ng<<8)|nr;
			if(used[key]) {  var pv=plte[used[key]];  pv.occ++;  }
			else {  used[key]=plte.length;  plte.push(  {occ:1, r:nr,g:ng,b:nb,a:na}  );  }
			if(plte.length>plim) break;
		}
		if(plte.length>plim) {  pr++;  continue;  }
		break;
	}
	if(pr==0 && plte.length<=ps) return img;
	plte.sort(function(a,b) {return b.occ-a.occ;});

	ps = Math.min(ps, plte.length);
	var nplte = new Uint8Array(ps*4);
	for(var i=0; i<ps; i++) {  var qi=i<<2,c=plte[i];  nplte[qi]=c.r;  nplte[qi+1]=c.g;  nplte[qi+2]=c.b;  nplte[qi+3]=c.a;  }
	plte = nplte;  //*/

	var icnt = Math.max(1, Math.min(10, Math.floor(1024/ps)));
	for(var it=0; it<icnt; it++)
	{
		var hist=new Uint32Array(ps), nplt=new Uint32Array(ps*4);
		var ndst=new Uint32Array(ps), nind=new Uint32Array(ps  );
		for(var i=0; i<ps; i++) { var qi=i<<2;
			var r=plte[qi], g=plte[qi+1], b=plte[qi+2], a=plte[qi+3];
			var ci=0; cd=1e9;
			for(var j=0; j<ps; j++) {  if(j==i) continue;
				var dst = edist(r,g,b,a,plte,j<<2);
				if(dst<cd) {  ci=j;  cd=dst;  }
			}
			ndst[i]=cd;  nind[i]=ci;
		}
		for(var i=0; i<area; i++) {  var qi=i<<2;
			var r=nimg[qi], g=nimg[qi+1], b=nimg[qi+2], a=nimg[qi+3];
			var ci=0, cd=1e9;
			ci=pind[i];  cd=edist(r,g,b,a,plte,ci<<2);  if(cd<=(ndst[ci]>>1)) {}  else
			for(var j=0; j<ps; j++) {
				var dst = edist(r,g,b,a,plte,j<<2);
				if(dst<cd) {  ci=j;  cd=dst;
					if(dst<=(ndst[ci]>>1)) break;
					var dst = edist(r,g,b,a,plte,nind[j]<<2);
					if(dst<=(ndst[ci]>>1)) {  ci=nind[j];  break;  }
				}
			}
			pind[i]=ci;  hist[ci]++;  var qci=ci<<2;
			nplt[qci]+=r;  nplt[qci+1]+=g;  nplt[qci+2]+=b;  nplt[qci+3]+=a;
		}
		for(var i=0; i<ps; i++) {  var qi=i<<2, den=1/hist[i];
			plte[qi]=nplt[qi]*den;  plte[qi+1]=nplt[qi+1]*den;  plte[qi+2]=nplt[qi+2]*den;  plte[qi+3]=nplt[qi+3]*den;
		}
	}
	//UPNG.quantize.dither(nimg, w,h, pind,plte, ps);  // I think that (current) dithering is not worth it
	for(var i=0; i<area; i++) {
		var qi=i<<2, ci=pind[i], qci=ci<<2, ia = plte[qci+3]==0 ? 0 : 255/plte[qci+3];
		nimg[qi+0] = plte[qci+0]*ia;  nimg[qi+1] = plte[qci+1]*ia;  nimg[qi+2] = plte[qci+2]*ia;  nimg[qi+3] = plte[qci+3];
	}
	return nimg;
}
UPNG.quantize.dist = function(r,g,b,a,ba,bi)
{
	var pr=ba[bi], pg=ba[bi+1], pb=ba[bi+2], pa=ba[bi+3];
	return (pr-r)*(pr-r)+(pg-g)*(pg-g)+(pb-b)*(pb-b)+(pa-a)*(pa-a);
}
UPNG.quantize.dither = function(nimg, w, h, pind, plte, ps)
{
	var err = new Float32Array(w*h*4), i16 = 1/16;
	var edist = UPNG.quantize.dist, round=Math.round, qw=w<<2;
	for(var y=0; y<h; y++)
		for(var x=0; x<w; x++) {
			var i = y*w+x, qi=i<<2;
			for(var j=0; j<4; j++) err[qi+j] = Math.max(-8, Math.min(8, err[qi+j]));
			var r=round(nimg[qi]+err[qi]), g=round(nimg[qi+1]+err[qi+1]), b=round(nimg[qi+2]+err[qi+2]), a=round(nimg[qi+3]+err[qi+3]);
			var ci=0, cd=1e9;
			for(var j=0; j<ps; j++) {
				var dst = edist(r,g,b,a,plte,j<<2);
				if(dst<cd) {  ci=j;  cd=dst;  }
			}
			pind[i]=ci;
			var ciq = ci<<2;
			var dr=r-plte[ciq], dg=g-plte[ciq+1], db=b-plte[ciq+2], da=a-plte[ciq+3];

			err[qi   +4+0] += (7*dr*i16);  err[qi   +4+1] += (7*dg*i16);  err[qi   +4+2] += (7*db*i16);  err[qi   +4+3] += (7*da*i16);
			err[qi+qw-4+0] += (3*dr*i16);  err[qi+qw-4+1] += (3*dg*i16);  err[qi+qw-4+2] += (3*db*i16);  err[qi+qw-4+3] += (3*da*i16);
			err[qi+qw  +0] += (5*dr*i16);  err[qi+qw  +1] += (5*dg*i16);  err[qi+qw  +2] += (5*db*i16);  err[qi+qw  +3] += (5*da*i16);
			err[qi+qw+4+0] += (1*dr*i16);  err[qi+qw+4+1] += (1*dg*i16);  err[qi+qw+4+2] += (1*db*i16);  err[qi+qw+4+3] += (1*da*i16);
		}
}

UPNG.decode = function(buff)
{
	var data = new Uint8Array(buff), offset = 8, bin = UPNG._bin, rUs = bin.readUshort;
	var out = {tabs:{}};
	var dd = new Uint8Array(data.length), doff = 0;	 // put all IDAT data into it

	while(true)
	{
		var len = bin.readUint(data, offset);  offset += 4;
		var type = bin.readASCII(data, offset, 4);  offset += 4;
		//log(offset, len, type);

		if     (type=="IHDR")  {  UPNG.decode._IHDR(data, offset, out);  }
		else if(type=="IDAT") {
			for(var i=0; i<len; i++) dd[doff+i] = data[offset+i];
			doff += len;
		}
		else if(type=="pHYs") {
			out.tabs[type] = [bin.readUint(data, offset), bin.readUint(data, offset+4), data[offset+8]];
		}
		else if(type=="cHRM") {
			out.tabs[type] = [];
			for(var i=0; i<8; i++) out.tabs[type].push(bin.readUint(data, offset+i*4));
		}
		else if(type=="tEXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = bin.nextZero(data, offset);
			var keyw = bin.readASCII(data, offset, nz-offset);
			var text = bin.readASCII(data, nz+1, offset+len-nz-1);
			out.tabs[type][keyw] = text;
		}
		else if(type=="iTXt") {
			if(out.tabs[type]==null) out.tabs[type] = {};
			var nz = 0, off = offset;
			nz = bin.nextZero(data, off);
			var keyw = bin.readASCII(data, off, nz-off);  off = nz + 1;
			var cflag = data[off], cmeth = data[off+1];  off+=2;
			nz = bin.nextZero(data, off);
			var ltag = bin.readASCII(data, off, nz-off);  off = nz + 1;
			nz = bin.nextZero(data, off);
			var tkeyw = bin.readUTF8(data, off, nz-off);  off = nz + 1;
			var text = bin.readUTF8(data, off, len-(off-offset));
			out.tabs[type][keyw] = text;
		}
		else if(type=="PLTE") {
			out.tabs[type] = bin.readBytes(data, offset, len);
		}
		else if(type=="hIST") {
			var pl = out.tabs["PLTE"].length/3;
			out.tabs[type] = [];  for(var i=0; i<pl; i++) out.tabs[type].push(rUs(data, offset+i*2));
		}
		else if(type=="tRNS") {
			if     (out.ctype==3) out.tabs[type] = bin.readBytes(data, offset, len);
			else if(out.ctype==0) out.tabs[type] = rUs(data, offset);
			else if(out.ctype==2) out.tabs[type] = [ rUs(data,offset),rUs(data,offset+2),rUs(data,offset+4) ];
			else log("tRNS for unsupported color type",out.ctype, len);
		}
		else if(type=="gAMA") out.tabs[type] = bin.readUint(data, offset)/100000;
		else if(type=="sRGB") out.tabs[type] = data[offset];
		else if(type=="bKGD")
		{
			if     (out.ctype==0 || out.ctype==4) out.tabs[type] = [rUs(data, offset)];
			else if(out.ctype==2 || out.ctype==6) out.tabs[type] = [rUs(data, offset), rUs(data, offset+2), rUs(data, offset+4)];
			else if(out.ctype==3) out.tabs[type] = data[offset];
		}
		else if(type=="IEND") {
			if(out.compress ==0) dd = UPNG.decode._inflate(dd);
			else log("unsupported compression method:", out.interlace);

			if(out.filter!=0) log("unsupported filter method:", out.filter);

			if(out.interlace==0) out.data = UPNG.decode._filterZero(dd, out, 0, out.width, out.height);
			else if(out.interlace==1) out.data = UPNG.decode._readInterlace(dd, out);
			else log("unsupported interlace method:", out.interlace);

			break;
		}
		else {  log("unknown chunk type", type, len);  }
		offset += len;
		var crc = bin.readUint(data, offset);  offset += 4;
	}
	delete out.compress;  delete out.interlace;  delete out.filter;
	return out;
}

UPNG.decode._inflate = function(data) {  return pako["inflate"](data);  }

UPNG.decode._readInterlace = function(data, out)
{
	var w = out.width, h = out.height;
	var bpp = UPNG.decode._getBPP(out), cbpp = bpp>>3, bpl = Math.ceil(w*bpp/8);
	var img = new Uint8Array( h * bpl );
	var di = 0;

	var starting_row  = [ 0, 0, 4, 0, 2, 0, 1 ];
	var starting_col  = [ 0, 4, 0, 2, 0, 1, 0 ];
	var row_increment = [ 8, 8, 8, 4, 4, 2, 2 ];
	var col_increment = [ 8, 8, 4, 4, 2, 2, 1 ];

	var pass=0;
	while(pass<7)
	{
		var ri = row_increment[pass], ci = col_increment[pass];
		var sw = 0, sh = 0;
		var cr = starting_row[pass];  while(cr<h) {  cr+=ri;  sh++;  }
		var cc = starting_col[pass];  while(cc<w) {  cc+=ci;  sw++;  }
		var bpll = Math.ceil(sw*bpp/8);
		UPNG.decode._filterZero(data, out, di, sw, sh);

		var y=0, row = starting_row[pass];
		while(row<h)
		{
			var col = starting_col[pass];
			var cdi = (di+y*bpll)<<3;

			while(col<w)
			{
				if(bpp==1) {
					var val = data[cdi>>3];  val = (val>>(7-(cdi&7)))&1;
					img[row*bpl + (col>>3)] |= (val << (7-((col&3)<<0)));
				}
				if(bpp==2) {
					var val = data[cdi>>3];  val = (val>>(6-(cdi&7)))&3;
					img[row*bpl + (col>>2)] |= (val << (6-((col&3)<<1)));
				}
				if(bpp==4) {
					var val = data[cdi>>3];  val = (val>>(4-(cdi&7)))&15;
					img[row*bpl + (col>>1)] |= (val << (4-((col&1)<<2)));
				}
				if(bpp>=8) {
					var ii = row*bpl+col*cbpp;
					for(var j=0; j<cbpp; j++) img[ii+j] = data[(cdi>>3)+j];
				}
				cdi+=bpp;  col+=ci;
			}
			y++;  row += ri;
		}
		if(sw*sh!=0) di += sh * (1 + bpll);
		pass = pass + 1;
	}
	return img;
}

UPNG.decode._getBPP = function(out) {
	var noc = [1,null,3,1,2,null,4][out.ctype];
	if(noc==null) log("unsupported color type", out.ctype);
	return noc * out.depth;
}

UPNG.decode._filterZero = function(data, out, off, w, h)
{
	var bpp = UPNG.decode._getBPP(out), bpl = Math.ceil(w*bpp/8), paeth = UPNG.decode._paeth;
	bpp = Math.ceil(bpp/8);

	for(var y=0; y<h; y++)  {
		var i = off+y*bpl, di = i+y+1;
		var type = data[di-1];

		if     (type==0) for(var x=  0; x<bpl; x++) data[i+x] = data[di+x];
		else if(type==1) {
			for(var x=  0; x<bpp; x++) data[i+x] = data[di+x];
			for(var x=bpp; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpp])&255;
		}
		else if(y==0) {
			for(var x=  0; x<bpp; x++) data[i+x] = data[di+x];
			if(type==2) for(var x=bpp; x<bpl; x++) data[i+x] = (data[di+x])&255;
			if(type==3) for(var x=bpp; x<bpl; x++) data[i+x] = (data[di+x] + (data[i+x-bpp]>>1) )&255;
			if(type==4) for(var x=bpp; x<bpl; x++) data[i+x] = (data[di+x] + paeth(data[i+x-bpp], 0, 0) )&255;
		}
		else {
			if(type==2) { for(var x=  0; x<bpl; x++) data[i+x] = (data[di+x] + data[i+x-bpl])&255;  }

			if(type==3) { for(var x=  0; x<bpp; x++) data[i+x] = (data[di+x] + (data[i+x-bpl]>>1))&255;
			              for(var x=bpp; x<bpl; x++) data[i+x] = (data[di+x] + ((data[i+x-bpl]+data[i+x-bpp])>>1) )&255;  }

			if(type==4) { for(var x=  0; x<bpp; x++) data[i+x] = (data[di+x] + paeth(0, data[i+x-bpl], 0))&255;
						  for(var x=bpp; x<bpl; x++) data[i+x] = (data[di+x] + paeth(data[i+x-bpp], data[i+x-bpl], data[i+x-bpp-bpl]) )&255;  }
		}
	}
	return data;
}

UPNG.decode._paeth = function(a,b,c)
{
	var p = a+b-c, pa = Math.abs(p-a), pb = Math.abs(p-b), pc = Math.abs(p-c);
	if (pa <= pb && pa <= pc)  return a;
	else if (pb <= pc)  return b;
	return c;
}

UPNG.decode._IHDR = function(data, offset, out)
{
	var bin = UPNG._bin;
	out.width  = bin.readUint(data, offset);  offset += 4;
	out.height = bin.readUint(data, offset);  offset += 4;
	out.depth     = data[offset];  offset++;
	out.ctype     = data[offset];  offset++;
	out.compress  = data[offset];  offset++;
	out.filter    = data[offset];  offset++;
	out.interlace = data[offset];  offset++;
}

UPNG._bin = {
	nextZero   : function(data,p)  {  while(data[p]!=0) p++;  return p;  },
	readUshort : function(buff,p)  {  return (buff[p]<< 8) | buff[p+1];  },
	writeUshort: function(buff,p,n){  buff[p] = (n>>8)&255;  buff[p+1] = n&255;  },
	readUint   : function(buff,p)  {  return (buff[p]*(256*256*256)) + ((buff[p+1]<<16) | (buff[p+2]<< 8) | buff[p+3]);  },
	writeUint  : function(buff,p,n){  buff[p]=(n>>24)&255;  buff[p+1]=(n>>16)&255;  buff[p+2]=(n>>8)&255;  buff[p+3]=n&255;  },
	readASCII  : function(buff,p,l){  var s = "";  for(var i=0; i<l; i++) s += String.fromCharCode(buff[p+i]);  return s;    },
	writeASCII : function(data,p,s){  for(var i=0; i<s.length; i++) data[p+i] = s.charCodeAt(i);  },
	readBytes  : function(buff,p,l){  var arr = [];   for(var i=0; i<l; i++) arr.push(buff[p+i]);   return arr;  },
	pad : function(n) { return n.length < 2 ? "0" + n : n; },
	readUTF8 : function(buff, p, l) {
		var s = "", ns;
		for(var i=0; i<l; i++) s += "%" + UPNG._bin.pad(buff[p+i].toString(16));
		try {  ns = decodeURIComponent(s); }
		catch(e) {  return UPNG._bin.readASCII(buff, p, l);  }
		return  ns;
	}
}

})(UPNG, pako);
})();
