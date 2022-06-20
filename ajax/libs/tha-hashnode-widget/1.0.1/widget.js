"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(function () {
    class ThaHashnodeWidget {
        constructor() {
            this.options = {};
        }
        init(options) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                this.options = options;
                const selector = (_a = this.options.renderTo) !== null && _a !== void 0 ? _a : "#tha-hashnode-widget";
                const container = document.querySelector(selector);
                if (container == null) {
                    console.error("[THA-HW] I could not initialize because you provided an invalid selector.");
                    return;
                }
                const data = (yield this.getFeaturedPosts(this.options.username)).data;
                if (data == null) {
                    console.error("[THA-HW] I was unable to render the widget because something went wrong getting posts from the Hashnode api.");
                    return;
                }
                const posts = data.user.publication.posts;
                this.injectHtml(container, posts);
                this.injectStyles(this.options.renderTo);
            });
        }
        createUrlForPost(slug) {
            const base = this.options.blogUrl.endsWith("/")
                ? this.options.blogUrl
                : `${this.options.blogUrl}/`;
            return `${base}${slug}`;
        }
        getFeaturedPosts(username, page = 0) {
            return __awaiter(this, void 0, void 0, function* () {
                const GET_USER_ARTICLES = `
          query GetUserArticles($page: Int!) {
              user(username: \"${username}\") {
                  publication {
                      posts(page: $page) {
                          coverImage
                          slug
                          title
                      }
                  }
              }
          }
      `;
                return this.gql(GET_USER_ARTICLES, { page });
            });
        }
        gql(query, variables = {}) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield fetch("https://api.hashnode.com/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query,
                        variables,
                    }),
                });
                return data.json();
            });
        }
        injectHtml(element, posts) {
            for (const post of posts) {
                const imgContainer = document.createElement("div");
                imgContainer.setAttribute("class", "tha-hashnode-widget__cover-image");
                const img = document.createElement("div");
                img.setAttribute("class", "tha-hashnode-widget__img");
                img.setAttribute("style", `background-image: url('${post.coverImage}')`);
                imgContainer.appendChild(img);
                const title = document.createElement("div");
                title.setAttribute("class", "tha-hashnode-widget__title");
                const titleHref = document.createElement("a");
                titleHref.setAttribute("href", this.createUrlForPost(post.slug));
                titleHref.setAttribute("target", "_blank");
                titleHref.innerText = post.title;
                title.append(titleHref);
                const item = document.createElement("div");
                item.setAttribute("class", "tha-hashnode-widget__blog-post");
                item.append(imgContainer);
                item.append(title);
                element === null || element === void 0 ? void 0 : element.append(item);
            }
        }
        injectStyles(selector) {
            const styles = `
        ${selector} {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          grid-row-gap: 0.75rem;
          grid-column-gap: 0.5rem;
        }
        
        ${selector} .tha-hashnode-widget__blog-post .tha-hashnode-widget__cover-image .tha-hashnode-widget__img {
            position: absolute;
            background-size: cover;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 100%;
        }
        
        ${selector} .tha-hashnode-widget__blog-post .tha-hashnode-widget__cover-image {
          width: 100%;
          padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
          position: relative; /* If you want text inside of it */
        }
        
        ${selector} .tha-hashnode-widget__blog-post .tha-hashnode-widget__title {
          font-weight: bold;
          padding-top: 0.25rem;
        }
        
        ${selector} .tha-hashnode-widget__blog-post .tha-hashnode-widget__title a {
          text-decoration: none;
        }

        @media (min-width: 640px) {
          ${selector} {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 768px) {
          
        }

        @media (min-width: 1024px) {
          ${selector} {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1280px) { }

        @media (min-width: 1536px) {
          ${selector} {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `;
            const style = document.createElement("style");
            style.setAttribute("type", "text/css");
            style.innerHTML = styles;
            const head = document.querySelector("head");
            if (head == null) {
                console.warn("[THA-HW] I could not inject styles because HTML <head> section was not found.");
                return;
            }
            head.appendChild(style);
        }
    }
    window.ThaHashnodeWidget = new ThaHashnodeWidget();
})();
