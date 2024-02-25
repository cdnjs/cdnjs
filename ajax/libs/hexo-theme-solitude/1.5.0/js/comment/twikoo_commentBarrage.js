function initializeCommentBarrage() {
    window.commentBarrageInitialized = !0;
    const e = {
        maxBarrage: 1,
        barrageTime: 8e3,
        twikooUrl: GLOBAL_CONFIG.comment.twikoo.url,
        pageUrl: window.location.pathname,
        accessToken: GLOBAL_CONFIG.comment.twikoo.accessToken,
    };

    class CommentBarrage {
        constructor(config) {
            this.config = {
                ...config,
                barrageTimer: [],
                barrageList: [],
                barrageIndex: 0,
                dom: document.querySelector(".comment-barrage")
            };
            this.commentInterval = null;
            this.hoverOnCommentBarrage = false;
            this.init();
        }

        async fetchComments() {
            try {
                const response = await fetch(this.config.twikooUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        event: "COMMENT_GET",
                        accessToken: this.config.accessToken,
                        url: this.config.pageUrl
                    })
                });
                if (!response.ok) {
                    throw new Error("HTTP error! status: " + response.status);
                }
                const data = await response.json();
                return data.data;
            } catch (error) {
                console.error("An error occurred while fetching comments: ", error);
            }
        }

        commentLinkFilter(comments) {
            comments.sort((a, b) => a.created - b.created);
            let filteredComments = [];
            comments.forEach(comment => {
                filteredComments.push(...this.getCommentReplies(comment));
            });
            return filteredComments;
        }

        getCommentReplies(comment) {
            let comments = [comment];
            if (comment.replies) {
                comment.replies.forEach(reply => {
                    comments.push(...this.getCommentReplies(reply));
                });
            }
            return comments;
        }

        processCommentContent(comment) {
            const strippedContent = comment.replace(/<blockquote\b[^>]*>[\s\S]*?<\/blockquote>/gi, "");
            const plainText = strippedContent.replace(/<[^>]*>/g, "").replace(/\n/g, " ");
            return plainText.trim() !== "" ? `<p>${plainText}</p>` : "";
        }

        popCommentBarrage(comment) {
            const commentContent = this.processCommentContent(comment.comment);
            if (!commentContent.trim()) {
                return false;
            }
            const commentBarrageItem = document.createElement("div");
            commentBarrageItem.className = "comment-barrage-item";
            commentBarrageItem.innerHTML = `
                <div class="barrageHead">
                    <a class="barrageTitle" href="javascript:sco.scrollTo('post-comment')">热评</a>
                    <div class="barrageNick">${comment.nick}</div>
                    <img class="barrageAvatar" src="https://cravatar.cn/avatar/${comment.mailMd5}"/>
                    <a class="comment-barrage-close" href="javascript:sco.switchCommentBarrage();"><i class="scoicon sco-close-fill"></i></a>
                </div>
                <a class="barrageContent" href="javascript:sco.scrollTo('${comment.id}');">${commentContent}</a>
            `;
            this.config.barrageTimer.push(commentBarrageItem);
            this.config.dom.appendChild(commentBarrageItem);
            return true;
        }

        removeCommentBarrage(commentBarrageItem) {
            commentBarrageItem.className = "comment-barrage-item out";
            setTimeout(() => {
                this.config.dom.removeChild(commentBarrageItem);
            }, 1000);
        }

        async initCommentBarrage() {
            const commentBarrageSwitch = localStorage.getItem("commentBarrageSwitch");
            if (commentBarrageSwitch != null) {
                document.querySelector(".comment-barrage").style.display = "flex";
                if (GLOBAL_CONFIG.rightside.enable) {
                    document.querySelector(".menu-commentBarrage-text").textContent = "关闭热评";
                }
                document.querySelector("#consoleCommentBarrage").classList.add("on");
            } else {
                document.querySelector(".comment-barrage").style.display = "none";
                if (GLOBAL_CONFIG.rightside.enable) {
                    document.querySelector(".menu-commentBarrage-text").textContent = "显示热评";
                }
                document.querySelector("#consoleCommentBarrage").classList.remove("on");
            }
            const comments = await this.fetchComments();
            this.config.barrageList = this.commentLinkFilter(comments);
            this.config.dom.innerHTML = "";
            clearInterval(this.commentInterval);
            this.commentInterval = null;
            const t = () => {
                if (this.config.barrageList.length && !this.hoverOnCommentBarrage) {
                    if (!this.popCommentBarrage(this.config.barrageList[this.config.barrageIndex])) {
                        this.config.barrageIndex += 1;
                        this.config.barrageIndex %= this.config.barrageList.length;
                        return t();
                    }
                    this.config.barrageIndex += 1;
                    this.config.barrageIndex %= this.config.barrageList.length;
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

    new CommentBarrage(e);
}