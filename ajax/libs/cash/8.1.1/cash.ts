
const propMap: Record<string, string> = {
  /* GENERAL */
  class: 'className',
  contenteditable: 'contentEditable',
  /* LABEL */
  for: 'htmlFor',
  /* INPUT */
  readonly: 'readOnly',
  maxlength: 'maxLength',
  tabindex: 'tabIndex',
  /* TABLE */
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  /* IMAGE */
  usemap: 'useMap'
};


function attempt<T, U> ( fn: (( arg?: U ) => T), arg?: U ): T | U {

  try {

    return fn ( arg );

  } catch {

    return arg;

  }

}


interface Event {
  namespace: string,
  data: any,
  relatedTarget?: Node | null,
  ___ifocus?: boolean, // Ignore focus
  ___iblur?: boolean, // Ignore blur
  ___ot?: string, // Original type
  ___td?: boolean // Trigger data
}

interface Cash {
  [Symbol.iterator](): IterableIterator<EleLoose>,
  [index: number]: EleLoose | undefined,
  length: number,
  splice ( start: number, deleteCount?: number ): EleLoose[],
  splice ( start: number, deleteCount: number, ...items: Ele[] ): EleLoose[]
}

interface CashStatic {
  fn: Cash
}

type falsy = undefined | null | false | 0 | '';

type Ele = Window | Document | HTMLElement | Element | Node;
type EleLoose = HTMLElement & Element & Node; //UGLY: Trick to remove some kind-of useless type errors //URL: https://github.com/fabiospampinato/cash/issues/278
type Selector = falsy | string | Function | HTMLCollection | NodeList | Ele | Ele[] | ArrayLike<Ele> | Cash;
type Comparator = string | Ele | Cash | (( this: EleLoose, index: number, ele: EleLoose ) => boolean);
type Context = Document | HTMLElement | Element;

type PlainObject<T> = Record<string, T>; //FIXME: Arrays can be assigned to this type, for whatever reason

type EventCallback = {
  ( event: any, data?: any ): any,
  guid?: number
};


const doc = document,
      win = window,
      docEle = doc.documentElement,
      createElement = doc.createElement.bind ( doc ),
      div = createElement ( 'div' ),
      table = createElement ( 'table' ),
      tbody = createElement ( 'tbody' ),
      tr = createElement ( 'tr' ),
      {isArray, prototype: ArrayPrototype} = Array,
      {concat, filter, indexOf, map, push, slice, some, splice} = ArrayPrototype;

const idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
      classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
      htmlRe = /<.+>/,
      tagRe = /^\w+$/;


// @require ./variables.ts

function find ( selector: string, context: Ele ): ArrayLike<Element> {

  const isFragment = isDocumentFragment ( context );

  return !selector || ( !isFragment && !isDocument ( context ) && !isElement ( context ) )
           ? []
           : !isFragment && classRe.test ( selector )
             ? context.getElementsByClassName ( selector.slice ( 1 ) )
             : !isFragment && tagRe.test ( selector )
               ? context.getElementsByTagName ( selector )
               : context.querySelectorAll ( selector );

}


// @require ./find.ts
// @require ./variables.ts

class Cash {

  constructor ( selector?: Selector, context?: Context | Cash ) {

    if ( !selector ) return;

    if ( isCash ( selector ) ) return selector;

    let eles: any = selector;

    if ( isString ( selector ) ) {

      const ctx = ( isCash ( context ) ? context[0] : context ) || doc;

      eles = idRe.test ( selector ) && 'getElementById' in ctx
                ? ( ctx as Document ).getElementById ( selector.slice ( 1 ) )
                : htmlRe.test ( selector )
                  ? parseHTML ( selector )
                  : find ( selector, ctx );

      if ( !eles ) return;

    } else if ( isFunction ( selector ) ) {

      return this.ready ( selector ); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality

    }

    if ( eles.nodeType || eles === win ) eles = [eles];

    this.length = eles.length;

    for ( let i = 0, l = this.length; i < l; i++ ) {

      this[i] = eles[i];

    }

  }

  init ( selector?: Selector, context?: Context | Cash ) {

    return new Cash ( selector, context );

  }

}

const fn = Cash.prototype,
      cash = fn.init as typeof Cash.prototype.init & CashStatic;

cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`

fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if ( typeof Symbol === 'function' ) { // Ensuring a cash collection is iterable
  fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}


// @require core/cash.ts
// @require core/variables.ts

type MapCallback<T> = ( this: T, index: number, ele: T ) => Ele;

interface Cash {
  map ( callback: MapCallback<EleLoose> ): Cash;
}

fn.map = function ( this: Cash, callback: MapCallback<EleLoose> ) {

  return cash ( concat.apply ( [], map.call ( this, ( ele: EleLoose, i: number ) => callback.call ( ele, i, ele ) ) ) );

};


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  slice ( start?: number, end?: number ): Cash;
}

fn.slice = function ( this: Cash, start?: number, end?: number ) {

  return cash ( slice.call ( this, start, end ) );

};


// @require ./cash.ts

const dashAlphaRe = /-([a-z])/g;

function camelCase ( str: string ): string {

  return str.replace ( dashAlphaRe, ( match: string, letter: string ) => letter.toUpperCase () );

}


// @require ./cash.ts

interface CashStatic {
  guid: number;
}

cash.guid = 1;


// @require ./cash.ts

function matches ( ele: any, selector: string ): boolean {

  const matches = ele && ( ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector'] );

  return !!matches && !!selector && matches.call ( ele, selector );

}


// @require ./cash.ts
// @require ./variables.ts

interface CashStatic {
  isWindow ( x: any ): x is Window;
  isFunction ( x: any ): x is Function;
  isArray ( x: any ): x is Array<any>;
  isNumeric ( x: any ): boolean;
  isPlainObject ( x: any ): x is PlainObject<any>;
}

function isCash ( x: any ): x is Cash {

  return x instanceof Cash;

}

function isWindow ( x: any ): x is Window {

  return !!x && x === x.window;

}

function isDocument ( x: any ): x is Document {

  return !!x && x.nodeType === 9;

}

function isDocumentFragment ( x: any ): x is DocumentFragment {

  return !!x && x.nodeType === 11;

}

function isElement ( x: any ): x is HTMLElement {

  return !!x && x.nodeType === 1;

}

function isBoolean ( x: any ): x is boolean {

  return typeof x === 'boolean';

}

function isFunction ( x: any ): x is Function {

  return typeof x === 'function';

}

function isString ( x: any ): x is string {

  return typeof x === 'string';

}

function isUndefined ( x: any ): x is undefined {

  return x === undefined;

}

function isNull ( x: any ): x is null {

  return x === null;

}

function isNumeric ( x: any ): boolean {

  return !isNaN ( parseFloat ( x ) ) && isFinite ( x );

}

function isPlainObject ( x: any ): x is PlainObject<any> {

  if ( typeof x !== 'object' || x === null ) return false;

  const proto = Object.getPrototypeOf ( x );

  return proto === null || proto === Object.prototype;

}

cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;


// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts

interface Cash {
  get (): EleLoose[];
  get ( index: number ): EleLoose | undefined;
}

fn.get = function ( this: Cash, index?: number ) {

  if ( isUndefined ( index ) ) return slice.call ( this );

  index = Number ( index );

  return this[index < 0 ? index + this.length : index];

};


// @require core/cash.ts
// @require ./get.ts

interface Cash {
  eq ( index: number ): Cash;
}

fn.eq = function ( this: Cash, index: number ) {

  return cash ( this.get ( index ) );

};


// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  first (): Cash;
}

fn.first = function ( this: Cash ) {

  return this.eq ( 0 );

};


// @require core/cash.ts
// @require ./eq.ts

interface Cash {
  last (): Cash;
}

fn.last = function ( this: Cash ) {

  return this.eq ( -1 );

};


// @require ./cash.ts
// @require ./type_checking.ts

type EachArrayCallback<T> = ( this: T, index: number, ele: T ) => any;
type EachObjectCallback<T> = ( this: T, key: string, value: T ) => any;

interface CashStatic {
  each<T> ( arr: ArrayLike<T>, callback: EachArrayCallback<T> ): void;
  each<T> ( obj: PlainObject<T>, callback: EachObjectCallback<T> ): void;
}

function each<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, callback: EachArrayCallback<T>, _reverse?: boolean ): U;
function each<T, U extends PlainObject<T> = PlainObject<T>> ( obj: U, callback: EachObjectCallback<T> ): U;
function each<T, U extends ArrayLike<T> | PlainObject<T> = ArrayLike<T>> ( arr: U, callback: EachArrayCallback<T> | EachObjectCallback<T>, _reverse?: boolean ): U {

  if ( _reverse ) {

    let i = arr.length;

    while ( i-- ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  } else if ( isPlainObject ( arr ) ) {

    const keys = Object.keys ( arr );

    for ( let i = 0, l = keys.length; i < l; i++ ) {

      const key = keys[i];

      if ( callback.call ( arr[key], key, arr[key] ) === false ) return arr;

    }

  } else {

    for ( let i = 0, l = arr.length; i < l; i++ ) {

      if ( callback.call ( arr[i], i, arr[i] ) === false ) return arr;

    }

  }

  return arr;

}

cash.each = each;


// @require core/cash.ts
// @require core/each.ts

interface Cash {
  each ( callback: EachArrayCallback<EleLoose> ): this;
}

fn.each = function ( this: Cash, callback: EachArrayCallback<EleLoose> ) {

  return each ( this, callback );

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/variables.ts

interface Cash {
  prop ( prop: string ): any;
  prop ( prop: string, value: any ): this;
  prop ( props: Record<string, any> ): this;
}

fn.prop = function ( this: Cash, prop: string | Record<string, any>, value?: any ) {

  if ( !prop ) return;

  if ( isString ( prop ) ) {

    prop = propMap[prop] || prop;

    if ( arguments.length < 2 ) return this[0] && this[0][prop];

    return this.each ( ( i, ele ) => { ele[prop] = value } );

  }

  for ( const key in prop ) {

    this.prop ( key, prop[key] );

  }

  return this;

};


// @require core/cash.ts
// @require collection/each.ts
// @require ./helpers/variables.ts

interface Cash {
  removeProp ( prop: string ): this;
}

fn.removeProp = function ( this: Cash, prop: string ) {

  return this.each ( ( i, ele ) => { delete ele[propMap[prop] || prop] } );

};


// @require ./cash.ts
// @require ./type_checking.ts

interface CashStatic {
  extend (): any;
  extend ( deep: true, target: any, ...sources: any[] ): any;
  extend ( target: any ): typeof cash;
  extend ( target: any, ...sources: any[] ): any;
}

interface Cash {
  extend ( plugins: Record<any, any> ): this;
}

function extend ( ...sources: any[] ) {

  const deep = isBoolean ( sources[0] ) ? sources.shift () : false,
        target = sources.shift (),
        length = sources.length;

  if ( !target ) return {};

  if ( !length ) return extend ( deep, cash, target );

  for ( let i = 0; i < length; i++ ) {

    const source = sources[i];

    for ( const key in source ) {

      if ( deep && ( isArray ( source[key] ) || isPlainObject ( source[key] ) ) ) {

        if ( !target[key] || target[key].constructor !== source[key].constructor ) target[key] = new source[key].constructor ();

        extend ( deep, target[key], source[key] );

      } else {

        target[key] = source[key];

      }

    }

  }

  return target;

}

cash.extend = extend;

fn.extend = function ( plugins: Record<string, any> ) {

  return extend ( fn, plugins );

};


// @require ./matches.ts
// @require ./type_checking.ts

function getCompareFunction ( comparator?: Comparator ): (( i: number, ele: EleLoose ) => boolean) {

  return isString ( comparator )
           ? ( i: number, ele: EleLoose ) => matches ( ele, comparator )
           : isFunction ( comparator )
             ? comparator
             : isCash ( comparator )
               ? ( i: number, ele: EleLoose ) => comparator.is ( ele )
               : !comparator
                 ? () => false
                 : ( i: number, ele: EleLoose ) => ele === comparator;

}


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/get.ts

interface Cash {
  filter ( comparator?: Comparator ): Cash;
}

fn.filter = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return cash ( filter.call ( this, ( ele: EleLoose, i: number ) => compare.call ( ele, i, ele ) ) );

};


// @require collection/filter.ts

function filtered ( collection: Cash, comparator?: Comparator ): Cash {

  return !comparator ? collection : collection.filter ( comparator );

}


// @require ./type_checking.ts

const splitValuesRe = /\S+/g;

function getSplitValues ( str: string ) {

  return isString ( str ) ? str.match ( splitValuesRe ) || [] : [];

}


// @require core/cash.ts
// @require core/get_split_values.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  hasClass ( cls: string ): boolean;
}

fn.hasClass = function ( this: Cash, cls: string ) {

  return !!cls && some.call ( this, ( ele: EleLoose ) => isElement ( ele ) && ele.classList.contains ( cls ) );

};


// @require core/cash.ts
// @require core/get_split_values.ts
// @require collection/each.ts

interface Cash {
  removeAttr ( attrs: string ): this;
}

fn.removeAttr = function ( this: Cash, attr: string ) {

  const attrs = getSplitValues ( attr );

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    each ( attrs, ( i, a ) => {

      ele.removeAttribute ( a );

    });

  });

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./remove_attr.ts

interface Cash {
  attr (): undefined;
  attr ( attrs: string ): string | null;
  attr ( attrs: string, value: string ): this;
  attr ( attrs: Record<string, string> ): this;
}

function attr ( this: Cash ): undefined;
function attr ( this: Cash, attr: string ): string | null;
function attr ( this: Cash, attr: string, value: string ): Cash;
function attr ( this: Cash, attr: Record<string, string> ): Cash;
function attr ( this: Cash, attr?: string | Record<string, string>, value?: string ) {

  if ( !attr ) return;

  if ( isString ( attr ) ) {

    if ( arguments.length < 2 ) {

      if ( !this[0] || !isElement ( this[0] ) ) return;

      const value = this[0].getAttribute ( attr );

      return isNull ( value ) ? undefined : value;

    }

    if ( isUndefined ( value ) ) return this;

    if ( isNull ( value ) ) return this.removeAttr ( attr );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      ele.setAttribute ( attr, value )

    });

  }

  for ( const key in attr ) {

    this.attr ( key, attr[key] );

  }

  return this;

}

fn.attr = attr;


// @require core/cash.ts
// @require core/each.ts
// @require core/get_split_values.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  toggleClass ( classes: string, force?: boolean ): this;
}

fn.toggleClass = function ( this: Cash, cls: string, force?: boolean ) {

  const classes = getSplitValues ( cls ),
        isForce = !isUndefined ( force );

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    each ( classes, ( i, c ) => {

      if ( isForce ) {

        force ? ele.classList.add ( c ) : ele.classList.remove ( c );

      } else {

        ele.classList.toggle ( c );

      }

    });

  });

};


// @require core/cash.ts
// @require ./toggle_class.ts

interface Cash {
  addClass ( classes: string ): this;
}

fn.addClass = function ( this: Cash, cls: string ) {

  return this.toggleClass ( cls, true );

};


// @require core/cash.ts
// @require ./attr.ts
// @require ./toggle_class.ts

interface Cash {
  removeClass ( classes?: string ): this;
}

fn.removeClass = function ( this: Cash, cls?: string ) {

  if ( arguments.length ) return this.toggleClass ( cls, false );

  return this.attr ( 'class', '' );

};


// @optional ./add_class.ts
// @optional ./attr.ts
// @optional ./has_class.ts
// @optional ./prop.ts
// @optional ./remove_attr.ts
// @optional ./remove_class.ts
// @optional ./remove_prop.ts
// @optional ./toggle_class.ts


// @require ./get_compare_function.ts
// @require ./type_checking.ts
// @require ./variables.ts

type PluckCallback<T> = ( ele: T ) => ArrayLike<Ele>;

function pluck<T, U extends ArrayLike<T> = ArrayLike<T>> ( arr: U, prop: string | PluckCallback<U[0]>, deep?: boolean, until?: Comparator ): Array<Ele> {

  const plucked: Array<Ele> = [],
        isCallback = isFunction ( prop ),
        compare = until && getCompareFunction ( until );

  for ( let i = 0, l = arr.length; i < l; i++ ) {

    if ( isCallback ) {

      const val = prop ( arr[i] );

      if ( val.length ) push.apply ( plucked, val );

    } else {

      let val = arr[i][prop];

      while ( val != null ) {

        if ( until && compare ( -1, val ) ) break;

        plucked.push ( val );

        val = deep ? val[prop] : null;

      }

    }

  }

  return plucked;

}


// @require ./cash.ts
// @require ./variables.ts

interface CashStatic {
  unique<T> ( arr: ArrayLike<T> ): ArrayLike<T>;
}

function unique<T> ( arr: ArrayLike<T> ): ArrayLike<T> {

  return arr.length > 1 ? filter.call ( arr, ( item: T, index: number, self: ArrayLike<T> ) => indexOf.call ( self, item ) === index ) : arr;

}

cash.unique = unique;


// @require core/cash.ts
// @require core/unique.ts
// @require ./get.ts

interface Cash {
  add ( selector: Selector, context?: Context ): Cash;
}

fn.add = function ( this: Cash, selector: Selector, context?: Context ) {

  return cash ( unique ( this.get ().concat ( cash ( selector, context ).get () ) ) );

};


// @require core/type_checking.ts
// @require core/variables.ts

function computeStyle ( ele: EleLoose, prop: string, isVariable?: boolean ): string | undefined {

  if ( !isElement ( ele ) ) return;

  const style = win.getComputedStyle ( ele, null );

  return isVariable ? style.getPropertyValue ( prop ) || undefined : style[prop] || ele.style[prop];

}


// @require ./compute_style.ts

function computeStyleInt ( ele: EleLoose, prop: string ): number {

  return parseInt ( computeStyle ( ele, prop ), 10 ) || 0;

}


const cssVariableRe = /^--/;


// @require ./variables.ts

function isCSSVariable ( prop: string ): boolean {

  return cssVariableRe.test ( prop );

}


// @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts

const prefixedProps: { [prop: string]: string } = {},
      {style} = div,
      vendorsPrefixes = ['webkit', 'moz', 'ms'];

function getPrefixedProp ( prop: string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  if ( isVariable ) return prop;

  if ( !prefixedProps[prop] ) {

    const propCC = camelCase ( prop ),
          propUC = `${propCC[0].toUpperCase ()}${propCC.slice ( 1 )}`,
          props = ( `${propCC} ${vendorsPrefixes.join ( `${propUC} ` )}${propUC}` ).split ( ' ' );

    each ( props, ( i, p ) => {

      if ( p in style ) {

        prefixedProps[prop] = p;

        return false;

      }

    });

  }

  return prefixedProps[prop];

};


// @require core/type_checking.ts
// @require ./is_css_variable.ts

const numericProps: { [prop: string]: true | undefined } = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue ( prop: string, value: number | string, isVariable: boolean = isCSSVariable ( prop ) ): string {

  return !isVariable && !numericProps[prop] && isNumeric ( value ) ? `${value}px` : value;

}


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/compute_style.ts
// @require ./helpers/get_prefixed_prop.ts
// @require ./helpers/get_suffixed_value.ts
// @require ./helpers/is_css_variable.ts

interface Cash {
  css ( prop: string ): string | undefined;
  css ( prop: string, value: number | string ): this;
  css ( props: Record<string, number | string> ): this;
}

function css ( this: Cash, prop: string ): string | undefined;
function css ( this: Cash, prop: string, value: number | string ): Cash;
function css ( this: Cash, prop: Record<string, number | string> ): Cash;
function css ( this: Cash, prop: string | Record<string, number | string>, value?: number | string ) {

  if ( isString ( prop ) ) {

    const isVariable = isCSSVariable ( prop );

    prop = getPrefixedProp ( prop, isVariable );

    if ( arguments.length < 2 ) return this[0] && computeStyle ( this[0], prop, isVariable );

    if ( !prop ) return this;

    value = getSuffixedValue ( prop, value, isVariable );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      if ( isVariable ) {

        ele.style.setProperty ( prop, value );

      } else {

        ele.style[prop] = value;

      }

    });

  }

  for ( const key in prop ) {

    this.css ( key, prop[key] );

  }

  return this;

};

fn.css = css;


// @optional ./css.ts


// @require core/attempt.ts
// @require core/camel_case.ts

const JSONStringRe = /^\s+|\s+$/;

function getData ( ele: EleLoose, key: string ): any {

  const value = ele.dataset[key] || ele.dataset[camelCase ( key )];

  if ( JSONStringRe.test ( value ) ) return value;

  return attempt ( JSON.parse, value );

}


// @require core/attempt.ts
// @require core/camel_case.ts

function setData ( ele: EleLoose, key: string, value: any ): void {

  value = attempt ( JSON.stringify, value );

  ele.dataset[camelCase ( key )] = value;

}


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_data.ts
// @require ./helpers/set_data.ts

interface Cash {
  data (): Record<string, any> | undefined;
  data ( name: string ): any;
  data ( name: string, value: any ): this;
  data ( datas: Record<string, any> ): this;
}

function data ( this: Cash ): Record<string, any> | undefined;
function data ( this: Cash, name: string ): any;
function data ( this: Cash, name: string, value: any ): Cash;
function data ( this: Cash, name: Record<string, any> ): Cash;
function data ( this: Cash, name?: string | Record<string, any>, value?: any ) {

  if ( !name ) {

    if ( !this[0] ) return;

    const datas: { [data: string]: any } = {};

    for ( const key in this[0].dataset ) {

      datas[key] = getData ( this[0], key );

    }

    return datas;

  }

  if ( isString ( name ) ) {

    if ( arguments.length < 2 ) return this[0] && getData ( this[0], name );

    if ( isUndefined ( value ) ) return this;

    return this.each ( ( i, ele ) => { setData ( ele, name, value ) } );

  }

  for ( const key in name ) {

    this.data ( key, name[key] );

  }

  return this;

}

fn.data = data;


// @optional ./data.ts


function getDocumentDimension ( doc: Document, dimension: 'Width' | 'Height' ): number {

  const docEle = doc.documentElement;

  return Math.max (
    doc.body[`scroll${dimension}`],
    docEle[`scroll${dimension}`],
    doc.body[`offset${dimension}`],
    docEle[`offset${dimension}`],
    docEle[`client${dimension}`]
  );

}


// @require css/helpers/compute_style_int.ts

function getExtraSpace ( ele: EleLoose, xAxis?: boolean ): number {

  return computeStyleInt ( ele, `border${ xAxis ? 'Left' : 'Top' }Width` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Left' : 'Top' }` ) + computeStyleInt ( ele, `padding${ xAxis ? 'Right' : 'Bottom' }` ) + computeStyleInt ( ele, `border${ xAxis ? 'Right' : 'Bottom' }Width` );

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require ./helpers/get_document_dimension.ts

