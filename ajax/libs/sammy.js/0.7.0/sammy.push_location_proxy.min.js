// -- Sammy.js -- /plugins/sammy.push_location_proxy.js
// http://sammyjs.org
// Version: 0.7.0
// Built: 2011-07-30 16:55:50 -0700
(function(a){Sammy=Sammy||{};Sammy.PushLocationProxy=function(b){this.app=b};Sammy.PushLocationProxy.prototype={bind:function(){var b=this;a(window).bind("popstate",function(c){b.app.trigger("location-changed")});a("a").live("click",function(c){if(location.hostname==this.hostname){c.preventDefault();b.setLocation(a(this).attr("href"));b.app.trigger("location-changed")}})},unbind:function(){a("a").unbind("click");a(window).unbind("popstate")},getLocation:function(){return window.location.pathname},setLocation:function(b){history.pushState({path:this.path},"",b)}}})(jQuery);
