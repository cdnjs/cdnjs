/* global $:true */
/* global WebKitCSSMatrix:true */

(function($) {
  "use strict";

  $.fn.transitionEnd = function(callback) {
    var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
      i, dom = this;

    function fireCallBack(e) {
      /*jshint validthis:true */
      if (e.target !== this) return;
      callback.call(this, e);
      for (i = 0; i < events.length; i++) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i++) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  };

  $.support = (function() {
    var support = {
      touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch)
    };
    return support;
  })();

  $.touchEvents = {
    start: $.support.touch ? 'touchstart' : 'mousedown',
    move: $.support.touch ? 'touchmove' : 'mousemove',
    end: $.support.touch ? 'touchend' : 'mouseup'
  };
  
  $.getTouchPosition = function(e) {
    e = e.originalEvent || e; //jquery wrap the originevent
    if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend') {
      return {
        x: e.targetTouches[0].pageX,
        y: e.targetTouches[0].pageY
      };
    } else {
      return {
        x: e.pageX,
        y: e.pageY
      };
    }
  };

  $.fn.scrollHeight = function() {
    return this[0].scrollHeight;
  };
})($);

+ function($) {
  "use strict";

  var defaults;
  
  $.modal = function(params) {
    params = $.extend({}, defaults, params);

    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);

    var buttons = params.buttons;

    var buttonsHtml = buttons.map(function(d, i) {
      return '<a href="javascript:;" class="weui_btn_dialog ' + (d.className || "") + '">' + d.text + '</a>';
    }).join("");

    var tpl = '<div class="weui_dialog">' +
                '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + params.title + '</strong></div>' +
                ( params.text ? '<div class="weui_dialog_bd">'+params.text+'</div>' : '')+
                '<div class="weui_dialog_ft">' + buttonsHtml + '</div>' +
              '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.find(".weui_btn_dialog").each(function(i, e) {
      var el = $(e);
      el.click(function() {
        //先关闭对话框，再调用回调函数
        $.closeModal();
        if(buttons[i].onClick) {
          buttons[i].onClick();
        }
      });
    });

    mask.show();
    dialog.show();
    mask.addClass("weui_mask_visible");
    dialog.addClass("weui_dialog_visible");
  };

  $.closeModal = function() {
    $(".weui_mask_visible").removeClass("weui_mask_visible").transitionEnd(function() {
      $(this).remove();
    });
    $(".weui_dialog_visible").removeClass("weui_dialog_visible").transitionEnd(function() {
      $(this).remove();
    });
  };

  $.alert = function(text, title, callback) {
    if (typeof title === 'function') {
      callback = arguments[1];
      title = undefined;
    }
    return $.modal({
      text: text,
      title: title,
      buttons: [{
        text: defaults.buttonOK,
        className: "primary",
        onClick: callback
      }]
    });
  }

  $.confirm = function(text, title, callbackOK, callbackCancel) {
    if (typeof title === 'function') {
      callbackCancel = arguments[2];
      callbackOK = arguments[1];
      title = undefined;
    }
    return $.modal({
      text: text,
      title: title,
      buttons: [
      {
        text: defaults.buttonCancel,
        className: "default",
        onClick: callbackCancel
      },
      {
        text: defaults.buttonOK,
        className: "primary",
        onClick: callbackOK
      }]
    });
  };

  defaults = $.modal.prototype.defaults = {
    title: "提示",
    text: undefined,
    buttonOK: "确定",
    buttonCancel: "取消",
    buttons: [{
      text: "确定",
      className: "primary"
    }]
  };

}($);

+ function($) {
  "use strict";

  var defaults;
  
  var show = function(html, className) {

    var mask = $("<div class='weui_mask_transparent'></div>").appendTo(document.body);

    var tpl = '<div class="weui_toast ' + className + '">' + html + '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.show();
    dialog.addClass("weui_toast_visible");
  };

  var hide = function() {
    $(".weui_mask_transparent").hide();
    $(".weui_toast_visible").removeClass("weui_toast_visible").transitionEnd(function() {
      $(this).remove();
    });
  }

  $.toast = function(text) {
    show('<i class="weui_icon_toast"></i><p class="weui_toast_content">' + (text || "已经完成") + '</p>');

    setTimeout(function() {
      hide();
    }, toastDefaults.duration);
  }

  $.showLoading = function(text) {
    var html = '<div class="weui_loading">';
    for(var i=0;i<12;i++) {
      html += '<div class="weui_loading_leaf weui_loading_leaf_' + i + '"></div>';
    }
    html += '</div>';
    html += '<p class="weui_toast_content">' + (text || "数据加载中") + '</p>';
    show(html, 'weui_loading_toast');
  }

  $.hideLoading = function() {
    hide();
  }

  var toastDefaults = $.toast.prototype.defaults = {
    duration: 2000
  }

}($);

