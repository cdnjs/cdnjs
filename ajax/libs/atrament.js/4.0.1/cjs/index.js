'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var WorkerClass = null;

try {
    var WorkerThreads =
        typeof module !== 'undefined' && typeof module.require === 'function' && module.require('worker_threads') ||
        typeof __non_webpack_require__ === 'function' && __non_webpack_require__('worker_threads') ||
        typeof require === 'function' && require('worker_threads');
    WorkerClass = WorkerThreads.Worker;
} catch(e) {} // eslint-disable-line

function decodeBase64$1(base64, enableUnicode) {
    return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
}

function createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64$1(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    return function WorkerFactory(options) {
        return new WorkerClass(body, Object.assign({}, options, { eval: true }));
    };
}

function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);
    if (enableUnicode) {
        var binaryView = new Uint8Array(binaryString.length);
        for (var i = 0, n = binaryString.length; i < n; ++i) {
            binaryView[i] = binaryString.charCodeAt(i);
        }
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return function WorkerFactory(options) {
        url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
        return new Worker(url, options);
    };
}

var kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

function isNodeJS() {
    return kIsNodeJS;
}

function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    if (isNodeJS()) {
        return createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg);
    }
    return createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg);
}

var WorkerFactory = createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgLy8gY29sb3VyIGluZGljZXMgcGVyIHBpeGVsCiAgY29uc3QgUiA9IDA7CiAgY29uc3QgRyA9IDE7CiAgY29uc3QgQiA9IDI7CiAgY29uc3QgQSA9IDM7CgogIGNvbnN0IFBJWEVMID0gNDsKICBjb25zdCBUUkFOU1BBUkVOVCA9IDA7CiAgY29uc3QgT1BBUVVFID0gMjU1OwoKICBjb25zdCBoZXhUb1JnYiA9IChoZXhDb2xvcikgPT4gewogICAgLy8gU2luY2UgaW5wdXQgdHlwZSBjb2xvciBwcm92aWRlcyBoZXggYW5kIEltYWdlRGF0YSBhY2NlcHRzIFJHQiBuZWVkIHRvIHRyYW5zZm9ybQogICAgY29uc3QgbSA9IGhleENvbG9yLm1hdGNoKC9eIz8oW1xkYS1mXXsyfSkoW1xkYS1mXXsyfSkoW1xkYS1mXXsyfSkkL2kpOwogICAgcmV0dXJuIFsKICAgICAgcGFyc2VJbnQobVsxXSwgMTYpLAogICAgICBwYXJzZUludChtWzJdLCAxNiksCiAgICAgIHBhcnNlSW50KG1bM10sIDE2KSwKICAgIF07CiAgfTsKCiAgLy8gUGl4ZWwgY29sb3IgZXF1YWxzIGNvbXAgY29sb3I/CiAgY29uc3QgY29sb3JNYXRjaGVyID0gKGRhdGEsIGNvbXBSLCBjb21wRywgY29tcEIsIGNvbXBBKSA9PiAocGl4ZWxQb3MpID0+ICgKICAgIGRhdGFbcGl4ZWxQb3MgKyBSXSA9PT0gY29tcFIKICAgICYmIGRhdGFbcGl4ZWxQb3MgKyBHXSA9PT0gY29tcEcKICAgICYmIGRhdGFbcGl4ZWxQb3MgKyBCXSA9PT0gY29tcEIKICAgICYmIGRhdGFbcGl4ZWxQb3MgKyBBXSA9PT0gY29tcEEKICApOwoKICBjb25zdCBjb2xvck1hdGNoZXJJZ25vcmVBbHBoYSA9IChkYXRhLCAuLi5hcmdzKSA9PiB7CiAgICBjb25zdCBtYXRjaCA9IGNvbG9yTWF0Y2hlcihkYXRhLCAuLi5hcmdzKTsKCiAgICByZXR1cm4gKHBpeGVsUG9zKSA9PiB7CiAgICAgIGNvbnN0IGFscGhhID0gZGF0YVtwaXhlbFBvcyArIEFdOwogICAgICBpZiAoYWxwaGEgIT09IFRSQU5TUEFSRU5UICYmIGFscGhhICE9PSBPUEFRVUUpIHsKICAgICAgICByZXR1cm4gdHJ1ZTsKICAgICAgfQoKICAgICAgcmV0dXJuIG1hdGNoKHBpeGVsUG9zKTsKICAgIH07CiAgfTsKCiAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi8KICBjb25zdCBwaXhlbFBhaW50ZXIgPSAoZGF0YSwgZmlsbFIsIGZpbGxHLCBmaWxsQiwgZmlsbEEpID0+IChwaXhlbFBvcykgPT4gewogICAgZGF0YVtwaXhlbFBvcyArIFJdID0gZmlsbFI7CiAgICBkYXRhW3BpeGVsUG9zICsgR10gPSBmaWxsRzsKICAgIGRhdGFbcGl4ZWxQb3MgKyBCXSA9IGZpbGxCOwogICAgZGF0YVtwaXhlbFBvcyArIEFdID0gZmlsbEE7CiAgfTsKCiAgY29uc3QgcGl4ZWxQYWludGVyTWl4QWxwaGEgPSAoZGF0YSwgZmlsbFIsIGZpbGxHLCBmaWxsQiwgZmlsbEEpID0+IChwaXhlbFBvcykgPT4gewogICAgY29uc3Qgb2xkQWxwaGEgPSBkYXRhW3BpeGVsUG9zICsgQV07CiAgICAvLyBjYWxjdWxhdGUgcmF0aW8gb2Ygb2xkIHZzLiBuZXcgY29sb3VyIHRvIGJlIGFscGhhLW1peGVkCiAgICBjb25zdCBtaXhBbHBoYU9sZCA9IG9sZEFscGhhID09PSBPUEFRVUUKICAgICAgPyBUUkFOU1BBUkVOVAogICAgICA6IG9sZEFscGhhIC8gT1BBUVVFOwogICAgY29uc3QgbWl4QWxwaGFOZXcgPSAxIC0gbWl4QWxwaGFPbGQ7CgogICAgY29uc3QgcGFpbnQgPSBwaXhlbFBhaW50ZXIoCiAgICAgIGRhdGEsCiAgICAgIE1hdGguZmxvb3IobWl4QWxwaGFPbGQgKiBkYXRhW3BpeGVsUG9zICsgUl0gKyBtaXhBbHBoYU5ldyAqIGZpbGxSKSwKICAgICAgTWF0aC5mbG9vcihtaXhBbHBoYU9sZCAqIGRhdGFbcGl4ZWxQb3MgKyBHXSArIG1peEFscGhhTmV3ICogZmlsbEcpLAogICAgICBNYXRoLmZsb29yKG1peEFscGhhT2xkICogZGF0YVtwaXhlbFBvcyArIEJdICsgbWl4QWxwaGFOZXcgKiBmaWxsQiksCiAgICAgIGZpbGxBLAogICAgKTsKCiAgICByZXR1cm4gcGFpbnQocGl4ZWxQb3MpOwogIH07CiAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqLwoKICAvKioKICAgKiBTdGFjay0gYW5kIHNwYW4tYmFzZWQgZmxvb2QgZmlsbCBhbGdvcml0aG0KICAgKiBzZWUgaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmxvb2RfZmlsbCNTcGFuX2ZpbGxpbmcKICAgKgogICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnMgb2JqZWN0CiAgICogQHJldHVybnMge1VJbnQ4Q2xhbXBlZEFycmF5fSB0aGUgbW9kaWZpZWQgcGl4ZWxzCiAgICovCiAgY29uc3QgZmxvb2RGaWxsID0gKHsKICAgIGltYWdlLAogICAgd2lkdGgsCiAgICBoZWlnaHQsCiAgICBjb2xvciwKICAgIGdsb2JhbEFscGhhLAogICAgc3RhcnRYLAogICAgc3RhcnRZLAogICAgc3RhcnRDb2xvciwKICB9KSA9PiB7CiAgICBjb25zdCByb3cgPSB3aWR0aCAqIFBJWEVMOwogICAgLy8gbWFrZSBzdXJlIHN0YXJ0IGNvb3JkaW5hdGVzIGFyZSBpbnRlZ2VycwogICAgY29uc3Qgc3RhcnRYQ29vcmQgPSBNYXRoLmZsb29yKHN0YXJ0WCk7CiAgICBjb25zdCBzdGFydFlDb29yZCA9IE1hdGguZmxvb3Ioc3RhcnRZKTsKICAgIC8vIGhleCBuZWVkcyB0byBiZSB0cmFzZm9ybWVkIHRvIHJnYiBzaW5jZSBJbWFnZURhdGEgdXNlcyBSR0IKICAgIGNvbnN0IGZpbGxDb2xvciA9IGhleFRvUmdiKGNvbG9yKTsKICAgIC8vIGVuc3VyZSBhbHBoYSBpcyBhbiBpbnRlZ2VyIGluIHRoZSByYW5nZSBvZiAwLTI1NQogICAgY29uc3QgZmlsbEFscGhhID0gTWF0aC5mbG9vcihNYXRoLm1heCgwLCBNYXRoLm1pbihnbG9iYWxBbHBoYSAqIE9QQVFVRSwgT1BBUVVFKSkpOwogICAgLy8gd2UgbmVlZCBkaWZmZXJlbnQgYmVoYXZpb3VyIGluIGNhc2Ugd2UncmUgZmlsbGluZyBhIG5vbi1vcGFxdWUgYXJlYQogICAgY29uc3QgZmlsbGluZ05vbk9wYXF1ZSA9IHN0YXJ0Q29sb3JbQV0gIT09IE9QQVFVRTsKICAgIC8vIG91ciBwaXhlbCBwYWludGVyIHNob3VsZCBvbmx5IG1peCBhbHBoYSBpZiB3ZSdyZSBzdGFydGluZyBpbiBhIG5vbi1vcGFxdWUgYXJlYQogICAgY29uc3QgcGl4ZWxQYWludGVyT2ZDaG9pY2UgPSBmaWxsaW5nTm9uT3BhcXVlID8gcGl4ZWxQYWludGVyTWl4QWxwaGEgOiBwaXhlbFBhaW50ZXI7CiAgICBjb25zdCBwYWludFBpeGVsID0gcGl4ZWxQYWludGVyT2ZDaG9pY2UoaW1hZ2UsIC4uLmZpbGxDb2xvciwgZmlsbEFscGhhKTsKICAgIC8vIHdoZW4gbG9va2luZyBmb3IgdGhlIHNwYW4gc3RhcnQsIHdlIGlnbm9yZSB0aGUgYWxwaGEgdmFsdWUgaWYgZmlsbGluZyBhIG5vbi1vcGFxdWUgYXJlYQogICAgLy8gdGhpcyBlbnN1cmVzIHRoYXQgd2UnbGwgbWl4IHRoZSBmaWxsIGludG8gYW50aWFsaWFzZWQgZWRnZXMKICAgIGNvbnN0IGNvbG9yTWF0Y2hlclNwYW5TdGFydCA9IGZpbGxpbmdOb25PcGFxdWUgPyBjb2xvck1hdGNoZXJJZ25vcmVBbHBoYSA6IGNvbG9yTWF0Y2hlcjsKICAgIGNvbnN0IG1hdGNoU3BhblN0YXJ0Q29sb3IgPSBjb2xvck1hdGNoZXJTcGFuU3RhcnQoaW1hZ2UsIC4uLnN0YXJ0Q29sb3IpOwogICAgLy8gZm9yIGFsbCBvdGhlciBjYXNlcywgd2UgbG9vayBmb3IgdGhlIHN0YXJ0IGNvbG91ciBleGFjdGx5CiAgICBjb25zdCBtYXRjaFN0YXJ0Q29sb3IgPSBjb2xvck1hdGNoZXJJZ25vcmVBbHBoYShpbWFnZSwgLi4uc3RhcnRDb2xvcik7CgogICAgLy8gY2hlY2sgaWYgd2UncmUgdHJ5aW5nIHRvIGZpbGwgd2l0aCB0aGUgc2FtZSBjb2xvdXIsIGlmIHNvLCBzdG9wCiAgICBjb25zdCBtYXRjaEZpbGxDb2xvciA9IGNvbG9yTWF0Y2hlcihpbWFnZSwgLi4uWy4uLmZpbGxDb2xvciwgT1BBUVVFXSk7CiAgICBpZiAobWF0Y2hGaWxsQ29sb3IoKHN0YXJ0WUNvb3JkICogd2lkdGggKyBzdGFydFhDb29yZCkgKiBQSVhFTCkpIHsKICAgICAgcmV0dXJuIGltYWdlOwogICAgfQogICAgLy8gYmVnaW4gd2l0aCBvdXIgc3RhcnQgcGl4ZWwKICAgIGNvbnN0IHBpeGVsU3RhY2sgPSBbW3N0YXJ0WENvb3JkLCBzdGFydFlDb29yZF1dOwogICAgd2hpbGUgKHBpeGVsU3RhY2subGVuZ3RoKSB7CiAgICAgIGNvbnN0IFt4LCB5XSA9IHBpeGVsU3RhY2sucG9wKCk7CiAgICAgIC8vIGNvbHVtbiBwb3NpdGlvbiBpcyBpbiBjYXJ0ZXNpYW4gc3BhY2UgKHgseSkKICAgICAgbGV0IGNvbHVtblBvc2l0aW9uID0geTsKICAgICAgLy8gcGl4ZWwgcG9zaXRpb24gaXMgaW4gMUQgc3BhY2UgKHRoZSByYXcgaW1hZ2UgZGF0YSBVSW50OENsYW1wZWRBcnJheSkKICAgICAgbGV0IHBpeGVsUG9zID0gKGNvbHVtblBvc2l0aW9uICogd2lkdGggKyB4KSAqIFBJWEVMOwogICAgICAvLyBzdGFydCBtb3ZpbmcgZGlyZWN0bHkgdXAgZnJvbSBvdXIgc3RhcnQgcG9zaXRpb24KICAgICAgLy8gdW50aWwgd2UgZmluZCBhIGRpZmZlcmVudCBjb2xvdXIgdG8gdGhlIHN0YXJ0IGNvbG91cgogICAgICAvLyB0aGlzIGlzIHRoZSBiZWdpbm5pbmcgb2Ygb3VyIHNwYW4KICAgICAgd2hpbGUgKGNvbHVtblBvc2l0aW9uLS0gPj0gMCAmJiBtYXRjaFNwYW5TdGFydENvbG9yKHBpeGVsUG9zKSkgewogICAgICAgIHBpeGVsUG9zIC09IHJvdzsKICAgICAgfQogICAgICAvLyBtb3ZlIG9uZSByb3cgZG93biAodG9wbW9zdCBwaXhlbCBvZiBmaWxsYWJsZSBhcmVhKQogICAgICBwaXhlbFBvcyArPSByb3c7CgogICAgICBsZXQgcmVhY2hMZWZ0ID0gZmFsc2U7CiAgICAgIGxldCByZWFjaFJpZ2h0ID0gZmFsc2U7CiAgICAgIC8vIGZvciBlYWNoIHJvdywgY2hlY2sgaWYgdGhlIGZpcnN0IHBpeGVsIHN0aWxsIGhhcyB0aGUgc3RhcnQgY29sb3VyCiAgICAgIC8vIGlmIGl0IGRvZXMsIHBhaW50IGl0IGFuZCBwdXNoIHN1cnJvdW5kaW5nIHBpeGVscyB0byB0aGUgc3RhY2sgb2YgcGl4ZWxzIHRvIGNoZWNrCiAgICAgIHdoaWxlICgrK2NvbHVtblBvc2l0aW9uIDwgaGVpZ2h0IC0gMSAmJiBtYXRjaFN0YXJ0Q29sb3IocGl4ZWxQb3MpKSB7CiAgICAgICAgcGFpbnRQaXhlbChwaXhlbFBvcyk7CiAgICAgICAgLy8gY2hlY2sgdGhlIHBpeGVsIHRvIHRoZSBsZWZ0CiAgICAgICAgaWYgKHggPiAwKSB7CiAgICAgICAgICBpZiAobWF0Y2hTdGFydENvbG9yKHBpeGVsUG9zIC0gUElYRUwpKSB7CiAgICAgICAgICAgIGlmICghcmVhY2hMZWZ0KSB7CiAgICAgICAgICAgICAgcGl4ZWxTdGFjay5wdXNoKFt4IC0gMSwgY29sdW1uUG9zaXRpb25dKTsKICAgICAgICAgICAgICByZWFjaExlZnQgPSB0cnVlOwogICAgICAgICAgICB9CiAgICAgICAgICB9IGVsc2UgaWYgKHJlYWNoTGVmdCkgewogICAgICAgICAgICByZWFjaExlZnQgPSBmYWxzZTsKICAgICAgICAgIH0KICAgICAgICB9CiAgICAgICAgLy8gY2hlY2sgdGhlIHBpeGVsIHRvIHRoZSByaWdodAogICAgICAgIGlmICh4IDwgd2lkdGggLSAxKSB7CiAgICAgICAgICBpZiAobWF0Y2hTdGFydENvbG9yKHBpeGVsUG9zICsgUElYRUwpKSB7CiAgICAgICAgICAgIGlmICghcmVhY2hSaWdodCkgewogICAgICAgICAgICAgIHBpeGVsU3RhY2sucHVzaChbeCArIDEsIGNvbHVtblBvc2l0aW9uXSk7CiAgICAgICAgICAgICAgcmVhY2hSaWdodCA9IHRydWU7CiAgICAgICAgICAgIH0KICAgICAgICAgIH0gZWxzZSBpZiAocmVhY2hSaWdodCkgewogICAgICAgICAgICByZWFjaFJpZ2h0ID0gZmFsc2U7CiAgICAgICAgICB9CiAgICAgICAgfQogICAgICAgIC8vIG1vdmUgdG8gdGhlIG5leHQgcm93CiAgICAgICAgcGl4ZWxQb3MgKz0gcm93OwogICAgICB9CiAgICB9CgogICAgcmV0dXJuIGltYWdlOwogIH07CgogIGdsb2JhbFRoaXMuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsICh7IGRhdGEgfSkgPT4gewogICAgY29uc3QgcmVzdWx0ID0gZmxvb2RGaWxsKGRhdGEpOwoKICAgIGdsb2JhbFRoaXMucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZmlsbC1yZXN1bHQnLCByZXN1bHQgfSwgW3Jlc3VsdC5idWZmZXJdKTsKICB9KTsKCn0pKCk7Ci8vIyBzb3VyY2VNYXBwaW5nVVJMPXdvcmtlci5qcy5tYXAKCg==', null, false);
/* eslint-enable */