interface Cash {
  innerWidth (): number | undefined;
  innerHeight (): number | undefined;
  outerWidth ( includeMargins?: boolean ): number;
  outerHeight ( includeMargins?: boolean ): number;
}

each ( [true, false], ( i, outer?: boolean ) => {

  each ( ['Width', 'Height'], ( i, prop: 'Width' | 'Height' ) => {

    const name: 'outerWidth' | 'innerHeight' = `${outer ? 'outer' : 'inner'}${prop}`;

    fn[name] = function ( this: Cash, includeMargins?: boolean ) {

      if ( !this[0] ) return;

      if ( isWindow ( this[0] ) ) return outer ? this[0][`inner${prop}`] : this[0].document.documentElement[`client${prop}`];

      if ( isDocument ( this[0] ) ) return getDocumentDimension ( this[0], prop );

      return this[0][`${outer ? 'offset' : 'client'}${prop}`] + ( includeMargins && outer ? computeStyleInt ( this[0], `margin${ i ? 'Top' : 'Left' }` ) + computeStyleInt ( this[0], `margin${ i ? 'Bottom' : 'Right' }` ) : 0 );

    };

  });

});


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/get_suffixed_value.ts
// @require ./helpers/get_extra_space.ts
// @require ./helpers/get_document_dimension.ts

