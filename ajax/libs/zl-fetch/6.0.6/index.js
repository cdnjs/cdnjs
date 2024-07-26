export * from './util.js'

import { coreFetch, createShorthandMethods } from './core.js'

import { create } from './create.js'

let fn = coreFetch
fn = createShorthandMethods(fn)

export default fn
const createZlFetch = create

export { create, createZlFetch }
