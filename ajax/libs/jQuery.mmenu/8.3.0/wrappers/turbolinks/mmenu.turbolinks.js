export default function () {
    var classnames;
    document.addEventListener('turbolinks:before-visit', function (evnt) {
        classnames = document
            .querySelector('.mm-wrapper')
            .className.split(' ')
            .filter(function (name) { return /mm-/.test(name); });
    });
    document.addEventListener('turbolinks:load', function (evnt) {
        if (typeof classnames === 'undefined') {
            return;
        }
        document.querySelector('.mm-wrapper').className = classnames;
    });
}
