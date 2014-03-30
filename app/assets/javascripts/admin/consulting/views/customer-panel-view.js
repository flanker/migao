App.views.CustomerPanelView = Backbone.View.extend({

  id: 'customer-panel-view',

  tagName: 'li',

  className: 'online',

  events: {
    'click .remove-offline': 'onRemove'
  },

  initialize: function (options) {
    this.options = options || {};
    this.render();
  },

  render: function () {
    var html = App.helper.renderTemplate('customer-panel', {
      chat: this.model,
      unread: this.model.get('messages').unread(),
      className: this.renderClassName()
    });
    $(this.el).html(html);
  },

  renderClassName: function () {
    var className = '';
    if (this.isCurrentChat()) {
      className += ' current-chat';
    }
    className += this.model.get('online') ? ' online' : ' offline';
    return className;
  },

  isCurrentChat: function () {
    var currentChat = this.options.consulting.currentChat();
    return currentChat && currentChat.get('id') == this.model.get('id');
  },

  onRemove: function (e) {
    e.preventDefault();
    e.stopPropagation();
    var chatId = $(e.currentTarget).parent().data('chat-id');
    this.options.consulting.get('chats').removeById(chatId);
  }

});
