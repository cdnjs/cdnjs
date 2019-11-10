/*!
 * ZooMove v1.2.0
 * http://thompsonemerson.github.io/zoomove
 *
 * Copyright (c) 2016, Emerson Thompson
 * Licensed http://thompsonemerson.mit-license.org
*/

!function(a){a.fn.ZooMove=function(b){var c=a.extend({image:"https://placeholdit.imgix.net/~text?txtsize=30&txt=image+default&w=350&h=350&txttrack=0",cursor:"false",scale:"1.5",move:"true",over:"false"},b);a(this).attr("data-zoo-cursor")&&(c.cursor=a(this).attr("data-zoo-cursor")),c.cursor="true"===c.cursor?"pointer":"default",this.each(function(){var b=a(this);c.overD=b.attr("data-zoo-over")?b.attr("data-zoo-over"):c.over,"true"===c.overD&&b.css({overflow:"visible","z-index":"100"}),c.imageD=b.attr("data-zoo-image")?b.attr("data-zoo-image"):c.image,b.append('<div class="zoo-img"></div>').children(".zoo-img").css({"background-image":"url("+c.imageD+")",cursor:c.cursor})}).on("mouseover",function(b){var d=a(this);b.preventDefault(),c.scaleD=d.attr("data-zoo-scale")?d.attr("data-zoo-scale"):c.scale,c.moveD=d.attr("data-zoo-move")?d.attr("data-zoo-move"):c.move,d.children(".zoo-img").css({transform:"scale("+c.scaleD+")"})}).on("mousemove",function(b){var d=a(this);b.preventDefault(),"true"===c.moveD&&d.children(".zoo-img").css({"transform-origin":(b.pageX-d.offset().left)/d.width()*100+"% "+(b.pageY-d.offset().top)/d.height()*100+"%"})}).on("mouseout",function(b){var c=a(this);b.preventDefault(),c.children(".zoo-img").css({transform:"scale(1)"})})}}(jQuery);