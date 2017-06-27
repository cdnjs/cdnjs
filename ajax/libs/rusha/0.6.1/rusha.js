
(function(){if(typeof module!=='undefined'){module.exports=Rusha;}
if(typeof window!=='undefined'){window.Rusha=Rusha;}
if(typeof FileReaderSync!=='undefined'){var reader=new FileReaderSync(),hasher=new Rusha(4*1024*1024);self.onmessage=function(event){var hash,data=event.data.data;if(data instanceof Blob){data=reader.readAsBinaryString(data);}
hash=hasher.digest(data);self.postMessage({id:event.data.id,hash:hash});};}
function Rusha(sizeHint){"use strict";var self={fill:0};var padlen=function(len){return len+1+((len)%64<56?56:56+64)-(len)%64+8;};var padData=function(bin,len,copyloop){for(var i=len>>2;i<bin.length;i++)bin[i]=0;copyloop(bin);bin[len>>2]|=0x80<<(24-(len%4<<3));bin[(((len>>2)+2)&~0x0f)+15]=len<<3;return bin.length;};var convStr=function(str){return function(bin){for(var i=0;i<str.length;i+=4){bin[i>>2]=(str.charCodeAt(i)<<24)|(str.charCodeAt(i+1)<<16)|(str.charCodeAt(i+2)<<8)|(str.charCodeAt(i+3));}};};var convBuf=function(buf){return function(bin){for(var i=0;i<buf.length;i+=4){bin[i>>2]=(buf[i]<<24)|(buf[i+1]<<16)|(buf[i+2]<<8)|(buf[i+3]);}};};var conv=function(data){if(typeof data==='string'){return convStr(data);}else if(data instanceof Array||(typeof Buffer!=='undefined'&&data instanceof Buffer)){return convBuf(data);}else if(data instanceof ArrayBuffer){return convBuf(new Uint8Array(data));}else if(data.buffer instanceof ArrayBuffer){return convBuf(new Uint8Array(data.buffer));}else{throw new Error('Unsupported data type.');}};var hex=function(binarray){var i,x,hex_tab="0123456789abcdef",res=[];for(i=0;i<binarray.length;i++){x=binarray[i];res[i]=hex_tab.charAt((x>>28)&0xF)+
hex_tab.charAt((x>>24)&0xF)+
hex_tab.charAt((x>>20)&0xF)+
hex_tab.charAt((x>>16)&0xF)+
hex_tab.charAt((x>>12)&0xF)+
hex_tab.charAt((x>>8)&0xF)+
hex_tab.charAt((x>>4)&0xF)+
hex_tab.charAt((x>>0)&0xF);}
return res.join('');};var nextPow2=function(v){var p=1;while(p<v)p=p<<1;return p;};var resize=function(size){self.sizeHint=size;self.heap=new ArrayBuffer(nextPow2(padlen(size)+320));self.core=RushaCore({Int32Array:Int32Array},{},self.heap);};resize(sizeHint||0);var coreCall=function(len){var h=new Int32Array(self.heap,len<<2,5);h[0]=1732584193;h[1]=-271733879;h[2]=-1732584194;h[3]=271733878;h[4]=-1009589776;self.core.hash(len);};this.digest=this.digestFromString=this.digestFromBuffer=this.digestFromArrayBuffer=function(str){var len=str.byteLength||str.length;if(len>self.sizeHint){resize(len);}
var view=new Int32Array(self.heap,0,padlen(len)>>2);coreCall(padData(view,len,conv(str)));return hex(new Int32Array(self.heap,0,5));};};function RushaCore(stdlib,foreign,heap){"use asm";var H=new stdlib.Int32Array(heap);function hash(k){k=k|0;var i=0,j=0,y0=0,z0=0,y1=0,z1=0,y2=0,z2=0,y3=0,z3=0,y4=0,z4=0,t0=0;y0=H[k+0<<2>>2]|0;y1=H[k+1<<2>>2]|0;y2=H[k+2<<2>>2]|0;y3=H[k+3<<2>>2]|0;y4=H[k+4<<2>>2]|0;for(i=0;(i|0)<(k|0);i=i+16|0){z0=y0;z1=y1;z2=y2;z3=y3;z4=y4;for(j=0;(j|0)<16;j=j+1|0){H[k+j<<2>>2]=H[i+j<<2>>2];t0=(((y0)<<5|(y0)>>>27)+(y1&y2|~y1&y3)|0)+((y4+(H[k+j<<2>>2]|0)|0)+1518500249|0)|0;y4=y3;y3=y2;y2=((y1)<<30|(y1)>>>2);y1=y0;y0=t0;}
for(j=k+16|0;(j|0)<(k+20|0);j=j+1|0){H[j<<2>>2]=((H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])<<1|(H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])>>>31);t0=(((y0)<<5|(y0)>>>27)+(y1&y2|~y1&y3)|0)+((y4+(H[j<<2>>2]|0)|0)+1518500249|0)|0;y4=y3;y3=y2;y2=((y1)<<30|(y1)>>>2);y1=y0;y0=t0;}
for(j=k+20|0;(j|0)<(k+40|0);j=j+1|0){H[j<<2>>2]=((H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])<<1|(H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])>>>31);t0=(((y0)<<5|(y0)>>>27)+(y1^y2^y3)|0)+((y4+(H[j<<2>>2]|0)|0)+1859775393|0)|0;y4=y3;y3=y2;y2=((y1)<<30|(y1)>>>2);y1=y0;y0=t0;}
for(j=k+40|0;(j|0)<(k+60|0);j=j+1|0){H[j<<2>>2]=((H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])<<1|(H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])>>>31);t0=(((y0)<<5|(y0)>>>27)+(y1&y2|y1&y3|y2&y3)|0)+((y4+(H[j<<2>>2]|0)|0)-1894007588|0)|0;y4=y3;y3=y2;y2=((y1)<<30|(y1)>>>2);y1=y0;y0=t0;}
for(j=k+60|0;(j|0)<(k+80|0);j=j+1|0){H[j<<2>>2]=((H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])<<1|(H[j-3<<2>>2]^H[j-8<<2>>2]^H[j-14<<2>>2]^H[j-16<<2>>2])>>>31);t0=(((y0)<<5|(y0)>>>27)+(y1^y2^y3)|0)+((y4+(H[j<<2>>2]|0)|0)-899497514|0)|0;y4=y3;y3=y2;y2=((y1)<<30|(y1)>>>2);y1=y0;y0=t0;}
y0=y0+z0|0;y1=y1+z1|0;y2=y2+z2|0;y3=y3+z3|0;y4=y4+z4|0;}
H[0]=y0;H[1]=y1;H[2]=y2;H[3]=y3;H[4]=y4;}
return{hash:hash};}})();
