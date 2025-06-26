const coverColor = () => {
    const pageColor = PAGE_CONFIG.color;
    if (pageColor) {
        setThemeColors(pageColor);
    } else {
        const path = document.getElementById("post-cover")?.src;
        path ? handleApiColor(path) : setDefaultThemeColors();
    }
}

const handleApiColor = (path) => {
    const cacheGroup = JSON.parse(localStorage.getItem('Solitude')) || { postcolor: {} };
    const color = cacheGroup.postcolor[path]?.value;
    if (color) {
        setThemeColors(color);
    } else {
        img2color(path);
    }
}

const img2color = (src) => {
    fetch(`${src}?imageAve`)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(({ RGB }) => {
            const formattedRGB = `#${RGB.slice(2)}`;
            setThemeColors(formattedRGB);
            cacheColor(src, formattedRGB);
        })
        .catch(error => console.error('Error fetching color:', error));
}

const setThemeColors = (value) => {
    if (!value) return setDefaultThemeColors();
    const [r, g, b] = value.match(/\w\w/g).map(x => parseInt(x, 16));
    const themeColors = {
        main: value,
        op: `${value}23`,
        opDeep: `${value}dd`,
        none: `${value}00`
    };
    Object.entries(themeColors).forEach(([key, color]) => {
        document.documentElement.style.setProperty(`--efu-${key}`, color);
    });
    adjustBrightness(r, g, b);
    document.getElementById("coverdiv").classList.add("loaded");
    initThemeColor();
}

const setDefaultThemeColors = () => {
    const vars = ['--efu-theme', '--efu-theme-op', '--efu-theme-op-deep', '--efu-theme-none'];
    vars.forEach((varName, i) => {
        document.documentElement.style.setProperty(['--efu-main', '--efu-main-op', '--efu-main-op-deep', '--efu-main-none'][i], `var(${varName})`);
    });
    initThemeColor();
}

const cacheColor = (src, color) => {
    const cacheGroup = JSON.parse(localStorage.getItem('Solitude')) || { postcolor: {} };
    cacheGroup.postcolor[src] = { value: color, expiration: Date.now() + coverColorConfig.time };
    localStorage.setItem('Solitude', JSON.stringify(cacheGroup));
}

const adjustBrightness = (r, g, b) => {
    const brightness = Math.round(((r * 299) + (g * 587) + (b * 114)) / 1000);
    if (brightness < 125) {
        document.querySelectorAll('.card-content').forEach(item => {
            item.style.setProperty('--efu-card-bg', 'var(--efu-white)');
        });
        document.querySelectorAll('.sayhi').forEach(item => {
            item.style.setProperty('background', 'var(--efu-white-op)');
            item.style.setProperty('color', 'var(--efu-white)');
        });
    }
}
