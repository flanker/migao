App.views.AppView = Backbone.View.extend({

  id: 'chatoApp',

  initialize: function () {
    this.render();
    this.handleIdle();
  },

  render: function () {
    $(this.el).html(App.helper.renderTemplate('app', {}));
    this.renderChatHeader();
    this.renderInputArea();
    this.renderMessages();
    this.handleUnload();
  },

  renderChatHeader: function () {
    var headerView = new App.views.ChatHeaderView({
      model: this.model
    });
    $('.room-header .actions').prepend(headerView.el);
  },

  renderInputArea: function () {
    var inputAreaView = new App.views.ChatInputAeraView({
      model: this.model
    });
    $('.message-actions', this.el).html(inputAreaView.el);
  },

  renderMessages: function () {
    var messagesView = new App.views.MessagesView({
      collection: this.model.get('messages'),
      chat: this.model
    });
    $('.message-display', this.el).html(messagesView.el);
  },

  handleUnload: function () {
    var model = this.model;
    window.onbeforeunload = function () {
      if (model.get('online')) {
        return '您正在和顾问咨询中，确定退出吗？';
      }
      return undefined;
    };

    $(window).unload(function () {
      if (model.get('online')) {
        model.save({online: false}, {async: false});
      }
    });
  },

  handleIdle: function () {
    var model = this.model;
    $(document).idleTimer(180000);
    $(document).on("idle.idleTimer", function () {
      console.log('Go offline because of idle for 300 seconds.')
      if (model.get('online')) {
        model.save({online: false}, {async: false});
        model.closeByIdle();
      }
      $(document).idleTimer("destroy");
    });
  }

});
