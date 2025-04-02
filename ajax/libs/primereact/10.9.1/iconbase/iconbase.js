this.primereact = this.primereact || {};
this.primereact.iconbase = (function (exports, utils) {
    'use strict';

    var IconBase = {
      defaultProps: {
        __TYPE: 'IconBase',
        className: null,
        label: null,
        spin: false
      },
      getProps: function getProps(props) {
        return utils.ObjectUtils.getMergedProps(props, IconBase.defaultProps);
      },
      getOtherProps: function getOtherProps(props) {
        return utils.ObjectUtils.getDiffProps(props, IconBase.defaultProps);
      },
      getPTI: function getPTI(props) {
        var isLabelEmpty = utils.ObjectUtils.isEmpty(props.label);
        var otherProps = IconBase.getOtherProps(props);
        var ptiProps = {
          className: utils.classNames('p-icon', {
            'p-icon-spin': props.spin
          }, props.className),
          role: !isLabelEmpty ? 'img' : undefined,
          'aria-label': !isLabelEmpty ? props.label : undefined,
          'aria-hidden': props.label ? isLabelEmpty : undefined
        };
        return utils.ObjectUtils.getMergedProps(otherProps, ptiProps);
      }
    };

    exports.IconBase = IconBase;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, primereact.utils);
