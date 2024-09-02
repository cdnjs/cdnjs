import type { ArchitectureDiagramConfig } from '../../config.type.js';
import type { ArchitectureDB } from './architectureTypes.js';
export declare const db: ArchitectureDB;
/**
 * Typed wrapper for resolving an architecture diagram's config fields. Returns the default value if undefined
 * @param field - the config field to access
 * @returns
 */
export declare function getConfigField<T extends keyof ArchitectureDiagramConfig>(field: T): Required<ArchitectureDiagramConfig>[T];
