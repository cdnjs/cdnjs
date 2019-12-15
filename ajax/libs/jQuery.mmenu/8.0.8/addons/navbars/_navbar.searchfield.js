import { type } from '../../core/_helpers';
export default function (navbar) {
    if (type(this.opts.searchfield) != 'object') {
        this.opts.searchfield = {};
    }
    this.opts.searchfield.add = true;
    this.opts.searchfield.addTo = [navbar];
}
;
