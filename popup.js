chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "extractImages" }, (response) => {
    const container = document.getElementById("imageList");
    container.innerHTML = "";
    if (response && response.images && response.images.length > 0) {
      response.images.forEach(({ src, alt }) => {
        const cleanSrc = decodeURIComponent(src.replace(/&amp;/g, "&"));

        const button = document.createElement("button");
        button.textContent = "Open Image";
        button.title = alt;
        button.style.cssText = `
          display: block;
          width: 100%;
          margin-bottom: 4px;
          padding: 10px;
          font-size: 14px;
          background-color: #3897f0;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        `;
        button.onclick = () => window.open(cleanSrc, "_blank");

        const altText = document.createElement("small");
        altText.textContent = alt;
        altText.style.cssText = `
          display: block;
          font-size: 11px;
          color: #555;
          margin-bottom: 10px;
          word-break: break-word;
        `;

        container.appendChild(button);
        container.appendChild(altText);
      });
    } else {
      container.innerHTML = "No Instagram images found.";
    }
  });
});
