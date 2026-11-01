/*
  Shared header (drawn where this script is included, at the top of <body>)
  and footer (drawn into <footer id="site-footer"> by site.js).
  Pages in a subfolder include this with data-root="../" so links still work.
  The current page is marked from <body data-page="...">.
*/
(function () {
  var me = document.currentScript;
  var root = (me && me.getAttribute("data-root")) || "";
  window.OH_ROOT = root;
  var page = document.body.getAttribute("data-page") || "";

  function link(href, label, key, cls) {
    var cur = key === page ? ' aria-current="page"' : "";
    return '<a href="' + root + href + '"' + cur + (cls ? ' class="' + cls + '"' : "") + ">" + label + "</a>";
  }

  var header =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="topbar' + (page === "home" ? "" : " solid") + '">' +
      '<a class="brand" href="' + root + 'index.html" aria-label="Overheater Studios home">' +
        '<img class="brand-mark" src="' + root + 'img/overheater-mark.svg" alt="" width="48" height="50">' +
        '<img class="brand-word" src="' + root + 'img/overheater-wordmark-reverse.svg" alt="Overheater Studios" width="180" height="56">' +
      "</a>" +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>' +
      '<nav id="site-nav" aria-label="Main">' +
        link("games.html", "Games", "games") +
        link("tools.html", "Tools", "tools") +
        link("devlog.html", "Devlog", "devlog") +
        link("about.html", "About", "about") +
        link("contact.html", "Contact", "contact", "nav-cta") +
      "</nav>" +
    "</header>";

  me.insertAdjacentHTML("afterend", header);

  var btn = document.querySelector(".menu-btn"), bar = document.querySelector(".topbar");
  btn.addEventListener("click", function () {
    var open = bar.classList.toggle("menu-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Close" : "Menu";
  });
})();
