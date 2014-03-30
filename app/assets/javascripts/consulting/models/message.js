App.models.Message = Backbone.Model.extend({

  url: function () {
    return '/consultings/' + ONLINE_AGENT_ID + '/chats/' + ONLINE_CHAT_ID + '/messages';
  }

});
