$(document).ready(function() {

    var db = [
        {
            name: "Unsorted Tabs",
            tabs: []
        },
        {
            name: "WildHacks",
            tabs: []
        },
        {
            name: "Job Search",
            tabs: []
        }
    ];

    var groupObject = {
        name: " ",
        tabs: []
    };

    $( "#addButton" ).click(function() {
        value = $("#groupName").val();
        groupObject.name = value;
        db.push(groupObject);
        render(db);
    });

    chrome.tabs.query({}, function(tabs) {
        $.each(tabs, function(idx, val) {
            db[0].tabs.push(val);
        });

        render(db);
    });
});

var render = function(db) {
    $('.row-fluid').empty();
    // create a column for each tab group
    $.each(db, function(idx, val) {
        var col =
            $('<div/>', {
                class: 'col-lg-3',
            }).append(
                $('<h1/>', {
                    class: 'panel-heading',
                    text: val.name
                })
            );

        // populate tab groups with tabs inside
        $.each(val.tabs, function(idx, val) {
            $('<p/>', {
                text: val.title
            }).appendTo(col);
        });

        col.appendTo('.row-fluid');
    });
}
