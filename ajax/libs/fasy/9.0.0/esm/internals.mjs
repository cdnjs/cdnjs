/*! Fasy: internals.mjs
    v9.0.0 (c) 2021 Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
let _exp=function runner(e){return async function getArgs(...n){var t=e(...n);return t&&"function"==typeof t.next&&"function"==typeof t[Symbol.iterator]?Promise.resolve().then((function handleNext(e){return function handleResult(e){return e.done?e.value:Promise.resolve(e.value).then(handleNext,(function handleErr(e){return Promise.resolve(t.throw(e)).then(handleResult)}))}(t.next(e))})):t}};export{_exp as runner};