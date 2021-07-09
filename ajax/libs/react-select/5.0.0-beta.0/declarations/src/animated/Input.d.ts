import { ReactElement } from 'react';
import { TransitionProps } from 'react-transition-group/Transition';
import { InputProps } from '../components/Input';
import { GroupBase, OptionBase } from '../types';
export declare type InputComponent = <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: InputProps<Option, IsMulti, Group>) => ReactElement;
export declare type AnimatedInputProps<Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>> = InputProps<Option, IsMulti, Group> & Partial<TransitionProps>;
declare const AnimatedInput: (WrappedComponent: InputComponent) => InputComponent;
export default AnimatedInput;
