chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.windows.update(tab.windowId, {
        state: 'minimized'
    }, function(window) {
        chrome.windows.create({
            url: "index.html"
        });
    });
});
