/*
  솔루션 소개 페이지 공용 스크립트. 홈페이지(hms-home.html)의 같은 일을 하는 부분을 옮겼다.

    1) 밝게 · 어둡게 고르기 — 홈페이지와 같은 이름(hms-theme)으로 적어 두어 서로 이어진다.
    2) 첫 화면 바탕의 필지 그림 — 홈페이지와 같은 씨앗이라 같은 그림이 나온다.
    3) 내려받기 단추를 누른 횟수 세기 — 홈페이지와 같은 키(center-setup · guide-*)로 보내
       홈페이지 숫자에 합쳐진다. 누를 때만 보내고, 페이지를 열었다는 것은 보내지 않는다.

  페이지를 그리는 데 이 파일이 꼭 있어야 하지는 않다. 못 받아도 글과 링크는 그대로 보인다.
*/
(function () {
  /* 1) 밝게 · 어둡게.
     아무것도 고르지 않으면 시스템 설정을 따른다. 고른 값은 <head> 의 한 줄이 그리기 전에
     이미 붙여 두었다(깜빡임 방지). 여기서는 단추를 잇고 눌린 모양만 맞춘다. */
  var KEY = "hms-theme";
  var root = document.documentElement;
  var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-theme-set]"));

  function apply(mode) {
    if (mode === "light" || mode === "dark") root.setAttribute("data-theme", mode);
    else root.removeAttribute("data-theme");
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-theme-set") === mode));
    });
    if (window.hmsRedrawPlots) window.hmsRedrawPlots();
  }

  var saved = "system";
  try { saved = localStorage.getItem(KEY) || "system"; } catch (e) { }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var mode = b.getAttribute("data-theme-set");
      try { localStorage.setItem(KEY, mode); } catch (e) { }
      apply(mode);
    });
  });

  /* 2) 필지 그림. 홈페이지와 같은 방법 · 같은 씨앗이다. */
  (function () {
    var cv = document.getElementById("plots");
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext("2d");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function line() {
      return getComputedStyle(document.documentElement).getPropertyValue("--grid").trim() || "#DCE3ED";
    }
    function draw() {
      var dpr = window.devicePixelRatio || 1;
      var w = cv.clientWidth, h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = line();
      ctx.lineWidth = 1;
      var seed = 20260827;
      function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; }
      var cell = 108;
      var cols = Math.ceil(w / cell) + 1, rows = Math.ceil(h / cell) + 1;
      var pts = [];
      for (var r = 0; r <= rows; r++) {
        pts[r] = [];
        for (var c = 0; c <= cols; c++) {
          pts[r][c] = { x: c * cell + (rnd() - .5) * cell * .5, y: r * cell + (rnd() - .5) * cell * .5 };
        }
      }
      for (var r2 = 0; r2 < rows; r2++) {
        for (var c2 = 0; c2 < cols; c2++) {
          var a = pts[r2][c2], b = pts[r2][c2 + 1], d = pts[r2 + 1][c2 + 1], e = pts[r2 + 1][c2];
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(d.x, d.y); ctx.lineTo(e.x, e.y);
          ctx.closePath(); ctx.stroke();
          if (rnd() > .68) {
            ctx.beginPath();
            ctx.moveTo((a.x + e.x) / 2, (a.y + e.y) / 2);
            ctx.lineTo((b.x + d.x) / 2, (b.y + d.y) / 2);
            ctx.stroke();
          }
        }
      }
    }
    window.hmsRedrawPlots = draw;
    draw();
    var timer;
    window.addEventListener("resize", function () {
      if (reduce) return;
      clearTimeout(timer); timer = setTimeout(draw, 160);
    });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", draw);
    }
  })();

  apply(saved);

  /* 3) 내려받기 세기. 파일은 GitHub 에서 그대로 받아 가고, 여기서는 '한 번 눌렸다' 만
     알린다. 서버가 멈춰 있어도 내려받기는 된다 — 숫자만 놓친다. text/plain 으로 보내는
     까닭은 홈페이지 스크립트의 주석에 있다(sendBeacon 은 사전 확인 요청을 못 한다). */
  var HIT = "https://novxbimaerfjszsxejlt.supabase.co/functions/v1/hms-catalog/api/download-hit";
  function tell(key) {
    var body = JSON.stringify({ file: key });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(HIT, new Blob([body], { type: "text/plain;charset=UTF-8" }));
      } else if (window.fetch) {
        fetch(HIT, { method: "POST", body: body, keepalive: true, mode: "no-cors",
                     headers: { "Content-Type": "text/plain;charset=UTF-8" } });
      }
    } catch (err) { /* 못 세도 화면은 그대로 돈다 */ }
  }
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("[data-dl]") : null;
    if (a) tell(a.getAttribute("data-dl"));
  }, true);
})();
