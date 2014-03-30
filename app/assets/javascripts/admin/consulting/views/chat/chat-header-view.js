App.views.ChatHeaderView = Backbone.View.extend({

  id: 'chat-header-view',

  events: {
    'click .close-chat': 'onClose'
  },

  initialize: function () {
    this.render();
    if (this.model) {
      this.model.on('change:online', this.render, this);
    }
    _.bindAll(this, 'render', 'onClose');
  },

  render: function () {
    $(this.el).html(App.helper.renderTemplate('chat-header', {
      chat: this.model
    }));

    if (this.model && !this.model.get('online')) {
      $('.close-chat', this.el).addClass('disabled');
    }
  },

  onClose: function () {
    this.model.closeByConsultant();
  }

});
