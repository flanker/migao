App.router.AppRouter = Backbone.Router.extend({

  routes: {
    '!/chat': 'init',
    '*actions': 'empty'
  },

  init: function () {
    new App.models.Consulting().fetch({
      success: function (consulting) {
        consulting.init();
        var appHtml = new App.views.AppView({model: consulting}).el;
        $('.admin-room').html(appHtml).addClass('rerender').removeClass('rerender');
      }
    });
  },

  empty: function () {
    App.app.navigate('!/chat', {trigger: true});
  }

});
