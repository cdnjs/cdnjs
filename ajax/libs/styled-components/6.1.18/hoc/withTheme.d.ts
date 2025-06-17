import React from 'react';
import { AnyComponent, ExecutionProps } from '../types';
import { NonReactStatics } from '../utils/hoist';
export default function withTheme<T extends AnyComponent>(Component: T): React.ForwardRefExoticComponent<React.PropsWithoutRef<React.JSX.LibraryManagedAttributes<T, ExecutionProps>> & React.RefAttributes<T>> & NonReactStatics<T>;
