import { is } from "../core/Registry";
var theme = function (object) {
    if (is(object, "SpriteState")) {
        object.transitionDuration = 400;
    }
    if (is(object, "Component")) {
        object.rangeChangeDuration = 500;
        object.interpolationDuration = 500;
        object.sequencedInterpolation = false;
        if (is(object, "SankeyDiagram")) {
            object.sequencedInterpolation = true;
        }
        if (is(object, "FunnelSeries")) {
            object.sequencedInterpolation = true;
        }
    }
    if (is(object, "Chart")) {
        object.defaultState.transitionDuration = 2000;
        object.hiddenState.transitionDuration = 1000;
    }
    if (is(object, "Tooltip")) {
        object.animationDuration = 400;
        object.defaultState.transitionDuration = 400;
        object.hiddenState.transitionDuration = 400;
    }
    if (is(object, "Scrollbar")) {
        object.animationDuration = 500;
    }
    if (is(object, "Series")) {
        object.defaultState.transitionDuration = 1000;
        object.hiddenState.transitionDuration = 700;
        object.hiddenState.properties.opacity = 1;
        object.showOnInit = true;
    }
    if (is(object, "MapSeries")) {
        object.hiddenState.properties.opacity = 0;
    }
    if (is(object, "PercentSeries")) {
        object.hiddenState.properties.opacity = 0;
    }
    if (is(object, "FunnelSlice")) {
        object.defaultState.transitionDuration = 800;
        object.hiddenState.transitionDuration = 1000;
        object.hiddenState.properties.opacity = 1;
    }
    if (is(object, "Slice")) {
        object.defaultState.transitionDuration = 700;
        object.hiddenState.transitionDuration = 1000;
        object.hiddenState.properties.opacity = 1;
    }
    if (is(object, "Preloader")) {
        object.hiddenState.transitionDuration = 2000;
    }
    if (is(object, "Column")) {
        object.defaultState.transitionDuration = 700;
        object.hiddenState.transitionDuration = 1000;
        object.hiddenState.properties.opacity = 1;
    }
    if (is(object, "Column3D")) {
        object.hiddenState.properties.opacity = 0;
    }
};
export default theme;
//# sourceMappingURL=animated.js.map