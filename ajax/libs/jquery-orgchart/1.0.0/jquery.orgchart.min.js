/**
 * JQuery Organisation Chart Plugin.
 *
 * Author: Mark Lee
 * Copyright (C)2013-2015 Caprica Software Limited
 * http://www.capricasoftware.co.uk
 *
 * Contributions by: Paul Lautman <paul.lautman at gmail.com>
 *
 * This software is licensed under the Creative Commons Attribution-ShareAlike 3.0 License,
 * see here for license terms:
 *
 *     http://creativecommons.org/licenses/by-sa/3.0
 */
(function(a){function p(d,h,g,e,b){var q=a("<table cellpadding='0' cellspacing='0' border='0'/>"),l=a("<tbody/>"),n=a("<tr/>").addClass("nodes"),k=a("<td/>").addClass("node").attr("colspan",2),f=d.children("ul:first").children("li");1<f.length&&k.attr("colspan",2*f.length);var c=d.children("adjunct").eq(0);0<c.length&&(a("<div>").addClass("adjunct node").addClass("level"+g).addClass("node"+e).addClass("level"+g+"-node"+e).append(b.nodeText(c)).appendTo(k),a("<div>").addClass("adjunct-link").appendTo(k),
c.remove());c=a("<h2>").html(b.nodeText(d));c=a("<div>").addClass("node").addClass("level"+g).addClass("node"+e).addClass("level"+g+"-node"+e).append(c);b.copyClasses&&c.addClass(d.attr("class"));b.copyData&&c.data(d.data());b.copyStyles&&c.attr("style",d.attr("style"));b.copyTitle&&c.attr("title",d.attr("title"));c.data("orgchart-level",g).data("orgchart-node",d);k.append(c);n.append(k);l.append(n);c.click(function(){var c=a(this);b.nodeClicked(c.data("orgchart-node"),c);if(b.interactive){var d=
c.closest("tr");d.next("tr").is(":visible")?(b.fade?d.nextAll("tr").fadeOut(b.speed):d.nextAll("tr").hide(),c.removeClass("shownChildren").addClass("hiddenChildren")):(c.removeClass("hiddenChildren").addClass("shownChildren"),b.fade?d.nextAll("tr").fadeIn(b.speed):d.nextAll("tr").show())}});if(0<f.length)if(-1==b.depth||g+1<b.depth){e=a("<tr/>").addClass("lines");d=a("<td/>").attr("colspan",2*f.length);e.append(d);k=a("<table cellpadding='0' cellspacing='0' border='0'>");k.append("<tbody>");var r=
a("<tr/>").addClass("lines x"),t=a("<td>").addClass("line left"),u=a("<td>").addClass("line right");r.append(t).append(u);k.children("tbody").append(r);d.append(k);l.append(e);0<f.length&&(c.addClass("hasChildren"),-1==b.showLevels||g<b.showLevels-1?c.addClass("shownChildren"):c.addClass("hiddenChildren"),b.interactive&&c.hover(function(){a(this).addClass(b.hoverClass)},function(){a(this).removeClass(b.hoverClass)}));var m=a("<tr/>").addClass("lines v");f.each(function(){var b=a("<td/>").addClass("line left top"),
c=a("<td/>").addClass("line right top");m.append(b).append(c)});m.find("td:first").removeClass("top");m.find("td:last").removeClass("top");l.append(m);var s=a("<tr/>");f.each(function(c){var d=a("<td/>");d.attr("colspan",2);p(a(this),d,g+1,c,b);s.append(d)});l.append(s)}else b.stack&&(f=f.clone(),f=a("<ul class='stack'>").append(f).addClass("level"+g).addClass("node"+e).addClass("level"+g+"-node"+e),f=a("<div class='stack-container'>").append(f),c.after(f));-1<b.showLevels&&g>=b.showLevels-1&&n.nextAll("tr").hide();
q.append(l);h.append(q)}a.fn.orgChart=function(d){var h=a.extend({},a.fn.orgChart.defaults,d);return this.each(function(){var d=a(this);$this=d.clone();-1<h.levels&&$this.find("ul").andSelf().filter(function(){return d.parents("ul").length+1>h.levels}).remove();$this.data("chart-source",d);var e=a("<div class='"+h.chartClass+"'/>");h.interactive&&e.addClass("interactive");var b;$this.is("ul")?b=$this.find("li:first"):$this.is("li")&&(b=$this);b&&(p(b,e,0,0,h),e.find("div.node a").click(function(a){a.stopImmediatePropagation()}),
h.replace&&h.container.empty(),h.container.append(e))})};a.fn.orgChart.defaults={container:a("body"),depth:-1,levels:-1,showLevels:-1,stack:!1,chartClass:"orgChart",hoverClass:"hover",nodeText:function(a){return a.clone().children("ul,li").remove().end().html()},interactive:!1,fade:!1,speed:"slow",nodeClicked:function(a){},copyClasses:!0,copyData:!0,copyStyles:!0,copyTitle:!0,replace:!0}})(jQuery);
