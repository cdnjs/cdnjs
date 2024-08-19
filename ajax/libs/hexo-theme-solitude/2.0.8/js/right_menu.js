let selectTextNow = "";
const selectText = () => {
    selectTextNow = document.selection
        ? document.selection.createRange().text
        : window.getSelection() + "" || "";
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
        this.menu.style.top = y + "px";
        this.menu.style.left = x + "px";
        this.menu.style.display = e ? "block" : "none";
        e ? stopMaskScroll() : (this.mask.style.display = "none");
    },
    hideRightMenu() {
        rm.showRightMenu(false);
        rm.mask.style.display = "none";
    },
    reLoadSize() {
        rm.menu.style.display = "block";
        rm.width = rm.menu.offsetWidth;
        rm.height = rm.menu.offsetHeight;
        rm.menu.style.display = 'none';
    },
    copyText(e) {
        navigator.clipboard && navigator.clipboard.writeText(e);
        utils.snackbarShow(GLOBAL_CONFIG.lang.copy.success, false, 2000);
        this.hideRightMenu();
    },
    async downloadImage(imageUrl = this.domsrc, filename = "photo") {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename || "image.jpg";
            link.style.display = "none";
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
        darkmode
            ? (document.querySelector(".menu-darkmode-text").textContent =
                    GLOBAL_CONFIG.right_menu.mode.light)
            : (document.querySelector(".menu-darkmode-text").textContent =
                    GLOBAL_CONFIG.right_menu.mode.dark);
        this.hideRightMenu();
    },
    barrage(enable) {
        enable
            ? (document.querySelector(".menu-commentBarrage-text").textContent =
                    GLOBAL_CONFIG.right_menu.barrage.open)
            : (document.querySelector(".menu-commentBarrage-text").textContent =
                    GLOBAL_CONFIG.right_menu.barrage.close);
        this.hideRightMenu();
    },
};

function stopMaskScroll() {
    utils.addEventListenerPjax(rm.menu, "mousewheel", rm.hideRightMenu, { passive: true });
    utils.addEventListenerPjax(rm.mask, "mousewheel", rm.hideRightMenu, { passive: true });
    utils.addEventListenerPjax(rm.mask, "click", rm.hideRightMenu, { passive: true });
}

window.oncontextmenu = (ele) => {
    if (document.body.clientWidth <= 768) return;
    let x = ele.clientX + 10;
    let y = ele.clientY;
    Array.from(rm.menuItems.other).forEach((item) => (item.style.display = "block"));
    rm.globalEvent = ele;

    let display = false;
    let link = ele.target.href;
    let src = ele.target.currentSrc;

    if (selectTextNow && window.getSelection()) {
        display = true;
        rm.menuItems.copy.style.display = "block";
        GLOBAL_CONFIG.comment && (rm.menuItems.comment.style.display = "block");
        rm.menuItems.search && (rm.menuItems.search.style.display = "block");
    } else {
        rm.menuItems.copy.style.display = "none";
        GLOBAL_CONFIG.comment && (rm.menuItems.comment.style.display = "none");
        rm.menuItems.search && (rm.menuItems.search.style.display = "none");
    }

    if (link) {
        display = true;
        rm.menuItems.new.style.display = "block";
        rm.menuItems.copyLink.style.display = "block";
        rm.domhref = link;
    } else {
        rm.menuItems.new.style.display = "none";
        rm.menuItems.copyLink.style.display = "none";
    }

    if (src) {
        display = true;
        rm.menuItems.copyImg.style.display = "block";
        rm.menuItems.downloadImg.style.display = "block";
        rm.domsrc = src;
    } else {
        rm.menuItems.copyImg.style.display = "none";
        rm.menuItems.downloadImg.style.display = "none";
    }

    let tagName = ele.target.tagName.toLowerCase();
    if (tagName === "input" || tagName === "textarea") {
        display = true;
        rm.menuItems.paste.style.display = "block";
    } else {
        rm.menuItems.paste.style.display = "none";
    }

    if (tagName === "meting-js") {
        display = true;
        rm.menuItems.music.forEach((item) => (item.style.display = "block"));
    } else {
        rm.menuItems.music[0] &&
            rm.menuItems.music.forEach((item) => (item.style.display = "none"));
    }

    Array.from(display ? rm.menuItems.other : rm.menuItems.plugin).forEach(
        (item) => (item.style.display = "none")
    );
    Array.from(display ? rm.menuItems.plugin : rm.menuItems.other).forEach(
        (item) => (item.style.display = "block")
    );
    rm.reLoadSize();
    x + rm.width > window.innerWidth && (x -= rm.width + 10);
    y + rm.height > window.innerHeight && (y -= y + rm.height - window.innerHeight);
    rm.mask.style.display = "flex";
    rm.showRightMenu(true, x, y);
    return false;
};

(function () {
    const addEventListener = (element, event, handler) =>
        element.addEventListener(event, handler);

    addEventListener(rm.menuItems.back, "click", () =>
        window.history.back() || rm.hideRightMenu()
    );
    addEventListener(rm.menuItems.forward, "click", () =>
        window.history.forward() || rm.hideRightMenu()
    );
    addEventListener(rm.menuItems.refresh, "click", () =>
        window.location.reload()
    );
    addEventListener(rm.menuItems.top, "click", () =>
        sco.toTop() || rm.hideRightMenu()
    );

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
            const title = Array.from(document.querySelectorAll(".aplayer-title")).map(
                (e) => e.innerText
            )[0];
            rm.copyText(title);
        });
    }

    addEventListener(rm.menuItems.copy, "click", () => {
        if (GLOBAL_CONFIG.copyright) {
            const { limit, author, link, source, info } = GLOBAL_CONFIG.right_menu;
            if (selectTextNow.length > limit) {
                selectTextNow = `${selectTextNow}\n\n${author}\n${link}${window.location.href}\n${source}\n${info}`;
            }
        }
        rm.copyText(selectTextNow);
        rm.hideRightMenu();
    });

    if (utils.saveToLocal.get("commentBarrageSwitch") !== null) {
        rm.menuItems.barrage && rm.barrage(!utils.saveToLocal.get("commentBarrageSwitch"));
    }

    addEventListener(rm.menuItems.paste, "click", () =>
        rm.pasteText() && rm.hideRightMenu()
    );
    GLOBAL_CONFIG.comment &&
        addEventListener(rm.menuItems.comment, "click", () =>
            rm.hideRightMenu() || sco.toTalk(selectTextNow)
        );
    addEventListener(rm.menuItems.new, "click", () =>
        window.open(rm.domhref) && rm.hideRightMenu()
    );
    addEventListener(rm.menuItems.downloadImg, "click", () =>
        rm.downloadImage() && rm.hideRightMenu()
    );
    addEventListener(rm.menuItems.copyImg, "click", () =>
        rm.copyImage() && rm.hideRightMenu()
    );
    addEventListener(rm.menuItems.copyLink, "click", () =>
        rm.copyText(rm.domhref) && rm.hideRightMenu()
    );
})();