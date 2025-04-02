
const tempModule = window.module, tempExports = window.exports;
window.module = {}, window.exports = {};
await import('./_hyperscript.js');
const _hyperscript = window.module.exports;

export default _hyperscript;

window.module = tempModule;
window.exports = tempExports;

import * as path from "https://deno.land/std@0.139.0/path/mod.ts"

/**
 * File extension for _hyperscript files
 */
const hsExt = '._hs';

/**
 * 
 * @param {String} modulePath
 */
export function run(modulePath) {
    modulePath = path.resolve(modulePath);
    const args = { module: { dir: path.dirname(modulePath), id: modulePath } }
    return Deno.readTextFile(modulePath)
        .then(code => _hyperscript.evaluate(code, {}, args))
        .catch(e => console.error("Cannot execute file: ", e));
}

_hyperscript.addFeature('import', (parser, runtime, tokens) => {
    if (!tokens.matchToken('import')) return;
    /** @type {string} */
    let id = parser.requireElement('nakedString', tokens)
        // @ts-ignore
        .evaluate({});

    let name = id;
    if (tokens.matchToken('as')) {
        name = tokens.requireTokenType('IDENTIFIER').value;
    } else {
        name = path.basename(id)
            .replace(/\.[^\.]*$/, '') // remove extension
    }

    return {
        async install(target, source, args) {
            if (id.startsWith('./') || id.startsWith('../')) {
                id = path.join(args.module.dir, id);
            }

            let mod;
            if (id.endsWith(hsExt)) mod = run(id);
            if (await resolves(Deno.stat(id + hsExt))) mod = run(id + hsExt);
            else mod = await import(id);
            runtime.assignToNamespace(target, [], name, mod);
            //console.log(id, name, mod.toString(), target.hyperscriptFeatures);
        }
    }
})

function resolves(promise) {
    promise.then(() => true, () => false)
}

if (import.meta.main) run(Deno.args[0])
