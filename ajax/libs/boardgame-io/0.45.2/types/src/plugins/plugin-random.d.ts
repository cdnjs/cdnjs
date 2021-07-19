import type { Plugin } from '../types';
import type { RandomAPI, PrivateRandomAPI, RandomState } from './random/random';
declare const RandomPlugin: Plugin<RandomAPI & PrivateRandomAPI, RandomState>;
export default RandomPlugin;
