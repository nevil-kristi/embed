/**
 * ROQ - Iframe Embed
 * Simple, production-ready embed for third-party websites
 */
(function (window) {
  "use strict";

  const roqEmbed = {
    config: {
      appUrl: "https://captaincook.dev-v3.path.pro/quote",
      overlayId: "roq-embed-overlay",
      iframeId: "roq-embed-iframe",
      closeButtonId: "roq-embed-close",
    },

    init: function (customUrl) {
      const url = customUrl || this.config.appUrl;

      if (document.getElementById(this.config.overlayId)) {
        console.warn("ROQ overlay already open");
        return;
      }

      this.createOverlay(url);
      this.attachEventListeners();
    },

    createOverlay: function (url) {
      const overlay = document.createElement("div");
      overlay.id = this.config.overlayId;
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999999;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
      `;

      const wrapper = document.createElement("div");
      wrapper.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
        overflow: hidden;
      `;

      const closeBtn = document.createElement("button");
      closeBtn.id = this.config.closeButtonId;
      closeBtn.innerHTML = "&times;";
      closeBtn.setAttribute("aria-label", "Close");
      closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 28px;
        cursor: pointer;
        z-index: 1000000;
        transition: all 0.2s;
      `;

      closeBtn.onmouseover = function () {
        this.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        this.style.transform = "scale(1.1)";
      };
      closeBtn.onmouseout = function () {
        this.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        this.style.transform = "scale(1)";
      };

      const iframe = document.createElement("iframe");
      iframe.id = this.config.iframeId;
      iframe.src = url;
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
      `;
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute(
        "allow",
        "camera; microphone; geolocation; payment"
      );

      wrapper.appendChild(closeBtn);
      wrapper.appendChild(iframe);
      overlay.appendChild(wrapper);
      document.body.appendChild(overlay);

      document.body.style.overflow = "hidden";

      setTimeout(() => {
        overlay.style.opacity = "1";
      }, 10);
    },

    attachEventListeners: function () {
      const overlay = document.getElementById(this.config.overlayId);
      const closeBtn = document.getElementById(this.config.closeButtonId);

      closeBtn.addEventListener("click", () => this.close());
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.close();
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.close();
      });
    },

    close: function () {
      const overlay = document.getElementById(this.config.overlayId);
      if (overlay) {
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.remove();
          document.body.style.overflow = "";
        }, 300);
      }
    },

    isOpen: function () {
      return !!document.getElementById(this.config.overlayId);
    },
  };

  window.roqEmbed = roqEmbed;
})(window);

