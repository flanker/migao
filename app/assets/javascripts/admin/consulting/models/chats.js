App.models.Chats = Backbone.Collection.extend({

  model: App.models.Chat,

  findById: function (id) {
    return this.find(function (chat) {
      return chat.get('id') === id;
    });
  },

  removeById: function (id) {
    var chat = this.findById(id);
    return this.remove(chat);
  },

  comparator: function (a, b) {
    if (a.get('online') > b.get('online')) {
      return -1;
    } else if (a.get('online') < b.get('online')) {
      return 1;
    } else {
      if (a.getLatestUpdateTime() > b.getLatestUpdateTime()) {
        return -1;
      } else if (a.getLatestUpdateTime() < b.getLatestUpdateTime()) {
        return 1;
      } else {
        return 0;
      }
    }
  }

});
