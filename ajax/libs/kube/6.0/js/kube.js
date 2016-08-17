;(function()
{
    var Kube = function(element, options)
    {
        this.$element = $(element);
        this.opts = $.extend(
            true,
            {},
            this.opts,
            this.$element.data(),
            options
        );

        // setup animation
        if (this.opts.hasOwnProperty('animation') && this.opts.animation === false)
        {
            this.opts.animation = {};
            this.opts.animation.open = 'show';
            this.opts.animation.close = 'hide';
        }
    };

    Kube.prototype = {
        callback: function(type)
        {
            var value;
    		var args = [].slice.call(arguments).splice(1);
    		var eventNamespace = this.pluginName;

            // on element callback
            if (typeof this.$element !== 'undefined')
            {
                value = this.fireCallback($._data(this.$element[0], 'events'), type, eventNamespace, args);
        		if (typeof value !== 'undefined')
        		{
        			return value;
        		}
    		}

            // on target callback
            if (typeof this.$target !== 'undefined' && typeof this.$target !== null)
            {
                var events;
                if (this.$target.length === 1)
                {
                    events = $._data(this.$target[0], 'events');
                    value = this.fireCallback(events, type, eventNamespace, args);

            		if (typeof value !== 'undefined')
            		{
        			    return value;
                    }
                }
                else
                {
                    value = [];
                    this.$target.each($.proxy(function(i,s)
                    {
                        events = $._data(s, 'events');
                        value.push(this.fireCallback(events, type, eventNamespace, args));

                    }, this));

                    return value;
                }
    		}

    		// no callback
    		if (typeof this.opts === 'undefined' || typeof this.opts.callbacks === 'undefined' || typeof this.opts.callbacks[type] === 'undefined')
    		{
    			return args;
    		}

    		// opts callback
    		var callback = this.opts.callbacks[type];
    		return ($.isFunction(callback)) ? callback.apply(this, args) : args;
        },
        fireCallback: function(events, type, eventNamespace, args)
        {
            if (typeof events !== 'undefined' && typeof events[type] !== 'undefined')
            {

    			var len = events[type].length;
    			for (var i = 0; i < len; i++)
    			{
    				var namespace = events[type][i].namespace;
    				if (namespace === 'callback.' + eventNamespace || namespace === eventNamespace + '.callback')
    				{
    					return events[type][i].handler.apply(this, args);
    				}
    			}
    		}
        },

    	// =scroll
    	disableBodyScroll: function()
    	{
    		var $body = $('html');
    		var windowWidth = window.innerWidth;

    		if (!windowWidth)
    		{
    			var documentElementRect = document.documentElement.getBoundingClientRect();
    			windowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    		}

    		var isOverflowing = document.body.clientWidth < windowWidth;
    		var scrollbarWidth = this.measureScrollbar();

    		$body.css('overflow', 'hidden');
    		if (isOverflowing)
    		{
    			$body.css('padding-right', scrollbarWidth);
    		}
    	},
    	measureScrollbar: function()
    	{
    		var $body = $('body');
    		var scrollDiv = document.createElement('div');
    		scrollDiv.className = 'scrollbar-measure';

    		$body.append(scrollDiv);
    		var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    		$body[0].removeChild(scrollDiv);
    		return scrollbarWidth;
    	},
    	enableBodyScroll: function()
    	{
    		$('html').css({ 'overflow': '', 'padding-right': '' });
    	},

    	// append fields
    	appendFields: function(data)
    	{
    		if (this.opts.appendFields === false)
    		{
    			return data;
    		}

    		var $fields = $(this.opts.appendFields);
    		if ($fields.length === 0)
    		{
    			return data;
    		}
    		else
    		{
                var str = '';

    			$fields.each(function()
    			{
    				str += '&' + $(this).attr('name') + '=' + $(this).val();
    			});

    			return (data === '') ? str.replace(/^&/, '') : data + str;
    		}
    	},
    	appendFieldsAsData: function(data)
    	{
    		if (this.opts.appendFields === false)
    		{
    			return data;
    		}

    		var $fields = $(this.opts.appendFields);
    		if ($fields.length === 0)
    		{
    			return data;
    		}
    		else
    		{
    			$fields.each(function()
    			{
    				data.append($(this).attr('name'), $(this).val());
    			});

    			return data;
    		}
    	},

    	// append forms
    	appendForms: function(data)
    	{
    		if (this.opts.appendForms === false)
    		{
    			return data;
    		}

    		var $forms = $(this.opts.appendForms);
    		if ($forms.length === 0)
    		{
    			return data;
    		}
    		else
    		{
    			var str = $forms.serialize();
    			return (data === '') ? str : data + '&' + str;
    		}
    	},
    	appendFormsAsData: function(data)
    	{
    		if (this.opts.appendForms === false)
    		{
    			return data;
    		}

    		var formsData = $(this.opts.appendForms).serializeArray();
    		$.each(formsData, function(z,f)
    		{
    			data.append(f.name, f.value);
    		});

    		return data;
    	},

        // =utils
    	isMobileScreen: function()
    	{
    		return ($(window).width() <= 768);
    	},
    	isTabletScreen: function()
    	{
    		return ($(window).width() >= 768 && $(window).width() <= 1024);
    	},
    	isDesktopScreen: function()
    	{
    		return ($(window).width() > 1024);
    	},
    	isLargeScreen: function()
    	{
    		return ($(window).width() > 1200);
    	},
    	isMobile: function()
    	{
    		return /(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent);
    	},
    	isDesktop: function()
    	{
    		return !/(iPhone|iPod|iPad|BlackBerry|Android)/.test(navigator.userAgent);
    	}
    };


    var SuperKube = {
    	pluginsByClass: {},
        classByPlugin: {},
        plugin: function(name, obj)
        {
            obj.pluginName = name;

            function klass()
            {
                if (obj.hasOwnProperty('init'))
                {
                    obj.init.apply(this, arguments);
                }
            };

            klass.prototype = Object.create(Kube.prototype);
            klass.prototype.constructor = klass;

            for (var key in obj)
            {
                klass.prototype[key] = obj[key];
            }

            var classname = (obj.hasOwnProperty('classname')) ? obj.classname : false;

    		if (classname)
    		{
        		SuperKube.classByPlugin[name] = classname;
        		SuperKube.pluginsByClass[classname] = name;
    		}

            $.fn[name] = SuperKube.createPlugin(name, klass, classname);

            return klass;
        },
        createPlugin: function(name, obj, classname)
        {
            var plugin = function(options)
            {
                var val = [];
                var args = Array.prototype.slice.call(arguments, 1);

                if (typeof options === 'string')
                {
                    this.eq(0).each(function()
                    {
                        var instance = $.data(this, name);
                        if (typeof instance !== 'undefined' && $.isFunction(instance[options]))
                        {
                            var methodVal = instance[options].apply(instance, args);
                            if (methodVal !== undefined && methodVal !== instance)
                            {
                                val.push(methodVal);
                            }
                        }
                        else
                        {
                            return $.error('No such method "' + options + '" for ' + name);
                        }
                    });
                }
                else
                {
                    this.each(function()
                    {
                        var $el = $(this);

                        // loaded
                        if ($el.attr('data-component-' + name + '-loaded') === true)
                        {
                            return;
                        }
                        $el.attr('data-component-' + name + '-loaded', true);

                        var instance = new obj(this, options);

                        $.data(this, name, {});
                        $.data(this, name, instance);

                        // target api
                        if (typeof instance.$target !== 'undefined' && typeof instance.$target !== null)
                        {
                            instance.$target.data(name, instance);
                        }
                    });
                }

                return (val.length === 0 || val.length === 1) ? ((val.length === 0) ? this : val[0]) : val;
            };

            $(window).on('load.components.' + name, function()
            {
                if (classname)
    			{
        			$('.' + classname)[name]();
                }

            	$('[data-component="' + name + '"]')[name]();
            });

            return plugin;
        }
    };


    window.Kube = Kube;
    window.SuperKube = SuperKube;

})();
(function($)
{
    $.observer = {
        watch: function()
        {
            $(window).on('load', function()
            {
            	$.observer.liveComponentsObserver();
            });
        },
    	getComponentsClasses: function()
    	{
    		var str = [];
    		for (var key in SuperKube.classByPlugin)
    		{
    			str.push(SuperKube.classByPlugin[key]);
    		}

    		return str;
    	},
    	getComponentsClassesAsString: function()
    	{
    		var str = $.observer.getComponentsClasses();

    		return (str.length === 0) ? '' : ',.' + str.join(',.');
    	},
    	getComponentByClass: function(classname)
    	{
    		return SuperKube.pluginsByClass[classname];
    	},
    	once: function(listen, classes)
    	{
    		var listen = (typeof listen === 'undefined') ? $.observer.getComponentsClasses() : listen;
    		var classes = (typeof classes === 'undefined') ? $.observer.getComponentsClassesAsString() : classes;

            var $nodes = $('[data-component]' + classes);
    		$nodes.each(function()
    		{
    			var $node = $(this);

    			var hasClass = false;
    			var lenClasses = listen.length;

    			if (lenClasses > 0)
    			{
    				for (var z = 0; z < lenClasses; z++)
    				{
    					if ($node.hasClass(listen[z]))
    					{
    						hasClass = $.observer.getComponentByClass(listen[z]);
    					}
    				}
    			}

                var func;
                if (hasClass)
                {
    				func = hasClass;
    				if (typeof $node.attr('data-component-' + func + '-loaded') === 'undefined' && typeof $node[func] !== 'undefined')
    				{
    					$node[func]();
    				}
    			}

    			if ($node.attr('data-component'))
    			{
    				func = $node.attr('data-component');
    				if (typeof $node.attr('data-component-' + func + '-loaded') === 'undefined' && typeof $node[func] !== 'undefined')
    				{
    					$node[func]();
    				}
    			}
    		});
    	},
        liveComponentsObserver: function()
        {
            if (!window.MutationObserver)
            {
                return;
            }

    		var listen = $.observer.getComponentsClasses();
    		var classes = $.observer.getComponentsClassesAsString();

    		var observer = new MutationObserver(function(mutations)
    		{
    			mutations.forEach(function(mutation)
    			{
    				var newNodes = mutation.addedNodes;
    			    if (newNodes.length === 0 || (newNodes.length === 1 && newNodes.nodeType === 3))
    			    {
    				    return;
    				}

                    $.observer.once(listen, classes);

    			});
    		});

    		// pass in the target node, as well as the observer options
    		observer.observe(document, {
    			 subtree: true,
    			 childList: true
    		});
        }
    };
})(jQuery);
(function(Kube)
{
    Kube.Alert = SuperKube.plugin('alert', {

        opts: {
            click: false,
            animation: {
                open: {
                    name: 'fadeIn',
                    timing: 'linear',
                    duration: 0.5
                },
                close:
                {
                    name: 'fadeOut',
                    timing: 'linear',
                    duration: 0.5
                }
            },
            callbacks: ['open', 'opened', 'close', 'closed']
        },
        init: function()
        {
            Kube.apply(this, arguments);

            this.$close = this.getCloseLink();
            this.$close.on('click.component.alert', $.proxy(this.close, this));

            if (this.opts.click !== false)
            {
                this.$element.on('click.component.alert', $.proxy(this.close, this));
            }
        },
        getCloseLink: function()
        {
            return this.$element.find('.close');
        },
        isOpened: function()
        {
            return this.$element.hasClass('open');
        },
        isClosed: function()
        {
            return !this.$element.hasClass('open');
        },
        open: function(e)
        {
            if (e)
            {
                e.preventDefault();
            }

            this.callback('open');
            this.$element.animation(this.opts.animation.open, $.proxy(this.opened, this));
        },
        opened: function()
        {
            this.$element.removeClass('hide').addClass('open');
            this.callback('opened');
        },
        close: function(e)
        {
            if (e)
            {
                e.preventDefault();
            }

            this.callback('close');
            this.$element.animation(this.opts.animation.close, $.proxy(this.closed, this));
        },
        closed: function()
        {
            this.$element.addClass('hide').removeClass('open');
            this.callback('closed');
        },
        destroy: function()
        {
            this.$element.off('.component.alert').removeData();
            this.$close.remove();
        }
    });

}(Kube));
(function($)
{
	$.fn.animation = function(animation, options, callback)
	{
		return this.each(function()
		{
			return new Animation(this, animation, options, callback);
		});
	};

	function Animation(element, animation, options, callback)
	{
		// default
		var opts = {
    		name: 'show',
			duration: 0.5,
			iterate: 1,
			delay: 0,
			prefix: '',
			timing: 'linear'
		};

        // animation name or options
		if (typeof animation === 'object')
		{
    		callback = options;
    		options = animation;
		}
		else
		{
    		opts.name = animation;
		}

		// options or callback
		if (typeof options === 'function')
		{
			callback = options;
			this.opts = opts;
		}
		else
		{
			this.opts = $.extend(opts, options);
		}

		this.slide = (this.opts.name === 'slideDown' || this.opts.name === 'slideUp');
		this.$element = $(element);
		this.prefixes = ['', '-moz-', '-o-animation-', '-webkit-'];
		this.queue = [];

		// slide
		if (this.slide)
		{
			this.$element.height(this.$element.height());
		}

		// init
		this.init(callback);
	}

    Animation.prototype = {

		init: function(callback)
		{
			this.queue.push(this.opts.name);
			this.clean();

			if (this.opts.name === 'show')
			{
    			this.$element.removeClass('hide').show();
            }
            else if (this.opts.name === 'hide')
            {
                this.$element.hide();
            }

			if (this.opts.name === 'show' || this.opts.name === 'hide')
			{
				this.opts.timing = 'linear';

				if (typeof callback === 'function')
				{
                    setTimeout(callback, this.opts.duration * 1000);
				}
			}
			else
			{
				this.animate(callback);
			}

		},
		animate: function(callback)
		{
			this.$element.addClass('animated').css('display', 'block').removeClass('hide');
			this.$element.addClass(this.opts.prefix + this.queue[0]);

			this.set(this.opts.duration + 's', this.opts.delay + 's', this.opts.iterate, this.opts.timing);
			var _callback = (this.queue.length > 1) ? null : callback;
			this.complete('AnimationEnd', $.proxy(this.makeComplete, this), _callback);
		},
		set: function(duration, delay, iterate, timing)
		{
			var len = this.prefixes.length;

			while (len--)
			{
				this.$element.css(this.prefixes[len] + 'animation-duration', duration);
				this.$element.css(this.prefixes[len] + 'animation-delay', delay);
				this.$element.css(this.prefixes[len] + 'animation-iteration-count', iterate);
				this.$element.css(this.prefixes[len] + 'animation-timing-function', timing);
			}
		},
		clean: function()
		{
			this.$element.removeClass('animated').removeClass(this.opts.prefix + this.queue[0]);
			this.set('', '', '', '');
		},
		makeComplete: function()
		{
            if (this.$element.hasClass(this.opts.prefix + this.queue[0]))
            {
				this.clean();
				this.queue.shift();

				if (this.queue.length)
				{
					this.animate(callback);
				}
			}
		},
		complete: function(type, make, callback)
		{
			this.$element.one(type.toLowerCase() + ' webkit' + type + ' o' + type + ' MS' + type, $.proxy(function()
			{
				if (typeof make === 'function')
				{
					make();
				}

				// hide
				var effects = ['fadeOut', 'slideUp', 'zoomOut', 'slideOutUp', 'slideOutRight', 'slideOutLeft'];
				if ($.inArray(this.opts.name, effects) !== -1)
				{
					this.$element.css('display', 'none');
				}

				// slide
				if (this.slide)
				{
					this.$element.css('height', '');
				}

				if (typeof callback === 'function')
				{
					callback(this);
				}

			}, this));
		}
	};

})(jQuery);
(function(Kube)
{
    Kube.Сollapse = SuperKube.plugin('collapse', {

        classname: 'collapse',
        opts: {
            target: false,
            toggle: true,
            active: false, // string (hash = tab id selector)
            animation: {
                open: {
                    name: 'slideDown',
                    timing: 'linear',
                    duration: 0.3
                },
                close: {
                    name: 'slideUp',
                    timing: 'linear',
                    duration: 0.2
                }
            },
            toggleClass: 'collapse-toggle',
            boxClass: 'collapse-box',
            callbacks: ['open', 'opened', 'close', 'closed'],

            // private
            hashes: [],
        	currentHash: false,
        	currentItem: false

        },
        init: function()
        {
            Kube.apply(this, arguments);

            // items
            this.$items = this.getItems();
            this.$items.each($.proxy(this.loadItems, this));

            // boxes
            this.$boxes = this.getBoxes();

            // close all
            this.closeAll();

            // active
            this.setActiveItem();
        },
        getItems: function()
        {
            return this.$element.find('.' + this.opts.toggleClass);
        },
        getBoxes: function()
        {
            return this.$element.find('.' + this.opts.boxClass);
        },
    	loadItems: function(i, el)
    	{
    		var item = this.getItem(el);

    		// set item identificator
    		item.$el.attr('rel', item.hash);

            // active
    		if (item.$el.hasClass('active'))
    		{
    			this.opts.currentItem = item;
    			this.opts.active = item.hash;
    		}

    		// event
    		item.$el.on('click.component.collapse', $.proxy(this.toggle, this));

    	},
    	setActiveItem: function()
    	{
    		if (this.opts.active !== false)
    		{
    			this.opts.currentItem = this.getItemBy(this.opts.active);
    			this.opts.active = this.opts.currentItem.hash;
    		}

            if (this.opts.currentItem !== false)
            {
    		    this.addActive(this.opts.currentItem);
    		    this.opts.currentItem.$box.show();
    		}
    	},
    	addActive: function(item)
    	{
    		item.$box.removeClass('hide').addClass('open');
    		item.$el.addClass('active');

    		if (item.$caret !== false)
    		{
    		    item.$caret.removeClass('down').addClass('up');
    		}

    		if (item.$parent !== false)
    		{
        		item.$parent.addClass('active');
    		}

    		this.opts.currentItem = item;
    	},
    	removeActive: function(item)
    	{
    		item.$box.removeClass('open');
    		item.$el.removeClass('active');

    		if (item.$caret !== false)
    		{
    		    item.$caret.addClass('down').removeClass('up');
    		}

    		if (item.$parent !== false)
    		{
        		item.$parent.removeClass('active');
    		}

    		this.opts.currentItem = false;
    	},
        toggle: function(e)
        {
            if (e)
            {
                e.preventDefault();
            }

            var target = $(e.target).closest('.' + this.opts.toggleClass).get(0) || e.target;
            var item = this.getItem(target);

            return (this.isClosed(item.hash)) ? this.open(e) : this.close(item.hash);
        },
        openAll: function()
        {
            this.$items.addClass('active');
            this.$boxes.addClass('open').show();
        },
        open: function(e, push)
        {
        	if (typeof e === 'undefined')
        	{
            	return;
        	}

    		if (typeof e === 'object')
    		{
    			e.preventDefault();
            }

            var target = $(e.target).closest('.' + this.opts.toggleClass).get(0) || e.target;
    		var item = (typeof e === 'object') ? this.getItem(target) : this.getItemBy(e);

    		if (item.$box.hasClass('open'))
    		{
        		return;
    		}

    		if (this.opts.toggle)
    		{
    		    this.closeAll();
    		}

    		this.callback('open', item);
    		this.addActive(item);

            item.$box.animation(this.opts.animation.open, $.proxy(this.opened, this));
        },
        opened: function()
        {
    		this.callback('opened', this.opts.currentItem);
        },
        closeAll: function()
        {
            this.$items.removeClass('active').closest('li').removeClass('active');
            this.$boxes.removeClass('open').hide();
        },
        close: function(num)
        {
    		var item = this.getItemBy(num);

    		this.callback('close', item);
    		item.$box.animation(this.opts.animation.close, $.proxy(this.closed, this));

        },
        closed: function()
        {
            var item = this.opts.currentItem;

    		this.removeActive(item);
    		this.callback('closed', item);
        },
        isOpened: function(hash)
        {
            return $(hash).hasClass('open');
        },
        isClosed: function(hash)
        {
            return !$(hash).hasClass('open');
        },
    	getItem: function(element)
    	{
    		var item = {};

    		item.$el = $(element);
    		item.hash = item.$el.attr('href');
    		item.$box = $(item.hash);

    		var $parent = item.$el.parent();
    		item.$parent = ($parent[0].tagName === 'LI') ? $parent : false;

    		var $caret = item.$el.find('.caret');
    		item.$caret = ($caret.length !== 0) ? $caret : false;

    		return item;
    	},
    	getItemBy: function(num)
    	{
    		var element = (typeof num === 'number') ? this.$items.eq(num-1) : this.$element.find('[rel="' + num + '"]');

    		return this.getItem(element);
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Dropdown = SuperKube.plugin('dropdown', {

    	opts: {

    		target: null,
    		height: false, // integer
    		width: false, // integer
    		animation: {
        		open: {
            		name: 'slideDown',
            		duration: 0.15,
            		timing: 'linear'
        		},
        		close: {
            		name: 'slideUp',
                    duration: 0.1,
                    timing: 'linear'
        		}
    		},
    		callbacks: ['open', 'opened', 'close', 'closed'],

    		// private
    		caretUp: false

    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

            if (this.opts.target === null)
            {
                return;
            }

    		this.$target = $(this.opts.target);
    		this.$target.hide();

    		if (this.isMobile())
    		{
                this.buildMobileAnimation();
    		}

    		this.$close = this.$target.find('.close');

            this.$caret = this.getCaret();
    		this.buildCaretPosition();

    		this.$element.on('click.component.dropdown', $.proxy(this.toggle, this));
    	},
    	buildMobileAnimation: function()
    	{
            this.opts.animationOpen = 'fadeIn';
            this.opts.animationClose = 'fadeOut';
    	},
    	getCaret: function()
    	{
        	return this.$element.find('.caret');
    	},
    	buildCaretPosition: function()
    	{
    		var height = this.$element.offset().top + this.$element.innerHeight() + this.$target.innerHeight();

    		if ($(document).height() > height)
    		{
    			return;
    		}

            this.opts.caretUp = true;
    		this.$caret.addClass('up');
    	},
    	toggleCaretOpen: function()
    	{
    		if (this.opts.caretUp)
    		{
        		this.$caret.removeClass('up').addClass('down');
    		}
    		else
    		{
        		this.$caret.removeClass('down').addClass('up');
    		}
    	},
    	toggleCaretClose: function()
    	{
    		if (this.opts.caretUp)
    		{
        		this.$caret.removeClass('down').addClass('up');
    		}
    		else
    		{
        		this.$caret.removeClass('up').addClass('down');
    		}
    	},
    	toggle: function(e)
    	{
    		return (this.isClosed()) ? this.open(e) : this.close(e);
    	},
    	getPlacement: function(height)
    	{
    		return ($(document).height() < height) ? 'top' : 'bottom';
    	},
    	getOffset: function(position)
    	{
    		return (this.isNavigationFixed()) ? this.$element.position() : this.$element.offset();
    	},
    	getPosition: function()
    	{
    		return (this.isNavigationFixed()) ? 'fixed' : 'absolute';
    	},
    	setPosition: function()
    	{
    		if (this.isMobile())
    		{
                this.$target.addClass('dropdown-mobile');
    		}
    		else
    		{
    			var position = this.getPosition();
    			var coords = this.getOffset(position);
    			var height = this.$target.innerHeight();
    			var width = this.$target.innerWidth();
    			var placement = this.getPlacement(coords.top + height + this.$element.innerHeight());

    			var leftFix = ($(window).width() < (coords.left + width)) ? (width - this.$element.innerWidth()) : 0;
    			var top, left = coords.left - leftFix;

    			if (placement === 'bottom')
    			{
        			if (this.isClosed())
                    {
        				this.$caret.removeClass('up').addClass('down');
                    }

    				this.opts.caretUp = false;

    				top = coords.top + this.$element.outerHeight() + 1;
    			}
    			else
    			{
    				this.opts.animation.open.name = 'show';
    				this.opts.animation.close.name = 'hide';

                    if (this.isClosed())
                    {
    				    this.$caret.addClass('up').removeClass('down');
    				}

    				this.opts.caretUp = true;

    				top = coords.top - height - 1;
    			}

    			this.$target.css({ position: position, top: top + 'px', left: left + 'px' });
    		}

    	},
    	enableEvents: function()
    	{
    		if (this.isDesktop())
    		{
    			this.$target.on('mouseover.component.dropdown', $.proxy(this.disableBodyScroll, this)).on('mouseout.component.dropdown', $.proxy(this.enableBodyScroll, this));
    		}

    		$(document).on('scroll.component.dropdown', $.proxy(this.setPosition, this));
    		$(window).on('resize.component.dropdown', $.proxy(this.setPosition, this));
    		$(document).on('click.component.dropdown touchstart.component.dropdown', $.proxy(this.close, this));
    		$(document).on('keydown.component.dropdown', $.proxy(this.handleKeyboard, this));
    		this.$target.find('[data-action="dropdown-close"]').on('click.component.dropdown', $.proxy(this.close, this));
    	},
    	disableEvents: function()
    	{
    		this.$target.off('.component.dropdown');
    		$(document).off('.component.dropdown');
    		$(window).off('.component.dropdown');
    	},
    	open: function(e)
    	{
        	if (e)
        	{
       			e.preventDefault();
        	}

    		this.callback('open');

    		$('.dropdown').removeClass('open').hide();

    		if (this.opts.height)
    		{
    			this.$target.css('min-height', this.opts.height + 'px');
    		}

    		if (this.opts.width)
    		{
    			this.$target.width(this.opts.width);
    		}

    		this.setPosition();
    		this.toggleCaretOpen();

    		this.$target.addClass('open').animation(this.opts.animation.open, $.proxy(this.opened, this));

    	},
    	opened: function()
    	{
    		this.enableEvents();
    		this.callback('opened');

    	},
    	handleKeyboard: function(e)
    	{
    		return (e.which === 27) ? this.close(e) : true;
    	},
    	shouldNotBeClosed: function(el)
    	{
            if ($(el).attr('data-action') === 'dropdown-close' || el === this.$close[0])
            {
                return false;
        	}
        	else if ($(el).closest('.dropdown').length === 0)
        	{
            	return false;
        	}

        	return true;
    	},
    	close: function(e)
    	{

            if (this.isClosed())
    		{
    			return;
    		}

    		if (e)
    		{

    			if (this.shouldNotBeClosed(e.target))
    			{
    				return;
    			}

    			e.preventDefault();
    		}

    		this.enableBodyScroll();
    		this.callback('close');
    		this.toggleCaretClose();
    		this.$target.removeClass('open').animation(this.opts.animation.close, $.proxy(this.closed, this));
    	},
    	closed: function()
    	{
    		this.disableEvents();
    		this.callback('closed');
    	},
    	isOpened: function()
    	{
        	return this.$target.hasClass('open');
    	},
    	isClosed: function()
    	{
        	return !this.$target.hasClass('open');
    	},
    	isNavigationFixed: function()
    	{
        	return (this.$element.closest('.fixed').length !== 0);
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Alert = SuperKube.plugin('message', {

        opts: {
            target: null,
            top: '16px',
            right: '16px',
            position: 'right', // center
            click: true,
            delay: 3, // message autohide delay - seconds or false
            animation: {
                open: {
                    name: 'fadeIn',
                    duration: 0.35,
                    timing: 'linear'
                },
                close: {
                    name: 'fadeOut',
                    duration: 0.35,
                    timing: 'linear'
                }
            },
            callbacks: ['open', 'opened', 'close', 'closed']
        },
        init: function()
        {
            Kube.apply(this, arguments);

            if (this.opts.target === null)
            {
                return;
            }

            this.$target = $(this.opts.target);
            this.$element.on('click.component.message', $.proxy(this.open, this));

            // close link
    		this.$close = this.getCloseLink();
    		this.$close.on('click.component.message', $.proxy(this.close, this));
    	},
    	getCloseLink: function()
    	{
            return this.$target.find('.close');
    	},
        setPosition: function()
        {
            this.opts.top = (this.isLine()) ? 0 : this.opts.top;

            if (this.opts.position === 'center' || this.isLine())
            {
                this.$target.css({ 'top': this.opts.top, 'right': '', 'left': '50%' });
                this.$target.css({ 'margin-left': '-' + this.$target.innerWidth()/2 + 'px' });
            }
            else
            {
                this.$target.css({ 'top': this.opts.top, 'right': this.opts.right, 'left': '' });
            }
        },
        open: function()
        {
            if (this.isOpened())
            {
                return;
            }

            this.closeAll();
            this.setPosition();

            this.callback('open');
            this.$target.addClass('open').animation(this.opts.animation.open, $.proxy(this.opened, this));

        },
        opened: function()
        {
    		$(document).on('keyup.component.message', $.proxy(this.handleKeyboard, this));

            this.$target.addClass('open');

    		if (this.opts.click)
    		{
    			this.$target.on('click.component.message', $.proxy(this.close, this));
            }

    		if (this.opts.delay !== false)
    		{
    			this.timeout = setTimeout($.proxy(this.close, this), this.opts.delay * 1000);
            }

            this.callback('opened');
        },
        closeAll: function()
        {
            $(document).off('keyup.component.message');
            $('.message').not(this.$target[0]).hide().removeClass('open');
            clearTimeout(this.timeout);
        },
    	handleKeyboard: function(e)
    	{
    		return (e.which === 27) ? this.close() : true;
    	},
    	close: function(e)
    	{
            if (this.isClosed())
            {
                return;
            }

    		if (e && e.preventDefault)
    		{
    			e.preventDefault();
    		}

            this.callback('close');
    		this.$target.off('click.component.message').animation(this.opts.animation.close, $.proxy(this.closed, this));
    	},
    	closed: function()
    	{
    		this.$target.removeClass('open');
    		$(document).off('keyup.component.message');
    		clearTimeout(this.timeout);
    		this.callback('closed');
    	},
    	isLine: function()
    	{
            return this.$target.hasClass('line');
    	},
        isOpened: function()
        {
            return this.$target.hasClass('open');
        },
        isClosed: function()
        {
            return !this.$target.hasClass('open');
        }

    });

}(Kube));

// Direct Load
(function($)
{
    $.modalcurrent = null;
	$.modalwindow = function(options)
	{
		if (typeof this.element === 'undefined')
		{
			this.element = document.createElement('span');
		}

		if (typeof options === 'string')
		{
			var args = Array.prototype.slice.call(arguments, 1);
			$(this.element).modal(options, args[0]);
		}
		else
		{
			options.show = true;
			$(this.element).modal(options);

		}
	};

})(jQuery);

(function(Kube)
{
    Kube.Modal = SuperKube.plugin('modal', {

    	opts: {

            target: null,
    		url: false,
    		header: false,
    		width: '600px', // string
    		height: false, // or string
    		maxHeight: false,
    		position: 'center', // top or center
    		show: false,
    		overlay: true,
    		appendForms: false,
    		appendFields: false,
    		animation: {
        		open: {
            		name: 'show',
            		timing: 'linear',
            		duration: 0.25
        		},
        		close: {
            		name: 'hide',
            		timing: 'linear',
            		duration: 0.25
        		}
    		},
    		callbacks: ['open', 'opened', 'close', 'closed']
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		if (this.opts.target === null)
    		{
    			return;
    		}

    		this.$target = $(this.opts.target);
    		if (this.$target.length === 0)
    		{
        		return;
    		}

    		if (this.opts.show)
    		{
    			this.load(false);
    		}
    		else
    		{
    			this.$element.on('mousedown.component.modal', $.proxy(this.load, this));
    		}
    	},
    	load: function(e)
    	{
    		if (e && e.preventDefault)
    		{
    			e.preventDefault();
    		}

    		if (this.$element.hasClass('in'))
    		{
    			return;
    		}

    		this.buildModal();
    		this.buildOverlay();
    		this.buildHeader();

    		if (this.opts.url)
    		{
        		this.buildContent();
            }
            else
            {
                this.open();
            }
    	},
    	buildModal: function()
    	{
    		this.$modal = this.$target.find('.modal');
    		this.$header = this.$target.find('.modal-header');
    		this.$close = this.$target.find('.close');
    		this.$body = this.$target.find('.modal-body');
    	},
    	buildOverlay: function()
    	{
    		if (this.opts.overlay === false)
    		{
    			return;
    		}

    		if ($('#modal-overlay').length !== 0)
    		{
    			this.$overlay = $('#modal-overlay');
    		}
    		else
    		{
    			this.$overlay = $('<div id="modal-overlay">').hide();
    			$('body').prepend(this.$overlay);
    		}

    		this.$overlay.addClass('overlay');
    	},
    	buildHeader: function()
    	{
        	if (this.opts.header)
        	{
    		    this.$header.html(this.opts.header);
    		}
    	},
    	buildContent: function()
    	{
    		var params = '';
    		params = this.appendForms(params);
    		params = this.appendFields(params);

    		$.ajax({
    			url: this.opts.url + '?' + new Date().getTime(),
    			cache: false,
    			type: 'post',
    			data: params,
    			success: $.proxy(function(data)
    			{
    				this.$body.html(data);
    				this.open();

    			}, this)
    		});
    	},
    	buildWidth: function()
    	{
    		var width = this.opts.width;
    		var top = '2%';
    		var bottom = '2%';
    		var percent = width.match(/%$/);

    		if ((parseInt(this.opts.width) > $(window).width()) && !percent)
    		{
                width = '96%';
    		}
    		else if (!percent)
    		{
                top = '16px';
                bottom = '16px';
    		}

    		this.$modal.css({ 'width': width, 'margin-top': top, 'margin-bottom': bottom });

    	},
    	buildPosition: function()
    	{
    		if (this.opts.position !== 'center')
    		{
    			return;
    		}

    		var windowHeight = $(window).height();
    		var height = this.$modal.outerHeight();
    		var top = (windowHeight/2 - height/2) + 'px';

    		if (this.isMobile())
    		{
    			top = '2%';
    		}
    		else if (height > windowHeight)
    		{
    			top = '16px';
    		}

    		this.$modal.css('margin-top', top);
    	},
    	buildHeight: function()
    	{
    		var windowHeight = $(window).height();

    		if (this.opts.maxHeight)
    		{
        		var padding = parseInt(this.$body.css('padding-top')) + parseInt(this.$body.css('padding-bottom'));
        		var margin = parseInt(this.$modal.css('margin-top')) + parseInt(this.$modal.css('margin-bottom'));
    			var height = windowHeight - this.$header.innerHeight() - padding - margin;

    			this.$body.height(height);
    		}
    		else if (this.opts.height !== false)
    		{
    			this.$body.css('height', this.opts.height);
    		}

    		var modalHeight = this.$modal.outerHeight();
    		if (modalHeight > windowHeight)
    		{
    			this.opts.animation.open.name = 'show';
    			this.opts.animation.close.name = 'hide';
    		}
    	},
    	resize: function()
    	{
    		this.buildWidth();
    		this.buildPosition();
    		this.buildHeight();
    	},
    	enableEvents: function()
    	{
    		this.$close.on('click.component.modal', $.proxy(this.close, this));
    		$(document).on('keyup.component.modal', $.proxy(this.handleEscape, this));
    		this.$target.on('click.component.modal', $.proxy(this.close, this));
    	},
    	disableEvents: function()
    	{
    		this.$close.off('.component.modal');
    		$(document).off('.component.modal');
    		this.$target.off('.component.modal');
    		$(window).off('.component.modal');
    	},
    	findActions: function()
    	{
    		this.$body.find('[data-action="modal-close"]').on('mousedown.component.modal', $.proxy(this.close, this));
    	},
    	setHeader: function(header)
    	{
    		this.$header.html(header);
    	},
    	setContent: function(content)
    	{
    		this.$body.html(content);
    	},
    	setWidth: function(width)
    	{
    		this.opts.width = width;
    		this.resize();
    	},
    	getModal: function()
    	{
            return this.$modal;
    	},
    	getBody: function()
    	{
            return this.$body;
    	},
    	getHeader: function()
    	{
            return this.$header;
    	},
    	open: function()
    	{
    		if (this.isOpened())
    		{
    			return;
    		}

    		if (this.isMobile())
    		{
    			this.opts.width = '96%';
    		}

    		if (this.opts.overlay)
    		{
    			this.$overlay.show();
    		}

    		this.$target.removeClass('hide').show();

            this.enableEvents();
    		this.findActions();

    		this.resize();
    		$(window).on('resize.component.modal', $.proxy(this.resize, this));

    		if (this.isDesktop())
    		{
    			this.disableBodyScroll();
    		}

    		// enter
    		this.$modal.find('input[type=text],input[type=url],input[type=email]').on('keydown.component.modal', $.proxy(this.handleEnter, this));

    		this.callback('open');
    		this.$modal.animation(this.opts.animation.open, $.proxy(this.opened, this));

    	},
    	opened: function()
    	{
    		this.$modal.addClass('open');
            this.callback('opened');

            $.modalcurrent = this;
    	},
    	handleEnter: function(e)
    	{
        	if (e.which === 13)
        	{
            	e.preventDefault();
            	this.close(false);
            }

    	},
    	handleEscape: function(e)
    	{
        	return (e.which === 27) ? this.close(false) : true;
    	},
    	close: function(e)
    	{
    		if (!this.$modal || this.isClosed())
    		{
    			return;
    		}

    		if (e)
    		{
    			if (this.shouldNotBeClosed(e.target))
    			{
    				return;
    			}

    			e.preventDefault();
    		}

    		this.callback('close');
    		this.disableEvents();

    		this.$modal.animation(this.opts.animation.close, $.proxy(this.closed, this));

            if (this.opts.overlay)
    		{
    		    this.$overlay.animation(this.opts.animation.close);
            }
    	},
    	closed: function()
    	{
    		this.callback('closed');

            this.$target.addClass('hide');
            this.$modal.removeClass('open');

    		if (this.isDesktop())
    		{
    			this.enableBodyScroll();
    		}

    		this.$body.css('height', '');
            $.modalcurrent = null;
    	},
    	shouldNotBeClosed: function(el)
    	{
            if ($(el).attr('data-action') === 'modal-close' || el === this.$close[0])
            {
                return false;
        	}
        	else if ($(el).closest('.modal').length === 0)
        	{
            	return false;
        	}

        	return true;
    	},
    	isOpened: function()
    	{
        	return this.$modal.hasClass('open');
    	},
    	isClosed: function()
    	{
        	return !this.$modal.hasClass('open');
    	},
    	destroy: function()
    	{
    		this.$element.off('.component.modal');

    		this.enableBodyScroll();
    		this.disableEvents();

    		this.$body.css('height', '');
    		this.$target.addClass('hide');

    		if (this.opts.overlay)
    		{
    			this.$overlay.remove();
    		}
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Offcanvas = SuperKube.plugin('offcanvas', {

    	opts: {

    		target: null, // selector
    		push: true, // boolean
    		width: '250px', // string
    		direction: 'left', // string: left or right
    		event: 'click',
    		clickOutside: true, // boolean
    		animation: {
        		open: {
            		name: 'slideInLeft',
                    duration: 0.3,
                    timing: 'linear'
                },
        		close: {
            		name: 'slideOutLeft',
    				duration: 0.2,
    				timing: 'linear'
                }
            },
    		callbacks: ['open', 'opened', 'close', 'closed'],

    		// private
    		onlymobile: true // boolean
    	},
    	init: function()
    	{
        	Kube.apply(this, arguments);

    		if (typeof this.opts.target === null)
    		{
    			return;
    		}

    		this.$target = $(this.opts.target);
    		this.opts.onlymobile = (this.$target.hasClass('hide-on-small'));

    		// build
    		this.opts.width = ($(window).width() < parseInt(this.opts.width)) ? '100%' : this.opts.width;
            this.$element.addClass('offcanvas-element').on(this.opts.event + '.component.offcanvas', $.proxy(this.toggle, this));

            this.buildDirectionAnimation();

            // close link
            this.$close = this.getCloseLink();
    	},
    	buildDirectionAnimation: function()
    	{
            if (this.opts.direction === 'right')
            {
                this.opts.animation.open.name = 'slideInRight';
    			this.opts.animation.close.name = 'slideOutRight';
            }
    	},
    	getCloseLink: function()
    	{
            return this.$target.find('.close');
    	},
    	toggle: function(e)
    	{
        	if (e)
        	{
    		    e.preventDefault();
    		}

    		return (this.isClosed()) ? this.open() : this.close();
    	},
    	open: function()
    	{
    		var $el = $(document).find('.offcanvas');
    		if ($el.length !== 0 && $el.hasClass('open'))
    		{
                // close all
                $(document).off('.component.offcanvas');
                $el.css('width', '').hide().removeClass('open offcanvas offcanvas-left offcanvas-right');
    		}

    		this.callback('open');
            this.$target.css('width', this.opts.width).addClass('offcanvas offcanvas-' + this.opts.direction);

            if (this.opts.onlymobile)
            {
                this.$target.removeClass('hide-on-small');
            }

            this.push();
    		this.$target.addClass('open').animation(this.opts.animation.open, $.proxy(this.opened, this));
    	},
    	push: function()
    	{
            if (this.opts.push)
            {
                var properties = (this.opts.direction === 'left') ? { 'left': this.opts.width } : { 'left': '-' + this.opts.width };
                $('body').addClass('offcanvas-push-body').animate(properties, this.opts.animation.open.duration * 1000);
            }
    	},
    	opened: function()
    	{
    		if (this.opts.clickOutside)
    		{
    			$(document).on('click.component.offcanvas', $.proxy(this.close, this));
    		}

    		if (this.isMobileScreen())
    		{
    			$('html').addClass('no-scroll');
    		}

            $(document).on('keyup.component.offcanvas', $.proxy(this.handleKeyboard, this));
            this.$close.on('click.component.offcanvas', $.proxy(this.close, this));
    		this.disableBodyScroll();
            this.callback('opened');
    	},
    	handleKeyboard: function(e)
    	{
    		return (e.which === 27) ? this.close() : true;
    	},
    	close: function(e)
    	{
        	if (e && ($(e.target).closest('.offcanvas').length !== 0 && !$(e.target).hasClass('close')))
        	{
            	return;
        	}

    		this.enableBodyScroll();
    		this.callback('close');

            this.pull();
    		this.$target.removeClass('open').animation(this.opts.animation.close, $.proxy(this.closed, this));
    	},
    	pull: function()
    	{
            if (this.opts.push)
            {
                $('body').animate({ left: 0 }, this.opts.animation.close.duration * 1000, function()
                {
                    $(this).removeClass('offcanvas-push-body');
                });
            }
    	},
    	closed: function()
    	{
    		if (this.isMobileScreen())
    		{
    			$('html').removeClass('no-scroll');
    		}

            if (this.opts.onlymobile)
            {
                this.$target.addClass('hide-on-small').css('display', '');
            }

            this.$target.css('width', '').removeClass('offcanvas offcanvas-' + this.opts.direction);
            this.$close.off('.component.offcanvas');
    		$(document).off('.component.offcanvas');
    		this.callback('closed');
    	},
        isClosed: function()
        {
            return !this.$target.hasClass('open');
        },
        isOpened: function()
        {
            return this.$target.hasClass('open');
        }

    });

}(Kube));
(function(Kube)
{
    Kube.Sticky = SuperKube.plugin('sticky', {

        classname: 'sticky',
        opts: {
    		offset: 0, // int
    		callbacks: ['fixed', 'unfixed']
        },
    	init: function()
    	{
        	Kube.apply(this, arguments);

    	    this.offsetTop = this.getOffsetTop();

    	    this.fixing();
    	    $(window).scroll($.proxy(this.fixing, this));
    	},
    	getOffsetTop: function()
    	{
        	return this.$element.offset().top;
    	},
    	fixing: function()
    	{
    		if (this.isMobileScreen())
    		{
    			return this.unfixed();
    		}

    		return (this.isFixingNeeded()) ? this.fixed() : this.unfixed();
    	},
    	isFixingNeeded: function()
    	{
            return ($(window).scrollTop() > (this.offsetTop + this.opts.offset));
    	},
    	fixed: function()
    	{
    		this.$element.addClass('fixed');
    		this.callback('fixed');
    	},
    	unfixed: function()
    	{
    		this.$element.removeClass('fixed');
    		this.callback('unfixed');
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Tabs = SuperKube.plugin('tabs', {

        opts: {
    		equals: false,
    		active: false, // string (hash = tab id selector)
    		live: false, // class selector
    		hash: true, //boolean
    		callbacks: ['init', 'next', 'prev', 'open', 'opened', 'close', 'closed']
        },
    	init: function()
    	{
        	Kube.apply(this, arguments);

            if (this.opts.live !== false)
            {
    			this.buildLiveTabs();
    		}

            this.tabsCollection = [];
            this.hashesCollection = [];
            this.currentHash = [];
            this.currentItem = false;

            // items
            this.$items = this.getItems();
            this.$items.each($.proxy(this.loadItems, this));

            // tabs
    		this.$tabs = this.getTabs();

            // location hash
    		this.currentHash = this.getLocationHash();

    		// close all
    		this.closeAll();

            // active & height
    		this.setActiveItem();
    		this.setItemHeight();

            // callback
    		this.callback('init');

    	},
    	getTabs: function()
    	{
        	return $(this.tabsCollection).map(function()
        	{
            	return this.toArray();
            });
    	},
    	getItems: function()
    	{
    		return this.$element.find('a');
    	},
    	loadItems: function(i, el)
    	{
    		var item = this.getItem(el);

    		// set item identificator
    		item.$el.attr('rel', item.hash);

    		// collect item
            this.collectItem(item);

            // active
    		if (item.$parent.hasClass('active'))
    		{
    			this.currentItem = item;
    			this.opts.active = item.hash;
    		}

    		// event
    		item.$el.on('click.component.tabs', $.proxy(this.open, this));

    	},
    	collectItem: function(item)
    	{
    		this.tabsCollection.push(item.$tab);
    		this.hashesCollection.push(item.hash);
    	},
    	buildLiveTabs: function()
    	{
    		var $layers = $(this.opts.live);

    		if ($layers.length === 0)
    		{
    			return;
    		}

    		this.$liveTabsList = $('<ul />');
    		$layers.each($.proxy(this.buildLiveItem, this));

    		this.$element.html('').append(this.$liveTabsList);

    	},
    	buildLiveItem: function(i, tab)
    	{
    		var $tab = $(tab);
    		var $li = $('<li />');
    		var $a = $('<a />');
    		var index = i + 1;

    		$tab.attr('id', this.getLiveItemId($tab, index));

    		var hash = '#' + $tab.attr('id');
    		var title = this.getLiveItemTitle($tab);

    		$a.attr('href', hash).attr('rel', hash).text(title);
    		$li.append($a);

    		this.$liveTabsList.append($li);
    	},
    	getLiveItemId: function($tab, index)
    	{
        	return (typeof $tab.attr('id') === 'undefined') ? this.opts.live.replace('.', '') + index : $tab.attr('id');
    	},
    	getLiveItemTitle: function($tab)
    	{
        	return (typeof $tab.attr('data-title') === 'undefined') ? $tab.attr('id') : $tab.attr('data-title');
    	},
    	setActiveItem: function()
    	{
    		if (this.currentHash)
    		{
    			this.currentItem = this.getItemBy(this.currentHash);
    			this.opts.active = this.currentHash;
    		}
    		else if (this.opts.active === false)
    		{
    			this.currentItem = this.getItem(this.$items.first());
    			this.opts.active = this.currentItem.hash;
    		}

    		this.addActive(this.currentItem);
    	},
    	addActive: function(item)
    	{
    		item.$parent.addClass('active');
    		item.$tab.removeClass('hide').show().addClass('open');

    		this.currentItem = item;
    	},
    	removeActive: function(item)
    	{
    		item.$parent.removeClass('active');
    		item.$tab.hide().removeClass('open');

    		this.currentItem = false;
    	},
    	next: function(e)
    	{
    		if (e)
    		{
    			e.preventDefault();
    		}

    		var item = this.getItem(this.fetchElement('next'));

    		this.open(item.hash);
    		this.callback('next', item);

    	},
    	prev: function(e)
    	{
    		if (e)
    		{
    			e.preventDefault();
    		}

    		var item = this.getItem(this.fetchElement('prev'));

    		this.open(item.hash);
    		this.callback('prev', item);
    	},
    	fetchElement: function(type)
    	{
            var element;
    		if (this.currentItem !== false)
    		{
    			// prev or next
    			element = this.currentItem.$parent[type]().find('a');

    			if (element.length === 0)
    			{
    				return;
    			}
    		}
    		else
    		{
    			// first
    			element = this.$items[0];
    		}

    		return element;
    	},
    	open: function(e, push)
    	{
        	if (typeof e === 'undefined')
        	{
            	return;
        	}

    		if (typeof e === 'object')
    		{
    			e.preventDefault();
            }

    		var item = (typeof e === 'object') ? this.getItem(e.target) : this.getItemBy(e);
    		this.closeAll();

    		this.callback('open', item);
    		this.addActive(item);

    		// push state (doesn't need to push at the start)
            this.pushStateOpen(push, item);
    		this.callback('opened', item);
    	},
    	pushStateOpen: function(push, item)
    	{
    		if (push !== false && this.opts.hash !== false)
    		{
    			history.pushState(false, false, item.hash);
    		}
    	},
    	close: function(num)
    	{
    		var item = this.getItemBy(num);

    		if (!item.$parent.hasClass('active'))
    		{
    			return;
    		}

    		this.callback('close', item);
    		this.removeActive(item);
    		this.pushStateClose();
    		this.callback('closed', item);

    	},
    	pushStateClose: function()
    	{
            if (this.opts.hash !== false)
            {
    			history.pushState(false, false, ' ');
    		}
    	},
    	closeAll: function()
    	{
    		this.$tabs.removeClass('open').hide();
    		this.$items.parent().removeClass('active');
    	},
    	getItem: function(element)
    	{
    		var item = {};

    		item.$el = $(element);
    		item.hash = item.$el.attr('href');
    		item.$parent = item.$el.parent();
    		item.$tab = $(item.hash);

    		return item;
    	},
    	getItemBy: function(num)
    	{
    		var element = (typeof num === 'number') ? this.$items.eq(num-1) : this.$element.find('[rel="' + num + '"]');

    		return this.getItem(element);
    	},
    	getLocationHash: function()
    	{
    		if (this.opts.hash === false)
    		{
    			return false;
    		}

    		return (this.isHash()) ? top.location.hash : false;
    	},
    	isHash: function()
    	{
        	return !(top.location.hash === '' || $.inArray(top.location.hash, this.hashesCollection) === -1);
    	},
    	setItemHeight: function()
    	{
    		if (this.opts.equals)
    		{
    	    	var minHeight = this.getItemMaxHeight() + 'px';
        		this.$tabs.css('min-height', minHeight);
    		}
    	},
    	getItemMaxHeight: function()
    	{
    		var max = 0;
    		this.$tabs.each(function()
    		{
    			var h = $(this).height();
    			max = h > max ? h : max;
    		});

    		return max;
    	},
    	destroy: function()
    	{
    		this.$tabs.removeClass('open').show();
    		this.$items.off('.component.tabs').parent().removeClass('active');
        	this.$element.removeData();
    	}
    });

}(Kube));
(function(Kube)
{
    Kube.Toggleme = SuperKube.plugin('toggleme', {
        classname: 'toggleme',
        opts: {
            target: null, // selector or (next, parent+next, prev, parent+prev)
            text: '',
            animation: {
                open: {
                    name: 'slideDown',
                    duration: 0.5,
                    timing: 'cubic-bezier(0.175, 0.885, 0.320, 1.375)'
                },
                close: {
                    name: 'slideUp',
                    duration: 0.5,
                    timing: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)'
                }
            },
            callbacks: ['open', 'opened', 'close', 'closed']
        },
        init: function()
        {
            Kube.apply(this, arguments);

            if (this.opts.target === null)
            {
                return;
            }

            this.text = this.$element.text();
            this.$target = this.getTarget();
            this.$element.on('click.component.toggleme', $.proxy(this.toggle, this));
        },
        getTarget: function()
        {
    		switch (this.opts.target)
    		{
    			case "next":
    				return this.$element.next();

    			case "parent+next":
    				return this.$element.parent().next();

    			case "prev":
    				return this.$element.prev();

    			case "parent+prev":
    				return this.$element.parent().prev();

    			default:
    				return $(this.opts.target);
    		}
        },
        toggle: function(e)
        {
            if (e)
            {
                e.preventDefault();
            }

            return (this.isOpened()) ? this.close() : this.open();
        },
    	isOpened: function()
        {
            return this.$target.hasClass('open');
        },
        isClosed: function()
        {
            return !this.$target.hasClass('open');
        },
        open: function(e)
        {
            if (this.isOpened())
            {
    			return;
    		}

            this.callback('open');
            this.$target.removeClass('hide-on-small').animation(this.opts.animation.open, $.proxy(this.opened, this));

            // changes the text of $element with a less delay to smooth
    		setTimeout($.proxy(this.setOpenedText, this), this.opts.animation.open.duration * 500);
        },
        opened: function()
        {
            this.$target.addClass('open');
         	this.callback('opened');
        },
        setOpenedText: function()
        {
            if (this.opts.text !== '')
            {
                this.$element.text(this.opts.text);
            }
        },
        close: function(e)
        {
            if (this.isClosed())
            {
    			return;
    		}

            this.callback('close');
            this.$target.animation(this.opts.animation.close, $.proxy(this.closed, this));
        },
        closed: function()
        {
            this.$target.removeClass('open');
            this.setClosedText();
        	this.callback('closed');
        },
        setClosedText: function()
        {
            if (this.opts.text !== '')
            {
                this.$element.text(this.text);
            }
        },
    	destroy: function()
    	{
    		this.$target.hide().removeClass('open').removeData();
    		this.$element.off('.component.toggleme').removeData();
    	}
    });

}(Kube));