+ function($) {
  "use strict";

  var defaults;
  
  var show = function(params) {

    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);

    var actions = params.actions || [];

    var actionsHtml = actions.map(function(d, i) {
      return '<div class="weui_actionsheet_cell ' + (d.className || "") + '">' + d.text + '</div>';
    }).join("");

    var tpl = '<div class="weui_actionsheet " id="weui_actionsheet">'+
                '<div class="weui_actionsheet_menu">'+
                actionsHtml +
                '</div>'+
                '<div class="weui_actionsheet_action">'+
                  '<div class="weui_actionsheet_cell weui_actionsheet_cancel">取消</div>'+
                  '</div>'+
                '</div>';
    var dialog = $(tpl).appendTo(document.body);

    dialog.find(".weui_actionsheet_menu .weui_actionsheet_cell, .weui_actionsheet_action .weui_actionsheet_cell").each(function(i, e) {
      $(e).click(function() {
        $.closeActions();
        if(actions[i] && actions[i].onClick) {
          actions[i].onClick();
        }
      })
    });

    mask.show();
    dialog.show();
    mask.addClass("weui_mask_visible");
    dialog.addClass("weui_actionsheet_toggle");
  };

  var hide = function() {
    $(".weui_mask").removeClass("weui_mask_visible").transitionEnd(function() {
      $(this).remove();
    });
    $(".weui_actionsheet").removeClass("weui_actionsheet_toggle").transitionEnd(function() {
      $(this).remove();
    });
  }

  $.actions = function(params) {
    params = $.extend({}, defaults, params);
    show(params);
  }

  $.closeActions = function() {
    hide();
  }

  var defaults = $.actions.prototype.defaults = {
    /*actions: [{
      text: "菜单",
      className: "danger",
      onClick: function() {
        console.log(1);
      }
    },{
      text: "菜单2",
      className: "danger",
      onClick: function() {
        console.log(2);
      }
    }]*/
  }

}($);

/* ===============================================================================
************   Notification ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";

  var distance = 50;
  var container, start, diffX, diffY;

  var touchStart = function(e) {
    if(container.hasClass("refreshing")) return;
    var p = $.getTouchPosition(e);
    start = p;
    diffX = diffY = 0;
  };
  var touchMove = function(e) {
    if(container.hasClass("refreshing")) return;
    if(!start) return false;
    if(container.scrollTop() > 0) return;
    var p = $.getTouchPosition(e);
    diffX = p.x - start.x;
    diffY = p.y - start.y;
    if(diffY < 0) return;
    container.addClass("touching");
    e.preventDefault();
    e.stopPropagation();
    diffY = Math.pow(diffY, 0.8);
    container.css("transform", "translate3d(0, "+diffY+"px, 0)");

    if(diffY < distance) {
      container.removeClass("pull-up").addClass("pull-down");
    } else {
      container.removeClass("pull-down").addClass("pull-up");
    }
  };
  var touchEnd = function() {
    start = false;
    if(diffY <= 0 || container.hasClass("refreshing")) return;
    container.removeClass("touching");
    container.removeClass("pull-down pull-up");
    container.css("transform", "");
    if(Math.abs(diffY) <= distance) {
    } else {
      container.addClass("refreshing");
      container.trigger("pull-to-refresh");
    }

    
  };

  var attachEvents = function(el) {
    el = $(el);
    el.addClass("weui-pull-to-refresh");
    container = el;
    el.on($.touchEvents.start, touchStart);
    el.on($.touchEvents.move, touchMove);
    el.on($.touchEvents.end, touchEnd);
  };

  var pullToRefresh = function(el) {
    attachEvents(el);
  };

  var pullToRefreshDone = function(el) {
    $(el).removeClass("refreshing");
  }

  $.fn.pullToRefresh = function() {
    return this.each(function() {
      pullToRefresh(this);
    });
  }

  $.fn.pullToRefreshDone = function() {
    return this.each(function() {
      pullToRefreshDone(this);
    });
  }

}($);

/* ===============================================================================
************   Notification ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";

  var distance = 50;
  var container;

  var scroll = function() {
    var offset = container.scrollHeight() - ($(window).height() + container.scrollTop());
    if(offset <= distance) {
      container.trigger("infinite");
    }
  }

  var attachEvents = function(el, off) {
    el = $(el);
    container = el;
    var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
    scrollContainer[off ? "off" : "on"]("scroll", scroll);
  };

  var infinite = function(el) {
    attachEvents(el);
  }

  var infinite = function(el) {
    attachEvents(el);
  }

  $.fn.infinite = function() {
    return this.each(function() {
      infinite(this);
    });
  }
  $.fn.destroyInfinite = function() {
    return this.each(function() {
      attachEvents(this, true);
    });
  }

}($);
