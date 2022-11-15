/*
jQWidgets v15.0.0 (2022-Nov)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

/* tslint:disable */
/* eslint-disable */
(function ($) {

    $.jqx.jqxWidget("jqxBarcode", "", {});

    $.extend($.jqx._jqxBarcode.prototype, {
        defineInstance: function () {
            var settings = {
                value: '12345',
                type: 'codabar',
                backgroundColor: 'white',
                lineWidth: 4,
                lineHeight: 50,
                lineColor: 'black',
                displayLabel: true,
                labelPosition: 'bottom',
                labelFontSize: 14,
                labelMarginTop: 5,
                labelMarginBottom: 5,
                labelColor: 'black',
                labelFont: 'monospace',
                renderAs: 'svg'
            }
            $.extend(true, this, settings);
            return settings;
        },


        createInstance: function (args) {
            var that = this;

            var barcode = new Barcode(this.element);
            barcode.value = that.value;
            barcode.type = that.type;
            barcode.backgroundColor = that.backgroundColor;
            barcode.lineWidth = that.lineWidth;
            barcode.lineHeight = that.lineHeight;
            barcode.lineColor = that.lineColor;
            barcode.displayLabel = that.displayLabel;
            barcode.labelPosition = that.labelPosition;
            barcode.labelFontSize = that.labelFontSize;
            barcode.labelMarginTop = that.labelMarginTop;
            barcode.labelMarginBottom = that.labelMarginBottom;
            barcode.labelColor = that.labelColor;
            barcode.labelFont = that.labelFont;
            barcode.renderAs = that.renderAs;

            this.element.innerHTML = barcode.template();
            this.barcode = barcode;
            barcode.refresh();
        },

        getDataURL: function (format) {
            return this.barcode.getDataURL(format);
        },

        export: function (format, fileName) {
            this.barcode.export(format, fileName);
        },

        isValid: function () {
            return this.barcode.isValid(false);
        },

        propertyChangedHandler: function (object, key, oldvalue, value) {
            var that = object;

            that.barcode.refresh();
        }
    });
})(jqxBaseFramework);


class Barcode {
    constructor(host) {
        this.host = host;
    }
    // Barcode's properties.
    static get properties() {
        return {
            value: {
                type: 'string',
                value: '',
            },
            type: {
                value: 'codabar',
                type: 'string',
                allowedValues: [
                    'pharmacode',
                    'codabar',
                    'code128a',
                    'code128b',
                    'code128c',
                    'msi',
                    'msi10',
                    'msi11',
                    'msi1010',
                    'msi1110',
                    'ean13',
                    'ean8',
                    'code39',
                    'code93',
                ],
            },
            backgroundColor: {
                value: 'white',
                type: 'string',
            },
            lineWidth: {
                value: 4,
                type: 'number',
            },
            lineHeight: {
                value: 50,
                type: 'number',
            },
            lineColor: {
                value: 'black',
                type: 'string',
            },
            displayLabel: {
                value: true,
                type: 'boolean',
            },
            labelPosition: {
                value: 'bottom',
                type: 'string',
                allowedValues: ['top', 'bottom'],
            },
            labelFontSize: {
                value: 14,
                type: 'number',
            },
            labelMarginTop: {
                value: 5,
                type: 'number',
            },
            labelMarginBottom: {
                value: 5,
                type: 'number',
            },
            labelColor: {
                value: 'black',
                type: 'string',
            },
            labelFont: {
                value: 'monospace',
                type: 'string',
            },
            renderAs: {
                value: 'svg',
                type: 'string',
                allowedValues: ['svg', 'canvas'],
            },
        };
    }

    /** Barcode's template. */
    template() {
        return '<div class="jqx-barcode-container"></div>';
    }

    /**
     * Refreshes the UI Component.
     */
    refresh() {
        const that = this;
        that._generateCode(that.renderAs);
    }

