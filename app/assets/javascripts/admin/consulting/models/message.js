App.models.Message = Backbone.Model.extend({

  defaults: function () {
    return {
      read: false
    };
  },

  url: function () {
    return '/admin/consultings/chats/' + this.get('chat_id') + '/messages';
  }

});
