App.views.MessagesView = Backbone.View.extend({

  className: 'messages',

  initialize: function (options) {
    this.options = options || {};
    this.collection.on('add', this.addMessage, this);
    this.render();
  },

  render: function () {
    this.collection.each(this.addMessage, this);
  },

  addMessage: function (message) {
    var messageView = new App.views.MessageView({
      model: message,
      chat: this.options.chat
    });
    $(this.el).append(messageView.el)
      .animate({scrollTop: $(this.el).prop('scrollHeight')}, 'slow');
  }

});