interface Cash {
  width (): number;
  width ( value: number | string ): this;
  height (): number;
  height ( value: number | string ): this;
}

each ( ['Width', 'Height'], ( index: number, prop: 'Width' | 'Height' ) => {

  const propLC = prop.toLowerCase ();

  fn[propLC] = function ( this: Cash, value?: number | string ) {

    if ( !this[0] ) return isUndefined ( value ) ? undefined : this;

    if ( !arguments.length ) {

      if ( isWindow ( this[0] ) ) return this[0].document.documentElement[`client${prop}`];

      if ( isDocument ( this[0] ) ) return getDocumentDimension ( this[0], prop );

      return this[0].getBoundingClientRect ()[propLC] - getExtraSpace ( this[0], !index );

    }

    const valueNumber = parseInt ( value, 10 );

    return this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) ) return;

      const boxSizing = computeStyle ( ele, 'boxSizing' );

      ele.style[propLC] = getSuffixedValue ( propLC, valueNumber + ( boxSizing === 'border-box' ? getExtraSpace ( ele, !index ) : 0 ) );

    });

  };

});


// @optional ./inner_outer.ts
// @optional ./normal.ts


// @require css/helpers/compute_style.ts

const defaultDisplay: { [tagName: string]: string } = {};

function getDefaultDisplay ( tagName: string ): string {

  if ( defaultDisplay[tagName] ) return defaultDisplay[tagName];

  const ele = createElement ( tagName );

  doc.body.insertBefore ( ele, null );

  const display = computeStyle ( ele, 'display' );

  doc.body.removeChild ( ele );

  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';

}


// @require css/helpers/compute_style.ts

function isHidden ( ele: EleLoose ): boolean {

  return computeStyle ( ele, 'display' ) === 'none';

}


const displayProperty = '___cd';


// @require core/cash.ts
// @require core/type_checking.ts
// @require css/helpers/compute_style.ts
// @require ./helpers/get_default_display.ts
// @require ./helpers/variables.ts

interface Cash {
  toggle ( force?: boolean ): this;
}

fn.toggle = function ( this: Cash, force?: boolean ) {

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    const show = isUndefined ( force ) ? isHidden ( ele ) : force;

    if ( show ) {

      ele.style.display = ele[displayProperty] || '';

      if ( isHidden ( ele ) ) {

        ele.style.display = getDefaultDisplay ( ele.tagName );

      }

    } else {

      ele[displayProperty] = computeStyle ( ele, 'display' );

      ele.style.display = 'none';

    }

  });

};


// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  hide (): this;
}

fn.hide = function ( this: Cash ) {

  return this.toggle ( false );

};


// @require core/cash.ts
// @require ./toggle.ts

interface Cash {
  show (): this;
}

fn.show = function ( this: Cash ) {

  return this.toggle ( true );

};


// @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces ( ns1: string[], ns2?: string[] ): boolean {

  return !ns2 || !some.call ( ns2, ( ns: string ) => ns1.indexOf ( ns ) < 0 );

}


const eventsNamespace = '___ce',
      eventsNamespacesSeparator = '.',
      eventsFocus: { [event: string]: string | undefined } = { focus: 'focusin', blur: 'focusout' },
      eventsHover: { [event: string]: string | undefined } = { mouseenter: 'mouseover', mouseleave: 'mouseout' },
      eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;


// @require ./variables.ts

function getEventNameBubbling ( name: string ): string {

  return eventsHover[name] || eventsFocus[name] || name;

}


// @require ./variables.ts

function getEventsCache ( ele: EleLoose ): { [event: string]: [string[], string, EventCallback][] } {

  return ele[eventsNamespace] = ( ele[eventsNamespace] || {} );

}


// @require core/guid.ts
// @require events/helpers/get_events_cache.ts

function addEvent ( ele: EleLoose, name: string, namespaces: string[], selector: string, callback: EventCallback ): void {

  const eventCache = getEventsCache ( ele );

  eventCache[name] = ( eventCache[name] || [] );
  eventCache[name].push ([ namespaces, selector, callback ]);

  ele.addEventListener ( name, callback );

}


// @require ./variables.ts

function parseEventName ( eventName: string ): [string, string[]] {

  const parts = eventName.split ( eventsNamespacesSeparator );

  return [parts[0], parts.slice ( 1 ).sort ()]; // [name, namespace[]]

}


// @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts

