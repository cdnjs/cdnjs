import * as React from 'react';
import createShallow from './createShallow';
var shallow = createShallow();
var warnedOnce = false; // Helper function to extract the classes from a styleSheet.

export default function getClasses(element) {
  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  var useStyles = element.type.useStyles;
  var classes;

  function Listener() {
    classes = useStyles(element.props);
    return null;
  }

  shallow( /*#__PURE__*/React.createElement(Listener, null));
  return classes;
}