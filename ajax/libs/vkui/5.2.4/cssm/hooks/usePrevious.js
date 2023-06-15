import * as React from 'react';
export function usePrevious(value) {
  var ref = React.useRef();
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
}
//# sourceMappingURL=usePrevious.js.map