export * from './util.js'

import { coreFetch, createShorthandMethods } from './core.js'

import { create } from './create.js'

let fn = coreFetch
fn = createShorthandMethods(fn)

export default fn
export const createZlFetch = create
