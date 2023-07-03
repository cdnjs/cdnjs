import * as React from 'react';
import { ComponentBase } from 'primereact/componentbase';
import { ObjectUtils, mergeProps } from 'primereact/utils';
import { PrimeReactContext } from 'primereact/api';

var RowBase = ComponentBase.extend({
  defaultProps: {
    __TYPE: 'Row',
    style: null,
    className: null,
    children: undefined
  },
  getCProp: function getCProp(row, name) {
    return ObjectUtils.getComponentProp(row, name, RowBase.defaultProps);
  }
});

var Row = function Row(inProps) {
  var context = React.useContext(PrimeReactContext);
  var props = RowBase.getProps(inProps, context);
  //@todo Pass Parent MetaData
  var _RowBase$setMetaData = RowBase.setMetaData({
      props: props
    }),
    ptm = _RowBase$setMetaData.ptm;
  var rootProps = mergeProps({
    className: props.className,
    style: props.style
  }, RowBase.getOtherProps(props), ptm('root'));
  return /*#__PURE__*/React.createElement("tr", rootProps, props.children);
};
Row.displayName = 'Row';

export { Row };
