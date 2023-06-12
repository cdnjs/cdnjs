import { ReactElement } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { InputProps } from '../components/Input';
import { GroupBase } from '../types';
export declare type InputComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: InputProps<Option, IsMulti, Group>) => ReactElement;
export declare type AnimatedInputProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = InputProps<Option, IsMulti, Group> & Partial<TransitionProps>;
declare const AnimatedInput: (WrappedComponent: InputComponent) => InputComponent;
export default AnimatedInput;
