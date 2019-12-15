/*!

Name: Scrollgress
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 20, 2014
Last Updated: February 18, 2018
Licensed under the MIT license

*/
!function(s){s.fn.scrollgress=function(o){if(!this.length)return this;this.settings={},this.settings=s.extend({},{height:"5px",color:"#ff0000",el:null,complete:function(){},success:function(){}},o);const t=this.settings,l=s(this),e=l.css("overflow"),i=l.css("overflow-y"),c="auto"===e||"scroll"===e||"auto"===i||"scroll"===i,r=s(window).outerHeight(),n=c?l[0].scrollHeight:l.height(),h=c?l:s(window);let g,d,p,u=0;t.el||(s("body").prepend('<div class="scrollgress"><div class="scrollgress__progress"></div></div>'),s(".scrollgress").css({position:"fixed",top:"0px",left:"0px",background:"transparent",width:"100%",height:t.height}),s(".scrollgress__progress").css({float:"left",background:t.color,width:"0%",height:t.height}),t.el=".scrollgress__progress"),h.scroll(function(o){g=h.scrollTop(),d=c?l.scrollTop():s(document).scrollTop(),p=(d/(n-r)*100).toFixed(2),s(t.el).css({width:p+"%"}),s(window).scrollTop()+s(window).height()==s(document).height()&&t.complete.call(this),u=g}),t.success.call(this)}}(jQuery);
