// JavaScript Document


/* ---------------------------------------------------------------------- */
/* "Polyglot" Language Switcher
 /* ----------------------------------------------------------------------
 Version: 2.2
 Author: Ixtendo
 Author URI: http://www.ixtendo.com
 License: MIT License
 License URI: http://www.opensource.org/licenses/mit-license.php
 ------------------------------------------------------------------------- */

/**
 * jquery.timer.js
 *
 * Copyright (c) 2011 Jason Chavannes <jason.chavannes@gmail.com>
 *
 * http://jchavannes.com/jquery-timer
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function ($) {

    //jquery.timer.js
    $.timer = function(func, time, autostart) {
        this.set = function(func, time, autostart) {
            this.init = true;
            if(typeof func == 'object') {
                var paramList = ['autostart', 'time'];
                for(var arg in paramList) {if(func[paramList[arg]] != undefined) {eval(paramList[arg] + " = func[paramList[arg]]");}};
                func = func.action;
            }
            if(typeof func == 'function') {this.action = func;}
            if(!isNaN(time)) {this.intervalTime = time;}
            if(autostart && !this.active) {
                this.active = true;
                this.setTimer();
            }
            return this;
        };
        this.once = function(time) {
            var timer = this;
            if(isNaN(time)) {time = 0;}
            window.setTimeout(function() {timer.action();}, time);
            return this;
        };
        this.play = function(reset) {
            if(!this.active) {
                if(reset) {this.setTimer();}
                else {this.setTimer(this.remaining);}
                this.active = true;
            }
            return this;
        };
        this.pause = function() {
            if(this.active) {
                this.active = false;
                this.remaining -= new Date() - this.last;
                this.clearTimer();
            }
            return this;
        };
        this.stop = function() {
            this.active = false;
            this.remaining = this.intervalTime;
            this.clearTimer();
            return this;
        };
        this.toggle = function(reset) {
            if(this.active) {this.pause();}
            else if(reset) {this.play(true);}
            else {this.play();}
            return this;
        };
        this.reset = function() {
            this.active = false;
            this.play(true);
            return this;
        };
        this.clearTimer = function() {
            window.clearTimeout(this.timeoutObject);
        };
        this.setTimer = function(time) {
            var timer = this;
            if(typeof this.action != 'function') {return;}
            if(isNaN(time)) {time = this.intervalTime;}
            this.remaining = time;
            this.last = new Date();
            this.clearTimer();
            this.timeoutObject = window.setTimeout(function() {timer.go();}, time);
        };
        this.go = function() {
            if(this.active) {
                this.action();
                this.setTimer();
            }
        };

        if(this.init) {
            return new $.timer(func, time, autostart);
        } else {
            this.set(func, time, autostart);
            return this;
        }
    };

    $.fn.polyglotLanguageSwitcher = function (op) {

        var ls = $.fn.polyglotLanguageSwitcher;

        var rootElement = $(this);
        var rootElementId = $(this).attr('id');
        var aElement;
        var ulElement = $("<ul class=\"dropdown\">");
        var length = 0;
        var isOpen = false;
        var liElements = [];
        var settings = $.extend({}, ls.defaults, op);
        var closePopupTimer;
        var isStaticWebSite = settings.websiteType == 'static';

        init();
        installListeners();

        function triggerEvent(evt) {
            if(settings[evt.name]){
                settings[evt.name].call($(this), evt);
            }
        }

        function open() {
            if(!isOpen){
                triggerEvent({name:'beforeOpen', element:rootElement, instance:ls});
                aElement.addClass("active");
                doAnimation(true);
                setTimeout(function () {
                    isOpen = true;
                    triggerEvent({name:'afterOpen', element:rootElement, instance:ls});
                }, 100);
            }
        }

        function close() {
            if(isOpen){
                triggerEvent({name:'beforeClose', element:rootElement, instance:ls});
                doAnimation(false);
                aElement.removeClass("active");
                isOpen = false;
                if (closePopupTimer && closePopupTimer.active) {
                    closePopupTimer.clearTimer();
                }
                triggerEvent({name:'afterClose', element:rootElement, instance:ls});
            }
        }

        function suspendCloseAction() {
            if (closePopupTimer && closePopupTimer.active) {
                closePopupTimer.pause();
            }
        }

        function resumeCloseAction() {
            if (closePopupTimer) {
                closePopupTimer.play(false);
            }
        }

        function doAnimation(open) {
            if (settings.effect == 'fade') {
                if (open) {
                    ulElement.fadeIn(settings.animSpeed);
                } else {
                    ulElement.fadeOut(settings.animSpeed);
                }
            } else {
                if (open) {
                    ulElement.slideDown(settings.animSpeed);
                } else {
                    ulElement.slideUp(settings.animSpeed);
                }
            }
        }

        function doAction(item) {
            close();
            var selectedAElement = $(item).children(":first-child");

            var selectedId = $(selectedAElement).attr("id");
            var selectedText = $(selectedAElement).text();

            $(ulElement).children().each(function () {
                $(this).detach();
            });
            for (var i = 0; i < liElements.length; i++) {
                if ($(liElements[i]).children(":first-child").attr("id") != selectedId) {
                    ulElement.append(liElements[i]);
                }
            }
            var innerSpanElement = aElement.children(":first-child");
            aElement.attr("id", selectedId);
            aElement.text(selectedText);
            aElement.append(innerSpanElement);
        }

        function installListeners() {
            $(document).click(function () {
                close();
            });
            $(document).keyup(function (e) {
                if (e.which == 27) {
                    close();
                }
            });
            if (settings.openMode == 'hover') {
                closePopupTimer = $.timer(function () {
                    close();
                });
                closePopupTimer.set({ time:settings.hoverTimeout, autostart:true });
            }
        }

        function init() {
            var selectedItem;
            var options = $("#" + rootElementId + " > form > select > option");
            if (isStaticWebSite) {
                var selectedId;
                var url = window.location.href;
                options.each(function(){
                    var id = $(this).attr("id");
                    if(url.indexOf('/'+id+'/')>=0){
                        selectedId = id;
                    }
                });
            }
            options.each(function () {
                var id = $(this).attr("id");
                var selected;
                if (isStaticWebSite) {
                    selected = selectedId === id;
                }else{
                    selected = $(this).attr("selected")
                }
                var liElement = toLiElement($(this));
                if (selected) {
                    selectedItem = liElement;
                }
                liElements.push(liElement);
                if (length > 0) {
                    ulElement.append(liElement);
                } else {
                    aElement = $("<a id=\"" + $(this).attr("id") + "\" class=\"current\" href=\"#\">" + $(this).text() + " <span class=\"trigger\">&raquo;</span></a>");
                    if (settings.openMode == 'hover') {
                        aElement.hover(function () {
                            open();
                            suspendCloseAction();
                        }, function () {
                            resumeCloseAction();
                        });
                    } else {
                        aElement.click(
                            function () {
                                open();
                            }
                        );
                    }
                }
                length++;
            });
            $("#" + rootElementId + " form:first-child").remove();
            rootElement.append(aElement);
            rootElement.append(ulElement);
            if (selectedItem) {
                doAction(selectedItem);
            }
        }

        function toLiElement(option) {
            var id = $(option).attr("id");
            var value = $(option).attr("value");
            var text = $(option).text();
            var liElement;
            if (isStaticWebSite) {
                var url = window.location.href;
                var page = url.substring(url.lastIndexOf("/")+1);
                var urlPage = 'http://' + document.domain + '/' + settings.pagePrefix + id + '/' + page;
                liElement = $("<li><a id=\"" + id + "\" href=\"" + urlPage + "\">" + text + "</a></li>");
            } else {
                var href = document.URL.replace('#', '');
                var params = parseQueryString();
                params[settings.paramName] = value;
                if (href.indexOf('?') > 0) {
                    href = href.substring(0, href.indexOf('?'));
                }
                href += toQueryString(params);
                liElement = $("<li><a id=\"" + id + "\" href=\"" + href + "\">" + text + "</a></li>");
            }
            liElement.bind('click', function () {
                triggerEvent({name:'onChange', selectedItem: $(this).children(":first").attr('id'), element:rootElement, instance:ls});
                doAction($(this));
            });
            if (settings.openMode == 'hover') {
                liElement.hover(function () {
                    suspendCloseAction();
                }, function () {
                    resumeCloseAction();
                });
            }
            return liElement;
        }

        function parseQueryString() {
            var params = {};
            var query = window.location.search.substr(1).split('&');
            if (query.length > 0) {
                for (var i = 0; i < query.length; ++i) {
                    var p = query[i].split('=');
                    if (p.length != 2) {
                        continue;
                    }
                    params[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
                }
            }
            return params;
        }

        function toQueryString(params) {
            if (settings.testMode) {
                return '#';
            } else {
                var queryString = '?';
                var i = 0;
                for (var param in params) {
                    var x = '';
                    if (i > 0) {
                        x = '&';
                    }
                    queryString += x + param + "=" + params[param];
                    i++;
                }
                return queryString;
            }
        }

        ls.open = function () {
            open();
        };
        ls.close = function () {
            close();
        };
        triggerEvent({name:'afterLoad', element:rootElement, instance:ls});
        return ls;
    };

    var ls = $.fn.polyglotLanguageSwitcher;
    ls.defaults = {
        openMode:'click',
        hoverTimeout:1500,
        animSpeed:200,
        effect:'slide',
        paramName:'lang',
        pagePrefix:'',
        websiteType:'dynamic',
        testMode:false,
        onChange:NaN,
        afterLoad:NaN,
        beforeOpen:NaN,
        afterOpen:NaN,
        beforeClose:NaN,
        afterClose:NaN
    };


})(jQuery);