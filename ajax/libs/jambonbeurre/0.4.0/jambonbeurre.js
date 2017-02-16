/*
* name:Jambonbeurre
* version: 0.4.0 (May-28, 2015)

* dependencies:
  - jquery-~1.9
  - iscroll-~5.1.3
  - requirejs-~2.1.17
  - hammerjs-~2.0.4

* description: Hamburger menu for mobile and desktop
*/


define(['jquery'], function ($) {
    var jambonBeurre = function (options) {

        this.opts = {
            timeout: 300,
            scroll: true,
            gesture: true,
            click: true,
            scrollbars: true,
            mouseWheel:true,
            gestureevent: 'press',
            scrollcontainer: ".jb-scroll-container",
            menu: ".jb-menu",
            stickyheader: ".jb-sticky-header",
            triggers: [".jb-trigger",".jb-shield"],            
            content: ".jb-content",
            keys: [32, 33, 34, 35, 36, 37, 38, 39, 40]            
        };

        this.init = function(){
            var self = this, 
                opts = $.extend({}, this.opts, options);

            self.domReady(opts);
            self.menuGesture(opts);
            self.menuScroll(opts);
            self.setTriggers(opts);

        };

        this.domReady = function(opts){
            $(document).ready(function(){
                $("body").attr('data-jb-state', 'closed');
                $("body").attr('data-jb-ready', 'true');
                $(opts.content).append("<div class=\"jb-shield\"></div>");
            });
        };

        this.setTriggers = function(opts){
            self = this;
            $(document).ready(function(){
                $(opts.triggers.join()).on('click.jb-menu', function(e) {
                    e.preventDefault();
                    if($("body[data-jb-state*=open]").length > 0) {
                        self.hideMenu();
                    } else {
                        self.showMenu();
                    }
                });
            });      
        };

        this.menuGesture = function(opts){
            if(opts.gesture){
                require(["hammerjs"], function(Hammer){
                    delete Hammer.defaults.cssProps.userSelect;
                    $(document).ready(function(){
                        var hammertime = new Hammer($(opts.content).get(0), opts);
                        hammertime.on(opts.gestureevent, function(ev) {
                            if($("body").attr('data-jb-state') == 'open') {
                                self.hideMenu(opts);
                            } else {
                                self.showMenu(opts);
                            }
                        });
                    });

                });

            }
        };

        this.menuScroll = function(opts){
            if(opts.scroll){
                require(["iscroll"], function(){
                    if (typeof(IScroll) != 'undefined' && $(opts.menu + ">" + opts.scrollcontainer).length > 0 && opts.scroll){                
                        opts.menu_scroll = new IScroll(".jb-menu", opts);
                    }
                    $(window).on("resize", function(e){
                        opts.menu_scroll.refresh();
                    }); 
                }); 
            } 
        };

        this.isTouchDevice = function(){
          return 'ontouchstart' in window || 'onmsgesturechange' in window;
        };

        this.hideMenu = function(){
            self = this;
            $("body")
                .attr("data-jb-state", "animate closed");

            if(self.isTouchDevice()){
                $(self.opts.stickyheader).css({ 
                    position: 'fixed',
                    top: 0
                });
            }


            setTimeout(function(){
                $("body").attr("data-jb-state", "closed");
            },300);

            self.stopAnimation();
            self.enableScroll();            
        };

        this.showMenu = function(){
            self = this;
            $("body")
                .attr("data-jb-state", "animate open");

            if(self.isTouchDevice()){
                $(self.opts.stickyheader).css({ 
                    position: 'absolute',
                    top: $('body').scrollTop()
                });
            }

            setTimeout(function(){
                $("body").attr("data-jb-state", "open");
            },300);

            self.stopAnimation();
            self.disableScroll(); 
        };

        this.preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) { e.preventDefault(); }
            e.returnValue = false;
        };

        this.keyDown = function(e) {
            for (var i = self.opts.keys.length; i--;) {
                if (e.keyCode === self.opts.keys[i]) {
                    self.preventDefault(e);
                    return;
                }
            }
        };

        this.wheel = function(e) { 
            self.preventDefault(e);
        };

        this.windowscroll = function(left, top){
            window.scrollTo(window.scrollbarhorizontalposition, window.scrollbarverticalposition);
        };

        this.disableScroll = function() {
            window.scrollbarhorizontalposition = window.pageXOffset || document.documentElement.scrollLeft;
            window.scrollbarverticalposition = window.pageYOffset || document.documentElement.scrollTop;


            if (window.addEventListener) { 
                window.addEventListener('DOMMouseScroll', self.wheel, false);
                window.addEventListener('scroll', self.windowscroll, false);
            }

            window.onmousewheel = document.onmousewheel = self.wheel;          
            document.onkeydown = self.keyDown;
            document.ontouchmove = function (e) { 
                self.preventDefault(e);
            };
        };

        this.enableScroll = function() {
            if (window.removeEventListener) { 
                window.removeEventListener('DOMMouseScroll', self.wheel, false); 
                window.removeEventListener('scroll', self.windowscroll, false); 
            }

            window.onmousewheel = document.onmousewheel = document.onkeyDown = null;
            document.ontouchmove = function (e) { 
                return true;
            };
        };

        this.stopAnimation =  function() {
            setTimeout(function() { 
                $('body').removeClass('is-nav-animate');
            }, 751); 
        };

        this.init();
    };

    return jambonBeurre;
 
});

