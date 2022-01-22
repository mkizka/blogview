function loadScript() {
  // https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/set-up-twitter-for-websites
  window.twttr = (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
      t._e.push(f);
    };

    return t;
  })(document, "script", "twitter-wjs");
}

function shouldLoadScript() {
  return document.getElementsByClassName("twitter-tweet").length > 0;
}

function loadTweet() {
  if (shouldLoadScript()) {
    loadScript();
  }
  if ("twttr" in window) {
    window.twttr.widgets.load();
  }
}

window.addEventListener("vscode.markdown.updateContent", loadTweet);

loadTweet();
