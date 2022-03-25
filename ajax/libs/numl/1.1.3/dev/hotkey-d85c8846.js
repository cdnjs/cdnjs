import { l as log } from './index-e74c1c40.js';

class Leaf {
    constructor(trie) {
        this.children = [];
        this.parent = trie;
    }
    delete(value) {
        const index = this.children.indexOf(value);
        if (index === -1)
            return false;
        this.children = this.children.slice(0, index).concat(this.children.slice(index + 1));
        if (this.children.length === 0) {
            this.parent.delete(this);
        }
        return true;
    }
    add(value) {
        this.children.push(value);
        return this;
    }
}
class RadixTrie {
    constructor(trie) {
        this.parent = null;
        this.children = {};
        this.parent = trie || null;
    }
    get(edge) {
        return this.children[edge];
    }
    insert(edges) {
        let currentNode = this;
        for (let i = 0; i < edges.length; i += 1) {
            const edge = edges[i];
            let nextNode = currentNode.get(edge);
            if (i === edges.length - 1) {
                if (nextNode instanceof RadixTrie) {
                    currentNode.delete(nextNode);
                    nextNode = null;
                }
                if (!nextNode) {
                    nextNode = new Leaf(currentNode);
                    currentNode.children[edge] = nextNode;
                }
                return nextNode;
            }
            else {
                if (nextNode instanceof Leaf)
                    nextNode = null;
                if (!nextNode) {
                    nextNode = new RadixTrie(currentNode);
                    currentNode.children[edge] = nextNode;
                }
            }
            currentNode = nextNode;
        }
        return currentNode;
    }
    delete(node) {
        for (const edge in this.children) {
            const currentNode = this.children[edge];
            if (currentNode === node) {
                const success = delete this.children[edge];
                if (Object.keys(this.children).length === 0 && this.parent) {
                    this.parent.delete(this);
                }
                return success;
            }
        }
        return false;
    }
}

function isFormField(element) {
    if (!(element instanceof HTMLElement)) {
        return false;
    }
    const name = element.nodeName.toLowerCase();
    const type = (element.getAttribute('type') || '').toLowerCase();
    return (name === 'select' ||
        name === 'textarea' ||
        (name === 'input' && type !== 'submit' && type !== 'reset' && type !== 'checkbox' && type !== 'radio') ||
        element.isContentEditable);
}
function fireDeterminedAction(el) {
    if (isFormField(el)) {
        el.focus();
    }
    else {
        el.click();
    }
}
function expandHotkeyToEdges(hotkey) {
    return hotkey.split(',').map(edge => edge.split(' '));
}

function hotkey(event) {
    const elideShift = event.code.startsWith('Key') && event.shiftKey && event.key.toUpperCase() === event.key;
    return `${event.ctrlKey ? 'Control+' : ''}${event.altKey ? 'Alt+' : ''}${event.metaKey ? 'Meta+' : ''}${event.shiftKey && !elideShift ? 'Shift+' : ''}${event.key}`;
}

const hotkeyRadixTrie = new RadixTrie();
const elementsLeaves = new WeakMap();
let currentTriePosition = hotkeyRadixTrie;
let resetTriePositionTimer = null;
function resetTriePosition() {
    resetTriePositionTimer = null;
    currentTriePosition = hotkeyRadixTrie;
}
function keyDownHandler(event) {
    if (event.defaultPrevented)
        return;
    if (event.target instanceof Node && isFormField(event.target))
        return;
    if (resetTriePositionTimer != null) {
        window.clearTimeout(resetTriePositionTimer);
    }
    resetTriePositionTimer = window.setTimeout(resetTriePosition, 1500);
    const newTriePosition = currentTriePosition.get(hotkey(event));
    if (!newTriePosition) {
        resetTriePosition();
        return;
    }
    currentTriePosition = newTriePosition;
    if (newTriePosition instanceof Leaf) {
        fireDeterminedAction(newTriePosition.children[newTriePosition.children.length - 1]);
        event.preventDefault();
        resetTriePosition();
        return;
    }
}
function install(element, hotkey) {
    if (Object.keys(hotkeyRadixTrie.children).length === 0) {
        document.addEventListener('keydown', keyDownHandler);
    }
    const hotkeys = expandHotkeyToEdges(hotkey || element.getAttribute('data-hotkey') || '');
    const leaves = hotkeys.map(h => hotkeyRadixTrie.insert(h).add(element));
    elementsLeaves.set(element, leaves);
}
function uninstall(element) {
    const leaves = elementsLeaves.get(element);
    if (leaves && leaves.length) {
        for (const leaf of leaves) {
            leaf && leaf.delete(element);
        }
    }
    if (Object.keys(hotkeyRadixTrie.children).length === 0) {
        document.removeEventListener('keydown', keyDownHandler);
    }
}

function HotKeyBehavior(host, options) {
  let installed = false;

  return {
    connected() {
      setTimeout(() => {
        const el = host.nuRef || host;

        el.dataset.hotkey = (options || '').trim();

        install(el);

        log('hotkey installed', el, el.dataset.hotkey);

        installed = true;
      }, 300);
    },
    disconnected() {
      if (installed) {

        uninstall(host);

        log('hotkey uninstalled', host, options);

        installed = false;
      }
    },
  };
}

export default HotKeyBehavior;
