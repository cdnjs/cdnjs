/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { AriaSelection } from '../accessibility';
import { CommonProps, GroupBase, Options } from '../types';
export interface LiveRegionProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends CommonProps<Option, IsMulti, Group> {
    children: ReactNode;
    innerProps: {
        className?: string;
    };
    ariaSelection: AriaSelection<Option, IsMulti>;
    focusedOption: Option | null;
    focusedValue: Option | null;
    selectValue: Options<Option>;
    focusableOptions: Options<Option>;
    isFocused: boolean;
    id: string;
}
declare const LiveRegion: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: LiveRegionProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default LiveRegion;
