/** 
* jQuery WeUI V0.7.0 
* By 言川
* http://lihongxun945.github.io/jquery-weui/
 */
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

  $.fn.transform = function(transform) {
    for (var i = 0; i < this.length; i++) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
    }
    return this;
  };
  $.fn.transition = function(duration) {
    if (typeof duration !== 'string') {
      duration = duration + 'ms';
    }
    for (var i = 0; i < this.length; i++) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
    }
    return this;
  };

  $.getTranslate = function (el, axis) {
    var matrix, curTransform, curStyle, transformMatrix;

    // automatic axis detection
    if (typeof axis === 'undefined') {
      axis = 'x';
    }

    curStyle = window.getComputedStyle(el, null);
    if (window.WebKitCSSMatrix) {
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
    }
    else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      //Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      //Crazy IE10 Matrix
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      //Normal Browsers
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === 'y') {
      //Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      //Crazy IE10 Matrix
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      //Normal Browsers
      else
        curTransform = parseFloat(matrix[5]);
    }

    return curTransform || 0;
  };
  $.requestAnimationFrame = function (callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
    else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
    else {
      return window.setTimeout(callback, 1000 / 60);
    }
  };

  $.cancelAnimationFrame = function (id) {
    if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
    else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
    else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
    else {
      return window.clearTimeout(id);
    }  
  };

  $.fn.join = function(arg) {
    return this.toArray().join(arg);
  }

})($);

/*===========================
  Template7 Template engine
  ===========================*/
