App.models.Chat = Backbone.Model.extend({

  defaults: {
    'messages': new App.models.Messages()
  },

  faye: new Faye.Client(location.protocol + '//' + location.hostname + ':8000/faye'),

  url: function () {
    return '/consultings/' + ONLINE_AGENT_ID + '/chats/' + ONLINE_CHAT_ID;
  },

  parse: function (attrs) {
    this.get('messages').add(attrs.messages);
    delete attrs.messages;
    return attrs;
  },

  init: function () {
    var self = this;

    self.faye.subscribe('/client/' + this.get('id'), function (event) {
      switch (event.action) {
        case 'MESSAGE':
          self.get('messages').add(event.data);
          break;
        case 'CLOSE_CHAT':
          self.closeByConsultant();
          break;
        default:
      }
    });
  },

  send: function (messageString) {
    var message = new App.models.Message({
      from: 'client',
      to: 'admin',
      content: messageString
    });

    this.get('messages').add(message);
    message.save();
  },

  closeByConsultant: function () {
    this.set('online', false);
    this.get('messages').add({
      online_agent_id: this.get('online_agent_id'),
      chat_id: this.get('id'),
      from: 'system',
      to: 'client',
      content: '咨询师已离开，对话结束。若需要继续聊天，请咨询其他咨询师。',
      read: true
    });
  },

  closeByIdle: function () {
    this.get('messages').add({
      online_agent_id: this.get('online_agent_id'),
      chat_id: this.get('id'),
      from: 'system',
      to: 'client',
      content: '由于您长时间没有操作，会谈已结束。',
      read: true
    });
  }

});
