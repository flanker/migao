require 'faye/message_server'

module Admin::Consultings

  class ChatsController < AdminController

    before_action :get_online_chat, only: [:update]

    def update
      old_online = @chat.online
      @chat.update_attributes!(online: params[:online], note: params[:note])
      close_chat if old_online && !params[:online]
      render nothing: true
    end

    private

    def get_online_chat
      @chat = Chat.find(params[:id])
    end

    def close_chat
      Rails.logger.info "Send close chat message to #{@chat.id}"
      Faye::MessageServer.new.send "/client/#{@chat.id}", action: 'CLOSE_CHAT', data: @chat
    end

  end

end
