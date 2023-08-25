import * as React from 'react';
// Workaround for https://github.com/webpack/webpack/issues/14814
// https://github.com/eps1lon/material-ui/blob/8d5f135b4d7a58253a99ab56dce4ac8de61f5dc1/packages/mui-utils/src/useId.ts#L21
const maybeReactUseId = React['useId'.toString()];
let id = 0;
// TODO [react@>=18]: Remove after React 18
function useIncrementingCounterID() {
    const [state] = React.useState(()=>id++);
    return `:r${state}:`;
}
export const useId = maybeReactUseId ?? useIncrementingCounterID;

//# sourceMappingURL=useId.js.map