/**
 * FFT (Fast Fourier Transform) implementation
 * Based on https://github.com/corbanbrook/dsp.js
 *
 * Centralized FFT functionality for spectrogram plugins
 */
// eslint-disable-next-line
// @ts-nocheck
export const ERB_A = (1000 * Math.log(10)) / (24.7 * 4.37);
// Frequency scaling functions
export function hzToMel(hz) {
    return 2595 * Math.log10(1 + hz / 700);
}
export function melToHz(mel) {
    return 700 * (Math.pow(10, mel / 2595) - 1);
}
export function hzToLog(hz) {
    return Math.log10(Math.max(1, hz));
}
export function logToHz(log) {
    return Math.pow(10, log);
}
export function hzToBark(hz) {
    // https://www.mathworks.com/help/audio/ref/hz2bark.html#function_hz2bark_sep_mw_06bea6f7-353b-4479-a58d-ccadb90e44de
    let bark = (26.81 * hz) / (1960 + hz) - 0.53;
    if (bark < 2) {
        bark += 0.15 * (2 - bark);
    }
    if (bark > 20.1) {
        bark += 0.22 * (bark - 20.1);
    }
    return bark;
}
export function barkToHz(bark) {
    // https://www.mathworks.com/help/audio/ref/bark2hz.html#function_bark2hz_sep_mw_bee310ea-48ac-4d95-ae3d-80f3e4149555
    if (bark < 2) {
        bark = (bark - 0.3) / 0.85;
    }
    if (bark > 20.1) {
        bark = (bark + 4.422) / 1.22;
    }
    return 1960 * ((bark + 0.53) / (26.28 - bark));
}
export function hzToErb(hz) {
    // https://www.mathworks.com/help/audio/ref/hz2erb.html#function_hz2erb_sep_mw_06bea6f7-353b-4479-a58d-ccadb90e44de
    return ERB_A * Math.log10(1 + hz * 0.00437);
}
export function erbToHz(erb) {
    // https://it.mathworks.com/help/audio/ref/erb2hz.html?#function_erb2hz_sep_mw_bee310ea-48ac-4d95-ae3d-80f3e4149555
    return (Math.pow(10, erb / ERB_A) - 1) / 0.00437;
}
// Generic scale conversion functions
export function hzToScale(hz, scale) {
    switch (scale) {
        case 'mel':
            return hzToMel(hz);
        case 'logarithmic':
            return hzToLog(hz);
        case 'bark':
            return hzToBark(hz);
        case 'erb':
            return hzToErb(hz);
        default:
            return hz;
    }
}
export function scaleToHz(scale, scaleType) {
    switch (scaleType) {
        case 'mel':
            return melToHz(scale);
        case 'logarithmic':
            return logToHz(scale);
        case 'bark':
            return barkToHz(scale);
        case 'erb':
            return erbToHz(scale);
        default:
            return scale;
    }
}
// Filter bank functions
function createFilterBank(numFilters, fftSamples, sampleRate, hzToScaleFunc, scaleToHzFunc) {
    const filterMin = hzToScaleFunc(0);
    const filterMax = hzToScaleFunc(sampleRate / 2);
    const filterBank = Array.from({ length: numFilters }, () => Array(fftSamples / 2 + 1).fill(0));
    const scale = sampleRate / fftSamples;
    for (let i = 0; i < numFilters; i++) {
        const hz = scaleToHzFunc(filterMin + (i / numFilters) * (filterMax - filterMin));
        const j = Math.floor(hz / scale);
        const hzLow = j * scale;
        const hzHigh = (j + 1) * scale;
        const r = (hz - hzLow) / (hzHigh - hzLow);
        filterBank[i][j] = 1 - r;
        filterBank[i][j + 1] = r;
    }
    return filterBank;
}
export function applyFilterBank(fftPoints, filterBank) {
    const numFilters = filterBank.length;
    const logSpectrum = Float32Array.from({ length: numFilters }, () => 0);
    for (let i = 0; i < numFilters; i++) {
        for (let j = 0; j < fftPoints.length; j++) {
            logSpectrum[i] += fftPoints[j] * filterBank[i][j];
        }
    }
    return logSpectrum;
}
// Centralized filter bank creation based on scale type
export function createFilterBankForScale(scale, numFilters, fftSamples, sampleRate) {
    switch (scale) {
        case 'mel':
            return createFilterBank(numFilters, fftSamples, sampleRate, hzToMel, melToHz);
        case 'logarithmic':
            return createFilterBank(numFilters, fftSamples, sampleRate, hzToLog, logToHz);
        case 'bark':
            return createFilterBank(numFilters, fftSamples, sampleRate, hzToBark, barkToHz);
        case 'erb':
            return createFilterBank(numFilters, fftSamples, sampleRate, hzToErb, erbToHz);
        case 'linear':
        default:
            return null; // No filter bank for linear scale
    }
}
export const COLOR_MAPS = {
    gray: () => {
        const colorMap = [];
        for (let i = 0; i < 256; i++) {
            const val = (255 - i) / 256;
            colorMap.push([val, val, val, 1]);
        }
        return colorMap;
    },
    igray: () => {
        const colorMap = [];
        for (let i = 0; i < 256; i++) {
            const val = i / 256;
            colorMap.push([val, val, val, 1]);
        }
        return colorMap;
    },
    roseus: () => [
        [0.004528, 0.004341, 0.004307, 1],
        [0.005625, 0.006156, 0.00601, 1],
        [0.006628, 0.008293, 0.008161, 1],
        [0.007551, 0.010738, 0.01079, 1],
        [0.008382, 0.013482, 0.013941, 1],
        [0.009111, 0.01652, 0.017662, 1],
        [0.009727, 0.019846, 0.022009, 1],
        [0.010223, 0.023452, 0.027035, 1],
        [0.010593, 0.027331, 0.032799, 1],
        [0.010833, 0.031475, 0.039361, 1],
        [0.010941, 0.035875, 0.046415, 1],
        [0.010918, 0.04052, 0.053597, 1],
        [0.010768, 0.045158, 0.060914, 1],
        [0.010492, 0.049708, 0.068367, 1],
        [0.010098, 0.054171, 0.075954, 1],
        [0.009594, 0.058549, 0.083672, 1],
        [0.008989, 0.06284, 0.091521, 1],
        [0.008297, 0.067046, 0.099499, 1],
        [0.00753, 0.071165, 0.107603, 1],
        [0.006704, 0.075196, 0.11583, 1],
        [0.005838, 0.07914, 0.124178, 1],
        [0.004949, 0.082994, 0.132643, 1],
        [0.004062, 0.086758, 0.141223, 1],
        [0.003198, 0.09043, 0.149913, 1],
        [0.002382, 0.09401, 0.158711, 1],
        [0.001643, 0.097494, 0.167612, 1],
        [0.001009, 0.100883, 0.176612, 1],
        [0.000514, 0.104174, 0.185704, 1],
        [0.000187, 0.107366, 0.194886, 1],
        [0.000066, 0.110457, 0.204151, 1],
        [0.000186, 0.113445, 0.213496, 1],
        [0.000587, 0.116329, 0.222914, 1],
        [0.001309, 0.119106, 0.232397, 1],
        [0.002394, 0.121776, 0.241942, 1],
        [0.003886, 0.124336, 0.251542, 1],
        [0.005831, 0.126784, 0.261189, 1],
        [0.008276, 0.12912, 0.270876, 1],
        [0.011268, 0.131342, 0.280598, 1],
        [0.014859, 0.133447, 0.290345, 1],
        [0.0191, 0.135435, 0.300111, 1],
        [0.024043, 0.137305, 0.309888, 1],
        [0.029742, 0.139054, 0.319669, 1],
        [0.036252, 0.140683, 0.329441, 1],
        [0.043507, 0.142189, 0.339203, 1],
        [0.050922, 0.143571, 0.348942, 1],
        [0.058432, 0.144831, 0.358649, 1],
        [0.066041, 0.145965, 0.368319, 1],
        [0.073744, 0.146974, 0.377938, 1],
        [0.081541, 0.147858, 0.387501, 1],
        [0.089431, 0.148616, 0.396998, 1],
        [0.097411, 0.149248, 0.406419, 1],
        [0.105479, 0.149754, 0.415755, 1],
        [0.113634, 0.150134, 0.424998, 1],
        [0.121873, 0.150389, 0.434139, 1],
        [0.130192, 0.150521, 0.443167, 1],
        [0.138591, 0.150528, 0.452075, 1],
        [0.147065, 0.150413, 0.460852, 1],
        [0.155614, 0.150175, 0.469493, 1],
        [0.164232, 0.149818, 0.477985, 1],
        [0.172917, 0.149343, 0.486322, 1],
        [0.181666, 0.148751, 0.494494, 1],
        [0.190476, 0.148046, 0.502493, 1],
        [0.199344, 0.147229, 0.510313, 1],
        [0.208267, 0.146302, 0.517944, 1],
        [0.217242, 0.145267, 0.52538, 1],
        [0.226264, 0.144131, 0.532613, 1],
        [0.235331, 0.142894, 0.539635, 1],
        [0.24444, 0.141559, 0.546442, 1],
        [0.253587, 0.140131, 0.553026, 1],
        [0.262769, 0.138615, 0.559381, 1],
        [0.271981, 0.137016, 0.5655, 1],
        [0.281222, 0.135335, 0.571381, 1],
        [0.290487, 0.133581, 0.577017, 1],
        [0.299774, 0.131757, 0.582404, 1],
        [0.30908, 0.129867, 0.587538, 1],
        [0.318399, 0.12792, 0.592415, 1],
        [0.32773, 0.125921, 0.597032, 1],
        [0.337069, 0.123877, 0.601385, 1],
        [0.346413, 0.121793, 0.605474, 1],
        [0.355758, 0.119678, 0.609295, 1],
        [0.365102, 0.11754, 0.612846, 1],
        [0.374443, 0.115386, 0.616127, 1],
        [0.383774, 0.113226, 0.619138, 1],
        [0.393096, 0.111066, 0.621876, 1],
        [0.402404, 0.108918, 0.624343, 1],
        [0.411694, 0.106794, 0.62654, 1],
        [0.420967, 0.104698, 0.628466, 1],
        [0.430217, 0.102645, 0.630123, 1],
        [0.439442, 0.100647, 0.631513, 1],
        [0.448637, 0.098717, 0.632638, 1],
        [0.457805, 0.096861, 0.633499, 1],
        [0.46694, 0.095095, 0.6341, 1],
        [0.47604, 0.093433, 0.634443, 1],
        [0.485102, 0.091885, 0.634532, 1],
        [0.494125, 0.090466, 0.63437, 1],
        [0.503104, 0.08919, 0.633962, 1],
        [0.512041, 0.088067, 0.633311, 1],
        [0.520931, 0.087108, 0.63242, 1],
        [0.529773, 0.086329, 0.631297, 1],
        [0.538564, 0.085738, 0.629944, 1],
        [0.547302, 0.085346, 0.628367, 1],
        [0.555986, 0.085162, 0.626572, 1],
        [0.564615, 0.08519, 0.624563, 1],
        [0.573187, 0.085439, 0.622345, 1],
        [0.581698, 0.085913, 0.619926, 1],
        [0.590149, 0.086615, 0.617311, 1],
        [0.598538, 0.087543, 0.614503, 1],
        [0.606862, 0.0887, 0.611511, 1],
        [0.61512, 0.090084, 0.608343, 1],
        [0.623312, 0.09169, 0.605001, 1],
        [0.631438, 0.093511, 0.601489, 1],
        [0.639492, 0.095546, 0.597821, 1],
        [0.647476, 0.097787, 0.593999, 1],
        [0.655389, 0.100226, 0.590028, 1],
        [0.66323, 0.102856, 0.585914, 1],
        [0.670995, 0.105669, 0.581667, 1],
        [0.678686, 0.108658, 0.577291, 1],
        [0.686302, 0.111813, 0.57279, 1],
        [0.69384, 0.115129, 0.568175, 1],
        [0.7013, 0.118597, 0.563449, 1],
        [0.708682, 0.122209, 0.558616, 1],
        [0.715984, 0.125959, 0.553687, 1],
        [0.723206, 0.12984, 0.548666, 1],
        [0.730346, 0.133846, 0.543558, 1],
        [0.737406, 0.13797, 0.538366, 1],
        [0.744382, 0.142209, 0.533101, 1],
        [0.751274, 0.146556, 0.527767, 1],
        [0.758082, 0.151008, 0.522369, 1],
        [0.764805, 0.155559, 0.516912, 1],
        [0.771443, 0.160206, 0.511402, 1],
        [0.777995, 0.164946, 0.505845, 1],
        [0.784459, 0.169774, 0.500246, 1],
        [0.790836, 0.174689, 0.494607, 1],
        [0.797125, 0.179688, 0.488935, 1],
        [0.803325, 0.184767, 0.483238, 1],
        [0.809435, 0.189925, 0.477518, 1],
        [0.815455, 0.19516, 0.471781, 1],
        [0.821384, 0.200471, 0.466028, 1],
        [0.827222, 0.205854, 0.460267, 1],
        [0.832968, 0.211308, 0.454505, 1],
        [0.838621, 0.216834, 0.448738, 1],
        [0.844181, 0.222428, 0.442979, 1],
        [0.849647, 0.22809, 0.43723, 1],
        [0.855019, 0.233819, 0.431491, 1],
        [0.860295, 0.239613, 0.425771, 1],
        [0.865475, 0.245471, 0.420074, 1],
        [0.870558, 0.251393, 0.414403, 1],
        [0.875545, 0.25738, 0.408759, 1],
        [0.880433, 0.263427, 0.403152, 1],
        [0.885223, 0.269535, 0.397585, 1],
        [0.889913, 0.275705, 0.392058, 1],
        [0.894503, 0.281934, 0.386578, 1],
        [0.898993, 0.288222, 0.381152, 1],
        [0.903381, 0.294569, 0.375781, 1],
        [0.907667, 0.300974, 0.370469, 1],
        [0.911849, 0.307435, 0.365223, 1],
        [0.915928, 0.313953, 0.360048, 1],
        [0.919902, 0.320527, 0.354948, 1],
        [0.923771, 0.327155, 0.349928, 1],
        [0.927533, 0.333838, 0.344994, 1],
        [0.931188, 0.340576, 0.340149, 1],
        [0.934736, 0.347366, 0.335403, 1],
        [0.938175, 0.354207, 0.330762, 1],
        [0.941504, 0.361101, 0.326229, 1],
        [0.944723, 0.368045, 0.321814, 1],
        [0.947831, 0.375039, 0.317523, 1],
        [0.950826, 0.382083, 0.313364, 1],
        [0.953709, 0.389175, 0.309345, 1],
        [0.956478, 0.396314, 0.305477, 1],
        [0.959133, 0.403499, 0.301766, 1],
        [0.961671, 0.410731, 0.298221, 1],
        [0.964093, 0.418008, 0.294853, 1],
        [0.966399, 0.425327, 0.291676, 1],
        [0.968586, 0.43269, 0.288696, 1],
        [0.970654, 0.440095, 0.285926, 1],
        [0.972603, 0.44754, 0.28338, 1],
        [0.974431, 0.455025, 0.281067, 1],
        [0.976139, 0.462547, 0.279003, 1],
        [0.977725, 0.470107, 0.277198, 1],
        [0.979188, 0.477703, 0.275666, 1],
        [0.980529, 0.485332, 0.274422, 1],
        [0.981747, 0.492995, 0.273476, 1],
        [0.98284, 0.50069, 0.272842, 1],
        [0.983808, 0.508415, 0.272532, 1],
        [0.984653, 0.516168, 0.27256, 1],
        [0.985373, 0.523948, 0.272937, 1],
        [0.985966, 0.531754, 0.273673, 1],
        [0.986436, 0.539582, 0.274779, 1],
        [0.98678, 0.547434, 0.276264, 1],
        [0.986998, 0.555305, 0.278135, 1],
        [0.987091, 0.563195, 0.280401, 1],
        [0.987061, 0.5711, 0.283066, 1],
        [0.986907, 0.579019, 0.286137, 1],
        [0.986629, 0.58695, 0.289615, 1],
        [0.986229, 0.594891, 0.293503, 1],
        [0.985709, 0.602839, 0.297802, 1],
        [0.985069, 0.610792, 0.302512, 1],
        [0.98431, 0.618748, 0.307632, 1],
        [0.983435, 0.626704, 0.313159, 1],
        [0.982445, 0.634657, 0.319089, 1],
        [0.981341, 0.642606, 0.32542, 1],
        [0.98013, 0.650546, 0.332144, 1],
        [0.978812, 0.658475, 0.339257, 1],
        [0.977392, 0.666391, 0.346753, 1],
        [0.97587, 0.67429, 0.354625, 1],
        [0.974252, 0.68217, 0.362865, 1],
        [0.972545, 0.690026, 0.371466, 1],
        [0.97075, 0.697856, 0.380419, 1],
        [0.968873, 0.705658, 0.389718, 1],
        [0.966921, 0.713426, 0.399353, 1],
        [0.964901, 0.721157, 0.409313, 1],
        [0.962815, 0.728851, 0.419594, 1],
        [0.960677, 0.7365, 0.430181, 1],
        [0.95849, 0.744103, 0.44107, 1],
        [0.956263, 0.751656, 0.452248, 1],
        [0.954009, 0.759153, 0.463702, 1],
        [0.951732, 0.766595, 0.475429, 1],
        [0.949445, 0.773974, 0.487414, 1],
        [0.947158, 0.781289, 0.499647, 1],
        [0.944885, 0.788535, 0.512116, 1],
        [0.942634, 0.795709, 0.524811, 1],
        [0.940423, 0.802807, 0.537717, 1],
        [0.938261, 0.809825, 0.550825, 1],
        [0.936163, 0.81676, 0.564121, 1],
        [0.934146, 0.823608, 0.577591, 1],
        [0.932224, 0.830366, 0.59122, 1],
        [0.930412, 0.837031, 0.604997, 1],
        [0.928727, 0.843599, 0.618904, 1],
        [0.927187, 0.850066, 0.632926, 1],
        [0.925809, 0.856432, 0.647047, 1],
        [0.92461, 0.862691, 0.661249, 1],
        [0.923607, 0.868843, 0.675517, 1],
        [0.92282, 0.874884, 0.689832, 1],
        [0.922265, 0.880812, 0.704174, 1],
        [0.921962, 0.886626, 0.718523, 1],
        [0.92193, 0.892323, 0.732859, 1],
        [0.922183, 0.897903, 0.747163, 1],
        [0.922741, 0.903364, 0.76141, 1],
        [0.92362, 0.908706, 0.77558, 1],
        [0.924837, 0.913928, 0.789648, 1],
        [0.926405, 0.919031, 0.80359, 1],
        [0.92834, 0.924015, 0.817381, 1],
        [0.930655, 0.928881, 0.830995, 1],
        [0.93336, 0.933631, 0.844405, 1],
        [0.936466, 0.938267, 0.857583, 1],
        [0.939982, 0.942791, 0.870499, 1],
        [0.943914, 0.947207, 0.883122, 1],
        [0.948267, 0.951519, 0.895421, 1],
        [0.953044, 0.955732, 0.907359, 1],
        [0.958246, 0.959852, 0.918901, 1],
        [0.963869, 0.963887, 0.930004, 1],
        [0.969909, 0.967845, 0.940623, 1],
        [0.976355, 0.971737, 0.950704, 1],
        [0.983195, 0.97558, 0.960181, 1],
        [0.990402, 0.979395, 0.968966, 1],
        [0.99793, 0.983217, 0.97692, 1],
    ],
};
/**
 * Set up color map based on options
 */
