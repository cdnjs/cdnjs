(function (exports) {
'use strict';

var rdm = Math.random;
var flr = Math.floor;
function random(first, last, suffix, round) {
    var val = first + rdm() * (last - first);
    if (round === true) {
        val = flr(val);
    }
    return !suffix ? val : val + suffix;
}

function shuffle(choices) {
    return choices[Math.floor(Math.random() * choices.length)];
}

function element(innerHTML) {
    var el = document.createElement('div');
    el.setAttribute('style', 'display:inline-block;position:relative;text-align:start');
    el.innerHTML = innerHTML || '';
    return el;
}
function splitText(target) {
    var characters = [];
    var words = [];
    var elements = typeof target === 'string'
        ? document.querySelectorAll(target)
        : target instanceof Element ? [target] : typeof target.length === 'number' ? target : [];
    for (var i = 0, ilen = elements.length; i < ilen; i++) {
        var e = elements[i];
        if (!e) {
            continue;
        }
        var contents = e.textContent.replace(/[\r\n\s\t]+/gi, ' ').trim();
        e.innerHTML = '';
        var ws = contents.split(/[\s]+/gi);
        for (var x = 0, xlen = ws.length; x < xlen; x++) {
            var w = ws[x];
            if (!w) {
                continue;
            }
            if (x > 0) {
                var empty = element('&nbsp;');
                e.appendChild(empty);
            }
            var word = element();
            words.push(word);
            e.appendChild(word);
            for (var y = 0, ylen = w.length; y < ylen; y++) {
                var c = w[y];
                var character = element(c);
                word.appendChild(character);
                characters.push(character);
            }
        }
    }
    return { characters: characters, words: words };
}

exports.random = random;
exports.shuffle = shuffle;
exports.splitText = splitText;

}((this.just = this.just || {})));
