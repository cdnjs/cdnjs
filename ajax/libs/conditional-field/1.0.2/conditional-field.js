'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConditionalField = function () {
  function ConditionalField(args) {
    _classCallCheck(this, ConditionalField);

    this.$control = $(args.control);

    if (this.$control.length == 0) return;

    this.args = args;
    this.inputType = this.getInputType();
    this.setVisible(this.inputValue());

    this.onChangeBound = this.onChange.bind(this);
    this.$control.on('change', this.onChangeBound);
  }

  _createClass(ConditionalField, [{
    key: 'onChange',
    value: function onChange(e) {
      var value = this.inputValue();
      this.setVisible(value);
    }
  }, {
    key: 'setVisible',
    value: function setVisible(value) {
      for (var controlValue in this.args.visibility) {
        if (value == controlValue) {
          $(this.args.visibility[controlValue]).show();
        } else {
          $(this.args.visibility[controlValue]).hide();
        }
      }
    }
  }, {
    key: 'getInputType',
    value: function getInputType() {
      if (this.$control.is('select')) {
        return 'select';
      } else if (this.$control.is(':radio')) {
        return 'radio';
      } else if (this.$control.is(':checkbox')) {
        return 'checkbox';
      }
    }
  }, {
    key: 'inputValue',
    value: function inputValue() {
      var value = '';
      switch (this.inputType) {
        case 'checkbox':
          value = this.$control.is(':checked') ? 'on' : 'off';
          break;
        case 'radio':
          value = this.$control.filter(':checked').val();
          break;
        default:
          value = this.$control.val();
      }
      return value;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.$control.off('change', this.onChangeBound);
    }
  }]);

  return ConditionalField;
}();
//# sourceMappingURL=conditional-field.js.map