/* eslint-disable max-classes-per-file */
// make a class for Point
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
  }
}

// make a class for the mouse data
class Mouse extends Point {
  constructor() {
    super(0, 0);
    this.down = false;
    this.previous = new Point(0, 0);
  }
}

class AtramentEventTarget {
  constructor() {
    this.eventListeners = new Map();
  }

  addEventListener(eventName, handler) {
    const handlers = this.eventListeners.get(eventName) || new Set();
    handlers.add(handler);
    this.eventListeners.set(eventName, handlers);
  }

  removeEventListener(eventName, handler) {
    const handlers = this.eventListeners.get(eventName);
    if (!handlers) return;
    handlers.delete(handler);
  }

  dispatchEvent(eventName, data) {
    const handlers = this.eventListeners.get(eventName);
    if (!handlers) return;
    [...handlers].forEach((handler) => handler(data));
  }
}

// colour indices per pixel

const lineDistance = (x1, y1, x2, y2) => {
  // calculate euclidean distance between (x1, y1) and (x2, y2)
  const xs = (x2 - x1) ** 2;
  const ys = (y2 - y1) ** 2;
  return Math.sqrt(xs + ys);
};
/* eslint-enable no-param-reassign */

const pointerEventHandler = (handler) => (event) => {
  if (!event.isPrimary) {
    return;
  }

  if (event.cancelable) {
    event.preventDefault();
  }

  handler(event);
};

