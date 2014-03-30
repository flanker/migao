$.ajaxSetup({ cache: false });

$(function () {

  var $startChatForm = $('#start-chat-form');

  $startChatForm.validate({
    rules: {
      name: {
        required: true
      },
      phone: {
        required: true,
        digits: true,
        minlength: 11,
        maxlength: 11
      }
    },
    messages: {
      name: {
        required: '姓名不能为空'
      },
      phone: {
        required: '手机号码不能为空',
        digits: '手机号码必须为数字',
        minlength: '手机号码必须为11位',
        maxlength: '手机号码必须为11位'
      }
    },
    highlight: function(element) {
      $(element).closest('.control-group').removeClass('success').addClass('error');
    },
    success: function(element) {
      element.closest('.control-group').removeClass('error').addClass('success');
    }
  });


  $('.start-chat').click(function (e) {
    e.preventDefault();

    var onlineAgentId = $(this).data('online-agent-id');
    $('#online-agent-id').val(onlineAgentId);
    $startChatForm.attr('action', '/consultings/' + onlineAgentId + '/chats');
    $('#start-chat-modal').modal();

    $('#start-chat-submit').click(function (e) {
      e.preventDefault();

      if ($startChatForm.valid()) {
        $startChatForm.submit();
      }
    });
  });
});
