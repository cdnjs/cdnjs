const footerRuntime = () => {
  const startTime = theme.footerStart;
  window.setTimeout(footerRuntime, 1000); // passing function reference instead of string

  const X = new Date(startTime);
  const Y = new Date();
  const T = Y.getTime() - X.getTime();
  const M = 24 * 60 * 60 * 1000;
  const a = T / M;
  const A = Math.floor(a);
  const b = (a - A) * 24;
  const B = Math.floor(b);
  const c = (b - B) * 60;
  const C = Math.floor((b - B) * 60);
  const D = Math.floor((c - C) * 60);

  const runtime_days = document.getElementById("runtime_days");
  const runtime_hours = document.getElementById("runtime_hours");
  const runtime_minutes = document.getElementById("runtime_minutes");
  const runtime_seconds = document.getElementById("runtime_seconds");

  if (runtime_days) runtime_days.innerHTML = A;
  if (runtime_hours) runtime_hours.innerHTML = B;
  if (runtime_minutes) runtime_minutes.innerHTML = C;
  if (runtime_seconds) runtime_seconds.innerHTML = D;
};

window.addEventListener("DOMContentLoaded", footerRuntime);
