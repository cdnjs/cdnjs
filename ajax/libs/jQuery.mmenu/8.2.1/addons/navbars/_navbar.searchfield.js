import * as DOM from '../../core/_dom';
import { type } from '../../core/_helpers';
export default function (navbar) {
    if (type(this.opts.searchfield) != 'object') {
        this.opts.searchfield = {};
    }
    var searchfield = DOM.create('div.mm-navbar__searchfield');
    navbar.append(searchfield);
    this.opts.searchfield.add = true;
    this.opts.searchfield.addTo = [searchfield];
}
