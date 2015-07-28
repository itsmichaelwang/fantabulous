$(document).ready(function() {
    chrome.tabs.query({}, function(tabs) {
        $.each(tabs, function(idx, val) {
            $("#unsorted").append(val.url);
        });
    });
});
