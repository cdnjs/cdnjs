(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function appendSaveAsDialog (index, output) {
    let menu;

    function closeMenu(e) {
        const left = parseInt(menu.style.left, 10);
        const top = parseInt(menu.style.top, 10);
        if (
            e.x < left ||
            e.x > (left + menu.offsetWidth) ||
            e.y < top ||
            e.y > (top + menu.offsetHeight)
        ) {
            menu.parentNode.removeChild(menu);
            document.body.removeEventListener('mousedown', closeMenu, false);
        }
    }

    const div = document.getElementById(output + index);

    div.childNodes[0].addEventListener('contextmenu',
        function (e) {
            menu = document.createElement('div');

            menu.className = 'wavedromMenu';
            menu.style.top = e.y + 'px';
            menu.style.left = e.x + 'px';

            const list = document.createElement('ul');
            const savePng = document.createElement('li');
            savePng.innerHTML = 'Save as PNG';
            list.appendChild(savePng);

            const saveSvg = document.createElement('li');
            saveSvg.innerHTML = 'Save as SVG';
            list.appendChild(saveSvg);

            //const saveJson = document.createElement('li');
            //saveJson.innerHTML = 'Save as JSON';
            //list.appendChild(saveJson);

            menu.appendChild(list);

            document.body.appendChild(menu);

            savePng.addEventListener('click',
                function () {
                    let html = '';
                    if (index !== 0) {
                        const firstDiv = document.getElementById(output + 0);
                        html += firstDiv.innerHTML.substring(166, firstDiv.innerHTML.indexOf('<g id="waves_0">'));
                    }
                    html = [div.innerHTML.slice(0, 166), html, div.innerHTML.slice(166)].join('');
                    const svgdata = 'data:image/svg+xml;base64,' + btoa(html);
                    const img = new Image();
                    img.src = svgdata;
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0);

                    const pngdata = canvas.toDataURL('image/png');

                    const a = document.createElement('a');
                    a.href = pngdata;
                    a.download = 'wavedrom.png';
                    a.click();

                    menu.parentNode.removeChild(menu);
                    document.body.removeEventListener('mousedown', closeMenu, false);
                },
                false
            );

            saveSvg.addEventListener('click',
                function () {
                    let html = '';
                    if (index !== 0) {
                        const firstDiv = document.getElementById(output + 0);
                        html += firstDiv.innerHTML.substring(166, firstDiv.innerHTML.indexOf('<g id="waves_0">'));
                    }
                    html = [div.innerHTML.slice(0, 166), html, div.innerHTML.slice(166)].join('');
                    const svgdata = 'data:image/svg+xml;base64,' + btoa(html);

                    const a = document.createElement('a');
                    a.href = svgdata;
                    a.download = 'wavedrom.svg';
                    a.click();

                    menu.parentNode.removeChild(menu);
                    document.body.removeEventListener('mousedown', closeMenu, false);
                },
                false
            );

            menu.addEventListener('contextmenu',
                function (ee) {
                    ee.preventDefault();
                },
                false
            );

            document.body.addEventListener('mousedown', closeMenu, false);

            e.preventDefault();
        },
        false
    );
}

module.exports = appendSaveAsDialog;

/* eslint-env browser */

},{}],2:[function(require,module,exports){
'use strict';

function arcShape (Edge, from, to) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let lx = ((from.x + to.x) / 2);
    const ly = ((from.y + to.y) / 2);
    let d;
    let style;
    switch (Edge.shape) {
    case '-'  : {
        break;
    }
    case '~'  : {
        d = ('M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    }
    case '-~' : {
        d = ('M ' + from.x + ',' + from.y + ' c ' + (0.7 * dx) + ', 0 ' +         dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
        break;
    }
    case '~-' : {
        d = ('M ' + from.x + ',' + from.y + ' c ' + 0          + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.25); }
        break;
    }
    case '-|' : {
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) { lx = to.x; }
        break;
    }
    case '|-' : {
        d = ('m ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
        if (Edge.label) { lx = from.x; }
        break;
    }
    case '-|-': {
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    }
    case '->' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        break;
    }
    case '~>' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + 0.3 * dx + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    }
    case '-~>': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' +     dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
        break;
    }
    case '~->': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + 0      + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.25); }
        break;
    }
    case '-|>' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) { lx = to.x; }
        break;
    }
    case '|->' : {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' 0,' + dy + ' ' + dx + ',0');
        if (Edge.label) { lx = from.x; }
        break;
    }
    case '-|->': {
        style = ('marker-end:url(#arrowhead);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    }
    case '<->' : {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        break;
    }
    case '<~>' : {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' + (0.3 * dx) + ', ' + dy + ' ' + dx + ', ' + dy);
        break;
    }
    case '<-~>': {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('M ' + from.x + ',' + from.y + ' ' + 'c ' + (0.7 * dx) + ', 0 ' +     dx + ', ' + dy + ' ' + dx + ', ' + dy);
        if (Edge.label) { lx = (from.x + (to.x - from.x) * 0.75); }
        break;
    }
    case '<-|>' : {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + dx + ',0 0,' + dy);
        if (Edge.label) { lx = to.x; }
        break;
    }
    case '<-|->': {
        style = ('marker-end:url(#arrowhead);marker-start:url(#arrowtail);stroke:#0041c4;stroke-width:1;fill:none');
        d = ('m ' + from.x + ',' + from.y + ' ' + (dx / 2) + ',0 0,' + dy + ' ' + (dx / 2) + ',0');
        break;
    }
    case '+':   { style = ('marker-end:url(#tee);marker-start:url(#tee);fill:none;stroke:#00F;stroke-width:1'); break; }
    default   : { style = ('fill:none;stroke:#F00;stroke-width:1'); }
    }
    return {
        lx: lx,
        ly: ly,
        d: d,
        style: style
    };
} /* eslint complexity: [1, 40] */

