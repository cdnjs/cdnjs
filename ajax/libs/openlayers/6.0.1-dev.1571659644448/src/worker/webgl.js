
        const source = "var e=\"function\"==typeof Object.assign?Object.assign:function(e,n){if(null==e)throw new TypeError(\"Cannot convert undefined or null to object\");for(var r=Object(e),t=1,o=arguments.length;t<o;++t){var i=arguments[t];if(null!=i)for(var f in i)i.hasOwnProperty(f)&&(r[f]=i[f])}return r};new Array(6);var n=\"GENERATE_BUFFERS\",r=[],t={vertexPosition:0,indexPosition:0};function o(e,n,r,t,o){e[n+0]=r,e[n+1]=t,e[n+2]=o}function i(e,n,i,f,s,a){var u=3+s,l=e[n+0],v=e[n+1],c=r;c.length=s;for(var g=0;g<c.length;g++)c[g]=e[n+2+g];var b=a?a.vertexPosition:0,h=a?a.indexPosition:0,d=b/u;return o(i,b,l,v,0),c.length&&i.set(c,b+3),o(i,b+=u,l,v,1),c.length&&i.set(c,b+3),o(i,b+=u,l,v,2),c.length&&i.set(c,b+3),o(i,b+=u,l,v,3),c.length&&i.set(c,b+3),b+=u,f[h++]=d,f[h++]=d+1,f[h++]=d+3,f[h++]=d+1,f[h++]=d+2,f[h++]=d+3,t.vertexPosition=b,t.indexPosition=h,t}var f=self;f.onmessage=function(r){var t=r.data;if(t.type===n){for(var o=t.customAttributesCount,s=2+o,a=new Float32Array(t.renderInstructions),u=a.length/s,l=4*u*(o+3),v=new Uint32Array(6*u),c=new Float32Array(l),g=null,b=0;b<a.length;b+=s)g=i(a,b,c,v,o,g);var h=e({vertexBuffer:c.buffer,indexBuffer:v.buffer,renderInstructions:a.buffer},t);f.postMessage(h,[c.buffer,v.buffer,a.buffer])}};";
        const blob = new Blob([source], {type: 'application/javascript'});
        const url = URL.createObjectURL(blob);
        export function create() {
          return new Worker(url);
        }
      
