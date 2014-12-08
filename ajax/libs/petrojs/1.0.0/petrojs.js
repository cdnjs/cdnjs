// PetroJS.js
// version 1.0.0
// by
// The Petronics
// WebSite: http://thepetronics.com
// Author: Muhammad Danyal Khan(Software Enginner at The Petronics)   
(function(window, undefined) {

    var $petrojs = function(properties) {

        if (window === this) {

            return new $petrojs(properties);

        }

        if (typeof properties === 'string')

            var result = document.querySelectorAll(properties);

        if (result.length > 0) {

            for (var i = 0; i < result.length; i++) {

                this[i] = result[i];

            }

            this.length = result.length;

        }

        return this;

    };

    $petrojs.fn = $petrojs.prototype = {

        hide: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.display = 'none';

            }

            callback();

        },

        show: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.display = 'inherit';

            }

            callback();

        },

        fadeIn: function(len, callback) {

            for (var i = 0; i < this.length; i++) {

                var obj = this[i];

                var op = 0;

                var interval = 50;

                var gap = interval / len;

                var timer = setInterval(function() {

                    if (op >= 1 || op >= 1.0) {

                        console.log('done', op);

                        clearInterval(timer);

                        callback();

                        return;

                    }

                    obj.style.opacity = op.toFixed(1);

                    obj.style.filter = 'alpha(opacity=' + op * 100 + ')';

                    op += gap;

                    obj.style.display = 'block';

                    console.log(obj.style.opacity);

                }, interval);

            }

        },

        fadeOut: function(len, callback) {

            for (var i = 0; i < this.length; i++) {

                var obj = this[i];

                var op = 1;

                var interval = 50;

                var gap = interval / len;

                var timer = setInterval(function() {

                    if (op <= 0) {

                        clearInterval(timer);

                        console.log('done', op);

                        obj.style.display = 'none';

                        callback();

                        return;

                    }

                    obj.style.opacity = op.toFixed(1);

                    obj.style.filter = 'alpha(opacity=' + op * 100 + ')';

                    op -= gap;

                    console.log(obj.style.opacity);

                }, interval);

            }

        },

        scrollToTop: function(scrollDuration) {

            var scrollHeight = window.scrollY,

                scrollStep = Math.PI / (scrollDuration / 15),

                cosParameter = scrollHeight / 2;

            var scrollCount = 0,

                scrollMargin;

            requestAnimationFrame(step);

            function step() {

                setTimeout(function() {

                    if (window.scrollY != 0) {

                        requestAnimationFrame(step);

                        scrollCount = scrollCount + 1;

                        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);

                        window.scrollTo(0, (scrollHeight - scrollMargin));

                    }

                }, 15);

            }

        },

        toggle: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                if (this[i].style.display !== 'none')

                {

                    this[i].style.display = 'none';

                } else {

                    this[i].style.display = '';

                }

            }

            callback();

        },

        fadeToggle: function(fadespeed, callback) {

            for (var i = 0; i < this.length; i++) {

                if (this[i].style.display !== 'none')

                {

                    var obj = this[i];

                    var op = 1;

                    var timer = setInterval(function() {

                        if (op <= 0) {

                            clearInterval(timer);

                            console.log('done', op);

                            obj.style.display = 'none';

                            return;

                        }

                        obj.style.opacity = op.toFixed(1);

                        obj.style.filter = 'alpha(opacity=' + op * 100 + ')';

                        op -= 0.1;

                        console.log(obj.style.opacity);

                    }, fadespeed);

                } else {

                    var obj = this[i];

                    var op = 0;

                    var timer = setInterval(function() {

                        if (op >= 1 || op >= 1.0) {

                            console.log('done', op);


                            clearInterval(timer);

                            return;

                        }

                        obj.style.opacity = op.toFixed(1);

                        obj.style.filter = 'alpha(opacity=' + op * 100 + ')';

                        op += 0.1;

                        obj.style.display = 'block';

                        console.log(obj.style.opacity);

                    }, fadespeed);

                }

                callback();

            }

        },

        Load: function(options) {

            var options = options || {},

                url = options.url || url,

                complete = options.complete || complete;

            for (var i = 0; i < this.length; i++) {

                this[i].innerHTML = '<object type="text/html" data="' + url + '" ></object>';

                this[i].value = '<object type="text/html" data="' + url + '" ></object>';

                complete();

            }
            return this;

        },

        bgcolor: function(color, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.background = color;

                callback();

            }

            return this;

        },

        newAttr: function(name, attr, callback) {

            for (var i = 0; i < this.length; i++) {

                return this[i].setAttribute(name, attr);

                callback();

            }

        },

        removeAttr: function(attr) {

            for (var i = 0; i < this.length; i++) {

                return this[i].removeAttribute(attr);

            }

        },

        getAttr: function(attr) {

            for (var i = 0; i < this.length; i++) {

                return this[i].getAttribute(attr);

            }

        },

        value: function(newval, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].value = newval;

                callback();

            }

            return this;

        },

        text: function(newtext, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].innerHTML = newtext;

                callback();

            }

            return this;

        },

        html: function(newhtml, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].innerHTML = newhtml;

                callback();

            }

            return this;

        },

        conthtml: function(newhtml, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].innerHTML += newhtml;

                callback();

            }

            return this;

        },

        getval: function(fn) {

            for (var i = 0; i < this.length; i++) {

                return this[i].value;

            }

        },

        fontSize: function(size, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.fontSize = size + 'px';

                callback();

            }

            return this;

        },

        fontColor: function(color, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.color = color;

                callback();

            }

            return this;

        },

        fontStyle: function(style, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.fontStyle = style;

                callback();

            }

            return this;

        },

        slideDown: function(speed, callback) {

            for (var i = 0; i < this.length; i++) {

                var mySpeed = speed || 300;

                var intervals = mySpeed;

                var obj = this[i];

                var holder = document.createElement('div');

                var parent = obj.parentNode;

                holder.setAttribute('style', 'height: 0px; overflow:hidden');

                parent.insertBefore(holder, obj);

                parent.removeChild(obj);

                holder.appendChild(obj);

                obj.style.display = obj.getAttribute("data-original-display") || "";

                var height = obj.offsetHeight;

                var sepHeight = height / intervals;

                var timer = setInterval(function() {

                    var holderHeight = holder.offsetHeight;

                    if (holderHeight + sepHeight < height) {

                        holder.style.height = (holderHeight + sepHeight) + 'px';

                    } else {

                        holder.removeChild(obj);

                        parent.insertBefore(obj, holder);

                        parent.removeChild(holder);

                        clearInterval(timer);

                    }

                }, intervals);

                callback();

            }

            return this;

        },

        slideUp: function(speed, callback) {

            for (var i = 0; i < this.length; i++) {

                var mySpeed = speed || 300;

                var intervals = mySpeed;

                var obj = this[i];

                var height = obj.offsetHeight;

                var holder = document.createElement('div');

                var parent = obj.parentNode;

                holder.setAttribute('style', 'height: ' + height + 'px; overflow:hidden');

                parent.insertBefore(holder, obj);

                parent.removeChild(obj);

                holder.appendChild(obj);

                var originalDisplay = (obj.style.display !== 'none') ? obj.style.display : '';

                obj.setAttribute("data-original-display", originalDisplay);

                var sepHeight = height / intervals;

                var timer = setInterval(function() {

                        var holderHeight = holder.offsetHeight;

                        console.log(holderHeight);

                        if (holderHeight - sepHeight > 0) {

                            holder.style.height = (holderHeight - sepHeight) + 'px';

                        } else {

                            obj.style.display = 'none';

                            holder.removeChild(obj);

                            parent.insertBefore(obj, holder);

                            parent.removeChild(holder);

                            clearInterval(timer);

                        }

                    }

                    , intervals);

                callback();

            }

            return this;

        },

        slideToggle: function(speed, callback) {

            for (var i = 0; i < this.length; i++) {

                if (this[i].style.display == 'none') {

                    var mySpeed = speed || 300;

                    var intervals = mySpeed;

                    var obj = this[i];

                    var holder = document.createElement('div');

                    var parent = obj.parentNode;

                    holder.setAttribute('style', 'height: 0px; overflow:hidden');

                    parent.insertBefore(holder, obj);

                    parent.removeChild(obj);

                    holder.appendChild(obj);

                    obj.style.display = obj.getAttribute("data-original-display") || "";

                    var height = obj.offsetHeight;

                    var sepHeight = height / intervals;

                    var timer = setInterval(function() {

                        var holderHeight = holder.offsetHeight;

                        if (holderHeight + sepHeight < height) {

                            holder.style.height = (holderHeight + sepHeight) + 'px';

                        } else {

                            holder.removeChild(obj);

                            parent.insertBefore(obj, holder);

                            parent.removeChild(holder);

                            clearInterval(timer);

                        }

                    }, intervals);

                } else {

                    var mySpeed = speed || 300;

                    var intervals = mySpeed;

                    var obj = this[i];

                    var height = obj.offsetHeight;

                    var holder = document.createElement('div');

                    var parent = obj.parentNode;

                    holder.setAttribute('style', 'height: ' + height + 'px; overflow:hidden');

                    parent.insertBefore(holder, obj);

                    parent.removeChild(obj);

                    holder.appendChild(obj);

                    var originalDisplay = (obj.style.display !== 'none') ? obj.style.display : '';

                    obj.setAttribute("data-original-display", originalDisplay);

                    var sepHeight = height / intervals;

                    var timer = setInterval(function() {

                            var holderHeight = holder.offsetHeight;

                            console.log(holderHeight);

                            if (holderHeight - sepHeight > 0) {

                                holder.style.height = (holderHeight - sepHeight) + 'px';

                            } else {

                                obj.style.display = 'none';

                                holder.removeChild(obj);

                                parent.insertBefore(obj, holder);

                                parent.removeChild(holder);

                                clearInterval(timer);

                            }

                        }

                        , intervals);

                }

                callback();

            }

            return this;

        },

        size: function(height, width, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.height = height + 'px';

                this[i].style.width = width + 'px';

            }

            return this;

        },

        width: function(width, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.width = width + 'px';

            }

            return this;

        },

        height: function(height, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].style.height = height + 'px';

            }

            return this;

        },

        click: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('click', callback, false);

            }

            return this;

        },

        onTitleChange: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                if (this[i].mozbrowsertitlechange) {

                    this[i].addEventListener('mozbrowsertitlechange', callback, false);

                } else {

                    console.log("Warning: your browser doesn't support this feature");

                }

            }

            return this;

        },

        onpet: function(event, callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener(event, callback, false);

            }

            return this;

        },

        mouseOver: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('mouseover', callback, false);

            }

            return this;

        },

        mouseOut: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('mouseout', callback, false);

            }

            return this;

        },

        Onhover: function(callback1, callback2) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('mouseenter', callback1, false);

                this[i].addEventListener('mouseleave', callback2, false);

            }

        },

        onsubmit: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('submit', callback, false);

            }

            return this;

        },

        onblur: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('blur', callback, false);

            }

            return this;

        },

        onchange: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('change', callback, false);

            }

            return this;

        },

        onfocus: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('focus', callback, false);

            }

            return this;

        },

        onselect: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('select', callback, false);

            }

            return this;

        },

        onreset: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('reset', callback, false);

            }

            return this;

        },

        onload: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('load', callback, false);

            }

            return this;

        },

        onerror: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('error', callback, false);

            }

            return this;

        },

        onunload: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('unload', callback, false);

            }

            return this;

        },

        onresize: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('resize', callback, false);

            }

            return this;

        },

        hover: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('hover', callback, false);

            }

            return this;

        },

        keydown: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {



                this[i].addEventListener('keydown', callback, false);

            }

            return this;

        },

        keypress: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('keypress', callback, false);

            }

            return this;

        },

        keyup: function(callback, fn) {

            for (var i = 0; i < this.length; i++) {

                this[i].addEventListener('keyup', callback, false);

            }

            return this;

        },

        LoadStylesheet: function(name, callback, timeout) {

            var timer = setInterval(function() {

                var link = document.createElement('link');

                link.href = name;

                link.rel = 'stylesheet';

                link.type = 'text/css';

                document.getElementsByTagName("head")[0].appendChild(link);

                callback();

            }, timeout);

        },

        LoadCss: function(options) {

            var options = options || {},

                load = options.load || load,

                timeout = options.timeout || timeout;

            onloadcss = options.onloadcss || onloadcss;

            setTimeout(function() {

                for (var i = 0; i < load.length; i++) {

                    var link = document.createElement('link');

                    link.href = load[i];

                    link.rel = 'stylesheet';

                    link.type = 'text/css';

                    document.getElementsByTagName("head")[0].appendChild(link);

                }

                onloadcss();

            }, timeout);

        },

        LoadJavascript: function(name, callback, timeout, options) {

            var timer = setInterval(function() {

                var script = document.createElement('script');

                script.src = name;

                script.type = 'text/javascript';

                document.getElementsByTagName("head")[0].appendChild(script);

                callback();

            }, timeout);

        },

        LoadJs: function(options) {

            var options = options || {},

                load = options.load || load,

                timeout = options.timeout || timeout;

            onloadjs = options.onloadjs || onloadjs;

            setTimeout(function() {

                for (var i = 0; i < load.length; i++) {

                    var script = document.createElement('script');

                    script.src = load[i];

                    script.type = 'text/javascript';

                    document.getElementsByTagName("head")[0].appendChild(script);

                }

                onloadjs();

            }, timeout);

        },

        LoadCSSJS: function(options) {

            var options = options || {},

                load = options.load || load,

                complete = options.complete || complete;

            for (var i = 0; i < load.length; i++) {

                var link = document.createElement('link');

                link.href = load[i];

                link.rel = 'stylesheet';

                link.type = 'text/css';

                document.getElementsByTagName("head")[0].appendChild(link);

                var script = document.createElement('script');

                script.src = load[i];

                script.type = 'text/javascript';

                document.getElementsByTagName("head")[0].appendChild(script);

            }

            complete();

        },

        append: function(text,callback) {

           for (var i = 0; i < this.length; i++) {

                this[i].innerHTML += text;

                callback();

            }

            return this;

        },

        css: function(style) {

            return function(selector, css) {

                for (var i = 0; i < this.length; i++) {

                    var sheet = document.head.appendChild(style).sheet;

                    var propText = Object.keys(css).map(function(p) {

                        return p + ":" + css[p]

                    }).join(";");

                    if ("insertRule" in sheet) {

                        sheet.insertRule(selector + "{" + propText + "}", sheet.cssRules.length);

                    } else if ("addRule" in sheet) {

                        sheet.addRule(selector, propText, sheet.cssRules.length);

                    }

                }

            };

        }(document.createElement("style")),

        StyleSheet: function(content) {

            var style = document.createElement('style');

            style.type = 'text/css';

            style.innerHTML = content;

            document.getElementsByTagName('head')[0].appendChild(style);

        },

        hasClass: function(classname, callback, callback2) {

            for (var i = 0; i < this.length; i++) {

                var classes = this[i].classList;

                for (var j = 0; j < classes.length; j++) {

                    if (classes[j] == classname) {

                        callback();

                    } else {

                        callback2();

                    }

                    return false;

                }

            }

        },

        addClass: function(classname, callback) {

            for (var i = 0; i < this.length; i++) {

                if (classname !== '')

                {

                    var cn = this[i].className;



                    if (cn.indexOf(classname) != -1) {

                        return;

                    }



                    if (cn !== '') {

                        classname = ' ' + classname;

                    }

                    this[i].className = cn + classname;

                    callback();

                }

            }

        },

        removeClass: function(classname, callback) {

            for (var i = 0; i < this.length; i++) {

                if (classname !== '')

                {

                    var cn = this[i].className;

                    var rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");

                    cn = cn.replace(rxp, '');

                    this[i].className = cn;

                    callback();

                }

            }

        },

        toggleClass: function(className, callback) {

            for (var i = 0; i < this.length; i++) {

                if (!this[i] || !className) {

                    return;

                }



                var classString = this[i].className,
                    nameIndex = classString.indexOf(className);

                if (nameIndex == -1) {

                    classString += ' ' + className;

                } else {

                    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);

                }

                this[i].className = classString;

                callback();

            }

        }

    };

    window.$petrojs = $petrojs;

})(window);



