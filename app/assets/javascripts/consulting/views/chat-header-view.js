App.views.ChatHeaderView = Backbone.View.extend({

  tagName: 'span',

  events: {
    'click a': 'onClose'
  },

  initialize: function () {
    this.render();
  },

  render: function () {
    $(this.el).html(App.helper.renderTemplate('chat-header', {}));
  },

  onClose: function () {
    if (this.model.get('online')) {
      this.model.save({online: false}, {async: false});
    }
  }

});
