(function($) {
    var Tab = Backbone.Model.extend({
        defaults: {
            groupName: '',
            data: {}
        }
    });

    var TabCollection = Backbone.Collection.extend({
        model: Tab
    });

    var TabView = Backbone.View.extend({
        el: $('body'),
        initialize: function() {
            var tabCollection = this.tabCollection = new TabCollection();

            chrome.tabs.query({}, function(tabs) {
                _.each(tabs, function(tab) {
                    var t = new Tab({
                        data: tab
                    });
                    tabCollection.add(t);
                });
            });
            console.log(this.tabCollection);
        },
        render: function() {

        }
    });

    var tabView = new TabView();
})(jQuery);

// $(document).ready(function() {
//     var db = [
//         {
//             name: "Unsorted Tabs",
//             tabs: []
//         },
//         {
//             name: "WildHacks",
//             tabs: []
//         },
//         {
//             name: "Job Search",
//             tabs: []
//         }
//     ]
//
//     chrome.tabs.query({}, function(tabs) {
//         $.each(tabs, function(idx, val) {
//             db[0].tabs.push(val);
//         });
//
//         render(db);
//     });
// });
//
// var render = function(db) {
//     $('.row-fluid').empty();
//     // create a column for each tab group
//     $.each(db, function(idx, val) {
//         var col =
//             $('<div/>', {
//                 class: 'col-lg-3',
//             }).append(
//                 $('<h1/>', {
//                     class: 'panel-heading',
//                     text: val.name
//                 })
//             );
//
//         // populate tab groups with tabs inside
//         $.each(val.tabs, function(idx, val) {
//             $('<p/>', {
//                 text: val.title
//             }).appendTo(col);
//         });
//
//         col.appendTo('.row-fluid');
//     });
// }
