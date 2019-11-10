;(function(window, undefined)
{
    "use strict";

    function extend()
    {
        for(var i=1; i < arguments.length; i++)
        {
            for(var key in arguments[i])
            {
                if(arguments[i].hasOwnProperty(key))
                {
                    arguments[0][key] = arguments[i][key];
                }
            }
        }
        return arguments[0];
    }

    var pluginName = "tinyscrollbar"
    ,   defaults   =
        {
            axis           : 'y'           // vertical or horizontal scrollbar? ( x || y ).
        ,   wheel          : true          // enable or disable the mousewheel;
        ,   wheelSpeed     : 40            // how many pixels must the mouswheel scroll at a time.
        ,   wheelLock      : true          // return mouswheel to browser if there is no more content.
        ,   scrollInvert   : false         // Inverts the direction of scrolling
        ,   trackSize      : false         // set the size of the scrollbar to auto or a fixed number.
        ,   thumbSize      : false         // set the size of the thumb to auto or a fixed number.
        }
    ;

    function Plugin($container, options)
    {
        this.options   = extend({}, defaults, options);
        this._defaults = defaults;
        this._name     = pluginName;

        var self        = this
        ,   $body       = document.querySelectorAll("body")[0]
        ,   $viewport   = $container.querySelectorAll(".viewport")[0]
        ,   $overview   = $container.querySelectorAll(".overview")[0]
        ,   $scrollbar  = $container.querySelectorAll(".scrollbar")[0]
        ,   $track      = $scrollbar.querySelectorAll(".track")[0]
        ,   $thumb      = $scrollbar.querySelectorAll(".thumb")[0]

        ,   mousePosition  = 0
        ,   isHorizontal   = this.options.axis === 'x'
        ,   hasTouchEvents = "ontouchstart" in document.documentElement

        ,   sizeLabel = isHorizontal ? "width" : "height"
        ,   posiLabel = isHorizontal ? "left" : "top"
        ,   moveEvent = document.createEvent("HTMLEvents")
        ;

        moveEvent.initEvent("move", true, true);

        this.contentPosition = 0;
        this.viewportSize    = 0;
        this.contentSize     = 0;
        this.contentRatio    = 0;
        this.trackSize       = 0;
        this.trackRatio      = 0;
        this.thumbSize       = 0;
        this.thumbPosition   = 0;

        function initialize()
        {
            self.update();
            setEvents();

            return self;
        }

        this.update = function(scrollTo)
        {
            var sizeLabelCap  = sizeLabel.charAt(0).toUpperCase() + sizeLabel.slice(1).toLowerCase();
            this.viewportSize = $viewport['offset'+ sizeLabelCap];
            this.contentSize  = $overview['scroll'+ sizeLabelCap];
            this.contentRatio = this.viewportSize / this.contentSize;
            this.trackSize    = this.options.trackSize || this.viewportSize;
            this.thumbSize    = Math.min(this.trackSize, Math.max(0, (this.options.thumbSize || (this.trackSize * this.contentRatio))));
            this.trackRatio   = this.options.thumbSize ? (this.contentSize - this.viewportSize) / (this.trackSize - this.thumbSize) : (this.contentSize / this.trackSize);

            var scrcls = $scrollbar.className;
            $scrollbar.className = this.contentRatio >= 1 ? scrcls + " disable" : scrcls.replace(" disable", "");

            switch (scrollTo)
            {
                case "bottom":
                    this.contentPosition = this.contentSize - this.viewportSize;
                    break;

                case "relative":
                    this.contentPosition = Math.min(this.contentSize - this.viewportSize, Math.max(0, this.contentPosition));
                    break;

                default:
                    this.contentPosition = parseInt(scrollTo, 10) || 0;
            }

            setSize();
        };

        function setSize()
        {
            $thumb.style[posiLabel] = self.contentPosition / self.trackRatio + "px";
            $overview.style[posiLabel] = -self.contentPosition + "px";
            $scrollbar.style[sizeLabel] = self.trackSize + "px";
            $track.style[sizeLabel] = self.trackSize + "px";
            $thumb.style[sizeLabel] = self.thumbSize + "px";
        }

        function setEvents()
        {
            if(hasTouchEvents)
            {
                $viewport.ontouchstart = function(event)
                {
                    if(1 === event.touches.length)
                    {
                        start(event.touches[0]);
                        event.stopPropagation();
                    }
                };
            }
            else
            {
                $thumb.onmousedown = start;
                $track.onmousedown = drag;
            }

            if(self.options.wheel && window.addEventListener)
            {
                $container.addEventListener("DOMMouseScroll", wheel, false );
                $container.addEventListener("mousewheel", wheel, false );
            }
            else if(self.options.wheel)
            {
                $container.onmousewheel = wheel;
            }
        }

        function start(event)
        {
            $body.className   += " noSelect";
            mousePosition      = isHorizontal ? event.pageX : event.pageY;
            self.thumbPosition = parseInt($thumb.style[posiLabel], 10) || 0;

            if(hasTouchEvents)
            {
                document.ontouchmove = function(event)
                {
                    event.preventDefault();
                    drag(event.touches[0]);
                };
                document.ontouchend = end;
            }
            else
            {
                document.onmousemove = drag;
                document.onmouseup = $thumb.onmouseup = end;
            }
        }

        function wheel(event)
        {
            if(self.contentRatio < 1)
            {
                var eventObject     = event || window.event
                ,   wheelSpeedDelta = eventObject.wheelDelta ? eventObject.wheelDelta / 120 : -eventObject.detail / 3
                ;

                self.contentPosition -= wheelSpeedDelta * self.options.wheelSpeed;
                self.contentPosition = Math.min((self.contentSize - self.viewportSize), Math.max(0, self.contentPosition));

                $container.dispatchEvent(moveEvent);

                $thumb.style[posiLabel]    = self.contentPosition / self.trackRatio + "px";
                $overview.style[posiLabel] = -self.contentPosition + "px";

                if(self.options.wheelLock || (self.contentPosition !== (self.contentSize - self.viewportSize) && self.contentPosition !== 0))
                {
                    eventObject.preventDefault();
                }
            }
        }

        function drag(event)
        {
            if(self.contentRatio < 1)
            {
                var mousePositionNew   = isHorizontal ? event.pageX : event.pageY
                ,   thumbPositionDelta = mousePositionNew - mousePosition
                ;

                if(self.options.scrollInvert && hasTouchEvents)
                {
                    thumbPositionDelta = mousePosition - mousePositionNew;
                }

                var thumbPositionNew = Math.min((self.trackSize - self.thumbSize), Math.max(0, self.thumbPosition + thumbPositionDelta));
                self.contentPosition = thumbPositionNew * self.trackRatio;

                $container.dispatchEvent(moveEvent);

                $thumb.style[posiLabel] = thumbPositionNew + "px";
                $overview.style[posiLabel] = -self.contentPosition + "px";
            }
        }

        function end()
        {
            $body.className = $body.className.replace(" noSelect", "");
            document.onmousemove = document.onmouseup = null;
            $thumb.onmouseup = null;
            document.ontouchmove = document.ontouchend = null;
        }

        return initialize();
    }

    var tinyscrollbar = function($container, options)
    {
        return new Plugin($container, options);
    };

    if(typeof define == 'function' && define.amd)
    {
        define(function(){ return tinyscrollbar; });
    }
    else if(typeof module === 'object' && module.exports)
    {
        module.exports = tinyscrollbar;
    }
    else
    {
        window.tinyscrollbar = tinyscrollbar;
    }
})(window);
