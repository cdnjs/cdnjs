/* tslint:disable */
/* eslint-disable */
(function ($) {

    $.jqx.jqxWidget('jqxMaterialColorPicker', '', {});

    $.extend($.jqx._jqxMaterialColorPicker.prototype, {
        defineInstance: function () {
            var settings = {
                events: ['colorchange']
            };
            if (this === $.jqx._jqxMaterialColorPicker.prototype) {
                return settings;
            }
            $.extend(true, this, settings);
            return settings;
        },

        createInstance: function () {
            var that = this;

            that._renderGrid();
            that._addHandlers();
        },

        _renderGrid() {
            var that = this;
            var labelsAndPaletteContainer = document.createElement('div');

            that._renderShades();
            that._renderColorPalette();
            that._renderColorLabels();

            labelsAndPaletteContainer.classList = 'jqx-labels-and-palette'
            labelsAndPaletteContainer.appendChild(that._colorLabelsContainer);
            labelsAndPaletteContainer.appendChild(that._paletteContainer);
            that.element.appendChild(labelsAndPaletteContainer);
        },

        _renderColorPalette: function () {
            var that = this;
            var colorsArray = [
                ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000'],
                ['#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162'],
                ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff'],
                ['#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea'],
                ['#e8eaf6', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe'],
                ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff'],
                ['#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea'],
                ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4'],
                ['#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5'],
                ['#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853'],
                ['#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17'],
                ['#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00'],
                ['#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600'],
                ['#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00'],
                ['#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00'],
                ['#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00'],
                ['#efebe9', '#d7ccc8', '#bcaaa4', '#a1887f', '#8d6e63', '#795548', '#6d4c41', '#5d4037', '#4e342e', '#3e2723'],
                ['#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161', '#424242', '#212121'],
                ['#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#455a64', '#37474f', '#263238'],
            ]
            var paletteContainer = document.createElement('div');

            for (var index = 0, length = colorsArray.length; index < length; index++) {
                var currentRow = colorsArray[index];
                var currentUl = that._renderRow(currentRow, 'jqx-color-cell', false);

                paletteContainer.appendChild(currentUl);
            }

            paletteContainer.className = 'jqx-palette';
            that._paletteContainer = paletteContainer;
        },

        _renderShades: function () {
            var that = this;
            var shadesContainer = document.createElement('div');
            var shadesArray = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 'A 100', 'A 200', 'A 400', 'A 700'];
            var shadesRow = that._renderRow(shadesArray, 'jqx-shade-cell', true);

            shadesContainer.className = 'jqx-shades';
            shadesContainer.appendChild(shadesRow);
            that.element.appendChild(shadesContainer);
        },

        _renderColorLabels: function () {
            var that = this;
            var colorLabelsContainer = document.createElement('div');
            var colorLabelsArray = ['Red', 'Pink', 'Purple', 'Deep Purple', 'Indigo', 'Blue', 'Light Blue', 'Cyan', 'Teal', 'Green', 'Light Green', 'Lime', 'Yellow', 'Amber', 'Orange', 'Deep Orange', 'Brown', 'Grey', 'Blue Grey'];
            var colorLabelsColumn = that._renderRow(colorLabelsArray, 'jqx-color-label', true);

            colorLabelsContainer.className = 'jqx-color-labels';
            colorLabelsContainer.appendChild(colorLabelsColumn);
            that._colorLabelsContainer = colorLabelsContainer;
        },


        _renderRow: function (array, cellClass, addInnerHtml) {
            var ul = document.createElement('ul');

            for (var index = 0, length = array.length; index < length; index++) {
                var currentElement = array[index];
                var li = document.createElement('li');

                if (addInnerHtml) {
                    li.innerHTML = currentElement;
                } else {
                    li.style.background = currentElement;
                    li.setAttribute('data-color', currentElement);
                }

                li.className = cellClass;

                ul.appendChild(li);
            }

            return ul;
        },

        _addHandlers: function () {
            var that = this;

            this.host.find('.jqx-color-cell').on('click', function () {
                that._currentColorHex = event.target.getAttribute('data-color');
                that._currentColorRgb = event.target.style.background;
                that._raiseEvent(0, { color: that.getColor() });
            });
        },

        _raiseEvent: function (id, arg) {
            if (arg == undefined)
                arg = { owner: null };

            var evt = this.events[id];
            var args = arg ? arg : {};

            args.owner = this;
            var event = new $.Event(evt);
            event.owner = this;
            event.args = args;

            var result = this.host.trigger(event);

            return result;
        },

        getColor: function () {
            var that = this;
            var rgb = that._currentColorRgb.match(/\d+/g);

            return {
                hex: that._currentColorHex.substring(1),
                r: parseInt(rgb[0]),
                g: parseInt(rgb[1]),
                b: parseInt(rgb[2])
            };
        },

        destroy: function () {
            var that = this;

            that.host.remove();
        }
    });

})(jqxBaseFramework);
