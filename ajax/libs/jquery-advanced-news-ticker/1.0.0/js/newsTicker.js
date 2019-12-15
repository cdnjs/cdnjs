/*
                      _____              _____              _____             _______         
                     /\    \            /\    \            /\    \           /::\    \        
                    /::\    \          /::\    \          /::\    \         /::::\    \       
                   /::::\    \         \:::\    \        /::::\    \       /::::::\    \      
                  /::::::\    \         \:::\    \      /::::::\    \     /::::::::\    \     
                 /:::/\:::\    \         \:::\    \    /:::/\:::\    \   /:::/~~\:::\    \    
                /:::/__\:::\    \         \:::\    \  /:::/__\:::\    \ /:::/    \:::\    \   
               /::::\   \:::\    \        /::::\    \ \:::\   \:::\    \:::/    / \:::\    \  
              /::::::\   \:::\    \__    /::::::\    \_\:::\   \:::\    \:/____/   \:::\____\ 
             /:::/\:::\   \:::\____\ \  /:::/\:::\    \ \:::\   \:::\    \    |     |:::|    |
            /:::/  \:::\   \:::|    | \/:::/  \:::\____\ \:::\   \:::\____\___|     |:::|____|
            \::/   |::::\  /:::|____| /:::/    \::/    /  \:::\   \::/    /   _\___/:::/    / 
             \/____|:::::\/:::/    /\/:::/    / \/____/\   \:::\   \/____/:\ |::| /:::/    /  
                   |:::::::::/    /:::::/    /      \:::\   \:::\    \  \:::\|::|/:::/    /   
                   |::|\::::/    /\::::/____/        \:::\   \:::\____\  \::::::::::/    /    
                   |::| \::/____/  \:::\    \         \:::\  /:::/    /   \::::::::/    /     
                   |::|  ~|         \:::\    \         \:::\/:::/    /     \::::::/    /      
                   |::|   |          \:::\    \         \::::::/    /       \::::/____/       
                   \::|   |           \:::\____\         \::::/    /         |::|    |        
                    \:|   |            \::/    /          \::/    /          |::|____|        
                     \|___|             \/____/            \/____/            ~~              
                                                                                                                
     ____.________                                  _____       .___                                     .___ 
    |    |\_____  \  __ __   ___________ ___.__.   /  _  \    __| _/__  _______    ____   ____  ____   __| _/ 
    |    | /  / \  \|  |  \_/ __ \_  __ <   |  |  /  /_\  \  / __ |\  \/ /\__  \  /    \_/ ___\/ __ \ / __ |  
/\__|    |/   \_/.  \  |  /\  ___/|  | \/\___  | /    |    \/ /_/ | \   /  / __ \|   |  \  \__\  ___// /_/ |  
\________|\_____\ \_/____/  \___  >__|   / ____| \____|__  /\____ |  \_/  (____  /___|  /\___  >___  >____ |  
                 \__>           \/       \/              \/      \/            \/     \/     \/    \/     \/  
                   _______                        ___________.__        __                                    
                   \      \   ______  _  ________ \__    ___/|__| ____ |  | __ ___________                    
          ______   /   |   \_/ __ \ \/ \/ /  ___/   |    |   |  |/ ___\|  |/ // __ \_  __ \   ______          
         /_____/  /    |    \  ___/\     /\___ \    |    |   |  \  \___|    <\  ___/|  | \/  /_____/          
                  \____|__  /\___  >\/\_//____  >   |____|   |__|\___  >__|_ \\___  >__|                      
                          \/     \/           \/                     \/     \/    \/                          
*/