const setupPointerEvents = ({
  canvas,
  move,
  down,
  up,
}) => {
  const moveListener = pointerEventHandler(move);
  const downListener = pointerEventHandler(down);
  const upListener = pointerEventHandler(up);

  canvas.addEventListener('pointermove', moveListener);
  canvas.addEventListener('pointerdown', downListener);
  document.addEventListener('pointerup', upListener);

  return () => {
    canvas.removeEventListener('pointermove', moveListener);
    canvas.removeEventListener('pointerdown', downListener);
    document.removeEventListener('pointerup', upListener);
  };
};

const MAX_LINE_THICKNESS = 100;

const MIN_LINE_THICKNESS = 2;
const LINE_THICKNESS_RANGE = MAX_LINE_THICKNESS - MIN_LINE_THICKNESS;
const THICKNESS_INCREMENT = 0.25;
const MIN_SMOOTHING_FACTOR = 0.87;
const INITIAL_SMOOTHING_FACTOR = 0.85;
const WEIGHT_SPREAD = 30;
const INITIAL_THICKNESS = 2;
const DEFAULT_PRESSURE = 0.5;

// eslint-disable-next-line import/no-unresolved

const MODE_DRAW = Symbol('atrament mode - draw');
const MODE_ERASE = Symbol('atrament mode - erase');
const MODE_FILL = Symbol('atrament mode - fill');
const MODE_DISABLED = Symbol('atrament mode - disabled');

