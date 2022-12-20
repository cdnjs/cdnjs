/// export * as default from './base.js';

// Workaround for TS missing feature.
import * as queryString from './base.js';

export default queryString;

export {
	type ParseOptions,
	type ParsedQuery,
	type ParsedUrl,
	type StringifyOptions,
	type Stringifiable,
	type StringifiableRecord,
	type UrlObject,
} from './base.js';
