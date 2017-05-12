/*
 Flux Slider v1.4.4 jQuery Widget 
 http://www.joelambert.co.uk/flux

 Copyright 2011, Joe Lambert.
 Free to use under the MIT license.
 http://www.opensource.org/licenses/mit-license.php
*/
(function(c){c.widget("joelambert.flux",{_create:function(){this.slider=new flux.slider(this.element,this.options)},start:function(){this.slider.start()},stop:function(){this.slider.stop()},isPlaying:function(){return this.slider.isPlayer()},next:function(a,b){this.slider.next(a,b)},prev:function(a,b){this.slider.prev(a,b)},showImage:function(a,b,d){this.slider.showImage(a,b,d)},getImage:function(a){return this.slider.getImage(a)}})})(jQuery);
