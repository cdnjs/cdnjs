var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseCSS } from './wired-base';
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
let WiredTabs = class WiredTabs extends LitElement {
    constructor() {
        super(...arguments);
        this.pages = [];
        this.pageMap = new Map();
    }
    static get styles() {
        return [
            BaseCSS,
            css `
        :host {
          display: block;
          opacity: 1;
        }
        ::slotted(.hidden) {
          display: none !important;
        }
    
        :host ::slotted(.hidden) {
          display: none !important;
        }
        #bar {
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -ms-flex-direction: row;
          -webkit-flex-direction: row;
          flex-direction: row;
        }
      `
        ];
    }
    render() {
        return html `
    <div id="bar">
      ${this.pages.map((p) => html `
      <wired-item role="tab" .value="${p.name}" .selected="${p.name === this.selected}" ?aria-selected="${p.name === this.selected}"
        @click="${() => this.selected = p.name}">${p.label || p.name}</wired-item>
      `)}
    </div>
    <div>
      <slot @slotchange="${this.mapPages}"></slot>
    </div>
    `;
    }
    mapPages() {
        this.pages = [];
        this.pageMap.clear();
        if (this.slotElement) {
            const assigned = this.slotElement.assignedNodes();
            if (assigned && assigned.length) {
                for (let i = 0; i < assigned.length; i++) {
                    const n = assigned[i];
                    if (n.nodeType === Node.ELEMENT_NODE && n.tagName.toLowerCase() === 'wired-tab') {
                        const e = n;
                        this.pages.push(e);
                        const name = e.getAttribute('name') || '';
                        if (name) {
                            name.trim().split(' ').forEach((nameSegment) => {
                                if (nameSegment) {
                                    this.pageMap.set(nameSegment, e);
                                }
                            });
                        }
                    }
                }
                if (!this.selected) {
                    if (this.pages.length) {
                        this.selected = this.pages[0].name;
                    }
                }
                this.requestUpdate();
            }
        }
    }
    firstUpdated() {
        this.mapPages();
        this.tabIndex = +((this.getAttribute('tabindex') || 0));
        this.addEventListener('keydown', (event) => {
            switch (event.keyCode) {
                case 37:
                case 38:
                    event.preventDefault();
                    this.selectPrevious();
                    break;
                case 39:
                case 40:
                    event.preventDefault();
                    this.selectNext();
                    break;
            }
        });
    }
    updated() {
        const newPage = this.getElement();
        for (let i = 0; i < this.pages.length; i++) {
            const p = this.pages[i];
            if (p === newPage) {
                p.classList.remove('hidden');
            }
            else {
                p.classList.add('hidden');
            }
        }
        this.current = newPage || undefined;
        if (this.current && this.current.wiredRender) {
            requestAnimationFrame(() => requestAnimationFrame(() => this.current.wiredRender()));
        }
    }
    getElement() {
        let e = undefined;
        if (this.selected) {
            e = this.pageMap.get(this.selected);
        }
        if (!e) {
            e = this.pages[0];
        }
        return e || null;
    }
    selectPrevious() {
        const list = this.pages;
        if (list.length) {
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === this.current) {
                    index = i;
                    break;
                }
            }
            if (index < 0) {
                index = 0;
            }
            else if (index === 0) {
                index = list.length - 1;
            }
            else {
                index--;
            }
            this.selected = list[index].name || '';
        }
    }
    selectNext() {
        const list = this.pages;
        if (list.length) {
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === this.current) {
                    index = i;
                    break;
                }
            }
            if (index < 0) {
                index = 0;
            }
            else if (index >= (list.length - 1)) {
                index = 0;
            }
            else {
                index++;
            }
            this.selected = list[index].name || '';
        }
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredTabs.prototype, "selected", void 0);
__decorate([
    query('slot'),
    __metadata("design:type", HTMLSlotElement)
], WiredTabs.prototype, "slotElement", void 0);
WiredTabs = __decorate([
    customElement('wired-tabs')
], WiredTabs);
export { WiredTabs };
