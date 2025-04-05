import * as React from 'react';
import { ReactElement } from 'react';
import { PlaceholderProps } from '../components/Placeholder';
import { GroupBase } from '../types';
export declare type PlaceholderComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: PlaceholderProps<Option, IsMulti, Group>) => ReactElement;
declare const AnimatedPlaceholder: (WrappedComponent: PlaceholderComponent) => <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: PlaceholderProps<Option, IsMulti, Group>) => React.JSX.Element;
export default AnimatedPlaceholder;
