App.views.ChatInputAeraView = Backbone.View.extend({

  id: 'input-area',

  events: {
    'click a[name="send"]': 'onSend',
    'keyup textarea[name="message"]': 'onKeyup'
  },

  initialize: function () {
    _.bindAll(this, 'render', 'onSend', 'onKeyup', 'sendMessage');
    this.model.on('change:online', this.render, this);
    this.render();
  },

  render: function () {
    $(this.el).html(App.helper.renderTemplate('chat-input-area', {}));
    if (!this.model.get('online')) {
      $('.message-input', this.el).attr('disabled', 'disabled');
      $('.send', this.el).addClass('disabled');
    }
  },

  onSend: function () {
    this.sendMessage();
  },

  onKeyup: function (e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      this.sendMessage();
    }
  },

  sendMessage: function () {
    var message = $('.message-input', this.el).val();
    if (message && $.trim(message).length > 0) {
      this.model.send(message);
      $('.message-input', this.el).val('');
    }
  }

});