/* global $:true */
/* jshint unused:false */
/* jshint forin:false */
+function ($) {
  "use strict";
  $.Template7 = $.t7 = (function () {
    function isArray(arr) {
      return Object.prototype.toString.apply(arr) === '[object Array]';
    }
    function isObject(obj) {
      return obj instanceof Object;
    }
    function isFunction(func) {
      return typeof func === 'function';
    }
    var cache = {};
    function helperToSlices(string) {
      var helperParts = string.replace(/[{}#}]/g, '').split(' ');
      var slices = [];
      var shiftIndex, i, j;
      for (i = 0; i < helperParts.length; i++) {
        var part = helperParts[i];
        if (i === 0) slices.push(part);
        else {
          if (part.indexOf('"') === 0) {
            // Plain String
            if (part.match(/"/g).length === 2) {
              // One word string
              slices.push(part);
            }
            else {
              // Find closed Index
              shiftIndex = 0;
              for (j = i + 1; j < helperParts.length; j++) {
                part += ' ' + helperParts[j];
                if (helperParts[j].indexOf('"') >= 0) {
                  shiftIndex = j;
                  slices.push(part);
                  break;
                }
              }
              if (shiftIndex) i = shiftIndex;
            }
          }
          else {
            if (part.indexOf('=') > 0) {
              // Hash
              var hashParts = part.split('=');
              var hashName = hashParts[0];
              var hashContent = hashParts[1];
              if (hashContent.match(/"/g).length !== 2) {
                shiftIndex = 0;
                for (j = i + 1; j < helperParts.length; j++) {
                  hashContent += ' ' + helperParts[j];
                  if (helperParts[j].indexOf('"') >= 0) {
                    shiftIndex = j;
                    break;
                  }
                }
                if (shiftIndex) i = shiftIndex;
              }
              var hash = [hashName, hashContent.replace(/"/g,'')];
              slices.push(hash);
            }
            else {
              // Plain variable
              slices.push(part);
            }
          }
        }
      }
      return slices;
    }
    function stringToBlocks(string) {
      var blocks = [], i, j, k;
      if (!string) return [];
      var _blocks = string.split(/({{[^{^}]*}})/);
      for (i = 0; i < _blocks.length; i++) {
        var block = _blocks[i];
        if (block === '') continue;
        if (block.indexOf('{{') < 0) {
          blocks.push({
            type: 'plain',
            content: block
          });
        }
        else {
          if (block.indexOf('{/') >= 0) {
            continue;
          }
          if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
            // Simple variable
            blocks.push({
              type: 'variable',
              contextName: block.replace(/[{}]/g, '')
            });
            continue;
          }
          // Helpers
          var helperSlices = helperToSlices(block);
          var helperName = helperSlices[0];
          var helperContext = [];
          var helperHash = {};
          for (j = 1; j < helperSlices.length; j++) {
            var slice = helperSlices[j];
            if (isArray(slice)) {
              // Hash
              helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
            }
            else {
              helperContext.push(slice);
            }
          }

          if (block.indexOf('{#') >= 0) {
            // Condition/Helper
            var helperStartIndex = i;
            var helperContent = '';
            var elseContent = '';
            var toSkip = 0;
            var shiftIndex;
            var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
            for (j = i + 1; j < _blocks.length; j++) {
              if (_blocks[j].indexOf('{{#') >= 0) {
                depth ++;
              }
              if (_blocks[j].indexOf('{{/') >= 0) {
                depth --;
              }
              if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
                helperContent += _blocks[j];
                if (foundElse) elseContent += _blocks[j];
                toSkip ++;
              }
              else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
                if (toSkip > 0) {
                  toSkip--;
                  helperContent += _blocks[j];
                  if (foundElse) elseContent += _blocks[j];
                }
                else {
                  shiftIndex = j;
                  foundClosed = true;
                  break;
                }
              }
              else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
                foundElse = true;
              }
              else {
                if (!foundElse) helperContent += _blocks[j];
                if (foundElse) elseContent += _blocks[j];
              }

            }
            if (foundClosed) {
              if (shiftIndex) i = shiftIndex;
              blocks.push({
                type: 'helper',
                helperName: helperName,
                contextName: helperContext,
                content: helperContent,
                inverseContent: elseContent,
                hash: helperHash
              });
            }
          }
          else if (block.indexOf(' ') > 0) {
            blocks.push({
              type: 'helper',
              helperName: helperName,
              contextName: helperContext,
              hash: helperHash
            });
          }
        }
      }
      return blocks;
    }
    var Template7 = function (template) {
      var t = this;
      t.template = template;

      function getCompileFn(block, depth) {
        if (block.content) return compile(block.content, depth);
        else return function () {return ''; };
      }
      function getCompileInverse(block, depth) {
        if (block.inverseContent) return compile(block.inverseContent, depth);
        else return function () {return ''; };
      }
      function getCompileVar(name, ctx) {
        var variable, parts, levelsUp = 0, initialCtx = ctx;
        if (name.indexOf('../') === 0) {
          levelsUp = name.split('../').length - 1;
          var newDepth = ctx.split('_')[1] - levelsUp;
          ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
          parts = name.split('../')[levelsUp].split('.');
        }
        else if (name.indexOf('@global') === 0) {
          ctx = '$.Template7.global';
          parts = name.split('@global.')[1].split('.');
        }
        else if (name.indexOf('@root') === 0) {
          ctx = 'ctx_1';
          parts = name.split('@root.')[1].split('.');
        }
        else {
          parts = name.split('.');
        }
        variable = ctx;
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          if (part.indexOf('@') === 0) {
            if (i > 0) {
              variable += '[(data && data.' + part.replace('@', '') + ')]';
            }
            else {
              variable = '(data && data.' + name.replace('@', '') + ')';
            }
          }
          else {
            if (isFinite(part)) {
              variable += '[' + part + ']';
            }
            else {
              if (part.indexOf('this') === 0) {
                variable = part.replace('this', ctx);
              }
              else {
                variable += '.' + part;       
              }
            }
          }
        }

        return variable;
      }
      function getCompiledArguments(contextArray, ctx) {
        var arr = [];
        for (var i = 0; i < contextArray.length; i++) {
          if (contextArray[i].indexOf('"') === 0) arr.push(contextArray[i]);
          else {
            arr.push(getCompileVar(contextArray[i], ctx));
          }
        }
        return arr.join(', ');
      }
      function compile(template, depth) {
        depth = depth || 1;
        template = template || t.template;
        if (typeof template !== 'string') {
          throw new Error('Template7: Template must be a string');
        }
        var blocks = stringToBlocks(template);
        if (blocks.length === 0) {
          return function () { return ''; };
        }
        var ctx = 'ctx_' + depth;
        var resultString = '(function (' + ctx + ', data) {\n';
        if (depth === 1) {
          resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
          resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
          resultString += 'function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
        }
        resultString += 'var r = \'\';\n';
        var i, j, context;
        for (i = 0; i < blocks.length; i++) {
          var block = blocks[i];
          // Plain block
          if (block.type === 'plain') {
            resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
            continue;
          }
          var variable, compiledArguments;
          // Variable block
          if (block.type === 'variable') {
            variable = getCompileVar(block.contextName, ctx);
            resultString += 'r += c(' + variable + ', ' + ctx + ');';
          }
          // Helpers block
          if (block.type === 'helper') {
            if (block.helperName in t.helpers) {
              compiledArguments = getCompiledArguments(block.contextName, ctx);
              resultString += 'r += ($.Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) +'{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
            }
            else {
              if (block.contextName.length > 0) {
                throw new Error('Template7: Missing helper: "' + block.helperName + '"');
              }
              else {
                variable = getCompileVar(block.helperName, ctx);
                resultString += 'if (' + variable + ') {';
                resultString += 'if (isArray(' + variable + ')) {';
                resultString += 'r += ($.Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
                resultString += '}else {';
                resultString += 'r += ($.Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
                resultString += '}}';
              }
            }
          }
        }
        resultString += '\nreturn r;})';
        return eval.call(window, resultString);
      }
      t.compile = function (template) {
        if (!t.compiled) {
          t.compiled = compile(template);
        }
        return t.compiled;
      };
    };
    Template7.prototype = {
      options: {},
      helpers: {
        'if': function (context, options) {
          if (isFunction(context)) { context = context.call(this); }
          if (context) {
            return options.fn(this, options.data);
          }
          else {
            return options.inverse(this, options.data);
          }
        },
        'unless': function (context, options) {
          if (isFunction(context)) { context = context.call(this); }
          if (!context) {
            return options.fn(this, options.data);
          }
          else {
            return options.inverse(this, options.data);
          }
        },
        'each': function (context, options) {
          var ret = '', i = 0;
          if (isFunction(context)) { context = context.call(this); }
          if (isArray(context)) {
            if (options.hash.reverse) {
              context = context.reverse();
            }
            for (i = 0; i < context.length; i++) {
              ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
            }
            if (options.hash.reverse) {
              context = context.reverse();
            }
          }
          else {
            for (var key in context) {
              i++;
              ret += options.fn(context[key], {key: key});
            }
          }
          if (i > 0) return ret;
          else return options.inverse(this);
        },
        'with': function (context, options) {
          if (isFunction(context)) { context = context.call(this); }
          return options.fn(context);
        },
        'join': function (context, options) {
          if (isFunction(context)) { context = context.call(this); }
          return context.join(options.hash.delimiter || options.hash.delimeter);
        },
        'js': function (expression, options) {
          var func;
          if (expression.indexOf('return')>=0) {
            func = '(function(){'+expression+'})';
          }
          else {
            func = '(function(){return ('+expression+')})';
          }
          return eval.call(this, func).call(this);
        },
        'js_compare': function (expression, options) {
          var func;
          if (expression.indexOf('return')>=0) {
            func = '(function(){'+expression+'})';
          }
          else {
            func = '(function(){return ('+expression+')})';
          }
          var condition = eval.call(this, func).call(this);
          if (condition) {
            return options.fn(this, options.data);
          }
          else {
            return options.inverse(this, options.data);   
          }
        }
      }
    };
    var t7 = function (template, data) {
      if (arguments.length === 2) {
        var instance = new Template7(template);
        var rendered = instance.compile()(data);
        instance = null;
        return (rendered);
      }
      else return new Template7(template);
    };
    t7.registerHelper = function (name, fn) {
      Template7.prototype.helpers[name] = fn;
    };
    t7.unregisterHelper = function (name) {
      Template7.prototype.helpers[name] = undefined;  
      delete Template7.prototype.helpers[name];
    };

    t7.compile = function (template, options) {
      var instance = new Template7(template, options);
      return instance.compile();
    };

    t7.options = Template7.prototype.options;
    t7.helpers = Template7.prototype.helpers;
    return t7;
  })();
}($);

+ function($) {
  "use strict";

  var defaults;
  
  $.modal = function(params) {
    params = $.extend({}, defaults, params);


    var buttons = params.buttons;

    var buttonsHtml = buttons.map(function(d, i) {
      return '<a href="javascript:;" class="weui_btn_dialog ' + (d.className || "") + '">' + d.text + '</a>';
    }).join("");

    var tpl = '<div class="weui_dialog">' +
                '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + params.title + '</strong></div>' +
                ( params.text ? '<div class="weui_dialog_bd">'+params.text+'</div>' : '')+
                '<div class="weui_dialog_ft">' + buttonsHtml + '</div>' +
              '</div>';
    
    var dialog = $.openModal(tpl);

    dialog.find(".weui_btn_dialog").each(function(i, e) {
      var el = $(e);
      el.click(function() {
        //先关闭对话框，再调用回调函数
        if(params.autoClose) $.closeModal();

        if(buttons[i].onClick) {
          buttons[i].onClick();
        }
      });
    });
  };

  $.openModal = function(tpl) {
    var mask = $("<div class='weui_mask'></div>").appendTo(document.body);
    mask.show();

    var dialog = $(tpl).appendTo(document.body);
    
    dialog.show();
    mask.addClass("weui_mask_visible");
    dialog.addClass("weui_dialog_visible");

    return dialog;
  }

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

  $.prompt = function(text, title, callbackOK, callbackCancel) {
    if (typeof title === 'function') {
      callbackCancel = arguments[2];
      callbackOK = arguments[1];
      title = undefined;
    }

    return $.modal({
      text: "<p class='weui-prompt-text'>"+(text || "")+"</p><input type='text' class='weui_input weui-prompt-input' id='weui-prompt-input'/>",
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
        onClick: function() {
          callbackOK && callbackOK($("#weui-prompt-input").val());
        }
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
    }],
    autoClose: true //点击按钮自动关闭对话框，如果你不希望点击按钮就关闭对话框，可以把这个设置为false
  };

}($);

+ function($) {
  "use strict";

  var defaults;
  
  var show = function(html, className) {

    className = className || "";
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

  $.toast = function(text, style) {
    var className;
    if(style == "cancel") {
      className = "weui_toast_cancel";
    } else if(style == "forbidden") {
      className = "weui_toast_forbidden";
    }
    show('<i class="weui_icon_toast"></i><p class="weui_toast_content">' + (text || "已经完成") + '</p>', className);

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

    var mask = $("<div class='weui_mask weui_actions_mask'></div>").appendTo(document.body);

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
        params.onClose && params.onClose();
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

  $(document).on("click", ".weui_actions_mask", function() {
    $.closeActions();
  });

  var defaults = $.actions.prototype.defaults = {
    onClose: undefined,
    /*actions: [{
      text: "菜单",
      className: "color-danger",
      onClick: function() {
        console.log(1);
      }
    },{
      text: "菜单2",
      className: "color-success",
      onClick: function() {
        console.log(2);
      }
    }]*/
  }

}($);

/* ===============================================================================
************   Pull to refreh ************
=============================================================================== */
/* global $:true */

+function ($) {
  "use strict";

  var PTR = function(el) {
    this.container = $(el);
    this.distance = 50;
    this.attachEvents();
  }

  PTR.prototype.touchStart = function(e) {
    if(this.container.hasClass("refreshing")) return;
    var p = $.getTouchPosition(e);
    this.start = p;
    this.diffX = this.diffY = 0;
  };

  PTR.prototype.touchMove= function(e) {
    if(this.container.hasClass("refreshing")) return;
    if(!this.start) return false;
    if(this.container.scrollTop() > 0) return;
    var p = $.getTouchPosition(e);
    this.diffX = p.x - this.start.x;
    this.diffY = p.y - this.start.y;
    if(this.diffY < 0) return;
    this.container.addClass("touching");
    e.preventDefault();
    e.stopPropagation();
    this.diffY = Math.pow(this.diffY, 0.8);
    this.container.css("transform", "translate3d(0, "+this.diffY+"px, 0)");

    if(this.diffY < this.distance) {
      this.container.removeClass("pull-up").addClass("pull-down");
    } else {
      this.container.removeClass("pull-down").addClass("pull-up");
    }
  };
  PTR.prototype.touchEnd = function() {
    this.start = false;
    if(this.diffY <= 0 || this.container.hasClass("refreshing")) return;
    this.container.removeClass("touching");
    this.container.removeClass("pull-down pull-up");
    this.container.css("transform", "");
    if(Math.abs(this.diffY) <= this.distance) {
    } else {
      this.container.addClass("refreshing");
      this.container.trigger("pull-to-refresh");
    }
  };

  PTR.prototype.attachEvents = function() {
    var el = this.container;
    el.addClass("weui-pull-to-refresh");
    el.on($.touchEvents.start, $.proxy(this.touchStart, this));
    el.on($.touchEvents.move, $.proxy(this.touchMove, this));
    el.on($.touchEvents.end, $.proxy(this.touchEnd, this));
  };

  var pullToRefresh = function(el) {
    new PTR(el);
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
************   Infinite ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";


  var Infinite = function(el, distance) {
    this.container = $(el);
    this.container.data("infinite", this);
    this.distance = distance || 50;
    this.attachEvents();
  }

  Infinite.prototype.scroll = function() {
    var container = this.container;
    var offset = container.scrollHeight() - ($(window).height() + container.scrollTop());
    if(offset <= this.distance) {
      container.trigger("infinite");
    }
  }

  Infinite.prototype.attachEvents = function(off) {
    var el = this.container;
    var scrollContainer = (el[0].tagName.toUpperCase() === "BODY" ? $(document) : el);
    scrollContainer[off ? "off" : "on"]("scroll", $.proxy(this.scroll, this));
  };
  Infinite.prototype.detachEvents = function(off) {
    this.attachEvents(true);
  }

  var infinite = function(el) {
    attachEvents(el);
  }

  $.fn.infinite = function(distance) {
    return this.each(function() {
      new Infinite(this, distance);
    });
  }
  $.fn.destroyInfinite = function() {
    return this.each(function() {
      var infinite = $(this).data("infinite");
      if(infinite && infinite.detachEvents) infinite.detachEvents();
    });
  }

}($);

/* global $:true */
+function ($) {
  "use strict";

  var ITEM_ON = "weui_bar_item_on";

  var showTab = function(a) {
    var $a = $(a);
    if($a.hasClass(ITEM_ON)) return;
    var href = $a.attr("href");

    if(!/^#/.test(href)) return ;

    $a.parent().find("."+ITEM_ON).removeClass(ITEM_ON);
    $a.addClass(ITEM_ON);

    var bd = $a.parents(".weui_tab").find(".weui_tab_bd");

    bd.find(".weui_tab_bd_item_active").removeClass("weui_tab_bd_item_active");

    $(href).addClass("weui_tab_bd_item_active");
  }

  $.showTab = showTab;

  $(document).on("click", ".weui_tabbar_item, .weui_navbar_item", function(e) {
    var $a = $(e.currentTarget);
    var href = $a.attr("href");
    if($a.hasClass(ITEM_ON)) return;
    if(!/^#/.test(href)) return;

    e.preventDefault();

    showTab($a);
  });

}($);


/* global $:true */
+ function($) {
  "use strict";

  $(document).on("click", ".weui_search_bar label", function(e) {
    $(e.target).parents(".weui_search_bar").addClass("weui_search_focusing");
  }) 
  .on("blur", ".weui_search_input", function(e) {
    var $input = $(e.target);
    if(!$input.val()) $input.parents(".weui_search_bar").removeClass("weui_search_focusing");
  })
  .on("click", ".weui_search_cancel", function(e) {
    var $input = $(e.target).parents(".weui_search_bar").find(".weui_search_input").val("").blur();
  })
  .on("click", ".weui_icon_clear", function(e) {
    var $input = $(e.target).parents(".weui_search_bar").find(".weui_search_input").val("").focus();
  });

}($);

/*===========================
Device/OS Detection
===========================*/
/* global $:true */
;(function ($) {
    "use strict";
    var device = {};
    var ua = navigator.userAgent;

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
    
    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
        device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
        
    // Minimal UI
    if (device.os && device.os === 'ios') {
        var osVersionArr = device.osVersion.split('.');
        device.minimalUi = !device.webView &&
                            (ipod || iphone) &&
                            (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                            $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
    }

    // Check for status bar and fullscreen app mode
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    device.statusBar = false;
    if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
        device.statusBar = true;
    }
    else {
        device.statusBar = false;
    }

    // Classes
    var classNames = [];

    // Pixel Ratio
    device.pixelRatio = window.devicePixelRatio || 1;
    classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
    if (device.pixelRatio >= 2) {
        classNames.push('retina');
    }

    // OS classes
    if (device.os) {
        classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
        if (device.os === 'ios') {
            var major = parseInt(device.osVersion.split('.')[0], 10);
            for (var i = major - 1; i >= 6; i--) {
                classNames.push('ios-gt-' + i);
            }
        }
        
    }
    // Status bar classes
    if (device.statusBar) {
        classNames.push('with-statusbar-overlay');
    }
    else {
        $('html').removeClass('with-statusbar-overlay');
    }

    // Add html classes
    if (classNames.length > 0) $('html').addClass(classNames.join(' '));

    $.device = device;
})($);

/*======================================================
************   Picker   ************
======================================================*/
/* global $:true */
/* jshint unused:false */
/* jshint multistr:true */
+ function($) {
  "use strict";
  var Picker = function (params) {
      var p = this;
      var defaults = {
          updateValuesOnMomentum: false,
          updateValuesOnTouchmove: true,
          rotateEffect: false,
          momentumRatio: 7,
          freeMode: false,
          // Common settings
          scrollToInput: true,
          inputReadOnly: true,
          toolbar: true,
          toolbarCloseText: '完成',
          title: '请选择',
          toolbarTemplate: '<div class="toolbar">\
          <div class="toolbar-inner">\
          <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>\
          <h1 class="title">{{title}}</h1>\
          </div>\
          </div>',
      };
      params = params || {};
      for (var def in defaults) {
          if (typeof params[def] === 'undefined') {
              params[def] = defaults[def];
          }
      }
      p.params = params;
      p.cols = [];
      p.initialized = false;
      
      // Inline flag
      p.inline = p.params.container ? true : false;

      // 3D Transforms origin bug, only on safari
      var originBug = $.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !$.device.android;

      // Should be converted to popover
      function isPopover() {
          var toPopover = false;
          if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
          if (!p.inline && p.params.input) {
              if (p.params.onlyInPopover) toPopover = true;
              else {
                  if ($.device.ios) {
                      toPopover = $.device.ipad ? true : false;
                  }
                  else {
                      if ($(window).width() >= 768) toPopover = true;
                  }
              }
          } 
          return toPopover; 
      }
      function inPopover() {
          if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
          else return false;
      }

      // Value
      p.setValue = function (arrValues, transition) {
          var valueIndex = 0;
          for (var i = 0; i < p.cols.length; i++) {
              if (p.cols[i] && !p.cols[i].divider) {
                  p.cols[i].setValue(arrValues[valueIndex], transition);
                  valueIndex++;
              }
          }
      };
      p.updateValue = function () {
          var newValue = [];
          var newDisplayValue = [];
          for (var i = 0; i < p.cols.length; i++) {
              if (!p.cols[i].divider) {
                  newValue.push(p.cols[i].value);
                  newDisplayValue.push(p.cols[i].displayValue);
              }
          }
          if (newValue.indexOf(undefined) >= 0) {
              return;
          }
          p.value = newValue;
          p.displayValue = newDisplayValue;
          if (p.params.onChange) {
              p.params.onChange(p, p.value, p.displayValue);
          }
          if (p.input && p.input.length > 0) {
              $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
              $(p.input).trigger('change');
          }
      };

      // Columns Handlers
      p.initPickerCol = function (colElement, updateItems) {
          var colContainer = $(colElement);
          var colIndex = colContainer.index();
          var col = p.cols[colIndex];
          if (col.divider) return;
          col.container = colContainer;
          col.wrapper = col.container.find('.picker-items-col-wrapper');
          col.items = col.wrapper.find('.picker-item');
          
          var i, j;
          var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
          col.replaceValues = function (values, displayValues) {
              col.destroyEvents();
              col.values = values;
              col.displayValues = displayValues;
              var newItemsHTML = p.columnHTML(col, true);
              col.wrapper.html(newItemsHTML);
              col.items = col.wrapper.find('.picker-item');
              col.calcSize();
              col.setValue(col.values[0], 0, true);
              col.initEvents();
          };
          col.calcSize = function () {
              if (p.params.rotateEffect) {
                  col.container.removeClass('picker-items-col-absolute');
                  if (!col.width) col.container.css({width:''});
              }
              var colWidth, colHeight;
              colWidth = 0;
              colHeight = col.container[0].offsetHeight;
              wrapperHeight = col.wrapper[0].offsetHeight;
              itemHeight = col.items[0].offsetHeight;
              itemsHeight = itemHeight * col.items.length;
              minTranslate = colHeight / 2 - itemsHeight + itemHeight / 2;
              maxTranslate = colHeight / 2 - itemHeight / 2;    
              if (col.width) {
                  colWidth = col.width;
                  if (parseInt(colWidth, 10) === colWidth) colWidth = colWidth + 'px';
                  col.container.css({width: colWidth});
              }
              if (p.params.rotateEffect) {
                  if (!col.width) {
                      col.items.each(function () {
                          var item = $(this);
                          item.css({width:'auto'});
                          colWidth = Math.max(colWidth, item[0].offsetWidth);
                          item.css({width:''});
                      });
                      col.container.css({width: (colWidth + 2) + 'px'});
                  }
                  col.container.addClass('picker-items-col-absolute');
              }
          };
          col.calcSize();
          
          col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);


          var activeIndex = 0;
          var animationFrameId;

          // Set Value Function
          col.setValue = function (newValue, transition, valueCallbacks) {
              if (typeof transition === 'undefined') transition = '';
              var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
              if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                  return;
              }
              var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
              // Update wrapper
              col.wrapper.transition(transition);
              col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
                  
              // Watch items
              if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
                  $.cancelAnimationFrame(animationFrameId);
                  col.wrapper.transitionEnd(function(){
                      $.cancelAnimationFrame(animationFrameId);
                  });
                  updateDuringScroll();
              }

              // Update items
              col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
          };

          col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
              if (typeof translate === 'undefined') {
                  translate = $.getTranslate(col.wrapper[0], 'y');
              }
              if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
              if (activeIndex < 0) activeIndex = 0;
              if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
              var previousActiveIndex = col.activeIndex;
              col.activeIndex = activeIndex;
              /*
              col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');

              col.items.transition(transition);
              var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
              var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
              var nextItems = selectedItem.nextAll().addClass('picker-after-selected');
              */
              //去掉 .picker-after-selected, .picker-before-selected 以提高性能
              col.wrapper.find('.picker-selected').removeClass('picker-selected');
              if (p.params.rotateEffect) {
                col.items.transition(transition);
              }
              var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');

              if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                  // Update values
                  col.value = selectedItem.attr('data-picker-value');
                  col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                  // On change callback
                  if (previousActiveIndex !== activeIndex) {
                      if (col.onChange) {
                          col.onChange(p, col.value, col.displayValue);
                      }
                      p.updateValue();
                  }
              }
                  
              // Set 3D rotate effect
              if (!p.params.rotateEffect) {
                  return;
              }
              var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
              
              col.items.each(function () {
                  var item = $(this);
                  var itemOffsetTop = item.index() * itemHeight;
                  var translateOffset = maxTranslate - translate;
                  var itemOffset = itemOffsetTop - translateOffset;
                  var percentage = itemOffset / itemHeight;

                  var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                  
                  var angle = (-18*percentage);
                  if (angle > 180) angle = 180;
                  if (angle < -180) angle = -180;
                  // Far class
                  if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                  else item.removeClass('picker-item-far');
                  // Set transform
                  item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -110 : 0) + 'px) rotateX(' + angle + 'deg)');
              });
          };

          function updateDuringScroll() {
              animationFrameId = $.requestAnimationFrame(function () {
                  col.updateItems(undefined, undefined, 0);
                  updateDuringScroll();
              });
          }

          // Update items on init
          if (updateItems) col.updateItems(0, maxTranslate, 0);

          var allowItemClick = true;
          var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
          function handleTouchStart (e) {
              if (isMoved || isTouched) return;
              e.preventDefault();
              isTouched = true;
              var position = $.getTouchPosition(e);
              touchStartY = touchCurrentY = position.y;
              touchStartTime = (new Date()).getTime();
              
              allowItemClick = true;
              startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
          }
          function handleTouchMove (e) {
              if (!isTouched) return;
              e.preventDefault();
              allowItemClick = false;
              var position = $.getTouchPosition(e);
              touchCurrentY = position.y;
              if (!isMoved) {
                  // First move
                  $.cancelAnimationFrame(animationFrameId);
                  isMoved = true;
                  startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                  col.wrapper.transition(0);
              }
              e.preventDefault();

              var diff = touchCurrentY - touchStartY;
              currentTranslate = startTranslate + diff;
              returnTo = undefined;

              // Normalize translate
              if (currentTranslate < minTranslate) {
                  currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                  returnTo = 'min';
              }
              if (currentTranslate > maxTranslate) {
                  currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                  returnTo = 'max';
              }
              // Transform wrapper
              col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

              // Update items
              col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
              
              // Calc velocity
              velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
              velocityTime = (new Date()).getTime();
              prevTranslate = currentTranslate;
          }
          function handleTouchEnd (e) {
              if (!isTouched || !isMoved) {
                  isTouched = isMoved = false;
                  return;
              }
              isTouched = isMoved = false;
              col.wrapper.transition('');
              if (returnTo) {
                  if (returnTo === 'min') {
                      col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                  }
                  else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
              }
              touchEndTime = new Date().getTime();
              var velocity, newTranslate;
              if (touchEndTime - touchStartTime > 300) {
                  newTranslate = currentTranslate;
              }
              else {
                  velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                  newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
              }

              newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

              // Active Index
              var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

              // Normalize translate
              if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

              // Transform wrapper
              col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');

              // Update items
              col.updateItems(activeIndex, newTranslate, '', true);

              // Watch items
              if (p.params.updateValuesOnMomentum) {
                  updateDuringScroll();
                  col.wrapper.transitionEnd(function(){
                      $.cancelAnimationFrame(animationFrameId);
                  });
              }

              // Allow click
              setTimeout(function () {
                  allowItemClick = true;
              }, 100);
          }

          function handleClick(e) {
              if (!allowItemClick) return;
              $.cancelAnimationFrame(animationFrameId);
              /*jshint validthis:true */
              var value = $(this).attr('data-picker-value');
              col.setValue(value);
          }

          col.initEvents = function (detach) {
              var method = detach ? 'off' : 'on';
              col.container[method]($.touchEvents.start, handleTouchStart);
              col.container[method]($.touchEvents.move, handleTouchMove);
              col.container[method]($.touchEvents.end, handleTouchEnd);
              col.items[method]('click', handleClick);
          };
          col.destroyEvents = function () {
              col.initEvents(true);
          };

          col.container[0].f7DestroyPickerCol = function () {
              col.destroyEvents();
          };

          col.initEvents();

      };
      p.destroyPickerCol = function (colContainer) {
          colContainer = $(colContainer);
          if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
      };
      // Resize cols
      function resizeCols() {
          if (!p.opened) return;
          for (var i = 0; i < p.cols.length; i++) {
              if (!p.cols[i].divider) {
                  p.cols[i].calcSize();
                  p.cols[i].setValue(p.cols[i].value, 0, false);
              }
          }
      }
      $(window).on('resize', resizeCols);

      // HTML Layout
      p.columnHTML = function (col, onlyItems) {
          var columnItemsHTML = '';
          var columnHTML = '';
          if (col.divider) {
              columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
          }
          else {
              for (var j = 0; j < col.values.length; j++) {
                  columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
              }
              columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
          }
          return onlyItems ? columnItemsHTML : columnHTML;
      };
      p.layout = function () {
          var pickerHTML = '';
          var pickerClass = '';
          var i;
          p.cols = [];
          var colsHTML = '';
          for (i = 0; i < p.params.cols.length; i++) {
              var col = p.params.cols[i];
              colsHTML += p.columnHTML(p.params.cols[i]);
              p.cols.push(col);
          }
          pickerClass = 'weui-picker-modal picker-columns ' + (p.params.cssClass || '') + (p.params.rotateEffect ? ' picker-3d' : '');
          pickerHTML =
              '<div class="' + (pickerClass) + '">' +
                  (p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{title}}/g, p.params.title) : '') +
                  '<div class="picker-modal-inner picker-items">' +
                      colsHTML +
                      '<div class="picker-center-highlight"></div>' +
                  '</div>' +
              '</div>';
              
          p.pickerHTML = pickerHTML;    
      };

      // Input Events
      function openOnInput(e) {
          e.preventDefault();
          if (p.opened) return;
          p.open();
          if (p.params.scrollToInput && !isPopover()) {
              var pageContent = p.input.parents('.content');
              if (pageContent.length === 0) return;

              var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                  paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                  pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                  pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                  newPaddingBottom;
              var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
              if (inputTop > pageHeight) {
                  var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                  if (scrollTop + pageHeight > pageScrollHeight) {
                      newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                      if (pageHeight === pageScrollHeight) {
                          newPaddingBottom = p.container.height();
                      }
                      pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                  }
                  pageContent.scrollTop(scrollTop, 300);
              }
          }
      }
      function closeOnHTMLClick(e) {
          if (inPopover()) return;
          if (p.input && p.input.length > 0) {
              if (e.target !== p.input[0] && $(e.target).parents('.weui-picker-modal').length === 0) p.close();
          }
          else {
              if ($(e.target).parents('.weui-picker-modal').length === 0) p.close();   
          }
      }

      if (p.params.input) {
          p.input = $(p.params.input);
          if (p.input.length > 0) {
              if (p.params.inputReadOnly) p.input.prop('readOnly', true);
              if (!p.inline) {
                  p.input.on('click', openOnInput);    
              }
              if (p.params.inputReadOnly) {
                  p.input.on('focus mousedown', function (e) {
                      e.preventDefault();
                  });
              }
          }
              
      }
      
      if (!p.inline) $('html').on('click', closeOnHTMLClick);

      // Open
      function onPickerClose() {
          p.opened = false;
          if (p.input && p.input.length > 0) p.input.parents('.page-content').css({'padding-bottom': ''});
          if (p.params.onClose) p.params.onClose(p);

          // Destroy events
          p.container.find('.picker-items-col').each(function () {
              p.destroyPickerCol(this);
          });
      }

      p.opened = false;
      p.open = function () {
          var toPopover = isPopover();

          if (!p.opened) {

              // Layout
              p.layout();

              // Append
              if (toPopover) {
                  p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                  p.popover = $.popover(p.pickerHTML, p.params.input, true);
                  p.container = $(p.popover).find('.weui-picker-modal');
                  $(p.popover).on('close', function () {
                      onPickerClose();
                  });
              }
              else if (p.inline) {
                  p.container = $(p.pickerHTML);
                  p.container.addClass('picker-modal-inline');
                  $(p.params.container).append(p.container);
              }
              else {
                  p.container = $($.openPicker(p.pickerHTML));
                  $(p.container)
                  .on('close', function () {
                      onPickerClose();
                  });
              }

              // Store picker instance
              p.container[0].f7Picker = p;

              // Init Events
              p.container.find('.picker-items-col').each(function () {
                  var updateItems = true;
                  if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                  p.initPickerCol(this, updateItems);
              });
              
              // Set value
              if (!p.initialized) {
                  if (p.params.value) {
                      p.setValue(p.params.value, 0);
                  }
              }
              else {
                  if (p.value) p.setValue(p.value, 0);
              }
          }

          // Set flag
          p.opened = true;
          p.initialized = true;

          if (p.params.onOpen) p.params.onOpen(p);
      };

      // Close
      p.close = function () {
          if (!p.opened || p.inline) return;
          if (inPopover()) {
              $.closePicker(p.popover);
              return;
          }
          else {
              $.closePicker(p.container);
              return;
          }
      };

      // Destroy
      p.destroy = function () {
          p.close();
          if (p.params.input && p.input.length > 0) {
              p.input.off('click focus', openOnInput);
          }
          $('html').off('click', closeOnHTMLClick);
          $(window).off('resize', resizeCols);
      };

      if (p.inline) {
          p.open();
      }

      return p;
  };

  $(document).on("click", ".close-picker", function() {
    var pickerToClose = $('.weui-picker-modal.weui-picker-modal-visible');
    if (pickerToClose.length > 0) {
      $.closePicker(pickerToClose);
    }
  });

  //修复picker会滚动页面的bug
  $(document).on($.touchEvents.move, ".picker-modal-inner", function(e) {
    e.preventDefault();
  });


  $.openPicker = function(tpl, className, callback) {

    if(typeof className === "function") {
      callback = className;
      className = undefined;
    }

    $.closePicker();

    var container = $("<div class='weui-picker-container "+ (className || "") + "'></div>").appendTo(document.body);
    container.show();

    container.addClass("weui-picker-container-visible");

    //关于布局的问题，如果直接放在body上，则做动画的时候会撑开body高度而导致滚动条变化。
    var dialog = $(tpl).appendTo(container);
    
    dialog.width(); //通过取一次CSS值，强制浏览器不能把上下两行代码合并执行，因为合并之后会导致无法出现动画。

    dialog.addClass("weui-picker-modal-visible");

    callback && container.on("close", callback);

    return dialog;
  }

  $.updatePicker = function(tpl) {
    var container = $(".weui-picker-container-visible");
    if(!container[0]) return false;

    container.html("");

    var dialog = $(tpl).appendTo(container);

    dialog.addClass("weui-picker-modal-visible");

    return dialog;
  }

  $.closePicker = function(container, callback) {
    if(typeof container === "function") callback = container;
    $(".weui-picker-modal-visible").removeClass("weui-picker-modal-visible").transitionEnd(function() {
      $(this).parent().remove();
      callback && callback();
    }).trigger("close");
  };

  $.fn.picker = function(params) {
    var args = arguments;
    return this.each(function() {
      if(!this) return;
      var $this = $(this);
      
      var picker = $this.data("picker");
      if(!picker) {
        params = params || {};
        var inputValue = $this.val();
        if(params.value === undefined && inputValue !== "") {
          params.value = params.cols.length > 1 ? inputValue.split(" ") : [inputValue];
        }
        var p = $.extend({input: this}, params);
        picker = new Picker(p);
        $this.data("picker", picker);
      }
      if(typeof params === typeof "a") {
        picker[params].apply(picker, Array.prototype.slice.call(args, 1));
      }
    });
  };
}($);

