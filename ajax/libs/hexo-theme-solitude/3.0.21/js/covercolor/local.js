const coverColor = (music = false) => {
    if (music) {
        var coverPath = document.querySelector("#nav-music .aplayer-pic").style.backgroundImage;
        const coverPathMatch = /url\("([^"]+)"\)/.exec(coverPath);
        coverPath = coverPathMatch ? coverPathMatch[1] : '';
        if (coverPath) {
            localColor(coverPath,music);
        }
    }
    else {
        const pageColor = PAGE_CONFIG.color || document.getElementById("post-cover")?.src;
        if (pageColor) {
            localColor(pageColor);
        } else {
            setDefaultThemeColors();
        }
    }
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

const localColor = (path, music = false) => {
    const colorThief = new ColorThief();
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        const color = colorThief.getColor(img);
        if(music) {
            setMusicColor(rgbToHex(color));
        }
        else{
            setThemeColors(rgbToHex(color), ...color);
        }
    };
    img.onerror = () => console.error('Image Error');
    img.src = path;
}

const rgbToHex = ([r, g, b]) => {
    return '#' + [r, g, b].map(x => Math.floor(x * 0.8).toString(16).padStart(2, '0')).join('');
}

const setMusicColor = (value) => {
    if (!value) return setDefaultThemeColors();
    const item = document.querySelector("#nav-music")
    item.style.setProperty('--efu-music', value);
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

    if (r !== null && g !== null && b !== null) {
        const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
        if (brightness < 125) {
            adjustCardStyles();
            value = LightenDarkenColor(value, 50);
            setThemeColors(value);
        }
    }

    document.getElementById("coverdiv").classList.add("loaded");
    initThemeColor();
}

const LightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let g = ((num >> 8) & 0x00FF) + amt;
    let b = (num & 0x0000FF) + amt;

    r = Math.max(Math.min(r, 255), 0);
    g = Math.max(Math.min(g, 255), 0);
    b = Math.max(Math.min(b, 255), 0);

    return (usePound ? "#" : "") + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const adjustCardStyles = () => {
    const cardContents = document.querySelectorAll('.card-content');
    cardContents.forEach(item => {
        item.style.setProperty('--efu-card-bg', 'var(--efu-white)');
    });

    const authorInfo = document.querySelectorAll('.sayhi');
    authorInfo.forEach(item => {
        item.style.setProperty('background', 'var(--efu-white-op)');
        item.style.setProperty('color', 'var(--efu-white)');
    });
}
