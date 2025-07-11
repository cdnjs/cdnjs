import * as React from 'react';
import { ReactNode } from 'react';
interface NonceProviderProps {
    nonce: string;
    children: ReactNode;
    cacheKey: string;
}
declare const _default: ({ nonce, children, cacheKey }: NonceProviderProps) => React.JSX.Element;
export default _default;
