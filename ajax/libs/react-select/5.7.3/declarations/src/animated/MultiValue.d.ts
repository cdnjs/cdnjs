import { ReactElement } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { MultiValueProps } from '../components/MultiValue';
import { GroupBase } from '../types';
export declare type MultiValueComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MultiValueProps<Option, IsMulti, Group>) => ReactElement;
export declare type AnimatedMultiValueProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = MultiValueProps<Option, IsMulti, Group> & Partial<TransitionProps>;
declare const AnimatedMultiValue: (WrappedComponent: MultiValueComponent) => <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ in: inProp, onExited, ...props }: AnimatedMultiValueProps<Option, IsMulti, Group>) => JSX.Element;
export default AnimatedMultiValue;
