'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * 模板错误处理类
 * @param   {Object}    options
 */
var TemplateError = function (_Error) {
    _inherits(TemplateError, _Error);

    function TemplateError(options) {
        _classCallCheck(this, TemplateError);

        var _this = _possibleConstructorReturn(this, (TemplateError.__proto__ || Object.getPrototypeOf(TemplateError)).call(this, options.message));

        _this.name = 'TemplateError';
        _this.message = formatMessage(options);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, _this.constructor);
        }
        return _this;
    }

    return TemplateError;
}(Error);

function formatMessage(_ref) {
    var name = _ref.name,
        source = _ref.source,
        path = _ref.path,
        line = _ref.line,
        column = _ref.column,
        generated = _ref.generated,
        message = _ref.message;

    if (!source) {
        return message;
    }

    var lines = source.split(/\n/);
    var start = Math.max(line - 3, 0);
    var end = Math.min(lines.length, line + 3);

    // Error context
    var context = lines.slice(start, end).map(function (code, index) {
        var number = index + start + 1;
        var left = number === line ? ' >> ' : '    ';
        return '' + left + number + '| ' + code;
    }).join('\n');

    // Alter exception message
    return (path || 'anonymous') + ':' + line + ':' + column + '\n' + (context + '\n\n') + (name + ': ' + message) + (generated ? '\n   generated: ' + generated : '');
}

module.exports = TemplateError;