App.views.ChatPanelView = Backbone.View.extend({

  id: 'chat-view',

  initialize: function () {
    this.render();
    this.model.on('change:current_chat_id', this.render, this);
  },

  render: function () {
    $(this.el).html(App.helper.renderTemplate('chat', {
      chat: this.model.currentChat()
    }));

    this.renderHeader();
    this.renderFooter();
    this.renderMessages();
  },

  renderHeader: function () {
    var headerView = new App.views.ChatHeaderView({
      model: this.model.currentChat()
    });
    $('.modal-header', this.el).html(headerView.el);
  },

  renderFooter: function () {
    if (this.model.currentChat()) {
      var footerView = new App.views.ChatFooterView({
        model: this.model.currentChat()
      });
      $('.modal-footer', this.el).html(footerView.el);
    }
  },

  renderMessages: function () {
    $('.message-display', this.el).empty();
    var currentChat = this.model.currentChat();
    if (currentChat && currentChat.get('messages')) {
      var messagesView = new App.views.MessagesView({
        collection: currentChat.get('messages'),
        chat: currentChat
      });
      $('.message-display', this.el).html(messagesView.el);
    }
  }

});
