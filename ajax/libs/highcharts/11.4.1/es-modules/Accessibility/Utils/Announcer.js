/* *
 *
 *  (c) 2009-2024 Øystein Moseng
 *
 *  Create announcer to speak messages to screen readers and other AT.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import AST from '../../Core/Renderer/HTML/AST.js';
import DOMElementProvider from './DOMElementProvider.js';
import H from '../../Core/Globals.js';
const { doc } = H;
import HU from './HTMLUtilities.js';
const { addClass, visuallyHideElement } = HU;
import U from '../../Core/Utilities.js';
const { attr } = U;
/* *
 *
 *  Class
 *
 * */
class Announcer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart, type) {
        this.chart = chart;
        this.domElementProvider = new DOMElementProvider();
        this.announceRegion = this.addAnnounceRegion(type);
    }
    /* *
     *
     *  Functions
     *
     * */
    destroy() {
        this.domElementProvider.destroyCreatedElements();
    }
    announce(message) {
        AST.setElementHTML(this.announceRegion, message);
        // Delete contents after a little while to avoid user finding the live
        // region in the DOM.
        if (this.clearAnnouncementRegionTimer) {
            clearTimeout(this.clearAnnouncementRegionTimer);
        }
        this.clearAnnouncementRegionTimer = setTimeout(() => {
            this.announceRegion.innerHTML = AST.emptyHTML;
            delete this.clearAnnouncementRegionTimer;
        }, 3000);
    }
    addAnnounceRegion(type) {
        const chartContainer = (this.chart.announcerContainer || this.createAnnouncerContainer()), div = this.domElementProvider.createElement('div');
        attr(div, {
            'aria-hidden': false,
            'aria-live': type,
            'aria-atomic': true
        });
        if (this.chart.styledMode) {
            addClass(div, 'highcharts-visually-hidden');
        }
        else {
            visuallyHideElement(div);
        }
        chartContainer.appendChild(div);
        return div;
    }
    createAnnouncerContainer() {
        const chart = this.chart, container = doc.createElement('div');
        attr(container, {
            'aria-hidden': false,
            'class': 'highcharts-announcer-container'
        });
        container.style.position = 'relative';
        chart.renderTo.insertBefore(container, chart.renderTo.firstChild);
        chart.announcerContainer = container;
        return container;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default Announcer;
