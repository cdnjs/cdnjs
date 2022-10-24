import { Component, ReactNode } from 'react';
interface NonceProviderProps {
    nonce: string;
    children: ReactNode;
    cacheKey: string;
}
export default class NonceProvider extends Component<NonceProviderProps> {
    constructor(props: NonceProviderProps);
    createEmotionCache: (nonce: string, key: string) => import("@emotion/react").EmotionCache;
    render(): JSX.Element;
}
export {};
