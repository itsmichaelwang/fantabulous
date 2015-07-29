(function($) {

    var WorkSpace = Backbone.Model.extend({
        defaults: {
            'ungrouped': []
        }
    });

    var MainView = Backbone.View.extend({
        el: $('body'),
        initialize: function() {
            var workSpace = this.workSpace = new WorkSpace();

            chrome.tabs.query({}, function(tabs) {
                var temp = [];
                _.each(tabs, function(tab) {
                    var t = new Backbone.Model(tab);
                    temp.push(t);
                });
                workSpace.set('ungrouped', temp);
                workSpace.set('WildHacks', []);
            });
            console.log(this.workSpace);
        },
        render: function() {



        }
    });

    var mainView = new MainView();
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
