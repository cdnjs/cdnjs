import * as React from 'react';
import { ReactElement } from 'react';
import { SingleValueProps } from '../components/SingleValue';
import { GroupBase } from '../types';
export declare type SingleValueComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: SingleValueProps<Option, IsMulti, Group>) => ReactElement;
declare const AnimatedSingleValue: (WrappedComponent: SingleValueComponent) => <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: SingleValueProps<Option, IsMulti, Group>) => React.JSX.Element;
export default AnimatedSingleValue;
