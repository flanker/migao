App.views.FunctionPanelView = Backbone.View.extend({

  id: 'function-panel-view',

  events: {
    'switch-change #online-agent-switch': 'onSwitch'
  },

  initialize: function () {
    this.render();
  },

  render: function () {
    var html = App.helper.renderTemplate('function-panel', {model: this.model});
    $(this.el).html(html);
    $('#online-agent-switch', this.el).bootstrapSwitch();
    $('#online-agent-switch', this.el).bootstrapSwitch('setSizeClass', 'switch-small');
  },

  onSwitch: function (e, data) {
    $('.status-label', this.el).toggle();
    this.model.set('online', data.value);
    this.model.save('keepCurrent', true, {
      success: function (model, response) {
        model.unset('keepCurrent');
      }
    });
  }

});
