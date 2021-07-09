import { ReactElement } from 'react';
import { PlaceholderProps } from '../components/Placeholder';
import { GroupBase, OptionBase } from '../types';
export declare type PlaceholderComponent = <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: PlaceholderProps<Option, IsMulti, Group>) => ReactElement;
declare const AnimatedPlaceholder: (WrappedComponent: PlaceholderComponent) => <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: PlaceholderProps<Option, IsMulti, Group>) => JSX.Element;
export default AnimatedPlaceholder;