    /**
     * Generates barcode
     */
    _generateCode(renderAs, hidden = false) {
        const that = this;
        const encoded = this._getEncoded(that.type, that.value);
        const barcodeLength = encoded.length * that.lineWidth;
        const barcodeHeight =
            that.lineHeight +
            that.displayLabel *
            (that.labelMarginTop + that.labelMarginBottom + that.labelFontSize);
        let x = 0,
            y = 0,
            container;

        that.isValid();

        if (renderAs === 'svg') {
            container = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'svg'
            );
            container.setAttribute('width', barcodeLength);
            container.setAttribute('height', barcodeHeight);
            container.setAttributeNS(
                'http://www.w3.org/2000/xmlns/',
                'xmlns:svg',
                'http://www.w3.org/2000/svg'
            );
            container.style.backgroundColor = that.backgroundColor;
        }
        else if (renderAs === 'canvas') {
            container = document.createElement('canvas');
            container.setAttribute('width', barcodeLength);
            container.setAttribute('height', barcodeHeight);
            let ctx = container.getContext('2d');
            ctx.fillStyle = that.backgroundColor;
            ctx.fillRect(0, 0, barcodeLength, barcodeHeight);
        }
        if (hidden) {
            container.style.display = 'none';
        }

        container.classList.add('jqx-barcode');
        that.host.firstChild.appendChild(container);

