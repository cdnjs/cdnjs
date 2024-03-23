import{a as h}from"./chunk-J73WXDYM.mjs";function p(o){for(var f=[],i=1;i<arguments.length;i++)f[i-1]=arguments[i];var n=Array.from(typeof o=="string"?[o]:o);n[n.length-1]=n[n.length-1].replace(/\r?\n([\t ]*)$/,"");var d=n.reduce(function(t,u){var a=u.match(/\n([\t ]+|(?!\s).)/g);return a?t.concat(a.map(function(g){var r,e;return(e=(r=g.match(/[\t ]/g))===null||r===void 0?void 0:r.length)!==null&&e!==void 0?e:0})):t},[]);if(d.length){var l=new RegExp(`
[	 ]{`+Math.min.apply(Math,d)+"}","g");n=n.map(function(t){return t.replace(l,`
`)})}n[0]=n[0].replace(/^\r?\n/,"");var c=n[0];return f.forEach(function(t,u){var a=c.match(/(?:^|\n)( *)$/),g=a?a[1]:"",r=t;typeof t=="string"&&t.includes(`
`)&&(r=String(t).split(`
`).map(function(e,s){return s===0?e:""+g+e}).join(`
`)),c+=r+n[u+1]}),c}h(p,"dedent");export{p as a};
