import { ReactElement } from 'react';
import { SingleValueProps } from '../components/SingleValue';
import { GroupBase, OptionBase } from '../types';
export declare type SingleValueComponent = <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: SingleValueProps<Option, IsMulti, Group>) => ReactElement;
declare const AnimatedSingleValue: (WrappedComponent: SingleValueComponent) => <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: SingleValueProps<Option, IsMulti, Group>) => JSX.Element;
export default AnimatedSingleValue;
