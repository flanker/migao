App.router.AppRouter = Backbone.Router.extend({

  routes: {
    '!/chat': 'init',
    '*actions': 'empty'
  },

  init: function () {
    new App.models.Chat().fetch({
      success: function (chat) {
        chat.init();
        var appHtml = new App.views.AppView({model: chat}).el;
        $('#chat-room').html(appHtml).addClass('rerender').removeClass('rerender');
      }
    });
  },

  empty: function () {
    App.app.navigate('!/chat', {trigger: true});
  }

});
