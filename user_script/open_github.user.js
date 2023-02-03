// ==UserScript==
// @name         Open in Vim for GitHub
// @namespace    https://github.com/yuki-yano/denops-open-http.vim
// @version      0.1
// @author       yuki-yano
// @match        https://github.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  "use strict";

  let href = undefined;
  let insertButton = undefined;
  function render() {
    const target = document.getElementById("symbols-button");
    if (href === location.href || target == null) {
      setTimeout(() => {
        render();
      }, 100);

      return;
    }

    const url = new URL(location.href);
    const path = url.pathname;
    const className = target.getAttribute("class");
    const button = document.createElement("button");
    button.setAttribute("class", className);
    button.setAttribute(
      "style",
      "border: 1px solid #DBDEDF; color: #45494E; font-size: 12px; line-height: 18px;",
    );
    button.innerHTML = "<span>Open Vim</span>";
    button.addEventListener("click", async () => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `http://localhost:11112${path}`,
        onerror: (response) => {
          alert(
            "Failed to open in Vim.\nExecute :OpenHttpGitHubServerStart\nStart http://localhost:11112/",
          );
        },
      });
    });
    setTimeout(() => {
      if (insertButton != null) {
        insertButton.remove();
      }
      insertButton = target.parentNode.insertBefore(button, target);
    }, 100);
    href = location.href;
    setTimeout(() => {
      render();
    }, 100);
  }

  render();
})();
