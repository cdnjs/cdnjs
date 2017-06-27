
var Split = function (ids, options) {
    // Set defaults

    options = typeof options !== 'undefined' ?  options : {};

    if (!options.gutterWidth) options.gutterWidth = 10;
    if (!options.minWidth) options.minWidth = 100;

    // Event listeners for drag events, bound to a pair object.
    // Save the pair's left position and width when dragging starts.
    // Prevent selection on start and re-enable it when done.

    var startDragging = function () {
            this.dragging = true;

            this.width = this.left.clientWidth + this.right.clientWidth + options.gutterWidth;
            this.x = this.left.getBoundingClientRect().left;

            this.left.addEventListener('selectstart', preventSelection);
            this.left.addEventListener('dragstart', preventSelection);
            this.right.addEventListener('selectstart', preventSelection);
            this.right.addEventListener('dragstart', preventSelection);

            this.left.style.userSelect = 'none';
            this.left.style.webkitUserSelect = 'none';
            this.left.style.MozUserSelect = 'none';

            this.right.style.userSelect = 'none';
            this.right.style.webkitUserSelect = 'none';
            this.right.style.MozUserSelect = 'none';

            if (options.onDragStart) {
                options.onDragStart();
            }
        },

        stopDragging = function () {
            this.dragging = false;

            this.left.removeEventListener('selectstart', preventSelection);
            this.left.removeEventListener('dragstart', preventSelection);
            this.right.removeEventListener('selectstart', preventSelection);
            this.right.removeEventListener('dragstart', preventSelection);

            this.left.style.userSelect = '';
            this.left.style.webkitUserSelect = '';
            this.left.style.MozUserSelect = '';

            this.right.style.userSelect = '';
            this.right.style.webkitUserSelect = '';
            this.right.style.MozUserSelect = '';

            if (options.onDragEnd) {
                options.onDragEnd();
            }
        },

        drag = function (e) {
            if (!this.dragging) return;

            // Stop dragging if closer than minWidth to
            // the pair's left or right sides

            if (e.clientX <= this.x + this.leftMin ||
                e.clientX >= this.x + this.width - this.rightMin) {
                    return;
            }

            // Get the relative position of the event from the left side of the
            // pair for the left width. Right width is total width - left width.

            var offsetX = e.clientX - this.x;

            this.left.style.width = offsetX - (options.gutterWidth / 2) + 'px';
            this.right.style.width = this.width - offsetX - (options.gutterWidth / 2) - 1 + 'px';

            if (options.onDrag) {
                options.onDrag();
            }
        },

        preventSelection = function () { return false; },

        // Given a list of DOM element ids and a list of percentage widths,
        // assign each element a width allowing for a gutter between each
        // pair. The number of gutters is ids.length - 1, and the total gutter
        // width is gutterWidth * (ids.length - 1). Before calculating
        // each width, subtract the total gutter width for the parent width.

        parent = document.getElementById(ids[0]).parentNode,
        width = parent.clientWidth - (options.gutterWidth * (ids.length - 1));

    if (!options.widths) {
        var percent = 100 / ids.length;

        options.widths = [];

        for (var i = 0; i < ids.length; i++) {
            options.widths.push(percent);
        };
    }

    if (!Array.isArray(options.minWidth)) {
        var minWidths = [];

        for (var i = 0; i < ids.length; i++) {
            minWidths.push(options.minWidth);
        };

        options.minWidth = minWidths;
    }

    for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);

        if (i > 0) {
            var pair = {
                    left: document.getElementById(ids[i - 1]),
                    right: el,
                    leftMin: options.minWidth[i - 1],
                    rightMin: options.minWidth[i],
                    dragging: false,
                    parent: parent
                },
                gutter = document.createElement('div');

            gutter.className = 'gutter';
            gutter.style.width = options.gutterWidth + 'px';
            gutter.style.float = 'left';

            gutter.addEventListener('mousedown', startDragging.bind(pair));

            parent.addEventListener('mouseup', stopDragging.bind(pair));
            parent.addEventListener('mousemove', drag.bind(pair));
            parent.addEventListener('mouseleave', stopDragging.bind(pair));

            parent.insertBefore(gutter, el);

            pair.gutter = gutter;
        }

        el.style.width = width * options.widths[i] / 100 + 'px';
    }
};
