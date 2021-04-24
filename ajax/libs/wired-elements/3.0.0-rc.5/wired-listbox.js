var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WiredBase, BaseCSS } from './wired-base';
import { rectangle } from './wired-lib';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let WiredListbox = class WiredListbox extends WiredBase {
    constructor() {
        super(...arguments);
        this.horizontal = false;
        this.itemNodes = [];
        this.itemClickHandler = this.onItemClick.bind(this);
    }
    static get styles() {
        return [
            BaseCSS,
            css `
      :host {
        display: inline-block;
        font-family: inherit;
        position: relative;
        padding: 5px;
        outline: none;
      }
      :host(:focus) path {
        stroke-width: 1.5;
      }
      ::slotted(wired-item) {
        display: block;
      }
      :host(.wired-horizontal) ::slotted(wired-item) {
        display: inline-block;
      }
      `
        ];
    }
    render() {
        return html `
    <slot id="slot" @slotchange="${() => this.requestUpdate()}"></slot>
    <div id="overlay">
      <svg id="svg"></svg>
    </div>
    `;
    }
    firstUpdated() {
        this.setAttribute('role', 'listbox');
        this.tabIndex = +((this.getAttribute('tabindex') || 0));
        this.refreshSelection();
        this.addEventListener('click', this.itemClickHandler);
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
        super.updated();
        if (this.horizontal) {
            this.classList.add('wired-horizontal');
        }
        else {
            this.classList.remove('wired-horizontal');
        }
        if (!this.itemNodes.length) {
            this.itemNodes = [];
            const nodes = this.shadowRoot.getElementById('slot').assignedNodes();
            if (nodes && nodes.length) {
                for (let i = 0; i < nodes.length; i++) {
                    const element = nodes[i];
                    if (element.tagName === 'WIRED-ITEM') {
                        element.setAttribute('role', 'option');
                        this.itemNodes.push(element);
                    }
                }
            }
        }
    }
    onItemClick(event) {
        event.stopPropagation();
        this.selected = event.target.value;
        this.refreshSelection();
        this.fireSelected();
    }
    refreshSelection() {
        if (this.lastSelectedItem) {
            this.lastSelectedItem.selected = false;
            this.lastSelectedItem.removeAttribute('aria-selected');
        }
        const slot = this.shadowRoot.getElementById('slot');
        const nodes = slot.assignedNodes();
        if (nodes) {
            let selectedItem = null;
            for (let i = 0; i < nodes.length; i++) {
                const element = nodes[i];
                if (element.tagName === 'WIRED-ITEM') {
                    const value = element.value || '';
                    if (this.selected && (value === this.selected)) {
                        selectedItem = element;
                        break;
                    }
                }
            }
            this.lastSelectedItem = selectedItem || undefined;
            if (this.lastSelectedItem) {
                this.lastSelectedItem.selected = true;
                this.lastSelectedItem.setAttribute('aria-selected', 'true');
            }
            if (selectedItem) {
                this.value = {
                    value: selectedItem.value || '',
                    text: selectedItem.textContent || ''
                };
            }
            else {
                this.value = undefined;
            }
        }
    }
    fireSelected() {
        this.fire('selected', { selected: this.selected });
    }
    selectPrevious() {
        const list = this.itemNodes;
        if (list.length) {
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === this.lastSelectedItem) {
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
            this.selected = list[index].value || '';
            this.refreshSelection();
            this.fireSelected();
        }
    }
    selectNext() {
        const list = this.itemNodes;
        if (list.length) {
            let index = -1;
            for (let i = 0; i < list.length; i++) {
                if (list[i] === this.lastSelectedItem) {
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
            this.selected = list[index].value || '';
            this.refreshSelection();
            this.fireSelected();
        }
    }
    canvasSize() {
        const s = this.getBoundingClientRect();
        return [s.width, s.height];
    }
    draw(svg, size) {
        rectangle(svg, 0, 0, size[0], size[1], this.seed);
    }
};
__decorate([
    property({ type: Object }),
    __metadata("design:type", Object)
], WiredListbox.prototype, "value", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredListbox.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Object)
], WiredListbox.prototype, "horizontal", void 0);
WiredListbox = __decorate([
    customElement('wired-listbox')
], WiredListbox);
export { WiredListbox };
