chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.windows.update(tab.windowId, {
        // state: 'minimized'   // we'll figure out what to do later
    }, function(window) {
        chrome.windows.create({
            url: "index.html",
        });
    });
});
