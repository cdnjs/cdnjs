import { ReactElement } from 'react';
import { ValueContainerProps } from '../components/containers';
import { GroupBase } from '../types';
export declare type ValueContainerComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ValueContainerProps<Option, IsMulti, Group>) => ReactElement;
declare const AnimatedValueContainer: (WrappedComponent: ValueContainerComponent) => <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ValueContainerProps<Option, IsMulti, Group>) => JSX.Element;
export default AnimatedValueContainer;