function removeEvent ( ele: EleLoose, name?: string, namespaces?: string[], selector?: string, callback?: EventCallback ): void {

  const cache = getEventsCache ( ele );

  if ( !name ) {

    for ( name in cache ) {

      removeEvent ( ele, name, namespaces, selector, callback );

    }

  } else if ( cache[name] ) {

    cache[name] = cache[name].filter ( ([ ns, sel, cb ]) => {

      if ( ( callback && cb.guid !== callback.guid ) || !hasNamespaces ( ns, namespaces ) || ( selector && selector !== sel ) ) return true;

      ele.removeEventListener ( name, cb );

    });

  }

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  off (): this;
  off ( events: string ): this;
  off ( events: Record<string, EventCallback> ): this;
  off ( events: string, callback: EventCallback ): this;
  off ( events: string, selector: string, callback: EventCallback ): this;
}

fn.off = function ( this: Cash, eventFullName?: string | Record<string, EventCallback>, selector?: string | EventCallback, callback?: EventCallback ) {

  if ( isUndefined ( eventFullName ) ) {

    this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) && !isDocument ( ele ) && !isWindow ( ele ) ) return;

      removeEvent ( ele );

    });

  } else if ( !isString ( eventFullName ) ) {

    for ( const key in eventFullName ) {

      this.off ( key, eventFullName[key] );

    }

  } else {

    if ( isFunction ( selector ) ) {

      callback = selector;
      selector = '';

    }

    each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

      const [nameOriginal, namespaces] = parseEventName ( eventFullName ),
            name = getEventNameBubbling ( nameOriginal );

      this.each ( ( i, ele ) => {

        if ( !isElement ( ele ) && !isDocument ( ele ) && !isWindow ( ele ) ) return;

        removeEvent ( ele, name, namespaces, selector, callback );

      });

    });

  }

  return this;

};


// @require core/cash.ts
// @require core/get_split_values.ts
// @require core/guid.ts
// @require core/matches.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/variables.ts
// @require ./helpers/add_event.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/has_namespaces.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/remove_event.ts

interface Cash {
  on ( events: Record<string, EventCallback> ): this;
  on ( events: Record<string, EventCallback>, selector: string ): this;
  on ( events: Record<string, EventCallback>, data: any ): this;
  on ( events: Record<string, EventCallback>, selector: string | null | undefined, data: any ): this;
  on ( events: string, callback: EventCallback ): this;
  on ( events: string, selector: string, callback: EventCallback ): this;
  on ( events: string, data: any, callback: EventCallback ): this;
  on ( events: string, selector: string | null | undefined, data: any, callback: EventCallback, _one?: boolean ): this;
}

function on ( this: Cash, eventFullName: Record<string, EventCallback> ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback>, data: any ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string | null | undefined, data: any ): Cash;
function on ( this: Cash, eventFullName: string, callback: EventCallback ): Cash;
function on ( this: Cash, eventFullName: string, selector: string, callback: EventCallback ): Cash;
function on ( this: Cash, eventFullName: string, data: any, callback: EventCallback ): Cash;
function on ( this: Cash, eventFullName: string, selector: string | null | undefined, data: any, callback: EventCallback, _one?: boolean ): Cash;
function on ( this: Cash, eventFullName: Record<string, EventCallback> | string, selector?: any, data?: any, callback?: EventCallback, _one?: boolean ) {

  if ( !isString ( eventFullName ) ) {

    for ( const key in eventFullName ) {

      this.on ( key, selector, data, eventFullName[key], _one );

    }

    return this;

  }

  if ( !isString ( selector ) ) {

    if ( isUndefined ( selector ) || isNull ( selector ) ) {

      selector = '';

    } else if ( isUndefined ( data ) ) {

      data = selector;
      selector = '';

    } else {

      callback = data;
      data = selector;
      selector = '';

    }

  }

  if ( !isFunction ( callback ) ) {

    callback = data;
    data = undefined;

  }

  if ( !callback ) return this;

  each ( getSplitValues ( eventFullName ), ( i, eventFullName ) => {

    const [nameOriginal, namespaces] = parseEventName ( eventFullName ),
          name = getEventNameBubbling ( nameOriginal ),
          isEventHover = ( nameOriginal in eventsHover ),
          isEventFocus = ( nameOriginal in eventsFocus );

    if ( !name ) return;

    this.each ( ( i, ele ) => {

      if ( !isElement ( ele ) && !isDocument ( ele ) && !isWindow ( ele ) ) return;

      const finalCallback = function ( event: Event ) {

        if ( event.target[`___i${event.type}`] ) return event.stopImmediatePropagation (); // Ignoring native event in favor of the upcoming custom one

        if ( event.namespace && !hasNamespaces ( namespaces, event.namespace.split ( eventsNamespacesSeparator ) ) ) return;

        if ( !selector && ( ( isEventFocus && ( event.target !== ele || event.___ot === name ) ) || ( isEventHover && event.relatedTarget && ele.contains ( event.relatedTarget ) ) ) ) return;

        let thisArg: EventTarget = ele;

        if ( selector ) {

          let target = event.target;

          while ( !matches ( target, selector ) ) {

            if ( target === ele ) return;

            target = target.parentNode;

            if ( !target ) return;

          }

          thisArg = target;

        }

        Object.defineProperty ( event, 'currentTarget', {
          configurable: true,
          get () { // We need to define a getter for this to work everywhere
            return thisArg;
          }
        });

        Object.defineProperty ( event, 'delegateTarget', {
          configurable: true,
          get () { // We need to define a getter for this to work everywhere
            return ele;
          }
        });

        Object.defineProperty ( event, 'data', {
          configurable: true,
          get () {
            return data;
          }
        });

        const returnValue = callback.call ( thisArg, event, event.___td );

        if ( _one ) {

          removeEvent ( ele, name, namespaces, selector, finalCallback );

        }

        if ( returnValue === false ) {

          event.preventDefault ();
          event.stopPropagation ();

        }

      };

      finalCallback.guid = callback.guid = ( callback.guid || cash.guid++ );

      addEvent ( ele, name, namespaces, selector, finalCallback );

    });

  });

  return this;

}

fn.on = on;


// @require core/cash.ts
// @require ./on.ts

interface Cash {
  one ( events: Record<string, EventCallback> ): this;
  one ( events: Record<string, EventCallback>, selector: string ): this;
  one ( events: Record<string, EventCallback>, data: any ): this;
  one ( events: Record<string, EventCallback>, selector: string | null | undefined, data: any ): this;
  one ( events: string, callback: EventCallback ): this;
  one ( events: string, selector: string, callback: EventCallback ): this;
  one ( events: string, data: any, callback: EventCallback ): this;
  one ( events: string, selector: string | null | undefined, data: any, callback: EventCallback ): this;
}

function one ( this: Cash, eventFullName: Record<string, EventCallback> ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback>, data: any ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback>, selector: string | null | undefined, data: any ): Cash;
function one ( this: Cash, eventFullName: string, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, selector: string, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, data: any, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: string, selector: string | null | undefined, data: any, callback: EventCallback ): Cash;
function one ( this: Cash, eventFullName: Record<string, EventCallback> | string, selector?: any, data?: any, callback?: EventCallback ) {

  return this.on ( eventFullName, selector, data, callback, true );

};

fn.one = one;


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  ready ( callback: Function ): this;
}

