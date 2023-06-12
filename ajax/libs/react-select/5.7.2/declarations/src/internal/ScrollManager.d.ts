/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ReactElement, RefCallback } from 'react';
interface Props {
    readonly children: (ref: RefCallback<HTMLElement>) => ReactElement;
    readonly lockEnabled: boolean;
    readonly captureEnabled: boolean;
    readonly onBottomArrive?: (event: WheelEvent | TouchEvent) => void;
    readonly onBottomLeave?: (event: WheelEvent | TouchEvent) => void;
    readonly onTopArrive?: (event: WheelEvent | TouchEvent) => void;
    readonly onTopLeave?: (event: WheelEvent | TouchEvent) => void;
}
export default function ScrollManager({ children, lockEnabled, captureEnabled, onBottomArrive, onBottomLeave, onTopArrive, onTopLeave, }: Props): jsx.JSX.Element;
export {};