        if (that.displayLabel && that.labelPosition === 'top') {
            y += that.labelMarginTop + that.labelFontSize;
            renderAs === 'svg'
                ? that._drawTextSVG(barcodeLength / 2, y, container)
                : that._drawTextCanvas(barcodeLength / 2, y, container);
            y += that.labelMarginBottom;
        }
        for (let line of encoded) {
            if (line === '1') {
                renderAs === 'svg'
                    ? that._drawStepSVG(that.lineColor, 1, x, y, container)
                    : that._drawStepCanvas(that.lineColor, 1, x, y, container);
            }
            else {
                renderAs === 'svg'
                    ? that._drawStepSVG('white', 0, x, y, container)
                    : that._drawStepCanvas('white', 0, x, y, container);
            }
            x += that.lineWidth;
        }
        if (that.displayLabel && that.labelPosition === 'bottom') {
            y += that.lineHeight + that.labelMarginTop + that.labelFontSize;
            renderAs === 'svg'
                ? that._drawTextSVG(barcodeLength / 2, y, container)
                : that._drawTextCanvas(barcodeLength / 2, y, container);
        }
        //Removes previous container
        if (that.host.firstChild.children.length === 2) {
            if (that.host.firstChild.children[1].style.display !== 'none') {
                that.host.firstChild.removeChild(that.host.firstChild.firstChild);
            }
        }
    }

    /**
     * Gets barcode encoded string
     */
    _getEncoded(type, value) {
        const that = this;
        let encoded;
        switch (type) {
            case 'pharmacode': {
                encoded = that._getEncodedPharmacode(value);
                break;
            }
            case 'codabar': {
                encoded = that._getEncodedCodabar(value);
                break;
            }
            case 'code128a': {
                encoded = that._getEncodedCode128(value, 'A');
                break;
            }
            case 'code128b': {
                encoded = that._getEncodedCode128(value, 'B');
                break;
            }
            case 'code128c': {
                encoded = that._getEncodedCode128(that.value, 'C');
                break;
            }
            case 'msi': {
                encoded = that._getEncodedMSI(that.value, '');
                break;
            }
            case 'msi10': {
                encoded = that._getEncodedMSI(that.value, '10');
                break;
            }
            case 'msi11': {
                encoded = that._getEncodedMSI(that.value, '11');
                break;
            }
            case 'msi1010': {
                encoded = that._getEncodedMSI(that.value, '1010');
                break;
            }
            case 'msi1110': {
                encoded = that._getEncodedMSI(that.value, '1010');
                break;
            }
            case 'ean13': {
                encoded = that._getEncodedEAN(that.value, '13');
                break;
            }
            case 'ean8': {
                encoded = that._getEncodedEAN(that.value, '8');
                break;
            }
            case 'code39': {
                encoded = that._getEncodedCode39(that.value);
                break;
            }
            case 'code93': {
                encoded = that._getEncodedCode93(that.value);
                break;
            }
        }
        return encoded;
    }

    /**
     * Validates the barcode value
     */
    isValid(isQRcode = false) {
        const that = this;
        const type = that.type;
        const val = that.value;

        let charactersRegex = /[^@!(一-龠)(ぁ-ゔ)(ァ-ヴー)\d0-9A-Z \$\%\*\+\-\.\/\:\=\?\^\{\|\}\~]/gm,
            patternValidity = true,
            lengthValidity = true,
            illegalChars = [];
        if (!isQRcode) {
            switch (type) {
                case 'pharmacode': {
                    charactersRegex = /[^\d]/gm;
                    lengthValidity = val.length >= 1 && val.length <= 6;
                    patternValidity = +val >= 3 && +val <= 131070;
                    break;
                }
                case 'codabar': {
                    charactersRegex = /[^ABCD\d\$-]/gm;
                    patternValidity = /^[A-D]\d+[A-D]$/gm.test(val);
                    break;
                }
                case 'code128a': {
                    charactersRegex = /[^\x20-\x5F]/gm;
                    break;
                }
                case 'code128b': {
                    charactersRegex = /[^\x20-\x7F]/gm;
                    break;
                }
                case 'code128c': {
                    charactersRegex = /[^\d]/gm;
                    break;
                }
                case 'msi':
                case 'msi10':
                case 'msi11':
                case 'msi1010':
                case 'msi1110': {
                    charactersRegex = /[^\d]/gm;
                    break;
                }
                case 'ean13': {
                    charactersRegex = /[^\d]/gm;
                    lengthValidity = val.length === 13 || val.length === 12;
                    break;
                }
                case 'ean8': {
                    charactersRegex = /[^\d]/gm;
                    lengthValidity = val.length === 7 || val.length === 8;
                    break;
                }
                case 'code39': {
                    charactersRegex = /[^\w\*.]/gm;
                    patternValidity = /^\*\*$/gm.test(val);
                    break;
                }
                case 'code93': {
                    charactersRegex = /[^\w\*.\-\* \$+\/%]/gm;
                    patternValidity = /^\*\*$/gm.test(val);
                    break;
                }
            }
        }

        illegalChars = val.match(charactersRegex);
        if (!patternValidity || illegalChars || !lengthValidity) {
            this.host.dispatchEvent(new CustomEvent("invalid", {
                detail: {
                    value: val,
                    invalidCharacters: illegalChars,
                    patternValidity: patternValidity,
                    lengthValidity: lengthValidity
                }
            }));
            return false;
        }
        return true;
    }

    /**
     * Draws the label text in SVG
     */
    _drawTextSVG(x, y, svg_container) {
        const that = this;

        let textElem = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'text'
        );
        textElem.setAttribute('x', x);
        textElem.setAttribute('y', y);
        textElem.setAttribute('text-anchor', 'middle');
        textElem.classList.add('jqx-barcode-label');
        textElem.style.fill = that.labelColor;
        textElem.style.fontFamily = that.labelFont;
        textElem.style.fontSize = that.labelFontSize + 'px';
        textElem.textContent = that.value;
        svg_container.appendChild(textElem);
    }

    /**
     * Draws the label text in Canvas
     */
    _drawTextCanvas(x, y, canvas) {
        const that = this;
        let ctx = canvas.getContext('2d');
        ctx.font = `${that.labelFontSize}px ${that.labelFont}`;
        ctx.fillStyle = that.labelColor;
        ctx.textAlign = 'center';
        ctx.fillText(that.value, x, y);
    }

    /**
     * Draws a single unit bar in svg
     */
    _drawStepSVG(color, opacity, x, y, svg_container) {
        const that = this;
        if (that.squareWidth) {
            that.lineWidth = that.squareWidth;
            that.lineHeight = that.squareWidth;
        }
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', that.lineWidth);
        rect.setAttribute('height', that.lineHeight);
        rect.setAttribute('fill-opacity', opacity);
        rect.style.fill = color;
        svg_container.appendChild(rect);
    }

    /**
     * Draws a single unit bar in canvas
     */
    _drawStepCanvas(color, opacity, x, y, canvas) {
        const that = this;
        if (that.squareWidth) {
            that.lineWidth = that.squareWidth;
            that.lineHeight = that.squareWidth;
        }
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.rect(x, y, that.lineWidth, that.lineHeight);
        ctx.fill();
    }

    /**
     * Encodes data in pharmacode format
     */
    _getEncodedPharmacode(val) {
        let encoded = '';

        while (val !== 0) {
            if (val % 2 === 0) {
                encoded = '11100' + encoded;
                val = (val - 2) / 2;
            }
            else {
                encoded = '100' + encoded;
                val = (val - 1) / 2;
            }
        }

        encoded = encoded.slice(0, -2);

        return encoded;
    }

    /**
     * Encodes data in codabar format
     */
    _getEncodedCodabar(val) {
        let encoded = '';
        const sets = {
            0: 1010100110,
            1: 1010110010,
            2: 1010010110,
            3: 1100101010,
            4: 1011010010,
            5: 1101010010,
            6: 1001010110,
            7: 1001011010,
            8: 1001101010,
            9: 1101001010,
            '-': 1010011010,
            $: 1011001010,
            ':': 11010110110,
            '/': 11011010110,
            '.': 11011011010,
            '+': 10110110110,
            A: 10110010010,
            B: 10010010110,
            C: 10100100110,
            D: 10100110010,
        };

        for (let char of val) {
            encoded += sets[char];
        }

        encoded = encoded.slice(0, -1);

        return encoded;
    }

    /**
     * Encodes data in code39 format
     */
    _getEncodedCode39(val) {
        let encoded = '';
        const chars = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            '-',
            '.',
            ' ',
            '$',
            '/',
            '+',
            '%',
            '*',
        ];
        const set = [
            20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645,
            29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301,
            30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385,
            29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477,
            17489, 17681, 20753, 35770,
        ];

        for (let char of val) {
            encoded += set[chars.indexOf(char)].toString(2) + '0';
        }

        encoded = encoded.slice(0, -1);

        return encoded;
    }

    /**
     * Encodes data in code93 format
     */
    _getEncodedCode93(val) {
        let encoded = '';
        const chars = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            '-',
            '.',
            ' ',
            '$',
            '/',
            '+',
            '%',
            '*',
        ];
        const set = [
            100010100, 101001000, 101000100, 101000010, 100101000, 100100100,
            100100010, 101010000, 100010010, 100001010, 110101000, 110100100,
            110100010, 110010100, 110010010, 110001010, 101101000, 101100100,
            101100010, 100110100, 100011010, 101011000, 101001100, 101000110,
            100101100, 100010110, 110110100, 110110010, 110101100, 110100110,
            110010110, 110011010, 101101100, 101100110, 100110110, 100111010,
            100101110, 111010100, 111010010, 111001010, 111010110, 100110010,
            111011010, 101011110,
        ];

        for (let char of val) {
            encoded += set[chars.indexOf(char)] + '0';
        }

        encoded = encoded.slice(0, -1);

        return encoded;
    }

    /**
     * Encodes data in MSI format
     */
    _getEncodedMSI(val, mod) {
        let encoded = '';
        const sets = {
            0: 100100100100,
            1: 100100100110,
            2: 100100110100,
            3: 100100110110,
            4: 100110100100,
            5: 100110100110,
            6: 100110110100,
            7: 100110110110,
            8: 110100100100,
            9: 110100100110,
        };

        encoded += '110';

        if (mod === '10') {
            val += this._getMSIMod10(val);
        }
        else if (mod === '11') {
            val += this._getMSIMod11(val);
        }
        else if (mod === '1010') {
            val += this._getMSIMod10(val);
            val += this._getMSIMod10(val);
        }
        else if (mod === '1110') {
            val += this._getMSIMod11(val);
            val += this._getMSIMod10(val);
        }

        for (let char of val) {
            encoded += sets[char];
        }

        encoded += '1001';

        return encoded;
    }

    /**
     * Encodes data in EAN format
     */
    _getEncodedEAN(val, type) {
        let encoded = '';
        const table = [
            [
                '0001101',
                '0011001',
                '0010011',
                '0111101',
                '0100011',
                '0110001',
                '0101111',
                '0111011',
                '0110111',
                '0001011',
            ],
            [
                '0100111',
                '0110011',
                '0011011',
                '0100001',
                '0011101',
                '0111001',
                '0000101',
                '0010001',
                '0001001',
                '0010111',
            ],
            [
                '1110010',
                '1100110',
                '1101100',
                '1000010',
                '1011100',
                '1001110',
                '1010000',
                '1000100',
                '1001000',
                '1110100',
            ],
        ];
        const ean13_set = [
            '000000',
            '001011',
            '001101',
            '001110',
            '010011',
            '011001',
            '011100',
            '010101',
            '010110',
            '011010',
        ];

        //Compute check digit and add it to the string if it doesn't exist
        if (val.length === 12 || val.length === 7) {
            let intSumEven = 0,
                intSumOdd = 0,
                intCheck,
                stopper;

            if (val.length === 7) {
                stopper = 5;
            }
            else {
                stopper = 12;
            }
            for (let i = 0; i < stopper; i += 2) {
                intSumEven += parseInt(val[i]);
                intSumOdd += parseInt(val[i + 1]);
            }
            intCheck = (intSumOdd * 3 + intSumEven) % 10;
            if (intCheck > 0) {
                intCheck = 10 - intCheck;
            }
            val += intCheck;
        }

        if (type === '13') {
            encoded += '101';
            let structure = ean13_set[val[0]];
            for (let i = 1; i < 7; i++) {
                encoded += table[structure[i - 1]][val[i]];
            }
            encoded += '01010';
            for (let i = 0; i < 6; i++) {
                encoded += table[2][val[i + 7]];
            }
            encoded += '101';
        }
        else if (type === '8') {
            encoded += '101';
            for (let i = 0; i < 4; i++) {
                encoded += table[0][val[i]];
            }
            encoded += '01010';
            for (let i = 0; i < 4; i++) {
                encoded += table[2][val[i + 4]];
            }
            encoded += '101';
        }
        return encoded;
    }

    /**
     * Gets the mod10 value of the MSI format
     */
    _getMSIMod10(val) {
        let sum = 0;
        for (var i = 0; i < val.length; i++) {
            var n = parseInt(val[i]);
            if ((i + val.length) % 2 === 0) {
                sum += n;
            }
            else {
                sum += ((n * 2) % 10) + Math.floor((n * 2) / 10);
            }
        }
        return (10 - (sum % 10)) % 10;
    }

    /**
     * Gets the mod11 value of the MSI format
     */
    _getMSIMod11(val) {
        let sum = 0;
        var weights = [2, 3, 4, 5, 6, 7];
        for (var i = 0; i < val.length; i++) {
            var n = parseInt(val[val.length - 1 - i]);
            sum += weights[i % weights.length] * n;
        }
        return (11 - (sum % 11)) % 11;
    }

    /**
     * Encodes data in code128 format
     */
    _getEncodedCode128(val, type) {
        let encoded = '',
            elements = [],
            checkSum = 0,
            start;
        const table = [
            [' ', ' ', '00', '11011001100'],
            ['!', '!', '01', '11001101100'],
            ['"', '"', '02', '11001100110'],
            ['#', '#', '03', '10010011000'],
            ['$', '$', '04', '10010001100'],
            ['%', '%', '05', '10001001100'],
            ['&', '&', '06', '10011001000'],
            ['\'', '\'', '07', '10011000100'],
            ['(', '(', '08', '10001100100'],
            [')', ')', '09', '11001001000'],
            ['*', '*', '10', '11001000100'],
            ['+', '+', '11', '11000100100'],
            [',', ',', '12', '10110011100'],
            ['-', '-', '13', '10011011100'],
            ['.', '.', '14', '10011001110'],
            ['/', '/', '15', '10111001100'],
            ['0', '0', '16', '10011101100'],
            ['1', '1', '17', '10011100110'],
            ['2', '2', '18', '11001110010'],
            ['3', '3', '19', '11001011100'],
            ['4', '4', '20', '11001001110'],
            ['5', '5', '21', '11011100100'],
            ['6', '6', '22', '11001110100'],
            ['7', '7', '23', '11101101110'],
            ['8', '8', '24', '11101001100'],
            ['9', '9', '25', '11100101100'],
            [':', ':', '26', '11100100110'],
            [';', ';', '27', '11101100100'],
            ['<', '<', '28', '11100110100'],
            ['=', '=', '29', '11100110010'],
            ['>', '>', '30', '11011011000'],
            ['?', '?', '31', '11011000110'],
            ['@', '@', '32', '11000110110'],
            ['A', 'A', '33', '10100011000'],
            ['B', 'B', '34', '10001011000'],
            ['C', 'C', '35', '10001000110'],
            ['D', 'D', '36', '10110001000'],
            ['E', 'E', '37', '10001101000'],
            ['F', 'F', '38', '10001100010'],
            ['G', 'G', '39', '11010001000'],
            ['H', 'H', '40', '11000101000'],
            ['I', 'I', '41', '11000100010'],
            ['J', 'J', '42', '10110111000'],
            ['K', 'K', '43', '10110001110'],
            ['L', 'L', '44', '10001101110'],
            ['M', 'M', '45', '10111011000'],
            ['N', 'N', '46', '10111000110'],
            ['O', 'O', '47', '10001110110'],
            ['P', 'P', '48', '11101110110'],
            ['Q', 'Q', '49', '11010001110'],
            ['R', 'R', '50', '11000101110'],
            ['S', 'S', '51', '11011101000'],
            ['T', 'T', '52', '11011100010'],
            ['U', 'U', '53', '11011101110'],
            ['V', 'V', '54', '11101011000'],
            ['W', 'W', '55', '11101000110'],
            ['X', 'X', '56', '11100010110'],
            ['Y', 'Y', '57', '11101101000'],
            ['Z', 'Z', '58', '11101100010'],
            ['[', '[', '59', '11100011010'],
            ['\\', '\\', '60', '11101111010'],
            [']', ']', '61', '11001000010'],
            ['^', '^', '62', '11110001010'],
            ['_', '_', '63', '10100110000'],
            ['NUL', '`', '64', '10100001100'],
            ['SOH', 'a', '65', '10010110000'],
            ['STX', 'b', '66', '10010000110'],
            ['ETX', 'c', '67', '10000101100'],
            ['EOT', 'd', '68', '10000100110'],
            ['ENQ', 'e', '69', '10110010000'],
            ['ACK', 'f', '70', '10110000100'],
            ['BEL', 'g', '71', '10011010000'],
            ['BS', 'h', '72', '10011000010'],
            ['HT', 'i', '73', '10000110100'],
            ['LF', 'j', '74', '10000110010'],
            ['VT', 'k', '75', '11000010010'],
            ['FF', 'l', '76', '11001010000'],
            ['CR', 'm', '77', '11110111010'],
            ['SO', 'n', '78', '11000010100'],
            ['SI', 'o', '79', '10001111010'],
            ['DLE', 'p', '80', '10100111100'],
            ['DC1', 'q', '81', '10010111100'],
            ['DC2', 'r', '82', '10010011110'],
            ['DC3', 's', '83', '10111100100'],
            ['DC4', 't', '84', '10011110100'],
            ['NAK', 'u', '85', '10011110010'],
            ['SYN', 'v', '86', '11110100100'],
            ['ETB', 'w', '87', '11110010100'],
            ['CAN', 'x', '88', '11110010010'],
            ['EM', 'y', '89', '11011011110'],
            ['SUB', 'z', '90', '11011110110'],
            ['ESC', '[', '91', '11110110110'],
            ['FS', '|', '92', '10101111000'],
            ['GS', ']', '93', '10100011110'],
            ['RS', '~', '94', '10001011110'],
            ['US', 'DEL', '95', '10111101000'],
            ['FNC3', 'FNC3', '96', '10111100010'],
            ['FNC2', 'FNC2', '97', '11110101000'],
            ['SHIFT', 'SHIFT', '98', '11110100010'],
            ['CODEC', 'CODEC', '99', '10111011110'],
            ['CODEB', 'FNC4', 'CODEB', '10111101110'],
            ['FNC4', 'CODEA', 'CODEA', '11101011110'],
            ['FNC1', 'FNC1', 'FNC1', '11110101110'],
            ['StartA', 'StartA', 'StartA', '11010000100'],
            ['StartB', 'StartB', 'StartB', '11010010000'],
            ['StartC', 'StartC', 'StartC', '11010011100'],
            ['Stop', 'Stop', 'Stop', '1100011101011'],
        ];
        if (type === 'A') {
            start = 103;
            for (const [i, char] of val.split('').entries()) {
                let element = table.find((x) => x[0] === char);
                if (element) {
                    elements.push(element);
                    checkSum += i * element.length;
                }
            }
        }
        else if (type === 'B') {
            start = 104;
            for (const [i, char] of val.split('').entries()) {
                let element = table.find((x) => x[1] === char);
                if (element) {
                    elements.push(element);
                    checkSum += i * element.length;
                }
            }
        }
        else if (type === 'C') {
            start = 105;
            for (let i = 0; i < val.length - 1; i += 2) {
                let substr = val.substring(i, 2);
                let element = table.find((x) => x[2] === substr);
                if (element) {
                    elements.push(element);
                    checkSum += substr * element.length;
                }
            }
        }

        checkSum += start;
        elements.push(table[checkSum % 103]);
        elements.unshift(table[start]);
        elements.push(table[106]);
        elements.forEach((el) => (encoded += el[3]));

        return encoded;
    }

    /**
     * Gets the Base64 String of the barcode
     *
     * @param {String} format Sets the dataURL format of the string. Allowed values are 'svg', 'png', 'jpg'
     */
    getDataURL(format) {
        const that = this;
        if (format === 'svg') {
            if (that.renderAs !== 'svg') {
                that._generateCode('svg', true);
            }
            let svg = that.host.querySelector('svg');
            let data = new XMLSerializer().serializeToString(svg);
            let svgBlob = new Blob([data], {
                type: 'image/svg+xml;charset=utf-8',
            });
            const url = URL.createObjectURL(svgBlob);
            return url;
        }
        else if (format === 'png' || format === 'jpg') {
            let file_format = format === 'png' ? 'png' : 'jpeg';
            if (that.renderAs !== 'canvas') {
                that._generateCode('canvas', true);
            }
            let canvas = that.host.querySelector('canvas');
            const url = canvas.toDataURL(`image/${file_format}`);
            return url;
        }
    }

    /**
     * Gets the Base64 String of the barcode asynchronously
     *
     * @param {String} format Sets the dataURL format of the string. Allowed values are 'svg', 'png', 'jpg'
     */
    getDataURLAsync(format) {
        const that = this;
        return new Promise((resolve, reject) => {
            let url = that.getDataURL(format);
            if (url) {
                resolve(url);
            }
            else {
                reject();
            }
        });
    }

    /**
     * Export the barcode to a file
     *
     * @param {String} format Sets the export format of the barcode. Allowed values are 'svg', 'png', 'jpg'
     * @param {String} fileName Sets the name of the exported file
     */
    export(format = 'png', fileName = 'barcode') {
        const that = this;
        that.getDataURLAsync(format).then((url) => {
            let a = document.createElement('a');

            a.setAttribute('download', `${fileName}.${format}`);
            a.setAttribute('href', url);
            a.setAttribute('target', '_blank');

            a.click();
        });
    }

    /**
     * Called when a property is changed.
     */
    propertyChangedHandler(propertyName, oldValue, newValue) {
        const that = this;

        that.refresh();
    }

    ready() {
        const that = this;
        this._generateCode(that.renderAs);
    }
}




