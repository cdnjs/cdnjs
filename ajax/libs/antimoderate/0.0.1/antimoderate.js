(function() {
    var scaling_factor = 1.0;

    var am = {
        mul_table: [
            256,256,200,256,72,200,79,256,149,72,15,200,132,79,36,256,198,149,108,72,42,15,240,200,164,132,
            104,79,56,36,17,256,226,198,172,149,127,108,89,72,56,42,28,15,3,240,219,200,181,164,148,132,118,104,91,
            79,67,56,46,36,26,17,9,256,241,226,212,198,185,172,161,149,138,127,117,108,98,89,81,72,64,56,49,42,35,
            28,22,15,9,3,251,240,229,219,209,200,190,181,172,164,156,148,140,132,125,118,111,104,98,91,85,79,73,67,
            62,56,51,46,41,36,31,26,22,17,13,9,5,256,249,241,233,226,219,212,205,198,191,185,179,172,166,161,155,
            149,143,138,133,127,122,117,112,108,103,98,94,89,85,81,76,72,68,64,60,56,53,49,45,42,38,35,31,28,25,22,
            18,15,12,9,6,3,1,251,245,240,235,229,224,219,214,209,204,200,195,190,186,181,177,172,168,164,160,156,152,
            148,144,140,136,132,129,125,121,118,114,111,107,104,101,98,94,91,88,85,82,79,76,73,70,67,64,62,59,56,54,
            51,48,46,43,41,38,36,33,31,29,26,24,22,19,17,15,13,11,9,7,5,3
        ],

        shg_table: [9, 11, 12, 13, 13, 14, 14],

        processImage: function(img, idata, scale)
        {
            var canvas = document.createElement('canvas');

            var idata_img = new Image();
            idata_img.onload = function() {
                w = img.width;
                h = img.height;

                canvas.style.width  = w + 'px';
                canvas.style.height = h + 'px';
                canvas.width = w;
                canvas.height = h;

                var context = canvas.getContext('2d');
                context.clearRect(0, 0, w, h);
                context.drawImage(idata_img, 0, 0, w, h);

                var sc = scale || scaling_factor;
                radius = (Math.sqrt(w * h) / Math.sqrt(idata_img.naturalWidth * idata_img.naturalHeight)) * sc;

                if (isNaN(radius) || radius < 1) return;

                radius |= 0;

                var imageData = canvas.getContext('2d').getImageData(0, 0, w, h);

                var pixels = imageData.data;

                var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
                    r_out_sum, g_out_sum, b_out_sum,
                    r_in_sum, g_in_sum, b_in_sum,
                    pr, pg, pb, rbs;

                var div = radius + radius + 1;
                var w4 = w << 2;
                var wMinus1  = w - 1;
                var hMinus1 = h - 1;
                var radiusPlus1  = radius + 1;
                var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

                var stackStart = {r:0,g:0,b:0,a:0,next:null};
                var stack = stackStart;
                for(i = 1; i < div; i++) {
                    stack = stack.next = {r:0,g:0,b:0,a:0,next:null};

                    if (i == radiusPlus1) {
                        var stackEnd = stack;
                    }
                }
                stack.next = stackStart;
                var stackIn = null;
                var stackOut = null;

                yw = yi = 0;

                var mul_sum = am.mul_table[radius];
                var shg_sum = am.shg_table[radius];

                for(y = 0; y < h; y++) {
                    r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

                    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                    g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
                    b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

                    r_sum += sumFactor * pr;
                    g_sum += sumFactor * pg;
                    b_sum += sumFactor * pb;

                    stack = stackStart;

                    for(i = 0; i < radiusPlus1; i++) {
                        stack.r = pr;
                        stack.g = pg;
                        stack.b = pb;
                        stack = stack.next;
                    }

                    for(i = 1; i < radiusPlus1; i++) {
                        p = yi + ((wMinus1 < i ? wMinus1 : i) << 2);
                        r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
                        g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
                        b_sum += (stack.b = (pb = pixels[p+2])) * rbs;

                        r_in_sum += pr;
                        g_in_sum += pg;
                        b_in_sum += pb;

                        stack = stack.next;
                    }


                    stackIn = stackStart;
                    stackOut = stackEnd;
                    for(x = 0; x < w; x++) {
                        pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
                        pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
                        pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;

                        r_sum -= r_out_sum;
                        g_sum -= g_out_sum;
                        b_sum -= b_out_sum;

                        r_out_sum -= stackIn.r;
                        g_out_sum -= stackIn.g;
                        b_out_sum -= stackIn.b;

                        p =  (yw + ((p = x + radius + 1) < wMinus1 ? p : wMinus1)) << 2;

                        r_in_sum += (stackIn.r = pixels[p]);
                        g_in_sum += (stackIn.g = pixels[p+1]);
                        b_in_sum += (stackIn.b = pixels[p+2]);

                        r_sum += r_in_sum;
                        g_sum += g_in_sum;
                        b_sum += b_in_sum;

                        stackIn = stackIn.next;

                        r_out_sum += (pr = stackOut.r);
                        g_out_sum += (pg = stackOut.g);
                        b_out_sum += (pb = stackOut.b);

                        r_in_sum -= pr;
                        g_in_sum -= pg;
                        b_in_sum -= pb;

                        stackOut = stackOut.next;

                        yi += 4;
                    }
                    yw += w;
                }


                for(x = 0; x < w; x++) {
                    g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

                    yi = x << 2;
                    r_out_sum = radiusPlus1 * (pr = pixels[yi]);
                    g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
                    b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

                    r_sum += sumFactor * pr;
                    g_sum += sumFactor * pg;
                    b_sum += sumFactor * pb;

                    stack = stackStart;

                    for(i = 0; i < radiusPlus1; i++) {
                        stack.r = pr;
                        stack.g = pg;
                        stack.b = pb;
                        stack = stack.next;
                    }

                    yp = w;

                    for(i = 1; i <= radius; i++) {
                        yi = (yp + x) << 2;

                        r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
                        g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
                        b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;

                        r_in_sum += pr;
                        g_in_sum += pg;
                        b_in_sum += pb;

                        stack = stack.next;

                        if(i < hMinus1) {
                            yp += w;
                        }
                    }

                    yi = x;
                    stackIn = stackStart;
                    stackOut = stackEnd;
                    for(y = 0; y < h; y++) {
                        p = yi << 2;
                        pixels[p]   = (r_sum * mul_sum) >> shg_sum;
                        pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
                        pixels[p+2] = (b_sum * mul_sum) >> shg_sum;

                        r_sum -= r_out_sum;
                        g_sum -= g_out_sum;
                        b_sum -= b_out_sum;

                        r_out_sum -= stackIn.r;
                        g_out_sum -= stackIn.g;
                        b_out_sum -= stackIn.b;

                        p = (x + (((p = y + radiusPlus1) < hMinus1 ? p : hMinus1) * w)) << 2;

                        r_sum += (r_in_sum += (stackIn.r = pixels[p]));
                        g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
                        b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));

                        stackIn = stackIn.next;

                        r_out_sum += (pr = stackOut.r);
                        g_out_sum += (pg = stackOut.g);
                        b_out_sum += (pb = stackOut.b);

                        r_in_sum -= pr;
                        g_in_sum -= pg;
                        b_in_sum -= pb;

                        stackOut = stackOut.next;

                        yi += w;
                    }
                }

                var orig_src = img.getAttribute('src');
                if(orig_src != null && orig_src != '') {
                    var orig_img = new Image();
                    orig_img.onload = function() {
                        img.src = orig_src;
                    };
                    orig_img.src = orig_src;
                }

                canvas.getContext('2d').putImageData(imageData, 0, 0);
                img.src = canvas.toDataURL();
            };

            idata_img.src = idata;
        }
    };


    var shg_cur_n=15;

    var i=0;
    for(; i < am.mul_table.length;) {
        am.mul_table[i++] += 256;
    }

    function populate_shg(n){
        for(i = 0; i < n; ++i) {
            am.shg_table.push(shg_cur_n);
        }

        ++shg_cur_n;
    }

    populate_shg(4);
    populate_shg(4);
    populate_shg(7);
    populate_shg(9);
    populate_shg(14);
    populate_shg(18);
    populate_shg(27);
    populate_shg(37);
    populate_shg(54);
    populate_shg(74);

    module.exports = AntiModerate = { "process": am.processImage };
})();
