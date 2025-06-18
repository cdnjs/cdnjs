export * from './util.js'

import { coreFetch } from './core.js'

import { create } from './create.js'

let fn = coreFetch

export default fn
const createZlFetch = create

export { create, createZlFetch }
