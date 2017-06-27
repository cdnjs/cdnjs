/**
 * jQuery.marquee - scrolling text horizontally
 * Date: 20/02/2013
 * @author Aamir Afridi - aamirafridi(at)gmail(dot)com | http://aamirafridi.com/jquery/jquery-marquee-plugin
 */

;(function ($) {
    $.fn.marquee = function (options) {
        return this.each(function () {
            // Extend the options if any provided
            var o = $.extend({}, $.fn.marquee.defaults, options),
                $this = $(this),
                $marqueeWrapper,
                containerWidth,
                animationCss,
                verticalDir,
                elWidth,
                playState = 'animation-play-state',
                css3AnimationIsSupported = false;

            //For details https://twitter.com/aamirafridi/status/403848044069679104 - Can't find a better solution :/
            if (typeof $this.data().delaybeforestart !== 'undefined') {
                $this.data().delayBeforeStart = $this.data().delaybeforestart;
                delete $this.data().delaybeforestart;
            }
            if (typeof $this.data().pauseonhover !== 'undefined') {
                $this.data().pauseOnHover = $this.data().pauseonhover;
                delete $this.data().pauseonhover;
            }
            if (typeof $this.data().pauseoncycle !== 'undefined') {
                $this.data().pauseOnCycle = $this.data().pauseoncycle;
                delete $this.data().pauseoncycle;
            }
            if (typeof $this.data().allowcss3support !== 'undefined') {
                $this.data().allowCss3Support = $this.data().allowcss3support;
                delete $this.data().allowcss3support;
            }

            //check if element has data attributes. They have top priority
            o = $.extend({}, o, $this.data());

            //since speed option is changed to duration, to still support speed for those who are already using it
            o.duration = o.speed || o.duration;

            //Shortcut to see if direction is upward or downward
            verticalDir = o.direction == 'up' || o.direction == 'down';

            //no gap if not duplicated
            o.gap = o.duplicated ? o.gap : 0;

            //wrap inner content into a div
            $this.wrapInner('<div class="js-marquee"></div>');

            //Make copy of the element
            var $el = $this.find('.js-marquee').css({
                'margin-right': o.gap,
                'float': 'left'
            });

            if (o.duplicated) {
                $el.clone().appendTo($this);
            }

            //wrap both inner elements into one div
            $this.wrapInner('<div style="width:100000px" class="js-marquee-wrapper"></div>');

            //Save the reference of the wrapper
            $marqueeWrapper = $this.find('.js-marquee-wrapper');

            //If direction is up or down, get the height of main element
            if (verticalDir) {
                var containerHeight = $this.height();
                $marqueeWrapper.removeAttr('style');
                $this.height(containerHeight);

                //Change the CSS for js-marquee element
                $this.find('.js-marquee').css({
                    'float': 'none',
                    'margin-bottom': o.gap,
                    'margin-right': 0
                });

                //Remove bottom margin from 2nd element if duplicated
                if (o.duplicated) $this.find('.js-marquee:last').css({
                    'margin-bottom': 0
                });

                var elHeight = $this.find('.js-marquee:first').height() + o.gap;

                /* adjust the animation speed according to the text length
		   formula is to: (Height of the text node / Height of the main container) * speed; */
                o.duration = ((parseInt(elHeight, 10) + parseInt(containerHeight, 10)) / parseInt(containerHeight, 10)) * o.duration;

            } else {
                //Save the width of the each element so we can use it in animation
                elWidth = $this.find('.js-marquee:first').width() + o.gap;

                //container width
                containerWidth = $this.width();

                /* adjust the animation speed according to the text length
		   formula is to: (Width of the text node / Width of the main container) * speed; */
                o.duration = ((parseInt(elWidth, 10) + parseInt(containerWidth, 10)) / parseInt(containerWidth, 10)) * o.duration;
            }

            //if duplicated than reduce the speed
            if (o.duplicated) {
                o.duration = o.duration / 2;
            }

            function objToString (obj) {
                var tabjson=[];
                for (var p in obj) {
                    if (obj.hasOwnProperty(p)) {
                        tabjson.push(p + ':' + obj[p]);
                    }
                } 
                tabjson.push()
                return '{'+tabjson.join(',')+'}';
            }

            function pause() {
                //pause using css3
                if(css3AnimationIsSupported && o.allowCss3Support) {
                    return $marqueeWrapper.css(playState, 'paused');
                }

                //pause using pause plugin
                if ($.fn.pause) {
                    $marqueeWrapper.pause();
                    //fire event
                    $this.trigger('paused');
                }
            }

            function resume() {
                //resume using css3
                if(css3AnimationIsSupported && o.allowCss3Support) {
                    return $marqueeWrapper.css(playState, 'running');
                }

                //resume using pause plugin
                if ($.fn.resume) {
                    $marqueeWrapper.resume();
                    //fire event
                    $this.trigger('resumed');
                }
            }

            if(o.allowCss3Support) {
                    var
                        elm = document.createElement('div'),
                        animationCssStr = 'animation',
                        animationName = 'marqueeAnimation-' + Math.floor(Math.random()*10000000),
                        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
                        animationString = '',
                        animationCss3Str = '',
                        $styles = $('style'),
                        keyframeString = '';
                    
                //Check css3 support
                if( elm.style.animationCssStr ) { css3AnimationIsSupported = true; }

                if( css3AnimationIsSupported === false ) {
                    for( var i = 0; i < domPrefixes.length; i++ ) {
                        if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                            var prefix = '-' + domPrefixes[ i ].toLowerCase() + '-';
                            animationString = prefix + 'animation';
                            playState = prefix + playState;
                            keyframeString = '@'+prefix+'keyframes ' + animationName + ' ';
                            css3AnimationIsSupported = true;
                            break;
                        }
                    }
                }
            
                if(css3AnimationIsSupported) {
                    animationCss3Str = animationName + ' ' + o.duration/1000 + 's ' + o.delayBeforeStart/1000 + 's infinite ' + o.css3easing;
                    console.log('animationCss3Str',animationCss3Str)
                }
            }
                //Animate recursive method
            var animate = function () {
                if (verticalDir) {
                    if (o.duplicated) {
                        $marqueeWrapper.css('margin-top', o.direction == 'up' ? 0 : '-' + elHeight + 'px');
                        animationCss = {
                            'margin-top': o.direction == 'up' ? '-' + elHeight + 'px' : 0
                        }
                    } else {
                        $marqueeWrapper.css('margin-top', o.direction == 'up' ? containerHeight + 'px' : '-' + elHeight + 'px');
                        animationCss = {
                            'margin-top': o.direction == 'up' ? '-' + ($marqueeWrapper.height()) + 'px' : containerHeight + 'px'
                        };
                    }
                } else {
                    if (o.duplicated) {
                        $marqueeWrapper.css('margin-left', o.direction == 'left' ? 0 : '-' + elWidth + 'px');
                        animationCss = {
                            'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : 0
                        };
                    } else {
                        $marqueeWrapper.css('margin-left', o.direction == 'left' ? containerWidth + 'px' : '-' + elWidth + 'px');
                        animationCss = {
                            'margin-left': o.direction == 'left' ? '-' + elWidth + 'px' : containerWidth + 'px'
                        };
                    }
                }

                //fire event
                $this.trigger('beforeStarting');
          
                //If css3 support is available than do it with css3, otherwise use jQuery as fallback
                if(css3AnimationIsSupported) {
                    //Add css3 animation to the element
                    $marqueeWrapper.css(animationString, animationCss3Str);
                    var keyframeCss = keyframeString + ' { 100%  '+ objToString(animationCss) +'}';
                    
                    //Now add the keyframe animation to the head
                    if($styles.length!=0) {
                        $styles.last().append(keyframeCss)
                    }
                    else {
                        $('head').append('<style>' + keyframeCss + '</style>');
                    }
                }
                else {
                    //Start animating
                    $marqueeWrapper.animate(animationCss, o.duration, o.easing, function () {
                        //fire event
                        $this.trigger('finished');
                        //animate again
                        if (o.pauseOnCycle) {
                            setTimeout(animate, o.delayBeforeStart);
                        } else {
                            animate();
                        }
                    });
                }
            };

            //bind pause and resume events
            $this.bind('pause', pause);
            $this.bind('resume', resume);

            if (o.pauseOnHover) {
                $this.hover(pause, resume);
            }

            //If css3 animation is supported than call animate method at once
            if(css3AnimationIsSupported && o.allowCss3Support) {
                animate();
            }
            else {
                //Starts the recursive method
                setTimeout(animate, o.delayBeforeStart);
            }

        });
    }; //End of Plugin

    // Public: plugin defaults options
    $.fn.marquee.defaults = {
        //If you wish to always animate using jQuery
        allowCss3Support: true,
        //works when allowCss3Support is set to true - for full list see http://www.w3.org/TR/2013/WD-css3-transitions-20131119/#transition-timing-function
        css3easing: 'linear',
        //requires jQuery easing plugin. Default is 'linear'
        easing: 'linear',
        //pause time before the next animation turn in milliseconds
        delayBeforeStart: 0,
        //'left', 'right', 'up' or 'down'
        direction: 'left',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: false,
        //speed in milliseconds of the marquee in milliseconds
        duration: 5000,
        //gap in pixels between the tickers
        gap: 20,
        //on cycle pause the marquee
        pauseOnCycle: false,
        //on hover pause the marquee - using jQuery plugin https://github.com/tobia/Pause
        pauseOnHover: false
    };
})(jQuery);