var get_selector = function(t) {
    var n = {};
    n.selector = t;
    n.element = document.querySelector(n.selector);
    n.html = function() {
        return n.element
    };
    return n
};



var petrojs = {

    easing: {

        linear: function(progress) {

            return progress;

        },

        quadratic: function(progress) {

            return Math.pow(progress, 2);

        },

        swing: function(progress) {

            return 0.5 - Math.cos(progress * Math.PI) / 2;

        },

        circ: function(progress) {

            return 1 - Math.sin(Math.acos(progress));

        },

        back: function(progress, x) {

            return Math.pow(progress, 2) * ((x + 1) * progress - x);

        },

        bounce: function(progress) {

            for (var a = 0, b = 1, result; 1; a += b, b /= 2) {

                if (progress >= (7 - 4 * a) / 11) {

                    return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);

                }

            }

        },

        elastic: function(progress, x) {

            return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);

        }

    },

    animate: function(options) {

        var start = new Date;

        var id = setInterval(function() {

            var timePassed = new Date - start;

            var progress = timePassed / options.duration;

            if (progress > 1) {

                progress = 1;

            }

            options.progress = progress;

            var delta = options.delta(progress);

            options.step(delta);

            if (progress == 1) {

                clearInterval(id);

                options.complete();

            }

        }, options.delay || 10);

    },

    fadeOut: function(element, options) {

        var to = 1;

        this.animate({

            duration: options.duration,

            delta: function(progress) {

                progress = this.progress;

                return petrojsat.easing.swing(progress);

            },

            complete: options.complete,

            step: function(delta) {

                element.style.opacity = to - delta;

            }

        });

    },

    fadeIn: function(element, options) {

        var to = 0;

        this.animate({

            duration: options.duration,

            delta: function(progress) {

                progress = this.progress;

                return petrojsat.easing.swing(progress);

            },

            complete: options.complete,

            step: function(delta) {

                element.style.opacity = to + delta;

            }

        });

    },

    POST: function(url, options, callback) {

        var xmlhttp;

        var options = options || {};

        var data = options.data || data;

        if (window.XMLHttpRequest)

        {

            xmlhttp = new XMLHttpRequest();

        } else

        {

            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        }

        xmlhttp.onreadystatechange = function()

        {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)

            {

                var return_data = xmlhttp.responseText;

                callback(return_data);

            }

        }

        xmlhttp.open("POST", url, true);

        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xmlhttp.send(data);

    },

    GET: function(url, callback) {

        var xmlhttp;

        if (window.XMLHttpRequest)

        {

            xmlhttp = new XMLHttpRequest();

        } else

        {

            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        }

        xmlhttp.onreadystatechange = function()

        {

            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)

            {

                var return_data = xmlhttp.responseText;

                callback(return_data);

            }

        }

        xmlhttp.open("GET", url, true);

        xmlhttp.send();

    },

    onload: function(callback) {

        window.addEventListener('load', callback, false);

    },

    onerror: function(callback) {

        window.addEventListener('error', callback, false);

    },

    onunload: function(callback) {

        window.addEventListener('unload', callback, false);

    },

    onresize: function(callback) {

        window.addEventListener('resize', callback, false);

    },

    Cache: function(data, key, callback, display) {

        try {

            localStorage.setItem(key, JSON.stringify(data));

        } catch (e) {

            if (e == QUOTA_EXCEEDED_ERR) {

                alert('Unable to Create Cache.');

            }

        }

        for (var i = 0; i < localStorage.length; i++) {

            var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));

            callback(obj);

        }

    },

    showCachedata: function(callback) {

        for (var i = 0; i < localStorage.length; i++) {

            var obj = JSON.parse(localStorage.getItem(localStorage.key(i)));

            callback(obj);

        }

    },

    clearCachedata: function(callback) {

        for (var i = 0; i < localStorage.length; i++) {

            var obj = JSON.parse(localStorage.removeItem(localStorage.key(i)));

        }

        callback();

    },

    makeArray: function(options) {

        var options = options || {},

            array = options.array || array,

            callback = options.callback || callback;

        callback(array);

    }

}
