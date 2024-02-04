function coverColor() {
    var path = document.getElementById("post-cover")?.src;
    if (path !== undefined) {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = path;
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);
            var data = ctx.getImageData(0, 0, this.width, this.height).data;
            var colorCounts = {};
            var dominantColor = '';
            var maxCount = 0;
            var step = 5;
            for (var i = 0; i < data.length; i += 4 * step) {
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var color = `${r},${g},${b}`;

                colorCounts[color] = (colorCounts[color] || 0) + 1;

                if (colorCounts[color] > maxCount) {
                    maxCount = colorCounts[color];
                    dominantColor = color;
                }
            }
            var rgb = dominantColor.split(',').map(c => parseInt(c, 10));
            var value = "#" + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16);
            if (getContrastYIQ(value) == "light") {
                value = LightenDarkenColor(colorHex(value), -50)
            }

            document.documentElement.style.setProperty('--sco-main', value);
            document.documentElement.style.setProperty('--sco-main-op', value + '23');
            document.documentElement.style.setProperty('--sco-main-op-deep', value + 'dd');
            document.documentElement.style.setProperty('--sco-main-none', value + '00');
            initThemeColor()
            document.getElementById("coverdiv").classList.add("loaded");
        }
    } else {
        document.documentElement.style.setProperty('--sco-main', 'var(--sco-theme)');
        document.documentElement.style.setProperty('--sco-main-op', 'var(--sco-theme-op)');
        document.documentElement.style.setProperty('--sco-main-op-deep', 'var(--sco-theme-op-deep)');
        document.documentElement.style.setProperty('--sco-main-none', 'var(--sco-theme-none)');
        initThemeColor()
    }
}

function colorHex(colorString) {
    const hexRegex = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let color = colorString;

    if (/^(rgb|RGB)/.test(color)) {
        const colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        const hexArr = colorArr.map(c => {
            const hex = Number(c).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        });
        return "#" + hexArr.join("");
    } else if (hexRegex.test(color)) {
        const hexDigits = color.replace(/#/, "").split("");
        if (hexDigits.length === 6) {
            return color;
        } else if (hexDigits.length === 3) {
            const hexArr = hexDigits.map(c => c + c);
            return "#" + hexArr.join("");
        }
    }
    return color;
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
    if (!colors) {
        return "light";  // or "dark", depending on your preference
    }
    var red = colors[1];
    var green = colors[2];
    var blue = colors[3];
    var brightness;
    brightness = (red * 299) + (green * 587) + (blue * 114);
    brightness = brightness / 255000;
    if (brightness >= 0.5) {
        return "light";
    } else {
        return "dark";
    }
}


function initThemeColor() {
    const currentTop = window.scrollY || document.documentElement.scrollTop;
    let themeColor;
    if (currentTop > 0) {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sco-card-bg');
    } else if (PAGE_CONFIG.is_post) {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sco-main');
    } else {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sco-background');
    }
    changeThemeColor(themeColor);
}

function changeThemeColor(color) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', color);
    }
}