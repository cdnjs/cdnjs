import { AbstractColorHelper } from './abstract-color-helper.js';
export class ColorScaleHelper extends AbstractColorHelper {
    constructor(colorScale) {
        super();
        this.colorScale = colorScale;
    }
    getColor(d, i) {
        return this.colorScale(this.colorAccessor(d, i));
    }
    /**
     * It is unlikely that it will be used directly.
     *
     * @category Ninja
     * @see {@link AbstractColorHelper.share}
     */
    share(colorAccessor) {
        const clonedScale = new ColorScaleHelper(this.colorScale);
        clonedScale.colorAccessor = colorAccessor;
        return clonedScale;
    }
}
//# sourceMappingURL=color-scale-helper.js.map