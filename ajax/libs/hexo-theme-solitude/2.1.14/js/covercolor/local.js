const coverColor = () => {
    const pageColor = PAGE_CONFIG.color || document.getElementById("post-cover")?.src;
    if (pageColor) {
        return localColor(pageColor);
    }
    setDefaultThemeColors();
}

const setDefaultThemeColors = () => {
    const themeVars = {
        '--efu-main': 'var(--efu-theme)',
        '--efu-main-op': 'var(--efu-theme-op)',
        '--efu-main-op-deep': 'var(--efu-theme-op-deep)',
        '--efu-main-none': 'var(--efu-theme-none)'
    };
    Object.entries(themeVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
    initThemeColor();
}

const localColor = path => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => setThemeColors(rgbToHex(colorThief.getColor(img)), ...colorThief.getColor(img));
    img.onerror = () => console.error('Image Error');
    img.src = path;
}

const rgbToHex = ([r, g, b]) => {
    return '#' + [r, g, b].map(x => {
        const component = Math.floor(x * 0.8);
        return component.toString(16).padStart(2, '0');
    }).join('');
}

const setThemeColors = (value, r = null, g = null, b = null) => {
    if (!value) return setDefaultThemeColors();

    const themeColors = {
        '--efu-main': value,
        '--efu-main-op': value + '23',
        '--efu-main-op-deep': value + 'dd',
        '--efu-main-none': value + '00'
    };
    Object.entries(themeColors).forEach(([key, color]) => {
        document.documentElement.style.setProperty(key, color);
    });

    if (r && g && b) {
        const brightness = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) / 1000);
        if (brightness < 125) {
            adjustCardStyles();
            value = LightenDarkenColor(value, 50);
            setThemeColors(value);
        }
    }

    document.getElementById("coverdiv").classList.add("loaded");
    initThemeColor();
}

function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }
}

const adjustCardStyles = () => {
    const cardContents = document.getElementsByClassName('card-content');
    Array.from(cardContents).forEach(item => {
        item.style.setProperty('--efu-card-bg', 'var(--efu-white)');
    });

    const authorInfo = document.getElementsByClassName('author-info__sayhi');
    Array.from(authorInfo).forEach(item => {
        item.style.setProperty('background', 'var(--efu-white-op)');
        item.style.setProperty('color', 'var(--efu-white)');
    });
}
