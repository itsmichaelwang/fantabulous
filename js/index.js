$(document).ready(function() {
    
    var ButtonView = Backbone.View.extend({
        render: function() {
            this.$el.html('');
            this.$el.append('<div class="add-button"><span class="glyphicon glyphicon-plus"></span></div>');
            return this;
        }
    });

    var MainView = Backbone.View.extend({
        initialize: function() {
            this.workspace = {};
            this.children = this.children || {};
            
            this.refreshTabs();
            this.children.buttonView = new ButtonView();
        },
        render: function() {
            this.$el.html('');
            this.loaded.done(function() {
                _.each(this.workspace, function(tabGroup, tabGroupId) {
                    
                    var tabGroupDivId = 'col-' + tabGroupId;
                    this.$el.append('<div id="' + tabGroupDivId + '" class="col-lg-3"></div>');
                    this.$('#' + tabGroupDivId).append('<div id=' + tabGroupId + ' class="panel panel-default"></div>');
                    
                    this.$('#' + tabGroupId).append('<div class="panel-heading"><h3>' + tabGroup.name + '</h3></div>');
                    this.$('#' + tabGroupId).append('<ul class="list-group"></ul>');
                    
                    self = this;
                    this.$('#' + tabGroupId + ' .list-group').sortable({
                        connectWith: ".list-group",
                        update: function(event, ui) {
                            if (this === ui.item.parent()[0]) {
                                var tabId = ui.item.context.id;
                                var oldGroup = self.tabsHash[tabId].pinned ? 'pinned' : oldGroup = self.tabsHash[tabId].windowId;
                                var newGroup = parseInt(ui.item.parent().parent()[0].id);

                                
                            }
                        }
                    });
                    
                    _.each(tabGroup, function(tab, tabId) {
                        if (tabId != "name") {
                            this.$('#' + tabGroupId + ' .list-group').append('<li id="' + tabId + '" class="list-group-item">' + tab.title + '</li>');
                        }
                    }, this);
                }, this);
            });
            
            this.$el.append(this.children.buttonView.render().el);
            return this;
            
        },
        refreshTabs: function() {
            this.tabsHash = {}
            this.loaded = $.Deferred();
            chrome.tabs.query({}, (function(tabs) {
                console.log(tabs);
                _.each(tabs, function(tab, idx) {
                    this.tabsHash[tab.id] = tab;
                    
                    if (tab.pinned) {
                        this.workspace.pinned = this.workspace.pinned || {};
                        this.workspace.pinned.name = this.workspace.pinned.name || "Pinned Tabs";
                        this.workspace.pinned[tab.id] = tab;
                    } else if (tab.title == "Fantabulous") {
                        return;
                    } else {
                        this.workspace[tab.windowId] = this.workspace[tab.windowId] || {};
                        this.workspace[tab.windowId].name = this.workspace[tab.windowId].name || "Window " + tab.windowId;
                        this.workspace[tab.windowId][tab.id] = tab;
                    }
                    
                }, this);
                
                this.loaded.resolveWith(this);
            }).bind(this));
            
        },
        events: {
            'click .add-button': function() {
                chrome.windows.create({
                    state: 'minimized'
                }, (function(window) {
                    this.refreshTabs();
                    this.render();
                }).bind(this));
            }
        }
    });

    var mainView = new MainView();
    $('#workspace').append(mainView.render().el);
});
