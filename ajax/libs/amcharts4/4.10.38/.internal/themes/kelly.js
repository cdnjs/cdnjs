/**
 * Kelly's colors is a set of 22 highly contrasting colors.
 *
 * More info:
 * {@link https://i.kinja-img.com/gawker-media/image/upload/1015680494325093012.JPG}
 * {@link https://eleanormaclure.files.wordpress.com/2011/03/colour-coding.pdf}
 */
import { is } from "../core/Registry";
import { color } from "../core/utils/Color";
var theme = function (object) {
    if (is(object, "ColorSet")) {
        object.list = [
            color("#F3C300"),
            color("#875692"),
            color("#F38400"),
            color("#A1CAF1"),
            color("#BE0032"),
            color("#C2B280"),
            color("#848482"),
            color("#008856"),
            color("#E68FAC"),
            color("#0067A5"),
            color("#F99379"),
            color("#604E97"),
            color("#F6A600"),
            color("#B3446C"),
            color("#DCD300"),
            color("#882D17"),
            color("#8DB600"),
            color("#654522"),
            color("#E25822"),
            color("#2B3D26"),
            color("#F2F3F4"),
            color("#222222")
        ];
        object.minLightness = 0.2;
        object.maxLightness = 0.7;
        object.reuse = true;
    }
};
export default theme;
//# sourceMappingURL=kelly.js.map