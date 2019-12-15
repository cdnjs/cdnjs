'use strict';

import skate from 'skatejs';

function getContent() {
    const list = document.createElement('ol');
    let container = list;
    let index = 0;
    let subIndex = 1;
    Array.prototype.forEach.call(document.querySelectorAll('h3[id], h4[id]'), function(heading) {
        if (heading.tagName === 'H3') {
            container = list;
            index++;
            subIndex = 1;
        }

        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.innerHTML = `
            <span class="aui-docs-contents-mark">${index + (heading.tagName === 'H4' ? '.' + subIndex++ : '')}</span>
            <span class="aui-docs-contents-item">${heading.textContent}</span>
        `;

        item.appendChild(link);
        container.appendChild(item);

        if (heading.tagName === 'H3') {
            const childContainer = document.createElement('ol');
            item.appendChild(childContainer);
            container = childContainer;
        }
    });
    return list;
}

export default skate('aui-docs-contents', {
    template: function (el) {
        const content = `
            <h6>Contents</h6> <button class="aui-button aui-button-subtle aui-expander-trigger" data-replace-text="Show" aria-controls="contents-expander">Hide</button>
            <div id="contents-expander" class="aui-expander-content" aria-expanded="true"></div>
        `;

        el.innerHTML = content;
        el.querySelector('.aui-expander-content').appendChild(getContent());
    }
});
