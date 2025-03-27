let selectTextNow = "";
let firstShowRightMenu = true;

const selectText = () => {
    selectTextNow = document.selection ? document.selection.createRange().text : window.getSelection().toString() || "";
};

document.onmouseup = document.ondbclick = selectText;

const rm = {
    mask: document.getElementById("rightmenu-mask"),
    menu: document.getElementById("rightMenu"),
    width: 0,
    height: 0,
    domhref: "",
    domsrc: "",
    globalEvent: null,
    menuItems: {
        other: document.getElementsByClassName("rightMenuOther"),
        plugin: document.getElementsByClassName("rightMenuPlugin"),
        back: document.getElementById("menu-backward"),
        forward: document.getElementById("menu-forward"),
        refresh: document.getElementById("menu-refresh"),
        top: document.getElementById("menu-top"),
        copy: document.getElementById("menu-copytext"),
        paste: document.getElementById("menu-pastetext"),
        comment: document.getElementById("menu-commenttext"),
        new: document.getElementById("menu-newwindow"),
        copyLink: document.getElementById("menu-copylink"),
        copyImg: document.getElementById("menu-copyimg"),
        downloadImg: document.getElementById("menu-downloadimg"),
        search: document.getElementById("menu-search"),
        barrage: document.getElementById("menu-commentBarrage"),
        mode: document.getElementById("menu-darkmode"),
        translate: document.getElementById("menu-translate"),
        music: [
            document.getElementById("menu-music-toggle"),
            document.getElementById("menu-music-back"),
            document.getElementById("menu-music-forward"),
            document.getElementById("menu-music-copyMusicName"),
        ],
    },
    showRightMenu(e, x = 0, y = 0) {
        this.menu.style.top = `${y}px`;
        this.menu.style.left = `${x}px`;
        this.menu.style.display = e ? "block" : "none";
        this.mask.style.display = e ? "flex" : "none";
        if (e) stopMaskScroll();
    },
    hideRightMenu() {
        this.showRightMenu(false);
    },
    reLoadSize() {
        this.menu.style.display = "block";
        this.width = this.menu.offsetWidth;
        this.height = this.menu.offsetHeight;
        this.menu.style.display = 'none';
    },
    copyText(e) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(e);
            utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success, false, 2000);
        }
        this.hideRightMenu();
    },
    async downloadImage(imageUrl = this.domsrc, filename = "photo") {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            utils.snackbarShow(GLOBAL_CONFIG.right_menu.img_error, false, 2000);
        }
    },
    copyImage(imgUrl = this.domsrc) {
        window.open(imgUrl);
    },
    mode(darkmode) {
        document.querySelector(".menu-darkmode-text").textContent = darkmode ? GLOBAL_CONFIG.right_menu.mode.light : GLOBAL_CONFIG.right_menu.mode.dark;
        this.hideRightMenu();
    },
    barrage(enable) {
        document.querySelector(".menu-commentBarrage-text").textContent = enable ? GLOBAL_CONFIG.right_menu.barrage.open : GLOBAL_CONFIG.right_menu.barrage.close;
        this.hideRightMenu();
    },
};

function stopMaskScroll() {
    const hideMenu = rm.hideRightMenu.bind(rm);
    utils.addEventListenerPjax(rm.menu, "mousewheel", hideMenu, { passive: true });
    utils.addEventListenerPjax(rm.mask, "mousewheel", hideMenu, { passive: true });
    utils.addEventListenerPjax(rm.mask, "click", hideMenu, { passive: true });
}

