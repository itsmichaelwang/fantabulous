chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.windows.create({
        url: "index.html"
    });
});
