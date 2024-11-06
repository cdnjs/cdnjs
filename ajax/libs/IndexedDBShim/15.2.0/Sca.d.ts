export type AnyValue = any;
/**
 * We are keeping the callback approach for now in case we wish to reexpose
 * `Blob`, `File`, `FileList` asynchronously (though in such a case, we
 * should probably refactor as a Promise).
 * @param {AnyValue} obj
 * @param {(str: string) => void} [func]
 * @throws {Error}
 * @returns {string}
 */
export function encode(obj: AnyValue, func?: ((str: string) => void) | undefined): string;
/**
 * @typedef {any} AnyValue
 */
/**
 * @param {string} obj
 * @returns {AnyValue}
 */
export function decode(obj: string): AnyValue;
/**
 * @param {AnyValue} val
 * @returns {AnyValue}
 */
export function clone(val: AnyValue): AnyValue;
/**
 * @param {(preset: import('typeson-registry').Preset) =>
 *   import('typeson-registry').Preset} func
 * @returns {void}
 */
export function register(func: (preset: import("typeson-registry").Preset) => import("typeson-registry").Preset): void;
//# sourceMappingURL=Sca.d.ts.map