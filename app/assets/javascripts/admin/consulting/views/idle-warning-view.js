App.views.IdleWarningView = Backbone.View.extend({

  id: 'idle-warning-view',

  initialize: function () {
    this.model.on('closeByIdle', this.show, this);
    this.render();
  },

  render: function () {
    $(this.el).append(App.helper.renderTemplate('idle-warning', {
      chat: this.model
    }));
  },

  show: function () {
    $('#idle-warning-modal', this.el).modal();
  }

});
