$(document).ready(function() {
    var WorkSpace = Backbone.Model.extend({
        defaults: {
            'ungrouped': []
        }
    });

    var TabView = Backbone.View.extend();

    var ButtonView = Backbone.View.extend({

        events : {
            'click #addButton': 'addGroup'
        },

        addGroup: function () {
            var userInput = $('#groupName').val();
            if("userInput" in this.model.attributes){
            }else{
                this.model.set(userInput, []);
            }
        },

        render: function() {
            this.$el.html('');
            this.$el.append('\
                <div class="row-fluid">\
                  <div class="col-lg-6">\
                    <div class="input-group">\
                      <span class="input-group-btn">\
                        <button id="addButton" class="btn btn-default" type="button">Add Group</button>\
                      </span>\
                      <input id="groupName" type="text" class="form-control" placeholder="Search for...">\
                    </div>\
                  </div>\
                </div>');
            return this;
        }

    });

    var MainView = Backbone.View.extend({

        initialize: function() {
            var workSpace = this.workSpace = new WorkSpace();
            var isLoaded = this.isLoaded = new Backbone.Model({
                loaded: false
            });
            this.listenTo(this.isLoaded, 'change:loaded', this.render);
            this.listenTo(this.workSpace, 'change', this.render);

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
            this.$el.html('');
            _.each(this.workSpace.attributes, function(item, groupName, items) {
                this.$el.append('\
                    <div id="' + groupName + '" class="col-lg-3">\
                        <h1>' + groupName + '</h1>\
                    </div>');

                _.each(item, function(item, index, items) {
                    this.$('#' + groupName).append('<div>' + item.get('url') + '</div>');
                }, this);
            }, this);

            this.buttonView = new ButtonView({
                model: this.workSpace
            });
            this.$el.append(this.buttonView.render().el);

            return this;
        }
    });

    var mainView = new MainView();
    $('body').append(mainView.render().el);

});
