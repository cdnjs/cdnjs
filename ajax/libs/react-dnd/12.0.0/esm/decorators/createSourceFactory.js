function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { invariant } from '@react-dnd/invariant';
import { isPlainObject, getDecoratedComponent } from './utils';
var ALLOWED_SPEC_METHODS = ['canDrag', 'beginDrag', 'isDragging', 'endDrag'];
var REQUIRED_SPEC_METHODS = ['beginDrag'];

var SourceImpl = /*#__PURE__*/function () {
  function SourceImpl(spec, monitor, ref) {
    var _this = this;

    _classCallCheck(this, SourceImpl);

    this.props = null;

    this.beginDrag = function () {
      if (!_this.props) {
        return;
      }

      var item = _this.spec.beginDrag(_this.props, _this.monitor, _this.ref.current);

      if (process.env.NODE_ENV !== 'production') {
        invariant(isPlainObject(item), 'beginDrag() must return a plain object that represents the dragged item. ' + 'Instead received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', item);
      }

      return item;
    };

    this.spec = spec;
    this.monitor = monitor;
    this.ref = ref;
  }

  _createClass(SourceImpl, [{
    key: "receiveProps",
    value: function receiveProps(props) {
      this.props = props;
    }
  }, {
    key: "canDrag",
    value: function canDrag() {
      if (!this.props) {
        return false;
      }

      if (!this.spec.canDrag) {
        return true;
      }

      return this.spec.canDrag(this.props, this.monitor);
    }
  }, {
    key: "isDragging",
    value: function isDragging(globalMonitor, sourceId) {
      if (!this.props) {
        return false;
      }

      if (!this.spec.isDragging) {
        return sourceId === globalMonitor.getSourceId();
      }

      return this.spec.isDragging(this.props, this.monitor);
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
      if (!this.props) {
        return;
      }

      if (!this.spec.endDrag) {
        return;
      }

      this.spec.endDrag(this.props, this.monitor, getDecoratedComponent(this.ref));
    }
  }]);

  return SourceImpl;
}();

export function createSourceFactory(spec) {
  Object.keys(spec).forEach(function (key) {
    invariant(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', ALLOWED_SPEC_METHODS.join(', '), key);
    invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
  });
  REQUIRED_SPEC_METHODS.forEach(function (key) {
    invariant(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
  });
  return function createSource(monitor, ref) {
    return new SourceImpl(spec, monitor, ref);
  };
}