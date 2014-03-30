var App = {
  views: {
    callscripts: {}
  },
  models: {
    history: {},
    callscripts: {}
  },
  helper: {},
  router: {},
  config: {}
};

$(function () {
  App.helper.loadTemplates(App.config.templates, function () {
    App.app = new App.router.AppRouter();
    Backbone.history.start();
  });
});
