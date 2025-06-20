import { coreFetch } from './core.js'
import { create } from './create.js'
export * from './util.js'
export { create }

const fn = coreFetch
const createZlFetch = create


export default fn
export { createZlFetch }
