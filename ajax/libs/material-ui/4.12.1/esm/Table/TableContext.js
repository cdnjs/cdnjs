import * as React from 'react';
/**
 * @ignore - internal component.
 */

var TableContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  TableContext.displayName = 'TableContext';
}

export default TableContext;