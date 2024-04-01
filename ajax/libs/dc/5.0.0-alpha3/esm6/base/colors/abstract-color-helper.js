export class AbstractColorHelper {
    /**
     * Charts call this method to lookup actual colors.
     * Rarely called in user code.
     *
     * @category Intermediate
     */
    getColor(d, i) {
        return undefined;
    }
    /**
     * Composite charts need the same underlying scale, however, with a different {@link colorAccessor}.
     * It is unlikely that it will be used directly.
     *
     * @category Ninja
     */
    share(colorAccessor) {
        return this;
    }
}
//# sourceMappingURL=abstract-color-helper.js.map