#!/usr/bin/env node

import _hyperscript from '../lib/core.js'
const fs = require('fs');
const path = require('path')

/**
 * File extension for _hyperscript files
 */
const hsExt = '._hs';

global.require = require; // Allow importing modules from within hyperscript

/**
 * 
 * @param {String} modulePath
 */
function run(modulePath) {
    modulePath = path.resolve(modulePath);
    const args = { module: { dir: path.dirname(modulePath), id: modulePath } }
    return fs.promises.readFile(modulePath, { encoding: 'utf-8' })
        .then(code => _hyperscript.evaluate(code, {}, args))
        .catch(e => console.error("Cannot execute file: ", e));
}

_hyperscript.addFeature('require', (parser, runtime, tokens) => {
    if (!tokens.matchToken('require')) return;
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
        install(target, source, args) {
            if (id.startsWith('./') || id.startsWith('../')) {
                id = path.join(args.module.dir, id);
            }

            let mod;
            if (id.endsWith(hsExt)) mod = run(id);
            if (fs.existsSync(id + hsExt)) mod = run(id + hsExt);
            else mod = require(id);
            runtime.assignToNamespace(target, [], name, mod);
            //console.log(id, name, mod.toString(), target.hyperscriptFeatures);
        }
    }
})

run(process.argv[2])
