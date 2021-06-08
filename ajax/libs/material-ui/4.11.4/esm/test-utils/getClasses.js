import * as React from 'react';
import createShallow from './createShallow';
var shallow = createShallow(); // Helper function to extract the classes from a styleSheet.

export default function getClasses(element) {
  var useStyles = element.type.useStyles;
  var classes;

  function Listener() {
    classes = useStyles(element.props);
    return null;
  }

  shallow( /*#__PURE__*/React.createElement(Listener, null));
  return classes;
}