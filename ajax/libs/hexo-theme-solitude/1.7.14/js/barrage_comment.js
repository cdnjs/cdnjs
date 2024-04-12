/**
 * Comment Barrage
 * author: @efu
 * website: efu.me
 * copyright: MIT
 * date: 2024-04-12
 * update: 2024-04-12
 * @param array
 */
function initializeCommentBarrage(array) {
    if (array === undefined) return;
    new class {
        constructor() {
            this.config = {
                barrageTimer: [],
                barrageList: [],
                barrageIndex: 0,
                dom: document.querySelector(".comment-barrage"),
                maxBarrage: 1,
                barrageTime: 5000
            };
            this.hoverOnCommentBarrage = false;
            this.init();
        }

        filterAndFlatten(comments) {
            return comments.flatMap(comment => comment.replies ? [comment, ...this.filterAndFlatten(comment.replies)] : [comment]);
        }

        sanitizeContent(content) {
            return content.replace(/(<([^>]+)>)/ig, '').trim();
        }

        createBarrageItem(comment) {
            const content = this.sanitizeContent(comment.content);
            if (!content) return false;
            const element = document.createElement("div");
            element.className = "comment-barrage-item";
            element.innerHTML = `<div class="barrageHead"><a class="barrageTitle" href="javascript:sco.scrollTo('post-comment')">${GLOBAL_CONFIG.lang.barrage.title}</a><div class="barrageNick">${comment.nick}</div><img class="barrageAvatar" src="${GLOBAL_CONFIG.comment.avatar}/avatar/${comment.mailMd5}"/><a class="comment-barrage-close" href="javascript:sco.switchCommentBarrage();"><i class="solitude st-close-fill"></i></a></div><a class="barrageContent" href="${comment.id ? `javascript:sco.scrollTo(\'${comment.id}\')` : 'javascript:sco.scrollTo(\'post-comment\')' }">${content}</a>`;
            this.config.dom.appendChild(element);
            this.config.barrageTimer.push(element);
            return true;
        }

        removeBarrageItem(element) {
            element.classList.add("out");
            setTimeout(() => this.config.dom.removeChild(element), 1000);
        }

        manageBarrage() {
            if (this.config.barrageList.length && !this.hoverOnCommentBarrage) {
                if (!this.createBarrageItem(this.config.barrageList[this.config.barrageIndex])) {
                    this.config.barrageIndex = (this.config.barrageIndex + 1) % this.config.barrageList.length;
                    return this.manageBarrage();
                }
                this.config.barrageIndex = (this.config.barrageIndex + 1) % this.config.barrageList.length;
            }
            if (this.config.barrageTimer.length > Math.min(this.config.maxBarrage, this.config.barrageList.length) && !this.hoverOnCommentBarrage) {
                this.removeBarrageItem(this.config.barrageTimer.shift());
            }
        }

        async initBarrage() {
            const storageSwitch = localStorage.getItem("commentBarrageSwitch");
            this.config.dom.style.display = storageSwitch ? "flex" : "none";
            this.config.barrageList = this.filterAndFlatten(array);
            this.config.dom.innerHTML = "";
            clearInterval(this.commentInterval);
            this.commentInterval = setInterval(() => this.manageBarrage(), this.config.barrageTime);
        }

        async init() {
            await this.initBarrage();
            this.config.dom.addEventListener('mouseover', () => this.hoverOnCommentBarrage = true);
            this.config.dom.addEventListener('mouseout', () => this.hoverOnCommentBarrage = false);
        }
    }();
}