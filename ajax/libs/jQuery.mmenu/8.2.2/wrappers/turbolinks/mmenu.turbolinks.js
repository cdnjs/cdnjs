export default function () {
    var classnames;
    const grep = function (items, callback) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            let item = items[i];
            if (callback(item)) {
                filtered.push(item);
            }
        }
        return filtered;
    };
    document.addEventListener('turbolinks:before-visit', (evnt) => {
        classnames = document.documentElement.className;
        classnames = grep(classnames.split(' '), (name) => {
            return !/mm-/.test(name);
        }).join(' ');
    });
    document.addEventListener('turbolinks:load', (evnt) => {
        if (typeof classnames === 'undefined') {
            return;
        }
        document.documentElement.className = classnames;
    });
}
;
