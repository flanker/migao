var App = {
  views: {},
  models: {},
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
