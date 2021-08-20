/**
 * A collection of GeoJSON format-related utility functions.
 */
import * as $math from "../../core/utils/Math";
import * as $array from "../../core/utils/Array";
/**
 * Normalizes a geo-point.
 *
 * @ignore Exclude from docs
 * @param geoPoint  Source geo-point
 * @return Normalized geo-point
 */
export function normalizePoint(geoPoint) {
    var longitude = wrapAngleTo180(geoPoint.longitude);
    var latitude = Math.asin(Math.sin((geoPoint.latitude * $math.RADIANS))) * $math.DEGREES;
    var latitude180 = wrapAngleTo180(geoPoint.latitude);
    if (Math.abs(latitude180) > 90) {
        longitude = wrapAngleTo180(longitude + 180);
    }
    geoPoint.longitude = longitude;
    geoPoint.latitude = latitude;
    return geoPoint;
}
/**
 * Normalizes all points of a geo-line.
 *
 * @ignore Exclude from docs
 * @param multiline  Source geo-line
 * @return Normalized geo-line
 */
export function normalizeMultiline(multiline) {
    $array.each(multiline, function (segment) {
        $array.each(segment, function (point) {
            normalizePoint(point);
        });
    });
    return multiline;
}
/**
 * [wrapAngleTo180 description]
 *
 * @todo Description
 * @ignore Exclude from docs
 * @param angle  Angle
 * @return Angle
 */
export function wrapAngleTo180(angle) {
    angle = angle % 360;
    if (angle > 180) {
        angle -= 360;
    }
    if (angle < -180) {
        angle += 360;
    }
    return angle;
}
/**
 * Converts a geo point to a regular point object.
 *
 * @ignore Exclude from docs
 * @param geoPoint  Source geo point
 * @return Point
 */
export function geoToPoint(geoPoint) {
    return { x: geoPoint.longitude, y: geoPoint.latitude };
}
//# sourceMappingURL=Geo.js.map