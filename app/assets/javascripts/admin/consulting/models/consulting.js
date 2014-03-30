App.models.Consulting = Backbone.Model.extend({

  defaults: function () {
    return {
      chats: new App.models.Chats(),
      current_chat_id: -1
    };
  },

  faye: new Faye.Client(location.protocol + '//' + location.hostname + ':8000/faye'),

  url: '/admin/consultings',

  faye_channel: function () {
    return '/admin/' + this.get('id');
  },

  parse: function (attrs) {
    this.get('chats').add(attrs.chats);
    if (attrs.chats && attrs.chats.length > 0) {
      attrs.current_chat_id = attrs.chats[0].id;
    }
    delete attrs.chats;
    return attrs;
  },

  active_chats: function () {
    return this.get('chats').select(function (chat) {
      return chat.get('online');
    });
  },

  init: function () {
    var self = this;

    self.faye.subscribe(this.faye_channel(), function (event) {
      var chat;
      switch (event.action) {
        case 'NEW_CHAT':
          chat = new App.models.Chat(event.data);
          self.get('chats').add(chat);
          break;
        case 'MESSAGE':
          var newMessage = event.data;
          chat = self.get('chats').findById(newMessage.chat_id);
          if (self.currentChat() && self.currentChat().get('id') == chat.get('id')) {
            newMessage.read = true;
          }
          chat.get('messages').add(event.data);
          break;
        case 'CLOSE_CHAT':
          chat = self.get('chats').findById(event.data.id);
          chat.closeByCustomer();
          break;
        default:
      }
      self.trigger('update');
    });
  },

  currentChat: function () {
    var self = this;
    return self.get('chats').find(function (chat) {
      return chat.get('id') === self.get('current_chat_id');
    });
  },

  closeByIdle: function () {
    this.get('chats').each(function (chat) {
      chat.set('online', false);
    });
    this.trigger('closeByIdle');
  }

});
