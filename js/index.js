(function($) {

    var WorkSpace = Backbone.Model.extend({
        defaults: {
            'ungrouped': []
        }
    });

    var TabView = Backbone.View.extend({

    });

    var MainView = Backbone.View.extend({
        initialize: function() {
            var workSpace = this.workSpace = new WorkSpace();
            var isLoaded = this.isLoaded = new Backbone.Model({
                loaded: false
            });
            this.listenTo(this.isLoaded, 'change:loaded', this.render);

            chrome.tabs.query({}, function(tabs) {
                var temp = [];
                _.each(tabs, function(tab) {
                    var t = new Backbone.Model(tab);
                    temp.push(t);
                });
                workSpace.set('ungrouped', temp);
                workSpace.set('WildHacks', []);

                isLoaded.set('loaded', true);
            });
        },
        render: function() {
            _.each(this.workSpace.attributes, function(item, groupName, items) {
                $('#groups').append('\
                    <div id="' + groupName + '" class="col-lg-3">\
                        <h1>' + groupName + '</h1>\
                    </div>');

                _.each(item, function(item, index, items) {
                    console.log(item);
                    $('#' + groupName).append('<div>' + item.get('url') + '</div>');
                });
            }, this);
        }
    });

    var mainView = new MainView();
})(jQuery);