export function setupColorMap(colorMap = 'roseus') {
    if (colorMap && typeof colorMap !== 'string') {
        if (colorMap.length < 256) {
            throw new Error('Colormap must contain 256 elements');
        }
        for (let i = 0; i < colorMap.length; i++) {
            const cmEntry = colorMap[i];
            if (cmEntry.length !== 4) {
                throw new Error('ColorMap entries must contain 4 values');
            }
        }
        return colorMap;
    }
    const mapGenerator = COLOR_MAPS[colorMap];
    if (!mapGenerator) {
        throw Error("No such colormap '" + colorMap + "'");
    }
    return mapGenerator();
}
/**
 * Format frequency value for display
 */
export function freqType(freq) {
    return freq >= 1000 ? (freq / 1000).toFixed(1) : Math.round(freq).toString();
}
/**
 * Get frequency unit for display
 */
export function unitType(freq) {
    return freq >= 1000 ? 'kHz' : 'Hz';
}
/**
 * Get frequency value for label at given index
 */
export function getLabelFrequency(index, labelIndex, frequencyMin, frequencyMax, scale) {
    const scaleMin = hzToScale(frequencyMin, scale);
    const scaleMax = hzToScale(frequencyMax, scale);
    return scaleToHz(scaleMin + (index / labelIndex) * (scaleMax - scaleMin), scale);
}
/**
 * Create wrapper click handler for relative position calculation
 */
