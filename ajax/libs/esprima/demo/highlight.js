/*
  Copyright (C) 2013 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

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

var parseTimer, syntax, context;

function id(i) {
    return document.getElementById(i);
}

function parse() {
    var code = editor.getText();

    if (!context) {
        context = new esrefactor.Context();
    }

    try {
        editor.removeAllErrorMarkers();
        editor.showOccurrences([]);
        id('info').innerHTML = 'Ready';
        id('info').setAttribute('class', 'alert-box secondary');
        syntax = esprima.parse(code, {
            loc: true,
            range: true,
            tolerant: true
        });
        context.setCode(syntax);
        trackCursor();
    } catch (e) {
        id('info').innerHTML = e.toString();
        id('info').setAttribute('class', 'alert-box alert');
        editor.showOccurrences([]);
    }
}

function triggerParse(delay) {
    if (parseTimer) {
        window.clearTimeout(parseTimer);
    }

    parseTimer = window.setTimeout(parse, delay || 811);
}

function trackCursor() {
    var pos, identification, identifier, declaration, references,
        model, occurrences, i, ref;

    if (!context) {
        parse();
    }

    editor.removeAllErrorMarkers();
    editor.showOccurrences([]);
    id('info').innerHTML = 'Ready';

    pos = editor.getCaretOffset();
    identification = context.identify(pos);
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

window.onload = function () {
    try {
        require(['custom/editor'], function (editor) {
            window.editor = editor({ parent: 'editor', lang: 'js' });
            window.editor.getTextView().getModel().addEventListener("Changed", triggerParse);
            window.editor.getTextView().addEventListener("Selection", trackCursor);
            window.editor.onGotoLine(9, 12, 12);
            triggerParse(50);
        });
    } catch (e) {
    }
};
