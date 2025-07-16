chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "extractImages") {
    const images = Array.from(document.querySelectorAll("img"))
      .filter(img =>
        img.src.includes("instagram") &&
        !img.src.includes("s150x150") &&  // ❌ exclude profile pics
        !img.src.includes("/profile_pic/")  // optional additional filter
      )
      .map(img => ({
        src: img.src,
        alt: img.alt || "Instagram image"
      }));
    sendResponse({ images });
  }
});
