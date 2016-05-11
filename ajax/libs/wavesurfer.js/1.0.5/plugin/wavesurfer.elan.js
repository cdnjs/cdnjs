'use strict';

WaveSurfer.ELAN = {
    Types: {
        ALIGNABLE_ANNOTATION: 'ALIGNABLE_ANNOTATION',
        REF_ANNOTATION: 'REF_ANNOTATION'
    },

    init: function (params) {
        this.data = null;
        this.params = params;
        this.container = 'string' == typeof params.container ?
            document.querySelector(params.container) : params.container;

        if (!this.container) {
            throw Error('No container for ELAN');
        }

        this.bindClick();

        if (params.url) {
            this.load(params.url);
        }
    },

    load: function (url) {
        var my = this;
        this.loadXML(url, function (xml) {
            my.data = my.parseElan(xml);
            my.render();
            my.fireEvent('ready', my.data);
        });
    },

    loadXML: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'document';
        xhr.send();
        xhr.addEventListener('load', function (e) {
            callback && callback(e.target.responseXML);
        });
    },

    parseElan: function (xml) {
        var _forEach = Array.prototype.forEach;
        var _map = Array.prototype.map;

        var data = {
            media: {},
            timeOrder: {},
            tiers: [],
            annotations: {},
            alignableAnnotations: []
        };

        var header = xml.querySelector('HEADER');
        var inMilliseconds = header.getAttribute('TIME_UNITS') == 'milliseconds';
        var media = header.querySelector('MEDIA_DESCRIPTOR');
        data.media.url = media.getAttribute('MEDIA_URL');
        data.media.type = media.getAttribute('MIME_TYPE');

        var timeSlots = xml.querySelectorAll('TIME_ORDER TIME_SLOT');
        var timeOrder = {};
        _forEach.call(timeSlots, function (slot) {
            var value = parseFloat(slot.getAttribute('TIME_VALUE'));
            // If in milliseconds, convert to seconds with rounding
            if (inMilliseconds) {
                value = Math.round(value * 1e2) / 1e5;
            }
            timeOrder[slot.getAttribute('TIME_SLOT_ID')] = value;
        });

        data.tiers = _map.call(xml.querySelectorAll('TIER'), function (tier) {
            return {
                id: tier.getAttribute('TIER_ID'),
                linguisticTypeRef: tier.getAttribute('LINGUISTIC_TYPE_REF'),
                defaultLocale: tier.getAttribute('DEFAULT_LOCALE'),
                annotations: _map.call(
                    tier.querySelectorAll('REF_ANNOTATION, ALIGNABLE_ANNOTATION'),
                    function (node) {
                        var annot = {
                            type: node.nodeName,
                            id: node.getAttribute('ANNOTATION_ID'),
                            ref: node.getAttribute('ANNOTATION_REF'),
                            value: node.querySelector('ANNOTATION_VALUE')
                                .textContent.trim()
                        };

                        if (this.Types.ALIGNABLE_ANNOTATION == annot.type) {
                            // Add start & end to alignable annotation
                            annot.start = timeOrder[node.getAttribute('TIME_SLOT_REF1')];
                            annot.end = timeOrder[node.getAttribute('TIME_SLOT_REF2')];

                            // Add to the list of alignable annotations
                            data.alignableAnnotations.push(annot);
                        }

                        // Additionally, put into the flat map of all annotations
                        data.annotations[annot.id] = annot;

                        return annot;
                    }, this
                )
            };
        }, this);

        // Create JavaScript references between annotations
        data.tiers.forEach(function (tier) {
            tier.annotations.forEach(function (annot) {
                if (null != annot.ref) {
                    annot.reference = data.annotations[annot.ref];
                }
            }, this);
        }, this);

        // Sort alignable annotations by start & end
        data.alignableAnnotations.sort(function (a, b) {
            var d = a.start - b.start;
            if (d == 0) {
                d = b.end - a.end;
            }
            return d;
        });

        data.length = data.alignableAnnotations.length;

        return data;
    },

    render: function () {
        // apply tiers filter
        var tiers = this.data.tiers;
        if (this.params.tiers) {
            tiers = tiers.filter(function (tier) {
                return tier.id in this.params.tiers;
            }, this);
        }

        // denormalize references to alignable annotations
        var backRefs = {};
        var indeces = {};
        tiers.forEach(function (tier, index) {
            tier.annotations.forEach(function (annot) {
                if (annot.reference &&
                    annot.reference.type == this.Types.ALIGNABLE_ANNOTATION) {
                    if (!(annot.reference.id in backRefs)) {
                        backRefs[annot.ref] = {};
                    }
                    backRefs[annot.ref][index] = annot;
                    indeces[index] = true;
                }
            }, this);
        }, this);
        indeces = Object.keys(indeces).sort();

        this.renderedAlignable = this.data.alignableAnnotations.filter(
            function (alignable) {
                return backRefs[alignable.id];
            }
        );

        // table
        var table = document.createElement('table');
        table.className = 'wavesurfer-annotations';

        // head
        var thead = document.createElement('thead');
        var headRow = document.createElement('tr');
        thead.appendChild(headRow);
        table.appendChild(thead);
        var th = document.createElement('th');
        th.textContent = 'Time';
        th.className = 'wavesurfer-time';
        headRow.appendChild(th);
        indeces.forEach(function (index) {
            var tier = tiers[index];
            var th = document.createElement('th');
            th.className = 'wavesurfer-tier-' + tier.id;
            th.textContent = tier.id;
            th.style.width = this.params.tiers[tier.id];
            headRow.appendChild(th);
        }, this);

        // body
        var tbody = document.createElement('tbody');
        table.appendChild(tbody);
        this.renderedAlignable.forEach(function (alignable) {
            var row = document.createElement('tr');
            row.id = 'wavesurfer-alignable-' + alignable.id;
            tbody.appendChild(row);

            var td = document.createElement('td');
            td.className = 'wavesurfer-time';
            td.textContent = alignable.start.toFixed(1) + '–' +
                alignable.end.toFixed(1);
            row.appendChild(td);

            var backRef = backRefs[alignable.id];
            indeces.forEach(function (index) {
                var tier = tiers[index];
                var td = document.createElement('td');
                var annotation = backRef[index];
                if (annotation) {
                    td.id = 'wavesurfer-annotation-' + annotation.id;
                    td.dataset.ref = alignable.id;
                    td.dataset.start = alignable.start;
                    td.dataset.end = alignable.end;
                    td.textContent = annotation.value;
                }
                td.className = 'wavesurfer-tier-' + tier.id;
                row.appendChild(td);
            }, this);
        }, this);

        this.container.innerHTML = '';
        this.container.appendChild(table);
    },

    bindClick: function () {
        var my = this;
        this.container.addEventListener('click', function (e) {
            var ref = e.target.dataset.ref;
            if (null != ref) {
                var annot = my.data.annotations[ref];
                if (annot) {
                    my.fireEvent('select', annot.start, annot.end);
                }
            }
        });
    },

    getRenderedAnnotation: function (time) {
        var result;
        this.renderedAlignable.some(function (annotation) {
            if (annotation.start <= time && annotation.end >= time) {
                result = annotation;
                return true;
            }
            return false;
        });
        return result;
    },

    getAnnotationNode: function (annotation) {
        return document.getElementById(
            'wavesurfer-alignable-' + annotation.id
        );
    }
};

WaveSurfer.util.extend(WaveSurfer.ELAN, WaveSurfer.Observer);
