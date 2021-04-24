var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { fireEvent } from './wired-base';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let WiredRadioGroup = class WiredRadioGroup extends LitElement {
    constructor() {
        super(...arguments);
        this.radioNodes = [];
        this.checkListener = this.handleChecked.bind(this);
    }
    static get styles() {
        return css `
      :host {
        display: inline-block;
        font-family: inherit;
        outline: none;
      }
      :host ::slotted(*) {
        padding: var(--wired-radio-group-item-padding, 5px);
      }
    `;
    }
    render() {
        return html `<slot id="slot" @slotchange="${this.slotChange}"></slot>`;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('change', this.checkListener);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('change', this.checkListener);
    }
    handleChecked(event) {
        const checked = event.detail.checked;
        const item = event.target;
        const name = item.name || '';
        if (!checked) {
            item.checked = true;
        }
        else {
            this.selected = (checked && name) || '';
            this.fireSelected();
        }
    }
    slotChange() {
        this.requestUpdate();
    }
    firstUpdated() {
        this.setAttribute('role', 'radiogroup');
        this.tabIndex = +(this.getAttribute('tabindex') || 0);
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
        const slot = this.shadowRoot.getElementById('slot');
        const nodes = slot.assignedNodes();
        this.radioNodes = [];
        if (nodes && nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
                const element = nodes[i];
                if (element.tagName === 'WIRED-RADIO') {
                    this.radioNodes.push(element);
                    const name = element.name || '';
                    if (this.selected && (name === this.selected)) {
                        element.checked = true;
                    }
                    else {
                        element.checked = false;
                    }
                }
            }
        }
    }
    selectPrevious() {
        const list = this.radioNodes;
        if (list.length) {
            let radio = null;
            let index = -1;
            if (this.selected) {
                for (let i = 0; i < list.length; i++) {
                    const n = list[i];
                    if (n.name === this.selected) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    radio = list[0];
                }
                else {
                    index--;
                    if (index < 0) {
                        index = list.length - 1;
                    }
                    radio = list[index];
                }
            }
            else {
                radio = list[0];
            }
            if (radio) {
                radio.focus();
                this.selected = radio.name;
                this.fireSelected();
            }
        }
    }
    selectNext() {
        const list = this.radioNodes;
        if (list.length) {
            let radio = null;
            let index = -1;
            if (this.selected) {
                for (let i = 0; i < list.length; i++) {
                    const n = list[i];
                    if (n.name === this.selected) {
                        index = i;
                        break;
                    }
                }
                if (index < 0) {
                    radio = list[0];
                }
                else {
                    index++;
                    if (index >= list.length) {
                        index = 0;
                    }
                    radio = list[index];
                }
            }
            else {
                radio = list[0];
            }
            if (radio) {
                radio.focus();
                this.selected = radio.name;
                this.fireSelected();
            }
        }
    }
    fireSelected() {
        fireEvent(this, 'selected', { selected: this.selected });
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], WiredRadioGroup.prototype, "selected", void 0);
WiredRadioGroup = __decorate([
    customElement('wired-radio-group')
], WiredRadioGroup);
export { WiredRadioGroup };