/* global $:true */
+ function($) {
  "use strict";

  var defaults;

  var Select = function(input, config) {

    var self = this;
    this.config = config;

    this.$input = $(input);
    this.$input.prop("readOnly", true);

    this.initConfig();

    config = this.config;

    this.$input.click($.proxy(this.open, this));

  }

  Select.prototype.initConfig = function() {
    this.config = $.extend({}, defaults, this.config);

    var config = this.config;

    if(!config.items || !config.items.length) return;

    config.items = config.items.map(function(d, i) {
      if(typeof d == typeof "a") {
        return {
          title: d,
          value: d
        };
      }

      return d;
    });


    this.tpl = $.t7.compile("<div class='weui-picker-modal weui-select-modal'>" + config.toolbarTemplate + (config.multi ? config.checkboxTemplate : config.radioTemplate) + "</div>");

    if(config.input !== undefined) this.$input.val(config.input);

    this.parseInitValue();
  }

  Select.prototype.updateInputValue = function(values, titles) {
    var v, t;
    if(this.config.multi) {
      v = values.join(this.config.split);
      t = titles.join(this.config.split);
    } else {
      v = values[0];
      t = titles[0];
    }

    this.$input.val(t).data("values", v);
    this.$input.attr("value", t).attr("data-values", v);

    var data = {
      values: v,
      titles: t
    };
    this.$input.trigger("change", data);
    this.config.onChange && this.config.onChange.call(this, data);
  }

  Select.prototype.parseInitValue = function() {
    var value = this.$input.val();
    var items = this.config.items;
    if(value === undefined || value == null || value === "") return;

    var titles = this.config.multi ? value.split(this.config.split) : [value];
    for(var i=0;i<items.length;i++) {
      items[i].checked = false;
      for(var j=0;j<titles.length;j++) {
        if(items[i].title === titles[j]) {
          items[i].checked = true;
        }
      }
    }
  }


  //更新数据
  Select.prototype.update = function(config) {
    this.config = $.extend({}, this.config, config);
    this.initConfig();
    if(this._open) {
      $.updatePicker(this.getHTML());
    }
  }
  
  Select.prototype.open = function(values, titles) {

    if(this._open) return;

    this.parseInitValue();

    var config = this.config;

    var dialog = this.dialog = $.openPicker(this.getHTML(), $.proxy(this.onClose, this));

    var self = this;

    dialog.on("change", function(e) {
      var checked = dialog.find("input:checked");
      var values = checked.map(function() {
        return $(this).val();
      });
      var titles = checked.map(function() {
        return $(this).data("title");
      });
      self.updateInputValue(values, titles);

      if(config.autoClose && !config.multi) $.closePicker();
    });

    this._open = true;
    if(config.onOpen) config.onOpen(this);
  }
  Select.prototype.close = function(callback) {
    var self = this;
    $.closePicker(function() {
      self.onClose();
      callback && callback();
    });
  }

  Select.prototype.onClose = function() {
    this._open = false;
    if(this.config.onClose) this.config.onClose(this);
  }

  Select.prototype.getHTML = function(callback) {
    var config = this.config;
    return this.tpl({
      items: config.items,
      title: config.title,
      closeText: config.closeText
    })
  }


  $.fn.select = function(params, args) {

    return this.each(function() {
      var $this = $(this);
      if(!$this.data("weui-select")) $this.data("weui-select", new Select(this, params));

      var select = $this.data("weui-select");

      if(typeof params === typeof "a") select[params].call(select, args);

      return select;
    });
  }

  defaults = $.fn.select.prototype.defaults = {
    items: [],
    input: undefined, //输入框的初始值
    title: "请选择",
    multi: false,
    closeText: "关闭",
    autoClose: true, //是否选择完成后自动关闭，只有单选模式下才有效
    onChange: undefined, //function
    onClose: undefined, //function
    onOpen: undefined, //function
    split: ",",  //多选模式下的分隔符
    toolbarTemplate: '<div class="toolbar">\
      <div class="toolbar-inner">\
      <a href="javascript:;" class="picker-button close-picker">{{closeText}}</a>\
      <h1 class="title">{{title}}</h1>\
      </div>\
      </div>',
    radioTemplate:
      '<div class="weui_cells weui_cells_radio">\
        {{#items}}\
        <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">\
          <div class="weui_cell_bd weui_cell_primary">\
            <p>{{this.title}}</p>\
          </div>\
          <div class="weui_cell_ft">\
            <input type="radio" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}">\
            <span class="weui_icon_checked"></span>\
          </div>\
        </label>\
        {{/items}}\
      </div>',
    checkboxTemplate:
      '<div class="weui_cells weui_cells_checkbox">\
        {{#items}}\
        <label class="weui_cell weui_check_label" for="weui-select-id-{{this.title}}">\
          <div class="weui_cell_bd weui_cell_primary">\
            <p>{{this.title}}</p>\
          </div>\
          <div class="weui_cell_ft">\
            <input type="checkbox" class="weui_check" name="weui-select" id="weui-select-id-{{this.title}}" value="{{this.value}}" {{#if this.checked}}checked="checked"{{/if}} data-title="{{this.title}}" >\
            <span class="weui_icon_checked"></span>\
          </div>\
        </label>\
        {{/items}}\
      </div>',
  }

}($);

