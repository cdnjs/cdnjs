/*
 *  Tinacious Design goalProgress jQuery plugin
 *  Plugin URL: https://github.com/tinacious/goalProgress
 *
 *  Christina Holly (Tinacious Design)
 *  http://tinaciousdesign.com
 *
 */
 (function($){$.fn.extend({goalProgress:function(options){var defaults={goalAmount:100,currentAmount:50,speed:1E3,textBefore:"",textAfter:""};var options=$.extend(defaults,options);return this.each(function(){var obj=$(this);var goalAmountParsed=parseInt(defaults.goalAmount);var currentAmountParsed=parseInt(defaults.currentAmount);var percentage=currentAmountParsed/goalAmountParsed*100;var progressBar='<div class="progressBar">'+defaults.textBefore+currentAmountParsed+defaults.textAfter+"</div>";var progressBarWrapped=
'<div class="goalProgress">'+progressBar+"</div>";obj.append(progressBarWrapped);var rendered=obj.find("div.progressBar");rendered.each(function(){$(this).html($(this).text().replace(/\s/g,"&nbsp;"))});rendered.animate({width:percentage+"%"},defaults.speed)})}})})(jQuery);