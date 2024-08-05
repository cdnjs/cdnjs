import { getAncestor } from 'cross-domain-utils/src';

export * from './client';
export * from './server';
export * from './config';

export var parent = getAncestor();