App.views.CustomersPanelView = Backbone.View.extend({

  id: 'customers-panel-view',

  tag: 'ul',

  events: {
    'click .customer': 'onSwitch'
  },

  initialize: function () {
    this.model.on('update', this.render, this);
    this.model.get('chats').on('remove', this.render, this);
    _.bindAll(this, 'render');
    this.render();
  },

  render: function () {
    var html = App.helper.renderTemplate('customers-panel', {
      chats: this.collection.models
    });
    $(this.el).html(html);

    this.renderChild();
  },

  renderChild: function () {
    this.collection.sort().each(function (chat) {
      var html = new App.views.CustomerPanelView({
        model: chat,
        consulting: this.model
      }).el;

      $(this.el).append(html);
    }, this)
  },

  onSwitch: function (e) {
    e.preventDefault();
    var chatId = $(e.currentTarget).parent().data('chat-id');
    this.model.set('current_chat_id', chatId);
    this.model.currentChat().readAll();
    this.render();
  }

});
