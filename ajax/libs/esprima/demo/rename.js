/*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint browser:true sloppy:true plusplus:true */
/*global esrefactor: true, esprima:true, editor: true, require:true */

var options, parseTimer, code, syntax, context, cursorpos, identification;

options = {
    loc: true,
    range: true,
    tolerant: true,
    tokens: true
};

function id(i) {
    return document.getElementById(i);
}

function trackCursor() {
    var identifier, declaration, references,
        model, occurrences, i, ref;

    editor.removeAllErrorMarkers();
    editor.showOccurrences([]);
    id('info').innerHTML = 'Ready';

    cursorpos = editor.getCaretOffset();
    identification = context.identify(cursorpos);
    if (!identification) {
        return;
    }

    identifier = identification.identifier;
    declaration = identification.declaration;
    references = identification.references;
    model = editor.getModel();

    occurrences = [{
        line: identifier.loc.start.line,
        start: 1 + identifier.range[0] - model.getLineStart(identifier.loc.start.line - 1),
        end: identifier.range[1] - model.getLineStart(identifier.loc.start.line - 1),
        readAccess: false,
        description: identifier.name
    }];

    if (declaration) {
        if (declaration.range !== identifier.range) {
            occurrences.push({
                line: declaration.loc.start.line,
                start: 1 + declaration.range[0] - model.getLineStart(declaration.loc.start.line - 1),
                end: declaration.range[1] - model.getLineStart(declaration.loc.start.line - 1),
                readAccess: true,
                description: 'Line ' + declaration.loc.start.line + ': ' + declaration.name
            });
        }
        editor.addErrorMarker(declaration.range[0],
            'Declaration: ' + declaration.name);
        id('info').innerHTML = 'Identifier \'' + identifier.name + '\' is declared in line ' +
            declaration.loc.start.line + '.';
    } else {
        id('info').innerHTML = 'Warning: No declaration is found for \'' + identifier.name + '\'.';
    }

    for (i = 0; i < references.length; ++i) {
        ref = references[i];
        if (ref.range !== identifier.range) {
            occurrences.push({
                line: ref.loc.start.line,
                start: 1 + ref.range[0] - model.getLineStart(ref.loc.start.line - 1),
                end: ref.range[1] - model.getLineStart(ref.loc.start.line - 1),
                readAccess: true,
                description: ref.name
            });
        }
    }

    editor.showOccurrences(occurrences);
}

function handleRename() {
    var id, new_code, new_tokens, i, index, token, offset, renamed,
        old_p, old_q, new_p, new_q;

    function equivalent(x, y) {
        return x && y &&
            (x.type === y.type) &&
            (x.value === y.value) &&
            (x.range[0] === y.range[0]) &&
            (x.range[1] === y.range[1]);
    }

    id = identification.identifier;

    try {
        new_code = editor.getText();
        new_tokens = esprima.parse(new_code, options).tokens;

        // Locate the token corresponding to the renamed identifier.
        index = -1;
        for (i = 0; i < syntax.tokens.length; ++i) {
            token = syntax.tokens[i];
            if (token.range[0] === id.range[0]) {
                index = i;
                offset = id.range[1] - cursorpos;
                break;
            }
        }

        // Get the new name for that identifier.
        token = new_tokens[index];
        if (token && token.value !== id.name) {

            // Check that other tokens haven't changed.
            old_p = code.substr(0, id.range[0]);
            old_q = code.substr(id.range[1]);
            new_p = new_code.substr(0, token.range[0]);
            new_q = new_code.substr(token.range[1]);
            if (old_p === new_p || old_q === new_q) {

                // Rename the identifier, adjust the source and the cursor.
                context.setCode(code);
                renamed = context.rename(identification, token.value);
                if (renamed) {
                    new_tokens = esprima.parse(renamed, options).tokens;
                    cursorpos = new_tokens[index].range[1] - offset;
                    editor.setText(renamed);
                    editor.setCaretOffset(cursorpos);
                }
            }
        }
    } catch (e) {}
}

function parse() {
    if (parseTimer) {
        window.clearTimeout(parseTimer);
    }

    if (!context) {
        context = new esrefactor.Context();
    }

    if (identification && identification.identifier) {
        handleRename();
    }

    code = editor.getText();

    try {
        editor.removeAllErrorMarkers();
        editor.showOccurrences([]);
        id('info').innerHTML = 'Ready';
        id('info').setAttribute('class', 'alert-box secondary');
        identification = null;
        syntax = esprima.parse(code, options);
        context.setCode(syntax);
    } catch (e) {
        id('info').innerHTML = e.toString();
        id('info').setAttribute('class', 'alert-box alert');
        editor.showOccurrences([]);
    } finally {
        trackCursor();
    }

}

function triggerParse() {
    if (parseTimer) {
        window.clearTimeout(parseTimer);
    }

    parseTimer = window.setTimeout(parse, 100);
}


window.onload = function () {
    try {
        require(['custom/editor'], function (editor) {
            window.editor = editor({ parent: 'editor', lang: 'js' });
            window.editor.getTextView().getModel().addEventListener("Changed", triggerParse);
            window.editor.getTextView().addEventListener("Selection", triggerParse);
            triggerParse();
            window.editor.onGotoLine(9, 12, 12);
        });
    } catch (e) {
    }
};
