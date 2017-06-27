/*
hinclude.js -- HTML Includes (version 0.9.1)

Copyright (c) 2005-2011 Mark Nottingham <mnot@mnot.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

------------------------------------------------------------------------------

See http://www.mnot.net/javascript/hinclude/ for documentation.
*/

var hinclude = {
  set_content_async: function (element, req) {
    if (req.readyState == 4) {
      if (req.status == 200 | req.status == 304) {
        element.innerHTML = req.responseText;
      }
      element.className = "include_" + req.status;
    }
  },

  buffer: new Array(),
  set_content_buffered: function (element, req) {
    if (req.readyState == 4) {
      hinclude.buffer.push(new Array(element, req));
      hinclude.outstanding--;
      if (hinclude.outstanding == 0) {
        hinclude.show_buffered_content();
      }
    }
  },

  show_buffered_content: function () {
    while (hinclude.buffer.length > 0) {
      var include = hinclude.buffer.pop();
      if (include[1].status == 200 | include[1].status == 304) {
        include[0].innerHTML = include[1].responseText;
      }
      include[0].className = "include_" + include[1].status;
    }
  },

  outstanding: 0,
  run: function () {
    var mode = this.get_meta("include_mode", "buffered");
    var callback = function(element, req) {};
    var includes = document.getElementsByTagName("hx:include");
    if (includes.length == 0) { // remove ns for IE
      includes = document.getElementsByTagName("include");
    }
    if (mode == "async") {
      callback = this.set_content_async;
    } else if (mode == "buffered") {
      callback = this.set_content_buffered;
      var timeout = this.get_meta("include_timeout", 2.5) * 1000;
      setTimeout("hinclude.show_buffered_content()", timeout);
    }
    for (var i=0; i < includes.length; i++) {
      this.include(includes[i], includes[i].getAttribute("src"), callback);
    }
  },

  include: function (element, url, incl_cb) {
    var scheme = url.substring(0,url.indexOf(":"));
    if (scheme.toLowerCase() == "data") { // just text/plain for now
      var data = unescape(url.substring(url.indexOf(",") + 1, url.length));
      element.innerHTML = data;
    } else {
      var req = false;
      if(window.XMLHttpRequest) {
        try {
          req = new XMLHttpRequest();
        } catch(e) {
          req = false;
        }
      } else if (window.ActiveXObject) {
        try {
          req = new ActiveXObject("Microsoft.XMLHTTP");
        } catch(e) {
          req = false;
        }
      }
      if (req) {
        this.outstanding++;
        req.onreadystatechange = function() {
          incl_cb(element, req);
        };
        try {
          req.open("GET", url, true);
          req.send("");
        } catch (e) {
          this.outstanding--;
          alert("Include error: " + url + " (" + e + ")");
        }
      }
    }
  },

  get_meta: function (name, value_default) {
    var metas = document.getElementsByTagName("meta");
    for (var m=0; m < metas.length; m++) {
      var meta_name = metas[m].getAttribute("name");
      if (meta_name == name) {
        return metas[m].getAttribute("content");
      }
    }
    return value_default;
  },

  /*
   * (c)2006 Dean Edwards/Matthias Miller/John Resig
   * Special thanks to Dan Webb's domready.js Prototype extension
   * and Simon Willison's addLoadEvent
   *
   * For more info, see:
   * http://dean.edwards.name/weblog/2006/06/again/
   *
   * Thrown together by Jesse Skinner (http://www.thefutureoftheweb.com/)
   */
  addDOMLoadEvent: function(func) {
    if (! window.__load_events) {
      var init = function () {
        // quit if this function has already been called
        if (arguments.callee.done) return;
        arguments.callee.done = true;
        if (window.__load_timer) {
          clearInterval(window.__load_timer);
          window.__load_timer = null;
        }
        for (var i=0; i < window.__load_events.length; i++) {
          window.__load_events[i]();
        }
        window.__load_events = null;
        // clean up the __ie_onload event
        /*@cc_on @*/
        /*@if (@_win32)
          document.getElementById("__ie_onload").onreadystatechange = "";
        /*@end @*/
      };
      // for Mozilla/Opera9
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", init, false);
      }
      // for Internet Explorer
      /*@cc_on @*/
      /*@if (@_win32)
          document.write(
            "<scr"
            + "ipt id=__ie_onload defer src=javascript:void(0)><\/scr"
            + "ipt>"
          );
          var script = document.getElementById("__ie_onload");
          script.onreadystatechange = function() {
              if (this.readyState == "complete") {
                  init(); // call the onload handler
              }
          };
      /*@end @*/
      // for Safari
      if (/WebKit/i.test(navigator.userAgent)) { // sniff
        window.__load_timer = setInterval(function() {
          if (/loaded|complete/.test(document.readyState)) {
            init();
          }
        }, 10);
      }
      // for other browsers
      window.onload = init;
      window.__load_events = [];
    }
    window.__load_events.push(func);
  }
};

hinclude.addDOMLoadEvent(function() { hinclude.run(); });