fn.ready = function ( this: Cash, callback: ( $: typeof cash ) => any ) {

  const cb = () => setTimeout ( callback, 0, cash );

  if ( doc.readyState !== 'loading' ) {

    cb ();

  } else {

    doc.addEventListener ( 'DOMContentLoaded', cb );

  }

  return this;

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./helpers/get_event_name_bubbling.ts
// @require ./helpers/parse_event_name.ts
// @require ./helpers/variables.ts

interface Cash {
  trigger ( event: Event | string, data?: any ): this;
}

fn.trigger = function ( this: Cash, event: Event | string, data?: any ) {

  if ( isString ( event ) ) {

    const [nameOriginal, namespaces] = parseEventName ( event ),
          name = getEventNameBubbling ( nameOriginal );

    if ( !name ) return this;

    const type = eventsMouseRe.test ( name ) ? 'MouseEvents' : 'HTMLEvents';

    event = doc.createEvent ( type );
    event.initEvent ( name, true, true );
    event.namespace = namespaces.join ( eventsNamespacesSeparator );
    event.___ot = nameOriginal;

  }

  event.___td = data;

  const isEventFocus = ( event.___ot in eventsFocus );

  return this.each ( ( i, ele ) => {

    if ( isEventFocus && isFunction ( ele[event.___ot] ) ) {

      ele[`___i${event.type}`] = true; // Ensuring the native event is ignored

      ele[event.___ot]();

      ele[`___i${event.type}`] = false; // Ensuring the custom event is not ignored

    }

    ele.dispatchEvent ( event );

  });

};


// @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts


// @require core/pluck.ts
// @require core/variables.ts

function getValue ( ele: EleLoose ): string | string[] {

  if ( ele.multiple && ele.options ) return pluck ( filter.call ( ele.options, option => option.selected && !option.disabled && !option.parentNode.disabled ), 'value' );

  return ele.value || '';

}


const queryEncodeSpaceRe = /%20/g,
      queryEncodeCRLFRe = /\r?\n/g;

function queryEncode ( prop: string, value: string ): string {

  return `&${encodeURIComponent ( prop )}=${encodeURIComponent ( value.replace ( queryEncodeCRLFRe, '\r\n' ) ).replace ( queryEncodeSpaceRe, '+' )}`;

}


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require ./helpers/get_value.ts
// @require ./helpers/query_encode.ts

interface Cash {
  serialize (): string;
}

const skippableRe = /file|reset|submit|button|image/i,
      checkableRe = /radio|checkbox/i;

fn.serialize = function ( this: Cash ) {

  let query = '';

  this.each ( ( i, ele ) => {

    each ( ele.elements || [ele], ( i, ele: EleLoose ) => {

      if ( ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test ( ele.type ) || ( checkableRe.test ( ele.type ) && !ele.checked ) ) return;

      const value = getValue ( ele );

      if ( !isUndefined ( value ) ) {

        const values = isArray ( value ) ? value : [value];

        each ( values, ( i, value ) => {

          query += queryEncode ( ele.name, value );

        });

      }

    });

  });

  return query.slice ( 1 );

};


// @require core/cash.ts
// @require core/each.ts
// @require core/type_checking.ts
// @require collection/each.ts
// @require ./helpers/get_value.ts

interface Cash {
  val (): string | string[];
  val ( value: string | string[] ): this;
}

function val ( this: Cash ): string | string[];
function val ( this: Cash, value: string | string[] ): Cash;
function val ( this: Cash, value?: string | string[] ) {

  if ( !arguments.length ) return this[0] && getValue ( this[0] );

  return this.each ( ( i, ele ) => {

    const isSelect = ele.multiple && ele.options;

    if ( isSelect || checkableRe.test ( ele.type ) ) {

      const eleValue = isArray ( value ) ? map.call ( value, String ) : ( isNull ( value ) ? [] : [String ( value )] );

      if ( isSelect ) {

        each ( ele.options, ( i, option ) => {

          option.selected = eleValue.indexOf ( option.value ) >= 0;

        }, true );

      } else {

        ele.checked = eleValue.indexOf ( ele.value ) >= 0;

      }

    } else {

      ele.value = isUndefined ( value ) || isNull ( value ) ? '' : value;

    }

  });

}

fn.val = val;


// @optional ./serialize.ts
// @optional ./val.ts


// @require core/cash.ts
// @require collection/map.ts

interface Cash {
  clone (): this;
}

fn.clone = function ( this: Cash ) {

  return this.map ( ( i, ele ) => ele.cloneNode ( true ) );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require collection/each.ts

interface Cash {
  detach ( comparator?: Comparator ): this;
}

fn.detach = function ( this: Cash, comparator?: Comparator ) {

  filtered ( this, comparator ).each ( ( i, ele ) => {

    if ( ele.parentNode ) {

      ele.parentNode.removeChild ( ele );

    }

  });

  return this;

};


// @require ./cash.ts
// @require ./variables.ts
// @require ./type_checking.ts
// @require collection/get.ts
// @require manipulation/detach.ts

interface CashStatic {
  parseHTML ( html: string ): EleLoose[];
}

const fragmentRe = /^\s*<(\w+)[^>]*>/,
      singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

const containers = {
  '*': div,
  tr: tbody,
  td: tr,
  th: tr,
  thead: table,
  tbody: table,
  tfoot: table
};

//TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably

function parseHTML ( html: string ): EleLoose[] {

  if ( !isString ( html ) ) return [];

  if ( singleTagRe.test ( html ) ) return [createElement ( RegExp.$1 )];

  const fragment = fragmentRe.test ( html ) && RegExp.$1,
        container = containers[fragment] || containers['*'];

  container.innerHTML = html;

  return cash ( container.childNodes ).detach ().get ();

}

cash.parseHTML = parseHTML;


// @optional ./each.ts
// @optional ./extend.ts
// @optional ./find.ts
// @optional ./get_compare_function.ts
// @optional ./get_split_values.ts
// @optional ./guid.ts
// @optional ./parse_html.ts
// @optional ./unique.ts
// @require ./cash.ts
// @require ./type_checking.ts
// @require ./variables.ts


// @require core/cash.ts
// @require collection/each.ts

interface Cash {
  empty (): this;
}

fn.empty = function ( this: Cash ) {

  return this.each ( ( i, ele ) => {

    while ( ele.firstChild ) {

      ele.removeChild ( ele.firstChild );

    }

  });

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  html (): string;
  html ( html: string ): this;
}

function html ( this: Cash ): string;
function html ( this: Cash, html: string ): Cash;
function html ( this: Cash, html?: string ) {

  if ( !arguments.length ) return this[0] && this[0].innerHTML;

  if ( isUndefined ( html ) ) return this;

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    ele.innerHTML = html;

  });

}

fn.html = html;


// @require core/cash.ts
// @require core/filtered.ts
// @require events/off.ts
// @require ./detach.ts

interface Cash {
  remove ( comparator?: Comparator ): this;
}

