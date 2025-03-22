const coverColor = () => {
    const page_color = PAGE_CONFIG.color
    if (page_color){
        setThemeColors(page_color);
        return;
    }
    const path = document.getElementById("post-cover")?.src;
    path ? handleApiColor(path) : setDefaultThemeColors();
}

function handleApiColor(path) {
    const cacheGroup = JSON.parse(localStorage.getItem('Solitude')) || {};
    cacheGroup.postcolor && cacheGroup.postcolor[path] ? setThemeColors(cacheGroup.postcolor[path].value) : img2color(path);
}

function img2color(src) {
    fetch(coverColorConfig.api + encodeURIComponent(src))
        .then(response => response.json())
        .then(data => {
            setThemeColors(data.RGB);
            cacheColor(src, data.RGB);
        })
        .catch(console.error);
}

function setThemeColors(value) {
    if (value) {
        const [r, g, b] = value.match(/\w\w/g).map(x => parseInt(x, 16));
        document.documentElement.style.setProperty('--efu-main', value);
        document.documentElement.style.setProperty('--efu-main-op', value + '23');
        document.documentElement.style.setProperty('--efu-main-op-deep', value + 'dd');
        document.documentElement.style.setProperty('--efu-main-none', value + '00');
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
    cacheGroup.postcolor[src] = {value: color, expiration: Date.now() + coverColorConfig.time};
    localStorage.setItem('Solitude', JSON.stringify(cacheGroup));
}

function adjustBrightness(r, g, b) {
    if (Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000) < 125) {
        [...document.getElementsByClassName('card-content')].forEach(item => item.style.setProperty('--efu-card-bg', 'var(--efu-white)'));
        [...document.getElementsByClassName('author-info__sayhi')].forEach(item => {
            item.style.setProperty('background', 'var(--efu-white-op)');
            item.style.setProperty('color', 'var(--efu-white)');
        });
    }
}