var SlimSelect = (function () {
    'use strict';

    function generateID() {
        return Math.random().toString(36).substring(2, 10);
    }
    function hasClassInTree(element, className) {
        function hasClass(e, c) {
            if (c && e && e.classList && e.classList.contains(c)) {
                return e;
            }
            if (c && e && e.dataset && e.dataset.id && e.dataset.id === className) {
                return e;
            }
            return null;
        }
        function parentByClass(e, c) {
            if (!e || e === document) {
                return null;
            }
            else if (hasClass(e, c)) {
                return e;
            }
            else {
                return parentByClass(e.parentNode, c);
            }
        }
        return hasClass(element, className) || parentByClass(element, className);
    }
    function debounce(func, wait = 50, immediate = false) {
        let timeout;
        return function (...args) {
            const context = self;
            const later = () => {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
    function isEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    function kebabCase(str) {
        const result = str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) => '-' + match.toLowerCase());
        return str[0] === str[0].toUpperCase() ? result.substring(1) : result;
    }

    class Settings {
        constructor(settings) {
            this.id = '';
            this.style = '';
            this.class = [];
            this.isMultiple = false;
            this.isOpen = false;
            this.isFullOpen = false;
            this.intervalMove = null;
            if (!settings) {
                settings = {};
            }
            this.id = 'ss-' + generateID();
            this.style = settings.style || '';
            this.class = settings.class || [];
            this.disabled = settings.disabled !== undefined ? settings.disabled : false;
            this.alwaysOpen = settings.alwaysOpen !== undefined ? settings.alwaysOpen : false;
            this.showSearch = settings.showSearch !== undefined ? settings.showSearch : true;
            this.searchPlaceholder = settings.searchPlaceholder || 'Search';
            this.searchText = settings.searchText || 'No Results';
            this.searchingText = settings.searchingText || 'Searching...';
            this.searchHighlight = settings.searchHighlight !== undefined ? settings.searchHighlight : false;
            this.closeOnSelect = settings.closeOnSelect !== undefined ? settings.closeOnSelect : true;
            this.contentLocation = settings.contentLocation || document.body;
            this.contentPosition = settings.contentPosition || 'absolute';
            this.openPosition = settings.openPosition || 'auto';
            this.placeholderText = settings.placeholderText !== undefined ? settings.placeholderText : 'Select Value';
            this.allowDeselect = settings.allowDeselect !== undefined ? settings.allowDeselect : false;
            this.hideSelected = settings.hideSelected !== undefined ? settings.hideSelected : false;
            this.showOptionTooltips = settings.showOptionTooltips !== undefined ? settings.showOptionTooltips : false;
            this.minSelected = settings.minSelected || 0;
            this.maxSelected = settings.maxSelected || 1000;
            this.timeoutDelay = settings.timeoutDelay || 200;
            this.maxValuesShown = settings.maxValuesShown || 20;
            this.maxValuesMessage = settings.maxValuesMessage || '{number} selected';
        }
    }

    class Optgroup {
        constructor(optgroup) {
            this.id = !optgroup.id || optgroup.id === '' ? generateID() : optgroup.id;
            this.label = optgroup.label || '';
            this.selectAll = optgroup.selectAll === undefined ? false : optgroup.selectAll;
            this.selectAllText = optgroup.selectAllText || 'Select All';
            this.closable = optgroup.closable || 'off';
            this.options = [];
            if (optgroup.options) {
                for (const o of optgroup.options) {
                    this.options.push(new Option(o));
                }
            }
        }
    }
    class Option {
        constructor(option) {
            this.id = !option.id || option.id === '' ? generateID() : option.id;
            this.value = option.value === undefined ? option.text : option.value;
            this.text = option.text || '';
            this.html = option.html || '';
            this.selected = option.selected !== undefined ? option.selected : false;
            this.display = option.display !== undefined ? option.display : true;
            this.disabled = option.disabled !== undefined ? option.disabled : false;
            this.mandatory = option.mandatory !== undefined ? option.mandatory : false;
            this.placeholder = option.placeholder !== undefined ? option.placeholder : false;
            this.class = option.class || '';
            this.style = option.style || '';
            this.data = option.data || {};
        }
    }
    class Store {
        constructor(type, data) {
            this.selectType = 'single';
            this.data = [];
            this.selectType = type;
            this.setData(data);
        }
        validateDataArray(data) {
            if (!Array.isArray(data)) {
                return new Error('Data must be an array');
            }
            for (let dataObj of data) {
                if (dataObj instanceof Optgroup || 'label' in dataObj) {
                    if (!('label' in dataObj)) {
                        return new Error('Optgroup must have a label');
                    }
                    if ('options' in dataObj && dataObj.options) {
                        for (let option of dataObj.options) {
                            return this.validateOption(option);
                        }
                    }
                }
                else if (dataObj instanceof Option || 'text' in dataObj) {
                    return this.validateOption(dataObj);
                }
                else {
                    return new Error('Data object must be a valid optgroup or option');
                }
            }
            return null;
        }
        validateOption(option) {
            if (!('text' in option)) {
                return new Error('Option must have a text');
            }
            return null;
        }
        partialToFullData(data) {
            let dataFinal = [];
            data.forEach((dataObj) => {
                if (dataObj instanceof Optgroup || 'label' in dataObj) {
                    let optOptions = [];
                    if ('options' in dataObj && dataObj.options) {
                        dataObj.options.forEach((option) => {
                            optOptions.push(new Option(option));
                        });
                    }
                    if (optOptions.length > 0) {
                        dataFinal.push(new Optgroup(dataObj));
                    }
                }
                if (dataObj instanceof Option || 'text' in dataObj) {
                    dataFinal.push(new Option(dataObj));
                }
            });
            return dataFinal;
        }
        setData(data) {
            this.data = this.partialToFullData(data);
            if (this.selectType === 'single') {
                this.setSelectedBy('value', this.getSelected());
            }
        }
        getData() {
            return this.filter(null, true);
        }
        getDataOptions() {
            return this.filter(null, false);
        }
        addOption(option) {
            this.setData(this.getData().concat(new Option(option)));
        }
        setSelectedBy(selectedType, selectedValues) {
            let firstOption = null;
            let hasSelected = false;
            for (let dataObj of this.data) {
                if (dataObj instanceof Optgroup) {
                    for (let option of dataObj.options) {
                        if (!firstOption) {
                            firstOption = option;
                        }
                        option.selected = hasSelected ? false : selectedValues.includes(option[selectedType]);
                        if (option.selected && this.selectType === 'single') {
                            hasSelected = true;
                        }
                    }
                }
                if (dataObj instanceof Option) {
                    if (!firstOption) {
                        firstOption = dataObj;
                    }
                    dataObj.selected = hasSelected ? false : selectedValues.includes(dataObj[selectedType]);
                    if (dataObj.selected && this.selectType === 'single') {
                        hasSelected = true;
                    }
                }
            }
            if (this.selectType === 'single' && firstOption && !hasSelected) {
                firstOption.selected = true;
            }
        }
        getSelected() {
            let selectedOptions = this.getSelectedOptions();
            let selectedValues = [];
            selectedOptions.forEach((option) => {
                selectedValues.push(option.value);
            });
            return selectedValues;
        }
        getSelectedOptions() {
            return this.filter((opt) => {
                return opt.selected;
            }, false);
        }
        getSelectedIDs() {
            let selectedOptions = this.getSelectedOptions();
            let selectedIDs = [];
            selectedOptions.forEach((op) => {
                selectedIDs.push(op.id);
            });
            return selectedIDs;
        }
        getOptgroupByID(id) {
            for (let dataObj of this.data) {
                if (dataObj instanceof Optgroup && dataObj.id === id) {
                    return dataObj;
                }
            }
            return null;
        }
        getOptionByID(id) {
            let options = this.filter((opt) => {
                return opt.id === id;
            }, false);
            return options.length ? options[0] : null;
        }
        search(search, searchFilter) {
            search = search.trim();
            if (search === '') {
                return this.getData();
            }
            return this.filter((opt) => {
                return searchFilter(opt, search);
            }, true);
        }
        filter(filter, includeOptgroup) {
            const dataSearch = [];
            this.data.forEach((dataObj) => {
                if (dataObj instanceof Optgroup) {
                    let optOptions = [];
                    dataObj.options.forEach((option) => {
                        if (!filter || filter(option)) {
                            if (!includeOptgroup) {
                                dataSearch.push(new Option(option));
                            }
                            else {
                                optOptions.push(new Option(option));
                            }
                        }
                    });
                    if (optOptions.length > 0) {
                        let optgroup = new Optgroup(dataObj);
                        optgroup.options = optOptions;
                        dataSearch.push(optgroup);
                    }
                }
                if (dataObj instanceof Option) {
                    if (!filter || filter(dataObj)) {
                        dataSearch.push(new Option(dataObj));
                    }
                }
            });
            return dataSearch;
        }
        getSelectType() {
            return this.selectType;
        }
    }

    class Render {
        constructor(settings, store, callbacks) {
            this.classes = {
                main: 'ss-main',
                placeholder: 'ss-placeholder',
                values: 'ss-values',
                single: 'ss-single',
                max: 'ss-max',
                value: 'ss-value',
                valueText: 'ss-value-text',
                valueDelete: 'ss-value-delete',
                valueOut: 'ss-value-out',
                deselect: 'ss-deselect',
                deselectPath: 'M10,10 L90,90 M10,90 L90,10',
                arrow: 'ss-arrow',
                arrowClose: 'M10,30 L50,70 L90,30',
                arrowOpen: 'M10,70 L50,30 L90,70',
                content: 'ss-content',
                openAbove: 'ss-open-above',
                openBelow: 'ss-open-below',
                search: 'ss-search',
                searchHighlighter: 'ss-search-highlight',
                searching: 'ss-searching',
                addable: 'ss-addable',
                addablePath: 'M50,10 L50,90 M10,50 L90,50',
                list: 'ss-list',
                optgroup: 'ss-optgroup',
                optgroupLabel: 'ss-optgroup-label',
                optgroupLabelText: 'ss-optgroup-label-text',
                optgroupActions: 'ss-optgroup-actions',
                optgroupSelectAll: 'ss-selectall',
                optgroupSelectAllBox: 'M60,10 L10,10 L10,90 L90,90 L90,50',
                optgroupSelectAllCheck: 'M30,45 L50,70 L90,10',
                optgroupClosable: 'ss-closable',
                option: 'ss-option',
                optionDelete: 'M10,10 L90,90 M10,90 L90,10',
                highlighted: 'ss-highlighted',
                open: 'ss-open',
                close: 'ss-close',
                selected: 'ss-selected',
                error: 'ss-error',
                disabled: 'ss-disabled',
                hide: 'ss-hide',
            };
            this.store = store;
            this.settings = settings;
            this.callbacks = callbacks;
            this.main = this.mainDiv();
            this.content = this.contentDiv();
            this.updateClassStyles();
            this.updateAriaAttributes();
            this.settings.contentLocation.appendChild(this.content.main);
        }
        enable() {
            this.main.main.classList.remove(this.classes.disabled);
            this.content.search.input.disabled = false;
        }
        disable() {
            this.main.main.classList.add(this.classes.disabled);
            this.content.search.input.disabled = true;
        }
        open() {
            this.main.arrow.path.setAttribute('d', this.classes.arrowOpen);
            this.main.main.classList.add(this.settings.openPosition === 'up' ? this.classes.openAbove : this.classes.openBelow);
            this.main.main.setAttribute('aria-expanded', 'true');
            this.moveContent();
            const selectedOptions = this.store.getSelectedOptions();
            if (selectedOptions.length) {
                const selectedId = selectedOptions[selectedOptions.length - 1].id;
                const selectedOption = this.content.list.querySelector('[data-id="' + selectedId + '"]');
                if (selectedOption) {
                    this.ensureElementInView(this.content.list, selectedOption);
                }
            }
        }
        close() {
            this.main.main.classList.remove(this.classes.openAbove);
            this.main.main.classList.remove(this.classes.openBelow);
            this.main.main.setAttribute('aria-expanded', 'false');
            this.content.main.classList.remove(this.classes.openAbove);
            this.content.main.classList.remove(this.classes.openBelow);
            this.main.arrow.path.setAttribute('d', this.classes.arrowClose);
        }
        updateClassStyles() {
            this.main.main.className = '';
            this.main.main.removeAttribute('style');
            this.content.main.className = '';
            this.content.main.removeAttribute('style');
            this.main.main.classList.add(this.classes.main);
            this.content.main.classList.add(this.classes.content);
            if (this.settings.style !== '') {
                this.main.main.style.cssText = this.settings.style;
                this.content.main.style.cssText = this.settings.style;
            }
            if (this.settings.class.length) {
                for (const c of this.settings.class) {
                    if (c.trim() !== '') {
                        this.main.main.classList.add(c.trim());
                        this.content.main.classList.add(c.trim());
                    }
                }
            }
            if (this.settings.contentPosition === 'relative') {
                this.content.main.classList.add('ss-' + this.settings.contentPosition);
            }
        }
        updateAriaAttributes() {
            this.main.main.role = 'combobox';
            this.main.main.setAttribute('aria-haspopup', 'listbox');
            this.main.main.setAttribute('aria-controls', this.content.main.id);
            this.main.main.setAttribute('aria-expanded', 'false');
            this.content.main.setAttribute('role', 'listbox');
        }
        mainDiv() {
            var _a;
            const main = document.createElement('div');
            main.dataset.id = this.settings.id;
            main.id = this.settings.id;
            main.tabIndex = 0;
            main.onkeydown = (e) => {
                switch (e.key) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                        this.callbacks.open();
                        e.key === 'ArrowDown' ? this.highlight('down') : this.highlight('up');
                        return false;
                    case 'Tab':
                        this.callbacks.close();
                        return true;
                    case 'Enter':
                    case ' ':
                        this.callbacks.open();
                        const highlighted = this.content.list.querySelector('.' + this.classes.highlighted);
                        if (highlighted) {
                            highlighted.click();
                        }
                        return false;
                    case 'Escape':
                        this.callbacks.close();
                        return false;
                }
            };
            main.onclick = (e) => {
                if (this.settings.disabled) {
                    return;
                }
                this.settings.isOpen ? this.callbacks.close() : this.callbacks.open();
            };
            const values = document.createElement('div');
            values.classList.add(this.classes.values);
            main.appendChild(values);
            const deselect = document.createElement('div');
            deselect.classList.add(this.classes.deselect);
            const selectedOptions = (_a = this.store) === null || _a === void 0 ? void 0 : _a.getSelectedOptions();
            if (!this.settings.allowDeselect || (this.settings.isMultiple && selectedOptions && selectedOptions.length <= 0)) {
                deselect.classList.add(this.classes.hide);
            }
            else {
                deselect.classList.remove(this.classes.hide);
            }
            deselect.onclick = (e) => {
                e.stopPropagation();
                if (this.settings.disabled) {
                    return;
                }
                let shouldDelete = true;
                const before = this.store.getSelectedOptions();
                const after = [];
                if (this.callbacks.beforeChange) {
                    shouldDelete = this.callbacks.beforeChange(after, before) === true;
                }
                if (shouldDelete) {
                    if (this.settings.isMultiple) {
                        this.callbacks.setSelected([], false);
                        this.updateDeselectAll();
                    }
                    else {
                        this.callbacks.setSelected([''], false);
                    }
                    if (this.settings.closeOnSelect) {
                        this.callbacks.close();
                    }
                    if (this.callbacks.afterChange) {
                        this.callbacks.afterChange(after);
                    }
                }
            };
            const deselectSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            deselectSvg.setAttribute('viewBox', '0 0 100 100');
            const deselectPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            deselectPath.setAttribute('d', this.classes.deselectPath);
            deselectSvg.appendChild(deselectPath);
            deselect.appendChild(deselectSvg);
            main.appendChild(deselect);
            const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            arrow.classList.add(this.classes.arrow);
            arrow.setAttribute('viewBox', '0 0 100 100');
            const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            arrowPath.setAttribute('d', this.classes.arrowClose);
            if (this.settings.alwaysOpen) {
                arrow.classList.add(this.classes.hide);
            }
            arrow.appendChild(arrowPath);
            main.appendChild(arrow);
            return {
                main: main,
                values: values,
                deselect: {
                    main: deselect,
                    svg: deselectSvg,
                    path: deselectPath,
                },
                arrow: {
                    main: arrow,
                    path: arrowPath,
                },
            };
        }
        mainFocus(eventType) {
            if (eventType !== 'click') {
                this.main.main.focus({ preventScroll: true });
            }
        }
        placeholder() {
            const placeholderOption = this.store.filter((o) => o.placeholder, false);
            let placeholderText = this.settings.placeholderText;
            if (placeholderOption.length) {
                if (placeholderOption[0].html !== '') {
                    placeholderText = placeholderOption[0].html;
                }
                else if (placeholderOption[0].text !== '') {
                    placeholderText = placeholderOption[0].text;
                }
            }
            const placeholder = document.createElement('div');
            placeholder.classList.add(this.classes.placeholder);
            placeholder.innerHTML = placeholderText;
            return placeholder;
        }
        renderValues() {
            if (!this.settings.isMultiple) {
                this.renderSingleValue();
                return;
            }
            this.renderMultipleValues();
        }
        renderSingleValue() {
            const selected = this.store.filter((o) => {
                return o.selected && !o.placeholder;
            }, false);
            const selectedSingle = selected.length > 0 ? selected[0] : null;
            if (!selectedSingle) {
                this.main.values.innerHTML = this.placeholder().outerHTML;
            }
            else {
                const singleValue = document.createElement('div');
                singleValue.classList.add(this.classes.single);
                if (selectedSingle.html) {
                    singleValue.innerHTML = selectedSingle.html;
                }
                else {
                    singleValue.innerText = selectedSingle.text;
                }
                this.main.values.innerHTML = singleValue.outerHTML;
            }
            if (!this.settings.allowDeselect || !selected.length) {
                this.main.deselect.main.classList.add(this.classes.hide);
            }
            else {
                this.main.deselect.main.classList.remove(this.classes.hide);
            }
        }
        renderMultipleValues() {
            let currentNodes = this.main.values.childNodes;
            let selectedOptions = this.store.filter((opt) => {
                return opt.selected && opt.display;
            }, false);
            if (selectedOptions.length === 0) {
                this.main.values.innerHTML = this.placeholder().outerHTML;
                return;
            }
            else {
                const placeholder = this.main.values.querySelector('.' + this.classes.placeholder);
                if (placeholder) {
                    placeholder.remove();
                }
            }
            if (selectedOptions.length > this.settings.maxValuesShown) {
                const singleValue = document.createElement('div');
                singleValue.classList.add(this.classes.max);
                singleValue.textContent = this.settings.maxValuesMessage.replace('{number}', selectedOptions.length.toString());
                this.main.values.innerHTML = singleValue.outerHTML;
                return;
            }
            else {
                const maxValuesMessage = this.main.values.querySelector('.' + this.classes.max);
                if (maxValuesMessage) {
                    maxValuesMessage.remove();
                }
            }
            let removeNodes = [];
            for (let i = 0; i < currentNodes.length; i++) {
                const node = currentNodes[i];
                const id = node.getAttribute('data-id');
                if (id) {
                    const found = selectedOptions.filter((opt) => {
                        return opt.id === id;
                    }, false);
                    if (!found.length) {
                        removeNodes.push(node);
                    }
                }
            }
            for (const n of removeNodes) {
                n.classList.add(this.classes.valueOut);
                setTimeout(() => {
                    if (this.main.values.hasChildNodes() && this.main.values.contains(n)) {
                        this.main.values.removeChild(n);
                    }
                }, 100);
            }
            currentNodes = this.main.values.childNodes;
            for (let d = 0; d < selectedOptions.length; d++) {
                let shouldAdd = true;
                for (let i = 0; i < currentNodes.length; i++) {
                    if (selectedOptions[d].id === String(currentNodes[i].dataset.id)) {
                        shouldAdd = false;
                    }
                }
                if (shouldAdd) {
                    if (currentNodes.length === 0) {
                        this.main.values.appendChild(this.multipleValue(selectedOptions[d]));
                    }
                    else if (d === 0) {
                        this.main.values.insertBefore(this.multipleValue(selectedOptions[d]), currentNodes[d]);
                    }
                    else {
                        currentNodes[d - 1].insertAdjacentElement('afterend', this.multipleValue(selectedOptions[d]));
                    }
                }
            }
            this.updateDeselectAll();
        }
        multipleValue(option) {
            const value = document.createElement('div');
            value.classList.add(this.classes.value);
            value.dataset.id = option.id;
            const text = document.createElement('div');
            text.classList.add(this.classes.valueText);
            text.innerText = option.text;
            value.appendChild(text);
            if (!option.mandatory) {
                const deleteDiv = document.createElement('div');
                deleteDiv.classList.add(this.classes.valueDelete);
                deleteDiv.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.settings.disabled) {
                        return;
                    }
                    let shouldDelete = true;
                    const before = this.store.getSelectedOptions();
                    const after = before.filter((o) => {
                        return o.selected && o.id !== option.id;
                    }, true);
                    if (this.settings.minSelected && after.length < this.settings.minSelected) {
                        return;
                    }
                    if (this.callbacks.beforeChange) {
                        shouldDelete = this.callbacks.beforeChange(after, before) === true;
                    }
                    if (shouldDelete) {
                        let selectedValues = [];
                        for (const o of after) {
                            if (o instanceof Optgroup) {
                                for (const c of o.options) {
                                    selectedValues.push(c.value);
                                }
                            }
                            if (o instanceof Option) {
                                selectedValues.push(o.value);
                            }
                        }
                        this.callbacks.setSelected(selectedValues, false);
                        if (this.settings.closeOnSelect) {
                            this.callbacks.close();
                        }
                        if (this.callbacks.afterChange) {
                            this.callbacks.afterChange(after);
                        }
                        this.updateDeselectAll();
                    }
                };
                const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                deleteSvg.setAttribute('viewBox', '0 0 100 100');
                const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                deletePath.setAttribute('d', this.classes.optionDelete);
                deleteSvg.appendChild(deletePath);
                deleteDiv.appendChild(deleteSvg);
                value.appendChild(deleteDiv);
            }
            return value;
        }
        contentDiv() {
            const main = document.createElement('div');
            main.dataset.id = this.settings.id;
            main.id = this.settings.id;
            const search = this.searchDiv();
            main.appendChild(search.main);
            const list = this.listDiv();
            main.appendChild(list);
            return {
                main: main,
                search: search,
                list: list,
            };
        }
        moveContent() {
            if (this.settings.contentPosition === 'relative') {
                this.moveContentBelow();
                return;
            }
            if (this.settings.openPosition === 'down') {
                this.moveContentBelow();
                return;
            }
            else if (this.settings.openPosition === 'up') {
                this.moveContentAbove();
                return;
            }
            if (this.putContent() === 'up') {
                this.moveContentAbove();
            }
            else {
                this.moveContentBelow();
            }
        }
        searchDiv() {
            const main = document.createElement('div');
            const input = document.createElement('input');
            const addable = document.createElement('div');
            main.classList.add(this.classes.search);
            const searchReturn = {
                main,
                input,
            };
            if (!this.settings.showSearch) {
                main.classList.add(this.classes.hide);
                input.readOnly = true;
            }
            input.type = 'search';
            input.placeholder = this.settings.searchPlaceholder;
            input.tabIndex = -1;
            input.setAttribute('aria-label', this.settings.searchPlaceholder);
            input.setAttribute('autocapitalize', 'off');
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('autocorrect', 'off');
            input.oninput = debounce((e) => {
                this.callbacks.search(e.target.value);
            }, 100);
            input.onkeydown = (e) => {
                switch (e.key) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                        e.key === 'ArrowDown' ? this.highlight('down') : this.highlight('up');
                        return false;
                    case 'Tab':
                        this.callbacks.close();
                        return true;
                    case 'Escape':
                        this.callbacks.close();
                        return false;
                    case 'Enter':
                    case ' ':
                        if (this.callbacks.addable && e.ctrlKey) {
                            addable.click();
                            return false;
                        }
                        else {
                            const highlighted = this.content.list.querySelector('.' + this.classes.highlighted);
                            if (highlighted) {
                                highlighted.click();
                                return false;
                            }
                        }
                        return true;
                }
            };
            main.appendChild(input);
            if (this.callbacks.addable) {
                addable.classList.add(this.classes.addable);
                const plus = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                plus.setAttribute('viewBox', '0 0 100 100');
                const plusPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                plusPath.setAttribute('d', this.classes.addablePath);
                plus.appendChild(plusPath);
                addable.appendChild(plus);
                addable.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!this.callbacks.addable) {
                        return;
                    }
                    const inputValue = this.content.search.input.value.trim();
                    if (inputValue === '') {
                        this.content.search.input.focus();
                        return;
                    }
                    const runFinish = (oo) => {
                        let newOption = new Option(oo);
                        this.callbacks.addOption(newOption);
                        if (this.settings.isMultiple) {
                            let values = this.store.getSelected();
                            values.push(newOption.value);
                            this.callbacks.setSelected(values, true);
                        }
                        else {
                            this.callbacks.setSelected([newOption.value], true);
                        }
                        this.callbacks.search('');
                        if (this.settings.closeOnSelect) {
                            setTimeout(() => {
                                this.callbacks.close();
                            }, 100);
                        }
                    };
                    const addableValue = this.callbacks.addable(inputValue);
                    if (addableValue === false || addableValue === undefined || addableValue === null) {
                        return;
                    }
                    if (addableValue instanceof Promise) {
                        addableValue.then((value) => {
                            if (typeof value === 'string') {
                                runFinish({
                                    text: value,
                                    value: value,
                                });
                            }
                            else {
                                runFinish(value);
                            }
                        });
                    }
                    else if (typeof addableValue === 'string') {
                        runFinish({
                            text: addableValue,
                            value: addableValue,
                        });
                    }
                    else {
                        runFinish(addableValue);
                    }
                    return;
                };
                main.appendChild(addable);
                searchReturn.addable = {
                    main: addable,
                    svg: plus,
                    path: plusPath,
                };
            }
            return searchReturn;
        }
        searchFocus() {
            this.content.search.input.focus();
        }
        getOptions(notPlaceholder = false, notDisabled = false, notHidden = false) {
            let query = '.' + this.classes.option;
            if (notPlaceholder) {
                query += ':not(.' + this.classes.placeholder + ')';
            }
            if (notDisabled) {
                query += ':not(.' + this.classes.disabled + ')';
            }
            if (notHidden) {
                query += ':not(.' + this.classes.hide + ')';
            }
            return Array.from(this.content.list.querySelectorAll(query));
        }
        highlight(dir) {
            const options = this.getOptions(true, true, true);
            if (options.length === 0) {
                return;
            }
            if (options.length === 1) {
                if (!options[0].classList.contains(this.classes.highlighted)) {
                    options[0].classList.add(this.classes.highlighted);
                    return;
                }
            }
            for (let i = 0; i < options.length; i++) {
                if (options[i].classList.contains(this.classes.highlighted)) {
                    const prevOption = options[i];
                    prevOption.classList.remove(this.classes.highlighted);
                    const prevParent = prevOption.parentElement;
                    if (prevParent && prevParent.classList.contains(this.classes.open)) {
                        const optgroupLabel = prevParent.querySelector('.' + this.classes.optgroupLabel);
                        if (optgroupLabel) {
                            optgroupLabel.click();
                        }
                    }
                    let selectOption = options[dir === 'down' ? (i + 1 < options.length ? i + 1 : 0) : i - 1 >= 0 ? i - 1 : options.length - 1];
                    selectOption.classList.add(this.classes.highlighted);
                    this.ensureElementInView(this.content.list, selectOption);
                    const selectParent = selectOption.parentElement;
                    if (selectParent && selectParent.classList.contains(this.classes.close)) {
                        const optgroupLabel = selectParent.querySelector('.' + this.classes.optgroupLabel);
                        if (optgroupLabel) {
                            optgroupLabel.click();
                        }
                    }
                    return;
                }
            }
            options[dir === 'down' ? 0 : options.length - 1].classList.add(this.classes.highlighted);
            this.ensureElementInView(this.content.list, options[dir === 'down' ? 0 : options.length - 1]);
        }
        listDiv() {
            const options = document.createElement('div');
            options.classList.add(this.classes.list);
            return options;
        }
        renderError(error) {
            this.content.list.innerHTML = '';
            const errorDiv = document.createElement('div');
            errorDiv.classList.add(this.classes.error);
            errorDiv.textContent = error;
            this.content.list.appendChild(errorDiv);
        }
        renderSearching() {
            this.content.list.innerHTML = '';
            const searchingDiv = document.createElement('div');
            searchingDiv.classList.add(this.classes.searching);
            searchingDiv.textContent = this.settings.searchingText;
            this.content.list.appendChild(searchingDiv);
        }
        renderOptions(data) {
            this.content.list.innerHTML = '';
            if (data.length === 0) {
                const noResults = document.createElement('div');
                noResults.classList.add(this.classes.search);
                noResults.innerHTML = this.settings.searchText;
                this.content.list.appendChild(noResults);
                return;
            }
            for (const d of data) {
                if (d instanceof Optgroup) {
                    const optgroupEl = document.createElement('div');
                    optgroupEl.classList.add(this.classes.optgroup);
                    const optgroupLabel = document.createElement('div');
                    optgroupLabel.classList.add(this.classes.optgroupLabel);
                    optgroupEl.appendChild(optgroupLabel);
                    const optgroupLabelText = document.createElement('div');
                    optgroupLabelText.classList.add(this.classes.optgroupLabelText);
                    optgroupLabelText.textContent = d.label;
                    optgroupLabel.appendChild(optgroupLabelText);
                    const optgroupActions = document.createElement('div');
                    optgroupActions.classList.add(this.classes.optgroupActions);
                    optgroupLabel.appendChild(optgroupActions);
                    if (this.settings.isMultiple && d.selectAll) {
                        const selectAll = document.createElement('div');
                        selectAll.classList.add(this.classes.optgroupSelectAll);
                        let allSelected = true;
                        for (const o of d.options) {
                            if (!o.selected) {
                                allSelected = false;
                                break;
                            }
                        }
                        if (allSelected) {
                            selectAll.classList.add(this.classes.selected);
                        }
                        const selectAllText = document.createElement('span');
                        selectAllText.textContent = d.selectAllText;
                        selectAll.appendChild(selectAllText);
                        const selectAllSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        selectAllSvg.setAttribute('viewBox', '0 0 100 100');
                        selectAll.appendChild(selectAllSvg);
                        const selectAllBox = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        selectAllBox.setAttribute('d', this.classes.optgroupSelectAllBox);
                        selectAllSvg.appendChild(selectAllBox);
                        const selectAllCheck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        selectAllCheck.setAttribute('d', this.classes.optgroupSelectAllCheck);
                        selectAllSvg.appendChild(selectAllCheck);
                        selectAll.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const currentSelected = this.store.getSelected();
                            if (allSelected) {
                                const newSelected = currentSelected.filter((s) => {
                                    for (const o of d.options) {
                                        if (s === o.value) {
                                            return false;
                                        }
                                    }
                                    return true;
                                });
                                this.callbacks.setSelected(newSelected, true);
                                return;
                            }
                            else {
                                const newSelected = currentSelected.concat(d.options.map((o) => o.value));
                                for (const o of d.options) {
                                    if (!this.store.getOptionByID(o.id)) {
                                        this.callbacks.addOption(o);
                                    }
                                }
                                this.callbacks.setSelected(newSelected, true);
                                return;
                            }
                        });
                        optgroupActions.appendChild(selectAll);
                    }
                    if (d.closable !== 'off') {
                        const optgroupClosable = document.createElement('div');
                        optgroupClosable.classList.add(this.classes.optgroupClosable);
                        const optgroupClosableSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                        optgroupClosableSvg.setAttribute('viewBox', '0 0 100 100');
                        optgroupClosableSvg.classList.add(this.classes.arrow);
                        optgroupClosable.appendChild(optgroupClosableSvg);
                        const optgroupClosableArrow = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                        optgroupClosableSvg.appendChild(optgroupClosableArrow);
                        if (d.options.some((o) => o.selected) || this.content.search.input.value.trim() !== '') {
                            optgroupClosable.classList.add(this.classes.open);
                            optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen);
                        }
                        else if (d.closable === 'open') {
                            optgroupEl.classList.add(this.classes.open);
                            optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen);
                        }
                        else if (d.closable === 'close') {
                            optgroupEl.classList.add(this.classes.close);
                            optgroupClosableArrow.setAttribute('d', this.classes.arrowClose);
                        }
                        optgroupLabel.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (optgroupEl.classList.contains(this.classes.close)) {
                                optgroupEl.classList.remove(this.classes.close);
                                optgroupEl.classList.add(this.classes.open);
                                optgroupClosableArrow.setAttribute('d', this.classes.arrowOpen);
                            }
                            else {
                                optgroupEl.classList.remove(this.classes.open);
                                optgroupEl.classList.add(this.classes.close);
                                optgroupClosableArrow.setAttribute('d', this.classes.arrowClose);
                            }
                        });
                        optgroupActions.appendChild(optgroupClosable);
                    }
                    optgroupEl.appendChild(optgroupLabel);
                    for (const o of d.options) {
                        optgroupEl.appendChild(this.option(o));
                    }
                    this.content.list.appendChild(optgroupEl);
                }
                if (d instanceof Option) {
                    this.content.list.appendChild(this.option(d));
                }
            }
        }
        option(option) {
            if (option.placeholder) {
                const placeholder = document.createElement('div');
                placeholder.classList.add(this.classes.option);
                placeholder.classList.add(this.classes.hide);
                return placeholder;
            }
            const optionEl = document.createElement('div');
            optionEl.dataset.id = option.id;
            optionEl.id = option.id;
            optionEl.classList.add(this.classes.option);
            optionEl.setAttribute('role', 'option');
            if (option.class) {
                option.class.split(' ').forEach((dataClass) => {
                    optionEl.classList.add(dataClass);
                });
            }
            if (option.style) {
                optionEl.style.cssText = option.style;
            }
            if (this.settings.searchHighlight && this.content.search.input.value.trim() !== '') {
                optionEl.innerHTML = this.highlightText(option.html !== '' ? option.html : option.text, this.content.search.input.value, this.classes.searchHighlighter);
            }
            else if (option.html !== '') {
                optionEl.innerHTML = option.html;
            }
            else {
                optionEl.textContent = option.text;
            }
            if (this.settings.showOptionTooltips && optionEl.textContent) {
                optionEl.setAttribute('title', optionEl.textContent);
            }
            if (!option.display) {
                optionEl.classList.add(this.classes.hide);
            }
            if (option.disabled) {
                optionEl.classList.add(this.classes.disabled);
            }
            if (option.selected && this.settings.hideSelected) {
                optionEl.classList.add(this.classes.hide);
            }
            if (option.selected) {
                optionEl.classList.add(this.classes.selected);
                optionEl.setAttribute('aria-selected', 'true');
                this.main.main.setAttribute('aria-activedescendant', optionEl.id);
            }
            else {
                optionEl.classList.remove(this.classes.selected);
                optionEl.setAttribute('aria-selected', 'false');
            }
            optionEl.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const selectedOptions = this.store.getSelected();
                const element = e.currentTarget;
                const elementID = String(element.dataset.id);
                if (option.disabled || (option.selected && !this.settings.allowDeselect)) {
                    return;
                }
                if ((this.settings.isMultiple && this.settings.maxSelected <= selectedOptions.length && !option.selected) ||
                    (this.settings.isMultiple && this.settings.minSelected >= selectedOptions.length && option.selected)) {
                    return;
                }
                let shouldUpdate = false;
                const before = this.store.getSelectedOptions();
                let after = [];
                if (this.settings.isMultiple) {
                    if (option.selected) {
                        after = before.filter((o) => o.id !== elementID);
                    }
                    else {
                        after = before.concat(option);
                    }
                }
                if (!this.settings.isMultiple) {
                    if (option.selected) {
                        after = [];
                    }
                    else {
                        after = [option];
                    }
                }
                if (!this.callbacks.beforeChange) {
                    shouldUpdate = true;
                }
                if (this.callbacks.beforeChange) {
                    if (this.callbacks.beforeChange(after, before) === false) {
                        shouldUpdate = false;
                    }
                    else {
                        shouldUpdate = true;
                    }
                }
                if (shouldUpdate) {
                    if (!this.store.getOptionByID(elementID)) {
                        this.callbacks.addOption(option);
                    }
                    this.callbacks.setSelected(after.map((o) => o.value), false);
                    if (this.settings.closeOnSelect) {
                        this.callbacks.close();
                    }
                    if (this.callbacks.afterChange) {
                        this.callbacks.afterChange(after);
                    }
                }
            });
            return optionEl;
        }
        destroy() {
            this.main.main.remove();
            this.content.main.remove();
        }
        highlightText(str, search, className) {
            let completedString = str;
            const regex = new RegExp('(' + search.trim() + ')(?![^<]*>[^<>]*</)', 'i');
            if (!str.match(regex)) {
                return str;
            }
            const matchStartPosition = str.match(regex).index;
            const matchEndPosition = matchStartPosition + str.match(regex)[0].toString().length;
            const originalTextFoundByRegex = str.substring(matchStartPosition, matchEndPosition);
            completedString = completedString.replace(regex, `<mark class="${className}">${originalTextFoundByRegex}</mark>`);
            return completedString;
        }
        moveContentAbove() {
            const mainHeight = this.main.main.offsetHeight;
            const contentHeight = this.content.main.offsetHeight;
            this.main.main.classList.remove(this.classes.openBelow);
            this.main.main.classList.add(this.classes.openAbove);
            this.content.main.classList.remove(this.classes.openBelow);
            this.content.main.classList.add(this.classes.openAbove);
            const containerRect = this.main.main.getBoundingClientRect();
            this.content.main.style.margin = '-' + (mainHeight + contentHeight - 1) + 'px 0px 0px 0px';
            this.content.main.style.top = containerRect.top + containerRect.height + window.scrollY + 'px';
            this.content.main.style.left = containerRect.left + window.scrollX + 'px';
            this.content.main.style.width = containerRect.width + 'px';
        }
        moveContentBelow() {
            this.main.main.classList.remove(this.classes.openAbove);
            this.main.main.classList.add(this.classes.openBelow);
            this.content.main.classList.remove(this.classes.openAbove);
            this.content.main.classList.add(this.classes.openBelow);
            const containerRect = this.main.main.getBoundingClientRect();
            this.content.main.style.margin = '-1px 0px 0px 0px';
            if (this.settings.contentPosition !== 'relative') {
                this.content.main.style.top = containerRect.top + containerRect.height + window.scrollY + 'px';
                this.content.main.style.left = containerRect.left + window.scrollX + 'px';
                this.content.main.style.width = containerRect.width + 'px';
            }
        }
        ensureElementInView(container, element) {
            const cTop = container.scrollTop + container.offsetTop;
            const cBottom = cTop + container.clientHeight;
            const eTop = element.offsetTop;
            const eBottom = eTop + element.clientHeight;
            if (eTop < cTop) {
                container.scrollTop -= cTop - eTop;
            }
            else if (eBottom > cBottom) {
                container.scrollTop += eBottom - cBottom;
            }
        }
        putContent() {
            const mainHeight = this.main.main.offsetHeight;
            const mainRect = this.main.main.getBoundingClientRect();
            const contentHeight = this.content.main.offsetHeight;
            const spaceBelow = window.innerHeight - (mainRect.top + mainHeight);
            if (spaceBelow <= contentHeight) {
                if (mainRect.top > contentHeight) {
                    return 'up';
                }
                else {
                    return 'down';
                }
            }
            return 'down';
        }
        updateDeselectAll() {
            if (!this.store || !this.settings) {
                return;
            }
            const selected = this.store.getSelectedOptions();
            const hasSelectedItems = selected && selected.length > 0;
            const isMultiple = this.settings.isMultiple;
            const allowDeselect = this.settings.allowDeselect;
            const deselectButton = this.main.deselect.main;
            const hideClass = this.classes.hide;
            if (allowDeselect && !(isMultiple && !hasSelectedItems)) {
                deselectButton.classList.remove(hideClass);
            }
            else {
                deselectButton.classList.add(hideClass);
            }
        }
    }

    class Select {
        constructor(select) {
            this.listen = false;
            this.observer = null;
            this.select = select;
            this.select.addEventListener('change', this.valueChange.bind(this), {
                passive: true,
            });
            this.observer = new MutationObserver(this.observeCall.bind(this));
            this.changeListen(true);
        }
        enable() {
            this.select.disabled = false;
        }
        disable() {
            this.select.disabled = true;
        }
        hideUI() {
            this.select.tabIndex = -1;
            this.select.style.display = 'none';
            this.select.setAttribute('aria-hidden', 'true');
        }
        showUI() {
            this.select.removeAttribute('tabindex');
            this.select.style.display = '';
            this.select.removeAttribute('aria-hidden');
        }
        changeListen(listen) {
            this.listen = listen;
            if (listen) {
                if (this.observer) {
                    this.observer.observe(this.select, {
                        subtree: true,
                        childList: true,
                        attributes: true,
                    });
                }
            }
            if (!listen) {
                if (this.observer) {
                    this.observer.disconnect();
                }
            }
        }
        valueChange(ev) {
            if (this.listen && this.onValueChange) {
                this.onValueChange(this.getSelectedValues());
            }
            return true;
        }
        observeCall(mutations) {
            if (!this.listen) {
                return;
            }
            let classChanged = false;
            let disabledChanged = false;
            let optgroupOptionChanged = false;
            for (const m of mutations) {
                if (m.target === this.select) {
                    if (m.attributeName === 'disabled') {
                        disabledChanged = true;
                    }
                    if (m.attributeName === 'class') {
                        classChanged = true;
                    }
                }
                if (m.target.nodeName === 'OPTGROUP' || m.target.nodeName === 'OPTION') {
                    optgroupOptionChanged = true;
                }
            }
            if (classChanged && this.onClassChange) {
                this.onClassChange(this.select.className.split(' '));
            }
            if (disabledChanged && this.onDisabledChange) {
                this.changeListen(false);
                this.onDisabledChange(this.select.disabled);
                this.changeListen(true);
            }
            if (optgroupOptionChanged && this.onOptionsChange) {
                this.changeListen(false);
                this.onOptionsChange(this.getData());
                this.changeListen(true);
            }
        }
        getData() {
            let data = [];
            const nodes = this.select.childNodes;
            for (const n of nodes) {
                if (n.nodeName === 'OPTGROUP') {
                    data.push(this.getDataFromOptgroup(n));
                }
                if (n.nodeName === 'OPTION') {
                    data.push(this.getDataFromOption(n));
                }
            }
            return data;
        }
        getDataFromOptgroup(optgroup) {
            let data = {
                id: optgroup.id,
                label: optgroup.label,
                selectAll: optgroup.dataset ? optgroup.dataset.selectall === 'true' : false,
                selectAllText: optgroup.dataset ? optgroup.dataset.selectalltext : 'Select all',
                closable: optgroup.dataset ? optgroup.dataset.closable : 'off',
                options: [],
            };
            const options = optgroup.childNodes;
            for (const o of options) {
                if (o.nodeName === 'OPTION') {
                    data.options.push(this.getDataFromOption(o));
                }
            }
            return data;
        }
        getDataFromOption(option) {
            return {
                id: option.id,
                value: option.value,
                text: option.text,
                html: option.dataset && option.dataset.html ? option.dataset.html : '',
                selected: option.selected,
                display: option.style.display === 'none' ? false : true,
                disabled: option.disabled,
                mandatory: option.dataset ? option.dataset.mandatory === 'true' : false,
                placeholder: option.dataset.placeholder === 'true',
                class: option.className,
                style: option.style.cssText,
                data: option.dataset,
            };
        }
        getSelectedValues() {
            let values = [];
            const options = this.select.childNodes;
            for (const o of options) {
                if (o.nodeName === 'OPTGROUP') {
                    const optgroupOptions = o.childNodes;
                    for (const oo of optgroupOptions) {
                        if (oo.nodeName === 'OPTION') {
                            const option = oo;
                            if (option.selected) {
                                values.push(option.value);
                            }
                        }
                    }
                }
                if (o.nodeName === 'OPTION') {
                    const option = o;
                    if (option.selected) {
                        values.push(option.value);
                    }
                }
            }
            return values;
        }
        setSelected(value) {
            this.changeListen(false);
            const options = this.select.childNodes;
            for (const o of options) {
                if (o.nodeName === 'OPTGROUP') {
                    const optgroup = o;
                    const optgroupOptions = optgroup.childNodes;
                    for (const oo of optgroupOptions) {
                        if (oo.nodeName === 'OPTION') {
                            const option = oo;
                            option.selected = value.includes(option.value);
                        }
                    }
                }
                if (o.nodeName === 'OPTION') {
                    const option = o;
                    option.selected = value.includes(option.value);
                }
            }
            this.changeListen(true);
        }
        updateSelect(id, style, classes) {
            this.changeListen(false);
            if (id) {
                this.select.dataset.id = id;
            }
            if (style) {
                this.select.style.cssText = style;
            }
            if (classes) {
                this.select.className = '';
                classes.forEach((c) => {
                    if (c.trim() !== '') {
                        this.select.classList.add(c.trim());
                    }
                });
            }
            this.changeListen(true);
        }
        updateOptions(data) {
            this.changeListen(false);
            this.select.innerHTML = '';
            for (const d of data) {
                if (d instanceof Optgroup) {
                    this.select.appendChild(this.createOptgroup(d));
                }
                if (d instanceof Option) {
                    this.select.appendChild(this.createOption(d));
                }
            }
            this.select.dispatchEvent(new Event('change'));
            this.changeListen(true);
        }
        createOptgroup(optgroup) {
            const optgroupEl = document.createElement('optgroup');
            optgroupEl.id = optgroup.id;
            optgroupEl.label = optgroup.label;
            if (optgroup.selectAll) {
                optgroupEl.dataset.selectAll = 'true';
            }
            if (optgroup.closable !== 'off') {
                optgroupEl.dataset.closable = optgroup.closable;
            }
            if (optgroup.options) {
                for (const o of optgroup.options) {
                    optgroupEl.appendChild(this.createOption(o));
                }
            }
            return optgroupEl;
        }
        createOption(info) {
            const optionEl = document.createElement('option');
            optionEl.id = info.id;
            optionEl.value = info.value;
            optionEl.innerHTML = info.text;
            if (info.html !== '') {
                optionEl.setAttribute('data-html', info.html);
            }
            if (info.selected) {
                optionEl.selected = info.selected;
            }
            if (info.disabled) {
                optionEl.disabled = true;
            }
            if (info.display === false) {
                optionEl.style.display = 'none';
            }
            if (info.placeholder) {
                optionEl.setAttribute('data-placeholder', 'true');
            }
            if (info.mandatory) {
                optionEl.setAttribute('data-mandatory', 'true');
            }
            if (info.class) {
                info.class.split(' ').forEach((optionClass) => {
                    optionEl.classList.add(optionClass);
                });
            }
            if (info.data && typeof info.data === 'object') {
                Object.keys(info.data).forEach((key) => {
                    optionEl.setAttribute('data-' + kebabCase(key), info.data[key]);
                });
            }
            return optionEl;
        }
        destroy() {
            this.changeListen(false);
            this.select.removeEventListener('change', this.valueChange.bind(this));
            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }
            delete this.select.dataset.id;
            this.showUI();
        }
    }

    class SlimSelect {
        constructor(config) {
            var _a;
            this.events = {
                search: undefined,
                searchFilter: (opt, search) => {
                    return opt.text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                },
                addable: undefined,
                beforeChange: undefined,
                afterChange: undefined,
                beforeOpen: undefined,
                afterOpen: undefined,
                beforeClose: undefined,
                afterClose: undefined,
            };
            this.windowResize = debounce(() => {
                if (!this.settings.isOpen && !this.settings.isFullOpen) {
                    return;
                }
                this.render.moveContent();
            });
            this.windowScroll = debounce(() => {
                if (!this.settings.isOpen && !this.settings.isFullOpen) {
                    return;
                }
                this.render.moveContent();
            });
            this.documentClick = (e) => {
                if (!this.settings.isOpen) {
                    return;
                }
                if (e.target && !hasClassInTree(e.target, this.settings.id)) {
                    this.close(e.type);
                }
            };
            this.windowVisibilityChange = () => {
                if (document.hidden) {
                    this.close();
                }
            };
            this.selectEl = (typeof config.select === 'string' ? document.querySelector(config.select) : config.select);
            if (!this.selectEl) {
                if (config.events && config.events.error) {
                    config.events.error(new Error('Could not find select element'));
                }
                return;
            }
            if (this.selectEl.tagName !== 'SELECT') {
                if (config.events && config.events.error) {
                    config.events.error(new Error('Element isnt of type select'));
                }
                return;
            }
            if (this.selectEl.dataset.ssid) {
                this.destroy();
            }
            this.settings = new Settings(config.settings);
            const debounceEvents = ['afterChange', 'beforeOpen', 'afterOpen', 'beforeClose', 'afterClose'];
            for (const key in config.events) {
                if (!config.events.hasOwnProperty(key)) {
                    continue;
                }
                if (debounceEvents.indexOf(key) !== -1) {
                    this.events[key] = debounce(config.events[key], 100);
                }
                else {
                    this.events[key] = config.events[key];
                }
            }
            this.settings.disabled = ((_a = config.settings) === null || _a === void 0 ? void 0 : _a.disabled) ? config.settings.disabled : this.selectEl.disabled;
            this.settings.isMultiple = this.selectEl.multiple;
            this.settings.style = this.selectEl.style.cssText;
            this.settings.class = this.selectEl.className.split(' ');
            this.select = new Select(this.selectEl);
            this.select.updateSelect(this.settings.id, this.settings.style, this.settings.class);
            this.select.hideUI();
            this.select.onValueChange = (values) => {
                this.setSelected(values);
            };
            this.select.onClassChange = (classes) => {
                this.settings.class = classes;
                this.render.updateClassStyles();
            };
            this.select.onDisabledChange = (disabled) => {
                if (disabled) {
                    this.disable();
                }
                else {
                    this.enable();
                }
            };
            this.select.onOptionsChange = (data) => {
                this.setData(data);
            };
            this.store = new Store(this.settings.isMultiple ? 'multiple' : 'single', config.data ? config.data : this.select.getData());
            if (config.data) {
                this.select.updateOptions(this.store.getData());
            }
            const callbacks = {
                open: this.open.bind(this),
                close: this.close.bind(this),
                addable: this.events.addable ? this.events.addable : undefined,
                setSelected: this.setSelected.bind(this),
                addOption: this.addOption.bind(this),
                search: this.search.bind(this),
                beforeChange: this.events.beforeChange,
                afterChange: this.events.afterChange,
            };
            this.render = new Render(this.settings, this.store, callbacks);
            this.render.renderValues();
            this.render.renderOptions(this.store.getData());
            const selectAriaLabel = this.selectEl.getAttribute('aria-label');
            const selectAriaLabelledBy = this.selectEl.getAttribute('aria-labelledby');
            if (selectAriaLabel) {
                this.render.main.main.setAttribute('aria-label', selectAriaLabel);
            }
            else if (selectAriaLabelledBy) {
                this.render.main.main.setAttribute('aria-labelledby', selectAriaLabelledBy);
            }
            if (this.selectEl.parentNode) {
                this.selectEl.parentNode.insertBefore(this.render.main.main, this.selectEl.nextSibling);
            }
            document.addEventListener('click', this.documentClick);
            window.addEventListener('resize', this.windowResize, false);
            if (this.settings.openPosition === 'auto') {
                window.addEventListener('scroll', this.windowScroll, false);
            }
            document.addEventListener('visibilitychange', this.windowVisibilityChange);
            if (this.settings.disabled) {
                this.disable();
            }
            if (this.settings.alwaysOpen) {
                this.open();
            }
            this.selectEl.slim = this;
        }
        enable() {
            this.settings.disabled = false;
            this.select.enable();
            this.render.enable();
        }
        disable() {
            this.settings.disabled = true;
            this.select.disable();
            this.render.disable();
        }
        getData() {
            return this.store.getData();
        }
        setData(data) {
            const selected = this.store.getSelected();
            const err = this.store.validateDataArray(data);
            if (err) {
                if (this.events.error) {
                    this.events.error(err);
                }
                return;
            }
            this.store.setData(data);
            const dataClean = this.store.getData();
            this.select.updateOptions(dataClean);
            this.render.renderValues();
            this.render.renderOptions(dataClean);
            if (this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
                this.events.afterChange(this.store.getSelectedOptions());
            }
        }
        getSelected() {
            return this.store.getSelected();
        }
        setSelected(value, runAfterChange = true) {
            const selected = this.store.getSelected();
            this.store.setSelectedBy('value', Array.isArray(value) ? value : [value]);
            const data = this.store.getData();
            this.select.updateOptions(data);
            this.render.renderValues();
            if (this.render.content.search.input.value !== '') {
                this.search(this.render.content.search.input.value);
            }
            else {
                this.render.renderOptions(data);
            }
            if (runAfterChange && this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
                this.events.afterChange(this.store.getSelectedOptions());
            }
        }
        addOption(option) {
            const selected = this.store.getSelected();
            if (!this.store.getDataOptions().some((o) => { var _a; return o.value === ((_a = option.value) !== null && _a !== void 0 ? _a : option.text); })) {
                this.store.addOption(option);
            }
            const data = this.store.getData();
            this.select.updateOptions(data);
            this.render.renderValues();
            this.render.renderOptions(data);
            if (this.events.afterChange && !isEqual(selected, this.store.getSelected())) {
                this.events.afterChange(this.store.getSelectedOptions());
            }
        }
        open() {
            if (this.settings.disabled || this.settings.isOpen) {
                return;
            }
            if (this.events.beforeOpen) {
                this.events.beforeOpen();
            }
            this.render.open();
            if (this.settings.showSearch) {
                this.render.searchFocus();
            }
            this.settings.isOpen = true;
            setTimeout(() => {
                if (this.events.afterOpen) {
                    this.events.afterOpen();
                }
                if (this.settings.isOpen) {
                    this.settings.isFullOpen = true;
                }
            }, this.settings.timeoutDelay);
            if (this.settings.contentPosition === 'absolute') {
                if (this.settings.intervalMove) {
                    clearInterval(this.settings.intervalMove);
                }
                this.settings.intervalMove = setInterval(this.render.moveContent.bind(this.render), 500);
            }
        }
        close(eventType = null) {
            if (!this.settings.isOpen || this.settings.alwaysOpen) {
                return;
            }
            if (this.events.beforeClose) {
                this.events.beforeClose();
            }
            this.render.close();
            if (this.render.content.search.input.value !== '') {
                this.search('');
            }
            this.render.mainFocus(eventType);
            this.settings.isOpen = false;
            this.settings.isFullOpen = false;
            setTimeout(() => {
                if (this.events.afterClose) {
                    this.events.afterClose();
                }
            }, this.settings.timeoutDelay);
            if (this.settings.intervalMove) {
                clearInterval(this.settings.intervalMove);
            }
        }
        search(value) {
            if (this.render.content.search.input.value !== value) {
                this.render.content.search.input.value = value;
            }
            if (!this.events.search) {
                this.render.renderOptions(value === '' ? this.store.getData() : this.store.search(value, this.events.searchFilter));
                return;
            }
            this.render.renderSearching();
            const searchResp = this.events.search(value, this.store.getSelectedOptions());
            if (searchResp instanceof Promise) {
                searchResp
                    .then((data) => {
                    this.render.renderOptions(this.store.partialToFullData(data));
                })
                    .catch((err) => {
                    this.render.renderError(typeof err === 'string' ? err : err.message);
                });
                return;
            }
            else if (Array.isArray(searchResp)) {
                this.render.renderOptions(this.store.partialToFullData(searchResp));
            }
            else {
                this.render.renderError('Search event must return a promise or an array of data');
            }
        }
        destroy() {
            document.removeEventListener('click', this.documentClick);
            window.removeEventListener('resize', this.windowResize, false);
            if (this.settings.openPosition === 'auto') {
                window.removeEventListener('scroll', this.windowScroll, false);
            }
            document.removeEventListener('visibilitychange', this.windowVisibilityChange);
            this.store.setData([]);
            this.render.destroy();
            this.select.destroy();
        }
    }

    return SlimSelect;

})();
