const coverColor = (music = false) => {
    if (music) {
        var coverPath = document.querySelector("#nav-music .aplayer-pic").style.backgroundImage;
        const coverPathMatch = /url\("([^"]+)"\)/.exec(coverPath);
        coverPath = coverPathMatch ? coverPathMatch[1] : '';
        if (coverPath) {
            handleApiColor(coverPath,music);
        }
    }
    else {
        const pageColor = PAGE_CONFIG.color;
        if (pageColor) {
            setThemeColors(pageColor);
            return;
        }
        
        const path = document.getElementById("post-cover")?.src;
        if (path) {
            handleApiColor(path);
        } else {
            setDefaultThemeColors();
        }
    }
}

function handleApiColor(path, music = false) {
    const cacheGroup = JSON.parse(localStorage.getItem('Solitude')) || {};
    if (cacheGroup.postcolor?.[path]) {
        setThemeColors(cacheGroup.postcolor[path].value);
    } else {
        img2color(path);
    }
    if (music) {
        img2color(path, music);
    }
}

function setMusicColor(value) {
    if (!value) return setDefaultThemeColors();
    const item = document.querySelector("#nav-music")
    item.style.setProperty('--efu-music', value);
}

function img2color(src, music = false) {
    fetch(`${coverColorConfig.api}${encodeURIComponent(src)}`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            if(music) {
                setMusicColor(data.RGB);
            }
            else {
                setThemeColors(data.RGB);
                cacheColor(src, data.RGB);
            }
        })
        .catch(error => console.error('Error fetching color:', error));
}

function setThemeColors(value) {
    if (value) {
        const [r, g, b] = value.match(/\w\w/g).map(x => parseInt(x, 16));
        document.documentElement.style.setProperty('--efu-main', value);
        document.documentElement.style.setProperty('--efu-main-op', `${value}23`);
        document.documentElement.style.setProperty('--efu-main-op-deep', `${value}dd`);
        document.documentElement.style.setProperty('--efu-main-none', `${value}00`);
        adjustBrightness(r, g, b);
        document.getElementById("coverdiv").classList.add("loaded");
        initThemeColor();
    } else {
        setDefaultThemeColors();
    }
}

function setDefaultThemeColors() {
    document.documentElement.style.setProperty('--efu-main', 'var(--efu-theme)');
    document.documentElement.style.setProperty('--efu-main-op', 'var(--efu-theme-op)');
    document.documentElement.style.setProperty('--efu-main-op-deep', 'var(--efu-theme-op-deep)');
    document.documentElement.style.setProperty('--efu-main-none', 'var(--efu-theme-none)');
    initThemeColor();
}

function cacheColor(src, color) {
    const cacheGroup = JSON.parse(localStorage.getItem('Solitude')) || {};
    cacheGroup.postcolor = cacheGroup.postcolor || {};
    cacheGroup.postcolor[src] = { value: color, expiration: Date.now() + coverColorConfig.time };
    localStorage.setItem('Solitude', JSON.stringify(cacheGroup));
}

function adjustBrightness(r, g, b) {
    const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
    if (brightness < 125) {
        [...document.getElementsByClassName('card-content')].forEach(item => {
            item.style.setProperty('--efu-card-bg', 'var(--efu-white)');
        });
        [...document.getElementsByClassName('sayhi')].forEach(item => {
            item.style.setProperty('background', 'var(--efu-white-op)');
            item.style.setProperty('color', 'var(--efu-white)');
        });
    }
}