// keys
if (!Object.keys) {
    Object.keys = function (object) {
        var keys = [];
        for (var name in object) {
            if (Object.prototype.hasOwnProperty.call(object, name)) {
                keys.push(name);
            }
        }
        return keys;
    };
}

// addEventListener
// removeEventListener
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener?redirectlocale=en-US&redirectslug=DOM%2FEventTarget.addEventListener#Compatibility

(function() {
  if (!Element.prototype.addEventListener) {
    var eventListeners=[];
    
    var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var self=this;
      var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (typeof listener.handleEvent != 'undefined') {
          listener.handleEvent(e);
        } else {
          listener.call(self,e);
        }
      };
      if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
          if (document.readyState=="complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});
        
        if (document.readyState=="complete") {
          var e=new Event();
          e.srcElement=window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
      }
    };
    var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var counter=0;
      while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
          if (type=="DOMContentLoaded") {
            this.detachEvent("onreadystatechange",eventListener.wrapper);
          } else {
            this.detachEvent("on"+type,eventListener.wrapper);
          }
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener=addEventListener;
      HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener=addEventListener;
      Window.prototype.removeEventListener=removeEventListener;
    }
  }
})();

// Element.firstElementChild

(function () {
  "use strict";

  if (!("firstElementChild" in document.documentElement)) {
    Object.defineProperty(Element.prototype, "firstElementChild", {
      get: function(){
        for(var nodes = this.children, n, i = 0, l = nodes.length; i < l; ++i) {
          if(n = nodes[i], 1 === n.nodeType) { return n; }
        }
        return null;
      }
    });
  }
})();

// Element.lastElementChild

(function () {
  "use strict";

  if (!("lastElementChild" in document.documentElement)) {
    Object.defineProperty(Element.prototype, "lastElementChild", {
      get: function(){
        for(var nodes = this.children, n, i = nodes.length - 1; i >= 0; --i) {
          if(n = nodes[i], 1 === n.nodeType) { return n; }
        }
        return null;
      }
    });
  }
})();

// Element.previousElementSibling

(function () {
  "use strict";

  if (!("previousElementSibling" in document.documentElement)) {
    Object.defineProperty(Element.prototype, "previousElementSibling", {
      get: function(){
        var e = this.previousSibling;
        while(e && 1 !== e.nodeType) {
          e = e.previousSibling;
        }
        return e;
      }
    });
  }
})();

// Element.nextElementSibling

(function () {
  "use strict";

  if (!("nextElementSibling" in document.documentElement)) {
    Object.defineProperty(Element.prototype, "nextElementSibling", {
      get: function(){
        var e = this.nextSibling;
        while(e && 1 !== e.nodeType) {
          e = e.nextSibling;
        }
        return e;
      }
    });
  }
})();


// @codekit-prepend "../bower_components/go-native/src/es5/object/keys.js";

// @codekit-prepend "../bower_components/go-native/src/ie8/addEventListener.js";
// @codekit-prepend "../bower_components/go-native/src/ie8/firstElementChild.js";
// @codekit-prepend "../bower_components/go-native/src/ie8/lastElementChild.js";
// @codekit-prepend "../bower_components/go-native/src/ie8/previousElementSibling.js";
// @codekit-prepend "../bower_components/go-native/src/ie8/nextElementSibling.js";

