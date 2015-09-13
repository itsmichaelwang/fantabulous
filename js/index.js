$(document).ready(function() {
    
    var ButtonView = Backbone.View.extend({
        events : {
            'click .add-button': 'addGroup'
        },
        addGroup: function () {
            console.log("clicked");
            // var userInput = $('#groupName').val();
            // if("userInput" in this.model.attributes){
            // } else {
            //     this.model.set(userInput, []);
            // }
        },
        render: function() {
            this.$el.html('');
            this.$el.append('<div class="add-button"><span class="glyphicon glyphicon-plus"></span></div>');
            return this;
        }
    });

    var MainView = Backbone.View.extend({
        initialize: function() {
            this.workspace = {};
            this.loaded = $.Deferred();
            
            chrome.tabs.query({}, (function(tabs) {
                _.each(tabs, function(tab, idx) {
                    if (tab.pinned) {
                        this.workspace.pinned = this.workspace.pinned || {};
                        this.workspace.pinned.name = this.workspace.pinned.name || "Pinned Tabs";
                        this.workspace.pinned[tab.id] = tab;
                    } else {
                        this.workspace[tab.windowId] = this.workspace[tab.windowId] || {};
                        this.workspace[tab.windowId].name = this.workspace[tab.windowId].name || "Window " + tab.windowId;
                        this.workspace[tab.windowId][tab.id] = tab;
                    }
                    
                }, this);
                
                this.loaded.resolveWith(this);
            }).bind(this));
        },
        render: function() {
            this.$el.html('');
            this.loaded.done(function() {
                _.each(this.workspace, function(tabGroup, tabGroupId) {
                    this.$el.append('<div id="column' + tabGroupId + '" class="col-lg-3"></div>')
                    this.$('#column' + tabGroupId).append('<div id=' + tabGroupId + ' class="panel panel-default"></div>');
                    this.$('#' + tabGroupId).append('<div class="panel-heading"><h3>' + tabGroup.name + '</h3></div>');
                    this.$('#' + tabGroupId).append('<ul class="list-group"></ul>');
                    
                    _.each(tabGroup, function(tab, tabId) {
                        this.$('#' + tabGroupId + " ul").append('<li class="list-group-item">' + tab.title + '</li>');
                    }, this);
                }, this);
                
                this.buttonView = new ButtonView();
                this.$el.append(this.buttonView.render().el);
                
            });
            return this;
            
        }
    });

    var mainView = new MainView();
    $('#workspace').append(mainView.render().el);
});
