import * as React from 'react';
export const isRefObject = (refObject)=>{
    return typeof refObject === 'object' && refObject !== null && refObject.hasOwnProperty('current');
};

//# sourceMappingURL=isRefObject.js.map