import { ReactElement } from 'react';
import { ValueContainerProps } from '../components/containers';
import { GroupBase, OptionBase } from '../types';
export declare type ValueContainerComponent = <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ValueContainerProps<Option, IsMulti, Group>) => ReactElement;
declare const AnimatedValueContainer: (WrappedComponent: ValueContainerComponent) => <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ValueContainerProps<Option, IsMulti, Group>) => JSX.Element;
export default AnimatedValueContainer;
