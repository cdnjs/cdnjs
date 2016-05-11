export const version: {
  alpha: string|boolean
  beta: string|boolean
  full: string
  major: number
  minor: number
  patch: number
}
export interface Diff {
  added: any
  changed: any
  removed: any
}
export const utils: {
  Promise: PromiseConstructor
  _(dest: any, src: any): void
  _forRelation(opts: any, def: any, fn: Function, ctx: Object): void
  _getIndex(list: any[], relation: any): number
  addHiddenPropsToTarget(target: Object, props: Object): void
  areDifferent(a: Object, b: Object, opts: any): boolean
  classCallCheck(instance: Object, ctor: Function): void
  copy(from: any, to?: any, stackFrom?: any, stackTo?: any, blacklist?: any[], plain?: boolean): any
  deepFillIn(dest: Object, source: Object): Object
  deepMixIn(dest: Object, source: Object): Object
  diffObjects(a: any, b: any, opts: any): Diff
  equal(a: any, b: any): boolean
  eventify(target: any, getter: Function, setter: Function, enumerable?: boolean): void
  extend(props?: any, classProps?: any): Function
  fillIn(dest: Object, src: Object): void
  findIndex(array: any[], fn: Function): void
  forEachRelation(mapper: any, opts: any, fn: Function, ctx?: any): void
  forOwn(obj: any, fn: Function, thisArg?: Object): void
  fromJson(json: any): any
  'get'(object: Object, prop: string): any
  getSuper(instance: any, isCtor?: boolean): Function
  intersection(array1: any[], array2: any[]): any[]
  isArray(arg: any): boolean
  isBlacklisted(prop: string, bl: any[]): boolean
  isBoolean(value: any): boolean
  isBrowser: boolean
  isDate(value: any): boolean
  isFunction(value: any): boolean
  isInteger(value: any): boolean
  isNull(value: any): boolean
  isNumber(value: any): boolean
  isObject(value: any): boolean
  isRegExp(value: any): boolean
  isSorN(value: any): boolean
  isString(value: any): boolean
  isUndefined(value: any): boolean
  logify(target: any, defaultNamespace: any): void
  noDupeAdd(array: any[], record: any, fn: Function): void
  omit(props: Object, keys: string[]): Object
  plainCopy(from: any): any
  possibleConstructorReturn(self: Object, call: Object | Function): Object
  reject(value: any): Promise<any>
  remove(array: any[], fn: Function): void
  resolve(value: any): Promise<any>
  set(object: Object, path: string, value?: any): void
  strictEqual(a: any, b: any): boolean
  toJson(value: any, replacer?: Function, space?: number): string
  unset(object: Object, path: string): void
}
export class Component {
  static extend(instanceProps?: any, classProps?: any): any
  _listeners: Object
  dbg(...args: any[]): void
  emit(key: string, ...args: any[]): void
  log(level: string, ...args: any[]): void
  off(key?: string, handler?: Function): void
  on(key: string, handler: Function, ctx?: any): void
}
export class Record extends Component {
  static mapper: Mapper
  constructor(props?: any, opts?: any)
  _set(prop: any, value?: any): void
  _get(prop: string): any
  _unset(prop: any): void
  _mapper(): Mapper
  afterLoadRelations(): void
  afterSave(): void
  beforeSave(): void
  beforeLoadRelations(): void
  changes(opts?: any): Diff
  commit(): this
  create(opts?: any): Promise<Record>
  destroy(opts?: any): Promise<any>
  loadRelations(relations: any, opts?: any): Promise<this>
  'get'(key: string): any
  hasChanges(opts?: any): boolean
  hashCode(): string|number
  previous(key: any): any
  revert(opts?: any): this
  save(opts?: any): Promise<this>
  'set'(key: string, value?: any, opts?: any): void
  toJSON(opts?: any): any
  unset(key: string, opts?: any): void
}
export class Mapper extends Component {
  _adapters: Object
  applySchema: boolean
  name: string
  defaultAdapter: string
  debug: boolean
  idAttribute: string
  lifecycleMethods: any
  notify: boolean
  raw: boolean
  recordClass: typeof Record
  relationList: any[]
  relationFields: string[]
  schema: Schema
  constructor(opts?: any)
  afterCount(query: any, opts: any, result: any): any
  afterCreate(props: any, opts: any, result: any): any
  afterCreateMany(records: any[], opts: any, result: any): any
  afterDestroy(id: string|number, opts: any, result: any): any
  afterDestroyAll(query: any, opts: any, result: any): any
  afterFind(id: string|number, opts: any, result: any): any
  afterFindAll(query: any, opts: any, result: any): any
  afterSum(field: string, query:any, opts: any, result: any): any
  afterUpdate(id: string|number, opts: any, result: any): any
  afterUpdateAll(props: any, query: any, opts: any, result: any): any
  afterUpdateMany(records: any[], opts: any, result: any): any
  beforeCreate(props: any, opts: any): any
  beforeCreateMany(records: any[], opts: any): any
  beforeCount(query: any, opts: any): any
  beforeDestroy(id: string|number, opts: any): any
  beforeDestroyAll(query: any, opts: any): any
  beforeFind(id: string|number, opts: any): any
  beforeFindAll(query: any, opts: any): any
  beforeSum(field: string, query: any, opts: any): any
  beforeUpdate(id: string|number, opts: any): any
  beforeUpdateAll(query: any, opts: any): any
  beforeUpdateMany(records: any[], opts: any): any
  _end(result: any, opts: any, skip?: boolean): any
  belongsTo(relatedMapper: any, opts: any): void
  count(query: any, opts?: any): Promise<any>
  create(props: any, opts?: any): Promise<any>
  createInstance(props: any, opts?: any): any
  createMany(records: any[], opts?: any): Promise<any>
  createRecord(props?: any, opts?: any): Record
  crud(method: any, ...args: any[]): Promise<any>
  destroy(id: string|number, opts?: any): Promise<any>
  destroyAll(query: any, opts?: any): Promise<any>
  find(id: string|number, opts?: any): Promise<any>
  findAll(query: any, opts?: any): Promise<any>
  getAdapter(name: any): any
  getAdapterName(opts?: any): any
  getAdapters(): any
  getSchema(): Schema
  hasMany(relatedMapper: any, opts: any): void
  hasOne(relatedMapper: any, opts: any): void
  is(record: any): boolean
  registerAdapter(name: string, adapter: any, opts?: any): void
  sum(field: string, query: any, opts?: any): Promise<any>
  toJSON(record: any, opts?: any): {}
  update(id: string|number, props: any, opts?: any): Promise<any>
  updateAll(props: any, query: any, opts?: any): Promise<any>
  updateMany(records: any[], opts?: any): Promise<any>
}
export class Collection extends Component {
  idAttribute: string
  onConflict: string
  recordOpts: any
  index: Index
  indexes: any
  mapper: Mapper
  constructor(records?: any[], opts?: any)
  _onRecordEvent(...args: any[]): void
  add(records: any, opts?: any): any
  afterAdd(...args: any[]): void
  afterRemove(...args: any[]): void
  afterRemoveAll(...args: any[]): void
  beforeAdd(...args: any[]): void
  beforeRemove(...args: any[]): void
  beforeRemoveAll(...args: any[]): void
  between(leftKeys: any, rightKeys: any, opts?: any): any[]
  createIndex(name: any, fieldList: any, opts?: any): this
  filter(query: any, thisArg?: any): any[]
  forEach(cb: Function, thisArg?: any): void
  get(id: string|number): any
  getAll(...args: any[]): any[]
  getIndex(name: string): any
  limit(num: number): any[]
  map(cb: any, thisArg: any): any[]
  mapCall(funcName: string, ...args: any[]): any[]
  recordId(record?: any): any
  query(): Query
  reduce(cb: Function, initialValue: any): any
  remove(id: string|number, opts?: any): any
  removeAll(query: any, opts?: any): void | any[]
  skip(num: number): any[]
  toJSON(opts?: any): any[]
  updateIndex(record: any, opts?: any): void
  updateIndexes(record: any): void
}
export class LinkedCollection extends Collection {
  _added: Object
  datastore: DataStore
}
export class Container extends Component {
  mapperDefaults: any
  mapperClass: typeof Mapper
  _adapters: Object
  _mappers: Object
  constructor(opts?: any)
  createRecord(name: string, props?: any, opts?: any): Record
  defineMapper(name: string, opts?: any): Mapper
  defineResource(name: string, opts?: any): Mapper
  getAdapter(name: any): any
  getAdapterName(opts?: any): string
  getAdapters(): any
  getMapper(name: string): Mapper
  registerAdapter(name: string, adapter: any, opts?: any): void
}
export class DataStore extends Container {
  collectionClass: typeof LinkedCollection
  _collections: Object
  _pendingQueries: Object
  _completedQueries: Object
  linkRelations: boolean
  constructor(opts?: any)
  add(mapperName: string, records: any[]|any, opts?: any): any[]|any
  addToCache(mapperName: string, data: any, opts: any): any
  between(mapperName: string, leftKeys: any, rightKeys: any, opts?: any): any[]
  cachedFind(mapperName: string, id: string|number, opts: any): any
  cachedFindAll(mapperName: string, hash: string, opts: any): any
  cacheFind(mapperName: string, data: any, id: string|number, opts: any): void
  cacheFindAll(mapperName: string, data: any, hash: string, opts: any): void
  createIndex(mapperName: string, name: any, fieldList: any, opts?: any): LinkedCollection
  filter(mapperName: string, query: any, thisArg?: any): any[]
  get(mapperName: string, id: string|number): any
  getAll(mapperName: string, ...args: any[]): any[]
  query(mapperName: string): Query
  remove(mapperName: string, id: string|number, opts?: any): any
  removeAll(mapperName: string, query?: any, opts?: any): void | any[]
  toJson(mapperName: string, opts?: any): any[]
  _callSuper(method: string, ...args: any[]): any
  _end(mapperName: string, data: any, opts?: any): any
  create(mapperName: string, record: any, opts?: any): Promise<any>
  createMany(mapperName: string, records: any, opts?: any): Promise<any[]|any>
  defineMapper(mapperName: string, opts?: any): Mapper
  destroy(mapperName: string, id: any, opts?: any): Promise<any>
  destroyAll(mapperName: string, query?: any, opts?: any): Promise<any>
  find(mapperName: string, id: any, opts?: any): Promise<any>
  findAll(mapperName: string, query?: any, opts?: any): Promise<any>
  cachedFind(mapperName: string, id: any, opts?: any): any
  cachedFindAll(mapperName: string, query: any, opts?: any): any
  hashQuery(mapperName: string, query: any, opts?: any): string
  getCollection(mapperName: string): LinkedCollection
  update(mapperName: string, id: any, record: any, opts?: any): Promise<any>
  updateAll(mapperName: string, props: any, query?: any, opts?: any): Promise<any[]|any>
  updateMany(mapperName: string, records: any, opts?: any): Promise<any[]|any>
}
export class Query extends Component {
  static ops: {
    '=='(value: any, predicate: any): boolean
    '==='(value: any, predicate: any): boolean
    '!='(value: any, predicate: any): boolean
    '!=='(value: any, predicate: any): boolean
    '>'(value: any, predicate: any): boolean
    '>='(value: any, predicate: any): boolean
    '<'(value: any, predicate: any): boolean
    '<='(value: any, predicate: any): boolean
    'isectEmpty'(value: any, predicate: any): boolean
    'isectNotEmpty'(value: any, predicate: any): number
    'in'(value: any, predicate: any): boolean
    'notIn'(value: any, predicate: any): boolean
    'contains'(value: any, predicate: any): boolean
    'notContains'(value: any, predicate: any): boolean
  }
  collection: Collection|LinkedCollection
  data: any[]
  constructor(collection?: Collection)
  compare(orderBy: any, index: any, a: any, b: any): any
  evaluate(value: any, op: string, predicate: any): boolean
  like(pattern: any, flags: any): RegExp
  getData(): any[]
  between(leftKeys: any, rightKeys: any, opts?: any): this
  get(keyList?: any[], opts?: any): this
  getAll(...args: any[]): this
  filter(query: any, thisArg?: any): this
  skip(num: number): this
  limit(num: number): this
  forEach(forEachFn: Function, thisArg?: any): this
  map(mapFn: Function, thisArg?: any): this
  mapCall(funcName: string, ...args: any[]): this
  run(): any[]
}
export interface SchemaValidationError {
  expected: any
  actual: string
  path: string
}
export class Schema extends Component {
  static types: {
    array(value: any): boolean
    boolean(value: any): boolean
    integer(value: any): boolean
    'null'(value: any): boolean
    number(value: any): boolean
    object(value: any): boolean
    string(value: any): boolean
  }
  static typeGroupValidators: {
    array(value: any, schema: any, opts: any): SchemaValidationError[]
    integer(value: any, schema: any, opts: any): SchemaValidationError[]
    number(value: any, schema: any, opts: any): SchemaValidationError[]
    numeric(value: any, schema: any, opts: any): SchemaValidationError[]
    object(value: any, schema: any, opts: any): SchemaValidationError[]
    string(value: any, schema: any, opts: any): SchemaValidationError[]
  }
  static validationKeywords: {
    allOf(value: any, schema: any, opts: any): SchemaValidationError[]
    anyOf(value: any, schema: any, opts: any): SchemaValidationError[]
    dependencies(value: any, schema: any, opts: any): void
    enum(value: any, schema: any, opts: any): SchemaValidationError
    items(value: any, schema: any, opts: any): SchemaValidationError[]
    maximum(value: any, schema: any, opts: any): SchemaValidationError
    maxItems(value: any, schema: any, opts: any): SchemaValidationError
    maxLength(value: any, schema: any, opts: any): SchemaValidationError
    maxProperties(value: any, schema: any, opts: any): SchemaValidationError
    minimum(value: any, schema: any, opts: any): SchemaValidationError
    minItems(value: any, schema: any, opts: any): SchemaValidationError
    minLength(value: any, schema: any, opts: any): SchemaValidationError
    minProperties(value: any, schema: any, opts: any): SchemaValidationError
    multipleOf(value: any, schema: any, opts: any): SchemaValidationError
    not(value: any, schema: any, opts: any): SchemaValidationError
    oneOf(value: any, schema: any, opts: any): SchemaValidationError[]
    pattern(value: any, schema: any, opts: any): SchemaValidationError
    properties(value: any, schema: any, opts: any): SchemaValidationError[]
    required(value: any, schema: any, opts: any): SchemaValidationError[]
    type(value: any, schema: any, opts: any): SchemaValidationError
    uniqueItems(value: any, schema: any, opts: any): SchemaValidationError
  }
  static validate(value: any, schema: any, opts: any): SchemaValidationError[]
  properties: any
  constructor(definition: any)
  apply(target: any, opts?: any): void
  validate(value: any, opts?: any): SchemaValidationError[]
}
export class Index {
  fieldList: string[]
  fieldGetter: Function
  hashCode: Function
  isIndex: boolean
  keys: any[]
  values: any[]
  constructor(fieldList: string[], opts?: any)
  'set'(keyList: any[], value: any): void
  'get'(keyList: any[]): any
  getAll(): any[]
  visitAll(cb: Function, thisArg?: any): void
  between(leftKeys: any, rightKeys: any, opts?: any): any[]
  _between(leftKeys: any, rightKeys: any, opts: any): any[]
  peek(): any
  clear(): void
  insertRecord(data: any): void
  removeRecord(data: any): any
  updateRecord(data: any): void
}
export const belongsToType: string
export const hasManyType: string
export const hasOneType: string
export const belongsTo: (related: any, opts: any) => (target: any) => void
export const hasMany: (related: any, opts: any) => (target: any) => void
export const hasOne: (related: any, opts: any) => (target: any) => void
