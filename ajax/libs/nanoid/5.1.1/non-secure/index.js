/* @ts-self-types="./index.d.ts" */
/**
 * By default, Nano ID uses hardware random bytes generation for security
 * and low collision probability. If you are not so concerned with security,
 * you can use it for environments without hardware random generators.
 *
 * ```js
 * import { nanoid } from 'nanoid/non-secure'
 * const id = nanoid()
 * ```
 *
 * @module
 */
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
export let customAlphabet = (alphabet, defaultSize = 21) => {
  return (size = defaultSize) => {
    let id = ''
    let i = size | 0
    while (i--) {
      id += alphabet[(Math.random() * alphabet.length) | 0]
    }
    return id
  }
}
export let nanoid = (size = 21) => {
  let id = ''
  let i = size | 0
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0]
  }
  return id
}
