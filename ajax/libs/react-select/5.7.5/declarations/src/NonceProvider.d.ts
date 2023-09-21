import { ReactNode } from 'react';
interface NonceProviderProps {
    nonce: string;
    children: ReactNode;
    cacheKey: string;
}
declare const _default: ({ nonce, children, cacheKey }: NonceProviderProps) => JSX.Element;
export default _default;