module.exports = arcShape;

},{}],3:[function(require,module,exports){
module.exports={"chars":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,34,47,74,74,118,89,25,44,44,52,78,37,44,37,37,74,74,74,74,74,74,74,74,74,74,37,37,78,78,78,74,135,89,89,96,96,89,81,103,96,37,67,89,74,109,96,103,89,103,96,89,81,96,89,127,89,87,81,37,37,37,61,74,44,74,74,67,74,74,37,74,74,30,30,67,30,112,74,74,74,74,44,67,37,74,67,95,66,65,67,44,34,44,78,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,43,74,74,74,74,34,74,44,98,49,74,78,0,98,73,53,73,44,44,44,77,71,37,44,44,49,74,111,111,111,81,89,89,89,89,89,89,133,96,89,89,89,89,37,37,37,37,96,96,103,103,103,103,103,78,103,96,96,96,96,87,89,81,74,74,74,74,74,74,118,67,74,74,74,74,36,36,36,36,74,74,74,74,74,74,74,73,81,74,74,74,74,65,74,65,89,74,89,74,89,74,96,67,96,67,96,67,96,67,96,82,96,74,89,74,89,74,89,74,89,74,89,74,103,74,103,74,103,74,103,74,96,74,96,74,37,36,37,36,37,36,37,30,37,36,98,59,67,30,89,67,67,74,30,74,30,74,39,74,44,74,30,96,74,96,74,96,74,80,96,74,103,74,103,74,103,74,133,126,96,44,96,44,96,44,89,67,89,67,89,67,89,67,81,38,81,50,81,37,96,74,96,74,96,74,96,74,96,74,96,74,127,95,87,65,87,81,67,81,67,81,67,30,84,97,91,84,91,84,94,92,73,104,109,91,84,81,84,100,82,76,74,103,91,131,47,40,99,77,37,79,130,100,84,104,114,87,126,101,87,84,93,84,69,84,46,52,82,52,82,114,89,102,96,100,98,91,70,88,88,77,70,85,89,77,67,84,39,65,61,39,189,173,153,111,105,61,123,123,106,89,74,37,30,103,74,96,74,96,74,96,74,96,74,96,74,81,91,81,91,81,130,131,102,84,103,84,87,78,104,81,104,81,88,76,37,189,173,153,103,84,148,90,100,84,89,74,133,118,103,81],"other":114}

},{}],4:[function(require,module,exports){
'use strict';

const stringify = require('onml/stringify.js');
const w3 = require('./w3.js');

function createElement (arr) {
    arr[1].xmlns = w3.svg;
    arr[1]['xmlns:xlink'] = w3.xlink;
    const s1 = stringify(arr);
    // const s2 = s1.replace(/&/g, '&amp;');
    const parser = new DOMParser();
    const doc = parser.parseFromString(s1, 'image/svg+xml');
    return doc.firstChild;
}

module.exports = createElement;
/* eslint-env browser */

},{"./w3.js":33,"onml/stringify.js":42}],5:[function(require,module,exports){
'use strict';

const eva = require('./eva.js');
const renderWaveForm = require('./render-wave-form.js');

function editorRefresh () {
    // let svg,
    // ser,
    // ssvg,
    // asvg,
    // sjson,
    // ajson;

    renderWaveForm(0, eva('InputJSON_0'), 'WaveDrom_Display_');

    /*
    svg = document.getElementById('svgcontent_0');
    ser = new XMLSerializer();
    ssvg = '<?xml version='1.0' standalone='no'?>\n' +
    '<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>\n' +
    '<!-- Created with WaveDrom -->\n' +
    ser.serializeToString(svg);

    asvg = document.getElementById('download_svg');
    asvg.href = 'data:image/svg+xml;base64,' + window.btoa(ssvg);

    sjson = localStorage.waveform;
    ajson = document.getElementById('download_json');
    ajson.href = 'data:text/json;base64,' + window.btoa(sjson);
    */
}

module.exports = editorRefresh;

},{"./eva.js":6,"./render-wave-form.js":30}],6:[function(require,module,exports){
'use strict';

function erra (e) {
    console.log('Error in WaveJS: ', e) /* eslint no-console: 0 */;
    const msg = ['tspan', ['tspan', {class:'error h5'}, 'Error: '], e.message];
    msg.textWidth = 1000;  // set dummy width because we cannot measure tspans
    return {signal: [{name: msg}]};
}

function eva (id) {
    const TheTextBox = document.getElementById(id);

    /* eslint-disable no-eval */
    let source;
    if (TheTextBox.type && TheTextBox.type === 'textarea') {
        try {
            source = eval('(' + TheTextBox.value + ')');
        } catch (e) {
            return erra(e);
        }
    } else {
        try {
            source = eval('(' + TheTextBox.innerHTML + ')');
        } catch (e) {
            return erra(e);
        }
    }
    /* eslint-enable  no-eval */

    if (Object.prototype.toString.call(source) !== '[object Object]') {
        return erra({ message: '[Semantic]: The root has to be an Object: "{signal:[...]}"'});
    }
    if (source.signal) {
        if (!Array.isArray(source.signal)) {
            return erra({ message: '[Semantic]: "signal" object has to be an Array "signal:[]"'});
        }
    } else if (source.assign) {
        if (!Array.isArray(source.assign)) {
            return erra({ message: '[Semantic]: "assign" object hasto be an Array "assign:[]"'});
        }
    } else if (source.reg) {
        // test register
    } else {
        return erra({ message: '[Semantic]: "signal:[...]" or "assign:[...]" property is missing inside the root Object'});
    }
    return source;
}

module.exports = eva;

/* eslint-env browser */

},{}],7:[function(require,module,exports){
'use strict';

function findLaneMarkers (lanetext) {
    let gcount = 0;
    let lcount = 0;
    const ret = [];

    lanetext.forEach(function (e) {
        if (
            (e === 'vvv-2') ||
            (e === 'vvv-3') ||
            (e === 'vvv-4') ||
            (e === 'vvv-5') ||
            (e === 'vvv-6') ||
            (e === 'vvv-7') ||
            (e === 'vvv-8') ||
            (e === 'vvv-9')
        ) {
            lcount += 1;
        } else {
            if (lcount !== 0) {
                ret.push(gcount - ((lcount + 1) / 2));
                lcount = 0;
            }
        }
        gcount += 1;

    });

    if (lcount !== 0) {
        ret.push(gcount - ((lcount + 1) / 2));
    }

    return ret;
}

module.exports = findLaneMarkers;

},{}],8:[function(require,module,exports){
'use strict';

const genBrick = (texts, extra, times) => {
    const R = [];

    if (!Array.isArray(texts)) {
        texts = [texts];
    }

    if (texts.length === 4) {
        for (let j = 0; j < times; j += 1) {
            R.push(texts[0]);
            for (let i = 0; i < extra; i += 1) {
                R.push(texts[1]);
            }
            R.push(texts[2]);
            for (let i = 0; i < extra; i += 1) {
                R.push(texts[3]);
            }
        }
        return R;
    }
    if (texts.length === 1) {
        texts.push(texts[0]);
    }
    R.push(texts[0]);
    for (let i = 0; i < (times * (2 * (extra + 1)) - 1); i += 1) {
        R.push(texts[1]);
    }
    return R;
};

module.exports = genBrick;

},{}],9:[function(require,module,exports){
'use strict';

const genBrick = require('./gen-brick.js');

const lookUpTable = {
    p:       ['pclk', '111', 'nclk', '000'],
    n:       ['nclk', '000', 'pclk', '111'],
    P:       ['Pclk', '111', 'nclk', '000'],
    N:       ['Nclk', '000', 'pclk', '111'],
    l:       '000',
    L:       '000',
    0:       '000',
    h:       '111',
    H:       '111',
    1:       '111',
    '=':     'vvv-2',
    2:       'vvv-2',
    3:       'vvv-3',
    4:       'vvv-4',
    5:       'vvv-5',
    6:       'vvv-6',
    7:       'vvv-7',
    8:       'vvv-8',
    9:       'vvv-9',
    d:       'ddd',
    u:       'uuu',
    z:       'zzz',
    default: 'xxx'
};

const genFirstWaveBrick = (text, extra, times) =>
    genBrick((lookUpTable[text] || lookUpTable.default), extra, times);

module.exports = genFirstWaveBrick;

},{"./gen-brick.js":8}],10:[function(require,module,exports){
'use strict';

const genBrick = require('./gen-brick.js');

function genWaveBrick (text, extra, times) {

    const x1 = {p: 'pclk', n: 'nclk', P: 'Pclk', N: 'Nclk', h: 'pclk', l: 'nclk', H: 'Pclk', L: 'Nclk'};

    const x2 = {
        '0':'0', '1':'1',
        'x':'x',
        'd':'d',
        'u':'u',
        'z':'z',
        '=':'v',  '2':'v',  '3':'v',  '4':'v', '5':'v', '6':'v', '7':'v', '8':'v', '9':'v'
    };

    const x3 = {
        '0': '', '1': '',
        'x': '',
        'd': '',
        'u': '',
        'z': '',
        '=':'-2', '2':'-2', '3':'-3', '4':'-4', '5':'-5', '6':'-6', '7':'-7', '8':'-8', '9':'-9'
    };

    const y1 = {
        'p':'0', 'n':'1',
        'P':'0', 'N':'1',
        'h':'1', 'l':'0',
        'H':'1', 'L':'0',
        '0':'0', '1':'1',
        'x':'x',
        'd':'d',
        'u':'u',
        'z':'z',
        '=':'v', '2':'v', '3':'v', '4':'v', '5':'v', '6':'v', '7':'v', '8':'v', '9':'v'
    };

    const y2 = {
        'p': '', 'n': '',
        'P': '', 'N': '',
        'h': '', 'l': '',
        'H': '', 'L': '',
        '0': '', '1': '',
        'x': '',
        'd': '',
        'u': '',
        'z': '',
        '=':'-2', '2':'-2', '3':'-3', '4':'-4', '5':'-5', '6':'-6', '7':'-7', '8':'-8', '9':'-9'
    };

    const x4 = {
        'p': '111', 'n': '000',
        'P': '111', 'N': '000',
        'h': '111', 'l': '000',
        'H': '111', 'L': '000',
        '0': '000', '1': '111',
        'x': 'xxx',
        'd': 'ddd',
        'u': 'uuu',
        'z': 'zzz',
        '=': 'vvv-2', '2': 'vvv-2', '3': 'vvv-3', '4': 'vvv-4', '5': 'vvv-5', '6':'vvv-6', '7':'vvv-7', '8':'vvv-8', '9':'vvv-9'
    };

    const x5 = {p: 'nclk', n: 'pclk', P: 'nclk', N: 'pclk'};

    const x6 = {p: '000', n: '111', P: '000', N: '111'};

    const xclude = {hp: '111', Hp: '111', ln: '000', Ln: '000', nh: '111', Nh: '111', pl: '000', Pl: '000'};

    const atext = text.split('');
    //if (atext.length !== 2) { return genBrick(['xxx'], extra, times); }

    const tmp0 = x4[atext[1]];
    let tmp1 = x1[atext[1]];
    if (tmp1 === undefined) {
        const tmp2 = x2[atext[1]];
        if (tmp2 === undefined) {
            // unknown
            return genBrick('xxx', extra, times);
        } else {
            const tmp3 = y1[atext[0]];
            if (tmp3 === undefined) {
                // unknown
                return genBrick('xxx', extra, times);
            }
            // soft curves
            return genBrick([tmp3 + 'm' + tmp2 + y2[atext[0]] + x3[atext[1]], tmp0], extra, times);
        }
    } else {
        const tmp4 = xclude[text];
        if (tmp4 !== undefined) {
            tmp1 = tmp4;
        }
        // sharp curves
        const tmp5 = x5[atext[1]];
        if (tmp5 === undefined) {
            // hlHL
            return genBrick([tmp1, tmp0], extra, times);
        }
        // pnPN
        return genBrick([tmp1, tmp0, tmp5, x6[atext[1]]], extra, times);
    }
}

module.exports = genWaveBrick;

},{"./gen-brick.js":8}],11:[function(require,module,exports){
'use strict';

const tt = require('onml/tt.js');

const w3 = require('./w3.js');

function insertSVGTemplate (index, source, lane, waveSkin, content, lanes, groups, notFirstSignal) {
    const waveSkinNames = Object.keys(waveSkin);

    let skin = waveSkin.default || waveSkin[waveSkinNames[0]];

    if (source && source.config && source.config.skin && waveSkin[source.config.skin]) {
        skin = waveSkin[source.config.skin];
    }

    const e = notFirstSignal
        ? ['svg', {id: 'svg', xmlns: w3.svg, 'xmlns:xlink': w3.xlink}, ['g']]
        : skin;

    const width = (lane.xg + (lane.xs * (lane.xmax + 1)));
    const height = (content.length * lane.yo + lane.yh0 + lane.yh1 + lane.yf0 + lane.yf1);

    const body = e[e.length - 1];

    body[1] = {id: 'waves_'  + index};

    body[2] = ['rect', {width: width, height: height, style: 'stroke:none;fill:white'}];

    body[3] = ['g', tt(
        lane.xg + 0.5,
        lane.yh0 + lane.yh1 + 0.5,
        {id: 'lanes_'  + index}
    )].concat(lanes);

    body[4] = ['g', {
        id: 'groups_' + index
    }, groups];

    const head = e[1];

    head.id = 'svgcontent_' + index;
    head.height = height;
    head.width = width;
    head.viewBox = '0 0 ' + width + ' ' + height;
    head.overflow = 'hidden';

    return e;
}

module.exports = insertSVGTemplate;

},{"./w3.js":33,"onml/tt.js":43}],12:[function(require,module,exports){
'use strict';

const lane = {
    xs     : 20,    // tmpgraphlane0.width
    ys     : 20,    // tmpgraphlane0.height
    xg     : 120,   // tmpgraphlane0.x
    // yg     : 0,     // head gap
    yh0    : 0,     // head gap title
    yh1    : 0,     // head gap
    yf0    : 0,     // foot gap
    yf1    : 0,     // foot gap
    y0     : 5,     // tmpgraphlane0.y
    yo     : 30,    // tmpgraphlane1.y - y0;
    tgo    : -10,   // tmptextlane0.x - xg;
    ym     : 15,    // tmptextlane0.y - y0
    xlabel : 6,     // tmptextlabel.x - xg;
    xmax   : 1,
    scale  : 1,
    head   : {},
    foot   : {}
};

module.exports = lane;

},{}],13:[function(require,module,exports){
'use strict';

function parseConfig (source, lane) {
    function tonumber (x) {
        return x > 0 ? Math.round(x) : 1;
    }

    lane.hscale = 1;

    if (lane.hscale0) {
        lane.hscale = lane.hscale0;
    }
    if (source && source.config && source.config.hscale) {
        let hscale = Math.round(tonumber(source.config.hscale));
        if (hscale > 0) {
            if (hscale > 100) {
                hscale = 100;
            }
            lane.hscale = hscale;
        }
    }
    lane.yh0 = 0;
    lane.yh1 = 0;
    lane.head = source.head;

    lane.xmin_cfg = 0;
    lane.xmax_cfg = 1e12; // essentially infinity
    if (source && source.config && source.config.hbounds && source.config.hbounds.length==2) {
        source.config.hbounds[0] = Math.floor(source.config.hbounds[0]);
        source.config.hbounds[1] = Math.ceil(source.config.hbounds[1]);
        if (  source.config.hbounds[0] < source.config.hbounds[1] ) {
            // convert hbounds ticks min, max to bricks min, max
            // TODO: do we want to base this on ticks or tocks in
            //  head or foot?  All 4 can be different... or just 0 reference?
            lane.xmin_cfg = 2 * Math.floor(source.config.hbounds[0]);
            lane.xmax_cfg = 2 * Math.floor(source.config.hbounds[1]);
        }
    }

    if (source && source.head) {
        if (
            source.head.tick || source.head.tick === 0 ||
            source.head.tock || source.head.tock === 0
        ) {
            lane.yh0 = 20;
        }
        // if tick defined, modify start tick by lane.xmin_cfg
        if ( source.head.tick || source.head.tick === 0 ) {
            source.head.tick = source.head.tick + lane.xmin_cfg/2;
        }
        // if tock defined, modify start tick by lane.xmin_cfg
        if ( source.head.tock || source.head.tock === 0 ) {
            source.head.tock = source.head.tock + lane.xmin_cfg/2;
        }

        if (source.head.text) {
            lane.yh1 = 46;
            lane.head.text = source.head.text;
        }
    }

    lane.yf0 = 0;
    lane.yf1 = 0;
    lane.foot = source.foot;
    if (source && source.foot) {
        if (
            source.foot.tick || source.foot.tick === 0 ||
            source.foot.tock || source.foot.tock === 0
        ) {
            lane.yf0 = 20;
        }
        // if tick defined, modify start tick by lane.xmin_cfg
        if ( source.foot.tick || source.foot.tick === 0 ) {
            source.foot.tick = source.foot.tick + lane.xmin_cfg/2;
        }
        // if tock defined, modify start tick by lane.xmin_cfg
        if ( source.foot.tock || source.foot.tock === 0 ) {
            source.foot.tock = source.foot.tock + lane.xmin_cfg/2;
        }

        if (source.foot.text) {
            lane.yf1 = 46;
            lane.foot.text = source.foot.text;
        }
    }
} /* eslint complexity: [1, 40] */

module.exports = parseConfig;

},{}],14:[function(require,module,exports){
'use strict';

const genFirstWaveBrick = require('./gen-first-wave-brick.js');
const genWaveBrick = require('./gen-wave-brick.js');
const findLaneMarkers = require('./find-lane-markers.js');

// src is the wave member of the signal object
// extra = hscale-1 ( padding )
// lane is an object containing all properties for this waveform
function parseWaveLane (src, extra, lane) {
    const Stack = src.split('');
    let Next  = Stack.shift();

    let Repeats = 1;
    while (Stack[0] === '.' || Stack[0] === '|') { // repeaters parser
        Stack.shift();
        Repeats += 1;
    }
    let R = [];
    R = R.concat(genFirstWaveBrick(Next, extra, Repeats));

    let Top;
    let subCycle = false;
    while (Stack.length) {
        Top = Next;
        Next = Stack.shift();
        if (Next === '<') { // sub-cycles on
            subCycle = true;
            Next = Stack.shift();
        }
        if (Next === '>') { // sub-cycles off
            subCycle = false;
            Next = Stack.shift();
        }
        Repeats = 1;
        while (Stack[0] === '.' || Stack[0] === '|') { // repeaters parser
            Stack.shift();
            Repeats += 1;
        }
        if (subCycle) {
            R = R.concat(genWaveBrick((Top + Next), 0, Repeats - lane.period));
        } else {
            R = R.concat(genWaveBrick((Top + Next), extra, Repeats));
        }
    }
    // shift out unseen bricks due to phase shift, and save them in
    const unseen_bricks = [];
    for (let i = 0; i < lane.phase; i += 1) {
        unseen_bricks.push(R.shift());
    }

    let num_unseen_markers;
    if (unseen_bricks.length > 0) {
        num_unseen_markers = findLaneMarkers( unseen_bricks ).length;
        // if end of unseen_bricks and start of R both have a marker,
        //  then one less unseen marker
        if (findLaneMarkers( [unseen_bricks[unseen_bricks.length-1]] ).length == 1 &&
            findLaneMarkers( [R[0]] ).length == 1
        ) {
            num_unseen_markers -= 1;
        }
    } else {
        num_unseen_markers = 0;
    }

    // R is array of half brick types, each is item is string
    // num_unseen_markers is how many markers are now unseen due to phase
    return [R, num_unseen_markers];
}

module.exports = parseWaveLane;

},{"./find-lane-markers.js":7,"./gen-first-wave-brick.js":9,"./gen-wave-brick.js":10}],15:[function(require,module,exports){
'use strict';

const parseWaveLane = require('./parse-wave-lane.js');

function data_extract (e, num_unseen_markers) {
    let ret_data = e.data;
    if (ret_data === undefined) { return null; }
    if (typeof (ret_data) === 'string') {
        ret_data = ret_data.trim().split(/\s+/);
    }
    // slice data array after unseen markers
    ret_data = ret_data.slice( num_unseen_markers );
    return ret_data;
}

function parseWaveLanes (sig, lane) {
    const content = [];
    const tmp0 = [];

    sig.map(function (sigx) {
        const current = [];
        content.push(current);

        lane.period = sigx.period || 1;
        // xmin_cfg is min. brick of hbounds, add to lane.phase of all signals
        lane.phase = (sigx.phase ? sigx.phase * 2 : 0) + lane.xmin_cfg;
        tmp0[0] = sigx.name || ' ';
        // xmin_cfg is min. brick of hbounds, add 1/2 to sigx.phase of all sigs
        tmp0[1] = (sigx.phase || 0) + lane.xmin_cfg/2;

        let content_wave = null;
        let num_unseen_markers;
        if (typeof sigx.wave === 'string') {
            const parsed_wave_lane = parseWaveLane(sigx.wave, lane.period * lane.hscale - 1, lane);
            content_wave = parsed_wave_lane[0] ;
            num_unseen_markers = parsed_wave_lane[1];
        }
        current.push(
            tmp0.slice(0),
            content_wave,
            data_extract(sigx, num_unseen_markers),
            sigx
        );
    });
    // content is an array of arrays, representing the list of signals using
    //  the same order:
    // content[0] = [ [name,phase], parsedwavelaneobj, dataextracted ]
    return content;
}

module.exports = parseWaveLanes;

},{"./parse-wave-lane.js":14}],16:[function(require,module,exports){
'use strict';

const eva = require('./eva.js');
const appendSaveAsDialog = require('./append-save-as-dialog.js');
const renderWaveForm = require('./render-wave-form.js');

function processAll () {
    // first pass
    let index = 0; // actual number of valid anchor
    const points = document.querySelectorAll('*');
    for (let i = 0; i < points.length; i++) {
        if (points.item(i).type && points.item(i).type.toLowerCase() === 'wavedrom') {
            points.item(i).setAttribute('id', 'InputJSON_' + index);

            const node0 = document.createElement('div');
            // node0.className += 'WaveDrom_Display_' + index;
            node0.id = 'WaveDrom_Display_' + index;
            points.item(i).parentNode.insertBefore(node0, points.item(i));
            // WaveDrom.InsertSVGTemplate(i, node0);
            index += 1;
        }
    }
    // second pass
    let notFirstSignal = false;
    for (let i = 0; i < index; i += 1) {
        const obj = eva('InputJSON_' + i);
        renderWaveForm(i, obj, 'WaveDrom_Display_', notFirstSignal);
        if (obj && obj.signal && !notFirstSignal) {
            notFirstSignal = true;
        }
        appendSaveAsDialog(i, 'WaveDrom_Display_');
    }
    // add styles
    document.head.insertAdjacentHTML('beforeend', '<style type="text/css">div.wavedromMenu{position:fixed;border:solid 1pt#CCCCCC;background-color:white;box-shadow:0px 10px 20px #808080;cursor:default;margin:0px;padding:0px;}div.wavedromMenu>ul{margin:0px;padding:0px;}div.wavedromMenu>ul>li{padding:2px 10px;list-style:none;}div.wavedromMenu>ul>li:hover{background-color:#b5d5ff;}</style>');
}

module.exports = processAll;

/* eslint-env browser */

},{"./append-save-as-dialog.js":1,"./eva.js":6,"./render-wave-form.js":30}],17:[function(require,module,exports){
'use strict';

function rec (tmp, state) {
    let deltaX = 10;

    let name;
    if (typeof tmp[0] === 'string' || typeof tmp[0] === 'number') {
        name = tmp[0];
        deltaX = 25;
    }
    state.x += deltaX;
    for (let i = 0; i < tmp.length; i++) {
        if (typeof tmp[i] === 'object') {
            if (Array.isArray(tmp[i])) {
                const oldY = state.y;
                state = rec(tmp[i], state);
                state.groups.push({x: state.xx, y: oldY, height: (state.y - oldY), name: state.name});
            } else {
                state.lanes.push(tmp[i]);
                state.width.push(state.x);
                state.y += 1;
            }
        }
    }
    state.xx = state.x;
    state.x -= deltaX;
    state.name = name;
    return state;
}

module.exports = rec;

},{}],18:[function(require,module,exports){
'use strict';

const renderAssign = require('logidrom/lib/render-assign.js');

const renderReg = require('./render-reg.js');
const renderSignal = require('./render-signal.js');

function renderAny (index, source, waveSkin, notFirstSignal) {
    const res = source.signal
        ? renderSignal(index, source, waveSkin, notFirstSignal)
        : source.assign
            ? renderAssign(index, source)
            : source.reg
                ? renderReg(index, source)
                : ['div', {}];

    res[1].class = 'WaveDrom';
    return res;
}

module.exports = renderAny;

},{"./render-reg.js":27,"./render-signal.js":28,"logidrom/lib/render-assign.js":40}],19:[function(require,module,exports){
'use strict';

const arcShape = require('./arc-shape.js');
const renderLabel = require('./render-label.js');

const renderArc = (Edge, from, to, shapeProps) =>
    ['path', {
        id: 'gmark_' + Edge.from + '_' + Edge.to,
        d: shapeProps.d || 'M ' + from.x + ',' + from.y + ' ' + to.x + ',' + to.y,
        style: shapeProps.style || 'fill:none;stroke:#00F;stroke-width:1'
    }];

const labeler = (lane, Events) => (element, i) => {
    const text = element.node;
    lane.period = element.period ? element.period : 1;
    lane.phase  = (element.phase ? element.phase * 2 : 0) + lane.xmin_cfg;
    if (text) {
        const stack = text.split('');
        let pos = 0;
        while (stack.length) {
            const eventname = stack.shift();
            if (eventname !== '.') {
                Events[eventname] = {
                    x: lane.xs * (2 * pos * lane.period * lane.hscale - lane.phase) + lane.xlabel,
                    y: i * lane.yo + lane.y0 + lane.ys * 0.5
                };
            }
            pos += 1;
        }
    }
};

const archer = (res, Events, arcFontSize) => (element) => {
    const words = element.trim().split(/\s+/);
    const Edge = {
        words: words,
        label: element.substring(words[0].length).substring(1),
        from:  words[0].substr(0, 1),
        to:    words[0].substr(-1, 1),
        shape: words[0].slice(1, -1)
    };
    const from = Events[Edge.from];
    const to = Events[Edge.to];

    if (from && to) {
        const shapeProps = arcShape(Edge, from, to);
        const lx = shapeProps.lx;
        const ly = shapeProps.ly;
        res.push(renderArc(Edge, from, to, shapeProps));
        if (Edge.label) {
            res.push(renderLabel({x: lx, y: ly}, Edge.label, arcFontSize));
        }
    }
};

function renderArcs (lanes, index, source, lane) {
    const arcFontSize = (source && source.config && source.config.arcFontSize)
        ? source.config.arcFontSize
        : 11;

    const res = ['g', {id: 'wavearcs_' + index}];
    const Events = {};
    if (Array.isArray(lanes)) {
        lanes.map(labeler(lane, Events));
        if (Array.isArray(source.edge)) {
            source.edge.map(archer(res, Events, arcFontSize));
        }
        Object.keys(Events).map(function (k) {
            if (k === k.toLowerCase()) {
                if (Events[k].x > 0) {
                    res.push(renderLabel({
                        x: Events[k].x,
                        y: Events[k].y
                    }, k + '', arcFontSize));
                }
            }
        });
    }
    return res;
}

module.exports = renderArcs;

},{"./arc-shape.js":2,"./render-label.js":22}],20:[function(require,module,exports){
'use strict';

const tt = require('onml/tt.js');

function renderGapUses (text, lane) {
    const res = [];
    const Stack = (text || '').split('');
    let pos = 0;
    let subCycle = false;
    while (Stack.length) {
        let next = Stack.shift();
        if (next === '<') { // sub-cycles on
            subCycle = true;
            next = Stack.shift();
        }
        if (next === '>') { // sub-cycles off
            subCycle = false;
            next = Stack.shift();
        }
        if (subCycle) {
            pos += 1;
        } else {
            pos += (2 * lane.period);
        }
        if (next === '|') {
            res.push(['use', tt(
                lane.xs * ((pos - (subCycle ? 0 : lane.period)) * lane.hscale - lane.phase),
                0,
                {'xlink:href': '#gap'}
            )]);
        }
    }
    return res;
}


function renderGaps (lanes, index, source, lane) {
    let res = [];
    if (lanes) {
        const lanesLen = lanes.length;

        const vline = (x) => ['line', {
            x1: x, x2: x,
            y2: lanesLen * lane.yo,
            style: 'stroke:#000;stroke-width:1px'
        }];

        const lineStyle = 'fill:none;stroke:#000;stroke-width:1px';
        const bracket = {
            square: {
                left:  ['path', {d: 'M  2 0 h -4 v ' + (lanesLen * lane.yo - 1) + ' h  4', style: lineStyle}],
                right: ['path', {d: 'M -2 0 h  4 v ' + (lanesLen * lane.yo - 1) + ' h -4', style: lineStyle}]
            },
            round: {
                left:      ['path', {d: 'M  2 0 a 4 4 0 0 0 -4 4 v ' + (lanesLen * lane.yo - 9) + ' a 4 4 0 0 0  4 4', style: lineStyle}],
                right:     ['path', {d: 'M -2 0 a 4 4 1 0 1  4 4 v ' + (lanesLen * lane.yo - 9) + ' a 4 4 1 0 1 -4 4', style: lineStyle}],
                rightLeft: ['path', {
                    d:  'M -5 0 a 4 4 1 0 1  4 4 v ' + (lanesLen * lane.yo - 9) + ' a 4 4 1 0 1 -4 4' +
                        'M  5 0 a 4 4 0 0 0 -4 4 v ' + (lanesLen * lane.yo - 9) + ' a 4 4 0 0 0  4 4',
                    style: lineStyle
                }],
                leftLeft: ['path', {
                    d:  'M  2 0 a 4 4 0 0 0 -4 4 v ' + (lanesLen * lane.yo - 9) + ' a 4 4 0 0 0  4 4' +
                        'M  5 1 a 3 3 0 0 0 -3 3 v ' + (lanesLen * lane.yo - 9) + ' a 3 3 0 0 0  3 3',
                    style: lineStyle
                }],
                rightRight: ['path', {
                    d:  'M -5 1 a 3 3 1 0 1  3 3 v ' + (lanesLen * lane.yo - 9) + ' a 3 3 1 0 1 -3 3' +
                        'M -2 0 a 4 4 1 0 1  4 4 v ' + (lanesLen * lane.yo - 9) + ' a 4 4 1 0 1 -4 4',
                    style: lineStyle
                }]
            }
        };

        const backDrop = (w) => ['rect', {
            x: -w / 2,
            width: w,
            height: lanesLen * lane.yo,
            style: 'fill:#ffffffcc;stroke:none'
        }];

        if (source && typeof source.gaps === 'string') {
            const scale = lane.hscale * lane.xs * 2;

            const gaps = source.gaps.trim().split(/\s+/);

            for (let x = 0; x < gaps.length; x++) {
                const c = gaps[x];
                if (c.match(/^[.]$/)) {
                    continue;
                }
                const offset = (c === c.toLowerCase()) ? 0.5 : 0;

                let marks = [];
                switch(c) {
                case '0': marks = [backDrop(4)]; break;
                case '1': marks = [backDrop(4), vline(0)]; break;
                case '|': marks = [backDrop(4), vline(0)]; break;
                case '2': marks = [backDrop(4), vline(-2), vline(2)]; break;
                case '3': marks = [backDrop(6), vline(-3), vline(0), vline(3)]; break;
                case '[': marks = [backDrop(4), bracket.square.left]; break;
                case ']': marks = [backDrop(4), bracket.square.right]; break;
                case '(': marks = [backDrop(4), bracket.round.left]; break;
                case ')': marks = [backDrop(4), bracket.round.right]; break;
                case ')(': marks = [backDrop(8), bracket.round.rightLeft]; break;
                case '((': marks = [backDrop(8), bracket.round.leftLeft]; break;
                case '))': marks = [backDrop(8), bracket.round.rightRight]; break;
                case 's':
                    for (let idx = 0; idx < lanesLen; idx++) {
                        if (lanes[idx] && lanes[idx].wave && lanes[idx].wave.length > x) {
                            marks.push(['use', tt(2, 5 + lane.yo * idx, {'xlink:href': '#gap'})]);
                        }
                    }
                    break;
                }


                res.push(['g', tt(scale * (x + offset))].concat(marks));
            }
        }
        for (let idx = 0; idx < lanesLen; idx++) {
            const val = lanes[idx];
            lane.period = val.period ? val.period : 1;
            lane.phase  = (val.phase  ? val.phase * 2 : 0) + lane.xmin_cfg;

            if (typeof val.wave === 'string') {
                const gaps = renderGapUses(val.wave, lane);
                res = res.concat([['g', tt(
                    0,
                    lane.y0 + idx * lane.yo,
                    {id: 'wavegap_' + idx + '_' + index}
                )].concat(gaps)]);
            }
        }
    }
    return ['g', {id: 'wavegaps_' + index}].concat(res);
} /* eslint complexity: [1, 100] */

module.exports = renderGaps;

},{"onml/tt.js":43}],21:[function(require,module,exports){
'use strict';

const tspan = require('tspan');
const tt = require('onml/tt.js');

function renderGroups (groups, index, lane) {
    const res = ['g'];

    groups.map((e, i) => {
        res.push(['path',
            {
                id: 'group_' + i + '_' + index,
                d: ('m ' + (e.x + 0.5) + ',' + (e.y * lane.yo + 3.5 + lane.yh0 + lane.yh1)
                    + ' c -3,0 -5,2 -5,5 l 0,' + (e.height * lane.yo - 16)
                    + ' c 0,3 2,5 5,5'),
                style: 'stroke:#0041c4;stroke-width:1;fill:none'
            }
        ]);

        if (e.name === undefined) {
            return;
        }

        const x = e.x - 10;
        const y = lane.yo * (e.y + (e.height / 2)) + lane.yh0 + lane.yh1;
        const ts = tspan.parse(e.name);
        res.push(['g', tt(x, y),
            ['g', {transform: 'rotate(270)'},
                ['text', {
                    'text-anchor': 'middle',
                    class: 'info',
                    'xml:space': 'preserve'
                }].concat(ts)
            ]
        ]);
    });
    return res;
}

module.exports = renderGroups;

},{"onml/tt.js":43,"tspan":44}],22:[function(require,module,exports){
'use strict';

const tspan = require('tspan');
const tt = require('onml/tt.js');
const textWidth = require('./text-width.js');

function renderLabel (p, text, fontSize) {
    fontSize = fontSize || 11;
    const w = textWidth(text, fontSize) + 2;
    return ['g',
        tt(p.x, p.y),
        ['rect', {
            x: -(w >> 1),
            y: -(fontSize >> 1),
            width: w,
            height: fontSize,
            style: 'fill:#FFF;'
        }],
        ['text', {
            'text-anchor': 'middle',
            y: Math.round(0.3 * fontSize),
            style: 'font-size:' + fontSize + 'px;'
        }].concat(tspan.parse(text))
    ];
}

module.exports = renderLabel;

},{"./text-width.js":32,"onml/tt.js":43,"tspan":44}],23:[function(require,module,exports){
'use strict';

const renderMarks = require('./render-marks.js');
const renderArcs = require('./render-arcs.js');
const renderGaps = require('./render-gaps.js');
const renderPieceWise = require('./render-piece-wise.js');

function renderLanes (index, content, waveLanes, ret, source, lane) {
    return [
        renderMarks(content, index, lane, source)
    ].concat(
        waveLanes.res,
        [
            renderArcs(ret.lanes, index, source, lane),
            renderGaps(ret.lanes, index, source, lane),
            renderPieceWise(ret.lanes, index, lane)
        ]
    );
}

module.exports = renderLanes;

},{"./render-arcs.js":19,"./render-gaps.js":20,"./render-marks.js":24,"./render-piece-wise.js":26}],24:[function(require,module,exports){
'use strict';

const tspan = require('tspan');

function captext (cxt, anchor, y) {
    if (cxt[anchor] && cxt[anchor].text) {
        return [
            ['text', {
                x: cxt.xmax * cxt.xs / 2,
                y: y,
                fill: '#000',
                'text-anchor': 'middle',
                'xml:space': 'preserve'
            }].concat(tspan.parse(cxt[anchor].text))
        ];
    }
    return [];
}

function ticktock (cxt, ref1, ref2, x, dx, y, len) {
    let offset;
    let L = [];

    if (cxt[ref1] === undefined || cxt[ref1][ref2] === undefined) {
        return [];
    }

    let val = cxt[ref1][ref2];

    if (typeof val === 'string') {
        val = val.trim().split(/\s+/);
    } else if (typeof val === 'number' || typeof val === 'boolean') {
        offset = Number(val);
        val = [];
        for (let i = 0; i < len; i += 1) {
            val.push(i + offset);
        }
    }
    if (Array.isArray(val)) {
        if (val.length === 0) {
            return [];
        } else if (val.length === 1) {
            offset = Number(val[0]);
            if (isNaN(offset)) {
                L = val;
            } else {
                for (let i = 0; i < len; i += 1) {
                    L[i] = i + offset;
                }
            }
        } else if (val.length === 2) {
            offset = Number(val[0]);
            const step = Number(val[1]);
            const tmp = val[1].split('.');
            let dp = 0;
            if (tmp.length === 2) {
                dp = tmp[1].length;
            }
            if (isNaN(offset) || isNaN(step)) {
                L = val;
            } else {
                offset = step * offset;
                for (let i = 0; i < len; i += 1) {
                    L[i] = (step * i + offset).toFixed(dp);
                }
            }
        } else {
            L = val;
        }
    } else {
        return [];
    }

    const res = ['g', {
        class: 'muted',
        'text-anchor': 'middle',
        'xml:space': 'preserve'
    }];

    for (let i = 0; i < len; i += 1) {
        if (cxt[ref1] && cxt[ref1].every && (i + offset) % cxt[ref1].every != 0) {
            continue;
        }
        res.push(['text', {x: i * dx + x, y: y}].concat(tspan.parse(L[i])));
    }
    return [res];
} /* eslint complexity: [1, 30] */

function renderMarks (content, index, lane, source) {
    const mstep  = 2 * (lane.hscale);
    const mmstep = mstep * lane.xs;
    const marks  = lane.xmax / mstep;
    const gy     = content.length * lane.yo;

    const res = ['g', {id: ('gmarks_' + index)}];
    const gmarkLines = ['g', {style: 'stroke:#888;stroke-width:0.5;stroke-dasharray:1,3'}];
    if (!(source && source.config && source.config.marks === false)) {
        for (let i = 0; i < (marks + 1); i += 1) {
            gmarkLines.push(['line', {
                id: 'gmark_' + i + '_' + index,
                x1: i * mmstep, y1: 0,
                x2: i * mmstep, y2: gy
            }]);
        }
        res.push(gmarkLines);
    }
    return res.concat(
        captext(lane, 'head', (lane.yh0 ? -33 : -13)),
        captext(lane, 'foot', gy + (lane.yf0 ? 45 : 25)),
        ticktock(lane, 'head', 'tick',          0, mmstep,      -5, marks + 1),
        ticktock(lane, 'head', 'tock', mmstep / 2, mmstep,      -5, marks),
        ticktock(lane, 'foot', 'tick',          0, mmstep, gy + 15, marks + 1),
        ticktock(lane, 'foot', 'tock', mmstep / 2, mmstep, gy + 15, marks)
    );
}

module.exports = renderMarks;

},{"tspan":44}],25:[function(require,module,exports){
'use strict';

const tt = require('onml/tt.js');

const colors = {
    1: '#000000',
    2: '#e90000',
    3: '#3edd00',
    4: '#0074cd',
    5: '#ff15db',
    6: '#af9800',
    7: '#00864f',
    8: '#a076ff'
};

function renderOverUnder (el, key, lane) {
    const xs = lane.xs;
    const ys = lane.ys;
    const period = (el.period || 1) * 2 * xs;
    const xoffset = -(el.phase || 0) * 2 * xs;
    const gap1 = 12;
    const serif = 7;
    let color;
    const y = (key === 'under') ? ys : 0;
    let start;

    function line (x) {
        return (start === undefined) ? [] : [['line', {
            style: 'stroke:' + color,
            x1: period * start + gap1,
            x2: period * x
        }]];
    }

    if (el[key]) {
        let res = ['g', tt(
            xoffset,
            y,
            {style: 'stroke-width:3'}
        )];
        const arr = el[key].split('');
        arr.map(function (dot, i) {
            if ((dot !== '.') && (start !== undefined)) {
                res = res.concat(line(i));
                if (key === 'over') {
                    res.push(['path', {
                        style: 'stroke:none;fill:' + color,
                        d: 'm' + (period * i - serif) + ' 0 l' + serif + ' ' + serif + ' v-' + serif + ' z'
                    }]);
                }
            }
            if (dot === '0') {
                start = undefined;
            } else if (dot !== '.') {
                start = i;
                color = colors[dot] || colors[1];
            }
        });
        if (start !== undefined) {
            res = res.concat(line(arr.length));
        }
        return [res];
    }
    return [];
}

module.exports = renderOverUnder;

},{"onml/tt.js":43}],26:[function(require,module,exports){
'use strict';

const tt = require('onml/tt.js');

const scaled = (d, sx, sy) => {
    if (sy === undefined) {
        sy = sx;
    }
    let i = 0;
    while (i < d.length) {
        switch (d[i].toLowerCase()) {
        case 'h':
            while ((i < d.length) && !isNaN(d[i + 1])) {
                d[i + 1] *= sx; i++;
            }
            break;
        case 'v':
            while ((i < d.length) && !isNaN(d[i + 1])) {
                d[i + 1] *= sy; i++;
            }
            break;
        case 'm':
        case 'l':
        case 't':
            while (((i + 1) < d.length) && !isNaN(d[i + 1])) {
                d[i + 1] *= sx; d[i + 2] *= sy; i += 2;
            }
            break;
        case 'q':
            while (((i + 3) < d.length) && !isNaN(d[i + 1])) {
                d[i + 1] *= sx; d[i + 2] *= sy; d[i + 3] *= sx; d[i + 4] *= sy; i += 4;
            }
            break;
        case 'a':
            while (((i + 6) < d.length) && !isNaN(d[i + 1])) {
                d[i + 1] *= sx; d[i + 2] *= sy; d[i + 6] *= sx; d[i + 7] *= sy; i += 7;
            }
            break;
        }
        i++;
    }
    return d;
};

function scale (d, cfg) {
    if (typeof d === 'string') {
        d = d.trim().split(/[\s,]+/);
    }

    if (!Array.isArray(d)) {
        return;
    }

    return scaled(d, 2 * cfg.xs, -cfg.ys);
}

function renderLane (wave, idx, cfg) {
    if (Array.isArray(wave)) {
        const tag = wave[0];
        const attr = wave[1];
        if (tag === 'pw' && (typeof attr === 'object')) {
            const d = scale(attr.d, cfg);
            return ['g',
                tt(0, cfg.yo * idx + cfg.ys + cfg.y0),
                ['path', {style: 'fill:none;stroke:#000;stroke-width:1px;', d: d}]
            ];
        }
    }
}

function renderPieceWise (lanes, index, cfg) {
    let res = ['g'];
    lanes.map((row, idx) => {
        const wave = row.wave;
        if (Array.isArray(wave)) {
            res.push(renderLane(wave, idx, cfg));
        }
    });
    return res;
}

module.exports = renderPieceWise;

},{"onml/tt.js":43}],27:[function(require,module,exports){
'use strict';

const render = require('bit-field/lib/render.js');

function renderReg (index, source) {
    return render(source.reg, source.config);
}

module.exports = renderReg;

},{"bit-field/lib/render.js":35}],28:[function(require,module,exports){
'use strict';

const rec = require('./rec.js');
const lane = require('./lane.js');
const parseConfig = require('./parse-config.js');
const parseWaveLanes = require('./parse-wave-lanes.js');
const renderGroups = require('./render-groups.js');
const renderLanes = require('./render-lanes.js');
const renderWaveLane = require('./render-wave-lane.js');

const insertSVGTemplate = require('./insert-svg-template.js');

function laneParamsFromSkin (index, source, lane, waveSkin) {

    if (index !== 0) {
        return;
    }

    const waveSkinNames = Object.keys(waveSkin);
    if (waveSkinNames.length === 0) {
        throw new Error('no skins found');
    }

    let skin = waveSkin.default || waveSkin[waveSkinNames[0]];

    if (source && source.config && source.config.skin && waveSkin[source.config.skin]) {
        skin = waveSkin[source.config.skin];
    }

    const socket = skin[3][1][2][1];

    lane.xs     = Number(socket.width);
    lane.ys     = Number(socket.height);
    lane.xlabel = Number(socket.x);
    lane.ym     = Number(socket.y);
}

function renderSignal (index, source, waveSkin, notFirstSignal) {

    laneParamsFromSkin (index, source, lane, waveSkin);

    parseConfig(source, lane);
    const ret = rec(source.signal, {x: 0, y: 0, xmax: 0, width: [], lanes: [], groups: []});
    const content = parseWaveLanes(ret.lanes, lane);

    const waveLanes = renderWaveLane(content, index, lane);
    const waveGroups = renderGroups(ret.groups, index, lane);

    const xmax = waveLanes.glengths.reduce((res, len, i) =>
        Math.max(res, len + ret.width[i]), 0);

    lane.xg = Math.ceil((xmax - lane.tgo) / lane.xs) * lane.xs;

    return insertSVGTemplate(
        index, source, lane, waveSkin, content,
        renderLanes(index, content, waveLanes, ret, source, lane),
        waveGroups,
        notFirstSignal
    );

}

module.exports = renderSignal;

},{"./insert-svg-template.js":11,"./lane.js":12,"./parse-config.js":13,"./parse-wave-lanes.js":15,"./rec.js":17,"./render-groups.js":21,"./render-lanes.js":23,"./render-wave-lane.js":31}],29:[function(require,module,exports){
'use strict';

const renderAny = require('./render-any.js');
const createElement = require('./create-element.js');

function renderWaveElement (index, source, outputElement, waveSkin, notFirstSignal) {

    // cleanup
    while (outputElement.childNodes.length) {
        outputElement.removeChild(outputElement.childNodes[0]);
    }

    outputElement.insertBefore(createElement(
        renderAny(index, source, waveSkin, notFirstSignal)
    ), null);
}

module.exports = renderWaveElement;

},{"./create-element.js":4,"./render-any.js":18}],30:[function(require,module,exports){
'use strict';

const renderWaveElement = require('./render-wave-element.js');

function renderWaveForm (index, source, output, notFirstSignal) {
    renderWaveElement(index, source, document.getElementById(output + index), window.WaveSkin, notFirstSignal);
}

module.exports = renderWaveForm;

/* eslint-env browser */

},{"./render-wave-element.js":29}],31:[function(require,module,exports){
'use strict';

const tt = require('onml/tt.js');
const tspan = require('tspan');
const textWidth = require('./text-width.js');
const findLaneMarkers = require('./find-lane-markers.js');
const renderOverUnder = require('./render-over-under.js');

function renderLaneUses (cont, lane) {
    const res = [];

    if (cont[1]) {
        cont[1].map(function (ref, i) {
            res.push(['use', tt(i * lane.xs, 0, {'xlink:href': '#' + ref})]);
        });
        if (cont[2] && cont[2].length) {
            const labels = findLaneMarkers(cont[1]);
            if (labels.length) {
                labels.map(function (label, i) {
                    if (cont[2] && (cont[2][i] !== undefined)) {
                        res.push(['text', {
                            x: label * lane.xs + lane.xlabel,
                            y: lane.ym,
                            'text-anchor': 'middle',
                            'xml:space': 'preserve'
                        }].concat(tspan.parse(cont[2][i])));
                    }
                });
            }
        }
    }
    return res;
}

function renderWaveLane (content, index, lane) {
    let xmax = 0;
    const glengths = [];
    const res = [];

    content.map(function (el, j) {
        const name = el[0][0];
        if (name) { // check name
            let xoffset = el[0][1];
            xoffset = (xoffset > 0)
                ? (Math.ceil(2 * xoffset) - 2 * xoffset)
                : (-2 * xoffset);

            res.push(['g', tt(
                0,
                lane.y0 + j * lane.yo,
                {id: 'wavelane_' + j + '_' + index}
            )]
                .concat([['text', {
                    x: lane.tgo,
                    y: lane.ym,
                    class: 'info',
                    'text-anchor': 'end',
                    'xml:space': 'preserve'
                }]
                    .concat(tspan.parse(name))
                ])
                .concat([['g', tt(
                    xoffset * lane.xs,
                    0,
                    {id: 'wavelane_draw_' + j + '_' + index}
                )]
                    .concat(renderLaneUses(el, lane))
                ])
                .concat(
                    renderOverUnder(el[3], 'over', lane),
                    renderOverUnder(el[3], 'under', lane)
                )
            );
            xmax = Math.max(xmax, (el[1] || []).length);
            glengths.push(name.textWidth ? name.textWidth : name.charCodeAt ? textWidth(name, 11) : 0);
        }
    });
    // xmax if no xmax_cfg,xmin_cfg, else set to config
    lane.xmax = Math.min(xmax, lane.xmax_cfg - lane.xmin_cfg);
    const xgmax = 0;
    lane.xg = xgmax + 20;
    return {glengths: glengths, res: res};
}

module.exports = renderWaveLane;

},{"./find-lane-markers.js":7,"./render-over-under.js":25,"./text-width.js":32,"onml/tt.js":43,"tspan":44}],32:[function(require,module,exports){
'use strict';

const charWidth = require('./char-width.json');

/**
    Calculates text string width in pixels.

    @param {String} str text string to be measured
    @param {Number} size font size used
    @return {Number} text string width
*/

module.exports = function (str, size) {
    size = size || 11; // default size 11pt
    let width = 0;
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        let w = charWidth.chars[c];
        if (w === undefined) {
            w = charWidth.other;
        }
        width += w;
    }
    return (width * size) / 100; // normalize
};

},{"./char-width.json":3}],33:[function(require,module,exports){
'use strict';

module.exports = {
    svg: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink',
    xmlns: 'http://www.w3.org/XML/1998/namespace'
};

},{}],34:[function(require,module,exports){
'use strict';

window.WaveDrom = window.WaveDrom || {};

const pkg = require('../package.json');
const processAll = require('./process-all.js');
const eva = require('./eva.js');
const renderWaveForm = require('./render-wave-form.js');
const editorRefresh = require('./editor-refresh.js');

window.WaveDrom.ProcessAll = processAll;
window.WaveDrom.RenderWaveForm = renderWaveForm;
window.WaveDrom.EditorRefresh = editorRefresh;
window.WaveDrom.eva = eva;
window.WaveDrom.version = pkg.version;

/* eslint-env browser */

},{"../package.json":47,"./editor-refresh.js":5,"./eva.js":6,"./process-all.js":16,"./render-wave-form.js":30}],35:[function(require,module,exports){
'use strict';

const tspan = require('tspan');

// ----- ✂ ------------------------------------------------------------

const round = Math.round;

const getSVG = (w, h) => ['svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  // TODO link ns?
  width: w,
  height: h,
  viewBox: [0, 0, w, h].join(' ')
}];

const tt = (x, y, obj) => Object.assign(
  {transform: 'translate(' + x + (y ? (',' + y) : '') + ')'},
  (typeof obj === 'object') ? obj : {}
);

const colors = { // TODO compare with WaveDrom
  2:  '#ff0000', // 'hsl(0,100%,50%)'
  3:  '#aaff00', // 'hsl(80,100%,50%)'
  4:  '#00ffd5', // 'hsl(170,100%,50%)'
  5:  '#ffbf00', // 'hsl(45,100%,50%)'
  6:  '#00ff19', // 'hsl(126,100%,50%)'
  7:  '#006aff'  // 'hsl(215,100%,50%)'
};

const typeStyle = t => (colors[t] !== undefined) ? ';fill:' + colors[t] : '';

const norm = (obj, other) => Object.assign(
  Object
    .keys(obj)
    .reduce((prev, key) => {
      const val = Number(obj[key]);
      const valInt = isNaN(val) ? 0 : Math.round(val);
      if (valInt !== 0) { prev[key] = valInt; }
      return prev;
    }, {}),
  other
);

const trimText = (text, availableSpace, charWidth) => {
  if (!(typeof text === 'string' || text instanceof String))
    return text;

  const textWidth = text.length * charWidth;
  if (textWidth <= availableSpace)
    return text;

  var end = text.length - ((textWidth - availableSpace) / charWidth) - 3;
  if (end > 0)
    return text.substring(0, round(end)) + '...';
  return text.substring(0, 1) + '...';
};

const text = (body, x, y, rotate) => {
  const props = {y: 6};
  if (rotate !== undefined) {
    props.transform = 'rotate(' + rotate + ')';
  }
  return ['g', tt(round(x), round(y)), ['text', props].concat(tspan.parse(body))];
};

const hline = (len, x, y) => ['line', norm({x1: x, x2: x + len, y1: y, y2: y})];
const vline = (len, x, y) => ['line', norm({x1: x, x2: x, y1: y, y2: y + len})];

const getLabel = (val, x, y, step, len, rotate) => {
  if (typeof val !== 'number') {
    return text(val, x, y, rotate);
  }
  const res = ['g', {}];
  for (let i = 0; i < len; i++) {
    res.push(text(
      (val >> i) & 1,
      x + step * (len / 2 - i - 0.5),
      y
    ));
  }
  return res;
};

const getAttr = (e, opt, step, lsbm, msbm) => {
  const x = opt.vflip
    ? step * ((msbm + lsbm) / 2)
    : step * (opt.mod - ((msbm + lsbm) / 2) - 1);

  if (!Array.isArray(e.attr)) {
    return getLabel(e.attr, x, 0, step, e.bits);
  }
  return e.attr.reduce((prev, a, i) =>
    (a === undefined || a === null)
      ? prev
      : prev.concat([getLabel(a, x, opt.fontsize * i, step, e.bits)]),
  ['g', {}]);
};

const labelArr = (desc, opt) => {
  const {margin, hspace, vspace, mod, index, fontsize, vflip, trim, compact, offset} = opt;
  const width = hspace - margin.left - margin.right - 1;
  const height = vspace - margin.top - margin.bottom;
  const step = width / mod;
  const blanks = ['g'];
  const bits = ['g', tt(round(step / 2), -round(0.5 * fontsize + 4))];
  const names = ['g', tt(round(step / 2), round(0.5 * height + 0.4 * fontsize - 6))];
  const attrs = ['g', tt(round(step / 2), round(height + 0.7 * fontsize - 2))];
  desc.map(e => {
    let lsbm = 0;
    let msbm = mod - 1;
    let lsb = index * mod;
    let msb = (index + 1) * mod - 1;
    if (((e.lsb / mod) >> 0) === index) {
      lsbm = e.lsbm;
      lsb = e.lsb;
      if (((e.msb / mod) >> 0) === index) {
        msb = e.msb;
        msbm = e.msbm;
      }
    } else {
      if (((e.msb / mod) >> 0) === index) {
        msb = e.msb;
        msbm = e.msbm;
      } else if (!(lsb > e.lsb && msb < e.msb)) {
        return;
      }
    }
    if (!compact) {
      bits.push(text(lsb + offset, step * (vflip ? lsbm : (mod - lsbm - 1))));
      if (lsbm !== msbm) {
        bits.push(text(msb + offset, step * (vflip ? msbm : (mod - msbm - 1))));
      }
    }
    if (e.name !== undefined) {
      names.push(getLabel(
        trim ? trimText(e.name, step * e.bits, trim) : e.name,
        step * (vflip
          ? ((msbm + lsbm) / 2)
          : (mod - ((msbm + lsbm) / 2) - 1)
        ),
        0,
        step,
        e.bits,
        e.rotate
      ));
    }

    if ((e.name === undefined) || (e.type !== undefined)) {
      if (!(opt.compact && e.type === undefined)) {
        blanks.push(['rect', Object.assign({}, norm({
          x: step * (vflip ? lsbm : (mod - msbm - 1)),
          width: step * (msbm - lsbm + 1),
          height: height
        }, {
          field: e.name,
          style: 'fill-opacity:0.1' + typeStyle(e.type)
        }),
        e.rect !== undefined ? e.rect : {}
        )]);
      }
    }
    if (e.attr !== undefined) {
      attrs.push(getAttr(e, opt, step, lsbm, msbm));
    }
  });
  return ['g', blanks, bits, names, attrs];
};

const getLabelMask = (desc, mod) => {
  const mask = [];
  let idx = 0;
  desc.map(e => {
    mask[idx % mod] = true;
    idx += e.bits;
    mask[(idx - 1) % mod] = true;
  });
  return mask;
};

const getLegendItems = (opt) => {
  const {hspace, margin, fontsize, legend} = opt;
  const width = hspace - margin.left - margin.right - 1;
  const items = ['g', tt(margin.left, -10)];
  const legendSquarePadding = 36;
  const legendNamePadding = 24;

  let x = width / 2 - Object.keys(legend).length / 2 * (legendSquarePadding + legendNamePadding);
  for(const key in legend) {
    const value = legend[key];

    items.push(['rect', norm({
      x: x,
      width: 12,
      height: 12
    }, {
      style: 'fill-opacity:0.15; stroke: #000; stroke-width: 1.2;' + typeStyle(value)
    })]);

    x += legendSquarePadding;
    items.push(text(
      key,
      x,
      0.1 * fontsize + 4
    ));
    x += legendNamePadding;
  }

  return items;
};

const compactLabels = (desc, opt) => {
  const {hspace, margin, mod, fontsize, vflip, legend, offset} = opt;
  const width = hspace - margin.left - margin.right - 1;
  const step = width / mod;
  const labels = ['g', tt(margin.left, legend ? 0 : -3)];

  const mask = getLabelMask(desc, mod);

  for (let i = 0; i < mod; i++) {
    const idx = vflip ? i : (mod - i - 1);
    if (mask[idx]) {
      labels.push(text(
        idx + offset,
        step * (i + .5),
        0.5 * fontsize + 4
      ));
    }
  }

  return labels;
};

const skipField = (desc, opt, globalIndex) => {
  if (!opt.compact) {
    return false;
  }

  const emptyField = (e) => e.name === undefined && e.type === undefined;
  if (desc.findIndex((e) => emptyField(e) && globalIndex > e.lsb && globalIndex <= e.msb + 1) !== -1) {
    return true;
  }

  return false;
};

const cage = (desc, opt) => {
  const {hspace, vspace, mod, margin, index, vflip} = opt;
  const width = hspace - margin.left - margin.right - 1;
  const height = vspace - margin.top - margin.bottom;
  const res = ['g',
    {
      stroke: 'black',
      'stroke-width': 1,
      'stroke-linecap': 'round'
    }
  ];
  if (opt.sparse) {
    const skipEdge = opt.uneven && (opt.bits % 2 === 1) && (index === (opt.lanes - 1));
    if (skipEdge) {
      if (vflip) {
        res.push(
          hline(width - (width / mod), 0, 0),
          hline(width - (width / mod), 0, height)
        );
      } else {
        res.push(
          hline(width - (width / mod), width / mod, 0),
          hline(width - (width / mod), width / mod, height)
        );
      }
    } else if (!opt.compact) {
      res.push(
        hline(width, 0, 0),
        hline(width, 0, height),
        vline(height, (vflip ? width : 0), 0)
      );
    }
  } else {
    res.push(
      hline(width, 0, 0),
      vline(height, (vflip ? width : 0), 0),
      hline(width, 0, height)
    );
  }

  let i = index * mod;
  const delta = vflip ? 1 : -1;
  let j = vflip ? 0 : mod;

  if (opt.sparse) {
    for (let k = 0; k <= mod; k++) {

      const xj = j * (width / mod);

      if ((!skipField(desc, opt, i) && k !== 0) || (!skipField(desc, opt, i + 1) && k !== mod)) {
        if ((k === 0) || (k === mod) || desc.some(e => (e.msb + 1 === i))) {
          res.push(vline(height, xj, 0));
        } else {
          res.push(vline((height >>> 3), xj, 0));
          res.push(vline(-(height >>> 3), xj, height));
        }
      }

      if (opt.compact && k !== 0 && !skipField(desc, opt, i)) {
        res.push(hline(width / mod, xj, 0));
        res.push(hline(width / mod, xj, height));
      }
      i++;
      j += delta;
    }
  } else {
    for (let k = 0; k < mod; k++) {
      const xj = j * (width / mod);
      if ((k === 0) || desc.some(e => (e.lsb === i))) {
        res.push(vline(height, xj, 0));
      } else {
        res.push(
          vline((height >>> 3), xj, 0),
          vline(-(height >>> 3), xj, height)
        );
      }
      i++;
      j += delta;
    }
  }
  return res;
} /* eslint complexity: [1, 30] */;

const lane = (desc, opt) => {
  const {index, vspace, hspace, margin, hflip, lanes, compact, label} = opt;
  const height = vspace - margin.top - margin.bottom;
  const width = hspace - margin.left - margin.right - 1;

  let tx = margin.left;
  const idx = hflip ? index : (lanes - index - 1);
  let ty = round(idx * vspace + margin.top);
  if (compact) {
    ty = round(idx * height + margin.top);
  }
  const res = ['g',
    tt(tx, ty),
    cage(desc, opt),
    labelArr(desc, opt)
  ];

  if (label && label.left !== undefined) {
    const lab = label.left;
    let txt = index;
    if (typeof lab === 'string') {
      txt = lab;
    } else if (typeof lab === 'number') {
      txt += lab;
    } else if (typeof lab === 'object') {
      txt = lab[index] || txt;
    }
    res.push(['g', {'text-anchor': 'end'},
      text(txt, -4, round(height / 2))
    ]);
  }

  if (label && label.right !== undefined) {
    const lab = label.right;
    let txt = index;
    if (typeof lab === 'string') {
      txt = lab;
    } else if (typeof lab === 'number') {
      txt += lab;
    } else if (typeof lab === 'object') {
      txt = lab[index] || txt;
    }
    res.push(['g', {'text-anchor': 'start'},
      text(txt, width + 4, round(height / 2))
    ]);
  }

  return res;
};

// Maximum number of attributes across all fields
const getMaxAttributes = desc =>
  desc.reduce((prev, field) =>
    Math.max(
      prev,
      (field.attr === undefined)
        ? 0
        : Array.isArray(field.attr)
          ? field.attr.length
          : 1
    ),
  0);

const getTotalBits = desc =>
  desc.reduce((prev, field) => prev + ((field.bits === undefined) ? 0 : field.bits), 0);

const isIntGTorDefault = opt => row => {
  const [key, min, def] = row;
  const val = Math.round(opt[key]);
  opt[key] = (typeof val === 'number' && val >= min) ? val : def;
};

const optDefaults = opt => {
  opt = (typeof opt === 'object') ? opt : {};

  [ // key         min default
    // ['vspace', 20, 60],
    ['hspace', 40, 800],
    ['lanes', 1, 1],
    ['bits', 1, undefined],
    ['fontsize', 6, 14]
  ].map(isIntGTorDefault(opt));

  opt.fontfamily = opt.fontfamily || 'sans-serif';
  opt.fontweight = opt.fontweight || 'normal';
  opt.compact = opt.compact || false;
  opt.hflip = opt.hflip || false;
  opt.uneven = opt.uneven || false;
  opt.margin = opt.margin || {};
  opt.offset = opt.offset || 0;

  return opt;
};

const render = (desc, opt) => {
  opt = optDefaults(opt);

  const maxAttributes = getMaxAttributes(desc);

  opt.vspace = opt.vspace || ((maxAttributes + 4) * opt.fontsize);

  if (opt.bits === undefined) {
    opt.bits = getTotalBits(desc);
  }

  const {hspace, vspace, lanes, margin, compact, fontsize, bits, label, legend} = opt;

  if (margin.right === undefined) {
    if (label && label.right !== undefined) {
      margin.right = round(.1 * hspace);
    } else {
      margin.right = 4;
    }
  }

  if (margin.left === undefined) {
    if (label && label.left !== undefined) {
      margin.left = round(.1 * hspace);
    } else {
      margin.left = 4; // margin.right;
    }
  }
  if (margin.top === undefined) {
    margin.top = 1.5 * fontsize;
    if (margin.bottom === undefined) {
      margin.bottom = fontsize * (maxAttributes) + 4;
    }
  } else {
    if (margin.bottom === undefined) {
      margin.bottom = 4;
    }
  }

  const width = hspace;
  let height = vspace * lanes;
  if (compact) {
    height -= (lanes - 1) * (margin.top + margin.bottom);
  }

  if (legend) {
    height += 12;
  }

  const res = ['g',
    tt(0.5, legend ? 12.5 : 0.5, {
      'text-anchor': 'middle',
      'font-size': opt.fontsize,
      'font-family': opt.fontfamily,
      'font-weight': opt.fontweight
    })
  ];

  let lsb = 0;
  const mod = Math.ceil(bits * 1.0 / lanes);
  opt.mod = mod | 0;

  desc.map(e => {
    e.lsb = lsb;
    e.lsbm = lsb % mod;
    lsb += e.bits;
    e.msb = lsb - 1;
    e.msbm = e.msb % mod;
  });

  for (let i = 0; i < lanes; i++) {
    opt.index = i;
    res.push(lane(desc, opt));
  }
  if (compact) {
    res.push(compactLabels(desc, opt));
  }

  if (legend) {
    res.push(getLegendItems(opt));
  }

  return getSVG(width, height).concat([res]);
};

// ----- ✂ ------------------------------------------------------------

module.exports = render;

},{"tspan":44}],36:[function(require,module,exports){
'use strict';

const tspan = require('tspan');

const circle = 'M 4,0 C 4,1.1 3.1,2 2,2 0.9,2 0,1.1 0,0 c 0,-1.1 0.9,-2 2,-2 1.1,0 2,0.9 2,2 z';
const buf1 = 'M -11,-6 -11,6 0,0 z m -5,6 5,0';
const and2 = 'm -16,-10 5,0 c 6,0 11,4 11,10 0,6 -5,10 -11,10 l -5,0 z';
const or2 = 'm -18,-10 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 2.5,-5 2.5,-15 0,-20 z';
const xor2 = 'm -21,-10 c 1,3 2,6 2,10 m 0,0 c 0,4 -1,7 -2,10 m 3,-20 4,0 c 6,0 12,5 14,10 -2,5 -8,10 -14,10 l -4,0 c 1,-3 2,-6 2,-10 0,-4 -1,-7 -2,-10 z';
const circle2 = 'c 0,4.418278 -3.581722,8 -8,8 -4.418278,0 -8,-3.581722 -8,-8 0,-4.418278 3.581722,-8 8,-8 4.418278,0 8,3.581722 8,8 z';

const gates = {
  '=': buf1, '~':  buf1 + circle,
  '&': and2, '~&': and2 + circle,
  '|': or2,  '~|': or2  + circle,
  '^': xor2, '~^': xor2 + circle,
  '+': 'm -8,5 0,-10 m -5,5 10,0 m 3,0' + circle2,
  '*': 'm -4,4 -8,-8 m 0,8 8,-8  m 4,4' + circle2,
  '-': 'm -3,0 -10,0 m 13,0' + circle2
};


const aliasGates = {
  add: '+', mul: '*', sub: '-',
  and: '&', or: '|', xor: '^',
  andr: '&', orr: '|', xorr: '^',
  input: '='
};

Object.keys(aliasGates).reduce((res, key) => {
  res[key] = gates[aliasGates[key]];
  return res;
}, gates);

const gater1 = {
  is:     type => (gates[type] !== undefined),
  render: type => ['path', {class:'gate', d: gates[type]}]
};

const iec = {
  eq: '==', ne: '!=',
  slt: '<', sle: '<=',
  sgt: '>', sge: '>=',
  ult: '<', ule: '<=',
  ugt: '>', uge: '>=',
  BUF: 1, INV: 1, AND: '&', NAND: '&',
  OR: '\u22651', NOR: '\u22651', XOR: '=1', XNOR: '=1',
  box: '', MUX: 'M'
};

const circled = {INV: 1, NAND: 1, NOR: 1, XNOR: 1};

const gater2 = {
  is:      type => (iec[type] !== undefined),
  render: (type, ymin, ymax) => {
    if (ymin === ymax) {
      ymin = -4; ymax = 4;
    }
    return ['g',
      ['path', {
        class: 'gate',
        d: 'm -16,' + (ymin - 3) + ' 16,0 0,' + (ymax - ymin + 6) + ' -16,0 z' + (circled[type] ? circle : '')
      }],
      ['text', {x:-14, y:4, class: 'wirename'}].concat(tspan.parse(iec[type]))
    ];
  }
};

function drawBody (type, ymin, ymax) {
  if (gater1.is(type)) { return gater1.render(type); }
  if (gater2.is(type)) { return gater2.render(type, ymin, ymax); }
  return ['text', {x:-14, y:4, class: 'wirename'}].concat(tspan.parse(type));
}

module.exports = drawBody;

},{"tspan":44}],37:[function(require,module,exports){
'use strict';

const tspan = require('tspan');

const drawGate = require('./draw_gate.js');

function drawBoxes (tree, xmax) {
  const ret = ['g'];
  const spec = [];
  if (Array.isArray(tree)) {
    spec.push(tree[0].name);
    spec.push([32 * (xmax - tree[0].x), 8 * tree[0].y]);

    for (let i = 1; i < tree.length; i++) {
      const branch = tree[i];
      if (Array.isArray(branch)) {
        spec.push([32 * (xmax - branch[0].x), 8 * branch[0].y]);
      } else {
        spec.push([32 * (xmax - branch.x), 8 * branch.y]);
      }
    }
    ret.push(drawGate(spec));
    for (let i = 1; i < tree.length; i++) {
      const branch = tree[i];
      ret.push(drawBoxes(branch, xmax));
    }
    return ret;
  }

  const fname = tree.name;
  const fx = 32 * (xmax - tree.x);
  const fy = 8 * tree.y;
  ret.push(
    ['g', {transform: 'translate(' + fx + ',' + fy + ')'},
      ['title'].concat(tspan.parse(fname)),
      ['path', {d:'M 2,0 a 2,2 0 1 1 -4,0 2,2 0 1 1 4,0 z'}],
      ['text', {x:-4, y:4, class:'pinname'}]
        .concat(tspan.parse(fname))
    ]
  );
  return ret;
}

module.exports = drawBoxes;

},{"./draw_gate.js":38,"tspan":44}],38:[function(require,module,exports){
'use strict';

const tspan = require('tspan');
const drawBody = require('./draw_body.js');

// ['type', [x,y], [x,y] ... ]
function drawGate (spec) { // ['type', [x,y], [x,y] ... ]

  const ilen = spec.length;
  const ys = [];

  for (let i = 2; i < ilen; i++) {
    ys.push(spec[i][1]);
  }

  const ret = ['g'];

  const ymin = Math.min.apply(null, ys);
  const ymax = Math.max.apply(null, ys);

  ret.push(['g',
    {transform: 'translate(16,0)'},
    ['path', {
      d: 'M' + spec[2][0] + ',' + ymin + ' ' + spec[2][0] + ',' + ymax,
      class: 'wire'
    }]
  ]);

  for (let i = 2; i < ilen; i++) {
    ret.push(['g',
      ['path', {
        d: 'm' + spec[i][0] + ',' + spec[i][1] + ' 16,0',
        class: 'wire'
      }]
    ]);
  }

  ret.push(['g',
    {transform: 'translate(' + spec[1][0] + ',' + spec[1][1] + ')'},
    ['title'].concat(tspan.parse(spec[0])),
    drawBody(spec[0], ymin - spec[1][1], ymax - spec[1][1])
  ]);

  return ret;
}

module.exports = drawGate;

},{"./draw_body.js":36,"tspan":44}],39:[function(require,module,exports){
'use strict';

function insertSVGTemplateAssign () {
  return ['style', '.pinname {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:end; font-family:Helvetica} .wirename {font-size:12px; font-style:normal; font-variant:normal; font-weight:500; font-stretch:normal; text-align:center; text-anchor:start; font-family:Helvetica} .wirename:hover {fill:blue} .gate {color:#000; fill:#ffc; fill-opacity: 1;stroke:#000; stroke-width:1; stroke-opacity:1} .gate:hover {fill:red !important; } .wire {fill:none; stroke:#000; stroke-width:1; stroke-opacity:1} .grid {fill:#fff; fill-opacity:1; stroke:none}'];
}

module.exports = insertSVGTemplateAssign;

},{}],40:[function(require,module,exports){
'use strict';

const render = require('./render.js');
const drawBoxes = require('./draw_boxes.js');
const insertSVGTemplateAssign = require('./insert-svg-template-assign.js');

function renderAssign (index, source) {
  // var tree,
  //     state,
  //     xmax,
  //     // grid = ['g'],
  //     // svgcontent,
  //     width,
  //     height,
  //     i,
  //     ilen;
  //     // j,
  //     // jlen;

  let state = {x: 0, y: 2, xmax: 0};
  const tree = source.assign;
  const ilen = tree.length;
  for (let i = 0; i < ilen; i++) {
    state = render(tree[i], state);
    state.x++;
  }
  const xmax = state.xmax + 3;

  const svg = ['g'];
  for (let i = 0; i < ilen; i++) {
    svg.push(drawBoxes(tree[i], xmax));
  }
  const width  = 32 * (xmax + 1) + 1;
  const height = 8 * (state.y + 1) - 7;

  // const ilen = 4 * (xmax + 1);
  // jlen = state.y + 1;
  // for (i = 0; i <= ilen; i++) {
  //     for (j = 0; j <= jlen; j++) {
  //         grid.push(['rect', {
  //             height: 1,
  //             width: 1,
  //             x: (i * 8 - 0.5),
  //             y: (j * 8 - 0.5),
  //             class: 'grid'
  //         }]);
  //     }
  // }

  return ['svg', {
    id: 'svgcontent_' + index,
    viewBox: '0 0 ' + width + ' ' + height,
    width: width,
    height: height
  },
  insertSVGTemplateAssign(),
  ['g', {transform:'translate(0.5, 0.5)'}, svg]
  ];
}

module.exports = renderAssign;

/* eslint-env browser */

},{"./draw_boxes.js":37,"./insert-svg-template-assign.js":39,"./render.js":41}],41:[function(require,module,exports){
'use strict';

function render(tree, state) {
  // var y, i, ilen;

  state.xmax = Math.max(state.xmax, state.x);

  const y = state.y;
  const ilen = tree.length;

  for (let i = 1; i < ilen; i++) {
    const branch = tree[i];
    if (Array.isArray(branch)) {
      state = render(branch, {
        x: (state.x + 1),
        y: state.y,
        xmax: state.xmax
      });
    } else {
      tree[i] = {
        name: branch,
        x: (state.x + 1),
        y: state.y
      };
      state.y += 2;
    }
  }

  tree[0] = {
    name: tree[0],
    x: state.x,
    y: Math.round((y + (state.y - 2)) / 2)
  };

  state.x--;
  return state;
}

module.exports = render;

},{}],42:[function(require,module,exports){
'use strict';

const isObject = o => o && Object.prototype.toString.call(o) === '[object Object]';

function indenter (indentation) {
  if (!(indentation > 0)) {
    return txt => txt;
  }
  var space = ' '.repeat(indentation);
  return txt => {

    if (typeof txt !== 'string') {
      return txt;
    }

    const arr = txt.split('\n');

    if (arr.length === 1) {
      return space + txt;
    }

    return arr
      .map(e => (e.trim() === '') ? e : space + e)
      .join('\n');
  };
}

const clean = txt => txt
  .split('\n')
  .filter(e => e.trim() !== '')
  .join('\n');

function stringify (a, indentation) {
  const cr = (indentation > 0) ? '\n' : '';
  const indent = indenter(indentation);

  function rec(a) {
    let body = '';
    let isFlat = true;

    let res;
    const isEmpty = a.some((e, i, arr) => {
      if (i === 0) {
        res = '<' + e;
        return (arr.length === 1);
      }

      if (i === 1) {
        if (isObject(e)) {
          Object.keys(e).map(key => {
            let val = e[key];
            if (Array.isArray(val)) {
              val = val.join(' ');
            }
            res += ' ' + key + '="' + val + '"';
          });
          if (arr.length === 2) {
            return true;
          }
          res += '>';
          return;
        }
        res += '>';
      }

      switch (typeof e) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
        body += e + cr;
        return;
      }

      isFlat = false;
      body += rec(e);
    });

    if (isEmpty) {
      return res + '/>' + cr; // short form
    }

    return isFlat
      ? res + clean(body) + '</' + a[0] + '>' + cr
      : res + cr + indent(body) + '</' + a[0] + '>' + cr;
  }

  return rec(a);
}

module.exports = stringify;

},{}],43:[function(require,module,exports){
'use strict';

module.exports = (x, y, obj) => {
  let objt = {};
  if (x || y) {
    const tt = [x || 0].concat(y ? [y] : []);
    objt = {transform: 'translate(' + tt.join(',') + ')'};
  }
  obj = (typeof obj === 'object') ? obj : {};
  return Object.assign(objt, obj);
};

},{}],44:[function(require,module,exports){
'use strict';

var parse = require('./parse'),
    reparse = require('./reparse');

exports.parse = parse;
exports.reparse = reparse;

},{"./parse":45,"./reparse":46}],45:[function(require,module,exports){
'use strict';

var escapeMap = {
    '&': '&amp;',
    '"': '&quot;',
    '<': '&lt;',
    '>': '&gt;'
};

function xscape (val) {
    if (typeof val !== 'string') {
        return val;
    }
    return val.replace(
        /([&"<>])/g,
        function (_, e) {
            return escapeMap[e];
        }
    );
}

var token = /<o>|<ins>|<s>|<sub>|<sup>|<b>|<i>|<tt>|<\/o>|<\/ins>|<\/s>|<\/sub>|<\/sup>|<\/b>|<\/i>|<\/tt>/;

function update (s, cmd) {
    if (cmd.add) {
        cmd.add.split(';').forEach(function (e) {
            var arr = e.split(' ');
            s[arr[0]][arr[1]] = true;
        });
    }
    if (cmd.del) {
        cmd.del.split(';').forEach(function (e) {
            var arr = e.split(' ');
            delete s[arr[0]][arr[1]];
        });
    }
}

var trans = {
    '<o>'    : { add: 'text-decoration overline' },
    '</o>'   : { del: 'text-decoration overline' },

    '<ins>'  : { add: 'text-decoration underline' },
    '</ins>' : { del: 'text-decoration underline' },

    '<s>'    : { add: 'text-decoration line-through' },
    '</s>'   : { del: 'text-decoration line-through' },

    '<b>'    : { add: 'font-weight bold' },
    '</b>'   : { del: 'font-weight bold' },

    '<i>'    : { add: 'font-style italic' },
    '</i>'   : { del: 'font-style italic' },

    '<sub>'  : { add: 'baseline-shift sub;font-size .7em' },
    '</sub>' : { del: 'baseline-shift sub;font-size .7em' },

    '<sup>'  : { add: 'baseline-shift super;font-size .7em' },
    '</sup>' : { del: 'baseline-shift super;font-size .7em' },

    '<tt>'   : { add: 'font-family monospace' },
    '</tt>'  : { del: 'font-family monospace' }
};

function dump (s) {
    return Object.keys(s).reduce(function (pre, cur) {
        var keys = Object.keys(s[cur]);
        if (keys.length > 0) {
            pre[cur] = keys.join(' ');
        }
        return pre;
    }, {});
}

function parse (str) {
    var state, res, i, m, a;

    if (str === undefined) {
        return [];
    }

    if (typeof str === 'number') {
        return [str + ''];
    }

    if (typeof str !== 'string') {
        return [str];
    }

    res = [];

    state = {
        'text-decoration': {},
        'font-weight': {},
        'font-style': {},
        'baseline-shift': {},
        'font-size': {},
        'font-family': {}
    };

    while (true) {
        i = str.search(token);

        if (i === -1) {
            res.push(['tspan', dump(state), xscape(str)]);
            return res;
        }

        if (i > 0) {
            a = str.slice(0, i);
            res.push(['tspan', dump(state), xscape(a)]);
        }

        m = str.match(token)[0];

        update(state, trans[m]);

        str = str.slice(i + m.length);

        if (str.length === 0) {
            return res;
        }
    }
}

module.exports = parse;
/* eslint no-constant-condition: 0 */

},{}],46:[function(require,module,exports){
'use strict';

var parse = require('./parse');

function deDash (str) {
    var m = str.match(/(\w+)-(\w)(\w+)/);
    if (m === null) {
        return str;
    }
    var newStr = m[1] + m[2].toUpperCase() + m[3];
    return newStr;
}

function reparse (React) {

    var $ = React.createElement;

    function reTspan (e, i) {
        var tag = e[0];
        var attr = e[1];

        var newAttr = Object.keys(attr).reduce(function (res, key) {
            var newKey = deDash(key);
            res[newKey] = attr[key];
            return res;
        }, {});

        var body = e[2];
        newAttr.key = i;
        return $(tag, newAttr, body);
    }

    return function (str) {
        return parse(str).map(reTspan);
    };
}

module.exports = reparse;

},{"./parse":45}],47:[function(require,module,exports){
module.exports={
  "name": "wavedrom",
  "version": "3.5.0",
  "description": "Digital timing diagram in your browser",
  "homepage": "http://wavedrom.com",
  "author": "alex.drom@gmail.com",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/wavedrom/wavedrom.git"
  },
  "bugs": {
    "url": "https://github.com/wavedrom/wavedrom/issues"
  },
  "main": "./lib",
  "unpkg": "wavedrom.unpkg.min.js",
  "files": [
    "bin/cli.js",
    "wavedrom.js",
    "wavedrom.min.js",
    "wavedrom.unpkg.js",
    "wavedrom.unpkg.min.js",
    "LICENSE",
    "lib/**",
    "skins/**"
  ],
  "scripts": {
    "test": "npm-run-all eslint nyc",
    "eslint": "eslint lib/*.js",
    "nyc": "nyc -r=lcov -r=text mocha test",
    "dist": "browserify ./lib/wave-drom.js > wavedrom.js",
    "watch.dist": "watchify ./lib/wave-drom.js -o wavedrom.js -v",
    "dist.min": "terser --compress --mengle -- wavedrom.js | node ./bin/header.js > wavedrom.min.js",
    "unpkg": "browserify --standalone wavedrom lib/index.js > wavedrom.unpkg.js",
    "unpkg.min": "terser --compress --mengle -- wavedrom.unpkg.js | node ./bin/header.js > wavedrom.unpkg.min.js",
    "cli": "{ echo '#!/usr/bin/env node' ; browserify --node bin/cli.js ; } > bin/wavedrom.js ; chmod +x bin/wavedrom.js",
    "prepare": "npm-run-all test dist dist.min unpkg unpkg.min",
    "clean": "rm -rf wavedrom.js wavedrom.*.js coverage .nyc_output",
    "skins": "for S in default narrow dark lowkey narrower narrowerer; do node bin/svg2js.js -i unpacked/skins/$S.svg > skins/$S.js ; done"
  },
  "keywords": [
    "waveform",
    "verilog",
    "RTL"
  ],
  "devDependencies": {
    "@drom/eslint-config": "^0.12.0",
    "browserify": "^17.0.0",
    "chai": "^4.4",
    "eslint": "^8.56",
    "fs-extra": "^11.2",
    "json5": "^2.2.3",
    "mocha": "^10.3",
    "npm-run-all": "^4.1.5",
    "nyc": "^15.1.0",
    "terser": "^5.27",
    "watchify": "^4.0.0",
    "yargs": "^17.7"
  },
  "dependencies": {
    "bit-field": "^1.9.0",
    "logidrom": "^0.3.1",
    "onml": "^2.1.0",
    "tspan": "^0.4.0"
  },
  "eslintConfig": {
    "extends": "@drom/eslint-config/eslint4/node4",
    "rules": {
      "camelcase": 0
    }
  }
}

},{}]},{},[34]);