/*======================================================
************   Calendar   ************
======================================================*/
/* global $:true */
/*jshint unused: false*/
+function ($) {
  "use strict";
  var rtl = false;
  var defaults;
  var Calendar = function (params) {
      var p = this;
      params = params || {};
      for (var def in defaults) {
          if (typeof params[def] === 'undefined') {
              params[def] = defaults[def];
          }
      }
      p.params = params;
      p.initialized = false;

      // Inline flag
      p.inline = p.params.container ? true : false;

      // Is horizontal
      p.isH = p.params.direction === 'horizontal';

      // RTL inverter
      var inverter = p.isH ? (rtl ? -1 : 1) : 1;

      // Animating flag
      p.animating = false;

      // Should be converted to popover
      function isPopover() {
          var toPopover = false;
          if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
          if (!p.inline && p.params.input) {
              if (p.params.onlyInPopover) toPopover = true;
              else {
                  if ($.device.ios) {
                      toPopover = $.device.ipad ? true : false;
                  }
                  else {
                      if ($(window).width() >= 768) toPopover = true;
                  }
              }
          } 
          return toPopover; 
      }
      function inPopover() {
          if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
          else return false;
      }

      // Format date
      function formatDate(date) {
          date = new Date(date);
          var year = date.getFullYear();
          var month = date.getMonth();
          var month1 = month + 1;
          var day = date.getDate();
          var weekDay = date.getDay();
          return p.params.dateFormat
              .replace(/yyyy/g, year)
              .replace(/yy/g, (year + '').substring(2))
              .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
              .replace(/m/g, month1)
              .replace(/MM/g, p.params.monthNames[month])
              .replace(/M/g, p.params.monthNamesShort[month])
              .replace(/dd/g, day < 10 ? '0' + day : day)
              .replace(/d/g, day)
              .replace(/DD/g, p.params.dayNames[weekDay])
              .replace(/D/g, p.params.dayNamesShort[weekDay]);
      }


      // Value
      p.addValue = function (value) {
          if (p.params.multiple) {
              if (!p.value) p.value = [];
              var inValuesIndex;
              for (var i = 0; i < p.value.length; i++) {
                  if (new Date(value).getTime() === new Date(p.value[i]).getTime()) {
                      inValuesIndex = i;
                  }
              }
              if (typeof inValuesIndex === 'undefined') {
                  p.value.push(value);
              }
              else {
                  p.value.splice(inValuesIndex, 1);
              }
              p.updateValue();
          }
          else {
              p.value = [value];
              p.updateValue();
          }
      };
      p.setValue = function (arrValues) {
          p.value = arrValues;
          p.updateValue();   
      };
      p.updateValue = function () {
          p.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
          var i, inputValue;
          for (i = 0; i < p.value.length; i++) {
              var valueDate = new Date(p.value[i]);
              p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
          }
          if (p.params.onChange) {
              p.params.onChange(p, p.value, p.value.map(formatDate));
          }
          if (p.input && p.input.length > 0) {
              if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);
              else {
                  inputValue = [];
                  for (i = 0; i < p.value.length; i++) {
                      inputValue.push(formatDate(p.value[i]));
                  }
                  inputValue = inputValue.join(', ');
              } 
              $(p.input).val(inputValue);
              $(p.input).trigger('change');
          }
      };

      // Columns Handlers
      p.initCalendarEvents = function () {
          var col;
          var allowItemClick = true;
          var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
          function handleTouchStart (e) {
              if (isMoved || isTouched) return;
              // e.preventDefault();
              isTouched = true;
              var position = $.getTouchPosition(e);
              touchStartX = touchCurrentY = position.x;
              touchStartY = touchCurrentY = position.y;
              touchStartTime = (new Date()).getTime();
              percentage = 0;
              allowItemClick = true;
              isScrolling = undefined;
              startTranslate = currentTranslate = p.monthsTranslate;
          }
          function handleTouchMove (e) {
              if (!isTouched) return;
              var position = $.getTouchPosition(e);
              touchCurrentX = position.x;
              touchCurrentY = position.y;
              if (typeof isScrolling === 'undefined') {
                  isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
              }
              if (p.isH && isScrolling) {
                  isTouched = false;
                  return;
              }
              e.preventDefault();
              if (p.animating) {
                  isTouched = false;
                  return;   
              }
              allowItemClick = false;
              if (!isMoved) {
                  // First move
                  isMoved = true;
                  wrapperWidth = p.wrapper[0].offsetWidth;
                  wrapperHeight = p.wrapper[0].offsetHeight;
                  p.wrapper.transition(0);
              }
              e.preventDefault();

              touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
              percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
              currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;

              // Transform wrapper
              p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');

          }
          function handleTouchEnd (e) {
              if (!isTouched || !isMoved) {
                  isTouched = isMoved = false;
                  return;
              }
              isTouched = isMoved = false;
              
              touchEndTime = new Date().getTime();
              if (touchEndTime - touchStartTime < 300) {
                  if (Math.abs(touchesDiff) < 10) {
                      p.resetMonth();
                  }
                  else if (touchesDiff >= 10) {
                      if (rtl) p.nextMonth();
                      else p.prevMonth();
                  }
                  else {
                      if (rtl) p.prevMonth();
                      else p.nextMonth();   
                  }
              }
              else {
                  if (percentage <= -0.5) {
                      if (rtl) p.prevMonth();
                      else p.nextMonth();
                  }
                  else if (percentage >= 0.5) {
                      if (rtl) p.nextMonth();
                      else p.prevMonth();
                  }
                  else {
                      p.resetMonth();
                  }
              }

              // Allow click
              setTimeout(function () {
                  allowItemClick = true;
              }, 100);
          }

          function handleDayClick(e) {
              if (!allowItemClick) return;
              var day = $(e.target).parents('.picker-calendar-day');
              if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
                  day = $(e.target);
              }
              if (day.length === 0) return;
              if (day.hasClass('picker-calendar-day-selected') && !p.params.multiple) return;
              if (day.hasClass('picker-calendar-day-disabled')) return;
              if (day.hasClass('picker-calendar-day-next')) p.nextMonth();
              if (day.hasClass('picker-calendar-day-prev')) p.prevMonth();
              var dateYear = day.attr('data-year');
              var dateMonth = day.attr('data-month');
              var dateDay = day.attr('data-day');
              if (p.params.onDayClick) {
                  p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
              }
              p.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
              if (p.params.closeOnSelect) p.close();
          }

          p.container.find('.picker-calendar-prev-month').on('click', p.prevMonth);
          p.container.find('.picker-calendar-next-month').on('click', p.nextMonth);
          p.container.find('.picker-calendar-prev-year').on('click', p.prevYear);
          p.container.find('.picker-calendar-next-year').on('click', p.nextYear);
          p.wrapper.on('click', handleDayClick);
          if (p.params.touchMove) {
              p.wrapper.on($.touchEvents.start, handleTouchStart);
              p.wrapper.on($.touchEvents.move, handleTouchMove);
              p.wrapper.on($.touchEvents.end, handleTouchEnd);
          }
              
          p.container[0].f7DestroyCalendarEvents = function () {
              p.container.find('.picker-calendar-prev-month').off('click', p.prevMonth);
              p.container.find('.picker-calendar-next-month').off('click', p.nextMonth);
              p.container.find('.picker-calendar-prev-year').off('click', p.prevYear);
              p.container.find('.picker-calendar-next-year').off('click', p.nextYear);
              p.wrapper.off('click', handleDayClick);
              if (p.params.touchMove) {
                  p.wrapper.off($.touchEvents.start, handleTouchStart);
                  p.wrapper.off($.touchEvents.move, handleTouchMove);
                  p.wrapper.off($.touchEvents.end, handleTouchEnd);
              }
          };
          

      };
      p.destroyCalendarEvents = function (colContainer) {
          if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
      };

      // Calendar Methods
      p.daysInMonth = function (date) {
          var d = new Date(date);
          return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      };
      p.monthHTML = function (date, offset) {
          date = new Date(date);
          var year = date.getFullYear(),
              month = date.getMonth(),
              day = date.getDate();
          if (offset === 'next') {
              if (month === 11) date = new Date(year + 1, 0);
              else date = new Date(year, month + 1, 1);
          }
          if (offset === 'prev') {
              if (month === 0) date = new Date(year - 1, 11);
              else date = new Date(year, month - 1, 1);
          }
          if (offset === 'next' || offset === 'prev') {
              month = date.getMonth();
              year = date.getFullYear();
          }
          var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
              daysInMonth = p.daysInMonth(date),
              firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
          if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;
          
          var dayDate, currentValues = [], i, j,
              rows = 6, cols = 7,
              monthHTML = '',
              dayIndex = 0 + (p.params.firstDay - 1),    
              today = new Date().setHours(0,0,0,0),
              minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
              maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null;

          if (p.value && p.value.length) {
              for (i = 0; i < p.value.length; i++) {
                  currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
              }
          }
              
          for (i = 1; i <= rows; i++) {
              var rowHTML = '';
              var row = i;
              for (j = 1; j <= cols; j++) {
                  var col = j;
                  dayIndex ++;
                  var dayNumber = dayIndex - firstDayOfMonthIndex;
                  var addClass = '';
                  if (dayNumber < 0) {
                      dayNumber = daysInPrevMonth + dayNumber + 1;
                      addClass += ' picker-calendar-day-prev';
                      dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
                  }
                  else {
                      dayNumber = dayNumber + 1;
                      if (dayNumber > daysInMonth) {
                          dayNumber = dayNumber - daysInMonth;
                          addClass += ' picker-calendar-day-next';
                          dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
                      }
                      else {
                          dayDate = new Date(year, month, dayNumber).getTime();    
                      }
                  }
                  // Today
                  if (dayDate === today) addClass += ' picker-calendar-day-today';
                  // Selected
                  if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
                  // Weekend
                  if (p.params.weekendDays.indexOf(col - 1) >= 0) {
                      addClass += ' picker-calendar-day-weekend';
                  }
                  // Disabled
                  if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                      addClass += ' picker-calendar-day-disabled';   
                  }

                  dayDate = new Date(dayDate);
                  var dayYear = dayDate.getFullYear();
                  var dayMonth = dayDate.getMonth();
                  rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>'+dayNumber+'</span></div>';
              }
              monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
          }
          monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
          return monthHTML;
      };
      p.animating = false;
      p.updateCurrentMonthYear = function (dir) {
          if (typeof dir === 'undefined') {
              p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
              p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);   
          }
          else {
              p.currentMonth = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-month'), 10);
              p.currentYear = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-year'), 10);
          }
          p.container.find('.current-month-value').text(p.params.monthNames[p.currentMonth]);
          p.container.find('.current-year-value').text(p.currentYear);
              
      };
      p.onMonthChangeStart = function (dir) {
          p.updateCurrentMonthYear(dir);
          p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
          var currentIndex = dir === 'next' ? p.months.length - 1 : 0;

          p.months.eq(currentIndex).addClass('picker-calendar-month-current');
          p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');

          if (p.params.onMonthYearChangeStart) {
              p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
          }
      };
      p.onMonthChangeEnd = function (dir, rebuildBoth) {
          p.animating = false;
          var nextMonthHTML, prevMonthHTML, newMonthHTML;
          p.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();
          
          if (typeof dir === 'undefined') {
              dir = 'next';
              rebuildBoth = true;
          }
          if (!rebuildBoth) {
              newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
          }
          else {
              p.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
              prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
              nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
          }
          if (dir === 'next' || rebuildBoth) {
              p.wrapper.append(newMonthHTML || nextMonthHTML);
          }
          if (dir === 'prev' || rebuildBoth) {
              p.wrapper.prepend(newMonthHTML || prevMonthHTML);
          }
          p.months = p.wrapper.find('.picker-calendar-month');
          p.setMonthsTranslate(p.monthsTranslate);
          if (p.params.onMonthAdd) {
              p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
          }
          if (p.params.onMonthYearChangeEnd) {
              p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
          }
      };
      p.setMonthsTranslate = function (translate) {
          translate = translate || p.monthsTranslate || 0;
          if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
          p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
          var prevMonthTranslate = -(translate + 1) * 100 * inverter;
          var currentMonthTranslate = -translate * 100 * inverter;
          var nextMonthTranslate = -(translate - 1) * 100 * inverter;
          p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
          p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('picker-calendar-month-current');
          p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
      };
      p.nextMonth = function (transition) {
          if (typeof transition === 'undefined' || typeof transition === 'object') {
              transition = '';
              if (!p.params.animate) transition = 0;
          }
          var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
          var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
          var nextDate = new Date(nextYear, nextMonth);
          var nextDateTime = nextDate.getTime();
          var transitionEndCallback = p.animating ? false : true;
          if (p.params.maxDate) {
              if (nextDateTime > new Date(p.params.maxDate).getTime()) {
                  return p.resetMonth();
              }
          }
          p.monthsTranslate --;
          if (nextMonth === p.currentMonth) {
              var nextMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
              var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
              p.wrapper.append(nextMonthHTML[0]);
              p.months = p.wrapper.find('.picker-calendar-month');
              if (p.params.onMonthAdd) {
                  p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
              }
          }
          p.animating = true;
          p.onMonthChangeStart('next');
          var translate = (p.monthsTranslate * 100) * inverter;

          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
          if (transitionEndCallback) {
              p.wrapper.transitionEnd(function () {
                  p.onMonthChangeEnd('next');
              });
          }
          if (!p.params.animate) {
              p.onMonthChangeEnd('next');
          }
      };
      p.prevMonth = function (transition) {
          if (typeof transition === 'undefined' || typeof transition === 'object') {
              transition = '';
              if (!p.params.animate) transition = 0;
          }
          var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
          var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
          var prevDate = new Date(prevYear, prevMonth + 1, -1);
          var prevDateTime = prevDate.getTime();
          var transitionEndCallback = p.animating ? false : true;
          if (p.params.minDate) {
              if (prevDateTime < new Date(p.params.minDate).getTime()) {
                  return p.resetMonth();
              }
          }
          p.monthsTranslate ++;
          if (prevMonth === p.currentMonth) {
              var prevMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
              var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
              p.wrapper.prepend(prevMonthHTML[0]);
              p.months = p.wrapper.find('.picker-calendar-month');
              if (p.params.onMonthAdd) {
                  p.params.onMonthAdd(p, p.months.eq(0)[0]);
              }
          }
          p.animating = true;
          p.onMonthChangeStart('prev');
          var translate = (p.monthsTranslate * 100) * inverter;
          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
          if (transitionEndCallback) {
              p.wrapper.transitionEnd(function () {
                  p.onMonthChangeEnd('prev');
              });
          }
          if (!p.params.animate) {
              p.onMonthChangeEnd('prev');
          }
      };
      p.resetMonth = function (transition) {
          if (typeof transition === 'undefined') transition = '';
          var translate = (p.monthsTranslate * 100) * inverter;
          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
      };
      p.setYearMonth = function (year, month, transition) {
          if (typeof year === 'undefined') year = p.currentYear;
          if (typeof month === 'undefined') month = p.currentMonth;
          if (typeof transition === 'undefined' || typeof transition === 'object') {
              transition = '';
              if (!p.params.animate) transition = 0;
          }
          var targetDate;
          if (year < p.currentYear) {
              targetDate = new Date(year, month + 1, -1).getTime();
          }
          else {
              targetDate = new Date(year, month).getTime();
          }
          if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
              return false;
          }
          if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
              return false;
          }
          var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
          var dir = targetDate > currentDate ? 'next' : 'prev';
          var newMonthHTML = p.monthHTML(new Date(year, month));
          p.monthsTranslate = p.monthsTranslate || 0;
          var prevTranslate = p.monthsTranslate;
          var monthTranslate, wrapperTranslate;
          var transitionEndCallback = p.animating ? false : true;
          if (targetDate > currentDate) {
              // To next
              p.monthsTranslate --;
              if (!p.animating) p.months.eq(p.months.length - 1).remove();
              p.wrapper.append(newMonthHTML);
              p.months = p.wrapper.find('.picker-calendar-month');
              monthTranslate = -(prevTranslate - 1) * 100 * inverter;
              p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
          }
          else {
              // To prev
              p.monthsTranslate ++;
              if (!p.animating) p.months.eq(0).remove();
              p.wrapper.prepend(newMonthHTML);
              p.months = p.wrapper.find('.picker-calendar-month');
              monthTranslate = -(prevTranslate + 1) * 100 * inverter;
              p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
          }
          if (p.params.onMonthAdd) {
              p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
          }
          p.animating = true;
          p.onMonthChangeStart(dir);
          wrapperTranslate = (p.monthsTranslate * 100) * inverter;
          p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
          if (transitionEndCallback) {
             p.wrapper.transitionEnd(function () {
                  p.onMonthChangeEnd(dir, true);
              }); 
          }
          if (!p.params.animate) {
              p.onMonthChangeEnd(dir);
          }
      };
      p.nextYear = function () {
          p.setYearMonth(p.currentYear + 1);
      };
      p.prevYear = function () {
          p.setYearMonth(p.currentYear - 1);
      };
      

      // HTML Layout
      p.layout = function () {
          var pickerHTML = '';
          var pickerClass = '';
          var i;
          
          var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0,0,0,0);
          var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
          var currentMonthHTML = p.monthHTML(layoutDate);
          var nextMonthHTML = p.monthHTML(layoutDate, 'next');
          var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
          // Week days header
          var weekHeaderHTML = '';
          if (p.params.weekHeader) {
              for (i = 0; i < 7; i++) {
                  var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
                  var dayName = p.params.dayNamesShort[weekDayIndex];
                  weekHeaderHTML += '<div class="picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';
                  
              }
              weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
          }
          pickerClass = 'weui-picker-modal weui-picker-calendar ' + (p.params.cssClass || '');
          var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
          if (p.params.toolbar) {
              toolbarHTML = p.params.toolbarTemplate
                  .replace(/{{closeText}}/g, p.params.toolbarCloseText)
                  .replace(/{{monthPicker}}/g, (p.params.monthPicker ? p.params.monthPickerTemplate : ''))
                  .replace(/{{yearPicker}}/g, (p.params.yearPicker ? p.params.yearPickerTemplate : ''));
          }

          pickerHTML =
              '<div class="' + (pickerClass) + '">' +
                  toolbarHTML +
                  '<div class="picker-modal-inner">' +
                      weekHeaderHTML +
                      monthsHTML +
                  '</div>' +
              '</div>';
              
              
          p.pickerHTML = pickerHTML;    
      };

      // Input Events
      function openOnInput(e) {
          e.preventDefault();
          if (p.opened) return;
          p.open();
          if (p.params.scrollToInput && !isPopover()) {
              var pageContent = p.input.parents('.page-content');
              if (pageContent.length === 0) return;

              var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                  paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                  pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                  pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                  newPaddingBottom;

              var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
              if (inputTop > pageHeight) {
                  var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                  if (scrollTop + pageHeight > pageScrollHeight) {
                      newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                      if (pageHeight === pageScrollHeight) {
                          newPaddingBottom = p.container.height();
                      }
                      pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                  }
                  pageContent.scrollTop(scrollTop, 300);
              }
          }
      }
      function closeOnHTMLClick(e) {
          if (inPopover()) return;
          if (p.input && p.input.length > 0) {
              if (e.target !== p.input[0] && $(e.target).parents('.weui-picker-modal').length === 0) p.close();
          }
          else {
              if ($(e.target).parents('.weui-picker-modal').length === 0) p.close();   
          }
      }

      if (p.params.input) {
          p.input = $(p.params.input);
          if (p.input.length > 0) {
              if (p.params.inputReadOnly) p.input.prop('readOnly', true);
              if (!p.inline) {
                  p.input.on('click', openOnInput);    
              }
              if (p.params.inputReadOnly) {
                  p.input.on('focus mousedown', function (e) {
                      e.preventDefault();
                  });
              }
          }
              
      }
      
      //iphone 上无法正确触发 click，会导致点击外面无法关闭
      if (!p.inline) $(document).on('click touchend', closeOnHTMLClick);

      // Open
      function onPickerClose() {
          p.opened = false;
          if (p.input && p.input.length > 0) p.input.parents('.page-content').css({'padding-bottom': ''});
          if (p.params.onClose) p.params.onClose(p);

          // Destroy events
          p.destroyCalendarEvents();
      }

      p.opened = false;
      p.open = function () {
          var toPopover = isPopover() && false;
          var updateValue = false;
          if (!p.opened) {
              // Set date value
              if (!p.value) {
                  if (p.params.value) {
                      p.value = p.params.value;
                      updateValue = true;
                  }
              }

              // Layout
              p.layout();

              // Append
              if (toPopover) {
                  p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                  p.popover = $.popover(p.pickerHTML, p.params.input, true);
                  p.container = $(p.popover).find('.weui-picker-modal');
                  $(p.popover).on('close', function () {
                      onPickerClose();
                  });
              }
              else if (p.inline) {
                  p.container = $(p.pickerHTML);
                  p.container.addClass('picker-modal-inline');
                  $(p.params.container).append(p.container);
              }
              else {
                  p.container = $($.openPicker(p.pickerHTML));
                  $(p.container)
                  .on('close', function () {
                      onPickerClose();
                  });
              }

              // Store calendar instance
              p.container[0].f7Calendar = p;
              p.wrapper = p.container.find('.picker-calendar-months-wrapper');

              // Months
              p.months = p.wrapper.find('.picker-calendar-month');

              // Update current month and year
              p.updateCurrentMonthYear();

              // Set initial translate
              p.monthsTranslate = 0;
              p.setMonthsTranslate();

              // Init events
              p.initCalendarEvents();

              // Update input value
              if (updateValue) p.updateValue();
              
          }

          // Set flag
          p.opened = true;
          p.initialized = true;
          if (p.params.onMonthAdd) {
              p.months.each(function () {
                  p.params.onMonthAdd(p, this);
              });
          }
          if (p.params.onOpen) p.params.onOpen(p);
      };

      // Close
      p.close = function () {
          if (!p.opened || p.inline) return;
          p.animating = false;  //有可能还有动画没做完，因此animating设置还没改。
          if (inPopover()) {
              $.closePicker(p.popover);
              return;
          }
          else {
              $.closePicker(p.container);
              return;
          }
      };

      // Destroy
      p.destroy = function () {
          p.close();
          if (p.params.input && p.input.length > 0) {
              p.input.off('click focus', openOnInput);
          }
          $('html').off('click', closeOnHTMLClick);
      };

      if (p.inline) {
          p.open();
      }

      return p;
  };


  $.fn.calendar = function (params) {
      params = params || {};
      return this.each(function() {
        var $this = $(this);
        if(!$this[0]) return;
        var p = {};
        if($this[0].tagName.toUpperCase() === "INPUT") {
          p.input = $this;
        } else {
          p.container = $this;
        }
        //默认显示今天
        if(!params.value) {
          var today = new Date();
          params.value = [today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()];
        }
        new Calendar($.extend(p, params));
      });
  };

  defaults = $.fn.calendar.prototype.defaults = {
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    firstDay: 1, // First day of the week, Monday
    weekendDays: [0, 6], // Sunday and Saturday
    multiple: false,
    dateFormat: 'yyyy-mm-dd',
    direction: 'horizontal', // or 'vertical'
    minDate: null,
    maxDate: null,
    touchMove: true,
    animate: true,
    closeOnSelect: true,
    monthPicker: true,
    monthPickerTemplate: 
        '<div class="picker-calendar-month-picker">' +
            '<a href="javascript:;" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
            '<div class="current-month-value"></div>' +
            '<a href="javascript:;" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
        '</div>',
    yearPicker: true,
    yearPickerTemplate: 
        '<div class="picker-calendar-year-picker">' +
            '<a href="javascript:;" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
            '<span class="current-year-value"></span>' +
            '<a href="javascript:;" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
        '</div>',
    weekHeader: true,
    // Common settings
    scrollToInput: true,
    inputReadOnly: true,
    convertToPopover: true,
    onlyInPopover: false,
    toolbar: true,
    toolbarCloseText: 'Done',
    toolbarTemplate: 
        '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
                '{{yearPicker}}' +
                '{{monthPicker}}' +
                // '<a href="#" class="link close-picker">{{closeText}}</a>' +
            '</div>' +
        '</div>',
    /* Callbacks
    onMonthAdd
    onChange
    onOpen
    onClose
    onDayClick
    onMonthYearChangeStart
    onMonthYearChangeEnd
    */
  };

}($);