const pathDrawingModes = [MODE_DRAW, MODE_ERASE];
const configKeys = ['weight', 'smoothing', 'adaptiveStroke', 'mode'];

class Atrament extends AtramentEventTarget {
  adaptiveStroke = true;
  canvas;
  recordStrokes = false;
  smoothing = INITIAL_SMOOTHING_FACTOR;
  thickness = INITIAL_THICKNESS;

  #context;
  #dirty = false;
  #filling = false;
  #fillStack = [];
  #fillWorker = new WorkerFactory();
  #mode = MODE_DRAW;
  #mouse = new Mouse();
  #pressure = DEFAULT_PRESSURE;
  #removePointerEventListeners;
  #strokeMemory = [];
  #thickness = INITIAL_THICKNESS;
  #weight = INITIAL_THICKNESS;

  constructor(selector, config = {}) {
    if (typeof window === 'undefined') {
      throw new Error('atrament: looks like we\'re not running in a browser');
    }

    super();

    this.canvas = Atrament.#setupCanvas(selector, config);
    this.#context = Atrament.#setupContext(this.canvas, config);
    this.#setupFill();

    this.#removePointerEventListeners = setupPointerEvents({
      canvas: this.canvas,
      move: this.#pointerMove.bind(this),
      down: this.#pointerDown.bind(this),
      up: this.#pointerUp.bind(this),
    });

    configKeys.forEach((key) => {
      if (config[key] !== undefined) {
        this[key] = config[key];
      }
    });
  }

  /**
   * Begins a stroke at a given position
   *
   * @param {number} x
   * @param {number} y
   */
  beginStroke(x, y) {
    this.#context.moveTo(x, y);
    this.#thickness = this.#weight;

    if (this.recordStrokes) {
      this.strokeTimestamp = performance.now();
    }

    this.dispatchEvent('strokestart', { x, y });
  }

  /**
   * Ends a stroke at a given position
   *
   * @param {number} x
   * @param {number} y
   */
  endStroke(x, y) {
    this.dispatchEvent('strokeend', { x, y });

    if (this.recordStrokes) {
      this.dispatchEvent('strokerecorded', { stroke: this.currentStroke });
    }
    this.#strokeMemory = [];
    delete (this.strokeTimestamp);
  }

  /**
   * Draws the next stroke segment as a smooth quadratic curve
   * with adaptive stroke thickness between two points.
   *
   * @param {number} x current X coordinate
   * @param {number} y current Y coordinate
   * @param {number} prevX previous X coordinate
   * @param {number} prevY previous Y coordinate
   */
  draw(x, y, prevX, prevY) {
    // get distance from the previous point
    // and use it to calculate the smoothed coordinates
    const smoothingFactor = this.getSmoothingFactor(lineDistance(x, y, prevX, prevY));
    const procX = x - (x - prevX) * smoothingFactor;
    const procY = y - (y - prevY) * smoothingFactor;

    // recalculate distance from previous point, this time relative to the smoothed coords
    const dist = lineDistance(procX, procY, prevX, prevY);

    // Adaptive stroke allows an effect where thickness changes
    // over the course of the stroke. This simulates the variation in
    // ink discharge of a physical pen.
    if (this.adaptiveStroke) {
      // Thickness range is inversely proportional to pressure,
      // because with higher pressure, the effect of distance
      // on the thickness ratio should be greater.
      const range = LINE_THICKNESS_RANGE * (1 - this.#pressure);
      const ratio = (dist - MIN_LINE_THICKNESS) / range;
      const targetThickness = ratio * (this.#maxWeight - this.#weight) + this.#weight;
      // approach the target gradually
      if (this.#thickness > targetThickness) {
        this.#thickness -= THICKNESS_INCREMENT;
      } else if (this.#thickness < targetThickness) {
        this.#thickness += THICKNESS_INCREMENT;
      }
    } else {
      this.#thickness = this.#weight;
    }

    this.#context.lineWidth = this.#thickness;

    // Draw the segment using quad interpolation.
    this.#context.beginPath();
    this.#context.moveTo(prevX, prevY);
    this.#context.quadraticCurveTo(prevX, prevY, procX, procY);
    this.#context.closePath();
    this.#context.stroke();

    if (this.recordStrokes) {
      this.#strokeMemory.push({
        point: new Point(x, y),
        time: performance.now() - this.strokeTimestamp,
      });

      this.dispatchEvent('segmentdrawn', { stroke: this.currentStroke });
    }

    return { x: procX, y: procY };
  }

  clear() {
    if (!this.#dirty) {
      return;
    }

    this.#dirty = false;
    this.dispatchEvent('clean');

    // make sure we're in the right compositing mode, and erase everything
    if (this.mode === MODE_ERASE) {
      this.mode = MODE_DRAW;
      this.#context.clearRect(-10, -10, this.canvas.width + 20, this.canvas.height + 20);
      this.mode = MODE_ERASE;
    } else {
      this.#context.clearRect(-10, -10, this.canvas.width + 20, this.canvas.height + 20);
    }
  }

  destroy() {
    this.clear();
    this.#removePointerEventListeners?.();
  }

  get color() {
    return this.#context.strokeStyle;
  }

  set color(c) {
    if (typeof c !== 'string') throw new Error('atrament: wrong argument type setting color');
    this.#context.strokeStyle = c;
  }

  get weight() {
    return this.#weight;
  }

  set weight(w) {
    if (typeof w !== 'number') throw new Error('atrament: wrong argument type setting weight');
    this.#thickness = w;
    this.#weight = w;
  }

  // For small weights, this allows for a lot of spread,
  // while for larger weights, the effect is less prominent.
  // This means at small weights, Atrament behaves more like an ink pen,
  // and at larger weights more like a marker.
  get #maxWeight() {
    return this.#weight + WEIGHT_SPREAD;
  }

  // Here we scale the initial smoothing factor by the raw distance
  // - this means that when the mouse moves fast, there is more smoothing,
  // and when we're drawing small detailed stuff, we have more control.
  getSmoothingFactor(dist) {
    return Math.min(
      MIN_SMOOTHING_FACTOR,
      this.smoothing + (dist - 60) / 3000,
    );
  }

  get mode() {
    return this.#mode;
  }

  set mode(m) {
    switch (m) {
      case MODE_ERASE:
        this.#mode = MODE_ERASE;
        this.#context.globalCompositeOperation = 'destination-out';
        break;
      case MODE_FILL:
        this.#mode = MODE_FILL;
        this.#context.globalCompositeOperation = 'source-over';
        break;
      case MODE_DISABLED:
        this.#mode = MODE_DISABLED;
        break;
      case MODE_DRAW:
        this.#mode = MODE_DRAW;
        this.#context.globalCompositeOperation = 'source-over';
        break;
      default:
        throw new Error('atrament: mode is not one of the allowed modes.');
    }
  }

  get currentStroke() {
    return {
      segments: this.#strokeMemory.slice(),
      mode: this.mode,
      weight: this.weight,
      smoothing: this.smoothing,
      color: this.color,
      adaptiveStroke: this.adaptiveStroke,
    };
  }

  get dirty() {
    return this.#dirty;
  }

  static #setupCanvas(selector, config) {
    let canvas;
    // get canvas element
    if (selector instanceof window.Node && selector.tagName === 'CANVAS') canvas = selector;
    else if (typeof selector === 'string') canvas = document.querySelector(selector);
    else throw new Error(`atrament: can't look for canvas based on '${selector}'`);
    if (!canvas) throw new Error('atrament: canvas not found');

    canvas.width = (config.width || canvas.width) * window.devicePixelRatio;
    canvas.height = (config.height || canvas.height) * window.devicePixelRatio;
    canvas.style.touchAction = 'none';

    return canvas;
  }

  static #setupContext(canvas, config) {
    const context = canvas.getContext('2d');
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
    context.globalCompositeOperation = 'source-over';
    context.globalAlpha = 1;
    context.strokeStyle = config.color || 'rgba(0,0,0,1)';
    context.lineCap = 'round';
    context.lineJoin = 'round';

    return context;
  }

  #pointerMove(event) {
    const positions = event.getCoalescedEvents?.() || [event];
    positions.forEach((position) => {
      const x = position.offsetX;
      const y = position.offsetY;

      // draw if we should draw
      if (this.#mouse.down && pathDrawingModes.includes(this.#mode)) {
        const { x: newX, y: newY } = this.draw(
          x,
          y,
          this.#mouse.previous.x || x,
          this.#mouse.previous.y || y,
        );

        if (!this.#dirty
          && this.#mode === MODE_DRAW && (x !== this.#mouse.x || y !== this.#mouse.y)) {
          this.#dirty = true;
          this.dispatchEvent('dirty');
        }

        this.#mouse.set(x, y);
        this.#mouse.previous.set(newX, newY);
        // Android Chrome sets pressure to constant 1 by default, which would break the algorithm
        // We also handle the case when pressure is 0.
        this.#pressure = position.pressure === 1
          ? DEFAULT_PRESSURE
          : position.pressure || DEFAULT_PRESSURE;
      } else {
        this.#mouse.set(x, y);
      }
    });
  }

  #pointerDown(event) {
    // if we are filling - fill and return
    if (this.mode === MODE_FILL) {
      this.#fill();
      return;
    }

    this.#mouse.down = true;
    // update position just in case
    this.#pointerMove(event);

    this.beginStroke(this.#mouse.previous.x, this.#mouse.previous.y);
  }

  #pointerUp(event) {
    if (this.#mode === MODE_FILL) {
      return;
    }

    if (!this.#mouse.down) {
      return;
    }

    this.#mouse.down = false;

    if (this.#mouse.x === event.offsetX
      && this.#mouse.y === event.offsetY && pathDrawingModes.includes(this.mode)) {
      this.draw(
        this.#mouse.x,
        this.#mouse.y,
        this.#mouse.previous.x,
        this.#mouse.previous.y,
      );
      this.#mouse.previous.set(0, 0);
    }

    this.endStroke(this.#mouse.x, this.#mouse.y);
  }

  #setupFill() {
    this.#fillWorker.addEventListener('message', ({ data }) => {
      if (data.type === 'fill-result') {
        this.#filling = false;
        this.dispatchEvent('fillend', {});

        const imageData = new ImageData(data.result, this.canvas.width, this.canvas.height);
        this.#context.putImageData(imageData, 0, 0);

        if (this.#fillStack.length > 0) {
          this.#postToFillWorker(this.#fillStack.shift());
        }
      }
    });
  }

  #fill() {
    const { x, y } = this.#mouse;
    this.dispatchEvent('fillstart', { x, y });

    const startColor = Array.from(this.#context.getImageData(x, y, 1, 1).data);
    const fillData = {
      color: this.color,
      globalAlpha: this.#context.globalAlpha,
      width: this.canvas.width,
      height: this.canvas.height,
      startColor,
      startX: x * window.devicePixelRatio,
      startY: y * window.devicePixelRatio,
    };

    if (!this.#filling) {
      this.#filling = true;
      this.#postToFillWorker(fillData);
    } else {
      this.#fillStack.push(fillData);
    }
  }

  #postToFillWorker(fillData) {
    const image = this.#context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    this.#fillWorker.postMessage({ image, ...fillData }, [image.buffer]);
  }
}

exports.MODE_DISABLED = MODE_DISABLED;
exports.MODE_DRAW = MODE_DRAW;
exports.MODE_ERASE = MODE_ERASE;
exports.MODE_FILL = MODE_FILL;
exports.default = Atrament;
