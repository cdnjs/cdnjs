/*
Copyright 2014, modulex-date-picker@1.0.2
MIT Licensed
build time: Tue, 21 Oct 2014 07:14:53 GMT
*/
modulex.add("date-picker", ["xtemplate/runtime","util","event-dom/gesture/tap","node","component/control","gregorian-calendar-format","gregorian-calendar","i18n!date-picker","component/extension/shim","component/extension/align"], function(require, exports, module) {
var xtemplateRuntime = require("xtemplate/runtime");
var _util_ = require("util");
var eventDomGestureTap = require("event-dom/gesture/tap");
var node = require("node");
var componentControl = require("component/control");
var gregorianCalendarFormat = require("gregorian-calendar-format");
var gregorianCalendar = require("gregorian-calendar");
var i18nDatePicker = require("i18n!date-picker");
var componentExtensionShim = require("component/extension/shim");
var componentExtensionAlign = require("component/extension/align");
/*
combined modules:
date-picker
date-picker/month-panel
date-picker/year-panel
date-picker/decade-panel
date-picker/xtpl/decade-panel-render
date-picker/xtpl/decade-panel
date-picker/xtpl/decades
date-picker/xtpl/decades-render
date-picker/xtpl/years-render
date-picker/xtpl/years
date-picker/xtpl/year-panel-render
date-picker/xtpl/year-panel
date-picker/xtpl/months-render
date-picker/xtpl/months
date-picker/xtpl/month-panel-render
date-picker/xtpl/month-panel
date-picker/xtpl/picker-render
date-picker/xtpl/picker
date-picker/xtpl/popup-render
date-picker/xtpl/popup
*/
var datePickerXtplDecades, datePickerXtplDecadesRender, datePickerXtplYears, datePickerXtplYearPanel, datePickerXtplMonths, datePickerXtplMonthPanel, datePickerXtplPicker, datePickerXtplPopup, datePickerXtplDecadePanel, datePickerXtplYearsRender, datePickerXtplYearPanelRender, datePickerXtplMonthsRender, datePickerXtplMonthPanelRender, datePickerXtplPickerRender, datePickerXtplPopupRender, datePickerXtplDecadePanelRender, datePickerDecadePanel, datePickerYearPanel, datePickerMonthPanel, datePicker;
datePickerXtplDecades = function (exports) {
  var ret = exports = function decades(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    function func3(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n         ';
      pos.line = 7;
      var callRet4;
      callRet4 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['selected-cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet4);
      buffer.data += '\r\n        ';
      return buffer;
    }
    function func12(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n         ';
      pos.line = 10;
      var callRet13;
      callRet13 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['last-century-cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet13);
      buffer.data += '\r\n        ';
      return buffer;
    }
    function func17(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n         ';
      pos.line = 13;
      var callRet18;
      callRet18 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['next-century-cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet18);
      buffer.data += '\r\n        ';
      return buffer;
    }
    function func1(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n    <td role="gridcell"\r\n        class="';
      pos.line = 5;
      var callRet2;
      callRet2 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet2);
      buffer.data += '\r\n        ';
      pos.line = 6;
      pos.line = 6;
      var id5 = (t = affix.startDecade) !== undefined ? t : (t = data.startDecade) !== undefined ? t : scope.resolveLooseUp(['startDecade']);
      var exp7 = id5;
      var id6 = (t = affix.year) !== undefined ? t : (t = data.year) !== undefined ? t : scope.resolveLooseUp(['year']);
      exp7 = id5 <= id6;
      var exp11 = exp7;
      if (exp11) {
        var id8 = (t = affix.year) !== undefined ? t : (t = data.year) !== undefined ? t : scope.resolveLooseUp(['year']);
        var exp10 = id8;
        var id9 = (t = affix.endDecade) !== undefined ? t : (t = data.endDecade) !== undefined ? t : scope.resolveLooseUp(['endDecade']);
        exp10 = id8 <= id9;
        exp11 = exp10;
      }
      buffer = ifCommand.call(tpl, scope, {
        params: [exp11],
        fn: func3
      }, buffer);
      buffer.data += '\r\n        ';
      pos.line = 9;
      pos.line = 9;
      var id14 = (t = affix.startDecade) !== undefined ? t : (t = data.startDecade) !== undefined ? t : scope.resolveLooseUp(['startDecade']);
      var exp16 = id14;
      var id15 = (t = affix.startYear) !== undefined ? t : (t = data.startYear) !== undefined ? t : scope.resolveLooseUp(['startYear']);
      exp16 = id14 < id15;
      buffer = ifCommand.call(tpl, scope, {
        params: [exp16],
        fn: func12
      }, buffer);
      buffer.data += '\r\n        ';
      pos.line = 12;
      pos.line = 12;
      var id19 = (t = affix.endDecade) !== undefined ? t : (t = data.endDecade) !== undefined ? t : scope.resolveLooseUp(['endDecade']);
      var exp21 = id19;
      var id20 = (t = affix.endYear) !== undefined ? t : (t = data.endYear) !== undefined ? t : scope.resolveLooseUp(['endYear']);
      exp21 = id19 > id20;
      buffer = ifCommand.call(tpl, scope, {
        params: [exp21],
        fn: func17
      }, buffer);
      buffer.data += '\r\n        ">\r\n        <a hidefocus="on"\r\n           href="javascript:void(0)"\r\n           unselectable="on"\r\n           class="';
      pos.line = 19;
      var callRet22;
      callRet22 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['decade']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet22);
      buffer.data += '">\r\n            ';
      pos.line = 20;
      var id23 = (t = affix.startDecade) !== undefined ? t : (t = data.startDecade) !== undefined ? t : scope.resolveLooseUp(['startDecade']);
      buffer = buffer.writeEscaped(id23);
      buffer.data += '-';
      var id24 = (t = affix.endDecade) !== undefined ? t : (t = data.endDecade) !== undefined ? t : scope.resolveLooseUp(['endDecade']);
      buffer = buffer.writeEscaped(id24);
      buffer.data += '\r\n        </a>\r\n    </td>\r\n    ';
      return buffer;
    }
    function func0(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n<tr role="row">\r\n    ';
      pos.line = 3;
      pos.line = 3;
      var id26 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      var id25 = (t = affix.decades) !== undefined ? affix.decades[id26] : (t = data.decades) !== undefined ? t[id26] : scope.resolveLooseUp([
        'decades',
        id26
      ]);
      buffer = eachCommand.call(tpl, scope, {
        params: [id25],
        fn: func1
      }, buffer);
      buffer.data += '\r\n</tr>\r\n';
      return buffer;
    }
    buffer.data += '';
    pos.line = 1;
    pos.line = 1;
    var id27 = (t = affix.decades) !== undefined ? t : (t = data.decades) !== undefined ? t : scope.resolveLooseUp(['decades']);
    buffer = eachCommand.call(tpl, scope, {
      params: [id27],
      fn: func0
    }, buffer);
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplDecadesRender = function (exports) {
  var tpl = datePickerXtplDecades;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerXtplYears = function (exports) {
  var ret = exports = function years(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    function func4(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n         ';
      pos.line = 8;
      var callRet5;
      callRet5 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['selected-cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet5);
      buffer.data += '\r\n        ';
      return buffer;
    }
    function func9(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n         ';
      pos.line = 11;
      var callRet10;
      callRet10 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['last-decade-cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet10);
      buffer.data += '\r\n        ';
      return buffer;
    }
    function func14(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n         ';
      pos.line = 14;
      var callRet15;
      callRet15 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['next-decade-cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet15);
      buffer.data += '\r\n        ';
      return buffer;
    }
    function func1(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n    <td role="gridcell"\r\n        title="';
      pos.line = 5;
      var id2 = (t = affix.title) !== undefined ? t : (t = data.title) !== undefined ? t : scope.resolveLooseUp(['title']);
      buffer = buffer.writeEscaped(id2);
      buffer.data += '"\r\n        class="';
      pos.line = 6;
      var callRet3;
      callRet3 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet3);
      buffer.data += '\r\n        ';
      pos.line = 7;
      pos.line = 7;
      var id6 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
      var exp8 = id6;
      var id7 = (t = affix.year) !== undefined ? t : (t = data.year) !== undefined ? t : scope.resolveLooseUp(['year']);
      exp8 = id6 === id7;
      buffer = ifCommand.call(tpl, scope, {
        params: [exp8],
        fn: func4
      }, buffer);
      buffer.data += '\r\n        ';
      pos.line = 10;
      pos.line = 10;
      var id11 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
      var exp13 = id11;
      var id12 = (t = affix.startYear) !== undefined ? t : (t = data.startYear) !== undefined ? t : scope.resolveLooseUp(['startYear']);
      exp13 = id11 < id12;
      buffer = ifCommand.call(tpl, scope, {
        params: [exp13],
        fn: func9
      }, buffer);
      buffer.data += '\r\n        ';
      pos.line = 13;
      pos.line = 13;
      var id16 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
      var exp18 = id16;
      var id17 = (t = affix.endYear) !== undefined ? t : (t = data.endYear) !== undefined ? t : scope.resolveLooseUp(['endYear']);
      exp18 = id16 > id17;
      buffer = ifCommand.call(tpl, scope, {
        params: [exp18],
        fn: func14
      }, buffer);
      buffer.data += '\r\n        ">\r\n        <a hidefocus="on"\r\n           href="javascript:void(0)"\r\n           unselectable="on"\r\n           class="';
      pos.line = 20;
      var callRet19;
      callRet19 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['year']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet19);
      buffer.data += '">\r\n            ';
      pos.line = 21;
      var id20 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
      buffer = buffer.writeEscaped(id20);
      buffer.data += '\r\n        </a>\r\n    </td>\r\n    ';
      return buffer;
    }
    function func0(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n<tr role="row">\r\n    ';
      pos.line = 3;
      pos.line = 3;
      var id22 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      var id21 = (t = affix.years) !== undefined ? affix.years[id22] : (t = data.years) !== undefined ? t[id22] : scope.resolveLooseUp([
        'years',
        id22
      ]);
      buffer = eachCommand.call(tpl, scope, {
        params: [id21],
        fn: func1
      }, buffer);
      buffer.data += '\r\n</tr>\r\n';
      return buffer;
    }
    buffer.data += '';
    pos.line = 1;
    pos.line = 1;
    var id23 = (t = affix.years) !== undefined ? t : (t = data.years) !== undefined ? t : scope.resolveLooseUp(['years']);
    buffer = eachCommand.call(tpl, scope, {
      params: [id23],
      fn: func0
    }, buffer);
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplYearPanel = function (exports) {
  var ret = exports = function yearPanel(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    buffer.data += '<div class="';
    pos.line = 1;
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['header']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n    <a class="';
    pos.line = 2;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['prev-decade-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       role="button"\r\n       title="';
    pos.line = 5;
    var id2 = (t = affix.previousDecadeLabel) !== undefined ? t : (t = data.previousDecadeLabel) !== undefined ? t : scope.resolveLooseUp(['previousDecadeLabel']);
    buffer = buffer.writeEscaped(id2);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n\r\n    <a class="';
    pos.line = 9;
    var callRet3;
    callRet3 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['decade-select']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet3);
    buffer.data += '"\r\n       role="button"\r\n       href="javascript:void(0)"\r\n       hidefocus="on"\r\n       title="';
    pos.line = 13;
    var id4 = (t = affix.decadeSelectLabel) !== undefined ? t : (t = data.decadeSelectLabel) !== undefined ? t : scope.resolveLooseUp(['decadeSelectLabel']);
    buffer = buffer.writeEscaped(id4);
    buffer.data += '">\r\n            <span class="';
    pos.line = 14;
    var callRet5;
    callRet5 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['decade-select-content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet5);
    buffer.data += '">\r\n                ';
    pos.line = 15;
    var id6 = (t = affix.startYear) !== undefined ? t : (t = data.startYear) !== undefined ? t : scope.resolveLooseUp(['startYear']);
    buffer = buffer.writeEscaped(id6);
    buffer.data += '-';
    var id7 = (t = affix.endYear) !== undefined ? t : (t = data.endYear) !== undefined ? t : scope.resolveLooseUp(['endYear']);
    buffer = buffer.writeEscaped(id7);
    buffer.data += '\r\n            </span>\r\n        <span class="';
    pos.line = 17;
    var callRet8;
    callRet8 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['decade-select-arrow']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet8);
    buffer.data += '">x</span>\r\n    </a>\r\n\r\n    <a class="';
    pos.line = 20;
    var callRet9;
    callRet9 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['next-decade-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet9);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       role="button"\r\n       title="';
    pos.line = 23;
    var id10 = (t = affix.nextDecadeLabel) !== undefined ? t : (t = data.nextDecadeLabel) !== undefined ? t : scope.resolveLooseUp(['nextDecadeLabel']);
    buffer = buffer.writeEscaped(id10);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n</div>\r\n<div class="';
    pos.line = 27;
    var callRet11;
    callRet11 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['body']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet11);
    buffer.data += '">\r\n    <table class="';
    pos.line = 28;
    var callRet12;
    callRet12 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['table']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet12);
    buffer.data += '" cellspacing="0" role="grid">\r\n        <tbody class="';
    pos.line = 29;
    var callRet13;
    callRet13 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['tbody']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet13);
    buffer.data += '">\r\n        ';
    pos.line = 30;
    var callRet14;
    buffer = root.includeModule(scope, { params: [datePickerXtplYears] }, buffer, tpl);
    buffer = buffer.write(callRet14);
    buffer.data += '\r\n        </tbody>\r\n    </table>\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplMonths = function (exports) {
  var ret = exports = function months(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    function func4(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n        ';
      pos.line = 8;
      var callRet5;
      callRet5 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['selected-cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet5);
      buffer.data += '\r\n        ';
      return buffer;
    }
    function func1(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n    <td role="gridcell"\r\n        title="';
      pos.line = 5;
      var id2 = (t = affix.title) !== undefined ? t : (t = data.title) !== undefined ? t : scope.resolveLooseUp(['title']);
      buffer = buffer.writeEscaped(id2);
      buffer.data += '"\r\n        class="';
      pos.line = 6;
      var callRet3;
      callRet3 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['cell']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet3);
      buffer.data += '\r\n        ';
      pos.line = 7;
      pos.line = 7;
      var id6 = (t = affix.month) !== undefined ? t : (t = data.month) !== undefined ? t : scope.resolveLooseUp(['month']);
      var exp8 = id6;
      var id7 = (t = affix.value) !== undefined ? t : (t = data.value) !== undefined ? t : scope.resolveLooseUp(['value']);
      exp8 = id6 === id7;
      buffer = ifCommand.call(tpl, scope, {
        params: [exp8],
        fn: func4
      }, buffer);
      buffer.data += '\r\n        ">\r\n        <a hidefocus="on"\r\n           href="javascript:void(0)"\r\n           unselectable="on"\r\n           class="';
      pos.line = 14;
      var callRet9;
      callRet9 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['month']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet9);
      buffer.data += '">\r\n            ';
      pos.line = 15;
      var id10 = (t = affix.content) !== undefined ? t : (t = data.content) !== undefined ? t : scope.resolveLooseUp(['content']);
      buffer = buffer.writeEscaped(id10);
      buffer.data += '\r\n        </a>\r\n    </td>\r\n    ';
      return buffer;
    }
    function func0(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n<tr role="row">\r\n    ';
      pos.line = 3;
      pos.line = 3;
      var id12 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      var id11 = (t = affix.months) !== undefined ? affix.months[id12] : (t = data.months) !== undefined ? t[id12] : scope.resolveLooseUp([
        'months',
        id12
      ]);
      buffer = eachCommand.call(tpl, scope, {
        params: [id11],
        fn: func1
      }, buffer);
      buffer.data += '\r\n</tr>\r\n';
      return buffer;
    }
    buffer.data += '';
    pos.line = 1;
    pos.line = 1;
    var id13 = (t = affix.months) !== undefined ? t : (t = data.months) !== undefined ? t : scope.resolveLooseUp(['months']);
    buffer = eachCommand.call(tpl, scope, {
      params: [id13],
      fn: func0
    }, buffer);
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplMonthPanel = function (exports) {
  var ret = exports = function monthPanel(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    buffer.data += '<div class="';
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['header']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n    <a class="';
    pos.line = 2;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['prev-year-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       role="button"\r\n       title="';
    pos.line = 5;
    var id2 = (t = affix.previousYearLabel) !== undefined ? t : (t = data.previousYearLabel) !== undefined ? t : scope.resolveLooseUp(['previousYearLabel']);
    buffer = buffer.writeEscaped(id2);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n\r\n    <a class="';
    pos.line = 9;
    var callRet3;
    callRet3 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['year-select']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet3);
    buffer.data += '"\r\n       role="button"\r\n       href="javascript:void(0)"\r\n       hidefocus="on"\r\n       title="';
    pos.line = 13;
    var id4 = (t = affix.yearSelectLabel) !== undefined ? t : (t = data.yearSelectLabel) !== undefined ? t : scope.resolveLooseUp(['yearSelectLabel']);
    buffer = buffer.writeEscaped(id4);
    buffer.data += '">\r\n        <span class="';
    pos.line = 14;
    var callRet5;
    callRet5 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['year-select-content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet5);
    buffer.data += '">';
    var id6 = (t = affix.year) !== undefined ? t : (t = data.year) !== undefined ? t : scope.resolveLooseUp(['year']);
    buffer = buffer.writeEscaped(id6);
    buffer.data += '</span>\r\n        <span class="';
    pos.line = 15;
    var callRet7;
    callRet7 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['year-select-arrow']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet7);
    buffer.data += '">x</span>\r\n    </a>\r\n\r\n    <a class="';
    pos.line = 18;
    var callRet8;
    callRet8 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['next-year-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet8);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       role="button"\r\n       title="';
    pos.line = 21;
    var id9 = (t = affix.nextYearLabel) !== undefined ? t : (t = data.nextYearLabel) !== undefined ? t : scope.resolveLooseUp(['nextYearLabel']);
    buffer = buffer.writeEscaped(id9);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n</div>\r\n<div class="';
    pos.line = 25;
    var callRet10;
    callRet10 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['body']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet10);
    buffer.data += '">\r\n    <table class="';
    pos.line = 26;
    var callRet11;
    callRet11 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['table']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet11);
    buffer.data += '" cellspacing="0" role="grid">\r\n        <tbody class="';
    pos.line = 27;
    var callRet12;
    callRet12 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['tbody']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet12);
    buffer.data += '">\r\n        ';
    pos.line = 28;
    var callRet13;
    buffer = root.includeModule(scope, { params: [datePickerXtplMonths] }, buffer, tpl);
    buffer = buffer.write(callRet13);
    buffer.data += '\r\n        </tbody>\r\n    </table>\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplPicker = function (exports) {
  var ret = exports = function picker(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    function func16(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n            <th role="columnheader" class="';
      pos.line = 45;
      var callRet17;
      callRet17 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['column-header']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet17);
      buffer.data += ' ';
      var callRet18;
      callRet18 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['week-number-header']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet18);
      buffer.data += '">\r\n                <span class="';
      pos.line = 46;
      var callRet19;
      callRet19 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['column-header-inner']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet19);
      buffer.data += '">x</span>\r\n            </th>\r\n            ';
      return buffer;
    }
    function func21(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n            <th role="columnheader" title="';
      pos.line = 50;
      var id22 = data;
      buffer = buffer.writeEscaped(id22);
      buffer.data += '" class="';
      var callRet23;
      callRet23 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['column-header']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet23);
      buffer.data += '">\r\n                <span class="';
      pos.line = 51;
      var callRet24;
      callRet24 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['column-header-inner']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet24);
      buffer.data += '">\r\n                    ';
      pos.line = 52;
      var id26 = (t = affix.xindex) !== undefined ? t : (t = data.xindex) !== undefined ? t : scope.resolveLooseUp(['xindex']);
      var id25 = (t = affix.veryShortWeekdays) !== undefined ? affix.veryShortWeekdays[id26] : (t = data.veryShortWeekdays) !== undefined ? t[id26] : scope.resolveLooseUp([
        'veryShortWeekdays',
        id26
      ]);
      buffer = buffer.writeEscaped(id25);
      buffer.data += '\r\n                </span>\r\n            </th>\r\n            ';
      return buffer;
    }
    function func30(scope, buffer, undefined) {
      var data = scope.data;
      var affix = scope.affix;
      buffer.data += '\r\n<div class="';
      pos.line = 64;
      var callRet31;
      callRet31 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['footer']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet31);
      buffer.data += '">\r\n    <a class="';
      pos.line = 65;
      var callRet32;
      callRet32 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['today-btn']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet32);
      buffer.data += '"\r\n       role="button"\r\n       hidefocus="on"\r\n       tabindex="-1"\r\n       href="javascript:void(0)"\r\n       title="';
      pos.line = 70;
      var id33 = (t = affix.todayTimeLabel) !== undefined ? t : (t = data.todayTimeLabel) !== undefined ? t : scope.resolveLooseUp(['todayTimeLabel']);
      buffer = buffer.writeEscaped(id33);
      buffer.data += '">';
      var id34 = (t = affix.todayLabel) !== undefined ? t : (t = data.todayLabel) !== undefined ? t : scope.resolveLooseUp(['todayLabel']);
      buffer = buffer.writeEscaped(id34);
      buffer.data += '</a>\r\n    <a class="';
      pos.line = 71;
      var callRet35;
      callRet35 = callFnUtil(tpl, scope, {
        escape: 1,
        params: ['clear-btn']
      }, buffer, ['getBaseCssClasses']);
      buffer = buffer.writeEscaped(callRet35);
      buffer.data += '"\r\n       role="button"\r\n       hidefocus="on"\r\n       tabindex="-1"\r\n       href="javascript:void(0)">';
      pos.line = 75;
      var id36 = (t = affix.clearLabel) !== undefined ? t : (t = data.clearLabel) !== undefined ? t : scope.resolveLooseUp(['clearLabel']);
      buffer = buffer.writeEscaped(id36);
      buffer.data += '</a>\r\n</div>\r\n';
      return buffer;
    }
    buffer.data += '<div class="';
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['header']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n    <a class="';
    pos.line = 2;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['prev-year-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       tabindex="-1"\r\n       role="button"\r\n       title="';
    pos.line = 6;
    var id2 = (t = affix.previousYearLabel) !== undefined ? t : (t = data.previousYearLabel) !== undefined ? t : scope.resolveLooseUp(['previousYearLabel']);
    buffer = buffer.writeEscaped(id2);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n    <a class="';
    pos.line = 9;
    var callRet3;
    callRet3 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['prev-month-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet3);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       tabindex="-1"\r\n       role="button"\r\n       title="';
    pos.line = 13;
    var id4 = (t = affix.previousMonthLabel) !== undefined ? t : (t = data.previousMonthLabel) !== undefined ? t : scope.resolveLooseUp(['previousMonthLabel']);
    buffer = buffer.writeEscaped(id4);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n    <a class="';
    pos.line = 16;
    var callRet5;
    callRet5 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['month-select']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet5);
    buffer.data += '"\r\n       role="button"\r\n       href="javascript:void(0)"\r\n       tabindex="-1"\r\n       hidefocus="on"\r\n       title="';
    pos.line = 21;
    var id6 = (t = affix.monthSelectLabel) !== undefined ? t : (t = data.monthSelectLabel) !== undefined ? t : scope.resolveLooseUp(['monthSelectLabel']);
    buffer = buffer.writeEscaped(id6);
    buffer.data += '">\r\n        <span class="';
    pos.line = 22;
    var callRet7;
    callRet7 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['month-select-content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet7);
    buffer.data += '">';
    var id8 = (t = affix.monthYearLabel) !== undefined ? t : (t = data.monthYearLabel) !== undefined ? t : scope.resolveLooseUp(['monthYearLabel']);
    buffer = buffer.writeEscaped(id8);
    buffer.data += '</span>\r\n        <span class="';
    pos.line = 23;
    var callRet9;
    callRet9 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['month-select-arrow']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet9);
    buffer.data += '">x</span>\r\n    </a>\r\n    <a class="';
    pos.line = 25;
    var callRet10;
    callRet10 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['next-month-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet10);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       tabindex="-1"\r\n       role="button"\r\n       title="';
    pos.line = 29;
    var id11 = (t = affix.nextMonthLabel) !== undefined ? t : (t = data.nextMonthLabel) !== undefined ? t : scope.resolveLooseUp(['nextMonthLabel']);
    buffer = buffer.writeEscaped(id11);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n    <a class="';
    pos.line = 32;
    var callRet12;
    callRet12 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['next-year-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet12);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       tabindex="-1"\r\n       role="button"\r\n       title="';
    pos.line = 36;
    var id13 = (t = affix.nextYearLabel) !== undefined ? t : (t = data.nextYearLabel) !== undefined ? t : scope.resolveLooseUp(['nextYearLabel']);
    buffer = buffer.writeEscaped(id13);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n</div>\r\n<div class="';
    pos.line = 40;
    var callRet14;
    callRet14 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['body']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet14);
    buffer.data += '">\r\n    <table class="';
    pos.line = 41;
    var callRet15;
    callRet15 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['table']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet15);
    buffer.data += '" cellspacing="0" role="grid">\r\n        <thead>\r\n        <tr role="row">\r\n            ';
    pos.line = 44;
    pos.line = 44;
    var id20 = (t = affix.showWeekNumber) !== undefined ? t : (t = data.showWeekNumber) !== undefined ? t : scope.resolveLooseUp(['showWeekNumber']);
    buffer = ifCommand.call(tpl, scope, {
      params: [id20],
      fn: func16
    }, buffer);
    buffer.data += '\r\n            ';
    pos.line = 49;
    pos.line = 49;
    var id27 = (t = affix.weekdays) !== undefined ? t : (t = data.weekdays) !== undefined ? t : scope.resolveLooseUp(['weekdays']);
    buffer = eachCommand.call(tpl, scope, {
      params: [id27],
      fn: func21
    }, buffer);
    buffer.data += '\r\n        </tr>\r\n        </thead>\r\n        <tbody class="';
    pos.line = 58;
    var callRet28;
    callRet28 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['tbody']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet28);
    buffer.data += '">\r\n        ';
    pos.line = 59;
    var callRet29;
    callRet29 = callFnUtil(tpl, scope, {}, buffer, ['renderDates']);
    buffer = buffer.write(callRet29);
    buffer.data += '\r\n        </tbody>\r\n    </table>\r\n</div>\r\n';
    pos.line = 63;
    pos.line = 63;
    var id37 = (t = affix.showToday) !== undefined ? t : (t = data.showToday) !== undefined ? t : scope.resolveLooseUp(['showToday']);
    var exp39 = id37;
    if (!exp39) {
      var id38 = (t = affix.showClear) !== undefined ? t : (t = data.showClear) !== undefined ? t : scope.resolveLooseUp(['showClear']);
      exp39 = id38;
    }
    buffer = ifCommand.call(tpl, scope, {
      params: [exp39],
      fn: func30
    }, buffer);
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplPopup = function (exports) {
  var ret = exports = function popup(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    buffer.data += '<div class="';
    pos.line = 1;
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['content']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n    ';
    pos.line = 2;
    var callRet1;
    buffer = root.includeModule(scope, { params: [datePickerXtplPicker] }, buffer, tpl);
    buffer = buffer.write(callRet1);
    buffer.data += '\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplDecadePanel = function (exports) {
  var ret = exports = function decadePanel(undefined) {
    var t;
    var t0;
    var t1;
    var t2;
    var t3;
    var t4;
    var t5;
    var t6;
    var t7;
    var t8;
    var t9;
    var tpl = this;
    var root = tpl.root;
    var buffer = tpl.buffer;
    var scope = tpl.scope;
    var runtime = tpl.runtime;
    var name = tpl.name;
    var pos = tpl.pos;
    var data = scope.data;
    var affix = scope.affix;
    var nativeCommands = root.nativeCommands;
    var utils = root.utils;
    var callFnUtil = utils['callFn'];
    var callCommandUtil = utils['callCommand'];
    var rangeCommand = nativeCommands['range'];
    var foreachCommand = nativeCommands['foreach'];
    var forinCommand = nativeCommands['forin'];
    var eachCommand = nativeCommands['each'];
    var withCommand = nativeCommands['with'];
    var ifCommand = nativeCommands['if'];
    var setCommand = nativeCommands['set'];
    var includeCommand = nativeCommands['include'];
    var parseCommand = nativeCommands['parse'];
    var extendCommand = nativeCommands['extend'];
    var blockCommand = nativeCommands['block'];
    var macroCommand = nativeCommands['macro'];
    var debuggerCommand = nativeCommands['debugger'];
    buffer.data += '<div class="';
    var callRet0;
    callRet0 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['header']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet0);
    buffer.data += '">\r\n    <a class="';
    pos.line = 2;
    var callRet1;
    callRet1 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['prev-century-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet1);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       role="button"\r\n       title="';
    pos.line = 5;
    var id2 = (t = affix.previousCenturyLabel) !== undefined ? t : (t = data.previousCenturyLabel) !== undefined ? t : scope.resolveLooseUp(['previousCenturyLabel']);
    buffer = buffer.writeEscaped(id2);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n    <div class="';
    pos.line = 8;
    var callRet3;
    callRet3 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['century']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet3);
    buffer.data += '">\r\n                ';
    pos.line = 9;
    var id4 = (t = affix.startYear) !== undefined ? t : (t = data.startYear) !== undefined ? t : scope.resolveLooseUp(['startYear']);
    buffer = buffer.writeEscaped(id4);
    buffer.data += '-';
    var id5 = (t = affix.endYear) !== undefined ? t : (t = data.endYear) !== undefined ? t : scope.resolveLooseUp(['endYear']);
    buffer = buffer.writeEscaped(id5);
    buffer.data += '\r\n    </div>\r\n    <a class="';
    pos.line = 11;
    var callRet6;
    callRet6 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['next-century-btn']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet6);
    buffer.data += '"\r\n       href="javascript:void(0)"\r\n       role="button"\r\n       title="';
    pos.line = 14;
    var id7 = (t = affix.nextCenturyLabel) !== undefined ? t : (t = data.nextCenturyLabel) !== undefined ? t : scope.resolveLooseUp(['nextCenturyLabel']);
    buffer = buffer.writeEscaped(id7);
    buffer.data += '"\r\n       hidefocus="on">\r\n    </a>\r\n</div>\r\n<div class="';
    pos.line = 18;
    var callRet8;
    callRet8 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['body']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet8);
    buffer.data += '">\r\n    <table class="';
    pos.line = 19;
    var callRet9;
    callRet9 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['table']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet9);
    buffer.data += '" cellspacing="0" role="grid">\r\n        <tbody class="';
    pos.line = 20;
    var callRet10;
    callRet10 = callFnUtil(tpl, scope, {
      escape: 1,
      params: ['tbody']
    }, buffer, ['getBaseCssClasses']);
    buffer = buffer.writeEscaped(callRet10);
    buffer.data += '">\r\n        ';
    pos.line = 21;
    var callRet11;
    buffer = root.includeModule(scope, { params: [datePickerXtplDecades] }, buffer, tpl);
    buffer = buffer.write(callRet11);
    buffer.data += '\r\n        </tbody>\r\n    </table>\r\n</div>';
    return buffer;
  };
  ret.TPL_NAME = module.id || module.name;
  return exports;
}();
datePickerXtplYearsRender = function (exports) {
  var tpl = datePickerXtplYears;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerXtplYearPanelRender = function (exports) {
  var tpl = datePickerXtplYearPanel;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerXtplMonthsRender = function (exports) {
  var tpl = datePickerXtplMonths;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerXtplMonthPanelRender = function (exports) {
  var tpl = datePickerXtplMonthPanel;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerXtplPickerRender = function (exports) {
  var tpl = datePickerXtplPicker;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerXtplPopupRender = function (exports) {
  var tpl = datePickerXtplPopup;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerXtplDecadePanelRender = function (exports) {
  var tpl = datePickerXtplDecadePanel;
  var XTemplateRuntime = xtemplateRuntime;
  var instance = new XTemplateRuntime(tpl);
  exports = function () {
    return instance.render.apply(instance, arguments);
  };
  return exports;
}();
datePickerDecadePanel = function (exports) {
  var util = _util_;
  var TapGesture = eventDomGestureTap;
  var tap = TapGesture.TAP;
  var $ = node;
  var Control = componentControl, DecadePanelTpl = datePickerXtplDecadePanelRender, MonthsTpl = datePickerXtplDecadesRender;
  function prepareYears(self, view) {
    var value = self.get('value');
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 100, 10) * 100;
    var preYear = startYear - 10;
    var endYear = startYear + 99;
    var decades = [];
    var index = 0;
    for (var i = 0; i < 3; i++) {
      decades[i] = [];
      for (var j = 0; j < 4; j++) {
        decades[i][j] = {
          startDecade: preYear + index * 10,
          endDecade: preYear + index * 10 + 9
        };
        index++;
      }
    }
    self.decades = decades;
    util.mix(view.renderData, {
      startYear: startYear,
      endYear: endYear,
      year: currentYear,
      decades: decades
    });
  }
  function goYear(self, direction) {
    var next = self.get('value').clone();
    next.addYear(direction);
    self.set('value', next);
  }
  function nextCentury() {
    goYear(this, 100);
  }
  function previousCentury() {
    goYear(this, -100);
  }
  function chooseCell(e) {
    var td = $(e.currentTarget);
    var tr = td.parent();
    var tdIndex = td.index();
    var trIndex = tr.index();
    var value = this.get('value').clone();
    var y = value.getYear() % 10;
    value.setYear(this.decades[trIndex][tdIndex].startDecade + y);
    this.set('value', value);
    this.fire('select', { value: value });
  }
  exports = Control.extend({
    beforeCreateDom: function (renderData, childrenSelectors) {
      var self = this;
      var locale = self.get('locale');
      prepareYears(self, this);
      util.mix(renderData, {
        previousCenturyLabel: locale.previousCentury,
        nextCenturyLabel: locale.nextCentury
      });
      util.mix(childrenSelectors, {
        tbodyEl: '#ks-date-picker-decade-panel-tbody-{id}',
        previousCenturyBtn: '#ks-date-picker-decade-panel-previous-century-btn-{id}',
        centuryEl: '#ks-date-picker-decade-panel-century-{id}',
        nextCenturyBtn: '#ks-date-picker-decade-panel-next-century-btn-{id}'
      });
    },
    bindUI: function () {
      var self = this;
      self.get('nextCenturyBtn').on(tap, nextCentury, self);
      self.get('previousCenturyBtn').on(tap, previousCentury, self);
      self.get('tbodyEl').delegate(tap, '.' + self.getBaseCssClass('cell'), chooseCell, self);
    },
    _onSetValue: function () {
      var self = this;
      prepareYears(self, this);
      var startYear = this.renderData.startYear;
      var endYear = this.renderData.endYear;
      self.get('tbodyEl').html(this.renderTpl(MonthsTpl));
      self.get('centuryEl').html(startYear + '-' + endYear);
    }
  }, {
    xclass: 'date-picker-decade-panel',
    ATTRS: {
      contentTpl: { value: DecadePanelTpl },
      focusable: { value: false },
      value: { render: 1 },
      tbodyEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('tbody');
        }
      },
      previousCenturyBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('prev-century-btn');
        }
      },
      nextCenturyBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('next-century-btn');
        }
      },
      centuryEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('century');
        }
      }
    }
  });
  return exports;
}();
datePickerYearPanel = function (exports) {
  var util = _util_;
  var Control = componentControl, DecadePanel = datePickerDecadePanel;
  var TapGesture = eventDomGestureTap;
  var tap = TapGesture.TAP;
  var $ = node;
  var DateFormat = gregorianCalendarFormat, YearsTpl = datePickerXtplYearsRender, YearPanelTpl = datePickerXtplYearPanelRender;
  function prepareYears(self) {
    var value = self.get('value');
    var currentYear = value.getYear();
    var startYear = parseInt(currentYear / 10, 10) * 10;
    var preYear = startYear - 1;
    var current = value.clone();
    var locale = self.get('locale');
    var yearFormat = locale.yearFormat;
    var dateLocale = value.getLocale();
    var dateFormatter = new DateFormat(yearFormat, dateLocale);
    var years = [];
    var index = 0;
    for (var i = 0; i < 3; i++) {
      years[i] = [];
      for (var j = 0; j < 4; j++) {
        current.setYear(preYear + index);
        years[i][j] = {
          content: preYear + index,
          title: dateFormatter.format(current)
        };
        index++;
      }
    }
    self.years = years;
    return years;
  }
  function goYear(self, direction) {
    var next = self.get('value').clone();
    next.addYear(direction);
    self.set('value', next);
  }
  function nextDecade() {
    goYear(this, 10);
  }
  function prevDecade() {
    goYear(this, -10);
  }
  function chooseCell(e) {
    var td = $(e.currentTarget);
    var tr = td.parent();
    var tdIndex = td.index();
    var trIndex = tr.index();
    var value = this.get('value').clone();
    value.setYear(this.years[trIndex][tdIndex].content);
    this.set('value', value);
    this.fire('select', { value: value });
  }
  function showDecadePanel() {
    var decadePanel = this.get('decadePanel');
    decadePanel.set('value', this.get('value'));
    decadePanel.show();
  }
  function setUpDecadePanel() {
    var self = this;
    var decadePanel = new DecadePanel({
      locale: this.get('locale'),
      render: self.get('render')
    });
    decadePanel.on('select', onDecadePanelSelect, self);
    return decadePanel;
  }
  function onDecadePanelSelect(e) {
    this.set('value', e.value);
    this.get('decadePanel').hide();
  }
  exports = Control.extend({
    beforeCreateDom: function (renderData) {
      var self = this;
      var value = self.get('value');
      var currentYear = value.getYear();
      var startYear = parseInt(currentYear / 10, 10) * 10;
      var endYear = startYear + 9;
      var locale = self.get('locale');
      util.mix(renderData, {
        decadeSelectLabel: locale.decadeSelect,
        years: prepareYears(self),
        startYear: startYear,
        endYear: endYear,
        year: value.getYear(),
        previousDecadeLabel: locale.previousDecade,
        nextDecadeLabel: locale.nextDecade
      });
    },
    bindUI: function () {
      var self = this;
      self.get('nextDecadeBtn').on(tap, nextDecade, self);
      self.get('previousDecadeBtn').on(tap, prevDecade, self);
      self.get('tbodyEl').delegate(tap, '.' + self.getBaseCssClass('cell'), chooseCell, self);
      self.get('decadeSelectEl').on(tap, showDecadePanel, self);
    },
    _onSetValue: function (value) {
      var self = this;
      var currentYear = value.getYear();
      var startYear = parseInt(currentYear / 10, 10) * 10;
      var endYear = startYear + 9;
      util.mix(self.renderData, {
        startYear: startYear,
        endYear: endYear,
        years: prepareYears(self),
        year: value.getYear()
      });
      self.get('tbodyEl').html(this.renderTpl(YearsTpl));
      self.get('decadeSelectContentEl').html(startYear + '-' + endYear);
    }
  }, {
    xclass: 'date-picker-year-panel',
    ATTRS: {
      contentTpl: { value: YearPanelTpl },
      focusable: { value: false },
      value: { render: 1 },
      decadePanel: { valueFn: setUpDecadePanel },
      tbodyEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('tbody');
        }
      },
      previousDecadeBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('prev-decade-btn');
        }
      },
      nextDecadeBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('next-decade-btn');
        }
      },
      decadeSelectEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('decade-select');
        }
      },
      decadeSelectContentEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('decade-select-content');
        }
      }
    }
  });
  return exports;
}();
datePickerMonthPanel = function (exports) {
  var util = _util_;
  var Control = componentControl, YearPanel = datePickerYearPanel;
  var DateFormat = gregorianCalendarFormat, MonthsTpl = datePickerXtplMonthsRender, MonthPanelTpl = datePickerXtplMonthPanelRender;
  var TapGesture = eventDomGestureTap;
  var tap = TapGesture.TAP;
  var $ = node;
  function prepareMonths(self) {
    var value = self.get('value');
    var currentMonth = value.getMonth();
    var current = value.clone();
    var locale = self.get('locale');
    var monthYearFormat = locale.monthYearFormat;
    var dateLocale = value.getLocale();
    var dateFormatter = new DateFormat(monthYearFormat, dateLocale);
    var months = [];
    var shortMonths = dateLocale.shortMonths;
    var index = 0;
    for (var i = 0; i < 3; i++) {
      months[i] = [];
      for (var j = 0; j < 4; j++) {
        current.setMonth(index);
        months[i][j] = {
          value: index,
          content: shortMonths[index],
          title: dateFormatter.format(current)
        };
        index++;
      }
    }
    util.mix(self.renderData, {
      months: months,
      year: value.getYear(),
      month: currentMonth
    });
    self.months = months;
    return months;
  }
  function goYear(self, direction) {
    var next = self.get('value').clone();
    next.addYear(direction);
    self.set('value', next);
  }
  function nextYear() {
    goYear(this, 1);
  }
  function previousYear() {
    goYear(this, -1);
  }
  function chooseCell(e) {
    var td = $(e.currentTarget);
    var tr = td.parent();
    var tdIndex = td.index();
    var trIndex = tr.index();
    var value = this.get('value').clone();
    value.setMonth(trIndex * 4 + tdIndex);
    this.fire('select', { value: value });
  }
  function showYearPanel() {
    var yearPanel = this.get('yearPanel');
    yearPanel.set('value', this.get('value'));
    yearPanel.show();
  }
  function setUpYearPanel() {
    var self = this;
    var yearPanel = new YearPanel({
      locale: this.get('locale'),
      render: self.get('render')
    });
    yearPanel.on('select', onYearPanelSelect, self);
    return yearPanel;
  }
  function onYearPanelSelect(e) {
    this.set('value', e.value);
    this.get('yearPanel').hide();
  }
  exports = Control.extend({
    beforeCreateDom: function (renderData) {
      var self = this;
      var locale = self.get('locale');
      util.mix(renderData, {
        yearSelectLabel: locale.yearSelect,
        previousYearLabel: locale.previousYear,
        nextYearLabel: locale.nextYear
      });
      prepareMonths(self);
    },
    bindUI: function () {
      var self = this;
      self.get('nextYearBtn').on(tap, nextYear, self);
      self.get('previousYearBtn').on(tap, previousYear, self);
      self.get('tbodyEl').delegate(tap, '.' + self.getBaseCssClass('cell'), chooseCell, self);
      self.get('yearSelectEl').on(tap, showYearPanel, self);
    },
    _onSetValue: function (value) {
      var self = this;
      prepareMonths(self);
      self.get('tbodyEl').html(this.renderTpl(MonthsTpl));
      self.get('yearSelectContentEl').html(value.getYear());
    }
  }, {
    xclass: 'date-picker-month-panel',
    ATTRS: {
      contentTpl: { value: MonthPanelTpl },
      focusable: { value: false },
      value: { render: 1 },
      yearPanel: { valueFn: setUpYearPanel },
      tbodyEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('tbody');
        }
      },
      previousYearBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('prev-year-btn');
        }
      },
      nextYearBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('next-year-btn');
        }
      },
      yearSelectEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('year-select');
        }
      },
      yearSelectContentEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('year-select-content');
        }
      }
    }
  });
  return exports;
}();
datePicker = function (exports) {
  var util = _util_;
  var $ = node, GregorianCalendar = gregorianCalendar, locale = i18nDatePicker, Control = componentControl, MonthPanel = datePickerMonthPanel;
  var TapGesture = eventDomGestureTap;
  var tap = TapGesture.TAP;
  var KeyCode = $.Event.KeyCode;
  var DateTimeFormat = gregorianCalendarFormat, PickerTpl = datePickerXtplPickerRender;
  var dateRowTplStart = '<tr role="row">';
  var dateRowTplEnd = '</tr>';
  var dateCellTpl = '<td role="gridcell" data-index="{index}" title="{title}" class="{cls}">{content}</td>';
  var weekNumberCellTpl = '<td role="gridcell" class="{cls}">{content}</td>';
  var dateTpl = '<a ' + ' id="{id}" ' + ' hidefocus="on" ' + ' unselectable="on" ' + ' tabindex="-1" ' + ' class="{cls}" ' + ' href="javascript:void(0)" ' + ' aria-selected="{selected}" ' + ' aria-disabled="{disabled}">{content}</a>';
  var DATE_ROW_COUNT = 6;
  var DATE_COL_COUNT = 7;
  function getIdFromDate(d) {
    return 'ks-date-picker-date-' + d.getYear() + '-' + d.getMonth() + '-' + d.getDayOfMonth();
  }
  function isSameDay(one, two) {
    return one.getYear() === two.getYear() && one.getMonth() === two.getMonth() && one.getDayOfMonth() === two.getDayOfMonth();
  }
  function isSameMonth(one, two) {
    return one.getYear() === two.getYear() && one.getMonth() === two.getMonth();
  }
  function beforeCurrentMonthYear(current, today) {
    if (current.getYear() < today.getYear()) {
      return 1;
    }
    return current.getYear() === today.getYear() && current.getMonth() < today.getMonth();
  }
  function afterCurrentMonthYear(current, today) {
    if (current.getYear() > today.getYear()) {
      return 1;
    }
    return current.getYear() === today.getYear() && current.getMonth() > today.getMonth();
  }
  function goStartMonth(self) {
    var next = self.get('value').clone();
    next.setDayOfMonth(1);
    self.set('value', next);
  }
  function goEndMonth(self) {
    var next = self.get('value').clone();
    next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
    self.set('value', next);
  }
  function goMonth(self, direction) {
    var next = self.get('value').clone();
    next.addMonth(direction);
    self.set('value', next);
  }
  function goYear(self, direction) {
    var next = self.get('value').clone();
    next.addYear(direction);
    self.set('value', next);
  }
  function goWeek(self, direction) {
    var next = self.get('value').clone();
    next.addWeekOfYear(direction);
    self.set('value', next);
  }
  function goDay(self, direction) {
    var next = self.get('value').clone();
    next.addDayOfMonth(direction);
    self.set('value', next);
  }
  function nextMonth() {
    goMonth(this, 1);
  }
  function previousMonth() {
    goMonth(this, -1);
  }
  function nextYear() {
    goYear(this, 1);
  }
  function previousYear() {
    goYear(this, -1);
  }
  function chooseCell(e) {
    var self = this;
    self.set('clear', false);
    var disabledDate = self.get('disabledDate');
    var td = $(e.currentTarget);
    var value = self.dateTable[parseInt(td.attr('data-index'), 10)];
    if (disabledDate && disabledDate(value, self.get('value'))) {
      return;
    }
    setTimeout(function () {
      self.set('value', value);
      self.fire('select', { value: value });
    }, 0);
  }
  function showMonthPanel() {
    var monthPanel = this.get('monthPanel');
    monthPanel.set('value', this.get('value'));
    monthPanel.show();
  }
  function setUpMonthPanel() {
    var self = this;
    var monthPanel = new MonthPanel({
      locale: this.get('locale'),
      render: self.get('el')
    });
    monthPanel.on('select', onMonthPanelSelect, self);
    return monthPanel;
  }
  function onMonthPanelSelect(e) {
    this.set('value', e.value);
    this.get('monthPanel').hide();
  }
  function chooseToday() {
    this.set('clear', false);
    var today = this.get('value').clone();
    today.setTime(util.now());
    this.set('value', today);
  }
  function toggleClear() {
    var self = this, v = !self.get('clear');
    if (!v) {
      var value = self.get('value');
      value.setDayOfMonth(1);
      self.set('clear', false);
    } else {
      self.set('clear', true);
    }
  }
  function onClearClick() {
    if (!this.get('clear')) {
      toggleClear.call(this);
    }
    this.fire('select', { value: null });
  }
  var DatePicker = exports = Control.extend({
    beforeCreateDom: function (renderData, renderCommands) {
      var self = this;
      var locale = self.get('locale');
      var value = self.get('value');
      var dateLocale = value.getLocale();
      var veryShortWeekdays = [];
      var weekDays = [];
      var firstDayOfWeek = value.getFirstDayOfWeek();
      for (var i = 0; i < DATE_COL_COUNT; i++) {
        var index = (firstDayOfWeek + i) % DATE_COL_COUNT;
        veryShortWeekdays[i] = locale.veryShortWeekdays[index];
        weekDays[i] = dateLocale.weekdays[index];
      }
      util.mix(renderData, {
        monthSelectLabel: locale.monthSelect,
        monthYearLabel: self.getMonthYearLabel(),
        previousMonthLabel: locale.previousMonth,
        nextMonthLabel: locale.nextMonth,
        previousYearLabel: locale.previousYear,
        nextYearLabel: locale.nextYear,
        weekdays: weekDays,
        veryShortWeekdays: veryShortWeekdays,
        todayLabel: locale.today,
        clearLabel: locale.clear,
        todayTimeLabel: self.getTodayTimeLabel()
      });
      renderCommands.renderDates = function () {
        return self.renderDates();
      };
    },
    createDom: function () {
      this.$el.attr('aria-activedescendant', getIdFromDate(this.get('value')));
    },
    bindUI: function () {
      var self = this;
      self.get('nextMonthBtn').on(tap, nextMonth, self);
      self.get('previousMonthBtn').on(tap, previousMonth, self);
      self.get('nextYearBtn').on(tap, nextYear, self);
      self.get('previousYearBtn').on(tap, previousYear, self);
      self.get('tbodyEl').delegate(tap, '.' + self.getBaseCssClass('cell'), chooseCell, self);
      self.get('monthSelectEl').on(tap, showMonthPanel, self);
      var todayBtnEl = self.get('todayBtnEl');
      if (todayBtnEl) {
        todayBtnEl.on(tap, chooseToday, self);
      }
      if (self.get('clearBtnEl')) {
        self.get('clearBtnEl').on(tap, onClearClick, self);
      }
    },
    getMonthYearLabel: function () {
      var self = this;
      var locale = self.get('locale');
      var value = self.get('value');
      var dateLocale = value.getLocale();
      return new DateTimeFormat(locale.monthYearFormat, dateLocale).format(value);
    },
    getTodayTimeLabel: function () {
      var self = this;
      var locale = self.get('locale');
      var value = self.get('value');
      var dateLocale = value.getLocale();
      var today = value.clone();
      today.setTime(util.now());
      return new DateTimeFormat(locale.dateFormat, dateLocale).format(today);
    },
    renderDates: function () {
      var self = this, i, j, dateTable = [], current, isClear = self.get('clear'), showWeekNumber = self.get('showWeekNumber'), locale = self.get('locale'), value = self.get('value'), today = value.clone(), cellClass = self.getBaseCssClasses('cell'), weekNumberCellClass = self.getBaseCssClasses('week-number-cell'), dateClass = self.getBaseCssClasses('date'), dateRender = self.get('dateRender'), disabledDate = self.get('disabledDate'), dateLocale = value.getLocale(), dateFormatter = new DateTimeFormat(locale.dateFormat, dateLocale), todayClass = self.getBaseCssClasses('today'), selectedClass = self.getBaseCssClasses('selected-day'), lastMonthDayClass = self.getBaseCssClasses('last-month-cell'), nextMonthDayClass = self.getBaseCssClasses('next-month-btn-day'), disabledClass = self.getBaseCssClasses('disabled-cell');
      today.setTime(util.now());
      var month1 = value.clone();
      month1.set(value.getYear(), value.getMonth(), 1);
      var day = month1.getDayOfWeek();
      var lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
      var lastMonth1 = month1.clone();
      lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
      var passed = 0;
      for (i = 0; i < DATE_ROW_COUNT; i++) {
        for (j = 0; j < DATE_COL_COUNT; j++) {
          current = lastMonth1;
          if (passed) {
            current = current.clone();
            current.addDayOfMonth(passed);
          }
          dateTable.push(current);
          passed++;
        }
      }
      var tableHtml = '';
      passed = 0;
      for (i = 0; i < DATE_ROW_COUNT; i++) {
        var rowHtml = dateRowTplStart;
        if (showWeekNumber) {
          rowHtml += util.substitute(weekNumberCellTpl, {
            cls: weekNumberCellClass,
            content: dateTable[passed].getWeekOfYear()
          });
        }
        for (j = 0; j < DATE_COL_COUNT; j++) {
          current = dateTable[passed];
          var cls = cellClass;
          var disabled = false;
          var selected = false;
          if (isSameDay(current, today)) {
            cls += ' ' + todayClass;
          }
          if (!isClear && isSameDay(current, value)) {
            cls += ' ' + selectedClass;
            selected = true;
          }
          if (beforeCurrentMonthYear(current, value)) {
            cls += ' ' + lastMonthDayClass;
          }
          if (afterCurrentMonthYear(current, value)) {
            cls += ' ' + nextMonthDayClass;
          }
          if (disabledDate && disabledDate(current, value)) {
            cls += ' ' + disabledClass;
            disabled = true;
          }
          var dateHtml = '';
          if (!(dateRender && (dateHtml = dateRender(current, value)))) {
            dateHtml = util.substitute(dateTpl, {
              cls: dateClass,
              id: getIdFromDate(current),
              selected: selected,
              disabled: disabled,
              content: current.getDayOfMonth()
            });
          }
          rowHtml += util.substitute(dateCellTpl, {
            cls: cls,
            index: passed,
            title: dateFormatter.format(current),
            content: dateHtml
          });
          passed++;
        }
        tableHtml += rowHtml + dateRowTplEnd;
      }
      self.dateTable = dateTable;
      return tableHtml;
    },
    _onSetClear: function (v) {
      var self = this;
      var value = self.get('value');
      var selectedCls = this.getBaseCssClasses('selected-day');
      var id = getIdFromDate(value);
      var currentA = this.$('#' + id);
      if (v) {
        currentA.parent().removeClass(selectedCls);
        currentA.attr('aria-selected', false);
        self.$el.attr('aria-activedescendant', '');
      } else {
        currentA.parent().addClass(selectedCls);
        currentA.attr('aria-selected', true);
        self.$el.attr('aria-activedescendant', id);
      }
    },
    _onSetValue: function (value, e) {
      var self = this;
      var preValue = e.prevVal;
      if (isSameMonth(preValue, value)) {
        var disabledDate = self.get('disabledDate');
        var selectedCls = self.getBaseCssClasses('selected-day');
        var prevA = self.$('#' + getIdFromDate(preValue));
        prevA.parent().removeClass(selectedCls);
        prevA.attr('aria-selected', false);
        if (!(disabledDate && disabledDate(value, value))) {
          var currentA = self.$('#' + getIdFromDate(value));
          currentA.parent().addClass(selectedCls);
          currentA.attr('aria-selected', true);
        }
      } else {
        var tbodyEl = self.get('tbodyEl');
        var monthSelectContentEl = self.get('monthSelectContentEl');
        monthSelectContentEl.html(self.getMonthYearLabel());
        var todayBtnEl = self.get('todayBtnEl');
        if (todayBtnEl) {
          todayBtnEl.attr('title', self.getTodayTimeLabel());
        }
        tbodyEl.html(self.renderDates());
      }
      self.$el.attr('aria-activedescendant', getIdFromDate(value));
    },
    handleKeyDownInternal: function (e) {
      var self = this;
      var keyCode = e.keyCode;
      var ctrlKey = e.ctrlKey;
      switch (keyCode) {
      case KeyCode.SPACE:
        self.set('clear', !self.get('clear'));
        return true;
      }
      if (this.get('clear')) {
        switch (keyCode) {
        case KeyCode.DOWN:
        case KeyCode.UP:
        case KeyCode.LEFT:
        case KeyCode.RIGHT:
          if (!ctrlKey) {
            toggleClear.call(self);
          }
          return true;
        case KeyCode.HOME:
          toggleClear.call(self);
          goStartMonth(self);
          return true;
        case KeyCode.END:
          toggleClear.call(self);
          goEndMonth(self);
          return true;
        case KeyCode.ENTER:
          self.fire('select', { value: null });
          return true;
        }
      }
      switch (keyCode) {
      case KeyCode.DOWN:
        goWeek(self, 1);
        return true;
      case KeyCode.UP:
        goWeek(self, -1);
        return true;
      case KeyCode.LEFT:
        if (ctrlKey) {
          goYear(self, -1);
        } else {
          goDay(self, -1);
        }
        return true;
      case KeyCode.RIGHT:
        if (ctrlKey) {
          goYear(self, 1);
        } else {
          goDay(self, 1);
        }
        return true;
      case KeyCode.HOME:
        goStartMonth(self);
        return true;
      case KeyCode.END:
        goEndMonth(self);
        return true;
      case KeyCode.PAGE_DOWN:
        goMonth(self, 1);
        return true;
      case KeyCode.PAGE_UP:
        goMonth(self, -1);
        return true;
      case KeyCode.ENTER:
        self.fire('select', { value: self.get('value') });
        return true;
      }
      return undefined;
    }
  }, {
    xclass: 'date-picker',
    ATTRS: {
      handleGestureEvents: { value: true },
      focusable: { value: true },
      allowTextSelection: { value: false },
      contentTpl: { value: PickerTpl },
      value: {
        render: 1,
        sync: 0,
        valueFn: function () {
          var date = new GregorianCalendar();
          date.setTime(util.now());
          return date;
        }
      },
      previousYearBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('prev-year-btn');
        }
      },
      nextYearBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('next-year-btn');
        }
      },
      previousMonthBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('prev-month-btn');
        }
      },
      monthSelectEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('month-select');
        }
      },
      monthSelectContentEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('month-select-content');
        }
      },
      monthPanel: { valueFn: setUpMonthPanel },
      nextMonthBtn: {
        selector: function () {
          return '.' + this.getBaseCssClass('next-month-btn');
        }
      },
      clearBtnEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('clear-btn');
        }
      },
      tbodyEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('tbody');
        }
      },
      todayBtnEl: {
        selector: function () {
          return '.' + this.getBaseCssClass('today-btn');
        }
      },
      dateRender: {},
      disabledDate: {},
      locale: {
        valueFn: function () {
          return locale;
        }
      },
      showToday: {
        render: 1,
        value: true
      },
      showClear: {
        render: 1,
        value: true
      },
      clear: {
        render: 1,
        value: false
      },
      showWeekNumber: {
        render: 1,
        value: true
      }
    }
  });
  DatePicker.version = '1.0.2';
  var PopupPickerTpl = datePickerXtplPopupRender, Shim = componentExtensionShim, AlignExtension = componentExtensionAlign;
  DatePicker.Popup = DatePicker.extend([
    Shim,
    AlignExtension
  ], {}, {
    xclass: 'popup-date-picker',
    ATTRS: { contentTpl: { value: PopupPickerTpl } }
  });
  return exports;
}();
module.exports = datePicker;
});