App.models.Chat = Backbone.Model.extend({

  defaults: function () {
    return {
      'messages': new App.models.Messages()
    };
  },

  url: function () {
    return '/admin/consultings/chats/' + this.get('id');
  },

  parse: function (attrs) {
    this.get('messages').add(attrs.messages);
    delete attrs.messages;
    return attrs;
  },

  constructor: function(attrs) {
    this.messages = new App.models.Messages(attrs.messages);
    delete attrs.messages;
    Backbone.Model.apply(this, arguments);
  },

  send: function (messageString) {
    var message = new App.models.Message({
      online_agent_id: this.get('online_agent_id'),
      chat_id: this.get('id'),
      from: 'admin',
      to: 'client',
      content: messageString,
      read: true
    });

    this.get('messages').add(message);
    message.save();
  },

  getLatestUpdateTime: function () {
    if (this.get('messages').last()) {
      return this.get('messages').last().get('created_at');
    }
    return this.get('created_at');
  },

  readAll: function () {
    this.get('messages').each(function (message) {
      message.set('read', true);
    });
  },

  closeByCustomer: function () {
    this.set('online', false);
    this.get('messages').add({
      online_agent_id: this.get('online_agent_id'),
      chat_id: this.get('id'),
      from: 'system',
      to: 'admin',
      content: '当前客户已经离开',
      read: true
    });
  },

  closeByConsultant: function () {
    this.set('online', false);
    this.get('messages').add({
      online_agent_id: this.get('online_agent_id'),
      chat_id: this.get('id'),
      from: 'system',
      to: 'admin',
      content: '你已经结束了当前聊天',
      read: true
    });
    this.save();
  }

});