;
(function($, window, document, undefined) {
        'use strict';
        // undefined is used here as the undefined global variable in ECMAScript 3 is
        // mutable (ie. it can be hasMoved by someone else). undefined isn't really being
        // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
        // can no longer be modified.

        // window and document are passed through as local variable rather than global
        // as this (slightly) quickens the resolution process and can be more efficiently
        // minified (especially when both are regularly referenced in your plugin).

        // Create the defaults once
        var pluginName = 'newsTicker',
                defaults = {
                        row_height: 20,
                        max_rows: 3,
                        speed: 400,
                        duration: 2500,
                        direction: 'up',
                        autostart: 1,
                        pauseOnHover: 1,
                        nextButton: null,
                        prevButton: null,
                        startButton: null,
                        stopButton: null,
                        hasMoved: function() {},
                        movingUp: function() {},
                        movingDown: function() {},
                        start: function() {},
                        stop: function() {},
                        pause: function() {},
                        unpause: function() {}
                };

        // The actual plugin constructor
        function Plugin(element, options) {
                this.element = element;
                this.$el = $(element);
                this.options = $.extend({}, defaults, options);
                this._defaults = defaults;
                this._name = pluginName;
                this.moveInterval;
                this.state = 0;
                this.paused = 0;
                this.moving = 0;
                if (this.$el.is('ul')) {
                        this.init();
                }
        }

        Plugin.prototype = {
                init: function() {
                        this.$el.height(this.options.row_height * this.options.max_rows)
                                .css({overflow : 'hidden'});

                        this.checkSpeed();

                        if(this.options.nextButton && typeof(this.options.nextButton[0]) !== 'undefined')
                                this.options.nextButton.click(function(e) {
                                        this.moveNext();
                                        this.resetInterval();
                                }.bind(this));
                        if(this.options.prevButton && typeof(this.options.prevButton[0]) !== 'undefined')
                                this.options.prevButton.click(function(e) {
                                        this.movePrev();
                                        this.resetInterval();
                                }.bind(this));
                        if(this.options.stopButton && typeof(this.options.stopButton[0]) !== 'undefined')
                                this.options.stopButton.click(function(e) {
                                        this.stop()
                                }.bind(this));
                        if(this.options.startButton && typeof(this.options.startButton[0]) !== 'undefined')
                                this.options.startButton.click(function(e) {
                                        this.start()
                                }.bind(this));
                        
                        if(this.options.pauseOnHover) {
                                this.$el.hover(function() {
                                        if (this.state)
                                                this.pause();
                                }.bind(this), function() {
                                        if (this.state)
                                                this.unpause();
                                }.bind(this));
                        }

                        if(this.options.autostart)
                                this.start();
                },

                start: function() {
                        if (!this.state) {
                                this.state = 1;
                                this.resetInterval();
                                this.options.start();
                        }
                },

                stop: function() {
                        if (this.state) {
                                clearInterval(this.moveInterval);
                                this.state = 0;
                                this.options.stop();
                        }
                },

                resetInterval: function() {
                        if (this.state) {
                                clearInterval(this.moveInterval);
                                this.moveInterval = setInterval(function() {this.move()}.bind(this), this.options.duration);
                        }
                },

                move: function() {
                         if (!this.paused) this.moveNext();
                },

                moveNext: function() {
                        if (this.options.direction === 'down')
                                this.moveDown();
                        else if (this.options.direction === 'up')
                                this.moveUp();
                },

                movePrev: function() {
                        if (this.options.direction === 'down')
                                this.moveUp();
                        else if (this.options.direction === 'up')
                                this.moveDown();
                },

                pause: function() {
                        if (!this.paused) this.paused = 1;
                        this.options.pause();
                },

                unpause: function() {
                        if (this.paused) this.paused = 0;
                        this.options.unpause();
                },

                moveDown: function() {
                        if (!this.moving) {
                                this.moving = 1;
                                this.options.movingDown();
                                this.$el.children('li:last').detach().prependTo(this.$el).css('marginTop', '-' + this.options.row_height + 'px')
                                        .animate({marginTop: '0px'}, this.options.speed, function(){
                                                this.moving = 0;
                                                this.options.hasMoved();
                                        }.bind(this));
                        }
                },

                moveUp: function() {
                        if (!this.moving) {
                                this.moving = 1;
                                this.options.movingUp();
                                var element = this.$el.children('li:first');
                                element.animate({marginTop: '-' + this.options.row_height + 'px'}, this.options.speed,
                                        function(){
                                                element.detach().css('marginTop', '0').appendTo(this.$el);
                                                this.moving = 0;
                                                this.options.hasMoved();
                                        }.bind(this));
                        }
                },

                updateOption: function(option, value) {
                        if (typeof(this.options[option]) !== 'undefined'){
                                this.options[option] = value;
                                if (option == 'duration' || option == 'speed'){
                                    this.checkSpeed();
                                    this.resetInterval();
                                }
                        }
                },

                getState: function() {
                        if (paused) return 2
                        else return this.state;//0 = stopped, 1 = started
                },

                checkSpeed: function() {
                        if (this.options.duration < (this.options.speed + 25))
                                this.options.speed = this.options.duration - 25;
                },

                destroy: function() {
                        this._destroy(); //or this.delete; depends on jQuery version
                }
        };

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[pluginName] = function(option) {
                var args = arguments;
                
                return this.each(function() {
                        var $this = $(this),
                                data = $.data(this, 'plugin_' + pluginName),
                                options = typeof option === 'object' && option;
                        if (!data) {
                                $this.data('plugin_' + pluginName, (data = new Plugin(this, options)));
                        }
                        // if first argument is a string, call silimarly named function
                        // this gives flexibility to call functions of the plugin e.g.
                        //   - $('.dial').plugin('destroy');
                        //   - $('.dial').plugin('render', $('.new-child'));
                        if (typeof option === 'string') {
                                data[option].apply(data, Array.prototype.slice.call(args, 1));
                        }
                });
        };
})(jQuery, window, document);