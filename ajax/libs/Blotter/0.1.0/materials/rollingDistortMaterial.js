(function(Blotter) {

  Blotter.RollingDistortMaterial = function() {
    Blotter.Material.apply(this, arguments);
  };

  Blotter.RollingDistortMaterial.prototype = Object.create(Blotter.Material.prototype);

  Blotter._extendWithGettersSetters(Blotter.RollingDistortMaterial.prototype, (function () {

    function _mainImageSrc () {
      var mainImageSrc = [
        Blotter.Assets.Shaders.PI,
        Blotter.Assets.Shaders.LineMath,
        Blotter.Assets.Shaders.Noise,

        "// Fix a floating point number to two decimal places",
        "float toFixedTwo(float f) {",
        "    return float(int(f * 100.0)) / 100.0;",
        "}",

        "// Via: http://www.iquilezles.org/www/articles/functions/functions.htm",
        "float impulse(float k, float x) {",
        "    float h = k * x;",
        "    return h * exp(1.0 - h);",
        "}",

        "vec2 waveOffset(vec2 fragCoord, float sineDistortSpread, float sineDistortCycleCount, float sineDistortAmplitude, float noiseDistortVolatility, float noiseDistortAmplitude, vec2 distortPosition, float deg, float speed) {",

        "    // Setup",
        "    // -------------------------------",

        "    deg = toFixedTwo(deg);",

        "    float centerDistance = 0.5;",
        "    vec2 centerUv = vec2(centerDistance);",
        "    vec2 centerCoord = uResolution.xy * centerUv;",

        "    float changeOverTime = uGlobalTime * speed;",

        "    float slope = normalizedSlope(slopeForDegrees(deg), uResolution.xy);",
        "    float perpendicularDeg = mod(deg + 90.0, 360.0); // Offset angle by 90.0, but keep it from exceeding 360.0",
        "    float perpendicularSlope = normalizedSlope(slopeForDegrees(perpendicularDeg), uResolution.xy);",


        "    // Find intersects for line with edges of viewport",
        "    // -------------------------------",

        "    vec2 edgeIntersectA = vec2(0.0);",
        "    vec2 edgeIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(edgeIntersectA, edgeIntersectB, vec2(0.0), uResolution.xy, centerCoord, slope);",
        "    float crossSectionLength = distance(edgeIntersectA, edgeIntersectB);",

        "    // Find the threshold for degrees at which our intersectsOnRectForLine function would flip",
        "    //   intersects A and B because of the order in which it finds them. This is the angle at which",
        "    //   the y coordinate for the hypotenuse of a right triangle whose oposite adjacent edge runs from",
        "    //   vec2(0.0, centerCoord.y) to centerCoord and whose opposite edge runs from vec2(0.0, centerCoord.y) to",
        "    //   vec2(0.0, uResolution.y) exceeeds uResolution.y",
        "    float thresholdDegA = atan(centerCoord.y / centerCoord.x) * (180.0 / PI);",
        "    float thresholdDegB = mod(thresholdDegA + 180.0, 360.0);",

        "    vec2 edgeIntersect = vec2(0.0);",
        "    if (deg < thresholdDegA || deg > thresholdDegB) {",
        "        edgeIntersect = edgeIntersectA;",
        "    } else {",
        "        edgeIntersect = edgeIntersectB;",
        "    }",

        "    vec2 perpendicularIntersectA = vec2(0.0);",
        "    vec2 perpendicularIntersectB = vec2(0.0);",
        "    intersectsOnRectForLine(perpendicularIntersectA, perpendicularIntersectB, vec2(0.0), uResolution.xy, centerCoord, perpendicularSlope); ",
        "    float perpendicularLength = distance(perpendicularIntersectA, perpendicularIntersectA);",

        "    vec2 coordLineIntersect = vec2(0.0);",
        "    lineLineIntersection(coordLineIntersect, centerCoord, slope, fragCoord, perpendicularSlope);",


        "    // Define placement for distortion ",
        "    // -------------------------------",

        "    vec2 distortPositionIntersect = vec2(0.0);",
        "    lineLineIntersection(distortPositionIntersect, distortPosition * uResolution.xy, perpendicularSlope, edgeIntersect, slope);",
        "    float distortDistanceFromEdge = (distance(edgeIntersect, distortPositionIntersect) / crossSectionLength);// + sineDistortSpread;",

        "    float uvDistanceFromDistort = distance(edgeIntersect, coordLineIntersect) / crossSectionLength;",
        "    float noiseDistortVarianceAdjuster = uvDistanceFromDistort + changeOverTime;",
        "    uvDistanceFromDistort += -centerDistance + distortDistanceFromEdge + changeOverTime;",
        "    uvDistanceFromDistort = mod(uvDistanceFromDistort, 1.0); // For sine, keep distance between 0.0 and 1.0",


        "    // Define sine distortion ",
        "    // -------------------------------",

        "    float minThreshold = centerDistance - sineDistortSpread;",
        "    float maxThreshold = centerDistance + sineDistortSpread;",

        "    uvDistanceFromDistort = clamp(((uvDistanceFromDistort - minThreshold)/(maxThreshold - minThreshold)), 0.0, 1.0);",
        "    if (sineDistortSpread < 0.5) {",
        "        // Add smoother decay to sin distort when it isnt taking up the full viewport.",
        "        uvDistanceFromDistort = impulse(uvDistanceFromDistort, uvDistanceFromDistort);",
        "    }",

        "    float sineDistortion = sin(uvDistanceFromDistort * PI * sineDistortCycleCount) * sineDistortAmplitude;",


        "    // Define noise distortion ",
        "    // -------------------------------",

        "    float noiseDistortion = noise(noiseDistortVolatility * noiseDistortVarianceAdjuster) * noiseDistortAmplitude;",
        "    if (noiseDistortVolatility > 0.0) {",
        "        noiseDistortion -= noiseDistortAmplitude / 2.0; // Adjust primary distort so that it distorts in two directions.",
        "    }",
        "    noiseDistortion *= (sineDistortion > 0.0 ? 1.0 : -1.0); // Adjust primary distort to account for sin variance.",


        "    // Combine distortions to find UV offsets ",
        "    // -------------------------------",

        "    vec2 kV = offsetsForCoordAtDistanceOnSlope(sineDistortion + noiseDistortion, perpendicularSlope);",
        "    if (deg <= 0.0 || deg >= 180.0) {",
        "        kV *= -1.0;",
        "    }",


        "    return kV;",
        "}",


        "void mainImage( out vec4 mainImage, in vec2 fragCoord )",
        "{",
        "    // Setup",
        "    // -------------------------------",

        "    vec2 uv = fragCoord.xy / uResolution.xy;",

        "    // Minor hacks to ensure our waves start horizontal and animating in a downward direction by default.",
        "    uRotation = mod(uRotation + 270.0, 360.0);",
        "    uDistortPosition.y = 1.0 - uDistortPosition.y;",


        "    // Distortion",
        "    // -------------------------------",

        "    vec2 offset = waveOffset(fragCoord, uSineDistortSpread, uSineDistortCycleCount, uSineDistortAmplitude, uNoiseDistortVolatility, uNoiseDistortAmplitude, uDistortPosition, uRotation, uSpeed);",

        "    mainImage = textTexture(uv + offset);",
        "}"
      ].join("\n");

      return mainImageSrc;
    }

    return {

      constructor : Blotter.RollingDistortMaterial,

      init : function () {
        this.mainImage = _mainImageSrc();
        this.uniforms = {
            uSineDistortSpread : { type : "1f", value : 0.05 },
            uSineDistortCycleCount : { type : "1f", value : 2.0 },
            uSineDistortAmplitude : { type : "1f", value : 0.25 },
            uNoiseDistortVolatility : { type : "1f", value : 20.0 },
            uNoiseDistortAmplitude : { type : "1f", value : 0.01 },
            uDistortPosition : { type : "2f", value : [0.5, 0.5] },
            uRotation : { type : "1f", value :  170.0 },
            uSpeed : { type : "1f", value : 0.08 }
        };
      }
    };

  })());

})(
  this.Blotter
);