fn.remove = function ( this: Cash, comparator?: Comparator ) {

  filtered ( this, comparator ).detach ().off ();

  return this;

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require collection/each.ts

interface Cash {
  text (): string;
  text ( text: string ): this;
}

function text ( this: Cash ): string;
function text ( this: Cash, text: string ): Cash;
function text ( this: Cash, text?: string ) {

  if ( isUndefined ( text ) ) return this[0] ? this[0].textContent : '';

  return this.each ( ( i, ele ) => {

    if ( !isElement ( ele ) ) return;

    ele.textContent = text

  });

};

fn.text = text;


// @require core/cash.ts

interface Cash {
  unwrap (): this;
}

fn.unwrap = function ( this: Cash ) {

  this.parent ().each ( ( i, ele ) => {

    if ( ele.tagName === 'BODY' ) return;

    const $ele = cash ( ele );

    $ele.replaceWith ( $ele.children () );

  });

  return this;

};


// @require core/cash.ts
// @require core/variables.ts

interface Cash {
  offset (): undefined | {
    top: number,
    left: number
  };
}

fn.offset = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  const rect = ele.getBoundingClientRect ();

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };

};


// @require core/cash.ts
// @require collection/map.ts
// @require css/helpers/compute_style.ts

interface Cash {
  offsetParent (): Cash;
}

fn.offsetParent = function ( this: Cash ) {

  return this.map ( ( i, ele ) => {

    let offsetParent = ele.offsetParent;

    while ( offsetParent && computeStyle ( offsetParent, 'position' ) === 'static' ) {

      offsetParent = offsetParent.offsetParent;

    }

    return offsetParent || docEle;

  });

};


// @require core/cash.ts
// @require core/type_checking.ts
// @require css/helpers/compute_style.ts
// @require css/helpers/compute_style_int.ts
// @require ./offset.ts

interface Cash {
  position (): undefined | {
    top: number,
    left: number
  };
}

fn.position = function ( this: Cash ) {

  const ele = this[0];

  if ( !ele ) return;

  const isFixed = ( computeStyle ( ele, 'position' ) === 'fixed' ),
        offset = isFixed ? ele.getBoundingClientRect () : this.offset ();

  if ( !isFixed ) {

    const doc = ele.ownerDocument;

    let offsetParent = ele.offsetParent || doc.documentElement;

    while ( ( offsetParent === doc.body || offsetParent === doc.documentElement ) && computeStyle ( offsetParent, 'position' ) === 'static' ) {

      offsetParent = offsetParent.parentNode;

    }

    if ( offsetParent !== ele && isElement ( offsetParent ) ) {

      const parentOffset = cash ( offsetParent ).offset ();

      offset.top -= parentOffset.top + computeStyleInt ( offsetParent, 'borderTopWidth' );
      offset.left -= parentOffset.left + computeStyleInt ( offsetParent, 'borderLeftWidth' );

    }

  }

  return {
    top: offset.top - computeStyleInt ( ele, 'marginTop' ),
    left: offset.left - computeStyleInt ( ele, 'marginLeft' )
  };

};


// @optional ./offset.ts
// @optional ./offset_parent.ts
// @optional ./position.ts


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  children ( comparator?: Comparator ): Cash;
}

fn.children = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, ele => ele.children ) ) ), comparator );

};


// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require collection/each.ts

interface Cash {
  contents (): Cash;
}

fn.contents = function ( this: Cash ) {

  return cash ( unique ( pluck ( this, ele => ele.tagName === 'IFRAME' ? [ele.contentDocument] : ( ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes ) ) ) );

};


// @require core/cash.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/find.ts
// @require core/variables.ts

interface Cash {
  find ( selector: string ): Cash;
}

fn.find = function ( this: Cash, selector: string ) {

  return cash ( unique ( pluck ( this, ele => find ( selector, ele ) ) ) );

};


// @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts

const HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
      scriptTypeRe = /^$|^module$|\/(java|ecma)script/i,
      scriptAttributes: ('type' | 'src' | 'nonce' | 'noModule')[] = ['type', 'src', 'nonce', 'noModule'];

function evalScripts ( node: Node, doc: Document ): void {

  const collection = cash ( node );

  collection.filter ( 'script' ).add ( collection.find ( 'script' ) ).each ( ( i, ele: HTMLScriptElement ) => {

    if ( scriptTypeRe.test ( ele.type ) && docEle.contains ( ele ) ) { // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support

      const script = createElement ( 'script' );

      script.text = ele.textContent.replace ( HTMLCDATARe, '' );

      each ( scriptAttributes, ( i, attr ) => {

        if ( ele[attr] ) script[attr] = ele[attr];

      });

      doc.head.insertBefore ( script, null );
      doc.head.removeChild ( script );

    }

  });

}


// @require ./eval_scripts.ts

function insertElement ( anchor: EleLoose, target: EleLoose, left?: boolean, inside?: boolean, evaluate?: boolean ): void {

  if ( inside ) { // prepend/append

    anchor.insertBefore ( target, left ? anchor.firstChild : null );

  } else { // before/after

    if ( anchor.nodeName === 'HTML' ) {

      anchor.parentNode.replaceChild ( target, anchor );

    } else {

      anchor.parentNode.insertBefore ( target, left ? anchor : anchor.nextSibling );

    }

  }

  if ( evaluate ) {

    evalScripts ( target, anchor.ownerDocument );

  }

}


// @require ./insert_element.ts

function insertSelectors<T extends ArrayLike<EleLoose> = ArrayLike<EleLoose>> ( selectors: ArrayLike<Selector>, anchors: T, inverse?: boolean, left?: boolean, inside?: boolean, reverseLoop1?: boolean, reverseLoop2?: boolean, reverseLoop3?: boolean ): T {

  each ( selectors, ( si, selector: Selector ) => {

    each ( cash ( selector ), ( ti, target ) => {

      each ( cash ( anchors ), ( ai, anchor ) => {

        const anchorFinal = inverse ? target : anchor,
              targetFinal = inverse ? anchor : target,
              indexFinal = inverse ? ti : ai;

        insertElement ( anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode ( true ), left, inside, !indexFinal );

      }, reverseLoop3 );

    }, reverseLoop2 );

  }, reverseLoop1 );

  return anchors;

}


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  after ( ...selectors: Selector[] ): this;
}

fn.after = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, false, false, true, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  append ( ...selectors: Selector[] ): this;
}

fn.append = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  appendTo ( selector: Selector ): this;
}

fn.appendTo = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  before ( ...selectors: Selector[] ): this;
}

fn.before = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  insertAfter ( selector: Selector ): this;
}

fn.insertAfter = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, false, false, false, false, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  insertBefore ( selector: Selector ): this;
}

fn.insertBefore = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  prepend ( ...selectors: Selector[] ): this;
}

fn.prepend = function ( this: Cash ) {

  return insertSelectors ( arguments, this, false, true, true, true, true );

};


// @require core/cash.ts
// @require ./helpers/insert_selectors.ts

interface Cash {
  prependTo ( selector: Selector ): this;
}

fn.prependTo = function ( this: Cash, selector: Selector ) {

  return insertSelectors ( arguments, this, true, true, true, false, false, true );

};


// @require core/cash.ts
// @require ./before.ts
// @require ./remove.ts

interface Cash {
  replaceWith ( selector: Selector ): this;
}

fn.replaceWith = function ( this: Cash, selector: Selector ) {

  return this.before ( selector ).remove ();

};


// @require core/cash.ts
// @require ./replace_with.ts

interface Cash {
  replaceAll ( selector: Selector ): this;
}

fn.replaceAll = function ( this: Cash, selector: Selector ) {

  cash ( selector ).replaceWith ( this );

  return this;

};


// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts
// @require manipulation/before.ts

interface Cash {
  wrapAll ( selector?: Selector ): this;
}

fn.wrapAll = function ( this: Cash, selector?: Selector ) {

  let structure = cash ( selector ),
      wrapper: Element = structure[0];

  while ( wrapper.children.length ) wrapper = wrapper.firstElementChild;

  this.first ().before ( structure );

  return this.appendTo ( wrapper );

};


// @require core/cash.ts
// @require collection/each.ts
// @require ./wrap_all.ts

interface Cash {
  wrap ( selector?: Selector ): this;
}

fn.wrap = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( i, ele ) => {

    const wrapper = cash ( selector )[0];

    cash ( ele ).wrapAll ( !i ? wrapper : wrapper.cloneNode ( true ) );

  });

};


// @require core/cash.ts
// @require collection/first.ts
// @require manipulation/append_to.ts

interface Cash {
  wrapInner ( selector?: Selector ): this;
}

fn.wrapInner = function ( this: Cash, selector?: Selector ) {

  return this.each ( ( i, ele ) => {

    const $ele = cash ( ele ),
          contents = $ele.contents ();

    contents.length ? contents.wrapAll ( selector ) : $ele.append ( selector );

  });

};


// @optional ./after.ts
// @optional ./append.ts
// @optional ./append_to.ts
// @optional ./before.ts
// @optional ./clone.ts
// @optional ./detach.ts
// @optional ./empty.ts
// @optional ./html.ts
// @optional ./insert_after.ts
// @optional ./insert_before.ts
// @optional ./prepend.ts
// @optional ./prepend_to.ts
// @optional ./remove.ts
// @optional ./replace_all.ts
// @optional ./replace_with.ts
// @optional ./text.ts
// @optional ./unwrap.ts
// @optional ./wrap.ts
// @optional ./wrap_all.ts
// @optional ./wrap_inner.ts


// @require core/cash.ts
// @require core/find.ts
// @require core/type_checking.ts
// @require collection/filter.ts

interface Cash {
  has ( selector: string | Node ): Cash;
}

fn.has = function ( this: Cash, selector: string | Node ) {

  const comparator = isString ( selector )
                       ? ( i: number, ele: EleLoose ) => find ( selector, ele ).length
                       : ( i: number, ele: EleLoose ) => ele.contains ( selector );

  return this.filter ( comparator );

};


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  is ( comparator?: Comparator ): boolean;
}

fn.is = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return some.call ( this, ( ele: EleLoose, i: number ) => compare.call ( ele, i, ele ) );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  next ( comparator?: Comparator, _all?: boolean, _until?: Comparator ): Cash;
}

fn.next = function ( this: Cash, comparator?: Comparator, _all?: boolean, _until?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'nextElementSibling', _all, _until ) ) ), comparator );

};


// @require ./next.ts

interface Cash {
  nextAll ( comparator?: Comparator): Cash;
}

fn.nextAll = function ( this: Cash, comparator?: Comparator ) {

  return this.next ( comparator, true );

};


// @require ./next.ts

interface Cash {
  nextUntil ( until?: Comparator, comparator?: Comparator): Cash;
}

fn.nextUntil = function ( this: Cash, until?: Comparator, comparator?: Comparator ) {

  return this.next ( comparator, true, until );

};


// @require core/cash.ts
// @require core/get_compare_function.ts
// @require core/type_checking.ts
// @require collection/filter.ts

interface Cash {
  not ( comparator?: Comparator ): Cash;
}

fn.not = function ( this: Cash, comparator?: Comparator ) {

  const compare = getCompareFunction ( comparator );

  return this.filter ( ( i: number, ele: EleLoose ) => ( !isString ( comparator ) || isElement ( ele ) ) && !compare.call ( ele, i, ele ) );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  parent ( comparator?: Comparator ): Cash;
}

fn.parent = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'parentNode' ) ) ), comparator );

};


// @require core/cash.ts
// @require core/variables.ts
// @require traversal/children.ts
// @require traversal/parent.ts
// @require ./get.ts

interface Cash {
  index ( selector?: Selector ): number;
}

fn.index = function ( this: Cash, selector?: Selector ) {

  const child = selector ? cash ( selector )[0] : this[0],
        collection = selector ? this : cash ( child ).parent ().children ();

  return indexOf.call ( collection, child );

};


// @optional ./add.ts
// @optional ./each.ts
// @optional ./eq.ts
// @optional ./filter.ts
// @optional ./first.ts
// @optional ./get.ts
// @optional ./index_fn.ts
// @optional ./last.ts
// @optional ./map.ts
// @optional ./slice.ts


// @require core/cash.ts
// @require collection/filter.ts
// @require ./is.ts
// @require ./parent.ts

interface Cash {
  closest ( comparator?: Comparator ): Cash;
}

fn.closest = function ( this: Cash, comparator?: Comparator ) {

  const filtered = this.filter ( comparator );

  if ( filtered.length ) return filtered;

  const $parent = this.parent ();

  if ( !$parent.length ) return filtered;

  return $parent.closest ( comparator );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/matches.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts

interface Cash {
  parents ( comparator?: Comparator, _until?: Comparator ): Cash;
}

fn.parents = function ( this: Cash, comparator?: Comparator, _until?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'parentElement', true, _until ) ) ), comparator );

};


// @require ./parents.ts

interface Cash {
  parentsUntil ( until?: Comparator, comparator?: Comparator): Cash;
}

fn.parentsUntil = function ( this: Cash, until?: Comparator, comparator?: Comparator ) {

  return this.parents ( comparator, until );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts

interface Cash {
  prev ( comparator?: Comparator, _all?: boolean, _until?: Comparator ): Cash;
}

fn.prev = function ( this: Cash, comparator?: Comparator, _all?: boolean, _until?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, 'previousElementSibling', _all, _until ) ) ), comparator );

};


// @require ./prev.ts

interface Cash {
  prevAll ( comparator?: Comparator ): Cash;
}

fn.prevAll = function ( this: Cash, comparator?: Comparator ) {

  return this.prev ( comparator, true );

};


// @require ./prev.ts

interface Cash {
  prevUntil ( until?: Comparator, comparator?: Comparator ): Cash;
}

fn.prevUntil = function ( this: Cash, until?: Comparator, comparator?: Comparator ) {

  return this.prev ( comparator, true, until );

};


// @require core/cash.ts
// @require core/filtered.ts
// @require core/pluck.ts
// @require core/unique.ts
// @require core/variables.ts
// @require collection/each.ts
// @require ./children.ts
// @require ./not.ts
// @require ./parent.ts

interface Cash {
  siblings ( comparator?: Comparator ): Cash;
}

fn.siblings = function ( this: Cash, comparator?: Comparator ) {

  return filtered ( cash ( unique ( pluck ( this, ele => cash ( ele ).parent ().children ().not ( ele ) ) ) ), comparator );

};


// @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./next_all.ts
// @optional ./next_until.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./parents_until.ts
// @optional ./prev.ts
// @optional ./prev_all.ts
// @optional ./prev_until.ts
// @optional ./siblings.ts


// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts


// @priority -100
// @require ./cash.ts

export default cash;
export {Cash, CashStatic, Ele as Element, Selector, Comparator, Context};
