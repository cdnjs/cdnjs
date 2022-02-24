import React from 'react';
import { ExtensibleObject, Interpolation, Styles } from '../types';
export default function createGlobalStyle<Props = unknown>(strings: Styles<Props>, ...interpolations: Array<Interpolation<Props>>): React.NamedExoticComponent<ExtensibleObject>;
