/*
 *  jQuery Custombox v1.1.2 - 2013/12/10
 *  jQuery Modal Window Effects.
 *  http://dixso.github.io/custombox/
 *  (c) 2013 Julio De La Calle - http://dixso.net - @dixso9
 *
 *  Under MIT License - http://www.opensource.org/licenses/mit-license.php
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {
    "use strict";
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once.
    var cb = 'custombox',
        defaults = {
            url:            null,           // Set the URL, ID or Class.
            cache:          false,          // If set to false, it will force requested pages not to be cached by the browser only when send by AJAX.
            escKey:         true,           // Allows the user to close the modal by pressing 'ESC'.
            eClose:         null,           // Element ID or Class for to be close the modal.
            zIndex:         9999,           // Overlay z-index: Number or auto.
            overlay:        true,           // Show the overlay.
            overlayColor:   '#000',         // Overlay color.
            overlayOpacity: 0.8,            // The overlay opacity level. Range: 0 to 1.
            overlayClose:   true,           // Allows the user to close the modal by clicking the overlay.
            overlaySpeed:   200,            // Sets the speed of the overlay, in milliseconds.
            customClass:    null,           // Custom class to modal.
            width:          null,           // Set a fixed total width.
            height:         null,           // Set a fixed total height.
            effect:         'fadein',       // fadein | slide | newspaper | fall | sidefall | blur | flip | sign | superscaled | slit | rotate | letmein | makeway | slip | blur.
            position:       null,           // Only with effects: slide, flip and rotate. (top, right, bottom, left and center) | (vertical or horizontal) and output position sseparated by commas. Ex: 'top, bottom'.
            speed:          600,            // Sets the speed of the transitions, in milliseconds.
            open:           null,           // Callback that fires right before begins to open.
            complete:       null,           // Callback that fires right after loaded content is displayed.
            close:          null,           // Callback that fires once is closed.
            responsive:     true,           // Sets if you like box responsive or not.
            scrollbar:      false,          // Show scrollbar or hide automatically.
            error:          'Error 404!'    // Text to be displayed when an error.
        };

    // The plugin constructor.
    function Plugin ( element, options ) {

        this.element = element;

        // Get the max zIndex.
        if ( typeof this.element === 'object' && typeof options === 'object' && isNaN( options.zIndex ) && options.zIndex === 'auto' ) {
            options.zIndex = ( this._isIE() ? defaults.zIndex : this._zIndex() );
        }

        // Merge objects.
        this.settings = this._extend( {}, defaults, options );

        if ( typeof this.element === 'object' ) {
            // Private method.
            this._box.init( this );
        } else {
            // Public method.
            this[this.element]();
        }

    }

    Plugin.prototype = {
        /*
         ----------------------------
         Private methods
         ----------------------------
         */
        _overlay: function() {
            var rgba = this._hexToRgb(this.settings.overlayColor),
                styles = {};
            // Only IE 8
            if ( navigator.appVersion.indexOf('MSIE 8.') != -1 ) {
                styles.backgroundColor = this.settings.overlayColor;
                styles.zIndex =  parseFloat(this.settings.zIndex) + 1;
                styles.filter = 'alpha(opacity=' + this.settings.overlayOpacity * 100 + ')';
            } else {
                styles['background-color'] = 'rgba(' + rgba.r + ',' + rgba.g + ', ' + rgba.b + ',' + this.settings.overlayOpacity + ')';
                styles['z-index'] =  parseFloat(this.settings.zIndex) + 1;
                styles['transition'] = 'all ' + this.settings.overlaySpeed / 1000 + 's';
            }

            document.getElementsByTagName('body')[0].appendChild(this._create({
                id:     'overlay',
                eClass: 'overlay'
            }, styles));
        },
        _box: {
            init: function ( obj ) {
                // Check if callback 'open'.
                if ( obj.settings.open && typeof obj.settings.open === 'function' ) {
                    obj.settings.open( undefined !== arguments[0] ? arguments[0] : '' );
                }

                // Check 'href'.
                if ( obj.settings.url === null ) {
                    if ( obj.element !== null ) {
                        obj.settings.url = obj.element.getAttribute('href');
                    }
                }

                if ( typeof obj.settings.url === 'string' ) {
                    if ( obj.settings.url.charAt(0) === '#' || obj.settings.url.charAt(0) === '.' ) {
                        // Inline.
                        if ( document.querySelector(obj.settings.url) ) {
                            obj._box.build( obj, document.querySelector(obj.settings.url).cloneNode(true) );
                        } else {
                            obj._box.build( obj, null );
                        }
                    } else {
                        // Ajax.
                        this.ajax( obj );
                    }
                } else {
                    obj._box.build( obj, null );
                }
            },
            create: function ( obj ) {
                var styles = {};

                if ( obj._isIE() ) {
                    styles.zIndex =  parseFloat(obj.settings.zIndex) + 2;
                } else {
                    styles['z-index'] =  parseFloat(obj.settings.zIndex) + 2;
                }

                var modal = obj._create({
                        id:                     'modal',
                        eClass:                 'modal ' + obj._box.effect( obj ) + ( obj.settings.customClass ? ' ' + obj.settings.customClass : '' )
                    }, styles),
                    content = obj._create({
                        id:                     'modal-content',
                        eClass:                 'modal-content'
                    }, {
                        'transition-duration':  obj.settings.speed + 'ms'
                    });

                // Insert modal to the content.
                modal.appendChild(content);

                // Insert modal just after the body.
                document.body.insertBefore(modal, document.body.firstChild);

                // Create overlay after the modal content.
                if ( obj.settings.overlay ) {
                    obj._overlay();
                }

                return [modal, content];
            },
            effect: function ( obj ) {
                var position = ['slide','flip','rotate'],
                    perspective = ['letmein','makeway','slip','blur'],
                    effect = cb + '-' + obj.settings.effect,
                    effectClose = '';

                // Check if is array.
                if ( obj.settings.position !== null && obj.settings.position.indexOf(',') !== -1 ) {
                    // Convert the string to array.
                    obj.settings.position = obj.settings.position.split(',');
                    if( obj.settings.position.length > 1 ) {
                        effectClose = ' ' + cb + '-' + obj.settings.effect + '-' + obj.settings.position[0].replace(/^\s+|\s+$/g, '') + '-' + obj.settings.position[1].replace(/^\s+|\s+$/g, '');
                    }
                }

                // Position.
                for ( var i = 0, len1 = position.length; i < len1; i++ ) {
                    if ( position[i] === obj.settings.effect ) {
                        effect = cb + '-' + obj.settings.effect + '-' + ( effectClose !== '' ? obj.settings.position[0] : obj.settings.position ) + effectClose;
                    }
                }

                // HTML head.
                for ( var x = 0, len2 = perspective.length; x < len2; x++ ) {
                    if ( perspective[x] === obj.settings.effect ) {

                        if ( obj.settings.effect !== 'blur' ) {
                            // Add class.
                            obj._addClass( document.getElementsByTagName( 'html' )[0], 'perspective' );
                        }

                        var div = document.createElement('div');
                            div.className = cb + '-container';

                        // Move the body's children into this wrapper
                        while ( document.body.firstChild ) {
                            div.appendChild(document.body.firstChild);
                        }

                        // Append the wrapper to the body
                        document.body.appendChild(div);
                    }
                }

                return effect;

            },
            build: function ( obj, modal ) {
                var body = document.body,
                    html = document.documentElement,
                    top = ( html && html.scrollTop  || body && body.scrollTop  || 0 );

                if ( obj.settings.error !== false && typeof obj.settings.error === 'string' ) {
                    // If is null, show message error.
                    if ( modal === null ) {
                        modal = document.createElement('div');
                        obj._addClass( modal, 'error' );
                        modal.innerHTML = obj.settings.error;
                    }

                    // [0] => modal
                    // [1] => content
                    var tmp = obj._box.create( obj );

                    // Insert content to the modal.
                    tmp[1].appendChild(modal);

                    // Show the content.
                    modal.style.display = 'block';

                    // Set scroll.
                    tmp[0].setAttribute('data-' + cb + '-scroll', top);

                    // Temporal sizes.
                    var tmpSize = {
                        width:  parseInt(obj.settings.width, 0),
                        height: parseInt(obj.settings.height, 0)
                    };

                    // Check width: If it is a number and if not null.
                    if ( !isNaN( tmpSize.width ) && tmpSize.width === obj.settings.width && tmpSize.width.toString() === obj.settings.width.toString() && tmpSize.width !== null ) {
                        modal.style.width = tmpSize.width + 'px';
                    }

                    // Check height: If it is a number   and if not null.
                    if ( !isNaN( tmpSize.height ) && tmpSize.height === obj.settings.height && tmpSize.height.toString() === obj.settings.height.toString() && tmpSize.height !== null ) {
                        modal.style.height = tmpSize.height + 'px';
                    }

                    var offw = modal.offsetWidth,
                        position = {
                            'margin-left':  - offw / 2 + 'px',
                            'width':        offw + 'px'
                        };

                    // IE8 not supported: translateY(-50%).
                    if ( obj._isIE() ) {
                        var offh = modal.offsetHeight;
                        position['margin-top'] = - offh / 2 + 'px';
                        position['height'] = offh + 'px';
                    }

                    // If position top?
                    if ( obj.settings.position !== null && obj.settings.position.indexOf('top') !== -1 ) {
                        position['transform'] = 'none';
                    }

                    // Center modal.
                    obj._create( {}, position, tmp[0] );

                    // Check if scrollbar is visible.
                    var wsize = {
                        width:  'innerWidth' in window ? window.innerWidth : document.documentElement.offsetWidth,
                        height: 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
                    };

                    if ( !obj.settings.scrollbar ) {
                        if ( modal.offsetHeight < wsize.height && body.offsetHeight > wsize.height ) {

                            var outer = obj._create({},{
                                visibility: 'hidden',
                                width:      '100px'
                            });

                            // Append outer.
                            body.appendChild(outer);

                            // Save the width without scrollbar.
                            var widthNoScroll = outer.offsetWidth;

                            // Force scrollbars
                            outer.style.overflow = 'scroll';

                            // Add inner div.
                            var inner = obj._create({},{
                                width: '100%'
                            });

                            // Append inner.
                            outer.appendChild(inner);

                            // Save the width with scrollbar.
                            var widthWithScroll = inner.offsetWidth;

                            // Remove divs
                            outer.parentNode.removeChild(outer);

                            // Hide scrollbar.
                            body.style.marginRight = widthNoScroll - widthWithScroll + 'px';
                            obj._addClass( document.getElementsByTagName( 'html' )[0], 'hide-scrollbar' );
                        } else {
                            obj._scrollbar(tmp[0]);
                        }
                    } else {
                        obj._scrollbar(tmp[0]);
                    }

                    // Launch responsive.
                    if ( obj.settings.responsive ) {
                        obj._box.responsive(obj, tmp, modal, wsize);
                    }

                    // Show modal.
                    setTimeout( function () {

                        // Init listeners.
                        obj._listeners( top );

                        // Show modal.
                        tmp[0].className += ' ' + cb + '-show';

                        var script = tmp[1].getElementsByTagName('script');

                        // Execute the scripts.
                        for ( var i = 0, len = script.length; i < len; i++ ) {
                            new Function( script[i].text )();
                        }

                        if ( window.attachEvent ) {
                            setTimeout( function () {
                                // Check if callback 'complete'.
                                if ( obj.settings.complete && typeof obj.settings.complete === 'function' ) {
                                    obj.settings.complete( undefined !== arguments[0] ? arguments[0] : '' );
                                }
                            }, obj.settings.speed );
                        } else {
                            var stop = true;
                            tmp[0].addEventListener(obj._crossBrowser(), function () {
                                if ( stop ) {
                                    stop = false;
                                    // Check if callback 'complete'.
                                    if ( obj.settings.complete && typeof obj.settings.complete === 'function' ) {
                                        obj.settings.complete( undefined !== arguments[0] ? arguments[0] : '' );
                                    }
                                }
                            }, false);
                        }

                    }, ( obj.settings.overlay ? obj.settings.overlaySpeed : 200 ) );

                }
            },
            responsive: function ( obj, tmp, modal, wsize ) {
                // Store width.
                modal.setAttribute('data-' + cb + '-width', modal.offsetWidth);

                // Prepare responsive.
                obj._create( {}, {
                    width: 'auto'
                }, modal );

                // The first time.
                if ( wsize.width < modal.offsetWidth ) {
                    obj._create( {}, {
                        width:          wsize.width - 40 + 'px',
                        'margin-left':  '20px',
                        'margin-right': '20px',
                        'left':         0
                    }, tmp[0] );
                }

                var supportsOrientationChange = 'onorientationchange' in window,
                    orientationEvent = supportsOrientationChange ? 'orientationchange' : 'resize';

                if ( window.attachEvent ) {
                    window.attachEvent(orientationEvent, function () {
                        modalResize(this);
                    }, false);
                } else {
                    window.addEventListener(orientationEvent, function () {
                        modalResize(this);
                    }, false);
                }

                var modalResize = function ( e ) {
                    if ( typeof window.orientation === 'undefined' ) {
                        if  ( modal.getAttribute('data-' + cb + '-width') !== null ) {
                            var wm = modal.getAttribute('data-' + cb + '-width');

                            if ( wm > e.innerWidth ) {
                                obj._create( {}, {
                                    width:          e.innerWidth - 40 + 'px',
                                    'margin-left':  '20px',
                                    'margin-right': '20px',
                                    left:           0
                                }, tmp[0] );
                            } else {
                                obj._create( {}, {
                                    width:          wm + 'px',
                                    'margin-left':  - wm / 2 + 'px',
                                    'left':         '50%'
                                }, tmp[0] );
                            }
                        }
                    } else {
                        obj._create( null, {
                            width:          e.innerWidth - 40 + 'px',
                            'margin-left':  '20px',
                            'margin-right': '20px',
                            left:           0
                        }, tmp[0] );
                    }
                };
            },
            ajax: function ( obj ) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    var completed = 4;
                    if( xhr.readyState === completed ) {
                        if( xhr.status === 200 ) {

                            var modal = document.createElement('div');
                            modal.innerHTML = xhr.responseText;

                            obj._box.build( obj, modal );

                        } else {
                            obj._box.build( obj, null );
                        }
                    }
                };
                xhr.open('GET', obj.settings.url + ( !obj.settings.cache ? '?_=' + new Date().getTime() : '' ), true);
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send(null);
            }
        },
        _close: function () {
            var obj = this;

            // Clean custombox.
            setTimeout(function () {
                // Remove classes.
                obj._removeClass( document.getElementsByTagName( 'html' )[0], cb + '-hide-scrollbar' );

                // Reset properties scrollbar.
                document.getElementsByTagName( 'body' )[0].style.marginRight = 0;

                // Remove modal.
                var modal = ( obj._isIE() ? document.querySelectorAll('.' + cb + '-modal')[0] : document.getElementsByClassName(cb + '-modal')[0] );
                obj._remove( modal );

                // Remove overlay.
                if ( obj.settings.overlay ) {
                    obj._remove( ( obj._isIE() ? document.querySelectorAll('.' + cb + '-overlay')[0] : document.getElementsByClassName(cb + '-overlay')[0] ) );
                }

                // Check if callback 'close'.
                if ( obj.settings.close && typeof obj.settings.close === 'function' ) {
                    obj.settings.close( undefined !== arguments[0] ? arguments[0] : '' );
                } else if ( typeof modal !== 'undefined' && modal.getAttribute('data-' + cb) !== null ) {
                    // Check if callback 'close' when the method is public.
                    var onClose = modal.getAttribute('data-' + cb),
                        onCloseLaunch = new Function ( 'onClose', 'return ' + onClose )(onClose);
                    onCloseLaunch();
                }

                // Go to te last position scroll.
                window.top.scroll( 0, modal.getAttribute('data-' + cb + '-scroll') );

            }, obj.settings.speed );

            // Add class close for animation close.
            obj._addClass( ( obj._isIE() ? document.querySelectorAll('.' + cb + '-modal')[0] : document.getElementsByClassName(cb + '-modal')[0] ), 'close' );

            // Remove the remaining classes.
            obj._removeClass( ( obj._isIE() ? document.querySelectorAll('.' + cb + '-modal')[0] : document.getElementsByClassName(cb + '-modal')[0] ), cb + '-show' );
            obj._removeClass( document.getElementsByTagName( 'html' )[0], cb + '-perspective' );
        },
        _clean: function () {
            var obj = this;

            // Remove classes.
            obj._removeClass( document.getElementsByTagName( 'html' )[0], cb + '-hide-scrollbar' );

            // Reset properties scrollbar.
            document.getElementsByTagName( 'body' )[0].style.marginRight = 0;

            // Remove modal.
            var modal = ( obj._isIE() ? document.querySelectorAll('.' + cb + '-modal')[0] : document.getElementsByClassName(cb + '-modal')[0] );
            obj._remove( modal );

            // Remove overlay.
            if ( obj.settings.overlay ) {
                obj._remove( ( obj._isIE() ? document.querySelectorAll('.' + cb + '-overlay')[0] : document.getElementsByClassName(cb + '-overlay')[0] ) );
            }

            // Check if callback 'close'.
            if ( obj.settings.close && typeof obj.settings.close === 'function' ) {
                obj.settings.close( undefined !== arguments[0] ? arguments[0] : '' );
            }

            // Check if callback 'close' when the method is public.
            if ( typeof modal !== 'undefined' && modal.getAttribute('data-' + cb) !== null ) {
                var onClose = modal.getAttribute('data-' + cb),
                    onCloseLaunch = new Function ( 'onClose', 'return ' + onClose )(onClose);
                onCloseLaunch();
            }
        },
        _listeners: function () {
            var obj = this;

            // Listener overlay.
            if ( obj._isIE() ) {
                if ( typeof document.querySelectorAll('.' + cb + '-overlay')[0] !== 'undefined' && obj.settings.overlayClose ) {
                    document.querySelectorAll('.' + cb + '-overlay')[0].attachEvent('onclick', function () {
                        obj._close();
                    });
                }
            } else {
                if ( typeof document.getElementsByClassName(cb + '-overlay')[0] !== 'undefined' && obj.settings.overlayClose ) {
                    document.getElementsByClassName(cb + '-overlay')[0].addEventListener('click', function () {
                        obj._close();
                    }, false );
                }
            }

            // Listener on tab key esc.
            if ( obj.settings.escKey ) {
                document.onkeydown = function ( evt ) {
                    evt = evt || window.event;
                    if ( evt.keyCode === 27 ) {
                        obj._close();
                    }
                };
            }

            // Listener on element close.
            if ( obj.settings.eClose !== null && typeof obj.settings.eClose === 'string' && obj.settings.eClose.charAt(0) === '#' || typeof obj.settings.eClose === 'string' && obj.settings.eClose.charAt(0) === '.' && document.querySelector(obj.settings.eClose) ) {
                document.querySelector(obj.settings.eClose).addEventListener('click', function () {
                    obj._close();
                }, false );
            }

            // Check if callback 'close'.
            if ( obj.settings.close && typeof obj.settings.close === 'function' ) {
                var store =  obj.settings.close;
                    var modal = ( obj._isIE() ? document.querySelectorAll('.' + cb + '-modal')[0] : document.getElementsByClassName(cb + '-modal')[0] );
                modal.setAttribute('data-' + cb, store);
            }
        },
        /*
         ----------------------------
         Utilities
         ----------------------------
         */
        _extend: function () {
            for( var i = 1, arg = arguments.length; i < arg; i++ ) {
                for( var key in arguments[i] ) {
                    if( arguments[i].hasOwnProperty(key) ) {
                        arguments[0][key] = arguments[i][key];
                    }
                }
            }
            return arguments[0];
        },
        _create: function ( attr, styles, element ) {
            var div = ( element === undefined || element === null ? document.createElement('div') : element );

            // Compatibility ECMAScript 5 Objects and Properties.
            Object.keys = Object.keys || function( o ) {
                var result = [];
                for ( var name in o ) {
                    if ( o.hasOwnProperty(name) ) {
                        result.push(name);
                    }
                }
                return result;
            };

            if (  attr !== null && Object.keys(attr).length !== 0 ) {
                // Add the id.
                if ( attr.id !== null ) {
                    div.id = cb + '-' + attr.id;
                }

                // Add the class.
                if ( attr.eClass !== null ) {
                    this._addClass( div, attr.eClass );
                }
            }

            if ( styles !== null ) {
                // Loop with styles (obj).
                for ( var obj in styles ) {
                    if ( styles.hasOwnProperty(obj) ) {
                        // Insert browser dependent styles.
                        if ( this._isIE() ) {
                            var camelCase = obj.split('-');
                            if ( camelCase.length > 1 ) {
                                camelCase = camelCase[0] + camelCase[1].replace(/(?:^|\s)\w/g, function( match ) {
                                    return match.toUpperCase();
                                });
                            }
                            div.style[camelCase] = styles[obj];
                        } else {
                            div.style.setProperty( obj, styles[obj], null );
                        }

                        if ( ( obj.indexOf('transition') !== -1 || obj === 'transform' !== -1 ) && !this._isIE() ) {
                            var prefix = [ '-webkit-', '-ms-'];
                            // Insert prefix.
                            for ( var x = 0, pre = prefix.length; x < pre; x++ ) {
                                div.style.setProperty( prefix[x] + obj, styles[obj], null );
                            }
                        }
                    }
                }
            }

            return div;
        },
        _hexToRgb: function ( hex ) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF") - http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },
        _addClass: function ( element, eClass ) {
            if ( !this._hasClass( element, eClass ) ) {
                element.className = ( element.className.length && element.className !== ' ' ? element.className + ' ' + cb + '-' + eClass : cb + '-' + eClass );
            }
        },
        _removeClass: function ( element, eClass ) {
            if ( this._hasClass( element, eClass ) ) {
                var reg = new RegExp('(\\s|^)' + eClass + '(\\s|$)');
                element.className = element.className.replace(reg,' ');
            }
        },
        _hasClass: function ( element, eClass ) {
            return ( element !== undefined ? element.className.match(new RegExp('(\\s|^)' + eClass + '(\\s|$)')) : false );
        },
        _remove: function ( element ) {
            if ( element !== undefined ) {
                element.parentNode.removeChild(element);
            }
        },
        _zIndex: function () {
            var d = document,
                elems = d.getElementsByTagName('*'),
                zIndexMax = 0;
            for ( var i = 0, etotal = elems.length; i < etotal; i++ ) {
                var zindex = d.defaultView.getComputedStyle(elems[i],null).getPropertyValue('z-index');
                if ( zindex > zIndexMax && zindex !== 'auto' ) {
                    zIndexMax = zindex;
                }
            }
            return zIndexMax;
        },
        _isIE: function () {
            return navigator.appVersion.indexOf('MSIE 9.') != -1 || navigator.appVersion.indexOf('MSIE 8.') != -1;
        },
        _crossBrowser: function () {
            var el = document.createElement('fakeelement'),
                transitions = {
                    transition:         'transitionend',
                    WebkitTransition:   'webkitTransitionEnd'
                },
                transition;

            // Check transition.
            for( var t in transitions ) {
                if ( transitions.hasOwnProperty(t) && el.style[t] !== undefined ) {
                    transition =  transitions[t];
                }
            }

            return transition;
        },
        _scrollbar: function ( modal ) {
            var obj = this;

            // Go to te last position scroll.
            setTimeout( function () {
                window.scrollTo( 0, 0 );
            }, ( obj.settings.overlay ? obj.settings.overlaySpeed : 200 ) );

            var position = {
                'position':     'absolute'
            };

            if ( obj.settings.position !== null && obj.settings.position.indexOf('top') !== -1 ) {
                position['top'] = 0;
                position['margin-top'] = '20px';
            }

            // Change property position
            obj._create( {}, position, modal );
        },
        /*
         ----------------------------
         Public methods
         ----------------------------
         */
        close: function () {
            this._close();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations with jQuery.
    $.fn[ cb ] = function ( options ) {
        var args = arguments,
            isElement = typeof HTMLElement === 'object' ? options instanceof HTMLElement : options && typeof options === 'object' && options !== null && options.nodeType === 1 && typeof options.nodeName === 'string';

        if ( options === undefined || typeof options === 'object' ) {
            if ( isElement ) {

                if ( navigator.appName === 'Microsoft Internet Explorer' ) {
                    // Write a new regEx to find the version number.
                    var re = new RegExp('MSIE ([0-9]{1,}[.0-9]{0,})');

                    // If the regEx through the userAgent is not null.
                    if (re.exec(navigator.userAgent) != null) {
                        //Set the IE version
                        var version = parseInt(RegExp.$1);
                    }
                }

                if ( typeof version === 'undefined' || version >= 10 ) {
                    // Check time to avoid double click.
                    if ( options.getAttribute('data-' + cb) !== null && parseInt(options.getAttribute('data-' + cb)) + 1 > Math.round( new Date().getTime() / 1000 )) {
                        return;
                    }

                    // Set time to avoid double click.
                    options.setAttribute('data-' + cb, Math.round( new Date().getTime() / 1000 ) );
                }

                $(options).each( function () {
                    $.data( this, cb, new Plugin( this, args[1] ) );
                });

            } else {
                new Plugin( null, args[0] );
            }
        } else if ( typeof options === 'string' && options === 'close' ) {
            $.data( this, cb, new Plugin( args[0], args[1] ) );
        }
    };

})( jQuery, window, document );