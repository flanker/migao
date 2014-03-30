App.models.Messages = Backbone.Collection.extend({

  model: App.models.Message,

  unread: function () {
    return _(this.models).select(function (message) {
      return message.get('read') == false;
    }).length;
  }

});