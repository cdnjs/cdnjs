/*
 
 bootpag - jQuery plugin for dynamic pagination

 Copyright (c) 2013 botmonster@7items.com

 Licensed under the MIT license:
   http://www.opensource.org/licenses/mit-license.php

 Project home:
   http://botmonster.com/jquery-bootpag/

 Version:  1.0.5

*/
(function(f){f.fn.bootpag=function(n){function j(e,b){var c,d=0==a.maxVisible?1:a.maxVisible,m=1==a.maxVisible?0:1,l=Math.floor((b-1)/d)*d,g=e.find("li");a.page=b=0>b?0:b>a.total?a.total:b;g.removeClass("disabled");c=1>b-1?1:a.leaps&&b-1>=a.maxVisible?Math.floor((b-1)/d)*d:b-1;g.first().toggleClass("disabled",1===b).attr("data-lp",c).find("a").attr("href",h(c));m=1==a.maxVisible?0:1;c=b+1>a.total?a.total:a.leaps&&b+1<a.total-a.maxVisible?l+a.maxVisible+m:b+1;g.last().toggleClass("disabled",b===a.total).attr("data-lp",
c).find("a").attr("href",h(c));d=g.filter("[data-lp="+b+"]");if(!d.not(".next,.prev").length){var j=b<=l?-a.maxVisible:0;g.not(".next,.prev").each(function(b){c=b+1+l+j;f(this).attr("data-lp",c).toggle(c<=a.total).find("a").html(c).attr("href",h(c))});d=g.filter("[data-lp="+b+"]")}d.addClass("disabled");k.data("settings",a)}function h(e){return a.href.replace(a.hrefVariable,e)}var k=this,a=f.extend({total:0,page:1,maxVisible:null,leaps:!0,href:"javascript:void(0);",hrefVariable:"{{number}}",next:"&raquo;",
prev:"&laquo;"},k.data("settings")||{},n||{});if(0>=a.total)return this;!f.isNumeric(a.maxVisible)&&!a.maxVisible&&(a.maxVisible=a.total);k.data("settings",a);return this.each(function(){var e,b,c=f(this),d=['<ul class="pagination bootpag">'];a.prev&&d.push('<li data-lp="1" class="prev"><a href="'+h(1)+'">'+a.prev+"</a></li>");for(b=1;b<=Math.min(a.total,a.maxVisible);b++)d.push('<li data-lp="'+b+'"><a href="'+h(b)+'">'+b+"</a></li>");a.next&&(b=a.leaps&&a.total>a.maxVisible?Math.min(a.maxVisible+
1,a.total):2,d.push('<li data-lp="'+b+'" class="next"><a href="'+h(b)+'">'+a.next+"</a></li>"));d.push("</ul>");c.find("ul.bootpag").remove();c.append(d.join(""));e=c.find("ul.bootpag");c.find("li").click(function(){var a=f(this);a.hasClass("disabled")||(a=parseInt(a.attr("data-lp"),10),j(e,a),k.trigger("page",a))});j(e,a.page)})}})(jQuery,window);
