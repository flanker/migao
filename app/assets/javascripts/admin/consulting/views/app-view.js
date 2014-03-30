App.views.AppView = Backbone.View.extend({

  id: 'app-view',

  initialize: function () {
    this.render();
    this.handleIdle();
  },

  render: function () {
    var html = App.helper.renderTemplate('app', {});
    $(this.el).html(html);
    this.renderMessages();
    this.renderIdleWarning();
    this.handleUnload();
  },

  renderMessages: function () {
    new App.views.FunctionPanelView({model: this.model, el: $('.function-panel', this.el)});
    new App.views.CustomersPanelView({model: this.model, collection: this.model.get('chats'), el: $('.customer-panel', this.el)});
    new App.views.ChatPanelView({model: this.model, el: $('.chat-panel', this.el)});
  },

  renderIdleWarning: function () {
    var view = new App.views.IdleWarningView({model: this.model});
    $('#idle-warning-view').remove();
    $('body').append(view.el);
  },

  handleUnload: function () {
    var model = this.model;
    window.onbeforeunload = function () {
      if (model.active_chats().length > 0) {
        return '您正在与顾客咨询中，跳转到其他页面将中断当前对话，您确定要继续么？'
      } else if (model.get('online')) {
        return '您正在咨询中，确定退出吗？';
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
      if (model.get('online')) {
        model.save({online: false}, {async: false});
        model.closeByIdle();
        $(document).idleTimer("destroy");
      }
    });
  }

});