export function createWrapperClickHandler(wrapper, emit) {
    return (e) => {
        const rect = wrapper.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const relativeWidth = rect.width;
        const relativePosition = relativeX / relativeWidth;
        emit('click', relativePosition);
    };
}
/**
 * Calculate FFT - Based on https://github.com/corbanbrook/dsp.js
 */
function FFT(bufferSize, sampleRate, windowFunc, alpha) {
    this.bufferSize = bufferSize;
    this.sampleRate = sampleRate;
    this.bandwidth = (2 / bufferSize) * (sampleRate / 2);
    this.sinTable = new Float32Array(bufferSize);
    this.cosTable = new Float32Array(bufferSize);
    this.windowValues = new Float32Array(bufferSize);
    this.reverseTable = new Uint32Array(bufferSize);
    this.peakBand = 0;
    this.peak = 0;
    switch (windowFunc) {
        case 'bartlett':
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] = (2 / (bufferSize - 1)) * ((bufferSize - 1) / 2 - Math.abs(i - (bufferSize - 1) / 2));
            }
            break;
        case 'bartlettHann':
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] =
                    0.62 - 0.48 * Math.abs(i / (bufferSize - 1) - 0.5) - 0.38 * Math.cos((Math.PI * 2 * i) / (bufferSize - 1));
            }
            break;
        case 'blackman':
            alpha = alpha || 0.16;
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] =
                    (1 - alpha) / 2 -
                        0.5 * Math.cos((Math.PI * 2 * i) / (bufferSize - 1)) +
                        (alpha / 2) * Math.cos((4 * Math.PI * i) / (bufferSize - 1));
            }
            break;
        case 'cosine':
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] = Math.cos((Math.PI * i) / (bufferSize - 1) - Math.PI / 2);
            }
            break;
        case 'gauss':
            alpha = alpha || 0.25;
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] = Math.pow(Math.E, -0.5 * Math.pow((i - (bufferSize - 1) / 2) / ((alpha * (bufferSize - 1)) / 2), 2));
            }
            break;
        case 'hamming':
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] = 0.54 - 0.46 * Math.cos((Math.PI * 2 * i) / (bufferSize - 1));
            }
            break;
        case 'hann':
        case undefined:
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] = 0.5 * (1 - Math.cos((Math.PI * 2 * i) / (bufferSize - 1)));
            }
            break;
        case 'lanczoz':
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] =
                    Math.sin(Math.PI * ((2 * i) / (bufferSize - 1) - 1)) / (Math.PI * ((2 * i) / (bufferSize - 1) - 1));
            }
            break;
        case 'rectangular':
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] = 1;
            }
            break;
        case 'triangular':
            for (let i = 0; i < bufferSize; i++) {
                this.windowValues[i] = (2 / bufferSize) * (bufferSize / 2 - Math.abs(i - (bufferSize - 1) / 2));
            }
            break;
        default:
            throw Error("No such window function '" + windowFunc + "'");
    }
    let limit = 1;
    let bit = bufferSize >> 1;
    while (limit < bufferSize) {
        for (let i = 0; i < limit; i++) {
            this.reverseTable[i + limit] = this.reverseTable[i] + bit;
        }
        limit = limit << 1;
        bit = bit >> 1;
    }
    for (let i = 0; i < bufferSize; i++) {
        this.sinTable[i] = Math.sin(-Math.PI / i);
        this.cosTable[i] = Math.cos(-Math.PI / i);
    }
    this.calculateSpectrum = function (buffer) {
        const bufferSize = this.bufferSize, cosTable = this.cosTable, sinTable = this.sinTable, reverseTable = this.reverseTable, real = new Float32Array(bufferSize), imag = new Float32Array(bufferSize), bSi = 2 / this.bufferSize, sqrt = Math.sqrt, spectrum = new Float32Array(bufferSize / 2);
        let rval, ival, mag;
        const k = Math.floor(Math.log(bufferSize) / Math.LN2);
        if (Math.pow(2, k) !== bufferSize) {
            throw 'Invalid buffer size, must be a power of 2.';
        }
        if (bufferSize !== buffer.length) {
            throw ('Supplied buffer is not the same size as defined FFT. FFT Size: ' +
                bufferSize +
                ' Buffer Size: ' +
                buffer.length);
        }
        let halfSize = 1, phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal, currentPhaseShiftImag, off, tr, ti, tmpReal;
        for (let i = 0; i < bufferSize; i++) {
            real[i] = buffer[reverseTable[i]] * this.windowValues[reverseTable[i]];
            imag[i] = 0;
        }
        while (halfSize < bufferSize) {
            phaseShiftStepReal = cosTable[halfSize];
            phaseShiftStepImag = sinTable[halfSize];
            currentPhaseShiftReal = 1;
            currentPhaseShiftImag = 0;
            for (let fftStep = 0; fftStep < halfSize; fftStep++) {
                let i = fftStep;
                while (i < bufferSize) {
                    off = i + halfSize;
                    tr = currentPhaseShiftReal * real[off] - currentPhaseShiftImag * imag[off];
                    ti = currentPhaseShiftReal * imag[off] + currentPhaseShiftImag * real[off];
                    real[off] = real[i] - tr;
                    imag[off] = imag[i] - ti;
                    real[i] += tr;
                    imag[i] += ti;
                    i += halfSize << 1;
                }
                tmpReal = currentPhaseShiftReal;
                currentPhaseShiftReal = tmpReal * phaseShiftStepReal - currentPhaseShiftImag * phaseShiftStepImag;
                currentPhaseShiftImag = tmpReal * phaseShiftStepImag + currentPhaseShiftImag * phaseShiftStepReal;
            }
            halfSize = halfSize << 1;
        }
        for (let i = 0, N = bufferSize / 2; i < N; i++) {
            rval = real[i];
            ival = imag[i];
            mag = bSi * sqrt(rval * rval + ival * ival);
            if (mag > this.peak) {
                this.peakBand = i;
                this.peak = mag;
            }
            spectrum[i] = mag;
        }
        return spectrum;
    };
}
export default FFT;
