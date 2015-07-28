$(document).ready(function() {
    db = [];


    var groupObject = {
        name: " ",
        tabs: []
    };

    $( "#addButton" ).click(function() {
        value = $("#groupName").val();
        groupObject.name = value;
        console.log(groupObject);
        db.push(groupObject);
        console.log("db is", db);
    });



    chrome.tabs.query({}, function(tabs) {
        $.each(tabs, function(idx, val) {
            $("#unsorted").append(val.url);
        });
    });
});
