/*
 jQuery animateNumber plugin v0.0.12
 (c) 2013, Alexandr Borisov.
 https://github.com/aishek/jquery-animateNumber
*/
(function(d){var q=function(b){return b.split("").reverse().join("")},m={numberStep:function(b,a){var e=Math.floor(b);d(a.elem).text(e)}},h=function(b){var a=b.elem;a.nodeType&&a.parentNode&&(a=a._animateNumberSetter,a||(a=m.numberStep),a(b.now,b))};d.Tween&&d.Tween.propHooks?d.Tween.propHooks.number={set:h}:d.fx.step.number=h;d.animateNumber={numberStepFactories:{append:function(b){return function(a,e){var g=Math.floor(a);d(e.elem).prop("number",a).text(g+b)}},separator:function(b,a,e){b=b||" ";
a=a||3;e=e||"";return function(g,k){var c=Math.floor(g).toString(),t=d(k.elem);if(c.length>a){for(var f=c,l=a,m=f.split("").reverse(),c=[],n,r,p,s=0,h=Math.ceil(f.length/l);s<h;s++){n="";for(p=0;p<l;p++){r=s*l+p;if(r===f.length)break;n+=m[r]}c.push(n)}f=c.length-1;l=q(c[f]);c[f]=q(parseInt(l,10).toString());c=c.join(b);c=q(c)}t.prop("number",g).text(c+e)}}}};d.fn.animateNumber=function(){for(var b=arguments[0],a=d.extend({},m,b),e=d(this),g=[a],k=1,c=arguments.length;k<c;k++)g.push(arguments[k]);
if(b.numberStep){var h=this.each(function(){this._animateNumberSetter=b.numberStep}),f=a.complete;a.complete=function(){h.each(function(){delete this._animateNumberSetter});f&&f.apply(this,arguments)}}return e.animate.apply(e,g)}})(jQuery);
