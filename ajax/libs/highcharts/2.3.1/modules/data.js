/*
 Data plugin for Highcharts v0.1

 (c) 2012 Torstein H?nsi

 License: www.highcharts.com/license
*/
(function(m){var l=m.each,n=function(a){this.init(a)};m.extend(n.prototype,{init:function(a){this.options=a;this.columns=[];this.parseCSV();this.parseTable();this.parseTypes();this.findHeaderRow();this.parsed();this.complete()},parseCSV:function(){var a=this.options,b=a.csv,d=this.columns,c=a.startRow||0,f=a.endRow||Number.MAX_VALUE,e=a.startColumn||0,j=a.endColumn||Number.MAX_VALUE;b&&(b=b.split(a.lineDelimiter||"\n"),l(b,function(b,k){if(k>=c&&k<=f){var h=b.split(a.itemDelimiter||",");l(h,function(a,
b){b>=e&&b<=j&&(d[b-e]||(d[b-e]=[]),d[b-e][k-c]=a)})}}))},parseTable:function(){var a=this.options,b=a.table,d=this.columns,c=a.startRow||0,f=a.endRow||Number.MAX_VALUE,e=a.startColumn||0,j=a.endColumn||Number.MAX_VALUE,g;b&&(typeof b==="string"&&(b=document.getElementById(b)),l(b.getElementsByTagName("tr"),function(a,b){g=0;b>=c&&b<=f&&l(a.childNodes,function(a){if((a.tagName==="TD"||a.tagName==="TH")&&g>=e&&g<=j)d[g]||(d[g]=[]),d[g][b-c]=a.innerHTML,g+=1})}))},findHeaderRow:function(){l(this.columns,
function(){});this.headerRow=0},trim:function(a){return a.replace(/^\s+|\s+$/g,"")},parseTypes:function(){for(var a=this.columns,b=a.length,d,c,f,e;b--;)for(d=a[b].length;d--;)c=a[b][d],f=parseFloat(c),e=this.trim(c),e==f?(a[b][d]=f,f>31536E6?a[b].isDatetime=!0:a[b].isNumeric=!0):(c=Date.parse(c),b===0&&typeof c==="number"&&!isNaN(c)?(a[b][d]=c,a[b].isDatetime=!0):a[b][d]=e)},parsed:function(){this.options.parsed&&this.options.parsed.call(this,this.columns)},complete:function(){var a=this.columns,
b,d,c,f,e=this.options,j,g,k,h,i;if(e.complete){a.length>1&&(c=a.shift(),this.headerRow===0&&c.shift(),(b=c.isNumeric||c.isDatetime)||(d=c),c.isDatetime&&(f="datetime"));j=[];for(h=0;h<a.length;h++){this.headerRow===0&&(k=a[h].shift());g=[];for(i=0;i<a[h].length;i++)g[i]=a[h][i]!==void 0?b?[c[i],a[h][i]]:a[h][i]:null;j[h]={name:k,data:g}}e.complete({xAxis:{categories:d,type:f},series:j})}}});m.Data=n;m.data=function(a){return new n(a)}})(Highcharts);