window.oncontextmenu = (ele) => {
    if (document.body.clientWidth <= 768) return;
    if (GLOBAL_CONFIG.right_menu.ctrlOriginalMenu) {
        if (firstShowRightMenu) {
            firstShowRightMenu = false;
            utils.snackbarShow(GLOBAL_CONFIG.right_menu.ctrlOriginalMenu, false, 2000);
        }
        if (ele.ctrlKey) return true;
    }

    let x = ele.clientX + 10;
    let y = ele.clientY;
    Array.from(rm.menuItems.other).forEach(item => item.style.display = "flex");
    rm.globalEvent = ele;

    const link = ele.target.href;
    const src = ele.target.currentSrc;
    const tagName = ele.target.tagName.toLowerCase();
    const cls = ele.target.className.toLowerCase();

    const display = !!(selectTextNow && window.getSelection()) || !!link || !!src || (tagName === "input" || tagName === "textarea") || cls.match(/aplayer/);

    rm.menuItems.copy.style.display = selectTextNow && window.getSelection() ? "flex" : "none";
    GLOBAL_CONFIG.comment && (rm.menuItems.comment.style.display = selectTextNow && window.getSelection() ? "flex" : "none");
    rm.menuItems.search.style.display = selectTextNow && window.getSelection() ? "flex" : "none";

    rm.menuItems.new.style.display = link ? "flex" : "none";
    rm.menuItems.copyLink.style.display = link ? "flex" : "none";
    rm.domhref = link || "";

    rm.menuItems.copyImg.style.display = src ? "flex" : "none";
    rm.menuItems.downloadImg.style.display = src ? "flex" : "none";
    rm.domsrc = src || "";

    rm.menuItems.paste.style.display = (tagName === "input" || tagName === "textarea") ? "flex" : "none";

    if (GLOBAL_CONFIG.right_menu.music) {
        if (cls.match(/aplayer/)) {
            rm.menuItems.music.forEach(item => item.style.display = "flex");
        } else {
            rm.menuItems.music.forEach(item => item.style.display = "none");
        }
    }

    Array.from(display ? rm.menuItems.other : rm.menuItems.plugin).forEach(item => item.style.display = "none");
    Array.from(display ? rm.menuItems.plugin : rm.menuItems.other).forEach(item => item.style.display = "block");

    rm.reLoadSize();
    x = (x + rm.width > window.innerWidth) ? x - (rm.width + 10) : x;
    y = (y + rm.height > window.innerHeight) ? y - (y + rm.height - window.innerHeight) : y;

    rm.showRightMenu(true, x, y);
    return false;
};

(function () {
    const addEventListener = (element, event, handler) => element.addEventListener(event, handler);

    addEventListener(rm.menuItems.back, "click", () => window.history.back() || rm.hideRightMenu());
    addEventListener(rm.menuItems.forward, "click", () => window.history.forward() || rm.hideRightMenu());
    addEventListener(rm.menuItems.refresh, "click", () => window.location.reload());
    addEventListener(rm.menuItems.top, "click", () => sco.toTop() || rm.hideRightMenu());

    if (GLOBAL_CONFIG.right_menu.music) {
        addEventListener(rm.menuItems.music[0], "click", () => {
            sco.musicToggle();
            rm.hideRightMenu();
        });
        addEventListener(rm.menuItems.music[1], "click", () => {
            document.querySelector("meting-js").aplayer.skipBack();
            rm.hideRightMenu();
        });
        addEventListener(rm.menuItems.music[2], "click", () => {
            document.querySelector("meting-js").aplayer.skipForward();
            rm.hideRightMenu();
        });
        addEventListener(rm.menuItems.music[3], "click", () => {
            const title = Array.from(document.querySelectorAll(".aplayer-title")).map(e => e.innerText)[0];
            rm.copyText(title);
        });
    }

    addEventListener(rm.menuItems.copy, "click", () => {
        if (GLOBAL_CONFIG.copyright && selectTextNow.length > GLOBAL_CONFIG.right_menu.limit) {
            selectTextNow += `\n\n${GLOBAL_CONFIG.right_menu.author}\n${GLOBAL_CONFIG.right_menu.link}${window.location.href}\n${GLOBAL_CONFIG.right_menu.source}\n${GLOBAL_CONFIG.right_menu.info}`;
        }
        rm.copyText(selectTextNow);
    });

    if (utils.saveToLocal.get("commentBarrageSwitch") !== null) {
        rm.menuItems.barrage && rm.barrage(!utils.saveToLocal.get("commentBarrageSwitch"));
    }

    addEventListener(rm.menuItems.paste, "click", () => rm.pasteText() && rm.hideRightMenu());
    GLOBAL_CONFIG.comment && addEventListener(rm.menuItems.comment, "click", () => rm.hideRightMenu() || sco.toTalk(selectTextNow));
    addEventListener(rm.menuItems.new, "click", () => window.open(rm.domhref) && rm.hideRightMenu());
    addEventListener(rm.menuItems.downloadImg, "click", () => rm.downloadImage() && rm.hideRightMenu());
    addEventListener(rm.menuItems.copyImg, "click", () => rm.copyImage() && rm.hideRightMenu());
    addEventListener(rm.menuItems.copyLink, "click", () => rm.copyText(rm.domhref) && rm.hideRightMenu());
})();