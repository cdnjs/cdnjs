this.primereact = this.primereact || {};
this.primereact.row = (function (exports, React, componentbase, utils, api) {
    'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var React__namespace = /*#__PURE__*/_interopNamespace(React);

    var RowBase = componentbase.ComponentBase.extend({
      defaultProps: {
        __TYPE: 'Row',
        style: null,
        className: null,
        children: undefined
      },
      getCProp: function getCProp(row, name) {
        return utils.ObjectUtils.getComponentProp(row, name, RowBase.defaultProps);
      }
    });

    var Row = function Row(inProps) {
      var context = React__namespace.useContext(api.PrimeReactContext);
      var props = RowBase.getProps(inProps, context);
      //@todo Pass Parent MetaData
      var _RowBase$setMetaData = RowBase.setMetaData({
          props: props
        }),
        ptm = _RowBase$setMetaData.ptm;
      var rootProps = utils.mergeProps({
        className: props.className,
        style: props.style
      }, RowBase.getOtherProps(props), ptm('root'));
      return /*#__PURE__*/React__namespace.createElement("tr", rootProps, props.children);
    };
    Row.displayName = 'Row';

    exports.Row = Row;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, React, primereact.componentbase, primereact.utils, primereact.api);
