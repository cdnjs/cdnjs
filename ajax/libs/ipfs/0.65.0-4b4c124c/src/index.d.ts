/**
 * @typedef {import('ipfs-core-types').IPFS} IPFS
 */
export const create: typeof import("ipfs-core/dist/src/components/index.js").create;
export const globSource: typeof import("ipfs-utils/dist/src/files/glob-source.js");
export const urlSource: typeof import("ipfs-utils/dist/src/files/url-source.js");
export const path: typeof pathImport;
export type IPFS = import('ipfs-core-types').IPFS;
import { path as pathImport } from "./path.js";
//# sourceMappingURL=index.d.ts.map