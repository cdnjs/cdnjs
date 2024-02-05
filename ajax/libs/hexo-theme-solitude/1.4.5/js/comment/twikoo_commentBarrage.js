function initializeCommentBarrage() {
    window.commentBarrageInitialized = !0;
    let e = {
        maxBarrage: 1,
        barrageTime: 8e3,
        twikooUrl: GLOBAL_CONFIG.comment.twikoo.url,
        pageUrl: window.location.pathname,
        accessToken: GLOBAL_CONFIG.comment.twikoo.accessToken,
    };
    new class {
        commentInterval = null

        constructor(e) {
            this.config = {
                ...e,
                barrageTimer: [],
                barrageList: [],
                barrageIndex: 0,
                dom: document.querySelector(".comment-barrage")
            },
                this.commentInterval = null,
                this.hoverOnCommentBarrage = !1,
                this.init()
        }

        async fetchComments() {
            return fetch(this.config.twikooUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    event: "COMMENT_GET",
                    accessToken: this.config.accessToken,
                    url: this.config.pageUrl
                })
            }).then((e => {
                    if (!e.ok)
                        throw Error("HTTP error! status: " + e.status);
                    return e.json()
                }
            )).then((e => e.data)).catch((e => console.error("An error occurred while fetching comments: ", e)))
        }

        commentLinkFilter(e) {
            e.sort(((e, t) => e.created - t.created));
            let t = [];
            return e.forEach((e => {
                    t.push(...this.getCommentReplies(e))
                }
            )),
                t
        }

        getCommentReplies(e) {
            if (e.replies) {
                let comments = [e];
                e.replies.forEach((reply) => {
                    comments.push(...this.getCommentReplies(reply));
                });
                return comments;
            }
            return [];
        }


        processCommentContent(e) {
            const t = e.replace(/<blockquote\b[^>]*>[\s\S]*?<\/blockquote>/gi, "")
                , r = t.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
            return "" === t.trim() ? "" : `<p>${r}</p>`
        }

        popCommentBarrage(e) {
            var commentContent = this.processCommentContent(e.comment);

            if (!commentContent.trim()) {
                return false;
            }

            let commentBarrageItem = document.createElement("div");
            commentBarrageItem.className = "comment-barrage-item";

            commentBarrageItem.innerHTML = `
        <div class="barrageHead">
            <a class="barrageTitle" href="javascript:sco.scrollTo('post-comment')">热评</a>
            <div class="barrageNick">${e.nick}</div>
            <img class="barrageAvatar" src="https://cravatar.cn/avatar/${e.mailMd5}"/>
            <a class="comment-barrage-close" href="javascript:sco.switchCommentBarrage();"><i class="scoicon sco-close-fill"></i></a>
        </div>
        <a class="barrageContent" href="javascript:sco.scrollTo('${e.id}');">${commentContent}</a>
    `;

            this.config.barrageTimer.push(commentBarrageItem);

            this.config.dom.appendChild(commentBarrageItem);
            return true;
        }

        removeCommentBarrage(e) {
            e.className = "comment-barrage-item out",
                setTimeout((() => {
                        this.config.dom.removeChild(e)
                    }
                ), 1e3)
        }

        async initCommentBarrage() {
            if (localStorage.getItem("commentBarrageSwitch") != null) {
                document.querySelector(".comment-barrage").style.display = "flex";
                GLOBAL_CONFIG.rightside.enable && (document.querySelector(".menu-commentBarrage-text").textContent = "关闭热评");
                document.querySelector("#consoleCommentBarrage").classList.add("on");
            } else {
                document.querySelector(".comment-barrage").style.display = "none";
                GLOBAL_CONFIG.rightside.enable && (document.querySelector(".menu-commentBarrage-text").textContent = "显示热评");
                document.querySelector("#consoleCommentBarrage").classList.remove("on");
            }
            const comments = await this.fetchComments();
            this.config.barrageList = this.commentLinkFilter(comments);
            this.config.dom.innerHTML = "";
            clearInterval(this.commentInterval);
            this.commentInterval = null;
            const t = () => {
                if (this.config.barrageList.length && !this.hoverOnCommentBarrage) {
                    if (!this.popCommentBarrage(this.config.barrageList[this.config.barrageIndex]))
                        return this.config.barrageIndex += 1,
                            this.config.barrageIndex %= this.config.barrageList.length,
                            void t();
                    this.config.barrageIndex += 1,
                        this.config.barrageIndex %= this.config.barrageList.length
                }
                if (this.config.barrageTimer.length > (this.config.barrageList.length > this.config.maxBarrage ? this.config.maxBarrage : this.config.barrageList.length) && !this.hoverOnCommentBarrage) {
                    this.removeCommentBarrage(this.config.barrageTimer.shift());
                }
            };
            setTimeout(() => {
                t();
                if (this.commentInterval) {
                    clearInterval(this.commentInterval);
                }
                this.commentInterval = setInterval(t, this.config.barrageTime);
            }, 3000);
        }

        init() {
            this.initCommentBarrage();
            const commentBarrage = document.querySelector(".comment-barrage");
            commentBarrage.addEventListener('mouseover', () => {
                this.hoverOnCommentBarrage = true;
            });
            commentBarrage.addEventListener('mouseout', () => {
                this.hoverOnCommentBarrage = false;
            });
        }
    }
    (e)
}