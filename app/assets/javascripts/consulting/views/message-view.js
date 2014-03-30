App.views.MessageView = Backbone.View.extend({

  className: 'message',

  initialize: function (options) {
    this.options = options || {};
    this.render();
  },

  render: function () {
    var html = App.helper.renderTemplate('message', {
      message: this.model,
      chat: this.options.chat
    });
    $(this.el).html(html).autolink('_blank');
  }

});
