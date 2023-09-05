function footerRuntime() {
    var startTime = Global.theme_config.footerStart;
    window.setTimeout("footerRuntime()", 1000);
    X = new Date(startTime);
    Y = new Date();
    T = (Y.getTime() - X.getTime());
    M = 24 * 60 * 60 * 1000;
    a = T / M;
    A = Math.floor(a);
    b = (a - A) * 24;
    B = Math.floor(b);
    c = (b - B) * 60;
    C = Math.floor((b - B) * 60);
    D = Math.floor((c - C) * 60);
    runtime_days.innerHTML = A;
    runtime_hours.innerHTML = B;
    runtime_minutes.innerHTML = C;
    runtime_seconds.innerHTML = D;
}

if (Global.theme_config.global.pjax === true && Global.utils) {
    footerRuntime();
} else {
    window.addEventListener('DOMContentLoaded', footerRuntime);
}