/* global $:true */
/* jshint unused:false*/

+ function($) {
  "use strict";


  var defaults;

  var Datetime = function(input, params) {
    this.input = $(input);
    this.params = params;

    this.initMonthes = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

    this.initYears = (function () {
      var arr = [];
      for (var i = 1950; i <= 2030; i++) { arr.push(i); }
      return arr;
    })();

    var p = $.extend({}, this.getConfig());
    $(this.input).picker(p);
  }

  Datetime.prototype = {
    getDays : function(max) {
      var days = [];
      for(var i=1; i<= (max||31);i++) {
        days.push(i < 10 ? "0"+i : i);
      }
      return days;
    },

    getDaysByMonthAndYear : function(month, year) {
      var int_d = new Date(year, parseInt(month)+1-1, 1);
      var d = new Date(int_d - 1);
      return this.getDays(d.getDate());
    },

    formatNumber : function (n) {
      return n < 10 ? "0" + n : n;
    },

    formatValue : function(values, displayValues) {
      var params = this.params;
      return values[0] + params.dateSplit + values[1] + params.dateSplit + values[2] + params.dateTimeSplit + values[3] + params.timeSplit + values[4];
    },
    stringToArray: function(value) {
      var params = this.params;
      var tokens = value.split(params.dateTimeSplit);
      var date = tokens[0],
          time = tokens[1];
      return [].concat(date.split(params.dateSplit), time ? time.split(params.timeSplit) : []);
    },
    arrayToDate: function(arr) {
      var params = this.params;
      if(arr.length === 3) return new Date(arr.join(params.dateSplit));
      var date = new Date(arr.slice(0, 3).join(params.dateSplit));
      //注意这种格式 "2012-12-12 12:12" 在ios上是错误的，如果用 "2012-12-12T12:12" 是对的，但是这个是标准时区而不是东八区，所以这里分别设置
      date.setHours(arr[3]);
      date.setMinutes(arr[4]);
      return date;
    },
    getConfig : function() {

      var today = new Date(),
          params = this.params,
          self = this,
          lastValidValues;

      var config = {
        rotateEffect: false,  //为了性能

        value: [today.getFullYear(), this.formatNumber(today.getMonth()+1), this.formatNumber(today.getDate()), this.formatNumber(today.getHours()), this.formatNumber(today.getMinutes())],

        onChange: function (picker, values, displayValues) {
          var cols = picker.cols;
          var days = self.getDaysByMonthAndYear(cols[1].value, cols[0].value);
          var currentValue = picker.cols[2].value;
          if(currentValue > days.length) currentValue = days.length;
          picker.cols[2].setValue(currentValue);

          //check min and max
          
          var current = self.arrayToDate(values);
          var valid = true;
          if(params.min) {
            var min = self.arrayToDate(self.stringToArray(typeof params.min === "function" ? params.min() : params.min));

            if(current < +min) {
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }
          if(params.max) {
            var max = self.arrayToDate(self.stringToArray(typeof params.max === "function" ? params.max() : params.max));
            if(current > +max) {
              picker.setValue(lastValidValues);
              valid = false;
            } 
          }

          valid && (lastValidValues = values);
        },

        formatValue: function (p, values, displayValues) {
          return self.formatValue(values, displayValues);
        },

        cols: [
          // Years
          {
            values: self.initYears
          },
          // Months
          {
            values: self.initMonthes
          },
          // Days
          {
            values: self.getDays()
          },

          // Space divider
          {
            divider: true,
            content: '  '
          },
          // Hours
          {
            values: (function () {
              var arr = [];
              for (var i = 0; i <= 23; i++) { arr.push(self.formatNumber(i)); }
              return arr;
            })(),
          },
          // Divider
          {
            divider: true,
            content: ':'
          },
          // Minutes
          {
            values: (function () {
              var arr = [];
              for (var i = 0; i <= 59; i++) { arr.push(self.formatNumber(i)); }
              return arr;
            })(),
          }
        ]
      };

      var inputValue = this.input.val();
      if(inputValue) config.value = this.stringToArray(inputValue);

      return config;
    }
  }

  $.fn.datetimePicker = function(params) {
    params = $.extend({}, defaults, params);
    return this.each(function() {
      if(!this) return;
      var $this = $(this);
      var datetime = $this.data("datetime");
      if(!datetime) $this.data("datetime", new Datetime(this, params));
      return datetime;
    });
  };

  defaults = $.fn.datetimePicker.prototype.defaults = {
    dateSplit: "-",
    timeSplit: ":",
    dateTimeSplit: " ",
    min: undefined,
    max: undefined
  }

}($);

/*======================================================
************   Picker   ************
======================================================*/
/* global $:true */

+ function($) {
  "use strict";


  //Popup 和 picker 之类的不要共用一个弹出方法，因为这样会导致 在 popup 中再弹出 picker 的时候会有问题。

  $.openPopup = function(popup, className) {

    $.closePopup();

    popup = $(popup);

    popup.addClass("weui-popup-container-visible");

    var modal = popup.find(".weui-popup-modal");

    modal.width();

    modal.addClass("weui-popup-modal-visible");

  }


  $.closePopup = function(container, remove) {
    $(".weui-popup-modal-visible").removeClass("weui-popup-modal-visible").transitionEnd(function() {
      $(this).parent().removeClass("weui-popup-container-visible");
      remove && $(this).parent().remove();
    }).trigger("close");
  };


  $(document).on("click", ".close-popup", function() {
    $.closePopup();
  });

  $(document).on("click", ".open-popup", function() {
    $($(this).data("target")).popup();
  });

  $.fn.popup = function() {
    return this.each(function() {
      $.openPopup(this);
    });
  };

}($);

/* ===============================================================================
************   Notification ************
=============================================================================== */
/* global $:true */
+function ($) {
  "use strict";

  var noti, defaults, timeout, start, diffX, diffY;

  var touchStart = function(e) {
    var p = $.getTouchPosition(e);
    start = p;
    diffX = diffY = 0;
    noti.addClass("touching");
  };
  var touchMove = function(e) {
    if(!start) return false;
    e.preventDefault();
    e.stopPropagation();
    var p = $.getTouchPosition(e);
    diffX = p.x - start.x;
    diffY = p.y - start.y;
    if(diffY > 0) {
      diffY = Math.sqrt(diffY);
    }

    noti.css("transform", "translate3d(0, "+diffY+"px, 0)");
  };
  var touchEnd = function() {
    noti.removeClass("touching");
    noti.attr("style", "");
    if(diffY < 0 && (Math.abs(diffY) > noti.height()*0.38)) {
      $.closeNotification();
    }

    if(Math.abs(diffX) <= 1 && Math.abs(diffY) <= 1) {
      noti.trigger("noti-click");
    }

    start = false;
  };

  var attachEvents = function(el) {
    el.on($.touchEvents.start, touchStart);
    el.on($.touchEvents.move, touchMove);
    el.on($.touchEvents.end, touchEnd);
  };

  $.notification = $.noti = function(params) {
    params = $.extend({}, defaults, params);
    noti = $(".notification");
    if(!noti[0]) { // create a new notification
      noti = $('<div class="notification"></div>').appendTo(document.body);
      attachEvents(noti);
    }

    noti.off("noti-click"); //the click event is not correct sometime: it will trigger when user is draging.
    if(params.onClick) noti.on("noti-click", function() {
      params.onClick(params.data);
    });

    noti.html($.t7.compile(params.tpl)(params));

    noti.show();

    noti.addClass("notification-in");
    noti.data("params", params);

    var startTimeout = function() {
      if(timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      timeout = setTimeout(function() {
        if(noti.hasClass("touching")) {
          startTimeout();
        } else {
          $.closeNotification();
        }
      }, params.time);
    };

    startTimeout();

  };

  $.closeNotification = function() {
    timeout && clearTimeout(timeout);
    timeout = null;
    var noti = $(".notification").removeClass("notification-in").transitionEnd(function() {
      $(this).remove();
    });

    if(noti[0]) {
      var params = $(".notification").data("params");
      if(params && params.onClose) {
        params.onClose(params.data);
      }
    }
  };

  defaults = $.noti.prototype.defaults = {
    title: undefined,
    text: undefined,
    media: undefined,
    time: 4000,
    onClick: undefined,
    onClose: undefined,
    data: undefined,
    tpl:  '<div class="notification-inner">' +
            '{{#if media}}<div class="notification-media">{{media}}</div>{{/if}}' +
            '<div class="notification-content">' +
            '{{#if title}}<div class="notification-title">{{title}}</div>{{/if}}' +
            '{{#if text}}<div class="notification-text">{{text}}</div>{{/if}}' +
            '</div>' +
            '<div class="notification-handle-bar"></div>' +
          '</div>'
  };

}($);

/* global $:true */
+ function($) {

  var defaults;

  var PhotoBrowser = function(config) {
    this.initConfig(config);
    this.index = 0;
  }

  PhotoBrowser.prototype.initConfig = function(config) {
    this.config = $.extend({}, defaults, config);

    this.config.items = this.config.items.map(function(d, i) {
      if(typeof d === typeof "a") {
        return {
          image: d,
          caption: ""
        }
      }
      return d;
    });

    this.tpl = $.t7.compile(this.config.tpl);
    if(this.config.autoOpen) this.open();
  }

  PhotoBrowser.prototype.getHTML = function() {
    return this.tpl(this.config);
  }

  PhotoBrowser.prototype.open = function() {
    if(this._open) return false;
    if(!this.modal) {
      this.modal = $(this.getHTML()).appendTo(document.body);
      this.swiperContainer = this.modal.find(".swiper-container");
      this.modal.click($.proxy(function() {
        this.close();
      }, this));
    }
    var swiperContainer = this.swiperContainer;
    this.modal.show();
    this.modal.height();
    this.modal.addClass("weui-photo-browser-modal-visible");
    swiperContainer.transitionEnd($.proxy(function() {
      swiperContainer.swiper({
        onSlideChangeEnd: $.proxy(this.onSlideChangeEnd, this)
      });
      this.onSlideChangeEnd(swiperContainer.data("swiper"));
    }, this));

    swiperContainer.addClass("swiper-container-visible");

    this._open = true;

    if(this.config.onOpen) this.config.onOpen.call(this);
  }

  PhotoBrowser.prototype.close = function() {
    this.swiperContainer.transitionEnd($.proxy(function() {
      this.modal.hide();
      this._open = false;
      if(this.config.onClose) this.config.onClose.call(this);
    }, this));
    this.swiperContainer.removeClass("swiper-container-visible");
    this.modal.removeClass("weui-photo-browser-modal-visible");
  }

  PhotoBrowser.prototype.onSlideChangeEnd = function(swiper) {
    var index = this.index = swiper.snapIndex;
    var next = swiper.container.find(".caption-item-"+index);

    if(next.hasClass("active")) return;

    var current = swiper.container.find(".caption-item.active").transitionEnd(function() {
      current.hide();
      next.show().addClass('active');
    });

    current.removeClass('active')

    if(!current[0]) {
      next.show().addClass('active');
    }

    if(this.config.onSlideChange) this.config.onSlideChange.call(this, index);

  }

  defaults = PhotoBrowser.prototype.defaults = {
    items: [],
    autoOpen: false, //初始化完成之后立刻打开
    onOpen: undefined,
    onClose: undefined,
    tpl: '<div class="weui-photo-browser-modal">\
            <div class="swiper-container">\
              <div class="swiper-wrapper">\
                {{#items}}\
                <div class="swiper-slide">\
                  <div class="photo-container">\
                    <img src="{{image}}" />\
                  </div>\
                </div>\
                {{/items}}\
              </div>\
              <div class="caption">\
                {{#items}}\
                <div class="caption-item caption-item-{{@index}}">{{caption}}</div>\
                {{/items}}\
              </div>\
              <div class="swiper-pagination"></div>\
            </div>\
          </div>'
  }

  $.photoBrowser = function(params) {
    return new PhotoBrowser(params);
  }

}($);
