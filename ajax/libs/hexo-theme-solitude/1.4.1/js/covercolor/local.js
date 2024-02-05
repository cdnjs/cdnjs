function coverColor() {
    const path = document.getElementById("post-cover")?.src;

    if (path) {
        localColor(path);
    }
}

function localColor(path) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);
        const data = ctx.getImageData(0, 0, this.width, this.height).data;
        const {r, g, b} = calculateRGB(data);
        let value = rgbToHex(r, g, b);
        if (getContrastYIQ(value) === "light") {
            value = LightenDarkenColor(value, -50);
        }
        setThemeColors(value, r, g, b);
    };
    img.src = path;
}

function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function LightenDarkenColor(col, amt) {
    let usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    const num = parseInt(col, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amt));
    const b = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
    const g = Math.min(255, Math.max(0, (num & 0xff) + amt));

    return `${usePound ? "#" : ""}${(g | (b << 8) | (r << 16)).toString(16).padStart(6, "0")}`;
}

function getContrastYIQ(hexcolor) {
    var colorrgb = colorRgb(hexcolor);
    var colors = colorrgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    var red = colors[1];
    var green = colors[2];
    var blue = colors[3];
    var brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
    return brightness >= 0.5 ? "light" : "dark";
}

function colorRgb(str) {
    const HEX_SHORT_REGEX = /^#([0-9a-fA-f]{3})$/;
    const HEX_LONG_REGEX = /^#([0-9a-fA-f]{6})$/;
    const HEX_SHORT_LENGTH = 4;

    if (!str || typeof str !== 'string') {
        return str;
    }

    const sColor = str.toLowerCase();
    let hexValue = "";

    if (sColor && (HEX_SHORT_REGEX.test(sColor) || HEX_LONG_REGEX.test(sColor))) {
        hexValue = sColor.length === HEX_SHORT_LENGTH ?
            sColor.replace(/^#(.)/g, "#$1$1") :
            sColor;

        const rgbValue = hexValue.slice(1)
            .match(/.{2}/g)
            .map(val => parseInt(val, 16));

        return `rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]})`;
    } else {
        return sColor;
    }
}